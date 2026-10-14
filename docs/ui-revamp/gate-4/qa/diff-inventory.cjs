#!/usr/bin/env node
/**
 * GATE 4 · B0 — compare two inventories (inventory.cjs) facet by facet.
 *
 * usage: node diff-inventory.cjs --baseline <a.json> --candidate <b.json> [--ignore header,footer,fontPreloads,...]
 *
 * Exit 0 when every compared facet is identical, 1 otherwise. `--ignore` names
 * facets a batch is EXPECTED to change and which are reported separately as
 * "expected change" rather than skipped silently. B1 (chrome only), for example,
 * runs with `--ignore header,footer,chrome,buttons-chrome` and must still show
 * `main` text, `main` links, headings in `main`, metadata, JSON-LD and forms identical.
 *
 * Facets: status · title · canonical · robots · lang · meta · jsonld ·
 * headings-main · headings-chrome · text-main · links-main · header · footer ·
 * ctas-main · ctas-chrome · forms · buttons-main · buttons-chrome · analyticsAttrs ·
 * fontPreloads · motion · scripts · chrome · consentBootstrap · sentinels
 */
const fs = require('fs');
const { args } = require('./lib.cjs');

const a = args();
const ignore = new Set((a.ignore || '').split(',').filter(Boolean));
const A = JSON.parse(fs.readFileSync(a.baseline, 'utf8'));
const B = JSON.parse(fs.readFileSync(a.candidate, 'utf8'));

const inMain = (arr) => arr.filter((s) => s.startsWith('main '));
const notMain = (arr) => arr.filter((s) => !s.startsWith('main '));
const facets = (r) => ({
  status: r.status,
  title: r.title,
  canonical: r.canonical,
  robots: r.robots,
  lang: r.lang,
  meta: r.meta,
  jsonld: r.jsonld,
  'headings-main': inMain(r.headings),
  'headings-chrome': notMain(r.headings),
  'text-main': r.text.main,
  'links-main': r.links.main,
  header: { text: r.text.header, links: r.links.header },
  footer: { text: r.text.footer, links: r.links.footer },
  'ctas-main': inMain(r.ctas),
  'ctas-chrome': notMain(r.ctas),
  forms: r.forms,
  'buttons-main': inMain(r.buttons),
  'buttons-chrome': notMain(r.buttons),
  analyticsAttrs: r.analyticsAttrs,
  fontPreloads: r.fontPreloads,
  motion: r.motion,
  scripts: r.scripts,
  chrome: r.chrome,
  consentBootstrap: r.consentBootstrap,
  sentinels: r.sentinels || null,
});

function delta(x, y) {
  if (Array.isArray(x) && Array.isArray(y) && x.every((v) => typeof v === 'string') && y.every((v) => typeof v === 'string')) {
    const count = (arr) => arr.reduce((m, v) => m.set(v, (m.get(v) || 0) + 1), new Map());
    const cx = count(x), cy = count(y);
    const removed = [...cx].filter(([k, n]) => (cy.get(k) || 0) < n).map(([k]) => k);
    const added = [...cy].filter(([k, n]) => (cx.get(k) || 0) < n).map(([k]) => k);
    if (!removed.length && !added.length) return 'same items, different order';
    return { removed: removed.slice(0, 8), added: added.slice(0, 8), more: Math.max(0, removed.length + added.length - 16) };
  }
  return { baseline: JSON.stringify(x)?.slice(0, 300), candidate: JSON.stringify(y)?.slice(0, 300) };
}

let diffs = 0, same = 0, expected = 0;
const byId = new Map(B.routes.map((r) => [r.id, r]));
const lines = [];
for (const ra of A.routes) {
  const rb = byId.get(ra.id);
  if (!rb) { lines.push(`MISSING  ${ra.id}: target absent from candidate`); diffs++; continue; }
  const fa = facets(ra), fb = facets(rb);
  for (const k of Object.keys(fa)) {
    const eq = JSON.stringify(fa[k]) === JSON.stringify(fb[k]);
    if (eq) { same++; continue; }
    if (ignore.has(k)) { expected++; lines.push(`EXPECTED ${ra.id} · ${k}: ${JSON.stringify(delta(fa[k], fb[k]))}`); continue; }
    diffs++;
    lines.push(`DIFF     ${ra.id} · ${k}: ${JSON.stringify(delta(fa[k], fb[k]))}`);
  }
}
for (const id of byId.keys()) if (!A.routes.some((r) => r.id === id)) { lines.push(`NEW      ${id}: target absent from baseline`); diffs++; }

console.log(`# Inventory diff\nbaseline:  ${a.baseline} (${A.meta.at})\ncandidate: ${a.candidate} (${B.meta.at})\nignored as expected: ${[...ignore].join(', ') || 'none'}\n`);
console.log(lines.join('\n') || '(no differences)');
console.log(`\nSUMMARY: ${same} facets identical · ${diffs} unexpected differences · ${expected} expected differences`);
process.exit(diffs ? 1 : 0);
