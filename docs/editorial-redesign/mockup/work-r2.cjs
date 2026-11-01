// /work R2 mockups (actual content from the live /work pages), injected into the real page. Proposal only.
const fs = require('node:fs'); const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const BASE = 'http://localhost:3500'; const D = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', n + '.json'), 'utf8'));
const CSS = fs.readFileSync(path.join(__dirname, 'ed.css'), 'utf8') + fs.readFileSync(path.join(__dirname, 'work-r2.css'), 'utf8');
const OUT = path.join(__dirname, 'shots'); const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SERVICE = { 'META ADS': 'Meta Ads', 'GOOGLE ADS': 'Google Ads', SEO: 'SEO' };
const cards = (n) => D('work-' + n).cards.map((c) => { const L = (c.block || '').split('\n').map((s) => s.trim()).filter(Boolean); const first = (L[0] || '').split(' · ')[0]; return { img: c.img, alt: c.alt, name: L[1], sm: L[2], svc: SERVICE[first] || '', svcRaw: first }; });
const CARD = (c) => `<article class="c"><div class="im"><img src="${c.img}" alt="${esc(c.alt || c.name)}"></div><div class="t"><h3><a href="#">${esc(c.name)}</a></h3>${c.svc ? `<p class="sv">${c.svc}</p>` : ''}<p class="sm">${esc(c.sm)}</p></div></article>`;
const bar = (s) => `<form class="bar" role="search" aria-label="Filter case studies"><div class="fld q"><label>Search</label><div class="in${s.q ? ' on' : ''}">${s.q ? esc(s.q) : '<span class="ph">Client, industry or problem</span>'}</div></div><div class="fld"><label>Service</label><div class="in${s.svc ? ' on' : ''}">${s.svc || 'All services'}<span class="chev">▾</span></div></div><div class="fld"><label>Industry</label><div class="in">All industries<span class="chev">▾</span></div></div>${s.svc || s.q ? '<a class="clr" href="#">Clear filters</a>' : '<span></span>'}</form><p class="cnt"><span>${s.count}</span><span>${s.range || ''}</span></p>`;
const top = (s) => `<section class="top"><div class="w"><nav class="crumb" aria-label="Breadcrumb"><a href="#">Home</a><span>Case studies</span></nav><h1>Real work. <em>Judge it for yourself.</em></h1><p class="lede">Explore the challenges businesses brought to us, what we changed, and how we approached the work.</p>${bar(s)}</div></section>`;
const pager = (p) => `<nav class="pg" aria-label="Pages"><a class="${p === 1 ? 'off' : ''}" href="#">← Previous</a><a class="${p === 1 ? 'cur' : ''}" href="#">1</a><a class="${p === 2 ? 'cur' : ''}" href="#">2</a><a class="${p === 2 ? 'off' : ''}" href="#">Next →</a></nav>`;
const close = `<section class="close"><div class="w"><div class="close-g"><h2>Tell us what you’re <br>trying to fix.</h2><div class="cb"><p>Tell us what you’re working towards. We’ll help you figure out where to start.</p><a class="btn" href="#">Contact us</a><a class="btn o" href="#">Request a call</a></div></div></div></section>`;
const wrap = (inner) => `<div class="ed w2">${inner}${close}</div>`;
const p1 = () => wrap(`${top({ count: '<b>20</b> case studies', range: 'Showing 1–12' })}<div class="w"><div class="g2">${cards(1).map(CARD).join('')}</div>${pager(1)}</div>`);
const p2 = () => wrap(`${top({ count: '<b>20</b> case studies', range: 'Showing 13–20' })}<div class="w"><div class="g2">${cards(2).map(CARD).join('')}</div>${pager(2)}</div>`);
const seo = () => { const c = cards(1).concat(cards(2)).filter((x) => x.svcRaw === 'SEO'); return wrap(`${top({ svc: 'SEO', count: `<b>${c.length}</b> of 20 case studies match`, range: '' })}<div class="w"><div class="g2">${c.map(CARD).join('')}</div></div>`); };
const empty = () => wrap(`${top({ q: 'zzzzqq', count: '<b>0</b> of 20 case studies match', range: '' })}<div class="w"><div class="empty" role="status"><h3>No case studies match your search.</h3><p>Try fewer words, or clear the filters to see every case study.</p><a class="btn" href="#">Show all 20 case studies</a></div></div>`);
const PAGES = [['work-r2-page-1', '/work', p1], ['work-r2-filtered-seo', '/work', seo], ['work-r2-page-2', '/work/page/2', p2], ['work-r2-empty-search', '/work', empty]];
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); const rows = [];
  for (const [w, h, tag, k] of [[1440, 900, 'desktop', 1], [390, 844, 'mobile', 2]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: k });
    for (const [name, url, fn] of PAGES) {
      const html = fn(); const p = await ctx.newPage(); await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.evaluate(({ css, html }) => { const st = document.createElement('style'); st.textContent = css + 'nextjs-portal{display:none!important}'; document.head.appendChild(st); document.querySelector('main').innerHTML = html; }, { css: CSS, html });
      await p.mouse.move(2, 2); await p.waitForTimeout(800);
      const m = await p.evaluate(() => { const c = [...document.querySelectorAll('.c')]; const im = c[0] && c[0].querySelector('.im img'); return { h: document.documentElement.scrollHeight, ox: document.documentElement.scrollWidth > innerWidth, broken: [...document.querySelectorAll('.c img')].filter((i) => !i.naturalWidth).length, cardW: c[0] ? Math.round(c[0].getBoundingClientRect().width) : 0, cardH: c[0] ? Math.round(c[0].getBoundingClientRect().height) : 0, imgH: im ? Math.round(im.getBoundingClientRect().height) : 0, firstTop: c[0] ? Math.round(c[0].getBoundingClientRect().top + scrollY) : 0, cols: c[1] ? (Math.abs(c[1].getBoundingClientRect().top - c[0].getBoundingClientRect().top) < 4 ? 2 : 1) : 0 }; });
      await p.screenshot({ path: path.join(OUT, `${name}-${tag}.png`), fullPage: true }); rows.push(`${tag} ${name} ${JSON.stringify(m)}`); await p.close();
    }
    await ctx.close();
  }
  console.log(rows.join('\n')); await b.close();
})();
