// Guards for /ai-seo (owner-approved R3 design, implemented in G2). Copy, evidence integrity and animation rules only:
// the approved H1 with unchanged metadata, the nine sections in order, the 31 August 2026 record exactly as measured
// (kept in full under "The record"), untested systems never shown as zero, illustrative examples labelled and free of
// statistics, the 1.5 s once-only sequences with no Pause/Play/Replay, and no claims the page must not make. Runtime
// timing is verified in the browser (docs/ai-search-redesign/r3).
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
const sequence = read('components/cplus/ai-seo/Sequence.tsx');
const industry = read('components/cplus/ai-seo/IndustryExamples.tsx');
const scenario = read('components/cplus/ai-seo/Scenario.tsx');
const reporting = read('components/cplus/ai-seo/ReportingSteps.tsx');
const css = read('components/cplus/ai-seo/ai-seo.css');
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

test('nine sections in the approved R3 order; one H1, no skipped heading levels', () => {
  const ids = [...body.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids, ['as-h1', 'as-h-shift', 'as-h-ind', 'as-h-scn', 'as-h-jr', 'as-h-rp', 'as-h-evi', 'as-h-qs', 'as-h-close']);
  const all = body + industry + scenario + reporting + journey;
  assert.equal(/<h[4-6]\b/.test(all), false);
});

test('the 31 August 2026 record is unchanged and complete: 28 questions, 0 appearances, per tool', () => {
  assert.equal(MEASURED_ON, '31 August 2026');
  assert.deepEqual(S.record.rows.map((r) => [r.s, r.n]), [['Google AI Mode', 19], ['Google AI Overviews', 3], ['ChatGPT', 2], ['Perplexity', 3], ['Gemini', 1]]);
  assert.equal(S.record.rows.reduce((a, r) => a + r.n, 0), 28);
  assert.ok(body.includes('<td>0</td>'));
  assert.equal(/<td>[1-9]/.test(body.slice(body.indexOf('ax-rec-tb'), body.indexOf('</table>'))), false);
  assert.equal(S.record.summary, 'Our own test, in full: 28 questions, 5 AI tools, 31 August 2026');
  assert.deepEqual(S.record.cols, ['Where we asked', 'Asked', 'We appeared']);
});

test('the record is a native disclosure, closed on load, with a normal heading (DEC-015)', () => {
  const sec = body.slice(body.indexOf('aria-labelledby="as-h-evi"'), body.indexOf('aria-labelledby="as-h-qs"'));
  assert.ok(sec.includes('<details className="fq-d ax-rec">'));
  assert.equal(/<details[^>]*\bopen\b/.test(sec), false);
  assert.ok(sec.includes('<h2 id="as-h-evi"'));
  assert.ok(sec.includes('<summary>'));
});

test('measured zero and not-tested stay distinct; Claude and Grok are never zero', () => {
  assert.ok(/Claude/.test(S.record.untested.t) && /Grok/.test(S.record.untested.t) && /not a zero/.test(S.record.untested.t));
  assert.equal(S.record.rows.some((r) => /Claude|Grok/.test(r.s)), false);
});

test('the four results, the directory finding, the by-name result and the limits are all kept in the record', () => {
  const notes = Object.fromEntries(S.record.notes.map((n) => [n.b, n.t]));
  assert.ok(notes['Four results, kept separate, never one number.'].includes('0 of 28'));
  assert.ok(notes['Four results, kept separate, never one number.'].includes('Yes, for the two crawlers we checked'));
  assert.ok(notes['The directory finding:'].includes('at least 10 of the 28'));
  assert.equal(notes['Asked about us by name:'], '7 of 8 answers described us substantially accurately.');
  for (const l of ['a trend', 'Claude or Grok', 'signed-in answers', 'why we were absent', 'whether AI answers bring enquiries']) assert.ok(notes['What this does not show:'].includes(l), l);
  assert.ok(notes['How we measured:'].includes('one location, in English, signed out'));
  assert.equal(/improved (our|your) (visibility|ranking)|we now appear|since then/i.test(text), false);
});

test('industry examples: the four approved industries, illustrative, no statistics', () => {
  assert.deepEqual(S.industry.items.map((i) => i.k), ['Manufacturing', 'Jewellery', 'D2C brands', 'Real estate']);
  assert.deepEqual(S.industry.items.map((i) => i.q), [
    '"Which companies make custom packaging in Mumbai?"',
    '"Which jewellery brands should I compare?"',
    '"What are some good skincare brands for sensitive skin?"',
    '"Which residential projects should I consider in this area?"',
  ]);
  assert.equal(S.industry.cap, 'Example questions for illustration. Not real AI answers or search data.');
  assert.equal(`${S.industry.h.a} ${S.industry.h.b}`, 'Your customers are asking AI. Are they finding businesses like yours?');
  const ind = JSON.stringify(S.industry).replace(/D2C/g, '');
  assert.equal(/\d/.test(ind), false, 'no figures in the industry examples');
  assert.ok(industry.includes('aria-pressed={j === cur}'));
  assert.ok(industry.includes('hidden={q.armed && j !== cur}'));
});

