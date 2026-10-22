const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const OUT = require('path').join(__dirname, '..', 'screenshots');
const U = 'http://localhost:3391/research/marketing-measurement-gap-indian-business-websites';
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1440, 900, '1440'], [375, 812, '375']]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(U); await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '[class*="cookie"],[aria-label*="ookie"],[role="dialog"]{display:none!important}' });
    for (const [sel, n] of [['#findings', 'findings'], ['#body-3', 'bars'], ['#body-9', 'questions'], ['#body-10', 'note'], ['#methodology', 'method'], ['#limitations', 'limits'], ['#cite', 'cite'], ['.b-close', 'close'], ['.rs-media', 'media']]) {
      const el = await p.$(sel); const t = sel.startsWith('#body') ? await el.evaluateHandle((e) => e.closest('section')) : el;
      await t.screenshot({ path: `${OUT}/${tag}-${n}.png` });
    }
  }
  await b.close();
})();
