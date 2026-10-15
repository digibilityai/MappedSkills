#!/usr/bin/env node
/**
 * GATE 4 · B2 — route-level accessibility and motion checks for a migrated body (GATE_4_QA_ACCEPTANCE_MATRIX.md §2.2,
 * GATE_4_MOTION_SPECIFICATION.md §9). Complements a11y.cjs / layout.cjs, which already cover axe, names, targets, text spacing,
 * zoom and a full normal-mode Tab walk.
 *
 * usage: node route-a11y-motion.cjs --base <url> --routes /a,/b [--engine chromium|webkit|firefox] [--out file.json]
 *
 * Per route:
 *  F1 full-page Tab walk (no stop cap below 220) at 390 and 1440 (+ 1440 at 200% zoom = 720 CSS px):
 *     every stop visible, in view, with a ≥2px outline or ring; the order of <main> stops follows DOM order.
 *  F2 forced colours (Chromium only): the SAME full walk, every stop keeps a ≥2px outline (the KD-02 acceptance method).
 *  M1 motion budget: ≤ 6 [data-dc-motion] targets on the route.
 *  M2 motion allowed, top of page: every element inside a `.dc-pre` target that holds text keeps opacity 1 and no transform;
 *     after scrolling to the end, 0 `.dc-pre` remain.
 *  M3 reduced motion: 0 `.dc-pre`; no element in <main> keeps a transition longer than 10ms.
 *  N1 no JavaScript: every scope row is open and every <main> heading, link and paragraph of the JS render is present.
 *  P1 print emulation: 0 `.dc-pre`; the close's arrival marks are visible once settled (their opacity at `beforeprint` is reported:
 *     the release is a transition, OBS-9).
 *  R1 320px: no page-level horizontal scroll; smallest rendered text in <main> ≥ 12px.
 * Exit 1 on any failure.
 */
const fs = require('fs');
const { args, launch, context } = require('./lib.cjs');

const a = args();
const routes = String(a.routes || '').split(',').filter(Boolean);
const engine = a.engine || 'chromium';
const TAB = engine === 'webkit' ? 'Alt+Tab' : 'Tab';
const fails = [];
const res = {};
const fail = (r, id, msg) => fails.push(`${id} ${r}: ${msg}`);

async function walk(page) {
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
  const stops = [];
  for (let i = 0; i < 400; i++) {
    await page.keyboard.press(TAB);
    await page.waitForTimeout(30);
    const s = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const cs = getComputedStyle(e), q = e.getBoundingClientRect();
      const all = [...document.querySelectorAll('main a[href], main button, main summary, main input, main select, main textarea')];
      return {
        key: `${e.closest('main') ? 'main' : e.closest('footer') ? 'footer' : e.closest('header') ? 'header' : 'other'}:${e.tagName.toLowerCase()}:${e.getAttribute('href') || ''}:${(e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40)}`,
        mainIndex: e.closest('main') ? all.indexOf(e) : -1,
        ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || (cs.boxShadow && cs.boxShadow !== 'none'),
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        inView: q.bottom > 0 && q.top < innerHeight && q.width > 0,
        visible: q.width > 0 && q.height > 0 && cs.visibility !== 'hidden',
      };
    });
    if (!s) break;
    if (s.visible && !s.inView) { await page.waitForTimeout(250); s.inView = await page.evaluate(() => { const q = document.activeElement.getBoundingClientRect(); return q.bottom > 0 && q.top < innerHeight; }); }
    if (stops.length && stops[0].key === s.key && i > 3) break;
    stops.push(s);
  }
  return stops;
}

