#!/usr/bin/env python3
"""Build the static study bundle from reviewed source data and named KJV texts."""
from pathlib import Path
import json, re, hashlib, sys

ROOT = Path(__file__).resolve().parent
RESEARCH = ROOT / 'research'
DIST = ROOT / 'dist'
QA = ROOT / 'qa'
QA.mkdir(exist_ok=True)
NAMES = ['larkin-ages', 'larkin-dividing', 'scofield']
charts = [json.loads((RESEARCH / f'{name}.json').read_text()) for name in NAMES if (RESEARCH / f'{name}.json').exists()]
errors = []
if len(charts) != 3 and '--partial' not in sys.argv:
    raise SystemExit('All three reviewed source studies are required.')

def normal_book(name):
    name = re.sub(r'^III ', '3 ', name)
    name = re.sub(r'^II ', '2 ', name)
    name = re.sub(r'^I ', '1 ', name)
    return {'Revelation of John':'Revelation', 'Psalm':'Psalms'}.get(name, name)

primary = {}
for f in (RESEARCH / 'kjv-books').glob('*.json'):
    book = json.loads(f.read_text())
    name = normal_book(f.stem)
    for chapter in book['chapters']:
        for verse in chapter['verses']:
            primary[(name,int(chapter['chapter']),int(verse['verse']))] = verse['text']
secondary = {}
secondary_file = RESEARCH / 'kjv-scrollmapper.json'
if secondary_file.exists():
    for book in json.loads(secondary_file.read_text())['books']:
        name = normal_book(book['name'])
        for chapter in book['chapters']:
            for verse in chapter['verses']:
                secondary[(name,int(chapter['chapter']),int(verse['verse']))] = verse['text']

snapshot_file = QA / 'kjv-selected-source-snapshot.json'
if not primary and snapshot_file.exists():
    snapshot = json.loads(snapshot_file.read_text())
    for row in snapshot['verses']:
        key = (row['book'],row['chapter'],row['verse'])
        primary[key] = row['primary']
        secondary[key] = row['secondary']
if not primary:
    raise SystemExit('KJV source files or the selected-source snapshot are required.')

book_names = sorted({k[0] for k in primary},key=len,reverse=True)
aliases = {'Psalm':'Psalms','Song of Songs':'Song of Solomon'}
def parse_reference(reference):
    reference = re.sub(r'\s+', ' ', reference.strip()).replace('–','-').replace('—','-')
    for alias,book in aliases.items():
        if reference.startswith(alias+' '): reference=book+reference[len(alias):]
    book = next((b for b in book_names if reference.startswith(b+' ')),None)
    if not book: raise ValueError('Unrecognized book in '+reference)
    spec=reference[len(book):].strip()
    keys=[]
    for piece in spec.split(';'):
        piece=piece.strip()
        if re.fullmatch(r'\d+',piece):
            chapter=int(piece);keys.extend(k for k in primary if k[0]==book and k[1]==chapter)
        elif re.fullmatch(r'\d+-\d+',piece):
            first,last=map(int,piece.split('-'));keys.extend(k for k in primary if k[0]==book and first<=k[1]<=last)
        else:
            m=re.fullmatch(r'(\d+):(\d+)-(\d+):(\d+)',piece)
            if m:
                c1,v1,c2,v2=map(int,m.groups());keys.extend(k for k in primary if k[0]==book and (c1,v1)<=k[1:]<=(c2,v2));continue
            m=re.fullmatch(r'(\d+):([\d, -]+)',piece)
            if not m:raise ValueError('Unrecognized chapter/verse syntax in '+reference)
            chapter=int(m.group(1))
            for part in m.group(2).split(','):
                part=part.strip()
                if '-' in part:
                    first,last=map(int,part.split('-'));keys.extend((book,chapter,v) for v in range(first,last+1))
                else:keys.append((book,chapter,int(part)))
    keys=sorted(set(keys),key=lambda k:(k[1],k[2]))
    if not keys:raise ValueError('No verses resolved in '+reference)
    missing=[k for k in keys if k not in primary]
    if missing:raise ValueError('Missing verses '+str(missing)+' in '+reference)
    return keys

refs=set()
def collect(obj):
    if isinstance(obj,dict):
        for k,v in obj.items():
            if k=='references' and isinstance(v,list):
                for r in v:
                    if isinstance(r,str):refs.add(r)
                    elif isinstance(r,dict):refs.add(r.get('reference') or r.get('ref'))
            else:collect(v)
    elif isinstance(obj,list):
        for v in obj:collect(v)

