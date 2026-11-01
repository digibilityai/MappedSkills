// Content without JavaScript and under reduced motion: every word present, nothing held invisible, charts in their finished state, contents control and anchors work natively.
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const routes = ['/blog', '/blog/seo-company-in-pune', '/press', '/press/marketing-measurement-gap-indian-websites', '/research', '/research/industry-benchmarks', '/research/marketing-measurement-gap-indian-business-websites'];
const inspect = () => {
  const main = document.querySelector('main');
  const words = (main.innerText || '').trim().split(/\s+/).length;
  let hidden = 0; main.querySelectorAll('*').forEach((e) => { if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return; const cs = getComputedStyle(e); if (parseFloat(cs.opacity) < 0.99 || cs.visibility === 'hidden') hidden++; });
  const marked = [...document.querySelectorAll('.ed-sq.is-marked')]; const markedOk = marked.every((e) => { const cs = getComputedStyle(e); return cs.borderTopStyle === 'dashed' && cs.borderTopColor !== 'rgba(0, 0, 0, 0)'; });
  const bars = [...document.querySelectorAll('.ed-bars .tr i')].every((e) => getComputedStyle(e).transform === 'none' || /matrix\(1,/.test(getComputedStyle(e).transform));
  return { words, hidden, squares: document.querySelectorAll('.ed-sq').length, marked: marked.length, markedOk, bars, h1: (document.querySelector('h1') || {}).textContent, pre: document.querySelectorAll('[data-ed="pre"]').length, details: document.querySelectorAll('.ed-otp-m').length };
};
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const r of routes) {
    const on = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); await on.goto(BASE + r, { waitUntil: 'load' }); await on.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {}); await on.waitForTimeout(800);
    const withJs = await on.evaluate(inspect);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false }); const p = await ctx.newPage(); await p.goto(BASE + r, { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const noJs = await p.evaluate(inspect).catch(() => null);
    let nav = null;
    if (w < 500 && noJs && noJs.details) { await p.locator('.ed-otp-m summary').first().click(); const open = await p.evaluate(() => document.querySelector('.ed-otp-m').open); const href = await p.locator('.ed-otp-m a').nth(1).getAttribute('href'); await p.locator('.ed-otp-m a').nth(1).click(); await p.waitForTimeout(1800); nav = { opensWithoutJs: open, anchorJump: await p.evaluate((id) => { const t = document.getElementById(id); const r = t.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }, href.slice(1)) }; }
    out[`${w}${r}`] = { withJs, noJs, nav, sameWords: noJs ? Math.abs(noJs.words - withJs.words) <= 2 : false };
    console.log(w, r.slice(0, 64), 'words js/nojs', withJs.words, noJs && noJs.words, 'hidden', noJs && noJs.hidden, 'squares', noJs && `${noJs.marked}/${noJs.squares} ok=${noJs.markedOk}`, 'bars', noJs && noJs.bars, 'pre', noJs && noJs.pre, nav ? JSON.stringify(nav) : '');
    await ctx.close(); await on.context().close();
  }
  fs.writeFileSync(path.join(__dirname, '../data/nojs.json'), JSON.stringify(out));
  await b.close();
})();
