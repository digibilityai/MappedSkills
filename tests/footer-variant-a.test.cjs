const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};

/* Footer Variant A (DEC-124): five desktop columns by CSS only. The markup, link set and mobile rules are unchanged. */

const css = fs.readFileSync('app/direction-c.css', 'utf8');
const block = css.slice(css.indexOf('/* Footer Variant A'));

test('footer markup keeps all 24 links and the four nav groups with their accessible names', () => {
  const footer = renderToStaticMarkup(React.createElement(load('components/direction-c/SiteFooter.tsx').SiteFooter));
  const hrefs = [...footer.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]).filter((h) => h !== '/');
  /* The analytics preferences control renders client-side only (ConsentPreferencesLink), so server HTML has 23 anchors;
   * the browser footer has 24 interactive items. */
  assert.equal(hrefs.length, 23);
  assert.match(fs.readFileSync('components/direction-c/SiteFooter.tsx', 'utf8'), /<ConsentPreferencesLink \/>/);
  for (const id of ['dc-f-svc', 'dc-f-who', 'dc-f-co', 'dc-f-ins', 'dc-f-ct']) assert.ok(footer.includes(`id="${id}"`), id);
  for (const h of ['/privacy-policy', '/terms', 'https://linkedin.com/company/mappedskills', 'https://facebook.com/mappedskills', 'https://instagram.com/mappedskills', 'mailto:']) {
    assert.ok(footer.includes(h), h);
  }
});

test('Variant A is desktop only, five columns, Insights stacked under Company', () => {
  assert.match(block, /@media \(min-width: 1024px\) \{/);
  assert.match(block, /grid-template-columns: minmax\(0, 1\.45fr\)(?: minmax\(0, 1fr\)){3} minmax\(0, 1\.25fr\)/);
  assert.match(block, /nav\[aria-labelledby="dc-f-co"\] \{ grid-column: 4; grid-row: 1; \}/);
  assert.match(block, /nav\[aria-labelledby="dc-f-ins"\] \{ grid-column: 4; grid-row: 2;/);
  assert.match(block, /\.dc-contact \{ grid-column: 5; grid-row: 1; \}/);
  assert.equal(block.match(/@media/g).length, 1, 'no other breakpoint');
});

test('link targets stay at least 44px with a 44px pitch (no negative margins in the variant)', () => {
  assert.match(block, /li a \{ min-height: 44px; padding-block: 0; \}/);
  assert.doesNotMatch(block, /margin-block: -/);
  assert.doesNotMatch(block, /!important/);
});

test('Variant A does not force heights or clip content', () => {
  assert.doesNotMatch(block, /(?:^|[\s;{])(?:max-)?height:|overflow:/);
});
