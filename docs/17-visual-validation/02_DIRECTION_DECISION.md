# Direction Decision — Session 14 — PROPOSED

**Session:** 14 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Claude recommends; Claude does not approve.**

---

## 1. The recommendation

> ### **Adopt DIRECTION 2 — "THE WORKING SHEET" — for the bounded visual proof.**

One direction is chosen. **The other two are rejected, not merged.** No device from Direction 1
or Direction 3 is carried across, and this document names what is lost by that.

---

## 2. Why it wins — four reasons, each tied to an approved requirement

### 2.1 It is the only one of the three with a visual vocabulary for **action**

`16_COMMERCIAL_ENERGY_SYSTEM.md` §1 states the defect that nearly sank the territory:

> *A record of a firm that measures things is a record of an observer… The territory as
> originally specified had a complete visual vocabulary for measurement and no visual vocabulary
> for action at all.*

A sheet is a thing a working firm **fills in**: it takes a mark, at a position, with a label and
a date. The intervention mark, the dated state pair and the register label are all native to that
vocabulary. Direction 1 has no vocabulary for action at all — it can only set things at
different sizes. Direction 3's bracket **cites**; it does not record that anything changed.

This is the single decisive argument. The correction that made T1 approvable was the addition of
action, and only one of these three directions can draw it.

### 2.2 Its evidence device is width-invariant, and NARROW is the primary case

`13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §3 is explicit: *"Mobile is the primary case, not the
compromise."* A rule-bounded band is a band at every width — the tie stays on its left edge, the
label stays above it, the content stays beneath its claim in DOM order. Nothing about the device
has to be re-decided when the apparatus margin disappears at MEDIUM.

Direction 3's bracket must be re-sized and re-positioned for every context and every width, so
its consistency depends on per-instance judgement. Direction 1 has no device at all, so at NARROW
— where the fold is smallest and the buyer is likeliest to be a founder on a phone — the
apparatus is distinguishable from ordinary prose by measure alone, which is the weakest possible
signal on the narrowest screen.

### 2.3 It buys a scan layer without spending a single prohibited device

`16` failure mode 6: *"A record is read. A commercial site is scanned, then read. With no scan
layer, the founder who has forty seconds receives nothing."*

The register label is the scan layer. It costs no card (A1), no icon (A13), no colour band (A23),
no bento cell (A2), no metric tile (A3) and no logo strip (A11) — every one of which is the
conventional way to buy scannability and every one of which is prohibited here. **A direction
that cannot produce a scan layer without a prohibited device cannot deliver the forty-second
read**, and neither Direction 1 nor Direction 3 produces one.

### 2.4 Its failure mode is countable; the others' are perceptual

This matters more than it first appears, because Session 12 already recorded that the rule most
likely to erode in execution is the standalone test (`16` §5, R4), and Gate 9B deferred two tests
precisely because perceptual claims cannot be honestly checked.

- Direction 2's risks are **rules per screen** and **register labels per page** and **the size at
  which monospace appears**. All three are integers. A reviewer can count them.
- Direction 1's risk is *"has the apparatus quietly become small print?"* — a judgement.
- Direction 3's risk is *"has the bracket become a signature?"* — a judgement, and one that will
  only be answerable after the whole site exists, which is far too late.

Choosing the direction whose principal risk is checkable is a governance decision as much as a
design one, and this programme has repeatedly paid for un-checkable claims.

---

## 3. What is rejected, and what is lost by rejecting it

### 3.1 Direction 1 — THE PLAIN SHEET — REJECTED

**Rejected because it reproduces the prohibited disclaimer treatment from the opposite
direction.** With no drawn device, the only channels marking provenance as a different kind of
content are size and measure — and reducing the apparatus by size is exactly what `08` §8 rule 1
and anti-pattern **B5** forbid. A direction whose structure pushes toward the one treatment the
evidence doctrine most explicitly bans is not a safe basis for a system.

It is additionally the direction that **fails the swap test most easily**, which is the
documented reason territory T4 lost at Gate 9A: *"For a firm with a proof deficit, minimalism
reads as emptiness rather than restraint."*

**What is genuinely lost:** the fastest possible first read, and the lowest implementation cost.
Direction 2 must earn its first read by rationing rules rather than by having none, and that
discipline has to be enforced at every review rather than being free.

### 3.2 Direction 3 — THE MARKED PAGE — REJECTED

**Rejected because the site has exactly one recurring signature to spend, and it is already
spent.** `22_F1_USAGE_TAXONOMY.md` §1 records the ruling in plain terms: *"A figure that appears
on eight of twenty-two routes stops being an explanation and starts being a signature."* The
taxonomy then cut the run from eight routes to six, and only three carry the full figure, to buy
that risk down. A bracket that structures **every block on every screen** would reintroduce the
same failure at far greater volume, and it would do so with a mark that is not explaining
anything — which is worse than the case that was already ruled against.

The secondary reason is drift: brackets in a margin beside running prose are marginalia, and
marginalia is the most recognisable signal of a scholarly document. B31 exists to keep this
territory out of that costume.

**What is genuinely lost, and it is real:** Direction 3 is the most *distinctive* of the three
and the most elegant expression of the approved annotation tie, and it is structurally incapable
of letting the apparatus out-shout the argument. Direction 2 has to achieve by discipline what
Direction 3 achieves by construction. **This is the strongest argument against the
recommendation and it is recorded rather than argued away.**

The annotation tie survives in Direction 2 — as the edge of the evidence band and as the focus
indicator — but as **a component-level mark, not the page's structural device.** That is a
narrower role than Direction 3 gives it, and the narrowing is deliberate.

---

## 4. What this decision does not decide

Final typefaces · final colour values · the full type scale · the full spacing scale · the grid ·
component definitions and APIs · every state · page templates · numeric breakpoints · dark-mode
treatment · production CSS architecture · any production change.

**And it does not pass Gate 10.** The direction is selected for the purpose of a bounded proof.
Whether it becomes the sitewide design system is a separate decision, on separate evidence, at a
separate gate.
