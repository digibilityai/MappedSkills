# G6-S2-R1 — Contentful `staging` migration: corrected package

**Status:** corrections from independent review applied. **NOT EXECUTED.** Prepared for a second independent review.
Date: 2026-10-21. Nothing here has been run against Contentful; no environment, token or entry was created or changed;
no application code, production or governance record was modified; nothing was committed, pushed, merged or deployed.

**Relationship to S2.** The S2 architecture is the accepted baseline. This document is a **delta**: everything in
`G6_S2_STAGING_MIGRATION_PACKAGE.md` (field diff §2, safeguards §3, rollback table §6, owner decisions §9) still
applies unless this document says otherwise. The original S2 files are **unchanged** for comparison:

| Original (unchanged) | Revised |
|---|---|
| `G6_S2_STAGING_MIGRATION_PACKAGE.md` | this file |
| `s2-migration/migration.mjs` | `s2r1-migration/migration.mjs` |
| `s2-migration/cli.mjs` | `s2r1-migration/cli.mjs` (byte-identical to S2) |
| `s2-migration/migration.test.mjs` | `s2r1-migration/migration.test.mjs` |
| — | `s2r1-migration/fixtures/` (new, pinned inputs; see `FIXTURES.md`) |

Run commands in the S2 document §4–§6 must use `s2r1-migration/` in place of `s2-migration/`. Where the S2 text
conflicts with this one, this one wins: in particular S2 §4 item 4 ("collisions and pattern failures do not block") is
**superseded** by §1–§2 below.

---

## 1. Change log

| # | Review finding | Change | Where |
|---|---|---|---|
| 1 | Only exact duplicate slugs blocked | Preflight now blocks if **any two entries resolve to the same `/portfolio/<slug>` route**, using the application's own rule (below). Reports route and every entry ID with its stored slug | `routeSlug`, `scanEntries`, `slugPreflight`, `runForward` |
| 1a | (found while fixing) the S2 scan normalised in the wrong order and case-sensitively | S2 stripped slashes *then* `portfolio/`, case-sensitive. The application strips `portfolio/` (case-insensitive) *then* slashes. S2 would have missed e.g. `Portfolio/x` vs `x` and `/portfolio/x` vs `x`. Now identical to the application | `routeSlug` |
| 2 | Existing slugs failing the new pattern did not block | Any entry **with a slug** that fails `^(portfolio/)?[a-z0-9]+(-[a-z0-9]+)*$` blocks. Reports entry ID, status and the exact value. **No entry is edited or renamed** | `scanEntries.patternFailures`, `slugPreflight` |
| 2a | Behaviour decision, flagged | An entry with **no slug at all** (an incomplete draft) is reported as `missingSlugs` but does **not** block, since the pattern cannot apply to a missing value and `required: true` already governs publishing. Say if you want these to block too | `scanEntries.missingSlugs` |
| 3 | Tests not reproducible from the ZIP (18 pass, 1 fail, 1 skip) | Pinned fixtures added; the two tests read them. The skip was removed by moving the live-file comparison out of the suite into a documented drift check (`fixtures/FIXTURES.md`). **No assertion weakened or deleted**; the two fixture-dependent assertions are unchanged except for the path | `fixtures/`, `migration.test.mjs` |
| 4 | Recovery undocumented | Exact procedures in §4 | this file |
| 5 | `msa1` validation coupling undocumented | §5 | this file |
| — | Migration ID | `g6-s2-case-studies-v1` → `g6-s2-r1-case-studies-v1`, so run artefacts and rollback snapshots from S2 and R1 cannot be confused (rollback refuses a snapshot of another migration) | `MIGRATION_ID` |

Semantics of the new gate:

- **Applies to both `plan` and `apply`.** `plan` exits 2 with the same `BLOCKER:` lines, so the dry run shows exactly
  what `apply` would refuse. Evidence files (`before-*.json`, `plan.json`, `planned-diff.md`) are still written.
