const { chromium, firefox, webkit } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const base = process.argv[2], out = process.argv[3];
const R = {};
const sections = ['.co-hero', '.co-route-sec', '.co-work-sec', '.co-meas-sec', '.co-proof-sec', '.co-close'];
const names = ['1-hero', '2-four-places', '3-how-we-work', '4-improve-measure-review', '5-own-form', '6-close'];
(async () => {
  const b = await chromium.launch();
  for (const [tag, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    // first screen (immediately visible step 1)
    let ctx = await b.newContext({ viewport: { width: tag === 'mobile' ? 375 : 1440, height: tag === 'mobile' ? 812 : 780 } });
    let p = await ctx.newPage(); await p.goto(base + '/conversion-optimization', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/${tag}-first-screen.png` });
    await p.addStyleTag({ content: '[aria-labelledby=consent-banner-title]{display:none!important}' });
    // consent banner overlap
    R[tag + '-consent'] = await p.evaluate(() => { const c = document.querySelector('[role="dialog"], [data-consent], [class*="consent" i]'); return c ? { cls: c.className, r: c.getBoundingClientRect().toJSON() } : null; });
    // animated sections, each captured when complete
    for (let i = 0; i < sections.length; i++) {
      await p.evaluate((s) => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 20); }, sections[i]);
      const early = i === 3 || i === 0 ? 1 : 0;
      await p.waitForTimeout(i === 0 ? 5200 : 9800);
      const el = await p.$(sections[i]);
      await el.screenshot({ path: `${out}/${tag}-${names[i]}.png` });
    }
    await ctx.close();
    // reduced motion, full page
    ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    p = await ctx.newPage(); await p.goto(base + '/conversion-optimization', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    await p.screenshot({ path: `${out}/${tag}-reduced-motion-full.png`, fullPage: true });
    R[tag + '-reduced'] = await p.evaluate(() => ({ on: document.querySelectorAll('.co-seq .is-on').length, hiddenItems: [...document.querySelectorAll('.co-seq [data-i]')].filter((e) => getComputedStyle(e).visibility === 'hidden' || +getComputedStyle(e).opacity < 0.9).length, figsVisible: [...document.querySelectorAll('.co-fig')].filter((e) => getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity === '1').length }));
    await ctx.close();
    // no javascript
    ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false });
    p = await ctx.newPage(); await p.goto(base + '/conversion-optimization', { waitUntil: 'load' });
    await p.screenshot({ path: `${out}/${tag}-no-js-full.png`, fullPage: true });
    R[tag + '-nojs'] = await p.evaluate(() => ({ h1: document.querySelector('h1')?.textContent, buttons: document.querySelectorAll('button.co-n').length, hiddenItems: [...document.querySelectorAll('.co-seq [data-i]')].filter((e) => getComputedStyle(e).visibility === 'hidden' || +getComputedStyle(e).opacity < 0.9).length, figsVisible: [...document.querySelectorAll('.co-fig')].filter((e) => getComputedStyle(e).visibility !== 'hidden').length }));
    await ctx.close();
  }
  // keyboard + manual selection + links (desktop)
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); await p.goto(base + '/conversion-optimization', { waitUntil: 'networkidle' });
  const btns = await p.$$eval('button.co-n', (a) => a.map((x) => x.getAttribute('aria-label')));
  R.buttons = btns;
  // tab through to first button
  await p.evaluate(() => document.querySelector('.co-route-sec').scrollIntoView());
  await p.waitForTimeout(600);
  await p.focus('.co-route button.co-n');
  await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
  const focusVisible = await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { tag: e.tagName, outline: cs.outlineStyle + ' ' + cs.outlineWidth }; });
  await p.focus('.co-route li:nth-child(2) button.co-n'); await p.keyboard.press('Enter');
  await p.waitForTimeout(3000);
  R.manual = await p.evaluate(() => ({ at: document.querySelector('.co-route').dataset.at, all: document.querySelector('.co-route').classList.contains('is-all'), current: document.querySelectorAll('.co-route [aria-current="step"]').length }));
  R.focusVisible = focusVisible;
  R.links = await p.$$eval('main a[href], .px-h a[href]', (a) => [...new Set(a.map((x) => x.getAttribute('href')))].filter((h) => /contact|schedule|problems|how-it/.test(h)));
  R.cta = await p.$$eval('.co-hero .dc-btn, .co-close .dc-btn', (a) => a.map((x) => [x.textContent.trim(), x.getAttribute('href')]));
  R.headings = await p.$$eval('h1,h2,h3', (a) => a.map((x) => x.tagName + ' ' + x.textContent.trim().slice(0, 60)));
  R.meta = await p.evaluate(() => ({ title: document.title, canonical: document.querySelector('link[rel=canonical]')?.href, desc: document.querySelector('meta[name=description]')?.content, ld: document.querySelectorAll('script[type="application/ld+json"]').length }));
  await b.close();
  fs.writeFileSync(out + '/checks.json', JSON.stringify(R, null, 1)); console.log(JSON.stringify(R, null, 1));
})();
