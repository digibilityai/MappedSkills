#!/usr/bin/env node
/**
 * GATE 4 — per-route transfer report, baseline vs candidate (served bytes; no browser).
 * usage: node bytes.cjs --plain <A> --cand-plain <B> [--only ids] [--out file.json]
 * Per plain target: HTML (raw and gzip), the route's stylesheet bytes (raw and gzip; every <link rel=stylesheet>),
 * script bytes referenced by the document (raw), and font preloads (count and bytes).
 */
const fs = require('fs');
const zlib = require('zlib');
const { args, selectTargets } = require('./lib.cjs');

const a = args();
const cache = new Map();
async function size(url) {
  if (!cache.has(url)) cache.set(url, fetch(url).then(async (r) => { const b = Buffer.from(await r.arrayBuffer()); return { raw: b.length, gz: zlib.gzipSync(b).length }; }));
  return cache.get(url);
}
async function measure(base, path) {
  const html = await (await fetch(base + path)).text();
  const head = html;
  const css = [...head.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  const js = [...new Set([...head.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
  const fonts = [...head.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.woff2)"/g)].map((m) => m[1]);
  const sum = async (list) => { let raw = 0, gz = 0; for (const u of list) { const s = await size(base + u); raw += s.raw; gz += s.gz; } return { raw, gz, n: list.length }; };
  return { html: { raw: Buffer.byteLength(html), gz: zlib.gzipSync(html).length }, css: await sum(css), js: await sum(js), fonts: await sum(fonts) };
}
(async () => {
  const rows = [];
  for (const t of selectTargets(a).filter((x) => x.server === 'plain')) {
    const [A, B] = [await measure(a.plain, t.url), await measure(a['cand-plain'], t.url)];
    rows.push({ id: t.id, A, B });
  }
  const kb = (n) => (n / 1024).toFixed(1);
  console.log('target | HTML gz KB (A→B) | CSS gz KB (A→B) | JS raw KB (A→B) | font preloads (A→B, KB)');
  for (const r of rows) console.log(`${r.id} | ${kb(r.A.html.gz)}→${kb(r.B.html.gz)} | ${kb(r.A.css.gz)}→${kb(r.B.css.gz)} | ${kb(r.A.js.raw)}→${kb(r.B.js.raw)} | ${r.A.fonts.n}→${r.B.fonts.n} (${kb(r.A.fonts.raw)}→${kb(r.B.fonts.raw)})`);
  if (a.out) fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/bytes.cjs', baseline: a.plain, candidate: a['cand-plain'], at: new Date().toISOString() }, rows }, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
