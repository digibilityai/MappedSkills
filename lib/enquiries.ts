/**
 * SESSION 31 — PHASE H1 — durable enquiry persistence: the enquiry write.
 *
 * ONE TABLE. `FORM_AND_BOOKING_SPEC.md` §1 freezes the field contract at four
 * required and three optional fields; this table stores those and nothing that
 * is not needed to service or review an enquiry.
 *
 * DELIBERATELY ABSENT, and each omission is a decision rather than an oversight:
 *
 *   - NO BUDGET COLUMN. `FORM_AND_BOOKING_SPEC.md` §1.4 removes the field
 *     outright and Phase H1's acceptance is "no budget field exists".
 *   - NO `qualification_status`. Four of the five WQE conditions
 *     (`QUALIFIED_ENQUIRY_DEFINITION.md` §2) are evaluable server-side today,
 *     but condition 5 — "no existing open enquiry from the same email within
 *     the deduplication window" — depends on a window that §10 decision 1
 *     leaves deliberately unset. A column that claimed `qualified` while one of
 *     its five conditions was unevaluated would be a fabricated verdict, so the
 *     column does not exist yet. `screening` records only what the server
 *     actually determined.
 *   - NO IP ADDRESS, NO USER AGENT, NO FINGERPRINT. Rate limiting needs an
 *     address signal only for the life of a request, so it stays in memory and
 *     is never written here.
 *   - NO SCORING, NO CRM MIRROR, NO ANALYTICS TABLE, NO REVENUE FIELDS.
 *
 * SESSION 32 — PHASE H2 ADDED ACQUISITION ATTRIBUTION (migration 002), and what
 * it deliberately did NOT add matters as much as what it did. There is no click
 * identifier — no `gclid`, `fbclid` or `msclkid` value — no full referrer URL,
 * no IP address, no user agent, no device fingerprint and no visitor id. The
 * columns are channel labels and a referrer host, EVERY ONE NULLABLE, because
 * `ATTRIBUTION_MODEL.md` §1 forbids attribution completeness from affecting
 * whether an enquiry counts. A direct visitor with no referrer writes a complete,
 * qualified-eligible row whose `attribution_status` is honestly `unavailable`.
 *
 * `screening` is honest about its own strength. `suspect` means one cheap
 * provider-independent layer fired (honeypot or implausible timing) — it is a
 * flag for a human, NOT a spam verdict. `QUALIFIED_ENQUIRY_DEFINITION.md` §7A
 * is explicit that uncertain is not spam and that wrongly discarding a real
 * buyer costs far more than a human glance, so a flagged submission is stored
 * exactly like any other and is never dropped.
 *
 * `notification_status` starts at `unconfigured` and stays there. No
 * transactional email provider is configured (Session 30 §2 row 3 and this
 * session's brief §18), so the column records the true state rather than
 * implying a delivery that cannot happen. Nothing reads it yet.
 */
import { getPool } from '@/lib/db';
import type { ValidatedAttribution } from '@/lib/enquiry-validation';

export const ENQUIRIES_TABLE = 'enquiries';

/**
 * THE SCHEMA IS NOT DEFINED IN THIS FILE. It lives as reviewable SQL in
 * `db/migrations/`, applied by `npm run db:migrate` and recorded in a
 * `schema_migrations` ledger — see `db/migrations/README.md`.
 *
 * That separation is deliberate. A `CREATE TABLE IF NOT EXISTS` embedded in
 * application code and run on demand looks convenient and quietly goes wrong:
 * it silently does nothing once the table exists, so a later column change
 * applies to fresh installs only and the two environments drift apart without
 * anything ever failing. Keeping DDL in numbered files with a ledger means
 * every change is a new file, visible in review and applied exactly once.
 *
 * It also keeps migrations out of the request path. Nothing in this module
 * creates or alters a table, so a visitor's submission never triggers DDL.
 */

