const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingHome } = load('components/paid-advertising/home/PaidAdvertisingHome.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingHome));

test('homepage renders one meaningful H1, two core platforms and a working enquiry destination', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /Paid advertising built around how/);
  assert.match(html, /your customers buy/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /href="\/google-ads"/);
  assert.match(html, /href="\/social-media-ads"/);
  assert.doesNotMatch(html, /Judge us on|AI Search Visibility|Amit personally/);
});
test('featured work leads with Wanderlooms, keeps the Om Sai destination and links to all case studies', () => {
  assert.ok(html.indexOf('Wanderlooms') < html.indexOf('Om Sai Developer'));
  assert.match(html, /Meta advertising for an adventure apparel brand featured on Shark Tank India\./);
  assert.match(html, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.match(html, /View All Case Studies/);
  assert.doesNotMatch(html, /Wanderloom(?!s)|Wanderloomz/);
  assert.doesNotMatch(html, /href="\/portfolio\/[^"]*wanderloom/i);
  assert.doesNotMatch(html, /2\.75|₹|guaranteed sales|AnybodyCanBake/);
});
test('redundant strip, business-questions section and visible image captions are gone', () => {
  assert.doesNotMatch(html, /pa-proof-cue|We start with the business questions|Illustrative imagery|campaign examples will replace/);
  assert.doesNotMatch(html, /<figcaption|pa-caption/);
});
test('audience cards use the approved headings and the real-estate copy', () => {
  assert.match(html, /<h3><a class="pa-card-link" href="\/who-we-help\/real-estate">Real estate developers<\/a><\/h3>/);
  assert.match(html, /Put your projects in front of prospective buyers and give them a clear next step towards an enquiry or site visit\./);
  assert.doesNotMatch(html, /Enquiry-led businesses and consultants/);
});
test('headings keep one semantic element with phrase-level emphasis', () => {
  for (const phrase of ['the way your business sells', 'shaped around your business\\.', 'the work', 'Practical next steps\\.']) {
    assert.match(html, new RegExp('<h2[^>]*>[^<]*(?:<[^h/][^>]*>)?[^<]*<span class="pa-em">' + phrase + '</span>'));
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});
test('hero has three tiles, a drawn route and the Discover to Purchase / Enquire labels', () => {
  assert.equal((html.match(/class="pa-tile pa-tile--/g) || []).length, 3);
  assert.match(html, /class="pa-route"/);
  for (const l of ['Discover', 'Consider', 'Purchase / Enquire']) assert.match(html, new RegExp('<span>' + l + '</span>'));
});
test('service mockups are demonstration visuals without invented results', () => {
  assert.match(html, /pa-platform--search/);
  assert.match(html, /pa-platform--social/);
  assert.match(html, /Sponsored/);
  assert.match(html, /Shop now/);
  assert.doesNotMatch(html.replace(/<[^>]+>/g, ' '), /\d+\s?(likes|comments|shares|%)|ROAS|CTR/i);
});
test('motion respects reduced motion and never gates essential content', () => {
  const fs = require('node:fs');
  const css = fs.readFileSync('components/paid-advertising/paid-advertising.css', 'utf8');
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*animation: none !important/);
  assert.match(css, /\[data-pending\] \{ opacity: 1 !important/);
  assert.doesNotMatch(html, /data-pending/);
  assert.doesNotMatch(css, /position:\s*sticky|position:\s*fixed/);
});
test('FAQs work without a client-side toggle script and every section label resolves', () => {
  assert.equal((html.match(/<details>/g) || []).length, 4);
  assert.equal((html.match(/<summary>/g) || []).length, 4);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  assert.equal(ids.size, [...html.matchAll(/\bid="([^"]+)"/g)].length);
  for (const m of html.matchAll(/aria-labelledby="([^"]+)"/g)) assert.ok(ids.has(m[1]), m[1]);
});
test('navigation promotes only Google and Meta and retains the contact route', () => {
  const nav = load('components/direction-c/nav.ts');
  assert.deepEqual(nav.SERVICE_GROUPS.flatMap(g => g.links.map(l => l.href)), ['/google-ads','/social-media-ads']);
  assert.equal(nav.CONTACT_LINK.href, '/contact');
});
test('historical SEO and lead-generation cases retain their classification after menu changes', () => {
  const { caseStudyStage } = load('lib/case-study-stage.ts');
  assert.equal(caseStudyStage('/seo'), 'Capture');
  assert.equal(caseStudyStage('/lead-generation'), 'Convert');
  assert.equal(caseStudyStage('/google-ads'), 'Capture');
  assert.equal(caseStudyStage('/unknown'), null);
});
test('featured work uses original illustrations, not photographs that could pass as client imagery', () => {
  const work = html.split('id="featured-work"')[1].split('</section>')[0];
  assert.doesNotMatch(work, /<img\b/);
  assert.equal((work.match(/class="pa-photo pa-art pa-art--/g) || []).length, 2);
  assert.match(work, /Wanderlooms/);
  assert.match(work, /Om Sai Developer, Mumbai/);
  assert.doesNotMatch(html, /<figcaption|Illustrative imagery/);
});
