/**
 * C1 (DEC-071) — the consolidated /contact form: one form, two intentions.
 *
 * Server rules (`lib/enquiry-validation.ts`, `lib/contact-request.ts`, transpiled with the project's own TypeScript as
 * in enquiry-call-request.test.cjs), the CRM payload inside the unchanged strict schema_version 1 contract, the
 * redirect and rewrite config, the sitemap, internal links, and static guarantees of the form source. The behaviour
 * in a browser is covered by tests/e2e/contact-consolidation.e2e.cjs.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const ROOT = path.join(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
function load(rel) {
  const js = ts.transpileModule(read(rel), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const mod = { exports: {} };
  const req = (id) => (id.startsWith('@/') ? load(`${id.slice(2)}.ts`) : require(id));
  vm.runInNewContext(js, { module: mod, exports: mod.exports, require: req });
  return mod.exports;
}

const { validateEnquiry } = load('lib/enquiry-validation.ts');
const { SERVICE_OPTIONS, normalisePhone, intentFromParam, CONTACT_MESSAGES } = load('lib/contact-request.ts');
const { buildCrmPayload } = require('../lib/crm-delivery.cjs');

const KEY = '7a1f0c2e-3b4d-4e5f-8a9b-0c1d2e3f4a5b';
const submit = (over = {}) =>
  validateEnquiry({
    requestType: 'enquiry',
    idempotencyKey: KEY,
    name: 'Test Person',
    email: 'Test@Example.com',
    phone: '98765 43210',
    service: 'seo',
    message: '',
    preferredContactTime: '',
    contactReference: '',
    elapsedMs: 9000,
    sourcePage: '/contact',
    ...over,
  });

/* ------------------------------------------------------------------ server rules */

test('an enquiry needs name, email, phone and service; the message is optional', () => {
  const r = submit();
  assert.equal(r.ok, true);
  assert.equal(r.value.requestType, 'enquiry');
  assert.equal(r.value.service, 'seo');
  assert.equal(r.value.serviceLabel, 'Search Engine Optimisation (SEO)');
  assert.equal(r.value.message, '');
  assert.equal(r.value.phone, '+919876543210');
  assert.equal(r.value.email, 'test@example.com');
  assert.equal(r.value.company, '');
  assert.equal(r.value.website, null);
  assert.equal(r.value.marketingConsent, false);
  assert.equal(r.value.sourcePage, '/contact');
  assert.equal(r.value.suspect, false);
});

test('every required field is reported with the shared wording', () => {
  const r = submit({ name: ' ', email: '', phone: '', service: '' });
  assert.equal(r.ok, false);
  assert.deepEqual(JSON.parse(JSON.stringify(r.fieldErrors)), {
    name: CONTACT_MESSAGES.nameRequired,
    email: CONTACT_MESSAGES.emailRequired,
    phone: CONTACT_MESSAGES.phoneRequired,
    service: CONTACT_MESSAGES.serviceRequired,
  });
});

test('all eight services are accepted by their stable value, in the approved order', () => {
  assert.deepEqual(
    [...SERVICE_OPTIONS.map((o) => o.label)],
    [
      'Google Ads',
      'Paid Social / Meta Ads',
      'Search Engine Optimisation (SEO)',
      'AI Search Visibility',
      'Lead Generation',
      'Conversion Rate Optimisation',
      'Marketing Strategy / Not Sure',
      'Something Else',
    ]
  );
  assert.equal(new Set(SERVICE_OPTIONS.map((o) => o.value)).size, 8);
  for (const { value, label } of SERVICE_OPTIONS) {
    const r = submit({ service: value });
    assert.equal(r.ok, true, value);
    assert.equal(r.value.service, value);
    assert.equal(r.value.serviceLabel, label);
  }
});

test('a label, an unknown value or a non-string is not a service', () => {
  for (const service of ['Google Ads', 'GOOGLE_ADS', 'seo ', 'booking', 7, null, ['seo']]) {
    const r = submit({ service });
    // ' seo ' trims to a valid value; everything else must fail
    if (service === 'seo ') {
      assert.equal(r.ok, true);
      continue;
    }
    assert.equal(r.ok, false, String(service));
    assert.equal(r.fieldErrors.service, CONTACT_MESSAGES.serviceRequired);
  }
});

