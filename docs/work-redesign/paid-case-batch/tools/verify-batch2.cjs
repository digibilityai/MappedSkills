// Verifies the eight second-batch case-study pages at 1440, 390 and 360 px (31 October 2026): no horizontal overflow, no broken image, correct
// stage image and client name, no caption text, no "Open full size", no link around the dashboard, dashboard at its own ratio, the right
// closing button, evidence basis present, no editorial-note leakage, and the dev-preview banner-free page. Saves the stage and the impact
// region of each page. Usage: node tools/verify-batch2.cjs <baseUrl> <outDir>
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const CASES = {
  'anybodycanbake-seo': { client: 'AnybodyCanBake', cta: 'Discuss Your SEO Goals', dash: 1586 / 992 },
  'advit-prints-meta-ads': { client: 'Advit Prints', cta: 'Discuss Your Meta Ads Goals' },
  'meticulous-business-plan-google-ads': { client: 'Meticulous Business Plan', cta: 'Discuss Your Google Ads Goals' },
  'libros-library-meta-ads': { client: 'Libros Library', cta: 'Discuss Your Meta Ads Goals' },
  'bakedemy-google-ads': { client: 'Bakedemy', cta: 'Discuss Your Google Ads Goals' },
  'bakedemy-meta-ads': { client: 'Bakedemy', cta: 'Discuss Your Meta Ads Goals' },
  'bblewrap-google-ads': { client: 'Bblewrap', cta: 'Discuss Your Google Ads Goals' },
  'talreja-talreja-google-ads': { client: 'Talreja & Talreja', cta: 'Discuss Your Google Ads Goals' },
};
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  let fails = 0;
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    for (const [slug, exp] of Object.entries(CASES)) {
      const p = await ctx.newPage(); await p.goto(`${base}/portfolio/${slug}`, { waitUntil: 'load', timeout: 120000 });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
      const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
      await p.waitForTimeout(1500);
      const r = await p.evaluate(({ vw, cta, client }) => {
        const txt = document.body.innerText; const media = document.querySelector('.ct-media'); const img = media?.querySelector('img'); const rect = img?.getBoundingClientRect();
        const btn = [...document.querySelectorAll('a')].some((a) => a.textContent.trim().replace(/\s*[↗→].*$/, '') === cta);
        const broken = [...document.images].filter((i) => i.offsetParent !== null && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc);
        const stage = document.querySelector('.ct-stage-frame'); const sr = stage?.getBoundingClientRect(); const si = stage && [...stage.querySelectorAll('img')].find((i) => getComputedStyle(i).display !== 'none');
        return {
          overflow: document.documentElement.scrollWidth - vw, broken,
          stageRatio: sr ? +(sr.width / sr.height).toFixed(2) : null, stageSrc: si?.currentSrc?.split('/').pop(), stageMark: stage?.querySelector('.ct-stage-mark')?.textContent === client, stageCaption: Boolean(document.querySelector('.ct-stage figcaption')),
          captionText: /Recreated agency|Illustrative scene|Illustrative artwork/.test(txt), openFull: /Open full size|zoom/i.test(txt), mediaLinks: media ? media.querySelectorAll('a').length : -1, mediaCaption: media ? media.querySelectorAll('figcaption').length : -1,
          dashRatio: rect ? +(rect.width / rect.height).toFixed(3) : null, dashNat: img ? [img.naturalWidth, img.naturalHeight] : null, dashSrc: img?.currentSrc?.split('/').pop(),
          evidence: (document.querySelector('.ct-evidence')?.textContent ?? '').length, cta: btn, requestCall: /Request a call/.test(txt),
          leak: /Production note|Image brief|Calculation corrections|Recreated agency report source note|Confirm the client|placeholder|lorem|TBC/i.test(txt), dashes: /[—–]|--/.test(document.querySelector('main, article')?.innerText ?? ''),
          h1: document.querySelector('h1')?.textContent?.trim().slice(0, 40), chips: [...document.querySelectorAll('.ct-chip')].map((c) => c.textContent.trim()).join(' | '),
        };
      }, { vw: w, cta: exp.cta, client: exp.client });
      const ok = r.overflow <= 0 && !r.broken.length && !r.stageCaption && !r.captionText && !r.openFull && r.mediaLinks === 0 && r.mediaCaption === 0 && Math.abs(r.dashRatio - 1586 / 992) < 0.02 && r.evidence > 400 && r.cta && r.requestCall && !r.leak && r.stageMark && r.stageSrc.startsWith(slug) && r.dashSrc.startsWith(slug) && r.stageRatio === (w <= 760 ? 1.3 : 2.6);
      if (!ok) fails++;
      console.log(JSON.stringify({ w, slug, ok, ...r }));
      if (w !== 360) {
        const st = p.locator('.ct-stage-frame').first(); await st.scrollIntoViewIfNeeded(); await p.waitForTimeout(900); await st.screenshot({ path: path.join(outDir, `${slug}-stage-${w}.png`) });
        const im = p.locator('.ct-media').first(); await im.scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await im.screenshot({ path: path.join(outDir, `${slug}-dashboard-${w}.png`) });
      }
      await p.close();
    }
    await ctx.close();
  }
  await b.close(); console.log(fails ? `FAIL ${fails}` : 'ALL PASS');
})();
