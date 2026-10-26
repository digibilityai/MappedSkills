const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingMetaAds } = load('components/paid-advertising/meta-ads/PaidAdvertisingMetaAds.tsx');
const { MetaAdsJsonLd } = load('components/paid-advertising/meta-ads/MetaAdsJsonLd.tsx');
const { ServicesJsonLd } = load('components/paid-advertising/services/ServicesJsonLd.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingMetaAds));
const ld = renderToStaticMarkup(React.createElement(MetaAdsJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const parse = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('one H1 and the eight approved sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['mx-h1', 'mx-why', 'mx-manage', 'mx-fit', 'mx-how', 'mx-work', 'mx-cost', 'mx-faq', 'mx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
});
test('approved hero and CTAs', () => {
  assert.match(text, /Turn attention into business opportunities\./);
  assert.match(text, /Reach people who may need what you sell, even before they start searching\./);
  assert.match(text, /We plan and manage Meta Ads to introduce your business to relevant people, build interest in your offer and encourage meaningful enquiries or purchases\./);
  assert.match(html, /href="\/contact">Discuss Meta Ads/);
  assert.match(html, /href="\/contact\?intent=call">Request a call/);
  assert.doesNotMatch(text, /trying to fix|Book a call/);
});
test('discovery journey in order, with the approved closing line', () => {
  const stages = [...html.matchAll(/class="mx-dot"[^>]*><\/span><h3>([^<]+)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stages, ['Discovery', 'Interest', 'Consideration', 'Enquiry or purchase']);
  assert.match(text, /Attention is the starting point\. What matters is whether that interest moves people closer to an enquiry or purchase\./);
  assert.doesNotMatch(text, /likes? (are|is) not|not likes/i);
});
test('five approved responsibilities and three enquiry paths', () => {
  const stops = [...html.split('class="mx-stops"')[1].split('</ol>')[0].matchAll(/<h3>([^<]+)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stops, ['Choose who sees it', 'Set up the campaigns', 'Try different ads', 'Pace the budget', 'Check where they land']);
  assert.match(text, /We review the page people reach after clicking and recommend improvements that could help turn visits into enquiries\./);
  for (const p of ['Your website', 'An enquiry form', 'A WhatsApp conversation']) assert.match(text, new RegExp(p));
  assert.match(text, /Your team needs to respond to conversations promptly\. We do not reply for you, and chat automation or CRM connections are not included unless your proposal says so\./);
});
test('tracking boundary: included review and reporting; setup and repairs separately scoped; old setup wording gone', () => {
  assert.match(text, /Review available campaign and enquiry data\./);
  assert.match(text, /Identify measurement gaps and recommend improvements\./);
  assert.match(text, /Review meaningful actions where reliable data is available\./);
  assert.match(text, /Monthly performance reporting\./);
  assert.match(text, /Review calls as agreed in the proposal\./);
  assert.match(text, /Scoped separately unless the proposal includes it/);
  for (const s of ['New tracking setup and repairs.', 'Website integrations and technical tracking implementation.', 'Website, form and landing-page changes.', 'Video, reels and additional creative production.']) assert.ok(text.includes(s), s);
  assert.doesNotMatch(text, /where technically possible, we set up tracking/i);
  assert.match(text, /An enquiry we can see is not always an enquiry an ad caused\. Where we cannot tell, we say so\./);
  assert.doesNotMatch(text, /every (client|Meta)[^.]*review call|monthly review call/i);
});
test('creative wording has no fixed quantity, video promise or unlimited revisions', () => {
  assert.match(text, /Static ad creative requirements and allowances are defined in your proposal\. Video, reels and additional production are scoped separately\./);
  assert.doesNotMatch(text, /defined number of static|unlimited|\b\d+ (static|ads|designs|reels)\b/i);
});
test('no claims beyond the evidence: no other platforms, figures, certifications, free offers, WhatsApp results', () => {
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|LinkedIn Ads|ChatGPT|TikTok|Apple/i);
  assert.doesNotMatch(text, /Meta (Business )?Partner|certified|official partner/i);
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|ROAS|CPA|testimonial/i);
  assert.doesNotMatch(text, /free (audit|review|account|consultation)|within \d+ (hours|minutes)/i);
  assert.doesNotMatch(text, /WhatsApp (leads|conversions|sales)/i);
  assert.doesNotMatch(text, /\b\d[\d,]* (likes|comments|followers|shares)\b/i);
});
test('copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/meta-ads/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('the phone feed is illustrative and labelled', () => {
  assert.match(html, /aria-hidden="true"[^>]*class="mx-feed"|class="mx-feed"[^>]*aria-hidden="true"/);
  assert.match(text, /Sponsored · Illustrative ad/);
});
test('work: Om Sai linked with live-case wording, Wanderlooms unlinked, /work linked', () => {
  const cards = html.split('class="mx-work"').slice(1);
  assert.equal(cards.length, 2);
  const [om, wl] = cards;
  assert.match(om, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.ok(om.includes('Om Sai needed to sell 2 and 3 BHK apartments in Chembur against a specific buyer brief.'));
  assert.match(wl, /Wanderlooms/);
  assert.match(wl, /Meta advertising for an adventure apparel brand featured on Shark Tank India\./);
  assert.doesNotMatch(wl.split('</article>')[0], /<a\b/);
  assert.match(html, /href="\/work"/);
  assert.doesNotMatch(html.split('aria-labelledby="mx-work"')[1].split('</section>')[0], /<img/);
});
test('cost: a two-part investment equation with separately scoped work as an optional area', () => {
  assert.match(text, /Your advertising investment = Meta ad spend Paid directly to Meta\. \+ MappedSkills management fee Charged separately\./);
  assert.match(text, /Only when needed\./);
  assert.match(text, /quoted separately, and only when agreed/);
  assert.match(text, /When performance disappoints, we tell you early and review what to change\./);
  assert.match(html, /href="\/pricing"/);
});
test('fit lists, Google link and the paid-advertising clarification', () => {
  assert.match(text, /Pause and check first/);
  assert.match(text, /Customer acquisition economics that do not work\./);
  assert.match(html, /href="\/google-ads"/);
  assert.match(text, /This is paid advertising, not managing your social media pages\./);
});
test('seven native FAQs matching FAQPage; Click-to-WhatsApp answer is the approved text', () => {
  assert.equal((html.match(/<details>/g) || []).length, 7);
  const faq = parse(ld).find(j => j['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 7);
  for (const q of faq.mainEntity) { assert.ok(text.includes(q.name)); assert.ok(text.includes(q.acceptedAnswer.text)); }
  assert.match(text, /Yes\. We can run Meta ads that open a WhatsApp conversation when that suits your customers and sales process\. Your team needs to respond to enquiries promptly\. We will recommend this approach only when it fits your business\./);
  assert.match(text, /Ready to bring your offer to the right people\?/);
});
test('structured data: one Service node identical to the /services Meta node, India as Country', () => {
  const nodes = parse(ld);
  assert.deepEqual(nodes.map(n => n['@type']).sort(), ['FAQPage', 'Service']);
  const svc = nodes.find(n => n['@type'] === 'Service');
  assert.deepEqual(svc.areaServed, { '@type': 'Country', name: 'India' });
  const fromServices = parse(renderToStaticMarkup(React.createElement(ServicesJsonLd))).find(n => n['@type'] === 'Service' && n.name === 'Meta Ads management');
  assert.deepEqual(svc, fromServices);
  assert.doesNotMatch(ld, /"City"|"(price|priceRange|offers|aggregateRating|review)"/i);
});
test('route keeps the live title, description, canonical and breadcrumb label', () => {
  const src = fs.readFileSync('app/(pages)/social-media-ads/page.tsx', 'utf8');
  assert.ok(src.includes("'Paid Social, Judged on the Enquiries It Produces | MappedSkills'"));
  assert.ok(src.includes('We run paid social advertising, and we will tell you when it is the wrong channel for your business.'));
  assert.match(src, /<BreadcrumbJsonLd label="Paid social" path="\/social-media-ads" \/>/);
  const { metadata } = load('app/(pages)/social-media-ads/page.tsx');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/social-media-ads');
});
test('stylesheet: no sticky or fixed elements, a reduced-motion override, nothing hidden without script', () => {
  const css = fs.readFileSync('components/paid-advertising/meta-ads/meta-ads.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(html, /data-pending/);
});
