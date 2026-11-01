// /work with the merged library: card inventory and order, each card's own image (loaded) and detail link (status), the service and
// industry filters and the search, at three widths. Usage: node work-filters-check.cjs <baseUrl> <outDir>
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    const p = await ctx.newPage(); await p.goto(base + '/work', { waitUntil: 'load', timeout: 120000 });
    const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
    const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
    await p.waitForTimeout(1500);
    const cards = () => p.evaluate(() => [...document.querySelectorAll('.rs-wc')].map((c) => { const i = c.querySelector('img:not(.rs-wc-logo img)'); return { h: c.querySelector('h3')?.textContent, eyebrow: c.querySelector('.rs-wc-eyebrow')?.textContent, href: c.querySelector('a.rs-wc-cta')?.getAttribute('href'), img: i ? (i.currentSrc || i.src).replace(location.origin, '') : null, loaded: i ? i.complete && i.naturalWidth > 0 : false, textOnly: c.classList.contains('rs-wc-textonly'), motif: c.classList.contains('rs-wc-motif') }; }));
    const base0 = await cards();
    const info = await p.evaluate((vw) => ({ overflow: document.documentElement.scrollWidth - vw, total: document.body.innerText.match(/(\d+)\s+case stud/i)?.[0] ?? null, pager: [...document.querySelectorAll('nav[aria-label*="age" i] a, .wk-pager a')].map((a) => a.getAttribute('href')), logos: [...document.querySelectorAll('.wk-mosaic img')].map((i) => `${i.alt}:${i.naturalWidth > 0 ? 'ok' : 'BROKEN'}`) }), w);
    const filters = await p.evaluate(() => ({ selects: [...document.querySelectorAll('select')].map((s) => ({ name: s.name || s.id || s.getAttribute('aria-label'), options: [...s.options].map((o) => o.value + ':' + o.textContent.trim()) })), buttons: [...document.querySelectorAll('.wk-filters button, [role="group"] button')].map((x) => x.textContent.trim()) }));
    const res = { w, count: base0.length, ...info, filters, cards: base0 };
    // service chips and industry select
    const out = {};
    const chips = await p.locator('button', { hasText: /^(All services|Google Ads|Social media ads|SEO|AI search|Conversion optimisation|Lead generation)/ }).all();
    for (const c of chips) { const label = (await c.textContent()).trim(); await c.click().catch(() => {}); await p.waitForTimeout(400); out['service ' + label] = (await cards()).map((x) => x.href.replace('/portfolio/', '')); }
    await p.locator('button', { hasText: /^All services/ }).first().click().catch(() => {}); await p.waitForTimeout(400);
    const sel = p.locator('select').first();
    if (await sel.count()) { for (const o of await sel.locator('option').all()) { const v = await o.getAttribute('value'); await sel.selectOption(v).catch(() => {}); await p.waitForTimeout(400); out['industry ' + (await o.textContent()).trim()] = (await cards()).map((x) => x.href.replace('/portfolio/', '')); } await sel.selectOption('').catch(() => {}); }
    const q = p.locator('input[type=search], input[type=text]').first();
    if (await q.count()) { for (const term of ['classpe', 'insuryo', 'om sai', 'ameba', 'klenzmo', 'phoenix', 'zzzz']) { await q.fill(term); await p.waitForTimeout(500); out['search ' + term] = (await cards()).map((x) => x.href.replace('/portfolio/', '')); } await q.fill(''); }
    res.filtered = out;
    await p.screenshot({ path: path.join(outDir, `work-${w}.png`), fullPage: true }).catch(() => {});
    console.log(JSON.stringify(res)); await ctx.close();
  }
  await b.close();
})();
