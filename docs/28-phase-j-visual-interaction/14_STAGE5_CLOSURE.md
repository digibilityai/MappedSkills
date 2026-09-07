# PHASE J — STAGE 5 — FINAL CLOSURE PASS

**Date:** 2026-09-07 · **Branch:** `test_branch` · **Starting HEAD:** `cc2c143`
**Ruling implemented:** Stage 4 ACCEPTED · site-wide composition SOLVED · two Stage 4 additions
reverted · `/services` assessed · no further rollout.
**Status:** **IMPLEMENTED — AWAITING FINAL OWNER / ChatGPT ACCEPTANCE.**

---

## 1. Owner reversions — carried out exactly

Both routes were restored with `git checkout 01cf53f --` and verified **byte-identical to their
Stage 3 state**. No Stage 4 documentation or history was reverted; the ruling is recorded here
instead.

| Route | Reverted | Verified | Height restored (390 / 1425) |
|---|---|---|---|
| `/problems/traffic-but-no-enquiries` | the five-symptom `StatedList` treatment; §1 returns to its two approved paragraphs | `git diff 01cf53f` on the file is **empty** | 10 805 → **10 574** · 8 343 → **8 039** |
| `/pricing` | the `open` mark on the five `NOT_FOR` exclusions | `git diff 01cf53f` on the file is **empty** | 7 498 → **7 445** · 6 040 → **6 014** |

### A consequence that had to be cleaned up

Reverting both call sites left `StatedList`'s `mark` prop with **zero users**. Per §28 — *"the active
design system must describe reality, not the original proposal"* — the dead prop was removed and
`StatedList` restored to its Stage 3 form. `components/routes/primitives.tsx` now differs from
Stage 3 by **91 added lines and 0 deleted**: `StageSystem`, and nothing else.

---

## 2. `/services` — assessed, and deliberately left unchanged

### What the run of 4 actually is

Measured section by section at 1425 px:

| # | Section | Kind | Words |
|---|---|---|---|
| 0 | hero — *"One outcome: enquiries you can act on."* | text | 81 |
| 1 | What the whole system is for | text | 59 |
| 2 | Three parts, and the joins between them | **VISUAL** (ChainFull, F1 class A) | 702 |
| 3 | What we are accountable for | text | 142 |
| 4 | Where each discipline comes in | **VISUAL** | 235 |
| **5** | **What can be added later** | text | 113 |
| **6** | **What we can and cannot test** | text | 81 |
| **7** | **Who this is for** | text | 84 |
| **8** | close | text | 58 |

**The run of 4 is sections 5–8.**

### The finding that decided it

**Section 7 is already a state comparison.** It renders a two-column grid with real `<h3>`
headings — *"This works where"* with `Mark state="owned"` and *"It is a poor fit where"* with
`Mark state="open"` — equal columns, correct marks. It was hand-rolled in Phase G, before the
`StateComparison` primitive existed, and it is **the same thing the primitive produces.**

It is classified `text` by the detector only because it carries **2** `aria-hidden` marks and the
threshold is **6**. That is a detector artefact, not a design gap. **`/services` is better resolved
than its run-of-4 score suggests.**

### The §5 decision rule, applied

| # | Condition | Verdict |
|:--:|---|:--:|
| 1 | Uses an existing approved primitive | ✅ |
| 2 | Represents existing approved meaning | ✅ — §6 *"below the threshold / above the threshold"* is a genuine two-state contrast |
| 3 | **Breaks the run-of-4** | ❌ **No.** A `StateComparison` on §6 carries 2 marks and stays `text` under the same detector. Flipping it would mean splitting three paragraphs of continuous argument into ≥ 6 marked items — which is precisely the change just reverted on `/problems` |
| 4 | Does not fabricate evidence | ✅ |
| 5 | **No second competing signature** | ❌ **Risk.** The page already carries its one class-A FULL figure (§2), a structured discipline block (§4) and a fit comparison (§7). A fourth structured visual pushes toward the repetition the figure taxonomy exists to prevent |
| 6 | **No material mobile height increase** | ❌ **Likely fails.** `/problems` measured **+231 px** for exactly this shape, and that is why it was reverted |
| 7 | No new dependency | ✅ |
| 8 | No new interaction budget | ✅ |

**Three conditions fail. §5 is explicit: "If these conditions are not met: LEAVE /services
UNCHANGED. That is an acceptable outcome. Do not force a visual merely to improve a metric."**

> Making this change would have repeated, on `/services`, the exact trade the owner rejected on
> `/problems` and `/pricing` in the same ruling. **`/services` is unchanged.**

---

## 3. `/how-it-works` — StageSystem retained, spacing reviewed and left alone

The system is **kept**, per the ruling.

Measured footprint of the figure itself:

| Width | Figure | of which list | of which caption | Page |
|---|:--:|:--:|:--:|:--:|
| 390 | **503 px** | 418 | 67 | 12 841 |
| 860 | 238 px | 175 | 45 | 9 070 |
| 1425 | 255 px | 184 | 45 | 10 107 |

The 503 px at 390 accounts for essentially the whole Stage 3 → 4 delta of +529 px, as expected: the
three stages stack on mobile.

**Spacing was already tightened once in Stage 4** (12 960 → 12 841, **−119 px**). What remains is
`gap-y` 18 px × 2 gaps and an 18 px caption margin. Reducing those to the smallest values that keep
the visual uncramped recovers approximately **16 px — 0.12% of the page.**

§8 permits a spacing optimisation only if it *"safely recovers meaningful height"*. **16 px is not
meaningful, so no change was made.** The StageSystem is exactly as Stage 4 shipped it.

---

## 4. What Stage 5 changed, in total

| File | Action | Reason |
|---|---|---|
| `app/(pages)/problems/traffic-but-no-enquiries/page.tsx` | reverted to `01cf53f` | Owner ruling C |
| `app/(pages)/pricing/page.tsx` | reverted to `01cf53f` | Owner ruling D |
| `components/routes/primitives.tsx` | removed the now-unused `StatedList` `mark` prop | Consequence of C and D; §28 |
| `/services` | **no change** | §5 decision rule — three conditions fail |
| `/how-it-works` | **no change** | §8 — no meaningful spacing recovery available |
