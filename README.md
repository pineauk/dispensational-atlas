# Dispensational Atlas

A static interactive study app presenting three historical arrangements separately:

1. Clarence Larkin, **Ages and Dispensations** — the larger plate in *Rightly Dividing the Word*, with eight numbered dispensations.
2. Clarence Larkin, **Rightly Dividing the Word of Truth** — the plate and chapter in the enlarged *Dispensational Truth*.
3. C. I. Scofield, **The Seven Dispensations** — a new visualization of his original chapter, verified against the restored original-edition scan.

The modern diagrams are schematic reading maps, not proportional chronologies or diplomatic redraws. The Larkin original plates and Scofield original chapter are available in the app. Source quotations, modern summaries, edition differences, and KJV reader text are labelled separately. The original author's expressly marked R.V. quotations are retained as quotations; they are not substituted for KJV reader text.

## Use

Select a study, then a period, event, or relationship. Study notes, Scripture, and Source tabs provide context and original wording. Other features include search, a guided study, comparison, zoom, original views, an accessible linear outline, deep links, dark appearance, and a print study.

## Presentation edition

Choose **Present** from a study to open `/presentation.html`. It includes an overview and a slide for each reviewed period/context, ivory and forest appearances, source notes, KJV passages, keyboard navigation, and current-slide SVG/3840×2160 PNG downloads. **Full screen** expands immediately and requests browser fullscreen when the platform permits it. **Exit full screen** or Escape restores the normal layout. The study chart now has separate, clearly labelled **Fit** and **Full screen** controls.

The downloadable editable decks are `dist/presentations/larkin-ages.pptx` (13 slides), `larkin-dividing.pptx` (15), and `scofield.pptx` (11). Decks use Georgia and Arial. Source quotations and additional distinctions remain in speaker notes. Their overview diagrams are editable native objects.

`build-presentation-decks.mjs` builds the PowerPoint files with the installed Artifact Tool runtime. `build-presentation-images.cjs` builds six standalone overview SVG/4K PNG pairs from the same pure SVG renderer used in the browser. Static PNG rasterization uses installed DejaVu serif/sans fonts; SVG retains its portable font fallback stacks. Both builds preserve the reviewed JSON datasets unchanged.

## Build and source records

No dependency installation or framework build is required. `dist/` contains the deployable app and all runtime assets. Serve it through a static HTTP server. Scripts and source assets are local; source/context links open external sources.

Run `python3 build-data.py` to regenerate `dist/data.js` and the validation record from the reviewed JSON files in `research/`. `qa/kjv-selected-source-snapshot.json` permits rebuilding the selected passages without downloading the complete KJV corpora. Run `node --check dist/app.js` and `node --check dist/data.js` for syntax verification.

The source datasets, source memos, visual review records, and original scan evidence are in `research/`. The verse comparison and verification summary are in `qa/`. The full KJV corpora are intentionally excluded from Git; the selected verse snapshot is tracked.

## Primary source locations

- Larkin *Rightly Dividing the Word*: https://www.earnestlycontendingforthefaith.com/Books/Clarence%20Larkin/RightlyDividingTheWord/LarkinRightlyDividingTheWord.pdf
- Larkin *Dispensational Truth*, chapter V: https://preservedwords.com/disptruth/chap5.html
- Scofield restored original chapter: https://www.wholesomewords.org/etexts/scofield/scofrdiv.pdf#page=10

Refer to the in-app source register for edition distinctions and the digital KJV text sources. The app preserves the historical interpretations and labels; it does not attempt to reconcile the authors into one system.
