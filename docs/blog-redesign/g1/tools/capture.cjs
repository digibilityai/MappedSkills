// /blog G1: screenshots and checks of the mockup on disk. Run inside g1: node tools/capture.cjs
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots');
const BASE = 'file://' + path.join(__dirname, '..', 'mockup', 'index.html') + '?banner=0';
const VP = [[1440, 900, 'desktop-1440'], [1280, 800, 'desktop-1280'], [768, 1024, 'tablet-768'], [375, 812, 'mobile-375'], [320, 640, 'mobile-320']];
(async () => {
  const b = await chromium.launch(); const checks = {};
  for (const [w, h, tag] of VP) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(BASE, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${tag}-fold.png` });
    await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
    const m = await p.evaluate(() => {
      const main = document.querySelector('main'); const vis = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
      const r = (s) => document.querySelector(s).getBoundingClientRect();
      return {
        pageH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
        small: [...main.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(e) && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => e.className),
        targetsUnder44: [...main.querySelectorAll('a,button')].filter(vis).map((e) => [(e.textContent || '').trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)]).filter(([, hh]) => hh < 44),
        heads: [...main.querySelectorAll('h1,h2,h3')].filter(vis).map((x) => x.tagName + ' ' + x.textContent.trim()),
        rowLinks: [...main.querySelectorAll('.bl-link')].map((a) => a.getAttribute('href')),
        leftEdge: { header: Math.round(document.querySelector('header img, header a').getBoundingClientRect().left), h1: Math.round(r('#bl-h1').left), list: Math.round(r('.bl-list').left) },
        rowH: [...main.querySelectorAll('.bl-link')].map((a) => Math.round(a.getBoundingClientRect().height)),
        metaLines: [...main.querySelectorAll('.bl-meta')].map((e) => Math.round(e.getBoundingClientRect().height)),
      };
    });
    // hover + focus states on the first row
    const first = '.bl-row:first-child .bl-link';
    const st = () => p.evaluate((s) => { const a = document.querySelector(s); const c = getComputedStyle(a), t = getComputedStyle(a.querySelector('.bl-t')), w = getComputedStyle(a.querySelector('.bl-arw'));
      return { bg: c.backgroundColor, padL: c.paddingLeft, outline: c.outlineStyle + ' ' + c.outlineWidth + ' ' + c.outlineColor, underline: t.textDecorationColor, arwBg: w.backgroundColor, trans: c.transitionDuration }; }, first);
    const rest = await st();
    await p.hover(first); await p.waitForTimeout(250); const hover = await st();
    await p.locator(first).screenshot({ path: `${OUT}/${tag}-row-hover.png` });
    await p.mouse.move(1, 1); await p.waitForTimeout(250);
    await p.evaluate((s) => document.querySelector(s).focus(), first); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(250);
    const focus = await st(); await p.locator(first).screenshot({ path: `${OUT}/${tag}-row-focus.png` });
    checks[tag] = { ...m, rest, hover, focus, errs };
    await ctx.close();
  }
  // reduced motion + empty state
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'load' });
  checks.reducedMotion = await p.evaluate(() => ['.bl-link', '.bl-t', '.bl-arw'].map((s) => getComputedStyle(document.querySelector(s)).transitionDuration));
  await p.goto(BASE + '&empty=1', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${OUT}/desktop-1440-empty-full.png`, fullPage: true });
  checks.empty = await p.evaluate(() => ({ rows: document.querySelectorAll('.bl-link').length, lede: document.querySelector('.bl-lede').textContent, h2: [...document.querySelectorAll('main h2')].filter((e) => e.getClientRects().length).map((e) => e.textContent) }));
  // no-JS
  const nj = await b.newContext({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false }); const q = await nj.newPage();
  await q.goto(BASE, { waitUntil: 'load' });
  checks.noJs = await q.evaluate(() => ({ rows: document.querySelectorAll('.bl-link').length, listPresent: !!document.querySelector('[data-list]') }));
  fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify(checks, null, 1));
  await b.close(); console.log('ok');
})();
