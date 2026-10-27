const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const c22 = load('components/meta-ads-r22/content.ts');
const h22 = renderToStaticMarkup(React.createElement(load('components/meta-ads-r22/MetaAdsR22.tsx').MetaAdsR22));
const split = (h) => { const a = h.indexOf('aria-labelledby="mr1-intent-h"'); const s = h.lastIndexOf('<section', a); const e = h.indexOf('</section>', a) + 10; return [h.slice(0, s), h.slice(s, e), h.slice(e)]; };
const plain = (x) => JSON.parse(JSON.stringify(x));
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');

test('simplified section: approved headline, one sentence, three ideas, caveat, no cards or imagery', () => {
  const s = split(h22)[1], t = text(s);
  assert.match(t, /Your next customer may not be searching for you yet\./);
  assert.match(t, /They may discover something worth exploring while scrolling Facebook or Instagram\./);
  assert.deepEqual(plain(c22.INTENT.steps.map((x) => [x.k, x.d])), [['Discover', 'An ad catches their interest.'], ['Explore', 'They learn more about the offer.'], ['Act', 'They enquire or buy when ready.']]);
  assert.match(t, /Illustrative possibilities, not a guaranteed sequence\./);
  assert.equal((s.match(/<h3/g) || []).length, 3);
  assert.ok(!/<svg|<img|mr1-mini|mr1-thought/.test(s));
  assert.ok(t.split(' ').length < 70);
});
test('R2.1 scroll fix and homepage imagery preserved', () => {
  assert.ok(/resolve-r3(\/|%2F)omsai-work\.webp/.test(h22) && /resolve-r3(\/|%2F)wanderlooms-work\.webp/.test(h22));
  assert.ok(!/\.scrollIntoView\(/.test(fs.readFileSync('components/meta-ads-r21/FormatSelector.tsx', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')));
  assert.match(fs.readFileSync('components/meta-ads-r22/MetaAdsR22.tsx', 'utf8'), /meta-ads-r21\/FormatSelector/);
});
