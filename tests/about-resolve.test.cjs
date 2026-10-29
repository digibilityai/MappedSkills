// Guards for the THE RESOLVE rework of /about (Stage 2) and the shared case-study card: owner facts kept, no outcomes or
// invented assets, artwork only where the frozen homepage already uses it, a text-led fallback otherwise, valid
// destinations, and the homepage motion policy for about.css (the page's keyframes live there, not in b2.css).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const about = read('components/b2/About.tsx');
const work = read('components/resolve/work.ts');
const card = read('components/resolve/WorkCard.tsx');
const home = read('components/resolve-home-r3/ResolveHomeR3.tsx');
const css = read('components/b2/about.css').replace(/\/\*[\s\S]*?\*\//g, '');

function mediaBlock(q) {
  const i = css.indexOf(q);
  assert.ok(i >= 0, q);
  let depth = 0;
  for (let j = css.indexOf('{', i); j < css.length; j++) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}' && --depth === 0) return { start: i, end: j, body: css.slice(css.indexOf('{', i) + 1, j) };
  }
  throw new Error('unbalanced ' + q);
}

test('owner facts, H1, CTAs and the closing band are kept', () => {
  assert.match(about, /<h1 id="ab-h1">An advertising agency that <span>answers to your enquiries\.<\/span><\/h1>/);
  assert.ok(about.includes('We are independently operated'));
  assert.ok(about.includes('You approve the approach and scope before we begin.'));
  assert.ok(about.includes('We commit to the work and how we do it, not guaranteed outcomes.'));
  assert.match(about, /<ActionLink \/><ActionLink href="\/how-it-works" variant="text">See how we work<\/ActionLink>/);
  assert.match(about, /<Band id="ab-close"/);
  for (const h of ['/google-ads', '/social-media-ads', '/how-it-works', '/work', '/press']) assert.ok(about.includes(`"${h}"`), h);
});

test('case studies: approved copy and routes, no outcomes, artwork only from the homepage set', () => {
  assert.match(about, /<WorkCard s=\{STUDIES\['om-sai'\]\} lead \/>/);
  assert.match(about, /<WorkCard s=\{STUDIES\.anybodycanbake\} \/>/);
  assert.ok(work.includes("href: '/portfolio/om-sai-developer-meta-ads'"));
  assert.ok(work.includes("href: '/portfolio/google-ads-for-online-courses'"));
  const copy = work.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(copy, /%|\d+\s*(x|times|leads|enquiries|students|sales)\b|testimonial|increase|grew|growth of|roi\b|₹/i);
  for (const src of [...copy.matchAll(/src: '([^']+)'/g)].map((m) => m[1])) assert.ok(home.includes(src), `${src} is not approved homepage artwork`);
  assert.match(copy, /note: 'Conceptual artwork\. Not a photograph of the project\.'/);
  assert.match(copy, /anybodycanbake: \{[^}]*cta: 'Read the Google Ads case study',\s*\},/s, 'AnyBodyCanBake has no artwork and uses the fallback');
});

test('shared card: disclosure under artwork, text-led fallback otherwise, one text CTA', () => {
  assert.match(card, /<p className="rs-wc-note">\{a\.note\}<\/p>/);
  assert.match(card, /className="rs-wc-img rs-wc-text" aria-hidden="true"/);
  assert.strictEqual((card.match(/<Link /g) || []).length, 1);
});

test('motion: keyframes only under no-preference; reduced motion clears it; nothing loops or sticks', () => {
  const np = mediaBlock('@media (prefers-reduced-motion: no-preference)');
  const rm = mediaBlock('@media (prefers-reduced-motion: reduce)');
  assert.ok(np.end < rm.start);
  const outside = css.slice(0, np.start) + css.slice(np.end, rm.start) + css.slice(rm.end);
  assert.doesNotMatch(outside, /@keyframes|animation\s*:/);
  assert.match(rm.body, /animation: none !important; transition: none !important;/);
  assert.doesNotMatch(css, /infinite|alternate|position:\s*sticky|animation-timeline|scroll-timeline|view-timeline/);
  const durations = [...css.matchAll(/animation:\s*[a-z-]+\s+([\d.]+)(m?s)/g)].map((m) => (m[2] === 'ms' ? Number(m[1]) : Number(m[1]) * 1000));
  assert.ok(durations.length > 0 && durations.every((d) => d <= 700), String(durations));
});
