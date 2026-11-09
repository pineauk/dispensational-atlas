"use strict";
(() => {
  const charts = window.ATLAS_DATA?.charts || window.ATLAS_DATA || [];
  const renderer = window.AtlasPresentation;
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s ?? "").replace(
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
  const safe = (s) => (/^https?:\/\//.test(s || "") ? s : "#");
  if (!charts.length || !renderer) {
    $("#slide-canvas").innerHTML =
      '<p style="padding:30px;line-height:1.6">The presentation could not load. Refresh this page or return to the study.</p>';
    return;
  }
  let state = { chart: charts[0].id, slide: "overview", theme: "light" };
  let windowFullscreen = false,
    fullscreenRequest = 0,
    toastTimer,
    returnFocus;
  const chart = () => charts.find((c) => c.id === state.chart) || charts[0];
  const slides = () => renderer.slides(chart());
  const period = () => chart().periods.find((p) => p.id === state.slide);
  const references = (p) =>
    (p?.references || [])
      .map((r) => (typeof r === "string" ? r : r.reference || r.ref))
      .filter(Boolean);
  function readRoute() {
    const q = new URLSearchParams(location.hash.slice(1));
    state.chart = charts.some((c) => c.id === q.get("chart"))
      ? q.get("chart")
      : charts[0].id;
    state.slide = slides().some((s) => s.id === q.get("slide"))
      ? q.get("slide")
      : "overview";
    state.theme = q.get("theme") === "dark" ? "dark" : "light";
  }
  function writeRoute() {
    history.replaceState(
      null,
      "",
      `${location.pathname}#${new URLSearchParams(state)}`,
    );
  }
  function render(focus = false) {
    const c = chart(),
      p = period(),
      list = slides(),
      index = list.findIndex((s) => s.id === state.slide);
    $("#slide-canvas").innerHTML = renderer.render(c, state.slide, state.theme);
    $("#chart-select").value = c.id;
    $("#theme-select").value = state.theme;
    $("#slide-list").innerHTML = list
      .map((s, i) => {
        const item = c.periods.find((p) => p.id === s.id),
          label =
            i === 0
              ? "Overview"
              : item?.number != null
                ? String(item.number)
                : item?.kind === "interval"
                  ? "Interval"
                  : item?.kind === "eternity"
                    ? "Eternity"
                    : "Context";
        return `<button type="button" class="slide-tab ${item && item.number == null ? "context" : ""}" data-go-slide="${esc(s.id)}" title="${esc(s.label)}" aria-label="${esc(s.label)}" ${s.id === state.slide ? 'aria-current="step"' : ""}>${esc(label)}</button>`;
      })
      .join("");
    $("#previous-slide").disabled = index <= 0;
    $("#next-slide").disabled = index >= list.length - 1;
    $("#overview-button").setAttribute("aria-pressed", String(index === 0));
    $("#slide-status").textContent =
      `Slide ${index + 1} of ${list.length} · ${list[index].label}`;
    $("#back-study").href =
      `/#${new URLSearchParams({ chart: c.id, view: "modern", ...(p ? { item: p.id } : {}) })}`;
    $("#download-pptx").href = `/presentations/${c.id}.pptx`;
    $("#scripture-button").hidden = !p || !references(p).length;
    document.title = `${list[index].label} — ${c.title} — Presentation`;
    $("#slide-list [aria-current]").scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
    if (focus) $("#slide-stage").focus({ preventScroll: true });
  }
  function go(id, focus = true) {
    if (!slides().some((s) => s.id === id)) return;
    state.slide = id;
    writeRoute();
    render(focus);
  }
  function advance(delta) {
    const list = slides(),
      i = list.findIndex((s) => s.id === state.slide),
      next = list[Math.max(0, Math.min(list.length - 1, i + delta))];
    go(next.id);
  }
  function toast(message) {
    clearTimeout(toastTimer);
    $("#present-toast").textContent = message;
    $("#present-toast").hidden = false;
    toastTimer = setTimeout(() => ($("#present-toast").hidden = true), 4400);
  }
  function syncFullscreen() {
    const expanded = Boolean(document.fullscreenElement) || windowFullscreen;
    document.body.classList.toggle("is-fullscreen", expanded);
    $("#fullscreen-button").setAttribute("aria-pressed", String(expanded));
    $("#fullscreen-label").textContent = expanded
      ? "Exit full screen"
      : "Full screen";
    $("#exit-presentation").hidden = !expanded;
  }
  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        toast("Use Escape to exit full screen.");
      }
      return;
    }
    if (windowFullscreen) {
      fullscreenRequest++;
      windowFullscreen = false;
      syncFullscreen();
      $("#fullscreen-button").focus();
      return;
    }
    const request = ++fullscreenRequest;
    windowFullscreen = true;
    syncFullscreen();
    try {
      if (!document.documentElement.requestFullscreen)
        throw new Error("Fullscreen is not available");
      await document.documentElement.requestFullscreen();
      if (request !== fullscreenRequest) {
        if (document.fullscreenElement) await document.exitFullscreen();
        return;
      }
      windowFullscreen = false;
      syncFullscreen();
    } catch {
      if (request === fullscreenRequest)
        toast(
          "Presentation expanded to the window. Browser full screen is unavailable here.",
        );
    }
    $("#slide-stage").focus({ preventScroll: true });
  }
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) windowFullscreen = false;
    syncFullscreen();
  });
  $("#fullscreen-button").addEventListener("click", toggleFullscreen);
  $("#exit-presentation").addEventListener("click", toggleFullscreen);
  function openDialog(kicker, body) {
    returnFocus = document.activeElement;
    $("#dialog-kicker").textContent = kicker;
    $("#dialog-content").innerHTML = body;
    $("#presentation-dialog").showModal();
  }
  function closeDialog() {
    $("#presentation-dialog").close();
    returnFocus?.focus?.({ preventScroll: true });
  }
  $("#dialog-close").addEventListener("click", closeDialog);
  $("#presentation-dialog").addEventListener("click", (e) => {
    if (e.target === $("#presentation-dialog")) {
      const r = e.target.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeDialog();
    }
  });
  $("#source-button").addEventListener("click", () => {
    const c = chart(),
      p = period();
    openDialog(
      "SOURCE NOTES",
      `<h2 id="dialog-heading">${esc(p?.title || c.title)}</h2><p>${esc(p?.summary || c.description)}</p>${p?.sourceExcerpt ? `<blockquote>${esc(p.sourceExcerpt)}</blockquote>` : ""}<p class="source-location">${esc(p?.sourceLocation || c.sourceTitle)}</p>${p?.details?.map((d) => `<h3>${esc(d.label)}</h3><p>${esc(d.text)}</p>`).join("") || ""}<h3>About the presentation</h3><p>The slides summarize the identified historical source. The overview shows the reading sequence and does not measure elapsed time. Source quotations retain the author’s wording, including explicitly marked R.V. quotations. The Scripture reader uses KJV.</p><p>${esc(c.editionNote || "")}</p><p><a href="${esc(safe(p?.sourceUrl || c.sourceUrl))}" target="_blank" rel="noopener noreferrer">Open the original source ↗</a></p>`,
    );
  });
  function openScriptures() {
    const p = period();
    if (!p) return;
    openDialog(
      "KING JAMES VERSION",
      `<h2 id="dialog-heading">${esc(p.shortTitle || p.title)}</h2><p>References included in this source study.</p><div class="reference-list">${references(
        p,
      )
        .map(
          (ref) =>
            `<button type="button" data-read-reference="${esc(ref)}">${esc(ref)}</button>`,
        )
        .join("")}</div>`,
    );
  }
  $("#scripture-button").addEventListener("click", openScriptures);
  document.addEventListener("click", (e) => {
    const el = e.target.closest(
      "[data-go-slide],[data-slide],[data-read-reference]",
    );
    if (!el) return;
    if (el.dataset.goSlide || el.dataset.slide)
      go(el.dataset.goSlide || el.dataset.slide);
    else if (el.dataset.readReference) {
      const ref = el.dataset.readReference,
        verses = window.ATLAS_PASSAGES?.[ref]?.verses;
      if (!verses) {
        toast("This passage is available in the study reader.");
        return;
      }
      $("#dialog-content").innerHTML =
        `<h2 id="dialog-heading">${esc(ref)}</h2>${verses.map((v) => `<p class="verse-line"><sup>${esc(v.label || v.verse)}</sup>${esc(v.text)}</p>`).join("")}<button type="button" id="back-references">Back to references</button>`;
      $("#back-references").addEventListener("click", () => {
        $("#presentation-dialog").close();
        openScriptures();
      });
      $("#dialog-heading").scrollIntoView({ block: "nearest" });
    }
  });
  $("#chart-select").addEventListener("change", (e) => {
    state.chart = e.target.value;
    state.slide = "overview";
    writeRoute();
    render();
  });
  $("#theme-select").addEventListener("change", (e) => {
    state.theme = e.target.value;
    writeRoute();
    render();
  });
  $("#overview-button").addEventListener("click", () => go("overview"));
  $("#previous-slide").addEventListener("click", () => advance(-1));
  $("#next-slide").addEventListener("click", () => advance(1));
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      windowFullscreen &&
      !$("#presentation-dialog").open
    ) {
      fullscreenRequest++;
      windowFullscreen = false;
      syncFullscreen();
      return;
    }
    if ($("#presentation-dialog").open || e.ctrlKey || e.metaKey || e.altKey)
      return;
    if (
      e.target.closest(
        'input,select,textarea,button,a,summary,[contenteditable="true"]',
      )
    )
      return;
    const item = e.target.closest("[data-slide]");
    if (item && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      go(item.dataset.slide);
      return;
    }
    if (["ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      advance(1);
    } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      advance(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go("overview");
    } else if (e.key === "End") {
      e.preventDefault();
      go(slides().at(-1).id);
    } else if (e.key.toLowerCase() === "f") {
      e.preventDefault();
      toggleFullscreen();
    }
  });
  const exportName = () => `${state.chart}-${state.slide}-${state.theme}`;
  function saveBlob(blob, extension, name = exportName()) {
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `${name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    $("#export-menu").open = false;
  }
  $("#download-svg").addEventListener("click", () => {
    saveBlob(
      new Blob([renderer.render(chart(), state.slide, state.theme)], {
        type: "image/svg+xml;charset=utf-8",
      }),
      "svg",
    );
    toast("SVG download prepared.");
  });
  $("#download-png").addEventListener("click", async () => {
    const button = $("#download-png"),
      name = exportName();
    button.disabled = true;
    button.textContent = "Preparing 4K image…";
    let url;
    try {
      const svg = renderer.render(chart(), state.slide, state.theme);
      url = URL.createObjectURL(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
      );
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 3840;
      canvas.height = 2160;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.drawImage(image, 0, 0, 3840, 2160);
      const blob = await new Promise((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("PNG encoding failed"))),
          "image/png",
        ),
      );
      saveBlob(blob, "png", name);
      toast("4K PNG download prepared.");
    } catch {
      toast(
        "The PNG could not be created in this browser. Use the SVG download instead.",
      );
    } finally {
      if (url) URL.revokeObjectURL(url);
      button.disabled = false;
      button.textContent = "Current slide · PNG (4K)";
    }
  });
  $("#download-pptx").addEventListener(
    "click",
    () => ($("#export-menu").open = false),
  );
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#export-menu")) $("#export-menu").open = false;
  });
  window.addEventListener("hashchange", () => {
    readRoute();
    render();
  });
  readRoute();
  render();
  syncFullscreen();
})();