test('invalid email formats are rejected; a well-formed address is not claimed deliverable', () => {
  for (const email of ['name', 'name@', 'name@company', 'a b@c.com', 'name@company.c']) {
    assert.equal(submit({ email }).fieldErrors.email, CONTACT_MESSAGES.emailFormat, email);
  }
  assert.equal(submit({ email: 'someone@gmail.com' }).ok, true, 'free mail is not rejected');
  assert.equal(submit({ email: `${'a'.repeat(250)}@b.co` }).fieldErrors.email, CONTACT_MESSAGES.tooLong(254));
});

test('phone numbers are normalised to E.164, India by default', () => {
  const ok = {
    '98765 43210': '+919876543210',
    '+91 98765 43210': '+919876543210',
    '+91-98765-43210': '+919876543210',
    '+91 098765 43210': '+919876543210',
    '09876543210': '+919876543210',
    '919876543210': '+919876543210',
    '0091 98765 43210': '+919876543210',
    '011 2345 6789': '+911123456789',
    '+44 20 7946 0958': '+442079460958',
    '+1 (415) 555-0132': '+14155550132',
    '+971 50 123 4567': '+971501234567',
    '+65 6123 4567': '+6561234567',
    '0044 7700 900123': '+447700900123',
  };
  for (const [input, expected] of Object.entries(ok)) assert.equal(normalisePhone(input), expected, input);
  const bad = [
    '', '12345', '+91 12345', '+91 98765 4321', '98765 4321', '+0 123 456 789', '+1234567890123456',
    '0000000000', '+91 99999 99999', '+44 0000000', '98765abc10', '98765+43210', 'call me', '415 555 0132',
  ];
  for (const input of bad) assert.equal(normalisePhone(input), null, input);
  assert.equal(submit({ phone: '12345' }).fieldErrors.phone, CONTACT_MESSAGES.phoneFormat);
  assert.equal(submit({ phone: '+44 20 7946 0958' }).value.phone, '+442079460958');
});

test('the message is optional, capped at 4000 and keeps its line breaks but not control characters', () => {
  assert.equal(submit({ message: 'a'.repeat(4000) }).ok, true);
  assert.equal(submit({ message: 'a'.repeat(4001) }).fieldErrors.message, CONTACT_MESSAGES.tooLong(4000));
  assert.equal(submit({ message: 'Line 1\nLine 2\u0007' }).value.message, 'Line 1\nLine 2');
  assert.equal(submit({ message: undefined }).value.message, '');
});

test('preferred contact time is stored for a call request only, and never required', () => {
  const call = submit({ requestType: 'call', preferredContactTime: ' Weekdays, 2–5 PM IST ' });
  assert.equal(call.ok, true);
  assert.equal(call.value.requestType, 'call');
  assert.equal(call.value.preferredContactTime, 'Weekdays, 2–5 PM IST');
  assert.equal(submit({ requestType: 'call', preferredContactTime: '' }).value.preferredContactTime, null);
  assert.equal(submit({ requestType: 'call', preferredContactTime: 'x'.repeat(121) }).fieldErrors.preferredContactTime,
    CONTACT_MESSAGES.tooLong(120));
  const enquiry = submit({ requestType: 'enquiry', preferredContactTime: 'Weekdays, 2–5 PM IST' });
  assert.equal(enquiry.ok, true);
  assert.equal(enquiry.value.preferredContactTime, null, 'ignored on an enquiry');
  assert.equal(submit({ requestType: 'enquiry', preferredContactTime: 'x'.repeat(500) }).ok, true);
});

test('a missing or unknown intention, and a non-boolean consent, are malformed', () => {
  for (const requestType of [undefined, '', 'booking', 'CALL', 1]) {
    const r = submit({ requestType });
    assert.equal(r.ok, false);
    assert.equal(r.formError, 'malformed', String(requestType));
  }
  assert.equal(submit({ marketingConsent: 'yes' }).formError, 'malformed');
  assert.equal(submit({ marketingConsent: true }).value.marketingConsent, false, 'not offered, so never recorded');
});

test('spam layers still flag and never reject; company and website sent anyway are ignored', () => {
  const honeypot = submit({ contactReference: 'http://spam.example' });
  assert.equal(honeypot.ok, true);
  assert.equal(honeypot.value.suspect, true);
  const fast = submit({ elapsedMs: 300 });
  assert.equal(fast.ok, true);
  assert.equal(fast.value.suspect, true);
  const extra = submit({ company: 'Injected', website: 'evil.example' });
  assert.equal(extra.value.company, '');
  assert.equal(extra.value.website, null);
});

