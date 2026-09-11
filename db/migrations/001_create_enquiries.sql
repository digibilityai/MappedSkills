-- SESSION 31 — PHASE H1 — the enquiry table.
--
-- ONE TABLE. `FORM_AND_BOOKING_SPEC.md` §1 freezes the field contract at four
-- required and three optional fields; this stores those and nothing that is not
-- needed to service or review an enquiry.
--
-- DELIBERATELY ABSENT, each an explicit decision rather than an oversight:
--
--   * NO BUDGET COLUMN. `FORM_AND_BOOKING_SPEC.md` §1.4 removes the field
--     outright and Phase H1's acceptance is "no budget field exists".
--   * NO `qualification_status`. Four of the five WQE conditions
--     (`QUALIFIED_ENQUIRY_DEFINITION.md` §2) are evaluable server-side today,
--     but condition 5 -- "no existing open enquiry from the same email within
--     the deduplication window" -- rests on a window that §10 decision 1 leaves
--     deliberately unset. A column asserting `qualified` while one of its five
--     conditions had never been evaluated would be a fabricated verdict, so the
--     column does not exist yet. `screening` records only what was determined.
--   * NO IP ADDRESS, NO USER AGENT, NO FINGERPRINT. Rate limiting needs an
--     address only for the life of a request, so it stays in process memory
--     (`lib/rate-limit.ts`) and is never written here.
--   * NO SCORING, NO CRM MIRROR, NO ANALYTICS TABLE, NO REVENUE FIELDS.
--
-- `screening` is honest about its own strength. `suspect` means one cheap
-- provider-independent layer fired -- honeypot, or an implausibly fast
-- submission. It is a flag for a human, NOT a spam verdict.
-- `QUALIFIED_ENQUIRY_DEFINITION.md` §7A is explicit that uncertain is not spam
-- and that wrongly discarding a real buyer costs far more than a human glance,
-- so a flagged submission is stored exactly like any other and never dropped.
--
-- `notification_status` starts at `unconfigured` and stays there. No
-- transactional email provider is configured, so the column records the true
-- state rather than implying a delivery that cannot happen. Nothing reads it.
--
-- `email` is indexed on a 191-character prefix: under utf8mb4 that is 764
-- bytes, inside the 767-byte index limit of the older COMPACT row format still
-- found on shared MariaDB hosts.

CREATE TABLE IF NOT EXISTS `enquiries` (
  `id`                      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idempotency_key`         CHAR(36)        NOT NULL,
  `created_at`              DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`              DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                            ON UPDATE CURRENT_TIMESTAMP(3),
  `name`                    VARCHAR(120)    NOT NULL,
  `email`                   VARCHAR(254)    NOT NULL,
  `company`                 VARCHAR(160)    NOT NULL,
  `message`                 TEXT            NOT NULL,
  `phone`                   VARCHAR(40)         NULL,
  `website`                 VARCHAR(512)        NULL,
  `source_page`             VARCHAR(255)        NULL,
  `marketing_consent`       TINYINT(1)      NOT NULL DEFAULT 0,
  `marketing_consent_text`  VARCHAR(255)        NULL,
  `marketing_consent_at`    DATETIME(3)         NULL,
  `screening`               ENUM('clean','suspect')                        NOT NULL DEFAULT 'clean',
  `notification_status`     ENUM('unconfigured','pending','sent','failed') NOT NULL DEFAULT 'unconfigured',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_enquiry_idempotency` (`idempotency_key`),
  KEY `idx_enquiry_created_at` (`created_at`),
  KEY `idx_enquiry_email_created` (`email`(191), `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
