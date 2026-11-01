// Full-page screenshots and layout checks of local pages at several widths. Waits for fonts and images, scrolls the page so lazy
// images and once-only reveals have run, dismisses the consent banner with "Reject", then reports horizontal overflow, broken
// images and the text of the visible case-study hero. Usage (from the repository root, with the dev server running):
//   node docs/work-redesign/paid-case-batch/tools/shoot.cjs <outDir> <baseUrl> <path>[,<path>...] <width>[,<width>...]
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));

(async () => {
  const [outDir, base, paths, widths] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const w of widths.split(',').map(Number)) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 });
    for (const p of paths.split(',')) {
      const page = await ctx.newPage();
      await page.goto(base + p, { waitUntil: 'load', timeout: 120000 });
      await page.evaluate(() => document.fonts.ready);
      const reject = page.getByRole('button', { name: /reject analytics/i });
      if (await reject.count()) await reject.first().click().catch(() => {});
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1800);
      await page.waitForFunction(() => [...document.images].filter((i) => i.offsetParent !== null).every((i) => i.complete), null, { timeout: 30000 }).catch(() => {});
      const info = await page.evaluate((vw) => ({
        scrollWidth: document.documentElement.scrollWidth,
        overflow: document.documentElement.scrollWidth > vw + 1,
        broken: [...document.images].filter((i) => i.offsetParent !== null && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src),
        h1: document.querySelector('h1')?.textContent?.trim(),
        stage: (() => { const f = document.querySelector('.ct-stage-frame'); if (!f) return null; const r = f.getBoundingClientRect(); const im = [...f.querySelectorAll('img')].find((i) => getComputedStyle(i).display !== 'none'); return { ratio: +(r.width / r.height).toFixed(2), src: im?.currentSrc?.split('/').pop(), mark: f.querySelector('.ct-stage-mark')?.textContent }; })(),
      }), w);
      const name = `${p.replace(/^\//, '').replace(/\//g, '_') || 'home'}-${w}.png`;
      await page.screenshot({ path: path.join(outDir, name), fullPage: true });
      console.log(JSON.stringify({ name, ...info }));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