test('scenario: two fictional businesses, labelled, no guarantee; destination unchanged', () => {
  const [, , two, you] = S.scenario.steps;
  assert.equal(two.cap, 'Two fictional businesses. An illustration, not a prediction: clear information gives AI more to work with, and no answer is guaranteed.');
  assert.equal(two.a.n, 'Business A');
  assert.equal(two.b.n, 'Business B');
  assert.equal(you.t, 'Where does your business stand?');
  assert.equal(you.p, 'We help you understand what AI can find about your business and where your online information needs work.');
  assert.ok(scenario.includes('href={CONTACT_HREF}'));
  assert.equal(/guaranteed to|will appear|will be recommended|will rank|excluded from/i.test(JSON.stringify(S.scenario)), false);
});

test('reporting: Ask, Compare, Track; the example is visibly labelled; no score, number or capability invented', () => {
  assert.equal(`${S.rep.h.a} ${S.rep.h.b}`, 'See where your business stands. See what changes.');
  assert.deepEqual(S.rep.steps.map((s) => s.w), ['Ask', 'Compare', 'Track']);
  assert.equal(S.rep.steps[2].tag, 'Illustrative example');
  assert.ok(reporting.includes('{TRK.tag}'));
  assert.equal(S.rep.note, 'We show what we found and what changed. AI answers can vary.');
  assert.equal(S.rep.cap, 'Illustration: example wording only, not a report or real results.');
  assert.equal(/monthly|weekly|quarterly report|every month|dashboard|analytics access|visibility score of|\d/i.test(JSON.stringify(S.rep.steps.map((s) => ({ ...s, label: '' }))).replace(/Question \d/g, '')), false);
});

test('FAQ: the corrected Ahrefs and Semrush answer (unchanged)', () => {
  const q2 = S.questions.find((q) => q.q.startsWith('Ahrefs and Semrush'));
  assert.ok(q2.a.includes('some paid versions also show which sites the answers cite'));
  assert.ok(q2.a.includes('Different tools answer different questions'));
  assert.equal(/(don't|do not|doesn't|cannot|can't) show/i.test(q2.a), false);
  assert.deepEqual(S.questions.map((q) => q.q), ['Everyone sells this now. What makes you different?', 'Ahrefs and Semrush give me a checker for free.', 'Can you get us into ChatGPT?']);
});

test('journey: five approved steps and copy; every numbered step is selectable', () => {
  assert.deepEqual(S.journey.steps.map((s) => s.t), ['See what AI says now', 'Open your site to AI', 'Get your facts straight', 'Be where answers come from', 'Check again, honestly']);
  assert.equal(S.journey.steps[3].d, 'Get listed on the directories, review sites and lists the answers use. The biggest part of the work.');
  assert.deepEqual(S.journey.steps.map((s) => s.label), S.journey.steps.map((s, i) => `Step ${i + 1}: ${s.t}`));
  assert.ok(journey.includes('onSelect={() => q.select(j)}'));
});

test('animation: 1.5 s, once, no controls, reduced motion, no live region, no focus movement', () => {
  assert.ok(/export const STEP_MS = 1500;/.test(sequence));
  assert.ok(sequence.includes('prefers-reduced-motion: reduce'));
  assert.equal(/setInterval|aria-live|\.focus\(|role="status"|role="alert"/.test(sequence + journey + industry + scenario + reporting + body), false);
  assert.equal(/Pause|Replay|Play\b/.test(JSON.stringify(S) + journey + sequence.replace(/\/\*[\s\S]*?\*\//g, '')), false, 'no Pause, Play or Replay control');
  assert.equal(/ax-jr-ctl|data-mode/.test(css + journey + body), false);
  for (const f of [journey, industry, scenario, reporting]) assert.ok(f.includes('useSequence'));
  assert.ok(journey.includes("aria-current={q.on(j) ? 'step' : undefined}"));
  assert.ok(sequence.includes('button type="button" className="ax-st-n"'));
});

test('internal links: only existing routes; the old /seo and /conversion-optimization in-page links are gone', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(pages)', S.across.href, 'page.tsx')));
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(pages)', S.across.href2, 'page.tsx')));
  assert.equal(/conversion-optimization/.test(JSON.stringify(S) + body + scenario), false);
});

test('copy rules: no long or double dashes; no results, percentages, guarantees or testimonials', () => {
  assert.equal(/[–—]|--/.test(text), false);
  assert.equal(/\d+\s?%|guarantee d|testimonial|\bROI\b|case study/i.test(text), false);
});
