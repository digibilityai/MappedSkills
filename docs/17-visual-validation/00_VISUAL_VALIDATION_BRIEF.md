# Visual Validation Brief — Session 14 — PROPOSED

**Session:** 14 — Bounded visual validation of the approved creative territory
**Date:** 2026-09-02 · **Branch:** `test_branch` · **HEAD at start:** `a68dfaec673e2698653296b531bbd133ccb10d57`
**Status:** **PROPOSED.** Nothing in this directory is approved. **Claude does not pass gates.**

**Upstream authority (unchanged, not reopened):** business strategy (`DEC-005`, `DEC-006`) ·
IA (`DEC-010`) · CRO (`DEC-011`) · content architecture (`DEC-012`) · messaging (`DEC-013`) ·
page copy (`DEC-014`) · creative direction (`DEC-015`) · **UX architecture, Gate 9B PASSED
(`DEC-016`)**.

---

## 1. Purpose

Answer one question:

> **Can the approved creative territory — THE RECORD — express the approved MappedSkills
> strategy and UX visually?**

The governing creative principle being tested is:

> **Emphasis is commercial. Presence is evidential.**

The visual result must make MappedSkills feel like **a modern commercial marketing firm that
finds what is broken, fixes it, measures what changed, and keeps a credible working record of
the evidence.**

## 2. What this session is not

It is not a redesign, not a design-system production session, not production implementation,
not a component-library build, and not a page-by-page high-fidelity exercise. It carries no
permission to redesign the approved UX, rewrite approved copy, or reopen strategy.

## 3. Constraints accepted before any work began

| Constraint | Source |
|---|---|
| The approved UX architecture is binding and Gate 9B is not reopened | `DEC-016` |
| The approved H1 and all approved copy are used verbatim, unaltered | `DEC-014` |
| The approved creative territory is fixed: THE RECORD, **a working record, not an archive** | `DEC-015`, `16` §7 |
| The 32 design anti-patterns (A1–A23, B1–B32) are binding | `14_DESIGN_ANTI_PATTERNS.md` |
| The apparatus visibility table by context is binding | `17_ARGUMENT_APPARATUS_HIERARCHY.md` §3 |
| The F1 usage taxonomy is binding: **D — NONE is the default** | `22_F1_USAGE_TAXONOMY.md` |
| `F17` must not be designed, sketched, prototyped or placeholdered | `19` §5, B4 |
| No invented metric, proportion, result, testimonial, logo or photograph | Project Rule 15, A10, B15 |
| No production page, component, style, asset or configuration may change | Session 14 brief §15, §20 |
| Nothing is staged, committed or pushed | Session 14 brief §21 |

## 4. Anti-goals — what the result must not feel like

An academic publication · a research institute · an archive · a newspaper · a SaaS company ·
a dashboard product · a generic digital agency · an SEO agency · an AI/GEO agency · a corporate
consultancy.

And, at the level of specific devices: academic/archive aesthetic · newspaper aesthetic ·
research-paper aesthetic · generic agency gradients · SaaS dashboards · fake dashboards · fake
metrics · fake statistics · logo walls · giant unsupported numbers · repeated bento-card
layouts · card grids everywhere · icon-everything · oversized empty hero sections · generic
funnels · glowing AI brains · robots · purple AI gradients · neon technology clichés ·
decorative data visualisation · gratuitous animation · glassmorphism · excessive rounded cards ·
design sophistication that reduces commercial clarity.

## 5. The four validation slices

**Exactly four. The full site is not designed.**

| # | Slice | What it must prove | Why it was chosen |
|---|---|---|---|
| **1** | **Homepage hero** | Commercial confidence, clarity, modernity and distinctiveness with **zero evidence apparatus above the fold** and no visual gimmick | It is the screen where the territory is most likely to fail in the direction of emptiness, and the screen the approved copy identifies as carrying its own bravado risk |
| **2** | **Evidence apparatus** | That evidence can be legible, credible and commercially useful without hover, without colour, without tiny type — and without becoming a research paper or a dashboard | It is the territory's differentiator **and** its principal failure mode, which are the same feature |
| **3** | **F1 — the run** | That the figure can be distinctive and explanatory while staying subordinate to commercial meaning — and without becoming a funnel, a workflow, a pipeline, a process infographic or a brand device | It is the site's single most important explanatory asset and the one with the most named ways to go wrong |
| **4** | **`/seo` commercial section** | That the territory survives density: a commercially important argument surrounded by a horizon, a limit, a partial figure, measurement limits and provenance, all at once | Deliberately the hardest slice. If the territory survives here, that is meaningful evidence it can scale |

