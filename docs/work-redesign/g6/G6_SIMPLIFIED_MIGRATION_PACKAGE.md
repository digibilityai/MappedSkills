# G6 simplified — Contentful `staging` migration package

**Status (2026-10-21):** **applied to `staging` only** (owner-run). SM-1 read-only verification PASS (run 03); SM-2
`apply` exit 0 and post-apply `plan` exit 0 (`caseStudies` version 16 → 18; six fields added, four links optional,
slug `unique` + pattern active; seven entries unchanged). Owner-run staging Delivery API check (§8) PASS, exit 0.
**`master` has NOT been migrated** and is not authorised. Every run was made by the owner in their own terminal; no
token was seen or handled by the assistant. Sections 1–8 below are the package as prepared.

**This is the active migration package.** It supersedes the nine-field S2-R1 package and its signed-approval (`msa1`)
requirement. The superseded files are kept unchanged as historical records and must not be run:
`G6_S2_STAGING_MIGRATION_PACKAGE.md`, `G6_S2_R1_STAGING_MIGRATION_PACKAGE.md` §5 (approval coupling),
`G6_S1_SIGNED_APPROVAL_POC.md`, `s1-poc/`, `s2-migration/`, `s2r1-migration/`, `s2b-verification/`.
S2-R1 §4 (failure recovery) and S2B §3, §6–§8 (checklist, stop rules, report, token revocation) still apply as
written, with `simplified/migration/` in place of `s2r1-migration/` and `s2b-verification/`.

Package: `docs/work-redesign/g6/simplified/migration/`, self-contained (Node ≥ 20, no dependencies, no imports
outside the folder).

| File | Origin | Change |
|---|---|---|
| `migration.mjs` | `s2r1-migration/migration.mjs` | Schema delta only (§1); guards, client, preflight, diff, verify, rollback unchanged |
| `cli.mjs` | `s2r1-migration/cli.mjs` | Header comment only |
| `verify.mjs`, `verify.sh` | `s2b-verification/` | Import path `./migration.mjs` / `./cli.mjs`, labels; logic unchanged |
| `migration.test.mjs`, `verify.test.mjs` | as above | Adapted (§2) |
| `fixtures/` | `mappers-normalize.ts` copied; `eligibility-slug-pattern.ts` new | See `fixtures/FIXTURES.md` |

## 1. Schema change (`caseStudies` only)

Migration ID `g6-simplified-case-studies-v1` (new, so S2/S2-R1 snapshots cannot be used for rollback here).

| Field | Change | Spec |
|---|---|---|
| `summary` | add | Text, optional, not localised, no validations |
| `problem`, `whatWeDid`, `impact` | add | Rich Text, optional; marks bold/italic; nodes: paragraphs, bulleted and numbered lists only |
| `evidenceNote` | add | Text, optional, no validations |
| `showTestimonial` | add | Boolean, optional, `defaultValue: { "en-US": false }` |
| `review`, `size`, `audience`, `targetArea` | `required: true → false` | link targets unchanged |
| `slug` | add validations | `{ unique: true }` and `^(portfolio/)?[a-z0-9]+(-[a-z0-9]+)*$` (= `SLUG_PATTERN_SOURCE` in `lib/case-study-eligibility.ts`) |

`plan` therefore shows **12** changes (6 add, 4 optional, 2 slug) instead of S2-R1's 15. No slug is renamed or edited.
If any of `approval`, `outcomeType`, `serviceKey`, `listingOrder`, `approvedContentHash` or `publicationApprovals`
exists in the environment, the run stops as drift (it means a superseded migration ran there).

## 2. Tests (run in this session)

| Suite | Repository | Folder copied alone to a temp directory |
|---|---|---|
| `simplified/migration/migration.test.mjs` | 32 pass, 0 fail, 0 skipped | 32 / 0 / 0 |
| `simplified/migration/verify.test.mjs` | 15 pass, 0 fail, 0 skipped | 15 / 0 / 0 |
| Historical `s2r1-migration` / `s2b-verification` (unchanged) | 29 / 0 / 0 and 12 / 0 / 0 | — |

Node v24.16.0. Fixture drift checks (`fixtures/FIXTURES.md`) printed nothing against the working tree.

