// Route verification (DEC-112): readability, clipping, overflow, images, anchors, console, hydration, type floor, contrast. No height scoring.
// Usage: BASE=http://localhost:3500 node verify.cjs  (writes ../data/verify-<port>.json)
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const articles = ['7-proven-strategies-of-digital-marketing-for-real-estate-developers', 'building-an-email-list', 'content-marketing-services-in-pune', 'facebook-advertising-agency-pune', 'importance-of-content-writing', 'performance-marketing-vs-digital-marketing', 'seo-company-in-pune'];
const routes = process.env.ROUTES ? process.env.ROUTES.split(',') : ['/blog', ...articles.map((a) => '/blog/' + a), '/press', '/press/marketing-measurement-gap-indian-websites', '/research', '/research/industry-benchmarks', '/research/marketing-measurement-gap-indian-business-websites'];
const sizes = [[1440, 900], [820, 1180], [390, 844], [360, 800]];
const probe = () => {
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const parse = (s) => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0.9) return [c.r, c.g, c.b]; } return [255, 255, 255]; };
  const o = { small: [], contrast: [], clip: [], nested: 0 };
  const main = document.querySelector('main') || document.body;
  main.querySelectorAll('*').forEach((e) => {
    const cs = getComputedStyle(e);
    if ((cs.overflow === 'hidden' || cs.overflowY === 'hidden') && e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 2 && e.clientWidth > 2 && !e.closest('svg') && !/^(IMG|CANVAS)$/.test(e.tagName)) o.clip.push(e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0]);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 2) o.nested++;
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1) || e.offsetParent === null || e.closest('svg')) return;
    const fs = parseFloat(cs.fontSize); const label = cs.textTransform === 'uppercase'; if (fs < (label ? 12 : 14) - 0.01) o.small.push((label ? 'L ' : 'N ') + e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0] + ' ' + fs.toFixed(1));
    const fg = parse(cs.color); if (!fg || e.closest('[aria-hidden="true"]')) return; const bg = bgOf(e); const L1 = lum([fg.r, fg.g, fg.b]), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const large = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700); if (ratio < (large ? 3 : 4.5)) o.contrast.push((e.textContent.trim().slice(0, 24)) + ' ' + ratio.toFixed(2));
  });
  const ids = new Set([...document.querySelectorAll('[id]')].map((e) => e.id));
  o.dead = [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1)).filter((x) => x && !ids.has(x)))];
  o.h1 = document.querySelectorAll('h1').length; o.ox = document.documentElement.scrollWidth > innerWidth;
  o.imgBad = [...document.images].filter((i) => i.complete && !i.naturalWidth).length;
  o.imgSkew = [...document.images].filter((i) => i.naturalWidth && i.clientWidth > 40 && !/contain|scale-down/.test(getComputedStyle(i).objectFit) && Math.abs(i.naturalWidth / i.naturalHeight - i.clientWidth / i.clientHeight) / (i.naturalWidth / i.naturalHeight) > 0.03).map((i) => i.src.slice(-40));
  o.headSkip = (() => { let prev = 0, skip = 0; main.querySelectorAll('h1,h2,h3,h4').forEach((h) => { const l = +h.tagName[1]; if (prev && l > prev + 1) skip++; prev = l; }); return skip; })();
  o.hrefs = [...main.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => /^\//.test(h) && !/^\/#/.test(h));
  return o;
};
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const res = {}; const hrefs = new Set();
  for (const [w, h] of sizes) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    for (const r of routes) {
      const p = await ctx.newPage(); const msgs = [];
      p.on('console', (m) => ['error', 'warning'].includes(m.type()) && !/preloaded using link preload/.test(m.text()) && msgs.push(m.type() + ': ' + m.text().slice(0, 120)));
      p.on('pageerror', (e) => msgs.push('pageerror ' + String(e).slice(0, 120)));
      await p.goto(BASE + r, { waitUntil: 'load', timeout: 60000 }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.waitForTimeout(600);
      const H = await p.evaluate(() => document.documentElement.scrollHeight).catch(async () => { await p.waitForTimeout(1500); return p.evaluate(() => document.documentElement.scrollHeight); });
      for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(60); }
      await p.waitForTimeout(900); await p.evaluate(() => window.scrollTo(0, 0));
      let o; for (let t = 0; t < 3 && !o; t++) { try { o = await p.evaluate(probe); } catch (e) { await p.waitForTimeout(1500); } } if (!o) throw new Error('probe failed ' + r); o.msgs = msgs; o.hydration = msgs.filter((m) => /hydrat|did not match/i.test(m)).length; o.docH = H; o.hrefs.forEach((x) => hrefs.add(x)); delete o.hrefs;
      (res[r] = res[r] || {})[w] = o;
      const bad = o.ox || o.h1 !== 1 || o.imgBad || o.imgSkew.length || o.dead.length || msgs.length || o.small.length || o.contrast.length || o.clip.length || o.nested || o.headSkip;
      console.log(bad ? 'CHECK' : 'ok   ', w, r.slice(0, 64), bad ? JSON.stringify({ ox: o.ox, h1: o.h1, bad: o.imgBad, skew: o.imgSkew.length, dead: o.dead, msgs: msgs.slice(0, 2), small: [...new Set(o.small)].slice(0, 3), contrast: o.contrast.slice(0, 2), clip: [...new Set(o.clip)].slice(0, 3), nested: o.nested, skip: o.headSkip }) : '');
      await p.close();
    }
    await ctx.close();
  }
  // CTA and link targets resolve
  const bad = []; for (const h of [...hrefs]) { const r = await fetch(BASE + h.split('#')[0], { redirect: 'manual' }).catch(() => null); if (!r || r.status >= 400) bad.push(h + ' ' + (r && r.status)); }
  res.__links = { checked: hrefs.size, bad };
  console.log('links checked', hrefs.size, 'bad', JSON.stringify(bad));
  fs.writeFileSync(path.join(__dirname, `../data/verify-${new URL(BASE).port}.json`), JSON.stringify(res));
  await b.close();
})();
