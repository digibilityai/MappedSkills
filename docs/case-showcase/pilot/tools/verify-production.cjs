// Production-mode check (preview switches off, published Contentful content only): Meta shows the one published Meta case (Om Sai), SEO shows the held Ameba card; no overflow or console errors. BASE=http://localhost:3511
const { chromium } = require('../../../../node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); let bad = 0;
  for (const [w, h] of [[1440, 900], [820, 1180], [390, 844], [360, 800]]) for (const r of ['/social-media-ads', '/seo']) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); const errs = [];
    p.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errs.push(m.text().slice(0, 120))); p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(process.env.BASE + r, { waitUntil: 'networkidle' });
    const o = await p.evaluate(() => ({ n: document.querySelectorAll('[data-cs]').length, ox: document.documentElement.scrollWidth > innerWidth, cards: document.querySelectorAll('.cs-card').length, href: [...document.querySelectorAll('.cs-cta')].map((a) => a.getAttribute('href')).join(','), txt: document.querySelector('[data-cs]')?.innerText.replace(/\s+/g, ' '), all: document.querySelector('.cs-all')?.getAttribute('href'), btns: !!document.querySelector('.cs-btns') }));
    const meta = r === '/social-media-ads' ? o.n === 1 && o.cards === 1 && /Om Sai Developer/.test(o.txt) && o.all === '/work' && !/Klenzmo|AnybodyCanBake/.test(o.txt) && /Read the case study/.test(o.txt) : false;
    const exp = r !== '/seo' ? meta : r === '/seo' ? o.n === 1 && o.cards === 1 && o.all === '/work' && /We do not publish figures/.test(o.txt) && !/\d%/.test(o.txt) && !/Home Decor/i.test(o.txt) : meta;
    const ok = exp && !o.ox && !errs.length; if (!ok) bad++;
    console.log(ok ? 'ok   ' : 'CHECK', w, r, JSON.stringify(o), errs);
  }
  console.log('flagged', bad); await b.close();
})();