(async () => {
  const browser = await launch(engine);
  for (const r of routes) {
    const out = (res[r] = {});
    // F1 (+ F2)
    for (const [label, w, zoom, forced] of [['390', 390, 1, false], ['1440', 1440, 1, false], ['1440@200%', 720, 2, false], ...(engine === 'chromium' ? [['forced-390', 390, 1, true], ['forced-1440', 1440, 1, true]] : [])]) {
      const ctx = await context(browser, { width: w, engine, reducedMotion: 'reduce', ...(forced ? { forcedColors: 'active' } : {}) });
      const p = await ctx.newPage();
      await p.goto(a.base + r, { waitUntil: 'networkidle' });
      const stops = await walk(p);
      const main = stops.filter((s) => s.mainIndex >= 0);
      const bad = stops.filter((s) => !s.ring || !s.visible || (!s.inView && engine === 'chromium'));
      const ordered = main.every((s, i) => i === 0 || s.mainIndex > main[i - 1].mainIndex);
      out[`walk-${label}`] = { stops: stops.length, mainStops: main.length, bad: bad.map((s) => s.key), mainOrderFollowsDom: ordered, outlines: [...new Set(main.map((s) => s.outline))] };
      if (bad.length) fail(r, forced ? 'F2' : 'F1', `${label}: ${bad.length} stop(s) without a visible, in-view ≥2px indicator: ${bad.map((s) => s.key).join(' | ')}`);
      if (!ordered) fail(r, 'F1', `${label}: <main> focus order departs from DOM order`);
      if (!main.length) fail(r, 'F1', `${label}: no focus stop reached <main>`);
      await ctx.close();
    }
    // M1, M2
    {
      const ctx = await context(browser, { width: 1440, engine });
      const p = await ctx.newPage();
      await p.goto(a.base + r, { waitUntil: 'networkidle' });
      await p.waitForTimeout(300);
      const m = await p.evaluate(() => {
        const pre = [...document.querySelectorAll('.dc-pre')];
        const textHidden = [];
        for (const el of pre) for (const n of el.querySelectorAll('*')) {
          if (![...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
          for (let x = n; x && x !== el.parentElement; x = x.parentElement) { const cs = getComputedStyle(x); if (parseFloat(cs.opacity) < 1 || (cs.transform !== 'none' && x !== el)) { textHidden.push(`${n.tagName}:${n.textContent.trim().slice(0, 30)}`); break; } }
        }
        return { targets: document.querySelectorAll('[data-dc-motion]').length, preAtTop: pre.length, textHidden };
      });
      for (let y = 0; y < 40; y++) { await p.mouse.wheel(0, 500); await p.waitForTimeout(90); }
      await p.waitForTimeout(1500);
      m.preAfterScroll = await p.evaluate(() => document.querySelectorAll('.dc-pre').length);
      out.motion = m;
      if (m.targets > 6) fail(r, 'M1', `${m.targets} reveal targets (> 6)`);
      if (m.textHidden.length) fail(r, 'M2', `text inside a pre-state is hidden or moved: ${m.textHidden.join(' | ')}`);
      if (m.preAfterScroll) fail(r, 'M2', `${m.preAfterScroll} element(s) still in .dc-pre after scrolling to the end`);
      await ctx.close();
    }
    // M3
    {
      const ctx = await context(browser, { width: 390, engine, reducedMotion: 'reduce' });
      const p = await ctx.newPage();
      await p.goto(a.base + r, { waitUntil: 'networkidle' });
      out.reduced = await p.evaluate(() => {
        const long = [...document.querySelectorAll('main *')].filter((e) => { const cs = getComputedStyle(e); const d = cs.transitionDuration.split(',').map((v) => parseFloat(v) * (v.includes('ms') ? 1 : 1000)); return Math.max(...d) > 10; }).map((e) => e.className || e.tagName);
        return { pre: document.querySelectorAll('.dc-pre').length, longTransitions: [...new Set(long)].slice(0, 10) };
      });
      if (out.reduced.pre) fail(r, 'M3', `${out.reduced.pre} .dc-pre under reduced motion`);
      if (out.reduced.longTransitions.length) fail(r, 'M3', `transitions > 10ms under reduced motion: ${out.reduced.longTransitions.join(', ')}`);
      // P1 on the same page, motion allowed context is not needed: print always composes
      await ctx.close();
    }
    // N1
    {
      const grab = () => ({
        heads: [...document.querySelectorAll('main h1, main h2, main h3')].map((h) => h.textContent.trim()),
        links: [...document.querySelectorAll('main a[href]')].map((x) => x.getAttribute('href')),
        paras: [...document.querySelectorAll('main p, main li, main dd')].map((x) => x.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean),
        closedDetails: document.querySelectorAll('main details:not([open])').length,
      });
      const js = await context(browser, { width: 1440, engine, reducedMotion: 'reduce' });
      const pj = await js.newPage(); await pj.goto(a.base + r, { waitUntil: 'networkidle' }); const J = await pj.evaluate(grab); await js.close();
      const nj = await context(browser, { width: 1440, engine, javaScriptEnabled: false });
      const pn = await nj.newPage(); await pn.goto(a.base + r, { waitUntil: 'load' }); const N = await pn.evaluate(grab); await nj.close();
      const missing = [...J.heads.filter((x) => !N.heads.includes(x)), ...J.links.filter((x) => !N.links.includes(x)), ...J.paras.filter((x) => !N.paras.includes(x))];
      out.noJs = { closedDetails: N.closedDetails, missing: missing.length, headings: N.heads.length, links: N.links.length, paragraphs: N.paras.length };
      if (N.closedDetails) fail(r, 'N1', `${N.closedDetails} closed <details> without JavaScript`);
      if (missing.length) fail(r, 'N1', `missing without JavaScript: ${missing.slice(0, 5).join(' | ')}`);
    }
    // P1
    {
      const ctx = await context(browser, { width: 1440, engine });
      const p = await ctx.newPage();
      await p.goto(a.base + r, { waitUntil: 'networkidle' });
      await p.emulateMedia({ media: 'print' });
      await p.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
      const minOpacity = () => p.evaluate(() => Math.min(1, ...[...document.querySelectorAll('.dc-arrive .dc-mk')].map((m) => parseFloat(getComputedStyle(m).opacity))));
      // The release is a transition (420ms + up to 360ms stagger): sample once immediately (reported, see OBS-9) and once settled.
      const atBeforeprint = await minOpacity();
      await p.waitForTimeout(1500);
      out.print = await p.evaluate(() => ({ pre: document.querySelectorAll('.dc-pre').length, marksVisible: [...document.querySelectorAll('.dc-arrive .dc-mk')].every((m) => parseFloat(getComputedStyle(m).opacity) === 1) }));
      out.print.markOpacityAtBeforeprint = atBeforeprint;
      if (out.print.pre || !out.print.marksVisible) fail(r, 'P1', JSON.stringify(out.print));
      await ctx.close();
    }
    // R1
    {
      const ctx = await context(browser, { width: 320, engine, reducedMotion: 'reduce' });
      const p = await ctx.newPage();
      await p.goto(a.base + r, { waitUntil: 'networkidle' });
      out.r320 = await p.evaluate(() => {
        let min = 99, where = '';
        for (const e of document.querySelectorAll('main *')) {
          if (![...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
          const q = e.getBoundingClientRect(); if (!q.width) continue;
          const f = parseFloat(getComputedStyle(e).fontSize); if (f < min) { min = f; where = `${e.tagName}.${e.className}`.slice(0, 50); }
        }
        return { pageScroll: document.documentElement.scrollWidth > innerWidth, minFontPx: min, minAt: where };
      });
      if (out.r320.pageScroll) fail(r, 'R1', 'page-level horizontal scroll at 320');
      if (out.r320.minFontPx < 12) fail(r, 'R1', `text below 12px at 320: ${out.r320.minFontPx}px (${out.r320.minAt})`);
      await ctx.close();
    }
    process.stderr.write(`· ${r}\n`);
  }
  await browser.close();
  if (a.out) fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/route-a11y-motion.cjs', engine, base: a.base, at: new Date().toISOString() }, results: res, fails }, null, 1));
  for (const [r, o] of Object.entries(res)) {
    console.log(`${r} [${engine}]`);
    for (const [k, v] of Object.entries(o)) console.log(`  ${k}: ${JSON.stringify(v)}`);
  }
  console.log(fails.length ? `\nFAIL ${fails.length}\n${fails.join('\n')}` : `\nSUMMARY: all checks pass (${routes.length} routes, ${engine})`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
