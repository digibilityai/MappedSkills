// Guards for the B5A corrections on /seo, /ai-seo, /lead-generation and /conversion-optimization (Brand DNA 4.0, DEC-118):
// no viewport-tied section heights, label and caption floors, the two colour fixes and the touch-target floors.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const FILES = {
  seo: 'components/cplus/seo/seo.css',
  'ai-seo': 'components/cplus/ai-seo/ai-seo.css',
  'lead-generation': 'components/cplus/lead-generation/lead-gen.css',
  'conversion-optimization': 'components/cplus/conversion-optimization/conversion.css',
};
// Mock-up text inside illustrations keeps its drawn size (A3 exemption, as in B2).
const MOCKUP = /\.sk-v-else|\.lx-ad b|\.co-ph b|\.co-ph-ok/;
const css = Object.fromEntries(Object.entries(FILES).map(([k, f]) => [k, read(f)]));

const rules = (src) => [...src.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => [m[1].trim(), m[2]]);
const px = (n, u) => Number(n) * (u === 'rem' ? 16 : 1);

for (const [name, src] of Object.entries(css)) {
  test(`${name}: no section height is tied to the viewport`, () => {
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
    assert.doesNotMatch(code, /--(sk|ai|lg|co)-fold/);
    assert.doesNotMatch(code, /min-height:[^;}]*(vh|svh|dvh|lvh)/);
    assert.doesNotMatch(code, /(?<![\w-])height:[^;}]*(vh|svh|dvh|lvh)/);
  });

  test(`${name}: no text is declared below 12 px outside the drawn mock-ups`, () => {
    for (const [sel, body] of rules(src.replace(/\/\*[\s\S]*?\*\//g, ''))) {
      if (MOCKUP.test(sel)) continue;
      for (const m of body.matchAll(/font(?:-size)?\s*:\s*(?:[^;]*?\s)?(\d*\.?\d+)(rem|px)\b/g)) {
        if (/clamp\(/.test(m[0])) continue;
        assert.ok(px(m[1], m[2]) >= 12, `${sel} declares ${m[1]}${m[2]}`);
      }
    }
  });
}

test('captions are at least 14 px', () => {
  const caps = [
    ['seo', /\.sk-fig figcaption \{[^}]*font-size: \.875rem/],
    ['seo', /\.sk-enq-l \{[^}]*\.875rem/],
    ['seo', /\.sk-cav \{[^}]*font-size: \.875rem/],
    ['seo', /\.sk-am-meta \{[^}]*\.875rem/],
    ['ai-seo', /\.px-cap \{[^}]*font-size: \.875rem/],
    ['ai-seo', /\.ax-src \{[^}]*\.875rem/],
    ['ai-seo', /\.ax-names li \{[^}]*\.875rem/],
    ['ai-seo', /\.ax-cmp span \{[^}]*\.875rem/],
    ['lead-generation', /\.px-cap \{[^}]*font-size: \.875rem/],
    ['lead-generation', /\.lx-enq-f dt \{[^}]*\.875rem/],
    ['lead-generation', /\.lx-row \{[^}]*\.875rem/],
    ['conversion-optimization', /\.px-cap \{[^}]*font-size: \.875rem/],
    ['conversion-optimization', /\.co-cap \{[^}]*font-size: \.875rem/],
    ['conversion-optimization', /\.co-pi-cap \{[^}]*font-size: \.875rem/],
  ];
  for (const [k, re] of caps) assert.match(css[k], re, `${k} ${re}`);
});

test('/lead-generation: closing H2 is white, phone hero button is 52 px, related links are a 44 px target', () => {
  const c = css['lead-generation'];
  assert.match(c, /\.lx-close-2 \{ display: block; color: #fff; \}/);
  assert.doesNotMatch(c, /#FFD6BA/i);
  assert.match(c, /\.lg-hero \.dc-btn \{ min-height: 52px; \}/);
  assert.match(c, /\.lg-related a \{[^}]*min-height: 44px/);
  assert.match(c, /html \.b2\.lg \.lg-hero h1[^}]*32px|\.lg-hero h1 \{ font-size: 2rem/, 'the 32 px phone H1 is kept');
});

test('/conversion-optimization: verdict label uses Tangerine Deep and the phone hero button is 52 px', () => {
  const c = css['conversion-optimization'];
  assert.doesNotMatch(c, /#FF9A62/i);
  assert.match(c, /\.co-verdict\.co-tile\[data-i\]:not\(\.is-seen\) \.co-verdict-k \{ color: #FF5B04; \}/);
  assert.match(c, /\.co-hero \.dc-btn \{ min-height: 52px; \}/);
});

test('/seo: showcase period reads "May to July 2026 versus August to October 2026" with no dash characters', () => {
  const want = "period: 'May to July 2026 versus August to October 2026'";
  assert.ok(read('components/cplus/seo/content.ts').includes(want));
  assert.ok(read('components/cplus/seo/showcase.ts').includes(want));
});

test('hero spacing is a fixed value and the shared eyebrow label is held to 12 px on each page', () => {
  for (const [k, cls] of [['seo', 'sk'], ['ai-seo', 'ai'], ['lead-generation', 'lg'], ['conversion-optimization', 'co']]) {
    assert.match(css[k], new RegExp(`\\.b2\\.${cls} \\.${cls}-hero \\{ padding-block: 36px; \\}`));
    assert.match(css[k], new RegExp(`html \\.b2\\.${cls} \\.pa-eyebrow \\{ font-size: \\.75rem; \\}`));
  }
  assert.match(css.seo, /--sk-gap: 28px;/);
});

test('/ai-seo: industry tabs never shrink or wrap their label (Manufacturing stays whole at 360 and 390)', () => {
  assert.match(css['ai-seo'], /\.ax-chip \{ flex: 0 0 auto; white-space: nowrap; min-height: 44px;/);
  assert.match(css['ai-seo'], /\.ax-chips \{[^}]*flex-wrap: wrap/, 'the tabs still wrap to a second row');
});
