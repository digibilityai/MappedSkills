// Section-by-section fold measurement. Usage: node measure.cjs  (reads routes from data/routes.txt, writes data/measure.json)
const { chromium } = require('../../node_modules/playwright-core');
const fs = require('fs');
const path = require('path');
const routes = process.env.ROUTES ? process.env.ROUTES.split(',') : fs.readFileSync(path.join(__dirname, 'data/routes.txt'), 'utf8').trim().split('\n');
const sizes = [[1440, 900], [820, 1180], [390, 844], [360, 800]];
const BASE = process.env.BASE || 'http://localhost:3500';
const probe = () => {
  const vh = innerHeight;
  const hdr = document.querySelector('header');
  const hs = hdr ? getComputedStyle(hdr) : null;
  const stickyHdr = hdr && ['sticky', 'fixed'].includes(hs.position) ? Math.round(hdr.getBoundingClientRect().height) : 0;
  // persistent fixed/sticky bottom UI (not the header, not Next dev overlay)
  const fixed = [...document.querySelectorAll('body *')].filter((e) => { const s = getComputedStyle(e); return s.position === 'fixed' && e.getBoundingClientRect().height > 20 && !e.closest('header') && !/nextjs|__next-dev|next-route/i.test(e.tagName + e.id + e.className); }).map((e) => ({ t: (e.className || e.tagName).toString().slice(0, 40), h: Math.round(e.getBoundingClientRect().height), top: Math.round(e.getBoundingClientRect().top) }));
  const main = document.querySelector('main') || document.body;
  const secs = [...main.querySelectorAll('section')].filter((s) => !s.parentElement.closest('section'));
  const out = secs.map((s, i) => {
    const r = s.getBoundingClientRect();
    const h = Math.round(r.height);
    const heading = s.querySelector('h1,h2,h3');
    // hidden overflow and nested scrolling inside the section
    let clipped = 0, nested = 0, tiny = 0, fixedH = 0;
    for (const e of s.querySelectorAll('*')) {
      const cs = getComputedStyle(e);
      if ((cs.overflowY === 'hidden' || cs.overflow === 'hidden') && e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 2 && e.clientWidth > 2 && !e.closest('svg') && !/^(SVG|PATH|IMG|CANVAS)$/i.test(e.tagName)) clipped++;
      if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && e.scrollHeight > e.clientHeight + 2) nested++;
      if (e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 3) && parseFloat(cs.fontSize) < 12) tiny++;
    }
    const cs = getComputedStyle(s);
    if (/vh|svh|dvh/.test(s.getAttribute('style') || '')) fixedH = 1;
    return { i, id: s.id || '', cls: (s.className || '').toString().slice(0, 40), label: (heading ? heading.textContent : s.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 70), h, top: Math.round(r.top + scrollY), clipped, nested, tiny, fixedH, minH: cs.minHeight, details: s.querySelectorAll('details').length, expanders: s.querySelectorAll('[aria-expanded]').length, tabs: s.querySelectorAll('[role=tab]').length, words: (s.innerText || '').trim().split(/\s+/).length };
  });
  const motion = {
    reveal: document.querySelectorAll('[data-reveal],[data-pending],[data-anim],.px-reveal,[class*="reveal"]').length,
    svg: document.querySelectorAll('main svg').length, video: document.querySelectorAll('video').length, details: document.querySelectorAll('main details').length,
  };
  return { vh, stickyHdr, fixed, secs: out, docH: document.documentElement.scrollHeight, title: document.title, h1: (document.querySelector('h1') || {}).textContent, motion, overflowX: document.documentElement.scrollWidth > innerWidth };
};
(async () => {
  let b; const launch = async () => { b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); }; await launch();
  const pf = path.join(__dirname, process.env.ROUTES ? 'data/measure.json' : 'data/measure.partial.json'); const res = fs.existsSync(pf) ? JSON.parse(fs.readFileSync(pf, 'utf8')) : {}; if (process.env.ROUTES) for (const r of routes) delete res[r];
  const work = [];
  for (const [w, h] of sizes) for (const r of routes) if (!(res[r] && res[r][w] && !res[r][w].error)) work.push({ w, h, r });
  let idx = 0, done = 0;
  const worker = async () => {
    while (idx < work.length) {
      const { w, h, r } = work[idx++];
      let ctx, p;
      try { if (!b.isConnected()) await launch(); ctx = await b.newContext({ viewport: { width: w, height: h } }); p = await ctx.newPage(); } catch (e) { await launch().catch(() => {}); work.push({ w, h, r }); continue; }
      let timer; const guard = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('item timeout')), 100000); });
      try { await Promise.race([guard, (async () => {
        await p.goto(BASE + r, { waitUntil: 'load', timeout: 45000 }); await p.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
        const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
        await p.waitForTimeout(900);
        const H = await p.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < H; y += Math.max(400, h - 100)) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(50); }
        await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(250);
        let got; for (let t = 0; t < 3; t++) { try { got = await p.evaluate(probe); break; } catch (e) { await p.waitForTimeout(1000); } } (res[r] = res[r] || {})[w] = got || { error: 'evaluate failed' }; console.log(++done, work.length, w, r);
      })()]); } catch (e) { (res[r] = res[r] || {})[w] = { error: String(e).slice(0, 120) }; console.log('ERR', w, r, String(e).slice(0, 60)); if (/timeout/.test(String(e))) { try { await b.close(); } catch (x) {} } }
      clearTimeout(timer);
      await ctx.close().catch(() => {});
      if (done % 20 === 0) fs.writeFileSync(path.join(__dirname, 'data/measure.partial.json'), JSON.stringify(res));
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  fs.writeFileSync(path.join(__dirname, "data/measure.json"), JSON.stringify(res));
  await b.close();
  console.log('done', Object.keys(res).length);
})();
