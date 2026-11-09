# Editable presentation decks: QA record

## Delivery files

| File                                      | Slides | Native editable shapes |   Bytes |
| ----------------------------------------- | -----: | ---------------------: | ------: |
| `dist/presentations/larkin-ages.pptx`     |     13 |                    177 |  99,550 |
| `dist/presentations/larkin-dividing.pptx` |     15 |                    209 | 122,562 |
| `dist/presentations/scofield.pptx`        |     11 |                    154 |  85,834 |

## Content and design

Each deck begins with an editable numbered-sequence overview, then presents every period/context/interval in the reviewed JSON order, followed by one source slide. Larkin retains eight numbered dispensations and Scofield seven. Context, the judgment/tribulation interval, and eternity remain unnumbered. Every period slide retains its exact title, From/To values, complete reviewed summary, all references, and source location. Source quotations, all detailed notes, edition caveats, and URLs appear in speaker notes on every relevant slide.

The 16:9 decks use the specified ivory (#f6f2e9), forest (#193b34), and brass (#b18a54) palette. The final native PowerPoint font names are **Georgia for headings and Arial for body text**. The earlier custom fonts have been removed from the authored slide text; no custom font installation is required. The sequence overview uses native PowerPoint circles, lines, and editable text. No slide relies on a screenshot or raster picture.

## Verification performed

- The initial decks received individual full-size visual review of all 39 slides. No visible clipping, unintended overlap, unreadable reference block, or missing label was observed.
- After the Georgia/Arial portability correction, all three decks were regenerated and all 39 slide previews rendered. Per the requested focused recheck, six representative slides were visually reviewed: Ages slides 10 and 11, Rightly Dividing slides 1 and 9, and Scofield slides 7 and 9. These include the longest headings, longest overview heading, densest summary, and dense reference lists. No overflow appeared in the available fallback render, so the review was not broadened.
- Confirmed the candidate files used for rendering are byte-for-byte identical to the final download files.
- Ran the Presentations skill finalizer for each final deck. Package integrity, dimensions, heading geometry, font policy, declared slide counts, and Artifact Tool re-import passed. No geometry warnings or findings remain. The encoded slide font families are exactly Arial and Georgia.
- Inspected the PPTX XML to confirm native editable shapes and text, zero raster pictures, and speaker notes on every slide.
- Matched every period title, From/To field, full summary, source location, and reference against the current reviewed JSON. Matched every original excerpt and detail against the speaker notes.
- Verified source JSON hashes remain unchanged by the presentation builder.
- Preserved the Legal birth/cross distinction, Larkin’s eighth Fulness of Times before Omega, unnumbered judgment intervals, Scofield’s Promise/Grace boundaries, and the original R.V. quotation caveat in the relevant summaries or speaker notes.

## Limits

The decks were rendered and re-imported using Artifact Tool, not opened in Microsoft PowerPoint or Google Slides. Georgia and Arial are not installed in this runtime, so Artifact Tool previews use fallback fonts and cannot validate the exact appearance or metrics of native Georgia/Arial. The requested native font names are preserved in the final PowerPoint files. These are common PowerPoint target fonts, and no custom-font installation accompanies the decks. Actual PowerPoint rendering on the target Mac/Windows machine remains unverified. Structural and visual checks verify these files against the reviewed study data; they are not an independent adjudication of the authors’ theological interpretations.

## Reproducible source

`build-presentation-decks.mjs` builds all three decks with the supplied primary runtime and contains the native slide construction. It writes staged candidates, rendered previews, serialized native presentation data, manifests, and validation receipts in `.presentation-build`. Final assets use the stable download filenames above. The builder can run again without altering the reviewed JSON.

## Final hashes

### larkin-ages

PPTX SHA-256: `f28f7d071b2d6fe14244a0f82b3584947902da58721627ca08cc6ca49a0ec528`

Reviewed JSON SHA-256: `197bea83d77d1f1775fdb4e4bae9dfe5d5ff135eb3ade6872eea8265c2eab2fa`

### larkin-dividing

PPTX SHA-256: `86fd4957398d60baee985b098b249ca2e19a5a6852ad889257b5df6054bb4c85`

Reviewed JSON SHA-256: `78f7fae1701275a76a5eae4dd14541a6724a2ae65bd5e06a1d2690bf622cc84b`

### scofield

PPTX SHA-256: `a8741c540c006fee660c86a26fe8fec7f2c324363ca337023ab51e1113dafe83`

Reviewed JSON SHA-256: `f6dcf56eb49eb1e845799b303ce95e625d368abaf854b3fe93d13dd2ec1b0569`
