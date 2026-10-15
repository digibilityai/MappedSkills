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
