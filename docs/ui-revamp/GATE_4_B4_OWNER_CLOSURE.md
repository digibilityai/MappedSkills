# MappedSkills UI Revamp — Gate 4 · B4 Owner Closure

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-042`** (owner, 2026-10-09): B4 accepted with exceptions; one text-only OBS-13 correction; CauseZones remediation deferred; manual screen-reader verification required before B5 reuse; Safari/WebKit investigation authorised. Local work and local commits only |
| **Status** | **B4 CLOSURE COMPLETE WITH OUTSTANDING PREREQUISITES** (§J). B5 is **not** authorised |
| **Evidence** | [`gate-4/b4/closure/evidence/`](gate-4/b4/closure/evidence/) · independent review: [`gate-4/b4/owner-review/`](gate-4/b4/owner-review/) |

The four states are kept separate throughout:

| Implementation complete | Owner accepted | Exceptions unresolved | B5 authorised |
|---|---|---|---|
| **Yes** (`DEC-041`, `6ab808a`) | **Yes, with exceptions** (`DEC-042`) | **Yes** (§H) | **No** |

---

## A. Repository baseline

| | |
|---|---|
| Repository | `MappedSkills`, branch `ui-revamp` |
| HEAD at start | `6db1603` (B4 docs). B4 application commit `6ab808a` verified; `git diff 6ab808a 6db1603 -- . ':!docs'` empty |
| Working tree at start | `M next-env.d.ts` (pre-existing, not part of any batch; **left unstaged**). Untracked: B0–B4 local screenshot folders (`gate-4/*/evidence/*/screens/`, `gate-2/screenshots/app/`), the independent review folder `gate-4/b4/owner-review/` and its ZIP. Nothing was reset, cleaned or overwritten |
| Decision log | through `DEC-041` at start; `DEC-042` added |
| Builds (scratch copies outside the repo, loopback only, BUILD_ID verified against `_buildManifest.js` before every measurement) | **B4 / pre-fix** `6ab808a`: plain `XpUqFFVnCDZFTS2LANylx` :4170 · fixture `QmgIS46QsjLPQP1gPRcRG` :4180. **Corrected** (`6db1603` + the 4 changed files only): plain `q16w0QwfE4fAxw8sfMObj` :4270 · fixture `1dICU0K06TxOJnuahtMx4` :4280. cPanel build `oMxwG9PyUxMVTRvcSNscs` |

## B. Owner decisions (`DEC-042`, recorded as given)

1. **B4 acceptance** — accepted as a completed implementation batch with documented exceptions; not every inherited defect is resolved; B5 not authorised.
2. **OBS-13** — one separately scoped text-only correction of the seven documented missing-space instances; whitespace only.
3. **CauseZones** — redesign deferred; small SVG text and SVG contrast (3.41:1 grey labels, 4.33:1 orange titles) recorded as known defects for a future authorised batch; no change except a verified OBS-13 whitespace fix.
4. **Screen readers** — manual VoiceOver and TalkBack verification required before B5 reuses the mobile pricing table, the five-check sequence, the `/problems` breadcrumb and the `NotPromised` indicators; not to be claimed unless performed.
5. **Safari / WebKit** — investigate the heading-wrap difference and layout-shift behaviour; a different wrap is not automatically a defect; no typography change without a verified reason and separate approval.

## C. OBS-13 — seven-instance correction

Inventory written **before** editing: [`OBS13_INVENTORY.md`](gate-4/b4/closure/evidence/OBS13_INVENTORY.md). Sources: B3 record (5), B4 record (1),
independent review (1). All seven confirmed as genuine missing-space defects on the pre-fix build (`obs13-before.txt`).

**Root cause (VERIFIED FACT, compiled output):** the JSX compiler emits the text child that follows a closing inline tag without its leading
space when that text spans a source line break and contains an HTML entity — e.g. `jsx("b",{children:"Whether you should want the work."}),"Fit, value, …"`.
An explicit `{' '}` child is preserved. **Correction:** each dropped literal space replaced by `{' '}` — 7 source lines in 4 files, no other byte.

| # | Route | Before → after (rendered) | File |
|---|---|---|---|
| 1 | `/lead-generation` | "the wrong ones— job" → "the wrong ones — job" | `app/(pages)/lead-generation/page.tsx` |
| 2 | `/lead-generation` | "want the work.Fit" → "want the work. Fit" | same |
| 3 | `/lead-generation` | "came from.An enquiry" → "came from. An enquiry" | same |
| 4 | `/lead-generation` | "silently deleted— and" → "silently deleted — and" | same |
| 5 | `/conversion-optimization` | "Below the threshold:research" → "Below the threshold: research" | `app/(pages)/conversion-optimization/page.tsx` |
| 6 | `/problems/traffic-but-no-enquiries` | "proof of delivery.A form" → "proof of delivery. A form" | `app/(pages)/problems/traffic-but-no-enquiries/page.tsx` |
| 7 | `/problems/traffic-but-no-enquiries` | "/conversion-optimizationdraws" → "/conversion-optimization draws" (CauseZones caption; also the figure's accessible name) | `components/routes/CauseZones.tsx` |

**Verification (corrected build vs pre-fix build):**

| Check | Result |
|---|---|
| `obs13-probe.cjs` (live DOM, served no-JS HTML, figure accessible name) | **7/7 CORRECTED** (`obs13-after.txt`); before: 7/7 MISSING SPACE (`obs13-before.txt`) |
| Inventory, all 34 targets, no facet ignored (`run/inventory-diff-vs-before.txt`) | **847 facets identical**; 3 differing facets = exactly the 7 declared text blocks (`text-main` on the 3 routes) |
| Each changed block (`run/text-change-is-whitespace-only.txt`) | **7/7 identical once spaces are removed; exactly +1 space each; 7 spaces in total** |
| Accessible names, 3 routes × 3 engines (`run/accessible-names-*.txt`) | Heading, link, button, form-control and image names **identical**; the only name change is the intended `CauseZones` figure name |
| `<main>` pixels, 68 captures (`run/pixel-main-vs-before.txt`) | **62/68 identical**; the 6 changed = the 3 corrected routes × 390/1440 |
| `<main>` height, 3 routes × 7 widths (`run/main-height-vs-before.txt`) | 20/21 identical. `/conversion-optimization` @320 is 27px **shorter**: "threshold:research," was one unbreakable token; with the space the paragraph wraps in 9 lines instead of 10 (`shots/obs13-conversion-optimization-320-{before,after}.jpg`). Expected consequence of the fix |
| B4 content probe (`run/b4-content-compare.txt`) | 0 differences on the B4 routes. **Note:** it joins text nodes with spaces and cannot see OBS-13 by design; it confirms headings, links, CTAs, tables and figure tokens are unchanged |

**Not in the seven — recorded, not changed:** the probe's scan of 17 static routes finds one further instance of the pattern on
`/how-it-works` ("AI search**occupies**"), a B5 route. OBS-13 therefore stays **OPEN** for that candidate; fixing it needs its own approval.

## D. Deferred CauseZones issues (registered as KD-09, KD-10)

Measured on the corrected build (`figure-svg-text.txt`; method: rendered size = computed font-size × SVG screen scale; contrast = WCAG
relative luminance of the computed `fill`, composited with opacity, against the nearest opaque ancestor background; visible SVGs only).

| Route (figure) | Smallest text 320 / 360 / 390 / 768 / 1440 | Lowest contrast | Items < 4.5:1 |
|---|---|---|---|
| `/problems` (`CauseZones`) | **9.60 / 10.93 / 11.93 / 10.23** / 13.03px | **3.41:1** grey (`--resolve-gap` #8E8798); zone titles **4.33:1** (#D94400) | 14 of 24 (mobile) |
| `/conversion-optimization` (`ChainLossZones`) | 10.47 / 11.93 / 13.02 / 13.67 / 15.10 | 3.41:1 | 9 of 14 |
| `/lead-generation` (`ChainTerminus`) | 10.47 / 11.93 / 13.02 / 13.67 / 15.10 | 3.41:1 | 7 of 11 |
| `/seo` (approved, Gate 3) | 11.52 / 13.12 / 14.32 / 13.68 / 15.10 | **3.13:1** | 6 of 9 |

- **KD-09** (size below the R-3 12px floor) and **KD-10** (contrast below WCAG 2.x AA 4.5:1) are registered in
  `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §10 and `gate-4/qa/known-defects.json`. **Neither is closed.**
