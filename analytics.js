// Record navigation only; never collect calculator inputs or results.
document.addEventListener("click", event => {
  const link = event.target.closest && event.target.closest("a[href]");
  if (!link || typeof window.gtag !== "function") return;
  let url;
  try { url = new URL(link.href, window.location.href); } catch (_) { return; }
  if (!/^https?:$/.test(url.protocol)) return;
  const page = window.location.pathname;
  if (url.hostname === "px.a8.net") {
    const floatingAd = link.closest(".floating-affiliate");
    const floatingFormat = floatingAd && floatingAd.dataset.format;
    window.gtag("event", "affiliate_click", {
      send_to: "G-XGMNP7Q9VK", article_path: page, affiliate_network: "a8",
      cta_stage: link.dataset.ctaStage || (floatingFormat ? "high_intent" : "unclassified"),
      cta_location: link.dataset.ctaLocation || (floatingFormat ? `floating_${floatingFormat}` : "unknown")
    });
  } else if (url.origin === window.location.origin && url.pathname !== page) {
    window.gtag("event", "internal_link_click", {
      send_to: "G-XGMNP7Q9VK", article_path: page, destination_path: url.pathname
    });
  }
});
