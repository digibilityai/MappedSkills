// Visual Alignment R1 guard: every rule in the R1 blocks is scoped to the seven non-frozen pages' roots, so the
// seven frozen pages (home, google-ads, social-media-ads, who-we-help x4) cannot be restyled by it.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const MARK = '/* Visual Alignment R1';
const BLOCKS = [
  ['components/b2/b2.css', /^(html \.b2c?|body:has\(\.b2, \.b2c\))(\s|$)/],
  ['components/paid-advertising/services/services.css', /^(html \.pa-sx|body:has\(\.pa-sx\))(\s|$)/],
];

function selectors(css) {
  const out = [];
  const walk = (s) => {
    let i = 0;
    while (i < s.length) {
      const b = s.indexOf('{', i);
      if (b < 0) break;
      let d = 1, j = b + 1;
      while (d && j < s.length) { if (s[j] === '{') d++; else if (s[j] === '}') d--; j++; }
      const head = s.slice(i, b).trim();
      if (head.startsWith('@media')) walk(s.slice(b + 1, j - 1));
      else {
        let depth = 0, cur = '';
        for (const c of head) {
          if (c === '(') depth++;
          if (c === ')') depth--;
          if (c === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += c;
        }
        out.push(cur.trim());
      }
      i = j;
    }
  };
  walk(css.replace(/\/\*[\s\S]*?\*\//g, ''));
  return out;
}

for (const [file, scope] of BLOCKS) {
  test(`${file}: every R1 selector is scoped`, () => {
    const css = read(file);
    const at = css.indexOf(MARK);
    assert.ok(at > 0, 'R1 block present');
    const sels = selectors(css.slice(at));
    assert.ok(sels.length > 20);
    const bad = sels.filter((s) => !scope.test(s));
    assert.deepStrictEqual(bad, []);
  });
}

test('frozen pages do not render the R1 roots', () => {
  const frozen = ['app/(pages)/page.tsx', 'app/(pages)/google-ads', 'app/(pages)/social-media-ads', 'app/(pages)/who-we-help'];
  const files = [];
  const walk = (p) => {
    const f = path.join(__dirname, '..', p);
    if (!fs.existsSync(f)) return;
    if (fs.statSync(f).isDirectory()) fs.readdirSync(f).forEach((n) => walk(path.join(p, n)));
    else if (/\.tsx$/.test(f)) files.push(f);
  };
  frozen.forEach(walk);
  for (const f of files) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /["' ](b2|b2c|pa-sx)["' ]/, f);
});

test('How it works and Pricing opt in to the dark mid-section', () => {
  // How it works (DEC-086 rework): the dark mid-section is the approval gate; "your part" moved to the ground.
  assert.match(read('components/b2/HowItWorks.tsx'), /hw-gate hw-dark" aria-labelledby="hw-gate-h"/);
  assert.match(read('components/b2/Pricing.tsx'), /b2-sec b2-dark" aria-labelledby="pr-prop"/);
});

test('About path chip contrast and metadata fixes from PR 63 are kept', () => {
  assert.match(read('components/b2/b2.css'), /\.b2-path \.t \{ background: var\(--resolve-accent\); color: var\(--resolve-ink\); \}/);
});
