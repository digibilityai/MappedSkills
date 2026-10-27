const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};

/* Integration of the seven frozen designs (WP3 to WP7): route wiring, preserved live metadata, FAQ and schema parity,
 * navigation, footer, sitemap, and the removal of dev-only hooks. */

const ROUTES = [
  { path: '/', file: 'app/page.tsx', component: 'ResolveHomeR3', title: 'Google Ads & Meta Ads for Growing Businesses | MappedSkills', crumbs: null },
  { path: '/google-ads', file: 'app/(pages)/google-ads/page.tsx', component: 'GoogleAdsR41', title: 'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills', crumbs: 'Paid search' },
  { path: '/social-media-ads', file: 'app/(pages)/social-media-ads/page.tsx', component: 'MetaAdsR22', title: 'Paid Social, Judged on the Enquiries It Produces | MappedSkills', crumbs: 'Paid social' },
  { path: '/who-we-help/d2c', file: 'app/(pages)/who-we-help/d2c/page.tsx', component: 'D2CR1', title: 'Paid Advertising for D2C Brands in India | MappedSkills', crumbs: 'D2C brands' },
  { path: '/who-we-help/education', file: 'app/(pages)/who-we-help/education/page.tsx', component: 'EducationR2', title: 'Google Ads & Meta Ads for Education Businesses in India | MappedSkills', crumbs: 'Education businesses' },
  { path: '/who-we-help/real-estate', file: 'app/(pages)/who-we-help/real-estate/page.tsx', component: 'RealEstateR2', title: 'Real Estate Google & Meta Ads Agency in India | MappedSkills', crumbs: 'Real Estate Developers' },
  { path: '/who-we-help/enquiry-led-businesses', file: 'app/(pages)/who-we-help/enquiry-led-businesses/page.tsx', component: 'EnquiryLedR11', title: 'Google & Meta Ads for Enquiry-Led Businesses | MappedSkills', crumbs: 'Enquiry-led businesses' },
];
const MARKERS = { '/': 'rv3-hero', '/google-ads': 'ga4-', '/social-media-ads': 'mr1-', '/who-we-help/d2c': 'd2c1-', '/who-we-help/education': 'edr2-', '/who-we-help/real-estate': 'rer2-', '/who-we-help/enquiry-led-businesses': 'e11-' };
const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const ldNodes = (html) => [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1].replace(/\\u003c/g, '<')));
const flat = (nodes) => nodes.flatMap((n) => (n['@graph'] ? n['@graph'] : [n]));

