// Quality checks for the proposal previews (revision 2). No height or fold scoring. Usage: node qualitycheck.cjs [shots]
const { chromium } = require('../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const pages = ['blog', 'press', 'research']; const sizes = [[1440, 900], [820, 1180], [390, 844], [360, 800]];
const probe = () => {
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const parse = (s) => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0.9) return [c.r, c.g, c.b]; } return [255, 255, 255]; };
  const out = { font: { minBody: 99, minLabel: 99, under12: 0 }, line: { maxCh: 0, long: [] }, contrast: { min: 99, fails: [] }, h: {}, sections: [], motion: {}, actions: {} };
  const textEls = [...document.querySelectorAll('main *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1) && !['SCRIPT', 'STYLE'].includes(e.tagName) && e.offsetParent !== null);
  for (const e of textEls) {
    const cs = getComputedStyle(e); const fs = parseFloat(cs.fontSize); const txt = e.textContent.trim();
    if (fs < 12) out.font.under12++;
    const body = ['P', 'LI', 'DD'].includes(e.tagName) && txt.length > 60;
    if (body) out.font.minBody = Math.min(out.font.minBody, fs); else out.font.minLabel = Math.min(out.font.minLabel, fs);
    if (e.tagName === 'P' && txt.length > 120) { const ch = e.clientWidth / (fs * 0.58); if (ch > out.line.maxCh) out.line.maxCh = Math.round(ch); if (ch > 78) out.line.long.push(txt.slice(0, 30) + ' ~' + Math.round(ch)); }
    const fg = parse(cs.color); if (!fg) continue; const bg = bgOf(e); const L1 = lum([fg.r, fg.g, fg.b]), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const large = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700); const need = large ? 3 : 4.5;
    if (ratio < out.contrast.min) out.contrast.min = Math.round(ratio * 100) / 100;
    if (ratio < need) out.contrast.fails.push(txt.slice(0, 28) + ' ' + ratio.toFixed(2) + ' (' + fs + 'px)');
  }
  const hs = [...document.querySelectorAll('main h1, main h2, main h3')]; let prev = 0, skip = 0; const sizes = {};
  hs.forEach((h) => { const l = +h.tagName[1]; if (prev && l > prev + 1) skip++; prev = l; (sizes[l] = sizes[l] || []).push(parseFloat(getComputedStyle(h).fontSize)); });
  out.h = { h1: document.querySelectorAll('main h1').length, skip, h1Size: Math.max(...(sizes[1] || [0])), h2Min: Math.min(...(sizes[2] || [0])), h3Max: Math.max(...(sizes[3] || [0])) };
  document.querySelectorAll('main > section').forEach((s) => {
    const cs = getComputedStyle(s); const pb = parseFloat(cs.paddingBottom), pt = parseFloat(cs.paddingTop);
    const w = (s.innerText || '').trim().split(/\s+/).length; const btn = s.querySelectorAll('.btn').length;
    const grid = s.querySelector('.grid,.multi,.ev,.three,.big2,.scene,.hg,.two'); const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 1;
    out.sections.push({ label: ((s.querySelector('h1,h2') || {}).textContent || '').trim().slice(0, 40), h: Math.round(s.getBoundingClientRect().height), pt: Math.round(pt), pb: Math.round(pb), words: w, cols, btn, hasHeading: !!s.querySelector('h1,h2') });
  });
  out.ox = document.documentElement.scrollWidth > innerWidth; out.gutter = Math.round(parseFloat(getComputedStyle(document.querySelector('.w')).paddingLeft));
  out.imgs = { bad: [...document.images].filter((i) => i.complete && !i.naturalWidth).length, skew: [...document.images].filter((i) => i.naturalWidth && i.clientWidth > 40 && Math.abs(i.naturalWidth / i.naturalHeight - i.clientWidth / i.clientHeight) / (i.naturalWidth / i.naturalHeight) > 0.03).length };
  return out;
};
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const res = {};
  for (const [w, h] of sizes) for (const pg of pages) {
    // motion on: scroll through, then check nothing is left hidden; record the longest animation
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' }); const p = await ctx.newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 100))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 100)));
    await p.goto(`http://localhost:3601/${pg}.html`, { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 300) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(900);
    const motion = await p.evaluate(() => { const ms = (s) => Math.max(...s.split(',').map((x) => (x.trim().endsWith('ms') ? parseFloat(x) : parseFloat(x) * 1000))); let max = 0; document.querySelectorAll('main *').forEach((e) => { const c = getComputedStyle(e); max = Math.max(max, ms(c.transitionDuration) + ms(c.transitionDelay.split(',')[0]) * 0, ms(c.animationDuration)); }); const hidden = [...document.querySelectorAll('[data-m]')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99 || (getComputedStyle(e).transform !== 'none' && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(getComputedStyle(e).transform))).length; return { maxMs: Math.round(max), left: hidden }; });
    await p.evaluate(() => window.scrollTo(0, 0));
    const r = await p.evaluate(probe); r.motion = motion; r.errs = errs;
    // keyboard: every focusable shows a visible ring
    let bad = 0, n = 0; await p.keyboard.press('Tab');
    for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); const o = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { ring: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 }; }); if (o) { n++; if (!o.ring) bad++; } }
    r.focus = { tabbed: n, noRing: bad };
    await ctx.close();
    // reduced motion: same content, nothing animates
    const ctx2 = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p2 = await ctx2.newPage();
    await p2.goto(`http://localhost:3601/${pg}.html`, { waitUntil: 'networkidle' });
    r.reduced = await p2.evaluate(() => { const ms = (s) => Math.max(...s.split(',').map((x) => (x.trim().endsWith('ms') ? parseFloat(x) : parseFloat(x) * 1000))); let max = 0; document.querySelectorAll('main *').forEach((e) => { const c = getComputedStyle(e); max = Math.max(max, ms(c.transitionDuration), ms(c.animationDuration)); }); const hidden = [...document.querySelectorAll('[data-m]')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length; return { maxMs: Math.round(max), hidden, marked: document.querySelectorAll('.sq.on').length, words: document.querySelector('main').innerText.split(/\s+/).length }; });
    r.words = r.reduced.words;
    if (process.argv[2] === 'shots') { fs.mkdirSync(path.join(__dirname, 'screens'), { recursive: true }); await p2.screenshot({ path: path.join(__dirname, `screens/${pg}-${w}.png`), fullPage: true }); }
    await ctx2.close(); (res[pg] = res[pg] || {})[w] = r;
  }
  fs.writeFileSync(path.join(__dirname, 'data/preview-quality.json'), JSON.stringify(res));
  for (const pg of pages) for (const w of [1440, 820, 390, 360]) { const r = res[pg][w]; console.log(pg, w, 'ox', r.ox, 'imgs', JSON.stringify(r.imgs), 'errs', r.errs.length, '| body>=', r.font.minBody, 'label>=', r.font.minLabel, 'u12', r.font.under12, '| ch', r.line.maxCh, '| contrast', r.contrast.min, r.contrast.fails.slice(0, 2).join(';'), '| h', JSON.stringify(r.h), '| motion', JSON.stringify(r.motion), 'reduced', JSON.stringify({ m: r.reduced.maxMs, h: r.reduced.hidden }), '| focus', JSON.stringify(r.focus)); }
  await b.close();
})();
