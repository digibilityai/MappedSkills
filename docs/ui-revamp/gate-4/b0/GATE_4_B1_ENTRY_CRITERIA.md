# Gate 4 — B1 Entry-Criteria Checklist (prepared in B0)

| | |
|---|---|
| **Date** | 2026-10-08 |
| **B1 status** | **READY WITH CONDITIONS — NOT AUTHORISED, NOT STARTED.** This checklist states what must be true to start B1 and what B1 must prove. It approves nothing. B1 needs its own owner instruction |
| **B1 scope (proposed)** | `GATE_4_CHROME_MIGRATION_STRATEGY.md` §4. Invert `ChromeSwitch` to an empty deny-list so Direction C chrome renders on every route. **Chrome only; no page body changes.** Legacy `Header`/`Footer` retained |

## A. Entry criteria — before B1 starts

| # | Criterion | Status at B0 close | Evidence |
|---|---|---|---|
| A1 | Site-wide baseline of the pre-B1 state exists for all 28 templates | ✅ **MET** (34 targets; CMS templates by fixture or real empty/not-found path, labelled) | `evidence/baseline/` |
| A2 | Harness is portable (project dependencies, no absolute paths) and documented | ✅ MET | `gate-4/qa/`; `QA_REGRESSION_RUNBOOK.md` §5 |
| A3 | Harness is deterministic: an independent rerun gives 0 NEW / 0 RESOLVED, and inventory, analytics and `<main>` pixels are identical | ✅ MET | `evidence/validation/determinism.txt`, `pixel-main-self.txt` |
| A4 | Harness is sensitive: injected regressions are reported (layout NEW, copy, JSON-LD and link DIFF, removed conversion event, wrong chrome) | ✅ MET | `evidence/validation/negative-controls.txt` |
| A5 | Harness can express B1's **expected** changes without hiding unexpected ones (`--ignore` for chrome facets; `--expect` for findings) | ✅ MET (controls 2 and 4) | same |
| A6 | Approved Direction C routes are unchanged from the Gate 3 approved build | ✅ MET: 75/75 inventory facets identical; 56/56 `<main>` captures pixel-identical vs `--Lpst9W4pkiythkOhmVS` | `approved-routes-unchanged.txt`, `pixel-main-vs-gate3-build.txt` |
| A7 | Existing portable suites still pass on the baseline build | ✅ MET: Gate 2 192/192; Gate 3 acceptance 261 · 0 · 3 NOTE; chrome-nav 0 errors | `existing-*.txt` |
| A8 | Known defects registered, so B1's resolutions and regressions can be told apart | ✅ MET: 3 programme items + 8 KD + 5 OBS; every baseline finding maps to an ID | `GATE_4_B0_KNOWN_DEFECTS.md` |
| A9 | **Owner authorises B1 and strategy S3** (O1/O2 of the master plan, for B1) | ⛔ **OPEN — owner** | — |
| A10 | **Owner states the LIVE-1 path (O4)**, so the B1 report can describe LIVE-1 accurately. B1 does not close LIVE-1 on production | ⛔ **OPEN — owner** (does not block B1 starting; it blocks the B1 report wording) | `GATE_4_CHROME_MIGRATION_STRATEGY.md` §6 |
| A11 | Optional chevron forced-colours border (Gate 3 E4) in or out of B1 | ⛔ OPEN — owner (default: **out**) | — |

## B. Acceptance criteria — what B1 must prove (run against B0's baseline)

Run the B1 candidate build (plain and fixture) on its own ports, with the B0 build of `352bb25` on the baseline ports (rebuild with the
runbook recipe if the scratch build is gone; B0 showed rebuilds render identically).

