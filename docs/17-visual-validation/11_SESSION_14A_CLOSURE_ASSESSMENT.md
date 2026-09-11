# Session 14A — Narrow Visual Closure Assessment — PROPOSED

**Session:** 14A · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Claude does not pass gates and does not approve the design system.**
**Supersedes the verdict in** `07_VISUAL_VALIDATION_ASSESSMENT.md` **(B — promising, narrow
corrections required). Everything else in `07` stands.**

---

## 1. The two issues this pass existed to close

| # | Session 14 issue | Session 14A outcome |
|---|---|---|
| **1** | **Register labels became the heaviest element on sparse screens** | **RESOLVED.** A five-part binding rule (`08_REGISTER_LABEL_RULE.md`) was defined from the defect's mechanism, applied, and verified on a complete page: **one label on the whole page, never the heaviest element in any band, at either width** |
| **2** | **F3 was not decidable — two reasonable measures of visual weight disagreed** | **RESOLVED.** A programme-level rubric (`09_VISUAL_WEIGHT_RUBRIC.md`) separates **structural area** from **perceptual emphasis**, establishes *emphasis governs, area informs*, and supplies a decision procedure with **no numeric pass thresholds**. Written and saved **before** the page was built |

### 1.1 The ordering discipline, verifiable
`08` (14:23:02) and `09` (14:23:45) were written to disk **before** `prototype/05-seo-complete.html`
(14:25:54). No threshold, class boundary or verdict condition was chosen after seeing a result.
File timestamps are the evidence.

---

## 2. The correction that had to be made to the direction's own case

`02_DIRECTION_DECISION.md` §2.3 gave *"it buys a scan layer without spending a prohibited device"*
as one of four reasons Direction 2 was selected, and named the register label as that scan layer.

**Under RL-4 the label appears at most twice per page. It cannot be the scan layer, and that
selection reason was partly wrong.**

Rendering a complete page shows what actually carries scannability: **the rationed hairline rules,
the verb-led argument-register headings, and the large jumps in the type scale.** The register
label carries something narrower and still worth having — epistemic orientation at the one place
on the page where a buyer's confidence is decided.

**The direction still holds on its other three reasons** — it is the only one of the three with a
visual vocabulary for action; its evidence device is width-invariant; its failure modes are
countable rather than perceptual, which is exactly what let this pass resolve them. **The
comparison against Directions 1 and 3 was not re-run, and this document does not claim it was.**

---

## 3. Results

### 3.1 F2 — first fixation

> ### **PASS — at both widths.**

**Complete `/seo` WIDE (1400×900), six assessable bands:** the heaviest element is
**COMMERCIAL in 5, LIMIT in 1, EVIDENTIAL in 0.**
**Complete `/seo` NARROW (390×844), nine assessable bands:** **COMMERCIAL in 8, LIMIT in 1,
EVIDENTIAL in 0.**

**On no band, at either width, does the eye land first on a date, a sample, a status mark, a
method note or a register label.** The page's one register label sits beneath a hairline rule and
above a heading two-thirds larger than it, and is dominated in its own band at both widths.

**The Session 14 verdict was not inherited.** It was re-run on new screens, and the sparse-band
failure it recorded does not recur — because RL-1 makes the configuration that produced it
impossible.

### 3.2 F3 — visual proportion / weight

> ### **PASS — at both widths, by the rubric fixed in advance, with the margin stated.**

| Condition (`09` §7) | WIDE | NARROW |
|---|---|---|
| 1 — no band emphasis-dominated by an EVIDENTIAL object | **Met** (0 of 6) | **Met** (0 of 9) |
| 2 — COMMERCIAL dominates more bands than LIMIT + EVIDENTIAL combined | **Met** (5 vs 1) | **Met** (8 vs 1) |
| 3 — no contiguous run of 2+ bands led by LIMIT/EVIDENTIAL on **both** axes | **Met** (band 2 alone) | **Met** (band 3 alone) |

**The margin, stated rather than smoothed:** at NARROW, bands 3 and 4 are roughly 1.7 mobile
screens in which boundary prose leads the area. Band 3 leads on both axes; band 4 leads on area
only, because a commercial heading governs its emphasis. **It is a one-band margin.**

It passes on the merits as well as on the rule: across nine narrow bands, limit material dominates
emphasis once and leads area twice, so cumulative limit weight plainly does not exceed capability
— which is what **B32** asks. And the concentration sits inside the one region `05` §4.1 calls
*"the single most important thing on this page for qualification."* **A buyer spending two mobile
screens on the horizon is the approved intent, not a design failure.**

**The design has no further lever here.** The copy is approved and may not be shortened by a
designer; the second permitted ground change is already spent on the action region.

### 3.3 Commercial versus evidential hierarchy

> **Commercial governs. Evidential is present throughout and governs nothing.**

The single clearest measurement on the page is **NARROW band 5**: apparatus holds **53% of the
band's area** — the highest anywhere — while a commercial statement governs the screen.
*"Emphasis is commercial. Presence is evidential"* is not asserted here; it is measured.

### 3.4 Drift test

> ### **1 — a modern commercial marketing firm.**

