#!/usr/bin/env node
/**
 * GATE 4 · B3 — reproducible before/after captures for the three capability pages, plus the Direction C references.
 * (Committed beside its images so the comparison is reproducible from the repository: PROC-E1A-1.)
 *
 * capture: node b3-visual-captures.cjs capture --label before|after|ref|narrow --base <plain url> --out <dir>
 *          before/after: /ai-seo, /lead-generation, /conversion-optimization
 *          ref:          /seo, /google-ads, /social-media-ads (first screen and close only)
 *          narrow:       the three B3 routes, FULL PAGE at 320×568 and 360×800 (overflow / typography / spacing review)
 * page:    node b3-visual-captures.cjs page --out <dir>   → <dir>/index.html
 *
 * Views: 390×844 (isMobile, touch), 768×1024, 1440×900. Chromium proxy only (not a device). Consent "denied", reduced
 * motion (the composed state), fonts awaited, every non-local request blocked (lib.cjs). JPEG q60.
 * Shots per route and width:
 *   1-first : the first screen
 *   2-mid-a / 3-mid-b : the section whose h2 has the given text, scrolled to the top. The same heading text exists in the
 *                       before and the after build, so both captures show the same content (not the same pixel offset)
 *   4-close : the last <main> section scrolled to the top, so the close → footer transition is visible
 * Read-only: nothing is submitted or stored.
 */
const fs = require('fs');
const path = require('path');
const { launch, context, open } = require('./lib.cjs');

