/**
 * DEC-062 — the /schedule-call "Request a call" mode of the enquiry pipeline. `lib/enquiry-validation.ts` and
 * `lib/enquiry-confirmation.ts` are transpiled with the project's own TypeScript and run in a fresh module scope, as in
 * consent-guard.test.cjs. Checks: the call rules, that the original enquiry rules are unchanged, and the marker kinds.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const ROOT = path.join(__dirname, '..');
function load(rel, globals = {}) {
  const js = ts.transpileModule(fs.readFileSync(path.join(ROOT, rel), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const mod = { exports: {} };
  // `@/lib/x` imports (C1: lib/contact-request.ts) are transpiled the same way.
  const req = (id) => (id.startsWith('@/') ? load(`${id.slice(2)}.ts`, globals) : require(id));
  vm.runInNewContext(js, { module: mod, exports: mod.exports, require: req, ...globals });
  return mod.exports;
}

const { validateEnquiry } = load('lib/enquiry-validation.ts');
const KEY = '3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e';

const call = (over = {}) =>
  validateEnquiry({ requestType: 'call', idempotencyKey: KEY, name: 'Test Person', email: 'test@example.com', phone: '+44 7700 900000', sourcePage: '/schedule-call', ...over });
const enquiry = (over = {}) =>
  validateEnquiry({ idempotencyKey: KEY, name: 'Test Person', email: 'test@example.com', company: 'Acme', message: 'Help', ...over });

test('a call request needs name, email and phone, and stores empty company and message', () => {
  const r = call();
  assert.equal(r.ok, true);
  assert.equal(r.value.company, '');
  assert.equal(r.value.message, '');
  assert.equal(r.value.phone, '+44 7700 900000');
  assert.equal(r.value.website, null);
  assert.equal(r.value.sourcePage, '/schedule-call');
  // C1 (DEC-071): the earlier forms map to the new structured fields.
  assert.equal(r.value.requestType, 'call');
  assert.equal(r.value.service, null);
  assert.equal(r.value.preferredContactTime, null);
});

test('a call request keeps an optional message and ignores company and website', () => {
  const r = call({ message: 'Our ads', company: 'Ignored Ltd', website: 'example.com' });
  assert.equal(r.ok, true);
  assert.equal(r.value.message, 'Our ads');
  assert.equal(r.value.company, '');
  assert.equal(r.value.website, null);
});

test('a call request without a usable phone is rejected with the call wording', () => {
  for (const phone of [undefined, '', '12345']) {
    const r = call({ phone });
    assert.equal(r.ok, false);
    assert.deepEqual(Object.keys(r.fieldErrors), ['phone']);
    assert.equal(r.fieldErrors.phone, 'Enter a number we can reach you on, including the country code.');
  }
});

test('a call request without name or email gets the call wording', () => {
  const r = call({ name: '', email: '' });
  assert.equal(r.ok, false);
  assert.equal(r.fieldErrors.name, 'Enter the name we should use when we get in touch.');
  assert.equal(r.fieldErrors.email, 'Enter an email address so we can get in touch.');
});

test('an unknown requestType is malformed', () => {
  const r = call({ requestType: 'booking' });
  assert.equal(r.ok, false);
  assert.equal(r.formError, 'malformed');
});

test('the enquiry rules are unchanged without requestType (and with requestType "enquiry")', () => {
  assert.equal(enquiry().ok, true);
  assert.equal(enquiry().value.requestType, 'enquiry');
  assert.equal(enquiry({ requestType: 'enquiry' }).ok, true);
  const r = enquiry({ company: '', message: '' });
  assert.equal(r.ok, false);
  assert.equal(r.fieldErrors.company, 'Enter your company name. One word is enough.');
  assert.equal(r.fieldErrors.message, 'Tell us what you are trying to fix, in your own words.');
  assert.equal(r.fieldErrors.phone, undefined);
  assert.equal(enquiry({ phone: '123' }).fieldErrors.phone, 'Enter a number we can reach you on, or leave this blank.');
  assert.equal(enquiry({ name: '' }).fieldErrors.name, 'Enter the name we should use when we reply.');
});

function storage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), m };
}

test('the confirmation marker carries its kind once, with no personal data', () => {
  const sessionStorage = storage();
  const c = load('lib/enquiry-confirmation.ts', { window: { sessionStorage } });
  c.markEnquiryConfirmed('call');
  assert.match([...sessionStorage.m.values()][0], /^call:\d+$/);
  assert.equal(c.consumeEnquiryConfirmation(), 'call');
  assert.equal(c.consumeEnquiryConfirmation(), null);
  c.markEnquiryConfirmed();
  assert.match([...sessionStorage.m.values()][0], /^\d+$/);
  assert.equal(c.consumeEnquiryConfirmation(), 'enquiry');
});

test('stale, future, empty and garbage markers are not confirmations', () => {
  const sessionStorage = storage();
  const c = load('lib/enquiry-confirmation.ts', { window: { sessionStorage } });
  for (const v of [String(Date.now() - 11 * 60 * 1000), 'call:' + (Date.now() + 60000), '', 'call:', 'call:x', 'nope']) {
    sessionStorage.setItem('ms.enquiry.confirmed.v1', v);
    assert.equal(c.consumeEnquiryConfirmation(), null, v);
  }
});
