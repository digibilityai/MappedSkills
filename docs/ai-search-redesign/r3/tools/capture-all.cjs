// R3 captures. node capture-all.cjs <mockupBase> <baselineBase>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [mock, base] = process.argv.slice(2); const S = __dirname + '/../screenshots';
const SECS = { industry: '.ax-ind', scenario: '.ax-scn', journey: '.ax-jr-sec', reporting: '.ax-rp-sec', record: '.ax-evi' };
const OLD = { 'self-test': '.ax-src-sec, [aria-labelledby*="src"], section:has(h2:text("Buyers"))' };
(async () => {
  const b = await chromium.launch();
  const open = async (url, w, h, extra = {}) => { const c = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await c.newPage(); await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); return [c, p]; };
  for (const [tag, w, h] of [['1440x780', 1440, 780], ['1280x720', 1280, 720], ['375x812', 375, 812]]) {
    // proposed hero (banner on, as a first visit), full pages (banner off)
    let [c, p] = await open(mock + '?motion=reduce', w, h); await p.screenshot({ path: `${S}/proposed/proposed-${tag}-fold.png` }); await c.close();
    [c, p] = await open(base, w, h, { reducedMotion: 'reduce' }); await p.screenshot({ path: `${S}/baseline/baseline-${tag}-fold.png` }); await c.close();
  }
  for (const [tag, w, h] of [['1440', 1440, 900], ['375', 375, 812]]) {
    let [c, p] = await open(mock + '?banner=0&motion=reduce', w, h); await p.screenshot({ path: `${S}/proposed/proposed-${tag}-full.png`, fullPage: true });
    for (const [k, sel] of Object.entries(SECS)) await p.locator(sel).first().screenshot({ path: `${S}/sections/proposed-${k}-${tag}.png` });
    await c.close();
    [c, p] = await open(base, w, h, { reducedMotion: 'reduce' }); await p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"]{display:none!important}' }); await p.screenshot({ path: `${S}/baseline/baseline-${tag}-full.png`, fullPage: true });
    for (const [k, t] of [['where-answers-and-self-test','AI answers lean'],['journey','Five steps'],['reporting','What we can check'],['suitability','Worth doing now']]) { const sec = k === 'self-test' ? null : p.locator('main section', { has: p.locator('h2', { hasText: t }) }).first(); if (sec) await sec.screenshot({ path: `${S}/sections/baseline-${k}-${tag}.png` }); }
    const heads = await p.evaluate(() => [...document.querySelectorAll('main section')].map((s, i) => [i, (s.querySelector('h2')||{}).textContent]));
    console.log(tag, JSON.stringify(heads));
    await c.close();
  }
  // storyboards: every step of every sequence, desktop and mobile
  const SEQ = { journey: ['.ax-jr-sec', 5], reporting: ['.ax-rp-sec', 3], scenario: ['.ax-scn', 4], industry: ['.ax-ind', 4] };
  for (const [tag, w, h] of [['desktop', 1440, 900], ['mobile', 375, 812]]) for (const [k, [sel, n]] of Object.entries(SEQ)) for (let s = 1; s <= n; s++) {
    const [c, p] = await open(`${mock}?banner=0&step=${s}`, w, h); await p.locator(sel).first().screenshot({ path: `${S}/storyboard/${k}-${tag}-step-${s}.png` }); await c.close();
  }
  for (let i = 0; i < 4; i++) { const [c, p] = await open(`${mock}?banner=0&ind=${i}&step=4`, 1440, 900); await p.locator('.ax-ind').screenshot({ path: `${S}/storyboard/industry-desktop-${['manufacturing', 'jewellery', 'd2c', 'real-estate'][i]}.png` }); await c.close(); }
  await b.close();
})();
