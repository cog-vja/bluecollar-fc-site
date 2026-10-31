import assert from 'node:assert/strict';
import {calculate} from './cleaning-finance.mjs';
const base = {ticket:18000,demand:35,days:20,dailyHours:8,serviceMins:180,travelMins:60,materials:1000,transport:800,paymentPct:2,ownerDraw:250000,reserve:1500000,lag:1,
 independent:{initial:800000,fixed:70000,royaltyFixed:0,royaltyPct:0,orderFeePct:0,adMonthly:0},
 franchise:{initial:3000000,fixed:100000,royaltyFixed:70000,royaltyPct:0,orderFeePct:0,adMonthly:30000}};
const clone=()=>structuredClone(base);
const a=calculate(clone());
assert.equal(a.capacity,40);
assert.equal(a.independent.monthlyProfit,484400);
assert.equal(a.franchise.monthlyProfit,354400);
assert.equal(a.independent.breakevenJobs,5);
assert.equal(a.independent.targetJobs,21);
assert.equal(a.franchise.targetJobs,29);
assert.equal(a.overCapacity,false);
const zero=clone();zero.demand=0;
assert.equal(calculate(zero).independent.monthlyProfit,-70000);
const capped=clone();capped.demand=1000;
assert.equal(calculate(capped).independent.effectiveJobs,40);
assert.equal(calculate(capped).overCapacity,true);
const cappedZero=clone();cappedZero.days=0;
assert.equal(calculate(cappedZero).capacity,0);
const noProfit=clone();noProfit.ticket=1;
assert.equal(calculate(noProfit).independent.targetJobs,null);
const extreme=clone();extreme.ticket=100000000;extreme.demand=100000;extreme.days=31;extreme.dailyHours=24;extreme.serviceMins=1;extreme.travelMins=0;
assert.equal(Number.isFinite(calculate(extreme).independent.monthlyProfit),true);
for(const inp of ['',NaN,Infinity,'no',null]){let x=clone();x.ticket=inp;assert.throws(()=>calculate(x));}
assert.throws(()=>{let x=clone();x.serviceMins=0;x.travelMins=0;return calculate(x)});
assert.throws(()=>{let x=clone();x.days=-1;return calculate(x)});
assert.throws(()=>{let x=clone();x.franchise.royaltyPct=101;return calculate(x)});
assert.throws(()=>{let x=clone();x.demand=1.5;return calculate(x)});
assert.equal(calculate({...base,lag:0}).independent.delayedCollectionBuffer,0);
console.log('PASS 16 assertions / paths (normal, 0, cap, invalid, extreme, fees, lag)');
