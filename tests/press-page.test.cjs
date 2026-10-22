// Guards for /press (owner-approved G1 design, implemented in G2; DEC-076): metadata, path and revalidation unchanged;
// releases only from the existing Contentful getter; honest empty state with no CMS wording; populated rows link to the
// release route; Press in the footer's Insights column; Research and About point to /press; 150 ms feedback; scoped CSS.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/press/page.tsx');
const body = read('components/cplus/press/PressBody.tsx');
const content = read('components/cplus/press/content.ts');
const css = read('components/cplus/press/press.css');
const nav = read('components/direction-c/nav.ts');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('metadata, path and revalidation unchanged; no structured data added', () => {
  assert.match(page, /'Press \| MappedSkills',\n\s*'News and press releases from MappedSkills, including research announcements and media contact details\.',\n\s*'\/press'/);
  assert.match(page, /export const revalidate = 60;/);
  assert.ok(page.includes('getPressListCards'));
  assert.ok(!/application\/ld\+json|JsonLd/.test(code(page) + code(body)));
});

test('empty state does not mention the CMS; no invented announcements', () => {
  assert.ok(!/contentful|\bcms\b/i.test(code(content)), 'no CMS wording');
  assert.match(content, /No press releases yet\./);
  assert.ok(!/embargo/i.test(content), 'no embargoed-materials promise');
});

test('populated rows are dated, link to the release href, and render only when releases exist', () => {
  assert.match(body, /releases\.length > 0/);
  assert.match(body, /<Link href=\{r\.href\}>\{r\.headline\}<\/Link>/);
  assert.match(body, /r\.publishedDate/);
  assert.match(body, /r\.excerpt \?/);
});

test('contextual links and the existing media mailto', () => {
  for (const h of ['/research', '/about']) assert.ok(content.includes(`href: '${h}'`) || body.includes(`href="${h}"`), h);
  assert.match(body, /CONTACT_HREF/);
  assert.match(content, /subject: 'Media enquiry: MappedSkills'/);
  assert.match(body, /siteMetadata\.email/);
});

test('footer Insights lists Blog, Research, Press in order', () => {
  const m = /FOOTER_INSIGHTS: NavLink\[\] = \[([\s\S]*?)\];/.exec(nav)[1];
  const hrefs = [...m.matchAll(/href: '([^']+)'/g)].map((x) => x[1]);
  assert.deepEqual(hrefs, ['/blog', '/research', '/press']);
});

test('Research and About link to /press', () => {
  assert.match(read('components/cplus/research/ResearchBody.tsx'), /href="\/press"/);
  assert.match(read('components/cplus/about/AboutBody.tsx'), /href="\/press"/);
});

test('150 ms feedback, reduced motion honoured, every rule scoped', () => {
  assert.match(css, /150ms/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.ok(!/\b\d{2,}ms/.test(css.replace(/150ms/g, '')), 'only 150ms');
  const selectors = code(css).replace(/@media[^{]*\{/g, '').split('{').map((s) => s.split('}').pop().trim()).filter(Boolean);
  for (const sel of selectors) for (const part of sel.split(',')) assert.match(part.trim(), /\.pr-|\.px-h:has\(\.pr-hero\)/, part);
});
