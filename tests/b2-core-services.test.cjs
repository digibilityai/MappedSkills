// B2 (DEC-120): core services, the services hub, pricing type and accessibility fixes, and SEO as a supporting service in the navigation.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
Module._extensions['.css'] = () => {};
const realLoad = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'next/navigation') return { usePathname: () => globalThis.__b2Path ?? '/' };
  return realLoad.call(this, request, ...rest);
};
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const nav = load('components/direction-c/nav.ts');
const { SiteHeader } = load('components/direction-c/SiteHeader.tsx');
const header = (p) => { globalThis.__b2Path = p; return renderToStaticMarkup(React.createElement(SiteHeader)); };

test('navigation: Google Ads and Meta Ads stay the only core services; SEO is one supporting link; no other service is promoted', () => {
  assert.deepStrictEqual(nav.SERVICE_GROUPS.flatMap((g) => g.links.map((l) => l.href)), ['/google-ads', '/social-media-ads']);
  assert.deepStrictEqual(nav.SUPPORTING_SERVICE, { href: '/seo', label: 'SEO' });
  assert.deepStrictEqual(nav.PRIMARY_LINKS.map((l) => l.href), ['/work', '/how-it-works', '/about']);
  assert.deepStrictEqual(nav.FOOTER_SERVICES.map((l) => l.href), ['/services', '/google-ads', '/social-media-ads', '/seo']);
  assert.strictEqual(nav.FOOTER_SERVICES.at(-1).label, 'SEO');
  const html = header('/');
  for (const r of ['/ai-seo', '/lead-generation', '/conversion-optimization']) assert.ok(!html.includes(`href="${r}"`), r);
});

