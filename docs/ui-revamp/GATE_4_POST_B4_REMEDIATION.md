# MappedSkills UI Revamp — Gate 4 · Post-B4 Remediation (OBS-17 + OBS-13)

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-043`** (owner, 2026-10-09): targeted OBS-17 correction subject to full regression validation; eighth OBS-13 whitespace correction; KD-09/KD-10 deferred to a dedicated pre-production batch; manual screen-reader verification still mandatory before B5 reuse; B5 not authorised. Local work and local commits only |
| **Status** | **Remediation complete and verified — recommendation PASS WITH EXCEPTIONS** (§I). B5 is **not** authorised |
| **Evidence** | [`gate-4/post-b4/evidence/`](gate-4/post-b4/evidence/) (index: its `README.md`) |

---

## A. Baseline and scope

| | |
|---|---|
| Repository | `MappedSkills`, branch `ui-revamp`; no upstream tracking branch (nothing has been pushed) |
| HEAD at start | `3bd76a8` (B4 closure docs, `DEC-042`), parent `98cfc82` (seven OBS-13 corrections). Both verified present; `98cfc82` changes 4 files / 7 lines as recorded |
| Working tree at start | `M next-env.d.ts` (pre-existing `.next/dev` types path; **not staged, not changed**). Untracked: the B0–B4 local screenshot folders, `gate-2/screenshots/app/`, `gate-4/b4/owner-review/` and `MappedSkills_B4_Visual_Review.zip`. None was touched, reset or overwritten |
| Decision log | through `DEC-042` at start; **`DEC-043`** added (no earlier entry modified) |
| Builds (scratch copies outside the repo, `git archive`, loopback only, BUILD_ID verified against `_buildManifest.js` before every measurement) | **Pre-fix** = `3bd76a8`: plain `u9Xf_LhGYubhUoKbjIL4d` :4370 · fixture `FspMzSoKQechV8dM-J7Qh` :4380. **Post-fix** = `3bd76a8` + the 2 changed files only: plain `SfFKbEjryGRbGQeI-Yl5f` :4470 · fixture `LVkLl1C9KcqzzwQtcLVRg` :4480 |
| In scope | (1) OBS-17 CSS correction; (2) OBS-13 eighth instance. Nothing else in application code |
| Out of scope (not done) | B5; diagram (KD-09/KD-10) work; fallback calibration; any size, line-height, letter-spacing, width or breakpoint change; OBS-18 (§E.4); push, merge, deploy |

## B. OBS-17 implementation

**Diagnosis re-verified before editing (VERIFIED FACT).** Exactly two rules in the codebase set an optical size, both in `app/direction-c.css`:
`.dc-display { … font-variation-settings: "opsz" 96 }` and `.dc-statement { … font-variation-settings: "opsz" 72 }`. No other rule, component or inline
style sets `opsz` or `font-optical-sizing`. Their consumers are the 10 Direction C routes (`/`, `/services`, `/seo`, `/google-ads`, `/social-media-ads`,
`/ai-seo`, `/lead-generation`, `/conversion-optimization`, `/pricing`, `/problems/traffic-but-no-enquiries`); the homepage hero H1 inherits the role
through `.dc-hero h1`. `.dc-title` uses the same face but sets no `opsz` and was left untouched (it was not part of the conflict).

**Change (the whole application diff for OBS-17):**

```diff
- .dc-display   { …; text-wrap: balance; font-variation-settings: "opsz" 96; }
+ .dc-display   { …; text-wrap: balance; font-optical-sizing: none; font-variation-settings: "opsz" 96; }
- .dc-statement { …; text-wrap: balance; font-variation-settings: "opsz" 72; }
+ .dc-statement { …; text-wrap: balance; font-optical-sizing: none; font-variation-settings: "opsz" 72; }
```

plus a 5-line comment in the existing Gate 3 R2 fallback comment block naming OBS-17 / `DEC-043`. Verified in the served CSS of the post-fix build.

**Why this is the narrowest robust correction.** WebKit (real Safari 26.2 and Playwright WebKit) ignores the explicit `"opsz"` value while
`font-optical-sizing` is `auto`; setting it to `none` on the two rules that declare an explicit optical size makes every engine honour the value
the design already specifies. It is standard CSS, not a Safari-only override; it changes nothing in engines that already honoured the value
(Chromium, Firefox — verified §C). Family, weight, `opsz` values, sizes, line heights, letter spacing, widths, breakpoints and the fallback
calibration are unchanged. Scoped to the two roles, not to `.dc` or `:root`, so body, title and legacy text keep automatic optical sizing.

## C. Safari and cross-browser evidence

### C.1 Real Safari 26.2 (macOS 15.7.3) — every Direction C route × 7 widths

`safari-roles-harness.cjs` (extends the B4 closure harness): each route framed at 320/360/390/430/768/1024/1440, display face loaded ("final")
vs the face withheld so each role resolves to its declared calibrated fallback; CSS **as built** (no injection). UA
`Version/26.2 Safari/605.1.15` on both builds. Every frame's layout width equals its target (`clientWidth` recorded per measurement).

| Measure (70 views) | Pre-fix | **Post-fix** |
|---|---|---|
| H1 final ≠ fallback line count (re-wraps at the font swap) | **16** | **0** |
| All display-role elements re-wrapping (H1 + statements, incl. below the fold) | 23 | 7 |
| Final H1 line count = Chromium's | 54 / 70 | **70 / 70** |
| Final H1 line count = Firefox's | 54 / 70 | **70 / 70** |
| Final H1 line count = Playwright WebKit's | 70 / 70 | 70 / 70 |
| Page overflow / clipped display text | 0 / 0 | **0 / 0** |
| `/pricing` H1 single-line width | 696.7 px | **638.8 px** (= Chromium) |

Pre-fix re-wraps (all removed): `/services` 360; `/seo` 360, 390; `/google-ads` 1024; `/social-media-ads` 390; `/ai-seo` 320; `/lead-generation` 360, 768;
`/conversion-optimization` 430, 1024, 1440; `/pricing` 390, 430; `/problems` 320, 360, 768 (`safari/safari-real-summary.txt`). This includes every
B4 view the closure reported, plus the affected views at 1024/1440, which the closure did not test.

**The 7 residual statement re-wraps are not OBS-17.** They are the same 7 elements, at the same views, in real Safari, Playwright WebKit,
Chromium and Firefox after the fix (and in Chromium and Firefox before it): below-the-fold `.dc-statement` lines whose Chromium-calibrated
fallback wraps differently (`/` 320, `/services` 1440, `/google-ads` 320 and 1024, `/pricing` 390 and 1024, `/problems` 320). Chromium's real
`layout-shift` total on those views is 0 (they are off screen at the swap). Pre-existing calibration state, unchanged; Safari now simply matches it.

**Harness correction made during this pass (disclosed).** The first real-Safari run measured frames 15 px narrow (classic macOS scrollbars:
`clientWidth` 375 at 390) and shrank the 1440 frame to 1268. That run is kept as `safari/scrollbar15-safari-real-summary.txt` (a valid like-for-like
pre/post pair at those widths: 22 → 6 re-wraps) but is **not** used for the result above. The harness now hides the frame's scrollbar (layout only,
like an iPhone's overlay scrollbar), sets frames `flex: none`, and verifies `clientWidth`; both builds were re-measured. No Safari or system setting changed.

### C.2 Playwright engines — swap behaviour (10 routes × 7 widths × 3 engines, both builds)

`obs17-swap.cjs`: final / fallback / **delayed** (face held 2.5 s, so it paints in the fallback and then swaps; sampled every frame). WebKit and
Firefox have no Layout Instability API, so their score is the closure's box-based CLS approximation; Chromium also reports its real `layout-shift`
total. Threshold: throttled CLS ≤ 0.01, target ≤ 0.001, no font reflow above the fold (`GATE_4_QA_ACCEPTANCE_MATRIX.md`).

| Engine | H1 final ≠ fallback | Delayed swap: views moving | Max shift | Max visible CTA move | Views > 0.01 | Max score |
|---|---|---|---|---|---|---|
| **WebKit pre** | 16 | 18 | 61 px | 61 px | **8** | 0.0209 |
| **WebKit post** | **0** | 3 (1 px each) | **1 px** | **0 px** | **0** | **0** |
| Chromium pre / post | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | API max **0.0013** / **0.0013** (identical) |
| Firefox pre / post | 0 / 0 | 27 / 27 | 107 / 107 px | 157 / 157 px | 19 / 19 | 0.0409 / 0.0409 — **OBS-18**, §E.4 |

- WebKit's three residual 1 px moves are sub-pixel rounding at 1440/768 (no line change, score 0). Pre-fix WebKit views include all 5 B4 views
  the closure measured, reproduced exactly (e.g. `/pricing` 390: 32 px, 0.0134).
- `/problems` 320: the first CTA (below the fold) moves −30 px at the swap in Chromium pre/post and WebKit post, caused by one residual statement
  re-wrap above it; off screen, `layout-shift` 0.
- Reduced motion: the openers have no motion; the reduced-motion route checks are unchanged (§E.1).

### C.3 Rendering identity and visual hierarchy

| Engine | Final render, pre vs post (H1 box + every display role: lines, width, height) | Fallback render | First-screen captures (byte-identical JPEG) |
|---|---|---|---|
| Chromium | **70 / 70 identical** | 70 / 70 | final 70/70 · fallback 70/70 |
| Firefox | **70 / 70 identical** | 70 / 70 | fallback 70/70 · final 69/70 — the one difference (`/` 1024) is the homepage widget's time-dependent label ("WHAT WE REPORT" vs "WHAT AN AGENCY USUALLY SHOWS YOU"); **3/3 fresh recaptures: pre = post, byte-identical** |
| WebKit | 54 / 70 identical; the 16 changed = the 16 removed re-wraps (one line fewer, same width) | 70 / 70 | fallback 70/70 · final 1/70 — **declared**: the display letterforms now render at the designed optical size on every DC route (the unchanged view is `/` 1440: its H1 is 102.4 px, so automatic optical sizing already clamped to the axis maximum, 96) |

Visual hierarchy (`shots/`): in WebKit the openers now match Chromium's approved rendering — same size, weight and colour, the tighter opsz-96
letterforms, the same line breaks (e.g. `/pricing` 390: 3 → 2 lines, CTAs 32 px higher). No size, weight or ordering change; no overflow (0/70 in every
engine and in real Safari) and no clipped display text.

### C.4 Test limitations

- **Real Safari:** macOS Safari 26.2 only, measuring rendered line breaks (the cause), not a CLS score (Safari has no Layout Instability API).
  **No iOS Safari, no real iPhone or iPad** — closure for iOS rests on WebKit being the same engine; confirmation stays with E1.
- Playwright WebKit and Firefox are engine builds, not browser releases. **No real Firefox** is installed in this environment.
- Font-swap timing is simulated (2.5 s hold). The real-world frequency of a late display face is not measured.

## D. OBS-13 — eighth correction

| | |
|---|---|
| Source | `app/(pages)/how-it-works/page.tsx:371` |
| Baseline (pre-fix build, verified) | live DOM in Chromium, WebKit and Firefox: "AI search**occupies** five subordinate roles"; served HTML `AI search</strong>occupies` |
| Intended reading | "AI search occupies five subordinate roles" (the source already had a literal space; the paragraph spans a line break and contains `&mdash;`, the documented root cause) |
| Change | `</strong> occupies` → `</strong>{' '}occupies` — the established explicit-space convention (runbook §5.9). No other byte |

**Verification (`obs13-eighth.txt`, pre vs post builds):** served HTML `</strong> <!-- -->occupies` (space present); live DOM **FIXED in Chromium,
WebKit and Firefox**; `innerText` "AI search occupies…" in all three; `<main>` text after = before **plus exactly one space** at that junction (live DOM
×3 engines and served HTML); links, headings, buttons and `data-*` identical; `<head>` (title, meta, canonical, links) and JSON-LD identical once
content-hashed asset names are normalised. The ARIA snapshot lists the `<strong>` and the following text as separate trimmed nodes, so it cannot
show the space either way. Inventory: 849 facets identical; the one difference is this text block. `<main>` pixels: `/how-it-works` 390 and 1440
changed (2,068 / 9,522 px) — the inserted space. **Wrapping consequences: none** — the paragraph's line count and `<main>` height are identical
at all 7 widths in Chromium, WebKit and Firefox (`obs13-eighth-wrapping.txt`).

**The seven earlier corrections still hold** (`obs13-seven-and-scan-after.txt`: 7/7 CORRECTED). **The candidate scan now finds no instance** on the
17 static routes it covers. No further text defect was found, and nothing beyond the one approved space was changed.

## E. Regression results

### E.1 Executed checks (post-fix build unless stated)

| Check | Result |
|---|---|
| `npm run typecheck` · `npm run lint` · `npm test` (working tree) | exit 0 · exit 0 · **30/30** |
| `npm run build`, plain + fixture, pre and post | exit 0 ×4 |
| `build:cpanel` · `verify:build` · `verify:cpanel` (scratch copy of the working tree) | exit 0 · OK (23 prerendered pages) · OK (§E.3) |
| `run-all.cjs`, 34 targets, Chromium + WebKit + Firefox, `--expect-dc all` | exit 0; chrome consistency 0 failures; layout 516 findings × 3 engines; a11y 27 / 10 / 10 (same counts as the B4 closure) |
| `classify.cjs` vs the B4 closure run, 6 runs | **NEW 0 · RESOLVED 0** everywhere |
| Served head + JSON-LD, pre vs post (`served-head.cjs`, plain + fixture) | **34/34 identical** |
| Analytics and forms, pre vs post (`analytics-forms --compare`) | **0 differing sections** (consent, banner buttons, `page_view`, BookingLink, ContactForm) |
| Inventory, pre vs post, no facet ignored | 849 identical; 1 difference = the declared OBS-13 text |
| `<main>` pixels, two builds, Chromium (`pixel-main.cjs`) | **66/68 identical**; changed = `/how-it-works` 390/1440 (declared). Also 66/68 vs the recorded B4-closure hashes |
| WebKit / Firefox visual parity | §C.3 (`pixel-main.cjs` is Chromium-only, see note) |
| Route a11y / motion (`route-a11y-motion.cjs`: Tab walk 390/1440/200 %, reduced motion, no-JS, print, 320 px), `/`, `/seo`, `/pricing`, `/problems`, `/how-it-works`, Chromium + WebKit, pre vs post | identical results; the same **5 pre-existing FAILs** both builds (below) |
| Console errors | none new (layout/a11y include the console check; NEW 0) |
| Throttled CLS, Chromium, `/pricing` + `/problems`, 7 widths × 3 runs (`cls-routes.cjs`) | **0.000 in 42/42** (§E.3) |

**Route-check FAILs (identical before and after; pre-existing):** R1 text < 12 px at 320 on `/` (11.84 px span) and `/seo` (11.52 px `dt`) — approved
Gate 3 routes, the R-3 rule is not retroactive; R1 SVG `<text>` 11 px on `/problems` and `/how-it-works` (KD-09 family); M2 on `/` (homepage
pre-state text). The only output difference between builds was the set of focus-outline colours the walk sampled (a 3 px outline caught mid-transition
at 50 % alpha); a re-run flipped which build showed it, so it is sampling timing. `bad` stops: 0 in every walk.

**Tooling note (disclosed).** `pixel-main.cjs` accepts `--engine` but always launches Chromium (`qa/pixel-main.cjs:80`). Runs requested as WebKit and
Firefox were therefore Chromium repeats; they were discarded and are not reported. WebKit/Firefox visual parity is evidenced by §C.3 instead.

### E.2 Declared and undeclared differences

| Difference | Declared? |
|---|---|
| WebKit/Safari display-role glyph rendering on all 10 DC routes (designed optical size now applied); 16 H1s one line shorter in their final state; their CTAs and following content 31–61 px higher | **Declared** (OBS-17 correction) |
| `/how-it-works` text: one inserted space; `<main>` pixels at 390/1440 | **Declared** (OBS-13) |
| Content-hashed CSS/JS asset filenames in `<head>` | Expected consequence of the CSS change |
| Firefox `/` 1024 first-screen capture | **Undeclared, explained, not reproducible** (widget state timing; §C.3) |
| Route-walk outline colour sample | **Undeclared, explained, timing** (§E.1) |

### E.3 Throttled CLS and cPanel build

| Check | Result |
|---|---|
| Throttled CLS, Chromium (`cls-routes.cjs`, the established profile), `/pricing` + `/problems`, 7 widths × 3 runs, run alone | **0.000 in 42/42**; LCP 3.67–3.82 s; display face completes at 7.5–7.7 s, i.e. after LCP (the late-face condition is real under this profile) — `run/cls-throttled-post.txt` |
| `build:cpanel` · `verify:build` · `verify:cpanel` (scratch copy; `app/` identical to the working tree) | exit 0 (`E68iTLTppybHtm5gw3WUn`) · OK, 23 prerendered pages · OK; the built CSS carries the correction — `run/cpanel-build.txt` |
| `verify:build` on the post-fix plain build | OK |

Chromium's throttled CLS cannot show the OBS-17 improvement (Chromium never had the defect); WebKit's equivalent is §C.2.

### E.4 New observation — OBS-18 (Firefox fallback during the swap)

The delayed-face sweep ran Firefox for the first time (the closure measured WebKit and Chromium only). In **Playwright Firefox**, while the display
face is still loading, the display roles paint in **Arial Narrow**: the calibrated `local()` fallback faces stay `unloaded`, so the stack skips them
(`firefox-swap-probe.txt`: rendered single-line width = Arial Narrow's exactly, on `/pricing`, `/` and `/problems`; Chromium and WebKit paint the calibrated
fallback). When the face is blocked for good, Firefox does use the calibrated fallback (final = fallback in 70/70). Effect: 27/70 views move at a
late swap, 19 above an approximate 0.01, max ≈ 0.041; first CTA up to 157 px. **Identical before and after `DEC-043`** — not caused by this change and
not addressed by it. Not verified in a real Firefox release (**RESEARCH REQUIRED**). A fix would change the fallback strategy, which `DEC-043`
does not authorise: **owner decision**.

## F. Deferred issues

| Item | State |
|---|---|
| **KD-09 / KD-10** (inherited SVG figure text < 12 px; < 4.5:1 contrast; shared diagram text styling across `/problems`, `/conversion-optimization`, `/lead-generation`, `/seo`) | **OPEN, deferred** (`DEC-043` decision 3) to a dedicated remediation batch **before production approval**. No diagram was changed. Zero axe violations do **not** cover them (axe does not evaluate SVG `<text>`); the route check above still reports the 11 px SVG text |
| **E1 / screen readers** | **OPEN.** No VoiceOver or TalkBack test was performed in this pass (no iOS/Android device or simulator, VoiceOver control not enabled; enabling it would change system accessibility settings). SR-1 – SR-5 (`GATE_4_B4_OWNER_CLOSURE.md` §F) are unchanged and remain **mandatory before B5 reuses** the stacked `DataTable`, `Sequence`, the `/problems` breadcrumb and `NotPromised` |
| **OBS-18 (new)** | **OPEN, pre-existing, not fixed** (§E.4) |
| OBS-11 | Unchanged as a record; further evidence: real Safari and Playwright WebKit agree on all 70 H1 line counts at 320–1440, both before and after |
| OBS-15, OBS-16, E6, OBS-1, OBS-6, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged, not re-tested beyond the suite |

## G. Known-defects status

| ID | Evidence-based status | Recommendation |
|---|---|---|
| **OBS-17** | **Corrected on the branch and verified.** Real Safari 26.2: H1 swap re-wraps 16 → 0 / 70, final H1 lines = Chromium 70/70; Playwright WebKit: views above 0.01 8 → 0, max shift 61 → 1 px; Chromium and Firefox unchanged; no overflow or clipping | **Close** (owner to confirm), with the caveat that iOS Safari was not tested (E1) |
| **OBS-13** | All **8** approved instances corrected and verified; the scan finds **0** remaining candidates on 17 static routes | **Close** (owner to confirm). CMS-driven pages (blog, portfolio) are outside the scan |
| KD-09, KD-10 | Open, deferred (`DEC-043`) | Keep open |
| OBS-18 | New, open | Owner decision |

Registers updated: `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §11; `gate-4/qa/known-defects.json`. Neither OBS-17 nor OBS-13 is marked closed there:
both are recorded as **corrected on the branch, closure recommended**, pending the owner.

