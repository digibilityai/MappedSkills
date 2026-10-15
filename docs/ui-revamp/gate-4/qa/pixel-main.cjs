#!/usr/bin/env node
/**
 * GATE 4 · B0 — `<main>`-only pixel comparison (extends gate-2/validation/unrelated-routes.cjs).
 *
 * usage:
 *   node pixel-main.cjs --plain <A> --fixture <A'> --cand-plain <B> --cand-fixture <B'> --out <result.json> [--only ids] [--widths 390,1440] [--save-diffs <dir>]
 *   node pixel-main.cjs --plain <A> --fixture <A'> --hashes <file.json>      # record SHA-256 of each <main> capture
 *   node pixel-main.cjs --plain <B> --fixture <B'> --against <hashes.json> [--out <result.json>]
 *       # compare a candidate with RECORDED hashes when the baseline build is not running. Reports identical / changed
 *       # per capture (no pixel count: the baseline image is not stored). B0 showed separate builds of the same source
 *       # produce identical captures (56/56 vs the Gate 3 build), so a hash mismatch means the rendering changed.
 *
 * Why <main> only: a chrome batch (B1) is EXPECTED to change the header and footer and therefore every page's
 * full-page pixels. The body must not change. Each capture is an element screenshot of `main` (reduced motion,
 * consent declined, the page pre-scrolled once so any lazy content settles), compared byte-for-byte; on a mismatch
 * the differing pixel count is computed in a canvas. Size changes are reported as such.
 * Run the baseline build of the previous batch on one port pair and the candidate on another.
 * --mask-chrome: hide the site header/footer while capturing (both builds). Required for a chrome batch (see cap()).
 * --align: if <main> starts at a different page offset in the candidate, capture the baseline with <main> shifted by
 *   that delta, so translation-dependent rasterisation is not reported as a change. The shift is printed per row.
 *   Recorded hashes (--hashes / --against) are only comparable when made with the same --mask-chrome setting.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { args, selectTargets, launch, context, pool } = require('./lib.cjs');

const a = args();
const widths = a.widths || [390, 1440];
const targets = selectTargets(a);
const baseOf = (pl, fx, t) => (t.server === 'fixture' ? fx : pl);

async function mainTop(browser, base, t, w) {
  const ctx = await context(browser, { width: w, engine: a.engine || 'chromium', reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + t.url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const y = await p.evaluate(() => document.querySelector('main').getBoundingClientRect().top + scrollY);
  await ctx.close();
  return y;
}

async function cap(browser, base, t, w, shift = 0) {
  const ctx = await context(browser, { width: w, engine: a.engine || 'chromium', reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + t.url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); } scrollTo(0, 0); });
  await p.waitForTimeout(250);
  // --mask-chrome: the site header and footer (outside <main>) are not painted (visibility only; layout is
  // unchanged). Needed whenever the chrome differs between the two builds: a STICKY header is painted over the
  // top of <main> when the element screenshot scrolls <main> into view (B1 finding: B0's recorded hashes for
  // legacy-chrome targets include the 65px sticky header). Apply it to BOTH builds of a comparison.
  if (a['mask-chrome']) await p.addStyleTag({ content: 'header:not(main header), footer:not(main footer){visibility:hidden!important}' });
  // --align: shift <main> by `shift` px (position:relative; its own layout is untouched) so both captures sit at the
  // same page offset. B1 finding: a taller header moves <main> down 8px at 1440, and blur/gradient surfaces then
  // rasterise a few pixels differently; B0 shifted by the same 8px was byte-identical to B1.
  if (shift) await p.addStyleTag({ content: `main{position:relative!important;top:${shift}px!important}` });
  const png = await p.locator('main').screenshot({ animations: 'disabled' });
  await ctx.close();
  return png;
}

async function diffPx(browser, x, y) {
  const p = await browser.newPage();
  const n = await p.evaluate(async ([A, B]) => {
    const L = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
    const [I, J] = await Promise.all([L(A), L(B)]);
    if (I.width !== J.width || I.height !== J.height) return `size ${I.width}x${I.height} vs ${J.width}x${J.height}`;
    const g = (i) => { const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.drawImage(i, 0, 0); return x.getImageData(0, 0, i.width, i.height).data; };
    const d1 = g(I), d2 = g(J); let n = 0;
    for (let k = 0; k < d1.length; k += 4) if (d1[k] !== d2[k] || d1[k + 1] !== d2[k + 1] || d1[k + 2] !== d2[k + 2]) n++;
    return n;
  }, [x.toString('base64'), y.toString('base64')]);
  await p.close();
  return n;
}

(async () => {
  const browser = await launch('chromium');
  const jobs = targets.flatMap((t) => widths.map((w) => ({ t, w })));
  if (a.against) {
    const rec = JSON.parse(fs.readFileSync(a.against, 'utf8'));
    const want = new Map(rec.rows.map((r) => [`${r.id}@${r.w}`, r.sha256]));
    const rows = await pool(jobs.filter(({ t, w }) => want.has(`${t.id}@${w}`)), 4, async ({ t, w }) => {
      const png = await cap(browser, baseOf(a.plain, a.fixture, t), t, w);
      const sha = crypto.createHash('sha256').update(png).digest('hex');
      return { id: t.id, w, identical: sha === want.get(`${t.id}@${w}`), sha256: sha };
    });
    const bad = rows.filter((r) => !r.identical);
    if (a.out) fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/pixel-main.cjs', mode: 'against', hashes: a.against, candidate: [a.plain, a.fixture], at: new Date().toISOString() }, rows }, null, 1));
    for (const r of rows) console.log(`${r.identical ? 'SAME' : 'DIFF'} ${r.id} @${r.w}`);
    console.log(`\nSUMMARY: ${rows.length - bad.length}/${rows.length} <main> captures match the recorded hashes`);
    process.exitCode = bad.length ? 1 : 0;
  } else if (a.hashes) {
    const rows = await pool(jobs, 4, async ({ t, w }) => { const png = await cap(browser, baseOf(a.plain, a.fixture, t), t, w); return { id: t.id, w, sha256: crypto.createHash('sha256').update(png).digest('hex'), bytes: png.length }; });
    fs.writeFileSync(a.hashes, JSON.stringify({ meta: { tool: 'gate-4/qa/pixel-main.cjs', maskChrome: !!a['mask-chrome'], plain: a.plain, fixture: a.fixture, at: new Date().toISOString() }, rows }, null, 1));
    console.log(`pixel-main hashes: ${rows.length} captures written to ${path.relative(process.cwd(), path.resolve(a.hashes))}`);
  } else {
    const rows = await pool(jobs, 4, async ({ t, w }) => {
      let shift = 0;
      if (a.align) {
        const [ya, yb] = await Promise.all([mainTop(browser, baseOf(a.plain, a.fixture, t), t, w), mainTop(browser, baseOf(a['cand-plain'], a['cand-fixture'], t), t, w)]);
        shift = Math.round((yb - ya) * 100) / 100;
      }
      const x = await cap(browser, baseOf(a.plain, a.fixture, t), t, w, shift);
      const y = await cap(browser, baseOf(a['cand-plain'], a['cand-fixture'], t), t, w);
      const same = x.equals(y);
      const px = same ? 0 : await diffPx(browser, x, y);
      if (!same && a['save-diffs']) { fs.mkdirSync(a['save-diffs'], { recursive: true }); fs.writeFileSync(path.join(a['save-diffs'], `${t.id}-${w}-A.png`), x); fs.writeFileSync(path.join(a['save-diffs'], `${t.id}-${w}-B.png`), y); }
      return { id: t.id, w, identical: same, differing: px, baselineShiftPx: shift };
    });
    const bad = rows.filter((r) => !r.identical);
    if (a.out) fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/pixel-main.cjs', maskChrome: !!a['mask-chrome'], baseline: [a.plain, a.fixture], candidate: [a['cand-plain'], a['cand-fixture']], at: new Date().toISOString() }, rows }, null, 1));
    for (const r of rows) console.log(`${r.identical ? 'SAME' : 'DIFF'} ${r.id} @${r.w}${r.baselineShiftPx ? ` (baseline aligned +${r.baselineShiftPx}px)` : ''}${r.identical ? '' : ' — ' + r.differing + (typeof r.differing === 'number' ? ' px' : '')}`);
    console.log(`\nSUMMARY: ${rows.length - bad.length}/${rows.length} <main> captures pixel-identical`);
    process.exitCode = bad.length ? 1 : 0;
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