const mode = process.argv[2];
const a = Object.fromEntries(process.argv.slice(3).reduce((acc, v, i, arr) => (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));

const B3 = [
  ['ai-seo', '/ai-seo', 'We measured ourselves first, and published the result', 'What we will not tell you about AI search'],
  ['lead-generation', '/lead-generation', 'What counts as a qualified enquiry here', 'What we will not promise'],
  ['conversion-optimization', '/conversion-optimization', 'The four places demand gets lost', 'What we can test, and what we cannot'],
];
const REF = [['seo', '/seo'], ['google-ads', '/google-ads'], ['social-media-ads', '/social-media-ads']];
const VIEWS = [[390, 844], [768, 1024], [1440, 900]];

async function toHeading(page, text) {
  const ok = await page.evaluate((t) => {
    const h = [...document.querySelectorAll('main h2')].find((x) => x.textContent.replace(/\s+/g, ' ').trim() === t);
    if (!h) return false;
    (h.closest('section') || h).scrollIntoView({ block: 'start' });
    return true;
  }, text);
  if (!ok) throw new Error(`heading not found: ${text}`);
  await page.waitForTimeout(250);
}

async function narrow(dir) {
  const browser = await launch('chromium');
  for (const [id, url] of B3) for (const [w, h] of [[320, 568], [360, 800]]) {
    const ctx = await context(browser, { width: w, height: h, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await open(page, a.base + url);
    const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    await page.screenshot({ path: path.join(dir, `${id}-${w}-full.jpg`), type: 'jpeg', quality: 60, fullPage: true });
    console.log(`${url} @${w}: scrollWidth ${sw[0]} / clientWidth ${sw[1]}${sw[0] > sw[1] ? '  PAGE SCROLLS HORIZONTALLY' : ''}`);
    await ctx.close();
  }
  await browser.close();
}

async function capture() {
  const dir = path.join(a.out, a.label);
  fs.mkdirSync(dir, { recursive: true });
  if (a.label === 'narrow') return narrow(dir);
  const set = a.label === 'ref' ? REF.map(([id, url]) => [id, url]) : B3;
  const browser = await launch('chromium');
  for (const [id, url, midA, midB] of set) {
    for (const [w, h] of VIEWS) {
      const ctx = await context(browser, { width: w, height: h, reducedMotion: 'reduce', ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
      const page = await ctx.newPage();
      await open(page, a.base + url);
      const shot = (n) => page.screenshot({ path: path.join(dir, `${id}-${w}-${n}.jpg`), type: 'jpeg', quality: 60 });
      await shot('1-first');
      if (midA) { await toHeading(page, midA); await shot('2-mid-a'); }
      if (midB) { await toHeading(page, midB); await shot('3-mid-b'); }
      await page.evaluate(() => { const s = [...document.querySelectorAll('main > *, main section')].pop(); if (s) s.scrollIntoView({ block: 'start' }); });
      await page.waitForTimeout(250);
      await shot('4-close');
      await ctx.close();
    }
  }
  await browser.close();
  console.log(`captured ${set.length} routes × ${VIEWS.length} widths → ${dir}`);
}

function page() {
  const ref = { 'ai-seo': 'seo', 'lead-generation': 'google-ads', 'conversion-optimization': 'social-media-ads' };
  const shots = ['1-first', '2-mid-a', '3-mid-b', '4-close'];
  const names = { '1-first': 'First screen', '2-mid-a': 'Middle section A', '3-mid-b': 'Middle section B', '4-close': 'Close → footer' };
  const img = (rel, alt) => (fs.existsSync(path.join(a.out, rel)) ? `<a href="${rel}"><img loading="lazy" src="${rel}" alt="${alt}"></a>` : '<span class="na">—</span>');
  let body = '';
  for (const [id, url, midA, midB] of B3) {
    body += `<h2>${url}</h2><p class="meta">Middle A: “${midA}”. Middle B: “${midB}”. Reference column: the approved / B2 route <code>/${ref[id]}</code> (first screen and close only).</p>`;
    for (const [w] of VIEWS) {
      body += `<h3>${w}px</h3><table><tr><th></th><th>Before (legacy body)</th><th>After (Direction C)</th><th>Reference /${ref[id]}</th></tr>`;
      for (const s of shots) {
        const r = s === '1-first' || s === '4-close' ? img(`ref/${ref[id]}-${w}-${s}.jpg`, `/${ref[id]} ${w} ${names[s]}`) : '<span class="na">—</span>';
        body += `<tr><th>${names[s]}</th><td>${img(`before/${id}-${w}-${s}.jpg`, `${url} before ${w} ${names[s]}`)}</td><td>${img(`after/${id}-${w}-${s}.jpg`, `${url} after ${w} ${names[s]}`)}</td><td>${r}</td></tr>`;
      }
      body += '</table>';
    }
    body += `<h3>320px and 360px, full page (after)</h3><table><tr><th>320 × 568</th><th>360 × 800</th></tr><tr><td>${img(`narrow/${id}-320-full.jpg`, `${url} after 320 full page`)}</td><td>${img(`narrow/${id}-360-full.jpg`, `${url} after 360 full page`)}</td></tr></table>`;
  }
  fs.writeFileSync(path.join(a.out, 'index.html'), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gate 4 B3 visual comparison</title>
<style>body{font:14px/1.5 system-ui,sans-serif;margin:16px;background:#fff;color:#111}h2{margin-top:40px;border-top:2px solid #111;padding-top:12px}table{border-collapse:collapse;margin-bottom:12px}th,td{border:1px solid #ccc;padding:4px;vertical-align:top;text-align:left}th{background:#f4f4f4;max-width:9em}img{width:300px;display:block}.na{color:#888}.meta{color:#444;max-width:80ch}</style>
<h1>Gate 4 · B3 — capability pages, before / after (Chromium proxy, not a device)</h1>
<p class="meta">Reproduce: <code>node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs capture --label before|after|ref|narrow --base &lt;url&gt; --out &lt;dir&gt;</code>, then <code>… page --out &lt;dir&gt;</code>. Consent denied, reduced motion, fonts loaded. Middle sections are scrolled to the same heading text in both builds.</p>
${body}</html>`);
  console.log(`wrote ${path.join(a.out, 'index.html')}`);
}

(mode === 'capture' ? capture() : mode === 'page' ? Promise.resolve(page()) : Promise.reject(new Error('mode: capture | page'))).catch((e) => { console.error(e); process.exit(1); });
