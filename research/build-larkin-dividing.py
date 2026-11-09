from pathlib import Path
from html.parser import HTMLParser
import json, re, hashlib
ROOT=Path('/workspace/sites/dispensational-atlas')
CHAPTER='https://preservedwords.com/disptruth/chap5.html'
IMAGE='https://preservedwords.com/disptruth/images/4-rightly.gif'
CATALOG='https://www.larkinestate.com/charts.html'
YALE='https://mavcor.yale.edu/material-objects/rightly-dividing-word-truth'
class TextParser(HTMLParser):
    def __init__(self): super().__init__(); self.parts=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style'): self.skip+=1
        elif tag in ('p','div','br','h1','h2','h3','h4','li','blockquote','hr'): self.parts.append('\n\n')
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
        elif tag in ('p','div','h1','h2','h3','h4','li','blockquote'): self.parts.append('\n\n')
    def handle_data(self,data):
        if not self.skip: self.parts.append(re.sub(r'\s+',' ',data))
p=TextParser(); p.feed((ROOT/'research/larkin-dividing-chapter5.html').read_text())
text='\n\n'.join(re.sub(r'\s+',' ',s).strip() for s in ''.join(p.parts).split('\n\n') if s.strip())
text=text[text.index('Dispensational Truth'):text.index('Previous Chapter')].strip()
flat=re.sub(r'\s+',' ',text)
(ROOT/'research/larkin-dividing-source-text.txt').write_text(text)
def excerpt(s):
    assert s in flat, 'Excerpt absent: '+s
    return s

def period(id,number,title,shortTitle,start,end,summary,quote,refs,details,location,kind='dispensation'):
    return dict(id=id,number=number,title=title,shortTitle=shortTitle,start=start,end=end,summary=summary,
        sourceExcerpt=excerpt(quote),references=refs,details=[{'label':k,'text':v} for k,v in details],
        sourceLocation=location,kind=kind)

