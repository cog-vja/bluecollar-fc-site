/*
 * Floating BM Franchise creatives for selected independent-business articles.
 * Both A8-provided code snippets are preserved unmodified below.
 * Only the creative for the active viewport is inserted, after a reader has
 * scrolled through 30% of the document. Close persists for the browser session.
 */
(() => {
  "use strict";

  const GA_ID = "G-XGMNP7Q9VK";
  const DISMISS_KEY = "bluecollar_floating_ad_dismissed_v1";
  const desktopCreative = `<a href="https://px.a8.net/svt/ejp?a8mat=4BCEVO+6QBGRE+37I2+68MF5" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=260919636407&wid=002&eno=01&mid=s00000014969001048000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4BCEVO+6QBGRE+37I2+68MF5" alt="">`;
  const mobileCreative = `<a href="https://px.a8.net/svt/ejp?a8mat=4BCEVO+6QBGRE+37I2+609HT" rel="nofollow">
<img border="0" width="224" height="33" alt="" src="https://www28.a8.net/svt/bgt?aid=260919636407&wid=002&eno=01&mid=s00000014969001009000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BCEVO+6QBGRE+37I2+609HT" alt="">`;

  document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split("/").pop();
    const pages = new Set([
      "cleaning-business-independent.html",
      "field-work-business-list.html",
      "what-business-to-start.html",
      "independent-without-experience.html",
      "field-work-independent-options.html"
    ]);
    if (!pages.has(page)) return;

    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch (_) { /* The ad remains dismissible when storage is blocked. */ }

    const compactScreen = window.matchMedia("(max-width: 999px)");
    const popup = document.createElement("aside");
    popup.className = "floating-affiliate";
    popup.setAttribute("aria-label", "フランチャイズ比較の広告");
    popup.hidden = true;
    popup.innerHTML = `
      <div class="floating-affiliate__header">
        <span class="floating-affiliate__label">広告</span>
        <button type="button" class="floating-affiliate__close" aria-label="この広告を閉じる" title="広告を閉じる">×</button>
      </div>
      <div class="floating-affiliate__creative"></div>`;

    const creative = popup.querySelector(".floating-affiliate__creative");
    const button = popup.querySelector(".floating-affiliate__close");
    let visible = false;
    let dismissed = false;
    let currentFormat = "";

    function track(eventName, fields = {}) {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, {
          send_to: GA_ID,
          article_path: window.location.pathname,
          ...fields
        });
      }
    }

    function setFormat() {
      const format = compactScreen.matches ? "mobile" : "desktop";
      if (format === currentFormat) return;
      popup.dataset.format = format;
      // A8 code is inserted intact: original anchor, banner, and 1x1 pixel.
      // We do not download both banner assets for a single viewing size.
      creative.innerHTML = format === "mobile" ? mobileCreative : desktopCreative;
      currentFormat = format;
    }

    function showIfReady() {
      if (dismissed || visible) return;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (maxScroll <= 0 || window.scrollY / maxScroll < 0.30) return;
      setFormat();
      document.body.appendChild(popup);
      popup.hidden = false;
      visible = true;
      track("floating_ad_show", {ad_format: currentFormat});
    }

    button.addEventListener("click", () => {
      dismissed = true;
      popup.hidden = true;
      popup.remove();
      track("floating_ad_close", {ad_format: currentFormat});
      try { window.sessionStorage.setItem(DISMISS_KEY, "1"); } catch (_) { /* no-op */ }
      window.removeEventListener("scroll", showIfReady);
    });

    compactScreen.addEventListener("change", () => {
      if (visible && !dismissed) setFormat();
    });
    window.addEventListener("scroll", showIfReady, {passive: true});
    showIfReady(); // Covers pages opened with restored scroll position.
  });
})();