## H. B5 readiness

| | |
|---|---|
| **Technical readiness** | Improved: the OBS-17 prerequisite named in the B4 closure is addressed before B5 adds display headings, and OBS-13 is clear on the scanned routes. Remaining technical prerequisites: the **manual VoiceOver/TalkBack pass (SR-1 – SR-5)** before reuse of the four components; the KD-09/KD-10 figure batch before production (not a B5 blocker unless B5 adds figures); OBS-18 (owner decision) |
| **Owner authorisation** | **None.** B5 requires a separate explicit owner instruction |

## I. Final recommendation

**PASS WITH EXCEPTIONS** for this remediation gate.

- **Pass:** both authorised corrections are implemented within scope, verified in real Safari and three engines, with no regression in the
  regression suite (NEW 0 × 6), served head (34/34), analytics (0 diffs), content (one declared space) or Chromium/Firefox rendering.
- **Exceptions (none caused by this change):** iOS Safari and real devices not tested (E1); screen-reader prerequisite outstanding; KD-09/KD-10
  deferred; OBS-18 newly recorded in Playwright Firefox.

## Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · senior frontend / cross-browser typography / accessibility QA / governance · post-B4 remediation gate.
- **Context read:** `CLAUDE.md`; `CURRENT_STATE.md`; `DECISION_LOG.md` (`DEC-040` – `DEC-042`); `GATE_4_B4_OWNER_CLOSURE.md`; B4 closure evidence README,
  `opsz-diagnosis.txt`, `other-dc-routes-h1.txt`, both harness scripts; `QA_REGRESSION_RUNBOOK.md`; `GATE_4_B0_KNOWN_DEFECTS.md` §10; `known-defects.json`;
  `GATE_4_QA_ACCEPTANCE_MATRIX.md` (CLS threshold); `components/direction-c/fonts.ts`; `app/direction-c.css`.
- **Changed (application, 2 files):** `app/direction-c.css` (2 properties + comment); `app/(pages)/how-it-works/page.tsx` (1 space).
- **Commits (local only):** application `0e8df27`; governance and evidence in the docs commit that follows it. `next-env.d.ts` not staged.
- **Changed (docs):** `DEC-043`; `CURRENT_STATE.md`; known-defects register §11 + JSON; runbook §5.10; this report; `gate-4/post-b4/evidence/`.
- **Tests actually run:** §C, §D, §E. **Not run:** iOS Safari, real devices, real Firefox, screen readers, nav-checks, E6 probe, Gate 2/3 legacy suites
  (no chrome, consent, navigation or legacy-route change).
- **Stop condition honoured:** no B5 work; no diagram, layout, calibration, motion, analytics or production change; nothing pushed, merged or deployed.
