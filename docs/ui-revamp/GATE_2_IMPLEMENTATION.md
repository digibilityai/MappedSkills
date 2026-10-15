# MappedSkills UI Revamp — Gate 2: Direction C on the Representative Pages

| | |
|---|---|
| **Gate** | 2 — Representative page implementation (Implementation Plan, Gate 2) |
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` @ `142b9c8` + uncommitted work. **Nothing committed, pushed, merged or deployed** |
| **Authority** | `DEC-034` (Direction C selected; scope = visual direction + Gate 2 implementation). Read with `DEC-018`, `DEC-029`–`DEC-033` |
| **Approved reference** | `gate-1/prototypes/direction-c-resolution-approved.html` (frozen, sha256 `193b4ab8…da205a3`) |
| **Evidence** | `gate-2/validation/` (scripts + raw results) · `gate-2/screenshots/compare.html` (prototype vs app) · `gate-2/screenshots/app/` *(retained locally, not in Git; see the note in §4)* |
| **Result** | **COMPLETE WITH EXCEPTIONS** (§8). Recommend the owner proceeds to the Gate 3 review (§10) |

Evidence labels follow `CLAUDE.md`. **VERIFIED** means it was measured in this session on a local **production build**
(`next build` + `next start`) in Playwright Chromium, unless stated otherwise. **Prototype checks are reported
separately (§2) and do not validate the application.**

---

## 1. Summary

Direction C — Resolution is implemented in the Next.js application for `/`, `/services` and `/seo`, including the
header, mobile menu and footer as rendered on those three routes. It is built as a **reusable token + component layer**
(`app/direction-c*.css`, `components/direction-c/*`), not as copied prototype markup. All three routes keep their approved
copy, headings, links, metadata, Open Graph, canonical and structured data byte-for-byte; every other route on the site is
**pixel-identical** to the baseline build.

| Check (application, production build) | Result |
|---|---|
| Application suite (`app-checks.cjs`): responsive audit ×6 widths ×3 routes, menu, disclosure, focus, motion, no-JS, names, CTAs | **192/192 PASS** |
| Out-of-scope routes, baseline vs Gate 2 (`unrelated-routes.cjs`): 21 routes incl. 404, at 390 and 1440 | **42/42 pixel-identical**, same text, same links |
| Content preservation (`compare.py`) | 0 visible text blocks lost; metadata, OG, canonical, robots, JSON-LD **identical**; link destinations identical |
| JSON-LD on all commercial routes (shared breadcrumb refactor) | **identical** on 8 routes |
| `npm run typecheck` · `npx eslint .` · `npm test` · `npm run build` · `npm run verify:build` | exit 0 · exit 0 · 11/11 · exit 0 · OK |
| Local lab CLS (3 runs, 390/1440) | **0.0000** on all three routes (baseline `/` @390 was 0.0235) |

---

## 2. Phase A — decision formalised, prototype navigation resolved (prototype only)

- **`DEC-034`** recorded in `DECISION_LOG.md` (next free identifier; nothing renumbered). Scope stated precisely: visual
  direction + Gate 2 implementation; **not** staging, production, merge, Gate 3 or site-wide rollout.
- **Frozen versions:** `direction-c-resolution-r2.html` (pass 2 exactly as reviewed, sha256 `046dcc29…`) and
  **`direction-c-resolution-approved.html`** (r2 + the two navigation rulings, sha256 `193b4ab8…`).
- **Ruling 4 (duplicate Contact Us):** while the mobile menu is open (<1200px) the header bar's CTA pair is withdrawn; the
  menu's own pair, which comes first, remains. Same destinations, same labels, nothing added.
- **Ruling 6 ("Company" heading):** a "Company" group label precedes and names (`aria-labelledby`) the company links.
- **Ruling 2** — recorded interpretation: "retain the earlier placement" = keep the pass-2 position (horizon panel directly
  after the CTAs on mobile). Flagged in `DEC-034` so the owner can correct it if a reversion was meant.

**Prototype regression (VERIFIED, `gate-1/mobile-refinement/gate2-phase-a/`):** keyboard suite **20/20**; pass-2 checks
**38/38**; audit — no overflow, 0 console errors at six widths (only the two known false positives); motion — 0 pre-states
under reduced motion, 0 unresolved after scroll; nav-fix checks **31/32** — the one miss (1024 pixel identity) was traced to
the Google-Fonts capture flake: the **frozen r2 file itself** produced the same alternate render (1 in 12), the updated file
12/12 identical. One sub-pixel keyboard regression introduced by the new label was fixed at its cause (integer line box).

---

## 3. Phase B — implementation

### 3.1 Architecture

| Layer | File(s) | What it is |
|---|---|---|
| Tokens + chrome CSS (global) | `app/direction-c.css` (~20 KB src) | `--dc-*` tokens (mapped onto the existing `--resolve-*` roles + the two Gate 1 contrast tokens), the `.dc` scope reset, type roles, marks, actions, header, mobile menu, footer |
| Page CSS (route-scoped) | `app/direction-c-pages.css` (~28 KB src) | Sections and compositions, hero stage, friction, chain, plates, boundary, fit, bands, scope rows, questions, close, motion pre-states. Imported by `primitives.tsx`, so **only Direction C routes load it** |
| Primitives | `components/direction-c/primitives.tsx` | `DcPage`, `Section`, `Label`, `Statement`, `Lede`, `Body`, `Note`, `TLink`, `InlineLink`, `ActionPair`, `Crumb`, `ServiceOpener`, `Plate`/`PlateRow`, `NotPromised`, `Fit`, `ScopeRows`, `QuestionRows`, `Close`, `Mark` |
| Components | `ServiceBands.tsx`, `HeroStage.tsx` (client), `Motion.tsx` (client), `home/*` | Services overview; the homepage stage (T1); one-shot section motion; the homepage chapters |
| Chrome | `SiteHeader.tsx` (client), `SiteFooter.tsx`, `nav.ts`, `ChromeSwitch.tsx` (client) | One nav data source for header, menu and footer; the route-scoped switch |
| Font | `components/direction-c/fonts.ts` | A second Bricolage instance **with the `opsz` axis** (see §8 E13) |

**Isolation, by construction.** Every class and token is `dc-` prefixed and unlayered (so the legacy `@layer base` element
rules cannot reach in, and nothing here can match a legacy element); resets are `:where()`-wrapped (zero specificity).
`ChromeSwitch` picks the chrome by pathname during server rendering — `/`, `/services`, `/seo` get Direction C, every other
route gets **exactly the element it rendered before**. A route group was rejected because moving `app/page.tsx` breaks
`scripts/verify-server-files.cjs` (deploy path). Gate 4D deletes the seam.

**Shared file touched outside the new layer:** `components/commercial/primitives.tsx` — the breadcrumb trail and its
`BreadcrumbList` were extracted into exported functions so the Direction C crumb emits the same structured data from the
same code. Legacy output unchanged (JSON-LD byte-identical on 8 routes; 42/42 pixel-identical).

### 3.2 Changed files

| Status | File |
|---|---|
| Modified | `app/layout.tsx` (CSS import; `ChromeSwitch` around header and footer) |
| Modified | `app/page.tsx` · `app/(pages)/services/page.tsx` · `app/(pages)/seo/page.tsx` (metadata and copy blocks unchanged; composition replaced) |
| Modified | `components/commercial/primitives.tsx` (breadcrumb extraction only) |
| New | `app/direction-c.css` · `app/direction-c-pages.css` |
| New | `components/direction-c/{primitives,ServiceBands,HeroStage,Motion,SiteHeader,SiteFooter,ChromeSwitch,nav,fonts}.tsx/ts`, `components/direction-c/home/{HomeHero,HomeStrategy,HomeAccountability}.tsx` |
| Docs | `DECISION_LOG.md` (`DEC-034`), `CURRENT_STATE.md`, `PROGRAMME_RISKS_AND_LIVE_ISSUES.md` (LIVE-1 note), `gate-1/README.md`, `gate-1/prototypes/direction-c-resolution-{r2,approved}.html`, `direction-c-resolution.html`, this file, `gate-2/` |
| Not changed | Every other route, `components/homepage/*` (no longer rendered; kept until Gate 3 so the old homepage is a one-file revert), forms, `/api/*`, analytics, consent, `lib/*`, workflows, dependencies (`package.json` untouched) |

### 3.3 What each page now is

- **`/`** — hero (statement over split; stage resolves traffic → enquiries, T1, pre-paint dark stage so no flash) →
  departure line → strategy (friction split; the chain as an HTML ordered list with the boundary, joins, unattributed
  arrival and client-owned segment; three stage lines with all seven links) → boundary (reverse: struck "not promised" list
  vs owned statement) → evidence (claim + plate: 28-run field, method, limitation) → fit → tangerine close.
- **`/services`** — the approved nine blocks in order: split opener → the unit (split) → parts + `ChainFull` (paper) →
  boundary (reverse) → **narrowing bands** Capture 4 / Convert 2 / Measure 1 (paper) → later / not-done side by side →
  testing honesty (paper) → fit → close.
- **`/seo`** — breadcrumb → split opener → **horizon panel** (ruling 2) beside/before the situation block → work
  (disclosure rows, production behaviour) → measurement + `ChainDiscovery` + adjacent limit → questions (reverse) → close.

### 3.4 Preserved, and how it was verified

| Boundary | Status |
|---|---|
| Copy | Production copy only. 0 visible text blocks lost on any route (`compare-result.txt`); the one flagged `/seo` block is the horizon paragraph split across its labelled rows, word for word |
| Headings | `/` and `/services`: identical sequence. `/seo`: identical set; horizon h2 now precedes situation h2 (ruling 2) |
| Links | Identical href multiset in `<main>` on all three routes; footer link set identical; header gains no new destination |
| Metadata / OG / canonical / robots / JSON-LD | Identical on all three routes; `revalidate = 60` on `/` unchanged; build still lists `/` as ISR 1m |
| CTA architecture | Every in-page CTA is `/contact` "Tell us what you’re trying to fix" or `/schedule-call` "Book a call" (VERIFIED); no third button, no sticky bar |
| Analytics / consent | No event code on these routes changed (they emit `page_view` only, via the untouched route listener); consent bootstrap, banner, provider and the analytics-preferences control untouched (the control is the same component, restyled by placement) |
| Forms / APIs / backend | None on these routes; none changed |

---

## 4. Phase C — responsive implementation (VERIFIED, production build)

| Width | `/` | `/services` | `/seo` | Header / menu |
|---|---|---|---|---|
| 360 | no overflow · 0 targets <44px · 0 errors | same | same | menu: one Contact Us, CTAs first and inside viewport, "Company" label, Escape returns focus |
| 390 | same | same | same | same; 390×600 last item reachable |
| 430 | same | same | same | same |
| 768 | same | same | same | same (Book a call + Contact Us in bar when closed) |
| 1024 | same | same | same | same (compact header; no 1024 overflow) |
| 1440 | same | same | same | full nav; Services disclosure of links; Escape / outside click close |

Also VERIFIED at every width: one `h1`, no heading jumps, **no sticky/fixed element** in Direction C chrome or content, no
element past the right edge. Menu behaviour, CTAs, evidence plates, service sections, the SEO caveats (horizon panel placed
directly after the CTAs at ≤899px) and the footer were checked by script and by inspection of the captures.

**Screenshot comparison against the approved prototype:** `gate-2/screenshots/compare.html` — 53 section pairs (header,
menu-open, hero, strategy/chain, proof, services bands, `/seo` opener + horizon, close, footer) at all six widths. The hero
renders effectively identically to the prototype at 1440, including the opsz display type; every visible difference is
an intended one listed in §5. Full-page application captures and menu-open captures: `gate-2/screenshots/app/`.

> **Not in Git (`DEC-036`, 2026-10-08):** these captures of the Gate 2 build predate the Gate 3 remediation and are superseded by `gate-3-remediation/evidence/screens/after/` and `gate-3-acceptance/evidence/screens/`. The folder is excluded from the Git checkpoint and retained locally only. Regenerate with `validation/shots.cjs` (archival; see `../QA_REGRESSION_RUNBOOK.md` §4).

---

## 5. Intended differences from the prototype

| # | Difference | Why |
|---|---|---|
| D1 | **Copy is production copy**, not prototype copy, wherever they differ (hero caption + 4th "unattributed" legend row; chain node names; stage bodies; services descriptions in full; horizon rows carry the full boundary text) | Ruling 7; copy is LOCKED |
| D2 | **Not used — prototype microcopy with no repository source:** chain sub-lines ("Where the buyer was already looking." …), the "Measure — every join recorded / Reported, not promised" key, band titles ("Reach the demand" …), services-panel descriptions, plate status heads ("First-party · published · dated"), "0 of 28 runs named MappedSkills", "One engagement, delivered together." | Unapproved new copy (`DEC-034` "does not do"). "Every join recorded" overstates the approved "each enquiry records where it came from"; "dated" implies a published date this page does not show |
| D3 | **Not used — ruling-3 label "How to read the marks"** on the homepage | Its "not measured / unattributed" entry would mislabel the 28 run marks (which mean "did not name us"). Ruling 3 is conditional on accuracy |
| D4 | **Used — ruling-3 labels:** "One mark per run. A named run would be filled." (`/`), "4 / 2 / 1 capabilities" (`/services`, computed from the rows), "Horizon · If it is urgent · Not promised" (`/seo`) | Each literally true where it sits |
| D5 | **LIVE-2 headline kept** ("We have no case studies to show you."); no Ameba case-study plate on the homepage | Locked copy (`DEC-031`); the plate is not homepage content and would sharpen the contradiction |
| D6 | Chain: Capture spans discovery only, Convert spans landing → the enquiry; the three joins are marked; "demand we cannot see" lead-in kept | Accuracy against the production figure and its legend ("a join, where the work is done") |
| D7 | Homepage stage **tablist** (auto-advancing, one panel open) → static, all-open stage lines (h3 kept) | Prototype composition; nothing gated behind a control |
| D8 | The "departure" line is a calm statement band on ground, not an ink band | Keeps the homepage at Direction C's two counted inversions |
| D9 | Logo = production asset (prototype: typographic placeholder) | Gate 1 E6; asset question still open |
| D10 | Footer: social profiles as text links; the duplicate mailto icon dropped (email remains a link) | Direction C uses no icon set. **Accepted by the owner as an intended difference (`DEC-036`); the `mailto:` email link with its visible address was verified present on `/`, `/services`, `/seo` on 2026-10-08** |
| D11 | `ChainFull` (`/services`) and `ChainDiscovery` (`/seo`) are the existing commercial figures, reused unchanged | Prototype did not stage them; redraw belongs to 4G |
| D12 | Hero stage below 900px resolves when it comes into view, not 900ms after load | It sits below the CTAs; production did the same |
| D13 | 28-run "pending → recorded" animation not implemented | In the prototype both states render identically (open marks), so it moved nothing |

---

## 6. Phase D — quality gates

| Gate | Command / script | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | **exit 0** |
| Lint | `npx eslint .` | **exit 0** (two `react-hooks/set-state-in-effect` errors found in new code during the session were fixed, not suppressed) |
| Existing automated tests | `npm test` | **11/11 pass** (these cover CRM delivery; none covers UI) |
| Build | `npm run build` · `npm run verify:build` | **exit 0** · **OK** (local build: Contentful credentials absent from this shell, affects Contentful-backed routes only — pre-existing local condition) |
| Browser interaction | `app-checks.cjs` §2, §3, §5, §9 | PASS (menu, disclosure, toggle, link-closes-menu, CTA destinations) |
| Keyboard accessibility | `app-checks.cjs` §2–§5 | PASS — every Tab stop on all three routes at 390 and 1440 (46–56 stops) has a ≥2px visible outline; Escape/focus return; disclosure not `role=menu`; closed panel inert |
| Reduced motion | `app-checks.cjs` §6 | PASS — 0 pre-states, no pre-paint attribute, stage resolved, **no element keeps a transition >10ms** |
| Motion on | `app-checks.cjs` §7 | PASS — first paint is the dark stage; resolves to enquiries; below-fold elements arm and **0 remain unresolved** after scroll (1440 and 390) |
| No JavaScript | `app-checks.cjs` §8 | PASS — complete pages, every disclosure open, stage resolved, chrome present |
| Responsive screenshots | `shots.cjs`, `compare-shots.cjs` | 0 overflow, 0 console errors in every capture |
| Regression, out-of-scope routes | `unrelated-routes.cjs` | **42/42 pixel-identical** |
| Content preservation | `inventory.cjs` + `compare.py` | §3.4 |
| Lab vitals (local only) | `vitals.cjs` | CLS **0.0000** everywhere; LCP 40–56 ms on localhost (not meaningful as field data) |

**Defects found and fixed during validation (all in new code):** chain spine overran the key on mobile; service-row link
names ran together ("…(SEO)the primary…"); logo links under 44px; homepage CLS **0.148** at 1440 (opsz font not
preloaded) and **+0.10** at 390 (stage label reflow) — both fixed to 0.0000; the opsz font and page CSS leaking onto legacy
routes (fixed by scoping; see E14).

**Not performed (UNKNOWN):** real iOS/Android devices, Firefox and WebKit engines, VoiceOver/TalkBack/NVDA, 200% zoom and
text-spacing, landscape phones, Windows High Contrast, production/field Core Web Vitals, usability testing.

---

## 7. Bytes (VERIFIED, production build, uncompressed transfer unless stated)

| | Baseline | Gate 2 |
|---|---|---|
| `/` HTML (gzip) | 22.3 KB | **15.1 KB** |
| `/services` · `/seo` HTML (gzip) | 22.5 · 19.8 KB | 20.8 · 17.9 KB |
| Direction C routes: CSS | 177.9 + 3.4 KB | 177.3 + 18.2 (chrome, 4.3 KB gz) + 23.7 (pages, 5.2 KB gz) KB |
| Direction C routes: fonts | 2 files, 64.3 KB | **3 files, 139.3 KB** (+ opsz Bricolage, 75 KB, preloaded) |
| Legacy route (e.g. `/about`) HTML (gzip) | 14.5 KB | 15.3 KB (+0.8 KB: the alternate chrome in the RSC payload) |
| Legacy route CSS | 177.9 + 3.4 KB | 177.3 + 18.2 KB (**+3.5 KB gz**) |
| Legacy route fonts / JS | 64.3 KB / 521 KB | **unchanged** (with prefetch blocked) / 518 KB |

A legacy page that shows a `<Link>` to `/`, `/services` or `/seo` (the header logo, the nav) will, through Next.js's
existing prefetch, warm those routes' font and page CSS — the same mechanism that already prefetches their payloads.

---

## 8. Exceptions and open issues

| # | Item | Label |
|---|---|---|
| E1 | **Navigation/footer service labels** follow the approved `/services` names ("Paid social", "The enquiry path", "Enquiry generation", "Measurement" → `/how-it-works`) instead of the legacy labels ("Social Media Ads", "Conversion Optimization", "Lead Generation"); destinations unchanged | **Owner confirmation** |
| E2 | Desktop **Services** is a disclosure button (prototype pattern); `/services` is reached via "All services" in the panel, and directly in the mobile menu and footer. The legacy header had a Services link plus a chevron | **Owner confirmation** |
| E3 | Services panel shows **names only** (prototype descriptions are unapproved copy; legacy descriptions contradict the positioning, e.g. "Rank for high-intent keywords") | Copy approval if descriptions are wanted |
| E4 | New **structural labels** used that are not in ruling 3: plate row terms "Evidence · Method · Limitation" and the "Claim" tag (Gate 1 §4.3 proof taxonomy) | **Owner confirmation** |
| E5 | **Strike-through** on "we do not promise" items (prototype) re-introduces a treatment Session 19A removed because it never rendered | Owner review at Gate 3 |
| E6 | The opportunity-and-revenue point uses the **hatched** mark (prototype), which the Gate 1 legend calls "withheld"; here it means "a state that is not a value" (THE RESOLVE hatch). No legend on that page names it | Mark-usage rule (Gate 1 §11 refinement 1) still to be written |
| E7 | Homepage stage tablist replaced by static lines (D7) — removes an approved Phase D interaction | Owner review at Gate 3 |
| E8 | `/seo` heading order changed (ruling 2) | Approved by ruling 2; recorded |
| E9 | The homepage chain's long SVG `<desc>` is gone; the HTML list, its key and "Structure only" note replace it | Intended |
| E10 | **LIVE-2** remains (headline kept) | `DEC-031` — separately authorised fix |
| E11 | **LIVE-1 interaction (`DEC-033`):** on `/`, `/services`, `/seo` the legacy sticky header is no longer rendered, so the LIVE-1 condition cannot occur there **in this branch**. This is a consequence of implementing the approved non-sticky Direction C header, not a LIVE-1 fix. **Every other route, and production, still has LIVE-1.** It stays open | Tracked (`PROGRAMME_RISKS_AND_LIVE_ISSUES.md` note added) |
| E12 | **PROC-1** open: a push to `main` deploys to production. Do not merge `ui-revamp` | Tracked |
| E13 | **Font:** production Bricolage has **no `opsz` axis** (VERIFIED: identical widths at opsz 12 and 96) — the Gate 1 statement "optical size axis already available" is not accurate. Direction C's display type needs it, so the three routes load a 75 KB opsz instance | Owner/performance decision: keep, or drop opsz and accept the typographic deviation |
| E14 | Unrelated routes carry +3.5 KB gz CSS and +0.8 KB gz HTML for the route-scoped chrome; no visual, font or JS change | Removed when 4D makes the chrome global |
| E15 | **GTM container triggers** are not in the repository. If any trigger keys on legacy CSS classes or DOM structure (not href/text) it would not fire on these three routes. Hrefs and labels are unchanged | **RESEARCH REQUIRED** — check the container before Gate 8 |
| E16 | `components/homepage/*` (Gate 10 homepage) is unused but retained for a one-file revert | Remove after Gate 3 |
| E17 | Testing gaps in §6 | **UNKNOWN** |
| E18 | `.claude/launch.json` (local preview configs with scratchpad paths) is untracked and should not be committed | Local only |

---

## 9. URLs (local, not deployed)

Production build served locally: `http://localhost:3300/` · `http://localhost:3300/services` · `http://localhost:3300/seo`
(reproduce with `npm run build && npx next start -p 3300`). **Nothing was deployed to staging or production.**

---

## 10. Recommendation for Gate 3

**Recommend the owner proceeds to the Gate 3 review of these three pages.** Direction C is implemented as a reusable system,
with copy, SEO, structured data, CTAs and analytics boundaries unchanged. The rest of the site is untouched, verified
pixel-identical, and every automated gate passes.

Before Gate 3 can be **approved**, the owner should decide E1, E2, E4, E5, E7 and E13, and optionally E3. Gate 3 approval
should also be conditional on (a) a real-device and second-engine pass (Safari iOS, Firefox) and one screen-reader pass,
and (b) the GTM trigger check (E15) before any staging gate. Feedback should go into the token/component layer
(`components/direction-c`, `app/direction-c*.css`), not into the pages. Gate 4 (global rollout) must not start before
Gate 3 is approved.

---

## 11. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Lead Frontend Engineer / UX Architect / QA Lead · Direction C approval & Gate 2.
- **Context read:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md` (UI revamp blocks), `DECISION_LOG.md` (`DEC-029`–`033`),
  Implementation Plan (Gates 2–4), `GATE_1_DESIGN_DIRECTIONS.md`, both mobile-pass reports, the prototype; app: layout, the
  three routes, `components/{homepage,commercial,layout}`, `lib/{analytics,consent,metadata}`, `Logo`, verify scripts.
- **Completed work / files:** §2, §3.2.
- **Decisions approved during session:** `DEC-034` (recorded from the owner's instruction). **Decisions proposed:** §8 owner items.
- **Evidence / tests actually run:** §1, §2, §6, §7 — all commands and scripts listed were run; results are in `gate-2/validation/`
  and `gate-1/mobile-refinement/gate2-phase-a/`.
- **Unresolved issues / risks:** §8. **Assumptions introduced:** ruling-2 interpretation (recorded in `DEC-034`); E1/E2 label and
  pattern choices pending confirmation.
- **Recommended next task:** owner Gate 3 review of the three pages + §8 decisions; then a device/engine/screen-reader pass.
- **Next session should read:** 1. this file; 2. `DEC-034`; 3. `gate-2/screenshots/compare.html`.
- **Stop condition:** stop at Gate 3. No Gate 4 work, no commit to `main`, no staging/production deployment without explicit approval.
