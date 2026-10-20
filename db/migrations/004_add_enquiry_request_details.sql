-- C1 — the consolidated /contact form (DEC-071). Additive only.
--
-- One form now carries two visitor intentions, so the intention can no longer be
-- read from `source_page` (both are sent from /contact). These columns record
-- what the visitor chose:
--
--   `request_type`            'enquiry' or 'call'. NULL on rows that predate this
--                             migration; for those, `source_page = '/schedule-call'`
--                             still means a call request (DEC-062).
--   `service_interest`        the stable value from the form's "What do you need
--                             help with?" list (lib/contact-request.ts), never the
--                             display label. NULL when the form did not ask.
--   `preferred_contact_time`  free text such as "Weekdays, 2–5 PM IST", call
--                             requests only. A preference, never a reservation.
--
-- SAFE TO APPLY BEFORE THE RELEASE THAT USES IT. Every column is NULLable with no
-- default, and the live code names its INSERT columns explicitly, so it neither
-- reads nor writes them. scripts/deploy/release.sh refuses to activate a release
-- while a migration is pending.
ALTER TABLE `enquiries`
  ADD COLUMN IF NOT EXISTS `request_type`           ENUM('enquiry','call') NULL,
  ADD COLUMN IF NOT EXISTS `service_interest`       VARCHAR(40)            NULL,
  ADD COLUMN IF NOT EXISTS `preferred_contact_time` VARCHAR(120)           NULL;