- **axe-core reports 0 violations on these routes and still misses both:** it does not evaluate SVG `<text>`. Automated success is not
  evidence that the figure text is accessible.
- **Remediation scope (future, separately authorised):** one figure batch covering **all inherited figures** (`CauseZones`, the B3 chain
  figures, the approved `/seo` figure): figure text ≥ 12px rendered at 320px (R-3), ≥ 4.5:1 for text (the `--resolve-gap` grey replaced by
  a passing token for text, while the dashed "unmeasured" strokes keep their meaning), re-check of KD-05 text-spacing clipping. Group with the
  B3 figure items already deferred (X5/KD-05, OBS-14).
- Screenshots: `owner-review/screenshots/components/{before,after}/problems-causezones-*.jpg`.

## E. Safari / WebKit investigation (`DEC-042` decision 5)

**Method.** (1) Playwright WebKit vs Chromium on the verified B4 build, `/pricing` and `/problems` at 320/360/390/430/768: H1 with the
display face (`final`), with the face request blocked (`fallback`), and with the face **delayed 2.5s** (paints in the fallback, then
swaps), sampled every frame (`webkit-h1-cls.cjs`). WebKit has no Layout Instability API, so the shift is measured from the sampled boxes
and an **approximate** CLS-formula score is computed; Chromium also reports its real `layout-shift` total. (2) **Real Safari 26.2 on
macOS 15.7.3**, opened with `open -a Safari` on a loopback harness that frames the real pages at those widths and measures the H1 with
the final face and with its declared fallback (`safari-h1-harness.cjs`; the harness was first validated to reproduce the Playwright
numbers exactly in both engines). (3) Single-line width of the H1 text under different optical-size settings, in all three.

