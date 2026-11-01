// Visual and structural check of the four detail pages and /work pages 1 and 2 at 1440, 390 and 360 px against a running preview.
//   node docs/work-redesign/final-four/tools/verify-final-four.cjs <base url> <out dir>
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const BASE = process.argv[2] || 'http://localhost:3500';
const OUT = process.argv[3] || path.join(__dirname, '../screenshots');
const PAGES = ['classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'wanderlooms-meta-ads'];
const BAD = /recreated|conceptual illustration|illustrative|not client artwork|dashboard image/i;
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const rows = [];
  for (const [w, h] of [[1440, 900], [390, 844], [360, 800]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const targets = [...PAGES.map((s) => [`/portfolio/${s}`, `detail/${s}-${w}`]), ['/work', `work/work-p1-${w}`], ['/work/page/2', `work/work-p2-${w}`]];
    for (const [url, name] of targets) {
      const p = await ctx.newPage();
      const errs = [];
      p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 140)); });
      p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
      const r = await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const rej = p.getByRole('button', { name: /reject analytics/i });
      if (await rej.count()) await rej.click().catch(() => {});
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 400) { await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(100); }
      await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(500);
      const d = await p.evaluate(() => {
        const imgs = [...document.querySelectorAll('main img')].map((i) => ({ src: (i.currentSrc || i.src).split('/').pop().split('?')[0], ok: i.complete && i.naturalWidth > 0, alt: i.alt.length }));
        const text = document.body.innerText;
        return { h1: (document.querySelector('h1') || {}).textContent, overflowX: document.documentElement.scrollWidth > innerWidth, imgs, bad: (text.match(/recreated[^.\n]*|conceptual illustration[^.\n]*|illustrative[^.\n]*|not client artwork[^.\n]*/gi) || []).slice(0, 3), cards: document.querySelectorAll('a[href^="/portfolio/"]').length };
      });
      await p.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });
      rows.push({ w, url, status: r.status(), errs: errs.length, errTxt: errs.slice(0, 2), ...d, broken: d.imgs.filter((i) => !i.ok).map((i) => i.src) });
      await p.close();
    }
    await ctx.close();
  }
  console.log(JSON.stringify(rows.map(({ imgs, ...r }) => ({ ...r, imgs: imgs.length })), null, 1));
  await b.close();
})();
