# Independent review: Scofield, _The Seven Dispensations_

## Scope and source

Reviewed `scofield.json` against its complete `sourceText`, the synchronized `scofield-source-text.txt`, and all three original scan spreads (`scofield-primary-p10.png`, `scofield-primary-p11.png`, `scofield-primary-p12.png`). The primary source is [C. I. Scofield, _Rightly Dividing the Word of Truth_, chapter 2, printed pages 20–25](https://www.wholesomewords.org/etexts/scofield/scofrdiv.pdf#page=10). This is a source-fidelity review of the study data, not a claim that theological interpretation can be independently certified as historical fact. Application behavior and KJV corpus verification are separate.

## Result

**Pass: all requested content checks and the five page-location refinements are verified.** No doctrinal boundary, original-label, quoted-wording, or numbered-dispensation correction was required.

| Check                        | Finding                                                                                                                                                                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seven original labels        | All seven match the scanned section headings, preserving their wording and using uppercase for small capitals. The longer third and seventh headings have not been replaced by generic labels.                                                                                                |
| Exact source excerpts        | All nine excerpts occur in the complete chapter transcription after whitespace and typographic-quotation normalization. All nine per-stage source passages also occur in the complete chapter.                                                                                                |
| Promise boundary             | Egyptian bondage, explicitly stated on printed page 22. Sinai has not been substituted as the endpoint.                                                                                                                                                                                       |
| Law boundary                 | The data retains Scofield’s stated judgment in Israel and Judah’s dispersions and the continuation of his narrative through Christ’s crucifixion, printed pages 22–23.                                                                                                                        |
| Grace boundary               | Christ’s sacrificial death introduces Grace on printed page 23. Pentecost is not substituted. The catching up is described as the first event in its closing, matching printed page 24.                                                                                                       |
| Salvation wording            | The scan’s “upon the one condition of faith” is preserved on printed page 23. No later-transcription condition has been inserted.                                                                                                                                                             |
| Tribulation                  | An unnumbered interval within the closing sequence described under Grace. The chapter calls it brief and assigns no seven-year duration.                                                                                                                                                      |
| Versions of quoted Scripture | John 5:24 and Ephesians 2:8–9 retain the source’s “R. V.” labels and wording, visible on printed page 24. Dataset notes distinguish these original quotations from the separate KJV reader.                                                                                                   |
| Kingdom and final state      | Number 7 is Christ’s personal reign; one thousand years is source-attested on printed page 25. The new heaven and new earth remain unnumbered, following final judgment. No eighth dispensation is invented.                                                                                  |
| Revelation citations         | The source’s Revelation 20:3, 7–15 is preserved as distinct normalized references; the events select appropriate subranges for Satan’s release and the great white throne. Revelation 21 and 22 are expanded to their full chapters. Isaiah 11 is likewise expanded from “entire.”            |
| Matthew citation             | The scan reads Matthew 25:31–46 on printed page 25; the data correctly uses 31–46.                                                                                                                                                                                                            |
| Structure and provenance     | Nine navigation stages contain exactly seven numbered dispensations and two explicitly unnumbered stages. Thirteen events use valid period anchors. No modern Wurm chart text is attributed to Scofield, and the visualization is accurately identified as an editorial reading map of prose. |

## Page-location refinements

The full closing paragraph of section 6 (“After this occurs the personal return…”) and its Matthew references are on printed page **25**, before the section 7 heading. The underlying wording and references were already correct.

- `events.return.sourceLocation`: printed page 24 → **25**.
- `periods.grace.sourceLocation`: printed pages 23–24 → **23–25**, because the included section text extends onto page 25.
- `periods.tribulation.sourceLocation`: printed page 24 → **24–25**, because the entry also includes the return paragraph and its references.
- `periods.kingdom.sourceLocation`: printed pages 24–25 → **25**; section 7 is wholly on that page.
- `events.creation.sourceLocation`: printed page 20 → **20–21**, covering its listed Genesis 1:26 reference on page 21 as well as Genesis 2:7 on page 20.

Status: the dataset author applied all five location-only edits to the generator and regenerated the data. The independent reviewer rechecked all five fields. No independent edit to the source dataset was made by this reviewer.

Reviewed final dataset SHA-256: `f6dcf56eb49eb1e845799b303ce95e625d368abaf854b3fe93d13dd2ec1b0569`.

## Verification limits

This review covers the selected chapter and the app’s faithful representation of it. The chapter’s historical present tense, theological claims, and interpretive framework belong to Scofield. Reflowed paragraphs, normalized quotation marks, and expanded reference names are documented editorial presentation choices. Source scans remain the authority where typography or layout matters.
