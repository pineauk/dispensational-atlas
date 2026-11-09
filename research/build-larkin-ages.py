import json
from pathlib import Path

ROOT = Path('/workspace/sites/dispensational-atlas')
CHAPTER = 'https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/RightlyDividingTheWord02.html'
PDF = 'https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/LarkinRightlyDividingTheWord.pdf'
PLATE = 'https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/Images/04AgesAndDispensations.gif'
ESTATE = 'https://www.larkinestate.com/charts.html'

def period(id, number, title, short, start, end, summary, quote, refs, details, location, kind='dispensation', **extra):
    return dict(id=id, number=number, title=title, shortTitle=short, start=start, end=end,
                summary=summary, sourceExcerpt=quote, references=refs,
                details=[dict(label=k,text=v) for k,v in details], sourceLocation=location,
                sourceUrl=PDF, kind=kind, **extra)

def event(id, title, after, summary, refs, location, **extra):
    return dict(id=id,title=title,afterPeriod=after,summary=summary,references=refs,
                sourceLocation=location,sourceUrl=PDF,**extra)

data = {
  'id':'larkin-ages',
  'title':'Ages and Dispensations',
  'subtitle':'Eight dispensations, three ages, and time between the eternities',
  'author':'Clarence Larkin',
  'sourceTitle':'Rightly Dividing the Word (1921), chart on printed page 6 and chapter II, pages 7–28',
  'sourceUrl':PDF+'#page=21',
  'originalImage':'/assets/larkin-ages-original.gif',
  'alternateOriginalImage':'/assets/larkin-ages.gif',
  'editionNote':'The modern view follows the 1921 book plate, which numbers eight dispensations, and matches the Clarence Larkin Estate’s Chart #108 preview. The smaller PreservedWords reproduction linked earlier omits the printed 8 and labels period 3 “Post Flood”; both reproductions remain available. Numbering and labels here follow the book plate.',
  'description':'Larkin arranges eight dispensations inside three ages and distinguishes the Rapture from the Revelation. His unnumbered judgment interval and the Alpha and Omega eternities are retained separately. The arrangement is a study of his historical interpretation; widths do not measure elapsed time.',
  'periods':[
    period('alpha',None,'ALPHA OR “CREATIVE AGES”','Creative Ages','Before the chart’s “Time”','Beginning of the Antediluvian Age',
      'The chart places the Alpha or Creative Ages in eternity before its Time envelope. In the accompanying chapter, Larkin describes an original creation and a later restoration before Adam.',
      'This creation was in the dateless past.',
      ['Genesis 1:1','Genesis 1:2','Genesis 1:3-31','2 Peter 3:5-7'],
      [('Chart position','Left of “Time between the Eternities”; unnumbered.'),('Interpretive distinction','Larkin’s original creation / chaotic earth / restoration sequence belongs to his exposition. It is not a ninth numbered dispensation.')],
      'Chart, left eternity field; chapter II §I, “The Creative Ages,” printed pages 9–18.',kind='context',referenceBasis='Accompanying chapter II, §I; these citations are not printed in the Alpha field.'),
    period('edenic','1','EDENIC DISPENSATION','Edenic','Creation of Adam','Expulsion from Eden',
      'The Edenic period is the first of the two dispensations in Larkin’s Antediluvian Age. He identifies its governing condition as innocence and leaves its duration unknown.',
      'This Dispensation extends from the creation of Adam to the Expulsion from the Garden.',
      ['Genesis 2:17'],
      [('Administration','Innocence, in the accompanying chapter.'),('Chart labels','Eden; The Fall; Paradise Lost.'),('Duration','Larkin explicitly says its duration is unknown; no duration is assigned here.')],
      'Chart, circle 1; chapter II §II.1, printed page 18.',referenceBasis='Genesis 2:17 is cited in the following paragraph on the transition from innocence to conscience; the Edenic circle itself prints no verse.'),
    period('antediluvian','2','ANTEDILUVIAN DISPENSATION','Antediluvian','The Fall','The Flood',
      'Larkin identifies the interval from the Fall to the Flood with conscience. The original circle contrasts the lines of Seth and Cain, and labels its Adam-to-Noah span as 1,656 years.',
      'This extends from the “Fall” to the “Flood.”',
      ['Genesis 2:17','Acts 17:30'],
      [('Administration','Conscience, in the accompanying chapter.'),('Chart span','“Adam to Noah — 1656 Years.” This is the chart’s historical label, not a newly calculated chronology.'),('Parallel lines','Line of Seth; Line of Cain.'),('Age relationship','The Antediluvian Age contains both the Edenic and Antediluvian dispensations.')],
      'Chart, circle 2; chapter II §II.2, printed pages 18–23.',referenceBasis='Accompanying chapter II, §II.2; the circle itself prints no verse.'),
    period('post-diluvian','3','POST DILUVIAN','Post-Diluvian','Noah after the Flood','Abraham',
      'The chart’s third circle runs from Noah to Abraham. Larkin’s chapter describes human government and treats Babel’s divided languages and scattered peoples as its failure.',
      'This was the “Dispensation of HUMAN GOVERNMENT.”',
      ['Genesis 11:1-9'],
      [('Chart endpoints','Noah to Abraham.'),('Administration','Human government, in the accompanying chapter.'),('Babel','The chapter places the building of Babel 325 years after the Flood; that is Larkin’s historical chronology, not an app calculation.'),('Reproduction difference','The 1921 book plate reads “Post Diluvian”; the smaller earlier-linked reproduction reads “Post Flood.”')],
      'Chart, circle 3; chapter II §III.1, printed page 23.',referenceBasis='Genesis 11:1-9 is cited in chapter II, §III.1.'),
    period('patriarchal','4','PATRIARCHAL','Patriarchal','Call of Abraham','The Exodus / Moses',
      'The chart labels this period Abraham to Moses. The chapter describes Abraham’s family and its eventual bondage in Egypt, giving the interval from Abraham’s call to the Exodus as 430 years.',
      'This Dispensation extended from the “Call of Abraham” to the “Exodus,” a period of 430 years,',
      [],
      [('Chart endpoints','Abraham to Moses.'),('Administration','The family, in the accompanying chapter.'),('Duration in the chapter','430 years from the Call of Abraham to the Exodus; no duration is printed inside this small chart circle.'),('Scripture on this plate','No verse is printed inside the Patriarchal circle or its brief chapter-II paragraph.')],
      'Chart, circle 4; chapter II §III.2, printed pages 23–24.'),
    period('legal','5','LEGAL DISPENSATION','Legal','The Exodus / Moses','Birth of Christ, in chapter II',
      'The chart labels this circle Moses to Christ and 1,491 years. The accompanying chapter specifies the Exodus to Christ’s birth and describes Israel’s law and theocratic government.',
      'This Dispensation extended from the “Exodus” to the “Birth of Christ,”',
      [],
      [('Administration','Law, in the accompanying chapter.'),('Chart span','Moses to Christ — 1491 Years.'),('Exact endpoint','The chapter expressly says “Birth of Christ.” It is not silently changed to the cross or Pentecost.'),('Later observance','Larkin separately says observance of Israel’s civil and ceremonial law ceased at Jerusalem’s destruction in A.D. 70.')],
      'Chart, circle 5; chapter II §III.3, printed page 24.'),
    period('ecclesiastical','6','ECCLESIASTICAL DISPENSATION','Ecclesiastical','Pentecost for the believer; the Cross for Christ','Rapture for the believer; the Crown for Christ',
      'Larkin describes the gathering of the Church under grace. He gives distinct bounds for the believer and for Christ, and the plate itself bears the broader label Christ to Antichrist.',
      'from the “Cross” to the “Crown” for Christ, and from “Pentecost” to the “Rapture of the Church” for the Believer.',
      ['Romans 11:25','Romans 6:14','2 Peter 3:9','Luke 18:8'],
      [('Administration','Grace.'),('Believer’s bounds','Pentecost to the Rapture of the Church.'),('Christ’s bounds','Cross to Crown; kept distinct from the believer’s bounds.'),('Printed chart labels','Christ to Antichrist; Kingdom in Mystery; The Church; Fulness of the Gentiles; Jews Scattered Among the Nations.'),('Parenthesis','Larkin places the gathering of the Church between Israel’s dispersion and restoration.')],
      'Chart, circle 6; chapter II §III.4, printed pages 24–25.',referenceBasis='All four passages are cited in chapter II, §III.4.'),
    period('judgment',None,'THE TRIBULATION','Tribulation','Rapture of the Church','Revelation / return to Olivet',
      'The plate places the Tribulation between the Rapture and Revelation. The chapter calls the intervening parenthesis a Dispensation of Judgment, without adding it to the eight-number list.',
      'Between the “Ecclesiastical” and “Millennial” Dispensations there is another “Parenthetical Dispensation”',
      ['2 Corinthians 5:10','Jeremiah 30:4-7','Daniel 12:1','Matthew 25:31-46'],
      [('Numbering','Unnumbered interval in this plate; do not renumber the Messianic and Fulness-of-Times periods.'),('Church','Caught out at the beginning and judged at the Judgment Seat of Christ.'),('Israel','Larkin associates its judgment under Antichrist with Jacob’s trouble.'),('Nations','Larkin places their judgment at the close of the Tribulation, upon Christ’s return.')],
      'Chart, unnumbered Tribulation circle; chapter II §III, judgment paragraph, printed page 25.',kind='interval',referenceBasis='These passages are explicit in the accompanying judgment paragraph; 2 Corinthians 5:10 is also printed above the plate.'),
    period('messianic','7','MESSIANIC DISPENSATION','Messianic','Second Coming: Revelation','End of the Millennium and the transition by fire',
      'The first part of Larkin’s Age of Ages is also the seventh dispensation: Christ’s thousand-year reign. The chapter describes righteousness as its governing principle and places a final rebellion at its end.',
      'the “Messianic Dispensation” or rule of Christ as King.',
      ['Revelation 20:1-7','Deuteronomy 28:13','Jeremiah 31:31-37','Hebrews 8:7-13','Isaiah 11:1','Isaiah 11:4','Revelation 2:27','Revelation 19:15','Psalms 2:9','Revelation 20:7-10'],
      [('Printed duration','1000 Years.'),('Age relationship','The Millennial Age is the first subdivision of the Age of Ages.'),('Administration','Righteousness, in the accompanying chapter.'),('Closing distinction','Final rebellion, renovation by fire, second resurrection and Great White Throne are kept distinct from the earlier Judgment Seat of Christ.')],
      'Chart, circle 7; chapter II §IV.1, printed pages 27–28.',referenceBasis='All listed passages are cited in chapter II, §IV.1.'),
    period('fulness','8','DISPENSATION OF THE FULNESS OF TIMES','Fulness of Times','After the renovation of the earth by fire','Surrender of the Perfect Kingdom to the Father',
      'Larkin’s Perfect Age has the new heaven and new earth and Paradise restored. In his arrangement it follows the Millennium within the Age of Ages, before the separate Omega eternities.',
      'This “Perfect Kingdom” is also a “Dispensation,”',
      ['1 Corinthians 15:28','Ephesians 1:10'],
      [('Chart numbering','8 is printed on the 1921 book plate and Estate preview; chapter II also explicitly lists it eighth.'),('Printed labels','Perfect Age; New Heaven; New Earth; Paradise Restored.'),('Age relationship','Second subdivision of the Age of Ages; paired with the Millennium in the Kingdom of the Son of Man.'),('Outer eternity','The subsequent Omega “Ages of the Ages” are a separate field in Larkin’s diagram.')],
      'Chart, circle 8; chapter II §IV.2 and §V, printed page 28.',referenceBasis='Both passages are cited in chapter II, §IV.2.'),
    period('omega',None,'OMEGA OR “AGES OF THE AGES”','Ages of the Ages','Surrender of the Perfect Kingdom to the Father','Eternity',
      'Beyond the chart’s Time envelope, Larkin places the Omega or Ages of the Ages. His chapter associates their beginning with the surrender of the Perfect Kingdom to the Father.',
      'what we speak of as “Time” ceases,',
      ['Ephesians 2:7','Revelation 20:10','Revelation 22:5'],
      [('Chart position','Right eternity field, outside the Age of Ages and outside “Time between the Eternities.”'),('Numbering','Unnumbered; it is not an additional numbered dispensation.')],
      'Chart, right eternity field; chapter II §V, printed page 28.',kind='eternity',referenceBasis='All three passages are explicit in chapter II, §V.')
  ],
  'events':[
    event('creation-of-adam','Creation of Adam','alpha','The Edenic dispensation begins with Adam’s creation in Larkin’s chapter.',['Genesis 1:27'],'Chapter II, printed page 18.'),
    event('fall','The Fall · Paradise Lost','edenic','The chart places the Fall at the transition out of Eden, with Paradise Lost below the first circle.',['Genesis 2:17'],'Chart, left-hand transition; chapter II §II.1–2.'),
    event('flood','The Flood','antediluvian','The Flood ends the Antediluvian Age and begins the Present Age in this chart.',['2 Peter 2:4-9'],'Chart, boundary between circles 2 and 3; chapter II §II.2–III.'),
    event('babel','Babel and the scattering','post-diluvian','The chapter describes Babel as the failure of human government. The plate’s Noah-to-Abraham interval still retains Abraham as its endpoint.',['Genesis 11:1-9'],'Chapter II §III.1, printed page 23.',withinPeriod='post-diluvian',placement='during'),
    event('call-abraham','Call of Abraham','post-diluvian','The chart transitions from Noah-to-Abraham to Abraham-to-Moses; the chapter calls the latter’s beginning Abraham’s call.',[],'Chart, circles 3–4; chapter II §III.2, printed page 23.'),
    event('exodus','The Exodus · Moses','patriarchal','The chapter closes the Patriarchal period at the Exodus and begins the Legal period there.',[],'Chapter II §III.2–3, printed pages 23–24.'),
    event('first-coming','First Coming','legal','The plate compresses the First Coming beside the cross. The chapter separately specifies Christ’s birth as the Legal period’s endpoint.',[],'Chart, First Coming and cross; chapter II §III.3–4, printed page 24.'),
    event('resurrection-christ','Resurrection of Christ · First Fruits','legal','The first upward line out of the Grave is labelled Resurrection of Christ and First Fruits.',[],'Chart, lower vertical line beside the cross.'),
    event('ascension','Ascension','legal','The upward line labelled Ascension leads to the Priesthood of Christ above the Church interval.',[],'Chart, upward line above the cross.'),
    event('holy-spirit','Descent of the Holy Spirit','legal','The downward line beside the Ascension marks the Holy Spirit’s descent; the chapter names Pentecost as the believer’s starting point.',[],'Chart, downward line at the Church’s beginning; chapter II §III.4.'),
    event('rapture','Rapture · First Resurrection · Harvest','ecclesiastical','The Rapture precedes the Tribulation. The rising line from the Grave is labelled First Resurrection and Harvest.',['1 Thessalonians 4:15-17'],'Chart, rising lines at the Church’s right boundary.'),
    event('judgment-seat','Judgment Seat of Christ','ecclesiastical','The plate places this judgment above the Rapture/Tribulation interval, distinct from the later Great White Throne.',['2 Corinthians 5:10'],'Chart, upper cloud-shaped judgment; chapter II, printed page 25.',withinPeriod='judgment',placement='during'),
    event('revelation','Revelation · Second Coming · Olivet','judgment','Christ’s second-stage return ends the Present Age and introduces the Age of Ages. It is distinct from the Rapture.',['2 Thessalonians 1:7-10','Zechariah 14:4-10'],'Chart, descending Revelation line and Olivet; chapter II, printed pages 7 and 23.'),
    event('last-rebellion','Closing rebellion','messianic','The chapter places Satan’s release and humanity’s final rebellion at the Millennium’s close.',['Revelation 20:7-10'],'Chapter II §IV.1, printed page 27.'),
    event('renovation-fire','Renovation of the earth by fire','messianic','Larkin places this fiery transition between the Millennial and Perfect Ages.',['2 Peter 3:7-13'],'Chart, fire between circles 7 and 8; chapter II, printed pages 27–28.'),
    event('second-resurrection','Second Resurrection · Tares','messianic','The last rising line from the Grave bears the labels Second Resurrection and Tares and reaches the Great White Throne.',[],'Chart, right-hand line from the Grave.'),
    event('white-throne','Great White Throne Judgment','messianic','This judgment is drawn beyond the Millennium at the transition to the Perfect Age, separate from the Judgment Seat of Christ.',['Revelation 20:11-15'],'Chart, top-right judgment circle.'),
    event('kingdom-surrender','The Kingdom surrendered to the Father','fulness','In Larkin’s chapter, this surrender closes Time and opens the Omega Ages of the Ages.',['1 Corinthians 15:28'],'Chapter II §IV.2–V, printed page 28.')
  ],
  'ages':[
    {'title':'1 · Antediluvian Age','startPeriod':'edenic','endPeriod':'antediluvian'},
    {'title':'2 · The Present Age','startPeriod':'post-diluvian','endPeriod':'judgment'},
    {'title':'3 · Age of Ages','startPeriod':'messianic','endPeriod':'fulness'}
  ],
  'subAges':[
    {'title':'1 · Millennial Age','startPeriod':'messianic','endPeriod':'messianic'},
    {'title':'2 · Perfect Age','startPeriod':'fulness','endPeriod':'fulness'}
  ],
  'parallelBands':[
    {'title':'“Time” between the Eternities','startPeriod':'edenic','endPeriod':'fulness','summary':'The entire bounded central envelope; Alpha and Omega sit outside it.','references':[],'sourceLocation':'Chart, outer Time envelope.'},
    {'title':'The Grave','startPeriod':'antediluvian','endPeriod':'messianic','summary':'The original lower channel starts at the Fall and continues to the Second Resurrection, with earlier upward branches for Christ’s First Fruits and the Harvest.','references':[],'sourceLocation':'Chart, lower channel.'},
    {'title':'Times of the Gentiles','startPeriod':'legal','endPeriod':'judgment','summary':'A distinct line begins within the Legal period at Larkin’s printed “B.C. 606” and ends at the Revelation. This is not identical to the Fulness of the Gentiles.','references':['Luke 21:24'],'sourceLocation':'Chart, horizontal line beneath the Present Age.','startLabel':'B.C. 606 (Larkin’s chart label)','endLabel':'The Revelation'},
    {'title':'Fulness of the Gentiles','startPeriod':'ecclesiastical','endPeriod':'ecclesiastical','summary':'Printed within the Church interval; distinguish it from the longer Times of the Gentiles.','references':['Romans 11:25'],'sourceLocation':'Chart, lower Church band; chapter II §III.4.'},
    {'title':'Kingdom in Mystery','startPeriod':'ecclesiastical','endPeriod':'ecclesiastical','summary':'The original upper band immediately over The Church.','references':[],'sourceLocation':'Chart, upper Church band.'},
    {'title':'Priesthood of Christ','startPeriod':'ecclesiastical','endPeriod':'ecclesiastical','summary':'The upper bracket runs from the Ascension to the Judgment Seat of Christ.','references':[],'sourceLocation':'Chart, top bracket.','startLabel':'Ascension of Christ','endLabel':'Judgment Seat of Christ'},
    {'title':'Kingdom of the Son of Man','startPeriod':'messianic','endPeriod':'fulness','summary':'Larkin groups both the Millennial and Perfect Ages under this kingdom label.','references':[],'sourceLocation':'Chart, Age of Ages; chapter II §IV.2.'}
  ],
  'notes':[
    {'title':'Which original is being followed?','text':'This study follows the plate on printed page 6 of Larkin’s 1921 Rightly Dividing the Word, cross-checked with the Estate’s Chart #108. The earlier PreservedWords reproduction is retained as an alternate, but is not used to overwrite the book’s printed numbering.','sourceUrl':PDF+'#page=21'},
    {'title':'Eight numbered dispensations, plus a judgment parenthesis','text':'The book chart and chapter II explicitly include an eighth dispensation, Fulness of Times. The Tribulation is unnumbered on the plate; the prose additionally calls it a parenthetical Dispensation of Judgment. Its existence is retained without changing the eight-number sequence.','sourceUrl':PDF+'#page=22'},
    {'title':'The ages are not interchangeable with the dispensations','text':'Larkin distinguishes an age by physical changes in the earth and a dispensation by a moral or probationary administration. Antediluvian Age includes two dispensations; Present Age contains the subsequent four and closes at the Revelation; Age of Ages contains the Millennial and Perfect Ages.','sourceUrl':PDF+'#page=22'},
    {'title':'Exact Legal and Ecclesiastical endpoints','text':'Chapter II ends the Legal Dispensation at Christ’s birth. For the Ecclesiastical Dispensation it specifies Cross-to-Crown for Christ and Pentecost-to-Rapture for the believer. The chart also uses “Christ to Antichrist.” These are preserved as source distinctions, rather than harmonized into a new boundary.','sourceUrl':PDF+'#page=39'},
    {'title':'Perfect Age is not the outer Omega field','text':'Larkin places the Perfect Age/Fulness of Times inside the Age of Ages and Time. He places the subsequent Omega Ages of the Ages outside Time, after the kingdom is surrendered to the Father.','sourceUrl':PDF+'#page=43'},
    {'title':'Durations remain historical source labels','text':'The plate prints 1656 years for Adam-to-Noah, 1491 years for Moses-to-Christ, 1000 years for the Messianic Dispensation, and B.C. 606 on the Gentile-times line. The chapter adds 430 years for Abraham’s-call-to-Exodus and places Babel 325 years after the Flood. These are Larkin’s labels, not independently established chronology or dates for predicting the present.','sourceUrl':PDF+'#page=21'},
    {'title':'KJV passages and the author’s interpretation','text':'Scripture references are taken from the plate or Larkin’s accompanying chapter and identified by location. The KJV reader is separate from Larkin’s historical commentary. The chart’s interpretive framework is attributed to Larkin rather than presented as wording quoted from the Bible.','sourceUrl':PDF+'#page=21'},
    {'title':'What the modern diagram changes','text':'The layout is a schematic reading aid, with modern spacing and navigation. It retains the original period labels, numbering, major relationships and events; it does not claim that column width measures time. The zoomable original preserves every drawn detail.','sourceUrl':PLATE}
  ],
  'sourceUrls':[
    {'title':'Original 1921 book scan — chart, printed page 6','url':PDF+'#page=21'},
    {'title':'Original 1921 book scan — chapter II, printed page 7','url':PDF+'#page=22'},
    {'title':'High-resolution reproduction of the book plate','url':PLATE},
    {'title':'Clarence Larkin Estate catalogue — Chart #108','url':ESTATE},
    {'title':'Chapter II / III transcription (secondary access copy)','url':CHAPTER},
    {'title':'Earlier-linked alternate reproduction at PreservedWords','url':'https://www.preservedwords.com/images/ldispen.gif'}
  ],
  'unverified':[],
  'sourceText': '''SELECTED PASSAGES FROM CHAPTER II — AGES AND DISPENSATIONS
Clarence Larkin, Rightly Dividing the Word, 1921.
These selected passages are a reading aid, not the complete chapter. Use the linked original scan to inspect the complete text and its typography. Quotation marks are normalized below; wording is retained.

PRINTED PAGE 18 — EDENIC DISPENSATION
This Dispensation extends from the creation of Adam to the Expulsion from the Garden. As to its duration we know nothing. It was probably very short, and was the “Dispensation of INNOCENCE.”

PRINTED PAGE 18 — ANTE-DILUVIAN DISPENSATION
This extends from the “Fall” to the “Flood.” It was the “Dispensation of CONSCIENCE,” and shows what man will do when guided only by his conscience.

PRINTED PAGE 23 — THE PRESENT AGE
This “Age” extends from the Flood to the second stage of Christ’s Second Coming, called the “Revelation.” It covers four Dispensations.

PRINTED PAGE 23 — POST-DILUVIAN DISPENSATION
This was the “Dispensation of HUMAN GOVERNMENT.”

PRINTED PAGES 23–24 — PATRIARCHAL DISPENSATION
This Dispensation extended from the “Call of Abraham” to the “Exodus,” a period of 430 years, and is known as the “Dispensation of THE FAMILY.”

PRINTED PAGE 24 — LEGAL DISPENSATION
This Dispensation extended from the “Exodus” to the “Birth of Christ,” and is known as the “Dispensation of LAW.”

PRINTED PAGE 24 — ECCLESIASTICAL DISPENSATION
This is the “Dispensation of GRACE,” and extends from the “Cross” to the “Crown” for Christ, and from “Pentecost” to the “Rapture of the Church” for the Believer.

PRINTED PAGE 25 — PARENTHETICAL JUDGMENT
Between the “Ecclesiastical” and “Millennial” Dispensations there is another “Parenthetical Dispensation” the “DISPENSATION OF JUDGMENT,” during which the Jews, the Gentiles, and the Church are to be judged.

PRINTED PAGE 25 — THE AGE OF AGES
This is a “Dual Age,” and includes the “Millennial Age” and the “Perfect Age,” between which the earth is “Renovated by Fire.”

PRINTED PAGE 27 — THE MILLENNIAL AGE
This is not only an “Age,” it is also a “Dispensation,” the “Messianic Dispensation” or rule of Christ as King.

PRINTED PAGE 28 — THE PERFECT AGE
This “Perfect Kingdom” is also a “Dispensation,” the “Dispensation of the FULNESS OF TIMES.” Eph. 1:10. The “Millennial Kingdom” and the “Perfect Kingdom” make up the “Kingdom of the SON OF MAN.”

PRINTED PAGE 28 — THE AGES OF THE AGES
With the surrender of the “Perfect Kingdom” to the Father, what we speak of as “Time” ceases, and the “Eternal Ages,” called the “Ages of the Ages” begin.
''',
  'sourceQuoteChecks':[
    'This Dispensation extends from the creation of Adam to the Expulsion from the Garden.',
    'This extends from the “Fall” to the “Flood.”',
    'This Dispensation extended from the “Exodus” to the “Birth of Christ,”',
    'from the “Cross” to the “Crown” for Christ, and from “Pentecost” to the “Rapture of the Church” for the Believer.',
    'Between the “Ecclesiastical” and “Millennial” Dispensations there is another “Parenthetical Dispensation”',
    'This “Perfect Kingdom” is also a “Dispensation,”'
  ],
  'verification':{
    'checkedOn':'2026-11-08',
    'originalEdition':'Copyright 1921; original book copyright leaf visually inspected.',
    'chartPage':'Printed page 6 / PDF page 21',
    'chapterPages':'Printed pages 7–28 / PDF pages 22–43',
    'scanChecks':['Original chart image viewed','Estate catalogue preview compared','Original scanned book chart viewed','Original printed pages 7, 18, 23, 24, 25, 27 and 28 checked against explanatory data'],
    'referenceScope':'Only passages explicitly printed on the selected plate or cited in its accompanying original chapter are listed.'
  }
}

out=ROOT/'research/larkin-ages.json'
out.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(out, out.stat().st_size)
