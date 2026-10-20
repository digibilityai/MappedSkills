# Lead export (host only)

`scripts/export-enquiries.cjs` writes website enquiries for a date range to a CSV file. It runs **on the production host
over SSH**. There is no web route, admin page or dashboard, and none should be added for it. Mini CRM is out of scope.

## Run it

```bash
mkdir -p ~/lead-exports && chmod 700 ~/lead-exports
cd ~/mappedskills.com
/opt/alt/alt-nodejs22/root/usr/bin/node scripts/export-enquiries.cjs \
  --from 2026-10-01 --to 2026-10-31 --out ~/lead-exports/enquiries-2026-10.csv
```

| Option | Meaning |
|---|---|
| `--from`, `--to` | Required. `YYYY-MM-DD`, both days inclusive, at most 366 days. Days are the **database server's** calendar days (the summary line names its time zone). |
| `--out` | Required. Must end in `.csv`; its directory must exist. Refused inside the application directory, its release siblings (`*.new`, …) and any `public_html` / `www` directory. Created with mode `0600`. |
| `--max-rows N` | Default 5000, ceiling 50000. Above N the export **aborts and writes nothing**. |
| `--force` | Replace an existing output file. |
| `--no-bom` | Omit the UTF-8 BOM (kept by default so Excel reads names and messages correctly). |

Exit codes: `0` written · `1` database error (driver code only) · `2` bad arguments or missing configuration · `3` too many rows.

The only output on the terminal is one summary line (count, range, database time zone, account, file path). No names,
emails or messages are printed.

## What it exports

`enquiry_id`, `submitted_at`, `name`, `email`, `phone`, `company`, `website`, `message`, `source_page`,
`request_type` (`enquiry` or `call`), `service_interest`, `preferred_contact_time` (these three are empty on rows from before
migration 004, where `source_page` `/schedule-call` means a call request), `marketing_consent`, `marketing_consent_text`, `marketing_consent_at`, `screening` (`suspect` is a flag for a human, not a
spam verdict), the first-touch attribution (`first_landing_page`, `first_referrer_host`, `first_source`, `first_medium`,
`first_campaign`, `first_content`, `first_term`, `first_touch_at`, `first_source_derived`), the latest-touch attribution
(`latest_source`, `latest_medium`, `latest_campaign`, `latest_referrer_host`) and `attribution_status`.

**Never exported:** `crm_payload`, `crm_delivered_at`, `crm_attempts`, `crm_last_attempt_at`, `notification_status`,
`idempotency_key`, `updated_at`.

**Formula safety:** a text value starting with `=`, `+`, `-`, `@`, tab, CR or LF (or a full-width form) is prefixed with
`'`, so a spreadsheet shows it as text. A phone number such as `+44 …` therefore appears as `'+44 …`.

## Database access

The script issues one `SELECT` inside `START TRANSACTION READ ONLY` and then rolls back. By default it uses the app's
`DB_*` settings (read from the cPanel Node app config, as `crm-retry.cjs` does).

**Recommended:** create a SELECT-only database user in cPanel → *MySQL Databases* (privilege: `SELECT` only, on the
website database) and pass it for the run; the app's own credentials are then not used at all:

```bash
read -rs -p 'Export DB password: ' EXPORT_DB_PASSWORD && export EXPORT_DB_PASSWORD
EXPORT_DB_USER=<cpanel_prefix>_leadsro /opt/alt/alt-nodejs22/root/usr/bin/node scripts/export-enquiries.cjs …
unset EXPORT_DB_PASSWORD
```

## Handling the file

The CSV contains personal data. Download it over SFTP/SCP, keep it out of shared folders and email, and delete it from
the host (`rm ~/lead-exports/<file>.csv`) once it has been imported where it is needed.

## Tests

- `npm test` — unit tests (arguments, date bounds, column list, CSV quoting, formula safety, output-path rules).
- `tests/export-enquiries.db.test.cjs` — end-to-end against a **disposable, loopback-only** MariaDB; skipped unless
  `EXPORT_TEST_DB_ADMIN_USER` / `EXPORT_TEST_DB_ADMIN_PASSWORD` are set. It creates and drops its own database and users.
