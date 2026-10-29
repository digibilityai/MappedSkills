// Guards for the THE RESOLVE rework of /how-it-works (DEC-086 Stage 1): the approved route and facts are kept, and the page
// keeps the homepage motion policy (once only, reduced motion respected, nothing loops, sticks or hijacks scroll). The
// page's keyframes live in how-it-works.css, so the policy is checked here rather than relaxed in the shared b2.css guard.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const src = read('components/b2/HowItWorks.tsx');
const seq = read('components/b2/HwSequence.tsx');
const css = read('components/b2/how-it-works.css').replace(/\/\*[\s\S]*?\*\//g, '');

/** The body of the first `@media` block whose query matches `q`, by brace matching. */
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

test('the route keeps the approved order: first conversation, Assess, Plan, the gate, Launch, Test, Review', () => {
  const order = [...src.matchAll(/\{ id: '([a-z]+)', n: '(\d?)', t: '([^']+)'/g)].map((m) => m[3]);
  assert.deepStrictEqual(order, ['First conversation', 'Assess', 'Plan', 'You approve', 'Launch', 'Test', 'Review']);
  for (const t of ['Assess', 'Plan', 'Launch', 'Test', 'Review']) assert.ok(src.includes(`t: '${t}', we:`), t);
});

test('approved facts and boundaries are kept', () => {
  for (const s of [
    'Nothing starts until you say yes',
    'If advertising does not suit your business yet, we will say so.',
    'We plan, run and report on the agreed advertising. You provide access and knowledge, make decisions and follow up the enquiries that come in.',
    'Website, landing page and tracking changes. Creative beyond the agreed designs, such as reels, video and scripting.',
    'A missing source does not make an enquiry any less real.',
    'No. We do the work we agreed and show you what changed.',
    'How the work usually runs. A diagram of the process, not a timeline.',
  ]) assert.ok(src.includes(s), s);
  for (const p of ['The services we recommend', 'The scope', 'The deliverables', 'How we report', 'Our fees']) assert.ok(src.includes(`'${p}'`), p);
  assert.match(src, /<h1 id="hw-h1">No mystery about <span>what happens next\.<\/span><\/h1>/);
  assert.match(src, /<ActionLink \/><ActionLink href="#steps" variant="text">See the five steps<\/ActionLink>/);
});

test('motion: every keyframe and animation sits inside prefers-reduced-motion: no-preference', () => {
  const np = mediaBlock('@media (prefers-reduced-motion: no-preference)');
  const rm = mediaBlock('@media (prefers-reduced-motion: reduce)');
  assert.ok(np.end < rm.start, 'the reduce block follows the no-preference block');
  const outside = css.slice(0, np.start) + css.slice(np.end, rm.start) + css.slice(rm.end);
  assert.doesNotMatch(outside, /@keyframes|animation\s*:/);
  assert.match(np.body, /@keyframes/);
});

test('motion: reduced motion clears animation and transition; nothing loops, sticks or is scroll-driven', () => {
  assert.match(mediaBlock('@media (prefers-reduced-motion: reduce)').body, /animation: none !important; transition: none !important;/);
  assert.doesNotMatch(css, /infinite|alternate|position:\s*sticky|animation-timeline|scroll-timeline|view-timeline/);
  const durations = [...css.matchAll(/animation:\s*[a-z-]+\s+([\d.]+)(m?s)/g)].map((m) => (m[2] === 'ms' ? Number(m[1]) : Number(m[1]) * 1000));
  assert.ok(durations.length > 0 && durations.every((d) => d <= 700), String(durations));
});

test('motion: sequences play once from an IntersectionObserver and respect reduced motion', () => {
  assert.match(seq, /prefers-reduced-motion: reduce\)'\)\.matches/);
  assert.match(seq, /io\.unobserve\(e\.target\)/);
  assert.doesNotMatch(seq, /addEventListener\(['"](scroll|wheel|touchmove)|setInterval|requestAnimationFrame|scrollTo|preventDefault/);
});
