#!/usr/bin/env node
/**
 * GATE 4 — lean before/after visual comparison for owner review.
 *
 * capture: node compare-shots.cjs capture --label before|after --plain <url> --fixture <url> --dir <out> [--only ids]
 * page:    node compare-shots.cjs page --dir <out> [--title "…"]   → <out>/index.html
 *
 * Per target: first screen at 1440×900, first screen at 390×844, and 390×844 with the mobile menu open.
 * JPEG q60, consent declined, reduced motion; every non-local request blocked (lib.cjs).
 * Default targets: the B1 six-route review set.
 */
const fs = require('fs');
const path = require('path');
const { args, TARGETS, launch, context } = require('./lib.cjs');

const mode = process.argv[2];
const a = args(process.argv.slice(3));
const SET = ['seo', 'google-ads', 'contact', 'blog-slug~fixture-full', 'privacy-policy', '404'];
const ids = a.only ? a.only : SET;
const VIEWS = [['desktop-1440', 1440, 900, false], ['mobile-390', 390, 844, false], ['mobile-390-menu', 390, 844, true]];

async function capture() {
  const dir = path.join(a.dir, a.label);
  fs.mkdirSync(dir, { recursive: true });
  const browser = await launch('chromium');
  for (const id of ids) {
    const t = TARGETS.find((x) => x.id === id);
    const base = t.server === 'fixture' ? a.fixture : a.plain;
    for (const [view, w, h, menu] of VIEWS) {
      const ctx = await context(browser, { width: w, height: h, reducedMotion: 'reduce', hasTouch: w < 768 });
      const p = await ctx.newPage();
      await p.goto(base + t.url, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      if (menu) {
        const btn = p.locator('header button[aria-expanded][aria-controls]').filter({ visible: true }).last();
        await btn.click(); await p.waitForTimeout(200);
      }
      await p.screenshot({ path: path.join(dir, `${id}-${view}.jpg`), type: 'jpeg', quality: 60 });
      await ctx.close();
    }
    console.log(`captured ${a.label} ${id}`);
  }
  await browser.close();
}

function page() {
  const title = a.title || 'Gate 4 B1 — global chrome, before / after';
  const rows = ids.map((id) => {
    const t = TARGETS.find((x) => x.id === id);
    const cells = VIEWS.map(([v]) => `<tr><th>${v}</th><td><img loading="lazy" src="before/${id}-${v}.jpg" alt="${id} ${v} before"></td><td><img loading="lazy" src="after/${id}-${v}.jpg" alt="${id} ${v} after"></td></tr>`).join('');
    return `<section><h2>${t.template} <small>(${id}; ${t.system}; ${t.cms})</small></h2><table><thead><tr><th>View</th><th>Before (B0 baseline)</th><th>After (candidate)</th></tr></thead><tbody>${cells}</tbody></table></section>`;
  }).join('\n');
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:0 auto;max-width:1500px;padding:16px;background:#f7f3ec;color:#141219}h1{font-size:1.4rem}h2{font-size:1.1rem;margin-top:2.5rem}small{font-weight:400;color:#5e5868}table{border-collapse:collapse;width:100%}th,td{border-top:1px solid #d8d0c4;padding:8px;vertical-align:top;text-align:left}td{width:46%}img{max-width:100%;height:auto;border:1px solid #c9c0b3;background:#fff}</style>
<h1>${title}</h1><p>First screen only; consent declined; reduced motion. "menu" = mobile menu opened. Page bodies are verified separately by pixel hashes and inventories (see the batch report).</p>
${rows}
</html>`;
  fs.writeFileSync(path.join(a.dir, 'index.html'), html);
  console.log(`wrote ${path.join(a.dir, 'index.html')}`);
}

(mode === 'capture' ? capture() : mode === 'page' ? Promise.resolve(page()) : Promise.reject(new Error('mode: capture | page'))).catch((e) => { console.error(e); process.exit(1); });