- **Applies in every schema state except "already applied with no draft"**, where there is nothing to do and the
  script reports a no-op. It therefore also blocks *completing* an unactivated draft (test below).
- **Covers every entry returned for the content type**, whatever its status (draft, changed, published, archived).
- **No writes occur** on a block (tests assert zero non-GET requests).

### 1.1 Route normalisation (VERIFIED FACT, from the repository at `a57fc25`)

`lib/contentful/mappers.ts:158`, `normalizeCaseStudySlug`: `slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '')`,
applied after `.trim()` in `mapContentfulCaseStudyToCms`. Route lookup (`caseStudySlugCandidates`) matches both
`<slug>` and `portfolio/<slug>`, which is why `portfolio/x` and `x` are the same public page and only one can win.
`routeSlug()` reproduces this exactly; the test "routeSlug equals the application normalizeCaseStudySlug" runs the
**pinned verbatim function** against 13 vectors including `Portfolio/slug`, `/portfolio/slug`, `portfolio//slug`,
`portfolio/portfolio/slug`, and the empty string.

---

## 2. Test results

Command (from the repository root, or from an extracted ZIP, which needs only Node ≥ 20):

```bash
node --test docs/work-redesign/g6/s2r1-migration/migration.test.mjs
```

| Run | Tests | Passed | Failed | Skipped |
|---|---|---|---|---|
| Repository checkout | 29 | 29 | 0 | 0 |
| Extracted ZIP, alone in a temporary folder (no `lib/`, no `s1-poc/`) | 29 | 29 | 0 | 0 |

(Figures are from the runs made in this session; the second row is recorded in the session report with the ZIP.)
S2 had 20 tests; R1 has 29 (see §2.1). The S2 suite is left unchanged for comparison; it still depends on `../s1-poc/` and `lib/services.ts`, which is what
the reviewer's ZIP run exposed (18 passed, 1 failed, 1 skipped there).

### 2.1 Test inventory delta (S2 → R1)

- **Changed:** "entries scan … without blocking" → now asserts plan exits **2**, report contents unchanged, zero writes.
- **Changed (path only):** S1 record-pattern test reads `fixtures/s1-poc-approval.mjs`; `ServiceKey` test reads
  `fixtures/services-servicekey.ts` and no longer skips.
- **Added (9):** route normalisation parity (13 vectors); `portfolio/slug` vs `slug` blocks in `plan`; same in `apply`
  (2 tests); collision variants (draft entry; `same`/`same`, `portfolio/same`/`portfolio/same`, `same`/`portfolio/same`);
  collision blocks completing an unactivated draft; control (distinct slugs apply cleanly); seven malformed slug shapes
  (`Seo-Study`, `a_b`, `a/b`, `a--b`, `study-`, `a b`, empty) block with ID and value reported and entries unmodified;
  one bad slug among good ones blocks while an entry with no slug does not; already-applied schema with bad slugs is
  a no-op.

What the suite does **not** prove: behaviour against the real Contentful API (a simulated CMA is used); it is
UNVERIFIED until the owner-run dry run on `staging`.

---

## 3. Dry-run review additions

Add to S2 §4 "Review before going further": the output must contain **no** `BLOCKER:` line, and
`before-entries-report.json` must show `normalisedCollisions: []`, `exactDuplicateSlugs: []`, `patternFailures: []`.
`missingSlugs` is reviewed by the owner (2a). If a blocker appears, the owner corrects the named entries in Contentful
`staging` (or decides they are intentional and reopens review); the script never does this.

---

## 4. Failure recovery

**Principles.** (1) The script performs no automatic destructive rollback and no automatic retry beyond HTTP 429.
(2) Every write is optimistic-locked (`X-Contentful-Version`), so a concurrent change gives HTTP 409 and a stop.
(3) The first step after **any** failure is the same and read-only: run `plan` with a **new** `--out` directory and
read the reported state. Never re-run `apply` blind. (4) Keep `02-apply/before-content-type.json` (the rollback
reference) and every `--out` directory; do not delete or edit them. (5) `staging` is disposable (a clone, no
production data): the final fallback for any state below is the owner deleting and re-cloning it (owner action,
outside this script), which is why none of these states touches production.

