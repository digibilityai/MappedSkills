#!/usr/bin/env node
/**
 * GATE 4 · B0 — run the whole site-wide suite into one evidence folder.
 *
 * usage: node run-all.cjs --plain <url> --fixture <url> --out-dir <dir> [--engines chromium,webkit,firefox] [--shots] [--expect-dc all]
 *
 * Chromium: inventory, chrome consistency, layout (7 widths + text spacing + zoom), a11y, analytics/forms,
 * and SHA-256 hashes of every <main> capture (the live two-build comparison is pixel-main.cjs).
 * WebKit / Firefox (engine proxies, NOT real devices): layout at all 7 widths, a11y.
 * Every step's stdout is saved beside its JSON. A failing step does not stop the run; the exit
 * code is 1 if any step exited non-zero.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { args } = require('./lib.cjs');

const a = args();
const dir = path.resolve(a['out-dir'] || 'b0-run');
fs.mkdirSync(dir, { recursive: true });
const engines = (a.engines || 'chromium').split(',');
const common = ['--plain', a.plain, '--fixture', a.fixture];
const steps = [
  ['inventory', 'inventory.cjs', [...common, '--out', `${dir}/inventory.json`]],
  // --expect-dc: '/,/services,/seo' (B0 state, the default) or 'all' (from Gate 4 B1, DEC-037).
  ['chrome-consistency', 'chrome-consistency.cjs', ['--inventory', `${dir}/inventory.json`, ...(a['expect-dc'] ? ['--expect-dc', a['expect-dc']] : [])]],
  ['layout-chromium', 'layout.cjs', [...common, '--out', `${dir}/layout-chromium.json`, ...(a.shots ? ['--shots', `${dir}/screens`] : [])]],
  ['a11y-chromium', 'a11y.cjs', [...common, '--out', `${dir}/a11y-chromium.json`]],
  ['analytics-forms', 'analytics-forms.cjs', ['--plain', a.plain, '--out', `${dir}/analytics-forms.json`]],
  ['pixel-main-hashes', 'pixel-main.cjs', [...common, '--hashes', `${dir}/pixel-main-hashes.json`]],
  ...engines.filter((e) => e !== 'chromium').flatMap((e) => [
    [`layout-${e}`, 'layout.cjs', [...common, '--engine', e, '--out', `${dir}/layout-${e}.json`]],
    [`a11y-${e}`, 'a11y.cjs', [...common, '--engine', e, '--out', `${dir}/a11y-${e}.json`]],
  ]),
];
let failed = 0;
const log = [];
for (const [name, script, argv] of steps) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...argv], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  fs.writeFileSync(`${dir}/${name}.txt`, (r.stdout || '') + (r.status ? `\n[stderr]\n${(r.stderr || '').slice(-4000)}` : ''));
  const line = `${r.status === 0 ? 'OK  ' : 'EXIT ' + r.status} ${name} (${Math.round((Date.now() - t0) / 1000)}s) ${(r.stdout || '').trim().split('\n').pop()}`;
  if (r.status !== 0) failed++;
  log.push(line); console.log(line);
}
fs.writeFileSync(`${dir}/run-summary.txt`, `${new Date().toISOString()}\nplain=${a.plain} fixture=${a.fixture} engines=${engines}\n\n${log.join('\n')}\n`);
process.exit(failed ? 1 : 0);
