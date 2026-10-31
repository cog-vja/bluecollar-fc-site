/**
 * 清掃業 独立/FC比較: 仮定のみを扱う独立した純粋関数。2026-10-31作成。
 * 公式の費用条件・実績・収益保証を意味しない。
 */
export function asNumber(value, name, {min = 0, max = 1e10, integer = false} = {}) {
  if (value === '' || value === null || value === undefined || typeof value === 'boolean') {
    throw new Error(`${name}を入力してください。`);
  }
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) {
    throw new Error(`${name}は${min}〜${max}${integer ? 'の整数' : ''}で入力してください。`);
  }
  return n;
}

function modelVariant(shared, variant) {
  const fixed = asNumber(variant.fixed, '月額固定費') + asNumber(variant.royaltyFixed, '固定ロイヤリティ') + asNumber(variant.adMonthly, '広告負担月額');
  const initial = asNumber(variant.initial, '開業初期投資');
  const royalties = asNumber(variant.royaltyPct, '売上歩合ロイヤリティ', {max:100});
  const orderFee = asNumber(variant.orderFeePct, '受注紹介手数料', {max:100});
  const perJobContribution = shared.ticket * (1 - (shared.paymentPct + royalties + orderFee) / 100) - shared.materials - shared.transport;
  const effectiveJobs = Math.min(shared.demand, shared.capacity);
  const revenue = effectiveJobs * shared.ticket;
  const totalMonthlyCost = effectiveJobs * (shared.ticket - perJobContribution) + fixed;
  const monthlyProfit = revenue - totalMonthlyCost;
  const needed = (target) => {
    if (perJobContribution <= 0) return null;
    return Math.max(0, Math.ceil((fixed + target) / perJobContribution));
  };
  const breakevenJobs = needed(0);
  const targetJobs = needed(shared.ownerDraw);
  const gapToTarget = Math.max(0, shared.ownerDraw - monthlyProfit);
  const runwayMonths = gapToTarget === 0 ? null : shared.reserve / gapToTarget;
  // 売上入金が「全額」lagか月遅れる簡易の保守的上限。月中入金、前受金、税、借入は未反映。
  const delayedCollectionBuffer = shared.lag * (totalMonthlyCost + shared.ownerDraw);
  return {fixed, initial, effectiveJobs, revenue, totalMonthlyCost, monthlyProfit, perJobContribution,
    breakevenJobs, targetJobs, gapToTarget, runwayMonths, delayedCollectionBuffer,
    targetReachable:targetJobs !== null && targetJobs<=shared.capacity,
    isDemandEnough:targetJobs !== null && targetJobs<=shared.demand};
}

export function calculate(raw) {
  const ticket = asNumber(raw.ticket, '案件単価', {max:1e8});
  const demand = asNumber(raw.demand, '月間受注見込み', {integer:true, max:100000});
  const days = asNumber(raw.days, '営業日数', {integer:true, max:31});
  const dailyHours = asNumber(raw.dailyHours, '1日稼働可能時間', {max:24});
  const serviceMins = asNumber(raw.serviceMins, '1件の作業時間', {max:1440});
  const travelMins = asNumber(raw.travelMins, '1件の往復移動と準備時間', {max:1440});
  if (serviceMins + travelMins <= 0) throw new Error('作業時間と移動・準備時間の合計を0分より大きくしてください。');
  const capacity = Math.floor(days * dailyHours * 60 / (serviceMins + travelMins));
  const shared = {ticket, demand, capacity,
    paymentPct:asNumber(raw.paymentPct, '決済手数料', {max:100}),
    materials:asNumber(raw.materials, '1件の資材費', {max:1e8}),
    transport:asNumber(raw.transport, '1件の移動費', {max:1e8}),
    ownerDraw:asNumber(raw.ownerDraw, '月に確保したい生活原資', {max:1e9}),
    reserve:asNumber(raw.reserve, '開業後の現金余力', {max:1e10}),
    lag:asNumber(raw.lag, '売上入金の遅れ（月）', {integer:true, max:12})};
  const independent = modelVariant(shared, raw.independent);
  const franchise = modelVariant(shared, raw.franchise);
  return {capacity, requestedJobs:demand, overCapacity:demand>capacity, shared, independent, franchise,
    monthlyDifference:independent.monthlyProfit-franchise.monthlyProfit};
}
