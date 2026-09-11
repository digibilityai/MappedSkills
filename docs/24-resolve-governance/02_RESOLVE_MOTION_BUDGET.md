# THE RESOLVE — Motion and Repetition Budget

**Session:** 17A · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **APPROVED and BINDING — 2026-09-04, on Gate 10 closure (`DEC-019`).**
**One number was reconciled against the validated homepage: the homepage T3 maximum, 3 → 4.
See §5.0. Everything else in this document is unchanged.**
**Supersedes:** the Session 16 motion budget (`docs/22-design-system/06_MOTION.md`) for THE
RESOLVE — see `01_SESSION16_AUDIT.md` §2.

---

## 1. The governance problem this closes

Session 15C named it itself, as its highest open risk:

> **R1 — The resolve has no budget yet.** *(highest)* It appears **seven times** in this
> prototype. On a 22-route site the same gesture on every page becomes a **tic**, and the thing
> that made it memorable becomes the thing that makes the site monotonous. **A rule is needed —
> how many resolutions a page may carry, and which content earns one — before this becomes a
> design system.**

Sessions 14A, 15B and 15C each found this gap and each left it open. **This document closes it for
THE RESOLVE.**

> **The Session 16 numbers are not reused.** They permit two ambient regions and one pinned
> sequence — and THE RESOLVE has **zero ambient motion and no pinned sequences at all**. Importing
> them would license the two things 15C deliberately refused.

## 2. The principle

> ### THE RESOLVE should feel alive because **meaningful state changes occur** — not because
> ### things are animating.

A resolution is **an event with a commercial meaning**. If a page runs the gesture repeatedly, each
instance means less, and by the fourth the reader has stopped reading it as meaning and started
reading it as style. **Scarcity is what makes the gesture legible.**

## 3. The rhythm — preserved from Session 15C

```
CALM  →  EVENT  →  CALM  →  TRANSFORMATION  →  CALM
```

Binding properties, all carried from the prototype:

- **Nothing loops.** Verified in 15C: zero `infinite` animations.
- **No ambient motion, anywhere.** 15C removed an idle hero shimmer as gratuitous; that deletion
  is now a rule.
- **No scroll hijack** — no pinning, no scrubbing, no forced sequence, no gating. Every CTA is
  reachable at any moment.
- **Once resolved, it stays resolved.** Scrolling back does not replay. **The page never nags.**
- **Off-screen is still.** Nothing animates that a reader cannot see.

## 4. The four motion tiers

Every animation on the site must name its tier. **Motion that cannot name its tier is removed.**

| Tier | What it is | Duration | Carries meaning |
|---|---|---|---|
| **T1 — MAJOR RESOLVE** | A **whole population** changes state: many marks resolve into named objects, and the surface may invert with them | ~900ms (`--t-resolve`), staggered | *The same population, resolved.* The site's one idea |
| **T2 — SECTIONAL RESOLUTION** | **One region's** rows, marks or rules resolve as it is reached. Fewer than ~10 objects | ~620ms (`--t-state`), 90–110ms per row | *This part of the argument is now active* |
| **T3 — TRANSITION** | A handoff, a departure, a reveal, a drawn rule | 420–620ms | *Continuity, or arrival* |
| **T4 — MICRO** | A control responds to the reader | ~180ms (`--t-micro`) | *The system answered you* |

**Two easings only** — `--e-state` for a state change, `--e-arrive` for something arriving. No
per-component easing zoo.

## 5. The budget — binding maximums per page

**Maximums, not targets. Fewer is better, and zero is a legitimate answer for T1 and T2.**

| | **Homepage** | **Secondary / service page** | **Editorial, research, legal, conversion surfaces** |
|---|:--:|:--:|:--:|
| **T1 — MAJOR RESOLVE** | **1** | **0** | **0** |
| **T2 — SECTIONAL RESOLUTION** | **3** | **1** | **0** |
| **T3 — TRANSITION** | **4** — *reconciled from 3, see §5.0* | **2** | **1** |
| **T4 — MICRO** | unbounded, but **only the two defined behaviours** | same | same |
| **Signature interaction** (the Traffic / Enquiries control) | **1** | **0** | **0** |
| **Ambient regions** | **0** | **0** | **0** |
| **Pinned / scroll-scrubbed sequences** | **0** | **0** | **0** |
| **Full-bleed accent regions** | **1** | **1** | **0 or 1** |
| **Surface inversions** | **2** — the hero stage, and the closing accent region | **1** | **0** |

### 5.0 The homepage T3 reconciliation — 3 → 4 (2026-09-04, `DEC-019`)

**This is evidence-based reconciliation against a validated page, not an increase in motion
allowance.** The figure of 3 was derived in Session 17A **before any homepage existed**, and §9 of
this document already stated that the reconciliation would happen when the complete homepage was
composed and that **the homepage, not the prototype, is what this budget is measured against.**

The homepage was then built (Session 18), refined (18A), compressed (18B), refined for mobile
(18C) and audited (19, 19A, 19B). Gate 10 validation measured **four live T3 transitions**, each
verified by its trigger and by its rendered state on the page:

| # | Transition | What it does | Standard it meets |
|---|---|---|---|
| 1 | **Hero departure** | the resolved population drifts out as the reader leaves | joins two chapters |
| 2 | **Departure carrier** | one mark and the transitional line arrive | joins two chapters |
| 3 | **Chain descent and draw** | the page approaches the structure | **changes the reader's distance from an object** |
| 4 | **Close arrival** | the marks land and stop | changes what the object means |

**The boundary chapter is intentionally still**, and a fifth transition specified for it in Session
18 was found never to have rendered and was removed in Session 19A rather than repaired.

