#!/usr/bin/env node
/**
 * GATE 4 · B0 — CHECKS 1, 5, 8: rendering, responsive overflow, text spacing, zoom/reflow, console errors.
 *
 * usage: node layout.cjs --plain <url> --fixture <url> --out <findings.json> [--shots <dir>] [--engine chromium|webkit|firefox] [--only ids] [--widths 390,1440]
 *
 * Per target × width (320 360 390 430 768 1024 1440), consent preset "denied", reduced motion:
 *   - document status as expected
 *   - page-level horizontal overflow, and the elements past the right edge
 *   - sticky / fixed elements (the consent banner is the one approved fixed element; it is hidden by the preset)
 *   - h1 count and heading-level jumps
 *   - interactive targets under 44 px tall / 24 px wide (inline links in running text are reported separately)
 *   - console and page errors
 * Plus, per target: WCAG 1.4.12 text spacing at 320/360/390 (overflow), and reflow at 200% (720×450 @2x)
 * and 400% (320×256) zoom equivalents.
 * Findings (lib.cjs Findings) are classified against a baseline by classify.cjs.
 * --inject <ids>: negative control (see below); never for real results.
 * --shots <dir>: full-page JPEGs at 390 and 1440 for every target, and the first screen at every width.
 */
const path = require('path');
const fs = require('fs');
const { WIDTHS, args, selectTargets, baseFor, launch, context, watchErrors, pool, Findings, slug } = require('./lib.cjs');

const a = args();
if (!a.out) { console.error('--out required'); process.exit(2); }
const widths = a.widths || WIDTHS;
const TS = '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';

function measure() {
  const de = document.documentElement;
  const vis = (e) => { const s = getComputedStyle(e); const q = e.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && q.width > 0 && q.height > 0; };
  const label = (e) => `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}`;
  const cw = de.clientWidth;
  const past = [];
  for (const e of document.body.querySelectorAll('*')) {
    if (!vis(e)) continue;
    const pos = getComputedStyle(e).position;
    if (pos === 'fixed') continue;
    const q = e.getBoundingClientRect();
    if (q.right > cw + 1) {
      // report outermost offenders only
      if (!past.some((p) => p.el.contains(e))) {
        // CONTAINED: an ancestor clips or scrolls it horizontally inside the viewport (e.g. a table in an
        // overflow-x:auto wrapper). Tracked, but it is not page overflow. Otherwise it is PAST-EDGE.
        let c = e.parentElement, contained = false;
        while (c && c !== document.body) {
          const ox = getComputedStyle(c).overflowX;
          if (ox !== 'visible' && c.getBoundingClientRect().right <= cw + 1) { contained = true; break; }
          c = c.parentElement;
        }
        past.push({ el: e, right: Math.round(q.right), contained });
      }
    }
  }
  const pinned = [...document.body.querySelectorAll('*')].filter((e) => ['sticky', 'fixed'].includes(getComputedStyle(e).position) && vis(e)).map((e) => `${label(e)}:${getComputedStyle(e).position}`);
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map((h) => +h.tagName[1]);
  let jumps = 0; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) jumps++;
  const ctl = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]')].filter((e) => vis(e) && !e.closest('[inert]'));
  const inline = (e) => e.tagName === 'A' && e.closest('p, li, td, dd, blockquote') && !e.matches('[class*="btn"]');
  const small = ctl.filter((e) => { const q = e.getBoundingClientRect(); return q.height < 43.5 || q.width < 24; });
  const nm = (e) => (e.getAttribute('aria-label') || e.textContent || e.getAttribute('name') || '').replace(/\s+/g, ' ').trim().slice(0, 28);
  const region = (e) => (e.closest('main') ? 'main' : e.closest('footer') ? 'footer' : e.closest('header') ? 'header' : 'other');
  return {
    overflow: de.scrollWidth - cw,
    past: past.filter((p) => !p.contained).slice(0, 6).map((p) => `${label(p.el)}${p.el.closest('svg') ? '(svg)' : ''}`),
    contained: past.filter((p) => p.contained).slice(0, 6).map((p) => label(p.el)),
    pinned,
    h1: hs.filter((h) => h === 1).length,
    jumps,
    smallBlock: small.filter((e) => !inline(e)).map((e) => { const q = e.getBoundingClientRect(); return `${region(e)}:${nm(e)}(${Math.round(q.width)}x${Math.round(q.height)})`; }),
    smallInline: small.filter(inline).length,
    controls: ctl.length,
    height: de.scrollHeight,
  };
}

