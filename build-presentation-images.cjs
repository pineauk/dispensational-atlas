"use strict";
const fs = require("node:fs");
const path = require("node:path");
const renderer = require("./dist/presentation-render.js");
const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const sharp = require(
  require.resolve("sharp", {
    paths: [runtimeModules || path.join(__dirname, "node_modules")],
  }),
);
const output = path.join(__dirname, "dist/presentations");
fs.mkdirSync(output, { recursive: true });
(async () => {
  const exports = [];
  for (const id of ["larkin-ages", "larkin-dividing", "scofield"]) {
    const chart = JSON.parse(
      fs.readFileSync(path.join(__dirname, "research", `${id}.json`), "utf8"),
    );
    for (const theme of ["light", "dark"]) {
      const basename = `${id}-overview-${theme}`,
        svg = renderer.render(chart, "overview", theme);
      fs.writeFileSync(path.join(output, `${basename}.svg`), svg);
      // Use the installed members of the SVG fallback stacks for static raster exports.
      const rasterSvg = svg
        .replaceAll(
          'font-family="Georgia, &apos;Bitstream Charter&apos;, serif"',
          'font-family="DejaVu Serif"',
        )
        .replaceAll(
          'font-family="Arial, &apos;Nimbus Sans&apos;, sans-serif"',
          'font-family="DejaVu Sans"',
        );
      await sharp(Buffer.from(rasterSvg), { density: 144 })
        .png()
        .toFile(path.join(output, `${basename}.png`));
      const metadata = await sharp(
        path.join(output, `${basename}.png`),
      ).metadata();
      if (metadata.width !== 3840 || metadata.height !== 2160)
        throw new Error(`Unexpected dimensions: ${basename}`);
      exports.push({
        id,
        theme,
        svg: `${basename}.svg`,
        png: `${basename}.png`,
        width: metadata.width,
        height: metadata.height,
      });
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "qa/presentation-image-exports.json"),
    JSON.stringify(exports, null, 2) + "\n",
  );
  console.log(
    `Exported ${exports.length} overview pairs as SVG and 3840×2160 PNG.`,
  );
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
