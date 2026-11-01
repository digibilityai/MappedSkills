// Guards for /blog (owner-approved G1 design, implemented in G2): title, canonical path and data source unchanged; the
// approved BL-D3 description; the approved H1, lede and close (BL-D2, BL-D5); rows built from the Contentful listing data
// with no invented fields and no placeholder when there are no posts; contact primary and /schedule-call secondary
// ("Request a call"); 150 ms feedback; a page stylesheet that cannot reach other pages; shared list and article
// components untouched by this route.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/blog/page.tsx');
const body = read('components/cplus/blog/BlogBody.tsx');
const content = read('components/cplus/blog/content.ts');
const css = read('components/editorial/editorial.css');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('title, path and revalidation unchanged; approved description', () => {
  assert.match(page, /'Writing \| MappedSkills'/);
  assert.match(page, /'\/blog'/);
  assert.match(page, /export const revalidate = 60;/);
  assert.match(page, /'Practical guides on search, paid ads, content and turning website visits into enquiries, written for business owners\.'/);
  assert.ok(!/two subjects|Pieces on why/i.test(code(page)), 'old description gone');
  assert.ok(!/application\/ld\+json/.test(page), 'no structured data added');
});

test('posts come from the unchanged Contentful listing call', () => {
  assert.match(page, /import \{ getBlogListPosts \} from '@\/lib\/contentful\/posts';/);
  assert.match(page, /const posts = await getBlogListPosts\(\);/);
  assert.match(page, /<BlogBody posts=\{posts\} \/>/);
});

test('approved H1, lede, empty state and close copy', () => {
  const c = code(content);
  assert.match(c, /h1: \{ a: 'Marketing guides,', b: 'written plainly\.' \}/);
  assert.ok(c.includes("lede: 'Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next.'"));
  assert.ok(c.includes("empty: 'Nothing is published here yet.'"));
  assert.ok(c.includes("h: 'Reading about a problem you have?'"));
  assert.ok(c.includes("body: 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.'"));
  assert.match(body, /<h1 id="bl-h1"/);
  assert.equal((body.match(/<h1\b/g) || []).length, 1);
  for (const bad of [/Book a call/i, /\bbook\b/i, /Discovery/i, /guarantee/i, /\d+%/]) assert.ok(!bad.test(c), String(bad));
});

test('collection: the featured article is not repeated, order is Contentful order, nothing renders without posts', () => {
  assert.match(body, /const featured = posts\.find\(\(p\) => p\.slug === B\.featured\.slug\) \?\? posts\[0\];/);
  assert.match(body, /const rest = posts\.filter\(\(p\) => p !== featured\);/);
  assert.match(body, /rest\.map\(/);
  assert.ok(!/\.sort\(|\.reverse\(/.test(code(body)), 'Contentful order kept');
  for (const f of ['href', 'title', 'category', 'excerpt']) assert.ok(body.includes(f), f);
  assert.match(body, /\{has \? B\.lede : B\.empty\}/);
  assert.ok(content.includes("slug: 'real-estate-developers-marketing-strategy'") || /featured:\s*\{[\s\S]*slug:/.test(content), 'featured slug is fixed copy');
});

test('images are shown whole with their own dimensions; a typographic cover stands in when there is none; no hardcoded dates', () => {
  assert.match(body, /width=\{featured\.image\.w\} height=\{featured\.image\.h\}/);
  assert.match(body, /<EdCover /);
  assert.match(css, /\.ed-card \.im[^{]*\{[^}]*object-fit: contain/);
  assert.ok(!/\b20\d\d\b/.test(code(body)), 'no year literal in the template');
});

test('burnt close with the approved copy and the contact primary, /schedule-call secondary labelled Request a call', () => {
  assert.match(body, /<EdClose id="b-close-h" h=\{c\.h\} body=\{c\.body\} primary=\{c\.primary\} secondary=\{c\.secondary\} \/>/);
  assert.ok(content.includes("primary: 'Tell us about your business'"));
  assert.ok(content.includes("secondary: 'Request a call'"));
  const ed = read('components/editorial/EdClose.tsx');
  assert.match(ed, /primaryHref = CONTACT_HREF, secondaryHref = BOOKING_HREF/);
});

test('restrained motion (500 ms at most), off under reduced motion, 3px focus outline, nothing sticky or fixed', () => {
  const durations = [...css.matchAll(/(?:transition|animation):[^;}]*?(\d*\.?\d+)(ms|s)\b/g)].map((m) => (m[2] === 's' ? Number(m[1]) * 1000 : Number(m[1])));
  assert.ok(durations.length > 0 && durations.every((d) => d <= 500), String(durations));
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/, 'the opening stage runs only when motion is allowed');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.ok(!/count-?up|setInterval|autoplay/i.test(css), 'no count-up or autoplay');
  assert.match(css, /outline: 3px solid var\(--tang\)/);
  assert.ok(!/position:\s*(sticky|fixed)/.test(css), 'no sticky elements');
});

test('the old blog stylesheet is gone and nothing imports it', () => {
  assert.ok(!fs.existsSync(path.join(__dirname, '..', 'components/cplus/blog/blog.css')));
  assert.ok(!/blog\.css/.test(body));
});

test('the shared list primitives and the article route are not used or changed here', () => {
  assert.ok(!/EntryList|RouteHero|CommercialSection/.test(page + body));
  assert.ok(!/components\/blog\//.test(page + body));
});
