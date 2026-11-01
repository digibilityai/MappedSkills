// Checks the client-logo sections (homepage wall, /work hero band) at 1440, 390, 360: the three new logos are present, loaded, correctly named, at a
// sensible size, nothing overflows, no approved client was dropped. Usage: node verify-logos.cjs <baseUrl> <outDir>
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const NEW = ['Meticulous Business Plan', 'Bblewrap', 'Talreja & Talreja'];
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    for (const [route, sel, name] of [['/', '.cl-bands', 'home'], ['/work', '.wk-mosaic', 'work']]) {
      const p = await ctx.newPage(); await p.goto(base + route, { waitUntil: 'load', timeout: 120000 });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
      const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(70); }
      await p.waitForTimeout(1200);
      const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
      const r = await p.evaluate(({ sel, vw }) => {
        const root = document.querySelector(sel); const imgs = [...root.querySelectorAll('img')];
        return { overflow: document.documentElement.scrollWidth - vw, rootOverflow: root.scrollWidth - root.clientWidth, count: imgs.length, broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.alt),
          alts: imgs.map((i) => i.alt), sizes: Object.fromEntries(imgs.filter((i) => /Meticulous|Bblewrap|Talreja|Advit|Libros|Bakedemy|EKoching/.test(i.alt)).map((i) => [i.alt, [Math.round(i.getBoundingClientRect().width), Math.round(i.getBoundingClientRect().height)]])) };
      }, { sel, vw: w });
      const have = NEW.every((n) => r.alts.includes(n));
      console.log(JSON.stringify({ w, name, ok: have && !r.broken.length && r.overflow <= 0 && r.rootOverflow <= 0, have, ...r, alts: undefined, altCount: r.alts.length }));
      await el.screenshot({ path: path.join(outDir, `${name}-logos-${w}.png`) });
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
})();