| Reading | Verdict |
|---|---|
| **1 — modern commercial marketing firm** | **Yes.** The page opens on a capability and a standard, states what the work costs the buyer if it is wrong, sets out scope, is precise about a horizon it will not soften, shows how it will be measured, answers three objections and asks for the enquiry |
| 2 — research publication | **No.** 4 hairline rules, 1 register label, 1 figure, 2 closed disclosures across nine mobile screens. No marginalia, no footnotes, no citation apparatus in the reading flow, no abstract, no method section |
| 3 — archive | **No.** No paper texture, no letterpress, no masthead, no column rules, no typewriter face, no folios, no file or dossier metaphor, no serif, no cream |
| 4 — SaaS product | **No.** Zero cards, zero icons, zero fills except the one action object, zero elevation, zero tiles, no chart furniture, no product shell |
| 5 — consultancy | **No.** No framework, no branded method name, no maturity model, no numbered stages, no chevrons |
| 6 — generic digital agency | **No.** No gradient, no hero image, no logo wall, no counter, no testimonial, no icon grid. **And it fails the swap test**: a competitor's copy in this system inherits a labelled boundary, an always-open limits region and a figure with a drawn accountability edge — all places they would have to publish an admission or leave visibly short |

**No failure was rationalised.** Three defects were found by looking at the page and are recorded
with their fixes in `10_COMPLETE_PAGE_PROOF.md` §3.

---

## 4. Against the brief's six conditions for A

| # | Condition | Met? |
|---|---|---|
| 1 | Register-label problem resolved | **Yes** — rule defined from the mechanism, applied, verified on a complete page at both widths |
| 2 | F2 PASS | **Yes** — both widths, re-run not inherited |
| 3 | F3 PASS | **Yes** — both widths, by a rubric fixed before measurement; margin stated |
| 4 | Complete `/seo` retains commercial emphasis | **Yes** — 5 of 6 bands WIDE, 8 of 9 NARROW |
| 5 | No material archive / research / SaaS drift | **Yes** — on the counted evidence in `10` §2 |
| 6 | NARROW does not collapse into evidential overload | **Yes** — no band is evidence-dominated; the highest apparatus band is still governed by a commercial statement |

**All six are met on measured evidence.** A is not awarded because the prototype looks finished —
it is awarded because each condition has a number or an observation behind it, and because the
one condition that came closest to failing is reported as a one-band margin rather than as a pass.

---

## 5. What A does NOT mean

**Read this section before acting on the verdict.**

1. **It does not approve the design system, and it does not pass Gate 10.** It says the territory
   is ready for design-system *development* to begin.
2. **One complete page was rendered.** The homepage was not built as a complete page. Its
   distinctive elements — F1 FULL, F1 STATE, the evidence apparatus at IMMEDIATE — were each
   rendered in Session 14, but **not assembled into one page.** Building the complete homepage
   should be the design-system phase's first act.
3. **Cumulative drift across twenty-two routes remains untested**, and cannot be tested from one
   page. The counted-repetition discipline in `10` §2 is the tool for it, not a substitute.
4. **The `changed` state pair (F7, the intervention record) is still unvalidated** — the asset is
   blocked, and rendering an "after" condition would fabricate it. **The territory's strongest
   evidence of intervention has never been drawn.**
5. **No user testing occurred and none is claimed.** Every perceptual verdict here is a
   structured, reproducible reading against a stated rule — not a measurement of a real reader.
   **F2 in particular should be re-run with real buyers** before the visual system is finalised.
6. **Print is implemented and unverified.**
7. **Typefaces and colour values remain provisional.** The *ratios* are computed and real; the
   families and hues are proposals.
8. **The direction comparison was not re-run** after the scan-layer correction in §2.

---

## 6. Upstream issues — reported, not fixed

Per the brief §12, neither was resolved here and neither was fabricated.

| Item | Does it materially affect this validation? |
|---|---|
| **Hero action-weighting wording** — brief §7 says "secondary booking"; approved `31`/`21` H1 say two `[ACT]` at equal confidence | **No.** `/seo`'s action pair follows `32`, which is unambiguous. Rendered as two objects of identical size, region and type treatment. Still needs an orchestrator ruling for the homepage |
| **AI-system enumeration** — approved copy says "four AI assistants" and "two systems we could not test"; the research baseline records 28 runs across five surfaces and "two of the six systems named in the charter" | **No.** `/seo` makes no per-system claim. **It still blocks F3, the figure** (the four AI layers), whose entire content is per-system separation. Must be resolved in writing before that figure is designed |

---

## 7. Files this pass produced or changed

**Created:** `08_REGISTER_LABEL_RULE.md` · `09_VISUAL_WEIGHT_RUBRIC.md` ·
`10_COMPLETE_PAGE_PROOF.md` · `11_SESSION_14A_CLOSURE_ASSESSMENT.md` ·
`prototype/05-seo-complete.html`

**Changed:** `prototype/the-record.css` — three additions, all applying existing findings rather
than new design: the narrow header panel (`46` STATE 3), the figure form swap (Session 14 F-R1),
and the classes a complete page needs that a section pair did not. `prototype/README.md` and
`07_VISUAL_VALIDATION_ASSESSMENT.md` carry pointers to this document.
`docs/00-project/CURRENT_STATE.md` carries a factual status annotation.

**Not changed:** `DECISION_LOG.md` · `QUALITY_GATES.md` · anything in `docs/16-ux/` · anything in
`docs/11-creative/` · approved messaging · approved copy · strategy · IA · any production file ·
`README.md`. **Nothing was staged, committed or pushed.**

---

## 8. Verdict

> ### **A — VISUAL TERRITORY READY FOR DESIGN-SYSTEM DEVELOPMENT**

**Subject to §5 in full.** This is permission to begin building the design system on Direction 2 —
not approval of a design system, not Gate 10, and not validation of any page other than the one
that was rendered.

**Recommended first act of the design-system phase:** build the complete homepage as a specimen
and re-run F2 and F3 against it, using `09_VISUAL_WEIGHT_RUBRIC.md` unchanged. It is the page
carrying F1 FULL, the F1 STATE pair and the first-screen apparatus exception, and it is the only
remaining structure that could still surprise this territory.
