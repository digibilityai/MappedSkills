// Placements after the 31 October 2026 owner decisions: /seo shows Ameba Software and AnybodyCanBake SEO once each with their own images and links;
// the enquiry-led page lists Libros as an Online Library; the card eyebrows carry the new industries; search finds Libros by "online library".
// 1440, 390, 360. Usage: node verify-placements.cjs <baseUrl> <outDir>
const path = require('node:path'); const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
(async () => {
  const [base, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  let fail = 0; const log = (w, name, ok, d) => { if (!ok) fail++; console.log(JSON.stringify({ w, name, ok, ...(ok ? {} : { d }) })); };
  for (const w of [1440, 390, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 }); const p = await ctx.newPage();
    const go = async (u) => { await p.goto(base + u, { waitUntil: 'load', timeout: 120000 }); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.first().click().catch(() => {}); const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(70); } await p.waitForTimeout(900); };
    const cards = () => p.evaluate(() => [...document.querySelectorAll('.rcc .rs-wc')].map((c) => ({ href: c.querySelector('a')?.getAttribute('href'), eyebrow: c.querySelector('.rs-wc-eyebrow')?.textContent, title: c.querySelector('h3')?.textContent, note: c.querySelector('.rs-wc-note')?.textContent ?? null, img: (() => { const i = c.querySelector('.rs-wc-img img[src], .rs-wc-img svg'); return i ? (i.currentSrc || i.tagName) : null; })(), loaded: [...c.querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0) })));
    await go('/seo'); let c = await cards(); const hrefs = c.map((x) => x.href);
    log(w, '/seo: Ameba and AnybodyCanBake SEO once each', JSON.stringify(hrefs.slice().sort()) === JSON.stringify(['/portfolio/anybodycanbake-seo', '/portfolio/seo-ameba-software']), hrefs);
    log(w, '/seo: cards have images, loaded, no note', c.every((x) => x.img && x.loaded && !x.note), c);
    log(w, '/seo: no overflow', (await p.evaluate((vw) => document.documentElement.scrollWidth - vw, w)) <= 0);
    await p.locator('.rcc').first().screenshot({ path: path.join(outDir, `seo-cases-${w}.png`) });
    await go('/who-we-help/enquiry-led-businesses'); c = await cards(); const lib = c.find((x) => x.href === '/portfolio/libros-library-meta-ads');
    log(w, 'enquiry-led: Libros listed once as Online Library', c.filter((x) => x.href === '/portfolio/libros-library-meta-ads').length === 1 && /Online Library/.test(lib?.eyebrow ?? ''), c.map((x) => [x.href, x.eyebrow]));
    log(w, 'enquiry-led: no duplicate card', new Set(c.map((x) => x.href)).size === c.length, c.map((x) => x.href));
    await p.locator('.rcc').first().screenshot({ path: path.join(outDir, `enquiry-cases-${w}.png`) });
    for (const u of ['/who-we-help/education', '/who-we-help/d2c', '/google-ads', '/social-media-ads']) { await go(u); const cc = await cards(); log(w, `${u}: no duplicate, no note`, new Set(cc.map((x) => x.href)).size === cc.length && cc.every((x) => !x.note), cc.map((x) => x.href)); }
    await go('/work/page/2'); await p.fill('#wk-q', 'online library'); await p.waitForTimeout(700);
    const hits = await p.evaluate(() => [...document.querySelectorAll('.rs-wc a')].map((a) => a.getAttribute('href')));
    log(w, 'search "online library" finds Libros', hits.includes('/portfolio/libros-library-meta-ads'), hits);
    const eb = await p.evaluate(() => document.querySelector('.rs-wc .rs-wc-eyebrow')?.textContent); log(w, 'Libros card eyebrow', /Online Library/.test(eb ?? ''), eb);
    await ctx.close();
  }
  await b.close(); console.log(fail ? `FAIL ${fail}` : 'ALL PASS');
})();
