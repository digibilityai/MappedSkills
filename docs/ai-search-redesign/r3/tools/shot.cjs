// node shot.cjs <outPng> <url> <selector|full> <w> <h>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [out, url, sel, w, h] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: +w, height: +h } }); const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  if (sel === 'full') await p.screenshot({ path: out, fullPage: true }); else await p.locator(sel).first().screenshot({ path: out });
  await b.close();
})();