test('the source page is a same-origin path or nothing; attribution is still parsed', () => {
  assert.equal(submit({ sourcePage: '/contact?intent=call' }).value.sourcePage, null);
  assert.equal(submit({ sourcePage: 'https://evil.example/contact' }).value.sourcePage, null);
  const r = submit({ attribution: { firstSource: 'google', firstMedium: 'cpc', firstSourceDerived: false } });
  assert.equal(r.value.attribution.firstSource, 'google');
  assert.equal(r.value.attribution.status, 'complete');
});

test('intentFromParam: only "call" selects the call request', () => {
  assert.equal(intentFromParam('call'), 'call');
  for (const v of [null, undefined, '', 'enquiry', 'Call', 'booking']) assert.equal(intentFromParam(v), 'enquiry');
});

/* ------------------------------------------------------------------ CRM payload */

// The Mini CRM leads contract (internal-crm lib/integrations/mappedskills/lead-payload.ts, origin/main 8d250d4) is
// strict: an unknown key is a 400, which lib/crm-delivery.cjs treats as terminal. These are its exact key sets.
const CRM_TOP = ['attribution', 'enquiry', 'event_id', 'event_type', 'schema_version', 'submitted_at'];
const CRM_ENQUIRY = ['company', 'email', 'marketing_consent', 'marketing_consent_text', 'message', 'name', 'phone',
  'source_page', 'suspect', 'website'];
const crm = (r) => JSON.parse(buildCrmPayload({ enquiry: r.value, consentText: 'v1', submittedAt: new Date('2026-10-20T10:00:00Z') }));

test('the CRM payload keeps the strict schema_version 1 key sets', () => {
  for (const r of [submit(), submit({ requestType: 'call', preferredContactTime: 'Mornings' })]) {
    const body = crm(r);
    assert.deepEqual(Object.keys(body).sort(), CRM_TOP);
    assert.deepEqual(Object.keys(body.enquiry).sort(), CRM_ENQUIRY);
    assert.equal(body.schema_version, 1);
  }
});

test('the intention, service and preferred time reach the CRM as message lines', () => {
  const enquiry = crm(submit({ message: 'We need more leads.' }));
  assert.equal(enquiry.enquiry.message, 'Request: Enquiry\nService: Search Engine Optimisation (SEO)\n\nWe need more leads.');
  assert.equal(enquiry.enquiry.source_page, '/contact');
  assert.equal(enquiry.enquiry.phone, '+919876543210');

  const call = crm(submit({ requestType: 'call', service: 'google_ads', preferredContactTime: 'Weekdays, 2–5 PM IST' }));
  assert.equal(call.enquiry.message,
    'Request: Call request\nService: Google Ads\nPreferred time to be contacted: Weekdays, 2–5 PM IST');
  // The value Mini CRM's "Website requests" list already reads as "Call request".
  assert.equal(call.enquiry.source_page, '/schedule-call');
});

test('a maximum-length message stays inside the CRM limits (5000 characters, 16 KB body)', () => {
  const r = submit({ requestType: 'call', message: '₹'.repeat(4000), preferredContactTime: 'ा'.repeat(120), name: 'न'.repeat(120) });
  assert.equal(r.ok, true);
  const raw = buildCrmPayload({ enquiry: r.value, consentText: 'v1', submittedAt: new Date() });
  assert.ok(JSON.parse(raw).enquiry.message.length <= 5000);
  assert.ok(Buffer.byteLength(raw, 'utf8') <= 16 * 1024, String(Buffer.byteLength(raw, 'utf8')));
});

test('payloads from the earlier forms are byte-for-byte unchanged in shape and meaning', () => {
  const legacyCall = validateEnquiry({ requestType: 'call', idempotencyKey: KEY, name: 'A', email: 'a@b.co', phone: '+44 7700 900000', message: 'Hi', sourcePage: '/schedule-call' });
  const body = crm(legacyCall);
  assert.equal(body.enquiry.message, 'Hi');
  assert.equal(body.enquiry.source_page, '/schedule-call');
  assert.equal(body.enquiry.phone, '+44 7700 900000', 'legacy phone stored as typed');
});

/* ------------------------------------------------------------------ routing, links, sitemap */

