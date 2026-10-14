# E6-A1 · R1 Consent Safeguard — Local Implementation and Acceptance

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Decision** | **`DEC-038`**: Approach A, local implementation and validation only |
| **Result** | **COMPLETE WITH EXCEPTIONS** (exceptions = the documented residuals in §7; no failing check) |
| **Baseline** | `ui-revamp` @ `101a653` (verified), `DEC-036`/`DEC-037` present. Uncommitted E6 audit, R1 design and governance notes preserved. `next-env.d.ts` untouched and not staged |
| **Design** | [`E6_R1_CONSENT_SAFEGUARD_DESIGN.md`](E6_R1_CONSENT_SAFEGUARD_DESIGN.md) (Approach A) |
| **Evidence** | [`evidence/r1-impl/`](evidence/r1-impl/) |
| **Not done (by instruction)** | No deployment, staging, hotfix branch, push or merge. GTM container not touched. No real conversion or lead. B2 not started |

---

## 1. Files changed

| File | Change |
|---|---|
| `lib/consent.ts` | **Added** `CONSENT_GUARD_SCRIPT` (inline JS, literals only). If `dataLayer` holds no `consent default`, it prepends default (4 × denied) plus, for a stored `'granted'` with no update already queued, the bootstrap's `consent update`. It appends instead only if a container is already running (unreachable). <br>**Added** `ensureConsentDefault()` (native TypeScript, no `eval`): prepends the denied default if none exists. <br>**Changed** `pushConsentUpdate()`: now calls `ensureConsentDefault()` first. **`CONSENT_BOOTSTRAP_SCRIPT`, storage key, read/write helpers and the update payload are unchanged** |
| `lib/gtm.tsx` | The inline loader body moved into an exported pure `gtmLoaderScript(gtmId)`, which starts with `CONSENT_GUARD_SCRIPT`. The GTM snippet text, `id="gtm-script"`, `afterInteractive`, both gates (ID + `granted`) and the `__msGtmLoaded` guard are unchanged |
| `tests/consent-guard.test.cjs` | **New.** 19 unit tests (existing `node --test` `.cjs` convention) |
| `docs/ui-revamp/gate-4/e6/e6-probe.cjs` | **Added** T10: returning accepted on a 404 → `/contact` → mocked 2xx → back/back/forward |
| `docs/ui-revamp/gate-4/e6/r1-invariants.cjs` | **New.** Evaluates I1–I9 on probe output against the unfixed build |
| Governance | `DECISION_LOG.md` (`DEC-038`), `CURRENT_STATE.md`, `PROGRAMME_RISKS_AND_LIVE_ISSUES.md`, `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §5 |

**Application diff: 2 files, +110 / −8.** No other application file changed: `app/layout.tsx`, the consent provider, banner and preferences link, `lib/analytics.ts`, forms, booking, routes, metadata, chrome and styles are all untouched. No dependency added.

*Test tooling note:* the unit tests transpile the real `.ts`/`.tsx` with TypeScript 5.7.3. It is present in `node_modules` transitively (via `eslint-config-next`) and is the compiler `npm run typecheck` already uses. It is not a declared `devDependency`; declaring it is a separate owner choice.

---

## 2. Before / after consent ordering

What the container would read first (stub snapshot at `gtm.js` injection). **Identical in Chromium, WebKit and Firefox** (`evidence/r1-impl/probe/before-after-ordering.txt`).

| Scenario | Before (B1 build) | After (R1 build) |
|---|---|---|
| Returning accepted · `/` | default(denied) → update(granted) → page_view → gtm.js | **unchanged** |
| Returning accepted · global 404 | default → update → page_view → gtm.js | **unchanged** |
| Returning accepted · `/blog/<unknown>` (also portfolio, research, press, `/launch-checklist`) | **page_view → gtm.js** (no consent command) | **default(denied) → update(granted) → page_view → gtm.js** |
| First-time accept · `/` | default → page_view → update(granted) → gtm.js | **unchanged** |
| First-time accept · route-level 404 | page_view → update(granted) → gtm.js | **default(denied) → page_view → update(granted) → gtm.js** |
| First-time reject · route-level 404 (no container) | page_view → update(denied) | default(denied) → page_view → update(denied) |
| Returning accepted · 404 → `/contact` → 2xx → back/forward | 0 default · 0 update · 1 `lead_form_submitted` | **1 default · 1 update** · 1 `lead_form_submitted` (still 1 after back/forward) |

R1 now gives a route-level 404 the same order an ordinary page has.

---

## 3. Unit tests (`npm test`)

**30/30 pass:** 19 new and 11 existing CRM tests (`evidence/r1-impl/unit-tests.txt`).

| Required case | Test(s) |
|---|---|
| First-time visitor | ordinary accept; route-level 404 accept; route-level 404 reject |
| Returning accepted | ordinary (guard no-op); route-level 404 (parity with the real bootstrap) |
| Returning rejected | gate renders nothing (`denied`/`unset`); the guard never replays a grant |
| Missing / malformed stored choice | `null`, `''`, `'GRANTED'`, `'true'`, JSON, `' granted'`, throwing storage → default only |
| Repeated initialisation | guard ×3 + `ensureConsentDefault` ×3 + loader ×3 → 1 default, 1 update, 1 `gtm.js` |
| Update before a prior default | default inserted ahead; a queued update is not replayed twice |
| Withdrawal | after the container loaded: one denied update appended, no second default |
| GTM loading order | guard → `gtm.start` → `gtm.js` element; container URL unchanged; `__msGtmLoaded` set |
| Duplicate-event prevention | `trackOnce` → 1 `lead_form_submitted` per key; key never in payload |
| Also | guard writes only consent commands with ads denied; the default is byte-equal to the bootstrap's; non-array `dataLayer` safe; `track` sanitising |

**Negative control:** with the guard prefix and the `ensureConsentDefault()` call removed (scratch copy), **8 tests fail** (`evidence/r1-impl/unit-negative-control.txt`).

---

## 4. Cross-engine E6 probe (stubbed container, all external requests blocked)

| Build | Commit / source | BUILD_ID | Port |
|---|---|---|---|
| Before · plain | `101a653` | `K4F_9bK_hIFnBZ-sJpKpG` | 3710 |
| Before · placeholder ID `GTM-E6AUDIT` | `101a653` | `_YvyN0IgFMVLKxPeT1hJY` | 3711 |
| Before · CMS fixture | `101a653` | (scratch `b1-fixture`) | 3722 |
| After · plain / placeholder ID / fixture | `101a653` + R1 working-tree files (sha1 `consent.ts` `a5fd766c…`, `gtm.tsx` `03a90c1b…`) | plain `r1-plain`, ID `r1-gtm`, fixture `r1-fixture` (scratch) | 3730 / 3731 / 3732 |
| After · `build:cpanel` + `verify:build:production` | same | `7gBhGmexFaxihwFDLGUDc` | — |

**Coverage:**
- 22 ordinary routes, including Direction C `/`, `/services` and `/seo`, and the global 404;
- route-level 404s for blog, portfolio, research and press, plus `/launch-checklist`;
- first-time accept/reject, returning accepted/rejected, and withdrawal;
- header (desktop), footer and `#dc-mnav` navigation, same-page clicks, back/forward;
- 404 → `/contact` → mocked 2xx → back/back/forward.

