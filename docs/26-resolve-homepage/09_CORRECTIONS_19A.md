# THE RESOLVE — Complete Homepage — Session 19A Narrow Closure Corrections

**Session:** 19A · **Date:** 2026-09-04 · **Branch:** `test_branch`
**Status:** **PROPOSED. Gate 10 remains formally OPEN. Claude does not pass Gate 10.**
**Scope:** three authorised corrections arising from the Session 19 closure audit. **No design
session.** The owner-approved Session 18C composition is unchanged except for the authorised hero
geometry — verified: **every chapter height delta is exactly 0px at WIDE, and 0px at 360/390/430.**

---

## 1. Correction A — hero quantity safety

**The defect.** The four hero enquiry rows carried inline widths `34%`, `26%`, `30%`, `22%` beside
named channels (organic search · paid search · a page that answered the visit · arrived with no
usable trail). Unequal lengths adjacent to named channels can be read as mix, volume, coverage or
effectiveness, which the programme's quantity-safety rule forbids regardless of the disclaimer
beneath.

**The correction.** All four bars are now **one equal length**, set once in CSS (`width:26%`), and
every inline width attribute was deleted. **Zero inline size styles remain anywhere on the page.**

**Why it can no longer imply quantity.** The bar now carries **state only**:

| Row | Mark | State |
|---|---|---|
| organic search | solid tangerine, equal length | a named, attributed object |
| paid search | solid tangerine, equal length | a named, attributed object |
| a page that answered the visit | solid tangerine, equal length | a named, attributed object |
| arrived with no usable trail | dashed grey, equal length | unattributed |

Measured on the rendered page: `[176, 176, 176, 176]` at WIDE, `[92, 92, 92, 92]` at 390,
`[84,84,84,84]` at 360, `[102,102,102,102]` at 430. **Distinct values: 1.** Nothing is comparative,
so nothing comparative can be inferred.

**Cold test — could a first-time viewer, without reading the disclaimer, infer that one channel has
"more" than another? NO.** There is no length difference to read.

**Hero composition materially changed: NO.** Hero height 895px before and after at WIDE; the H1,
copy, actions, control, labels and the resolve behaviour are untouched. The honesty note beneath is
retained as instructed.

## 2. Correction B — programme interaction floor

**The defect.** Session 19 measured inline-text controls below the programme's 40×40 CSS px floor
between the mobile breakpoint and desktop. The full pre-correction census:

| Viewport | Controls under 40×40 |
|---|---:|
| 360 · 390 · 430 | **0** |
| 760 | 1 — `.ev__go` 30px |
| 761 · 860 · 1080 | **25** — `.logo` 32 · `.proof` 27 ×5 · `.ev__go` 30 · footer links 21 ×18 |
| 1425 | **33** — the above plus `.navlink` 33 ×6, `.util a` 31, and `.disc` **24px wide** |

**The correction — two mechanisms, chosen per element so no type is inflated and no rhythm moves:**

1. **An invisible, centred `::after` hit-area extender** on `.logo`, `.navlink`, `.util a`,
   `.proof` and `.ev__go`. Adds hit area only — zero layout, zero paint, underlines and type
   unchanged. Used **only** where neighbours are far enough apart that hit areas cannot overlap.
2. **Real padding** on the footer link columns (`padding:10px 0`, `margin-bottom:0`), whose ~30px
   row pitch is too tight for extenders — overlapping invisible targets would cause mis-taps, which
   is worse than the undersized target being fixed.
3. `.disc` given `min-width:40px` — it was 44px tall but 24px wide.

**Result: 0 controls under 40×40 at all eight tested widths** (45 controls at ≤1080, 53 at 1425).

**Page-length impact:** **+77px at WIDE, confined entirely to the footer** (785px, +1.0% of page
height, below the conversion close). **0px at 360, 390 and 430** — the narrow footer already
carried sufficient padding from 18C. `<main>` is unchanged at every width.

**Mobile de-cluttering impact: none.** No narrow rule was altered; mobile heights are identical.

## 3. Correction C — dead boundary transition removed

**Established in Session 19 and re-verified here.** The boundary chapter's "fall" — a rule drawn
through each of the five unpromised things — was specified in Session 18 and documented as live
through 18C. **Its selector was `.bound.on`, while the element has only ever carried
`class="sec sec--tight"`; and since 18B no script applied `.on`.** It never rendered in the
JavaScript path, so **it was never part of the experience the owner reviewed.**

**Per the 19A ruling it was removed, not repaired.** The boundary chapter is intentionally still.

**Removing it also closed two defects that had never been reported, both found in this session:**