test('/schedule-call redirects permanently to the call state; /contact?intent=call is rewritten, prerendered', async () => {
  const { default: config } = await import(path.join(ROOT, 'next.config.mjs'));
  const redirects = await config.redirects();
  const sc = redirects.find((r) => r.source === '/schedule-call');
  assert.deepEqual(sc, { source: '/schedule-call', destination: '/contact?intent=call', permanent: true });
  assert.ok(redirects.some((r) => r.source === '/contact/call' && r.destination === '/contact?intent=call' && r.permanent));
  const rewrites = await config.rewrites();
  assert.deepEqual(rewrites.beforeFiles, [
    { source: '/contact', has: [{ type: 'query', key: 'intent', value: 'call' }], destination: '/contact/call' },
  ]);
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(pages)/contact/call/page.tsx')));
  assert.ok(!fs.existsSync(path.join(ROOT, 'app/(pages)/schedule-call')), 'the old route is replaced by the redirect');
});

test('canonical is /contact for both states; the sitemap no longer lists /schedule-call', () => {
  assert.match(read('app/(pages)/contact/page.tsx'), /'\/contact'\n\);/);
  assert.match(read('app/(pages)/contact/call/page.tsx'), /'Request a Call \| MappedSkills'[\s\S]*'\/contact'\n\);/);
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /'\/contact',/);
  assert.ok(!/^\s*'\/schedule-call',/m.test(sitemap));
});

test('no internal link points at /schedule-call any more', () => {
  const files = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = path.join(dir, e.name);
      if (e.isDirectory()) walk(rel);
      else if (/\.(tsx?|mjs)$/.test(e.name)) files.push(rel);
    }
  };
  ['app', 'components', 'lib'].forEach(walk);
  const offenders = files.filter((f) => /href(=|:\s*)["'{]?\s*['"]\/schedule-call/.test(read(f)) || /_HREF = '\/schedule-call'/.test(read(f)));
  assert.deepEqual(offenders, []);
  assert.match(read('components/direction-c/nav.ts'), /CALL_LINK: NavLink = \{ href: '\/contact\?intent=call', label: 'Request a call' \}/);
  assert.match(read('components/direction-c/primitives.tsx'), /BOOKING_HREF = '\/contact\?intent=call'/);
});

/* ------------------------------------------------------------------ the form source */

const form = read('components/forms/ContactForm.tsx');

test('the form starts on the route intention, offers both, and never preselects a service', () => {
  assert.match(form, /useSelectedLayoutSegment\(\) === 'call' \? 'call' : 'enquiry'/);
  assert.match(form, /label: 'Send an enquiry'/);
  assert.match(form, /label: 'Request a call'/);
  assert.match(form, /type="radio"/);
  assert.match(form, /<option value="" disabled>\s*Select a service\s*<\/option>/);
  assert.match(form, /service: '',/, 'empty initial service');
  assert.match(form, /SUBMIT_LABEL: Record<ContactIntent, string> = \{ enquiry: 'Send enquiry', call: 'Request a call' \}/);
  assert.match(form, /'What challenges are you facing, or what would you like to achieve\?'/);
  assert.match(form, /'What would you like to discuss on the call\?'/);
});

test('the conversion fires only on a 2xx, once per key, before navigating', () => {
  const ok = form.indexOf('if (response.ok) {');
  const conv = form.indexOf('trackOnce(EVENTS.LEAD_FORM_SUBMITTED');
  const push = form.indexOf("router.push('/thank-you')");
  assert.ok(ok > 0 && conv > ok && push > conv);
  assert.equal(form.split('LEAD_FORM_SUBMITTED').length - 1, 1, 'one emission site');
  assert.equal(form.split("router.push('/thank-you')").length - 1, 1, 'one success navigation');
  assert.match(form, /if \(inFlightRef\.current\) return;/);
  assert.match(form, /form_id: forIntent === 'call' \? 'call_request' : 'contact_enquiry'/);
});

test('nothing on the contact page implies a booked appointment', () => {
  const copy = read('components/cplus/contact/content.ts') + form;
  for (const banned of [/\bbook(ed|ing)? (a|your) (call|time|meeting|slot)\b/i, /confirmed (call|appointment|meeting)/i, /calendly/i]) {
    assert.ok(!banned.test(copy.replace(/not a booking|isn’t a booking/g, '')), String(banned));
  }
  assert.match(form, /This sends a request, not a booking\./);
});
