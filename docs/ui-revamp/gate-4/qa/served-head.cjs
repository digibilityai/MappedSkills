#!/usr/bin/env node
/**
 * GATE 4 · B1 — compare SERVED (pre-hydration) SEO metadata between two builds, for every target.
 *
 * usage: node served-head.cjs --plain <A> --fixture <A'> --cand-plain <B> --cand-fixture <B'> [--out <file.json>]
 *
 * Why this exists. `inventory.cjs` reads the live DOM after hydration. On dynamically rendered not-found responses
 * the live-DOM <title>/robots/canonical depend on when the route's generateMetadata resolves relative to the
 * not-found boundary (B1 finding OBS-6: the B0 fixture build deterministically shows the route's "… Not Found"
 * metadata while the B0 plain build shows the not-found page's; one B1 run showed the former on the plain build).
 * What a crawler receives is the served HTML, so this check compares exactly that:
 *   HTTP status · every <title> · every <meta name|property> (in order) · every <link rel=canonical|alternate>
 *   · every application/ld+json block — taken from the whole document, in document order.
 * Exit 1 on any difference.
 */
const fs = require('fs');
const { args, selectTargets } = require('./lib.cjs');

const a = args();
const baseOf = (pl, fx, t) => (t.server === 'fixture' ? fx : pl);
const pick = (html) => ({
  titles: [...html.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => m[1]),
  meta: [...html.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"/g)].map((m) => `${m[1]}=${m[2]}`).filter((s) => !s.startsWith('next-size-adjust')),
  links: [...html.matchAll(/<link\s+rel="(canonical|alternate)"[^>]*href="([^"]*)"/g)].map((m) => `${m[1]}=${m[2]}`),
  jsonld: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]),
});

(async () => {
  const rows = [];
  for (const t of selectTargets(a)) {
    const [ra, rb] = await Promise.all([fetch(baseOf(a.plain, a.fixture, t) + t.url), fetch(baseOf(a['cand-plain'], a['cand-fixture'], t) + t.url)]);
    const [ha, hb] = await Promise.all([ra.text(), rb.text()]);
    const A = { status: ra.status, ...pick(ha) }, B = { status: rb.status, ...pick(hb) };
    const diffs = Object.keys(A).filter((k) => JSON.stringify(A[k]) !== JSON.stringify(B[k]));
    rows.push({ id: t.id, same: !diffs.length, diffs, counts: { titles: A.titles.length, meta: A.meta.length, links: A.links.length, jsonld: A.jsonld.length } });
    console.log(`${diffs.length ? 'DIFF' : 'SAME'} ${t.id} — status ${A.status}/${B.status} · titles ${A.titles.length} · meta ${A.meta.length} · canonical/alternate ${A.links.length} · JSON-LD ${A.jsonld.length}${diffs.length ? ' · differs: ' + diffs.join(', ') : ''}`);
  }
  if (a.out) fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/served-head.cjs', baseline: [a.plain, a.fixture], candidate: [a['cand-plain'], a['cand-fixture']], at: new Date().toISOString() }, rows }, null, 1));
  const bad = rows.filter((r) => !r.same).length;
  console.log(`\nSUMMARY: ${rows.length - bad}/${rows.length} targets serve identical status, titles, meta, canonical/alternate links and JSON-LD`);
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
