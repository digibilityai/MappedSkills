// Blog G2: check the local fixture builds (live7 :3231, edge :3232, plain/empty :3233) against the approved G1 mockup,
// in one engine (argv[2]: chromium|firefox|webkit). Writes screenshots/<engine>/ and checks-<engine>.json. No network
// except localhost; consent is not accepted (the banner is hidden from captures by DOM removal only).
const pw = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const ENGINE = process.argv[2] || 'chromium'; const E = pw[ENGINE];
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots', ENGINE); fs.mkdirSync(OUT, { recursive: true });
const G1 = 'file:///Users/amitguptaamit/gitrepo/MappedSkills/docs/blog-redesign/g1/mockup/index.html?banner=0';
const SRV = { live7: 'http://127.0.0.1:3231/blog', edge: 'http://127.0.0.1:3232/blog', plain: 'http://127.0.0.1:3233/blog' };
const VP = [[1440, 900, '1440'], [1280, 800, '1280'], [768, 1024, '768'], [375, 812, '375'], [320, 640, '320']];
const hideBanner = () => document.querySelectorAll('[aria-label*="nalytics" i][role], [class*="z-[150]"]').forEach((e) => e.remove());
const measure = () => {
  const main = document.querySelector('main'); const vis = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
  const secs = [...main.querySelectorAll('section.bl-hero, section.bl-body, section.bl-close')].map((e) => Math.round(e.getBoundingClientRect().height));
  const lum = (c) => { const m = c.match(/[\d.]+/g).map(Number); const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); };
  const bgOf = (e) => { while (e) { const b = getComputedStyle(e).backgroundColor; if (b && !/rgba\(0, 0, 0, 0\)|transparent/.test(b)) return b; e = e.parentElement; } return 'rgb(255,255,255)'; };
  const contrast = [...main.querySelectorAll('.bl-hero *, .bl-body *, .bl-close *')].filter((e) => vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
    .map((e) => { const a = lum(getComputedStyle(e).color), b = lum(bgOf(e)); const r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); return [e.className || e.tagName, Math.round(r * 100) / 100, getComputedStyle(e).fontSize]; })
    .filter(([, r]) => r < 4.5);
  return {
    secs, pageH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
    clipped: [...main.querySelectorAll('.bl-t, .bl-x, .bl-meta')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.slice(0, 40)),
    text: [...main.querySelectorAll('h1, h2, .b-lede, .b-kicker, .bl-meta, .bl-t, .bl-x, .dc-btn, .b-crumb')].filter(vis).map((e) => e.innerText.replace(/\s+/g, ' ').trim()),
    small: [...main.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(e) && parseFloat(getComputedStyle(e).fontSize) < 12).length,
    heads: [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map((h) => h.tagName + ' ' + h.innerText.replace(/\s+/g, ' ').trim()),
    rows: [...main.querySelectorAll('.bl-link')].map((a) => [a.getAttribute('href'), Math.round(a.getBoundingClientRect().height)]),
    metaH: [...main.querySelectorAll('.bl-meta')].map((e) => Math.round(e.getBoundingClientRect().height)),
    left: { h1: Math.round(document.querySelector('#bl-h1').getBoundingClientRect().left), list: document.querySelector('.bl-list') ? Math.round(document.querySelector('.bl-list').getBoundingClientRect().left) : null },
    targetsUnder44: [...main.querySelectorAll('a,button')].filter(vis).map((e) => [(e.textContent || '').trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)]).filter(([, h]) => h < 44),
    contrastUnder45: contrast,
  };
};
(async () => {
  const b = await E.launch(); const res = { engine: ENGINE, widths: {} };
  for (const [w, h, tag] of VP) {
    const r = {};
    for (const [name, url] of [['g1', G1], ['live7', SRV.live7], ['edge', SRV.edge], ['plain', SRV.plain]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
      await p.evaluate(hideBanner); await p.waitForTimeout(100);
      r[name] = { ...(await p.evaluate(measure)), errs };
      if (name !== 'g1') {
        await p.screenshot({ path: `${OUT}/${name}-${tag}-full.png`, fullPage: true });
        if (name === 'live7') await p.screenshot({ path: `${OUT}/${name}-${tag}-fold.png` });
      }
      if (name === 'live7') {
        const sel = '.bl-row:first-child .bl-link';
        const st = () => p.evaluate((s) => { const a = document.querySelector(s), c = getComputedStyle(a); return { bg: c.backgroundColor, pad: c.paddingLeft, outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, ul: getComputedStyle(a.querySelector('.bl-t')).textDecorationColor, arw: getComputedStyle(a.querySelector('.bl-arw')).backgroundColor, dur: c.transitionDuration }; }, sel);
        const rest = await st(); await p.hover(sel); await p.waitForTimeout(250); const hover = await st();
        await p.locator(sel).screenshot({ path: `${OUT}/row-hover-${tag}.png` });
        await p.mouse.move(1, 1); await p.waitForTimeout(250);
        // keyboard: Tab from the top until the first row link is focused; record the tab order of main
        await p.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
        const order = []; let found = false;
        for (let i = 0; i < 60 && !found; i++) { await p.keyboard.press(ENGINE === 'webkit' ? 'Alt+Tab' : 'Tab'); const a = await p.evaluate((s) => ({ hit: document.activeElement === document.querySelector(s), t: (document.activeElement.textContent || '').trim().slice(0, 25), inMain: !!document.activeElement.closest('main') }), sel); if (a.inMain) order.push(a.t); found = a.hit; }
        await p.waitForTimeout(250); const focus = await st();
        if (found) await p.locator(sel).screenshot({ path: `${OUT}/row-focus-${tag}.png` });
        // Enter follows the link
        let nav = null; if (found) { await Promise.all([p.waitForURL(/\/blog\/.+/, { timeout: 8000 }).catch(() => {}), p.keyboard.press('Enter')]); nav = new URL(p.url()).pathname; }
        r.states = { rest, hover, focus, keyboardReached: found, tabOrderInMainBeforeRow: order, enterNavigatesTo: nav };
      }
      await ctx.close();
    }
    res.widths[tag] = r;
  }
  // reduced motion (live7, 1440)
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
  await p.goto(SRV.live7, { waitUntil: 'load' });
  res.reducedMotion = await p.evaluate(() => ['.bl-link', '.bl-t', '.bl-arw'].map((s) => getComputedStyle(document.querySelector(s)).transitionDuration));
  await ctx.close();
  // no JavaScript (live7, 375)
  const nj = await b.newContext({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false }); const q = await nj.newPage();
  await q.goto(SRV.live7, { waitUntil: 'load' });
  res.noJs = await q.evaluate(() => ({ rows: document.querySelectorAll('.bl-link').length, h1: document.querySelector('h1').textContent }));
  await nj.close();
  fs.writeFileSync(path.join(__dirname, '..', `checks-${ENGINE}.json`), JSON.stringify(res, null, 1));
  await b.close(); console.log(ENGINE, 'ok');
})();
