# Independent application review

Scope: static review of `dist/app.js`, `dist/index.html`, and `dist/styles.css`. Root owns browser/runtime verification and all implementation edits. No app files were changed by this reviewer.

## Confirmed issues corrected during review

- **Mobile accessible names:** Compare and Sources originally lost their accessible names when their text was hidden below 600 px. Explicit `aria-label` attributes are now present.
- **Skip link changed the selected chart:** The `#study-title` fragment originally entered the chart hash router and reset the selection to the first study. The click now prevents the hash navigation and focuses/scrolls the heading.
- **Native browser printing was blank:** Print CSS hid the main UI while printable content was only created by the app button. A `beforeprint` listener now prepares printable content for Ctrl+P / native print too.
- **Keyboard selection discarded canvas focus:** Re-rendering a selected SVG node removed the focus target. The current `selectItem()` restores focus to the corresponding replacement or viewport.
- **Fit zoom had an excessive minimum:** The former 45% minimum was reduced to 20%, and a later CSS rule overrides the original-stage 600 px minimum with zero. See the narrower residual case below.
- **Source fallback implied a Scofield plate:** The fallback for items without a direct quotation now says that the item summarizes the identified source. It no longer describes prose-derived Scofield material as transcribed from a chart or plate.
- **Relationship endpoint labels were dropped:** `relationships()` now honors `endLabel` as well as `startLabel`. Spatial entries with null endpoints retain no invented chronological bounds.
- **Relationship search results were called context:** The search result suffix now identifies relationship items separately.

## Remaining recommended fixes, in priority order

### P2 — Guided study becomes inconsistent after selecting an event or relationship

While the tour is active, clicking an event or cross-chart relationship sets a non-period selection. `renderTour()` then converts its `index === -1` into “Step 1” and the first period’s title, while the details show the event. Next also jumps to period 1.

**Surgical correction:** end or pause the tour when selecting a non-period, or retain a separate tour index. Ending the tour is the smallest coherent fix.

### P2 — Shared deep links do not reveal their selected diagram item

`readRoute()` restores the selected ID, but `renderAll()` does not scroll the canvas to it. A link to a later period correctly opens its detail pane while leaving the diagram at the start, with the selection off screen. The same path runs on incoming hash changes and history navigation.

**Surgical correction:** after rendering a modern view from an incoming route, reveal the selected item using its existing `positions` map. Do not focus or move the entire page unexpectedly. Relationship items can instead remain in their already-open relationship strip.

### P2 — Very narrow screens can still defeat “Fit chart to width”

At a 20% minimum, a 1650-pixel original-stage base still requires 330 px before surrounding page spacing. A 320 px viewport can therefore remain horizontally clipped after Fit. The old 600 px minimum is now overridden, so that part is resolved.

**Surgical correction:** permit the exact width-fit scale below the ordinary manual zoom floor, or use a viewport-dependent minimum. Preserve the current ordinary zoom range for manual buttons if desired. This is a bounded layout issue, not a request for a new zoom engine.

## Checks without concrete problems found

- Chart IDs, chosen study, view, and item use the hash without server-route dependencies.
- Invalid chart/item hash values safely fall back to known data.
- Comparison explicitly warns that matching numbers do not imply identical boundaries.
- Original labels and modern summaries are visibly separated in the detail panel.
- KJV modal escapes verse text, provides source attribution, and does not fabricate text for a missing passage.
- Dynamic source/verse text is escaped; external source links are restricted to HTTP(S) and use `noopener noreferrer`.
- There is a native dialog, an explicit close control, keyboard Escape handling, and reduced-motion CSS.
- Layout uses a scrollable chart canvas within a min-width-zero grid column, avoiding an obvious whole-page horizontal expansion.
- The reference reader, original-image view, source register, and comparison are functional paths rather than decorative buttons in the source.
- The modern canvas explicitly calls itself a reading map, labels within-period events separately, and avoids claiming proportional chronology.
- The print builder includes numbered and unnumbered periods, events, relationships, source quotations, references, edition notes, and source links.

This is a static review, not a browser execution report. Runtime screenshots, mobile behavior, focus restoration, printed output, and final source-to-data coverage remain the root’s verification work.

## Final bounded recheck — resolved

The three residual recommendations recorded above are now **resolved in the reviewed source**:

1. `selectItem()` ends the guided tour when the chosen item is not in the current study’s period list, then rerenders the tour controls. Event and relationship selections no longer retain the misleading Step 1 state.
2. `readRoute()` flags incoming item selections; `renderAll()` reveals a selected modern-diagram item through the populated `positions` map after rendering, then clears the flag. Initial routes, incoming hash changes, and history navigation share this path. It changes only the internal canvas scroll.
3. Fit calls `setZoom(..., true)`, which permits scales below the 20% manual zoom floor and rounds the computed fit ratio down. The narrow-phone case in the earlier finding can now fit the original image within the available canvas width.

This final recheck was restricted to these changes; no additional app testing or app edits were performed. No unresolved static findings remain from this review.

### Original-image path check

The current aggregate `dist/data.js` identifies the #22 original image as `/assets/larkin-dividing.gif`. The exact matching file exists at `dist/assets/larkin-dividing.gif`, is 165,414 bytes, has a GIF89a signature, and its SHA-256 matches the dataset’s recorded source-image hash:

`ece992105616ed9a6b915bb648ab8d9376bbad92efeeeda48f1615f17a76f31d`

The separate external original-image URL is `https://preservedwords.com/disptruth/images/4-rightly.gif`; the source URL correctly points to its accompanying chapter. The image renderer uses `originalImage` for the `<img>` and the external URL only for the source link. There is no obvious local-path, filename, or source-URL mismatch. This file inspection does not independently resolve the browser’s previously observed `naturalWidth === 0`, since final browser reload verification was unavailable to the root reviewer.

Reviewed app.js SHA-256: `ab4b55fe89421808fc1387830b291ba9710e7f84dde9c1d009c6a47aba65874a`.
