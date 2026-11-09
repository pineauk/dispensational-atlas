/* Standalone SVG presentation renderer. The source datasets own all study content. */
(function (root, factory) {
  "use strict";
  var api = factory();
  root.AtlasPresentation = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var WIDTH = 1920,
    HEIGHT = 1080,
    LEFT = 88,
    RIGHT = 1832;
  var SERIF = "Georgia, 'Bitstream Charter', serif";
  var SANS = "Arial, 'Nimbus Sans', sans-serif";
  var PALETTES = {
    light: {
      background: "#f6f2e9",
      ink: "#193b34",
      muted: "#607169",
      line: "#cbd3c8",
      paper: "#fffdf8",
      soft: "#e8ede5",
      brass: "#b18a54",
      accent: "#efe3cf",
      badge: "#193b34",
      badgeText: "#f6f2e9",
    },
    dark: {
      background: "#142f29",
      ink: "#f6f2e9",
      muted: "#bdcbbf",
      line: "#4c675c",
      paper: "#203f36",
      soft: "#2b4c40",
      brass: "#d1b17c",
      accent: "#394b3c",
      badge: "#d1b17c",
      badgeText: "#193b34",
    },
  };

  function escapeXML(value) {
    return String(value == null ? "" : value)
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
      .replace(/[&<>"']/g, function (c) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&apos;",
        }[c];
      });
  }

  function periods(chart) {
    return chart && Array.isArray(chart.periods) ? chart.periods : [];
  }
  function isNumbered(period) {
    return (
      period.number !== null &&
      period.number !== undefined &&
      period.number !== ""
    );
  }
  function shortTitle(period) {
    return period.shortTitle || period.title || "";
  }
  function identifier(value) {
    return String(value || "chart").replace(/[^a-zA-Z0-9_-]/g, "-");
  }
  function rounded(value) {
    return Math.round(value * 100) / 100;
  }
  function slides(chart) {
    return [{ id: "overview", label: "Overview" }].concat(
      periods(chart).map(function (p) {
        return { id: p.id, label: shortTitle(p) };
      }),
    );
  }
  function title(chart, slideId) {
    var selected = periods(chart).find(function (p) {
      return p.id === slideId;
    });
    return selected
      ? shortTitle(selected) + " · " + chart.title
      : String((chart && chart.title) || "Dispensational Atlas");
  }

  // Deterministic text metrics keep browser and Node output identical. Each SVG
  // line receives its measured textLength, so alternate installed fonts cannot
  // push words outside the reserved text box. Text is wrapped, never ellipsized.
  function measure(text, size, serif) {
    var units = 0;
    Array.from(String(text)).forEach(function (c) {
      if (/\s/.test(c)) units += 0.278;
      else if (/[ilI\.,'’‘:;!|]/.test(c)) units += serif ? 0.29 : 0.245;
      else if (/[mwMW@%]/.test(c)) units += serif ? 0.88 : 0.87;
      else if (/[ftjr\(\)\[\]{}]/.test(c)) units += 0.355;
      else if (/[A-Z]/.test(c)) units += serif ? 0.665 : 0.66;
      else if (/[0-9]/.test(c)) units += 0.556;
      else if (/[—–→]/.test(c)) units += 0.85;
      else if (/[\-\/\\]/.test(c)) units += 0.34;
      else units += serif ? 0.505 : 0.515;
    });
    return units * size;
  }
  function wrap(text, width, size, serif) {
    var lines = [];
    String(text == null ? "" : text)
      .split("\n")
      .forEach(function (paragraph) {
        var line = "";
        paragraph
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .forEach(function (word) {
            if (measure(word, size, serif) > width) {
              if (line) {
                lines.push(line);
                line = "";
              }
              Array.from(word).forEach(function (c) {
                if (line && measure(line + c, size, serif) > width) {
                  lines.push(line);
                  line = "";
                }
                line += c;
              });
            } else if (
              line &&
              measure(line + " " + word, size, serif) > width
            ) {
              lines.push(line);
              line = word;
            } else line += (line ? " " : "") + word;
          });
        if (line || !paragraph.trim()) lines.push(line);
      });
    return lines.length ? lines : [""];
  }
  function textBox(text, options) {
    var o = options || {},
      size = o.size || 24,
      ratio = o.leading || 1.25;
    var width = o.w || 1000,
      height = o.h || 100,
      serif = o.serif === true;
    var longestWord = String(text == null ? "" : text)
      .split(/\s+/)
      .reduce(function (longest, word) {
        return measure(word, size, serif) > measure(longest, size, serif)
          ? word
          : longest;
      }, "");
    while (measure(longestWord, size, serif) > width && size > 8) size -= 1;
    var lines = wrap(text, width, size, serif);
    while (lines.length * size * ratio > height && size > 8) {
      size -= 1;
      lines = wrap(text, width, size, serif);
    }
    var top = o.y || 0;
    if (o.centerY)
      top += Math.max(0, (height - lines.length * size * ratio) / 2);
    var anchor =
      o.align === "center" ? "middle" : o.align === "right" ? "end" : "start";
    var x =
      o.align === "center"
        ? o.x + width / 2
        : o.align === "right"
          ? o.x + width
          : o.x;
    return (
      "<g" +
      (o.role
        ? ' data-content="' +
          escapeXML(o.role) +
          '" aria-label="' +
          escapeXML(text) +
          '"'
        : "") +
      ">" +
      lines
        .map(function (line, i) {
          var length = rounded(Math.min(width, measure(line, size, serif)));
          return (
            '<text x="' +
            rounded(x) +
            '" y="' +
            rounded(top + size * 0.91 + i * size * ratio) +
            '" font-family="' +
            escapeXML(serif ? SERIF : SANS) +
            '" font-size="' +
            size +
            '" font-weight="' +
            (o.weight || 400) +
            '" fill="' +
            o.fill +
            '" text-anchor="' +
            anchor +
            '"' +
            (line
              ? ' textLength="' + length + '" lengthAdjust="spacingAndGlyphs"'
              : "") +
            ">" +
            escapeXML(line) +
            "</text>"
          );
        })
        .join("") +
      "</g>"
    );
  }
  function rect(x, y, w, h, fill, stroke, radius, extra) {
    return (
      '<rect x="' +
      x +
      '" y="' +
      y +
      '" width="' +
      w +
      '" height="' +
      h +
      '" rx="' +
      (radius || 0) +
      '" fill="' +
      fill +
      '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="1.5"' : "") +
      (extra || "") +
      "/>"
    );
  }
  function line(x1, y1, x2, y2, color, extra) {
    return (
      '<path d="M ' +
      x1 +
      " " +
      y1 +
      " L " +
      x2 +
      " " +
      y2 +
      '" fill="none" stroke="' +
      color +
      '" stroke-width="2"' +
      (extra || "") +
      "/>"
    );
  }
  function interactive(period, content, selected) {
    return (
      '<g class="ap-select" data-slide="' +
      escapeXML(period.id) +
      '" tabindex="0" role="button" aria-label="' +
      escapeXML(
        "Show " +
          (isNumbered(period) ? "dispensation " + period.number + ": " : "") +
          (period.title || shortTitle(period)),
      ) +
      '"' +
      (selected ? ' aria-current="step"' : "") +
      "><title>" +
      escapeXML(period.title || shortTitle(period)) +
      "</title>" +
      content +
      "</g>"
    );
  }
  function overline(text, x, y, w, color, align) {
    return textBox(text, {
      x: x,
      y: y,
      w: w,
      h: 24,
      size: 17,
      weight: 700,
      fill: color,
      align: align,
    });
  }
  function kind(period) {
    if (isNumbered(period)) return "DISPENSATION " + period.number;
    if (period.kind === "interval") return "UNNUMBERED INTERVAL";
    if (period.kind === "eternity") return "UNNUMBERED FINAL STATE";
    return "UNNUMBERED CREATION CONTEXT";
  }

  function footer(chart, selected, palette) {
    var source = selected ? selected.sourceLocation : chart.sourceTitle;
    return (
      line(LEFT, 1022, RIGHT, 1022, palette.line) +
      textBox("Modern schematic · Not to scale", {
        x: LEFT,
        y: 1037,
        w: 430,
        h: 25,
        size: 17,
        fill: palette.muted,
      }) +
      textBox("Source: " + (source || chart.sourceTitle || chart.title), {
        x: 540,
        y: 1035,
        w: 1292,
        h: 32,
        size: 17,
        fill: palette.muted,
        align: "right",
      })
    );
  }
  function header(chart, palette, detail) {
    return (
      overline(
        "DISPENSATIONAL ATLAS  /  " + String(chart.author || "").toUpperCase(),
        LEFT,
        51,
        1400,
        palette.brass,
      ) +
      textBox(chart.title, {
        x: LEFT,
        y: detail ? 96 : 96,
        w: 1550,
        h: detail ? 69 : 85,
        size: detail ? 48 : 62,
        serif: true,
        fill: palette.ink,
      }) +
      textBox(
        detail
          ? "A closer reading of the source"
          : "The numbered sequence, with its surrounding contexts",
        {
          x: LEFT,
          y: detail ? 170 : 187,
          w: 1470,
          h: 34,
          size: 23,
          fill: palette.muted,
        },
      ) +
      textBox(detail ? "STUDY" : "OVERVIEW", {
        x: 1620,
        y: 55,
        w: 212,
        h: 28,
        size: 17,
        weight: 700,
        align: "right",
        fill: palette.muted,
      })
    );
  }

  function overviewCard(period, x, y, palette) {
    var w = 360,
      h = 202;
    return interactive(
      period,
      rect(x, y, w, h, palette.paper, palette.line, 10, ' class="ap-card"') +
        rect(x, y, 5, h, palette.brass, null, 2) +
        '<circle cx="' +
        (x + 43) +
        '" cy="' +
        (y + 42) +
        '" r="22" fill="' +
        palette.badge +
        '"/>' +
        textBox(period.number, {
          x: x + 21,
          y: y + 25,
          w: 44,
          h: 34,
          size: 27,
          serif: true,
          fill: palette.badgeText,
          align: "center",
        }) +
        textBox("DISPENSATION", {
          x: x + 82,
          y: y + 32,
          w: 246,
          h: 23,
          size: 14,
          weight: 700,
          fill: palette.muted,
        }) +
        textBox(shortTitle(period), {
          x: x + 27,
          y: y + 79,
          w: 307,
          h: 58,
          size: 35,
          serif: true,
          fill: palette.ink,
          role: "period-short-title",
        }) +
        textBox(period.title, {
          x: x + 27,
          y: y + 143,
          w: 307,
          h: 43,
          size: 17,
          leading: 1.16,
          fill: palette.muted,
          role: "period-source-title",
        }),
    );
  }
  function contextRow(chart, palette) {
    var all = periods(chart),
      first = all.find(isNumbered),
      leading = [];
    for (var i = 0; i < all.length && !isNumbered(all[i]); i += 1)
      if (all[i].kind === "context") leading.push(all[i]);
    if (!leading.length) {
      return (
        rect(LEFT, 244, 1744, 72, palette.soft, null, 7) +
        overline(
          "BEGINNING OF THE NUMBERED SEQUENCE",
          LEFT + 22,
          257,
          520,
          palette.muted,
        ) +
        textBox(first ? first.start : "", {
          x: LEFT + 565,
          y: 258,
          w: 780,
          h: 43,
          size: 29,
          serif: true,
          fill: palette.ink,
        }) +
        textBox(all.filter(isNumbered).length + " numbered dispensations", {
          x: 1460,
          y: 266,
          w: 350,
          h: 31,
          size: 20,
          fill: palette.muted,
          align: "right",
        })
      );
    }
    var gap = 32,
      w = (1744 - gap * (leading.length - 1)) / leading.length;
    return leading
      .map(function (p, index) {
        var x = LEFT + index * (w + gap);
        return (
          interactive(
            p,
            rect(
              rounded(x),
              238,
              rounded(w),
              83,
              palette.soft,
              palette.line,
              7,
              ' class="ap-card"',
            ) +
              overline(
                "BEFORE #1 · UNNUMBERED CONTEXT",
                x + 20,
                248,
                w - 40,
                palette.muted,
              ) +
              textBox(p.title, {
                x: x + 20,
                y: 278,
                w: w - 40,
                h: 32,
                size: 27,
                serif: true,
                fill: palette.ink,
              }),
          ) +
          (index < leading.length - 1
            ? textBox("→", {
                x: x + w + 2,
                y: 265,
                w: 28,
                h: 35,
                size: 26,
                fill: palette.brass,
                align: "center",
              })
            : "")
        );
      })
      .join("");
  }
  function finalState(chart, palette) {
    var all = periods(chart),
      final = all
        .filter(function (p) {
          return p.kind === "eternity" && !isNumbered(p);
        })
        .pop();
    if (!final) return "";
    var numbers = all.filter(isNumbered),
      last = numbers[numbers.length - 1];
    return interactive(
      final,
      rect(
        LEFT,
        923,
        1744,
        77,
        palette.soft,
        palette.line,
        8,
        ' class="ap-card"',
      ) +
        overline(
          "AFTER #" + (last ? last.number : "") + " · UNNUMBERED FINAL STATE",
          LEFT + 22,
          936,
          520,
          palette.muted,
        ) +
        textBox(final.title, {
          x: LEFT + 22,
          y: 962,
          w: 660,
          h: 30,
          size: 24,
          serif: true,
          fill: palette.ink,
        }) +
        textBox("Begins: " + final.start, {
          x: 820,
          y: 940,
          w: 980,
          h: 49,
          size: 25,
          fill: palette.ink,
          centerY: true,
        }),
    );
  }
  function overview(chart, palette, arrowId) {
    var numbered = periods(chart).filter(isNumbered),
      interval = periods(chart).find(function (p) {
        return p.kind === "interval";
      });
    var x = [88, 508, 1052, 1472],
      topY = 367,
      bottomY = 687,
      output = header(chart, palette, false) + contextRow(chart, palette);
    var marker = ' marker-end="url(#' + arrowId + ')"';
    output += overline(
      "READ LEFT TO RIGHT, THEN CONTINUE ON THE NEXT ROW",
      LEFT,
      335,
      1500,
      palette.muted,
    );
    numbered.slice(0, 4).forEach(function (p, i) {
      if (i)
        output += line(
          x[i - 1] + 368,
          topY + 101,
          x[i] - 10,
          topY + 101,
          palette.brass,
          marker,
        );
      output += overviewCard(p, x[i], topY, palette);
    });
    if (numbered.length > 4) {
      output +=
        '<path d="M 1652 580 V 626 H 268 V 675" fill="none" stroke="' +
        palette.brass +
        '" stroke-width="2"' +
        marker +
        "/>";
      output +=
        rect(840, 608, 240, 36, palette.background, null, 0) +
        textBox("CONTINUE 4 → 5", {
          x: 840,
          y: 614,
          w: 240,
          h: 23,
          size: 16,
          weight: 700,
          fill: palette.muted,
          align: "center",
        });
    }
    var lower = numbered.slice(4),
      lowerX = numbered.length === 7 ? [88, 508, 1472] : x;
    lower.forEach(function (p, i) {
      output += overviewCard(p, lowerX[i], bottomY, palette);
    });
    if (lower.length > 1)
      output += line(
        456,
        bottomY + 101,
        498,
        bottomY + 101,
        palette.brass,
        marker,
      );
    if (interval) {
      var seven = numbered.length === 7,
        ix = seven ? 1021 : 889,
        iw = seven ? 362 : 142;
      var iy = seven ? 714 : 687,
        ih = seven ? 148 : 202;
      output += line(
        876,
        bottomY + 101,
        ix - 7,
        bottomY + 101,
        palette.brass,
        marker,
      );
      output += line(
        ix + iw + 8,
        bottomY + 101,
        lowerX[2] - 10,
        bottomY + 101,
        palette.brass,
        marker,
      );
      output += interactive(
        interval,
        rect(
          ix,
          iy,
          iw,
          ih,
          palette.accent,
          palette.brass,
          9,
          ' class="ap-card" stroke-dasharray="5 4"',
        ) +
          textBox("INTERVAL", {
            x: ix + 12,
            y: iy + 16,
            w: iw - 24,
            h: 25,
            size: 14,
            weight: 700,
            fill: palette.ink,
            align: "center",
          }) +
          textBox(interval.title, {
            x: ix + 11,
            y: iy + 49,
            w: iw - 22,
            h: ih - 91,
            size: seven ? 29 : 23,
            serif: true,
            fill: palette.ink,
            align: "center",
            centerY: true,
          }) +
          textBox("Unnumbered", {
            x: ix + 10,
            y: iy + ih - 31,
            w: iw - 20,
            h: 23,
            size: 14,
            fill: palette.muted,
            align: "center",
          }),
      );
    } else if (lower.length > 2)
      output += line(
        lowerX[1] + 368,
        bottomY + 101,
        lowerX[2] - 10,
        bottomY + 101,
        palette.brass,
        marker,
      );
    if (lower.length > 3)
      output += line(
        1420,
        bottomY + 101,
        1462,
        bottomY + 101,
        palette.brass,
        marker,
      );
    output += finalState(chart, palette) + footer(chart, null, palette);
    return output;
  }

  function boundary(label, value, y, palette) {
    return (
      rect(1250, y, 582, 178, palette.paper, palette.line, 9) +
      overline(label, 1277, y + 20, 520, palette.brass) +
      textBox(value, {
        x: 1277,
        y: y + 58,
        w: 525,
        h: 100,
        size: 31,
        serif: true,
        fill: palette.ink,
        role: label.toLowerCase(),
      })
    );
  }
  function runningStrip(chart, currentId, palette) {
    var items = [
      {
        id: "overview",
        title: "Overview",
        shortTitle: "Overview",
        kind: "overview",
      },
    ].concat(periods(chart));
    var gap = 7,
      w = (1744 - gap * (items.length - 1)) / items.length;
    return items
      .map(function (p, i) {
        var x = LEFT + i * (w + gap),
          selected = p.id === currentId;
        var fill = selected ? palette.badge : palette.paper,
          color = selected ? palette.badgeText : palette.ink;
        var label =
          p.id === "overview"
            ? "ALL"
            : isNumbered(p)
              ? p.number
              : p.kind === "interval"
                ? "INTERVAL"
                : p.kind === "eternity"
                  ? "FINAL"
                  : "CONTEXT";
        return interactive(
          p,
          rect(
            rounded(x),
            912,
            rounded(w),
            87,
            fill,
            selected ? palette.brass : palette.line,
            7,
            ' class="ap-card"',
          ) +
            textBox(label, {
              x: x + 6,
              y: 922,
              w: w - 12,
              h: 20,
              size: 13,
              weight: 700,
              fill: color,
              align: "center",
            }) +
            textBox(shortTitle(p), {
              x: x + 8,
              y: 949,
              w: w - 16,
              h: 41,
              size: 16,
              leading: 1.16,
              fill: color,
              align: "center",
              centerY: true,
            }),
          selected,
        );
      })
      .join("");
  }
  function detail(chart, period, palette) {
    var refs = Array.isArray(period.references)
      ? period.references.filter(function (r) {
          return typeof r === "string";
        })
      : [];
    var selectedRefs = refs.slice(0, 4),
      refsText = selectedRefs.length
        ? selectedRefs.join("  ·  ")
        : "No verse references listed for this panel.";
    var output = header(chart, palette, true);
    output += overline(kind(period), LEFT, 234, 1090, palette.brass);
    output += textBox(shortTitle(period), {
      x: LEFT,
      y: 275,
      w: 1090,
      h: 104,
      size: 75,
      serif: true,
      fill: palette.ink,
      role: "period-short-title",
    });
    output += textBox(period.title, {
      x: LEFT,
      y: 380,
      w: 1090,
      h: 59,
      size: 25,
      fill: palette.muted,
      role: "period-source-title",
    });
    output += textBox(period.summary || "", {
      x: LEFT,
      y: 461,
      w: 1084,
      h: 257,
      size: 33,
      leading: 1.36,
      fill: palette.ink,
      role: "summary",
    });
    if (period.sourceExcerpt) {
      output +=
        line(LEFT, 751, 1164, 751, palette.line) +
        overline("FROM THE ORIGINAL SOURCE", LEFT, 771, 1084, palette.brass);
      output += textBox("“" + period.sourceExcerpt + "”", {
        x: LEFT,
        y: 807,
        w: 1084,
        h: 75,
        size: 24,
        serif: true,
        leading: 1.22,
        fill: palette.muted,
        role: "source-excerpt",
      });
    }
    output +=
      boundary("FROM", period.start || "", 235, palette) +
      boundary("TO", period.end || "", 433, palette);
    output +=
      rect(1250, 631, 582, 250, palette.soft, null, 9) +
      overline(
        selectedRefs.length < refs.length
          ? "SELECTED SOURCE REFERENCES"
          : "SOURCE REFERENCES",
        1277,
        652,
        525,
        palette.brass,
      );
    output += textBox(refsText, {
      x: 1277,
      y: 693,
      w: 525,
      h: 135,
      size: 25,
      leading: 1.32,
      fill: palette.ink,
      role: "references",
    });
    if (refs.length > selectedRefs.length)
      output += textBox(
        refs.length - selectedRefs.length + " more in the study reader",
        { x: 1277, y: 842, w: 525, h: 24, size: 17, fill: palette.muted },
      );
    output +=
      runningStrip(chart, period.id, palette) + footer(chart, period, palette);
    return output;
  }

  function render(chart, slideId, theme) {
    if (!chart || !Array.isArray(chart.periods))
      throw new TypeError(
        "AtlasPresentation.render requires a chart with periods.",
      );
    var selected = periods(chart).find(function (p) {
      return p.id === slideId;
    });
    var actualId = selected ? selected.id : "overview",
      palette = PALETTES[theme === "dark" ? "dark" : "light"];
    var prefix =
      "ap-" +
      identifier(chart.id) +
      "-" +
      identifier(actualId) +
      "-" +
      (theme === "dark" ? "dark" : "light");
    var arrowId = prefix + "-arrow",
      titleId = prefix + "-title",
      descId = prefix + "-description";
    var description =
      (chart.author || "") +
      ". " +
      (chart.sourceTitle || chart.title || "") +
      ". Modern schematic, not to scale. " +
      (selected
        ? selected.summary
        : "Numbered dispensations retain the source numbers. Creation contexts, judgment intervals, and outer final states remain unnumbered.");
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      WIDTH +
      '" height="' +
      HEIGHT +
      '" viewBox="0 0 1920 1080" role="img" aria-labelledby="' +
      titleId +
      " " +
      descId +
      '" data-chart="' +
      escapeXML(chart.id || "") +
      '" data-presentation-slide="' +
      escapeXML(actualId) +
      '">' +
      '<title id="' +
      titleId +
      '">' +
      escapeXML(title(chart, actualId)) +
      '</title><desc id="' +
      descId +
      '">' +
      escapeXML(description) +
      "</desc>" +
      '<defs><marker id="' +
      arrowId +
      '" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M 0 0 L 8 4 L 0 8 Z" fill="' +
      palette.brass +
      '"/></marker></defs>' +
      "<style>.ap-select{cursor:pointer}.ap-select:focus{outline:none}.ap-select:hover>.ap-card,.ap-select:focus>.ap-card{stroke:" +
      palette.brass +
      ";stroke-width:3}</style>" +
      rect(0, 0, WIDTH, HEIGHT, palette.background, null, 0) +
      (selected
        ? detail(chart, selected, palette)
        : overview(chart, palette, arrowId)) +
      "</svg>"
    );
  }

  return Object.freeze({ slides: slides, render: render, title: title });
});
