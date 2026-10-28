(() => {
  function paint() {
    const roots = document.querySelectorAll("[data-publication-steps]");
    if (!roots.length) return;
    const CFG = window.BS_CONFIG || {};
    const lang = window.BSi18n?.getLanguage?.() || "ru";
    const pack = window.BSPageI18n || {};
    const steps = pack.processSteps?.[lang] || pack.processSteps?.en || pack.processSteps?.ru || [];
    const doi = pack.processDoi?.[lang] || pack.processDoi?.en || pack.processDoi?.ru || {};
    const last = CFG.doiInfrastructureActive ? doi.active : doi.meta;
    const all = last ? steps.concat([last]) : steps.slice();
    const html = all
      .map((s, i) => `<li><span class="step-num">${i + 1}</span> <span class="step-label">${escapeHtml(s)}</span></li>`)
      .join("");
    roots.forEach((root) => {
      root.innerHTML = html;
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  document.addEventListener("DOMContentLoaded", paint);
  window.addEventListener("bs:langchange", paint);
})();
