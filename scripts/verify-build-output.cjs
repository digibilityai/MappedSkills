/**
 * Verifies a COMPLETED `next build` before it may be packaged or deployed.
 *
 *   node scripts/verify-build-output.cjs                 # structural checks
 *   node scripts/verify-build-output.cjs --require-gtm   # + container ID compiled in
 *
 * WHY THIS EXISTS. Two production defects shipped from green builds in
 * September 2026, and a green build could not have caught either:
 *
 *   1. ANALYTICS DEAD IN PRODUCTION. `NEXT_PUBLIC_GTM_ID` is inlined at BUILD
 *      time. A build without it compiles the loader against an unresolved
 *      `process.env` reference that is permanently `undefined` in a browser, so
 *      no consent choice can ever load the container — and the build succeeds.
 *      `--require-gtm` refuses a missing or malformed ID and then proves the
 *      literal is actually present in the emitted client JavaScript.
 *
 *   2. EMPTY + DUPLICATE <h1>. Seven commercial routes shipped an empty `<h1>`
 *      and a second `<h1>`. Every prerendered page that a visitor can reach
 *      must carry exactly one `<h1>` with text in it.
 *
 * It also repeats the staged-release checks the accepted manual deployment
 * ran by hand (every `/_next/static/*` referenced by a prerendered page exists;
 * `server.cjs` present; the stale files that forced the swap-not-overwrite rule
 * absent). It reads build output only. It never reads an environment file and
 * never prints a secret: the GTM container ID is a PUBLIC identifier.
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requireGtm = process.argv.includes('--require-gtm');
const appDir = path.join(root, '.next', 'server', 'app');
const staticDir = path.join(root, '.next', 'static');
const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(full)) out.push(full);
  }
  return out;
}

// --- 1. The build exists ---------------------------------------------------
const buildIdFile = path.join(root, '.next', 'BUILD_ID');
if (!fs.existsSync(buildIdFile)) {
  console.error('FAIL: .next/BUILD_ID is missing — run `npm run build` first.');
  process.exit(1);
}
const buildId = fs.readFileSync(buildIdFile, 'utf8').trim();

// --- 2. Runtime entry present, stale files absent ---------------------------
for (const rel of ['server.cjs', 'app.js', 'package.json']) {
  if (!fs.existsSync(path.join(root, rel))) fail(`required runtime file missing: ${rel}`);
}
for (const rel of ['public/robots.txt', 'lib/constants.ts']) {
  if (fs.existsSync(path.join(root, rel))) fail(`stale file present and must not ship: ${rel}`);
}

// --- 3. Exactly one non-empty <h1> on every reachable prerendered page ------
const htmlFiles = walk(appDir, (f) => f.endsWith('.html'));
let checkedPages = 0;
for (const file of htmlFiles) {
  const rel = path.relative(appDir, file);
  if (rel.startsWith('_global-error')) continue;
  const metaFile = file.replace(/\.html$/, '.meta');
  let status = 200;
  if (fs.existsSync(metaFile)) {
    try {
      status = JSON.parse(fs.readFileSync(metaFile, 'utf8')).status ?? 200;
    } catch {
      /* unreadable meta: treat as a normal page and check it */
    }
  }
  // A route that 404s in production (an env-gated internal page) is not a
  // page a visitor reaches, EXCEPT the site's own not-found page, which is.
  if (status === 404 && !rel.startsWith('_not-found')) continue;

  const html = fs.readFileSync(file, 'utf8');
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').trim()
  );
  const empty = h1s.filter((t) => t.length === 0).length;
  if (h1s.length !== 1 || empty > 0) {
    fail(`${rel}: expected exactly one non-empty <h1>, found ${h1s.length} (${empty} empty)`);
  }
  checkedPages += 1;

  // Every hashed static asset this page references must exist in the build.
  // Route-group chunks contain literal parentheses (`app/(pages)/…`), so the
  // match stops only at a quote, whitespace or a JSON-escaping backslash.
  for (const ref of new Set(html.match(/\/_next\/static\/[^"'\s\\]+/g) || [])) {
    const assetRel = decodeURIComponent(ref.replace(/^\/_next\/static\//, '').split('?')[0]);
    const onDisk = path.join(staticDir, assetRel);
    if (!fs.existsSync(onDisk)) fail(`${rel}: references missing asset ${ref}`);
  }
}
if (checkedPages === 0) fail('no prerendered pages were found under .next/server/app');

// --- 4. The GTM container ID is compiled into the client bundle -------------
let gtmSummary = 'not required for this build';
if (requireGtm) {
  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || '').trim();
  if (!/^GTM-[A-Z0-9]{4,12}$/.test(gtmId)) {
    fail(
      'NEXT_PUBLIC_GTM_ID is missing or malformed in the build environment. It is a BUILD-TIME ' +
        'input: without it analytics is permanently dead in the shipped bundle.'
    );
  } else {
    const chunks = walk(path.join(staticDir, 'chunks'), (f) => f.endsWith('.js'));
    const carrying = chunks.filter((f) => fs.readFileSync(f, 'utf8').includes(gtmId));
    if (carrying.length === 0) {
      fail(`${gtmId} was supplied but is NOT present in any client chunk — it was not inlined.`);
    } else {
      gtmSummary = `${gtmId} inlined in ${carrying.length} client chunk(s)`;
    }
  }
}

// --- Report -----------------------------------------------------------------
console.log('');
console.log('=== Build output verification ===');
console.log(`BUILD_ID: ${buildId}`);
console.log(`prerendered pages checked: ${checkedPages}`);
console.log(`GTM: ${gtmSummary}`);
if (failures.length) {
  console.error('');
  console.error(`FAILED (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('');
  process.exit(1);
}
console.log('OK: build output verified.');
console.log('');
