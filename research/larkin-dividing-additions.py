# Source-attested relationships and completions from independent review.
# Executed by build-larkin-dividing.py after base data and events are built.

def band(id,title,start,end,summary,refs,details,location,startLabel=None,endLabel=None,**extra):
    b=dict(id=id,title=title,startPeriod=start,endPeriod=end,summary=summary,references=refs,
           details=[{'label':k,'text':v} for k,v in details],sourceLocation=location,sourceUrl=IMAGE)
    if startLabel is not None: b['startLabel']=startLabel
    if endLabel is not None: b['endLabel']=endLabel
    b.update(extra)
    return b

d['parallelBands']=[
 band('generation-band','Generation','original-earth','restored-earth',
      'The original diagram groups the Original, Chaotic, and Restored Earth under its creation imagery and the larger “Generation” heading. This is the creation context, not a further numbered dispensation.',
      ['Genesis 2:4'],
      [('Source geometry','A large arc encloses the three earth images and the Creative Week.'),
       ('Source context','Alpha / Creative Ages sits at the left; no numerical duration is given.')],
      'Chart: far-left “Generation” arc, with Genesis 2:4 printed beneath the heading.'),
 band('degeneration-band','Degeneration','edenic','judgment-interval',
      'The chart’s Degeneration band runs over the fallen course of history toward the Revelation. It is a separate large-scale heading, not the name of an extra dispensation.',
      [],[('Reading the band','The Fall starts the downward course; the main drawing’s larger framework is Generation, Degeneration, Regeneration.')],
      'Chart: large central Degeneration band.',startLabel='The Fall in the Edenic period',endLabel='The Revelation',startWithinPeriod=True),
 band('regeneration-band','Regeneration','messianic','fulness',
      'Regeneration is the large arc over the Millennial and Perfect ages. The source associates the new future order with this label, while retaining its two different ages and the renovation by fire between them.',
      ['Matthew 19:28'],[('Source geometry','The Regeneration heading encloses the Age of Ages group.'),
      ('Separate stages','Millennial Age, renovation by fire, and Perfect Age are not collapsed into one dispensation.')],
      'Chart: right-hand Regeneration heading and its printed Matthew 19:28 reference.'),
 band('times-gentiles','Times of the Gentiles','legal','judgment-interval',
      'Larkin draws this line from B.C. 606 inside the Legal Dispensation, across the Church period, to the Revelation. It must not be moved to the beginning of Law or equated with the “Fulness of the Gentiles”.',
      ['Luke 21:24'],[('Exact opening label','B.C. 606, inside the Legal Dispensation.'),
      ('Exact closing boundary','The Revelation, at the end of the judgment interval.'),
      ('Historical chronology','B.C. 606 is Larkin’s printed date; the app does not replace it with another chronology.')],
      'Chart: long lower horizontal line, “The Times of the Gentiles”, Luke 21:24.',
      startLabel='B.C. 606 · within the Legal Dispensation',endLabel='The Revelation',startWithinPeriod=True),
 band('fulness-gentiles','Fulness of the Gentiles','ecclesiastical','ecclesiastical',
      'This label runs across the Ecclesiastical Dispensation. Larkin’s explanation connects it with the gathering of the Church and Romans 11:25. It is distinct from the longer Times of the Gentiles line beneath it.',
      ['Romans 11:25'],[('Exact chart label','“Fulness of the Gentiles”.'),
      ('Source citation','Romans 11:25 is cited in the explanatory Ecclesiastical section, rather than printed on this particular horizontal label.')],
      'Chart: horizontal centre of period 6; chapter V, III.4.',
      startLabel='The Ecclesiastical Dispensation',endLabel='The Rapture'),
 band('priesthood-christ','Priesthood of Christ','ecclesiastical','ecclesiastical',
      'Above the Church period, the Ascension of Christ leads to the Priesthood of Christ. The Descent of the Holy Spirit is a distinct downward branch. The band here identifies that parallel heavenly ministry; it does not impose a date for the cessation of Christ’s priesthood.',
      ['Mark 16:19','Romans 8:34','Hebrews 4:14-16'],
      [('Original placement','Above the First Advent and Ecclesiastical Dispensation.'),
       ('Source distinction','Ascension of Christ and Descent of the Holy Spirit are separate arrows.')],
      'Chart: upper arch “Priesthood of Christ”.',startLabel='Ascension of Christ',endLabel='Heavenly ministry above the Church period'),
 band('second-advent-span','Second Advent','judgment-interval','judgment-interval',
      'The chart uses Second Advent for a span with two stages: the Rapture and the Revelation. Between them are the heavenly judgment and marriage imagery and the earthly Antichrist and judgment imagery.',
      ['1 Thessalonians 4:14-18','Zechariah 14:4'],
      [('First stage','The Rapture: Christ meets His Church.'),('Second stage','The Revelation: Christ comes with His saints.'),
       ('Between the stages','Daniel’s Seventieth Week is drawn underneath.')],
      'Chart: “Second Advent” horizontal label and the adjacent upward/downward branches.',
      startLabel='The Rapture',endLabel='The Revelation'),
 band('kingdom-son-of-man','Kingdom of the Son of Man','messianic','fulness',
      'Larkin’s Kingdom of the Son of Man arc spans both the Millennial and Perfect ages. His chapter explicitly says that the Millennial Kingdom and the Perfect Kingdom together make up that kingdom.',
      ['1 Corinthians 15:24-28'],
      [('Includes','Millennial Age and Perfect Age.'),
       ('Distinct from Omega','The surrender to the Father and “God All And In All” boundary lead to the Omega ages beyond.')],
      'Chart: arc above the two future ages; chapter V, IV.2.'),
 band('paradise-branches','The two Paradise labels',None,None,
      'The chart places an earlier Paradise below the earthly line and a later Paradise above it. Its lower caption calls the former abode of the righteous dead now empty following Christ’s resurrection; its upper caption locates the souls of the righteous dead above since that resurrection.',
      ['Ephesians 4:8-10','Revelation 1:18','2 Corinthians 12:1-4'],
      [('Lower source label','Paradise: abode of the souls of the righteous dead until Christ’s resurrection; “is now empty”.'),
       ('Upper source label','Paradise: where the souls of the righteous dead are since Christ’s resurrection.'),
       ('Relationship type','This is a spatial and resurrection relationship in the drawing, not an independently dated era.')],
      'Chart: upper Paradise cloud and lower Paradise compartment.',spatial=True),
 band('underworld-relationships','The Underworld and resurrection routes',None,None,
      'The lower source diagram distinguishes the Grave, Paradise, Hell, the Great Gulf, Tartarus, the Abyss / Bottomless Pit, and the Lake of Fire. Its branches represent different routes and judgments; these locations are not combined into one chronological period.',
      ['2 Peter 2:4','Jude 1:6','Matthew 25:41','Revelation 19:20','Revelation 20:10','Revelation 20:14-15'],
      [('The Grave','Shown separately from the soul’s abode, with resurrection routes rising from it.'),
       ('Paradise, Hell, and Great Gulf','Distinct compartments and separation in Larkin’s underworld illustration.'),
       ('Tartarus','Labelled Prison of the Fallen Angels, with 2 Peter 2:4 and Jude 6.'),
       ('Abyss / Bottomless Pit','Connected to Satan’s binding and release.'),
       ('Lake of Fire','The beast and false prophet, Satan, and the wicked are depicted with distinct entry routes and times.'),
       ('Source completeness','Use Original chart to examine every arrow and small label; this relationship panel is a textual guide to the spatial drawing.')],
      'Chart: the complete lower Underworld diagram.',spatial=True)
]

