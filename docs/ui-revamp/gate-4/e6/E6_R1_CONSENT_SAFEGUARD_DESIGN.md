# E6-A1 · R1 — Consent Safeguard: Remediation Design

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLAN ONLY — awaiting owner approval.** No application code, consent logic or GTM configuration changed. Nothing committed, pushed or deployed. B2 not started |
| **Baseline** | `ui-revamp` @ `101a653`; `DEC-036`, `DEC-037` present. Uncommitted E6 audit files and governance edits preserved; `next-env.d.ts` untouched |
| **Inputs** | `../../GATE_4_E6_GTM_CONSENT_AUDIT.md`, `e6-probe.cjs`, `evidence/`, B0/B1 QA docs, `lib/consent.ts`, `lib/gtm.tsx`, `components/analytics/*`, `app/layout.tsx`, `CURRENT_STATE.md`, `DECISION_LOG.md`, `PROGRAMME_RISKS_AND_LIVE_ISSUES.md` |
| **Evidence** | `evidence/r1-reconfirm/` (defect reproduced) · `evidence/r1-spike/` (approach spikes; `summary.txt`, `spike-a.diff.txt`) |

> **The spikes were throwaway builds in a scratch directory outside the repository** (`git archive 101a653` + edits; inert container
> `GTM-E6AUDIT` answered by the probe's local stub). They exist only to prove feasibility. **No repository file was changed.**
> Spike A build `1SPrOgUWKGsMGcaWU4Wza`; spike B build `wvxVC-ql1yNu8_iqAmQcU`.

---

## 1. Verified failure mechanism

**Reconfirmed 2026-10-08:** the E6 probe was re-run on fresh servers in Chromium, WebKit and Firefox. All 8 sections are identical to the audit run in each engine (`evidence/r1-reconfirm/compare-to-audit.txt`).

| Observation (browser, stubbed container, all external requests blocked) | Result |
|---|---|
| Ordinary routes (22) and the global 404, all visitor states | `consent default` (4 × denied) is entry 0. A stored grant is replayed as `update` before `page_view`. The container loads only after a grant |
| Route-level 404 (`/blog/*`, `/portfolio/*`, `/research/*`, `/press/*`, `/launch-checklist`), **returning accepted** | The container stub saw **[`page_view`, `gtm.js`]**: no default, no update |
| … then client navigation to `/contact` | Still **0** consent commands; the container is not reloaded |
| Route-level 404, **first-time visitor accepts** | [`page_view`, `update`(granted / ads denied), `gtm.js`]: **no default** (E6-A2) |
| Route-level 404, first-time undecided / rejects / returning rejected | No container request. Without the default, `dataLayer` holds only `page_view` (+ the denied update on reject) |
| Withdrawal (footer → Reject), ordinary route | Denied update pushed; no container after reload |

**Mechanism (VERIFIED FACT):**
- A segment-level `notFound()` response is an ISR/prerender cache entry whose document is Next's error shell, `<html id="__next_error__">`. It has no layout `<head>` and is built client-side from the RSC payload.
- React inserts the bootstrap `<script>` into the DOM, but the browser does not execute it.
- Separately, `ConsentProvider` reads the stored grant and opens the loader gate, but it never pushes a consent command on mount. It relies entirely on the bootstrap's replay.
- Production serves the same shell, and its layout chunk contains the container ID (audit §5).

**What is NOT inferred.** A missing consent command in `dataLayer` does **not** prove that any tag ran without authorisation or set an advertising cookie. Whether the published container's tags behave differently with unset consent is **RESEARCH REQUIRED** in GTM Preview (§8). The defect is a breach of the application's own contract ("default denied first, before any container"), and that contract is what R1 restores.

---

## 2. Approaches evaluated

| | **A — Atomic guard in the loader (+ ordering guard on banner decisions)** | **B — Bootstrap via `next/script strategy="beforeInteractive"`** | **C — Client fallback in `ConsentProvider` mount effect** | **D — R2: serve the full layout for segment `notFound()`** |
|---|---|---|---|---|
| Idea | The **same inline script that injects `gtm.js`** first checks `dataLayer` for a `consent default`. If absent (and only then), it **prepends** default (+ the stored-grant replay) before injecting. `pushConsentUpdate` prepends a default if none exists, so a banner decision on such a page also starts from denied | Let Next inject the bootstrap as a framework script, hoping it reaches the error shell | On mount, push default + replay if absent, before React re-renders the loader | Fix the document, so the existing bootstrap runs |
| **Spike result** | **Works in 3 engines** on all 5 route-level 404s. The stub sees `default → update → page_view → gtm.js`, **identical to ordinary routes**. Ordinary-route, navigation, booking and form sections are **byte-identical** to the unfixed build | **Does not work.** The served shell is still `__next_error__` without the script; 0/5 targets gain a default (`spike-b-chromium.json`). It also moves the LOCKED bootstrap off a raw first-in-`<head>` script on every route | Not spiked. The ordering depends on React effect order (parent effects run after children; the loader's `next/script` effect timing). That is an implicit guarantee | Not attempted (out of R1 scope by brief). Needs framework research |
| Next.js 16 / architecture | No framework dependency; plain inline JS in an existing `next/script` | Framework-dependent; disproved for this case | Fits, but fragile | Framework/routing change |
| Server vs client-rendered error pages | Independent of the document: runs wherever the container could be injected | Fails on client-rendered shells | Independent | Fixes it at source |
| Script execution order | **Structural.** The guard and the injection are one synchronous script, so `gtm.js` cannot be requested before the guard has run | — | Implicit | Restores the bootstrap |
| Default-denied semantics | The default is prepended **before any container exists**, because the container only ever loads through this script. GTM reads the queue from index 0, so the default is the first thing it processes | — | Pushed after `page_view` unless prepended | Unchanged |
| Stored choice | Replays only a stored `granted`, with the same literals as the bootstrap; ads restated as denied | — | Same | Unchanged |
| JS disabled | Nothing loads (unchanged) | — | Same | Same |
| Duplicate consent commands | The guard is a no-op whenever a default already exists, which covers every ordinary route. Spike: exactly 1 default + ≤1 update per document in every scenario | — | Risk of double replay | None |
| GTM loading conditions | **Unchanged.** Same two gates (ID + granted); same `__msGtmLoaded` guard | — | Unchanged | Unchanged |
| Analytics / conversion events | No event added, renamed or re-parameterised. The `page_view` position relative to consent matches ordinary routes | — | Same | Unchanged |
| CSP | No new inline-script site: it extends the existing `gtm-script` inline body. **No `eval`** (the spike's `new Function` shortcut must not ship, §3) | — | — | — |
| Performance / hydration / SEO | ≈ +0.5 KB in the layout chunk; no markup, metadata or rendering change; no hydration effect | — | — | Also restores JSON-LD/CSS/`lang` in served HTML |
| Scope | 2 files, consent/analytics layer only | Root layout + LOCKED bootstrap | 1 file, weaker guarantee | **Expands scope** |

**Recommendation: Approach A.** It is the narrowest fix with a structural ordering guarantee, and the only feasible approach proven in all three engines. B is disproved. C is weaker. D is the separate R2 decision.

**Residual by design (not hidden):** on route-level 404s where the container never loads (undecided, rejected, returning rejected), `dataLayer` still has no `consent default`. **No container can run there**, so no tag can observe that state. The audit's harness facets (`consentBootstrap.present = false`, T1 "no default" on 5 targets) **will remain** after R1 and must still be reported. Only R2 removes them. OBS-1 therefore stays OPEN after R1.

---

## 3. Recommended R1 — exact design

### 3.1 Files likely to change (and nothing else)

| File | Change |
|---|---|
| `lib/consent.ts` | (1) Export `CONSENT_GUARD_SCRIPT`: a literal-only JS string (no interpolation except `CONSENT_STORAGE_KEY`). If `dataLayer` holds an `arguments`-shaped `['consent','default',…]`, it does nothing. Otherwise it builds `[default(4 × denied)]`, appends `update(analytics granted, 3 ads denied)` **only if** `localStorage` holds `'granted'`, and **prepends** them with `unshift` (or **appends** if `window.__msGtmLoaded` is already true, which is unreachable by construction). <br>(2) A native TypeScript helper `ensureConsentDefault()` with the same detection that prepends **the default only** (no replay). It is called at the top of `pushConsentUpdate`. No `new Function`, no script injection. **`CONSENT_BOOTSTRAP_SCRIPT` is unchanged** |
| `lib/gtm.tsx` | Prefix the existing `gtm-script` inline body with `CONSENT_GUARD_SCRIPT`, inside the same script and before the `__msGtmLoaded` check. Gates, strategy, ID handling and the double-injection guard are unchanged |
| Repository docs at implementation time | The `DEC` entry, the risks register (E6-A1 status only), `CURRENT_STATE.md`, and the implementation report |

**Not changed:** `app/layout.tsx`, the bootstrap, `ConsentProvider`/`ConsentBanner`/`ConsentPreferencesLink`, `lib/analytics.ts`, `AnalyticsRouteListener`, `BookingLink`, `ContactForm`, routes, metadata, JSON-LD, chrome, styles and GTM configuration.

*Optional (owner choice):* a `node --test` unit test that executes `CONSENT_GUARD_SCRIPT` in `vm` across the scenario table. `tests/` currently holds one `.cjs` test; importing the `.ts` export needs a small extraction step, so the probe remains the acceptance authority.

### 3.2 Consent-order guarantees

1. **G1 — No container without a default first.** `gtm.js` is requested only by the `gtm-script` body, and that body runs the guard synchronously before creating the `<script src>`. The container's first `dataLayer` read therefore always finds `consent default` at index 0.
2. **G2 — Default before update.** A banner decision on a page without a default prepends the default before pushing the update (`pushConsentUpdate`). The loader replay prepends `[default, update]` together.
3. **G3 — Idempotent.** Both guards are no-ops when a default exists, which covers every ordinary route and any second invocation. There is exactly one default per document.
4. **G4 — Stored choice parity.** Only a stored `'granted'` is replayed, with literals identical to the bootstrap. A stored `'denied'` never opens the gate.
5. **G5 — Advertising stays denied.** The three ad signals are literal `'denied'` at every new site.
6. **G6 — Fail closed.** Every storage or `dataLayer` access sits inside `try/catch`. A failure leaves no grant and cannot throw into the page.

---

## 4. Consent invariants (testable)

| # | Invariant | Probe check (stub container) |
|---|---|---|
| I1 | No container script executes before consent initialisation | Every stub snapshot (`__e6gtm[*].dl`) has `cmd:consent default` at index 0 |
| I2 | The default is established before any update | In every document, the index of the first `consent default` is lower than the index of the first `consent update` |
| I3 | A returning visitor's stored choice is handled consistently | `granted@X`: the snapshot's first entries are `[default, update(granted)]` for **every** X (ordinary, global 404, 5 route-level 404s). `denied@X`: 0 container requests |
| I4 | Rejecting or withdrawing prevents disallowed tracking | Reject: 0 container requests (that page + 3 navigations). Withdraw: denied update pushed; 0 script elements after reload |
| I5 | No duplicate conversions | `lead_form_submitted` = 1 on 2xx, triple-click and retry; 0 on 400/429/500/network/revisit |
| I6 | No PII in `dataLayer` | No `@` and no synthetic field values in `dataLayer` |
| I7 | Navigation from a route-level 404 does not bypass initialisation | `granted@<404>` → client navigation to `/contact`: defaults = 1, updates = 1, container requests = 1 |
| I8 | Ordinary-route behaviour unchanged | T1/T3 on ordinary routes and T5/T6/T7 **byte-identical** to the unfixed build; `analytics-forms.cjs --compare` vs B1 → 0 diffs |
| I9 | Exactly one consent default per document | Count of `consent default` = 1 wherever a container loaded or a decision was made |

Spike A satisfied I1–I9 in Chromium, WebKit and Firefox (`evidence/r1-spike/summary.txt`). The **expected residual** is no default on route-level 404s where no container loads and no decision is made (§2).

---

## 5. Regression matrix (local production builds, stubbed container, all external requests blocked)

| Dimension | Coverage |
|---|---|
| Builds | Candidate plain (no ID) + candidate with the inert placeholder ID; B1 plain as the comparison baseline. Production builds (`next build` / `next start`), plus **`npm run build:cpanel`** compile check |
| Routes | 22 ordinary static routes, including approved Direction C `/`, `/services`, `/seo`; global 404; route-level 404s for blog, portfolio, research and press; `/launch-checklist`; CMS fixture routes (`/blog/[slug]`, `/portfolio/[slug]`) on the fixture build for T1/T3 |
| Visitor states | First-time (undecided → accept / reject), returning accepted, returning rejected, withdrawal via footer, storage blocked (fail-closed spot check) |
| Navigation | Header, footer and mobile menu (`#dc-mnav`); back/forward; client navigation from each route-level 404 to `/contact`, then a form 2xx |
| Engines | Chromium, WebKit, Firefox (Playwright engines; real devices remain E1) |
| Suites | `e6-probe.cjs` T1–T8 (extended with I1/I2/I9 assertions and a "404 → `/contact` → 2xx" step); `analytics-forms.cjs --compare` vs B1; `inventory.cjs` + `diff-inventory.cjs` (expect 0 differences; R1 changes no markup); `served-head.cjs` (expect identical); `npm run typecheck`, `npm run lint`, `npm test`, both builds |
| Requires a real-container Preview (owner-authenticated, local RC with the real ID) | (P1) Consent tab on a route-level 404 with a stored grant shows `ad_storage`/`ad_user_data`/`ad_personalization` **denied** and `analytics_storage` granted at every event; (P2) the 5 H2 tags fire once per event, no paused tag fires; (P3) no `_gcl_*`, `_fbp` or Ads/`ccm` request after the fix; (P4) the same on an ordinary route (no regression). **The stub proves what the container sees, not what its tags do** |

---

## 6. Release strategy (PROC-1 respected: no push to `main`)

**VERIFIED FACT:** `origin/main` (`e51c753`) contains `eff9704`. Its workflow runs the release job on `push` to `main`, and only warns when the `production` environment lacks required reviewers. **PROC-1 is real.** Which commit production runs is **UNKNOWN** from the repository: the CI deploy path has a recorded SSH-port problem, and releases R1–R4 were manual. **The owner must confirm the live `BUILD_ID` and commit.**

| Gate | Approval | What happens | Evidence required to pass |
|---|---|---|---|
| **1. Local implementation** | Owner: "implement R1" | One focused commit on `ui-revamp` (2 files + docs), **local only** | Diff limited to §3.1 |
| **2. Local regression acceptance** | Owner, on the report | Full §5 matrix on `ui-revamp` | I1–I9 pass in 3 engines; 0 diffs elsewhere; static gates and both builds green |
| **3. Hotfix candidate** *(separately approved)* | Owner: "prepare hotfix" | Create **`hotfix/e6-r1-consent` from the exact commit production runs** (owner-confirmed). Cherry-pick the R1 commit only (the two files are not touched by B1, so the expected conflict risk is low). Re-run the §5 matrix against that branch's builds. **No push**, or a push to the hotfix branch only if the owner separately approves it; never to `main` | Matrix green on the production-base build; diff = the two files |
| **4. Staging** | Owner: staging approval | Deploy the hotfix artifact to a staging host **if one exists (UNKNOWN; to be named by the owner)**, with the real container ID, then run Preview checks P1–P4 | P1–P4 recorded |
| **5. Production** | Owner: production approval, **separate DEC** | Off-host build of the hotfix commit with the real build-time ID → artifact sha256 → the established manual `release.sh stage`/`activate` swap. The previous release is kept as `.prev`. **No GitHub workflow, no push to `main`** | Post-deploy: served HTML unchanged; the layout chunk contains the guard; a clean-context Preview or Tag Assistant check of P1 on a production route-level 404; no regression on `/`, `/contact`, `/schedule-call` |
| **6. Reconciliation** | Owner | Bring the hotfix into `main` only when PROC-1 is resolved or the risk is accepted; `ui-revamp` already carries it | — |

---

## 7. Rollback plan

- **Code:** R1 is one commit touching two files. `git revert` restores current behaviour exactly; the bootstrap and gates are untouched, so there is no migration or state to undo. The stored `ms.consent.v1` values are unaffected.
- **Production:** `release.sh` keeps the previous release directory. Swapping back is the recorded rollback path (memory/runbook). Trigger it on any console error from `gtm-script`, any ordinary-route consent-order change, or any Preview finding contrary to P1–P4.
- **GTM:** nothing to roll back; the container is not changed.

## 8. Residual risks and GTM access limitations

| Risk | Status |
|---|---|
| The R1 residual (no default on route-level 404s where no container loads) | Accepted by design; closed only by R2. **OBS-1 and OBS-6 remain OPEN** |
| GTM's handling of a prepended default (`unshift` before load) | VERIFIED that the container's first read sees it at index 0 (stub). **That GTM honours it exactly like the bootstrap's default is RESEARCH REQUIRED (Preview P1)**. Strong expectation: it is the same queue position and the same `arguments` shape as the bootstrap |
| Container behaviour with unset consent before the fix (historic exposure) | **UNKNOWN.** Not reconstructable without Preview/GA4 data |
| Current published container differs from `DEC-021` | **UNKNOWN** (E6-G1). R1 does not depend on the container's contents |
| A future change adds another container loader or a `gtag` global | Mitigated by documenting the guard as a mandatory prefix in `lib/gtm.tsx`; no other loader exists today |
| Production base commit unknown | Owner confirmation required before Gate 3 |

**GTM access:** none is needed to implement or locally accept R1. Owner-authenticated **Preview** on a local or staging release candidate with the real ID is required for P1–P4 before staging and production approval. A **published-container export** is still required for E6 closure (audit §6), not for R1.

---

## 9. Proposed implementation prompt (for use only after approval)

> **MAPPEDSKILLS — E6-A1 R1 CONSENT SAFEGUARD: IMPLEMENTATION (LOCAL ONLY).** Role: Consent Mode Engineer + Release QA.
> Baseline `ui-revamp` @ `<HEAD>`; read `docs/ui-revamp/gate-4/e6/E6_R1_CONSENT_SAFEGUARD_DESIGN.md` and the R1 DEC.
> Implement exactly §3.1:
> - `CONSENT_GUARD_SCRIPT` + `ensureConsentDefault()` in `lib/consent.ts`; call it at the start of `pushConsentUpdate`;
> - prefix the `gtm-script` body in `lib/gtm.tsx` with the guard;
> - literal values only; no `eval`/`new Function`; `CONSENT_BOOTSTRAP_SCRIPT`, `app/layout.tsx` and every other file unchanged.
>
> Extend `docs/ui-revamp/gate-4/e6/e6-probe.cjs` with assertions I1, I2 and I9, and a "route-level 404 → `/contact` → mocked 2xx" step.
> Run the §5 matrix in Chromium, WebKit and Firefox against isolated scratch builds (plain, placeholder ID, B1 baseline), with all external
> requests blocked and the container stubbed. Also run typecheck, lint, `npm test`, `npm run build` and `npm run build:cpanel` in a scratch copy.
> Report I1–I9 pass or fail with evidence, the expected residual (§2), and every difference from the baseline.
> One local commit (code + evidence + report). Do not push, merge, deploy, change GTM, start B2, or close E6/OBS-1/OBS-6. Stop for owner acceptance.

---

## 10. Owner decisions required

1. **Approve Approach A** as R1 (and reject B and C), including its documented residual: no default where no container loads, which is left to R2.
2. **Authorise local implementation** (Gate 1), as a change to LOCKED consent code limited to `lib/consent.ts` and `lib/gtm.tsx`, to be recorded as a new DEC.
3. Choose whether to add the optional `vm` unit test (§3.1).
4. **Confirm the production base**: the live `BUILD_ID` and commit, for the hotfix branch (Gate 3).
5. **Name the staging route**: an existing staging host, or accept a local release candidate plus Preview as the pre-production check (Gate 4).
6. **Schedule an owner-authenticated GTM Preview** for P1–P4 (before staging or production approval).
7. Decide **PROC-1 handling** for this hotfix: manual off-host release, with no push to `main` (recommended), until PROC-1 is resolved.
8. Separately, whether to commission **R2** research (full layout for segment `notFound()`), which is the only route to closing OBS-1 and OBS-6.