**Results (VERIFIED FACT):**

| View | Chromium final / fallback | Playwright WebKit final / fallback | **Real Safari 26.2** final / fallback | WebKit swap shift (approx. score) |
|---|---|---|---|---|
| `/pricing` 320 | 3 / 3 | 3 / 3 | 3 / 3 | 0 |
| `/pricing` 360 | 3 / 3 | 3 / 3 | 3 / 3 | 0 |
| `/pricing` 390 | 2 / 2 | **3 / 2** | **3 / 2** | **32px (0.0134)** |
| `/pricing` 430 | 2 / 2 | **3 / 2** | **3 / 2** | **34px (0.0150)** |
| `/pricing` 768 | 2 / 2 | 2 / 2 | 2 / 2 | 0 |
| `/problems` 320 | 4 / 4 | **5 / 4** | **5 / 4** | **32px (0.0146)** |
| `/problems` 360 | 3 / 3 | **4 / 3** | **4 / 3** | **32px (0.0086)** |
| `/problems` 390 | 3 / 3 | 3 / 3 | 3 / 3 | 0 |
| `/problems` 430 | 3 / 3 | 3 / 3 | 3 / 3 | 0 |
| `/problems` 768 | 2 / 2 | **3 / 2** | **3 / 2** | **47px (0.0209)** |

