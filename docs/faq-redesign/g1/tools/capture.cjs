// FAQ G1: screenshots and checks of the mockup on disk. Run inside g1: node tools/capture.cjs
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots');
const BASE = 'file://' + path.join(__dirname, '..', 'mockup', 'index.html') + '?banner=0';
const VP = [[1440, 900, 'desktop-1440'], [1280, 800, 'desktop-1280'], [768, 1024, 'tablet-768'], [375, 812, 'mobile-375'], [320, 640, 'mobile-320']];
const FULL = ['desktop-1440', 'tablet-768', 'mobile-375', 'mobile-320'];
(async () => {
  const b = await chromium.launch();
  const checks = {};
  for (const [w, h, tag] of VP) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(BASE, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${tag}-fold.png` });
    const measure = () => p.evaluate(() => {
      const main = document.querySelector('main');
      const vis = (e) => e.offsetParent || e.getClientRects().length;
      const over = [...main.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && vis(e)).map((e) => e.tagName + '.' + e.className).slice(0, 5);
      const small = [...main.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(e) && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => e.className);
      const targets = [...main.querySelectorAll('a,button,summary')].filter(vis).map((e) => [(e.textContent || '').trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)]).filter(([, hh]) => hh < 24);
      const ans = [...main.querySelectorAll('.fx-a p')].filter(vis);
      return { pageHeight: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth, overElems: over,
        catsBottom: Math.round(document.querySelector('.fx-cats').getBoundingClientRect().bottom + scrollY), catsInFold: document.querySelector('.fx-cats').getBoundingClientRect().bottom <= innerHeight,
        answerMaxWidth: ans.length ? Math.max(...ans.map((e) => Math.round(e.getBoundingClientRect().width))) : null,
        answerLineHeight: ans.length ? getComputedStyle(ans[1] || ans[0]).lineHeight : null,
        headings: [...main.querySelectorAll('h1,h2,h3')].filter(vis).map((x) => x.tagName + ' ' + x.innerText.replace(/\s+/g, ' ').trim()),
        smallText: small.slice(0, 5), smallTargets: targets };
    });
    const m = await measure();
    if (FULL.includes(tag)) {
      await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      await p.goto(BASE + '&open=all', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
      await p.screenshot({ path: `${OUT}/${tag}-full-open.png`, fullPage: true });
      const o = await measure(); m.openPageHeight = o.pageHeight; m.openOverflowX = o.overflowX; m.openOverElems = o.overElems; m.answerMaxWidth = o.answerMaxWidth; m.answerLineHeight = o.answerLineHeight; m.openSmallText = o.smallText;
      await (await p.$('#pricing')).evaluate((e) => e.closest('.fx-grp').scrollIntoView());
      await (await p.$('.fx-grp')).screenshot({ path: `${OUT}/${tag}-group-open.png` });
    }
    m.microMs = await p.evaluate(() => [getComputedStyle(document.querySelector('.fx-pm')).transitionDuration, getComputedStyle(document.querySelector('.fx-d > summary')).transitionDuration]);
    m.consoleErrors = errs;
    checks[tag] = m;
    await ctx.close();
  }
  // keyboard + deep links
  { const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: 'load' });
    const closedOnLoad = await p.evaluate(() => [...document.querySelectorAll('#fx-body details')].every((d) => !d.open));
    await p.focus('#q-why-wont-you-guarantee-results > summary'); await p.keyboard.press('Enter');
    const enterOpens = await p.evaluate(() => document.getElementById('q-why-wont-you-guarantee-results').open);
    await p.keyboard.press('Space');
    const spaceCloses = await p.evaluate(() => !document.getElementById('q-why-wont-you-guarantee-results').open);
    const focusRing = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineColor);
    await p.click('.fx-all');
    const openAll = await p.evaluate(() => ({ all: [...document.querySelectorAll('#fx-body details')].every((d) => d.open), label: document.querySelector('.fx-all-t').textContent, status: document.querySelector('[data-status]').textContent }));
    await p.goto('about:blank'); await p.goto(BASE + '#q-what-is-the-minimum-commitment', { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const deepQ = await p.evaluate(() => ({ open: document.getElementById('q-what-is-the-minimum-commitment').open, top: Math.round(document.getElementById('q-what-is-the-minimum-commitment').getBoundingClientRect().top) }));
    await p.goto('about:blank'); await p.goto(BASE + '#g-outcome', { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const deepG = await p.evaluate(() => Math.round(document.getElementById('results').getBoundingClientRect().top));
    await p.evaluate(() => scrollTo(0, 0)); await p.click('.fx-cats a[href="#working-together"]'); await p.waitForTimeout(1200);
    const catLink = await p.evaluate(() => Math.round(document.getElementById('working-together').getBoundingClientRect().top));
    const liveIds = ['g-commercial', 'g-outcome', 'g-measurement', 'g-fit', 'g-ai-search', 'q-what-does-this-cost-and-what-changes-that-number', 'q-what-is-the-minimum-commitment', 'q-what-are-you-accountable-for-and-what-will-you-not-promise', 'q-why-wont-you-guarantee-results', 'q-how-long-before-anything-changes', 'q-how-do-you-know-an-enquiry-came-from-your-work-and-what-cant-you-tell', 'q-what-counts-as-a-qualified-enquiry-here-and-who-decides', 'q-what-access-do-you-need-and-what-do-we-keep', 'q-who-is-this-for-and-who-is-it-not-for', 'q-can-you-get-our-business-into-chatgpt-and-ai-answers', 'q-is-geo-or-aeo-a-separate-discipline-from-seo'];
    const missingLiveIds = await p.evaluate((ids) => ids.filter((i) => !document.getElementById(i)), liveIds);
    checks.interaction = { closedOnLoad, enterOpens, spaceCloses, focusRing, openAll, deepQ, deepG_resultsTop: deepG, catLink_workingTogetherTop: catLink, missingLiveIds }; await ctx.close(); }
  // no JavaScript: disclosures still work, tools button stays hidden
  { const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: 'load' });
    await p.click('#q-is-geo-or-aeo-a-separate-discipline-from-seo > summary');
    checks.noJs = await p.evaluate(() => ({ opens: document.getElementById('q-is-geo-or-aeo-a-separate-discipline-from-seo').open, toolsHidden: document.querySelector('.fx-all').hidden })); await ctx.close(); }
  // reduced motion
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: 'load' }); await p.click('#q-why-wont-you-guarantee-results > summary');
    checks.reducedMotion = await p.evaluate(() => ({ pm: getComputedStyle(document.querySelector('.fx-pm')).transitionDuration, answerAnimation: getComputedStyle(document.querySelector('#q-why-wont-you-guarantee-results .fx-a')).animationName, animations: document.getAnimations().length })); await ctx.close(); }
  fs.writeFileSync(`${OUT}/checks.json`, JSON.stringify(checks, null, 1));
  for (const [k, v] of Object.entries(checks)) console.log(k, JSON.stringify(v));
  await b.close();
})();
