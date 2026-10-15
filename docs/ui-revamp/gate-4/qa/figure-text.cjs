#!/usr/bin/env node
/**
 * GATE 4 — rendered text size of figures (X5 class / KD-05 family). `route-a11y-motion.cjs` reads SVG `font-size` in
 * user units, which ignores the viewBox scale; this probe measures what a reader actually sees.
 *
 * usage: node figure-text.cjs --base <url> --routes /a,/b [--widths 320,360,390,768,1440] [--engine chromium]
 *
 * Per route × width: the smallest rendered size of visible SVG <text> (font-size × the element's screen CTM scale) and of
 * visible HTML text inside <main> (computed font-size), each with an example. Read-only.
 */
const { launch, context, open } = require('./lib.cjs');
const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) => (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const widths = (a.widths || '320,360,390,768,1440').split(',').map(Number);
(async () => {
  const b = await launch(a.engine || 'chromium');
  for (const r of a.routes.split(',')) for (const w of widths) {
    const c = await context(b, { width: w, engine: a.engine || 'chromium', reducedMotion: 'reduce' });
    const p = await c.newPage();
    await open(p, a.base + r);
    const m = await p.evaluate(() => {
      const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
      let svgMin = null, svgAt = '';
      for (const t of document.querySelectorAll('main svg text')) {
        if (!vis(t)) continue;
        const ctm = t.getScreenCTM(); if (!ctm) continue;
        const px = parseFloat(getComputedStyle(t).fontSize) * Math.hypot(ctm.a, ctm.b);
        if (svgMin === null || px < svgMin) { svgMin = px; svgAt = t.textContent.trim().slice(0, 40); }
      }
      let htmlMin = null, htmlAt = '';
      const tw = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const n = tw.currentNode; const el = n.parentElement;
        if (!n.textContent.trim() || el.closest('svg') || el.closest('.sr-only') || !vis(el)) continue;
        const px = parseFloat(getComputedStyle(el).fontSize);
        if (htmlMin === null || px < htmlMin) { htmlMin = px; htmlAt = `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} "${n.textContent.trim().slice(0, 30)}"`; }
      }
      return { svgMin: svgMin && Math.round(svgMin * 100) / 100, svgAt, htmlMin, htmlAt };
    });
    console.log(`${r} @${w}: svg min ${m.svgMin === null ? 'n/a' : m.svgMin + 'px'}${m.svgAt ? ` ("${m.svgAt}")` : ''} · html min ${m.htmlMin}px ${m.htmlAt}`);
    await c.close();
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
