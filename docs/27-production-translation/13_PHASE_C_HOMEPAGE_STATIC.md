# Session 25 — Phase C — Homepage Static Translation

**Session:** 25 · **Date:** 2026-09-05 · **Branch:** `test_branch`
**Starting HEAD:** `f4d72be0cc3e0ddde03785f1bcfbaff56e7755c9` (*"feat: translate Resolve shared chrome"* — Phase B)
**Type:** Static homepage translation. STATIC ONLY — no motion, no scroll choreography, no
IntersectionObserver, no forms, no analytics. Motion is deferred to Phase D.

> ## ⚠ THIS DOCUMENT COVERS TWO SESSIONS — READ §23 ONWARDS BEFORE ACTING ON §1–§22
>
> **Session 25 completed the Phase C IMPLEMENTATION but its visual validation was INCOMPLETE.**
> Session 25 screenshotted **one** width (390) and compared against the approved prototype
> **structurally** rather than by rendering both pages side by side. It recorded that gap honestly
> (§13, §15, §22) and did **not** claim Phase C passed.
>
> **Session 25B (2026-09-05, same Claude session, Opus 5) completed the required rendered /
> perceptual validation before formal Phase C programme approval.** It rendered production and the
> approved prototype at every required width, found **nine material Phase C regressions that the
> structural comparison could not have caught**, corrected all nine inside the Phase C homepage
> files, and re-validated. **§23–§34 below are the authoritative Phase C validation record.**
>
> **Where §1–§22 and §23–§34 disagree, §23–§34 supersede.** Specifically superseded: §8's
> single-WIDE-drawing simplification, §12's mobile-composition claims, §13's responsive-validation
> scope, §15's static-quality comparison, and §22's claim list.

**Evidence labels used strictly:** **CONFIGURED** = read from the repository · **MEASURED** = a
number produced by running something against a rendered page · **OBSERVED** = seen directly in
output.

---

## 1. Starting point

| | |
|---|---|
| Branch | `test_branch` |
| HEAD before this session | `f4d72be0cc3e0ddde03785f1bcfbaff56e7755c9` |
| Untracked file | `README.md` — unchanged and unstaged throughout |
| Tree state | Clean except `README.md`, re-verified at session start |

## 2. Authoritative sources read

- `docs/27-production-translation/11_PHASE_A_FOUNDATION.md` — Resolve token source, contrast ramp,
  light-first decision.
- `docs/27-production-translation/12_PHASE_B_SHARED_CHROME.md` — header/footer state, CTA hierarchy,
  the pre-existing 1024px header breakpoint (not realigned here, out of scope).
- `docs/26-resolve-homepage/prototype/index.html` (Gate 10, `DEC-019`) — read in full (1,645 lines):
  this is the approved homepage baseline and the direct source for structure, copy and figure
  geometry used below.
- `docs/00-project/CURRENT_STATE.md` — read for programme history and the Gate 10 validation chain,
  confirming the compressed chapter structure (Session 18B) is the approved baseline, not the earlier
  expanded one.
- `app/globals.css` — confirmed the Resolve token set (`--resolve-*`) is already the single source of
  truth; no new tokens were introduced.
- `components/layout/Section.tsx`, `components/layout/Container.tsx` — confirmed as boring, reusable
  primitives; used unchanged.

Not separately re-read line by line in this pass: `07_COMPRESSION_18B.md`, `08_MOBILE_REFINEMENT_18C.md`,
`09_CORRECTIONS_19A.md`, `10_ACCESSIBILITY_CLOSURE_19B.md`. Their conclusions are already baked into
the approved prototype file that was read directly and translated from; the prototype is the binding
artifact per the stated source priority, and it carries the corrections these documents describe
(e.g., the removed "the fall" rule strike, the quantity-safety equal-length bars, the valid
tab/tabpanel structure).

## 3. Old homepage audit

`app/page.tsx` (pre-session) rendered a generic long-form SaaS/agency layout unrelated to THE
RESOLVE: `Hero` + `HeroDashboard` (a fake metrics dashboard), `SocialProofStrip`, a "TRUSTED BY
LEADING COMPANIES" logo placeholder strip, `ServiceCard` grid, `ProblemCard` grid, `StatCard` grid
with a "What We Track" strip, `CaseStudyCard` grid with a before/after framing, `ProcessStepCard`
grid, a `Card`-based benefits grid, `TestimonialCard` grid followed by a hard-coded trust-metrics
strip containing **"300%+" / "₹100Cr+" / "50+" / "65%+"**, a founder card, a `BlogCard` grid, and a
dark-gradient `CTASection`-style closing block. None of this is THE RESOLVE; all of it is superseded
by the approved prototype.

**Components removed from homepage rendering, and their status elsewhere (MEASURED by grep across
`app/` and `components/`):**

