// Pricing G2: verification of the local production build against the approved G1 R0 mockup and the live site.
// node verify.cjs <localOrigin> <outDir>   e.g. node verify.cjs http://127.0.0.1:3211 ../screenshots
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const [LOCAL, OUT] = process.argv.slice(2);
const MOCK = 'file://' + path.resolve(__dirname, '../../g1/mockup/index.html') + '?banner=0';
const LIVE = 'https://mappedskills.com';
const VP = [[1440, 900, 'desktop-1440'], [1280, 800, 'desktop-1280'], [820, 1180, 'tablet-820'], [390, 844, 'mobile-390'], [320, 640, 'mobile-320']];
const SIBLINGS = ['/', '/services', '/how-it-works', '/seo', '/google-ads', '/social-media-ads', '/ai-seo', '/conversion-optimization', '/lead-generation', '/about', '/faq', '/contact', '/schedule-call'];
const R = {};
const secs = (p) => p.evaluate(() => [...document.querySelectorAll('main section[aria-labelledby]')].map((s) => ({ id: s.getAttribute('aria-labelledby'), h: Math.round(s.getBoundingClientRect().height) })));
const settle = async (p) => { await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); };
const dismiss = async (p) => { const d = p.getByRole('button', { name: /reject|decline|necessary only|essential only/i }).first(); if (await d.count()) { await d.click(); await p.waitForTimeout(300); } };
(async () => {
  const b = await chromium.launch();
  // 1. layouts, fidelity (section heights vs mockup), CTAs, content
  for (const [w, h, tag] of VP) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errs = [], bad = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
    const res = await p.goto(LOCAL + '/pricing', { waitUntil: 'networkidle' }); await settle(p);
    await dismiss(p);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(700); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${tag}-fold.png` });
    if (['desktop-1440', 'tablet-820', 'mobile-390'].includes(tag)) {
      await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      let i = 0; for (const s of await p.$$('main section[aria-labelledby]')) { i++; await s.screenshot({ path: `${OUT}/${tag}-s${i}.png` }); }
    }
    const m = await p.evaluate(() => {
      const main = document.querySelector('main');
      const hrefs = (sel) => [...document.querySelectorAll(sel + ' .dc-actions a')].map((a) => a.textContent.trim() + ' -> ' + a.getAttribute('href'));
      return {
        overflowX: document.documentElement.scrollWidth > innerWidth,
        heroCtas: hrefs('.pr-hero'), closeCtas: hrefs('.pr-close'),
        ctaInFold: document.querySelector('.pr-hero .dc-btn-primary').getBoundingClientRect().bottom <= innerHeight,
        links: [...main.querySelectorAll('a')].map((a) => a.getAttribute('href')),
        headings: [...main.querySelectorAll('h1,h2,h3')].map((x) => x.tagName + ' ' + x.innerText.replace(/\s+/g, ' ').trim()),
        h1Count: main.querySelectorAll('h1').length,
        
        small: [...main.querySelectorAll('*')].filter((e) => e.offsetParent && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12).length,
        words: main.innerText.trim().split(/\s+/).length,
        title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href,
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent)['@type']; } catch { return 'bad'; } }),
        pageHeight: document.documentElement.scrollHeight,
      };
    });
    m.status = res.status(); m.secs = await secs(p); m.consoleErrors = errs; m.failed = bad;
    const mp = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await mp.goto(MOCK, { waitUntil: 'load' }); await settle(mp);
    m.mockSecs = await secs(mp); m.mockWords = await mp.evaluate(() => document.querySelector('main').innerText.trim().split(/\s+/).length);
    m.mockText = await mp.evaluate(() => document.querySelector('main').innerText.replace(/\s+/g, ' ').trim());
    m.textEqual = m.mockText === (await p.evaluate(() => document.querySelector('main').innerText.replace(/\s+/g, ' ').trim()));
    if (tag === 'desktop-1440' || tag === 'mobile-390') await mp.screenshot({ path: `${OUT}/${tag}-mockup-full.png`, fullPage: true });
    delete m.mockText;
    await mp.context().close();
    R[tag] = m;
    await ctx.close();
  }
  // 2. keyboard: Tab through <main>, record order and that each focused element shows a visible focus indicator
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    await p.goto(LOCAL + '/pricing', { waitUntil: 'networkidle' }); await dismiss(p);
    await p.focus('main h1').catch(() => {}); await p.evaluate(() => { const h = document.querySelector('main #pr-h1'); h.setAttribute('tabindex', '-1'); h.focus(); });
    const order = [];
    for (let i = 0; i < 12; i++) {
      await p.keyboard.press('Tab');
      const f = await p.evaluate(() => { const e = document.activeElement; if (!e.closest('main')) return null; const cs = getComputedStyle(e); return { t: e.textContent.trim().replace(/\s+/g, ' '), href: e.getAttribute('href'), ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none' }; });
      if (!f) break; order.push(f);
    }
    R.keyboard = order; await ctx.close(); }
  // 3. reduced motion and no JavaScript
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(LOCAL + '/pricing', { waitUntil: 'networkidle' }); await settle(p);
    R.reducedMotion = await p.evaluate(() => ({ tag: getComputedStyle(document.querySelector('.pr-tag-w')).transitionDuration, step: getComputedStyle(document.querySelector('.pr-s-n')).transitionDuration, running: document.getAnimations().filter((a) => a.playState === 'running').length, hiddenSections: [...document.querySelectorAll('main section')].filter((s) => getComputedStyle(s).opacity === '0').length }));
    await ctx.close(); }
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(LOCAL + '/pricing', { waitUntil: 'load' }); await p.waitForTimeout(400);
    R.noJs = await p.evaluate(() => ({ words: document.querySelector('main').innerText.trim().split(/\s+/).length, sections: document.querySelectorAll('main section').length, invisible: [...document.querySelectorAll('main section *')].filter((e) => e.offsetParent && getComputedStyle(e).opacity === '0').length }));
    await p.screenshot({ path: `${OUT}/desktop-1440-nojs-full.png`, fullPage: true }); await ctx.close(); }
  // 4. metadata vs live, and sibling pages: local <main> text and head must equal the live site (built from the same main)
  { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    const head = async (u) => { await p.goto(u, { waitUntil: 'domcontentloaded' }); return p.evaluate(() => ({ title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href, robots: document.querySelector('meta[name=robots]')?.content, ogTitle: document.querySelector('meta[property="og:title"]')?.content, main: (document.querySelector('main')?.innerText || '').replace(/\s+/g, ' ').trim() })); };
    const la = await head(LOCAL + '/pricing'), lv = await head(LIVE + '/pricing');
    R.pricingHead = { same: ['title', 'desc', 'canonical', 'robots', 'ogTitle'].every((k) => la[k] === lv[k]), local: { ...la, main: undefined } };
    R.siblings = [];
    for (const s of SIBLINGS) { const a = await head(LOCAL + s), c = await head(LIVE + s); R.siblings.push({ path: s, headSame: ['title', 'desc', 'canonical', 'robots', 'ogTitle'].every((k) => a[k] === c[k]), mainSame: a.main === c.main }); }
    await ctx.close(); }
  fs.writeFileSync(`${OUT}/checks.json`, JSON.stringify(R, null, 1));
  for (const [k, v] of Object.entries(R)) {
    if (v && v.secs) console.log(k, JSON.stringify({ st: v.status, over: v.overflowX, fold: v.ctaInFold, hero: v.heroCtas, close: v.closeCtas, h1: v.h1Count, small: v.small, words: v.words, mockWords: v.mockWords, textEqual: v.textEqual, err: v.consoleErrors, failed: v.failed, secs: v.secs.map((s, i) => s.h + '/' + (v.mockSecs[i] || {}).h).join(' ') }));
    else console.log(k, JSON.stringify(v));
  }
  await b.close();
})();