| Invariant | Chromium | WebKit | Firefox |
|---|---|---|---|
| I1 container never runs before the default (18 container snapshots) | PASS | PASS | PASS |
| I2 default before any update (46 sequences) | PASS | PASS | PASS |
| I3 stored choice consistent (granted → default+update first, all 9 route types; denied → no container) | PASS | PASS | PASS |
| I4 reject/withdraw → no container; ads denied in every command | PASS | PASS | PASS |
| I5 no duplicate conversions; 1 `meeting_started` per click | PASS | PASS | PASS |
| I6 no PII in `dataLayer` | PASS | PASS | PASS |
| I7 404 → client navigation → conversion → back/forward keeps initialisation | PASS | PASS | PASS |
| I8 ordinary routes, navigation, booking, form and not-found rendering identical to the unfixed build | **PASS on re-run** (see note) | PASS | PASS |
| I9 at most one default per document | PASS | PASS | PASS |

**Note on I8, Chromium:**
- **First run:** I8 failed on one facet only, `t8_notfound`. On the freshly started candidate server, the live-DOM title on `/blog/<unknown>` and `/portfolio/<unknown>` was the route's own "… Not Found" metadata instead of "Page Not Found". The served HTML was identical.
- **Why this is not R1:** this is **OBS-6** (server-timing-dependent metadata, already recorded in B1 on a fresh server). T8 runs as an undecided visitor, so no R1 code executes there (no loader, no banner decision).
- **Control** (`obs6-control.txt`): both servers were restarted fresh, then 30 loads were taken on each. Both builds showed identical titles. The variant was not reproduced.
- **Re-run:** the full Chromium before/after pair passes 9/9 (`probe/chromium-rerun/`). The first-run file is kept unaltered (`probe/invariants-chromium.txt`).

---

## 5. Analytics parity and wider regression

