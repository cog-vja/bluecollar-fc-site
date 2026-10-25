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


// Record qualifying CTA button visibility, not banner downloads or a guarantee
// that the reader read the ad. Only non-PII context is sent to GA4.
document.addEventListener("DOMContentLoaded", () => {
  if (!("IntersectionObserver" in window)) return;
  const links = Array.from(document.querySelectorAll('.cta a[href^="https://px.a8.net/"]'));
  if (!links.length) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
      const link = entry.target;
      observer.unobserve(link);
      if (typeof window.gtag === "function") {
        window.gtag("event", "affiliate_cta_view", {
          send_to: "G-XGMNP7Q9VK",
          article_path: window.location.pathname,
          cta_location: link.dataset.ctaLocation || "article_bottom",
          cta_stage: link.dataset.ctaStage || "comparison"
        });
      }
    }
  }, {threshold: [0, 0.5]});
  links.forEach(link => observer.observe(link));
});
