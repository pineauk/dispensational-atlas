# Verification summary

## Content and data

- Three source studies individually researched and independently reviewed against the named source plates/text. See the three independent-review files in `research/`.
- Numbered sequences validated: eight in each original Larkin plate; seven in Scofield. Unnumbered intervals and context remain unnumbered.
- 33 period/context entries, 52 events, and 17 cross-chart relationships.
- All 148 distinct source-reference strings resolve to 434 unique KJV verses.
- Selected KJV wording compared between the named aruljohn and scrollmapper texts after normalization of capitalization, whitespace, and punctuation. This is a wording comparison, not an independent punctuation collation.
- Two spelling differences retained from the primary text after a separate published KJV check: Genesis 11:3, "thoroughly"; Revelation 21:20, "chrysolyte". Full decisions and evidence URLs are in `kjv-variant-decisions.json`.
- Exact source excerpts and source locations reviewed. Scofield's five page-location refinements independently rechecked and passed.
- All local original-chart image files decode successfully; paths and Larkin Dividing's image hash match the source metadata.
- `data-validation.json` records the generated bundle hash and has no errors.

## Application verification

Observed in the browser preview:

- All three study choices, period selection, study/source tabs, and source quotations.
- KJV passage dialogs, including Romans 6:14 and Ephesians 2:8–9.
- Scofield's complete original-text view retains the expressly marked R.V. wording while the separate reader uses KJV.
- Search results, empty results, clearing search, keyboard selection/focus, guided-study step navigation, comparison, and print-content generation.
- Copy-passage fallback presents selectable text when clipboard access is unavailable in the HTTP preview. A direct HTTPS clipboard write was not independently exercised.
- Desktop composition and phone/tablet frame layouts. No whole-page horizontal overflow at the tested 390px and 768px widths. Original Ages scan loads at 1816×1164.

Independent static review found and verified corrections for accessible control names, skip-link routing, native print preparation, canvas focus restoration, source fallback wording, relationship endpoint labels, relationship search labels, guided-study/event selection, incoming-link reveal, and fitting below the ordinary zoom floor. See `research/app-static-review.md`.

## Verification limits

The final browser reload was rejected by the browser URL policy. No browser-policy workaround was attempted. Therefore the final reload, phone auto-scroll settling, and refreshed original Dividing image load were not confirmed in that last browser pass. The Dividing image file itself is a valid 2018×908 GIF with the expected source hash and a matching local asset path. Earlier browser interactions and layouts were observed, and the remaining navigation fixes received static review.

The app's generated print contents were checked; a physical printout and every browser/platform combination were not tested. The modern diagrams are explicitly schematic and keep the complete historical scans available for details beyond the interactive transcription.
