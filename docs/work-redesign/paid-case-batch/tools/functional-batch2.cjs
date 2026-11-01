// Functional checks of /work in a browser against the 19-study library (31 October 2026): search, every service and industry filter,
// combined filters, a start on page 2, pager reset, clearing restores order, at 1440, 390, 360. Usage: node functional-batch2.cjs <baseUrl> <outDir>
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const ORDER = ['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads', 'anybodycanbake-seo', 'advit-prints-meta-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads'];
const SVC = { 'Google Ads': ['google-ads-for-online-courses', 'ekoching-google-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'meticulous-business-plan-google-ads', 'bakedemy-google-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads'], 'Social media ads': ['om-sai-developer-meta-ads', 'anybodycanbake-meta-ads', 'klenzmo-meta-ads', 'hutnhomes-meta-ads', 'advit-prints-meta-ads', 'libros-library-meta-ads', 'bakedemy-meta-ads'], SEO: ['seo-ameba-software', 'anybodycanbake-seo'] };
const IND = { 'real-estate': ['om-sai-developer-meta-ads', 'hutnhomes-meta-ads'], education: ['classpe-social-media-strategy', 'google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'anybodycanbake-seo', 'bakedemy-google-ads', 'bakedemy-meta-ads'], 'ecommerce-retail': ['klenzmo-meta-ads', 'bakersville-google-ads', 'advit-prints-meta-ads'], 'professional-services': ['meticulous-business-plan-google-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads'] };
const SEARCH = { talreja: ['talreja-talreja-google-ads'], bakedemy: ['bakedemy-google-ads', 'bakedemy-meta-ads'], libros: ['libros-library-meta-ads'], bblewrap: ['bblewrap-google-ads'], meticulous: ['meticulous-business-plan-google-ads'], advit: ['advit-prints-meta-ads'], 'om sai': ['om-sai-developer-meta-ads'], classpe: ['classpe-social-media-strategy'], zzzz: [] };
const inOrder = (set) => ORDER.filter((s) => set.includes(s));
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  let fail = 0; const rec = (w, name, ok, detail) => { if (!ok) fail++; console.log(JSON.stringify({ w, name, ok, ...(ok ? {} : { detail }) })); };
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
    const p = await ctx.newPage();
    const cards = () => p.evaluate(() => [...document.querySelectorAll('.rs-wc')].map((c) => c.querySelector('a')?.getAttribute('href')?.replace('/portfolio/', '')).filter(Boolean));
    const pager = () => p.evaluate(() => ({ on: document.querySelector('.wk-pager [aria-current=page]')?.textContent?.replace('Page', '').trim() ?? null, of: document.querySelector('.wk-pg-of')?.textContent ?? null, visible: Boolean(document.querySelector('.wk-pager')) }));
    const open = async (u) => { await p.goto(base + u, { waitUntil: 'load', timeout: 120000 }); const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {}); await p.waitForSelector('#wk-q'); await p.waitForTimeout(700); };
    const settle = () => p.waitForTimeout(600);
    const clear = async () => { await p.fill('#wk-q', ''); await p.selectOption('#wk-industry', '').catch(() => {}); const all = p.locator('button', { hasText: /^All services/ }).first(); if (await all.count()) await all.click().catch(() => {}); await settle(); };
    // 1. page 1 and page 2 as served
    await open('/work'); const p1 = await cards(); const pg1 = await pager();
    rec(w, 'page 1 has the first 12 in order', eq(p1, ORDER.slice(0, 12)), p1); rec(w, 'pager shows page 1 of 2', /1 of 2/.test(pg1.of ?? ''), pg1);
    await open('/work/page/2'); const p2 = await cards(); rec(w, 'page 2 has the last 7 in order', eq(p2, ORDER.slice(12)), p2);
    // 2. filters begun on page 2 search the whole collection and the pager resets
    const svcButtons = async () => (await p.locator('button').allTextContents()).map((t) => t.trim());
    for (const [label, expected] of Object.entries(SVC)) {
      await open('/work/page/2');
      const btn = p.locator('button', { hasText: new RegExp('^' + label) }).first();
      if (!(await btn.count())) { rec(w, `service filter "${label}" exists`, false, await svcButtons()); continue; }
      await btn.click(); await settle(); const got = await cards(); const pg = await pager();
      rec(w, `from page 2: service ${label} (${expected.length}) searches all 19, in library order`, eq(got, inOrder(expected)), got);
      rec(w, `from page 2: pager reset after service ${label}`, !pg.visible || pg.on === '1' || /1 of 1/.test(pg.of ?? ''), pg);
      await clear(); const back = await cards(); rec(w, `clearing ${label} restores page order`, eq(back, ORDER.slice(0, 12)) || eq(back, ORDER.slice(12)) || eq(back, ORDER), back);
    }
    for (const [val, expected] of Object.entries(IND)) {
      await open('/work/page/2'); await p.selectOption('#wk-industry', val); await settle(); const got = await cards(); const pg = await pager();
      rec(w, `from page 2: industry ${val} (${expected.length})`, eq(got, inOrder(expected)), got); rec(w, `pager reset after industry ${val}`, !pg.visible || pg.on === '1' || /1 of 1/.test(pg.of ?? ''), pg);
    }
    for (const [term, expected] of Object.entries(SEARCH)) {
      await open('/work/page/2'); await p.fill('#wk-q', term); await settle(); const got = await cards(); rec(w, `from page 2: search "${term}"`, eq(got, inOrder(expected)), got);
    }
    // 3. combined filters and clearing
    await open('/work'); await p.selectOption('#wk-industry', 'education'); await p.locator('button', { hasText: /^Google Ads/ }).first().click(); await settle();
    rec(w, 'education + Google Ads', eq(await cards(), inOrder(IND.education.filter((s) => SVC['Google Ads'].includes(s)))), await cards());
    await p.fill('#wk-q', 'bakedemy'); await settle(); rec(w, 'education + Google Ads + "bakedemy"', eq(await cards(), ['bakedemy-google-ads']), await cards());
    await p.selectOption('#wk-industry', 'professional-services'); await settle(); rec(w, 'no match for conflicting filters shows no card', (await cards()).length === 0, await cards());
    await clear(); const restored = await cards(); const pgR = await pager(); rec(w, 'clearing all filters restores page 1 order and pager', eq(restored, ORDER.slice(0, 12)) && /1 of 2/.test(pgR.of ?? ''), { restored, pgR });
    await p.screenshot({ path: path.join(outDir, `work-restored-${w}.png`) });
    await ctx.close();
  }
  await b.close(); console.log(fail ? `FAIL ${fail}` : 'ALL PASS');
})();
