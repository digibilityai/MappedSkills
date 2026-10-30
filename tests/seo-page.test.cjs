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
  assert.ok(!/<text/.test(body), 'illustrations must not draw text or numbers');
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

/* ---- THE RESOLVE composition (Stage 4 Batch 2A): structure, motion rules and proof boundaries ---- */
const css = read('components/cplus/seo/seo.css');
const seoDir = path.join(__dirname, '..', 'components/cplus/seo');

test('the page has no client component of its own; it reuses the approved once-only sequence helpers', () => {
  const clients = fs.readdirSync(seoDir).filter((f) => /\.tsx?$/.test(f) && /^['"]use client['"]/.test(read('components/cplus/seo/' + f).trimStart()));
  assert.deepStrictEqual(clients, []);
  assert.ok(body.includes('<HwSequence scope=".sk" />') && body.includes('<PaReveal />'));
  assert.ok(body.includes('className="pa b2 sk"'));
});

test('seo.css is scoped to .b2.sk and has no looping, pinned or scroll-linked motion', () => {
  const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/infinite/.test(code), 'no infinite animation');
  assert.ok(!/position:\s*(sticky|fixed)/.test(code), 'no sticky or fixed positioning');
  assert.ok(!/animation-timeline|scroll-timeline|view-timeline/.test(code), 'no scroll-linked animation');
  assert.ok(!/import\s/.test(code), 'no css imports');
  for (const rule of code.matchAll(/(^|\})\s*([^{}@]+)\{/g)) {
    for (const part of rule[2].replace(/:(where|is)\([^)]*\)/g, '').split(',')) {
      const sel = part.trim();
      if (!sel || /^(from|to|\d+%|\d+% )/.test(sel) || /^[\d.]+%$/.test(sel)) continue;
      assert.match(sel, /\.sk\b/, `unscoped selector: ${sel}`);
    }
  }
});

test('every start (armed or running) state and keyframe is gated to motion-allowed visitors', () => {
  const at = css.indexOf('@media (prefers-reduced-motion: no-preference)');
  assert.ok(at > 0);
  const before = css.slice(0, at);
  assert.ok(!/data-anim=/.test(before), 'no armed/play styling outside the no-preference block');
  assert.ok(!/@keyframes|animation:/.test(before.replace(/\/\*[\s\S]*?\*\//g, '')), 'no animation outside the no-preference block');
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
});

test('every section is labelled and keeps its approved heading', () => {
  for (const id of ['sk-h1', 'sk-h-prob', 'sk-h-work', 'sk-h-how', 'sk-h-meas', 'sk-h-com', 'sk-h-proj', 'sk-h-qs', 'sk-h-close']) {
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
  const proj = body.slice(body.indexOf('06, Paper'), body.indexOf('07, Ground'));
  assert.ok(!/<Link|<ActionLink|href=/.test(proj), 'project entries must not link anywhere');
  assert.ok(/<ol className="sk-route" aria-label=\{S\.trailLabel\}>/.test(body));
  assert.ok((body.match(/className="sk-viz" aria-hidden="true"/g) || []).length === 4, 'all four hero pictures are decorative');
  assert.ok(/className="sk-gate" aria-hidden="true"/.test(body));
});

test('the headline keeps its last words together (no single-word last line in Firefox)', () => {
  assert.ok(body.includes('<span className="sk-nw">{S.h1.c}</span>'));
  assert.ok(/span\.sk-nw \{[^}]*white-space: nowrap;/.test(css));
});

test('the page keeps SEO as a supporting service: no claim that it replaces or outranks the core services', () => {
  assert.ok(!/core service|our core|primary service/i.test(copy));
  assert.ok(copy.includes('Many businesses benefit from both.'));
});
