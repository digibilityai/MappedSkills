-- SESSION 32 — PHASE H2 — acquisition attribution on the enquiry record.
--
-- WHY THESE COLUMNS EXIST. `ATTRIBUTION_MODEL.md` §4 (Gate 6 / DEC-011) makes
-- the SERVER-SIDE ENQUIRY RECORD the system of record for attribution and
-- client-side storage merely the collection mechanism: "The attribution payload
-- is sent with the submission and stored server-side on the enquiry record."
-- Without these columns the only place acquisition context could live is a
-- third-party analytics platform, where it cannot be joined to the enquiry it
-- explains and cannot be audited.
--
-- ATTRIBUTION IS NOT A QUALIFICATION CONDITION. Every column below is NULLable
-- and every one may be NULL on a perfectly good enquiry. §1 and
-- `QUALIFIED_ENQUIRY_DEFINITION.md` §2A make `attribution_status` and
-- qualification independent dimensions: a direct visitor with no referrer, a
-- visitor whose storage was unavailable, and a visitor who declined future
-- consent are all recorded with degraded attribution and are NOT thereby
-- disqualified. Nothing here is NOT NULL and nothing here has a default that
-- would assert a channel that was never observed.
--
-- CLEARLY SEPARATED FROM CONTACT PII. These are channel labels — source, medium,
-- campaign — and a referrer HOST. They are not the enquirer's details and they
-- are not derived from them.
--
-- DELIBERATELY ABSENT, each an explicit decision:
--
--   * NO CLICK IDENTIFIER VALUES. No `gclid`, `fbclid`, `msclkid`, `wbraid` or
--     `gbraid` column exists. These are per-click ADVERTISING IDENTIFIERS, they
--     appear nowhere in `ATTRIBUTION_MODEL.md`'s field list, no paid campaign is
--     running, and storing one beside a name, an email and a phone number is the
--     highest privacy cost in the whole set for a capability nobody has yet.
--     `lib/attribution.ts` uses their PRESENCE to derive a channel and discards
--     the value in the browser. CONSEQUENCE, STATED PLAINLY: offline conversion
--     import into Google Ads or Meta is NOT possible from this data, and that is
--     a deferred owner decision rather than an oversight.
--
--   * NO FULL REFERRER URL. Only the referrer HOST is stored. A referrer URL
--     carries a path and a query string, and query strings carry identifiers —
--     the same reason `EVENT_TAXONOMY.md` §7 bans them from `page_path`. The
--     host is what channel reporting needs.
--
--   * NO IP ADDRESS, NO USER AGENT, NO DEVICE FINGERPRINT, NO SESSION ID, NO
--     VISITOR ID. Migration 001 excluded these and this migration does not
--     reintroduce them by another name. There is no cross-visitor identifier in
--     this schema and none is created here.
--
--   * NO MULTI-TOUCH. First-touch and conversion-touch only, per §2: with zero
--     historical conversions any weighting would be invented, and a model that
--     assigns a fraction of an enquiry to a channel implies a precision that
--     cannot be defended.
--
--   * NO `qualification_status`. Unchanged from migration 001 and unchanged by
--     this phase. WQE condition 5 rests on a deduplication window that
--     `QUALIFIED_ENQUIRY_DEFINITION.md` §10 decision 1 leaves deliberately
--     unset, so a column asserting `qualified` would be a fabricated verdict.
--
-- `conversion_page` IS NOT ADDED: `source_page` from migration 001 already holds
-- it. Adding a second column for the same fact is how two fields drift apart.
--
-- `attribution_status` DEFAULTS TO 'unavailable' — the honest value for a row
-- written when nothing could be established, and the correct value for the rows
-- that already exist. `ATTRIBUTION_MODEL.md` §3.3: any figure broken down by
-- source must show `unavailable` as an explicit bucket, because dropping it from
-- the denominator silently overstates every measurable channel.
--
-- RE-RUNNABLE. `ADD COLUMN IF NOT EXISTS` is MariaDB syntax and this deployment
-- is MariaDB (`.env.example`, `db/migrations/001_create_enquiries.sql`). It makes
-- the migration safe to re-apply, matching 001's `CREATE TABLE IF NOT EXISTS`.
-- The runner refuses DROP, TRUNCATE and DELETE, and there are none: this
-- migration only adds NULLable columns and one index, so it cannot lose data.

ALTER TABLE `enquiries`
  ADD COLUMN IF NOT EXISTS `first_landing_page`   VARCHAR(255) NULL AFTER `source_page`,
  ADD COLUMN IF NOT EXISTS `first_referrer_host`  VARCHAR(100) NULL AFTER `first_landing_page`,
  ADD COLUMN IF NOT EXISTS `first_source`         VARCHAR(100) NULL AFTER `first_referrer_host`,
  ADD COLUMN IF NOT EXISTS `first_medium`         VARCHAR(100) NULL AFTER `first_source`,
  ADD COLUMN IF NOT EXISTS `first_campaign`       VARCHAR(100) NULL AFTER `first_medium`,
  ADD COLUMN IF NOT EXISTS `first_content`        VARCHAR(100) NULL AFTER `first_campaign`,
  ADD COLUMN IF NOT EXISTS `first_term`           VARCHAR(100) NULL AFTER `first_content`,
  ADD COLUMN IF NOT EXISTS `first_touch_at`       DATETIME(3)  NULL AFTER `first_term`,
  ADD COLUMN IF NOT EXISTS `first_source_derived` TINYINT(1)   NULL AFTER `first_touch_at`,
  ADD COLUMN IF NOT EXISTS `latest_source`        VARCHAR(100) NULL AFTER `first_source_derived`,
  ADD COLUMN IF NOT EXISTS `latest_medium`        VARCHAR(100) NULL AFTER `latest_source`,
  ADD COLUMN IF NOT EXISTS `latest_campaign`      VARCHAR(100) NULL AFTER `latest_medium`,
  ADD COLUMN IF NOT EXISTS `latest_referrer_host` VARCHAR(100) NULL AFTER `latest_campaign`,
  ADD COLUMN IF NOT EXISTS `attribution_status`
    ENUM('complete','partial','unavailable') NOT NULL DEFAULT 'unavailable'
    AFTER `latest_referrer_host`;

-- Channel reporting is "qualified enquiries by source over a period", so the
-- ordering column belongs in the index with the source. `first_source` is the
-- one that answers "what brought them into the orbit"; `latest_source` is a
-- scan when it is eventually needed, which at this volume is free.
ALTER TABLE `enquiries`
  ADD INDEX IF NOT EXISTS `idx_enquiry_first_source_created` (`first_source`, `created_at`);
