# Self-Critique and Recommendation — Session 15B — PROPOSED

**Date:** 2026-09-02 · **Branch:** `test_branch`
**Method:** each prototype was opened and inspected in a browser at 1440×900 and 390×844, and
compared directly against the rejected Session 15 homepage at
`docs/18-design-system/prototype/homepage.html`.

> **Claude does not choose the direction.** A recommendation is offered below with its reasoning.
> All three remain available, unmerged and unhybridised, for the owner to compare.

---

## 1. The document test, run first

> **Would someone looking only at the rendered screen mistake this for a document, a textbook, a
> journal, a report or a publication?**
>
> **And: would this design survive being printed as a PDF, essentially unchanged?**

| | Mistakable for a document? | Survives as a PDF? |
|---|---|---|
| **Session 15 (rejected)** | **Yes** — that is the owner verdict | **Yes, almost entirely.** Only two `<details>` are lost |
| **A — Signal Field** | **No.** A dark field of moving marks with operable gates has no print equivalent | **No.** Print it and the entire argument is gone |
| **B — The Switch** | **No.** Two full-surface states and 100px display type | **No.** A PDF can show one state; the *idea* is the change between them |
| **C — The Trace** | **No**, though it is the closest of the three, because its main column is type on paper. What saves it is that the record is live and the trace is drawn by the reader | **No.** A printed trace of a visit that never happened is meaningless |

**All three pass. None was revised or withheld on this test**, but C was the one that needed
checking, and the answer depends on the record rail continuing to *move*.

---

## 2. Self-critique — Direction A, THE SIGNAL FIELD

| | |
|---|---|
| **A. Digitally alive?** | **Yes, most of the three.** Something is always in motion and it is caused by the subject, not by decoration |
| **B. Serious modern marketing company?** | **Yes, with a caveat.** The dark ground and green signal are closer to "technical product" than to "commercial services firm". It reads capable; whether it reads *commercial* is the open question |
| **C. Memorable moment?** | **Yes — closing a gate.** The strongest single interaction produced in this session |
| **D. Does motion communicate?** | **Yes.** Loss, throughput and accumulation are all only legible because things move |
| **E. Content easier to consume?** | **Yes.** Four dense paragraphs became five refusals struck through and one commitment |
| **F. Commercial meaning immediate?** | **Yes.** The H1 at 88px+ is the largest thing on screen and both actions are above the fold |
| **G. THE RECORD supporting, not the genre?** | **Yes.** Evidence appears only on demand and occupies one section |
| **H. Character with effects removed?** | **Partly, and this is its weakness.** Strip the field and A is a well-set dark page. Its identity is more dependent on its one effect than B's is |

**Honest verdict on A:** the best *demonstration*, the most fragile *identity*. It also carries the
highest performance cost and the highest risk of drifting into generic "AI/tech" wallpaper if the
field ever appears where it is not explaining something.

---

## 3. Self-critique — Direction B, THE SWITCH

| | |
|---|---|
| **A. Digitally alive?** | **Yes.** A whole-surface inversion is something only a screen can do |
| **B. Serious modern marketing company?** | **Yes — the strongest of the three on this question.** Ivory, ink, tangerine and very large tight type read as a confident commercial firm rather than a technical product |
| **C. Memorable moment?** | **Yes.** The self-demonstrating hero switch |
| **D. Does motion communicate?** | **Yes**, and most economically: one move, one meaning, reused |
| **E. Content easier to consume?** | **Yes.** The recognition block's three sentences become three objects that resolve into one statement, with every approved word kept |
| **F. Commercial meaning immediate?** | **Yes.** The H1 is the largest object and the argument is the mechanic |
| **G. THE RECORD supporting, not the genre?** | **Yes.** Evidence is one black block you lift |
| **H. Character with effects removed?** | **Yes — and this is its real strength.** Both states are finished compositions. Freeze it and you still have a designed page |

