"use strict";

(() => {
  const charts = window.ATLAS_DATA?.charts || window.ATLAS_DATA || [];
  const passages = window.ATLAS_PASSAGES || {};
  const meta = window.ATLAS_META || {};
  const $ = (s, parent = document) => parent.querySelector(s);
  const $$ = (s, parent = document) => [...parent.querySelectorAll(s)];
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const paths = {
    book: "M4 3h12a2 2 0 0 1 2 2v15H5a3 3 0 0 1 0-6h13M5 3v11M8 7h6",
    "book-open":
      "M12 5v15M12 5C8 2 4 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-2-1-6-2-10 1Z",
    columns: "M3 4h18v16H3zM12 4v16",
    moon: "M20 14a8 8 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z",
    sun: "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    link: "m10 13 4-4M8 15l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M13 9l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0",
    printer: "M6 9V3h12v6M6 18H3V9h18v9h-3M6 14h12v7H6zM17 11h1",
    play: "m8 4 12 8-12 8Z",
    minus: "M5 12h14",
    plus: "M5 12h14M12 5v14",
    fit: "M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5M8 8h8v8H8z",
    fullscreen: "M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5",
    collapse: "M3 8h5V3M16 3v5h5M21 16h-5v5M8 21v-5H3",
    screen: "M3 3h18v13H3zM12 16v5M8 21h8",
    search: "M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.5 4.5L21 21",
    "arrow-left": "M20 12H4m6-6-6 6 6 6",
    "arrow-right": "M4 12h16m-6-6 6 6-6 6",
    x: "m6 6 12 12M6 18 18 6",
    layers: "m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5",
    external: "M14 3h7v7M21 3 10 14M10 3H3v18h18v-7",
    check: "m5 12 4 4L20 5",
    copy: "M8 8h13v13H8zM16 8V3H3v13h5",
  };
  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.book}"></path></svg>`;
  const icons = (root = document) =>
    $$("[data-icon]", root).forEach((el) => {
      el.innerHTML = icon(el.dataset.icon);
    });
  const safeLink = (url) => (/^https?:\/\//.test(url || "") ? url : "#");
  const external = (url, label, cls = "") =>
    `<a href="${esc(safeLink(url))}" target="_blank" rel="noopener noreferrer" class="${cls}">${esc(label)} ${icon("external")}</a>`;
  if (!Array.isArray(charts) || !charts.length) {
    $(".page-shell").innerHTML =
      '<div class="loading-error"><h2>The study could not load.</h2><p>Please refresh the page to load the chart data.</p></div>';
    icons();
    return;
  }
  const palette = [
    "#97754c",
    "#a16b49",
    "#927546",
    "#727f59",
    "#667d83",
    "#587b74",
    "#a67b5a",
    "#758394",
    "#a6864c",
  ];
  let state = {
    chartId: charts[0].id,
    selected: null,
    view: "modern",
    tab: "study",
    query: "",
    zoom: 0.85,
    tour: false,
    autoFit: true,
  };
  let diagramWidth = 1400;
  let diagramHeight = 550;
  let positions = new Map();
  let toastTimer;
  let dialogReturnFocus;
  let chartFullscreen = null;
  let chartFullscreenFitFrame = 0;
  const getChart = () =>
    charts.find((c) => c.id === state.chartId) || charts[0];
  const relationships = (c = getChart()) =>
    (c.parallelBands || []).map((b, i) => ({
      ...b,
      id: b.id || `relationship-${i + 1}`,
      itemType: "relationship",
      start:
        b.startLabel ||
        c.periods.find((p) => p.id === b.startPeriod)?.title ||
        "",
      end:
        b.endLabel || c.periods.find((p) => p.id === b.endPeriod)?.title || "",
    }));
  const allItems = () => [
    ...getChart().periods.map((p) => ({ ...p, itemType: "period" })),
    ...(getChart().events || []).map((e) => ({ ...e, itemType: "event" })),
    ...relationships(),
  ];
  const getItem = () =>
    allItems().find((p) => p.id === state.selected) || {
      ...getChart().periods[0],
      itemType: "period",
    };
  const isContext = (p) =>
    p.kind === "context" || (p.kind === "eternity" && p.number == null);
  const kindLabel = (p) =>
    p.itemType === "event"
      ? "Chart event"
      : p.itemType === "relationship"
        ? "Chart relationship"
        : p.number != null
          ? `Dispensation ${p.number}`
          : p.kind === "interval"
            ? "Unnumbered interval"
            : "Source context";
  const chartLabel = (c) =>
    c.id === "larkin-ages"
      ? "Ages & Dispensations"
      : c.id === "larkin-dividing"
        ? "Rightly Dividing the Word"
        : "The Seven Dispensations";
  const textWrap = (text, limit = 17, max = 4) => {
    const words = String(text || "").split(/\s+/),
      lines = [];
    let line = "";
    for (const word of words) {
      if (line && (line + " " + word).length > limit) {
        lines.push(line);
        line = word;
      } else line += (line ? " " : "") + word;
    }
    if (line) lines.push(line);
    if (lines.length > max)
      return [...lines.slice(0, max - 1), lines.slice(max - 1).join(" ")];
    return lines;
  };
  const svgText = (text, x, y, cls, limit = 17, lineHeight = 20, max = 4) =>
    `<text x="${x}" y="${y}" class="${cls}" text-anchor="middle">${textWrap(
      text,
      limit,
      max,
    )
      .map(
        (l, i) =>
          `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(l)}</tspan>`,
      )
      .join("")}</text>`;
  const sourceText = (c) =>
    typeof c.sourceText === "string"
      ? c.sourceText
      : Array.isArray(c.sourceText)
        ? c.sourceText
            .map((s) =>
              typeof s === "string" ? s : `${s.title || ""}\n\n${s.text || ""}`,
            )
            .join("\n\n")
        : "";
  const references = (item) =>
    Array.isArray(item.references)
      ? item.references
          .map((r) => (typeof r === "string" ? r : r.reference || r.ref || ""))
          .filter(Boolean)
      : [];
  const verseButtons = (item) =>
    references(item)
      .map(
        (r) =>
          `<button class="verse-button" data-reference="${esc(r)}">${esc(r)} ${icon("external")}</button>`,
      )
      .join("");
  function route(push = false) {
    const params = new URLSearchParams({
      chart: state.chartId,
      view: state.view,
    });
    if (state.selected) params.set("item", state.selected);
    history[push ? "pushState" : "replaceState"](
      null,
      "",
      `${location.pathname}${location.search}#${params}`,
    );
  }
  function readRoute() {
    const params = new URLSearchParams(location.hash.slice(1));
    const chart = charts.find((c) => c.id === params.get("chart")) || charts[0];
    state.chartId = chart.id;
    state.view = ["modern", "original", "outline"].includes(params.get("view"))
      ? params.get("view")
      : "modern";
    const items = [
      ...chart.periods,
      ...(chart.events || []),
      ...relationships(chart),
    ];
    state.selected = items.some((i) => i.id === params.get("item"))
      ? params.get("item")
      : (
          chart.periods.find((p) => String(p.number) === "1") ||
          chart.periods[0]
        ).id;
    state.revealRouteItem = params.has("item");
    state.query = "";
    state.tour = false;
  }
  function chooseChart(id) {
    if (!charts.some((c) => c.id === id)) return;
    state.chartId = id;
    state.query = "";
    state.tab = "study";
    state.tour = false;
    state.zoom = 0.85;
    state.autoFit = true;
    state.selected = (
      getChart().periods.find((p) => String(p.number) === "1") ||
      getChart().periods[0]
    ).id;
    route(true);
    renderAll();
  }
  function selectItem(id, options = {}) {
    if (!allItems().some((p) => p.id === id)) return;
    const restoreCanvasFocus = Boolean(
      document.activeElement?.closest("#chart-surface,[data-select]"),
    );
    state.selected = id;
    if (state.tour && !getChart().periods.some((p) => p.id === id))
      state.tour = false;
    if (options.tab) state.tab = options.tab;
    route();
    renderDetail();
    renderSurface();
    renderTour();
    if (restoreCanvasFocus) {
      const replacement =
        $(`[data-select="${CSS.escape(id)}"]`, $("#chart-surface")) ||
        $("#chart-viewport");
      replacement.focus({ preventScroll: true });
    }
    if (options.reveal && state.view === "modern") {
      const pos = positions.get(id),
        viewport = $("#chart-viewport");
      if (pos)
        viewport.scrollTo({
          left: Math.max(0, pos.x * state.zoom - viewport.clientWidth / 2),
          top: Math.max(0, pos.y * state.zoom - viewport.clientHeight / 2),
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
    }
    if (options.detail && matchMedia("(max-width: 900px)").matches)
      $("#detail-panel").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
  }
  function renderAll() {
    const c = getChart();
    document.title = `${chartLabel(c)} — Dispensational Atlas`;
    $("#study-nav").innerHTML = charts
      .map(
        (chart, i) =>
          `<button class="study-choice" data-chart="${esc(chart.id)}" ${chart.id === c.id ? 'aria-current="page"' : ""}><span class="choice-number">0${i + 1}</span><span class="choice-copy"><strong>${esc(chartLabel(chart))}</strong><small>${esc(chart.author)} · ${chart.id === "scofield" ? "From his original text" : "Historical chart"}</small></span><span class="choice-arrow" aria-hidden="true">↗</span></button>`,
      )
      .join("");
    $("#study-author").textContent = c.author;
    $("#study-title").textContent = c.title;
    $("#study-subtitle").textContent = c.subtitle || c.description;
    $("#original-view-button").textContent = c.originalImage
      ? "Original chart"
      : "Original text";
    $("#search-input").value = state.query;
    $("#context-content").innerHTML =
      `<p>${esc(c.description || "")}</p><p>${esc(c.editionNote || "")}</p><button class="inline-link" data-open-edition>Read source distinctions and edition notes</button>`;
    renderSurface();
    if (
      state.autoFit &&
      state.view === "modern" &&
      $("#chart-viewport").clientWidth > 600
    ) {
      state.zoom = Math.max(
        0.2,
        Math.min(0.95, ($("#chart-viewport").clientWidth - 8) / diagramWidth),
      );
      state.zoom = Math.floor(state.zoom * 100) / 100;
      renderSurface();
    }
    state.autoFit = false;
    renderDetail();
    renderTour();
    renderSearch();
    icons();
    if (state.revealRouteItem && state.view === "modern") {
      const pos = positions.get(state.selected),
        viewport = $("#chart-viewport");
      if (pos) {
        viewport.scrollLeft = Math.max(
          0,
          pos.x * state.zoom - viewport.clientWidth / 2,
        );
        viewport.scrollTop = Math.max(
          0,
          pos.y * state.zoom - viewport.clientHeight / 2,
        );
      }
    }
    state.revealRouteItem = false;
  }
  function renderSurface() {
    $$("[data-view]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.view === state.view)),
    );
    const c = getChart(),
      surface = $("#chart-surface");
    const oldTop = $("#chart-viewport").scrollTop,
      oldLeft = $("#chart-viewport").scrollLeft;
    const isOriginalImage = state.view === "original" && c.originalImage;
    $(".diagram-hint").textContent =
      state.view === "modern"
        ? "Select an era or event to explore ↗"
        : state.view === "original"
          ? c.originalImage
            ? "Zoom to examine the original plate"
            : "Read the author’s original wording"
          : "Select a heading to expand its notes";
    $(".zoom-controls").hidden =
      state.view === "outline" ||
      (state.view === "original" && !c.originalImage);
    $(".zoom-controls").style.display = $(".zoom-controls").hidden
      ? "none"
      : "flex";
    if (state.view === "modern") renderModern();
    else if (state.view === "original" && c.originalImage) {
      diagramWidth = c.imageWidth || 1650;
      surface.innerHTML = `<div class="original-stage" style="width:${Math.round(diagramWidth * state.zoom)}px"><img src="${esc(c.originalImage)}" alt="Original ${esc(c.title)} chart by ${esc(c.author)}; use the study outline for accessible text." draggable="false"><div class="original-description"><p>${esc(c.editionNote || "")}</p><p>${external(c.originalImageUrl || c.sourceUrl, "View the original source", "source-link")}</p></div></div>`;
      $("#diagram-caption").textContent =
        "The original plate · zoom to inspect";
    } else if (state.view === "original") {
      const txt = sourceText(c);
      surface.innerHTML = `<article class="source-transcript"><p class="source-note">${esc(c.sourceTextNote || "Original author text. Historical quotations retain their source wording; the separate Scripture reader uses KJV.")} ${external(c.sourceUrl, "Open source")}</p><h3>${esc(c.sourceTitle || c.title)}</h3>${
        txt
          ? txt
              .split(/\n\s*\n/)
              .map((p) => `<p>${esc(p.trim())}</p>`)
              .join("")
          : "<p>Read the original text using the source link above.</p>"
      }</article>`;
      $("#diagram-caption").textContent = "Author text · original wording";
    } else {
      surface.innerHTML = `<div class="outline">${c.periods.map((p) => `<div class="outline-group ${p.id === state.selected ? "selected" : ""}"><button class="outline-button" data-select="${esc(p.id)}" aria-expanded="${p.id === state.selected}"><span class="outline-number">${esc(p.number ?? "·")}</span><span><strong>${esc(p.title)}</strong><small>${esc(p.start || "")}${p.end ? " → " + esc(p.end) : ""}</small></span><span class="outline-arrow">${p.id === state.selected ? "−" : "+"}</span></button>${p.id === state.selected ? `<div class="outline-expanded"><p>${esc(p.summary)}</p>${(p.details || []).map((d) => `<p><strong>${esc(d.label)}.</strong> ${esc(d.text)}</p>`).join("")}<div class="reference-chips">${verseButtons(p)}</div><button class="inline-link" data-detail-scroll>Read source notes ↓</button></div>` : ""}</div>`).join("")}<h3 style="margin:24px 0 10px;font-size:13px">Events in this study</h3>${(c.events || []).map((e) => `<div class="outline-group ${e.id === state.selected ? "selected" : ""}"><button class="outline-button" data-select="${esc(e.id)}" aria-expanded="${e.id === state.selected}"><span class="outline-number">◇</span><span><strong>${esc(e.title)}</strong><small>${esc(eventPositionText(e))}</small></span><span class="outline-arrow">${e.id === state.selected ? "−" : "+"}</span></button>${e.id === state.selected ? `<div class="outline-expanded"><p>${esc(e.summary)}</p><div class="reference-chips">${verseButtons(e)}</div></div>` : ""}</div>`).join("")}</div>`;
      $("#diagram-caption").textContent =
        "Complete study outline · select to expand";
    }
    $("#zoom-level").textContent = `${Math.round(state.zoom * 100)}%`;
    $("#zoom-out").disabled = state.zoom <= 0.2;
    $("#zoom-in").disabled = state.zoom >= 2.5;
    $("#chart-legend").innerHTML =
      state.view === "modern"
        ? '<span class="legend-item"><i class="legend-swatch"></i>Numbered dispensation</span><span class="legend-item"><i class="legend-swatch interval"></i>Unnumbered interval</span><span class="legend-item"><i class="legend-swatch context"></i>Context beyond the main sequence</span><span class="legend-item"><i class="legend-swatch event"></i>Related event</span>'
        : "<span>Historical source and Scripture remain independently inspectable.</span>";
    $("#relationship-strip").innerHTML = relationships(c).length
      ? `<details class="relationships" ${getItem().itemType === "relationship" ? "open" : ""}><summary>Across the chart <span>${relationships(c).length} source relationships</span></summary><div class="relationship-grid">${relationships(
          c,
        )
          .map(
            (b) =>
              `<button class="relationship-button ${b.id === state.selected ? "active" : ""}" data-select="${esc(b.id)}"><span>${esc(b.title)}</span><small>${esc(b.start)}${b.end && b.end !== b.start ? " → " + esc(b.end) : ""}</small></button>`,
          )
          .join("")}</div></details>`
      : "";
    $("#chart-viewport").scrollTop = oldTop;
    $("#chart-viewport").scrollLeft = oldLeft;
    icons(surface);
  }
  function matchItem(item) {
    if (!state.query) return true;
    const text = [
      item.title,
      item.shortTitle,
      item.start,
      item.end,
      item.summary,
      item.sourceExcerpt,
      ...references(item),
      ...(item.details || []).map((d) => d.label + " " + d.text),
    ]
      .join(" ")
      .toLowerCase();
    return state.query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .every((word) => text.includes(word));
  }
  function renderModern() {
    const c = getChart(),
      main = c.periods.filter((p) => !isContext(p)),
      contexts = c.periods.filter(isContext);
    const cardW = 136,
      gap = 18,
      left = 35,
      step = cardW + gap;
    diagramWidth = Math.max(900, left * 2 + main.length * step - gap);
    positions = new Map();
    const mainIndex = new Map(main.map((p, i) => [p.id, i]));
    let contextBits = "";
    if (contexts.length) {
      const contextW = Math.min(
        290,
        (diagramWidth - 70) / contexts.length - 14,
      );
      contextBits = contexts
        .map((p, i) => {
          const isBeyond =
            p.kind === "eternity" ||
            /omega|eternity future|after time/i.test(p.id + " " + p.title);
          const x = isBeyond
              ? diagramWidth - left - contextW
              : left + i * (contextW + 14),
            sel = p.id === state.selected;
          positions.set(p.id, { x: x + contextW / 2, y: 40 });
          return `<g class="era-group era-context ${sel ? "is-selected" : ""} ${matchItem(p) ? "" : "is-dim"}" tabindex="0" role="button" aria-label="${esc(p.title)}; source context" data-select="${esc(p.id)}"><title>${esc(p.title)}</title><rect class="era-box" x="${x}" y="20" width="${contextW}" height="43" rx="6"></rect><text x="${x + 12}" y="36" class="era-kind">${isBeyond ? "BEYOND THE SEQUENCE" : "SOURCE CONTEXT"}</text><text x="${x + 12}" y="53" class="era-subtitle">${esc(p.shortTitle || p.title)}</text></g>`;
        })
        .join("");
    }
    const ageBase = contexts.length ? 88 : 35;
    const ageRows = [];
    const ageBits = [...(c.ages || []), ...(c.subAges || [])]
      .map((a) => {
        let s = mainIndex.get(a.startPeriod),
          e = mainIndex.get(a.endPeriod);
        if (s == null || e == null) return "";
        if (e < s) [s, e] = [e, s];
        let row = 0;
        while (ageRows[row]?.some((r) => !(e < r[0] || s > r[1]))) row++;
        (ageRows[row] ||= []).push([s, e]);
        const x = left + s * step,
          w = (e - s + 1) * step - gap,
          y = ageBase + row * 34;
        return `<path class="age-line" d="M${x} ${y + 23}v-7H${x + w}v7"></path>${svgText(a.title || a.name, x + w / 2, y + 9, "age-text", Math.max(13, Math.floor(w / 7)), 14, 1)}`;
      })
      .join("");
    const cardY = ageBase + Math.max(1, ageRows.length) * 34 + 30;
    const cardH = 148,
      axisY = cardY + cardH + 42;
    const cardBits = main
      .map((p, i) => {
        const x = left + i * step,
          center = x + cardW / 2,
          col = palette[i % palette.length],
          selected = p.id === state.selected;
        positions.set(p.id, { x: center, y: cardY + 70 });
        return `<g class="era-group ${selected ? "is-selected" : ""} ${matchItem(p) ? "" : "is-dim"}" style="--item-accent:${col}" tabindex="0" role="button" aria-label="${esc(kindLabel(p) + ": " + p.title)}" aria-pressed="${selected}" data-select="${esc(p.id)}"><title>${esc(p.title + " — " + p.start + " to " + p.end)}</title><rect class="era-box" x="${x}" y="${cardY}" width="${cardW}" height="${cardH}" rx="9"></rect><rect class="era-stripe" x="${x + 1}" y="${cardY + 1}" width="${cardW - 2}" height="4" rx="3" fill="${col}"></rect><circle cx="${center}" cy="${cardY + 28}" r="13" fill="${col}"></circle><text x="${center}" y="${cardY + 32}" text-anchor="middle" class="era-number">${esc(p.number ?? "·")}</text>${svgText(p.shortTitle || p.title, center, cardY + 64, "era-title", 16, 19, 3)}<text x="${center}" y="${cardY + 118}" text-anchor="middle" class="era-kind">${p.number != null ? "DISPENSATION" : p.kind === "interval" ? "INTERVAL" : "CONTEXT"}</text><text x="${center}" y="${cardY + 136}" text-anchor="middle" class="era-link">Explore ${references(p).length ? "· " + references(p).length + " refs" : "→"}</text></g><path class="guide-line" d="M${center} ${cardY + cardH}v42"></path><circle cx="${center}" cy="${axisY}" r="4" fill="${col}"></circle>`;
      })
      .join("");
    const eventGroups = main.map(() => []),
      contextEvents = [];
    (c.events || []).forEach((e) => {
      const parent = e.withinPeriod || e.duringPeriod || e.afterPeriod;
      if (mainIndex.has(parent)) eventGroups[mainIndex.get(parent)].push(e);
      else contextEvents.push(e);
    });
    let maxEvents = 0;
    const eventBits = eventGroups
      .map((events, i) => {
        maxEvents = Math.max(maxEvents, events.length);
        return events
          .map((e, j) => {
            const x = left + i * step,
              y = axisY + 36 + j * 65;
            positions.set(e.id, { x: x + cardW / 2, y: y + 23 });
            const inPeriod = Boolean(
              e.withinPeriod || e.duringPeriod || e.placement === "during",
            );
            return `<g class="event-group ${e.id === state.selected ? "is-selected" : ""} ${matchItem(e) ? "" : "is-dim"}" tabindex="0" role="button" aria-label="${esc(e.title + "; " + eventPositionText(e))}" data-select="${esc(e.id)}"><title>${esc(e.title + " — " + eventPositionText(e))}</title><rect class="event-box" x="${x}" y="${y}" width="${cardW}" height="56" rx="5"></rect><text x="${x + 8}" y="${y + 12}" class="era-kind" style="font-size:7px">${inPeriod ? "WITHIN THE PERIOD" : "AT / AFTER THE PERIOD"}</text>${svgText(e.title, x + cardW / 2, y + 29, "event-text", 22, 13, 2)}</g>`;
          })
          .join("");
      })
      .join("");
    const bottom = axisY + 36 + maxEvents * 65;
    let extraBits = "";
    if (contextEvents.length) {
      extraBits =
        `<text x="${left}" y="${bottom + 14}" class="axis-label">FURTHER SOURCE EVENTS</text>` +
        contextEvents
          .map((e, i) => {
            const columns = Math.max(1, Math.floor((diagramWidth - 70) / 210)),
              x = left + (i % columns) * 210,
              y = bottom + 27 + Math.floor(i / columns) * 60;
            positions.set(e.id, { x: x + 99, y: y + 25 });
            return `<g class="event-group ${e.id === state.selected ? "is-selected" : ""}" role="button" tabindex="0" data-select="${esc(e.id)}" aria-label="${esc(e.title)}"><rect class="event-box" x="${x}" y="${y}" width="198" height="47" rx="5"></rect>${svgText(e.title, x + 99, y + 20, "event-text", 30, 14, 2)}</g>`;
          })
          .join("");
    }
    diagramHeight =
      bottom +
      (contextEvents.length
        ? 90 +
          Math.floor(
            (contextEvents.length - 1) /
              Math.max(1, Math.floor((diagramWidth - 70) / 210)),
          ) *
            60
        : 24);
    $("#chart-surface").innerHTML =
      `<svg class="timeline-svg" width="${Math.round(diagramWidth * state.zoom)}" height="${Math.round(diagramHeight * state.zoom)}" viewBox="0 0 ${diagramWidth} ${diagramHeight}" role="group" aria-label="${esc(c.title)} interactive schematic"><desc>Source periods arranged in reading order. Widths do not represent duration. Select any labeled period or event for the original wording, notes, and KJV passages. Use Study outline for a linear accessible presentation.</desc>${contextBits}${ageBits}<path class="axis" d="M${left} ${axisY}H${diagramWidth - left + 7}m-6-5 6 5-6 5"></path><text x="${left}" y="${axisY + 22}" class="axis-label">SOURCE SEQUENCE · NOT TO SCALE</text>${cardBits}${eventBits}${extraBits}</svg>`;
    $("#diagram-caption").textContent = "A reading map of the author’s scheme";
  }
  function eventPositionText(e) {
    const c = getChart(),
      within = e.withinPeriod || e.duringPeriod;
    const parent = c.periods.find((p) => p.id === (within || e.afterPeriod));
    if (within && parent) return `Within ${parent.shortTitle || parent.title}`;
    if (parent) return `At or after ${parent.shortTitle || parent.title}`;
    return e.placement === "before"
      ? "Before the numbered dispensations"
      : "See the original source for placement";
  }
  function renderDetail() {
    const c = getChart(),
      item = getItem(),
      list = c.periods,
      index = list.findIndex((p) => p.id === item.id);
    const bound =
      item.itemType === "event"
        ? `<div class="detail-bound"><span>Place</span>${esc(eventPositionText(item))}</div>`
        : `${item.start ? `<div class="detail-bound"><span>From</span>${esc(item.start)}</div>` : ""}${item.end ? `<div class="detail-bound"><span>To</span>${esc(item.end)}</div>` : ""}`;
    let body = "";
    if (state.tab === "study")
      body = `<p class="summary">${esc(item.summary)}</p>${(item.details || []).map((d) => `<section class="detail-section"><h4>${esc(d.label)}</h4><p>${esc(d.text)}</p></section>`).join("")}${references(item).length ? `<section class="detail-section"><h4>Read in the KJV</h4><div class="reference-chips">${verseButtons(item)}</div></section>` : ""}`;
    else if (state.tab === "scripture")
      body = `<p class="attribution">KJV passages open here without leaving the chart. References come from the plate or the author’s accompanying text; their provenance is recorded under Source.</p><div class="reference-chips">${verseButtons(item)}</div>${references(item).length ? "" : '<p class="summary" style="margin-top:16px">No verse citation is assigned to this item in this study. Inspect the original source for its context.</p>'}`;
    else
      body = `<span class="source-inline-label">Original source wording</span>${item.sourceExcerpt ? `<blockquote class="source-excerpt">${esc(item.sourceExcerpt)}</blockquote>` : '<p class="attribution">This item summarizes the identified source. Follow the source link to inspect its wording and context.</p>'}<p class="attribution">${esc(item.sourceLocation || c.sourceTitle)}</p>${item.referenceProvenance || item.referenceBasis ? `<section class="detail-section"><h4>Reference provenance</h4><p>${esc(typeof (item.referenceProvenance || item.referenceBasis) === "string" ? item.referenceProvenance || item.referenceBasis : JSON.stringify(item.referenceProvenance || item.referenceBasis))}</p></section>` : ""}<p class="attribution" style="margin-top:14px">Study notes are a modern summary. Source quotations retain the author’s wording, including any expressly noted R.V. quotations. The Scripture reader is KJV.</p>${external(item.sourceUrl || c.sourceUrl, "Read the original source", "source-link")}<section class="detail-section"><button class="inline-link" data-open-edition>Edition distinctions and source notes</button></section>`;
    $("#detail-content").innerHTML =
      `<div class="detail-top"><button class="inline-link mobile-return" data-return-chart>↑ Back to chart</button><div class="detail-top-row"><span class="detail-badge">${esc(kindLabel(item))}</span><div class="detail-nav"><button class="icon-button" data-step="-1" aria-label="Previous period" ${index <= 0 ? "disabled" : ""}>${icon("arrow-left")}</button><button class="icon-button" data-step="1" aria-label="Next period" ${index < 0 || index >= list.length - 1 ? "disabled" : ""}>${icon("arrow-right")}</button></div></div><h3>${esc(item.shortTitle || item.title)}</h3><p class="detail-exact">${esc(item.title)}</p><div class="detail-bounds">${bound}</div></div><div class="detail-tabs" role="tablist" aria-label="Study detail"><button class="detail-tab" role="tab" aria-selected="${state.tab === "study"}" data-tab="study" id="tab-study" aria-controls="detail-body">Study notes</button><button class="detail-tab" role="tab" aria-selected="${state.tab === "scripture"}" data-tab="scripture" id="tab-scripture" aria-controls="detail-body">Scripture</button><button class="detail-tab" role="tab" aria-selected="${state.tab === "source"}" data-tab="source" id="tab-source" aria-controls="detail-body">Source</button></div><div class="detail-body" id="detail-body" role="tabpanel" aria-labelledby="tab-${state.tab}">${body}</div>`;
  }
  function renderSearch() {
    const q = state.query.trim(),
      items = allItems().filter(matchItem);
    $("#search-results").hidden = !q;
    $("#search-count").textContent = q
      ? `${items.length} ${items.length === 1 ? "match" : "matches"}`
      : "";
    $("#search-results").innerHTML = q
      ? items.length
        ? items
            .map(
              (i) =>
                `<button class="result-button" data-search-select="${esc(i.id)}">${esc(i.shortTitle || i.title)} <em>${i.itemType === "event" ? "event" : i.itemType === "relationship" ? "relationship" : i.number != null ? "#" + i.number : i.kind === "interval" ? "interval" : "context"}</em></button>`,
            )
            .join("")
        : '<p class="empty-search">No matches in this chart. Try a name such as “Moses”, an event, or a reference such as “Revelation”.</p>'
      : "";
  }
  function renderTour() {
    const c = getChart(),
      index = c.periods.findIndex((p) => p.id === state.selected),
      p = c.periods[Math.max(0, index)];
    $("#tour-bar").hidden = !state.tour;
    $("#tour-button").innerHTML =
      `${icon(state.tour ? "x" : "play")}${state.tour ? "End study" : "Guided study"}`;
    $("#tour-step").textContent =
      `STEP ${Math.max(0, index) + 1} OF ${c.periods.length} · ${c.author}`;
    $("#tour-title").textContent = p.shortTitle || p.title;
    $("#tour-prev").disabled = index <= 0;
    $("#tour-next").innerHTML =
      index >= c.periods.length - 1
        ? `Finish ${icon("check")}`
        : `Next ${icon("arrow-right")}`;
  }
  function step(amount) {
    const ps = getChart().periods,
      index = ps.findIndex((p) => p.id === state.selected),
      next = Math.max(0, Math.min(ps.length - 1, index + amount));
    selectItem(ps[next].id, { reveal: true });
  }
  function setZoom(zoom, fit = false) {
    const viewport = $("#chart-viewport"),
      old = state.zoom,
      cx = (viewport.scrollLeft + viewport.clientWidth / 2) / old,
      cy = (viewport.scrollTop + viewport.clientHeight / 2) / old;
    state.zoom = Math.max(
      fit ? 0.05 : 0.2,
      Math.min(
        2.5,
        fit ? Math.floor(zoom * 1000) / 1000 : Math.round(zoom * 100) / 100,
      ),
    );
    renderSurface();
    viewport.scrollLeft = Math.max(
      0,
      cx * state.zoom - viewport.clientWidth / 2,
    );
    viewport.scrollTop = Math.max(
      0,
      cy * state.zoom - viewport.clientHeight / 2,
    );
  }
  function updateFullscreenButton() {
    const active = Boolean(chartFullscreen),
      button = $("#fullscreen-button");
    button.innerHTML = `${icon(active ? "collapse" : "fullscreen")}<span>${active ? "Exit full screen" : "Full screen"}</span>`;
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute(
      "aria-label",
      active ? "Exit full screen" : "Expand chart to full screen",
    );
    button.title = active
      ? "Exit full screen (Escape)"
      : "Expand chart to full screen";
  }
  function fitExpandedChart() {
    cancelAnimationFrame(chartFullscreenFitFrame);
    chartFullscreenFitFrame = requestAnimationFrame(() => {
      if (
        !chartFullscreen ||
        state.view === "outline" ||
        (state.view === "original" && !getChart().originalImage)
      )
        return;
      setZoom(($("#chart-viewport").clientWidth - 8) / diagramWidth, true);
    });
  }
  function restoreChartScreen() {
    const saved = chartFullscreen;
    if (!saved) return;
    chartFullscreen = null;
    cancelAnimationFrame(chartFullscreenFitFrame);
    const card = $("#chart-card");
    card.classList.remove("is-expanded");
    card.removeAttribute("role");
    card.removeAttribute("aria-modal");
    card.removeAttribute("aria-label");
    document.body.classList.remove("chart-expanded");
    updateFullscreenButton();
    state.zoom = saved.zoom;
    renderSurface();
    requestAnimationFrame(() => {
      if (chartFullscreen) return;
      const viewport = $("#chart-viewport");
      viewport.scrollLeft = state.view === saved.view ? saved.left : 0;
      viewport.scrollTop = state.view === saved.view ? saved.top : 0;
      window.scrollTo({
        left: saved.pageX,
        top: saved.pageY,
        behavior: "auto",
      });
      if (saved.focus?.isConnected) saved.focus.focus({ preventScroll: true });
    });
  }
  async function exitChartFullscreen() {
    const saved = chartFullscreen;
    if (!saved) return;
    if (
      document.fullscreenElement === $("#chart-card") &&
      document.exitFullscreen
    ) {
      try {
        await document.exitFullscreen();
      } catch {}
    }
    if (chartFullscreen === saved) restoreChartScreen();
  }
  async function enterChartFullscreen() {
    if (chartFullscreen) return;
    const card = $("#chart-card"),
      viewport = $("#chart-viewport");
    const saved = {
      zoom: state.zoom,
      view: state.view,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
      pageX: window.scrollX,
      pageY: window.scrollY,
      focus: document.activeElement,
      native: false,
    };
    chartFullscreen = saved;
    card.classList.add("is-expanded");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    card.setAttribute("aria-label", `${getChart().title} full-screen chart`);
    document.body.classList.add("chart-expanded");
    updateFullscreenButton();
    fitExpandedChart();
    $("#fullscreen-button").focus({ preventScroll: true });
    // Expand immediately; this remains usable when the browser denies native fullscreen.
    if (card.requestFullscreen) {
      try {
        await card.requestFullscreen();
        if (
          chartFullscreen !== saved &&
          document.fullscreenElement === card &&
          document.exitFullscreen
        )
          await document.exitFullscreen();
      } catch {}
    }
  }
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === $("#chart-card")) {
      if (chartFullscreen) {
        chartFullscreen.native = true;
        fitExpandedChart();
      }
    } else if (chartFullscreen?.native) restoreChartScreen();
  });
  window.addEventListener("resize", () => {
    if (chartFullscreen) fitExpandedChart();
  });
  function openDialog(eyebrow, html, wide = false) {
    const dialog = $("#reader-dialog");
    dialogReturnFocus = document.activeElement;
    $("#dialog-eyebrow").textContent = eyebrow;
    $("#dialog-content").innerHTML = html;
    dialog.style.width = wide ? "min(1040px, calc(100vw - 28px))" : "";
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    $("#dialog-close").focus();
    icons(dialog);
  }
  function openReference(ref) {
    const p = passages[ref];
    const url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=KJV`;
    if (!p || p.error || !p.verses?.length) {
      openDialog(
        "SCRIPTURE REFERENCE",
        `<h2 id="dialog-title">${esc(ref)}</h2><p>${esc(p?.error || "This source citation is retained as printed. Open a KJV Bible to examine the passage in its context.")}</p><p>${external(url, "Open this reference in the KJV", "source-link")}</p><p class="attribution">No text has been guessed or substituted.</p>`,
      );
      return;
    }
    openDialog(
      "KING JAMES VERSION · SCRIPTURE",
      `<h2 id="dialog-title">${esc(ref)}</h2><p class="attribution">Authorized Version · ${p.verses.length} ${p.verses.length === 1 ? "verse" : "verses"}</p><div class="verse-list">${p.verses.map((v) => `<p class="verse-line"><sup>${esc(v.label || v.verse)}</sup>${esc(v.text)}</p>`).join("")}</div><div class="reader-footer"><button class="text-button" data-copy-reference="${esc(ref)}">${icon("copy")}Copy passage</button>${external(url, "Read in context", "source-link")}<p>${esc(meta.scriptureAttribution || "KJV text, retained from the named digital source.")} <button class="inline-link" data-open-sources>Text sources</button></p></div>`,
    );
  }
  function openEdition() {
    const c = getChart();
    openDialog(
      "SOURCE EDITION & READING NOTES",
      `<h2 id="dialog-title">${esc(c.title)}</h2><p>${esc(c.editionNote || "")}</p>${(c.notes || []).map((n) => `<section class="note-block"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>${n.sourceUrl ? external(n.sourceUrl, "Source", "source-link") : ""}</section>`).join("")}<section class="note-block"><h3>What the modern chart represents</h3><p>The interactive map follows this edition’s sequence and labels. Equal-width cards do not imply equal durations. Condensed study notes are identified separately from source quotations. The original plate or author text preserves the complete historical presentation.</p></section><section class="note-block"><h3>Scripture and interpretation</h3><p>The chart presents its author’s dispensational interpretation. KJV passages are available to examine that interpretation. Period labels, chronological calculations, and interpretive boundaries are attributed to the source; they are not additional words of Scripture.</p></section>`,
    );
  }
  function openSources() {
    const cards = charts
      .map(
        (c) =>
          `<h3>${esc(c.author)} — ${esc(c.title)}</h3><p>${esc(c.editionNote || "")}</p><ul class="source-list">${(c.sourceUrls || [{ title: c.sourceTitle, url: c.sourceUrl }]).map((s) => `<li>${external(s.url, s.title)}<small>${esc(s.url)}</small></li>`).join("")}</ul>`,
      )
      .join("");
    openDialog(
      "SOURCE REGISTER",
      `<h2 id="dialog-title">Keep the originals close.</h2><p>This edition distinguishes the historical author’s wording, the modern study summary, and the KJV Bible text. Each era’s <strong>Source</strong> tab identifies its source location.</p>${cards}<h3>King James Bible text</h3><p>${esc(meta.scriptureAttribution || "")}</p><ul class="source-list">${(meta.scriptureSources || []).map((s) => `<li>${external(s.url, s.title)}</li>`).join("")}</ul><p class="attribution">${esc(meta.verificationSummary || "")}</p>`,
    );
  }
  function openCompare() {
    const lists = charts.map((c) => c.periods.filter((p) => p.number != null));
    const rows = Math.max(...lists.map((l) => l.length));
    const notes = charts
      .map(
        (c) =>
          `<section class="note-block"><h3>${esc(c.author)} · ${esc(c.title)}</h3><p>${esc(c.editionNote)}</p><button class="inline-link" data-compare-chart="${esc(c.id)}">Explore this study →</button></section>`,
      )
      .join("");
    openDialog(
      "COMPARE THE AUTHORS",
      `<h2 id="dialog-title">Their labels, side by side.</h2><p>The rows compare the authors’ numbered labels. Matching numbers do not establish identical boundaries or doctrine. Unnumbered intervals and surrounding ages remain visible in each individual study.</p><div class="comparison-wrap"><table class="comparison-table"><thead><tr><th>Number</th>${charts.map((c) => `<th>${esc(c.author)}<br>${esc(chartLabel(c))}</th>`).join("")}</tr></thead><tbody>${Array.from({ length: rows }, (_, i) => `<tr><td>${i + 1}</td>${charts.map((c, j) => `<td>${lists[j][i] ? `<button data-compare-item="${esc(lists[j][i].id)}" data-compare-study="${esc(c.id)}">${esc(lists[j][i].title)}</button>` : "No numbered dispensation in this position"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${notes}`,
      true,
    );
  }
  function toast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").classList.add("visible");
    toastTimer = setTimeout(
      () => $("#toast").classList.remove("visible"),
      3200,
    );
  }
  async function copy(text, success) {
    try {
      await navigator.clipboard.writeText(text);
      toast(success);
    } catch {
      openDialog(
        "COPY TEXT",
        `<h2 id="dialog-title">Copy this text</h2><textarea class="copy-url" rows="5" readonly>${esc(text)}</textarea><p class="attribution">Select the text and copy it using your device.</p>`,
      );
      $(".copy-url").select();
    }
  }
  function preparePrint() {
    const c = getChart();
    const all = [...c.periods, ...(c.events || []), ...relationships(c)];
    $("#print-content").innerHTML =
      `<h1>${esc(c.title)}</h1><p>${esc(c.author)} · ${esc(c.sourceTitle)}</p><p>${esc(c.editionNote)}</p><p class="print-source">Modern study notes are summaries; source quotations retain their historical wording. Scripture references use the King James Version. The diagram is not a proportional chronology.</p>${all.map((p) => `<section class="print-item"><h2>${p.number != null ? esc(p.number) + ". " : ""}${esc(p.title)}</h2>${p.start ? `<p><strong>From:</strong> ${esc(p.start)}<br><strong>To:</strong> ${esc(p.end)}</p>` : ""}<p>${esc(p.summary)}</p>${(p.details || []).map((d) => `<p><strong>${esc(d.label)}:</strong> ${esc(d.text)}</p>`).join("")}${p.sourceExcerpt ? `<blockquote>${esc(p.sourceExcerpt)}</blockquote>` : ""}<p class="print-source">${esc(p.sourceLocation || "")}</p><p class="print-references"><strong>KJV references:</strong> ${esc(references(p).join("; ") || "No citation assigned to this item.")}</p></section>`).join("")}<h2>Edition notes</h2>${(c.notes || []).map((n) => `<h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>`).join("")}<h2>Sources</h2>${(c.sourceUrls || []).map((s) => `<p class="print-source">${esc(s.title)} — ${esc(s.url)}</p>`).join("")}`;
  }
  function printStudy() {
    preparePrint();
    window.print();
  }
  window.addEventListener("beforeprint", preparePrint);
  $(".skip-link").addEventListener("click", (e) => {
    e.preventDefault();
    $("#study-title").focus();
    $("#study-title").scrollIntoView({ block: "start" });
  });
  document.addEventListener("click", (event) => {
    const el = event.target.closest("button,[data-select]");
    if (!el) return;
    if (el.dataset.chart) chooseChart(el.dataset.chart);
    else if (el.dataset.select)
      selectItem(el.dataset.select, { detail: !el.closest(".outline") });
    else if (el.dataset.searchSelect) {
      selectItem(el.dataset.searchSelect, {
        reveal: true,
        detail: state.view !== "modern",
      });
    } else if (el.dataset.view) {
      state.view = el.dataset.view;
      route();
      renderSurface();
      $("#chart-viewport").scrollTo(0, 0);
    } else if (el.dataset.tab) {
      state.tab = el.dataset.tab;
      renderDetail();
      $(`[data-tab="${state.tab}"]`).focus();
    } else if (el.dataset.reference) openReference(el.dataset.reference);
    else if (el.dataset.step) step(Number(el.dataset.step));
    else if (el.hasAttribute("data-open-edition")) openEdition();
    else if (el.hasAttribute("data-open-sources")) openSources();
    else if (el.hasAttribute("data-detail-scroll"))
      $("#detail-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    else if (el.hasAttribute("data-return-chart")) {
      $("#chart-viewport").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      $("#chart-viewport").focus({ preventScroll: true });
    } else if (el.dataset.compareChart) {
      $("#reader-dialog").close();
      chooseChart(el.dataset.compareChart);
    } else if (el.dataset.compareItem) {
      $("#reader-dialog").close();
      chooseChart(el.dataset.compareStudy);
      selectItem(el.dataset.compareItem, { reveal: true });
    } else if (el.dataset.copyReference) {
      const p = passages[el.dataset.copyReference];
      if (p?.verses)
        copy(
          `${el.dataset.copyReference} (KJV)\n${p.verses.map((v) => `${v.label || v.verse} ${v.text}`).join("\n")}`,
          "Passage copied",
        );
    }
  });
  $("#search-input").addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderSearch();
    if (state.view === "modern") renderSurface();
  });
  $("#zoom-out").addEventListener("click", () => setZoom(state.zoom - 0.15));
  $("#zoom-in").addEventListener("click", () => setZoom(state.zoom + 0.15));
  $("#zoom-fit").addEventListener("click", () => {
    setZoom(($("#chart-viewport").clientWidth - 8) / diagramWidth, true);
    $("#chart-viewport").scrollTo(0, 0);
  });
  $("#fullscreen-button").addEventListener("click", () => {
    if (chartFullscreen) exitChartFullscreen();
    else enterChartFullscreen();
  });
  $("#chart-viewport").addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey && state.view !== "outline") {
        e.preventDefault();
        setZoom(state.zoom + (e.deltaY < 0 ? 0.08 : -0.08));
      }
    },
    { passive: false },
  );
  $("#compare-button").addEventListener("click", openCompare);
  $("#sources-button").addEventListener("click", openSources);
  $("#footer-sources").addEventListener("click", openSources);
  $("#edition-button").addEventListener("click", openEdition);
  $("#print-button").addEventListener("click", printStudy);
  $("#presentation-button").addEventListener("click", () => {
    location.assign(
      `/presentation.html#${new URLSearchParams({ chart: state.chartId, slide: "overview" })}`,
    );
  });
  $("#share-button").addEventListener("click", () => {
    route();
    copy(location.href, "Link to this chart and selection copied");
  });
  $("#tour-button").addEventListener("click", () => {
    state.tour = !state.tour;
    if (state.tour) {
      state.view = "modern";
      selectItem(getChart().periods[0].id, { reveal: true });
    }
    renderTour();
  });
  $("#tour-prev").addEventListener("click", () => step(-1));
  $("#tour-next").addEventListener("click", () => {
    const ps = getChart().periods;
    if (state.selected === ps.at(-1).id) {
      state.tour = false;
      renderTour();
      toast("Study complete. Return to any period to keep exploring.");
    } else step(1);
  });
  $("#tour-close").addEventListener("click", () => {
    state.tour = false;
    renderTour();
  });
  $("#dialog-close").addEventListener("click", () =>
    $("#reader-dialog").close(),
  );
  $("#reader-dialog").addEventListener("click", (e) => {
    if (e.target === $("#reader-dialog")) {
      const r = e.target.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        e.target.close();
    }
  });
  $("#reader-dialog").addEventListener("close", () => {
    if (dialogReturnFocus?.isConnected) dialogReturnFocus.focus();
  });
  function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    $("#theme-button").innerHTML = icon(dark ? "sun" : "moon");
    $("#theme-button").setAttribute(
      "aria-label",
      dark ? "Switch to light appearance" : "Switch to dark appearance",
    );
  }
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("atlas-theme");
  } catch {}
  applyTheme(savedTheme === "dark");
  $("#theme-button").addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");
    applyTheme(dark);
    try {
      localStorage.setItem("atlas-theme", dark ? "dark" : "light");
    } catch {}
  });
  document.addEventListener("keydown", (e) => {
    if (chartFullscreen && !$("#reader-dialog").open) {
      if (e.key === "Escape") {
        e.preventDefault();
        exitChartFullscreen();
        return;
      }
      if (e.key === "Tab") {
        const controls = $$(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
          $("#chart-card"),
        ).filter((el) => el.getClientRects().length && !el.closest("[hidden]"));
        const first = controls[0],
          last = controls.at(-1);
        if (
          first &&
          e.shiftKey &&
          (document.activeElement === first ||
            !$("#chart-card").contains(document.activeElement))
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          last &&
          !e.shiftKey &&
          (document.activeElement === last ||
            !$("#chart-card").contains(document.activeElement))
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    if (e.key === "/" && !typing && !$("#reader-dialog").open) {
      e.preventDefault();
      $("#search-input").focus();
    }
    if (e.key === "Escape" && !$("#reader-dialog").open && state.query) {
      state.query = "";
      $("#search-input").value = "";
      renderSearch();
      renderSurface();
    }
    const selectable = e.target.closest("[data-select]");
    if (
      selectable &&
      ["Enter", " "].includes(e.key) &&
      selectable.tagName.toLowerCase() !== "button"
    ) {
      e.preventDefault();
      selectItem(selectable.dataset.select);
    }
    if (
      !typing &&
      !$("#reader-dialog").open &&
      (e.target === $("#chart-viewport") || selectable) &&
      ["ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
      step(e.key === "ArrowLeft" ? -1 : 1);
    }
    if (
      e.target.matches('[role="tab"]') &&
      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
    ) {
      e.preventDefault();
      const tabs = ["study", "scripture", "source"],
        at = tabs.indexOf(state.tab);
      state.tab =
        e.key === "Home"
          ? tabs[0]
          : e.key === "End"
            ? tabs[2]
            : tabs[(at + (e.key === "ArrowRight" ? 1 : 2)) % 3];
      renderDetail();
      $(`[data-tab="${state.tab}"]`).focus();
    }
  });
  window.addEventListener("popstate", () => {
    readRoute();
    renderAll();
  });
  window.addEventListener("hashchange", () => {
    readRoute();
    renderAll();
  });
  readRoute();
  renderAll();
})();
