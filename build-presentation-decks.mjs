import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

const workspaceDir = path.dirname(fileURLToPath(import.meta.url));
const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const runtimePython = process.env.CODEX_PRIMARY_RUNTIME_PYTHON;
if (!runtimeModules || !runtimePython)
  throw new Error("The primary presentation runtime is required.");
const { Presentation, PresentationFile, FileBlob } = await import(
  pathToFileURL(
    path.join(runtimeModules, "@oai/artifact-tool/dist/artifact_tool.mjs"),
  ).href
);
const skillDir = "/root/.codex/skills/builtins/presentations";
const { finalizePresentation } = await import(
  pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs"))
    .href
);
const buildDir = path.join(workspaceDir, ".presentation-build");
const outputDir = path.join(workspaceDir, "dist/presentations");
const W = 1280,
  H = 720;
const C = {
  ivory: "#f6f2e9",
  forest: "#193b34",
  brass: "#b18a54",
  ink: "#253d37",
  muted: "#68766e",
  hairline: "#d9d1c2",
};
const F = { serif: "Georgia", sans: "Arial" };
const none = { style: "solid", fill: "none", width: 0 };
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const buildManifest = [];
const requested = process.argv.slice(2).filter((s) => !s.startsWith("--"));
const renderOnly = process.argv.includes("--render-only");
const selected = requested.length
  ? requested
  : ["larkin-ages", "larkin-dividing", "scofield"];