for c in charts:
    collect(c)
    ids=[p['id'] for p in c['periods']]+[e['id'] for e in c.get('events',[])]
    if len(ids)!=len(set(ids)):errors.append(c['id']+': duplicate identifiers')
    numbers=[int(p['number']) for p in c['periods'] if p.get('number') is not None]
    expected=list(range(1,8 if c['id']=='scofield' else 9))
    if numbers!=expected:errors.append(c['id']+': numbered sequence '+str(numbers))
    pids={p['id'] for p in c['periods']}
    for e in c.get('events',[]):
        parent=e.get('withinPeriod') or e.get('duringPeriod') or e.get('afterPeriod')
        if parent and parent!='before' and parent not in pids:errors.append(c['id']+': invalid event parent '+str(parent))
    for a in c.get('ages',[])+c.get('subAges',[])+c.get('parallelBands',[]):
        for key in ['startPeriod','endPeriod']:
            if a.get(key) is not None and a.get(key) not in pids:errors.append(c['id']+': invalid span '+a.get('title','')+' '+key)
    if c.get('unverified'):errors.append(c['id']+': unresolved source assertions '+str(c['unverified']))
    asset=c.get('originalImage','')
    if asset and asset.startswith('/') and not (DIST/asset.lstrip('/')).exists():errors.append(c['id']+': missing original asset')

passages={};all_keys=set()
for ref in sorted(refs):
    if not ref:continue
    try:
        keys=parse_reference(ref);all_keys.update(keys)
        multichapter=len({k[1] for k in keys})>1
        passages[ref]={'verses':[{'verse':k[2],'label':f'{k[1]}:{k[2]}' if multichapter else str(k[2]),'text':primary[k]} for k in keys]}
    except ValueError as e:errors.append(str(e))

norm=lambda s:re.sub(r'[^a-z0-9]','',s.lower())
differences=[]
for key in sorted(all_keys):
    if key not in secondary:errors.append('No independent KJV source for '+str(key));continue
    if norm(primary[key])!=norm(secondary[key]):
        differences.append({'book':key[0],'chapter':key[1],'verse':key[2],'primary':primary[key],'secondary':secondary[key]})

snapshot={'source':'aruljohn/Bible-kjv','comparisonSource':'scrollmapper/bible_databases KJV','verses':[{'book':k[0],'chapter':k[1],'verse':k[2],'primary':primary[k],'secondary':secondary.get(k,'')} for k in sorted(all_keys)]}
snapshot_file.write_text(json.dumps(snapshot,ensure_ascii=False,indent=2))
(QA/'kjv-wording-differences.json').write_text(json.dumps(differences,ensure_ascii=False,indent=2))
decisions_file=QA/'kjv-variant-decisions.json'
decisions=json.loads(decisions_file.read_text()) if decisions_file.exists() else []
for diff in differences:
    decision=next((d for d in decisions if (d['book'],d['chapter'],d['verse'])==(diff['book'],diff['chapter'],diff['verse'])),None)
    if not decision or decision.get('verifiedPrimary')!=diff['primary']:
        errors.append('Unresolved KJV wording comparison: '+str((diff['book'],diff['chapter'],diff['verse'])))

metadata={
    'builtOn':'2026-11-08',
    'scriptureAttribution':'KJV text from aruljohn/Bible-kjv. Selected verses were compared with scrollmapper’s KJV text after normalizing case, spacing, and punctuation; the two remaining spelling variants were checked against Bible Gateway KJV. Source wording was retained.',
    'scriptureSources':[
        {'title':'KJV digital text used in the reader','url':'https://github.com/aruljohn/Bible-kjv'},
        {'title':'Independent KJV comparison corpus','url':'https://github.com/scrollmapper/bible_databases/blob/master/formats/json/KJV.json'},
        {'title':'Genesis 11:3 — verification of thoroughly','url':'https://www.biblegateway.com/passage/?search=Genesis%2011%3A3&version=KJV'},
        {'title':'Revelation 21:20 — verification of chrysolyte','url':'https://www.biblegateway.com/passage/?search=Revelation%2021%3A20&version=KJV'}
    ],
    'verificationSummary':f'{len(charts)} studies; {len(refs)} distinct source references; {len(all_keys)} unique KJV verses. Original chart numbering, contextual intervals, and source distinctions are recorded in each study.',
    'referenceCount':len(refs),'verseCount':len(all_keys)
}
serial=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
(DIST/'data.js').write_text('window.ATLAS_DATA='+serial(charts)+';\nwindow.ATLAS_PASSAGES='+serial(passages)+';\nwindow.ATLAS_META='+serial(metadata)+';\n')
report={'charts':len(charts),'periods':sum(len(c['periods']) for c in charts),'events':sum(len(c.get('events',[])) for c in charts),'relationships':sum(len(c.get('parallelBands',[])) for c in charts),'sourceReferences':len(refs),'uniqueVerses':len(all_keys),'normalizedTextDifferences':len(differences),'resolvedSpellingVariants':len([d for d in differences if any((v['book'],v['chapter'],v['verse'])==(d['book'],d['chapter'],d['verse']) for v in decisions)]),'dataBytes':(DIST/'data.js').stat().st_size,'errors':errors,'sha256':hashlib.sha256((DIST/'data.js').read_bytes()).hexdigest()}
(QA/'data-validation.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
if errors:raise SystemExit(1)
