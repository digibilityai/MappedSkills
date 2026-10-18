// About G0: read-only capture of the live /about page at three widths.
// node capture.cjs <outDir>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const out = process.argv[2];
const URL = 'https://mappedskills.com/about';
const VP = [[1440, 900, 'desktop-1440'], [820, 1180, 'tablet-820'], [390, 844, 'mobile-390']];
(async () => {
  const b = await chromium.launch();
  const meas = {};
  for (const [w, h, tag] of VP) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    const res = await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
    await p.screenshot({ path: `${out}/${tag}-fold-with-consent.png` });
    // Most privacy-preserving choice on the consent banner.
    const dec = p.getByRole('button', { name: /reject|decline|necessary only|essential only/i }).first();
    if (await dec.count()) { await dec.click(); await p.waitForTimeout(400); }
    await p.screenshot({ path: `${out}/${tag}-fold.png` });
    await p.screenshot({ path: `${out}/${tag}-full.png`, fullPage: true });
    const secs = await p.$$('main section[aria-labelledby]:not(.ab-state)');
    let i = 0;
    for (const s of secs) { i++; await s.screenshot({ path: `${out}/${tag}-s${String(i).padStart(2, '0')}.png` }); }
    // The comparison figure, second view.
    const tog = p.locator('.ab-figure button').first();
    if (await tog.count()) {
      await tog.scrollIntoViewIfNeeded(); await tog.click(); await p.waitForTimeout(900);
      await p.locator('.ab-figsec').screenshot({ path: `${out}/${tag}-fig-view2.png` });
    }
    meas[`${tag}x${h}`] = await p.evaluate(() => {
      const words = (el) => (el.innerText || '').trim().split(/\s+/).filter(Boolean).length;
      const main = document.querySelector('main');
      const cta = [...document.querySelectorAll('main a')].find((a) => /contact|schedule/.test(a.getAttribute('href') || ''));
      return {
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        h1: document.querySelector('h1')?.innerText,
        pageHeight: document.documentElement.scrollHeight,
        overflowX: document.documentElement.scrollWidth > innerWidth,
        mainWords: words(main),
        firstCtaTop: cta ? Math.round(cta.getBoundingClientRect().top + scrollY) : null,
        ctas: [...main.querySelectorAll('a')].map((a) => `${a.innerText.trim()} -> ${a.getAttribute('href')}`),
        headings: [...main.querySelectorAll('h1,h2,h3')].map((x) => `${x.tagName} ${x.innerText.replace(/\s+/g, ' ').trim()}`),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return j['@type'] || (j['@graph'] || []).map((g) => g['@type']).join(','); } catch { return 'bad'; } }),
        secs: [...main.querySelectorAll('section[aria-labelledby]:not(.ab-state)')].map((s) => ({ id: s.getAttribute('aria-labelledby'), cls: s.className, top: Math.round(s.getBoundingClientRect().top + scrollY), h: Math.round(s.getBoundingClientRect().height), words: words(s) })),
      };
    });
    meas[`${tag}x${h}`].status = res.status();
    meas[`${tag}x${h}`].consoleErrors = errs;
    await ctx.close();
  }
  fs.writeFileSync(`${out}/measurements.json`, JSON.stringify(meas, null, 1));
  await b.close();
})();
