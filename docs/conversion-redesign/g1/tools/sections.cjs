// Section shots: node sections.cjs <outDir> <query> <prefix> [widths]
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [out, query, prefix, ws = '1440,390'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  for (const w of ws.split(',').map(Number)) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 760 ? 900 : 844 } });
    const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:3192/mockup/index.html?${query}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    const secs = await p.$$('main section');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${out}/${prefix}-${w}-s${i + 1}.png` });
    await ctx.close();
  }
  await b.close();
})();
