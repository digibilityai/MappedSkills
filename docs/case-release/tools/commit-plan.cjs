// Prepares (does NOT run) the release commits. Lists every changed file under its commit, flags anything unassigned, and with --verify type-checks
// each cumulative state (HEAD + commits 1..k) in a temporary directory, so every commit is buildable on its own.
//   node docs/case-release/tools/commit-plan.cjs            # print the plan and write docs/case-release/commit-plan/*.txt (pathspec lists)
//   node docs/case-release/tools/commit-plan.cjs --verify   # also tsc each cumulative state
const { execSync, spawnSync } = require('node:child_process'); const fs = require('node:fs'); const path = require('node:path'); const os = require('node:os');
const root = path.join(__dirname, '../../..');
const sh = (c) => execSync(c, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const changed = sh('git ls-files -m -o --exclude-standard').split('\n').filter(Boolean); const deleted = sh('git ls-files -d').split('\n').filter(Boolean);
const all = [...new Set([...changed.filter((f) => !deleted.includes(f)), ...deleted])].filter((f) => f !== 'next-env.d.ts');
const GROUPS = [
  { id: '1-case-study-platform', msg: 'feat(work): case-study platform, 20-study library, final copy gate and artwork (DEC-102, DEC-106, DEC-108, DEC-117)',
    re: [/^lib\/(case-study-|clients\.ts|contentful\/(case-studies|mappers|types|queries|client)\.ts)/, /^components\/(case-study|b2|clients|cplus\/work)\//, /^components\/resolve\/WorkCard/, /^app\/\(pages\)\/portfolio\//, /^public\/images\/(case-studies|clients|resolve-r3)\//, /^tests\/(case-study-|work-page|client-logos)/, /^tests\/helpers\//] },
  { id: '2-editorial-r3', msg: 'feat(editorial): /blog, /press and /research editorial redesign, banner-focus guard (DEC-109 to DEC-114)',
    re: [/^components\/(editorial|cplus\/(blog|blog-article|press|press-release|research|research-report))\//, /^lib\/(blog-related|headline-emphasis|contentful\/(posts|heading-ids))/, /^app\/\(pages\)\/(press|research|blog|contact|launch-checklist)\//, /^tests\/(blog-|press-|research-|editorial-|stage5d)/] },
  { id: '3-case-showcase', msg: 'feat(showcase): reusable case showcase on /social-media-ads, /seo, /google-ads and four /who-we-help pages (DEC-115, DEC-116)',
    re: [/^components\/case-showcase\//, /^components\/(cplus\/seo|meta-ads-r22|d2c-r1|education-r2|enquiry-led-r11|google-ads-r41|real-estate-r2)\//, /^app\/\(pages\)\/(google-ads|seo|social-media-ads|who-we-help)\//, /^tests\/(case-showcase|seo-page|frozen-)/] },
  { id: '4-release-tooling', msg: 'build(release): canonical-domain check in build verification (DEC-117)', re: [/^scripts\//, /^package\.json$/] },
  { id: '5-docs', msg: 'docs: case-study release records, reports, decision log DEC-102 to DEC-117', re: [/^docs\//] },
];
const assign = new Map(); const un = []; const artefacts = [];
// docs: text records, small data and tools are committed; screenshots, recordings, PDFs, mockup HTML and other review artefacts (hundreds of MB) stay out of git
const textDoc = (f) => /\.(md|cjs|mjs|sh|txt)$/.test(f) || (/\.json$/.test(f) && fs.statSync(path.join(root, f)).size <= 400 * 1024);
for (const f of all) {
  if (/^docs\//.test(f) && (deleted.includes(f) ? !/\.(md|cjs|mjs|sh|txt|json)$/.test(f) : !textDoc(f))) { artefacts.push(f); continue; } const g = GROUPS.find((x) => x.re.some((r) => r.test(f))); g ? (assign.set(g.id, [...(assign.get(g.id) ?? []), f])) : un.push(f); }
const out = path.join(root, 'docs/case-release/commit-plan'); fs.mkdirSync(out, { recursive: true });
for (const g of GROUPS) { const l = assign.get(g.id) ?? []; fs.writeFileSync(path.join(out, `${g.id}.txt`), l.join('\n') + '\n'); console.log(`${g.id}: ${l.length} files\n  ${g.msg}`); }
const trailer = 'Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>';
const script = ['#!/usr/bin/env bash', '# NOT RUN. Creates the release commits in order, each from its pathspec list (literal pathspecs: the route-group names contain ( ) [ ]).', '# Run from the repository root on the release branch only after the owner authorises committing.', 'set -euo pipefail', 'LIST=docs/case-release/commit-plan', ...GROUPS.flatMap((g) => [`git --literal-pathspecs add --pathspec-from-file=$LIST/${g.id}.txt`, `git commit -q -F - <<'MSG'\n${g.msg}\n\n${trailer}\nMSG`, `echo "committed ${g.id}"`]), 'git status --short | head'].join('\n') + '\n';
fs.writeFileSync(path.join(out, 'run-commits.sh'), script, { mode: 0o755 });
const mb = artefacts.reduce((a, f) => a + fs.statSync(path.join(root, f)).size, 0) / 1048576;
fs.writeFileSync(path.join(out, 'left-untracked-artefacts.txt'), artefacts.join('\n') + '\n');
console.log(`left untracked on purpose (review artefacts: screenshots, recordings, PDFs, mockups): ${artefacts.length} files, ${mb.toFixed(0)} MB`);
console.log(un.length ? `UNASSIGNED (${un.length}):\n  ` + un.join('\n  ') : 'every changed file is assigned; next-env.d.ts (generated) is left out');
if (process.argv.includes('--verify')) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cp-')); sh(`git archive HEAD | tar -x -C ${tmp}`); fs.symlinkSync(path.join(root, 'node_modules'), path.join(tmp, 'node_modules'));
  for (const g of GROUPS.filter((x) => x.id < '5')) {
    for (const f of assign.get(g.id) ?? []) { const dst = path.join(tmp, f); if (deleted.includes(f)) { fs.rmSync(dst, { force: true }); continue; } fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(path.join(root, f), dst); }
    const r = spawnSync('npx', ['tsc', '--noEmit'], { cwd: tmp, encoding: 'utf8' });
    console.log(`cumulative through ${g.id}: tsc ${r.status === 0 ? 'PASS' : 'FAIL\n' + (r.stdout || r.stderr).split('\n').slice(0, 8).join('\n')}`);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}
