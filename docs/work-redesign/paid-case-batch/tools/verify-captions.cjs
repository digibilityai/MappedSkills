// Verifies the 30 October 2026 owner corrections on the seven case-study pages and /work at 1440, 390 and 360 px: no dashboard or hero
// caption, no "Open full size", no link around the dashboard, dashboard shown as an ordinary image at its own ratio, no empty figcaption,
// no horizontal overflow, evidence basis present, logo strip complete on /work. Saves the impact image region of each page.
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const PAGES = ['google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads'];
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    for (const r of [...PAGES.map((s) => '/portfolio/' + s), '/work']) {
      const p = await ctx.newPage(); await p.goto(base + r, { waitUntil: 'load', timeout: 120000 });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
      const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
      await p.waitForTimeout(1500);
      const res = await p.evaluate((vw) => {
        const txt = document.body.innerText;
        const media = document.querySelector('.ct-media');
        const img = media?.querySelector('img');
        return {
          overflow: document.documentElement.scrollWidth - vw,
          recreatedVisible: /Recreated agency dashboard/.test(txt), illustrativeVisible: /Illustrative scene, not a client photograph/.test(txt), openFull: /Open full size/i.test(txt),
          mediaLinks: media ? media.querySelectorAll('a').length : null, mediaCaption: media ? media.querySelectorAll('figcaption').length : null,
          emptyFigcaptions: [...document.querySelectorAll('.ct-stage figcaption, .ct-media figcaption')].filter((f) => !f.textContent.trim()).length,
          stageCaption: document.querySelector('.ct-stage figcaption')?.textContent ?? null,
          dash: img ? { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height), ratio: +(img.getBoundingClientRect().width / img.getBoundingClientRect().height).toFixed(3), nat: [img.naturalWidth, img.naturalHeight], cursor: getComputedStyle(img).cursor } : null,
          evidence: Boolean(document.querySelector('.ct-evidence')), evidenceChars: document.querySelector('.ct-evidence')?.textContent.length ?? 0,
          logos: [...document.querySelectorAll('.wk-mosaic img')].map((i) => `${i.alt}:${i.naturalWidth > 0 ? 'ok' : 'BROKEN'}`),
        };
      }, w);
      if (r !== '/work') { const m = p.locator('.ct-media'); if (await m.count()) await m.first().screenshot({ path: path.join(outDir, `${r.split('/').pop()}-${w}.png`) }); }
      console.log(JSON.stringify({ r, w, ...res })); await p.close();
    }
    await ctx.close();
  }
  await b.close();
})();
