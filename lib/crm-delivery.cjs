/**
 * Delivery of a stored enquiry to the MappedSkills CRM.
 *
 * CommonJS on purpose: the request path (app/api/enquiry) and the cPanel cron
 * (scripts/crm-retry.cjs) share this one module, and the cron has no build step.
 *
 * Needs MAPPEDSKILLS_CRM_LEAD_URL (the full endpoint URL). Contract: CRM `POST /api/integrations/mappedskills/leads`, schema_version 1.
 *   X-MappedSkills-Signature: t=<unix s>,v1=<hex HMAC-SHA256(secret, "<t>." + body)>
 *
 * The payload is built once, stored in `enquiries.crm_payload`, and every attempt
 * sends those same bytes (only the signature timestamp is fresh, because the CRM
 * rejects stale ones). The CRM binds event_id to the body hash, so a replay is a
 * 200 duplicate and never a second lead.
 *
 * Nothing here logs a body, address, secret or signature; only the enquiry id and
 * an HTTP status or error category.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const MAX_ATTEMPTS = 12;
const MAX_BACKOFF_MINUTES = 360;
const REQUEST_TIMEOUT_MS = 8000;
/** The CRM will never accept these, so retrying is pointless. 401/5xx/network are retried. */
const TERMINAL_STATUSES = new Set([400, 409, 413, 415, 422]);

const iso = (d) => (d instanceof Date ? d.toISOString() : null);

/** The schema_version 1 body, as a string. `enquiry` is a ValidatedEnquiry. */
function buildCrmPayload({ enquiry, consentText, submittedAt }) {
  const a = enquiry.attribution;
  return JSON.stringify({
    schema_version: 1,
    event_type: 'enquiry_submitted',
    event_id: enquiry.idempotencyKey,
    submitted_at: submittedAt.toISOString(),
    enquiry: {
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      company: enquiry.company,
      message: enquiry.message,
      website: enquiry.website,
      source_page: enquiry.sourcePage,
      marketing_consent: enquiry.marketingConsent,
      marketing_consent_text: enquiry.marketingConsent ? consentText : null,
      suspect: enquiry.suspect,
    },
    attribution: {
      status: a.status,
      first_landing_page: a.firstLandingPage,
      first_referrer_host: a.firstReferrerHost,
      first_source: a.firstSource,
      first_medium: a.firstMedium,
      first_campaign: a.firstCampaign,
      first_content: a.firstContent,
      first_term: a.firstTerm,
      first_touch_at: iso(a.firstTouchAt),
      first_source_derived: a.firstSourceDerived,
      latest_source: a.latestSource,
      latest_medium: a.latestMedium,
      latest_campaign: a.latestCampaign,
      latest_referrer_host: a.latestReferrerHost,
    },
  });
}

function sign(body, secret, nowMs) {
  const t = Math.floor(nowMs / 1000);
  const v1 = crypto.createHmac('sha256', secret).update(`${t}.`).update(Buffer.from(body, 'utf8')).digest('hex');
  return `t=${t},v1=${v1}`;
}

/** Secret from the environment, else the file the host already holds. Never logged. */
function readSecret(env = process.env) {
  const fromEnv = env.MAPPEDSKILLS_LEAD_WEBHOOK_SECRET;
  if (fromEnv && fromEnv.trim()) return fromEnv.trim();
  const file =
    env.MAPPEDSKILLS_LEAD_WEBHOOK_SECRET_FILE || path.join(os.homedir(), '.mappedskills-lead-webhook-secret');
  try {
    return fs.readFileSync(file, 'utf8').trim() || null;
  } catch {
    return null;
  }
}

/**
 * Atomically claims the row for one attempt (counts it, stamps the time) so the
 * request path and the cron can never send the same enquiry concurrently.
 * Backoff is 2^attempts minutes, capped.
 */
async function claim(db, id, now) {
  const [res] = await db.execute(
    `UPDATE enquiries
        SET crm_attempts = crm_attempts + 1, crm_last_attempt_at = ?
      WHERE id = ? AND crm_payload IS NOT NULL AND crm_delivered_at IS NULL AND crm_attempts < ?
        AND (crm_last_attempt_at IS NULL
             OR TIMESTAMPDIFF(SECOND, crm_last_attempt_at, ?) >= LEAST(POW(2, crm_attempts), ?) * 60)`,
    [now, id, MAX_ATTEMPTS, now, MAX_BACKOFF_MINUTES]
  );
  return res.affectedRows === 1;
}

/** One delivery attempt for one row id. Resolves to a category string; never throws. */
async function deliverEnquiry({ db, id, fetchImpl = fetch, env = process.env, now = new Date() }) {
  const secret = readSecret(env);
  const url = env.MAPPEDSKILLS_CRM_LEAD_URL;
  if (!secret || !url) {
    console.error(`[crm] enquiry ${id}: not delivered (CRM url or secret not configured)`);
    return 'not_configured';
  }
  try {
    if (!(await claim(db, id, now))) return 'skipped';
    const [rows] = await db.execute('SELECT crm_payload FROM enquiries WHERE id = ?', [id]);
    const body = rows[0].crm_payload;
    const res = await fetchImpl(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MappedSkills-Signature': sign(body, secret, now.getTime()),
      },
      body,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.ok) {
      await db.execute('UPDATE enquiries SET crm_delivered_at = ? WHERE id = ?', [now, id]);
      return 'delivered';
    }
    console.error(`[crm] enquiry ${id}: CRM answered ${res.status}`);
    if (TERMINAL_STATUSES.has(res.status)) {
      await db.execute('UPDATE enquiries SET crm_attempts = ? WHERE id = ?', [MAX_ATTEMPTS, id]);
      return 'rejected';
    }
    return 'failed';
  } catch (error) {
    console.error(`[crm] enquiry ${id}: attempt failed (${error?.code ?? error?.name ?? 'error'})`);
    return 'failed';
  }
}

/** Cron entry: every pending row that is due. Returns counts per category. */
async function retryPending({ db, fetchImpl, env, now = new Date(), limit = 25 }) {
  const [rows] = await db.execute(
    `SELECT id FROM enquiries
      WHERE crm_payload IS NOT NULL AND crm_delivered_at IS NULL AND crm_attempts < ?
      ORDER BY id LIMIT ${Math.max(1, Math.floor(limit))}`,
    [MAX_ATTEMPTS]
  );
  const counts = {};
  for (const { id } of rows) {
    const outcome = await deliverEnquiry({ db, id, fetchImpl, env, now });
    counts[outcome] = (counts[outcome] || 0) + 1;
  }
  return counts;
}

module.exports = { MAX_ATTEMPTS, buildCrmPayload, sign, readSecret, deliverEnquiry, retryPending };
