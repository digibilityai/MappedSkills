// Captures the live /conversion-optimization page (the "before" baseline): full pages, each section, and the section HTML.
// node capture-live.cjs <outDir>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const out = process.argv[2];
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto('https://mappedskills.com/conversion-optimization', { waitUntil: 'networkidle' });
    await p.evaluate(() => { const c = document.querySelector('[aria-labelledby="consent-banner-title"]'); if (c) c.remove(); });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
    await p.screenshot({ path: `${out}/live-${w}-full.png`, fullPage: true });
    const secs = await p.$$('main section');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${out}/live-${w}-s${i + 1}.png` });
    if (w === 1440) {
      const info = await p.evaluate(() => ({ title: document.title, desc: document.querySelector('meta[name=description]')?.content, canon: document.querySelector('link[rel=canonical]')?.href,
        h: [...document.querySelectorAll('main h1, main h2, main h3')].map(e => e.tagName + ' ' + e.innerText.replace(/\s+/g, ' ')),
        links: [...document.querySelectorAll('main a')].map(a => a.innerText.replace(/\s+/g, ' ') + ' -> ' + a.getAttribute('href')),
        ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent.slice(0, 300)),
        words: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length,
        css: [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href) }));
      fs.writeFileSync(`${out}/live-info.json`, JSON.stringify(info, null, 1));
      fs.writeFileSync(`${out}/live-main.html`, await p.evaluate(() => document.querySelector('main').outerHTML));
    }
    await ctx.close();
  }
  await b.close();
})();
