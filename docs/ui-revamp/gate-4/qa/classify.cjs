#!/usr/bin/env node
/**
 * GATE 4 · B0 — classify a candidate run's findings against the baseline run.
 *
 * usage: node classify.cjs --baseline <findings.json> --candidate <findings.json> [--known known-defects.json] [--expect pattern,pattern]
 *
 *   KNOWN     fingerprint present in the baseline (pre-existing behaviour). Tagged with the
 *             register ID from known-defects.json when one of its patterns matches.
 *   NEW       fingerprint absent from the baseline → a regression until explained. Exit 1.
 *   EXPECTED  NEW, but matches an `--expect` pattern the batch declared in advance (e.g. B1
 *             expects "pinned|*|*|header.sticky" to RESOLVE and nothing to appear).
 *   RESOLVED  in the baseline, absent from the candidate. Reported, never an error by itself;
 *             a batch report must say whether each resolution was intended.
 *
 * Patterns are fingerprints `check|target|width|key` where any part may be `*` and
 * `key` may end with `*` (prefix match).
 */
const fs = require('fs');
const path = require('path');
const { args } = require('./lib.cjs');

const a = args();
const load = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const B = load(a.baseline), C = load(a.candidate);
const known = load(a.known || path.join(__dirname, 'known-defects.json')).defects;
const expect = (a.expect || '').split(',').filter(Boolean);

const match = (pattern, fp) => {
  const p = pattern.split('|'), f = fp.split('|');
  return p.every((part, i) => part === '*' || part === f[i] || (part.endsWith('*') && (f[i] || '').startsWith(part.slice(0, -1))));
};
const tag = (fp) => known.filter((d) => d.patterns.some((p) => match(p, fp))).map((d) => d.id);

const base = new Set(B.findings.map((f) => f.fp));
const cand = new Set(C.findings.map((f) => f.fp));
const rows = { KNOWN: [], NEW: [], EXPECTED: [], RESOLVED: [] };
for (const f of C.findings) {
  if (base.has(f.fp)) rows.KNOWN.push({ ...f, ids: tag(f.fp) });
  else if (expect.some((p) => match(p, f.fp))) rows.EXPECTED.push(f);
  else rows.NEW.push({ ...f, ids: tag(f.fp) });
}
for (const f of B.findings) if (!cand.has(f.fp)) rows.RESOLVED.push({ ...f, ids: tag(f.fp) });

console.log(`# Findings classification (${C.meta.tool}, engine ${C.meta.engine})\nbaseline:  ${a.baseline}\ncandidate: ${a.candidate}\n`);
for (const k of ['NEW', 'EXPECTED', 'RESOLVED']) {
  console.log(`## ${k} (${rows[k].length})`);
  for (const f of rows[k].slice(0, 200)) console.log(`- ${f.fp}${f.ids && f.ids.length ? ' [' + f.ids.join(',') + ']' : ''} — ${f.detail}`);
}
const byId = {};
for (const f of rows.KNOWN) for (const id of f.ids.length ? f.ids : ['UNREGISTERED']) byId[id] = (byId[id] || 0) + 1;
console.log(`## KNOWN (${rows.KNOWN.length}) by register ID: ${JSON.stringify(byId)}`);
console.log(`\nSUMMARY: NEW ${rows.NEW.length} · EXPECTED ${rows.EXPECTED.length} · RESOLVED ${rows.RESOLVED.length} · KNOWN ${rows.KNOWN.length}`);
process.exit(rows.NEW.length ? 1 : 0);
