// Guards for /ai-seo (owner-approved G1 R2 design, implemented in G2). Copy, evidence integrity and journey rules only:
// the approved H1 with unchanged metadata, the eight sections in order, the 31 August 2026 record exactly as measured,
// the four results kept separate, untested systems never shown as zero, the corrected Ahrefs/Semrush answer, and no
// claims the page must not make. Runtime journey timing is verified in the browser (docs/ai-search-redesign/g2).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const plain = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/ /g, ' ');
const page = read('app/(pages)/ai-seo/page.tsx');
const body = read('components/cplus/ai-seo/AiSeoBody.tsx');
const journey = read('components/cplus/ai-seo/Journey.tsx');
const source = read('components/cplus/ai-seo/content.ts').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const MEASURED_ON = /MEASURED_ON = '([^']+)'/.exec(source)[1];
// drop TypeScript `as { ... }[]` assertions (braces may nest) so the object literal evaluates as JavaScript
const stripAs = (src) => {
  let out = '', i = 0;
  while (i < src.length) {
    const j = src.indexOf(' as {', i);
    if (j < 0) return out + src.slice(i);
    out += src.slice(i, j);
    let k = j + 4, depth = 0;
    do { if (src[k] === '{') depth++; else if (src[k] === '}') depth--; k++; } while (depth > 0);
    if (src.startsWith('[]', k)) k += 2;
    i = k;
  }
  return out;
};
const literal = stripAs(source.slice(source.indexOf('=', source.indexOf('AI_PLAIN')) + 1).trim().replace(/;\s*$/, ''));
const S = JSON.parse(JSON.stringify(new Function('MEASURED_ON', `return (${literal});`)(MEASURED_ON)), (k, v) => (typeof v === 'string' ? plain(v) : v));
const all = [];
(function walk(v) { if (typeof v === 'string') all.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })(S);
const text = all.join(' ');

test('approved H1; title, description and route unchanged', () => {
  assert.equal(`${S.h1.a} ${S.h1.b}`, 'When buyers ask AI, is your business in the answer?');
  assert.ok(page.includes("'AI Search: Why Your Business Is Not in the Answer | MappedSkills'"));
  assert.ok(page.includes("'AI answers are assembled largely from sources outside your website, and being readable is not the same as being chosen. We measure it per system, publish the run counts, and do not sell a score.'"));
  assert.ok(page.includes("'/ai-seo'"));
  assert.ok(page.includes('<BreadcrumbJsonLd label="AI search" path="/ai-seo" />'));
  assert.equal((body.match(/<h1\b/g) || []).length, 1);
});

test('eight sections in the approved order', () => {
  const ids = [...body.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids, ['as-h1', 'as-h-shift', 'as-h-src', 'as-h-jr', 'as-h-rep', 'as-h-fit', 'as-h-qs', 'as-h-close']);
});

test('the 31 August 2026 record is unchanged: 28 questions, 0 appearances, per tool', () => {
  assert.equal(MEASURED_ON, '31 August 2026');
  assert.deepEqual(S.record.rows.map((r) => [r.s, r.n]), [['Google AI Mode', 19], ['Google AI Overviews', 3], ['ChatGPT', 2], ['Perplexity', 3], ['Gemini', 1]]);
  assert.equal(S.record.rows.reduce((a, r) => a + r.n, 0), 28);
  assert.equal(S.test.checked.tools.length, S.record.rows.length);
  assert.ok(body.includes('<td>0</td>'));
  assert.equal(/<td>[1-9]/.test(body.slice(body.indexOf('ax-rec-tb'), body.indexOf('</table>'))), false);
});

test('the zero is visible, dated and scoped, with the visible limit', () => {
  assert.equal(`${S.test.found.fig} ${S.test.found.of} ${S.test.found.t}`, '0 of 28 answers named us.');
  assert.deepEqual(S.test.meta, ['one round', 'one location', 'English', 'signed out']);
  assert.ok(body.includes('<time dateTime="2026-08-31">{MEASURED_ON}</time>'));
  assert.equal(S.test.lim.t, "that our work raises anyone's visibility, or that AI answers bring enquiries. It's one round on one day, not a before and after.");
  // the disclosure holds method and record; the zero must not be inside it only
  assert.ok(body.indexOf('ax-tr-zero') < body.indexOf('<details className="fq-d ax-rec">'));
});

