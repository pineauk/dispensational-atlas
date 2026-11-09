import json
from pathlib import Path

root = Path('/workspace/sites/dispensational-atlas/research')
pdf = 'https://www.wholesomewords.org/etexts/scofield/scofrdiv.pdf'
landing = 'https://www.wholesomewords.org/etexts/scofield/scofrdivi.html'

intro = '''THE SEVEN DISPENSATIONS

THE Scriptures divide time, by which is meant the entire period from the creation of Adam to the "new heaven and a new earth" of Rev. 21: 1, into seven unequal periods, called, usually, "dispensations" (Eph. 3: 2), although these periods are also called "ages" (Eph. 2: 7) and "days"—as, "day of the Lord," etc.

These periods are marked off in Scripture by some change in God's method of dealing with mankind, or a portion of mankind, in respect of the two questions of sin and of man's responsibility. Each of the Dispensations may be regarded as a new test of the natural man, and each ends in judgment—marking his utter failure.

Five of these Dispensations, or periods of time, have been fulfilled; we are living in the sixth, probably toward its close, and have before us the seventh, and last—the millennium.'''

sections = [
'''1. MAN INNOCENT.—This dispensation extends from the creation of Adam, Gen. 2: 7, to the Expulsion. Adam, created innocent, and ignorant of good and evil, was placed in the garden of Eden with his wife, Eve, and put under responsibility to abstain from the fruit of the tree of the knowledge of good and evil. The Dispensation of Innocence resulted in the first and, in its far-reaching effects, the most disastrous of the failures of the natural man, and was closed by judgment—"So He drove out the man." See,

Gen. 1: 26. Gen. 3: 6.
Gen. 2: 16,17. Gen. 3: 22-24.''',
'''2. MAN UNDER CONSCIENCE.—By the Fall Adam and Eve acquired, and transmitted to the race, the knowledge of good and evil. This gave conscience a basis for right moral judgment, and hence the race came under this measure of responsibility—to do good and eschew evil. The result of the Dispensation of Conscience was that "all flesh had corrupted his way on the earth;" that "the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually;" and God closed the second testing of the natural man with judgment—the Flood. See,

Gen. 3: 7,22. Gen. 6: 5, 11,12. Gen. 7: 11, 12,23.''',
'''3. MAN IN AUTHORITY OVER THE EARTH.—Out of the fearful judgment of the Flood God saved eight persons to whom, after the waters were assuaged, He gave the purified earth with ample power to govern it. This, Noah and his descendants were responsible to do. The Dispensation of Human Government resulted, upon the plain of Shinar, in the impious attempt to become independent of God and closed in judgment—the Confusion of Tongues. See,

Gen. 9: 1, 2. Gen. 11: 1-4. Gen. 11: 5-8.''',
'''4. MAN UNDER PROMISE.—Out of the dispersed descendants of the builders of Babel God now calls one man, Abram, with whom He enters into covenant. Some of the promises to Abram and his descendants were purely gracious and unconditional. These either have been, or will yet be, literally fulfilled. Other promises were conditional upon the faithfulness and obedience of the Israelites. Every one of these conditions was violated, and the Dispensation of Promise resulted in the utter failure of Israel, and closed in the judgment of the Egyptian Bondage.

The book of Genesis, which opens with the sublime words, "In the beginning God created," closes with, "in a coffin in Egypt."

Gen. 12: 1-3. Gen. 13: 14-17.
Gen. 15: 5; 26: 3; 28: 12,13. Ex. 1: 13,14.''',
'''5. MAN UNDER LAW.—Again the grace of God came to the help of helpless man and redeemed the chosen people out of the hand of the oppressor. In the Wilderness of Sinai He proposed to them the Covenant of Law. Instead of humbly pleading for a continued relation of grace, they presumptuously answered: "All that the Lord hath spoken we will do." The history of Israel in the Wilderness and in the Land is one long record of flagrant, persistent violation of the Law, and at last, after multiplied warnings, God closed the testing of man by law in judgment, and first Israel, and then Judah, were driven out of the Land into a dispersion which still continues. A feeble remnant returned under Ezra and Nehemiah, of which, in due time, Christ came: "Born of a woman—made under the law." Him both Jews and Gentiles conspired to crucify. See,

Exodus 19: 1-8. 2 Kings 17: 1-18.
Romans 10: 5. 2 Kings 25: 1-11.
Gal. 3: 10. Acts 2: 22, 23.
Romans 3: 19, 20. Acts 7: 51, 52.''',
'''6. MAN UNDER GRACE.—The sacrificial death of the Lord Jesus Christ introduced the dispensation of pure grace—which means undeserved favor, or God GIVING righteousness, instead of God REQUIRING righteousness, as under Law. Salvation, perfect and eternal, is now freely offered to Jew and Gentile upon the one condition of faith.

Jesus answered and said unto them, This is the work of God, that ye BELIEVE on him whom he hath sent. John 6: 29.

Verily, verily, I say unto you, He that BELIEVETH on me HATH everlasting life. John 6: 47.

Verily, verily, I say unto you, He that heareth my word, and BELIEVETH him that sent me, HATH eternal life, and cometh not into judgment, but hath passed out of death into life. John 5: 24. R. V.

My sheep hear my voice, and I know them, and they follow me: and I give unto them eternal life; and they shall never perish. John 10: 27,28.

For by grace have ye been saved through faith; and that not of yourselves: it is the gift of God: not of works, that no man should glory. Eph. 2: 8,9. R. V.

The predicted result of this testing of man under grace is, judgment upon an unbelieving world and an apostate Church.

Rev. 3: 15,16. Luke 17: 26-30.
Luke 18: 8. 2 Thess. 2: 7-12.

The first event in the closing of this dispensation will be the descent of the Lord from Heaven, when sleeping saints will be raised and, together with believers then living, caught up "to meet the Lord in the air: and so shall we ever be with the Lord." 1 Thess. 4: 16, 17.

Then follows the brief period called "the great tribulation."

Matt. 24: 21, 22. Dan. 12: 1.
Zeph. 1: 15-18. Jer. 30: 5-7.

After this occurs the personal return of the Lord to the earth in power and great glory, and the judgments which introduce the seventh, and last dispensation.

Matt. 24: 29, 30. Matt. 25: 31-46.''',
'''7. MAN UNDER THE PERSONAL REIGN OF CHRIST.—After the purifying judgments which attended the personal return of Christ to the Earth, He will reign over restored Israel and over the earth for one thousand years. This is the period commonly called the Millennium. The seat of His power will be Jerusalem, and the saints, including the saved of the Dispensation of Grace, viz., the Church, will be associated with Him in His glory. See,

Acts 15: 14-17. Rev. 19: 11-21.
Isa. 2: 1-4. Rev. 20: 1-6.
Isa. 11: entire.

But when Satan is "loosed a little season" he finds the natural heart as prone to evil as ever, and easily gathers the nations to battle against the Lord and His saints, and this last dispensation closes, like all the others, in judgment. The "great white throne" is set, the wicked dead are raised and finally judged, and then come the "new heaven and a new earth"—eternity begun.

Rev. 20: 3,7-15. Rev. 21 and 22.'''
]
full = intro + '\n\n' + '\n\n'.join(sections)

