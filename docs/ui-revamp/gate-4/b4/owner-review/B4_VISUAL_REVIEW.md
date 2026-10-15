# Gate 4 · B4 — Independent Visual Review

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Scope** | `/problems/traffic-but-no-enquiries` and `/pricing` only. Audit only: no application code, QA tooling, governance record or commit was changed |
| **Reviewer role** | Senior UI/UX, motion, frontend and independent visual QA (Claude, Opus 5.5) |
| **Repository state** | Branch `ui-revamp`, HEAD `6db1603` (docs). B4 application commit `6ab808a`. `git diff 6ab808a 6db1603 -- . ':!docs'` is empty. Working tree: `next-env.d.ts` modified (pre-existing, not part of B4, excluded) plus untracked evidence screenshots from B0–B4 runs |
| **Builds compared** | **Before** `079e3cf` (B3 end state) → BUILD_ID `VfdUumQLJDbiY1KTjsX85`, 127.0.0.1:4150 · **After** `6ab808a` → BUILD_ID `XpUqFFVnCDZFTS2LANylx`, 127.0.0.1:4170. Both built fresh for this review from `git archive` (no previously running server was reused; none were listening) |
| **Verdict** | **B4 ACCEPT WITH EXCEPTIONS** (§9). No blocker found. Not an approval: the owner decides (`B4_OWNER_DECISIONS.md`) |

Companion files: [`visual-review.html`](visual-review.html) (before/after page) · [`B4_OWNER_DECISIONS.md`](B4_OWNER_DECISIONS.md) ·
[`B4_SCREENSHOT_MANIFEST.md`](B4_SCREENSHOT_MANIFEST.md). Evidence labels follow `CLAUDE.md`.

---

## 1. What was checked, and how

| Step | Result |
|---|---|
| Governance read | `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md` (Gate 4 blocks), `DEC-041`, `GATE_4_B4_DECISION_PAGES.md`, `known-defects.json`, the B4 evidence tree |
| Existing evidence (76 images, `../evidence/visual/`) | **VERIFIED FACT:** re-captured with the committed `b4-visual-captures.cjs` against the two fresh builds → **76/76 byte-identical**. The original set is authentic to `079e3cf`/`6ab808a` and was reused, not copied |
| Was the original set sufficient? | **Partly.** It has 390/768/1440 first screens and three matched sections, plus *after-only* 320/360 full pages. Missing for an independent review: **any 1024px capture**, **any 320px "before"**, before/after **full pages**, component-level crops, other engines, motion frames. These gaps were filled (94 new images) |
| New captures | Chromium full page before/after at 1440/1024/768/390/320 (20); 1024 and 320 first screens (8); component crops (CauseZones ×5 widths, DataTable ×5 widths, crumb, OBS-13) (30); WebKit and Firefox 390 full page + 1440 first screen + targeted crops (24); H1 crops ×3 engines (12); motion states (4) |
| Measurements | Per route/build/width: document height, horizontal scroll, H1 size and line count, CTA positions, minimum HTML text size, visible SVG text size and **fill contrast**, sampled text size/weight/contrast for every B4 component; motion state at load / during reveal / settled / reduced-motion / no-JS in 3 engines; independent axe-core run (3 engines × 320/390/1440 × both builds) |

Capture conditions were identical within each pair (same engine, viewport, mobile emulation, consent "denied", reduced motion, fonts awaited,
all non-local requests blocked). **This is an engine proxy. No real device and no screen reader was used.**

---

## 2. Summary of findings