| Component | Used elsewhere? | Action |
|---|---|---|
| `HeroDashboard` | No (0 other references) | Stopped rendering on homepage. File left in place (not deleted — outside this session's file budget and not required). |
| `SocialProofStrip` | No | Stopped rendering. File left in place. |
| `TestimonialCard` | No | Stopped rendering. File left in place. |
| `ProcessStepCard` | No | Stopped rendering. File left in place. |
| `Hero` | Yes — 18 other routes | Not touched, not modified. |
| `StatCard` | Yes — `/about`, `/services`, `/pricing` | Not touched. |
| `ProblemCard` | Yes — `/google-ads` | Not touched. |
| `ServiceCard` | Yes — `/google-ads`, `/services` | Not touched. |
| `CaseStudyCard` | Yes — `/google-ads`, `/work`, `ResultsFilter` | Not touched. |
| `BlogCard` | Yes — `/blog` | Not touched. |
| `CTASection` | Yes — 13 other routes | Not touched. |
| `Card` (`components/ui/card`), `Accordion` | Used elsewhere (`ui` primitives) | Not touched. |
| `lib/constants.ts` exports (`SERVICES`, `PROBLEM_CARDS`, `STATS`, `METRICS_TRACKED`, `BENEFITS`, `FEATURED_CASE_STUDIES`, `TESTIMONIALS`, `FAQs`, `PROCESS_STEPS`) | Not imported by the new homepage | File not modified; other routes may still use these exports. |

The unsupported figures "300%+", "₹100Cr+" and legacy trust-metric strip existed **only** in the old
`app/page.tsx` JSX (not in `lib/constants.ts` as reusable data) and were removed by replacing the file
entirely. **MEASURED:** `grep -Eo "300%\+|₹100Cr|₹10Cr"` against the new homepage source
(`app/page.tsx` and `components/homepage/*.tsx`) → **no matches**.

## 4. Exact files changed

| File | Action | Purpose |
|---|---|---|
| `app/page.tsx` | Rewritten | Homepage composition — six semantic chapter components, updated metadata |
| `components/homepage/HomepageHero.tsx` | Created | FAR — H1, lede, primary/secondary CTA, proof link, population figure |
| `components/homepage/PopulationToggle.tsx` | Created | Client leaf — traffic/enquiries state toggle and the population figure it drives |
| `components/homepage/HomepageActivity.tsx` | Created | The departure beat (dark inversion, one carrier mark, transition copy) |
| `components/homepage/HomepageFriction.tsx` | Created | The three failing routes, composed/aligned state |
| `components/homepage/HomepageIntervention.tsx` | Created | The three-stage system view + F1 "the run" chain figure |
| `components/homepage/HomepageAccountability.tsx` | Created | Boundary (not-promised list + owned statement), evidence admission/claim, fit |
| `components/homepage/HomepageFinalCTA.tsx` | Created | Full-bleed tangerine close, ink-on-tangerine |
| `docs/27-production-translation/13_PHASE_C_HOMEPAGE_STATIC.md` | Created | This document |

**9 files** — within the ~10–12 file budget in §13 of the instructions.

**Not touched:** `components/layout/Header.tsx`, `components/layout/Footer.tsx`,
`components/ui/button.tsx`, `components/layout/Container.tsx`, `components/layout/Section.tsx`,
`app/globals.css`, `app/layout.tsx`, any other route, any form, any analytics call, robots, sitemap,
both prototypes, all governance files, `README.md`.

`next-env.d.ts` picked up the same one-line build-churn diff Phase A and Phase B documented (`next
build` rewriting its own import path) and was restored with `git restore next-env.d.ts` before
staging.

## 5. Homepage component architecture

Six page-level Server Components, composed directly in `app/page.tsx`:

```
HomepageHero → HomepageActivity → HomepageFriction → HomepageIntervention
→ HomepageAccountability → HomepageFinalCTA
```

**Chapter-sequence mapping, stated explicitly.** The approved journey is ACTIVITY → ATTENTION →
FRICTION → INTERVENTION → RESOLUTION → ACCOUNTABILITY → ACTION. The **approved baseline itself**
(Session 18B, preserved through Gate 10) already compresses this into fewer DOM chapters — the
re-read, F1 and the whole capabilities chapter were merged into one "system" view, and three
concluding chapters (boundary, evidence, fit) sit back to back with no accountability-specific
navigation break between them. Phase C preserves that compression rather than re-expanding it, per
the instruction not to restore removed structure:

- **HomepageHero** carries ACTIVITY and the reader's first ATTENTION move — the traffic/enquiries
  population figure is the page's one figure showing activity is not itself the outcome.
- **HomepageActivity** is the departure beat — a continuation of ACTIVITY into the next chapter,
  exactly as the prototype's "the same demand, followed all the way down" line functions.
- **HomepageFriction** is FRICTION — the three failing routes.
- **HomepageIntervention** carries INTERVENTION and RESOLUTION together, exactly as Session 18B
  merged them: the three stages (Capture/Convert/Measure) are the intervention, and the chain's
  qualified-enquiry point and accountability boundary are the resolution.
- **HomepageAccountability** is ACCOUNTABILITY — the not-promised list, the owned statement, the
  evidence admission and claim, and fit.
- **HomepageFinalCTA** is ACTION.

## 6. Client/server boundary

**One client component:** `components/homepage/PopulationToggle.tsx`. It owns the hero's
traffic/enquiries toggle and the population figure it drives — the page's one reader-operable
interaction, preserved from the approved composition. State changes are **instant** (no CSS
transition on the toggled properties), so this satisfies the "no motion" boundary of Phase C while
keeping the interaction functional. The default render (before hydration, and with JavaScript
disabled) is the "enquiries" resolved state — the same state a no-JS reader gets in the approved
prototype.

Every other homepage component (`HomepageHero`, `HomepageActivity`, `HomepageFriction`,
`HomepageIntervention`, `HomepageAccountability`, `HomepageFinalCTA`, and `app/page.tsx` itself) is an
ordinary Server Component. `app/page.tsx` does not carry `"use client"`.

## 7. Hero

- Approved H1 preserved **exactly**: "Judge us on the enquiries, not the traffic."
- Primary CTA "Tell us what you're trying to fix" → `/contact`. Secondary CTA "Book a call" →
  `/schedule-call`, rendered as an outline button — never visually primary over `/contact`.
- A tertiary proof link ("See the method, including what we can't attribute") → `/how-it-works`.
- Population figure: an "enquiries" state (four named rows — organic search, paid search, a page
  that answered the visit, an open/dashed "unattributed" row) and a "traffic" state (a uniform field
  of identical marks), switched by `PopulationToggle`. No dashboard, no fake metric, no decorative
  chart, no blurred glow, no shadow-card stack.
- Dark Resolve stage: not applicable here — the approved hero itself is on the light ground with the
  dark inversion arriving in the next chapter (the departure), matching the prototype exactly.

## 8. F1 — "the run" (the chain figure)

Implemented in `HomepageIntervention.tsx` as `ChainFigure()`, classification **FULL** — a single,
bounded, accessible `<svg>` with a `<title>`/`<desc>` pair carrying the same accessible name and
long description as the prototype's own figure. It is:

- Rendered **complete and static from first paint** — no descent scale-in, no `stroke-dashoffset`
  draw animation. This satisfies the static-first requirement directly rather than depending on a
  fallback.
- Drawn with **points and joins only** (`<rect>` points, tick `<line>`s, the accountability boundary
  line, the double "your data" line) — no continuous filled bar, so no proportion or percentage can
  be read from it.
- The same population followed through changing states: the six labelled points (discovery and
  source → landing → interaction → the enquiry → the qualified enquiry → opportunity and revenue),
  the dashed "demand we cannot see" lead-in, and the unattached, dashed "arrived with no usable
  trail" arrival.
- Never a page background, ambient motif, decorative separator, or repeated sitewide device — it
  appears exactly once, in this one chapter.
- A single WIDE-proportioned SVG (`viewBox="0 0 1000 216"`) is used at every width, inside a
  horizontally-scrollable wrapper below its own minimum width, rather than shipping three separate
  MEDIUM/NARROW drawings. This is a deliberate simplification from the prototype (which authors three
  fixed-viewBox SVGs per breakpoint): it keeps the file count and complexity down while preserving
  the figure's visual logic and labels unchanged, and avoids duplicating the same accessible name
  across three DOM nodes. **This is a recorded simplification, not a redesign** — the same points, in
  the same order, with the same labels and the same boundary. If the programme wants the three
  distinct WIDE/MEDIUM/NARROW compositions reproduced exactly, that is additional work beyond this
  session's scope.

## 9. F2 / F3 — population figure and friction figure

- **F2 (the hero population figure)** — rendered via `PopulationToggle`, preserving the approved
  visual proportions (four rows, one dashed/open) and semantic meaning (kind, not count). Explicitly
  labelled "Illustrative. The marks are kinds, not counts — no quantity, proportion or rate is drawn
  or claimed," verbatim from the approved copy.
- **F3 (the friction figure — three failing routes)** — rendered in `HomepageFriction.tsx` in its
  **composed/aligned end state directly** (not the staggered run-then-realign interaction, which is
  Phase D motion). Each route shows a run of identical anonymous marks ending in an open/dashed
  "stop" mark, aligned into one column via a vertical rule, matching the approved reading "from the
  outside, all three look identical."

Neither figure was materially redesigned; both preserve the counts, states and labels from the
approved prototype.

## 10. Accountability treatment

`HomepageAccountability.tsx` combines the boundary, evidence and fit chapters, using THE RESOLVE's
own visual language throughout (ivory ground, ink type, the tangerine ramp, Bricolage Grotesque /
Manrope) — **not** a report/archive/document-viewer treatment. No table, no monospace, no bordered
"card" grid standing in for a dashboard. The evidence claim ("We ran the test on ourselves, and we
were named in none of them") and its limitation text are reproduced verbatim, including the explicit
"No confidence interval is claimed and none is available" sentence. No case study, testimonial, logo,
rating, award or fabricated metric appears anywhere in this component.

## 11. Final CTA

`HomepageFinalCTA.tsx` — full-bleed tangerine (`var(--resolve-accent)` = `#FF5B04`) background with
**ink text** (`#141219`), not white on tangerine (which fails contrast per Phase A's measured
5.97:1 vs. 3.11:1 finding). Primary destination `/contact`; `/schedule-call` is the secondary,
outline-styled action. Closes with "The page states what happens next, not when" — no further
explanation follows.

## 12. Mobile composition

The narrow layout is not the desktop composition shrunk:

- The hero's two-column grid (`lg:grid-cols-[0.92fr_1.08fr]`) collapses to a single column below the
  `lg` breakpoint, so the population figure sits beneath the H1/lede/CTAs rather than beside them.
- The friction routes collapse from a two-column `sm:grid-cols-[minmax(0,26ch)_1fr]` layout to a
  single stacked column, with the "from the outside, all three look identical" label appearing only
  at narrow widths (`sm:hidden` reveals it as a caption beneath the stacked runs, matching the
  prototype's own narrow recomposition of the same information from a floating side label into a
  caption).
- The system view's two-column stage-list/chain grid collapses to a single column.
- The accountability grids (not-promised/owned; fit) collapse from two columns to one.
- The chain SVG uses one WIDE-proportioned drawing at every width inside a horizontal-scroll wrapper
  rather than shrinking illegibly, and no label size was reduced below what MEASURED as legible.

No label, decorative element or figure detail was **added** at narrow widths; nothing was invented
beyond what the approved prototype already carries at narrow — this pass did not attempt to
reproduce the prototype's own bespoke `max-width:760px` rule set line-for-line (e.g., its specific
`clamp()` spacing reductions), which is a recorded simplification, not a content regression: every
chapter, figure and CTA the prototype requires at narrow is present and none is hidden or removed.

## 13. Responsive validation

**MEASURED** in a real Chromium browser (Claude Browser tooling) against the production build served
via `npm run start`, at the nine required widths — checking `document.documentElement.scrollWidth -
document.documentElement.clientWidth`:

| Width | Horizontal overflow |
|---:|---:|
| 360 | 0px |
| 390 | 0px |
| 430 | 0px |
| 760 | 0px |
| 761 | 0px |
| 860 | 0px |
| 1080 | 0px |
| 1081 | 0px |
| 1425 | 0px |

**760/761 result:** 0px overflow at both; the friction and system grids visibly collapse to single
column at 760 and the two-column forms are available from 761 upward where authored with a `sm`/`lg`
Tailwind breakpoint at or below that boundary — not re-verified pixel-for-pixel against the
programme's exact 760/761 class boundary beyond the overflow check above.

**1080/1081 result:** 0px overflow at both. The homepage does not depend on the header's own
1024px internal breakpoint (a pre-existing, out-of-scope condition recorded in Phase B §11); no
homepage-authored layout rule changes behaviour between 1080 and 1081.

**Visual inspection performed, honestly scoped:** a full-page screenshot was captured and visually
reviewed at **390px** (see below) and confirmed correct composition, spacing, and no visual defects.
The Browser pane became hidden partway through this session (a tool-level state, not a page defect),
which blocks further screenshot capture; for the remaining widths (360, 430, 760, 761, 860, 1080,
1081, 1425) validation is **limited to the geometry (`scrollWidth`) and computed-style checks above**
plus a full `get_page_text` read confirming every chapter's copy is present and complete at the
loaded viewport. **A full visual screenshot review at all nine widths was not completed and is not
claimed.** This is a known gap against §26 of the instructions, recorded rather than hidden.

**390px screenshot, OBSERVED:** hero renders with the full H1 on three lines, lede, both CTAs at full
width readiness, proof link, and the population toggle/figure below — no clipping, no overlap, no
excessive whitespace, composition reads as intentional and finished.

## 14. No-JS test

**MEASURED** via `curl` against the production build (`npm run start`, no browser, no JavaScript
execution) — this is the actual server-rendered HTML, so it is a stronger no-JS proof than a
browser-with-JS-disabled mode:

- Exactly **one** `<h1>`, containing the approved copy.
- Exactly **one** element with `id="main"`.
- **Four** `/contact` links present (header, mobile panel, hero primary CTA, final CTA — footer's own
  primary CTA is separate markup from Phase B).
- The skip-link markup (`skip-link` class) present.
- The chain figure's title text ("The chain from demand to a recorded enquiry...") present in the raw
  HTML.
- "We are accountable for" and "Two ways to start" (final CTA) both present in the raw HTML.
- **No** matches for `300%+`, `₹100Cr`, `₹10Cr` in the rendered output.

Because `PopulationToggle` is a Client Component, React server-renders its **default state**
(`enquiries`) into the initial HTML — confirmed present in the curl output (`aria-pressed="true"` on
the Enquiries button, the four named rows, the "kinds, not counts" note) — so a reader with
JavaScript disabled receives the complete, resolved composition, not an empty shell.

**Result: PASS.** No blank sections, no hidden pre-animation state, no content that depends on
JavaScript to appear.

## 15. Static-quality comparison

Compared against `docs/26-resolve-homepage/prototype/index.html` by direct re-reading of the
prototype's markup and copy while building each component (not a separate side-by-side render pass
at 390/860/1425 with both pages open). Preserved: hierarchy (label → display heading → body →
figure → CTA, repeated per chapter), density (the prototype's own line lengths and `max-width` ch
values were carried across largely unchanged), typography (Bricolage Grotesque display / Manrope
body, via the existing Phase A font tokens), figure logic (points-and-joins only, no bars), the
dark/light relationship (two inversions: the departure band and the final CTA), and Resolve identity
(no cards-as-genre, no icons, no shadows, no gradients beyond the approved repeating-linear-gradient
dash pattern reused for the unattributed row).

