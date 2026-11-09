# Larkin — Ages and Dispensations: source verification

Verified 2026-11-08 against the **1921** edition of _Rightly Dividing the Word_. This is a faithful representation of Larkin’s historical interpretive scheme, not an assertion that his chronology, scientific explanations or prophetic interpretations have been independently proved.

## Canonical source

- Original book scan: https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/LarkinRightlyDividingTheWord.pdf
- Chart: printed page 6; PDF page 21.
- Chapter II: printed pages 7–28; PDF pages 22–43.
- Copyright leaf: PDF page 9; reads 1921.
- Larger chart reproduction matching the book: https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/Images/04AgesAndDispensations.gif
- Estate catalogue identification as Chart #108: https://www.larkinestate.com/charts.html
- Estate preview: https://www.larkinestate.com/assets/img/charts/lark-w-108.jpg
- Convenient chapter transcription: https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/RightlyDividingTheWord02.html

The downloaded larger image is copied **byte-for-byte** to `dist/assets/larkin-ages-original.gif`. It has SHA-256 `ab0ff89db61b1c686da58e089c9d78bf6eee1d57c27db4d8cb7cc4eab49114cb`. The original PDF has SHA-256 `825cce67686ef7cbd62165a0426b048f9ec87821eaabd637273b871155dbce8d`.

## Earlier-linked reproduction

https://www.preservedwords.com/images/ldispen.gif is preserved as `dist/assets/larkin-ages.gif`.

Two verified differences from the selected 1921 book plate:

1. The book plate and Estate preview print **8** above the final Fulness of Times dispensation. The earlier, smaller PreservedWords GIF does not print this numeral.
2. The book plate reads **Post Diluvian**. The earlier GIF reads **Post Flood**.

Do not claim to know why the reproductions differ or characterize one as a forgery. Do not silently merge their typography or numbering. The app’s main data follows the book plate.

## High-consequence fidelity decisions

| Topic                    | Preserved source detail                                                                                                         | Original location                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Count                    | Eight numbered dispensations in the book plate and chapter; judgment parenthesis remains unnumbered.                            | Printed pp. 6–7, 25                |
| Antediluvian Age         | Contains Edenic and Antediluvian dispensations.                                                                                 | Printed pp. 6, 18                  |
| Present Age              | Flood to the Revelation (second stage of the Second Coming), not merely to the Rapture.                                         | Printed pp. 7, 23                  |
| Post Diluvian endpoints  | Chart says Noah to Abraham; Babel is the failure discussed in the prose.                                                        | Printed pp. 6, 23                  |
| Legal endpoint           | Chapter says **Birth of Christ**, while chart says Moses to Christ.                                                             | Printed pp. 6, 24                  |
| Ecclesiastical endpoints | Cross to Crown for Christ; Pentecost to Rapture for the believer; chart also prints Christ to Antichrist.                       | Printed pp. 6, 24–25               |
| Judgment interval        | Church judged at the beginning; Jews in Tribulation; nations at the end, according to Larkin.                                   | Printed p. 25                      |
| Perfect Age              | Eighth dispensation, inside Age of Ages / Time.                                                                                 | Printed pp. 6–7, 28                |
| Omega eternity           | Outside the Time envelope, after the surrender of the Perfect Kingdom to the Father.                                            | Printed pp. 6, 28                  |
| Two judgments            | Judgment Seat of Christ and Great White Throne are distinct.                                                                    | Printed p. 6                       |
| Resurrection labels      | Christ: First Fruits; First Resurrection: Harvest; Second Resurrection: Tares. No additional resurrection-stage label invented. | Printed p. 6                       |
| Gentile labels           | Times of the Gentiles and Fulness of the Gentiles are distinct spans.                                                           | Printed p. 6; chapter II pp. 24–25 |

## Source labels retained without recalculation

- Adam to Noah: 1,656 years on the plate.
- Moses to Christ: 1,491 years on the plate.
- Messianic Dispensation: 1,000 years on the plate.
- Times of the Gentiles line: B.C. 606 on the plate.
- Abraham’s call to Exodus: 430 years in chapter II.
- Building of Babel: 325 years after the Flood in chapter II.
- Edenic duration: explicitly unknown in chapter II.

These are identified as Larkin’s historical labels. Diagram widths are schematic. No date for a present or future event is calculated.

## Reference and quotation checks

`larkin-ages.json` includes 11 chronological entries: 8 numbered dispensations, 1 unnumbered judgment interval, and 2 outer context / eternity fields. It includes 18 event entries, 3 age spans, 2 subage spans, 7 parallel relationships, and 38 unique Scripture references.

Every Scripture reference comes from the plate or the accompanying original chapter, with `sourceLocation` and, where helpful, `referenceBasis`. Empty reference lists intentionally avoid inventing a verse that Larkin did not cite in the selected source paragraph. KJV text is supplied separately by the app’s verified corpus.

The original 1921 scanned chart and printed pp. 7, 18, 23, 24, 25, 27 and 28 were inspected. The supporting HTML copy was used for normalized-string checks of 11 short source excerpts and 6 additional quote assertions. The PDF scan was used to resolve boundaries and the edition/count discrepancy.

`sourceText` contains **selected** primary passages, expressly labelled as selected, with page locations; it does not pretend to be the complete chapter. The full original is linked.

## Implementation cautions

- Use `withinPeriod` / `placement: 'during'` for Babel and the Judgment Seat rather than treating them as new numbered eras.
- Several events share a boundary. Their labels must remain separate and must not overlap unreadably.
- The seven `parallelBands` preserve relationship information beyond the period sequence. In particular, Times of the Gentiles starts **within** Legal at the source’s B.C. 606, not at the start of the Legal dispensation. Do not draw that band as an exact date-scaled rectangle without retaining this note.
- The Ecclesiastical period has different bounds for Christ and the believer. A modern single-column sequence should retain both in its detail panel instead of silently collapsing them.
- The selected original is an exact source image; it provides complete original graphic detail beyond the reorganized modern layout.