def period(id, number, title, shortTitle, start, end, summary, excerpt, refs, details, pages, text, kind='dispensation'):
    return dict(id=id, number=number, kind=kind, title=title, shortTitle=shortTitle, start=start, end=end, summary=summary,
        sourceExcerpt=excerpt, references=refs, details=[dict(label=k,text=v) for k,v in details], sourceLocation=pages,
        sourceUrl=pdf+'#page='+str(10 if '20' in pages or '21' in pages else 11 if '22' in pages or '23' in pages else 12),
        sourceText=text, referenceBasis='References cited in Scofield’s original chapter 2; abbreviated book names expanded and nonconsecutive verses split for the KJV reader.')

periods = [
period('innocence','1','MAN INNOCENT','Innocence','Creation of Adam','Expulsion from Eden',
 'Scofield places innocent Adam and Eve under the responsibility to abstain from the tree of the knowledge of good and evil. Their disobedience ends this first test in expulsion from the garden.',
 'This dispensation extends from the creation of Adam, Gen. 2: 7, to the Expulsion.',
 ['Genesis 2:7','Genesis 1:26','Genesis 2:16-17','Genesis 3:6','Genesis 3:22-24'],
 [('Responsibility','Abstain from the fruit of the tree of the knowledge of good and evil.'),('Closing judgment','Expulsion from Eden; Scofield describes this as the first failure of the natural man.')],
 'Chapter 2, printed pages 20–21 (PDF page 10)',sections[0]),
period('conscience','2','MAN UNDER CONSCIENCE','Conscience','The Fall','The Flood',
 'In Scofield’s account, knowledge of good and evil supplies a basis for moral judgment. Humanity is responsible to do good and avoid evil, but widespread corruption ends this test in the Flood.',
 'God closed the second testing of the natural man with judgment—the Flood.',
 ['Genesis 3:7','Genesis 3:22','Genesis 6:5','Genesis 6:11-12','Genesis 7:11-12','Genesis 7:23'],
 [('Responsibility','Do good and eschew evil, in accordance with conscience.'),('Closing judgment','The Flood, following corruption and persistent wickedness.')],
 'Chapter 2, printed page 21 (PDF page 10)',sections[1]),
period('government','3','MAN IN AUTHORITY OVER THE EARTH','Human government','After the Flood','Confusion of tongues at Babel',
 'God entrusts the earth to Noah and his descendants with authority to govern it. Scofield describes the undertaking at Shinar as an attempt at independence from God; this test ends in the confusion of tongues.',
 'closed in judgment—the Confusion of Tongues.',
 ['Genesis 9:1-2','Genesis 11:1-4','Genesis 11:5-8'],
 [('Responsibility','Noah and his descendants receive the purified earth with power to govern it.'),('Closing judgment','Confusion of tongues at the plain of Shinar.')],
 'Chapter 2, printed pages 21–22 (PDF pages 10–11)',sections[2]),
period('promise','4','MAN UNDER PROMISE','Promise','God’s call of Abram','Egyptian bondage',
 'God calls Abram from the dispersed descendants of Babel and enters into covenant with him. Scofield distinguishes unconditional promises from promises conditioned on Israel’s obedience. In this tract, the dispensation closes in Egyptian bondage.',
 'closed in the judgment of the Egyptian Bondage.',
 ['Genesis 12:1-3','Genesis 13:14-17','Genesis 15:5','Genesis 26:3','Genesis 28:12-13','Exodus 1:13-14'],
 [('Two kinds of promise','Scofield says the unconditional promises have been or will be literally fulfilled, while Israel violated the stated conditions of other promises.'),('Exact boundary in this tract','The text names Egyptian bondage as the closing judgment. It does not name Sinai as this dispensation’s endpoint.')],
 'Chapter 2, printed page 22 (PDF page 11)',sections[3]),
period('law','5','MAN UNDER LAW','Law','The covenant at Sinai','Dispersion; narrative continues to Christ’s crucifixion',
 'After deliverance from bondage, Israel accepts the covenant of law at Sinai. Scofield says persistent violation leads to Israel and Judah’s dispersions. His account then follows the returned remnant through Christ’s coming under law and his crucifixion.',
 'God closed the testing of man by law in judgment, and first Israel, and then Judah, were driven out of the Land',
 ['Exodus 19:1-8','Romans 10:5','Galatians 3:10','Romans 3:19-20','2 Kings 17:1-18','2 Kings 25:1-11','Acts 2:22-23','Acts 7:51-52'],
 [('Responsibility','Israel accepts the covenant of law: “All that the Lord hath spoken we will do.”'),('Boundary nuance','The chapter calls the dispersions the judgment closing the testing by law, then continues the narrative through Ezra and Nehemiah to Christ’s crucifixion. The next section begins Grace at Christ’s sacrificial death.')],
 'Chapter 2, printed pages 22–23 (PDF page 11)',sections[4]),
period('grace','6','MAN UNDER GRACE','Grace','Christ’s sacrificial death','Closing begins with the catching up of believers',
 'Scofield dates this dispensation from Christ’s sacrificial death and describes salvation as freely offered to Jew and Gentile on the condition of faith. He places the catching up of sleeping and living believers first in its closing sequence, followed by tribulation and Christ’s return.',
 'Salvation, perfect and eternal, is now freely offered to Jew and Gentile upon the one condition of faith.',
 ['John 6:29','John 6:47','John 5:24','John 10:27-28','Ephesians 2:8-9','Revelation 3:15-16','Luke 17:26-30','Luke 18:8','2 Thessalonians 2:7-12','1 Thessalonians 4:16-17'],
 [('Beginning','The original text expressly begins Grace at the sacrificial death of the Lord Jesus Christ.'),('Salvation','The original-restored scan says “upon the one condition of faith.” Added conditions found in some later online transcriptions are not reproduced.'),('Closing sequence','The catching up of believers is “the first event in the closing” of the dispensation; the subsequent tribulation is not numbered as an eighth dispensation.'),('Bible versions in the original','John 5:24 and Ephesians 2:8–9 are explicitly marked R. V. in Scofield’s source. Those quotations are preserved in the original-text viewer; the separate scripture reader uses the KJV.')],
 'Chapter 2, printed pages 23–25 (PDF pages 11–12)',sections[5]),
period('tribulation',None,'the great tribulation','Great tribulation','After believers are caught up','Christ’s personal return and judgments',
 'Scofield places a brief period called the great tribulation after the catching up of believers and before Christ returns personally to the earth. It belongs to the closing sequence described under Grace, and is not one of his seven numbered dispensations.',
 'Then follows the brief period called "the great tribulation."',
 ['Matthew 24:21-22','Daniel 12:1','Zephaniah 1:15-18','Jeremiah 30:5-7','Matthew 24:29-30','Matthew 25:31-46'],
 [('Status in Scofield’s text','Unnumbered interval described within the section “Man under Grace.” Its display as a separate tile is an editorial navigation aid.'),('Duration','The chapter calls it “brief” without assigning a number of years.'),('What follows','Christ’s personal return in power and great glory, with judgments introducing the seventh and last dispensation.')],
 'Chapter 2, printed pages 24–25 (PDF page 12)',sections[5][sections[5].index('Then follows'):],kind='interval'),
period('kingdom','7','MAN UNDER THE PERSONAL REIGN OF CHRIST','Millennium','Judgments attending Christ’s personal return','Final rebellion and the great white throne',
 'Christ reigns over restored Israel and the earth for one thousand years, with Jerusalem as the seat of his power and the saints associated with his glory. Scofield then places Satan’s release, the nations’ rebellion, final judgment, and the great white throne before the new heaven and new earth.',
 'He will reign over restored Israel and over the earth for one thousand years.',
 ['Acts 15:14-17','Isaiah 2:1-4','Isaiah 11:1-16','Revelation 19:11-21','Revelation 20:1-6','Revelation 20:3','Revelation 20:7-15'],
 [('Duration','One thousand years, explicitly stated by Scofield.'),('Government','Christ reigns from Jerusalem over restored Israel and the earth; the saints, including the Church, are associated with him in his glory.'),('Closing sequence','Satan is loosed for a little season, gathers nations to battle, and is followed by judgment. The wicked dead are raised and finally judged at the great white throne.'),('Whole-chapter reference','Scofield’s “Isa. 11: entire” is represented as Isaiah 11:1–16 in the KJV reader.')],
 'Chapter 2, printed page 25 (PDF page 12)',sections[6]),
period('eternity',None,'new heaven and a new earth','Eternity','After the great white throne','No endpoint stated',
 'Following the final judgment of the wicked dead, Scofield closes the chapter with the new heaven and new earth and the beginning of eternity. This is the state after the seven dispensations, not an eighth numbered dispensation.',
 'then come the "new heaven and a new earth"—eternity begun.',
 ['Revelation 21:1-27','Revelation 22:1-21'],
 [('Status in Scofield’s text','The final clause of the seventh section. Its separate display is an editorial navigation aid, not an additional numbered dispensation.'),('Whole-chapter references','Scofield cites “Rev. 21 and 22.” These are represented as the complete KJV chapters.')],
 'Chapter 2, printed page 25 (PDF page 12)',sections[6][sections[6].index('But when Satan'):],kind='eternity')
]

