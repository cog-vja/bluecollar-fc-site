document.addEventListener("DOMContentLoaded", () => {
  const url = window.AFFILIATE_URL || "https://bmfc.b-mall.ne.jp/";
  document.querySelectorAll("[data-affiliate-link]").forEach((el) => {
    el.href = url;
    el.target = "_blank";
    el.rel = "nofollow sponsored noopener";
  });
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
