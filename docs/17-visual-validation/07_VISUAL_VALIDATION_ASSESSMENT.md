# Final Visual Validation Assessment — Session 14 — PROPOSED

**Session:** 14 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Claude does not pass gates and does not self-approve Gate 10.**

> **SUPERSEDED IN PART — 2026-09-02, Session 14A.** The verdict below (**B**) was closed out by
> the narrow closure pass: the register-label defect is resolved (`08_REGISTER_LABEL_RULE.md`),
> "visual weight" is defined (`09_VISUAL_WEIGHT_RUBRIC.md`), a complete `/seo` page was rendered
> (`10_COMPLETE_PAGE_PROOF.md`), and **F2 and F3 both PASS at WIDE and NARROW**. The current
> verdict is **A — VISUAL TERRITORY READY FOR DESIGN-SYSTEM DEVELOPMENT**, in
> `11_SESSION_14A_CLOSURE_ASSESSMENT.md`, subject to its §5. **Everything else in this document
> stands and is not rewritten.**

---

## 1. The question, and the answer

> **Can the approved creative territory — THE RECORD — express the approved MappedSkills
> strategy and UX visually?**

> ### **B — PROMISING, NARROW CORRECTIONS REQUIRED.**

**Yes, it can — and two specific, named things must be corrected before the visual system is
allowed to harden.** Neither correction requires a new direction, a new territory, or reopening
any approved decision.

---

## 2. What the proof established

| # | Finding | Evidence |
|---|---|---|
| **1** | **The commercial argument leads.** On every dense screen the heaviest element is a commercial statement, by a large margin | `06` §2 — measured, not judged |
| **2** | **Evidence is credible without being loud.** The apparatus is at the body minimum, in a different register, at **8.77:1 (AAA)** — never smaller-grey-italic. It is present everywhere and dominant nowhere | `03` §1.3, `04` §7.1 |
| **3** | **Nothing depends on the apparatus.** All four slices pass the standalone test. The apparatus is pure addition | `05` §3 |
| **4** | **The honesty rules are drawable, and were drawn.** Measured zero distinct from not-testable **in greyscale, without colour, and with no position on any scale** · unattributed drawn as a real arrival · the boundary drawn as an edge · limits open at every width, in print, and with script disabled | `04` §2, §7.5 |
| **5** | **F1 is distinctive and cannot become a funnel.** Constant stroke, identical nodes, equal spacing, no arrowheads, no per-stage colour, no numbering — enforced by the stylesheet, not by discipline | `04` §3.4 |
| **6** | **The territory survives density.** The hardest slice reads as a competent supplier being precise, not as a research note | `04` §4 |
| **7** | **The proof needed no prohibited device to be distinctive.** No evidence above the fold, no fake metric, no invented proof, no giant statistic, no dashboard, no repeated card, no repeated F1, no gradient, no AI imagery, no stock photography, no motion, no tiny evidence type, no hidden limit, no weakened copy, no changed UX, and no content added to make a layout work | `05`, and the critical-failure list in `00` §8 |
| **8** | **Accessibility is a property of the direction, not a remediation.** Focus ring and annotation tie are the same mark; every status is shape + word; nothing is hover-only; nothing is colour-only; **there is no script that could fail** | `04` §7 |

**On the brief's own quality bar** — *"these people understand how demand turns into enquiries,
they can show what they did, and they appear disciplined about what they can and cannot prove"* —
the proof gets there without writing the sentence. The hero states a standard rather than a
claim; the run shows the mechanism and marks where work is done; the boundary, the dashed gap and
the unattached arrival show the discipline.

---

## 3. Why it is B and not A

Two corrections, both narrow, both named, neither fatal.

### 3.1 Correction 1 — the register label can become the first fixation on a sparse screen
**F2 passes on every dense screen and fails on sparse ones**, because in a band whose only
structured element is an apparatus-register label, that label is the heaviest thing by default.

**Proposed rule:** *a register label never appears without an argument-register element of
greater weight in the same region.* A region too short to carry a heading inherits the preceding
region's label. Costs nothing, preserves the scan layer, checkable at review. `06` §2.4.

