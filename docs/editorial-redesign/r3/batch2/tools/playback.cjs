// Actual playback measurement (DEC-112): samples computed styles on every animation frame while the real page plays, so durations, order,
// monotonic progress and frame gaps are measured, not inferred from stills. Usage: BASE=http://localhost:3500 node playback.cjs
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const sampler = () => {
  window.__tl = []; window.__on = false;
  const num = (s) => parseFloat(s);
  const tick = (t) => {
    if (window.__on) {
      const q = (sel) => document.querySelector(sel);
      const op = (sel) => { const e = q(sel); return e ? num(getComputedStyle(e).opacity) : null; };
      const ty = (sel) => { const e = q(sel); if (!e) return null; const m = /matrix\(([^)]+)\)/.exec(getComputedStyle(e).transform); return m ? num(m[1].split(',')[5]) : 0; };
      const clip = (sel) => { const e = q(sel); if (!e) return null; const m = /inset\(([^)]+)\)/.exec(getComputedStyle(e).clipPath); return m ? num(m[1].split(' ')[1]) : 0; };
      const marked = [...document.querySelectorAll(window.__sqSel || '.ed-sq.is-marked')]; let a = 0; marked.forEach((e) => { const m = /rgba?\(([^)]+)\)/.exec(getComputedStyle(e).borderTopColor); const p = m ? m[1].split(',').map(Number) : [0, 0, 0, 1]; a += p.length > 3 ? p[3] : 1; });
      const bar = q('.ed-bars .tr i'); const bm = bar ? /matrix\(([^)]+)\)/.exec(getComputedStyle(bar).transform) : null;
      window.__tl.push({ t, k: op('.ed-hero .ed-k'), h1: op('.ed-hero h1'), h1y: ty('.ed-hero h1'), em: op('.ed-hero h1 em'), lede: op('.ed-hero .ed-lede'), act: op('.ed-hero .ed-hl .ed-act'), wipe: clip('.ed-hero .ed-wipe'), sq: marked.length ? a / marked.length : null, bar: bm ? num(bm[1].split(',')[0]) : bar ? 1 : null, vals: [...document.querySelectorAll('.ed-leg, .ed-bars b, .ed-figs .ed-fig')].every((e) => num(getComputedStyle(e).opacity) === 1) });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const summarize = (tl, key, from = 0) => {
  const s = tl.filter((f) => f.t >= from && f[key] != null);
  if (!s.length) return null;
  const v = s.map((f) => f[key]); const first = v[0]; const last = v[v.length - 1];
  const moving = s.filter((f, i) => i && Math.abs(f[key] - v[i - 1]) > 1e-3);
  const t0 = moving.length ? moving[0].t : null; const t1 = moving.length ? moving[moving.length - 1].t : null;
  const dir = Math.sign(last - first) || 1; let mono = true; for (let i = 1; i < v.length; i++) if ((v[i] - v[i - 1]) * dir < -1e-3) mono = false;
  return { from: +first.toFixed(2), to: +last.toFixed(2), startMs: t0 == null ? null : Math.round(t0 - from), endMs: t1 == null ? null : Math.round(t1 - from), ms: t0 == null ? 0 : Math.round(t1 - t0), monotonic: mono };
};
const gaps = (tl, a, b) => { const s = tl.filter((f) => f.t >= a && f.t <= b); const g = s.slice(1).map((f, i) => f.t - s[i].t); g.sort((x, y) => x - y); return { frames: s.length, medianMs: +(g[Math.floor(g.length / 2)] || 0).toFixed(1), p95Ms: +(g[Math.floor(g.length * 0.95)] || 0).toFixed(1), maxMs: +(g[g.length - 1] || 0).toFixed(1) }; };
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {};
  for (const reduce of [false, true]) {
    const mode = reduce ? 'reduced' : 'motion';
    // opening stage on three pages
    for (const [name, url] of [['blog', '/blog'], ['press', '/press'], ['research', '/research'], ['article', '/blog/seo-company-in-pune']]) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' }); const p = await ctx.newPage();
      await p.addInitScript(sampler);
      await p.addInitScript(() => { window.__on = true; });
      await p.goto(BASE + url, { waitUntil: 'load' }); await p.waitForTimeout(2200);
      const tl = await p.evaluate(() => window.__tl);
      const t0 = tl.find((f) => f.h1 != null)?.t ?? 0;
      out[`${mode}/${name}/opening`] = { k: summarize(tl, 'k', t0), h1: summarize(tl, 'h1', t0), h1y: summarize(tl, 'h1y', t0), em: summarize(tl, 'em', t0), lede: summarize(tl, 'lede', t0), act: summarize(tl, 'act', t0), wipe: summarize(tl, 'wipe', t0), frames: gaps(tl, t0, t0 + 1500) };
      await ctx.close();
    }
    // charts released when scrolled into view
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' }); const p = await ctx.newPage();
    await p.addInitScript(sampler); await p.goto(BASE + '/research', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
    const targets = [['headlineChart', '#rs-finding .ed-ef', 'sq'], ['otherChart', '.ed-multi > li:nth-child(2) .ed-ef', 'sq'], ['sectorBars', '.ed-bars', 'bar']];
    for (const [name, sel, key] of targets) {
      await p.evaluate((s) => { window.__tl = []; window.__sqSel = s + ' .ed-sq.is-marked'; window.__on = true; }, sel);
      const t = await p.evaluate((s) => { const e = document.querySelector(s); const y = e.getBoundingClientRect().top + scrollY - 160; return y; }, sel);
      const t0 = await p.evaluate(() => performance.now());
      for (let k = 1; k <= 8; k++) { await p.evaluate((y) => window.scrollTo(0, y), (await p.evaluate(() => scrollY)) + (t - (await p.evaluate(() => scrollY))) * (k / 8)); await p.waitForTimeout(40); }
      await p.waitForTimeout(1800);
      const tl = await p.evaluate(() => window.__tl);
      const r = summarize(tl, key, t0);
      const start = tl.find((f) => f[key] != null && f.t >= t0);
      out[`${mode}/research/${name}`] = { progress: r, valuesReadableEveryFrame: tl.every((f) => f.vals), startState: start ? +start[key].toFixed(2) : null, frames: gaps(tl, t0, t0 + 2600) };
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(__dirname, '../data/playback.json'), JSON.stringify(out, null, 1));
  for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v));
  await b.close();
})();
