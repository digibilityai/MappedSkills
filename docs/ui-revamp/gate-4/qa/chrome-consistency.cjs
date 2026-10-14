#!/usr/bin/env node
/**
 * GATE 4 · B0 — CHECK 4: navigation and footer consistency, from an inventory (inventory.cjs).
 *
 * usage: node chrome-consistency.cjs --inventory <inv.json> [--expect-dc /,/services,/seo | all]
 *
 * Groups every target by its header signature and its footer signature (link multiset + visible text)
 * and checks that:
 *   - every target has exactly one chrome header and one chrome footer, and a skip link to #main;
 *   - there are exactly as many header/footer variants as chrome systems in use (today: 2, Direction C and legacy);
 *   - the Direction C chrome appears on exactly the expected routes (B0: `/`, `/services`, `/seo`;
 *     after B1: `all`), and the legacy chrome on all others;
 *   - Direction C and legacy chrome link to the same set of destinations (labels may differ: DEC-036 D4).
 * Exit 1 on any failure.
 */
const fs = require('fs');
const { args } = require('./lib.cjs');

const a = args();
const inv = JSON.parse(fs.readFileSync(a.inventory, 'utf8'));
const expectDc = a['expect-dc'] === 'all' ? 'all' : (a['expect-dc'] || '/,/services,/seo').split(',');
let fail = 0;
const out = (ok, m) => { if (!ok) fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${m}`); };

const groups = { header: new Map(), footer: new Map() };
for (const r of inv.routes) {
  const sys = (r.chrome.header?.cls || '').includes('dc') ? 'direction-c' : 'legacy';
  out(!!r.chrome.header && !!r.chrome.footer, `${r.id}: one chrome header and one chrome footer`);
  out(r.chrome.skipLink, `${r.id}: skip link to #main`);
  const isDcRoute = expectDc === 'all' || (expectDc.includes(r.url) && r.status === 200);
  out((sys === 'direction-c') === isDcRoute, `${r.id}: renders ${sys} chrome (expected ${isDcRoute ? 'direction-c' : 'legacy'})`);
  for (const k of ['header', 'footer']) {
    const sig = JSON.stringify([r.links[k], r.text[k]]);
    if (!groups[k].has(sig)) groups[k].set(sig, { sys, ids: [] });
    groups[k].get(sig).ids.push(r.id);
  }
}
for (const k of ['header', 'footer']) {
  const g = [...groups[k].values()];
  const systems = new Set(g.map((x) => x.sys));
  out(g.length === systems.size, `${k}: ${g.length} distinct variant(s) for ${systems.size} chrome system(s) — ${g.map((x) => `${x.sys}×${x.ids.length}`).join(', ')}`);
  if (g.length !== systems.size) for (const x of g) console.log(`     ${x.sys}: ${x.ids.join(', ')}`);
}
// Destination parity between the two chrome systems (labels may differ, DEC-036 D4). Compared on
// header ∪ footer because the legacy desktop Services list is not in the DOM until its dropdown is
// opened, while the inventory is taken with every menu closed.
const dest = (sys) => {
  const r = inv.routes.find((x) => ((x.chrome.header?.cls || '').includes('dc') ? 'direction-c' : 'legacy') === sys && x.status === 200);
  return r ? [...new Set([...r.links.header, ...r.links.footer].map((l) => l.split(' :: ')[0]))].sort() : null;
};
{
  const d = dest('direction-c'), l = dest('legacy');
  if (!d || !l) console.log('NOTE only one chrome system present; parity not applicable');
  else {
    const onlyD = d.filter((x) => !l.includes(x)), onlyL = l.filter((x) => !d.includes(x));
    out(!onlyD.length && !onlyL.length, `chrome (header ∪ footer): Direction C and legacy link to the same ${d.length} destinations${onlyD.length || onlyL.length ? ` (only DC: ${onlyD.join(' ') || '-'}; only legacy: ${onlyL.join(' ') || '-'})` : ''}`);
  }
}
console.log(`\nSUMMARY: ${fail} failures`);
process.exit(fail ? 1 : 0);
