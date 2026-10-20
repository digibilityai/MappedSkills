// G1 review: captures the mockup (or any URL) at the review viewports and measures hero/CTA/consent positions.
// node capture.cjs <outDir> <url> <prefix>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const [out, url, prefix] = process.argv.slice(2);
const VPS = [[1440,780],[1280,720],[375,812]];
(async () => {
  const b = await chromium.launch();
  const res = {};
  for (const [w,h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(600);
    const m = await p.evaluate(() => {
      const bot = (el) => el ? Math.round(el.getBoundingClientRect().bottom + scrollY) : null;
      const hero = document.querySelector('.b-hero');
      const h1 = hero.querySelector('h1');
      const fig = hero.querySelector('figure');
      const cb = document.querySelector('[aria-labelledby="consent-banner-title"]');
      const lh = parseFloat(getComputedStyle(h1).lineHeight);
      return { heroBottom: bot(hero), h1Bottom: bot(h1), ledeBottom: bot(hero.querySelector('.b-lede')), ctaBottom: bot(hero.querySelector('.dc-btn-primary')),
        figureBottom: bot(fig), consentTop: cb ? Math.round(cb.getBoundingClientRect().top) : null,
        h1FontPx: parseFloat(getComputedStyle(h1).fontSize), h1Lines: Math.round(h1.getBoundingClientRect().height / lh),
        pageHeight: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
        sections: [...document.querySelectorAll('main section')].map(s => [s.getAttribute('aria-labelledby'), Math.round(s.getBoundingClientRect().height)]),
        mainWords: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length };
    });
    res[`${w}x${h}`] = m;
    await p.screenshot({ path: `${out}/${prefix}-${w}x${h}-fold.png` });
    if (w !== 1280) await p.screenshot({ path: `${out}/${prefix}-${w}x${h}-full.png`, fullPage: true });
    await ctx.close();
  }
  fs.writeFileSync(`${out}/${prefix}-measurements.json`, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
