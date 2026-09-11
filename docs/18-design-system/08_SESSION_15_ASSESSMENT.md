# Session 15 Assessment — Design-System Foundation + Complete Homepage — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**HEAD at start and unchanged:** `a68dfaec673e2698653296b531bbd133ccb10d57`
**Status:** **PROPOSED. Claude does not pass gates and does not approve the design system.**
**Gate 10 is not passed, not approached and not implied.**

---

## 1. What this session was asked for, and what exists

| Asked for | Delivered |
|---|---|
| A production-capable **design-system foundation** | `01_DESIGN_SYSTEM_FOUNDATION.md` + `prototype/foundation.css` — typography, colour, spacing, grid, rules, register labels, actions, evidence apparatus, figures, navigation, inputs, footer, motion |
| The **complete homepage**, designed, not just the hero | `prototype/homepage.html` — blocks 1–8 in the approved order, header and footer, approved copy verbatim |
| Rendered at **WIDE** and **NARROW** | Rendered, inspected and measured at **1400 × 900** and **390 × 844**; `prototype/index.html` shows both together |
| **MEDIUM** inspected for structural breakage | 1024 and 768 rendered and inspected. **No breakage; zero elements exceed the viewport at either width** |
| **F2 and F3 re-run** against the frozen rubric | `04_F2_F3_HOMEPAGE_RETEST.md`. **F2 PASS at both widths. F3 PASS at both widths** |
| **Drift and repetition audit** | `05_REPETITION_AND_DRIFT_AUDIT.md` — full device census taken from the rendered page |
| **Accessibility audit** | `06_ACCESSIBILITY_AUDIT.md` — contrast, focus, keyboard and greyscale measured; untested items listed |
| **Open design risks** | `07_OPEN_DESIGN_RISKS.md` — twelve, ordered by consequence |

---

## 2. Results

| Test | WIDE | NARROW |
|---|---|---|
| **F2 — first fixation** | **PASS** — 9 of 9 bands emphasis-led by COMMERCIAL | **PASS** — 12 of 13 COMMERCIAL, 1 LIMIT, **0 EVIDENTIAL** |
| **F3 — proportion / weight** | **PASS** — all three verdict conditions hold | **PASS** — all three verdict conditions hold |
| **RL-5 — no register label is ever the heaviest** | **HOLDS** | **HOLDS** |
| **Horizontal body overflow** | **none** at 1400, 1024, 768, 390 | |
| **Drift** | **No material drift.** Primary perception is a modern commercial marketing firm | |
| **Repetition** | **No major problem.** Every budget met, none exceeded | |
| **Accessibility blockers** | **None found**, bounded by the untested list | |

**The rubric was applied unchanged.** No threshold, class boundary, channel order or verdict
condition was modified, and the rubric file is unmodified on disk. **The register-label rule was
likewise applied as written and was not weakened to accommodate this page.**

---

## 3. Nine defects were found by rendering the page and were fixed

Recorded in full because a design report with no defects has usually not been looked at.

| # | Defect | Fix |
|---|---|---|
| 1 | **At NARROW the header's primary control pushed the menu control off-screen**, making every destination on the site unreachable | The narrow bar is two rows. Neither the label nor the menu was shortened or hidden |
| 2 | The **second hero action fell below the NARROW fold** | Responsive lede, reduced hero padding at narrow. Measured after: 738px of 844 |
| 3 | **Section headings sat directly on their body text**, and a bold statement under a bold heading read as one four-line heading | 24px beneath every heading, as a system rule |
| 4 | **The ground-change band stopped 124px short of the viewport edge**, reading as a rendering bug | Bands bleed to the viewport; their content stays on the spine; the body still never scrolls horizontally |
| 5 | **The routing list carried four hairlines with no meaning** — device proliferation, this direction's named failure | Removed. The page carries 4 rules, not 8 |
| 6–8 | **Four figure-label collisions** at WIDE and NARROW, and a state-figure arrival stroke that lay parallel to the chain and read as a second chain | Four label layouts re-cut, both arrival strokes re-angled, re-rendered and re-inspected |
| 9 | A **footer legal line** was drawing content in the blocked entity block's space | Removed |

**One deliberate change to the validated type scale.** The H1 cap was raised from 76px to 88px
after rendering: at 76px the H1 occupied 69% of the working width and the first screen read as
**empty rather than confident**, which is the direction's own most-cited failure mode. Nothing else
in the scale moved.

---

## 4. What is now stable enough to extend to other pages

Stable means: **exercised on a complete page, measured, and unchanged by that exercise** — or
changed once and re-measured.

- The **two-register system** and the 16px apparatus floor.
- The **type scale**, including the corrected H1 cap and the responsive lede.
- The **colour tokens** and their measured contrasts, including `--ink-recess` as stroke-only.
- The **ten-step spacing scale**. Every value in the stylesheet resolves to it.
- The **four grid regions**, the protected 66ch measure, and the apparatus margin's collapse rule.
- The **four rule kinds** and their budgets, and the rule that ground changes bleed.
- The **register-label rule**, now proved at its full two-label budget.
- The **three action kinds** and their states, including the header's underlined primary.
- The **evidence apparatus**: provenance line, tie, disclosure naming, always-open limits, and the
  treatment of a measured zero.
- The **figure rules**: no taper, no per-stage colour, real text labels, swap-not-scale, expandable
  tabular equivalent.