d={
'id':'larkin-dividing',
'author':'Clarence Larkin',
'title':'Rightly Dividing the Word of Truth',
'subtitle':'Creation, the dispensations, the judgments, and the ages to come',
'sourceTitle':'Dispensational Truth, chart “Rightly Dividing the Word of Truth” and chapter V',
'sourceUrl':CHAPTER,
'references':['2 Timothy 2:15'],
'originalImage':'/assets/larkin-dividing.gif',
'originalImageUrl':IMAGE,
'editionNote':'Larkin’s chart from Dispensational Truth (enlarged edition, 1920). It is item 8 in the online book’s chart contents and item 22 in the Estate’s individual-chart catalogue. The drawing numbers the Perfect Age as 8; chapter V separately describes seven probationary tests before the new heaven and new earth.',
'description':'An interactive study of Larkin’s main chart. The modern view preserves the eight numbered labels visible in the drawing, its unnumbered judgment interval, its creation context, and its distinction between the Perfect Age and the Omega ages. This is Larkin’s historical interpretive scheme; summaries describe his source rather than substitute a harmonized chronology.',
'periods':[
period('original-earth',None,'The Original Earth','Original earth','Dateless past','The chaotic earth',
'Larkin places the original creation before the six days of restoration. His diagram associates the original earth with the “Creative Ages” and with the earlier part of the Satan narrative.',
'This creation was in the dateless past.',
['Genesis 1:1','2 Peter 3:5-6','Isaiah 14:13-14'],
[('Chart labels','Generation; Creation of the Earth; “The World That Then Was”; Alpha — “Creative Ages”.'),
 ('Chronology','No calendar date or numerical duration is given for the original earth.'),
 ('Interpretation','The pre-Adamite earth and creation/restoration distinction are Larkin’s interpretation, retained as such.')],
'Chart: far-left creation group; chapter V, I.1, “The Original or Pre-Adamite Earth”.','context'),
period('chaotic-earth',None,'The Chaotic Earth','Chaotic earth','The original earth made waste','Restoration of the earth',
'Larkin reads Genesis 1:2 as a catastrophic condition following an earlier creation. The chart distinguishes this chaotic earth from both the original and restored earth. His explanatory prose presents the connection with Satan’s rebellion as an interpretation, using qualifying language.',
'What caused the earth to become a "Waste" after its original creation is not clearly revealed.',
['Genesis 1:2','Isaiah 45:18','2 Peter 3:5-6'],
[('Source distinction','The diagram shows a separate darkened earth labelled “The Chaotic Earth”.'),
 ('Duration','The chapter says neither the preceding interval nor the duration of the chaotic condition is known.'),
 ('Translation note','The chapter quotes Isaiah 45:18 with an explicit R.V. marker. The app’s Scripture reader supplies KJV separately.')],
'Chart: second earth image; chapter V, I.2, “The Chaotic Earth”.','context'),
period('restored-earth',None,'The Restored Earth','Restored earth','The creative week','The restored earth and humanity',
'The third earth image contains the seven-day “Creative Week”. Larkin treats these days as restoration following the chaotic earth. This contextual panel is not an additional numbered dispensation.',
'THE SEVEN DAYS OF THE RESTORATION WORK',
['Genesis 1:3-31','Genesis 2:1-3'],
[('Days 1–3, chart labels','Cosmic Light; Firmament; Dry Land and Vegetation.'),
 ('Days 4–7, chart labels','Solar Light; Fish and Fowl; Land Animals and Man; Sabbath.'),
 ('Chart reference','The drawing gives Genesis 1:3–2:3; the reader splits this cross-chapter range into Genesis 1:3–31 and 2:1–3.'),
 ('Relationship to Eden','The restoration group supplies the creation context for the Edenic period; no additional duration is implied by its display as a panel.')],
'Chart: “The Creative Week”, “The Present Earth”, and “The Restored Earth”; chapter V, I.3.','context'),
period('edenic','1','Edenic Dispensation','Innocence','Creation of Adam','Expulsion from the Garden',
'Larkin’s first numbered dispensation is the condition of innocence in Eden. The Fall and expulsion close it. The explanatory chapter gives no known duration.',
'This Dispensation extends from the creation of Adam to the Expulsion from the Garden.',
['Genesis 2:23','Genesis 3:21','Revelation 21:3','John 3:18'],
[('Source keyword','Innocence.'),('Closing labels','The Fall; The Expulsion.'),
 ('Duration','“As to its duration we know nothing” is Larkin’s explicit statement.'),
 ('Reference scope','These reading references are cited in the explanatory Edenic section; they are not all printed inside the small Edenic circle.')],
'Chart: numbered Edenic circle; chapter V, II.1, “The Edenic Dispensation”.'),
period('antediluvian','2','Antediluvian Dispensation','Conscience','The Fall','The Flood',
'The chart contrasts the line of Seth and the line of Cain, shows Enoch, and ends with the Flood. Larkin calls this the dispensation of Conscience and prints a duration of 1656 years.',
'This Dispensation extends from the "Fall" to the "Flood."',
['Genesis 5:22-24','Genesis 6:2-4','Romans 2:15','2 Peter 2:4','Jude 1:6'],
[('Source keyword','Conscience.'),('Printed duration','1656 years; reproduced as Larkin’s chronology.'),
 ('Chart branches','Line of Seth; Line of Cain; Enoch; Flood; “The Wicked Antediluvians”; “Sons of God or Fallen Angels”.'),
 ('Source interpretation','The explanatory chapter identifies the “sons of God” in Genesis 6 with angels. This is preserved as Larkin’s reading, not silently changed to a Sethite-line interpretation.')],
'Chart: period 2 and its downward branches; chapter V, II.2, “The Antediluvian Dispensation”.'),
period('postdiluvian','3','Postdiluvian Dispensation','Human government','The Flood','Call of Abraham',
'Larkin depicts Babel inside the post-Flood period of Human Government. His prose places the dispersion about 325 years after the Flood and says this dispensation lasted 102 years longer, for a total of 427 years.',
'This was the Dispensation of "Human Government."',
['Genesis 8:20-22','Genesis 11:1-3','Genesis 10:8-10','Genesis 10:25','Acts 2:4'],
[('Source keyword','Human Government.'),('Printed duration','427 years; retained without recalculation.'),
 ('Babel is internal','Babel is shown within the circle; it is not substituted for the entire duration’s ending boundary.'),
 ('Reference scope','The chapter cites Genesis 11:1–3 in this account; the chart’s Babel image itself has no printed verse range.')],
'Chart: period 3, Babel; chapter V, III.1, “The Post-Diluvian Dispensation”.'),
period('patriarchal','4','Patriarchal Dispensation','Family','Call of Abraham','The Exodus',
'Larkin’s fourth numbered dispensation is called Family in this chart. Its illustrations show Abraham and Egypt, followed by the Exodus. The chapter gives its extent as the call of Abraham to the Exodus.',
'This Dispensation extended from the "Call of Abraham" to the "Exodus," a period of 430 years, and is known as the Dispensation of "The Family."',
['Genesis 12:1-3'],
[('Source keyword','Family; chapter wording: “The Family”. This is not relabelled “Promise” in the faithful-source view.'),
 ('Printed duration','430 years; Larkin’s own label.'),
 ('Closing condition','Egyptian bondage is the failure described in the chapter; the Exodus begins the next dispensation.'),
 ('Reference scope','Genesis 12:1–3 is cited in chapter V’s introductory account of Abraham; no verse reference is printed inside this small chart circle.')],
'Chart: period 4, Abraham and Egypt; chapter V, III.2, “The Patriarchal Dispensation”.'),
period('legal','5','Legal Dispensation','Law','The Exodus','Christ / First Advent',
'The fifth circle is labelled Law and “Moses to Christ”. It includes Sinai, Israel, the nations, the Assyrian and Babylonian captivities, and the prophetic weeks. The source is not uniform about the precise closing endpoint: the chapter first names Christ’s birth, later describes the crucifixion as its close, while the diagram places the First Advent at the Cross.',
'This Dispensation extended from the "Exodus" to the "Birth Of Christ," a period of 1491(? ) years, and is known as the Dispensation of the "Law."',
['Acts 13:20','Daniel 9:24-27','Luke 21:24'],
[('Source keyword','Law; “Moses to Christ”.'),
 ('Chapter’s duration','1491(? ) years in the online transcription. The uncertainty mark is retained; no corrected modern date is asserted.'),
 ('Printed chronology','The diagram labels B.C. 606 for the beginning of the Times of the Gentiles, and B.C. 445 / A.D. 30 around the 69 Weeks.'),
 ('Distinct lines','The “Times of the Gentiles” line continues beyond this dispensation, through the Church period, to the Revelation. It is not identical with the “Fulness of the Gentiles”.')],
'Chart: period 5, the 69 Weeks and Times of the Gentiles; chapter V, III.3, “The Legal Dispensation”.'),
period('ecclesiastical','6','Ecclesiastical Dispensation','Grace','Descent of the Holy Spirit','Rapture of the Church',
'The sixth dispensation is Grace. The chapter distinguishes Christ’s “Cross to Crown” work from the believer’s interval between the descent of the Holy Spirit and the Church’s rapture. The diagram separates the Church, the Jews scattered among the nations, and the nations, while drawing the priesthood of Christ above.',
'This "New Body" is not under LAW but GRACE.',
['Matthew 16:18','Ephesians 3:3-5','Ephesians 3:9','1 Corinthians 12:12-13','Romans 11:25','Romans 6:14','Matthew 13:10-50'],
[('Source keyword','Grace.'),
 ('Chart imagery','“Mystery Form of the Kingdom”; the Pearl / Church; the Hid Treasure; Jews scattered among the nations; emblem of the nations.'),
 ('Two Gentile labels','“Fulness of the Gentiles” is within this period. “Times of the Gentiles”, with Luke 21:24, is the longer line beneath it.'),
 ('Heavenly branch','Ascension of Christ; Priesthood of Christ; Paradise above, described as the location of the righteous dead since Christ’s resurrection.'),
 ('Duration','No calculated end date is supplied for the Church’s rapture.')],
'Chart: period 6 and upper ascension/priesthood branch; chapter V, III.4, “The Ecclesiastical Dispensation”.'),
period('judgment-interval',None,"Daniel’s Seventieth Week",'Judgment interval','The Rapture','The Revelation',
'Between the Church period and the Messianic period, the chart depicts Daniel’s Seventieth Week and the two stages of the Second Advent. Larkin’s chapter calls the intervening period the unnumbered “Dispensation of Judgment”. It contains judgment of believers for works above, the Jews under Antichrist on earth, and the nations at its close.',
'DISPENSATION OF JUDGMENT',
['Daniel 9:27','2 Corinthians 5:10','Jeremiah 30:4-6','Daniel 12:1','Matthew 25:31-33','Revelation 12:7-12'],
[('Numbering','An unnumbered interval in the chart. It is not assigned the number 7 or 8.'),
 ('Second Advent','The Rapture and the Revelation are distinguished; “Second Advent” spans both.'),
 ('Judgments','No. 2: Believers for Works. No. 3: The Jews. No. 4: The Nations.'),
 ('Other chart labels','Christ meeting His Church; the Judgment Seat of Christ; the Marriage Feast; War in Heaven / Dragon Cast Out; Antichrist.'),
 ('Citation fidelity','The chapter prints Jeremiah 30:4–6 for the Time of Jacob’s Trouble; that printed range is retained. The named phrase occurs in the following verse, 30:7.')],
'Chart: interval between periods 6 and 7; chapter V, “Dispensation of Judgment”.','interval'),
period('messianic','7','Messianic Dispensation','Messianic kingdom','The Revelation of Christ','End of the millennium',
'The seventh numbered dispensation lies inside the Millennial Age. The drawing labels 1000 years, Israel as the head of the nations, the Gentile nations in blessing, and the millennial earth. The chapter names Righteousness as the governing principle and explains the final rebellion after Satan is loosed.',
'The Government will be based on "Righteousness."',
['Revelation 20:1-3','Revelation 20:7-9','Deuteronomy 28:13','Isaiah 35:1-2','Jeremiah 31:31-33','Hebrews 8:7-9','Psalm 2:9'],
[('Printed duration','1000 years.'),
 ('Chart labels','Israel the “Head” of the Nations; Gentile Nations in Blessing; The Millennial Earth.'),
 ('Source principle','Righteousness is named in the explanatory chapter; it is not substituted for the chart’s Messianic Dispensation title.'),
 ('Final transition','Satan loosed; final rebellion; the Great White Throne and renovation of the earth by fire appear at the transition to the Perfect Age.')],
'Chart: period 7 within Millennial Age; chapter V, IV.1, “The Millennial Age”.'),
period('fulness','8','Dispensation of the Fulness of Times','Fulness of times','New Heaven and New Earth','Surrender of the perfect kingdom to the Father',
'The drawing explicitly numbers this dispensation 8 inside the Perfect Age. It follows the renovation by fire and depicts the New Earth and New Jerusalem. Larkin treats the Millennial and Perfect kingdoms together as the Kingdom of the Son of Man, before the “God all and in all” boundary and Omega ages.',
'This "Perfect Kingdom" is also a Dispensation, the "Dispensation of the Fulness of Times."',
['Ephesians 1:10','2 Peter 3:13','Isaiah 65:17','Revelation 21:1','Revelation 21:24','1 Corinthians 15:24-28'],
[('Printed number','8. This number is visible in the original drawing.'),
 ('Source labels','Perfect Age; Dispensation of the Fulness of Times; The New Earth; “The Nations of Them Which Are Saved Shall Walk in the Light of It”.'),
 ('New Jerusalem','The city appears above the earth and again in the Perfect Age portion of the drawing.'),
 ('Boundary','The source places the surrender of the perfect kingdom to the Father after this age. The app retains that distinction rather than combining it with Omega.')],
'Chart: period 8 inside Perfect Age; chapter V, IV.2, “The Perfect Age”.'),
period('omega',None,'Ages of the Ages','Omega / eternity','God all and in all','Eternity',
'Beyond the Perfect Age, Larkin labels Omega and “Ages of the Ages”. His prose says that the surrender of the perfect kingdom to the Father marks the end of what he calls Time and the beginning of these eternal ages.',
'As the "Creative Ages" were the "Alpha" Ages, these will be the "Omega" Ages.',
['1 Corinthians 15:24-28','Ephesians 2:7','Revelation 20:10'],
[('Exact boundary label','“God All And In All” — 1 Corinthians 15:24–28, as printed on the chart.'),
 ('Not a ninth dispensation','The Omega ages are not given a ninth number in the drawing.'),
 ('Time scale','No numerical length or proposed future calendar date is supplied.')],
'Chart: far-right Omega boundary; chapter V, V, “The Ages of the Ages”.','eternity')
],
'events':[],
'ages':[
{'title':'Alpha — Creative Ages','startPeriod':'original-earth','endPeriod':'restored-earth'},
{'title':'1 · Antediluvian Age','startPeriod':'edenic','endPeriod':'antediluvian'},
{'title':'2 · The Present Age','startPeriod':'postdiluvian','endPeriod':'judgment-interval'},
{'title':'3 · Age of Ages','startPeriod':'messianic','endPeriod':'fulness'},
{'title':'1 · Millennial Age','startPeriod':'messianic','endPeriod':'messianic','level':2},
{'title':'2 · Perfect Age','startPeriod':'fulness','endPeriod':'fulness','level':2},
{'title':'Omega — Ages of the Ages','startPeriod':'omega','endPeriod':'omega'}
],
'notes':[
{'title':'Eight drawing numbers; seven probationary tests','text':'The chapter initially describes three ages and seven dispensations “in Time”, but the drawing visibly numbers the Fulness of Times as 8. Later prose calls the Perfect Kingdom a dispensation. The modern chart retains the actual eight diagram numbers and keeps the unnumbered judgment interval distinct.', 'sourceUrl':CHAPTER},
{'title':'The source has two Antediluvian Age descriptions','text':'The introductory list defines the Antediluvian Age from the Fall to the Flood. The detailed section II says restoration of the earth to the Flood, and the drawing’s age arc includes the Edenic circle. The overview follows the drawing, while this note preserves the textual difference.', 'sourceUrl':CHAPTER},
{'title':'The Legal Dispensation endpoint is not uniform','text':'Section III.3 first says Exodus to Birth of Christ, “1491(? ) years”, then closes its account at the crucifixion. The diagram says “Moses to Christ” and puts First Advent at the Cross. No unmarked correction or single definitive end date has been imposed.', 'sourceUrl':CHAPTER},
{'title':'Larkin’s printed chronology','text':'1656 years, 427 years, 430 years, 1000 years, B.C. 606, B.C. 445, and A.D. 30 are retained as historical labels from Larkin’s drawing. Equal visual widths are for navigation and do not represent proportional duration. The app does not calculate a date for the Rapture or Second Advent.', 'sourceUrl':IMAGE},
{'title':'Generation, Degeneration, Regeneration','text':'The large outer bands read Generation over the creation group, Degeneration over the fallen course of history, and Regeneration over the future ages. The upper brackets distinguish “The World That Then Was”, “The Heavens and Earth Which Are Now”, and the expected new heavens and new earth.', 'sourceUrl':IMAGE},
{'title':'The five judgments remain distinct','text':'No. 1 is believers for sin, at the Cross. No. 2 is believers for works, at the Judgment Seat of Christ. No. 3 is the Jews under Antichrist. No. 4 is the nations at the Revelation. No. 5 is the wicked at the Great White Throne. These labels describe Larkin’s drawing and are not merged into one judgment.', 'sourceUrl':IMAGE},
{'title':'The upper and lower branches are part of the original','text':'The original-image view preserves the complete drawing, including Christ’s priesthood, the two Paradise labels, the Grave, Hell, the Great Gulf, Tartarus, the Abyss / Bottomless Pit, and the Lake of Fire. The modern chronological panels summarize the eras; they do not replace the original’s spatial underworld diagram.', 'sourceUrl':IMAGE},
{'title':'Satan’s path in the drawing','text':'Larkin shows Satan as the anointed cherub, then deposed and associated with the powers of the air and the “trail of the serpent”; a later war in heaven casts the dragon out. Binding, release, and the final Lake of Fire destination are distinct later events. The chapter qualifies aspects of the pre-Adamite reconstruction rather than supplying a dated historical proof.', 'sourceUrl':CHAPTER},
{'title':'KJV reader and original quotations','text':'The Scripture reader uses the KJV. The source chapter and a chart reference also explicitly mark some material R.V.; original author excerpts are preserved rather than silently rewritten and labelled KJV. References in study panels come from the chart or its explanatory chapter; their locations are stated.', 'sourceUrl':CHAPTER},
{'title':'Scope of the source transcription','text':'Original text is the chapter V transcription from PreservedWords, with HTML and layout whitespace removed. OCR and typographical quirks are retained. The unaltered original chart is the reference for its graphical labels. No claim is made that an OCR transcription is a diplomatic transcription of every printed character.', 'sourceUrl':CHAPTER}
],
'sourceUrls':[
{'title':'Original chart image · unaltered scan','url':IMAGE},
{'title':'Larkin’s own explanation · Dispensational Truth, chapter V','url':CHAPTER},
{'title':'Original chart catalogue · Clarence Larkin Estate, item 22','url':CATALOG},
{'title':'1920 chart identification · Yale MAVCOR','url':YALE},
{'title':'Book contents · chart item 8','url':'https://preservedwords.com/disptruth/contents.html'}
],
'sourceText':text,
'sourceTextLabel':'Clarence Larkin · Dispensational Truth · Chapter V · online transcription',
'sourceImageMetadata':{
'url':IMAGE,'width':2018,'height':908,
'sha256':hashlib.sha256((ROOT/'dist/assets/larkin-dividing.gif').read_bytes()).hexdigest(),
'unaltered':True,'visualInspection':'Full image and enlarged left/centre/right crops examined.'
},
'unverified':[]
}

