const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844], [320, 700]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(process.argv[2] + '/conversion-optimization', { waitUntil: 'networkidle' });
    const bn = await p.evaluate(() => document.querySelector('[aria-labelledby=consent-banner-title]').getBoundingClientRect().top);
    // every interactive element focused: is it covered by the banner after focus (browser scroll-into-view)?
    const sel = 'main a[href], main button, .px-h a[href], .px-h button';
    const n = await p.$$eval(sel, (a) => a.length);
    let covered = [];
    const els = await p.$$(sel);
    for (const e of els) {
      const vis = await e.isVisible(); if (!vis) continue;
      await e.focus(); await p.waitForTimeout(40);
      const r = await e.evaluate((x, top) => { const r = x.getBoundingClientRect(); return { bottom: Math.round(r.bottom), name: (x.getAttribute('aria-label') || x.textContent || '').trim().slice(0, 30), inBanner: !x.closest('[aria-labelledby=consent-banner-title]') && r.bottom > top && r.top < innerHeight }; }, bn);
      if (r.inBanner) covered.push(r.name);
    }
    // end of page: last content above banner?
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(300);
    const foot = await p.evaluate(() => { const f = document.querySelector('footer'); const r = f.getBoundingClientRect(); const links = [...f.querySelectorAll('a')].map((a) => a.getBoundingClientRect().bottom); return { footerBottom: Math.round(r.bottom), vh: innerHeight, lastLinkBottom: Math.round(Math.max(...links)) }; });
    console.log(w, { bannerTop: bn, focusables: n, coveredAfterFocus: covered, foot });
  }
  await b.close();
})();
