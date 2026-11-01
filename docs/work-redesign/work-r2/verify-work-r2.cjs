// Browser verification of the /work R2 implementation against a running preview. node verify-work-r2.cjs [base]
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const BASE = process.argv[2] || 'http://localhost:3500';
const R = []; const ok = (c, m) => { R.push(`${c ? 'PASS' : 'FAIL'} ${m}`); };
const cards = (p) => p.evaluate(() => [...document.querySelectorAll('.wl')].map((a) => ({ n: a.querySelector('.wl-n').textContent, href: a.querySelector('.wl-n a').getAttribute('href'), links: a.querySelectorAll('a').length, sv: (a.querySelector('.wl-sv') || {}).textContent || null, tx: a.querySelector('.wl-tx').textContent })));
const cnt = (p) => p.locator('.wk-count').innerText().then((t) => t.replace(/\s+/g, ' ').trim());
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const [w, h, cols] of [[1440, 900, 2], [820, 1180, 2], [390, 844, 1], [360, 800, 1]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    for (const url of ['/work', '/work/page/2']) {
      const p = await ctx.newPage(); const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 100))); p.on('pageerror', (e) => errs.push(String(e)));
      await p.goto(BASE + url, { waitUntil: 'networkidle' }); const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.waitForTimeout(800); const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(80); } await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
      const c = await cards(p); const want = url === '/work' ? 12 : 8;
      ok(c.length === want, `${w} ${url}: ${c.length} cards (want ${want})`);
      ok(c.every((x) => x.links === 1), `${w} ${url}: one link per card`);
      const g = await p.evaluate(() => { const els = [...document.querySelectorAll('.wl')]; const tops = new Set(els.slice(0, 4).map((e) => Math.round(e.getBoundingClientRect().top))); const imgs = [...document.querySelectorAll('.wl-im img')].map((i) => { const r = i.getBoundingClientRect(); return Math.abs(r.width / r.height - i.naturalWidth / i.naturalHeight) / (i.naturalWidth / i.naturalHeight); }); const fs = [...document.querySelectorAll('.wl-tx,.wl-sv,.wl-n,.wk-count')].map((e) => parseFloat(getComputedStyle(e).fontSize)); return { cols: tops.size === 2 ? 2 : tops.size === 4 ? 1 : tops.size, maxDist: Math.max(...imgs), minFont: Math.min(...fs), ox: document.documentElement.scrollWidth > innerWidth, broken: [...document.querySelectorAll('.wl-im img')].filter((i) => !i.naturalWidth).length, elig: document.querySelectorAll('.wl-eyebrow,.rs-wc,.wk-mosaic,.wk-route').length, rm: /Read (the )?(case|[A-Za-z ]+case)/i.test(document.querySelector('main').innerText) }; });
      ok(g.cols === cols, `${w} ${url}: ${g.cols} column(s) (want ${cols})`); ok(g.maxDist < 0.012, `${w} ${url}: images whole (max ratio drift ${(g.maxDist * 100).toFixed(2)}%)`);
      ok(g.minFont >= 14, `${w} ${url}: min font ${g.minFont}px`); ok(!g.ox && !errs.length && !g.broken, `${w} ${url}: no overflow, ${errs.length} console errors, ${g.broken} broken images`);
      ok(g.elig === 0 && !g.rm, `${w} ${url}: no eyebrow, logo strip, route panel or "Read case study" text`);
      await p.close();
    }
    await ctx.close();
  }
  // behaviour at 1440 and 390
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 100)));
    const go = async (u) => { await p.goto(BASE + u, { waitUntil: 'networkidle' }); const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {}); await p.waitForTimeout(1200); };
    await go('/work'); ok((await cnt(p)).startsWith('20 case studies') && (await cnt(p)).includes('Showing 1–12'), `${w}: count line "${await cnt(p)}"`);
    await p.selectOption('#wk-service', 'seo'); await p.waitForTimeout(900);
    let c = await cards(p); ok(c.length === 2 && c.every((x) => x.sv === 'SEO'), `${w}: Service = SEO -> ${c.map((x) => x.n).join(', ')}`); ok((await cnt(p)).includes('2 of 20 case studies match'), `${w}: count "${await cnt(p)}"`); ok(p.url().endsWith('?service=seo'), `${w}: URL ${p.url().replace(BASE, '')}`);
    await p.selectOption('#wk-industry', 'education'); await p.waitForTimeout(500); c = await cards(p); ok(c.length === 1 && c[0].n === 'AnybodyCanBake' && c[0].sv === 'SEO', `${w}: SEO + Education = ${c.map((x) => x.n)}`); ok(/industry=education/.test(p.url()) && /service=seo/.test(p.url()), `${w}: combined URL ${p.url().replace(BASE, '')}`);
    await p.selectOption('#wk-industry', 'real-estate'); await p.waitForTimeout(500); c = await cards(p); ok(c.length === 0 && (await p.locator('.wk-nomatch-h').count()) === 1, `${w}: SEO + Real estate = empty state`);
    await p.click('.wk-nomatch .wk-clear'); await p.waitForTimeout(500); c = await cards(p); ok(c.length === 12 && !/\?/.test(p.url()), `${w}: "Show all" restores 12 cards and a clean URL`);
    await p.fill('#wk-q', 'wanderlooms'); await p.waitForTimeout(900); c = await cards(p); ok(c.length === 1 && c[0].n === 'Wanderlooms' && c[0].sv === 'Meta Ads', `${w}: search wanderlooms -> ${c.map((x) => `${x.n} (${x.sv})`)}`);
    await p.fill('#wk-q', 'zzzzqq'); await p.waitForTimeout(700); ok((await p.locator('.wk-nomatch-h').count()) === 1 && (await cnt(p)).includes('0 of 20'), `${w}: empty search "${await cnt(p)}"`);
    await p.click('.wk-ctl .wk-clear'); await p.waitForTimeout(500); ok((await cards(p)).length === 12 && (await p.inputValue('#wk-q')) === '', `${w}: Clear filters resets the controls`);
    await p.selectOption('#wk-industry', 'education'); await p.waitForTimeout(700); c = await cards(p); ok(c.length === 7 && c.some((x) => x.n === 'ClassPe' && x.sv === null), `${w}: Education -> ${c.length} cards; ClassPe has no service line`);
    // shareable URL, back / forward
    const shared = '/work?service=google-ads&industry=education'; await go(shared); c = await cards(p); ok(c.length >= 1 && c.every((x) => x.href), `${w}: shared link restores (${c.map((x) => x.n).join(', ')})`);
    await Promise.all([p.waitForURL(/\/portfolio\//), p.locator('.wl-n a').first().click()]); await p.waitForLoadState('networkidle'); ok(/\/portfolio\//.test(p.url()), `${w}: card link opens ${p.url().replace(BASE, '')}`);
    await p.goBack(); await p.waitForURL(/\/work/); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1800); c = await cards(p); ok(/service=google-ads/.test(p.url()) && c.length >= 1 && c.length < 12, `${w}: back restores the filtered view (${c.length} cards, ${p.url().replace(BASE, '')})`);
    await p.goForward(); await p.waitForURL(/\/portfolio\//); await p.waitForLoadState('networkidle'); ok(/\/portfolio\//.test(p.url()), `${w}: forward returns to the case`);
    // page 2 and a filter that starts on page 2
    await go('/work'); await Promise.all([p.waitForURL(/\/work\/page\/2/), p.locator('.wk-pager a', { hasText: 'Next' }).click()]); await p.waitForLoadState('networkidle'); await p.waitForTimeout(500); ok(/\/work\/page\/2/.test(p.url()) && (await cards(p)).length === 8 && (await cnt(p)).includes('Showing 13–20'), `${w}: Next -> ${p.url().replace(BASE, '')}, ${(await cards(p)).length} cards, "${await cnt(p)}"`);
    await Promise.all([p.waitForURL((u) => /\/work$/.test(u.pathname)), p.locator('.wk-pager a', { hasText: 'Previous' }).click()]); await p.waitForLoadState('networkidle'); await p.waitForTimeout(500); ok(/\/work$/.test(p.url()) && (await cards(p)).length === 12, `${w}: Previous -> page 1`);
    await go('/work/page/2?service=social-media-ads'); c = await cards(p); ok(c.length === 8 && c.some((x) => x.n === 'Wanderlooms'), `${w}: filter arriving on page 2 (${c.length} results)`);
    // keyboard focus
    await go('/work'); await p.keyboard.press('Tab'); let guard = 0; while (guard++ < 40) { const on = await p.evaluate(() => document.activeElement && document.activeElement.closest('.wl-n') ? 1 : 0); if (on) break; await p.keyboard.press('Tab'); }
    const f = await p.evaluate(() => { const a = document.activeElement; const o = getComputedStyle(a, '::after'); return { is: !!a.closest('.wl-n'), style: o.outlineStyle, width: o.outlineWidth, colour: o.outlineColor }; });
    ok(f.is && f.style === 'solid' && f.width === '3px', `${w}: keyboard focus on a card link shows a ${f.width} ${f.style} outline (${f.colour})`);
    if (w === 1440) { await p.screenshot({ path: path.join(__dirname, 'screenshots', 'focus-1440.png'), clip: { x: 0, y: 300, width: 1440, height: 700 } }); const hv = await p.evaluate(() => { const a = document.querySelector('.wl'); return getComputedStyle(a.querySelector('.wl-im img')).transform; }); ok(hv === 'none', `${w}: image has no transform (no zoom)`); await p.hover('.wl .wl-n a'); await p.waitForTimeout(300); ok((await p.evaluate(() => getComputedStyle(document.querySelector('.wl-n a')).textDecorationColor)).includes('255, 91, 4') && (await p.evaluate(() => getComputedStyle(document.querySelector('.wl-im img')).transform)) === 'none', `${w}: hover underlines the name in tangerine, image unchanged`); }
    ok(!errs.length, `${w}: no console errors across the run (${errs.length})`);
    await ctx.close();
  }
  console.log(R.join('\n')); console.log('FAIL count', R.filter((r) => r.startsWith('FAIL')).length); await b.close();
})();