Writes performed by `apply`, in order: **W1** `PUT …/content_types/caseStudies` (saves a *draft* of the new schema),
**W2** `PUT …/content_types/caseStudies/published` (activates it). Entries are never written.

States, by what `plan` prints (`state`, and `UNACTIVATED DRAFT PRESENT`):

| `plan` shows | Meaning | Class |
|---|---|---|
| `pristine`, no draft | Nothing changed | **Recoverable** |
| `applied`, **draft present** | W1 succeeded, W2 did not; draft equals this migration | **Recoverable** |
| `applied`, no draft | Fully applied | Done |
| `partial`, `drift`, or any draft that is *not* this migration, or any `PROBLEM:` line | Unknown or foreign state | **Manual investigation** |

### 4.1 Schema PUT (W1) failure

Symptoms: `API ERROR` (exit 3) naming the PUT; HTTP 409 (version conflict), 4xx validation, 5xx, or a network
error/timeout.
1. Run `plan` (new `--out`).
2. `pristine`, no draft → **recoverable**: nothing was saved. Fix the cause (409: someone edited the content type —
   find out who and why first; 4xx: read the redacted message; 5xx/timeout: wait) and re-run `apply` with a new `--out`.
3. `applied` + draft → W1 actually succeeded (a timeout after the server accepted it). Follow §4.3.
4. Anything else → **manual investigation**; stop.

### 4.2 Activation (W2) failure

Symptoms: `API ERROR` naming `…/published` after W1 succeeded. The draft equals this migration but is not live; the
site and editors still see the old schema, and no entry is affected.
1. Run `plan`: expect `applied` + `UNACTIVATED DRAFT PRESENT`.
2. **Recoverable**: re-run `apply` (new `--out`). The script recognises the draft as exactly this migration and
   performs **activation only** (no second W1). This path is covered by the test "apply resumes an interrupted run".
3. If activation keeps failing with a 4xx, read the message (typically a validation conflict with existing entries):
   **manual investigation**; do not edit the draft by hand without recording it.

### 4.3 Interrupted migration with an unactivated draft

Cause: process killed, terminal closed, laptop slept, network lost between W1 and W2.
1. Run `plan` (new `--out`). Check the output says the draft state is `applied`.
2. Draft is exactly this migration → **recoverable**, as §4.2: re-run `apply`.
3. `plan` aborts with "unactivated changes that are not this migration" → **manual investigation**. Someone (or an
   earlier different run) saved other draft changes. In the Contentful web app compare the draft with
   `planned-diff.md`. Decide with the owner: activate nothing and discard nothing until the draft's author and purpose
   are known. The script will not touch it.

### 4.4 Post-activation verification failure

Symptoms: `VERIFY FAILED: …` lines, exit **4**, after both writes succeeded. The schema **is live**.
Possible lines: state after apply is not `applied`; still has an unactivated draft; stored schema differs from the
target (field names listed); an entry's version/publishedVersion changed; entry count changed.
1. Do **not** re-run `apply` and do **not** roll back yet. Run `plan` (new `--out`) and keep `02-apply/after-*.json`,
   `applied-diff.md`, `after-entries-report.json`.
2. Compare `before-entries-report.json` with `after-entries-report.json`.
3. **Recoverable only if** the cause is clearly benign and explained (for example, Contentful normalised a validation
   representation, so a later `plan` reports `applied` and the only difference is cosmetic). Record the explanation in
   the release record before proceeding.
4. **Manual investigation (required)** for any entry version change or entry count change. This migration writes no
   entries, so the change came from something else (a person editing, an app or webhook, or an unexpected side effect
   of the schema change). Establish which before any further action.
5. If the schema is wrong and the owner decides to revert, use the rollback in §4.5, not a re-run.

### 4.5 Rollback failure