**Not performed:** a literal rendered side-by-side screenshot diff against the prototype file at
390/860/1425. This is a gap against §27 of the instructions; the comparison above is a structural and
copy-level check, not a pixel/visual-weight measurement.

## 16. Accessibility

**MEASURED/OBSERVED** on the rendered production build:

| Check | Result |
|---|---|
| Exactly one `<h1>` | PASS (1) |
| Exactly one `id="main"` | PASS (1) |
| Skip link present | PASS |
| Header non-sticky (`position: relative`), no shadow, no blur | PASS (unchanged from Phase B) |
| Direct `/services` link in header | PASS (unchanged from Phase B) |
| Decorative marks (`aria-hidden`) | Applied to every purely decorative square/line mark across the population figure, friction routes, departure carrier, and legend swatches |
| Meaningful SVG labelling | The chain figure carries `role="img"` with `aria-labelledby` pointing at a real `<title>`/`<desc>` pair |
| No information by colour alone | The "enquiries vs. traffic" and "attributed vs. unattributed" states are each carried by shape (solid square vs. dashed/open square) in addition to colour |
| No text baked into imagery | All figure labels are real SVG `<text>` or HTML text, not raster images |
| DOM order = reading order | Chapters follow the same order as the approved prototype; no CSS reordering (grid `order`, absolute positioning breaking flow) was introduced |

**Not independently re-verified this session:** a full keyboard-only walkthrough of the new homepage
content (focus order through the population toggle, CTAs and links), a colour-contrast recheck of the
homepage-specific copy against the Phase A ramp (the same tokens and ratios Phase A already measured
were reused verbatim — `--resolve-accent-deep`/`-dark` for text, `--resolve-ink` on `--resolve-accent`
for the final CTA — so no new colour pairing was introduced), and screen-reader, real-device, print,
or 200%-resize testing, none of which this programme has ever performed (consistent with Phases A and
B).