| # | Finding | Route | Class |
|---|---|---|---|
| F1 | `CauseZones` SVG text below 12px at 320–390 (9.6–11.93px) and at 768 (10.23px) — owner question A | /problems | **PRE-EXISTING** (inherited, KD-05/X5 family) |
| F2 | **New:** `CauseZones` SVG text contrast is **3.41:1** (grey description lines) and **4.33:1** (tangerine zone titles) at *every* width, both builds. axe does not test SVG text, so no automated record exists | /problems | **PRE-EXISTING** — not previously recorded |
| F3 | **New instance of OBS-13:** the `CauseZones` caption renders "The same object **/conversion-optimizationdraws** at a shallower depth" (missing space; raw URL path as prose) at every width, and in the figure's accessible name | /problems | **PRE-EXISTING** (7th OBS-13 instance) |
| F4 | OBS-13 "proof of delivery.A form" — unchanged from record | /problems | **PRE-EXISTING** |
| F5 | DataTable header and stacked labels at 12.48px — owner question B | /pricing | **ACCEPTABLE** |
| F6 | `/pricing` opener has no side column; at ≥1024 the right ~45% of the first screen is empty, left-heavier than `/ai-seo` and `/problems` | /pricing | **ACCEPTABLE** (no approved copy exists to fill it) |
| F7 | FindingRows meaning column is 4–5px right of the section's statement column (1024: 447 vs 443px; 1440: 634 vs 629px) | /problems | **IMPROVEMENT** (minor) |
| F8 | Stacked DataTable (<600px): the "Pushes it higher" label sits close under the previous cell's text; each row reads dense | /pricing | **IMPROVEMENT** (minor) |
| F9 | NotPromised open-square marks on "Who this is not for" resemble unchecked checkboxes | /pricing | **UNVERIFIED** (system glyph from B2/B3; needs user observation) |
| F10 | WebKit sets the `/pricing` H1 on 3 lines at 390 and 430 (Chromium/Firefox: 2) and `/problems` on 4 lines at 360 (others: 3). Both wraps look correct; the 92%/90.5% fallback CLS calibration was Chromium-only | both | **UNVERIFIED** (OBS-11 / R-5 family; E1) |
| F11 | `/problems` has no CTA until ~87% of page depth on mobile (first CTA at 9,792 of 11,214px @390) and the end action pair is the quiet inline pair, not the tangerine close | /problems | **ACCEPTABLE** (approved composition; before: 8,716 of 10,116px = 86%) |
| F12 | Close eyebrow on `/pricing` reads "Get an actual number" while the hero CTA was renamed "Get a scoped estimate" (PAGE-033) | /pricing | **PRE-EXISTING** (copy; out of B4 scope) |
| F13 | Crumb wraps at 320px with a leading "/" on the second line | /problems | **PRE-EXISTING** (identical in before build) |
| F14 | Motion behaves as specified (§6). Report wording "retains the existing closing-section reveal" is slightly loose: the *before* `/pricing` had **no** motion target; B4 applies the existing shared `Close` reveal to `/pricing` for the first time | /pricing | **ACCEPTABLE** (wording note only) |
| F15 | OBS-16 (~1.1 KB `ScopeDisclosure` chunk) — owner question D | both | **ACCEPTABLE** for B5 (§8 D) |
| F16 | OBS-15 (Firefox banner timing) — owner question E | non-B4 routes | **UNVERIFIED** (preserved, not re-tested) |
| F17 | Real AT verification (VoiceOver/TalkBack/NVDA) — owner question F | both | **UNVERIFIED** (E1 open) |

**No BLOCKER.** Nothing B4 introduced breaks content, layout, accessibility automation, motion safety or commercial honesty.

---

## 3. Typography

**VERIFIED FACT (measured, Chromium; WebKit and Firefox within ±2px document height except F10):**

| | `/problems` before → after | `/pricing` before → after |
|---|---|---|
| H1 @1440 / 1024 / 768 / 390 / 320 | 62.4 / 47.1 / 35.3 / 32 / 32px → 62.4 / 57.5 / 47.6 / 32.8 / 32px | same scale |
| H1 lines @1440 / 1024 / 390 / 320 | 3 / 2 / 3 / 5 → 3 / 4 / 3 / 4 | 2 / 2 / 3 / 3 → 2 / 3 / 2 / 3 |
| Body / lede | lede 20.8px ink (1440), 17.6px (390); body 17px | same |
| Minimum HTML text | 12.8px → **12.48px** (Direction C label role) | 12.8 → 12.48px |
| Lowest HTML text contrast sampled | crumb label "Problems" **4.90:1** (was 3.13:1, KD-03 — resolved) | table caption / headers / cells / NotPromised items **6.38:1** |

- **Hierarchy is clearer after.** The before pages set statement H2s and body in nearly the same weight scale; after, every section follows
  label → statement → body, the same rhythm as B2/B3. Heading levels are unchanged (H1 → 6 × H2 → 9 × H3 on `/problems`; H1 → 7 × H2 on `/pricing`).
