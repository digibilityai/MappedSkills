#!/usr/bin/env node
/**
 * GATE 4 · B0 — serve a fixture build: `node serve-fixture.cjs <build-dir> <port>`.
 * Starts `next start` for <build-dir> with the Contentful fixture preload and
 * placeholder (non-credential) Contentful variables. Build the same directory
 * with the same environment first (see QA_REGRESSION_RUNBOOK.md, Gate 4 section).
 */
const path = require('path');
const { spawn } = require('child_process');

const [dir, port = '3520'] = process.argv.slice(2);
if (!dir) {
  console.error('usage: node serve-fixture.cjs <build-dir> [port]');
  process.exit(2);
}
const preload = path.join(__dirname, 'preload.cjs');
const nextBin = require.resolve('next/dist/bin/next', { paths: [path.resolve(dir)] });
const child = spawn(process.execPath, [nextBin, 'start', path.resolve(dir), '-p', String(port)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    CONTENTFUL_SPACE_ID: 'fixture',
    CONTENTFUL_ACCESS_TOKEN: 'fixture',
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: '',
    NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --require ${preload}`.trim(),
  },
});
child.on('exit', (code) => process.exit(code ?? 0));
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => child.kill(sig));