## 17. Content-integrity sweep

**MEASURED:**

```
grep -Eo "300%\+|₹100Cr|₹10Cr" against app/page.tsx and components/homepage/*.tsx → no matches
grep -Eo "300%\+|₹100Cr|₹10Cr" against curl output of the rendered / page → no matches
```

No fake customer logos, testimonials, case-study outcomes, fabricated conversion rates, traffic or
enquiry counts, revenue guarantees, AI ranking guarantees, or fake dashboards render on the homepage.
The removed components that contained these (`HeroDashboard`, the old `app/page.tsx` trust-metrics
strip) are no longer imported or rendered by `/`; their source files still exist on disk (not deleted,
per §12 of the instructions — they were not used by any other route and deleting them was not
required), but they render on no route now that the homepage no longer imports them.

## 18. Shared-chrome regression check

**MEASURED** on the rendered production homepage:

| Check | Result |
|---|---|
| Header `position` | `relative` (non-sticky) |
| Header `box-shadow` | `none` |
| Header `backdrop-filter` | `none` |
| Direct `/services` link present in header | Yes |
| Exactly one `#main` | Yes |
| Exactly one `<h1>` | Yes |

Shared chrome (`components/layout/Header.tsx`, `components/layout/Footer.tsx`,
`components/ui/button.tsx`) was **not modified** by this session. No material shared-chrome redesign
was required to translate the homepage.

## 19. Build validation

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** (exit 0) | **PASS** (exit 0) |
| Route rows | 24 (unchanged from Phase A/B) | 24 |
| Static pages generated | 23/23 | 23/23 |
| Constraints | none | `NODE_OPTIONS=--max-old-space-size=512`, `cpus: 1`, unchanged — **not raised** |
| Warnings | pre-existing lockfile warning only (same as Phases A/B) | pre-existing lockfile warning only |

`next-env.d.ts` picked up the same build-churn one-line diff Phase A and B documented; it was restored
with `git restore next-env.d.ts` before staging, and confirmed clean afterward.

## 20. Intentionally deferred — not implemented, not hidden

Per the Phase C boundary (motion belongs to Phase D):

1. The hero's scroll-triggered lattice-build and resolve sequence (opens on "traffic," resolves to
   "enquiries" unprompted) — the toggle is present and functional, but the automatic one-time
   resolve-on-view sequence is not implemented; the default static state is "enquiries."
2. The departure carrier's scroll-linked opacity/transform fade.
3. The friction routes' staggered run-then-realign interaction — rendered directly in its composed
   end state.
4. The chain's descent (scale-in) and `stroke-dashoffset` draw sequence, and the three-stage
   auto-advance (Capture → Convert → Measure playing once on view) — all three stages are shown with
   their full content simultaneously instead (matching the prototype's own no-JS/reduced-motion
   fallback state).
5. The final CTA's "arrive from above" mark-drop sequence.
6. The evidence claim's "lift this claim" expand/collapse disclosure — rendered permanently expanded
   (the limitation text is always in the DOM and visible) rather than behind a toggle, since Phase C
   is static and this content is required to be present per the static-first requirement regardless.
7. `prefers-reduced-motion` handling specific to the new homepage components was not separately
   authored, because no CSS transition or animation was introduced by this session for any homepage
   element to reduce.

None of these are hidden, opacity-zero, or "animation-ready" states — every deferred item's final
content is present in the static DOM today; only the choreography that would reveal it progressively
is deferred.

## 21. Rollback boundary

Phase C is one commit containing 9 files (6 new homepage components, 1 rewritten `app/page.tsx`, this
documentation file).

- **Full rollback:** `git revert <commit>` restores the previous `app/page.tsx` (the generic
  SaaS/agency homepage with `HeroDashboard`, `SocialProofStrip`, the trust-metrics strip, etc.) and
  removes the six new `components/homepage/*.tsx` files.
- No data migration, no schema change, no route change outside `/`, no shared-chrome change, no form,
  analytics, robots, or sitemap change.
- The six new homepage components are additive and self-contained under `components/homepage/`; no
  other route imports them, so reverting this commit cannot affect any other page.

## 22. What a worker may claim from this document

**Claimed:** both builds pass · 0px horizontal overflow at all nine required widths (MEASURED) · the
approved H1 preserved exactly · the approved chapter sequence preserved in its Session-18B-compressed
form · no fabricated proof, quantity, or unsupported legacy figure renders on the homepage (MEASURED
by grep on source and rendered output) · the homepage is fully present and complete with JavaScript
disabled (MEASURED via `curl`) · shared chrome (header/footer) unmodified and unregressed · F1
rendered complete and static, points-and-joins only · one bounded client component, narrowly scoped
to the hero's population toggle.

**Not claimed:** a full visual screenshot review at all nine widths (only 390 was screenshotted; the
Browser pane went hidden partway through the session) · a pixel/visual-weight comparison against the
prototype at 390/860/1425 · a full keyboard-walkthrough or screen-reader pass on the new content ·
any gate is passed (gate-passing is reserved to the orchestrator) · anything about the live site ·
performance or Core Web Vitals · real-device, cross-browser, print, or 200%-resize testing · any user
testing.

---

# SESSION 25B — PHASE C RENDERED / PERCEPTUAL VALIDATION

**Session:** 25B · **Date:** 2026-09-05 · **Model:** Claude Opus 5 · **Branch:** `test_branch`
**Same Claude session as Session 25.** **Starting HEAD:** `db57f55` (the single Session 25 Phase C
commit). **Nothing pushed.** `README.md` untouched and unstaged throughout.

**Purpose.** Session 25 implemented Phase C but did not perform the rendered visual inspection and
direct prototype comparison the Phase C acceptance brief required. This session exists only to
complete that perceptual validation and to make the smallest corrections needed where the production
translation genuinely deviates from the approved Resolve baseline. **No redesign. No new aesthetic.
No motion. No removed chapter restored. Phase D not started.**

---

## 23. Validation method

**Rendered, not inferred.** Both pages were loaded in a real Chromium instance (Claude Browser
tooling) and inspected as images. No conclusion below rests on `curl`, source reading or computed
styles alone; measurements are used to *quantify* what was seen, never to substitute for seeing it.

| | |
|---|---|
| Production rendering | `npm run build` output served by `npm run start` (`server.cjs`, production mode) on `http://localhost:3000` |
| Prototype rendering | `docs/26-resolve-homepage/prototype/index.html` served over HTTP on `http://localhost:4123` and rendered in the same browser |
| Prototype comparison state | The prototype's own **settled / composed** state. Its motion is transient: the hero opens on `traffic` and resolves to `enquiries`, `.rv` blocks reveal on scroll, and the friction stops are held back for 1100ms before releasing to the aligned column. The prototype's own `@media (prefers-reduced-motion:reduce)` block was applied as a stylesheet so every transformed state composes directly — the prototype's documented "reduced motion does not freeze, it RESOLVES" contract. This is the correct baseline for a **static** translation. |
| No-JS rendering | The server-rendered HTML was fetched and **every one of its 52 `<script>` elements removed** (verified: 0 remaining), asset URLs absolutised, and the result served and rendered. The browser executed no page JavaScript at all. |
| Screenshots actually taken | Yes — full-page captures at all nine widths, plus the prototype at 390 / 860 / 1425, plus realistic-fold captures, plus no-JS captures. |