### 3.2 Correction 2 — proportion is not decidable yet, and the margin is thin
**F3 is NOT PASSED.** On the limit-heaviest section on the site, capability wins on
emphasis-weighted measure by **51.9% to 48.1%** and loses on raw rendered area by **37.5% to
62.5%**.

Three things are required before it can be passed: re-run at **page** level rather than section
level; resolve whether the boundary should hold the section's only differentiated surface; and —
most importantly — **the programme must define what "visual weight" means**, because the two
reasonable measures give opposite answers and a future session could pass or fail identical
screens by choosing one. `06` §3.4.

### 3.3 Why these do not make it C
Neither correction requires a prohibited device, a new direction, or any change to approved
strategy, copy or UX. The direction's distinctiveness does not depend on resolving either — it
already reads as a commercial firm on the rendered screens. **C is reserved for a direction that
needs something forbidden in order to work, and this one does not.**

---

## 4. What was NOT validated, and must not be read as validated

1. **The `changed` state pair (F7, the intervention record).** Blocked until the own-site fixes
   ship; rendering an "after" condition would have fabricated it. **The territory's strongest
   evidence of intervention is visually untested.** `04` §2.4.
2. **Cumulative drift across a site.** Card-drift, banding-drift and apparatus accumulation are
   cumulative failures. Four slices show the vocabulary does not *force* them; they cannot show
   their absence across twenty-two routes. `05` §8.
3. **F3 at page level**, and F2 with real readers. **No user testing occurred and none is
   claimed.**
4. **The homepage first screen with five elements.** The dated checkable item is a real future
   occupant and a five-element opening is a different composition.
5. **Print output.** A print stylesheet is implemented; **no print output was produced or
   inspected**.
6. **F3 (the four AI layers), F2 (the four causes), F4 (attribution) and every Tier-2 figure.**
   Out of scope. F3 additionally depends on the system-enumeration item in `04` §8.2.
7. **Dark mode, the type scale, the spacing scale, the grid, components, states, breakpoints and
   the design system.** Deliberately not produced.
8. **Any production behaviour.** Nothing in the application was changed or evaluated.

---

## 5. Governance statement

- **No approved artefact was modified.** `DECISION_LOG.md`, `QUALITY_GATES.md`, all of
  `docs/16-ux/`, all of `docs/11-creative/`, all approved messaging and copy, the strategy and
  the IA are unchanged.
- **No production file was created or modified.** `app/`, `components/`, `styles/`, `public/`,
  `lib/`, `hooks/`, `scripts/` and every configuration file are untouched. The Session 14
  prototype is self-contained in `docs/17-visual-validation/prototype/` and is imported by
  nothing.
- **`README.md` remains untouched and untracked.**
- **Nothing was staged, committed or pushed.**
- **Nothing was invented.** Every claim, limit, date, sample and finding rendered in the proof is
  approved copy or first-party measurement already in this repository.
- **`F17` was not designed, sketched, prototyped or placeholdered**, and remains BLOCKED.
- **Two items are reported rather than fixed:** the hero action-weighting wording difference
  between the Session 14 brief and the approved wireframe, and the AI-system enumeration
  precision item. Both in `04` §8.

---

## 6. Recommended next actions — for the orchestrator, not taken here

1. **Rule on the two reported items** (`04` §8.1, §8.2).
2. **Define "visual weight"** for the proportion rule. This blocks F3 and will block it again at
   Gate 10 if left open.
3. **Decide whether Direction 2 proceeds to Gate 10**, or whether a further bounded proof is
   wanted first — for example a complete page rather than a section pair, which is the only
   artefact that can settle F3.
4. **Do not treat this session as approving the design system.** It selected a direction for a
   bounded proof and tested it. Whether it becomes the sitewide system is a separate decision, on
   separate evidence, at a separate gate.

---

## 7. Verdict

> ### **B — PROMISING, NARROW CORRECTIONS REQUIRED**

**This is not permission to approve the broader design system, and Gate 10 is not passed,
approached or implied.**
