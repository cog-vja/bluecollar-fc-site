document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-calculator]").forEach(form => {
    const calculate = () => {
      const values = Object.fromEntries(new FormData(form));
      const get = name => Number(values[name]);
      const price=get("price"), rate=get("rate"), fixed=get("fixed"), days=get("days");
      const living=get("living"), principal=get("principal"), reserve=get("reserve");
      const out=form.querySelector("output");
      const people=form.dataset.unit==="people";
      const quantityLabel=people?"必要客数":"必要件数";
      const unit=people?"人":"件";
      if (Object.values(values).some(v=>v.trim()==="" || !Number.isFinite(Number(v))) || price<=0 || rate<0 || rate>=100 || fixed<0 || living<0 || principal<0 || reserve<0 || days<1 || days>31 || !Number.isInteger(days)) {
        out.textContent="単価は0より大きい数、変動費率は0以上100未満、営業日数は1〜31の整数、支出は0以上で入力してください。";
        return;
      }
      const need=(fixed+living+principal+reserve)/(1-rate/100);
      const monthly=Math.ceil(need/price);
      const yen=new Intl.NumberFormat("ja-JP",{maximumFractionDigits:0});
      out.textContent=`必要売上：月${yen.format(Math.ceil(need))}円／${quantityLabel}：月${yen.format(monthly)}${unit}／1営業日あたり平均${(monthly/days).toFixed(1)}${unit}。税金・社会保険の資金は別途必要です。`;
    };
    form.addEventListener("submit", event=>{event.preventDefault();calculate();});
    calculate();
  });
});
