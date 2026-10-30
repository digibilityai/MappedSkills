// Guards for the Stage 5D accessibility remediation (DEC-101): not-yet-reached sequence steps stay at or above the measured
// WCAG AA opacity floors, and the /seo and /ai-seo layouts keep the rules that stop enlarged text widening the page.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const seo = read('components/cplus/seo/seo.css');
const ai = read('components/cplus/ai-seo/ai-seo.css');
const lg = read('components/cplus/lead-generation/lead-gen.css');
const hw = read('components/b2/how-it-works.css');

// first number after the given anchor, e.g. `opacity: .86` or `from { opacity: .86;`
const opacityAfter = (css, anchor) => {
  const i = css.indexOf(anchor);
  assert.ok(i >= 0, `anchor not found: ${anchor}`);
  const m = css.slice(i).match(/opacity:\s*(\.?\d*\.?\d+)/);
  assert.ok(m, `no opacity after ${anchor}`);
  return parseFloat(m[1]);
};

test('D-14: unplayed sequence opacity floors (measured minimum 0.83 to 0.86 for small text on each ground)', () => {
  assert.ok(opacityAfter(seo, '@keyframes sk-in') >= 0.86, '/seo steps');
  assert.ok(opacityAfter(lg, '.lx-seq.is-armed:not(.is-all) [data-i]:not(.is-seen)') >= 0.86, '/lead-generation steps');
  assert.ok(opacityAfter(ai, '.ax-rp-i:not(.is-done):not(.is-on) .ax-rp-b') >= 0.88, '/ai-seo report pictures');
  assert.ok(opacityAfter(hw, '@keyframes hw-node') >= 0.86, '/how-it-works route and cycle nodes');
  assert.ok(opacityAfter(hw, '@keyframes hw-land') >= 0.86, '/how-it-works "You receive" panel (keyframe)');
  assert.ok(opacityAfter(hw, ".hw-ex[data-anim='armed'] .hw-ex-rc {") >= 0.86, '/how-it-works "You receive" panel (armed)');
  assert.ok(opacityAfter(hw, ".hw-cycle[data-anim='armed'] .hw-cnode") >= 0.86, '/how-it-works cycle numerals (armed)');
});

test('D-14: /ai-seo journey steps keep their measured passing 0.7 state', () => {
  assert.ok(opacityAfter(ai, '.ax-jr.ax-seq.is-armed:not(.is-static) .ax-st:not(.is-done):not(.is-on) .ax-st-t') >= 0.7);
});

test('D-12: /seo mobile pledges reflow to one column when enlarged text leaves under 8rem per column', () => {
  assert.match(seo, /\.sk-pledges \{ grid-template-columns: repeat\(auto-fit, minmax\(min\(100%, 8rem\), 1fr\)\)/);
});

test('D-13: /ai-seo tracking table cells may wrap at 480px and narrower', () => {
  assert.match(ai, /@media \(max-width: 480px\) \{ \.b2\.ai \.ax-trk td \{ white-space: normal; \} \}/);
});

test('DEC-101 copy rule: the changed stylesheets add no long or double dashes in content', () => {
  for (const css of [seo, ai, lg, hw]) assert.ok(!/content:\s*['"][^'"]*[–—]/.test(css));
});
