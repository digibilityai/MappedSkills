// Verification of the case showcase rollout (DEC-116): five pages at 1440, 820, 390, 360. Usage: BASE=http://localhost:3500 MODE=local|production node verify-showcase.cjs
const { chromium } = require('../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500'; const MODE = process.env.MODE || 'local';
const C = (name, slug, fig, inc) => ({ name, href: '/portfolio/' + slug, fig, includes: inc });
const EXPECT = { local: {
  '/google-ads': { id: 'ga3-work-h', alias: 'ga41-more-h', viewAll: '/work?service=google-ads', cards: [C('AnybodyCanBake', 'google-ads-for-online-courses', '5.24×', ['return on advertising spend', 'Revenue return is not profit']), C('Meticulous Business Plan', 'meticulous-business-plan-google-ads', '27', ['signed engagements', 'Apr 2026 – Sep 2026']), C('Bakersville', 'bakersville-google-ads', '4,324', ['products sold', 'Nov 2025 – Aug 2026'])] },
  '/who-we-help/d2c': { id: 'd2c1-wk-h', alias: 'client-work', viewAll: '/work?industry=ecommerce-retail', cards: [C('Klenzmo', 'klenzmo-meta-ads', '3,957', ['products sold']), C('Bakersville', 'bakersville-google-ads', '4,324', ['products sold']), C('Advit Prints', 'advit-prints-meta-ads', '874', ['attributed orders'])] },
  '/who-we-help/education': { id: 'edr2-wk-h', alias: 'client-work', viewAll: '/work?industry=education', cards: [C('AnybodyCanBake', 'google-ads-for-online-courses', '5.24×', ['Revenue return is not profit']), C('EKoching', 'ekoching-google-ads', '178', ['attributed paid enrolments']), C('Bakedemy', 'bakedemy-meta-ads', '738', ['paid enrolments', 'Oct 2020 – Mar 2024'])] },
  '/who-we-help/real-estate': { id: 'rer2-wk-h', alias: 'client-work', viewAll: '/work?industry=real-estate', cards: [C('Om Sai Developer', 'om-sai-developer-meta-ads', '₹2,786 → ₹271', ['90.27% reduction']), C('HutnHomes', 'hutnhomes-meta-ads', '329', ['site visits', 'has not been confirmed'])] },
  '/who-we-help/enquiry-led-businesses': { id: 'e11-more-h', viewAll: '/work', cards: [C('Meticulous Business Plan', 'meticulous-business-plan-google-ads', '27', ['signed engagements']), C('Phoenix Laundry', 'phoenix-laundry-google-ads', '640', ['new customers']), C('Talreja & Talreja', 'talreja-talreja-google-ads', '19', ['signed engagements'])] },
} };
const sizes = [[1440, 900], [820, 1180], [390, 844], [360, 800]];
const probe = (expect) => {
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const parse = (s) => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0.9) return [c.r, c.g, c.b]; } return [255, 255, 255]; };
  const secs = [...document.querySelectorAll('[data-cs]')]; const s = secs[0]; const o = { sections: secs.length, problems: [] };
  if (!s) { o.problems.push('no showcase'); return o; }
  const cards = [...s.querySelectorAll('.cs-card')]; o.cards = cards.length; o.h = Math.round(s.getBoundingClientRect().height);
  o.ox = document.documentElement.scrollWidth > innerWidth;
  o.headingId = !!document.getElementById(expect.id) && s.getAttribute('aria-labelledby') === expect.id; o.alias = expect.alias ? !!document.getElementById(expect.alias) : true;
  const va = s.querySelector('.cs-all'); o.viewAll = va && va.getAttribute('href'); o.viewAllLabel = va && va.textContent.trim();
  o.list = cards.map((c, i) => {
    const e = expect.cards[i] || {}; const link = c.querySelectorAll('a'); const img = c.querySelector('img'); const text = c.innerText.replace(/\s+/g, ' ');
    return { name: c.querySelector('.cs-name').textContent.trim(), href: c.querySelector('.cs-cta').getAttribute('href'), links: link.length, fig: (c.querySelector('.cs-fig') || {}).textContent, text,
      img: img ? { ok: img.complete && img.naturalWidth > 0, alt: img.alt, skew: Math.abs(img.naturalWidth / img.naturalHeight - img.clientWidth / img.clientHeight) / (img.naturalWidth / img.naturalHeight) > 0.02 } : null,
      okName: e.name === undefined || c.querySelector('.cs-name').textContent.trim() === e.name, okHref: e.href === undefined || c.querySelector('.cs-cta').getAttribute('href') === e.href, okFig: e.fig === undefined || (c.querySelector('.cs-fig') || {}).textContent === e.fig, okIncl: (e.includes || []).every((t) => text.includes(t)) };
  });
  const track = s.querySelector('.cs-track'); const bt = s.querySelector('.cs-btns'); o.track = { scrollable: track.scrollWidth > track.clientWidth + 2, cols: getComputedStyle(track).gridTemplateColumns.split(' ').length, display: getComputedStyle(track).display, btns: bt ? getComputedStyle(bt).display : 'none' };
  // text floor and contrast inside the section
  o.small = []; o.contrast = [];
  s.querySelectorAll('*').forEach((e) => { if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1) || e.offsetParent === null) return; const cs = getComputedStyle(e); const fs = parseFloat(cs.fontSize); const label = cs.textTransform === 'uppercase'; if (fs < (label ? 12 : 14) - 0.01) o.small.push(e.className + ' ' + fs);
    const fg = parse(cs.color); if (!fg || e.closest('.cs-sr')) return; const bg = bgOf(e); const L1 = lum([fg.r, fg.g, fg.b]), L2 = lum(bg); const r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); const large = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700); if (r < (large ? 3 : 4.5)) o.contrast.push((e.textContent.trim().slice(0, 20)) + ' ' + r.toFixed(2)); });
  o.clipped = [...s.querySelectorAll('*')].filter((e) => { const c = getComputedStyle(e); return (c.overflowY === 'hidden') && e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 2 && !e.closest('svg') && !/^(IMG)$/.test(e.tagName); }).length;
  o.nestedV = [...s.querySelectorAll('*')].filter((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 2).length;
  o.leftover = document.querySelectorAll('.rcc, .ga3-work, .d2c1-wk, .edr2-wk, .rer2-wk').length;
  o.visibleConceptual = /conceptual|recreated|illustrative/i.test(s.innerText);
  return o;
};
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {}; let flagged = 0;
  for (const [w, h] of sizes) for (const [route, expect] of Object.entries(EXPECT.local)) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500 }); const p = await ctx.newPage(); const errs = [];
    p.on('console', (m) => ['error', 'warning'].includes(m.type()) && !/preloaded using link preload|Failed to load resource/.test(m.text()) && errs.push(m.text().slice(0, 140))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
    await p.goto(BASE + route, { waitUntil: 'load' }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
    const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(60); }
    await p.evaluate(() => { const s = document.querySelector('[data-cs]'); window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - 100, behavior: 'instant' }); }); await p.waitForTimeout(1500);
    await p.evaluate(async () => { const t = document.querySelector('.cs-track'); t.scrollLeft = t.scrollWidth; await new Promise((r) => setTimeout(r, 400)); t.scrollLeft = 0; await new Promise((r) => setTimeout(r, 300)); }); await p.waitForTimeout(1200);
    const o = await p.evaluate(probe, expect); o.errs = errs;
    const exp = MODE === 'local' ? expect : null;
    const bad = [];
    if (o.sections !== 1) bad.push('sections ' + o.sections);
    if (MODE === 'local') { if (o.cards !== expect.cards.length) bad.push('cards ' + o.cards); if (o.viewAll !== expect.viewAll) bad.push('viewAll ' + o.viewAll); if (!o.headingId) bad.push('heading id'); if (!o.alias) bad.push('alias'); for (const c of o.list || []) { if (!c.okName) bad.push('name ' + c.name); if (!c.okHref) bad.push('href ' + c.href); if (!c.okFig) bad.push('fig ' + c.name + ' ' + c.fig); if (!c.okIncl) bad.push('text ' + c.name); } }
    for (const c of o.list || []) { if (/We do not publish figures/.test(c.text)) bad.push('withheld line in local final-case preview ' + c.name); if (c.links !== 1) bad.push('links ' + c.name + ' ' + c.links); if (c.img && (!c.img.ok || c.img.skew || !c.img.alt)) bad.push('image ' + c.name + JSON.stringify(c.img)); }
    if (o.leftover) bad.push('old bespoke case section still present'); if (o.ox) bad.push('overflow'); if (o.small.length) bad.push('small ' + o.small.slice(0, 2)); if (o.contrast.length) bad.push('contrast ' + o.contrast.slice(0, 2)); if (o.clipped || o.nestedV) bad.push('clip/nested'); if (o.visibleConceptual) bad.push('conceptual text'); if (errs.length) bad.push('console ' + errs.slice(0, 2).join('|'));
    const desktop = w > 1080; if (desktop && o.track.btns !== 'none') bad.push('buttons on desktop'); if (!desktop && o.cards > 1 && !o.track.scrollable) bad.push('row not scrollable');
    if (desktop && MODE === 'local' && o.track.cols !== expect.cards.length) bad.push('columns ' + o.track.cols);
    // mobile behaviour: next, previous, status, keyboard, reduced motion
    const mob = {};
    if (!desktop && o.cards > 1) {
      const before = await p.evaluate(() => document.querySelector('.cs-track').scrollLeft);
      await p.getByRole('button', { name: 'Next case study' }).click(); await p.waitForTimeout(900);
      mob.afterNext = await p.evaluate(() => ({ x: Math.round(document.querySelector('.cs-track').scrollLeft), status: document.querySelector('.cs-btns [role=status]').textContent.trim(), prevEnabled: !document.querySelector('[aria-label="Previous case study"]').disabled }));
      await p.getByRole('button', { name: 'Previous case study' }).click(); await p.waitForTimeout(900);
      mob.afterPrev = await p.evaluate(() => ({ x: Math.round(document.querySelector('.cs-track').scrollLeft), status: document.querySelector('.cs-btns [role=status]').textContent.trim() }));
      await p.locator('[aria-label="Next case study"]').focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(900); mob.keyboard = await p.evaluate(() => ({ x: Math.round(document.querySelector('.cs-track').scrollLeft), ring: getComputedStyle(document.activeElement).outlineWidth, status: document.querySelector('.cs-btns [role=status]').textContent.trim() }));
      if (!(mob.afterNext.x > before) || !/Case 2 of/.test(mob.afterNext.status) || !mob.afterNext.prevEnabled) bad.push('next button ' + JSON.stringify(mob.afterNext)); if (mob.afterPrev.x > 2 || !/Case 1 of/.test(mob.afterPrev.status)) bad.push('previous button ' + JSON.stringify(mob.afterPrev)); if (!(mob.keyboard.x > 0) || parseFloat(mob.keyboard.ring) < 2) bad.push('keyboard ' + JSON.stringify(mob.keyboard));
    }
    o.mob = mob;
    out[`${w}${route}`] = o; if (bad.length) flagged++;
    console.log(bad.length ? 'CHECK' : 'ok   ', w, route.padEnd(18), 'sections', o.sections, 'cards', o.cards, 'h', o.h, 'cols', o.track && o.track.cols, 'viewAll', o.viewAll, bad.length ? JSON.stringify(bad) : '');
    await ctx.close();
  }
  fs.writeFileSync(path.join(__dirname, `../data/verify-rollout-${MODE}.json`), JSON.stringify(out, null, 1)); console.log('flagged', flagged); await b.close();
})();
