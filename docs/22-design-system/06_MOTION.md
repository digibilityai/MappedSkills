# Motion System and Budget — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**The budgets in §3 are BINDING MAXIMUMS, not targets.** A page may use fewer. A page may not use
more without a recorded decision.

---

## 1. Why motion is governed rather than encouraged

This programme has failed in both directions: Session 15 shipped a homepage with effectively zero
motion and was rejected as a document; Direction A's field was preferred but read as a technology
demo partly because its motion was ambient and unbounded. **The correction is not "more motion" or
"less motion" — it is motion with a named role, a stated duration and a counted budget.**

---

## 2. The five motion roles

### 2.1 AMBIENT
| | |
|---|---|
| **Communicates** | Buyer demand exists whether or not you are watching |
| **Appropriate** | Only in a region whose subject is demand, capture, conversion or measurement |
| **Prohibited** | As page atmosphere · behind reading text · in headers, footers or navigation · as a loader or page transition · looping purely for effect |
| **Duration** | Continuous while on screen, and **it must have a calm state** — it drops to a reduced rate once the region's point is made |
| **Easing** | Linear velocity within the field; no per-object easing |
| **Reduced motion** | **Does not run.** One composed still frame is drawn instead — never a blank region |
| **Performance** | Canvas. Budgeted counts, off-screen pause, no per-frame DOM writes |

### 2.2 RESPONSIVE
| | |
|---|---|
| **Communicates** | The system answers a deliberate action |
| **Appropriate** | Controls that re-run or reveal something the reader asked for |
| **Prohibited** | Hover-only reveals of anything that matters · gimmick cursors · effects that fire on scroll position but pretend to be a response |
| **Duration** | **160–520ms** |
| **Easing** | *state* — `cubic-bezier(.62,0,.3,1)` |
| **Reduced motion** | Resolves instantly; **the control still works** |
| **Performance** | `transform` / `opacity` only |

### 2.3 TRANSFORMATIONAL
| | |
|---|---|
| **Communicates** | A commercial state is changing — caught, stalled, tagged |
| **Appropriate** | The catch; a threshold crossing; a promise departing; a claim being lit |
| **Prohibited** | For anything that is not a commercial state change. **Decorative transformation is the failure mode this role exists to prevent** |
| **Duration** | **520–1100ms**, with a **minimum ~1s gap between consecutive arrivals** so a sequence reads as events rather than a burst |
| **Easing** | *move* — `cubic-bezier(.22,.85,.24,1)` |
| **Reduced motion** | **Renders its final semantic state immediately.** Nothing is lost |
| **Performance** | `transform` / `opacity`; canvas where the object lives in a field |

### 2.4 SCROLL-TRIGGERED
| | |
|---|---|
| **Communicates** | A new part of the argument has become active |
| **Appropriate** | Once per region, on entering view |
| **Prohibited** | **Scroll hijacking · scroll scrubbing · replaying on re-entry · gating content behind an animation · making the reader wait** |
| **Duration** | **400–1100ms**, fired once and then latched |
| **Easing** | *move* |
| **Reduced motion** | The region renders resolved on arrival |
| **Performance** | `IntersectionObserver`, unobserve after firing. Any scroll handler is `rAF`-throttled and writes at most two properties |

### 2.5 FEEDBACK
| | |
|---|---|
| **Communicates** | Your input was received |
| **Appropriate** | Buttons, links, controls, focus, form fields |
| **Prohibited** | Anything that changes layout · anything that delays the action · more than two properties |
| **Duration** | **120–200ms** |
| **Easing** | *move* for lifts, *state* for colour |
| **Reduced motion** | Colour and border feedback remain; transforms are dropped |
| **Performance** | `transform` / `opacity` / colour only |

**Two easing families. There is no third.** A per-component easing zoo is how a motion system stops
being a system.

---

## 3. THE BUDGET — binding maximums

| | **Homepage** | **Service / commercial page** | **Editorial, research, legal, utility** |
|---|---|---|---|
| **Ambient regions** | **2** | **1** | **0** |
| **Major motion events** | **5** | **2** | **1** |
| **Signature interactions** | **2** | **1** | **0** |
| **Pinned sequences** | **1** | **0** | **0** |
| **Full-colour inversions** | **1** | **1** | **0 or 1** |

**Definitions, so the counting is unambiguous:**
- **Ambient region** — one continuously running field.
- **Major motion event** — one transformation a reader will notice and remember. The hero catch is
  one; a three-beat sequence is one; a section's reveal is one.
- **Signature interaction** — a control that re-runs or reveals the system.
- **Pinned sequence** — one sticky region the reader scrolls through.

**These are maximums. Most pages should use fewer.** `/thank-you`, legal pages and 404 should use
**none**.

### 3.1 What the approved prototype spends
Ambient 2/2 · major events 5/5 (the catch · the seam · the three-beat sequence · the boundary
pass-through · the CTA landing) · signature interactions 2/2 · pinned 1/1 · inversions 1/1. **At
budget on every line — which is why the homepage is the only page allowed the full expression.**

### 3.2 Where stillness is MANDATORY
1. **Reading-heavy regions.** Once revealed, argument copy and evidence rows do not move.
2. **After every major transformation.** The system calms — the field drops to a reduced rate once
   its point is made.
3. **Off-screen.** Every animation stops when its region leaves the viewport.
4. **Utility regions** — footer, legal, navigation panels.
5. **After a scroll-triggered event has fired.** It latches; scrolling back does not replay it.

### 3.3 How secondary pages stay quieter
They **inherit the language and do not replay the show**: same palette, type, mark vocabulary and
eight states; **the field appears as a single composed still, not running**; one major event at
most, and it is the evidence reveal if the page has a claim; no pinned sequence and no catch
interaction.

**The homepage is the only page that gets the full expression. This is the rule the previous three
sessions each identified as missing.**

---

## 4. Rhythm

The required shape is **ACTIVE → RESOLUTION → STILLNESS → NEW EVENT → STILLNESS**, not constant
movement from top to bottom. Anticipation and release are part of the design; a page that moves
everywhere has no events at all.

**Practical test:** if you cannot list a page's motion events on one hand and say what each one
means, the page is over-animated.

---

## 5. Reduced motion — a first-class mode

**`prefers-reduced-motion: reduce` is a mode, not a degradation.** System-wide rules:

1. **No meaning may depend on animation.** Verified structurally: with the reduced-motion rules
   applied, every state retains real geometry — the ledger, the owned claim, the seam, all six
   evidence rows and the conversion marks.
2. **Transformational states render their final semantic state**, immediately or by cross-fade.
3. **Ambient motion stops entirely** and the field draws **one composed still** — the plane, the
   horizon, the thresholds at their final state, the signals distributed. **Never a blank region.**
4. **Pinned sequences become normal-flow content.** Verified: the rail collapses from 300vh to its
   natural height and the stage becomes static.
5. **Controls still work.** A reduced-motion reader can still re-run the catch and open the
   evidence; the states simply swap without transitions.
6. **Durations collapse to ~1ms and delays to 0** rather than being removed, so state changes stay
   legible as changes.
7. **The same guarantees apply with JavaScript off**, via a no-JS class hook. Verified structurally.

---

## 6. Scroll rules

- **No scroll hijacking, no scrubbing, no forced sequences, no waiting.**
- **At most one pinned sequence per page**, and the reader can leave it at any moment.
- Every action remains reachable throughout; nothing is gated behind an animation completing.
- Scroll handlers are `rAF`-throttled, write at most two properties, and do nothing when the state
  is unchanged.
