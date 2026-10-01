const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { MAX_ATTEMPTS, buildCrmPayload, deliverEnquiry, retryPending } = require('../lib/crm-delivery.cjs');

const SECRET = 'x'.repeat(48);
const ENV = { MAPPEDSKILLS_LEAD_WEBHOOK_SECRET: SECRET, MAPPEDSKILLS_CRM_LEAD_URL: 'https://crm.test/leads' };
const MIN = 60_000;
const T0 = new Date('2026-10-01T10:00:00.000Z');

const attribution = {
  firstLandingPage: '/seo', firstReferrerHost: 'google.com', firstSource: 'google', firstMedium: 'organic',
  firstCampaign: null, firstContent: null, firstTerm: 'seo agency',
  firstTouchAt: new Date('2026-09-28T08:00:00.000Z'), firstSourceDerived: true,
  latestSource: 'newsletter', latestMedium: 'email', latestCampaign: 'oct', latestReferrerHost: null,
  status: 'complete',
};
const enquiry = (over = {}) => ({
  idempotencyKey: '3f1c1d52-6c52-4a5e-9a39-0b8f7a1d2e10', name: 'Asha', email: 'asha@example.com',
  company: 'Acme', message: 'Hello — ₹ café', phone: null, website: null, sourcePage: '/contact',
  marketingConsent: true, suspect: false, attribution, ...over,
});
const payloadFor = (e = enquiry()) => buildCrmPayload({ enquiry: e, consentText: 'consent v1', submittedAt: T0 });

/** In-memory stand-in for the enquiries table, implementing only the SQL the module issues. */
function fakeDb(rows) {
  return {
    rows,
    async execute(sql, p) {
      const s = sql.replace(/\s+/g, ' ');
      if (s.startsWith('UPDATE enquiries SET crm_attempts = crm_attempts + 1')) {
        const [now, id, max, nowAgain, maxBackoff] = p;
        const r = rows.find((x) => x.id === id);
        const due = !r.crm_last_attempt_at ||
          (nowAgain - r.crm_last_attempt_at) / 1000 >= Math.min(2 ** r.crm_attempts, maxBackoff) * 60;
        if (r && r.crm_payload && !r.crm_delivered_at && r.crm_attempts < max && due) {
          r.crm_attempts += 1; r.crm_last_attempt_at = now;
          return [{ affectedRows: 1 }];
        }
        return [{ affectedRows: 0 }];
      }
      if (s.startsWith('SELECT crm_payload')) return [[{ crm_payload: rows.find((x) => x.id === p[0]).crm_payload }]];
      if (s.startsWith('UPDATE enquiries SET crm_delivered_at')) { rows.find((x) => x.id === p[1]).crm_delivered_at = p[0]; return [{}]; }
      if (s.startsWith('UPDATE enquiries SET crm_attempts = ?')) { rows.find((x) => x.id === p[1]).crm_attempts = p[0]; return [{}]; }
      if (s.startsWith('SELECT id FROM enquiries')) {
        return [rows.filter((r) => r.crm_payload && !r.crm_delivered_at && r.crm_attempts < p[0]).slice(0, Number(/LIMIT (\d+)/.exec(s)[1]))];
      }
      throw new Error(`unexpected sql: ${s}`);
    },
  };
}
const row = (over = {}) => ({ id: 1, crm_payload: payloadFor(), crm_delivered_at: null, crm_attempts: 0, crm_last_attempt_at: null, ...over });
const crm = (...statuses) => {
  const calls = [];
  const fetchImpl = async (url, init) => { calls.push({ url, ...init }); return { ok: (statuses[Math.min(calls.length, statuses.length) - 1] ?? 200) < 300, status: statuses[Math.min(calls.length, statuses.length) - 1] ?? 200 }; };
  return { calls, fetchImpl };
};
const verify = (call) => {
  const [t, v1] = call.headers['X-MappedSkills-Signature'].split(',').map((x) => x.split('=')[1]);
  return v1 === crypto.createHmac('sha256', SECRET).update(`${t}.${call.body}`).digest('hex');
};

