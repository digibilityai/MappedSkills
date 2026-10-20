// G1 review captures: node tools/capture.cjs (mockup served on http://127.0.0.1:3198/mockup/index.html)
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots'), U = 'http://127.0.0.1:3198/mockup/index.html';
const VPS = [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844], ['mobile', 320, 640]];
const measure = () => {
  const ab = (el) => el ? Math.round(el.getBoundingClientRect().top + scrollY) : null;
  const bot = (el) => el ? Math.round(el.getBoundingClientRect().bottom + scrollY) : null;
  const hero = document.querySelector('.b-hero');
  return { pageHeight: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
    heroBottom: bot(hero), ctaBottom: bot(hero.querySelector('.dc-btn-primary')),
    mainWords: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length,
    secs: [...document.querySelectorAll('main section')].map(s => [s.getAttribute('aria-labelledby'), Math.round(s.getBoundingClientRect().height)]),
    serviceLinks: ['/seo','/google-ads','/social-media-ads','/ai-seo','/conversion-optimization','/lead-generation'].map(h => { const a = document.querySelector('main a[href="' + h + '"]'); const r = a && a.getBoundingClientRect(); return [h, !!(r && r.width && r.height)]; }),
    headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(e => e.tagName + ' ' + e.innerText.replace(/\s+/g, ' ')),
    longDash: /[–—]/.test(document.querySelector('main').innerText) };
};
(async () => {
  const b = await chromium.launch(); const res = {};
  for (const [n, w, h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${n}-${w}-fold.png` });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 300) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.evaluate(() => document.getElementById('sv-h-jr').scrollIntoView({ block: 'start' })); await p.waitForTimeout(4200);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    res[`${n}-${w}`] = await p.evaluate(measure);
    await p.screenshot({ path: `${OUT}/${n}-${w}-full.png`, fullPage: true });
    if (w === 1440 || w === 390) {
      const els = await p.$$('main section');
      for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: `${OUT}/${n}-${w}-s${i + 1}.png` });
    }
    await ctx.close();
  }
  // states
  for (const [n, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0&pick=cv&step=1', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    await (await p.$('section.sx-pick')).screenshot({ path: `${OUT}/${n}-${w}-pick-cv.png` });
    await (await p.$('section.sx-jr')).screenshot({ path: `${OUT}/${n}-${w}-journey-step1.png` });
    await ctx.close();
  }
  { // no JavaScript
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
    res.nojs = await p.evaluate(measure);
    await p.screenshot({ path: `${OUT}/desktop-1440-nojs-full.png`, fullPage: true }); await ctx.close();
  }
  { // reduced motion
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' });
    res.reduce = await p.evaluate(() => ({ armed: document.querySelector('[data-seq]').className, seen: document.querySelectorAll('.sx-jr .is-seen').length }));
    await ctx.close();
  }
  fs.writeFileSync(`${OUT}/checks.json`, JSON.stringify(res, null, 1));
  for (const k of Object.keys(res)) { const m = res[k]; console.log(k, JSON.stringify(m.secs ? { h: m.pageHeight, ovx: m.overflowX, hero: m.heroBottom, cta: m.ctaBottom, words: m.mainWords, secs: m.secs, links: m.serviceLinks.every(x => x[1]), dash: m.longDash } : m)); }
  console.log(res['desktop-1440'].headings.join('\n'));
  await b.close();
})();
