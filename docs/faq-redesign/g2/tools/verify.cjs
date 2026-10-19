// FAQ G2: compare the built /faq (next start on :3213) with the approved G1 mockup, and check behaviour.
// Run inside g2: node tools/verify.cjs   (needs the faq-g2-prod preview running)
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'screenshots');
const G2 = 'http://127.0.0.1:3213/faq';
const G1 = 'file://' + path.join(__dirname, '..', '..', 'g1', 'mockup', 'index.html') + '?banner=0';
const VP = [[1440, 900, 'desktop-1440'], [1280, 800, 'desktop-1280'], [768, 1024, 'tablet-768'], [375, 812, 'mobile-375'], [320, 640, 'mobile-320']];
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const grab = (open) => ({ open, run: () => {
  const main = document.querySelector('main');
  const secs = [...main.querySelectorAll('section.b-hero, .b-paper[id], section.b-ink, section.b-close')].map((e) => Math.round(e.getBoundingClientRect().height));
  const vis = (e) => e.offsetParent || e.getClientRects().length;
  return {
    secs, pageH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth,
    text: [...main.querySelectorAll('h1,h2,h3,summary,.faq-a,.fx-a,.faq-s-p,.fx-s-p,.b-lede,.b-kicker')].filter(vis).map((e) => e.innerText.replace(/\s+/g, ' ').trim()),
    small: [...main.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(e) && parseFloat(getComputedStyle(e).fontSize) < 12).length,
  };
}});
(async () => {
  const b = await chromium.launch(); const res = { widths: {} };
  for (const [w, h, tag] of VP) {
    const r = {};
    for (const [name, url] of [['g2', G2], ['g1', G1]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      for (const open of [false, true]) {
        await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(400); await p.evaluate(() => document.fonts.ready);
        await p.evaluate(() => { const d = document.querySelector('[data-banner]'); if (d) d.remove(); const c = document.querySelector('.ms-consent, [aria-label*="cookie" i], [aria-labelledby*="consent" i]'); });
        if (open) await p.evaluate(() => document.querySelectorAll('main details').forEach((d) => (d.open = true)));
        await p.waitForTimeout(300);
        const m = await p.evaluate(grab(open).run);
        r[name + (open ? 'Open' : '')] = m;
        if (name === 'g2' && ['desktop-1440', 'mobile-375', 'mobile-320', 'tablet-768'].includes(tag)) {
          await p.screenshot({ path: `${OUT}/${tag}-${open ? 'full-open' : 'full'}.png`, fullPage: true });
          if (!open) await p.screenshot({ path: `${OUT}/${tag}-fold.png` });
        }
      }
      r[name + 'Errors'] = errs; await ctx.close();
    }
    res.widths[tag] = {
      sectionsG2: r.g2.secs, sectionsG1: r.g1.secs, sectionsEqual: JSON.stringify(r.g2.secs) === JSON.stringify(r.g1.secs),
      openHeightG2: r.g2Open.pageH, openHeightG1: r.g1Open.pageH,
      textEqual: JSON.stringify(r.g2Open.text) === JSON.stringify(r.g1Open.text),
      textDiff: r.g2Open.text.map((t, i) => (t !== r.g1Open.text[i] ? [i, t.slice(0, 80), (r.g1Open.text[i] || '').slice(0, 80)] : null)).filter(Boolean).slice(0, 6),
      overflowX: [r.g2.overflowX, r.g2Open.overflowX], smallText: r.g2Open.small, errors: r.g2Errors,
    };
  }
  // behaviour on G2
  { const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
    await p.goto(G2, { waitUntil: 'load' }); await p.waitForTimeout(400);
    const ld = await p.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)).find((j) => j['@type'] === 'FAQPage'));
    const vis = await p.evaluate(() => [...document.querySelectorAll('#faq-body details')].map((d) => {
      const a = d.querySelector('.faq-a').cloneNode(true); a.querySelectorAll('.faq-more').forEach((x) => x.remove());
      a.querySelectorAll('dt').forEach((dt) => (dt.textContent = dt.textContent + ':'));
      return { q: d.querySelector('.faq-q').textContent, a: [...a.querySelectorAll('p, dt, dd')].map((x) => x.textContent) };
    }));
    // visible order is direct, rows, body; plainAnswer is the same order
    const ldMatch = ld.mainEntity.length === vis.length && ld.mainEntity.every((e, i) => e.name === vis[i].q && norm(e.acceptedAnswer.text) === norm(vis[i].a.join(' ')));
    const closedOnLoad = await p.evaluate(() => [...document.querySelectorAll('#faq-body details')].every((d) => !d.open));
    const meta = await p.evaluate(() => ({ title: document.title, desc: document.querySelector('meta[name=description]').content, canonical: document.querySelector('link[rel=canonical]').href, h1: document.querySelector('h1').innerText.replace(/\s+/g, ' ') }));
    await p.focus('#q-why-wont-you-guarantee-results > summary'); await p.keyboard.press('Enter');
    const enterOpens = await p.evaluate(() => document.getElementById('q-why-wont-you-guarantee-results').open);
    await p.keyboard.press('Space');
    const spaceCloses = await p.evaluate(() => !document.getElementById('q-why-wont-you-guarantee-results').open);
    const focusRing = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineColor);
    await p.click('.faq-all');
    const openAll = await p.evaluate(() => ({ all: [...document.querySelectorAll('#faq-body details')].every((d) => d.open), label: document.querySelector('.faq-all').innerText, status: document.querySelector('.faq-tools [role=status]').textContent }));
    const micro = await p.evaluate(() => [getComputedStyle(document.querySelector('.faq-pm')).transitionDuration, getComputedStyle(document.querySelector('.faq-d > summary')).transitionDuration, getComputedStyle(document.querySelector('.faq-cats a')).transitionDuration]);
    const ctas = await p.evaluate(() => [...document.querySelectorAll('.b-close .dc-btn')].map((a) => [a.innerText.trim(), a.getAttribute('href')]));
    const deep = {};
    for (const id of ['q-what-is-the-minimum-commitment', 'q-who-is-this-for-and-who-is-it-not-for', 'g-outcome', 'g-ai-search']) {
      await p.goto('about:blank'); await p.goto(G2 + '#' + id, { waitUntil: 'load' }); await p.waitForTimeout(400); await p.waitForTimeout(1200);
      deep[id] = await p.evaluate((i) => { const el = document.getElementById(i); return { top: Math.round(el.getBoundingClientRect().top), open: el.tagName === 'DETAILS' ? el.open : null }; }, id);
    }
    await p.evaluate(() => scrollTo(0, 0)); await p.click('.faq-cats a[href="#measurement"]'); await p.waitForTimeout(1200);
    const catLink = await p.evaluate(() => Math.round(document.getElementById('measurement').getBoundingClientRect().top));
    res.behaviour = { meta, ldCount: ld.mainEntity.length, ldMatchesVisible: ldMatch, closedOnLoad, enterOpens, spaceCloses, focusRing, openAll, micro, ctas, deep, catLink_measurementTop: catLink };
    await ctx.close(); }
  { const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(G2, { waitUntil: 'load' }); await p.click('#q-is-geo-or-aeo-a-separate-discipline-from-seo > summary');
    res.noJs = await p.evaluate(() => ({ opens: document.getElementById('q-is-geo-or-aeo-a-separate-discipline-from-seo').open, toolsDisplay: getComputedStyle(document.querySelector('.faq-tools')).display })); await ctx.close(); }
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(G2, { waitUntil: 'load' }); await p.waitForTimeout(400); await p.click('#q-why-wont-you-guarantee-results > summary');
    res.reducedMotion = await p.evaluate(() => ({ pm: getComputedStyle(document.querySelector('.faq-pm')).transitionDuration, answerAnimation: getComputedStyle(document.querySelector('#q-why-wont-you-guarantee-results .faq-a')).animationName })); await ctx.close(); }
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: 'active' }); const p = await ctx.newPage();
    await p.goto(G2, { waitUntil: 'load' }); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/forced-colors-1440.png`, clip: { x: 0, y: 500, width: 1440, height: 400 } }); await ctx.close(); }
  fs.writeFileSync(path.join(__dirname, '..', 'checks.json'), JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res, null, 1).slice(0, 6000));
  await b.close();
})();