test('payload follows schema_version 1 and preserves enquiry, consent and both touches', () => {
  const p = JSON.parse(payloadFor());
  assert.deepEqual(Object.keys(p), ['schema_version', 'event_type', 'event_id', 'submitted_at', 'enquiry', 'attribution']);
  assert.equal(p.schema_version, 1);
  assert.equal(p.event_type, 'enquiry_submitted');
  assert.equal(p.event_id, enquiry().idempotencyKey);
  assert.equal(p.submitted_at, '2026-10-01T10:00:00.000Z');
  assert.deepEqual(p.enquiry, {
    name: 'Asha', email: 'asha@example.com', phone: null, company: 'Acme', message: 'Hello — ₹ café', website: null,
    source_page: '/contact', marketing_consent: true, marketing_consent_text: 'consent v1', suspect: false,
  });
  assert.equal(p.attribution.first_source, 'google');
  assert.equal(p.attribution.first_touch_at, '2026-09-28T08:00:00.000Z');
  assert.equal(p.attribution.first_source_derived, true);
  assert.equal(p.attribution.latest_source, 'newsletter');
  assert.equal(p.attribution.latest_campaign, 'oct');
  assert.equal(p.attribution.status, 'complete');
});

test('no consent means no consent text; missing attribution stays honest', () => {
  const blank = Object.fromEntries(Object.keys(attribution).map((k) => [k, null]));
  const p = JSON.parse(payloadFor(enquiry({ marketingConsent: false, attribution: { ...blank, status: 'unavailable' } })));
  assert.equal(p.enquiry.marketing_consent, false);
  assert.equal(p.enquiry.marketing_consent_text, null);
  assert.equal(p.attribution.status, 'unavailable');
  assert.equal(p.attribution.first_touch_at, null);
});

test('successful delivery posts a valid signed body and marks the row delivered', async () => {
  const db = fakeDb([row()]);
  const { calls, fetchImpl } = crm(200);
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env: ENV, now: T0 }), 'delivered');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://crm.test/leads');
  assert.equal(calls[0].body, db.rows[0].crm_payload);
  assert.ok(verify(calls[0]));
  assert.deepEqual(db.rows[0].crm_delivered_at, T0);
  assert.equal(db.rows[0].crm_attempts, 1);
});

test('CRM failure leaves the row pending and never throws', async () => {
  for (const status of [500, 503, 401]) {
    const db = fakeDb([row()]);
    assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl: crm(status).fetchImpl, env: ENV, now: T0 }), 'failed');
    assert.equal(db.rows[0].crm_delivered_at, null);
    assert.equal(db.rows[0].crm_attempts, 1);
  }
  const db = fakeDb([row()]);
  const boom = async () => { throw Object.assign(new Error('socket hang up with secret detail'), { code: 'ECONNRESET' }); };
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl: boom, env: ENV, now: T0 }), 'failed');
  assert.equal(db.rows[0].crm_delivered_at, null);
});

test('missing secret or URL sends nothing', async () => {
  const db = fakeDb([row()]);
  const { calls, fetchImpl } = crm(200);
  const env = { MAPPEDSKILLS_LEAD_WEBHOOK_SECRET_FILE: '/nonexistent/file', MAPPEDSKILLS_CRM_LEAD_URL: 'https://crm.test/leads' };
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env, now: T0 }), 'not_configured');
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env: { MAPPEDSKILLS_LEAD_WEBHOOK_SECRET: SECRET }, now: T0 }), 'not_configured');
  assert.equal(calls.length, 0);
  assert.equal(db.rows[0].crm_attempts, 0);
});

