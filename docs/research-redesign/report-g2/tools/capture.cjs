// Report G2: screenshots and checks of the REAL implementation (local dev server) in Chromium, Firefox and WebKit.
// Usage: node tools/capture.cjs [baseUrl]   (default http://localhost:3391). The content is a local FIXTURE rebuilt from the
// public live page (not Contentful); see G2_REPORT.md. Compares the research text with the approved mockup's, paragraph by paragraph.
const { chromium, firefox, webkit } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots');
const URL_ = (process.argv[2] || 'http://localhost:3391') + '/research/marketing-measurement-gap-indian-business-websites';
const MOCK = 'file:///Users/amitguptaamit/gitrepo/MappedSkills/docs/research-redesign/report-g1/mockup/index.html?banner=0';
const VP = [[1440, 900, '1440'], [1280, 800, '1280'], [768, 1024, '768'], [375, 812, '375'], [320, 640, '320']];
const IDS = ['executive-summary', ...Array.from({ length: 10 }, (_, i) => `body-${i + 1}`), 'methodology', 'limitations', 'findings', 'cite'];
const texts = () => {
  const sel = '.rr-more .rs-row, .rr-sum, .rr-prose, .rr-method, .rr-limits, .rr-cite';
  const out = [];
  document.querySelectorAll(sel).forEach((root) => root.querySelectorAll('p, h1, h2, h3, li, dt, dd, th, td, figcaption, blockquote').forEach((e) => {
    if (e.closest('.rr-copy') || e.closest('.rr-copied')) return;
    const t = e.textContent.replace(/\s+/g, ' ').trim(); if (t) out.push(t);
  }));
  return out;
};
(async () => {
  const checks = {}; let mockTexts;
  { const b = await chromium.launch(); const p = await (await b.newContext()).newPage(); await p.goto(MOCK); mockTexts = await p.evaluate(texts); await b.close(); }
  for (const [name, type] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
    let b; try { b = await type.launch(); } catch (e) { checks[name] = { unavailable: String(e).slice(0, 120) }; continue; }
    checks[name] = {};
    for (const [w, h, tag] of VP) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
      await p.goto(URL_, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
      if (name === 'chromium') { await p.screenshot({ path: `${OUT}/${tag}-fold.png` }); await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true }); }
      const r = await p.evaluate((ids) => {
        const main = document.querySelector('main'); const vis = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
        return {
          pageH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
          small: [...main.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(e) && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => e.className + ' ' + e.textContent.slice(0, 20)),
          ids: ids.map((id) => [id, !!document.getElementById(id)]).filter(([, ok]) => !ok),
          anchorsResolve: [...main.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((hh) => !document.getElementById(hh.slice(1))),
          findings: document.querySelectorAll('#findings .rs-row').length, barCaptions: document.querySelectorAll('.rr-barcap').length,
          barCapLinks: [...document.querySelectorAll('.rr-barcap-a')].map((a) => a.href.slice(-40)),
          status: [...document.querySelectorAll('.rr-status dt')].map((d) => (d.querySelector('.rr-st')?.className.split('rr-st-')[1] || '-') + ':' + d.textContent.trim()),
          bars: document.querySelectorAll('.rr-bars').length, chartsShown: [...document.querySelectorAll('.rr-chart img')].length,
          unrendered: document.querySelector('.rr-col')?.getAttribute('data-unrendered') || '0',
          rail: !!document.querySelector('.rr-rail') && vis(document.querySelector('.rr-rail')),
          h1: document.querySelector('h1').textContent.replace(/\s+/g, ' ').trim(),
          h1count: document.querySelectorAll('h1').length,
          measure: Math.round(document.querySelector('.rr-prose p').getBoundingClientRect().width),
        };
      }, IDS);
      r.errs = errs.map((e) => e.slice(0, 90));
      if (tag === '1440') { const t = await p.evaluate(texts); r.textsRendered = t.length; r.missingFromRendered = mockTexts.filter((x) => !t.includes(x)).map((x) => x.slice(0, 80)); r.extraInRendered = t.filter((x) => !mockTexts.includes(x)).map((x) => x.slice(0, 80)); }
      checks[name][tag] = r; await ctx.close();
    }
    // keyboard + focus + reduced motion + deep links, one pass at 1440
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(URL_); await p.waitForTimeout(300);
    checks[name].reducedMotion = await p.evaluate(() => ({ toc: getComputedStyle(document.querySelector('.rr-toc a')).transitionDuration, go: getComputedStyle(document.querySelector('.rs-go-t')).transitionDuration }));
    const focus = [];
    for (let i = 0; i < 14; i++) { await p.keyboard.press('Tab'); focus.push(await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return [e.tagName, (e.textContent || '').trim().slice(0, 22), cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 ? 'outline' : (cs.boxShadow !== 'none' ? 'shadow' : 'NONE')]; })); }
    checks[name].focus = focus;
    const dl = {};
    for (const id of ['methodology', 'limitations', 'body-5', 'executive-summary', 'cite', 'findings']) { await p.goto(URL_ + '#' + id); await p.waitForTimeout(250); dl[id] = await p.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id); }
    checks[name].deeplinkTop = dl;
    await p.goto(URL_); await p.click('.rr-toc a[href="#body-4"]'); await p.waitForTimeout(300);
    checks[name].railClick = await p.evaluate(() => Math.round(document.getElementById('body-4').getBoundingClientRect().top));
    await ctx.close(); await b.close();
  }
  fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify(checks, null, 1));
  for (const [n, v] of Object.entries(checks)) { if (v.unavailable) { console.log(n, 'UNAVAILABLE', v.unavailable); continue; }
    for (const [t, r] of Object.entries(v)) if (r && r.pageH) console.log(n, t, JSON.stringify({ h: r.pageH, ofx: r.overflowX, small: r.small.length, ids: r.ids, anch: r.anchorsResolve, f: r.findings, caps: r.barCaptions, st: r.status.length, bars: r.bars, charts: r.chartsShown, unr: r.unrendered, rail: r.rail, h1n: r.h1count, errs: r.errs }));
    console.log(n, 'rm', JSON.stringify(v.reducedMotion), 'deeplink', JSON.stringify(v.deeplinkTop), 'rail', v.railClick); }
  const c = checks.chromium['1440']; console.log('missing', JSON.stringify(c.missingFromRendered), 'extra', JSON.stringify(c.extraInRendered), 'n', c.textsRendered, mockTexts.length);
})();
