// /services G2 verification (Chromium, playwright-core). Needs the G1 mockup served at MOCK (python3 -m http.server 3198
// --directory docs/services-redesign/g1) and the G2 production build at G2 (next start -p 3199).
// node docs/services-redesign/g2/tools/verify.cjs [outDir]   -> outDir/{g1,g2,compare}/*.png, outDir/results.json
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const MOCK = 'http://127.0.0.1:3198/mockup/index.html';
const G2 = 'http://127.0.0.1:3199';
const LIVE = 'https://mappedskills.com';
const OUT = process.argv[2] || path.join(__dirname, '..', 'screenshots');
for (const d of ['g1', 'g2', 'compare']) fs.mkdirSync(path.join(OUT, d), { recursive: true });
const WIDTHS = [[1440, 900], [820, 1180], [390, 844], [320, 640]];
const SECTIONS = ['sv-h1', 'sv-h-pick', 'sv-h-jr', 'sv-h-scope', 'b-close-h'];
const R = { compare: [], checks: {} };

async function diff(page, fa, fb, name) {
  const a = fs.readFileSync(fa).toString('base64'), c = fs.readFileSync(fb).toString('base64');
  const r = await page.evaluate(async ([a, c]) => {
    const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; });
    const [A, C] = [await load(a), await load(c)]; const w = Math.max(A.width, C.width), h = Math.max(A.height, C.height);
    const cv = (i) => { const k = document.createElement('canvas'); k.width = w; k.height = h; const x = k.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(i, 0, 0); return x.getImageData(0, 0, w, h); };
    const [da, dc] = [cv(A), cv(C)]; let n = 0;
    const out = document.createElement('canvas'); out.width = w * 3 + 40; out.height = h; const ox = out.getContext('2d'); ox.fillStyle = '#888'; ox.fillRect(0, 0, out.width, h);
    const od = ox.createImageData(w, h);
    for (let i = 0; i < da.data.length; i += 4) { const d = Math.max(Math.abs(da.data[i] - dc.data[i]), Math.abs(da.data[i + 1] - dc.data[i + 1]), Math.abs(da.data[i + 2] - dc.data[i + 2])); const bad = d > 8; if (bad) n++; od.data[i] = bad ? 255 : 235; od.data[i + 1] = bad ? 0 : 235; od.data[i + 2] = bad ? 0 : 235; od.data[i + 3] = 255; }
    ox.drawImage(A, 0, 0); ox.putImageData(od, w + 20, 0); ox.drawImage(C, 2 * w + 40, 0);
    return { size: [[A.width, A.height], [C.width, C.height]], pct: +(100 * n / (w * h)).toFixed(3), img: n ? out.toDataURL('image/png').split(',')[1] : null };
  }, [a, c]);
  if (r.img) fs.writeFileSync(path.join(OUT, 'compare', name), Buffer.from(r.img, 'base64'));
  delete r.img; return r;
}

async function settle(p) {
  await p.evaluate(() => document.fonts.ready);
  // the analytics consent banner overlays the page bottom; dismiss it (Reject) so captures show the page itself
  const rej = p.getByRole('button', { name: 'Reject analytics' });
  if (await rej.count()) { await rej.click(); await p.mouse.move(0, 0); }
  await p.waitForTimeout(400);
}