| Mode | Before 19A | After |
|---|---|---|
| JavaScript (the reviewed path) | plain list, no strike | unchanged — plain list |
| **No-JS** | `html:not(.js) .plist li::after{transform:scaleX(1)}` — **the strike WAS drawn**, so no-JS disagreed with the page the owner approved | matches: no strike |
| **Reduced motion** | `.plist li{opacity:.6}` dropped the five promises from **6.38:1 to 2.66:1**, under the **3:1** floor for 24px text — **a WCAG 1.4.3 failure present only in the reduced-motion path**, which is why every earlier sweep on the normal page missed it | **6.38:1**, opacity 1 |

**Removed:** the `.plist li::after` rule · `.bound.on .plist li::after` · `.bound.on .plist li` ·
the no-JS strike rule · the reduced-motion `opacity:.6` · the now-purposeless `transition` and
`position:relative` on `.plist li` · the five inline `--d` values. **Nothing else referenced any of
them.** The five promises, their five dashed marks and the owned tangerine mark are unaffected.

**A reduced-motion contrast sweep that accounts for `opacity` was added to the validation method.**
Earlier sweeps compared declared colours only, which is how a 2.66:1 failure survived four sessions.

---

## 4. **CORRECTION TO SESSION 19: the live T3 count is 4, not 3**

> **This corrects an arithmetic error in my own Session 19 report, and it falsifies a premise of
> the Session 19A brief. It is stated plainly rather than resolved quietly.**

Session 19 enumerated **five** transitions, found **one** dead, and reported the live count as
**3**. Five minus one is **four**. The Session 19A brief inherited that figure and concluded that
"this already matches existing Resolve governance" and that "no governance-budget change is
required."

**Re-enumerated against the corrected file, by reading every trigger and every `.on` rule:**

| # | Live T3 | Trigger | Verified |
|---|---|---|---|
| **1** | **Hero departure** — the resolved stage drifts up and fades as the reader leaves | rAF scroll handler writing `transform` + `opacity` on `.stage` | present in source |
| **2** | **Departure carrier** — one mark and the transitional line arrive | `onView('#dep')` → `.dep.on` drives `.carrier` and `.dep__t` | `class="dep on"` |
| **3** | **Chain descent and draw** — the page approaches the structure | `onView(chain)` → `.chain.on` drives transform, `.draw`, `.fade` | `class="chain on"` |
| **4** | **Close arrival** — five marks land from above | `onView('#cta')` → `.close.on` drives `.arrive i` | `class="close on"` |

**Live T3 = 4.** (`.rv` reveals remain classified as composition, not T3, per the 18A convention —
counting them would make it 5.)

**Consequence: the proposed governance budget of 3 is still exceeded, by one.** All four meet the
stated standard — each **joins two chapters** (1, 2, 4) or **changes the reader's distance from an
object** (3) — and 18A's per-transition audit independently reached the same conclusion for these
four. **The recommendation is therefore reconciliation from 3 → 4**, exactly as Session 18A
proposed before the miscount.

**`docs/24-resolve-governance/` was NOT modified.** This remains an orchestrator decision, and it
is now supported by a corrected count rather than a wrong one.

---

## 5. What was NOT changed

Page length (`<main>` identical at every width) · section order · copy · hero composition ·
mobile · typography · colour · F1 structure · any animation added · any interaction added ·
`docs/24-resolve-governance/` · `DECISION_LOG.md` · `QUALITY_GATES.md` · `CURRENT_STATE.md` ·
`docs/20-creative-convergence/prototype/convergence.html` (hash `c6d29fd34cf7c5e481d8244773f7d357`,
unchanged) · root `README.md`.

## 6. Regression summary

| Check | Result |
|---|---|
| Chapter heights, WIDE | **all deltas 0px** |
| Page height, 360 / 390 / 430 | **0 / 0 / 0 delta** |
| Page height, WIDE | +77px, footer chrome only |
| Section order | unchanged |
| Copy | unchanged |
| F2 WIDE / NARROW | **PASS** — 5.0× / 2.05× dominance |
| F3 WIDE / NARROW | **PASS** — type peaks identical to 18C |
| Contrast, WIDE + 390 | **0 failures** |
| Contrast, reduced motion **including opacity** | **0 failures** (was 1) |
| Touch targets, 8 widths | **0 under 40×40** |
| Horizontal overflow | none at any width |
| No-JS / reduced motion | complete; all three modes now agree on the still boundary |
| Quantity safety | **PASS** — see §7 |

## 7. Remaining variable-length geometry, declared

The cold audit found **one** comparable set still carrying differing lengths: the **friction runs**
in the problem chapter — 4, 7 and 10 marks per row.

**This is retained and is not the corrected defect.** It is not channel-associated: the three rows
are *failure descriptions*, and the differing lengths encode **how far along a route the failure
occurs** — searching and not being found (early), arriving without enquiring (middle), enquiring
without attribution (late). Longer therefore means **later**, not *more*. All three terminate in
the same open dashed mark, aligned in one column, captioned *"from the outside, all three look
identical"*, with a standing note stating the runs show **how far a route gets, not how much demand
there is**. The 19A brief authorised correcting the channel-associated bars only.
