// Production-mode check of the five rollout pages (DEC-116): isolated build, CONTENTFUL_CASE_STUDY_NEW_FIELDS=1, preview switches absent, published content only.
// Published today: AnybodyCanBake Google Ads, Om Sai, Ameba, ClassPe, InsurYo (Home Decor is unlisted). BASE=http://localhost:3511
const { chromium } = require('../../../../node_modules/playwright-core');
const E = {
  '/google-ads': { n: 1, hrefs: ['/portfolio/google-ads-for-online-courses'], all: '/work' },
  '/who-we-help/d2c': { n: 0, hrefs: [], fallback: /Wanderlooms/ },
  '/who-we-help/education': { n: 1, hrefs: ['/portfolio/google-ads-for-online-courses', '/portfolio/classpe-social-media-strategy'], all: '/work' },
  '/who-we-help/real-estate': { n: 1, hrefs: ['/portfolio/om-sai-developer-meta-ads'], all: '/work' },
  '/who-we-help/enquiry-led-businesses': { n: 0, hrefs: [] },
};
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); let bad = 0;
  for (const [w, h] of [[1440, 900], [820, 1180], [390, 844], [360, 800]]) for (const [r, e] of Object.entries(E)) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); const errs = [];
    p.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errs.push(m.text().slice(0, 120))); p.on('pageerror', (x) => errs.push(String(x)));
    await p.goto(process.env.BASE + r, { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(50); }
    await p.evaluate(async () => { const t = document.querySelector('.cs-track'); if (t) { t.scrollLeft = t.scrollWidth; await new Promise((r) => setTimeout(r, 400)); t.scrollLeft = 0; } }); await p.waitForTimeout(1200);
    const o = await p.evaluate(() => ({ n: document.querySelectorAll('[data-cs]').length, ox: document.documentElement.scrollWidth > innerWidth, hrefs: [...document.querySelectorAll('.cs-cta')].map((a) => a.getAttribute('href')), all: document.querySelector('.cs-all')?.getAttribute('href'), body: document.body.innerText, old: document.querySelectorAll('.rcc').length, imgOk: [...document.querySelectorAll('.cs-card img')].every((i) => i.complete && i.naturalWidth > 0), h1: document.querySelectorAll('h1').length }));
    const ok = o.n === e.n && JSON.stringify(o.hrefs) === JSON.stringify(e.hrefs) && (!e.all || o.all === e.all) && (!e.fallback || e.fallback.test(o.body)) && !/Home Decor/i.test(o.hrefs.join()) && !o.ox && !errs.length && !o.old && o.imgOk && o.h1 === 1;
    if (!ok) bad++; console.log(ok ? 'ok   ' : 'CHECK', w, r.padEnd(38), JSON.stringify({ n: o.n, hrefs: o.hrefs, all: o.all, ox: o.ox, old: o.old, h1: o.h1 }), errs);
  }
  console.log('flagged', bad); await b.close();
})();