(async () => {
  const browser = await launch(a.engine);
  const F = new Findings({ tool: 'gate-4/qa/layout.cjs', engine: a.engine, plain: a.plain, fixture: a.fixture, widths, at: new Date().toISOString() });
  const targets = selectTargets(a);
  const metrics = {};
  // page-scroll: the page itself scrolls sideways (always a defect).
  // past-edge: content extends past the viewport without page scroll (cut off), keyed by element.
  // contained: content wider than the viewport inside its own clipping/scrolling ancestor (tracked).
  const report = (check, t, w, m, pre) => {
    let clean = true;
    if (m.overflow > 0) { F.add(check, t.id, w, 'page-scroll', `${pre}page scrolls horizontally by ${m.overflow}px`); clean = false; }
    for (const p of [...new Set(m.past)]) { F.add(check, t.id, w, `past-edge:${p}`, `${pre}content past the right edge, not scrollable: ${p}`); clean = false; }
    for (const c of [...new Set(m.contained)]) F.add(check, t.id, w, `contained:${c}`, `${pre}wider than the viewport inside its own scroll container: ${c}`);
    if (clean) F.pass();
  };
  const jobs = targets.flatMap((t) => widths.map((w) => ({ t, w })));
  await pool(jobs, 5, async ({ t, w }) => {
    const ctx = await context(browser, { width: w, engine: a.engine, reducedMotion: 'reduce', hasTouch: w < 768, isMobile: false });
    const page = await ctx.newPage();
    const errs = watchErrors(page, { expectDocumentStatus: t.status });
    const resp = await page.goto(baseFor(a, t) + t.url, { waitUntil: 'networkidle' });
    try { await page.evaluate(() => document.fonts.ready); } catch (e) {}
    // NEGATIVE CONTROL ONLY (--inject <ids>): widen <main> on the named targets, to prove that
    // classify.cjs reports a regression as NEW. Never used for a baseline or a batch result.
    if (a.inject && String(a.inject).split(',').includes(t.id)) await page.addStyleTag({ content: 'main{min-width:calc(100vw + 40px)!important}' });
    const st = resp ? resp.status() : 0;
    if (st !== t.status) F.add('status', t.id, w, `status-${st}`, `expected ${t.status}, got ${st}`); else F.pass();
    const m = await page.evaluate(measure);
    (metrics[t.id] ||= {})[w] = { overflow: m.overflow, h1: m.h1, jumps: m.jumps, smallBlock: m.smallBlock.length, smallInline: m.smallInline, controls: m.controls, height: m.height, pinned: m.pinned };
    report('overflow', t, w, m, '');
    for (const pin of m.pinned) F.add('pinned', t.id, w, pin, 'sticky/fixed element visible');
    if (!m.pinned.length) F.pass();
    if (m.h1 !== 1) F.add('headings', t.id, w, 'h1-count', `${m.h1} visible h1`); else F.pass();
    if (m.jumps) F.add('headings', t.id, w, 'level-jump', `${m.jumps} heading-level jumps`); else F.pass();
    for (const s of [...new Set(m.smallBlock)]) F.add('target-size', t.id, w, s.replace(/\(\d+x\d+\)$/, ''), s);
    if (!m.smallBlock.length) F.pass();
    for (const e of [...new Set(errs)]) F.add('console', t.id, w, e.slice(0, 80), e); if (!errs.length) F.pass();
    if (a.shots && (w === 390 || w === 1440)) {
      const dir = path.join(a.shots, a.engine); fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${slug(t.id)}-${w}-full.jpg`), fullPage: true, type: 'jpeg', quality: 55 });
    }
    if (a.shots && a.engine === 'chromium') {
      const dir = path.join(a.shots, a.engine, 'fold'); fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${slug(t.id)}-${w}.jpg`), type: 'jpeg', quality: 55 });
    }
    // WCAG 1.4.12 text spacing at narrow widths
    if ([320, 360, 390].includes(w)) {
      await page.addStyleTag({ content: TS }); await page.waitForTimeout(150);
      const s = await page.evaluate(measure);
      report('text-spacing', t, w, s, 'with 1.4.12 spacing: ');
    }
    await ctx.close();
  });
  // Zoom / reflow equivalents
  const zooms = [['zoom200', 720, 450, 2], ['zoom400', 320, 256, 1]];
  await pool(targets.flatMap((t) => zooms.map((z) => ({ t, z }))), 5, async ({ t, z }) => {
    const [name, w, h, dpr] = z;
    const ctx = await context(browser, { width: w, height: h, engine: a.engine, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(baseFor(a, t) + t.url, { waitUntil: 'networkidle' });
    const m = await page.evaluate(measure);
    report(name, t, w, m, `reflow at ${name}: `);
    await ctx.close();
  });
  await browser.close();
  F.meta.metrics = metrics;
  F.write(a.out);
  const by = F.items.reduce((m, f) => ((m[f.check] = (m[f.check] || 0) + 1), m), {});
  console.log(`layout [${a.engine}]: ${targets.length} targets × ${widths.length} widths · ${F.passes} checks clean · ${F.items.length} findings ${JSON.stringify(by)}`);
})().catch((e) => { console.error(e); process.exit(1); });