- **Large statements dominate at 1440.** Single-line statements ("This is the part a quote will not tell you.", "No tool, no sign-up, no
  download, no email.", "The usual response is to change the website.") run ~1,030–1,200px wide at 62.4px. This is the Direction C statement
  style used on B2/B3 and reads deliberate, not accidental. ACCEPTABLE.
- **Muted text is used for actionable content in two places.** FindingRows meanings (`dd`) and DataTable cells are `--dc-dim` (6.38–6.95:1,
  well above AA) while their terms are ink. The *condition* outranks the *instruction*. It is a system choice shared with B3's `ScopeRows`; it
  passes contrast. Noted, not raised as a defect.
- **Line wrapping:** no widows that break meaning; the `/pricing` lede wraps "will." alone at 1440 in both builds (pre-existing copy length).
  The `/problems` H1 at 1024 goes from 2 to 4 lines because the Direction C H1 measure is narrower; it still reads as one block above the fold.

---

## 4. Layout and responsive composition

- **Grid:** both pages sit on the Direction C 12-column grid (container left 96px @1440, 41px @1024, 16px @390/320) and match the B3
  references at the same widths. **F7** is the only measurable misalignment: FindingRows uses its own 5fr/7fr grid, so the meaning column
  lands 4–5px right of the section statement above it. Visible only on close inspection at ≥900px.
- **Section rhythm:** pages are longer (document height `/problems` 7,634 → 9,204px @1440, 10,116 → 11,214 @390; `/pricing` 5,556 → 7,282
  @1440, 7,118 → 8,525 @390). The growth is section padding and statement size, consistent with B2/B3; there is no empty block, duplicated
  content or collapsed spacing.
- **No horizontal scroll** at any captured width in any engine (`scrollWidth = clientWidth` everywhere).
- **320px:** both pages hold. `/pricing`'s CTA pair stacks full-width and both buttons are inside the first screen (bottom 490px of 568).
  The `/problems` crumb wraps (F13, pre-existing).
- **F6 — `/pricing` opener at ≥1024:** with no side note (the approved hero copy that would sit there is blocked with §3), the first screen is
  left-weighted with a large empty right half. It is honest — nothing invented to fill it — and comparable to the B2 openers without a side
  column. ACCEPTABLE; a future approved side line would balance it.
- **`CauseZones` at 1440** is capped at 900px and its SVG content sits ~12px inside the content edge (internal viewBox padding) — inherited.

## 5. Components

| Component | Assessment |
|---|---|
| **Crumb** (`/problems`) | Correct: "Problems" is a non-link label (no hub exists), contrast now 4.90:1 (KD-03 instance resolved); the label keeps a 44px row height (`.dc-crumb-txt`). Wrap at 320 pre-existing (F13) |
| **Page openers** | `/problems`: H1 + lede + side reassurance, no CTA — matches the approved "diagnostic register" and the `/conversion-optimization` reference. `/pricing`: H1 + lede + CTA pair, CTAs above the fold at every width (F6 for composition) |
| **Causes** (`.dc-causes`) | Four equal peers on 3px ink rules, 2×2 from 900px. Successfully communicates "not an order of likelihood". Good |
| **CauseZones** (inherited) | The weakest element on either page: small, low-contrast SVG text (F1, F2), legacy Resolve styling (tangerine-deep titles, grey annotations) and the caption defect (F3). Its content is duplicated in the HTML peers directly below, so no information is lost |
| **Sequence** | Strongest new component. Spine + ordinal + heading + body + "What you will be able to see" outcome on paper is clear at every width, including 320. Ordinals 13.12px (meets R-3 preference). The spine breaks cleanly at each row |
| **FindingRows** | Clear term/meaning pairing; equal rows support "none of them is smaller". F7 alignment nit |
| **DataTable** (`/pricing`) | **Clear improvement.** Before: a scroll region clipping the third column at ≤600px (KD-04, axe `scrollable-region-focusable`). After: stacks with row headers kept, both direction labels shown, caption visible, 0 axe violations in 3 engines. F8 density nit |
| **NotPromised** ("not for") | Readable stated list, generous line length. F9: the open squares read as checkboxes at a glance |
| **CTAs** | `/pricing`: hero pair + tangerine close pair, all 52px tall on mobile. `/problems`: one inline pair at the end (F11). Labels, destinations unchanged (record-verified; matches what renders) |

## 6. Visual quality, brand fit, credibility

- **Consistency:** both routes now read as the same site as `/seo`, `/ai-seo` and `/conversion-optimization` — same opener, label rail,
  statement scale, paper/ground alternation, ink rules, tangerine reserved for the close and primary buttons. Before, they were visibly the
  previous system. This is the main gain of B4.
- **Sophistication / distinctiveness:** restrained and typographic; the Sequence and the stacked table are well-made. The inherited
  `CauseZones` drawing is the one element that looks older and busier than its surroundings.
- **Credibility of `/pricing`:** **VERIFIED FACT** — no price, band, tier, plan card, empty pricing slot or "from" figure appears at any width
  in any engine. The page's limits ("Five reasons to not buy this.", "We do not promise rankings…", "There is no calculator…") are given equal
  or greater visual weight than before. The design does not make the offer look more inclusive. This meets the `DEC-041` commercial condition.

## 7. Conversion

- `/pricing`: primary CTA visible on the first screen at all five widths (bottom at 524/543/418/434/490px vs viewport 900/900/1024/844/568).
  Reading order is unchanged; the tangerine close is a strong, unambiguous end point.
- `/problems`: deliberately low-pressure — the opener promises the reader can do this "without talking to anyone". CTA depth is essentially
  unchanged from before (F11). The global header "Contact Us" remains visible at the top of every width. Treat any mid-page CTA as a
  copy/strategy decision, not a B4 defect.
- Trust signals: none added or removed (none existed in the approved copy beyond the accountability and "not for" statements).

## 8. Motion (verified, not taken from the report)

**VERIFIED FACT (Chromium, WebKit, Firefox @390; both builds; motion allowed / reduced / JS off):**

| | `/problems` | `/pricing` before | `/pricing` after |
|---|---|---|---|
| `[data-dc-motion]` targets | 0 (before and after) | **0** | 1 (the close) |
| What moves | nothing | nothing | the five decorative marks above the close label: opacity 0→1 and `translateY(-22px)`→0, staggered 0–360ms |
| Pre-state at load | none | — | applied only because the close is below the fold |
| Text ever hidden / translucent | **0** at load, mid-reveal and settled | 0 | **0** (mid-reveal frame: marks at opacity 0, all text at 1) |
| Timing (WebKit/Firefox samples) | — | — | opacity 0 at 0ms → ~0.8 at 150ms → ~1.0 at 300ms → settled by 500ms |
| Reduced motion | composed | — | composed at load, no pre-state, 0 running animations |
| JavaScript off | composed | — | composed (server-rendered final state) |
| Layout shift during scroll (session CLS) | 0 | 0 | 0 |

Motion is decorative, short, transform/opacity only, never gates content and respects reduced motion and no-JS. ACCEPTABLE. Print: the B4
record's OBS-9 (marks at opacity 0 at `beforeprint` in Chromium/WebKit) was not re-tested here.

**Future motion opportunities (not regressions, not recommended for B5 unless separately approved):** a one-time spine draw-on for the
Sequence as each step enters (reduced-motion guarded); emphasising the dashed "unmeasured" segment once a redrawn CauseZones exists. Both
would need the S3/S2 signature decision and a motion budget check.

---

## 9. Final assessment

**Recommendation: B4 ACCEPT WITH EXCEPTIONS.**

Why accept: every B4-introduced change renders correctly in three engines at five widths; hierarchy and consistency with Direction C are
clearly better than before; two accessibility defects are resolved on these routes (KD-04 table, KD-03 crumb) and independent axe runs show
0 violations after in every view vs 1 serious violation in 15 of 18 before views (KD-03 on `/problems`, KD-04 on `/pricing` ≤390); motion is safe; `/pricing` stays commercially honest. No BLOCKER was found.

Why "with exceptions": the inherited `CauseZones` figure carries three pre-existing defects on a B4 page (F1 size, **F2 contrast — newly
identified**, **F3 caption text — newly identified**); OBS-13 now has 7 instances; WebKit/iOS H1 wrapping and CLS remain unverified (F10);
real assistive-technology testing has not happened (E1).

Owner decisions required: see [`B4_OWNER_DECISIONS.md`](B4_OWNER_DECISIONS.md) (A–F plus two new items).
**This review does not mark B4 approved.** B5 was not started.

## 10. Limits of this review

- Engine proxies only. No real iPhone/Android, no VoiceOver/TalkBack/NVDA, no Windows High Contrast, no real print.
- Fonts were the self-hosted builds served locally; production CDN/font timing not tested. CLS was observed only under unthrottled local load
  (0 in every motion run); the B4 record's throttled CLS (42/42 at 0.000) was not re-run.
- GTM/consent behaviour (E6) and OBS-15 were not re-tested.
- Whole-page JS totals measured here are confounded by route-prefetch chunks (hashes differ per build) and are not used as evidence for OBS-16.

## Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · independent visual QA · Gate 4 B4 review.
- **Read:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md`, `DEC-041`, `GATE_4_B4_DECISION_PAGES.md`, `known-defects.json`, B4 evidence.
- **Produced:** this folder (4 documents, 94 new images) and `MappedSkills_B4_Visual_Review.zip`. No application code, QA script, register,
  `DECISION_LOG.md` or `CURRENT_STATE.md` was changed; nothing committed, pushed, merged or deployed. Review scripts and raw JSON measurements
  were kept in the session scratchpad, outside the repository.
- **Next:** owner reviews `visual-review.html` and decides A–H in `B4_OWNER_DECISIONS.md`. If F2/F3 are accepted as findings, record them in
  the known-defects register and the B4 report (not done here: governance records are the owner's/orchestrator's call).
