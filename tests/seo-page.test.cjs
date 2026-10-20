// Guards for the redesigned /seo page: approved metadata, owner-approved proof rules and link set (no framework needed).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const content = read('components/cplus/seo/content.ts');
const body = read('components/cplus/seo/SeoBody.tsx');
const page = read('app/(pages)/seo/page.tsx');
const copy = content.replace(/\/\*[\s\S]*?\*\//g, '');

test('metadata is the owner-approved wording and the canonical path is unchanged', () => {
  assert.ok(page.includes("'SEO Judged on the Enquiries It Produces | MappedSkills'"));
  assert.ok(
    page.includes(
      "'We help your business appear for relevant searches, improve the pages visitors land on and measure whether organic search brings genuine enquiries.'"
    )
  );
  assert.ok(page.includes("'/seo'"));
  assert.ok(page.includes('<BreadcrumbJsonLd label="Search" path="/seo" />'));
});

test('hero keeps the core proposition and uses at most two supporting sentences', () => {
  assert.ok(/a: 'SEO that is judged on the'[\s\S]*b: 'enquiries'[\s\S]*c: 'it produces\.'/.test(copy));
  const lede = copy.match(/lede: \[([\s\S]*?)\],/)[1];
  assert.strictEqual((lede.match(/'[^']*'/g) || []).length, 2);
});

test('the two projects are separate, correctly named and carry no results or links', () => {
  const projects = copy.slice(copy.indexOf('projects: ['), copy.indexOf('qKicker'));
  assert.strictEqual((projects.match(/name: /g) || []).length, 2);
  assert.ok(projects.includes("name: 'Anybody Can Bake'"));
  assert.ok(projects.includes("name: 'Bakedemy'"));
  assert.strictEqual((projects.match(/state: 'Results not yet published\.'/g) || []).length, 2);
  assert.strictEqual((projects.match(/role: 'SEO delivered by MappedSkills\.'/g) || []).length, 2);
  assert.ok(!/href/.test(projects), 'project cards must not link anywhere');
  assert.ok(!/<Link[^>]*>[^<]*(case study|Read)/i.test(body), 'no case-study links');
});

test('excluded claims never appear on the page', () => {
  for (const banned of ['Sonia', 'Gupta', 'tutor', 'Leela', 'Oberoi', 'celebrit', 'television', 'testimonial', 'closed', 'case study', '12-month', '12 months', 'guarantee you', 'ROI']) {
    assert.ok(!copy.toLowerCase().includes(banned.toLowerCase()), `"${banned}" must not appear in the page copy`);
  }
});

test('the illustrative review panel carries no numerals', () => {
  const meas = copy.slice(copy.indexOf('tiles: ['), copy.indexOf('comKicker'));
  assert.ok(copy.includes("measTag: 'Illustrative layout. No real figures.'"));
  assert.ok(!/\d/.test(meas), 'review panel copy must contain no digits');
  const marks = body.slice(body.indexOf('function TileMark'), body.indexOf('export function SeoBody'));
  assert.ok(!/<text/.test(marks), 'review marks must not draw text or numbers');
});

test('FAQ answers are the approved wording, closed on load', () => {
  assert.ok(content.includes("a: 'It depends on your website, competition and what needs improving. We’ll explain the priorities and realistic timelines before you start.'"));
  assert.ok(content.includes("a: 'No one can guarantee Google rankings. We commit to agreed improvements, clear reporting and regular reviews.'"));
  assert.ok(content.includes("a: 'We work on agreed priorities, report on what changed and review the next steps with you each month.'"));
  assert.ok(content.includes("a: 'Google Ads can generate visibility quickly. SEO builds visibility over time. Many businesses benefit from both.'"));
  assert.ok(!/<details[^>]*\bopen\b/.test(body));
});

test('every internal link is an approved existing destination', () => {
  const hrefs = new Set([...copy.matchAll(/href: '([^']+)'/g)].map((m) => m[1]));
  const allowed = new Set(['/problems/traffic-but-no-enquiries', '/how-it-works', '/google-ads', '/ai-seo', '/conversion-optimization', '/services']);
  for (const h of hrefs) assert.ok(allowed.has(h), `unexpected link ${h}`);
  for (const h of ['/google-ads', '/ai-seo', '/conversion-optimization', '/services', '/how-it-works', '/problems/traffic-but-no-enquiries']) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'app/(pages)', h.slice(1), 'page.tsx')), `${h} route exists`);
  }
  assert.ok(body.includes('CONTACT_HREF') && body.includes('BOOKING_HREF'));
});