def event(id,title,after,summary,refs,location):
    return dict(id=id,title=title,afterPeriod=after,summary=summary,references=refs,sourceLocation=location)

events=[
event('creation','Creation of Adam','before','Scofield begins his sequence with the creation of Adam, rather than a dated chronology of the earlier creation.', ['Genesis 2:7','Genesis 1:26'],'Chapter 2, printed pages 20–21'),
event('fall','The Fall and expulsion','innocence','The disobedience of Adam and Eve is followed by expulsion from Eden; knowledge of good and evil introduces the responsibility described under Conscience.', ['Genesis 3:6','Genesis 3:7','Genesis 3:22-24'],'Chapter 2, printed pages 20–21'),
event('flood','The Flood','conscience','Scofield names the Flood as the judgment ending the second testing of humanity.', ['Genesis 6:5','Genesis 6:11-12','Genesis 7:11-12','Genesis 7:23'],'Chapter 2, printed page 21'),
event('babel','Babel: confusion of tongues','government','The attempt at Shinar ends with the confusion of tongues and the scattering of its builders.', ['Genesis 11:1-4','Genesis 11:5-8'],'Chapter 2, printed pages 21–22'),
event('abram','The call of Abram','government','God calls Abram from the dispersed descendants of Babel and enters into covenant with him, opening the fourth dispensation.', ['Genesis 12:1-3'],'Chapter 2, printed page 22'),
event('bondage','Egyptian bondage','promise','This tract identifies Egyptian bondage as the judgment closing the dispensation of Promise.', ['Exodus 1:13-14'],'Chapter 2, printed page 22'),
event('sinai','Moses and the covenant at Sinai','promise','After redeeming Israel from the oppressor, God proposes the covenant of law at Sinai. Scofield cites Exodus 19, where Moses conveys the covenant to Israel.', ['Exodus 19:1-8'],'Chapter 2, printed pages 22–23'),
event('cross','Christ’s sacrificial death','law','The Law section ends its narrative with Christ’s crucifixion. Scofield expressly identifies Christ’s sacrificial death as the introduction of pure grace.', ['Acts 2:22-23','Acts 7:51-52'],'Chapter 2, printed page 23'),
event('rapture','Believers caught up to meet the Lord','grace','The Lord descends, sleeping saints are raised, and believers then living are caught up with them. Scofield calls this the first event in the closing of the dispensation of Grace.', ['1 Thessalonians 4:16-17'],'Chapter 2, printed page 24'),
event('return','Christ’s personal return','tribulation','After the great tribulation, Christ returns to the earth in power and great glory. The accompanying judgments introduce the seventh dispensation.', ['Matthew 24:29-30','Matthew 25:31-46'],'Chapter 2, printed page 25'),
event('satan-loosed','Satan’s release and final rebellion','kingdom','Satan is loosed for a little season and gathers the nations against the Lord and his saints; the final dispensation closes in judgment.', ['Revelation 20:3','Revelation 20:7-10'],'Chapter 2, printed page 25'),
event('white-throne','The great white throne','kingdom','The wicked dead are raised and finally judged before the new heaven and new earth.', ['Revelation 20:11-15'],'Chapter 2, printed page 25'),
event('new-creation','New heaven and new earth','kingdom','The new heaven and new earth follow the final judgment; Scofield ends with “eternity begun.”', ['Revelation 21:1-27','Revelation 22:1-21'],'Chapter 2, printed page 25')
]

