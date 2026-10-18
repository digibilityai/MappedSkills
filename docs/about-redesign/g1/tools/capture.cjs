// About G1: screenshots and checks of the mockup on disk. Run inside g1: node tools/capture.cjs
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots');
const URL = 'file://' + path.join(__dirname, '..', 'mockup', 'index.html') + '?banner=0';
const VP = [[1440, 900, 'desktop-1440'], [1280, 800, 'desktop-1280'], [820, 1180, 'tablet-820'], [390, 844, 'mobile-390'], [320, 640, 'mobile-320']];
const FULL = ['desktop-1440', 'tablet-820', 'mobile-390'];
(async () => {
  const b = await chromium.launch();
  const checks = {};
  for (const [w, h, tag] of VP) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(URL, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${tag}-fold.png` });
    const m = await p.evaluate(() => {
      const words = (el) => (el.innerText || '').trim().split(/\s+/).filter(Boolean).length;
      const main = document.querySelector('main');
      const cta = main.querySelector('a[href="/contact"]');
      const small = [...main.querySelectorAll('*')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => e.className + ':' + getComputedStyle(e).fontSize);
      const over = [...main.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && e.offsetParent).map((e) => e.tagName + '.' + e.className).slice(0, 5);
      return { pageHeight: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth, overElems: over, mainWords: words(main),
        firstCtaBottom: Math.round(cta.getBoundingClientRect().bottom + scrollY), ctaInFold: cta.getBoundingClientRect().bottom <= innerHeight,
        headings: [...main.querySelectorAll('h1,h2,h3')].filter((x) => x.offsetParent).map((x) => x.tagName + ' ' + x.innerText.replace(/\s+/g, ' ').trim()),
        secs: [...main.querySelectorAll(':scope > div > section')].map((s) => ({ id: s.getAttribute('aria-labelledby'), h: Math.round(s.getBoundingClientRect().height), words: words(s) })),
        smallText: small.slice(0, 5) };
    });
    if (FULL.includes(tag)) {
      await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      const secs = await p.$$('main > div > section'); let i = 0;
      for (const s of secs) { i++; await s.screenshot({ path: `${OUT}/${tag}-s${i}.png` }); }
    }
    m.cards = await p.evaluate(() => [...document.querySelectorAll('.ax-team > li')].map((li) => Math.round(li.getBoundingClientRect().top)).length);
    m.cardCols = await p.evaluate(() => new Set([...document.querySelectorAll('.ax-team > li')].map((li) => Math.round(li.getBoundingClientRect().top))).size);
    m.microMs = await p.evaluate(() => getComputedStyle(document.querySelector('.ax-photo')).transitionDuration);
    m.consoleErrors = errs;
    checks[tag] = m;
    await ctx.close();
  }
  // no JavaScript: the page must be complete
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: 'load' }); await p.waitForTimeout(300);
    checks.nojs = await p.evaluate(() => ({ words: document.querySelector('main').innerText.trim().split(/\s+/).length, cards: document.querySelectorAll('.ax-team > li').length, panels: [...document.querySelectorAll('.ax-cmp-p')].filter((x) => x.offsetParent).length }));
    await p.screenshot({ path: `${OUT}/desktop-1440-nojs-full.png`, fullPage: true }); await ctx.close(); }
  // reduced motion: micro-interaction transitions off
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: 'load' });
    checks.reducedMotion = await p.evaluate(() => ({ photo: getComputedStyle(document.querySelector('.ax-photo')).transitionDuration, animations: document.getAnimations().length })); await ctx.close(); }
  fs.writeFileSync(`${OUT}/checks.json`, JSON.stringify(checks, null, 1));
  for (const [k, v] of Object.entries(checks)) console.log(k, JSON.stringify(v.secs ? { h: v.pageHeight, over: v.overflowX, overElems: v.overElems, words: v.mainWords, cta: v.firstCtaBottom, fold: v.ctaInFold, small: v.smallText, err: v.consoleErrors, cards: v.cards, rows: v.cardCols, micro: v.microMs } : v));
  await b.close();
})();
