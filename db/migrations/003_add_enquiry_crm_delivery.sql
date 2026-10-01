-- CRM delivery tracking. Additive only.
--
-- `crm_payload` is the exact JSON body sent to the CRM, written in the same
-- INSERT as the enquiry so every retry re-sends identical bytes. Rows that
-- predate this migration have a NULL payload and are never sent or retried.
-- A row is pending while crm_payload IS NOT NULL AND crm_delivered_at IS NULL.
ALTER TABLE `enquiries`
  ADD COLUMN IF NOT EXISTS `crm_payload`         MEDIUMTEXT       NULL,
  ADD COLUMN IF NOT EXISTS `crm_delivered_at`    DATETIME(3)      NULL,
  ADD COLUMN IF NOT EXISTS `crm_attempts`        SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `crm_last_attempt_at` DATETIME(3)      NULL;

ALTER TABLE `enquiries`
  ADD INDEX IF NOT EXISTS `idx_enquiry_crm_pending` (`crm_delivered_at`, `crm_attempts`);
