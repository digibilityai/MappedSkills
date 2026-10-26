const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingRealEstate } = load('components/paid-advertising/real-estate/PaidAdvertisingRealEstate.tsx');
const { RealEstateJsonLd } = load('components/paid-advertising/real-estate/RealEstateJsonLd.tsx');
const { PaidAdvertisingHome } = load('components/paid-advertising/home/PaidAdvertisingHome.tsx');
const { PaidAdvertisingServices } = load('components/paid-advertising/services/PaidAdvertisingServices.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingRealEstate));
const ld = renderToStaticMarkup(React.createElement(RealEstateJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const parse = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));
const r1 = process.env.HOME + '/Downloads/MappedSkills_Real_Estate_Content_SEO_R1_APPROVED.md';

test('one H1 in ink and tangerine, and the sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<h1 id="re-h1">More property enquiries\. <span>More of the right buyers\.<\/span><\/h1>/);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['re-h1', 're-ready', 're-platforms', 're-journey', 're-proof', 're-measure', 're-faq', 're-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
  assert.doesNotMatch(html, /<h4|<h5|<h6/);
});
test('hero copy and CTA destinations', () => {
  assert.match(text, /Reach prospective buyers for your residential projects through Google Ads and Meta Ads, with advertising decisions informed by buyer fit, enquiry quality and sales feedback\./);
  assert.match(html, /href="\/contact">Discuss Property Advertising/);
  assert.match(html, /href="\/contact\?intent=call">Request a Call/);
  assert.doesNotMatch(text, /trusted by/i);
});
test('readiness: six factors, R1 closing', () => {
  assert.equal((html.split('class="re-ready"')[1].split('</ul>')[0].match(/<h3>/g) || []).length, 6);
  for (const f of ['Location', 'Inventory', 'Price fit', 'Possession', 'Presentation', 'Sales follow-up']) assert.match(text, new RegExp(f));
  assert.match(text, /More traffic alone cannot solve a mismatch between the project and its prospective buyers\./);
});
test('platform roles link to the two services', () => {
  assert.match(html, /href="\/google-ads">Explore Google Ads/);
  assert.match(html, /href="\/social-media-ads">Explore Meta Ads/);
  assert.match(text, /We assess the project, geography, buyer profile and available budget before recommending either platform or a combination\./);
});
test('journey: five stages and the MappedSkills versus sales team handoff', () => {
  const stages = [...html.matchAll(/<h3>(Discover|Explore|Enquire|Qualify and visit|Decide)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stages, ['Discover', 'Explore', 'Enquire', 'Qualify and visit', 'Decide']);
  assert.match(html, /re-stage re-stage--ours[\s\S]*re-stage re-stage--yours/);
  assert.match(text, /MappedSkills manages advertising\. Your sales team manages the buyer relationship\./);
  assert.match(text, /Not every enquiry becomes a site visit, and not every visit becomes a booking\./);
  assert.match(text, /CRM integrations, landing-page development, technical tracking changes and additional creative production\./);
});
test('experience: Om Sai only, verified wording, live case link, no results, no property imagery', () => {
  const sec = html.split('aria-labelledby="re-proof"')[1].split('</section>')[0];
  assert.match(sec, /Om Sai Developer/);
  assert.doesNotMatch(text, /Om Sai Developers/);
  assert.match(sec, /MappedSkills has worked on Meta advertising for a residential development in Chembur, Mumbai\./);
  assert.match(sec, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.match(sec, /href="\/work">Explore Our Work/);
  assert.match(sec, /Our approach, not Om Sai findings/);
  assert.doesNotMatch(html, /<img\b/);
  assert.doesNotMatch(text, /\bRERA\b|registration number|possession date|sq\.? ?ft|\blakh|\bcrore/i);
});
test('measurement: three levels, Reporting Policy A, tracking boundary, pricing link, no guarantees', () => {
  for (const t of ['Enquiries', 'Relevant buyers', 'Site visits']) assert.match(text, new RegExp(t));
  assert.match(text, /A low cost per enquiry means little if the buyers cannot afford the property/);
  assert.match(text, /Monthly reporting, with review calls as agreed in the proposal/);
  assert.match(text, /New tracking setup, repairs and CRM integrations \(separately scoped unless included\)/);
  assert.match(text, /We do not guarantee enquiries, site visits, bookings or sales\./);
  assert.ok((html.match(/href="\/pricing"/g) || []).length >= 2);
});
test('no unsupported claims, figures, other platforms or dashes', () => {
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|\bCPL\b|ROAS|testimonial|Google Partner|certified/i);
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|LinkedIn Ads|TikTok|Apple/i);
  assert.doesNotMatch(text, /free (audit|review|account|consultation)|within \d+ (hours|minutes)/i);
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/real-estate/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('seven R1 FAQs verbatim, native, matching FAQPage', () => {
  assert.equal((html.match(/<details>/g) || []).length, 7);
  const faq = parse(ld).find(j => j['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 7);
  for (const q of faq.mainEntity) { assert.ok(text.includes(q.name)); assert.ok(text.includes(q.acceptedAnswer.text)); }
  if (fs.existsSync(r1)) { const src = fs.readFileSync(r1, 'utf8').replace(/[’‘]/g, "'"); for (const q of faq.mainEntity) assert.ok(src.includes(q.name.replace(/[’‘]/g, "'")), q.name); }
  assert.match(text, /Tell us about your project and the buyers you want to reach\./);
});
test('structured data: BreadcrumbList and FAQPage only', () => {
  const nodes = parse(ld);
  assert.deepEqual(nodes.map(n => n['@type']).sort(), ['BreadcrumbList', 'FAQPage']);
  assert.deepEqual(nodes.find(n => n['@type'] === 'BreadcrumbList').itemListElement.map(c => c.name), ['Home', 'Real Estate Developers']);
  assert.doesNotMatch(ld, /"Service"|"(price|offers|aggregateRating|review)"/i);
});
test('route: new, self-canonical, approved metadata', () => {
  const { metadata } = load('app/(pages)/who-we-help/real-estate/page.tsx');
  assert.equal(metadata.title, 'Real Estate Google & Meta Ads Agency in India | MappedSkills');
  assert.equal(metadata.description, 'Google Ads and Meta Ads management for real estate developers in India. Reach relevant property buyers and make better decisions using enquiry and site-visit feedback.');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/who-we-help/real-estate');
});
test('inbound links, sitemap and analytics; header and footer untouched; no redirects', () => {
  const home = renderToStaticMarkup(React.createElement(PaidAdvertisingHome));
  const card = home.split('id="enquiry-led"')[1].split('</article>')[0];
  assert.match(card, /<h3><a class="pa-card-link" href="\/who-we-help\/real-estate">Real estate developers<\/a><\/h3>/);
  assert.equal((home.match(/href="\/who-we-help\/real-estate"/g) || []).length, 1);
  assert.equal((home.match(/class="pa-card-link"/g) || []).length, 3);
  const services = renderToStaticMarkup(React.createElement(PaidAdvertisingServices));
  assert.equal((services.match(/href="\/who-we-help\/real-estate"/g) || []).length, 1);
  assert.match(fs.readFileSync('app/sitemap.ts', 'utf8'), /'\/who-we-help\/real-estate'/);
  assert.equal(load('lib/analytics.ts').pageTypeOf('/who-we-help/real-estate'), 'commercial');
  const nav = fs.readFileSync('components/direction-c/nav.ts', 'utf8');
  assert.match(nav, /href: '\/#who-we-help', label: 'Who We Help'/);
  assert.doesNotMatch(nav, /who-we-help\/real-estate/);
  assert.doesNotMatch(fs.readFileSync('next.config.mjs', 'utf8'), /who-we-help|real-estate/);
});
test('stylesheet: no sticky or fixed elements, reduced-motion override, nothing hidden without script', () => {
  const css = fs.readFileSync('components/paid-advertising/real-estate/real-estate.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(html, /data-pending/);
});
