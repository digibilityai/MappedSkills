// First-visit cookie banner coverage (checked separately; consent behaviour is not changed). A fresh context has made no choice, so the banner is up.
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const routes = ['/blog', '/blog/seo-company-in-pune', '/press', '/press/marketing-measurement-gap-indian-websites', '/research', '/research/industry-benchmarks', '/research/marketing-measurement-gap-indian-business-websites'];
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {};
  for (const [w, h] of [[1440, 900], [820, 1180], [390, 844], [360, 800]]) for (const r of routes) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(BASE + r, { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const banner = await p.evaluate(() => { const e = document.querySelector('[class*="consent-banner"]'); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), h: Math.round(r.height) }; });
    if (!banner) { out[`${w}${r}`] = { banner: null }; await ctx.close(); continue; }
    const hits = await p.evaluate(() => { const bn = document.querySelector('[class*="consent-banner"]').getBoundingClientRect(); const x = [...document.querySelectorAll('main a[href], main button, main summary')].filter((e) => e.offsetParent !== null); return { total: x.length, bn: bn.top }; });
    // keyboard: every focusable in main; is the focused control left behind the banner?
    const covered = []; let n = 0;
    await p.evaluate(() => window.scrollTo(0, 0));
    for (let i = 0; i < 42; i++) {
      await p.keyboard.press('Tab'); await p.waitForTimeout(450);
      const o = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; if (e.closest('[class*="consent-banner"]')) return { banner: true }; if (!e.closest('main')) return { outside: true }; const r = e.getBoundingClientRect(); const bn = document.querySelector('[class*="consent-banner"]').getBoundingClientRect(); return { t: (e.textContent || '').trim().slice(0, 28), covered: r.bottom > bn.top + 1 && r.top < bn.bottom, sticky: false }; });
      if (o && o.t !== undefined) { n++; if (o.covered) covered.push(o.t); }
    }
    // page end: are footer controls behind the banner at maximum scroll?
    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(300);
    const end = await p.evaluate(() => { const bn = document.querySelector('[class*="consent-banner"]').getBoundingClientRect(); const c = [...document.querySelectorAll('footer a[href], footer button')].filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > bn.top && r.top < bn.bottom; }).map((e) => e.textContent.trim().slice(0, 24)); return c; });
    // consent behaviour: reject hides the banner and the choice persists across a reload
    await p.evaluate(() => window.scrollTo(0, 0)); await p.getByRole('button', { name: /reject analytics/i }).click(); await p.waitForTimeout(500);
    const gone = await p.evaluate(() => !document.querySelector('[class*="consent-banner"]')); await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(2000);
    const stays = await p.evaluate(() => !document.querySelector('[class*="consent-banner"]'));
    out[`${w}${r}`] = { banner, focusableInMain: hits.total, tabbedInMain: n, coveredOnFocus: covered, footerControlsBehindBannerAtEnd: end, rejectHides: gone, choicePersists: stays };
    console.log(w, r.slice(0, 60), 'banner', banner.h + 'px', 'tabbed', n, 'covered', JSON.stringify(covered.slice(0, 4)), 'footer-behind', JSON.stringify(end.slice(0, 4)), 'hides', gone, 'persists', stays);
    await ctx.close();
  }
  fs.writeFileSync(path.join(__dirname, '../data/banner.json'), JSON.stringify(out));
  await b.close();
})();