# Keep the words marking the resurrection phases visible in the modern event descriptions.
for e in d['events']:
    if e['id']=='rapture':
        e['summary']='Christ meets His Church; the chart distinguishes translated saints and the first resurrection of saints. This branch is labelled “Harvest”, distinct from the earlier “First Fruits” and later “Gleanings”. The Rapture is the first stage of the Second Advent, followed by the interval before the Revelation.'
    if e['id']=='great-white-throne':
        e['summary']='The Great White Throne judges the wicked; the chart also shows “Tares”, the Second Resurrection, opened books, and the Lake of Fire. Renovation of the earth by fire is drawn at this transition to the Perfect Age.'

event('elijah','Elijah','legal','The drawing shows Elijah ascending within the Legal Dispensation. No date or verse citation is attached to this small figure on the main plate.',[],
      'Chart: upward Elijah branch inside period 5.','legal')
event('resurrection-firstfruits','Resurrection of Christ · First Fruits','legal',
      'Near the First Advent, the diagram labels the Resurrection of Christ and a First Fruits resurrection branch. The accompanying chapter connects the firstfruits typology with Christ’s resurrection using 1 Corinthians 15:20. This label is distinct from the later Harvest and Gleanings.',
      ['1 Corinthians 15:20','Leviticus 23:10-11'],
      'Chart: resurrection branches at the First Advent; chapter V, discussion of the first day of the week after the Sabbath.')
event('tribulation-gleanings','Tribulation Saints · Gleanings','judgment-interval',
      'At the Revelation boundary, the chart labels a First Resurrection branch for the Tribulation Saints, with “Gleanings” at its foot. This is separate from the Harvest at the Rapture. No new verse citation is assigned to this branch in the modern data.',[],
      'Chart: upward Tribulation Saints branch immediately beside the downward Revelation line.')

# Group events in source reading order without suggesting separate dates within a shared boundary.
order=['fall-expulsion','enoch','flood','babel','call-abraham','exodus','elijah','first-advent','resurrection-firstfruits','ascension-priesthood','rapture','judgment-seat','marriage-feast','war-heaven','judgment-jews','revelation-nations','tribulation-gleanings','satan-bound','satan-loosed','great-white-throne','god-all']
assert set(order)=={e['id'] for e in d['events']}
d['events'].sort(key=lambda e:order.index(e['id']))

for p in d['periods']:
    if p['id']=='ecclesiastical':
        p['referenceProvenance']='References are printed on the plate or in chapter V, III.4. The online chapter prints “I Cor. 12-12-13”; this punctuation is normalized to 1 Corinthians 12:12–13 for the KJV reader without changing its chapter or verse numbers.'

d['notes'].insert(2,{'title':'The source also varies its Present Age endpoint',
  'text':'The drawing and section III extend the Present Age to the Revelation. The opening of section IV instead says the Present Age is to end by the Rapture, followed by the Great Tribulation, before the Age of Ages is ushered in at the Revelation. The modern age span follows the drawing and preserves this difference in the source notes.',
  'sourceUrl':CHAPTER})
d['notes'].append({'title':'First Fruits, Harvest, Gleanings, and Tares',
  'text':'The source drawing’s resurrection vocabulary is retained: First Fruits near the First Advent, Harvest at the Rapture, Gleanings for Tribulation Saints at the Revelation, and Tares beside the Second Resurrection and Great White Throne. The First Resurrection is not treated as one undifferentiated moment in this source.',
  'sourceUrl':IMAGE})