test('heading structure: one h1 and an h2 per section', () => {
  assert.strictEqual((body.match(/<h1\b/g) || []).length, 1);
  assert.ok((body.match(/<h2\b/g) || []).length >= 8);
});

/* ---- Direction B: structure, motion rules and proof boundaries ---- */
const css = read('components/cplus/seo/seo.css');
const seq = read('components/cplus/seo/Sequence.tsx');
const seoDir = path.join(__dirname, '..', 'components/cplus/seo');

test('Sequence is the only client component and has no timers or loops', () => {
  const clients = fs.readdirSync(seoDir).filter((f) => /\.tsx?$/.test(f) && /^['"]use client['"]/.test(read('components/cplus/seo/' + f).trimStart()));
  assert.deepStrictEqual(clients, ['Sequence.tsx']);
  for (const banned of ['setTimeout', 'setInterval', 'while (true)', 'for (;;)']) assert.ok(!seq.includes(banned), `Sequence must not use ${banned}`);
  assert.ok(seq.includes("data-seq={trigger === 'load' ? 'idle' : undefined}"));
  assert.ok(seq.includes('prefers-reduced-motion: reduce'));
});

test('seo.css has no looping, pinned or scroll-linked motion', () => {
  assert.ok(!/infinite/.test(css), 'no infinite animation');
  assert.ok(!/position:\s*(sticky|fixed)/.test(css), 'no sticky or fixed positioning');
  assert.ok(!/animation-timeline|scroll-timeline|view-timeline/.test(css), 'no scroll-linked animation');
  assert.ok(!/import\s/.test(css.replace(/\/\*[\s\S]*?\*\//g, '')), 'no css imports');
});

test('every idle (start) state is gated to motion-allowed visitors', () => {
  const gated = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'));
  const before = css.slice(0, css.indexOf('@media (prefers-reduced-motion: no-preference)'));
  assert.ok(gated.length > 0 && before.length > 0);
  assert.ok(!/data-seq="idle"/.test(before), 'no idle styling outside the no-preference block');
  assert.ok(!/data-seq="run"/.test(before), 'no run styling outside the no-preference block');
});

test('each motion sequence uses Sequence and the hero plays on load', () => {
  assert.ok(body.includes('<Sequence trigger="load">'));
  assert.ok((body.match(/<Sequence\b/g) || []).length === 3, 'hero, problems trail and staircase');
  assert.ok(body.includes('data-rv=""'), 'existing reveal on sheet, commitments and projects');
});

test('all nine sections are labelled and keep their approved headings', () => {
  for (const id of ['sx-h1', 'sx-h-prob', 'sx-h-work', 'sx-h-how', 'sx-h-meas', 'sx-h-com', 'sx-h-proj', 'sx-h-qs', 'sx-h-close']) {
    assert.ok(body.includes(`id="${id}"`), `${id} heading present`);
  }
  assert.ok(copy.includes("howH: { a: 'Four steps,', b: 'in this order.' }"));
  assert.strictEqual((body.match(/<h1\b/g) || []).length, 1);
});

test('dropped labels stay dropped; project stub is the approved sentence', () => {
  assert.ok(!/what the report counts/i.test(body + copy), 'no "what the report counts" label');
  assert.ok(copy.includes("state: 'Results not yet published.'"));
  assert.ok(!/<h3[^>]*>\s*Results\s*</.test(body));
});

test('the project section has no links and the decorative art is hidden from assistive technology', () => {
  const proj = body.slice(body.indexOf('7 — projects'), body.indexOf('8 — questions'));
  assert.ok(!/<Link|href=/.test(proj), 'project entries must not link anywhere');
  assert.ok(/className="sx-trail" aria-hidden="true"/.test(body));
  assert.ok(/className="sx-route-art" aria-hidden="true"/.test(body));
});

test('the headline keeps its last words together (no single-word last line in Firefox)', () => {
  assert.ok(body.includes('<span className="sx-h1-end">{S.h1.c}</span>'));
  assert.ok(/\.sx-h1-end\s*\{\s*white-space:\s*nowrap;\s*\}/.test(css));
});
