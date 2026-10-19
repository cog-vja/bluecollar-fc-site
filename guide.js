// Homepage reading-path guide. No inputs are stored or transmitted.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("route-guide-form");
  if (!form) return;
  const result = document.getElementById("guide-result");
  const title = document.getElementById("guide-result-title");
  const reason = document.getElementById("guide-result-reason");
  const caution = document.getElementById("guide-result-caution");
  const primary = document.getElementById("guide-result-link");
  const extra = document.getElementById("guide-result-extra");
  // Known local pages only. These are research starting points, never endorsements.
  const routes = {
    general: {title:"独立候補を選ぶための条件整理",path:"what-business-to-start.html",reason:"自己資金・生活費・経験・働ける時間を整理し、調べる候補を2〜3つに絞りましょう。"},
    field: {title:"現場経験を活かす独立準備",path:"field-work-independent-options.html",reason:"今の技能を誰にどんなサービスとして提供できるか、見積もり・受注・資金繰りから確認します。"},
    newbie: {title:"未経験から独立するための準備",path:"independent-without-experience.html",reason:"仕事を決める前に、必要な技能・研修・最初の顧客の探し方を比べましょう。"},
    cleaning: {title:"清掃などの訪問サービスの実態を調べる",path:"cleaning-business-independent.html",reason:"店舗を持たない事業の具体例として、必要資金・移動時間・必要件数を検証します。"},
    restaurant: {title:"飲食店経験を活かした独立の選択肢",path:"restaurant-manager-independent.html",reason:"新規出店・小型店・承継・FCなど、経験を活かす方法と必要資金を比較します。"},
    cafe: {title:"店舗型事業に必要な条件を調べる",path:"cafe-independent-beginner.html",reason:"店舗型の一例として、物件・設備・人員・来店数から採算を考えます。"},
    list: {title:"業種を同じ条件で比較する",path:"field-work-business-list.html",reason:"清掃・リペア・配送・飲食を、技能・設備・集客・働き方で横並びに確認しましょう。"}
  };
  form.addEventListener("submit", e => {
    e.preventDefault();
    const experience = form.elements.experience.value;
    const budget = form.elements.budget.value;
    const style = form.elements.style.value;
    let key = "general";
    if (style === "shop") key = experience === "food" ? "restaurant" : "cafe";
    else if (style === "mobile") key = experience === "field" ? "field" : experience === "food" ? "general" : "cleaning";
    else key = experience === "field" ? "field" : experience === "food" ? "restaurant" : "list";
    if (experience === "none" && style === "undecided") key = "newbie";
    // Lack of funds must never be mistaken for permission to open a store.
    if (style === "shop" && budget === "lt100") key = "general";
    const route = routes[key];
    title.textContent = route.title;
    reason.textContent = route.reason;
    caution.textContent = style === "shop" && budget === "lt100"
      ? "店舗型を希望していても、資金が足りるか未確認です。退職・物件契約を急がず、まず必要資金と生活防衛資金を分けてください。"
      : "これは調査の出発点です。費用・法令・必要な技能・地域需要は個別に確認してください。";
    primary.href = route.path;
    extra.href = route.path === "field-work-business-list.html" ? "what-business-to-start.html" : "field-work-business-list.html";
    extra.textContent = route.path === "field-work-business-list.html" ? "自分の条件を整理する" : "全業種を比較する";
    result.hidden = false;
    result.focus({preventScroll:true});
    result.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});
    if (typeof window.gtag === "function") {
      // Record only the recommended article, never user-select values.
      window.gtag("event","reading_path_guide",{send_to:"G-XGMNP7Q9VK",recommended_path:route.path});
    }
  });
});