function text(
  slide,
  name,
  value,
  x,
  y,
  w,
  h,
  size,
  font = F.sans,
  color = C.ink,
  extra = {},
) {
  const shape = slide.shapes.add({
    name,
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: none,
  });
  shape.text = String(value);
  shape.text.style = {
    typeface: font,
    fontSize: size,
    color,
    insets: 0,
    wrap: "square",
    autoFit: "none",
    verticalAlignment: "top",
    ...extra,
  };
  return shape;
}
function line(slide, name, x, y, w, color = C.brass, width = 1.5) {
  return slide.shapes.add({
    name,
    geometry: "line",
    position: { left: x, top: y, width: w, height: 0 },
    fill: "none",
    line: { style: "solid", fill: color, width },
  });
}
function circle(slide, name, x, y, diameter, fill, stroke = fill) {
  return slide.shapes.add({
    name,
    geometry: "ellipse",
    position: { left: x, top: y, width: diameter, height: diameter },
    fill,
    line: { style: "solid", fill: stroke, width: 1.5 },
  });
}
function titleCaseKind(p) {
  return p.number
    ? `Dispensation ${p.number}`
    : {
        context: "Context",
        interval: "Unnumbered interval",
        eternity: "Eternity",
      }[p.kind] || "Context";
}
function citationNotes(d, p = null) {
  const parts = [
    `${d.author}. ${d.sourceTitle}.`,
    `Primary source: ${p?.sourceUrl || d.sourceUrl}`,
    p ? `Source location: ${p.sourceLocation}` : "",
    d.editionNote || "",
    "This is a modern, editable visualization of the cited author’s interpretation, not an original drawing by the author. Modern short labels and summaries follow the reviewed study data. Numbered dispensations retain the author’s numbering. Unnumbered context, intervals, and eternity remain distinct.",
  ];
  if (p) {
    parts.push(`Original section title: ${p.title}`);
    parts.push(`From: ${p.start}\nTo: ${p.end}`);
    parts.push(`Summary: ${p.summary}`);
    if (p.sourceExcerpt) parts.push(`Original quotation:\n${p.sourceExcerpt}`);
    if (p.referenceBasis) parts.push(`Reference basis: ${p.referenceBasis}`);
    parts.push(
      `Scripture references: ${(p.references || []).join("; ") || "No references listed in this entry."}`,
    );
    for (const detail of p.details || [])
      parts.push(`${detail.label}: ${detail.text}`);
  }
  for (const note of d.notes || [])
    parts.push(
      `${note.title}: ${note.text}${note.sourceUrl ? "\n" + note.sourceUrl : ""}`,
    );
  for (const source of d.sourceUrls || [])
    parts.push(`${source.title}: ${source.url}`);
  return parts.filter(Boolean).join("\n\n");
}
function footer(slide, d, sourceLocation, pageNumber, dark = false) {
  const color = dark ? C.ivory : C.muted;
  text(
    slide,
    "source-location",
    sourceLocation,
    72,
    665,
    1038,
    37,
    15,
    F.sans,
    color,
  );
  text(
    slide,
    "slide-number",
    String(pageNumber).padStart(2, "0"),
    1156,
    665,
    52,
    24,
    16,
    F.sans,
    color,
    { alignment: "right" },
  );
}
function displayReferenceLines(refs, maxChars = 105) {
  const lines = [];
  let active = "";
  for (const ref of refs) {
    if (active && active.length + ref.length + 4 > maxChars) {
      lines.push(active);
      active = "";
    }
    active += (active ? "    " : "") + ref;
  }
  if (active) lines.push(active);
  return lines.join("\n");
}
function overviewContext(d) {
  if (d.id === "larkin-ages")
    return [
      "Before 1: Creative Ages",
      "Between 6 and 7: Tribulation",
      "After 8: Ages of the Ages",
    ];
  if (d.id === "larkin-dividing")
    return [
      "Before 1: Original, Chaotic, and Restored Earth",
      "Between 6 and 7: Daniel’s Seventieth Week",
      "After 8: Ages of the Ages",
    ];
  return [
    "Between 6 and 7: the great tribulation",
    "After 7: new heaven and a new earth",
  ];
}
function overview(presentation, d) {
  const slide = presentation.slides.add();
  slide.background.fill = C.forest;
  const numbered = d.periods.filter((p) => p.number !== null);
  const headSize = d.title.length > 32 ? 48 : 54;
  text(
    slide,
    "overview-author",
    d.author,
    72,
    38,
    1070,
    30,
    22,
    F.sans,
    C.brass,
  );
  text(
    slide,
    "overview-title",
    d.title,
    72,
    82,
    1120,
    100,
    headSize,
    F.serif,
    C.ivory,
  );
  text(
    slide,
    "overview-subtitle",
    `${numbered.length} numbered dispensations`,
    72,
    190,
    1120,
    33,
    25,
    F.sans,
    C.ivory,
  );
  const centers = [168, 469, 770, 1071];
  const rowY = [284, 445];
  for (const row of [0, 1]) {
    const rowPeriods = numbered.slice(row * 4, row * 4 + 4);
    if (!rowPeriods.length) continue;
    if (rowPeriods.length > 1)
      line(
        slide,
        `sequence-line-${row}`,
        centers[0],
        rowY[row],
        centers[rowPeriods.length - 1] - centers[0],
        "#829083",
        2,
      );
    rowPeriods.forEach((p, col) => {
      const cx = centers[col],
        cy = rowY[row];
      circle(slide, `number-${p.number}`, cx - 27, cy - 27, 54, C.brass);
      text(
        slide,
        `number-label-${p.number}`,
        p.number,
        cx - 26,
        cy - 22,
        52,
        44,
        34,
        F.serif,
        C.forest,
        { alignment: "center", verticalAlignment: "middle" },
      );
      text(
        slide,
        `period-label-${p.id}`,
        p.shortTitle,
        cx - 130,
        cy + 44,
        260,
        76,
        27,
        F.serif,
        C.ivory,
        { alignment: "center" },
      );
    });
  }
  const contexts = overviewContext(d);
  text(
    slide,
    "overview-context",
    contexts.join("\n"),
    72,
    568,
    1120,
    78,
    20,
    F.sans,
    C.ivory,
  );
  footer(
    slide,
    d,
    "Modern reading map of the cited author’s interpretation. Spacing does not represent duration.",
    1,
    true,
  );
  slide.speakerNotes.text =
    citationNotes(d) +
    "\n\nNUMBERED SEQUENCE\n" +
    numbered.map((p) => `${p.number}. ${p.title}`).join("\n") +
    "\n\nCOMPLETE ORDER\n" +
    d.periods.map((p) => `${p.number || "Unnumbered"}: ${p.title}`).join("\n");
  return {
    kind: "overview",
    title: d.title,
    periodIds: numbered.map((p) => p.id),
  };
}
function periodSlide(presentation, d, p, pageNumber) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ivory;
  text(
    slide,
    "period-classification",
    titleCaseKind(p),
    72,
    35,
    1100,
    32,
    21,
    F.sans,
    C.brass,
  );
  const longHeading = p.title.length > 35;
  text(
    slide,
    "period-exact-title",
    p.title,
    72,
    82,
    1136,
    111,
    longHeading ? 43 : 47,
    F.serif,
    C.forest,
  );
  line(slide, "heading-rule", 72, 207, 1136, C.brass, 1.5);
  text(slide, "from-label", "FROM", 72, 239, 330, 24, 17, F.sans, C.muted);
  text(slide, "from-value", p.start, 72, 273, 345, 93, 26, F.sans, C.ink);
  text(slide, "to-label", "TO", 72, 384, 330, 24, 17, F.sans, C.muted);
  text(slide, "to-value", p.end, 72, 418, 345, 105, 26, F.sans, C.ink);
  text(
    slide,
    "period-summary",
    p.summary,
    468,
    242,
    740,
    270,
    28,
    F.sans,
    C.ink,
  );
  const references = p.references || [];
  if (references.length) {
    line(slide, "reference-rule", 72, 544, 1136, C.hairline, 1);
    text(
      slide,
      "reference-label",
      "SCRIPTURE REFERENCES",
      72,
      562,
      1136,
      23,
      16,
      F.sans,
      C.muted,
    );
    text(
      slide,
      "reference-list",
      displayReferenceLines(references),
      72,
      596,
      1136,
      63,
      22,
      F.sans,
      C.forest,
    );
  }
  footer(slide, d, p.sourceLocation, pageNumber);
  slide.speakerNotes.text = citationNotes(d, p);
  return {
    kind: p.kind,
    title: p.title,
    periodId: p.id,
    number: p.number,
    references: [...references],
    exactSummary: p.summary,
  };
}
function sourceSlide(presentation, d, pageNumber) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ivory;
  text(slide, "source-author", d.author, 72, 40, 1110, 35, 22, F.sans, C.brass);
  text(
    slide,
    "source-title",
    "Source and interpretation",
    72,
    93,
    1136,
    83,
    52,
    F.serif,
    C.forest,
  );
  line(slide, "source-heading-rule", 72, 207, 1136, C.brass, 1.5);
  const presentationDescription = d.description.replace(
    /^An interactive study/,
    "A modern study",
  );
  text(
    slide,
    "study-description",
    presentationDescription,
    72,
    246,
    1136,
    190,
    28,
    F.sans,
    C.ink,
  );
  text(
    slide,
    "source-heading",
    "PRIMARY SOURCE",
    72,
    462,
    1136,
    28,
    17,
    F.sans,
    C.muted,
  );
  text(
    slide,
    "bibliographic-title",
    `${d.author}\n${d.sourceTitle}`,
    72,
    507,
    1136,
    111,
    25,
    F.serif,
    C.forest,
  );
  footer(
    slide,
    d,
    "Original quotations, detailed distinctions, and full source links appear in the speaker notes.",
    pageNumber,
  );
  slide.speakerNotes.text = citationNotes(d);
  return { kind: "source", title: "Source and interpretation" };
}
async function writeBlob(filename, blob) {
  await fs.writeFile(filename, new Uint8Array(await blob.arrayBuffer()));
}
async function buildDeck(id) {
  const sourceFile = path.join(workspaceDir, "research", `${id}.json`);
  const sourceBytes = await fs.readFile(sourceFile);
  const sourceHash = sha(sourceBytes);
  const d = JSON.parse(sourceBytes);
  const expectedNumber = id === "scofield" ? 7 : 8;
  if (
    JSON.stringify(
      d.periods.filter((p) => p.number !== null).map((p) => Number(p.number)),
    ) !==
    JSON.stringify(Array.from({ length: expectedNumber }, (_, n) => n + 1))
  )
    throw new Error(`Numbering mismatch for ${id}`);
  const deckDir = path.join(buildDir, id);
  await fs.mkdir(deckDir, { recursive: true });
  const presentation = Presentation.create({
    slideSize: { width: W, height: H },
  });
  const slides = [overview(presentation, d)];
  for (const p of d.periods)
    slides.push(periodSlide(presentation, d, p, slides.length + 1));
  slides.push(sourceSlide(presentation, d, slides.length + 1));
  const candidatePath = path.join(deckDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  console.log(`${id}: candidate exported (${slides.length} slides)`);
  await fs.writeFile(
    path.join(deckDir, "native-source.json"),
    JSON.stringify(presentation.toProto()),
  );
  for (const [i, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(i + 1).padStart(2, "0")}`;
    await writeBlob(
      path.join(deckDir, `${stem}.png`),
      await presentation.export({ slide, format: "png", scale: 1 }),
    );
    await fs.writeFile(
      path.join(deckDir, `${stem}.layout.json`),
      await (await slide.export({ format: "layout" })).text(),
    );
  }
  await writeBlob(
    path.join(deckDir, "montage.webp"),
    await presentation.export({ format: "webp", montage: true, scale: 0.5 }),
  );
  console.log(`${id}: all ${slides.length} slides rendered`);
  const finalPath = path.join(outputDir, `${id}.pptx`);
  const validatedDir = path.join(buildDir, "validated-output");
  await fs.mkdir(validatedDir, { recursive: true });
  const revisionToken = Date.now();
  const validatedPath = path.join(validatedDir, `${id}-${revisionToken}.pptx`);
  const revisionReceiptPath = path.join(
    deckDir,
    `validation-${revisionToken}.json`,
  );
  let validation;
  if (!renderOnly) {
    validation = await finalizePresentation({
      workspaceDir,
      candidatePath,
      finalPath: validatedPath,
      pythonExecutable: runtimePython,
      integrityValidatorPath: path.join(
        skillDir,
        "container_tools/inspect_presentation_package_integrity.py",
      ),
      layoutValidatorPath: path.join(
        skillDir,
        "container_tools/inspect_presentation_layout_geometry.py",
      ),
      layoutArgs: [
        "--expected-slide-size-emu",
        "12192000,6858000",
        "--validate-bullet-geometry",
        "--validate-heading-fit",
      ],
      explicitTotalSlideCount: slides.length,
      requiredNativeTableOwnerSlides: [],
      requiredNativeChartOwnerSlides: [],
      fontPolicy: { basis: "design", families: [F.serif, F.sans] },
      verifyArtifactToolImport: true,
      receiptPath: revisionReceiptPath,
    });
    await fs.copyFile(validatedPath, finalPath);
    await fs.copyFile(
      revisionReceiptPath,
      path.join(deckDir, "validation.json"),
    );
    console.log(`${id}: final deck saved`);
  }
  const finalSourceHash = sha(await fs.readFile(sourceFile));
  if (finalSourceHash !== sourceHash)
    throw new Error(`${id}: source changed during build`);
  const manifest = {
    id,
    title: d.title,
    sourceFile,
    sourceSha256: sourceHash,
    slideCount: slides.length,
    slideSize: [W, H],
    fonts: F,
    palette: C,
    finalPath,
    slides,
    validation,
    generated: new Date().toISOString(),
  };
  await fs.writeFile(
    path.join(deckDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  buildManifest.push(manifest);
}
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
for (const id of selected) await buildDeck(id);
await fs.writeFile(
  path.join(buildDir, "decks-manifest.json"),
  JSON.stringify(buildManifest, null, 2),
);
console.log("Presentation build complete.");
