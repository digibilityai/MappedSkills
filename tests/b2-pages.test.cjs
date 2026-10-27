// Guards for B2 (How it works, Pricing, About, FAQ, Contact, Thank you; owner-approved Revision 3 designs):
// metadata, canonical and robots unchanged; owner corrections present; nothing unverified published; no long or double
// dashes; the form contract untouched; thank-you stays noindex with no tracking code of its own.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const B2 = ['HowItWorks', 'Pricing', 'About', 'Faq', 'Contact', 'Band'];
const src = Object.fromEntries(B2.map((n) => [n, read(`components/b2/${n}.tsx`)]));
const all = B2.map((n) => code(src[n])).join('\n') + code(read('components/cplus/faq/faqData.ts'));

test('metadata, canonical and thank-you robots are unchanged', () => {
  assert.match(read('app/(pages)/how-it-works/page.tsx'), /'How It Works: From First Call to Monthly Review \| MappedSkills'[\s\S]*'\/how-it-works'/);
  assert.match(read('app/(pages)/pricing/page.tsx'), /'Pricing \| Tailored Digital Marketing Quotes \| MappedSkills'[\s\S]*'\/pricing'/);
  assert.match(read('app/(pages)/about/page.tsx'), /'About MappedSkills \| Our Approach'[\s\S]*'\/about'/);
  assert.match(read('app/(pages)/about/page.tsx'), /How MappedSkills plans and manages Google Ads and Meta Ads, and why we judge it on enquiries\./);
  assert.match(read('components/b2/b2.css'), /\.b2-path \.t \{ background: var\(--resolve-accent\); color: var\(--resolve-ink\); \}/);
  assert.match(read('app/(pages)/faq/page.tsx'), /'Questions We Get Asked, Answered Plainly \| MappedSkills'[\s\S]*'\/faq'/);
  const ty = read('app/(pages)/thank-you/page.tsx');
  assert.match(ty, /robots: 'noindex, nofollow'/);
  assert.match(ty, /'Enquiry Confirmation \| MappedSkills'/);
  assert.doesNotMatch(code(read('app/sitemap.ts')), /thank-you/);
});

test('no long dashes or double hyphens in B2 copy', () => {
  assert.doesNotMatch(all.replace(/'--[a-z-]+'/g, '').replace(/var\(--[a-z-]+/g, ''), /[—–]|--/);
});

test('owner corrections: proposal sentence, accurate responsibilities, no team or history claims', () => {
  assert.ok(src.Pricing.includes('Your written proposal confirms the agreed scope, deliverables, fees and terms.'));
  assert.doesNotMatch(all, /Where this page and your proposal differ/);
  assert.doesNotMatch(all, /We do most of the work|one part only you can do|Every engagement runs the same way/);
  assert.ok(src.HowItWorks.includes('We plan, run and report on the agreed advertising. You provide access and knowledge, make decisions and follow up the enquiries that come in.'));
  assert.doesNotMatch(code(src.About), /wider team|team head|The people|Founded|since 20\d\d|TEAM_HEADS|placeholder/i);
  assert.match(src.About, /independently operated/);
});

test('no prices, guarantees, timelines or unverified claims', () => {
  assert.doesNotMatch(all, /₹|\bINR\b|\bRs\.?\s?\d|\$\d|starting (at|from) (₹|\$|\d)|per month|\b\d+\s*(days?|weeks?|months?)\b/i);
  assert.doesNotMatch(all.replace(/no one can honestly guarantee|do not guarantee|guaranteed outcomes|Can you guarantee|promise|guarantee results|guarantee more|nothing here is a price list|guarantee-results|need a guaranteed result/gi, ''), /\bguarantee/i);
  assert.match(src.Pricing, /paid directly to (the platform|Google or Meta)/i);
});

test('process diagram is plain HTML: no rotated text', () => {
  assert.doesNotMatch(src.HowItWorks, /rotate\(|writing-mode|<svg/);
  assert.doesNotMatch(read('components/b2/b2.css'), /writing-mode/);
});

test('FAQ: native disclosure, live anchors kept, FAQPage from the same data', () => {
  assert.match(src.Faq, /<details id=\{qa\.id\} className="b2-d">/);
  assert.match(src.Faq, /legacyId \? <span id=\{g\.legacyId\}/);
  const data = read('components/cplus/faq/faqData.ts');
  for (const id of ['g-commercial', 'g-outcome', 'g-measurement', 'g-fit', 'g-ai-search']) assert.ok(data.includes(`'${id}'`), id);
  assert.match(read('app/(pages)/faq/page.tsx'), /mainEntity: QAS\.map[\s\S]*text: plainAnswer\(qa\)/);
  assert.match(data, /id: 'q-how-long-before-anything-changes'[\s\S]*Meta Ads[\s\S]*We do not give a date for results\./);
  assert.doesNotMatch(data, /Organic search/);
});

test('contact: all eight service options and the form contract are untouched', () => {
  const cr = read('lib/contact-request.ts');
  assert.strictEqual([...cr.matchAll(/\{ value: '[a-z_]+', label:/g)].length, 8);
  const form = read('components/forms/ContactForm.tsx');
  assert.ok(form.includes('We couldn’t confirm that your enquiry was received.'));
  assert.doesNotMatch(form, /so your enquiry has not been saved\. Check your connection/);
  assert.match(form, /idempotencyKeyRef\.current === null/);
  assert.match(form, /trackOnce\(EVENTS\.LEAD_FORM_SUBMITTED, idempotencyKey/);
  assert.match(src.Contact, /<ContactForm labelledBy="sc-h1" \/>/);
});

test('thank-you: confirmation only through the one-time marker; no tracking code on the page', () => {
  assert.match(src.Contact, /<EnquiryConfirmationGate confirmed=\{<Confirmed call=\{false\} \/>\} callConfirmed=\{<Confirmed call \/>\} neutral=\{<Neutral \/>\}/);
  assert.doesNotMatch(code(src.Contact), /track\(|trackOnce|EVENTS|gtag|dataLayer/);
  const confirmedCopy = read('components/cplus/contact/content.ts');
  assert.doesNotMatch(confirmedCopy.split('THANKS_PLAIN')[1].split('THANKS_NEUTRAL')[0], /within|hours|business day|minutes/i);
});

test('stylesheet: reduced motion handled; durations are 150 ms or the single entrance reveal', () => {
  const css = read('components/b2/b2.css');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  const d = [...css.matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(d.every((n) => n === 150 || n === 400), String(d));
  assert.doesNotMatch(css, /position:\s*sticky|@keyframes|animation:/);
});
