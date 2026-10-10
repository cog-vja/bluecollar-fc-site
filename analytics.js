// Record navigation only; never collect calculator inputs or results.
document.addEventListener("click", event => {
  const link = event.target.closest && event.target.closest("a[href]");
  if (!link || typeof window.gtag !== "function") return;
  let url;
  try { url = new URL(link.href, window.location.href); } catch (_) { return; }
  if (!/^https?:$/.test(url.protocol)) return;
  const page = window.location.pathname;
  if (url.hostname === "px.a8.net") {
    window.gtag("event", "affiliate_click", {
      send_to: "G-XGMNP7Q9VK", article_path: page, affiliate_network: "a8"
    });
  } else if (url.origin === window.location.origin && url.pathname !== page) {
    window.gtag("event", "internal_link_click", {
      send_to: "G-XGMNP7Q9VK", article_path: page, destination_path: url.pathname
    });
  }
});