def event(id,title,after,summary,refs,where,during=None):
    e=dict(id=id,title=title,afterPeriod=after,summary=summary,references=refs,sourceLocation=where)
    if during: e['duringPeriod']=during
    d['events'].append(e)

event('fall-expulsion','The Fall and the Expulsion','edenic','The chart closes Innocence with the Fall and the Expulsion from Eden.',['Genesis 3:21'],'Chart: Edenic circle and its right boundary; chapter V, II.1.')
event('enoch','Enoch','antediluvian','Enoch is shown ascending from the line of Seth within the Antediluvian Dispensation.',['Genesis 5:22-24'],'Chart: period 2; chapter V, II.2.','antediluvian')
event('flood','The Flood','antediluvian','The Flood separates the Antediluvian and Postdiluvian dispensations.',['Genesis 7:11'],'Chart: ark between periods 2 and 3; chapter V, ages discussion.')
event('babel','Babel','postdiluvian','Babel lies within the Human Government period. The chapter places dispersion about 325 years after the Flood and leaves a further 102 years in the dispensation.',['Genesis 11:1-3','Genesis 10:25'],'Chart: period 3; chapter V, III.1.','postdiluvian')
event('call-abraham','Call of Abraham','postdiluvian','The chapter starts the Patriarchal or Family dispensation at the call of Abraham.',['Genesis 12:1-3'],'Chart: Abraham at period 4; chapter V, introduction and III.2.')
event('exodus','The Exodus','patriarchal','The Exodus separates the Patriarchal and Legal dispensations in the source explanation. The diagram carries the nations along a lower line; it gives no direct verse citation at the Exodus label.',[],'Chart: boundary of periods 4 and 5; chapter V, III.3.')
event('first-advent','First Advent · Judgment No. 1','legal','The Cross is labelled “Judgment No. 1 — Believers for Sin”. This is separate from the later judgment of believers for works. The main chart gives no direct verse citation at this label.',[],'Chart: Cross and First Advent.')
event('ascension-priesthood','Ascension and priesthood of Christ','legal','The upward branch leads to the Priesthood of Christ; the downward branch is the Descent of the Holy Spirit. Paradise above is distinguished from the earlier Paradise in the lower diagram.',['Mark 16:19','Romans 8:34','Hebrews 4:14-16','Ephesians 4:8-10','2 Corinthians 12:1-4'],'Chart: upper branches over First Advent and period 6.')
event('rapture','The Rapture','ecclesiastical','Christ meets His Church; the chart distinguishes translated saints and the first resurrection of saints. The Rapture is the first stage of the Second Advent, followed by the interval before the Revelation.',['1 Thessalonians 4:14-18'],'Chart: upward Rapture branch at the end of period 6.')
event('judgment-seat','Judgment No. 2 · Believers for works','judgment-interval','The heavenly branch names the Judgment Seat of Christ and judgment of believers for works.',['2 Corinthians 5:10','Romans 14:10','1 Corinthians 3:14-15'],'Chart: top of the interval between periods 6 and 7.','judgment-interval')
event('marriage-feast','The Marriage Feast','judgment-interval','The Marriage Feast is on the heavenly branch before Christ’s Revelation with His saints.',['Revelation 19:7-9'],'Chart: upper heavenly branch beside Judgment No. 2.','judgment-interval')
event('war-heaven','War in Heaven · Dragon Cast Out','judgment-interval','The original distinguishes this casting out from Satan’s earlier deposing and later binding.',['Revelation 12:7-12'],'Chart: upper interval beneath the Judgment Seat.','judgment-interval')
event('judgment-jews','Judgment No. 3 · The Jews','judgment-interval','Antichrist stands above the judgment of the Jews during the interval. The chapter describes it as the Time of Jacob’s Trouble.',['Jeremiah 30:4-6','Daniel 12:1'],'Chart: interval under Antichrist; chapter V, Dispensation of Judgment.','judgment-interval')
event('revelation-nations','The Revelation · Judgment No. 4','judgment-interval','Christ returns with His saints. The judgment of the nations introduces the Messianic period.',['Matthew 25:31-33','Zechariah 14:4'],'Chart: descending Revelation line and Judgment No. 4; chapter V, Dispensation of Judgment.')
event('satan-bound','Satan Bound','judgment-interval','The chart’s Satan Bound line leads into the Bottomless Pit and the millennium. The beast and false prophet have a separate line to the Lake of Fire.',['Revelation 20:1-3','Revelation 19:20'],'Chart: lower branch at the Revelation and beginning of period 7.')
event('satan-loosed','Satan Loosed','messianic','The source depicts Satan’s release and final rebellion at the close of the millennium.',['Revelation 20:7-9','Revelation 20:10'],'Chart: end of period 7 and lower Lake of Fire branch.')
event('great-white-throne','Great White Throne · Judgment No. 5','messianic','The Great White Throne judges the wicked; the chart also shows the second resurrection, opened books, and the Lake of Fire. Renovation of the earth by fire is drawn at this transition to the Perfect Age.',['Revelation 20:11-15','2 Peter 3:7-13'],'Chart: upper and lower branches at the fire between periods 7 and 8.')
event('god-all','God All And In All','fulness','Larkin places the surrender of the perfect kingdom to the Father at the boundary between the Perfect Age and the Omega ages.',['1 Corinthians 15:24-28'],'Chart: far-right vertical boundary; chapter V, IV.2 and V.')

exec((ROOT/'research/larkin-dividing-additions.py').read_text(), globals())

# Verified source-derived headings and event relationships.
assert [x['number'] for x in d['periods'] if x['number']] == ['1','2','3','4','5','6','7','8']
assert len({x['id'] for x in d['periods']})==len(d['periods'])
period_ids={x['id'] for x in d['periods']}
assert all(x['afterPeriod'] in period_ids for x in d['events'])
assert all(x.get('duringPeriod',x['afterPeriod']) in period_ids for x in d['events'])
assert all(x['startPeriod'] in period_ids and x['endPeriod'] in period_ids for x in d['ages'])
(ROOT/'research/larkin-dividing.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
print(json.dumps({'periods':len(d['periods']),'numbered':8,'events':len(d['events']),'sourceTextChars':len(text),'bytes':(ROOT/'research/larkin-dividing.json').stat().st_size},indent=2))
