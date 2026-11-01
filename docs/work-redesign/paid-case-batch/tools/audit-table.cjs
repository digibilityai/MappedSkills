// Turns audit.jsonl (audit-mobile.cjs) into a route-by-width PASS / FAIL table and a list of findings.
// FAIL: load error, unexpected status, horizontal overflow, an element sticking out of the viewport, clipped text, a broken visible
// image, a page error, a mobile menu that does not open or overflows, a cookie banner outside the viewport, a form control outside it.
// Small tap targets, overlapping text and small form fonts are WARN (listed for review, not failures).
const fs = require('node:fs');
const [file, expectedFile] = process.argv.slice(2);
const rows = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
// Findings reviewed by eye and accepted as design (not defects): a decorative swirl clipped inside #hw-gate, and the Meta ad-format tab
// strip that scrolls sideways inside its own container by design.
const REVIEWED = [['/how-it-works', /section#hw-gate/], ['/social-media-ads', /div\.rv3\.mr1/], [/^\/(blog|press)\//, /^li \d+>\d+$/]]; // last: the current-page item of the breadcrumb is truncated with an ellipsis by design (the full title is the H1)
const expected = (r) => (r === '/does-not-exist' ? 404 : null);
const verdict = (d) => {
  const f = [], w = [];
  if (d.error) f.push('load error: ' + d.error);
  else {
    const want = expected(d.route);
    if (want ? d.status !== want : d.status >= 400) f.push('status ' + d.status);
    if (d.overflowPx > 0) f.push(`overflow ${d.overflowPx}px`);
    if (d.sticking?.length) f.push('sticks out: ' + d.sticking.join('; '));
    const clip = (d.clippedText || []).filter((c) => !REVIEWED.some(([r, re]) => (r instanceof RegExp ? r.test(d.route) : r === d.route) && re.test(c)));
    if (clip.length) f.push('clipped text: ' + clip.join('; '));
    if ((d.clippedText || []).length > clip.length) w.push('reviewed by eye, design: ' + d.clippedText.filter((c) => !clip.includes(c)).join('; '));
    if (d.broken?.length) f.push('broken image: ' + d.broken.join('; '));
    if (d.errors?.length) f.push('page errors: ' + d.errors.join('; '));
    if (d.menu && (!d.menu.opened || d.menu.overflow > 0 || d.menu.right > d.width + 1)) f.push('menu: ' + JSON.stringify(d.menu));
    if (d.banner && !d.banner.inView) f.push('cookie banner outside viewport');
    if (d.forms?.outside) f.push('form control outside viewport');
    if (d.smallTargets?.length) w.push(`${d.smallTargets.length} small tap target(s): ${d.smallTargets.slice(0, 3).join('; ')}`);
    if (d.overlaps?.length) w.push(`${d.overlaps.length} text overlap(s): ${d.overlaps.slice(0, 2).join('; ')}`);
    if (d.forms?.smallFont) w.push(`${d.forms.smallFont} form control(s) under 16px`);
  }
  return { f, w };
};
const routes = [...new Set(rows.map((r) => r.route))];
let out = '| Route | 390 | 360 | Notes |\n|---|---|---|---|\n';
const findings = [];
for (const r of routes) {
  const c = {};
  for (const w of [390, 360]) { const d = rows.find((x) => x.route === r && x.width === w); if (!d) { c[w] = 'NOT RUN'; continue; } const v = verdict(d); c[w] = v.f.length ? 'FAIL' : 'PASS'; if (v.f.length) findings.push(`FAIL ${r} @${w}: ${v.f.join(' | ')}`); if (v.w.length) findings.push(`warn ${r} @${w}: ${v.w.join(' | ')}`); }
  const d0 = rows.find((x) => x.route === r);
  out += `| \`${r}\` | ${c[390]} | ${c[360]} | ${d0?.final && d0.final !== r ? 'redirects to ' + d0.final : (d0?.h1 ?? '').slice(0, 60)} |\n`;
}
console.log(out + '\n' + findings.join('\n'));
