// G1 evidence: full pages, folds, storyboard (every step of every sequence), no-JS page, timing/keyboard/dash checks, and a recording.
// node capture-all.cjs   (mockup served at http://127.0.0.1:3192)
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const G = path.join(__dirname, '..'), U = 'http://127.0.0.1:3192/mockup/index.html';
const P = path.join(G, 'screenshots/proposed'), SB = path.join(G, 'screenshots/storyboard');
const ready = async (p) => { await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); };
const NAMES = ['1-hero', '2-four-places', '3-how-we-work', '4-did-it-work', '5-our-own-form', '6-close'];
(async () => {
  const b = await chromium.launch(); const report = {};
  // full pages (complete state) and folds (as a first-time visitor sees it, banner shown)
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(U + '?motion=reduce&banner=0', { waitUntil: 'networkidle' }); await ready(p);
    await p.screenshot({ path: `${P}/proposed-full-${w}.png`, fullPage: true });
    const secs = await p.$$('main section');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${P}/proposed-${w}-${NAMES[i]}.png` });
    report['words_' + w] = await p.evaluate(() => document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length);
    await ctx.close();
  }
  for (const [w, h] of [[1440, 780], [1280, 720], [375, 812]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(U, { waitUntil: 'networkidle' }); await ready(p);
    await p.screenshot({ path: `${P}/proposed-fold-${w}x${h}.png` });
    report['fold_' + w + 'x' + h] = await p.evaluate(() => { const r = (s) => Math.round(document.querySelector(s).getBoundingClientRect().bottom + scrollY);
      const cb = document.querySelector('[aria-labelledby="consent-banner-title"]');
      return { heroBottom: r('.b-hero'), ctaBottom: r('.b-hero .dc-btn-primary'), figureBottom: r('.co-hero-fig'), consentTop: cb ? Math.round(cb.getBoundingClientRect().top) : null, overflowX: document.documentElement.scrollWidth > innerWidth }; });
    await ctx.close();
  }
  // storyboard: every sequence frozen at each step
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    for (let s = 1; s <= 5; s++) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      await p.goto(U + `?step=${s}&banner=0`, { waitUntil: 'networkidle' }); await ready(p);
      const secs = await p.$$('main section');
      const steps = [3, 5, 4, 4, 5, 4];
      for (let i = 0; i < secs.length; i++) if (s <= steps[i]) await secs[i].screenshot({ path: `${SB}/${NAMES[i]}-${w}-step${s}.png` });
      await ctx.close();
    }
  }
  // no JavaScript: everything visible
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await ready(p);
    await p.evaluate(() => { const c = document.querySelector('[aria-labelledby="consent-banner-title"]'); if (c) c.remove(); });
    await p.screenshot({ path: `${P}/proposed-nojs-full-1440.png`, fullPage: true });
    report.noJs_hidden = await p.evaluate(() => [...document.querySelectorAll('main [data-i], main .co-fig, main .co-tag')].filter(e => { const cs = getComputedStyle(e); return cs.visibility === 'hidden' || +cs.opacity < 0.99 || cs.display === 'none'; }).length);
    await ctx.close(); }
  // timing: step index of each sequence sampled while in view; plays once and stops
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await ready(p);
    const seqSel = ['.co-story', '.co-route', '.co-work', '.co-meas', '.co-proof', '.co-next']; report.timing = {};
    for (const sel of seqSel) {
      await p.evaluate((s) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - 120); }, sel);
      const t0 = Date.now(); const samples = [];
      for (const t of [100, 1900, 2500, 4500, 6500, 8500, 11000]) { await p.waitForTimeout(t - (Date.now() - t0)); samples.push([t, await p.evaluate((s) => document.querySelector(s).getAttribute('data-at'), sel)]); }
      report.timing[sel] = samples;
    }
    // keyboard: tab to the first step button in "four places", press Enter on step 3
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await ready(p);
    const btn = await p.$('.co-route button.co-n:nth-of-type(1)');
    const b3 = (await p.$$('.co-route button.co-n'))[2]; await b3.focus(); await p.keyboard.press('Enter');
    report.keyboard = await p.evaluate(() => ({ at: document.querySelector('.co-route').getAttribute('data-at'), all: document.querySelector('.co-route').classList.contains('is-all'), label: document.activeElement.getAttribute('aria-label'), current: document.activeElement.getAttribute('aria-current'),
      buttons: document.querySelectorAll('main button.co-n').length }));
    await p.waitForTimeout(4500);
    report.keyboard.stillAt = await p.evaluate(() => document.querySelector('.co-route').getAttribute('data-at'));
    // copy checks
    report.copy = await p.evaluate(() => { const t = document.querySelector('main').innerText; return { longDash: (t.match(/[—–]/g) || []).length, doubleHyphen: (t.match(/--/g) || []).length,
      h: [...document.querySelectorAll('main h1, main h2, main h3')].map(e => e.tagName + ' ' + e.innerText.replace(/\s+/g, ' ')),
      links: [...document.querySelectorAll('main a')].map(a => a.innerText.replace(/\s+/g, ' ') + ' -> ' + a.getAttribute('href')) }; });
    await ctx.close(); }
  // reduced motion via OS setting
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await ready(p);
    report.reducedMotion = await p.evaluate(() => ({ static: document.querySelectorAll('.co-seq.is-static').length, seqs: document.querySelectorAll('.co-seq').length,
      hidden: [...document.querySelectorAll('main [data-i], main .co-fig, main .co-tag')].filter(e => getComputedStyle(e).visibility === 'hidden' || +getComputedStyle(e).opacity < 0.99).length })); await ctx.close(); }
  // recording: scroll through the page section by section, sequences play, then one manual click
  for (const [w, h, name] of [[1440, 900, 'co-g1-sequences-1440.webm'], [390, 844, 'co-g1-sequences-390.webm']]) {
    const dir = path.join(G, 'recordings/tmp'); fs.mkdirSync(dir, { recursive: true });
    const ctx = await b.newContext({ viewport: { width: w, height: h }, recordVideo: { dir, size: { width: w, height: h } } }); const p = await ctx.newPage();
    await p.goto(U + '?banner=0', { waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(5500);
    for (const sel of ['.co-route', '.co-work', '.co-meas', '.co-proof', '.co-next']) {
      await p.evaluate((s) => { const e = document.querySelector(s); scrollTo({ top: e.getBoundingClientRect().top + scrollY - (innerWidth > 760 ? 160 : 60), behavior: 'smooth' }); }, sel);
      await p.waitForTimeout(w > 760 ? 10500 : 9000);
    }
    await p.evaluate(() => { const e = document.querySelector('.co-work'); scrollTo({ top: e.getBoundingClientRect().top + scrollY - 160, behavior: 'smooth' }); }); await p.waitForTimeout(1200);
    await (await p.$$('.co-work button.co-n'))[1].click(); await p.waitForTimeout(2500);
    const v = p.video(); await ctx.close(); fs.renameSync(await v.path(), path.join(G, 'recordings', name));
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.writeFileSync(path.join(G, 'screenshots/g1-checks.json'), JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report, null, 1));
  await b.close();
})();
