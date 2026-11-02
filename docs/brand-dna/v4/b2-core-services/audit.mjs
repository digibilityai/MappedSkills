// Usage: node audit.mjs <baseUrl> [out.json]. Runs audit-page.js on the four B2 pages and /seo at 1440, 1280, 390 and 360.
import { readFileSync, writeFileSync } from 'node:fs';
import { open } from './cdp.mjs';
const [base, outFile] = process.argv.slice(2);
const script = readFileSync(new URL('./audit-page.js', import.meta.url), 'utf8');
const b = await open();
const res = [];
for (const [w, h] of [[1440, 900], [1280, 720], [390, 844], [360, 800]]) {
  await b.size(w, h);
  for (const p of ['/services', '/google-ads', '/social-media-ads', '/pricing', '/seo']) { await b.go(base + p); res.push(JSON.parse(await b.ev(script))); }
}
b.close();
if (outFile) writeFileSync(outFile, JSON.stringify(res, null, 1));
for (const r of res) console.log(`${r.url} @${r.w}: h1=${r.h1} under12=${r.under12.length} under14=${r.under14.length} taps<44=${r.taps.length} splitEm=${r.em.length} dashes=${r.dashes.length} overflow=${r.overflow}`);