| Check | Result |
|---|---|
| B0 `analytics-forms.cjs` vs B1 baseline (consent states, `page_view` walk, BookingLink, ContactForm contract + mocked outcomes) | **0 differing sections** |
| `page_view` per navigation (32 desktop + 14 mobile-menu steps, back/forward, same-page) | exactly 1 per navigation, 0 on same-page click, in 3 engines (I8) |
| `meeting_started` | exactly 1 per booking click; chrome "Book a call" → `page_view` only |
| `lead_form_submitted` | exactly 1 per success (incl. triple-click, network-fail-then-retry); 0 on 400/429/500/network/direct `/thank-you`/reload/back-forward |
| PII | none (`@` and synthetic values absent) |
| Inventory, before vs after (34 targets; title, meta, canonical, OG, JSON-LD, headings, text, links, CTAs, forms, consent-bootstrap order) | **850 facets identical · 0 differences** |
| Served SEO head (`served-head.cjs`) | **34/34 identical** |
| `<main>` pixels vs B1 masked hashes | **68/68 match** |
| Chrome consistency (`--expect-dc all`) | 0 failures |
| B1 navigation controls (`nav-checks.cjs`) | Chromium 560/0, WebKit 560/0, Firefox 560/0 on re-run. The first Firefox run had 1 M5 finding on `/terms` 320×568: "banner shown false", i.e. the banner had not rendered when sampled under parallel load. It did not reproduce; R1 does not touch the banner |
| Gate 2 application suite (Direction C) | **192/192** (B1: 192/192) |
| Gate 3 final acceptance | **261 PASS · 0 FAIL · 3 NOTE** (B1: identical) |
| Gate 3 chrome navigation | 0 console errors |
| Route render modes (build table) | identical, 34 lines |
| `npm run typecheck` / `npm run lint` / `npm test` | pass / pass (0 problems) / 30/30 |
| `npm run build` (plain, placeholder ID, fixture) / `npm run build:cpanel` / `verify:build:production` | all pass; GTM ID inlined in 1 chunk |

**Confirmed unchanged:** layout and visual design, navigation and footer, copy, URLs, metadata, canonicals, JSON-LD, forms, booking destinations, the GTM container (never accessed).

---

## 6. Rollback

- **Code:** `git revert <R1 implementation commit>`. It touches only `lib/consent.ts`, `lib/gtm.tsx` and the new test. There is no data migration; stored `ms.consent.v1` values are unaffected and behaviour returns to B1 exactly.
- **If ever deployed:** use the established release swap back to the previous release directory (`release.sh`). Container: nothing to roll back.

## 7. Residual risks and limitations (stated, not hidden)

1. **R1 does not repair the dynamic-404 error shell.** Route-level `notFound()` responses are still served as `<html id="__next_error__">` without the layout head, bootstrap, JSON-LD, stylesheets or `lang` in served HTML. That is **R2** (separate, unauthorised).
2. **The safeguard runs only when the container would load or when the visitor makes a banner decision.** On route-level 404s the following states still show **no `consent default` in `dataLayer`**: first-time undecided visitor, and returning rejected visitor. In every one of these cases **no container is requested** (0 requests, verified in 3 engines), so no tag can observe the missing state. `inventory.cjs` continues to report `consentBootstrap.present = false` on those 5 targets.
3. **OBS-1 and OBS-6 remain OPEN.** E6 remains OPEN (container-level verification BLOCKED BY ACCESS).
4. **Real-container GTM Preview is still required.** The stub proves what the container reads, not what its tags do.
5. **Production consent behaviour has not been verified by live browser execution.** Production still runs the unfixed code.
6. **E1** (real devices, Safari, Firefox releases, VoiceOver) remains open.
7. **PROC-1** remains open. A push to `main` triggers the release job on `origin/main`, so any merge or deployment needs separate authorisation.

## 8. Requirements for the real GTM Preview (owner-authenticated)

Run against a **local** release candidate built with the real container ID. Never deploy it for this purpose.
- **P1:** returning accepted on `/blog/<unknown>`. The Consent tab shows `ad_storage`, `ad_user_data` and `ad_personalization` **denied** and `analytics_storage` granted at the first event and at `lead_form_submitted` after navigating to `/contact`.
- **P2:** the 5 H2 tags fire once per event; no paused tag fires.
- **P3:** no `_gcl_*`, `_fbp`, Ads or `ccm/collect` request.
- **P4:** an ordinary route is unchanged.

## 9. Production-release prerequisites (none authorised)

1. The owner confirms the live production `BUILD_ID` and commit.
2. Separately approved hotfix branch from that commit, carrying the R1 commit only. Re-run this matrix on that base.
3. GTM Preview P1–P4 recorded.
4. Staging approval: a host must be named, or a local RC plus Preview accepted.
5. Production approval with its own DEC. Manual off-host artifact and `release.sh` swap; **no push to `main`** while PROC-1 is open.
6. Post-deploy check of P1 on a production route-level 404 in a clean context.
