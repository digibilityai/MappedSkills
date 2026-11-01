const { chromium } = require('../../../../../node_modules/playwright-core');
const OUT = '/Users/amitguptaamit/gitrepo/MappedSkills-six-cases/docs/editorial-redesign/r3/batch2/screenshots';
const [url, name, ...sizes] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const sz of sizes) {
    const [w, h] = sz.split('x').map(Number);
    const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 })).newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
    await p.goto('http://localhost:3511' + url, { waitUntil: 'networkidle' });
    const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
    await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(60); }
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.mouse.move(1, 1); await p.waitForTimeout(400);
    await p.screenshot({ path: `${OUT}/${name}-${w}.png`, fullPage: true });
    console.log(w, 'h', H, 'errs', errs.length, errs[0] || '', 'ox', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  }
  await b.close();
})();