data=dict(
 id='scofield', title='The Seven Dispensations', subtitle='Scofield’s seven tests, their judgments, and the final state',
 author='C. I. Scofield', sourceTitle='Rightly Dividing the Word of Truth, chapter 2, “The Seven Dispensations,” printed pages 20–25',
 sourceUrl=pdf+'#page=10',originalImage=None,
 editionNote='Based on the Philadelphia College of the Bible reprint identified by its host as 1930, reproducing the author’s original text. The publisher’s October 1921 preface explains that this edition restores the original plates after unauthorized alterations in circulating editions. The author’s introduction is dated January 1896.',
 description='A modern reading map of Scofield’s original chapter, preserving his seven numbered dispensations. The great tribulation and eternity are shown as unnumbered stages for navigation. This presents Scofield’s interpretation of Scripture; it is not an original chart drawn by Scofield.',
 periods=periods, events=events,
 notes=[
  dict(title='Seven dispensations; nine navigation stages',text='Only entries 1–7 are Scofield’s numbered dispensations. The great tribulation is an interval in his closing account of Grace, and eternity follows the seventh dispensation. Their separate tiles are editorial aids.',sourceUrl=pdf+'#page=12'),
  dict(title='Original text and KJV are distinct',text='The original chapter explicitly marks John 5:24 and Ephesians 2:8–9 as R. V. quotations. The source viewer retains those words and labels; the scripture reader separately displays KJV passages. The chapter must not be represented as using the KJV exclusively.',sourceUrl=pdf+'#page=11'),
  dict(title='Use this edition’s wording',text='The publisher’s October 1921 preface says Scofield requested restoration of the original plates after other editions had been changed without his knowledge or consent. The restored scan says salvation is offered “upon the one condition of faith.” Modern online additions are excluded.',sourceUrl=pdf+'#page=2'),
  dict(title='Boundaries in this particular tract',text='Promise closes in Egyptian bondage. Under Law, Scofield describes the dispersions as the judgment closing the test, then continues through the returned remnant to Christ’s crucifixion. Grace begins at Christ’s sacrificial death. These statements are retained instead of importing different boundaries from later charts or editions.',sourceUrl=pdf+'#page=11'),
  dict(title='Sequence does not imply scaled dates',text='The chapter gives no date scale and calls the tribulation brief without specifying seven years. The millennium’s one thousand years are explicit. The catching up of believers is the first event in the closing of Grace, not a claim that every closing event is completed at that moment.',sourceUrl=pdf+'#page=12'),
  dict(title='A text-based reconstruction',text='This visualization derives from Scofield’s chapter, not from David Wurm’s modern companion chart. Titles of the seven numbered sections retain Scofield’s wording; short labels, summaries, and event titles are editorial reading aids.',sourceUrl=landing),
  dict(title='Transcription conventions',text='The complete chapter is transcribed with paragraph breaks and punctuation retained, line wraps joined, small capitals represented by capitals, and quotation marks normalized. Original abbreviated references remain in the source viewer. KJV reference links expand book names, split nonconsecutive verse lists, and expand explicitly cited whole chapters.',sourceUrl=pdf+'#page=10'),
  dict(title='Interpretive perspective',text='The test-and-judgment framework and prophetic sequence are presented as Scofield’s theological interpretation. The app’s paraphrases describe that interpretation rather than claiming all Christians read the passages identically.',sourceUrl=pdf+'#page=10')
 ],
 sourceUrls=[dict(title='Primary scan: Rightly Dividing the Word of Truth (chapter begins at PDF page 10)',url=pdf+'#page=10'),dict(title='Publisher’s restoration preface (October 1921)',url=pdf+'#page=2'),dict(title='Hosting page and edition identification',url=landing)],
 sourceText=full,
 sourceTextLabel='C. I. Scofield · Rightly Dividing the Word of Truth · Chapter 2 · complete chapter, checked against the restored-edition scan',
 unverified=[]
)
(root/'scofield.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(root/'scofield-source-text.txt').write_text(full+'\n')
assert len(periods)==9
assert [p['number'] for p in periods if p['kind']=='dispensation']==[str(n) for n in range(1,8)]
for p in periods:
    assert p['sourceExcerpt'] in full, p['id']
print('Saved',root/'scofield.json', 'with',len(periods),'periods,',len(events),'events, and',len(full.split()),'words of complete source text.')
