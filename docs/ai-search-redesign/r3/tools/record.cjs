// Records the four sequences playing in turn at 1440 x 900. node record.cjs <url> <outDir>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [url, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const c = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: out, size: { width: 1440, height: 900 } } });
  const p = await c.newPage(); await p.goto(url + '?banner=0', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
  for (const [sel, ms] of [['.ax-ind', 9500], ['.ax-scn', 10500], ['.ax-jr-sec', 12000], ['.ax-rp-sec', 8500]]) {
    await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), sel); await p.waitForTimeout(ms);
  }
  await p.locator('.ax-jr-sec').scrollIntoViewIfNeeded(); await p.locator('.ax-jr button.ax-st-n').nth(2).click(); await p.waitForTimeout(2500);
  await c.close(); await b.close();
})();