Rollback is explicit and never automatic. `rollback-plan` first; `rollback` only after reviewing it. Restore uses the
snapshot `02-apply/before-content-type.json`. Rollback writes, in order: **R1** PUT restored schema, **R2** activate,
and for `--strategy delete` additionally **R3** PUT with the new fields deleted, **R4** activate. `omit` (hide new
fields, keep data) is the default recommendation; `delete` is refused if any entry holds a value in a new field.

| Failure point | `rollback-plan`/`plan` shows | Class | Action |
|---|---|---|---|
| Before R1 (guard, drift, blocker, 429/5xx on R1) | state unchanged | **Recoverable** | Read the `BLOCKER:`/error, fix its cause, re-run with a new `--out` |
| After R1, before R2 | `UNACTIVATED DRAFT PRESENT` | **Manual investigation** | The script deliberately refuses to start a rollback while a draft exists ("content type has unactivated changes"), so re-running will not proceed. In the web app confirm the draft is the intended restore (compare with the snapshot) and the owner activates it, or discards it and re-runs. Owner decision, recorded |
| After R2 (`omit`), verification failed (exit 4) | schema restored; some field not omitted/restored, or entry versions changed | **Manual investigation** | Same as §4.4: compare reports; entry changes are never caused by this script |
| `delete`: after R2, before R3/R4 | new fields restored/omitted but not yet deleted | **Recoverable** | Fields are merely omitted, which is a complete `omit` rollback. Stop here, or re-run `rollback --strategy delete` after `rollback-plan` |
| `delete`: after R3, before R4 | draft with deleted fields | **Manual investigation, data-loss risk** | Deleting a field is irreversible once activated. Do not activate until the owner confirms no entry needs any value in the fields being deleted (the script checked this at start; re-check) |
| Verify fails after `delete` | field still present or entry drift | **Manual investigation** | As above |
| Snapshot refused (other migration/space/environment) | — | **Recoverable** | Use the correct snapshot; never edit a snapshot to pass the check |

Basis: the sequencing above is read from `runRollback`; the mid-sequence failure rows, including the refusal to start a rollback while a draft exists, are **by code inspection, not by an injected-failure
test**, and are UNVERIFIED until rehearsed on `staging`. Whether a deleted field ID may be re-used by a later
`apply` remains RESEARCH REQUIRED (S2 §6): prefer `omit`.

The script implements **no** automatic destructive rollback and none is added.

---

## 5. Approval format (`msa1`) coupling

- **OWNER REQUIREMENT / S1 design:** the `approval` field is a Symbol validated by
  `^msa1\.[0-9a-f]{16}\.[0-9a-f]{64}\.[A-Za-z0-9_-]{86}$` (173 characters).
- **The Contentful validation is version-specific.** It accepts only the `msa1` record shape. A future record format
  (`msa2`, a different signature algorithm, key-id length, or encoding) will be **rejected by the editor** until the
  content-type validation is changed. Such a change is a **schema change** and must go through the same path as this
  one: a reviewed, tested, owner-authorised migration (a new migration ID and snapshot), never an ad-hoc edit in the
  web app. Likewise, the pattern is deliberately *not* loosened now to anticipate future formats.
- **The Contentful pattern is a shape check only, not a security control.** It proves nothing about authenticity.
  **Application-level cryptographic verification remains mandatory:** the site must verify the Ed25519 signature,
  key ID and content binding (S1) before treating any case study as approved, and must fail closed (no approval
  rendered) when verification fails, the key is unknown or revoked, or the field is absent or malformed. A string that
  passes the editor validation is untrusted input until the application verifies it. Any design that relies on the
  editor validation alone is non-compliant.
- The shape test uses only a synthetic string; no real signature or key is read or created by this migration.

---

## 6. Unchanged scope and remaining gates

Unchanged from S2: target is `staging` only; allow-listed environment; token from `CONTENTFUL_MANAGEMENT_TOKEN` only,
owner's terminal; owner decisions OD-S2-1 to OD-S2-3 and the owner's CM-00/CM-01 authorisations; no run until this
package passes independent review. **Do not execute.** Stopped here for independent review.
