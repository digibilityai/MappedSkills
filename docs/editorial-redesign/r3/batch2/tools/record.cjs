// Short screen recordings of the real pages playing (Playwright video, webm). Motion and reduced-motion pairs. Usage: BASE=... node record.cjs
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500'; const OUT = path.join(__dirname, '../recordings');
const REPORT = '/research/marketing-measurement-gap-indian-business-websites';
const glide = async (p, y, ms = 900) => { const y0 = await p.evaluate(() => scrollY); const n = Math.max(8, Math.round(ms / 30)); for (let i = 1; i <= n; i++) { const k = i / n; const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; await p.evaluate((v) => window.scrollTo(0, v), y0 + (y - y0) * e); await p.waitForTimeout(ms / n); } };
const yOf = (p, sel, off = 120) => p.evaluate(([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY - o, [sel, off]);
const scenes = {
  blog: async (p) => { await p.goto(BASE + '/blog', { waitUntil: 'load' }); await p.waitForTimeout(2600); await glide(p, await yOf(p, '.ed-grid, .ed-band .ed-card', 200), 1100); await p.waitForTimeout(1800); await glide(p, await yOf(p, '.ed-close', 300), 1100); await p.waitForTimeout(1200); },
  press: async (p) => { await p.goto(BASE + '/press', { waitUntil: 'load' }); await p.waitForTimeout(2600); await glide(p, await yOf(p, '.ed-figs', 220), 1100); await p.waitForTimeout(2000); await glide(p, await yOf(p, '.ed-close', 300), 1100); await p.waitForTimeout(1000); },
  research: async (p) => { await p.goto(BASE + '/research', { waitUntil: 'load' }); await p.waitForTimeout(2600); await glide(p, await yOf(p, '#rs-finding .ed-ef', 200), 1200); await p.waitForTimeout(2200); await glide(p, await yOf(p, '.ed-multi', 160), 1200); await p.waitForTimeout(2200); await glide(p, await yOf(p, '.ed-bars', 220), 1000); await p.waitForTimeout(2200); },
};
const reportDesktop = async (p) => { await p.goto(BASE + REPORT, { waitUntil: 'load' }); await p.waitForTimeout(2200); await glide(p, await yOf(p, '.rr-read', 100), 1000); await p.waitForTimeout(1500); await p.click('.ed-otp-d a[href="#methodology"]'); await p.waitForTimeout(1800); };
const reportMobile = async (p) => { await p.goto(BASE + REPORT, { waitUntil: 'load' }); await p.waitForTimeout(1800); await glide(p, await yOf(p, '.ed-otp-m', 90), 1000); await p.waitForTimeout(800); await p.focus('.ed-otp-m summary'); await p.keyboard.press('Enter'); await p.waitForTimeout(1600); await p.click('.ed-otp-m a[href="#limitations"]'); await p.waitForTimeout(1800); };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  // consent is answered once in an unrecorded context so the recordings show the pages, not the banner (the banner is checked separately)
  const pre = await b.newContext(); const pp = await pre.newPage(); await pp.goto(BASE + '/about', { waitUntil: 'load' }); await pp.waitForTimeout(2500);
  const rj = pp.getByRole('button', { name: /reject analytics/i }); if (await rj.count()) await rj.click(); await pp.waitForTimeout(500);
  const state = await pre.storageState(); await pre.close();
  const jobs = [];
  for (const k of Object.keys(scenes)) for (const reduce of [false, true]) jobs.push([`${k}-desktop-${reduce ? 'reduced-motion' : 'motion'}`, 1280, 800, reduce, scenes[k]]);
  jobs.push(['research-phone-motion', 390, 844, false, scenes.research]);
  jobs.push(['research-phone-reduced-motion', 390, 844, true, scenes.research]);
  jobs.push(['report-contents-desktop', 1280, 800, false, reportDesktop]);
  jobs.push(['report-contents-phone-keyboard', 390, 844, false, reportMobile]);
  for (const [name, w, h, reduce, fn] of jobs) {
    if (process.env.JOB && !name.includes(process.env.JOB)) continue;
    const dir = fs.mkdtempSync('/tmp/rec-');
    const ctx = await b.newContext({ storageState: state, viewport: { width: w, height: h }, reducedMotion: reduce ? 'reduce' : 'no-preference', recordVideo: { dir, size: { width: w, height: h } } });
    const p = await ctx.newPage();
    try { await fn(p); } catch (e) { console.log(name, 'ERR', String(e).slice(0, 100)); }
    const v = p.video(); await ctx.close(); const f = await v.path(); fs.copyFileSync(f, path.join(OUT, name + '.webm')); console.log(name, (fs.statSync(path.join(OUT, name + '.webm')).size / 1e6).toFixed(1) + ' MB');
  }
  await b.close();
})();