test('desktop panel: "Also: SEO" sits after the two core services and before the hub; mobile menu has the same link', () => {
  const html = header('/');
  const panel = html.split('id="dc-svc-panel"')[1].split('<noscript>')[0];
  const order = [...panel.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepStrictEqual(order, ['/google-ads', '/social-media-ads', '/seo', '/services', '/pricing']);
  assert.match(panel, /<p class="dc-sp-also"><a class="dc-also" href="\/seo"><span class="k">Also:<\/span> <span class="t">SEO<\/span><\/a><\/p>/);
  const menu = html.split('id="dc-m-svc"')[1].split('id="dc-m-who"')[0];
  assert.deepStrictEqual([...menu.matchAll(/href="([^"]+)"/g)].map((m) => m[1]), ['/services', '/google-ads', '/social-media-ads', '/seo', '/pricing']);
  assert.match(menu, /<a class="dc-m-also" href="\/seo"><span class="k">Also:<\/span> <span class="t">SEO<\/span><\/a>/);
  assert.strictEqual((html.match(/href="\/seo"/g) || []).length, 2, 'once on desktop, once on mobile');
});

test('active navigation: /seo marks Services current and the SEO link as the current page; core pages unchanged', () => {
  assert.ok(nav.SERVICE_ROUTES.has('/seo'));
  for (const r of ['/services', '/google-ads', '/social-media-ads']) assert.ok(nav.SERVICE_ROUTES.has(r), r);
  assert.ok(!nav.SERVICE_ROUTES.has('/ai-seo'));
  const seo = header('/seo');
  assert.strictEqual((seo.match(/class="dc-svc-btn"[^>]*aria-controls="dc-svc-panel" data-current=""/g) || []).length, 1);
  assert.strictEqual((seo.match(/class="dc-m-svc-btn"[^>]*aria-controls="dc-m-svc" data-current=""/g) || []).length, 1);
  assert.strictEqual((seo.match(/aria-current="page" href="\/seo"/g) || []).length, 2);
  assert.doesNotMatch(header('/ai-seo'), /aria-controls="dc-svc-panel" data-current=""/);
  assert.match(header('/google-ads'), /aria-current="page" href="\/google-ads"/);
  assert.doesNotMatch(header('/google-ads'), /aria-current="page" href="\/seo"/);
});

test('the secondary link is styled below the core links and meets the 44 px target', () => {
  const css = code(read('app/direction-c.css'));
  assert.match(css, /\.dc-also, \.dc-m-also \{[^}]*min-height: 44px;[^}]*font-size: \.9rem;/);
  assert.match(css, /\.dc-sp-links \.t \{[^}]*font-size: \.98rem;/, 'core links stay larger');
});

test('FAQ heading is one colour on /services, /google-ads and /social-media-ads; wording unchanged', () => {
  assert.match(read('components/google-ads-r41/GoogleAdsR41.tsx'), /<h2 id="ga41-faq-h">A few questions before we talk<\/h2>/);
  assert.match(read('components/meta-ads-r22/MetaAdsR22.tsx'), /<h2 id="mr1-faq-h">A few questions before we talk<\/h2>/);
  assert.match(read('components/paid-advertising/services/PaidAdvertisingServices.tsx'), /eyebrow="Questions">A few questions before we talk</);
});

test('type floors: labels at least 12 px and explanatory captions at least 14 px on the four B2 pages', () => {
  const ga = code(read('components/google-ads-r41/google-ads-r41.css'));
  assert.match(ga, /\.ga41 \.ga4-lane-lbl, \.ga41 \.ga4-js-who, \.ga41 \.ga4-panel dt, \.ga41 \.ga41-card-k \{ font-size: \.75rem; \}/);
  assert.match(ga, /\.ga41 \.ga4-cap \{ font-size: \.875rem; \}/);
  const mr = code(read('components/meta-ads-r22/meta-ads-r22.css'));
  assert.match(mr, /\.mr22 \.mr1-panel dt, \.mr22 \.mr1-js-who, \.mr22 \.mr1-outs-l, \.mr22 \.mr1-sig-l, \.mr22 \.mr22-card-k \{ font-size: \.75rem; \}/);
  assert.match(mr, /\.mr22 \.mr1-cap, \.mr22 \.mr22-note \{ font-size: \.875rem; \}/);
  const sx = code(read('components/paid-advertising/services/services.css'));
  for (const r of [/\.sx-badge \{[^}]*font-size: \.75rem/, /\.x2-sup b \{[^}]*font-size: \.75rem/, /html \.pa-sx \.pa-eyebrow \{ font-size: \.75rem; \}/, /\.x2-seo-k \{[^}]*font-size: \.75rem/]) assert.match(sx, r);
  for (const r of [/\.sx-note \{[^}]*font-size: \.875rem/, /\.x2-path figcaption \{[^}]*font-size: \.875rem/, /\.x2-illus \{[^}]*font-size: \.875rem/]) assert.match(sx, r);
  const pr = code(read('components/pricing-r2/pricing-r2.css'));
  assert.match(pr, /\.prr \.prr-fig-q, \.prr \.prr-plan-k, \.prr \.prr-row dt, \.prr \.prr-table thead th, \.prr \.prr-cad-when, \.prr \.prr-quoted, \.prr \.prr-outside-label, \.prr \.prr-dest-to \{ font-size: \.75rem; \}/);
  assert.match(pr, /\.prr \.prr-cap \{ font-size: \.875rem; \}/);
});

test('pricing: buttons 52 px and the FAQ link a 44 px target; prices, plans and headings unchanged', () => {
  const pr = code(read('components/pricing-r2/pricing-r2.css'));
  assert.match(pr, /\.prr \.prr-btn \{ min-height: 52px; \}/);
  assert.match(pr, /\.prr \.prr-more a \{ display: inline-flex; align-items: center; min-height: 44px; \}/);
  const body = read('components/pricing-r2/PricingR2Body.tsx');
  assert.strictEqual((body.match(/<h2\b/g) || []).length, 8, 'heading structure unchanged');
  assert.match(read('app/(pages)/pricing/page.tsx'), /₹14,999\/month each, or both at ₹26,999\/month/);
});

test('B2 copy adds no long or double dashes', () => {
  const { SEO_SUPPORT } = load('components/paid-advertising/services/content.ts');
  const { SERVICES_SHOWCASE } = load('components/paid-advertising/services/showcase.ts');
  assert.doesNotMatch(JSON.stringify([SEO_SUPPORT, SERVICES_SHOWCASE, nav.SUPPORTING_SERVICE, nav.FOOTER_SERVICES]), /[–—]|--/);
});
