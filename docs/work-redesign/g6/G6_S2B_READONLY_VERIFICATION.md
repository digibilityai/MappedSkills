# G6-S2B — Read-only verification of Contentful `staging` (owner-executed)

**Status:** prepared for owner review. **NOT EXECUTED.** Claude Code has not seen, read, requested or handled the
token, has run no Contentful API command, and has changed no application code, Contentful content, GitHub, production
or governance record. Nothing was committed, pushed, merged or deployed.

Basis: the independently reviewed `s2r1-migration/` package (29/29 tests, unchanged) plus two new files in
`s2b-verification/`: `verify.mjs` (the read-only comparison) and `verify.sh` (the wrapper you run). Offline tests for
the new files: 12 passed, 0 failed, 0 skipped (`s2b-verification/verify.test.mjs`, fake network only).

## 1. What it checks (your seven requirements)

| Req | Check IDs | How |
|---|---|---|
| 1 Production space | V1a, V1b | Space name is read from the API. **You** type the production space ID from the production configuration as a second argument, and the run fails if the two differ. This proves "same space as production uses" only as well as your copy of the production ID is correct: copy it from the production host's `.env` or the GitHub secret, not from the Contentful URL you used to create `staging` |
| 2 Ready, not an alias | V2a–V2d | `master` and `staging` both `ready`; `staging` is not an alias and not an alias target |
| 3 Compare models | V3a–V3g | `caseStudies` fields master vs staging identical; staging schema is `pristine` (S2-R1's expected baseline), no unactivated draft; six linked content types exist |
| 4 Legacy IDs | V4-4DpPj, V4-4zQL4, V4-6Ycb7 | Each of the three IDs exists in staging, not archived, with its expected slug. Also entry count, IDs, slugs and statuses master vs staging (V4a, V4b) |
| 5 Run `plan` | step 2 of the wrapper | The reviewed `cli.mjs plan --environment staging` (read-only client; its structural refusal of non-GET is test-covered) |
| 6 Collisions, invalid slugs, drift | V6a, V3b, V3d; `plan` | Same gate the migration uses (route collisions per the application's `normalizeCaseStudySlug`, slug pattern); drift = any schema difference from the expected baseline |
| 7 Redacted report | `01-verify/verification-report.md` | IDs, slugs, statuses, counts, field names only; space ID shown masked (`abc…xyz`) |

## 2. Why this cannot write

- `verify.mjs` has **one** request function. It sends only `GET`, and refuses any path not on a fixed allow-list: the
  space, the environments list, the aliases list, `caseStudies` and the six linked content types in `master`/`staging`,
  and `caseStudies` entry lists. There is no PUT/POST/DELETE anywhere in the file; a test fails if one appears.
- It imports only the pure functions of the migration package, never its write-capable client.
- `verify.sh` calls exactly two commands: `verify.mjs` and `cli.mjs plan`. The words `apply`, `rollback-plan` and
  `rollback` do not appear in it (also test-enforced). `plan` uses the read-only client, which refuses non-GET
  requests in code and refuses `master` as a target.
- The wrapper stops after step 1 if any check fails, so `plan` does not run on a bad foundation.
- Limit of this guarantee: it holds for these two files **as reviewed**. If you run anything else, or edit them,
  it no longer applies. A token with write scope could write if other code were run with it; step 7 makes the token
  short-lived for that reason.

## 3. Before you run (checklist)

1. You are in **your own Terminal** (macOS Terminal/iTerm), **not** inside Claude Code, and not in an editor
   terminal that is being shared or recorded.
2. Node ≥ 20: `node -v`.
3. The token is in your password manager; scope as narrow as Contentful allows; short expiry (days).
4. You have the production space ID (from the production host `.env` / GitHub secret) and a new, non-existent run
   folder path.
5. Optional but recommended: a private shell, so nothing else logs it. The token is **never typed on a command line**;
   it goes only to a hidden prompt, so it does not enter shell history.

## 4. Commands

```bash
cd ~/gitrepo/MappedSkills
git status --short docs/work-redesign/g6/s2r1-migration docs/work-redesign/g6/s2b-verification
node --test docs/work-redesign/g6/s2r1-migration/migration.test.mjs
node --test docs/work-redesign/g6/s2b-verification/verify.test.mjs
```

Expected: both end `ℹ pass 29` / `ℹ pass 12`, `ℹ fail 0`, `ℹ skipped 0`. If not, **stop** (no token has been used yet).

Then the verification. Replace the two IDs; the third argument must not exist yet:

```bash
bash docs/work-redesign/g6/s2b-verification/verify.sh <SPACE_ID> <PRODUCTION_SPACE_ID_FROM_PROD_CONFIG> ~/g6-s2b-runs/01
```

At the prompt `Contentful Management token (input hidden, not stored):` paste the token and press Return. Nothing is
echoed. The wrapper unsets it on exit.

## 5. Expected success output

Step 1 prints the report, which must read:

```
# G6-S2B read-only verification report (redacted)
Generated: <time>. Mode: read-only (GET only; <N> requests). Contains no credentials and no entry content.
**Result: PASS — all checks passed.**
| V1a | PASS | Space abc…xyz resolved as "<space name>". |
| V1b | PASS | Space ID equals the production space ID the owner supplied … |
| V2a | PASS | master: ready. |
| V2b | PASS | staging: ready. |
| V2c | PASS | staging is a real environment, not an alias and not an alias target. Aliases in space: … |
| V3a–V3g | PASS | models identical; staging schema state "pristine"; linked types present |
| V4a, V4b | PASS | entry counts and IDs/slugs/statuses identical |
| V4-4DpPj / V4-4zQL4 / V4-6Ycb7 | PASS | slugs as expected |
| V6a | PASS | No route collisions and no invalid slugs in staging. |
```

Step 2 (`plan`) must show, in order: `Environment: staging (verified: allow-listed, ready, not aliased)`;
`Content type caseStudies: version …, state pristine`; all 15 changes `pending`; `Entries: 7; … route collisions 0;
slugs failing new pattern 0; entries without a slug 0` (7 is what S2 recorded: 3 live + 4 historical; a different
number is fine only if it equals master's count and you can explain it); and `DRY RUN: 0 writes made. Review
planned-diff.md.` Exit code 0. Output folders: `01-verify/` and `02-plan/`.

Also check, then end the session:

```bash
grep -rl "CFPAT" ~/g6-s2b-runs/01 || echo "no token text in outputs"
```

Expected: `no token text in outputs`.

## 6. Failure conditions and stop rules

**General: on any failure, stop. Do not run `apply`, do not retry in a loop, do not edit Contentful to make a check
pass, and do not paste the token anywhere. Send only the redacted report (§7).**

| Condition | Meaning | Action |
|---|---|---|
| `REFUSED: …` (exit 1) | A local guard: bad arguments, existing run folder, token missing | Fix the command; nothing was sent |
| `API ERROR: … HTTP 401/403` (exit 3) | Token expired, revoked, wrong scope, or no access to this space | Stop. Check the token in Contentful, not in chat. Do not share the error if it names anything unexpected |
| `HTTP 404` on the space | Wrong space ID | Stop; correct the ID |
| `HTTP 429` repeatedly | Rate limit | Wait several minutes; run once more with a new run folder |
| V1b FAIL | The space is **not** the production space | **Stop. Revoke the token.** Wrong space or wrong copy of the production ID |
| V2a/V2b FAIL | An environment is missing or not Ready | Wait for Ready; re-run with a new folder |
| V2c FAIL | `staging` is an alias or an alias target (could serve public content) | **Stop. Revoke the token.** Investigate aliases in the web app first |
| V3a/V3b/V3c FAIL | The clone is not identical, or `caseStudies` is missing | Stop; find out who changed what. Do not migrate |
| V3d FAIL | Staging already has migration changes, a draft, or drift | Stop; manual investigation (see S2-R1 §4) |
| V4a/V4b/V4-* FAIL | Entries missing or different in `staging` | Stop; re-clone is an owner decision, outside this procedure |
| V6a FAIL / `BLOCKER:` in `plan` | Slug collisions or invalid slugs | Stop; the owner decides how to correct the named entries in `staging` (never by script) |
| `plan` exit 2 | Precondition or drift | Stop and send the redacted output |
| Any request outside GET, or any token text in an output file | Violation of this procedure | **Stop and revoke the token immediately** |

A PASS here is a **precondition** for the next gate, not authorisation to apply it. `apply` needs a separate decision
and a fresh instruction.

## 7. Redacted report format (what you may send back)

Send only text in this form. Do not send the token, the raw terminal scroll-back, `before-content-type.json`,
`before-entries-report.json` or any entry content.

```
G6-S2B result: PASS | FAIL
Run: <date, time>   Node: <version>   Tests: S2-R1 <pass/fail/skipped>, S2B <pass/fail/skipped>
verify: exit <code>; failed check IDs: <none | list>
plan:   exit <code>; state <pristine|…>; changes pending <n>/15; writes made: 0
Entries: master <n>, staging <n>; blockers: <none | count>
Space: masked <abc…xyz>; aliases: <none | alias→target list>
Credential hygiene: no token text in outputs: <yes/no>; token revoked: <yes/no, time>
Notes: <free text, no secrets>
```

You may also attach `01-verify/verification-report.md` as it is (it is produced already redacted) and
`02-plan/planned-diff.md`.

## 8. Revoking the token (do this immediately after, pass or fail)

1. In Contentful (web app), open your account settings → **Tokens** (personal access tokens / "Content management
   tokens"), find the temporary token by its name, and choose **Revoke**. UI labels change; if you cannot find it, use
   Contentful's help article on personal access tokens. This step was not checked in a live account.
2. Confirm it is gone from the list, and that a harmless read with it would now fail (optional; do this only in your
   own terminal).
3. Delete the entry from your password manager, and clear the clipboard.
4. If you did not use a dedicated staging-only user, treat the token as production-capable and do not leave it
   un-revoked "for later": create a new one for the apply gate when that is authorised.
5. Record "token revoked at <time>" in the report's credential-hygiene line.

If the token was ever pasted into a chat, file, ticket, CI or shared screen, revoke it at once and create a new one.

## 9. Scope boundary

This procedure creates nothing in Contentful, changes no environment, entry or schema, and does not authorise the
migration. Stopped for owner review.
