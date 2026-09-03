# Open Design Risks — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`

Risks are ordered by how much damage they do if they are not addressed before the next page is
designed. Each names **what would have to be true** for it to be closed — not a promise that it will
be.

---

## R1 — Every device budget on the homepage is spent to its limit — **HIGH**

Two of two ground changes, two of two set-piece rules, two of two register labels, two of two
primary actions, one of one full-weight figure.

**Why it matters.** The page has no headroom. Any future addition — an unblocked people element, an
unblocked own-site diagnostic entry, the fifth first-screen item when the diagnostic publishes —
either exceeds a budget or forces something already on the page to give one up. **Three of those
additions are already scheduled by the blocked-content register.**

**To close it:** decide, before the blockers clear, which device each unblocked element takes and
what it displaces. That is a design decision, not an implementation one.

---

## R2 — The cumulative effect across 22 routes is still unmeasured — **HIGH**

One page has now been rendered in each of the two proved page types (`/seo`, `/`). **Nobody has seen
what four or five of these look like in sequence**, which is how the archive-drift question is
actually decided.

**To close it:** design two more pages of genuinely different types — a problem page and a
research entry are the two that would stress it hardest — and run the drift test across the set
rather than per page.

---

## R3 — The apparatus margin has no budget — **MEDIUM-HIGH**

It is the page's only editorial-adjacent form. It is safe here because it is used **once**, on the
one mechanism claim, and collapses inline below a 1000px container.

**Why it matters.** Nothing currently stops a later page using it on every claim, and a
reading-column-plus-margin repeated down a page is the single most recognisable signal of a
publication. This is the same class of failure the register label already needed a five-part rule to
prevent.

**To close it:** a stated budget on the margin form, of the same kind as RL-4.

---

## R4 — Two thresholds have been chosen and are not yet doctrine — **MEDIUM**

900px (header form), 1000px (apparatus margin), 1180px (figure form swap), all as **container**
queries. Each is derived from the content's own required width rather than from a device class, and
each is currently used on two pages.

**Why it matters.** They will silently harden into programme breakpoints simply by being copied. If
that is going to happen, it should be decided rather than inherited.

**To close it:** an explicit decision about whether these three numbers are the programme's
thresholds, taken after at least one more page type exists.

---

## R5 — The 1000–1180px window is the page's weakest layout — **MEDIUM**

Between those widths the apparatus margin has already collapsed but the horizontal figure has not
yet been earned, so a tall vertical drawing sits in a wide window.

It reads as a tablet layout rather than as a broken one, and **no third figure form was invented to
patch it** — inventing one would have added a drawing nobody asked for. Recorded as a known
condition rather than fixed.

**To close it:** either accept it explicitly, or narrow the gap by reducing the horizontal figure's
required width — which means redrawing the figure, not scaling it.

---

## R6 — Evidence area concentrates in one band, and this page is evidence-light — **MEDIUM**

The densest band on the page is **73.4% evidential by area at NARROW**. It passes, because emphasis
governs and that band is led by a commercial heading.

**Why it matters.** The homepage carries **one** evidence entry, because the other two are blocked.
When the own-site diagnostic and the people element publish, block 6 gains material and that band
gets denser, not sparser. **The proportion result should not be assumed to survive the block
clearing.**

**To close it:** re-run F3 on block 6 when either blocker clears.

---

## R7 — Both figures were laid out by hand, and both had label collisions — **MEDIUM**

Four label layouts had to be re-cut after rendering. The figure system has **no layout mechanism** —
positions are hand-placed coordinates, so every new figure and every copy change is a fresh
collision risk, and a translation would break all of them.

**To close it:** either a stated layout convention for figure annotation (columns, reserved
gutters), or acceptance that figures are hand-set artefacts that must be re-inspected on every copy
change.

---

## R8 — Typefaces are still provisional — **MEDIUM**

Archivo and IBM Plex Mono are unchanged from Session 14 and remain unresolved on licensing, hosting,
subsetting and performance. Every structural claim in the foundation holds on the fallback stacks,
but **the rendered proportions in this session were measured with the real faces loaded**, and a
different final pairing would change the type scale's optical relationships.

**To close it:** the Gate 10 typeface decision, taken with performance and licensing evidence.

---

## R9 — The status vocabulary is eight states and two are drawn — **LOW-MEDIUM**

`measured` and `not testable` are drawn and greyscale-verified. The other six are defined and
undrawn. In particular the **`changed` (square within a square)** state remains blocked, as it has
been since Session 14, because the asset it would describe does not exist.

**To close it:** draw each remaining state on the first page that genuinely needs it. **Do not draw
them speculatively** — an undrawn state costs nothing; a drawn state nobody needed is decoration.

---

## R10 — No screen-reader pass, no real device, one engine — **LOW-MEDIUM**

Structure, semantics, contrast, focus and keyboard were measured. **Assistive technology was not
run.** Print output and text-resize were not exercised. Cross-browser was not tested.

**To close it:** a real assistive-technology pass on the specimen before any of this becomes
production CSS.

---

## R11 — There is exactly one script, and the design should stay able to lose it — **LOW**

The navigation's `Escape` and outside-click behaviour is the page's only JavaScript, and nothing
depends on it. That is the correct arrangement and it is fragile in one specific way: **the next
component that "needs a little JS" is where the no-script guarantee actually gets lost.**

**To close it:** treat the script budget as a counted budget like the others.

---

## R12 — This is one designer's reading of one page — **STANDING**

Every verdict in this session — F2, F3, the drift test, the repetition audit — is a structured
reading by the person who made the page. **No real reader has seen it.** That limit is carried on
every result and is not reduced by the fact that the measurements are reproducible.