| # | Must hold | Command (from the repository root) | Pass condition |
|---|---|---|---|
| B1-1 | Body content, metadata, OG, JSON-LD, forms and analytics hooks unchanged everywhere | `diff-inventory.cjs --baseline <B0>/inventory.json --candidate <B1>/inventory.json --ignore header,footer,chrome,headings-chrome,ctas-chrome,buttons-chrome,fontPreloads` | exit 0. EXPECTED lines only on ignored facets. `fontPreloads` is listed because global chrome may add none or some preloads on legacy routes: **report it, do not hide it** |
| B1-2 | `<main>` pixel-identical on all 25 non-Direction C templates and the 3 approved routes | `pixel-main.cjs --plain <B1p> --fixture <B1f> --against docs/ui-revamp/gate-4/b0/evidence/baseline/pixel-main-hashes.json`. Where a mismatch needs a pixel count or images, use the two-build mode `--plain <B0p> --fixture <B0f> --cand-plain <B1p> --cand-fixture <B1f> --save-diffs <dir>` | 68/68 identical |
| B1-3 | Direction C chrome on every target; one header variant and one footer variant | `chrome-consistency.cjs --inventory <B1>/inventory.json --expect-dc all` | exit 0 |
| B1-4 | No NEW layout finding at any width or engine | `classify.cjs --baseline <B0>/layout-<engine>.json --candidate <B1>/layout-<engine>.json` ×3 | NEW 0. RESOLVED expected: `DEC-030-STICKY` (all), chrome-located `KD-08` |
| B1-5 | No NEW a11y finding; LIVE-1 condition gone on the branch | `classify.cjs … a11y-<engine>.json` ×3 | NEW 0. RESOLVED expected: all `LIVE-1` (`menu-cta`), chrome-located `KD-02` |
| B1-6 | Analytics identical | `analytics-forms.cjs --compare <B0>/analytics-forms.json <B1>/analytics-forms.json` | 0 differing sections. The walk must still show 7 `page_view`, now with no chrome seam |
| B1-7 | Existing suites | Gate 2 `app-checks.cjs` (192), Gate 3 `acceptance-checks.cjs` (261/0/3), `chrome-nav.cjs` | Same counts. **`chrome-nav.cjs` asserts legacy chrome on legacy routes, so it is EXPECTED to report the change.** Record its new output as the intended state, not as a pass of the old assertion |
| B1-8 | Static gates | `npm run typecheck`, `npx eslint .`, `npm test`, `npm run build`, `npm run verify:build` | All exit 0; 11/11 |
| B1-9 | B1-specific risks CH1–CH12 (`GATE_4_CHROME_MIGRATION_STRATEGY.md` §3) | Anchor targets (blog/research headings, legal contents, form error summary); consent banner + open menu at 320×568 and 390×700 (run a11y with consent undecided for 3 sample routes); `aria-current` on non-nav routes | Each recorded PASS / FAIL with evidence |
| B1-10 | Byte report | Per-route HTML, CSS and fonts before/after (legacy routes lose the alternate chrome payload) | Reported numbers |
| B1-11 | Owner visual review | A compare page with six seam samples: one Resolve capability page, `/how-it-works`, `/contact`, a blog fixture, a case fixture, legal, at 390 and 1440 | Owner sign-off |

**Expected RESOLVED set (declare it in the B1 report before running):**
- `pinned|*|*|header.sticky.top-0*`;
- `menu-cta|*|*|*`;
- `forced-colours-focus|*|*|header:*`;
- `target-size|*|*|header:*` and `target-size|*|*|footer:*`.

**Any other RESOLVED item needs an explanation. Any NEW finding fails B1.**

## C. Conditions that remain open after B1 (unchanged by it)

- **LIVE-1 on production:** OPEN until separately fixed and evidenced.
- LIVE-2, PROC-1: OPEN.
- **E1:** real devices and screen readers. B0's WebKit and Firefox runs are engine proxies only.
- **E6:** GTM.
- **OBS-1:** consent on dynamic 404s.
- No merge to `main`.

## D. Harness capability for B1 (confirmed at the B0 checkpoint)

| B1 needs the harness to… | How | Validated by |
|---|---|---|
| Declare intended chrome changes | `diff-inventory.cjs --ignore header,footer,chrome,…`; `classify.cjs --expect <patterns>` | negative controls 2 and 4 |
| Detect unexpected body changes | inventory `text-main`, `links-main`, `headings-main`, `ctas-main`, `forms`, `buttons-main` facets | control 3 (copy, JSON-LD, link) |
| Compare page-body screenshots | `pixel-main.cjs` (`--against` recorded hashes, or two live builds) | 68/68 self, 56/56 cross-build, mutated hash detected |
| Verify links and accessible navigation | inventory link multisets by region; `chrome-consistency.cjs`; `a11y.cjs` Tab walk, names, menu reachability | control 6; LIVE-1 reproduced in three engines |
| Preserve content, SEO and JSON-LD | inventory: title, meta, canonical, robots, OG, JSON-LD (raw), headings | control 3 |
| Detect analytics changes | `analytics-forms.cjs --compare` | control 5 |
| Report new versus known defects | `classify.cjs` + `known-defects.json` | determinism (0 NEW) and control 1 (NEW 40) |
| Run against CMS fixture pages | fixture build; `cms: fixture` targets in every script | fixture targets in every baseline file |

**Strategy (unchanged; `GATE_4_CHROME_MIGRATION_STRATEGY.md`):**
- B1 flips all routes to Direction C chrome;
- the `ChromeSwitch` deny-list is kept as the rollback and exception mechanism;
- legacy chrome is removed only in B11.

**E1 and E6 remain mandatory before staging.** The owner has not yet approved a separate GTM audit.
