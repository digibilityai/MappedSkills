const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
(async () => { const b = await chromium.launch(); const o = {};
  for (const [k, u] of [['baseline', 'http://127.0.0.1:3217/ai-seo'], ['proposed', 'http://127.0.0.1:8731/mockup/index.html?motion=reduce']]) for (const [w, h] of [[1440, 780], [375, 812]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await c.newPage(); await p.goto(u, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    o[k + w] = await p.evaluate(() => { const m = document.querySelector('main'); const hero = document.querySelector('.b-hero, main section'); const cb = document.querySelector('[aria-labelledby="consent-banner-title"]');
      return { pageHeight: document.documentElement.scrollHeight, words: m.innerText.split(/\s+/).filter(Boolean).length, heroBottom: Math.round(hero.getBoundingClientRect().bottom + scrollY), consentTop: cb ? Math.round(cb.getBoundingClientRect().top) : null, sections: [...m.querySelectorAll('section')].map((s) => Math.round(s.getBoundingClientRect().height)) }; });
    await c.close(); }
  require('fs').writeFileSync(__dirname + '/../screenshots/r3-measurements.json', JSON.stringify(o, null, 1)); console.log(JSON.stringify(o)); await b.close(); })();
