// /work card captions (owner instructions 31 October 2026, both rounds): no disclosure of any kind beneath any card image (the four older cards included); no "Illustrative artwork, not a client photograph" under any card image on page 1, page 2,
// or in filtered and search results; no empty note element; cards of one row keep equal image-to-eyebrow spacing. 1440, 390, 360.
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  let fail = 0;
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    const p = await ctx.newPage();
    const probe = () => p.evaluate(() => {
      const cards = [...document.querySelectorAll('.rs-wc')];
      const notes = [...document.querySelectorAll('.rs-wc-note')];
      const gaps = cards.filter((c) => c.querySelector('.rs-wc-img') && !c.querySelector('.rs-wc-note')).map((c) => Math.round(c.querySelector('.rs-wc-eyebrow').getBoundingClientRect().top - c.querySelector('.rs-wc-img').getBoundingClientRect().bottom));
      return { cards: cards.length, illustrative: /Illustrative artwork|not a client photograph/i.test(document.body.innerText), notes: notes.map((n) => n.textContent.trim().slice(0, 50)), emptyNotes: notes.filter((n) => !n.textContent.trim()).length, gapMin: Math.min(...gaps), gapMax: Math.max(...gaps), imgsWithAlt: [...document.querySelectorAll('.rs-wc-img img[src*="case-studies"], .rs-wc-img img[src*="case-studies"]')].every((i) => (i.alt || '').length > 40) };
    });
    const open = async (u) => { await p.goto(base + u, { waitUntil: 'load', timeout: 120000 }); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.first().click().catch(() => {}); await p.waitForSelector('#wk-q'); await p.waitForTimeout(900); };
    const rec = async (name, extra) => { const r = await probe(); const ok = !r.illustrative && r.notes.length === 0 && r.emptyNotes === 0 && r.imgsWithAlt && r.gapMax - r.gapMin <= 4; if (!ok) fail++; console.log(JSON.stringify({ w, name, ok, ...r })); if (extra) await p.screenshot({ path: path.join(outDir, `cards-${extra}-${w}.png`), fullPage: false }); };
    await open('/work'); await rec('page 1');
    await open('/work/page/2'); await rec('page 2', 'page2');
    await p.fill('#wk-q', 'bakedemy'); await p.waitForTimeout(700); await rec('search bakedemy', 'search');
    await p.fill('#wk-q', ''); await p.locator('button', { hasText: /^Google Ads/ }).first().click(); await p.waitForTimeout(700); await rec('filter Google Ads', 'filter');
    await ctx.close();
  }
  await b.close(); console.log(fail ? `FAIL ${fail}` : 'ALL PASS');
})();
