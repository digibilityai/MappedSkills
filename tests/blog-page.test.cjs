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
const css = read('components/cplus/blog/blog.css');
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

test('rows use only listing data, in order, and nothing renders without posts', () => {
  assert.match(body, /posts\.map\(\(post\) =>/);
  assert.ok(!/\.sort\(|\.filter\(|\.reverse\(/.test(code(body)), 'Contentful order kept');
  for (const f of ['post.href', 'post.title', 'post.category', 'post.readingTime', 'post.excerpt']) assert.ok(body.includes(f), f);
  assert.ok(!/publishedDate|author|featuredImage/.test(code(body)), 'no date, author or image on rows (BL-D4)');
  assert.match(body, /\{post\.excerpt && <span className="bl-x">/);
  assert.match(body, /\{has && \(/);
  assert.match(body, /\{has \? B\.lede : B\.empty\}/);
});

test('contact primary, /schedule-call secondary labelled Request a call', () => {
  assert.match(body, /<ActionPair primaryLabel=\{c\.primary\} secondaryLabel=\{c\.secondary\} \/>/);
  assert.ok(content.includes("primary: 'Tell us about your business'"));
  assert.ok(content.includes("secondary: 'Request a call'"));
});

test('150 ms feedback, reduced motion and forced colours', () => {
  const durations = [...css.matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(durations.length >= 5 && durations.every((d) => d === 150), String(durations));
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(css, /\.bl-link:focus-visible \{ outline: 3px solid var\(--dc-tang\)/);
  assert.ok(!/position:\s*(sticky|fixed)/.test(css), 'no sticky elements');
});

test('every stylesheet rule is scoped to a bl- class', () => {
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').match(/[^{}]+\{/g) || [];
  assert.ok(rules.length > 10);
  for (const r of rules) {
    const sel = r.slice(0, -1).trim();
    if (sel.startsWith('@')) continue;
    for (const part of sel.split(',')) assert.match(part, /\.bl-/, part.trim());
  }
});

test('the shared list primitives and the article route are not used or changed here', () => {
  assert.ok(!/EntryList|RouteHero|CommercialSection/.test(page + body));
  assert.ok(!/components\/blog\//.test(page + body));
});