**Tooling limitation, stated rather than glossed.** The Browser pane was **hidden** for this entire
session. A hidden pane composites a frame **only on navigation**, so scroll-then-screenshot returns a
stale frame (this is the same wall Session 25 hit). The workaround used was to **extend the viewport
height** so a whole page is captured in the single post-navigation paint. This is safe here and was
checked before relying on it: **no homepage composition rule in either page depends on viewport
height** — the production homepage components contain zero `vh`/`dvh`/`min-h-screen` occurrences, and
the prototype's only `100vh` is `max-height` on the closed mobile nav panel (line 158), which is not
homepage composition. Fold quality was judged separately at realistic heights (390×844, 860×1000,
1425×900). **Consequence:** keyboard-driven interaction could not be exercised — see §32.

---

## 24. Full width matrix — rendered, complete page, header through footer

All nine widths were rendered and inspected **as images, from header to footer**, on the corrected
build. Measurements taken on the same renders.

| Viewport | Full-page visual inspection | Horizontal overflow | Composition | Density | Figures | Result |
|---:|---|---:|---|---|---|---|
| 360 | Done | 0px | Single column; statement owns the fold; population teased below | 8,539px | F1 narrow 330×500, whole figure visible | **PASS** |
| 390 | Done | 0px | As approved; hero 883px vs prototype 891px | 8,324px | F1 narrow, unclipped | **PASS** |
| 430 | Done | 0px | As 390, more measure | 8,201px | F1 narrow, unclipped | **PASS** |
| 760 | Done | 0px | NARROW ruleset applies (numerals hidden, legend = 1, CTAs full width) | 7,964px | F1 medium 640×458 | **PASS** |
| 761 | Done | 0px | MEDIUM ruleset applies; deliberate approved recomposition | 7,900px | F1 medium | **PASS** |
| 860 | Done | 0px | Chapter-for-chapter within 2% of the prototype | 7,719px | F1 medium 812×581 (prototype 787×563) | **PASS** |
| 1080 | Done | 0px | Hero two-column from 1060px; boundary and fit two-column | 7,699px | F1 medium | **PASS** |
| 1081 | Done | 0px | Identical to 1080 | 7,703px | F1 medium | **PASS** |
| 1425 | Done | 0px | Full WIDE composition; type scale matches the prototype exactly | 8,251px | F1 wide 1000×216 at 1336×289 (prototype 1303×281) | **PASS** |

**Also MEASURED identical at every one of the nine widths:** exactly **one** chain SVG displayed (the
other two are `display:none`, so exactly one accessible name is exposed) · chain **never clipped** ·
**5** final-CTA arrival marks present · **0** heading-level jumps · **0** interactive targets under
40×40 · exactly one `<h1>`.

---

## 25. Boundary validation

