#!/usr/bin/env node
/**
 * GATE 4 — display-fallback calibration sweep (risk G4-3). Committed so the calibration evidence is reproducible.
 *
 * usage: node fallback-sweep.cjs --base <url> --routes /a,/b [--widths 320,360,390,430,768,1024,1440]
 *                                [--min 86] [--max 96] [--step 0.5] [--selector "main h1"] [--engine chromium]
 *
 * For each route × width: the line count of the selected display text in the real (opsz) face after fonts load, then the
 * same text set in the Arial-Bold-based fallback at each size-adjust from --min to --max, and the window of size-adjust
 * values that keeps the real line count. A fallback that keeps the line count cannot re-wrap the text when the face swaps
 * in, which is what keeps above-the-fold CLS at ~0 on a slow network. Also reports which fallback each page currently uses.
 * ascent/descent are reproduced as in app/direction-c.css (Bricolage 0.93 / 0.27 em at that size-adjust).
 * Chromium proxy: Arial/Liberation must exist on the machine; Android has neither (X2, unverified on devices).
 */
const { launch, context, open } = require('./lib.cjs');
const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) => (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const widths = (a.widths || '320,360,390,430,768,1024,1440').split(',').map(Number);
const min = Number(a.min || 86), max = Number(a.max || 96), step = Number(a.step || 0.5);
const sel = a.selector || 'main h1';

(async () => {
  const b = await launch(a.engine || 'chromium');
  for (const r of a.routes.split(',')) {
    for (const w of widths) {
      const c = await context(b, { width: w, engine: a.engine || 'chromium', reducedMotion: 'reduce' });
      const p = await c.newPage();
      await open(p, a.base + r);
      const res = await p.evaluate(async ({ sel, min, max, step }) => {
        const el = document.querySelector(sel);
        const lines = () => { const rg = document.createRange(); rg.selectNodeContents(el); const tops = new Set([...rg.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))); return tops.size; };
        const stack = getComputedStyle(el).fontFamily;
        const real = lines();
        const ok = [];
        const style = document.createElement('style'); document.head.appendChild(style);
        for (let s = min; s <= max + 1e-9; s += step) {
          const k = (s / 100);
          style.textContent = `@font-face{font-family:"SweepFB";src:local("Arial Bold"),local("Arial-BoldMT"),local("Liberation Sans Bold"),local("LiberationSans-Bold");font-weight:100 900;size-adjust:${s}%;ascent-override:${(0.93 / k * 100).toFixed(2)}%;descent-override:${(0.27 / k * 100).toFixed(2)}%;line-gap-override:0%}`;
          el.style.fontFamily = '"SweepFB"';
          await document.fonts.load('800 40px "SweepFB"');
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
          if (lines() === real) ok.push(Math.round(s * 10) / 10);
        }
        el.style.fontFamily = ''; style.remove();
        return { real, ok, fallback: (stack.match(/"DC Display[^"]*"/) || ['?'])[0] };
      }, { sel, min, max, step });
      const win = res.ok.length ? `${res.ok[0]}–${res.ok[res.ok.length - 1]}%${res.ok.length !== Math.round((res.ok[res.ok.length - 1] - res.ok[0]) / step) + 1 ? ' (gaps: ' + res.ok.join(',') + ')' : ''}` : 'NONE';
      console.log(`${r} @${w}: real ${res.real} lines; fallback keeps it for size-adjust ${win}; page uses ${res.fallback}`);
      await c.close();
    }
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