- The **navigation model** at both widths, including the two-control rule and `Escape` behaviour.
- **Zero motion, zero icons, zero cards, zero photography** — proved sufficient at page scale.

## 5. What is still provisional

- **Typefaces.** Archivo and IBM Plex Mono remain unresolved on licensing and performance.
- **The three container thresholds** (900 / 1000 / 1180). Derived, used twice, not doctrine.
- **The apparatus margin**, which has no budget of its own yet.
- **Six of the eight status marks**, undrawn — deliberately, until a page needs them.
- **Form and input treatment.** Foundational only; no form has been designed.
- **The footer entity block**, blocked and undrawn.
- **Dark mode, icon set, print stylesheet, performance budget, component APIs, page templates for
  the other 21 routes** — none started.
- **Cumulative behaviour across 22 routes**, which two pages cannot establish.

---

## 6. Upstream issues found — REPORTED, NOT FIXED

### 6.1 The homepage's secondary PROOF CTA and the four-element first screen contradict each other
`docs/09-content-pages/copy/homepage.md` lists, at hero level, **"# Secondary CTA — Role: PROOF —
See the method, including what we can't attribute → /how-it-works"**. `04_HOMEPAGE_UX.md` §1 (as
revised) and `31_WIREFRAME_MASTER_HOMEPAGE.md` both specify **four first-screen elements and no
fifth**, and `04` §2 nonetheless still lists "Check — the PROOF secondary CTA" as available from
the first screen.

**What this session did, and why.** The first screen was built with **four elements and no third
CTA**, per the wireframe and per the Session 15 brief. The PROOF offer is not lost: it appears as
*"Read the method"* at block 3 and *"See what can and cannot be attributed"* at block 4, **both of
which the approved copy's own supporting elements require**. **This is a reading, not a fix, and the
contradiction remains open in the upstream documents.**

### 6.2 The AI-baseline enumeration item is now partly reconcilable by inspection
Session 14 reported an open precision item: approved copy says *"four AI assistants"*, while the
research says 28 runs across five surfaces and *"six named systems"*.

**Inspecting `AI_VISIBILITY_BASELINE.md` §4.1 reconciles the count:** Google AI Mode 19 + ChatGPT 2
+ Perplexity 3 + Gemini 1 + Google AI Overviews 3 = **28**. The four *assistants* are ChatGPT,
Perplexity, Gemini and Google; Google is measured across **two surfaces**; the *six named systems*
figure adds Claude and Grok, both **NOT TESTABLE**.

**What this session did.** The apparatus on the homepage now reads *"28 unbranded runs, four
assistants, five surfaces"* and names the surfaces, which is accurate to the research and
consistent with the approved copy. **The wording difference in the approved copy is not changed and
the upstream item is not closed.**

### 6.3 An arithmetic inconsistency in `AI_STRATEGIC_VALIDATION.md`
Line 26 states **"39 runs total: 28 unbranded, 8 MappedSkills-branded, 2 competitor-branded"**.
Those three figures sum to **38**. Nothing on the homepage depends on the total, and **it was not
changed.** Reported so it is corrected at source rather than propagated into a published page.

---

## 7. Scope discipline

**No production file was created, modified or read for content.** Nothing in `app/`, `components/`,
`styles/`, `hooks/`, `lib/`, `public/`, `scripts/`, `server.cjs`, `next.config.mjs` or any config
was touched. The prototype is self-contained and imported by nothing.

**No approved artefact was altered.** `DECISION_LOG.md`, `QUALITY_GATES.md`, all of `docs/16-ux/`,
all of `docs/11-creative/`, all approved messaging and all approved copy are unchanged.
**`docs/17-visual-validation/` is unchanged** — the Session 14/14A stylesheet, the register-label
rule and the visual-weight rubric were all read and none was modified.

**Nothing was invented.** Every claim, limit, date, sample, system name and finding rendered on the
page is approved copy or first-party measurement already in this repository. **No photography, no
metric, no proportion, no testimonial, no logo, no client result and no placeholder appears
anywhere.** Six blocked slots render nothing at all.

**No page other than the homepage was designed.** `F17` remains BLOCKED and was not designed,
sketched, prototyped or placeholdered.

**Nothing was staged, committed or pushed. `README.md` remains untouched and untracked.**

---

## 8. Verdict

Assessed against the brief's own conditions for A:

| Condition | Met? |
|---|---|
| An actual complete homepage rendered | **Yes** — blocks 1–8, header, footer, viewable in a browser |
| WIDE successful | **Yes** — measured and inspected at 1400 × 900 |
| NARROW successful | **Yes** — measured and inspected at 390 × 844, after two fold defects were fixed |
| F2 PASS | **Yes, at both widths** |
| F3 PASS | **Yes, at both widths**, against the unmodified rubric |
| No material THE RECORD drift | **Yes** — primary perception is a modern commercial marketing firm |
| No major repetition problem | **Yes** — every budget met, none exceeded, two devices removed |
| No accessibility blocker | **Yes**, bounded by the untested list in `06` §8 |
| Foundation coherent enough to extend | **Yes**, with twelve named risks — R1 and R2 being the ones that would most change the next page |

> ### **A — HOMEPAGE DESIGN READY FOR ORCHESTRATOR REVIEW**

**This does not approve the full website, does not pass Gate 10, and does not make `/` publication
ready** — the route remains PARTIALLY BLOCKED on three owner inputs, one technical prerequisite and
the production-claims decision, exactly as before this session.
