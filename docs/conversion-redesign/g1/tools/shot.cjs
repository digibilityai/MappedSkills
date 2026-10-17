// Quick review shots: node shot.cjs <outDir> <query> <prefix> [widths]   e.g. node shot.cjs /tmp/x "motion=reduce&banner=0" full 1440,390
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [out, query, prefix, ws = '1440,390'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  for (const w of ws.split(',').map(Number)) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 760 ? 900 : 844 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(`http://127.0.0.1:3192/mockup/index.html?${query}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/${prefix}-${w}.png`, fullPage: true });
    const m = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > innerWidth, sw: document.documentElement.scrollWidth,
      secs: [...document.querySelectorAll('main section')].map(s => [s.getAttribute('aria-labelledby'), Math.round(s.getBoundingClientRect().height)]),
      heroBottom: Math.round(document.querySelector('.b-hero').getBoundingClientRect().bottom + scrollY),
      words: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length }));
    console.log(w, JSON.stringify(m), errs.join(' | '));
    await ctx.close();
  }
  await b.close();
})();