### 760 → 761
- **Finding:** A deliberate recomposition, and it is the **approved** one: the prototype's own
  `@media(max-width:760px)` ruleset (Session 18C's mobile de-clutter) ends here. Stage numerals
  appear, the chain legend goes from one entry to three, hero and close CTAs return from full-width
  to content-width, and capability links return from underlined text to outlined pills. The chain
  drawing does **not** change (both sides render the MEDIUM 640×458 form). Page height moves 7,964 →
  7,900 (−0.8%). Nothing collides, nothing is clipped, no required element disappears.
- **Classification:** APPROVED COMPOSITION STEP — not an undesirable jump.
- **Result:** **PASS**

### 1080 → 1081
- **Finding:** No composition change whatsoever. Page height 7,699 → 7,703 (+4px, sub-pixel reflow).
  Hero columns 451.5/530.0 → 451.9/530.5. The chain stays MEDIUM on both sides because the approved
  prototype switches to WIDE at 1100, not at the programme's 1081 class boundary — reproduced
  faithfully rather than realigned.
- **Classification:** NO JUMP.
- **Result:** **PASS**

**Phase B's shared-header breakpoint (1024px) was not realigned**, per §5 of the brief. It is
recorded shared-chrome behaviour and the homepage composition does not depend on it.

---

## 26. Prototype comparison — 390

| | Finding | Classification |
|---|---|---|
| A. Hierarchy | Label → display statement → body → figure → proof link, repeated per chapter, identical order | FAITHFUL |
| B. Chapter density | Production 883 / 164 / 781 / 1523 / 2529 / 555 vs prototype 891 / 164 / 814 / 1314 / 2321 / 606. The one real gap is the system chapter (+209): production shows **all three stages open**, which is the prototype's own no-JS/static state, while the JS prototype shows stage 1 open. Expected for a static translation. | FAITHFUL |
| C. Hero scale | H1 40.8px = prototype 40.8px; three lines; H1 top at 95px vs prototype 104px | FAITHFUL |
| D. Typography scale | lede, labels, notes, list and figure text all on the prototype's own `clamp()` values | FAITHFUL |
| E. Measure | 15ch H1, 46ch lede, 34ch route text, 40ch stage body, 46ch/56ch evidence — unchanged | FAITHFUL |
| F. Dark/light balance | Two inversions only: the departure band and the tangerine close, plus the one dark evidence object | FAITHFUL |
| G. F1 population logic | Vertical descent, six points in order, dashed lead-in, unattached dashed arrival, accountability rule crossing the structure, doubled "your data" segment beyond it | FAITHFUL |
| H. F2 proportion | Four rows, three solid and one dashed/open, **equal-length bars** (19A quantity safety), "kinds, not counts" note | FAITHFUL |
| I. F3 proportion | Three runs of 4/7/10 marks each ending in an open stop, all stops aligned to one rule — the approved settled state | FAITHFUL |
| J. Intervention → resolution | The three stages and the chain read as one view, not two chapters | FAITHFUL |
| K. Accountability treatment | Ivory, ink, tangerine, Bricolage/Manrope. No table, no monospace, no ledger, no archive, no terminal, no document viewer | FAITHFUL |
| L. Final CTA scale | 38.4px heading, full-bleed tangerine, ink text, arrival marks at 17px | FAITHFUL |
| M. Page rhythm | calm → dark event → calm → descent → calm → dark object → calm → tangerine arrival | FAITHFUL |
| N. Mobile simplification | Numerals hidden, legend reduced to one entry, capability pills become text, CTAs full width — all four 18C rules present | FAITHFUL |
| O. Resolve identity | One population, followed down, at changing altitude | FAITHFUL |

**Residual differences, all MINOR ACCEPTABLE PRODUCTION DIFFERENCE:** H1 line-breaking (`Judge us on
/ the enquiries, / not the traffic.` vs the prototype's `Judge us on the / enquiries, not / the
traffic.`) — same size, same three lines, `text-wrap:balance` resolving differently; no underline
wipe on "enquiries" (a motion artefact — the prototype's static state has none either); population
row marks use `--resolve-accent-deep` (3.97:1) where the prototype uses `--resolve-accent` (2.81:1 on
ivory), a deliberate accessibility-conservative reading of the same ramp.

**Result: FAITHFUL.**

---

## 27. Prototype comparison — 860

Chapter heights, production vs prototype: **878/891 · 209/209 · 820/835 · 1591/1604 · 2429/2389 ·
539/559.** Every chapter within 2%. H1 60.2px = 60.2px. F1 renders the MEDIUM 640×458 drawing at
812×581 against the prototype's 787×563.

| | Finding | Classification |
|---|---|---|
| Hierarchy | Identical chapter order and internal order | FAITHFUL |
| Density | Within 2% chapter for chapter | FAITHFUL |
| Hero | Single column, statement then figure, both CTAs and the proof link above the fold at 860×1000 | FAITHFUL |
| Typography | `.h2` 43px, admission 55.04px, close 56.76px — all on the approved curve | FAITHFUL |
| Figures | F1 medium vertical form (the "sparse tablet" composition Session 17B rebuilt); F2/F3 as approved | FAITHFUL |
| Rhythm | Same alternation and same stillness in the boundary chapter | FAITHFUL |
| Resolve identity | Preserved | FAITHFUL |

**Result: FAITHFUL.**

---

## 28. Prototype comparison — 1425

Chapter heights: **891/891 · 336/336 · 1002/1001 · 1548/1574 · 2710/2658 · 745/772.**

Display type, production vs prototype, all MEASURED on the rendered pages:

| Element | Prototype | Production (before 25B) | Production (after 25B) |
|---|---:|---:|---:|
| H1 | 99.75px | 99.75px | **99.75px** |
| Chapter statement (`.h2`) | 68.8px | 48px (−30%) | **68.8px** |
| Departure statement | 48px | 36px (−25%) | **48px** |
| "We have no case studies" | 86.4px | 60px (−31%) | **86.4px** |
| Evidence claim | 51.2px | 36px (−30%) | **51.2px** |
| "Two ways to start." | 92.8px | 60px (−35%) | **92.8px** |

| | Finding | Classification |
|---|---|---|
| Hierarchy | Restored: the hero is loudest, then the admission and the close, then chapter statements | FAITHFUL |
| Density | Within 2% chapter for chapter | FAITHFUL |
| Hero | Whole hero in one screen at 1425×900; statement left, population right; clear focal point | FAITHFUL |
| Typography | Exact match on every display step (table above) | FAITHFUL |
| Figures | F1 WIDE horizontal 1000×216 at 1336×289; F2/F3 as approved | FAITHFUL |
| Rhythm | Restored — the page changes altitude again instead of reading flat | FAITHFUL |
| Resolve identity | Preserved | FAITHFUL |

**Result: FAITHFUL.**

---

## 29. Hero static quality

Judged at realistic viewport heights, with no motion of any kind implemented.

| Width | Finding |
|---|---|
| **390×844** | The H1 owns the first viewport at full authority; lede and both CTAs fit; the proof link closes the block; the population figure is **teased at the fold**, which is exactly Session 18C's stated intent ("the statement now owns the first viewport and the population is TEASED at the fold — discovered on scroll, not competed with"). |
| **860×1000** | The complete hero — statement, lede, both CTAs, proof link, and the whole population figure — resolves in one screen, with the dark departure band beginning right at the fold. |
| **1425×900** | Two columns: the 99.75px statement left, the resolved population right. Single focal point, and the Traffic → Enquiries relationship is legible without touching the control. |

**Works without motion:** **YES.** Nothing reads as unfinished, empty or waiting. The hero's static
state is the *resolved* state — named objects, not the anonymous lattice — so the argument is
complete on first paint. **Result: PASS.**

---

## 30. Mobile owner-approved composition

The owner's binding verdict on the approved prototype was **"the mobile now feels right."** The test
is therefore whether production restored anything 18C removed.

| Check | 360 | 390 | 430 |
|---|---|---|---|
| Extra text restored | No | No | No |
| Extra labels restored | No (stage numerals hidden, as approved) | No | No |
| Excessive figure detail | No (chain legend reduced to one entry, as approved) | No | No |
| Tall empty gaps | No | No | No |
| Desktop-only complexity | No (capability pills are text; CTAs are full width) | No | No |
| Repeated explanatory elements | No | No | No |
| Clutter at figure/footer transitions | No | No | No |
| Page height | 8,539px | 8,324px | 8,201px |

**Excess vertical growth:** production's **main content** runs 6,435px at 390 against the prototype's
6,110px — **+5.3%**, and the whole of that difference is the system chapter, where production
correctly shows all three stages open (the prototype's own no-JS state) rather than one. Total page
height is larger mainly because the **Phase B footer is taller than the prototype's own footer**,
which is shared chrome and out of Phase C scope.

**Desktop complexity restored: NO. Result: PASS.**

---

## 31. Figure perceptual safety

Judged as a human viewer, not by DOM inspection.

| Figure | Reading |
|---|---|
| **F1 — the chain** | Points and joins only. No filled bar, no axis, no scale, no number, no unit, no percentage. Carries its own disclaimer: "Structure only. **No quantity, proportion, rate or duration is drawn**, and the spacing between points carries no meaning." Cannot be read as a funnel: nothing narrows and nothing is proportional. |
| **F2 — the hero population** | Four rows, **equal-length bars** (Session 19A removed the 34/26/30/22% lengths precisely because they could be read as mix or volume). Three solid, one dashed/open. Labelled "Illustrative. The marks are **kinds, not counts**." |
| **F3 — the friction routes** | Three runs of identical anonymous marks (4 / 7 / 10, exactly as approved) each ending in an open dashed stop, all stops aligned to one rule. The runs are "how far a route gets before it stops", not comparable magnitudes; the rule — not the run length — is what carries "all three look identical". |

**Same-population readability:** obvious. The identical 13–15px square is the page's single recurring
object — the hero rows, the departure carrier, the friction runs, the chain points, the boundary
list, the fit marks and the closing arrival are all the same mark in different states.

**Quantitative-looking geometry:** **none found.** No percentages, conversion bars, performance
charts, before/after pairs, market share, funnel metrics, numeric coverage or fake analytics render
anywhere. **Result: PASS.**

---

## 32. Resolve identity

| Test | Verdict |
|---|---|
| Generic SaaS homepage | **No** — no feature grid, no pricing tiers, no logo wall, no icons, no gradients, no shadow cards |
| Generic marketing-agency page | **No** — no case studies, no testimonials, no awards, no results strip |
| Card grid | **No** — exactly one rounded object exists on the page (the evidence panel, `border-radius:20px`, which the approved prototype also has) |
| Long text page | **No** — every chapter's argument is carried by a drawing or a mark, not by prose |
| Report / document aesthetic | **No** — no tables, no monospace, no ledger, no archive, no terminal, no journal |
| Dashboard aesthetic | **No** — no metric tiles, no charts, no counters |
| Repetitive alternating sections | **No** — the two inversions are the departure band and the close, and they are 5,500px apart |
| Monotonous cream with occasional orange | **No** — the accent is spent deliberately: one word of the H1, the primary CTA, the departure carrier, the failure clauses, one chain point and one join, the owned mark, the evidence claim, the fit mark, and the full-bleed close |
| Disconnected components | **No** — one mark, one population, followed down |
| **calm → event → calm** | **Preserved.** The hero settles, the dark band is the one altitude change, friction and the descent are still, the boundary chapter is deliberately motionless, the evidence object is the second dark beat, and the tangerine close is the arrival. |

**Result: THE RESOLVE IDENTITY IS PRESERVED. PASS.**

---

## 33. Accountability + final CTA

| Check | Result |
|---|---|
| Accountability visual | Not a document, archive, ledger, report, terminal or journal. Five not-promised lines each carrying the **open dashed mark**, against one owned statement carrying the **solid tangerine mark** — the page's ours/not-ours shape channel, restored this session |
| THE RECORD kept as a credibility system, not an art direction | Yes — the evidence claim, its limitation text (including "No confidence interval is claimed and none is available"), and two checkable links. No case study, testimonial, logo, rating or fabricated metric anywhere |
| Final tangerine surface | Full-bleed `--resolve-accent` `#FF5B04` |
| Ink text | `#141219` on tangerine (5.97:1). Never white on tangerine (3.11:1) |
| `/contact` primary | Yes — ink pill with tangerine text; `/schedule-call` is the ink-outlined secondary |
| Decisiveness | Restored: 92.8px at 1425 against the 60px Phase C first shipped, on the approved `clamp(70px,10vw,168px)` padding |
| Arrival marks | Restored: four solid and one open/dashed, the population landing one final time including the one with no trail |
| Footer collision | None from Phase C. **See §34, F10 — the Phase B footer's own CTA block follows the close. Out of Phase C scope, reported not fixed.** |
| Extra chapter restored after the close | **None by Phase C** |

**Result: PASS, with the F10 shared-chrome finding recorded.**

---

## 34. Findings

Every finding this session produced, classified. **Nine were corrected. One is a false positive that
was tested and withdrawn. Four are pre-existing shared-chrome conditions reported but not touched.**

| # | Finding | Classification | Action | Result |
|---|---|---|---|---|
| F1 | **F1 rendered one WIDE drawing at every width inside `overflow-x-auto` + `min-w-[560px]`.** At 360/390/430 the wrapper showed 324–394px of a 560px figure: **37% clipped behind a horizontal scrollbar at 390**, hiding the accountability boundary, the qualified enquiry and opportunity/revenue — the chapter's whole argument. Labels rendered at ≈7px. At 760–1080 the flat wide drawing (172px tall) stood where the approved page uses a 507–710px vertical medium composition. | **NEW PHASE C REGRESSION — material** | Ported the approved prototype's own NARROW (330×500, ≤699px) and MEDIUM (640×458, 700–1099px) drawings verbatim; kept WIDE (1000×216, ≥1100px); removed the scroll wrapper | **FIXED** |
| F2 | **Display type flattened at MEDIUM/WIDE.** Fixed Tailwind steps replaced the prototype's fluid `clamp()`: at 1425 chapter statements were 48px against 68.8px, the admission 60px against 86.4px, and the close 60px against 92.8px (−30% to −35%). Chapter padding was 96px against 128px. The page lost its changing-altitude scale rhythm and read flat. | **NEW PHASE C REGRESSION — material** | Restored the prototype's `clamp()` values for every display step, body step and chapter padding | **FIXED** |
| F3 | **Session 18C's mobile de-clutter rules were not carried across.** At ≤760 production restored the `01/02/03` stage numerals (18C: "the stage numerals repeat what the stage titles already say"), showed all three chain legend entries instead of the one 18C keeps, and rendered hero/close CTAs at content width instead of full width. | **NEW PHASE C REGRESSION — owner-approved mobile composition** | All three rules restored at the prototype's own `max-width:760px` boundary | **FIXED** |
| F4 | **The final CTA's five arrival marks were absent from the DOM** — not un-animated, absent. §20 of this document had promised "every deferred item's final content is present in the static DOM today"; for this item that was not true. The close lost the one-population journey's landing, and with it "including the one that has no trail, because that one still counts". | **NEW PHASE C REGRESSION — material** | Restored statically: four solid, one open/dashed, 24px (17px at ≤760) | **FIXED** |
| F5 | **The friction chapter's failure clauses lost their accent.** The approved copy sets the second clause of each route in `--tang-sm` bold (`.fail__t em`); production rendered all three routes in flat ink, leaving the chapter with no accent at all. | **NEW PHASE C REGRESSION** | Restored `--resolve-accent-dark` bold on each clause | **FIXED** |
| F6 | **"From the outside, all three look identical" was hidden at every width ≥640px** (`sm:hidden`). The sentence that names the friction figure's entire argument was absent at MEDIUM and WIDE. | **NEW PHASE C REGRESSION — content integrity** | Shown at every width, at the prototype's own 900px recomposition boundary (static caption below, floating label above) | **FIXED** |
| F7 | **The boundary chapter lost the page's ours/not-ours shape channel.** The five "we do not promise" lines and the owned statement carry, in the approved page, an open dashed mark and a solid tangerine mark respectively. Production carried the distinction by type and colour alone. | **NEW PHASE C REGRESSION — also a non-colour-channel loss** | Both marks restored | **FIXED** |
| F8 | **The hero's primary CTA was `--resolve-accent-deep` with white text** rather than the approved tangerine `--resolve-accent` with ink text — a visible colour change to the page's single loudest accent object. Phase A had itself measured ink-on-tangerine at 5.97:1. | **NEW PHASE C REGRESSION** | Restored to tangerine + ink | **FIXED** |
| F9 | **Heading structure: H1 → H3 jump.** The prototype sets each chapter's small uppercase label as `<h2 class="lab">`; production rendered all five as `<span>`, so the page had one `<h1>`, no `<h2>` until the very last chapter, and six `<h3>`s. Gate 10 had validated **0 heading jumps**. | **NEW PHASE C REGRESSION — accessibility** | The five chapter labels are now `<h2>`, visually identical (13.12px, `m-0`). **MEASURED after: 0 heading jumps at every width, exactly one `<h1>`.** | **FIXED** |
| F10 | **The Phase B footer renders its own dark "Ready to Make Your Marketing Measurable?" CTA block immediately after the homepage's tangerine close**, repeating the same ask in non-Resolve copy and blunting the page's ending. | **PRE-EXISTING — Phase B shared chrome** | **Not fixed.** §13 of the brief forbids modifying the shared Footer, and no Phase C change caused this. **Recommended for Phase D/E scope: the homepage close and the footer CTA are two closes competing.** | **REPORTED** |
| F11 | Header/footer logo is a raster wordmark whose mark overlaps its own type at narrow widths. | **PRE-EXISTING — Phase B** | Not fixed, not in scope | **REPORTED** |
| F12 | Shared-header breakpoint is 1024px, not the programme's 1081px. | **PRE-EXISTING — Phase B, explicitly out of scope per §5 of the brief** | Not touched | **REPORTED** |
| F13 | With JavaScript disabled the population toggle renders but is inert (the prototype hides its control without JS). The correct resolved state is shown either way and no content is lost. | **MINOR ACCEPTABLE PRODUCTION DIFFERENCE** — inherent to translating the control as a client component | Not fixed | **RECORDED** |
| F14 | Capability links render as underlined text at all widths; the prototype uses outlined pills at ≥761px and text only at ≤760px. | **MINOR ACCEPTABLE PRODUCTION DIFFERENCE** | Not fixed — one cluster of seven links, no information lost | **RECORDED** |
| F15 | The gap between the record list and the fit chapter reads as an empty list row (two rules ~100px apart). | **FALSE POSITIVE** | Rendered the prototype at the same width: **it has the same two rules at the same spacing.** Faithful | **WITHDRAWN** |
| F16 | The friction stop marks are pushed to the right rule rather than sitting at the end of each run, which could read as a variable "shortfall". | **FALSE POSITIVE** | First observed on a prototype capture taken **inside the 1100ms window during which the prototype's script deliberately holds each stop back**. Measured after full settle: the prototype's stops land at x=370 for all three routes — identical to production. The CSS default (`i.stop{margin-left:auto}`) *is* the aligned column | **WITHDRAWN** |
| F17 | The unequal 4/7/10 route mark counts could be read as quantities. | **PRE-EXISTING — UNCHANGED, and approved** | The approved prototype has exactly 4/7/10. Gate 10 passed quantity safety on it. Not a Phase C matter | **NO ACTION** |

**No finding was left unaddressed that this session was permitted to address.**

---

## 35. Corrections made

**Production correction required: YES.** Seven files, all inside the Phase C homepage set.

| File | What changed |
|---|---|
| `components/homepage/HomepageIntervention.tsx` | The three approved chain drawings (F1); 18C numerals and legend rules; approved type scale and chapter padding; `p-0 m-0 list-none` on the legend to neutralise the global `ul,ol { @apply pl-6 }` base rule that was indenting it 24px |
| `components/homepage/HomepageHero.tsx` | Approved hero padding and `clamp()` type; two-column breakpoint moved 1024 → 1060 to match the prototype; full-width CTAs at ≤760; primary CTA restored to tangerine + ink; `py-0` to neutralise the global `section { @apply py-16 }` base rule that was adding 64px above the H1 |
| `components/homepage/PopulationToggle.tsx` | Stage head restored to the approved order — 2px rule, then label and control on one baseline-aligned row, then the population |
| `components/homepage/HomepageActivity.tsx` | Approved departure padding, carrier size and statement scale |
| `components/homepage/HomepageFriction.tsx` | Failure-clause accent (F5); the "all three look identical" label at every width (F6); the prototype's 900px recomposition boundary; approved type and spacing; chapter label to `<h2>` |
| `components/homepage/HomepageAccountability.tsx` | Boundary shape marks (F7); approved display scale; record-link arrows; the limitation panel moved onto `--resolve-ink-deep` as in the prototype; three chapter labels to `<h2>` |
| `components/homepage/HomepageFinalCTA.tsx` | Arrival marks (F4); approved close padding and scale |

**Not touched:** `app/page.tsx` · `components/layout/Header.tsx` · `components/layout/Footer.tsx` ·
`components/layout/Container.tsx` · `components/layout/Section.tsx` · `components/ui/button.tsx` ·
`app/globals.css` · `app/layout.tsx` · any other route · any form · any analytics call · robots ·
sitemap · both prototypes · all governance files · `README.md`.

**Nothing was redesigned.** Every corrected value is a value read out of
`docs/26-resolve-homepage/prototype/index.html`. **No motion was implemented.** No removed chapter
was restored. No approved messaging was changed.

**A note on the breakpoint syntax, because it caused a real defect mid-session.** Tailwind v4's
`max-[760px]:` compiles to `@media (width < 760px)`, which **excludes** 760 — so at exactly 760px the
mobile rules did not fire, while the prototype's `@media(max-width:760px)` does include it. Caught by
rendering 760, and corrected to `max-[761px]:` throughout, which is the exact equivalent for integer
widths. **Re-verified at 760 (mobile rules on) and 761 (mobile rules off).**

**Revalidation after correction:** all nine widths re-rendered and re-inspected; the 390 / 860 / 1425
prototype comparisons re-run; both boundary pairs re-checked; the no-JS spot check re-run; both
builds re-run.

---

## 36. No-JS rendered spot check

Rendered with **zero** scripts in the document (52 removed, 0 remaining — verified in the DOM as
`document.scripts.length === 0`), not merely fetched with `curl`.

| Width | Result |
|---|---|
| **390** | Blank hero: **no**. Population hidden: **no** — the resolved four-row state renders. Chapters visible: **all six**. Figures understandable: **yes** — the full NARROW chain including the accountability boundary. CTA visible: **yes**. Layout intentional: **yes**. Horizontal overflow **0px**. Page height 8,342px against 8,324px with JavaScript — a 0.2% difference. |
| **1425** | Same, with the WIDE chain, all five arrival marks present, **0px** overflow, page height 8,359px. |

**Result: PASS.**

---

## 37. Accessibility visual spot check

| Check | 390 | 1425 |
|---|---|---|
| Heading hierarchy sensible and visible | 1 `<h1>`, **0 jumps** (was H1→H3 before F9) | 1 `<h1>`, **0 jumps** |
| Text too small from the translation | No — minimum rendered HTML text **12.48px**, which is the approved `.fail__ruleT` at `.78rem`; minimum rendered SVG label **12.9px**, matching the prototype's own 12–13px at the same width | No |
| Controls/links visually distinguishable | Yes — filled pill, outlined pill, and underlined proof links are three distinct objects | Yes |
| Colour-dependent states understandable | Yes — every attributed/unattributed and ours/not-ours state is carried by **shape** (solid square vs. open dashed square) as well as colour, and F7 restored the last place where that was true of the prototype but not of production | Yes |
| Target sizes serviceable | **0** of 20 interactive targets under 40×40 | **0** under 40×40 |
| Visible focus indication | The Phase A global rule `:focus-visible { outline: 3px solid var(--resolve-ink); outline-offset: 3px }` is present and **unmodified**, with a light override on dark surfaces. **MEASURED: no homepage control suppresses it** — 0 occurrences of `outline-none` / `focus:outline` across `app/page.tsx` and `components/homepage/*.tsx`. **NOT VERIFIED: a literal keyboard-driven focus ring could not be rendered**, because the hidden Browser pane refuses synthetic key and pointer input and a scripted `.focus()` does not satisfy Chrome's `:focus-visible` heuristic. This is the same limitation Sessions 17B and 25 recorded, and it is stated rather than claimed. | Same |

The Phase B mobile-navigation audit was **not** reopened; no Phase C regression was visible in it.

**Result: PASS, with the keyboard focus-ring render recorded as NOT VERIFIED.**

---

## 38. Builds

Production code changed, so both builds were re-run **after** the final correction.

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Exit code | **0** | **0** |
| Route rows | 24 (unchanged) | 24 (unchanged) |
| Static pages | 23/23 | 23/23 |
| Constraints | none | `--max-old-space-size=512`, `cpus: 1` — **not raised** |
| Warnings | pre-existing lockfile warning only | pre-existing lockfile warning only |

`next-env.d.ts` and `tsconfig.tsbuildinfo` picked up the usual generated churn and were restored with
`git restore` before staging. `npx tsc --noEmit` reports **no errors in any Phase C file** (the
repository's pre-existing errors in other routes are unchanged and untouched).

---

## 39. What a worker may claim from Session 25B

**Claimed:** all nine required widths **visually inspected as rendered images**, full page, header
through footer · direct rendered comparison against the approved prototype at 390, 860 and 1425, each
classified FAITHFUL · 0px horizontal overflow at all nine widths · exactly one chain drawing displayed
per width, never clipped · the 760/761 and 1080/1081 pairs checked and acceptable · the owner-approved
mobile composition preserved with no desktop complexity restored · the hero complete without motion ·
F1/F2/F3 perceptually non-quantitative · Resolve identity preserved · nine material Phase C
regressions found and corrected, two false positives tested and withdrawn · rendered no-JS validation
with zero scripts in the document · 0 heading jumps, 0 undersized targets · both builds pass.

**Not claimed:** a pixel diff · a keyboard-driven focus-ring render · screen-reader, real-device,
cross-browser, print or 200%-resize testing · performance or Core Web Vitals · any user testing ·
anything about the live site · that any gate is passed — **gate-passing is reserved to the
orchestrator.**
