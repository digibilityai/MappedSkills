const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingGoogleAds } = load('components/paid-advertising/google-ads/PaidAdvertisingGoogleAds.tsx');
const { GoogleAdsJsonLd } = load('components/paid-advertising/google-ads/GoogleAdsJsonLd.tsx');
const { ServicesJsonLd } = load('components/paid-advertising/services/ServicesJsonLd.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingGoogleAds));
const ld = renderToStaticMarkup(React.createElement(GoogleAdsJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const parse = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('one H1 and the eight approved sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['gx-h1', 'gx-why', 'gx-breaks', 'gx-fit', 'gx-how', 'gx-case', 'gx-cost', 'gx-faq', 'gx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
});
test('approved hero, CTAs and journey', () => {
  assert.match(text, /Reach people already searching for what you sell\./);
  assert.match(text, /We run your ads\. We look beyond the click\./);
  assert.match(text, /We plan and manage Google Ads to help your business reach people looking for what you sell\. And we look beyond clicks to understand whether those visits become meaningful enquiries\./);
  assert.match(html, /href="\/contact">Discuss Google Ads/);
  assert.match(html, /href="\/contact\?intent=call">Request a call/);
  assert.doesNotMatch(text, /Book a call|trying to fix/);
  const stages = [...html.matchAll(/class="gx-node"[^>]*>\d<\/span><h3>([^<]+)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stages, ['Relevant search', 'Ad message', 'Landing page', 'Enquiry or purchase']);
  assert.match(text, /When the journey breaks, your ad budget may be spent without bringing you closer to a customer\./);
});
test('four failure points with management, separately scoped and client responsibilities', () => {
  for (const k of ['Irrelevant searches', 'Ad message does not match the offer', 'Landing-page friction', 'Weak tracking or unanswered enquiries']) assert.match(text, new RegExp(k));
  assert.match(text, /Creating or changing pages, and fixing forms\./);
  assert.match(text, /Setting up or repairing tracking\./);
  assert.match(text, /Your side Replying to enquiries promptly\./);
  assert.match(text, /Management and oversight are covered by our management fee/);
});
test('Reporting Policy A wording, with no universal review-call promise', () => {
  assert.match(text, /a monthly performance report with ongoing management, and review calls as agreed\. Where an enquiry cannot be traced to an ad, we say so\./);
  assert.doesNotMatch(text, /every (Google Ads )?(management )?client (receives|gets)|monthly review call/i);
});
test('no other platforms, certifications, free offers, response times, campaign-type claims or figures', () => {
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|LinkedIn Ads|ChatGPT|Apple|Performance Max|Shopping campaign|Demand Gen/i);
  assert.doesNotMatch(text, /Google Partner|certified/i);
  assert.doesNotMatch(text, /free (audit|review|account|consultation)|within \d+ (hours|minutes)|response time/i);
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|ROAS|CPA|testimonial/i);
});
test('copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/google-ads/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('case preview uses the live spelling and documented facts, links the case and /work, and shows no image or figures', () => {
  const sec = html.split('aria-labelledby="gx-case"')[1].split('</section>')[0];
  assert.match(sec, /AnyBodyCanBake/);
  assert.doesNotMatch(text, /AnybodyCanBake/);
  for (const f of ['Pune online baking school', 'eggless and healthy baking', 'Keyword research', 'Ad copy and creative', 'Audience targeting', 'Ongoing optimisation']) assert.ok(sec.includes(f), f);
  assert.match(sec, /href="\/portfolio\/google-ads-for-online-courses"/);
  assert.match(sec, /href="\/work"/);
  assert.doesNotMatch(sec, /<img/);
});
test('cost: spend, fee and separately scoped work, no prices, with the expectation wording', () => {
  assert.match(text, /Google ad spend.*Paid directly to Google/);
  assert.match(text, /MappedSkills management fee.*Charged separately/);
  assert.match(text, /Separately scoped work.*Landing-page, website, form or tracking changes/);
  assert.match(text, /When performance disappoints, we tell you early and review what to change\./);
  assert.match(html, /href="\/pricing"/);
});
test('fit lists and the Meta Ads link', () => {
  assert.match(text, /Online courses and training/);
  assert.match(text, /May be premature/);
  assert.match(html, /href="\/social-media-ads"/);
});
// Superseded by tests/frozen-designs-integration.test.cjs: FAQ and FAQPage parity now follows the frozen design.
test('structured data: one Service node identical to the one /services emits, India as Country, no ratings or prices', () => {
  const nodes = parse(ld);
  assert.deepEqual(nodes.map(n => n['@type']).sort(), ['FAQPage', 'Service']);
  const svc = nodes.find(n => n['@type'] === 'Service');
  assert.deepEqual(svc.areaServed, { '@type': 'Country', name: 'India' });
  const fromServices = parse(renderToStaticMarkup(React.createElement(ServicesJsonLd))).find(n => n['@type'] === 'Service' && n.name === 'Google Ads management');
  assert.deepEqual(svc, fromServices);
  assert.doesNotMatch(ld, /"City"|"(price|priceRange|offers|aggregateRating|review)"/i);
});
test('route keeps the live title, description, canonical and existing breadcrumb trail', () => {
  const src = fs.readFileSync('app/(pages)/google-ads/page.tsx', 'utf8');
  assert.ok(src.includes("'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills'"));
  assert.ok(src.includes("'/google-ads'"));
  assert.match(src, /<BreadcrumbJsonLd label="Paid search" path="\/google-ads" \/>/);
  const { metadata } = load('app/(pages)/google-ads/page.tsx');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/google-ads');
});
test('stylesheet adds no sticky or fixed elements and provides a reduced-motion override; script-free render has no hidden content', () => {
  const css = fs.readFileSync('components/paid-advertising/google-ads/google-ads.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(html, /data-pending/);
});