Changes from the S2-R1 suite: counts 15→12 changes and 19→16 fields; `showTestimonial` default asserted; drift cases
added for a nine-field `approval`/`listingOrder` field and a differing default; the two S1/serviceKey fixture tests
removed with their fields; four tests added (exact six fields and types; no signature/nine-field code remains; live
entries with no new values and entries missing optional links plan cleanly; slug pattern equals the application's).
Every other S2-R1 assertion (guards, read-only refusal, collisions, pattern failures, resume, rollback, redaction, 429,
entry-version verification) is kept unchanged. Not proved: behaviour against the real API (simulated CMA).

## 3. Owner-run read-only plan against `staging`

Run in **your own terminal**, not inside Claude Code. The token is typed at a hidden prompt inside `verify.sh`, passed
only through the environment, never on a command line, and unset on exit. It runs `verify.mjs` (GET only) and then
`cli.mjs plan` (read-only client); it contains no `apply` or `rollback`.

```bash
cd ~/gitrepo/MappedSkills
node --test docs/work-redesign/g6/simplified/migration/migration.test.mjs
node --test docs/work-redesign/g6/simplified/migration/verify.test.mjs
```

Expected `ℹ pass 32` and `ℹ pass 15`, `ℹ fail 0`, `ℹ skipped 0`. Otherwise stop. Then (the run folder must not exist):

```bash
bash docs/work-redesign/g6/simplified/migration/verify.sh <SPACE_ID> <PRODUCTION_SPACE_ID_FROM_PROD_CONFIG> ~/g6-simplified-runs/01
```

```bash
grep -rl "CFPAT" ~/g6-simplified-runs/01 || echo "no token text in outputs"
```

**Pass looks like:** verification report `Result: PASS`; plan prints `Environment: staging (verified: allow-listed,
ready, not aliased)`, `state pristine` (12 `pending`) or `state partial` (the `applied` lines are only `optional:*` / `slug:*`, matching V3d), `route collisions 0; slugs failing new pattern 0`, and
`DRY RUN: 0 writes made.`, exit 0. Then revoke the token (S2B §8).

**Send back only:**

```
G6 simplified plan: PASS | FAIL
Tests: migration <p/f/s>, verify <p/f/s>   Node: <version>
verify: exit <code>; failed check IDs: <none | list>
plan:   exit <code>; state <…>; changes pending <n>/12; writes made: 0
Entries: master <n>, staging <n>; BLOCKER lines: <none | list of entry IDs and slugs>; entries without a slug: <n>
Credential hygiene: no token text in outputs: <yes/no>; token revoked: <yes/no, time>
```

plus `01-verify/verification-report.md` and `02-plan/planned-diff.md` if you wish. Do not send the token,
`before-content-type.json` or `before-entries-report.json`.

## 4. Blockers and risks for the existing entries

| # | Item | Label | Effect |
|---|---|---|---|
| B1 | Slugs of the four unpublished historical entries (GATE R1) and any drafts were never read | UNKNOWN | If any is off-pattern or shares a public route with a live study (e.g. `portfolio/seo-for-home-decor-brand`), `plan` exits 2 with `BLOCKER:` lines and nothing is written. You then decide how to correct that entry in `staging`; the script never edits entries. The three live slugs pass the pattern (tested) |
| B2 | `staging` existence and state | UNKNOWN | S2B has not been run. `verify` fails V2b if `staging` is missing or not ready, V3b/V3d if it is not a clean clone of `master` |
| B3 | `defaultValue` on the Boolean field | WORKING HYPOTHESIS | Supported by the Management API as far as is known, never exercised here. `plan` cannot prove it (it sends nothing). If `apply` is refused with a 422, that is S2-R1 §4.1 "recoverable" (nothing saved); the fallback is to drop the default, since the site already treats an absent value as false |
| B4 | `unique` on `slug` | RESEARCH REQUIRED (TF-01 V11) | Contentful is not known to re-validate existing entries when a content type is activated; the check applies when an entry is next published. The preflight blocks exact duplicates beforehand. Republishing the three live entries on `staging` after `apply` remains the confirming test |
| — | New fields on existing entries | VERIFIED (tests) | Existing entries get no values; the four links become optional with no entry change; `content`, `conclusion` and every other field are untouched; entry versions are checked after `apply` (exit 4 on any change) |
| — | Site coupling | VERIFIED (code) | `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1` must stay unset in any environment until that environment has the fields, or every case-study query fails. `staging` migration has no production effect |

No blocker was found in the package itself. B1 and B2 can only be resolved by the owner's read-only run.

Two owner confirmations, not blockers: (a) `summary` and `evidenceNote` carry no length limits, since the contract
sets none; (b) rich text allows ordered lists and bold/italic but **no hyperlinks**, following "paragraphs and lists only".

## 5. Next authorisation gate

**Gate SM-1 — owner-run read-only `verify` + `plan` on `staging`** using §3. It needs your authorisation and a
short-lived Management token in your terminal only. A PASS result is a precondition, not authorisation, for the
following gate, **SM-2 — `apply` on `staging`** (then republish-test the three legacy copies, B4). `master` is not in
scope of either gate, and the script refuses it.

## 6. SM-1 run 02 finding (2026-10-21) — V3d "partial"

**Root cause (VERIFIED FACT, from the redacted report):** V3b shows both environments have exactly the 10 baseline
fields, so no new field exists and no migration has run. The classifier marks a change `applied` when an **existing**
field already has its target setting (`optional:review|size|audience|targetArea` = `required: false`; `slug:unique`;
`slug:pattern`). One or more of these is already set in `master` (and therefore in the `staging` clone). Which one is
UNKNOWN: the S2B report did not print per-change status. TF-01 §5.1 (Delivery API) recorded all four links as required
and no `unique`, so the setting was changed after TF-01 or the CDA reading differed from the CMA.

**Classification:** an expected existing-schema difference, judged too strictly by `verify.mjs` V3d. `plan`, `apply`
and `rollback` already handle it correctly (each change is idempotent; rollback restores the snapshot as found).

**Correction (`verify.mjs` only):** V3d accepts `pristine`, or `partial` **only** when every `applied` change is an
existing-field setting (no `add:*`), with no drift, no problem and no draft. A new field present still fails. New INFO
check **V3h** prints each change's status by ID (no content). Regression tests: 3 in `verify.test.mjs`, 1 in
`migration.test.mjs` (plan 0 writes → apply → rollback keeps the pre-existing settings). `migration.mjs`,
`cli.mjs` and `verify.sh` are unchanged.

**Next:** repeat SM-1 with a new run folder (`~/g6-simplified-runs/03`). V3h will name the pre-existing settings,
which the owner should confirm were intentional before SM-2.

## 7. SM-2 — staging apply procedure (prepared 2026-10-21, NOT EXECUTED; owner confirmation required)

**Inputs reviewed:** run 03 `verification-report.md` (PASS, V3h: only `slug:unique` pre-existing), `planned-diff.md`
and `plan.json` (schema only): content type version 16 / published 15, no draft, 11 pending changes, target of 16
fields equal to the contract, `showTestimonial.defaultValue = {"en-US": false}` present in the target (the diff table
does not print defaults). Seven entries (3 published, 4 drafts); no new-field values; no slug blockers.
`migration.mjs` / `cli.mjs` unchanged since SM-1 (SHA-256 `6d641f50…` / `1f9a3036…`).

**Writes `apply` will make, and only these:** W1 `PUT …/environments/staging/content_types/caseStudies`
(`X-Contentful-Version: 16`), W2 `PUT …/content_types/caseStudies/published`. No entry is written. Before W1 it
re-runs the full read-only preflight (environment guard, schema state, slug gate); after W2 it re-reads the content
type and every entry and exits 4 if the schema differs from the target or any entry's `version`/`publishedVersion`
or the entry count changed.

**Commands (owner's own terminal, zsh):** see the chat procedure; output folder `~/g6-simplified-runs/04-apply`, then
a read-only `plan` into `~/g6-simplified-runs/05-post` expecting `Already applied. Nothing to do.`

**Rollback (only on a separate owner decision):** `rollback-plan` then `rollback --strategy omit` with
`--snapshot ~/g6-simplified-runs/04-apply/before-content-type.json`. Restores the four links to required and slug to
`[{unique:true}]` (as found), and hides the six fields without deleting data.

## 8. Staging integration check (prepared 2026-10-21; owner-run, read-only)

`simplified/staging-check/` — `check.sh` (hidden prompt for a **Delivery** token with access to `staging`) runs
`check.cjs`, which sends POST GraphQL requests only to `graphql.contentful.com/…/environments/staging` (guarded; master,
the Management and Preview APIs are refused) and runs the application's own query, mapper and eligibility code with
`CONTENTFUL_ENVIRONMENT=staging`, `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`. Checks: S1 field names/types; S2 the three
legacy entries with numeric `sys.publishedVersion` (blocker if not); S3 run-03 drafts not returned; S4 application
query without GraphQL errors; S5 public set = exactly the three legacy IDs on the legacy template, `/work` cards and
detail lookups; S6 new-field presence (INFO). Offline: `check.test.cjs` 7/7.

**Release blocker found by code review:** this checkout (`feat/ai-search-redesign`) is 29 commits behind `main`.
`main`'s `/work` is the #40 redesign (`components/cplus/work/studies.ts` `toWorkStudy`), which reads only legacy
sections, so a new-template study there would show an empty challenge line. The G6 frontend must be ported onto
current `main` and `toWorkStudy` must use the study summary for `layout: 'new'` before any release. The `EntryList`
alignment fix applies only to the old `/work` in this checkout.

**Resolved (2026-10-21):** the G6 frontend was ported onto current `main` (branch `feat/g6-case-studies`); `toWorkStudy`
uses `newLayout.summary` for `layout: 'new'` studies only, and legacy studies are unchanged.