(async () => {
  const b = await chromium.launch();
  const util = await b.newPage();

  /* 1. G1 mockup vs G2, per section, end states (reduced motion), four widths */
  for (const [w, h] of WIDTHS) {
    for (const [tag, url] of [['g1', MOCK + '?banner=0'], ['g2', G2 + '/services']]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
      await p.goto(url, { waitUntil: 'networkidle' }); await settle(p);
      for (const id of SECTIONS) await (await p.$(`section[aria-labelledby="${id}"]`)).screenshot({ path: path.join(OUT, tag, `${w}-${id}.png`) });
      if (w === 1440 || w === 390) await p.screenshot({ path: path.join(OUT, tag, `full-${w}.png`), fullPage: true });
      await ctx.close();
    }
    for (const id of SECTIONS) R.compare.push({ pair: `${w}-${id}`, ...(await diff(util, path.join(OUT, 'g1', `${w}-${id}.png`), path.join(OUT, 'g2', `${w}-${id}.png`), `${w}-${id}.png`)) });
  }
  /* states: selector "cv" chosen, journey at step 1 (initial animated state) */
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    for (const [tag, url] of [['g1', MOCK + '?banner=0&pick=cv&step=1'], ['g2', G2 + '/services']]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      await p.goto(url, { waitUntil: 'networkidle' }); await settle(p);
      if (tag === 'g2') await p.click('.sx-opt:nth-child(2)');
      await p.waitForTimeout(300);
      await (await p.$('section[aria-labelledby="sv-h-pick"]')).screenshot({ path: path.join(OUT, tag, `${w}-state-pick-cv.png`) });
      await (await p.$('section[aria-labelledby="sv-h-jr"]')).screenshot({ path: path.join(OUT, tag, `${w}-state-journey-step1.png`) });
      await ctx.close();
    }
    for (const s of ['state-pick-cv', 'state-journey-step1']) R.compare.push({ pair: `${w}-${s}`, ...(await diff(util, path.join(OUT, 'g1', `${w}-${s}.png`), path.join(OUT, 'g2', `${w}-${s}.png`), `${w}-${s}.png`)) });
  }

  /* 2. behaviour on the G2 build */
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    const errs = [], failed = [];
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('requestfailed', (r) => failed.push(r.url()));
    p.on('response', (r) => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
    await p.goto(G2 + '/services', { waitUntil: 'networkidle' }); await settle(p);
    const C = R.checks;
    C.head = await p.evaluate(() => ({ title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href,
      robots: document.querySelector('meta[name=robots]')?.content, ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return (j['@graph'] || [j]).map((x) => x['@type']).join(','); } catch (e) { return 'err'; } }),
      h1: document.querySelector('h1').innerText.replace(/\s+/g, ' '), h1Count: document.querySelectorAll('h1').length,
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map((e) => e.tagName + ' ' + e.innerText.replace(/\s+/g, ' ')),
      dataLayer: (window.dataLayer || []).map((e) => e && (e.event || (e[0] && e[0] + ':' + e[1]) || Object.keys(e).join('|'))) }));
    C.ctas = await p.$$eval('main .dc-btn', (as) => as.map((a) => [a.className.replace('dc-btn ', ''), a.getAttribute('href'), a.textContent.trim()]));
    C.cards = await p.$$eval('.sx-card', (as) => as.map((a) => [a.getAttribute('href'), a.querySelector('.sx-card-n').textContent]));
    C.micro = await p.evaluate(() => [...new Set(['.sx-opt', '.sx-card', '.sx-g-i', '.sx-sel-unsure', '.sx-n'].map((s) => getComputedStyle(document.querySelector(s)).transitionDuration))]);
    // selector: choose, switch, clear
    const opts = await p.$$('.sx-opt'); const st = () => p.evaluate(() => ({ pressed: [...document.querySelectorAll('.sx-opt')].map((x) => x.getAttribute('aria-pressed')), pick: [...document.querySelectorAll('.sx-g.is-pick')].map((g) => g.id), status: document.querySelector('.sx-sel-out [role=status]').textContent, cardsVisible: [...document.querySelectorAll('.sx-card')].filter((a) => a.getBoundingClientRect().height > 0 && getComputedStyle(a).visibility !== 'hidden' && +getComputedStyle(a).opacity === 1).length }));
    await opts[0].click(); const s1 = await st(); await opts[2].click(); const s2 = await st(); await opts[2].click(); const s3 = await st();
    C.selector = { chooseCapture: s1, switchToMeasure: s2, clear: s3 };
    // keyboard: Space on option 2, Enter on step 2 button keeps focus
    await p.focus('.sx-opt:nth-child(2)'); await p.keyboard.press('Space');
    C.keyboardSelector = await p.evaluate(() => [document.activeElement.className, document.activeElement.getAttribute('aria-pressed')]);
    await p.keyboard.press('Space');
    C.focusRing = await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor; });
    // journey timing
    await p.evaluate(() => { window.__t = []; const r = document.querySelector('.sx-jr-seq'); new MutationObserver(() => window.__t.push([r.getAttribute('data-at'), Math.round(performance.now())])).observe(r, { attributes: true, attributeFilter: ['data-at'] }); window.__a0 = r.getAttribute('data-at'); document.getElementById('sv-h-jr').scrollIntoView(); });
    await p.waitForTimeout(6500);
    C.journey = await p.evaluate(() => { const t = window.__t; return { atStart: window.__a0, steps: t, gaps: t.slice(1).map((x, i) => x[1] - t[i][1]), done: document.querySelector('.sx-jr-seq').hasAttribute('data-done') }; });
    await p.waitForTimeout(3000);
    C.journeyStill = await p.evaluate(() => document.querySelector('.sx-jr-seq').getAttribute('data-at'));
    await p.focus('button.sx-n >> nth=1'); await p.keyboard.press('Enter');
    C.keyboardStep = await p.evaluate(() => ({ focus: document.activeElement.getAttribute('aria-label'), at: document.querySelector('.sx-jr-seq').getAttribute('data-at'), cls: document.querySelector('.sx-jr-seq').className }));
    // tab order
    await p.goto(G2 + '/services', { waitUntil: 'networkidle' }); const order = [];
    for (let i = 0; i < 60; i++) { await p.keyboard.press('Tab'); const o = await p.evaluate(() => { const e = document.activeElement; return e.closest('main') ? (e.className || e.tagName) + ':' + (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30) : null; }); if (o) order.push(o); }
    C.tabOrder = [...new Set(order)];
    // links
    const hrefs = await p.$$eval('main a[href^="/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href').split('#')[0]))]);
    C.links = {}; for (const h of hrefs) C.links[h] = (await p.request.get(G2 + h)).status();
    // axe
    // axe in the settled state: consent dismissed, journey played to its end (dimmed not-yet-reached steps are a
    // transitional state, as on the released pages)
    await settle(p); await p.evaluate(() => document.getElementById('sv-h-jr').scrollIntoView()); await p.waitForTimeout(5200);
    await p.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    for (const [w, h] of [[1440, 900], [390, 844], [320, 640]]) {
      await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(300);
      const a = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }); return r.violations.map((v) => v.id + ': ' + v.nodes.map((n) => n.target.join(' ')).join(' | ')); });
      C['axe-' + w] = a;
    }
    C.consoleErrors = errs; C.failedRequests = failed;
    await ctx.close();
  }
  /* overflow and layout at seven widths */
  R.checks.layout = {};
  for (const w of [1440, 1366, 1280, 1024, 820, 390, 320]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage();
    await p.goto(G2 + '/services', { waitUntil: 'networkidle' }); await settle(p);
    R.checks.layout[w] = await p.evaluate(() => {
      const c = (e) => { const r = e.getBoundingClientRect(); return (r.top + r.bottom) / 2 + scrollY; };
      const lines = [...document.querySelectorAll('#sv-h1 > span')].map(c), st = [...document.querySelectorAll('.sx-route li:not(.sx-route-o) .sx-node')].map(c);
      return { overflowX: document.documentElement.scrollWidth > innerWidth, height: document.documentElement.scrollHeight,
        heroCtaBottom: Math.round(document.querySelector('.sx-hero .dc-btn-primary').getBoundingClientRect().bottom + scrollY),
        stationVsHeadline: innerWidth >= 1081 ? st.map((y, i) => Math.round(y - lines[i])) : null,
        minFont: Math.min(...[...document.querySelectorAll('main *')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).map((e) => parseFloat(getComputedStyle(e).fontSize))) };
    });
    await ctx.close();
  }
  /* reduced motion and no JavaScript */
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(G2 + '/services', { waitUntil: 'networkidle' }); await p.evaluate(() => document.getElementById('sv-h-jr').scrollIntoView()); await p.waitForTimeout(2500);
    R.checks.reducedMotion = await p.evaluate(() => ({ cls: document.querySelector('.sx-jr-seq').className, dimmed: [...document.querySelectorAll('.sx-jr-st li > *')].filter((e) => +getComputedStyle(e).opacity < 1).length }));
    await ctx.close();
    const nj = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const q = await nj.newPage();
    await q.goto(G2 + '/services', { waitUntil: 'load' });
    R.checks.noJs = await q.evaluate(() => ({ selectorHidden: document.querySelector('.sx-sel').hidden, problemLines: [...document.querySelectorAll('.sx-g-p')].filter((e) => getComputedStyle(e).display !== 'none').length,
      cards: [...document.querySelectorAll('.sx-card')].filter((a) => a.getBoundingClientRect().height > 0).map((a) => a.getAttribute('href')), stepSpans: document.querySelectorAll('span.sx-n').length,
      dimmed: [...document.querySelectorAll('.sx-jr-st li > *')].filter((e) => +getComputedStyle(e).opacity < 1).length }));
    await q.screenshot({ path: path.join(OUT, 'g2', 'full-1440-nojs.png'), fullPage: true });
    await nj.close();
  }
  /* regression: <main> of other pages, G2 build vs live production (same code on both) */
  R.regression = [];
  for (const route of ['/', '/how-it-works', '/seo', '/google-ads', '/social-media-ads', '/ai-seo', '/conversion-optimization', '/lead-generation', '/contact']) {
    for (const [tag, base] of [['live', LIVE], ['g2', G2]]) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
      await p.goto(base + route, { waitUntil: 'networkidle' }); await settle(p);
      await (await p.$('main')).screenshot({ path: path.join(OUT, 'compare', `reg-${tag}${route.replace(/\//g, '_') || '_'}.png`) });
      await ctx.close();
    }
    const n = route.replace(/\//g, '_') || '_';
    R.regression.push({ route, ...(await diff(util, path.join(OUT, 'compare', `reg-live${n}.png`), path.join(OUT, 'compare', `reg-g2${n}.png`), `reg-diff${n}.png`)) });
  }
  fs.writeFileSync(path.join(OUT, '..', 'results.json'), JSON.stringify(R, null, 1));
  console.log(JSON.stringify(R, null, 1));
  await b.close();
})();
