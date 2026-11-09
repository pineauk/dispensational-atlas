# Larkin — Rightly Dividing the Word of Truth: source audit

## Delivered files

- `research/larkin-dividing.json`: 13 ordered panels; eight numbered dispensations; 21 events; complete chapter-V online transcription; source notes and links.
- `dist/assets/larkin-dividing.gif`: unmodified original chart, 2018 × 908 pixels, 165,414 bytes.
- `research/larkin-dividing-chapter5.html`: downloaded chapter source. It is research material, not application code and should not be executed.
- `research/larkin-dividing-source-text.txt`: extracted text, only HTML and layout whitespace removed.
- `research/build-larkin-dividing.py`: reproducible construction and assertions.
- `research/larkin-dividing-yale.jpg`: independent institutional copy, 1424 × 632 pixels, visually cross-checked.
- Enlarged crops under `qa/dividing-*.png`: inspection only, not deliverables.

## Primary sources and identification

1. Original diagram reproduced by PreservedWords: <https://preservedwords.com/disptruth/images/4-rightly.gif>.
2. Clarence Larkin, _Dispensational Truth_, chapter V: <https://preservedwords.com/disptruth/chap5.html>.
3. Clarence Larkin Estate catalogue, chart #22: <https://www.larkinestate.com/charts.html>.
4. Book contents, item 8 in its chart list: <https://preservedwords.com/disptruth/contents.html>.
5. Yale MAVCOR institutional object record identifies the drawing as from the 1920 expanded edition: <https://mavcor.yale.edu/material-objects/rightly-dividing-word-truth>.
6. Yale’s unmodified image: <https://mavcor.yale.edu/sites/default/files/images/materials/coates_image.jpg>.

“Item 8” and “#22” are different cataloguing systems, not different chart identities. The title on the actual drawing is _Rightly Dividing the Word of Truth_; the online book contents shorten it to _Rightly Dividing the Word_.

## Critical fidelity findings

### Eight drawing numbers, seven probationary tests

The diagram visibly numbers Edenic 1, Antediluvian 2, Postdiluvian 3, Patriarchal 4, Legal 5, Ecclesiastical 6, Messianic 7, and Dispensation of the Fulness of Times 8. The unnumbered interval between 6 and 7 is **not** promoted into this numbered sequence. The opening discussion says seven dispensations in Time, and the later Millennial discussion specifies seven tests before the new heaven and new earth. The Perfect Kingdom is subsequently called a dispensation. All of these statements must remain distinguishable; do not force a seven-only legend onto the original drawing.

### Larkin labels differ from Scofield labels

The fourth circle says **Family** under **Patriarchal Dispensation**, with **430 years**. The third says **Human Government**, **427 years**. The second says **Conscience**, **1656 years**. The sixth says **Grace**; the seventh’s principle **Righteousness** is explained in the prose, while its chart title is **Messianic Dispensation**, **1000 years**. Do not relabel period 4 as Promise in the original-author view.

### Internal differences preserved, not silently reconciled

- The opening paragraph defines the Antediluvian Age as Fall–Flood; detailed section II defines it as restoration–Flood; its chart arc includes Edenic. The modern age span follows the drawing, with this difference recorded.
- Legal section III.3 initially states Exodus–Birth of Christ, “1491(? ) years”, but its ending discussion closes with the crucifixion; the chart says Moses–Christ and First Advent at the Cross. The endpoint remains “Christ / First Advent”, with source differences visible in details.
- The Perfect Age (numbered 8) is distinguished from the Omega ages beyond “God All And In All”, rather than merged into a generic single eternal-state card.
- The parenthetical judgment interval is represented by `kind: 'interval'`, number null. Creation context and Omega also have no invented dispensation numbers.

### Branches and event positioning

`duringPeriod` marks events inside a period (Enoch, Babel, the heavenly/earthly judgment-interval events). Do not draw Babel as the exact 427-year ending boundary: the prose locates dispersion about 325 years after the Flood and expressly adds another 102 years. The Rapture and Revelation are separate; “Second Advent” includes both. The Times of the Gentiles line runs from B.C. 606 to the Revelation and is not the Fulness of the Gentiles label within the Church-period circle.

The original image preserves all spatial branches: priesthood of Christ and Paradise above; the Grave, Paradise below described as now empty, Hell, Great Gulf, Tartarus, the Abyss/Bottomless Pit, and Lake of Fire below. The modern data describes these in source notes but is **not** a complete diplomatic transcription of every small graphical label or the whole underworld geometry. Do not advertise the modern timeline alone as a pixel-for-pixel reconstruction. The unmodified Original view is the complete graphical source.

### Five judgments kept separate

1. Believers for sin — Cross.
2. Believers for works — Judgment Seat of Christ.
3. The Jews — under Antichrist in the interval.
4. The Nations — at the Revelation.
5. The Wicked — Great White Throne after the millennium.

The beast/false prophet and Satan have different entries into the Lake of Fire in the drawing; they must not all be collapsed into the single Great White Throne event.

## Text and KJV treatment

The app’s KJV passage reader is separate from Larkin’s text. The source contains material expressly marked R.V.; e.g. Isaiah 45:18 in the chaotic-earth section, and the chart’s Ephesians 2:2 reference. These are not silently converted or presented as direct KJV quotations. Study-card references come from the chart **or the explanatory chapter**, as stated in `sourceLocation` and details. A direct chart label without a directly printed citation (e.g. Exodus or Judgment No. 1) is not given an invented verse assignment.

The prose’s Jeremiah 30:4–6 citation is retained for the judgment interval. “Jacob’s trouble” itself is in 30:7; this is explicitly noted rather than silently changing the author’s range. OCR/transcription quirks in the full source text are retained, including obvious misread characters elsewhere in the long chapter. The chart scan, not OCR, is authoritative for graphical labels.

## Verification performed

- Source GIF downloaded successfully; full image and enlarged left, centre, and right crops visually inspected.
- Yale independent image downloaded and viewed to confirm identity, eight-number sequence, and major arrangement.
- Excerpt strings asserted against whitespace-normalized downloaded primary text.
- Exactly eight numbered periods asserted in original order.
- All period/event IDs unique and all event/age period links asserted valid.
- All dates retained as Larkin’s historical labels. No future-event date computed.

The phrases “source-verified” and “faithful modern study edition” are supportable at this scope. “Perfect accuracy” or “all original graphical detail is reproduced by the modern timeline” would exceed the verification performed.

## Independent review completion

An independent review of the primary chart and chapter identified and resolved four omissions: Elijah’s branch, the Resurrection of Christ / First Fruits branch, the Tribulation Saints / Gleanings branch, and explicit retention of the Harvest and Tares labels. A further source note now preserves the Present Age endpoint difference between the plate / section III and the opening of section IV. The malformed source citation “I Cor. 12-12-13” is explicitly documented when normalized to 1 Corinthians 12:12–13. Revelation 20:1–3 and 20:7–9 remain two separate source ranges rather than adding uncited verses 4–6.

Ten optional `parallelBands` now describe source-attested cross-period or spatial relationships: Generation; Degeneration; Regeneration; Times of the Gentiles; Fulness of the Gentiles; Priesthood of Christ; Second Advent; Kingdom of the Son of Man; the two Paradise labels; and the Underworld / resurrection routes. The two spatial relationships deliberately have no invented chronological endpoints. `startLabel` and `endLabel` preserve specific boundary labels where a period name alone would be misleading, especially B.C. 606 **within** Legal and Revelation at the interval’s end.
