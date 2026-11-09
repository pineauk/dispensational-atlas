# Scofield source and accuracy record

## Primary source

C. I. Scofield, _Rightly Dividing the Word of Truth_, chapter 2, “The Seven Dispensations,” printed pages 20–25 (PDF pages 10–12).

- [Primary scan](https://www.wholesomewords.org/etexts/scofield/scofrdiv.pdf#page=10)
- [Hosting page and edition statement](https://www.wholesomewords.org/etexts/scofield/scofrdivi.html)
- [Publisher’s October 1921 restoration preface](https://www.wholesomewords.org/etexts/scofield/scofrdiv.pdf#page=2)

The host identifies its scan as the Philadelphia College of the Bible, 1930, edition and describes it as unchanged from Scofield’s original. The scan’s publisher preface, dated October 1921, states that Scofield learned circulating editions had been changed without his knowledge or consent and asked the Philadelphia School of the Bible to produce a new issue conforming to the original plates. The author’s introduction is dated January 1896.

The downloaded primary PDF is retained as `scofield-primary.pdf`. All three chapter spreads were rendered and visually inspected: `scofield-primary-p10.png`, `scofield-primary-p11.png`, and `scofield-primary-p12.png`.

## Deliverables

- `scofield.json`: source-derived application data; nine navigation stages, exactly seven numbered dispensations; thirteen events; complete chapter transcription.
- `scofield-source-text.txt`: complete standalone transcription of chapter 2.
- `build-scofield.py`: reproducible data assembly with checks for seven numbered dispensations and exact source-excerpt matches.

The visualization is an editorial reading map of Scofield’s prose. It is not represented as an original chart drawn by Scofield. David Wurm’s modern companion chart and editorial annotations are not used as Scofield primary text.

## Original numbering and labels

1. MAN INNOCENT
2. MAN UNDER CONSCIENCE
3. MAN IN AUTHORITY OVER THE EARTH
4. MAN UNDER PROMISE
5. MAN UNDER LAW
6. MAN UNDER GRACE
7. MAN UNDER THE PERSONAL REIGN OF CHRIST

The unnumbered “great tribulation” tile is an interval described in section 6. The unnumbered “new heaven and a new earth” tile presents the final state described at the end of section 7. Neither is called an eighth dispensation.

## Material accuracy decisions

- **Promise:** this tract says its closing judgment is Egyptian bondage. Sinai is not substituted as its endpoint.
- **Law:** Scofield calls Israel and Judah’s dispersions the judgment closing the testing by law, then continues his account through the returned remnant to Christ and the crucifixion. The app retains that nuance instead of silently simplifying the endpoint to one event.
- **Grace begins:** the sacrificial death of Christ, explicitly stated in section 6. Pentecost or Ascension is not substituted.
- **Original salvation wording:** the restored scan reads “upon the one condition of faith.” Some readable online transcriptions add repentance or acknowledgment wording; those additions are excluded.
- **Grace closes:** the catching up of believers is “the first event in the closing of this dispensation.” It is not represented as completing every closing event by itself.
- **Tribulation:** Scofield calls it a brief period but assigns no number of years in this chapter. No seven-year duration is added.
- **Seventh dispensation:** Christ’s personal reign lasts one thousand years, explicitly stated in the source. Satan’s release, rebellion, judgment, the great white throne, and the new heaven and earth follow in the stated order.
- **Matthew reference correction:** the scan reads **Matthew 25:31–46**. The OCR incorrectly suggested 31–40; the structured references use the visually verified 31–46.
- **John 5:24 and Ephesians 2:8–9:** the original explicitly labels these quotations “R. V.” Their wording is preserved in the source viewer. They are not silently converted to KJV or presented as KJV quotations. The application’s separate scripture reader uses KJV.
- **Reference normalization:** original shortened book names and nonconsecutive verse groups are expanded for the reader. “Isa. 11: entire” becomes Isaiah 11:1–16, “Rev. 21 and 22” becomes Revelation 21:1–27 and Revelation 22:1–21. Source text retains original references.
- **Transcription:** print line wraps are joined, small capitals represented as uppercase, typographic quotation marks normalized, and layout-only differences removed. Source wording and the complete chapter are retained.
- **Interpretation:** summaries describe Scofield’s own theological framework. They do not present the scheme as an interpretation held by all Christian traditions.

## Verification

The seven numbered section labels, all scripture references, and complete chapter text were checked against the three source spreads. Data assembly asserts that the numbered entries are precisely 1–7, that the two additional navigation entries remain unnumbered, and that each displayed source excerpt appears in the complete source text. The KJV corpus and its separate validation are handled by the application’s main implementation.