**Section pair chosen for slice 4:** `/seo` **Move 5** (the boundary, elevated, carrying the
12-month-plus horizon) + **Move 6** (how it is measured, carrying F1 PARTIAL, measurement limits
adjacent and open, and Move 7 compressed inside it as expandable evidence). This is the connected
pair `05_COMMERCIAL_PAGE_UX.md` §4.1 identifies as the page's most important material.

## 6. Responsive requirement

Each slice is demonstrated at **WIDE** and **NARROW**. MEDIUM is not given a separate polished
artboard, but it **was tested in the browser**, because MEDIUM is the class at which the
apparatus margin disappears — the single biggest responsive risk named in the approved
direction. Findings are recorded in `04_VISUAL_PROOFS.md` §6.

**No numeric breakpoint is proposed.** Breakpoint values remain a Gate 10 output.

## 7. Acceptance criteria

The test is not *"does this look nice?"*. It is:

> **Does the visual system make the approved commercial argument clearer, more credible and more
> distinctive?**

| # | Criterion | How it is tested |
|---|---|---|
| **AC1** | The standalone test — hide every apparatus element; the page must still sell | `05_VISUAL_ANTI_PATTERN_AUDIT.md` §3 |
| **AC2** | The first-fixation test — on no screen does the eye land first on a date, sample, status mark or method note | `06_GATE10_DEFERRED_F2_F3_RETEST.md` §2 |
| **AC3** | The proportion test — gaps and limits do not out-weigh what the firm does and is accountable for | `06_…_RETEST.md` §3 |
| **AC4** | The swap test — replace every word with a competitor's; the design must stop working | `05_…_AUDIT.md` §4 |
| **AC5** | The empty-container test — no container could hold proof MappedSkills does not have | `05_…_AUDIT.md` §5 |
| **AC6** | The greyscale test — no status, state or figure becomes ambiguous, especially measured zero versus not testable | Run in the browser; `04_VISUAL_PROOFS.md` §7 |
| **AC7** | The screenshot test — every figure carries its information with motion disabled | Trivially satisfied: there is no motion |
| **AC8** | The "how do you know that?" test — every number and figure has a visible answer in the apparatus | `05_…_AUDIT.md` §6 |
| **AC9** | Usability is not traded for sophistication — contrast, focus, keyboard, no hover-only meaning, no colour-only meaning, readable body copy | `04_VISUAL_PROOFS.md` §7 |
| **AC10** | Nothing is invented, and no approved artefact is altered | `07_VISUAL_VALIDATION_ASSESSMENT.md` §5 |

## 8. Critical failure conditions

The result is **C — NOT VISUALLY VALIDATED** if the selected direction needs any of the
following to feel distinctive: evidence above the homepage fold · fake metrics · invented proof ·
giant statistics · dashboards · repeated cards · repeated F1 · generic gradients · AI imagery ·
stock-agency photography · excessive motion · tiny evidence typography · hidden limitations ·
weakened commercial copy · changed approved UX · added content merely to make the layout work.

Also **C** if THE RECORD consistently reads more like a research organisation, an archive, a
publication or a SaaS product than a commercially credible marketing firm.

## 9. Output of this session

| Artefact | Contents |
|---|---|
| `00_VISUAL_VALIDATION_BRIEF.md` *(this file)* | Purpose, constraints, territory, anti-goals, the four slices, acceptance criteria |
| `01_DIRECTION_EXPLORATIONS.md` | Three materially different interpretations of THE RECORD |
| `02_DIRECTION_DECISION.md` | The recommendation, the reasoning, and what is rejected and why |
| `03_PROVISIONAL_VISUAL_LANGUAGE.md` | Only what the proof needs: type, colour, surfaces, rules, spacing, evidence, annotations, figures, photography, iconography, motion |
| `04_VISUAL_PROOFS.md` | The four proofs, WIDE and NARROW, with responsive and accessibility findings |
| `05_VISUAL_ANTI_PATTERN_AUDIT.md` | The selected direction tested against every named drift |
| `06_GATE10_DEFERRED_F2_F3_RETEST.md` | The two perceptual tests deferred from Gate 9B, re-run against rendered screens |
| `07_VISUAL_VALIDATION_ASSESSMENT.md` | The conclusion: A, B or C |
| `prototype/` | The rendered proof. Static HTML and one stylesheet. Self-contained |