test('four results are kept separate and never blended', () => {
  assert.deepEqual(S.test.found.layers.map((l) => [l.q, l.r]), [
    ['AI crawlers could read our site', 'Yes, both checked'],
    ['Named in the answer', '0 of 28'],
    ['Recommended', '0 of 28'],
    ['Our site quoted as a source', '0 of 28'],
  ]);
  assert.equal(S.test.found.branded, 'Asked about us by name, 7 of 8 answers described us substantially accurately.');
  assert.ok(S.record.notes.some((n) => n.b.startsWith('Four results, kept separate, never one number')));
});

test('Claude and Grok are untested, never zero', () => {
  for (const s of [S.test.checked.untested, S.record.untested.t]) {
    assert.ok(/Claude/.test(s) && /Grok/.test(s) && /not a zero/.test(s));
  }
  assert.equal(S.record.rows.some((r) => /Claude|Grok/.test(r.s)), false);
});

test('no claim that the test proves results; limits kept', () => {
  const lims = S.record.notes.find((n) => n.b === 'What this does not show:').t;
  for (const l of ['a trend', 'Claude or Grok', 'signed-in answers', 'why we were absent', 'whether AI answers bring enquiries']) assert.ok(lims.includes(l), l);
  assert.equal(/improved (our|your) (visibility|ranking)|we now appear|since then/i.test(text), false);
});

test('FAQ: the corrected Ahrefs and Semrush answer', () => {
  const q2 = S.questions.find((q) => q.q.startsWith('Ahrefs and Semrush'));
  assert.ok(q2.a.includes('some paid versions also show which sites the answers cite'));
  assert.ok(q2.a.includes('Different tools answer different questions'));
  assert.equal(/(don't|do not|doesn't|cannot|can't) show/i.test(q2.a), false);
});

test('reporting: the four checks and four non-promises; no score, frequency or platform data', () => {
  assert.equal(`${S.rep.h.a} ${S.rep.h.b}`, 'What we can check. What nobody can promise.');
  assert.deepEqual(S.rep.can.items.map((i) => i.b), ['Your site', 'Your details', 'Other sites', 'The answers']);
  assert.deepEqual(S.rep.not.items.map((i) => i.b), ['A place in the answer', 'A ranking or a score', 'Improvement every time', 'Enquiries']);
  assert.equal(/monthly|weekly|quarterly report|every month|dashboard|analytics access|visibility score of/i.test(text), false);
});

test('fit: six qualified situations; cross-links point at existing routes', () => {
  assert.equal(S.fit.yes.items.length + S.fit.other.items.length, 6);
  assert.equal(S.fit.close, "Not sure which side you're on? That's what a first conversation is for.");
  for (const it of S.fit.other.items.filter((i) => i.link)) {
    assert.ok(fs.existsSync(path.join(ROOT, 'app/(pages)', it.link.href, 'page.tsx')), it.link.href);
  }
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(pages)', S.across.href2, 'page.tsx')));
});

test('journey: five approved steps, 2 s, plays once, accessible', () => {
  assert.deepEqual(S.journey.steps.map((s) => s.t), ['See what AI says now', 'Open your site to AI', 'Get your facts straight', 'Be where answers come from', 'Check again, honestly']);
  assert.equal(S.journey.steps[S.journey.big].t, 'Be where answers come from');
  assert.ok(/export const STEP_MS = 2000;/.test(journey));
  assert.ok(journey.includes('prefers-reduced-motion: reduce'));
  assert.ok(journey.includes("aria-current={on ? 'step' : undefined}"));
  assert.equal(/setInterval|aria-live|\.focus\(|role="status"/.test(journey), false);
});

test('copy rules: no long or double dashes; no results, figures, guarantees or testimonials', () => {
  assert.equal(/[–—]|--/.test(text), false);
  assert.equal(/\d+\s?%|guarantee|testimonial|\bROI\b|case study/i.test(text), false);
});
