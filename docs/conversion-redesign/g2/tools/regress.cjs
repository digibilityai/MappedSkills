const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch();
  for (const u of ['/', '/google-ads', '/social-media-ads', '/ai-seo', '/seo', '/how-it-works', '/contact']) {
    for (const w of [1440, 390]) {
      const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
      const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      const r = await p.goto(process.argv[2] + u, { waitUntil: 'networkidle' });
      const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      console.log(u, w, r.status(), 'overflow', o, 'errors', errs.length, 'h1:', (await p.$eval('h1', (e) => e.textContent).catch(() => 'none')).slice(0, 50));
    }
  }
  await b.close();
})();