for (const r of ROUTES) {
  const src = fs.readFileSync(r.file, 'utf8');
  const mod = load(r.file);
  const html = renderToStaticMarkup(React.createElement(mod.default));
  test(`${r.path}: renders the frozen design, with live metadata and a self-canonical`, () => {
    assert.match(src, new RegExp(`<${r.component} />`));
    assert.equal(mod.metadata.title, r.title);
    assert.equal(mod.metadata.alternates.canonical.replace(/\/$/, ''), `https://mappedskills.com${r.path === '/' ? '' : r.path}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  });
  test(`${r.path}: rendered markup is the frozen design, not the superseded page component`, () => {
    assert.ok(html.includes(MARKERS[r.path]), `design marker ${MARKERS[r.path]}`);
    assert.doesNotMatch(html, /class="pa[ -]/, 'no superseded paid-advertising markup');
    assert.doesNotMatch(src, /components\/paid-advertising\/[a-z-]+\/PaidAdvertising/, 'wrapper does not import the superseded component');
    assert.match(html, /href="\/contact"/);
    assert.doesNotMatch(html, /[–—]/);
  });
  test(`${r.path}: FAQPage questions and answers equal the visible FAQ; breadcrumb as approved`, () => {
    const nodes = flat(ldNodes(html));
    const faq = nodes.find((n) => n['@type'] === 'FAQPage');
    const visible = [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map((m) => decode(m[1].replace(/<span aria-hidden="true">[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim());
    if (r.path === '/') { assert.equal(faq, undefined, 'the homepage has no FAQPage (unchanged)'); return; }
    assert.ok(faq, 'FAQPage present');
    const body = decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
    assert.equal(faq.mainEntity.length, visible.length, 'schema count equals visible FAQ count');
    for (const q of faq.mainEntity) {
      assert.ok(visible.includes(q.name.replace(/\s+/g, ' ').trim()), `visible question: ${q.name}`);
      assert.ok(body.includes(q.acceptedAnswer.text.replace(/\s+/g, ' ').trim()), `visible answer for: ${q.name}`);
    }
    const crumb = nodes.find((n) => n['@type'] === 'BreadcrumbList');
    assert.ok(crumb, 'BreadcrumbList kept');
    assert.equal(crumb.itemListElement.at(-1).name, r.crumbs);
    assert.equal(nodes.filter((n) => n['@type'] === 'Service').length, ['/google-ads', '/social-media-ads'].includes(r.path) ? 1 : 0);
    assert.doesNotMatch(JSON.stringify(nodes), /"(price|offers|aggregateRating|review)"/i);
  });
}

test('homepage: Reporting Policy A wording replaces the monthly-reporting promise; audience ids no longer collide', () => {
  const html = renderToStaticMarkup(React.createElement(load('app/page.tsx').default));
  const text = decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  assert.match(text, /You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal\./);
  assert.doesNotMatch(text, /monthly reporting and a review call/);
  assert.match(html, /id="real-estate"/);
  assert.doesNotMatch(html, /id="enquiry-led"/);
  for (const h of ['/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']) assert.match(html, new RegExp(`href="${h}"`));
});

test('sitemap and analytics: the new route is added once; nothing is removed', () => {
  const sm = fs.readFileSync('app/sitemap.ts', 'utf8');
  assert.equal((sm.match(/'\/who-we-help\/enquiry-led-businesses'/g) || []).length, 1);
  for (const p of ['/', '/services', '/seo', '/ai-seo', '/google-ads', '/social-media-ads', '/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/lead-generation', '/conversion-optimization', '/problems/traffic-but-no-enquiries', '/how-it-works', '/pricing', '/about', '/faq', '/contact', '/work', '/blog', '/research', '/press']) assert.ok(sm.includes(`'${p}'`), p);
  assert.doesNotMatch(sm, /preview/);
  assert.equal(load('lib/analytics.ts').pageTypeOf('/who-we-help/enquiry-led-businesses'), 'commercial');
});

test('navigation: four audience pages in the Who We Help dropdown, in order, with active-state routes', () => {
  const nav = load('components/direction-c/nav.ts');
  assert.deepEqual(nav.WHO_WE_HELP_LINKS.map((l) => l.href), ['/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']);
  assert.equal(nav.WHO_WE_HELP_ROUTES.size, 4);
  assert.deepEqual(nav.PRIMARY_LINKS.map((l) => l.href), ['/work', '/how-it-works', '/about']);
  assert.equal(nav.CONTACT_LINK.label, 'Discuss Your Advertising');
  const header = renderToStaticMarkup(React.createElement(load('components/direction-c/SiteHeader.tsx').SiteHeader));
  for (const l of nav.WHO_WE_HELP_LINKS) assert.match(header, new RegExp(`href="${l.href}"`));
});

test('footer: Who We Help group and a discreet, accurate More services group (D3)', () => {
  const footer = renderToStaticMarkup(React.createElement(load('components/direction-c/SiteFooter.tsx').SiteFooter));
  const grp = (id) => footer.split(`id="${id}"`)[1].split('</nav>')[0];
  const hrefs = (s) => [...s.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs(grp('dc-f-who')), ['/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']);
  assert.deepEqual(hrefs(grp('dc-f-more')), ['/lead-generation', '/seo', '/ai-seo', '/conversion-optimization']);
  assert.match(grp('dc-f-more'), /Earlier service pages\. Our core work is Google Ads and Meta Ads\./);
  assert.deepEqual(hrefs(grp('dc-f-svc')), ['/services', '/google-ads', '/social-media-ads']);
});

test('dev-only hooks are gone and nothing production-facing depends on superseded rounds', () => {
  assert.doesNotMatch(fs.readFileSync('app/layout.tsx', 'utf8'), /DesignSwitcher|resolve-home/);
  assert.doesNotMatch(fs.readFileSync('next.config.mjs', 'utf8'), /resolve-preview|design['"]?\s*,\s*value|THE RESOLVE/);
  assert.deepEqual(fs.readdirSync('app').filter((d) => /preview/.test(d)), []);
  for (const d of ['resolve-home', 'resolve-home-r2', 'enquiry-led-r1', 'google-ads-preview-r3']) assert.equal(fs.existsSync(`components/${d}`), false, d);
  const bad = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(tsx?|css)$/.test(e.name) && /from '[^']*(resolve-home\/|resolve-home-r2|enquiry-led-r1\/|google-ads-r4\/GoogleAdsR4|meta-ads-r21\/MetaAdsR21)/.test(fs.readFileSync(p, 'utf8'))) bad.push(p); });
  walk('components'); walk('app');
  assert.deepEqual(bad, []);
});

test('redirects are untouched', () => {
  const cfg = fs.readFileSync('next.config.mjs', 'utf8');
  for (const s of ['/seo-services', '/google-ads-service', '/social-media-advertising', '/lead-generation-services', '/content-marketing-services', '/digital-marketing-services', '/contact-us', '/results', '/results/:slug', '/schedule-call', '/contact/call']) assert.ok(cfg.includes(`source: '${s}'`), s);
});

test('application copy of the frozen designs has no long or double dashes', () => {
  const dirs = ['resolve-home-r3', 'google-ads-r3', 'google-ads-r4', 'google-ads-r41', 'meta-ads-r1', 'meta-ads-r2', 'meta-ads-r21', 'meta-ads-r22', 'd2c-r1', 'education-r2', 'real-estate-r2', 'enquiry-led-r11'];
  const files = dirs.flatMap((d) => fs.readdirSync(`components/${d}`).filter((f) => /\.(tsx?)$/.test(f)).map((f) => `components/${d}/${f}`));
  files.push('components/direction-c/nav.ts', 'components/direction-c/SiteFooter.tsx');
  for (const f of files) {
    const code = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    assert.doesNotMatch(code, /[–—]|\s--\s/, f);
  }
});

test('Enquiry-Led is reachable from the homepage, the header, the footer and the sitemap', () => {
  const target = 'href="/who-we-help/enquiry-led-businesses"';
  const home = renderToStaticMarkup(React.createElement(load('app/page.tsx').default));
  assert.ok(home.includes(target), 'homepage');
  assert.match(home, /<header class="rv3-head"[^>]*>[\s\S]*?rv3-aud-more[\s\S]*?<\/header>/, 'pointer sits in the audience heading, adding no row on wide screens');
  assert.ok(renderToStaticMarkup(React.createElement(load('components/direction-c/SiteHeader.tsx').SiteHeader)).includes(target), 'header');
  assert.ok(renderToStaticMarkup(React.createElement(load('components/direction-c/SiteFooter.tsx').SiteFooter)).includes(target), 'footer');
  assert.ok(fs.readFileSync('app/sitemap.ts', 'utf8').includes("'/who-we-help/enquiry-led-businesses'"), 'sitemap');
   assert.ok(fs.existsSync('app/(pages)/who-we-help/enquiry-led-businesses/page.tsx'));
});

test('consent banner: equal choices, nothing pre-ticked, and it reserves its own height instead of covering the page', () => {
  const src = fs.readFileSync('components/analytics/ConsentBanner.tsx', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const btn = [...src.matchAll(/<button[\s\S]*?className="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(btn.length, 2);
  assert.equal(btn[0], btn[1], 'accept and reject are styled identically');
  assert.match(src, /--consent-h/);
  assert.match(src, /removeProperty\('--consent-h'\)/);
  assert.doesNotMatch(src, /aria-modal|setTimeout|scroll/);
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.match(css, /scroll-padding-bottom: var\(--consent-h/);
  assert.match(css, /@media \(max-width: 767px\) and \(max-height: 739px\) \{\s*\.consent-banner \{ position: static;/, 'short phones: normal flow, no overlay');
  assert.match(src, /className="consent-banner fixed /);
  assert.match(css, /body \{ padding-bottom: var\(--consent-h/);
});

test('contrast corrections keep their fixes: captions use the dim token, mock-up labels are restored, dimmed rows stay readable', () => {
  const rd = (f) => fs.readFileSync(f, 'utf8');
  assert.match(rd('components/meta-ads-r22/meta-ads-r22.css'), /\.mr1-hero-fig \.mr1-hhead small[^{]*\{ color: #5C5665; \}/);
  assert.match(rd('components/meta-ads-r22/meta-ads-r22.css'), /\.mr1-hero-fig \.mr1-field small \{ color: var\(--c-dim\)/);
  assert.match(rd('components/d2c-r1/d2c-r1.css'), /\.d2c1-receipt-l \{[^}]*color: var\(--c-dim\)/);
  assert.match(rd('components/education-r2/education-r2.css'), /\.edr2-chart-l \{[^}]*color: var\(--c-dim\)/);
  const op = Number(rd('components/enquiry-led-r11/enquiry-led-r11.css').match(/\.e11-hrow--dim \{ opacity: ([\d.]+)/)[1]);
  assert.ok(op >= 0.6, `dimmed rows opacity ${op}`);
  const rel = rd('components/enquiry-led-r11/enquiry-led-r11.css').match(/e11-row:not\(\.e11-row--rel\) \{([^}]*)\}/)[1];
  assert.doesNotMatch(rel, /opacity/, 'non-relevant rows are subdued by colour, not by opacity');
  assert.match(rel, /color: var\(--c-dim\)/);
});
