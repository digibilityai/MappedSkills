# Register-Label Hierarchy Rule — Session 14A — PROPOSED, BINDING ON THE PROOF

**Session:** 14A — Narrow visual closure · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Corrects the defect recorded in `06_GATE10_DEFERRED_F2_F3_RETEST.md` §2.
**Scope:** the register label only. **Direction 2 is not reopened.** No other element of the
provisional visual language is changed by this document.

> **Written and saved before the complete `/seo` page was built or measured.** The rule is
> derived from the defect, not fitted to a rendering.

---

## 1. The defect, restated precisely

Session 14 measured the heaviest element in each viewport-height band of each rendered artboard.
On dense bands the heaviest element was always a commercial statement. **On sparse bands — a
short region, or the tail of a section — the heaviest element was an apparatus-register label**,
because it was the only strongly structured object present.

Two specific instances:

| Slice | Band | Heaviest element | Register |
|---|---|---|---|
| `/seo` section pair | 3 | *"what cannot be attributed — beside the measurement it limits"* | **APPARATUS** |
| Evidence specimen | 0, 3 | *"specimen a…"*, *"specimen d…"* | **APPARATUS** |

**The mechanism is not the label's size or contrast.** At 16px in the apparatus ink it is the
quietest structured object in the system. It became dominant because **nothing else in the band
competed with it.**

Therefore the correction is about **where a label is allowed to appear**, not about how it looks.
Making it smaller, greyer or hidden would breach the accessibility floor and the evidence
doctrine simultaneously, and would remove orientation the reader can use.

---

## 2. What a register label is, and is not

> **A register label is orientation metadata. It names the epistemic kind of a region — a
> boundary, a measurement, a method — for a reader deciding whether to slow down.**

| It is | It is not |
|---|---|
| Apparatus-register text, lowercase, at the body minimum, at apparatus ink | A headline |
| Subordinate to the heading it precedes | The focal object of any screen |
| Rare, and attached to something | A badge, a chip, a tag or an eyebrow |
| Removable without loss of meaning | A brand device or a repeating signature |
| — | A decorative headline, or a substitute for one |

---

## 3. The rule — five parts, all binding on the proof

### **RL-1 — A register label never appears without a heading.**
Every register label is **immediately followed by an argument-register heading in the same
region.** A region with no heading of its own does not get a label; it belongs to the region above
it and inherits its orientation.

*This is the operative fix.* The failing instance — a labelled attribution-limit region with no
heading — cannot occur under RL-1.

### **RL-2 — A label and its heading are always in the same viewport band.**
They are adjacent by construction. **A label may not open a region whose first screenful contains
no argument-register element of greater weight than the label.**

*Band-level, not region-level, because a scrolling reader experiences screenfuls, not regions.*

### **RL-3 — Sub-regions do not get labels.**
A structure inside a region — a limit adjacent to the claim it qualifies, an evidence disclosure,
a figure caption — is bound to its parent by **position and by the annotation tie**, never by a
second label. **Nesting orientation is how a page becomes a taxonomy.**

*Consequence, applied in the proof: the attribution limit inside `/seo` move 6 loses the label it
carried in the Session 14 section-pair proof. It is the closing paragraph of move 6, in the
argument register, at full measure, always open — which is what the approved copy and
`32_WIREFRAME_MASTER_COMMERCIAL.md` describe. It did not need a labelled region of its own, and
giving it one was the defect.*

### **RL-4 — Rationed: at most two per page, on set-piece regions only.**
A register label appears only on a region that both **carries its own argument-register heading**
and **is a set-piece** — a region marked by a ground change or a set-piece rule. That budget is
the same as the ground-change budget (`14` A23 as amended: at most two deliberate ground changes
per page), so the two are checked together.

*A page where every section carries a label is a spec sheet. Rationing is what keeps the label a
mark rather than a chrome pattern.*

### **RL-5 — The test.**
> **In no viewport-height band, at any width, may a register label be the heaviest element.**

Checkable by inspection and by measurement, at WIDE and at NARROW, in greyscale. It is the same
test F2 applies, scoped to this one element.

---

## 4. What the rule does not do

- **It does not make labels smaller.** They stay at 16px, the body minimum, at apparatus ink
  (8.77:1, AAA). Shrinking them would breach `13` §2.2 and the evidence doctrine.
- **It does not lower contrast.** Unchanged.
- **It does not hide them.** They are present, in the reading flow, in DOM order.
- **It does not remove orientation.** It moves orientation to where the reader can act on it —
  the two epistemically loaded regions — and lets the heading carry it everywhere else.
- **It adds no competing decorative material.** Nothing is introduced; one thing is rationed.

---

## 5. A consequence that must be reported, not buried

`02_DIRECTION_DECISION.md` §2.3 gave *"it buys a scan layer without spending a prohibited device"*
as one of four reasons Direction 2 was selected, and named the **register label** as that scan
layer.

**Under RL-4 the label appears at most twice per page, so it cannot be the scan layer.**

Rendering a complete page shows what actually carries scannability: **the rationed hairline rules,
the verb-led argument-register headings, and the large jumps in the type scale.** The register
label carries something narrower and still worth having — *epistemic* orientation, at the two
places where a reader's confidence is decided.

**The selection reason was partly wrong and is corrected here rather than defended.** Whether the
remaining three reasons still justify Direction 2 over Directions 1 and 3 is assessed against the
complete page in `11_SESSION_14A_CLOSURE_ASSESSMENT.md` §2, not assumed.