test('retries resend identical bytes with a fresh signature, after backoff', async () => {
  const db = fakeDb([row()]);
  const { calls, fetchImpl } = crm(503, 503, 200);
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env: ENV, now: T0 }), 'failed');
  // Too soon: attempt 1 backs off 2 minutes.
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: new Date(T0.getTime() + MIN) }), { skipped: 1 });
  assert.equal(calls.length, 1);
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: new Date(T0.getTime() + 3 * MIN) }), { failed: 1 });
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: new Date(T0.getTime() + 20 * MIN) }), { delivered: 1 });
  assert.equal(calls.length, 3);
  assert.equal(new Set(calls.map((c) => c.body)).size, 1);
  assert.equal(calls[0].body, db.rows[0].crm_payload);
  assert.ok(calls.every(verify));
  assert.notEqual(calls[0].headers['X-MappedSkills-Signature'], calls[2].headers['X-MappedSkills-Signature']);
});

test('a delivered row is never sent again; rows without a payload are never sent', async () => {
  const db = fakeDb([row({ id: 1 }), row({ id: 2, crm_payload: null })]);
  const { calls, fetchImpl } = crm(200);
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: T0 }), { delivered: 1 });
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: new Date(T0.getTime() + 60 * MIN) }), {});
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env: ENV, now: new Date(T0.getTime() + 60 * MIN) }), 'skipped');
  assert.equal(calls.length, 1);
});

test('concurrent attempts on one row send once', async () => {
  const db = fakeDb([row()]);
  const { calls, fetchImpl } = crm(200);
  const out = await Promise.all([1, 2].map(() => deliverEnquiry({ db, id: 1, fetchImpl, env: ENV, now: T0 })));
  assert.deepEqual(out.sort(), ['delivered', 'skipped']);
  assert.equal(calls.length, 1);
});

test('permanent CRM rejections stop retrying; transient failures stop at the attempt cap', async () => {
  const db = fakeDb([row()]);
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl: crm(422).fetchImpl, env: ENV, now: T0 }), 'rejected');
  assert.deepEqual(await retryPending({ db, fetchImpl: crm(200).fetchImpl, env: ENV, now: new Date(T0.getTime() + 1e9) }), {});

  const capped = fakeDb([row({ crm_attempts: MAX_ATTEMPTS })]);
  assert.deepEqual(await retryPending({ db: capped, fetchImpl: crm(200).fetchImpl, env: ENV, now: new Date(T0.getTime() + 1e9) }), {});
});

test('logs never contain the body, email or secret', async () => {
  const logged = [];
  const orig = console.error;
  console.error = (...a) => logged.push(a.join(' '));
  try {
    await deliverEnquiry({ db: fakeDb([row()]), id: 1, fetchImpl: crm(500).fetchImpl, env: ENV, now: T0 });
  } finally { console.error = orig; }
  assert.ok(logged.length > 0);
  assert.ok(logged.every((l) => !l.includes('asha@example.com') && !l.includes(SECRET) && !l.includes('v1=')));
});

test('interrupted after the CRM accepted: row stays pending and the retry resends the same bytes', async () => {
  const db = fakeDb([row()]);
  const realExecute = db.execute.bind(db);
  let dropped = false;
  db.execute = async (sql, p) => {
    if (!dropped && sql.startsWith('UPDATE enquiries SET crm_delivered_at')) { dropped = true; throw new Error('connection lost'); }
    return realExecute(sql, p);
  };
  const { calls, fetchImpl } = crm(200, 200);
  assert.equal(await deliverEnquiry({ db, id: 1, fetchImpl, env: ENV, now: T0 }), 'failed');
  assert.equal(db.rows[0].crm_delivered_at, null);
  assert.deepEqual(await retryPending({ db, fetchImpl, env: ENV, now: new Date(T0.getTime() + 5 * MIN) }), { delivered: 1 });
  assert.equal(calls[0].body, calls[1].body); // CRM binds event_id to the body hash: replay = 200 duplicate
});
