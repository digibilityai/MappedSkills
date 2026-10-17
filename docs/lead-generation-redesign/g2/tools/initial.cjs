// The armed initial state (step 1 on screen, later steps dimmed) of the three visible-on-load journeys, 1 s after load. node tools/initial.cjs <url> <outDir>
const { chromium } = require('playwright-core');
const fs = require('fs'); const [url, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => { document.querySelectorAll('nextjs-portal').forEach((e) => e.remove()); document.querySelectorAll('body *').forEach((e) => { if (getComputedStyle(e).position === 'fixed' && /Analytics cookies/.test(e.textContent || '') && !e.querySelector('main')) e.remove(); }); });
  await p.waitForTimeout(1000); await p.locator('.lx-hero-fig').screenshot({ path: `${out}/hero-initial-1440.png` });
  for (const [sel, n] of [['.lx-path', 'path'], ['.lx-sort', 'reach'], ['.lx-next', 'next']]) { await p.evaluate((s) => { const e = document.querySelector(s); e.scrollIntoView({ block: 'center' }); }, sel); await p.waitForTimeout(600); await p.locator(sel).screenshot({ path: `${out}/${n}-initial-1440.png` }); await p.evaluate(() => window.scrollTo(0, 0)); }
  await b.close(); })();