> ### **4 is the validated CEILING for the approved homepage. It is not headroom.**
> Adding a fifth transition is a budget breach exactly as a fourth was before this reconciliation.
> A transition still has to **join two chapters, change the reader's distance from an object, or
> change what an object means**; one that merely makes a section appear is composition and is not
> counted, and is not licensed by this change.

**Nothing else moves.** Secondary-page and editorial budgets are unchanged at 2 and 1. T1, T2, T4,
full-bleed regions and surface inversions are unchanged. **Ambient regions remain 0, pinned and
scroll-scrubbed sequences remain 0, and looping decorative motion remains prohibited.** The
anti-tic rules **M1–M7 are unchanged and remain binding.**

**Recorded about the signature-interaction line:** the validated homepage carries the one signature
interaction the table permits — the Traffic / Enquiries control — **plus one progressive-disclosure
control**, the Capture / Convert / Measure tablist. Gate 10 accepted both on the basis that they do
**distinct informational jobs**: the signature changes *what a population is* and inverts the
surface; the tablist changes *which part of a structure is under examination* and changes no ground
and no population. **The tablist is not a second signature and does not raise the signature limit,
which stays at 1.**

### 5.1 Why one major resolve on the homepage

The gesture is the site's single idea. **A page that performs it once performs it; a page that
performs it four times decorates with it.** The hero earns it because that is where the
proposition is stated. Nothing else on a homepage outranks the proposition.

### 5.2 Why zero on secondary pages

`docs/22-design-system/` already established the right principle for inherited pages: a secondary
page **inherits the language as a composed still, rather than replaying the show.** That principle
is direction-independent and is retained. A service page may resolve **one** region (T2) if that
region's subject is genuinely a state change; otherwise it is still.

### 5.3 Which content earns a resolution

A resolution is permitted **only** where the content is genuinely one of:

1. anonymous activity becoming a named commercial object;
2. a commercial state changing — captured, converted, measured, attributed;
3. a limit or boundary being drawn.

**It is not permitted for:** a section opening · a heading arriving · a list appearing · a CTA
region · navigation · a footer · an image or figure entering view · "energy" · visual rhythm ·
making a quiet page feel less quiet.

## 6. The anti-tic rules

**These are the specific fix for R1.**

| # | Rule |
|---|---|
| **M1** | **No two consecutive regions may run the same resolve gesture.** If section *n* resolves, section *n+1* is still. This alone converts a repeated gesture into a punctuated one |
| **M2** | **A page carries at most one T1.** A second full-population resolve on the same page is prohibited |
| **M3** | **A gesture may not be reused for a different meaning**, and a new gesture may not be introduced to avoid a budget |
| **M4** | **Minimum ~1s between consecutive T1/T2 events**, so a sequence reads as events rather than a burst *(carried from Session 16's transformational role — direction-independent)* |
| **M5** | **Every T1 and T2 fires once per page load**, on entering view, and never replays |
| **M6** | **Mandatory stillness:** in any reading-heavy region · after every T1 or T2 · while a region is off-screen · on every conversion surface (`/contact`, `/schedule-call`, `/thank-you`) |
| **M7** | **Budget overage is a design defect, not a judgement call.** Count the tiers on the rendered page. If the count exceeds the table in §5, the page is wrong |

## 7. Reduced motion, no-JavaScript, and the floor

Carried from Session 15C, unchanged, and binding:

- **Reduced motion does not freeze — it resolves.** Durations collapse; the page opens in the
  **resolved** state with the lattice removed and named objects present; the handoff is removed
  rather than played instantly; every act, drawn rule, claim reveal and CTA mark is shown
  complete. **The signature control still works** — states swap without transition.
- **With JavaScript off**, every resolved state is shown, the evidence substrate is open, and all
  copy, navigation and actions are present. **Motion is an amplifier, never the carrier.**
- **No meaning disappears, no navigation is lost, no diagram becomes unreadable** in any of these
  modes.

## 8. Performance

The one item worth budgeting is Resolve's **lattice**: 190 (narrow) to **440 (capped)** small
elements, resolving **once**, on a staggered `transform` + `opacity` transition.

- It is a **one-off transition, not a running animation** — there is no steady-state cost.
- **Build it after first paint**; skip it entirely under reduced motion (already the case).
- **No canvas, no WebGL, no animation library.** At most one `rAF`-throttled scroll handler per
  page, writing at most two properties.
- **Profiling on real hardware remains a prerequisite to implementation.** The prototype's cap is
  evidence, not a production limit.

## 9. The known delta — stated, not hidden
> **CLOSED 2026-09-04.** The reconciliation this section anticipated was performed at Gate 10
> closure: the homepage was measured and the homepage T3 maximum moved 3 → 4 (§5.0). The
> paragraphs below are retained as the original statement of the gap.


**The Session 15C prototype exceeds this budget.** By its own count the resolve appears **seven
times**; §5 permits one T1 plus three T2.

**This is expected and is not a defect in the prototype.** 15C is a creative-direction prototype
whose job was to prove the idea, and it named this exact gap as its own highest risk. **The budget
governs the design system and the pages built from it — not the prototype.**

> **The prototype must not be edited to fit this budget.** It is the approved visual reference and
> `DEC-018` requires it to stay unchanged. The reconciliation happens when the **complete homepage
> is composed**, and the homepage — not the prototype — is what this budget is measured against.

## 10. What this document does not do

It does not design anything, approve a homepage, pass Gate 10, or modify the Session 15C
prototype. It is one governance rule set, written so the next worker inherits a budget instead of
a gap.
