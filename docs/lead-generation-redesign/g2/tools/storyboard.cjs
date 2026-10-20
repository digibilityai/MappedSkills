// Journey states by selection (the same method on the G1 mockup and the G2 page): click step N, wait, capture. node tools/storyboard.cjs <url> <outDir>
const { chromium } = require('playwright-core');
const fs = require('fs'); const [url, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => { document.querySelectorAll('nextjs-portal').forEach((e) => e.remove()); document.querySelectorAll('body *').forEach((e) => { if (getComputedStyle(e).position === 'fixed' && /Analytics cookies/.test(e.textContent || '') && !e.querySelector('main')) e.remove(); }); });
  for (const s of [1, 2, 3]) { await p.click(`.lx-hero-fig .lx-hj-s:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-hero-fig').screenshot({ path: `${out}/hero-step${s}-1440.png` }); }
  for (const s of [1, 2, 3]) { await p.click(`.lx-sort .lx-gate:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-sort').screenshot({ path: `${out}/reach-step${s}-1440.png` }); }
  for (const s of [1, 4]) { await p.click(`.lx-path .lx-stop:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-path').screenshot({ path: `${out}/path-step${s}-1440.png` }); }
  await b.close(); })();