export interface EnquiryRecord {
  idempotencyKey: string;
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string | null;
  website: string | null;
  sourcePage: string | null;
  marketingConsent: boolean;
  marketingConsentText: string | null;
  screening: 'clean' | 'suspect';
  /**
   * SESSION 32 — PHASE H2. Acquisition context, added by migration 002. Never
   * absent as a field: when nothing was captured this is `UNATTRIBUTED`, whose
   * every value is `null` and whose status is the honest `unavailable`.
   */
  attribution: ValidatedAttribution;
}

export type InsertOutcome =
  /** A new row exists as a result of this call. */
  | { status: 'created' }
  /** This exact idempotency key was already stored. One enquiry, not two. */
  | { status: 'duplicate' };

/** MySQL/MariaDB "Duplicate entry for key". */
const ER_DUP_ENTRY = 'ER_DUP_ENTRY';

/**
 * The single load-bearing write. Every value is bound as a parameter — the SQL
 * text below is a constant with no interpolation of any kind, so no submitted
 * value can reach the parser as SQL.
 *
 * A single-row INSERT is already atomic in InnoDB, so no explicit transaction
 * is opened: a BEGIN/COMMIT around one statement would add a round trip and a
 * held connection without changing the guarantee. The invariant Phase H1
 * actually needs — no success response unless a durable row exists — is met by
 * awaiting this call and returning success only on `created` or `duplicate`.
 *
 * `duplicate` is a SUCCESS. It is reached when the unique index rejects a
 * second write of the same idempotency key, which is exactly the double-click,
 * browser-retry and network-retry case: the visitor's enquiry is already
 * stored, so reporting failure would be false. `uq_enquiry_idempotency` is the
 * only non-primary unique constraint on the table and the primary key is
 * auto-increment, so a 1062 here can only mean an idempotency replay.
 */
export async function insertEnquiry(record: EnquiryRecord): Promise<InsertOutcome> {
  const sql = `
    INSERT INTO \`${ENQUIRIES_TABLE}\`
      (\`idempotency_key\`, \`name\`, \`email\`, \`company\`, \`message\`,
       \`phone\`, \`website\`, \`source_page\`,
       \`marketing_consent\`, \`marketing_consent_text\`, \`marketing_consent_at\`,
       \`screening\`,
       \`first_landing_page\`, \`first_referrer_host\`,
       \`first_source\`, \`first_medium\`, \`first_campaign\`,
       \`first_content\`, \`first_term\`, \`first_touch_at\`, \`first_source_derived\`,
       \`latest_source\`, \`latest_medium\`, \`latest_campaign\`, \`latest_referrer_host\`,
       \`attribution_status\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    record.idempotencyKey,
    record.name,
    record.email,
    record.company,
    record.message,
    record.phone,
    record.website,
    record.sourcePage,
    record.marketingConsent ? 1 : 0,
    record.marketingConsent ? record.marketingConsentText : null,
    record.marketingConsent ? new Date() : null,
    record.screening,
    // SESSION 32 — H2. Every one of these is NULLable and may legitimately be
    // null: `ATTRIBUTION_MODEL.md` §1 forbids attribution from gating a
    // conversion, so a direct visitor with no referrer and a visitor whose
    // storage was unavailable both write a complete, qualified-eligible row with
    // an honest `attribution_status = 'unavailable'`.
    record.attribution.firstLandingPage,
    record.attribution.firstReferrerHost,
    record.attribution.firstSource,
    record.attribution.firstMedium,
    record.attribution.firstCampaign,
    record.attribution.firstContent,
    record.attribution.firstTerm,
    record.attribution.firstTouchAt,
    record.attribution.firstSourceDerived === null
      ? null
      : record.attribution.firstSourceDerived
        ? 1
        : 0,
    record.attribution.latestSource,
    record.attribution.latestMedium,
    record.attribution.latestCampaign,
    record.attribution.latestReferrerHost,
    record.attribution.status,
  ];

  try {
    await getPool().execute(sql, params);
    return { status: 'created' };
  } catch (error) {
    if ((error as { code?: string })?.code === ER_DUP_ENTRY) {
      return { status: 'duplicate' };
    }
    throw error;
  }
}