**Honest verdict on B:** the most *durable* and the least risky. Its weakness is that its idea is
also its ceiling — a binary switch is one device, and a 22-route site cannot switch on every page.
It needs a written rule about where it may and may not appear before it becomes a system.

---

## 4. Self-critique — Direction C, THE TRACE

| | |
|---|---|
| **A. Digitally alive?** | **Yes, in the truest sense** — it responds to the individual reader rather than playing the same animation for everyone |
| **B. Serious modern marketing company?** | **Yes, and unusually distinctive.** But it reads *smart* first and *commercial* second |
| **C. Memorable moment?** | **Yes — the strongest of the three.** Being told, four seconds in, that you arrived with no usable trail |
| **D. Does motion communicate?** | **Yes.** The trace is literally a record of the reader's own passage |
| **E. Content easier to consume?** | **Partly.** The capture zone's recorded / not-measured split is excellent. The convert zone is still mostly prose — **the weakest content transformation in this session** |
| **F. Commercial meaning immediate?** | **Yes at the top**, but the concept competes with the argument further down. This is the direction most at risk of cleverness beating selling |
| **G. THE RECORD supporting, not the genre?** | **Yes, and it is the sharpest inversion of the Session 15 failure** — apparatus is present continuously but confined to a rail and rendered as live behaviour |
| **H. Character with effects removed?** | **Weakest of the three.** Remove the live record and C is close to a well-set page — which is the failure being corrected |

**Honest verdict on C:** the highest ceiling and the highest risk. It is the only direction that is
also a working demonstration of the service, and the only one that could be read as surveillance.
Its privacy disclosure must remain literally true in production or the direction must be abandoned.

**One thing was revised before presenting it:** the convert zone originally had no visual
transformation at all. It still has the least of the three, and that is recorded rather than
papered over.

---

## 5. Where each direction is weakest, in one line

- **A** — its identity depends on one effect, and that effect is the most expensive thing on the page.
- **B** — one device, and no rule yet for how often a 22-route site may use it.
- **C** — it puts the visitor, not the buyer's commercial problem, at the centre of the page.

---

## 6. Recommendation

> ### **RECOMMENDED DIRECTION: B — THE SWITCH**

**Why B, stated as reasons rather than preference:**

1. **It answers the owner's verdict most completely.** The complaint was that the site is not
   vibrant, not digitally designed, and does not demonstrate creative capability. B is the one
   where a single still frame — either state — already looks like the work of a confident modern
   firm, *and* the change between them is something only a screen can do. It fixes the failure both
   statically and in motion.
2. **It is the only direction that passes self-critique H strongly.** Strip every effect from A or
   C and you are close to the page that was just rejected. Strip them from B and you still have two
   finished compositions. **A creative direction whose value survives its own animation being
   switched off is the safer thing to build a 22-route site on.**
3. **It is the cheapest to build and to run** — CSS token transitions and one drawn-once canvas,
   with no per-frame cost and no performance caveat attached to it.
4. **Its idea comes directly from the approved H1** rather than from a design device chosen and
   then justified. *"Judge us on the enquiries, not the traffic"* becomes the interaction.
5. **It carries the evidence discipline most naturally.** "The claim, and what it stands on" is a
   spatial relationship that scales to every page without becoming a genre.

**What B does not have, and A and C do:** A's gate is the best single interaction in this session,
and C's opening line about the reader's own missing trail is the most memorable sentence. **If the
owner's priority is a moment people talk about rather than a system that scales, C is the stronger
answer and its risks are real but manageable.**

**Explicitly not done:** no hybrid was created, no direction was merged into another, and no
element of A or C has been folded into B. The owner may prefer either, and both are complete enough
to choose.

---

## 7. What choosing any of them still does not settle

Final typefaces · the full palette · the type and spacing scales · the grid · components · the
other 21 routes · the design system · performance budgets · a real accessibility pass · and whether
any of this converts. **None of that is decided here, and this session deliberately did not build a
design system.**