Chromium real `layout-shift` total with the delayed face: **0.0000 in all 10 views** (consistent with B4's 42/42). Reduced motion changes
nothing (the opener has no motion). Real Safari H1 heights confirm the same growth (+31 to +46px).

**Cause (VERIFIED FACT).** In WebKit — real Safari 26.2 and Playwright WebKit alike — the display roles' `font-variation-settings: "opsz" 96`
has no effect while `font-optical-sizing` is `auto` (the default): `/pricing` H1 single-line width 696.7px as set = 696.7px with variations
off ≈ 697.5px at opsz 32, versus **638.8px** in Chromium (opsz 96 honoured). The metric fallbacks (Gate 3 R2) are calibrated to the
opsz-96 width (629px), so in Safari the final face is ~11% wider than its fallback. Injecting `font-optical-sizing: none` gives 638.8px in
WebKit (= Chromium) and, **in real Safari, 10/10 views then match the fallback's and Chromium's line counts**
(`webkit/safari-real-h1-candidate.json`, `opsz-diagnosis.txt`).

**Classification.**

| Question | Answer |
|---|---|
| Expected cross-browser rendering? | **No.** The difference is not rasterisation noise: WebKit renders a different optical size from the one the CSS sets |
| Acceptable reflow? | The Safari wrap itself reads well (B4 review crops). The **change** of wrap at the font swap is the problem |
| Actual layout shift? | **Yes, conditionally.** Only when the display face arrives after first paint (it is preloaded; under B4's throttled profile it completed at 7.5s vs LCP 3.7s in Chromium). Then the H1 grows one line and everything below — **both CTAs on `/pricing`** — moves 31–46px. Approximate scores 0.009–0.021; 4 of 10 B4 views above the programme's 0.01 target. This is a **WORKING HYPOTHESIS** for real iOS networks: no real iPhone was used |
| Usability impact? | A one-off jump of the opener and its CTA pair (`shots`: `webkit-pricing-390-{fallback,final}.jpg`): a mis-tap risk on a slow first visit, not a persistent layout problem |
| B4 regression? | **No — systemic and pre-existing.** The same mechanism re-wraps 8 of 40 WebKit views on the earlier Direction C routes (`other-dc-routes-h1.txt`: `/services`, `/seo`, `/social-media-ads`, `/ai-seo`, `/lead-generation`, `/conversion-optimization`). B4 adds two more affected H1s |

Recorded as **OBS-17** (new). **OBS-11** is not reclassified, but its premise does not hold for these H1s: real Safari and Playwright WebKit
gave identical widths and breaks at 32–47.6px (OBS-11 measured `/google-ads` at 62.4px on desktop). Reconciling the two is open.

**Recommendation (not applied; owner approval required, per the stop condition):** a single shared CSS correction — `font-optical-sizing: none`
on the Direction C display roles (`.dc-display`, `.dc-statement` and any other role that sets `opsz`) — so WebKit honours the designed optical
size; then re-run the fallback sweep and throttled CLS in Chromium (should be unchanged) and confirm on a real iPhone (E1). It changes
rendered typography in Safari on every Direction C route (toward the approved design), so it is a design-system change for the owner, best
decided **before B5** adds more display headings. **Limits:** macOS Safari, not iOS Safari; no CLS API in Safari (the shift is measured from
boxes in Playwright WebKit and from heights in real Safari); the real-world frequency of a late face is not measured.

## F. Screen-reader status

**No VoiceOver or TalkBack test was performed.** This environment has no Android device or emulator (no TalkBack), no iOS Simulator, and
VoiceOver's AppleScript control is not enabled; enabling VoiceOver would change system accessibility settings and take over the owner's
keyboard, which this pass does not do. **Decision 4's prerequisite is therefore OPEN.**

**Supplementary checks performed (labelled as such; NOT screen-reader tests)** — `sr-semantics.txt`: Chromium's own accessibility tree
(CDP) and Playwright ARIA snapshots in WebKit and Firefox, corrected build:

| Experience | What the semantics show | Points a real screen reader must confirm |
|---|---|---|
| Mobile pricing table (390) | Real `table` named by its caption; 3 `columnheader`s, 6 `rowheader`s, 12 `cell`s, same at 390 and 1440 (explicit roles survive stacking); the stacked "Pushes it lower/higher" labels are generated content with empty alt text and do **not** enter the cell names; 0 focusable elements | Header association announced per cell after stacking (VO table navigation, TalkBack); labels not read twice; **column-header names are exposed in uppercase** ("PUSHES IT LOWER") because CSS `text-transform` reaches the computed name — check whether "IT" is spelled out |
| Five-check sequence | `list` of 5 `listitem`s; each: paragraph "Check n" (visible "01" is `aria-hidden`), `heading` level 3, body, "WHAT YOU WILL BE ABLE TO SEE" as plain text, outcome paragraph | Ordinal read once as "Check n"; heading navigation lands on the H3 **without** "Check n" (it is a sibling, not part of the heading); uppercase label pronunciation |
| `/problems` breadcrumb | `navigation "Breadcrumb"` › list › link "Home", text "Problems" (not a link), text "Traffic but no enquiries" (`aria-current="page"` on its span) | "Problems" not announced as a link; current page announced; separators silent |
| `NotPromised` (open squares) | plain `list` of 5 `listitem`s; the 5 marks are `aria-hidden` spans; **0 checkbox roles, 0 inputs** | Not announced as checkboxes or images. Sighted users still see unchecked-box shapes — a visual affordance question for user testing, not an AT defect |

**Manual checklist (for the owner or a tester; corrected or later build on a real device):**

| # | Device / AT | Steps | Pass when |
|---|---|---|---|
| SR-1 | iPhone, iOS Safari, **VoiceOver** (Settings › Accessibility › VoiceOver) | `/pricing`, scroll to "What moves the number". Swipe right through the table; then rotor › **Tables** (if offered) and move by cell | Caption read once; each cell read with its row header ("Scope") and its column header ("Pushes it lower"); the label not read twice; "IT" not spelled out; no "clickable" |
| SR-2 | Android, Chrome, **TalkBack** | Same as SR-1 with swipe navigation; also TalkBack's "Controls/Tables" reading control if present | Same as SR-1 |
| SR-3 | iPhone + VoiceOver; Android + TalkBack | `/problems/traffic-but-no-enquiries`, "Five checks you can run today". Swipe through check 1–2; then rotor/reading control › **Headings** and jump between checks | "Check 1" once, then the heading "Is anything being recorded at all?", heading level 3; "01" never read; the outcome label and text in order; heading jumps reach all five checks |
| SR-4 | Both | Top of `/problems`: swipe through the breadcrumb | "Breadcrumb, navigation"; "Home, link"; "Problems" **without** "link"; "Traffic but no enquiries" with "current page" (or equivalent); "/" not read |
| SR-5 | Both | `/pricing` "Who this is not for": swipe through the five items | Five list items read as sentences; no "checkbox", "unchecked", "image" or "dimmed" |
| SR-6 | macOS Safari + VoiceOver (optional) | Repeat SR-1/SR-3 with VO table and heading commands | As above |

Record for each: device, OS version, browser version, screen-reader version/settings (verbosity), the actual announcements, pass/fail. B5
must not reuse `DataTable` (stacked), `Sequence`, the label-crumb trail or `NotPromised` until SR-1 – SR-5 pass, unless the owner revises
the prerequisite.

## G. Regression results (corrected build; runbook §5)

| Check | Result |
|---|---|
| `npm run typecheck` · `npm run lint` · `npm test` (working tree) | exit 0 · exit 0 · **30/30** |
| `npm run build` (plain + fixture, corrected) · `verify:build` | exit 0 · OK (23 prerendered pages) |
| `build:cpanel` · `verify:build` · `verify:cpanel` (scratch copy) | exit 0 · 0 · 0 |
| `run-all.cjs`, 34 targets, Chromium + WebKit + Firefox, `--expect-dc all` | exit 0; chrome consistency 0 failures; layout 516 findings × 3 engines; a11y 27 / 10 / 10 |
| `classify.cjs` vs the B4 run, 6 runs | **NEW 0 · RESOLVED 0** everywhere (all KNOWN) |
| Served head + JSON-LD (`served-head.cjs`) | **34/34 identical** |
| Analytics and forms vs B4 (`analytics-forms --compare`) | **0 differing sections** (consent, `page_view`, BookingLink, ContactForm) |
| Inventory / content / names / pixels / heights | §C |
| Console errors | none new (layout/a11y include the console check; NEW 0) |

Not run in this pass (no relevant change): throttled CLS, nav-checks, E6 probe, Gate 2/3 legacy suites. **Exceptions:** the declared OBS-13
text differences; the `/conversion-optimization` @320 one-line reflow (§C). **Unexpected differences:** none.

## H. Remaining risks and open items

| Item | State |
|---|---|
| **E1** — real devices and assistive technology | **OPEN.** §F checklist is a B5-reuse prerequisite (`DEC-042`) |
| **OBS-17** — WebKit ignores the display opsz; H1 swap re-wrap | **OPEN, new, systemic.** Owner decision on the candidate correction (§E) |
| **KD-09 / KD-10** — inherited SVG figure text size / contrast | **OPEN, deferred** to one figure batch |
| **OBS-13** — one remaining candidate on `/how-it-works` | **OPEN** (7 approved instances corrected on the branch) |
| OBS-15 (Firefox banner timing), OBS-16 (~1.1 KB shared chunk) | **OPEN**, unchanged, not re-tested; no refactor authorised |
| OBS-11 | Unchanged; premise questioned by OBS-17 evidence (§E) |
| E6, OBS-1, OBS-6, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |
| Production | Unchanged. Nothing pushed, merged or deployed |

## I. B5 readiness

| | |
|---|---|
| **Technical readiness** | The branch is stable: every regression check passes on the corrected build; B4's components work in three engines. Two items **should precede B5** because B5 would multiply them: the manual screen-reader pass (B5 reuses `FindingRows` and adds `Compare`/`DisclosureGroup`) and the OBS-17 decision (B5 adds display headings whose fallbacks are calibrated in Chromium only) |
| **Owner authorisation** | **None.** B5 requires a separate explicit owner instruction after review of this report |

## J. Final recommendation

**B4 closure: COMPLETE WITH OUTSTANDING PREREQUISITES.**

- Complete: decisions recorded (`DEC-042`); OBS-13 seven-instance correction applied and verified; KD-09/KD-10 registered with evidence;
  WebKit investigation completed with real-Safari evidence; regression suite passed with no unexpected difference.
- Outstanding before B5 reuse: manual VoiceOver/TalkBack pass (SR-1 – SR-5). Owner decisions needed: **OBS-17** correction (approve,
  defer or reject); the `/how-it-works` OBS-13 candidate; scheduling of the figure batch (KD-09/KD-10).

## Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · technical lead / QA lead / governance custodian · Gate 4 B4 closure.
- **Context read:** `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md`; `DECISION_LOG.md` (`DEC-041`); `GATE_4_B4_DECISION_PAGES.md`; `owner-review/B4_VISUAL_REVIEW.md` and `B4_OWNER_DECISIONS.md`; `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md`; `known-defects.json`; `QA_REGRESSION_RUNBOOK.md`; `GATE_4_E1A_DEVICE_CHECKPOINT.md` (OBS-11); B3 OBS-13 record.
- **Changed (application):** 4 files, 7 lines, whitespace only (§C). **Changed (docs):** `DEC-042`; `CURRENT_STATE.md`; known-defects register §10 + JSON; runbook §5.9; B4 report pointer; this report; closure evidence; the owner-review package.
- **Tests actually run:** §C, §E, §G. **Not run:** real devices, real screen readers, real iOS Safari, throttled CLS, real GTM.
- **Stop condition honoured:** no B5 work; no typography, layout, design-system, analytics or production change; nothing pushed or deployed.
