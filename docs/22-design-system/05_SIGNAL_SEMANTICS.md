# Signal Semantics — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**This is the most binding document in the system after the freeze.** A signal state is a claim
about the business. Getting one wrong is a claims failure, not a styling failure.

---

## 1. The governing rule

> ### **SIGNALS REPRESENT KINDS AND STATES. THEY NEVER REPRESENT COUNTS, PROPORTIONS OR RATES.**

Unless a visual renders **real, validated, first-party data with its provenance and limitations
attached**, it may not vary **count, length, area, size, density or duration** in any way a reader
could read as a quantity.

**Enforced by construction:**
- **Ledger marks are identical in length.** They name kinds, so no comparison is possible.
  *(An earlier draft drew them at different lengths — a horizontal bar chart, i.e. exactly the
  fabricated-metric pattern the programme prohibits. It was caught by inspection and fixed.)*
- **Field density is a design constant**, not a variable carrying meaning.
- **Every region containing marks carries the standing line:** *"Illustrative. The marks are kinds,
  not counts — no quantity, proportion or rate is drawn or claimed."*

**Prohibited without exception:** any implied conversion rate · any implied volume · any implied
trend · any before/after pair with a figure attached · any axis, legend, gauge or scale.

---

## 2. The eight states

Every state is distinguished by **shape as well as colour**, so the whole vocabulary survives
greyscale, colour-blindness and print.

### 2.1 TRAVELLING
| | |
|---|---|
| **Commercial meaning** | Buyer demand in motion. Activity, not yet consequence |
| **Visual** | A horizontal streak of light with a gradient tail |
| **Colour** | `text-primary`, low alpha (~0.16–0.60) |
| **Shape** | A soft-ended line. No head, no outline |
| **Motion** | Constant velocity along the field's axis. **Ambient role only** |
| **Label** | None required — it is the field's default state |
| **Reduced motion** | Drawn in a composed still, distributed across the plane |
| **Prohibited reading** | A visitor · a session · a lead · a countable unit of anything |

### 2.2 PASSED
| | |
|---|---|
| **Commercial meaning** | Demand that reached the business's edge and **never became anything.** The commercial cost of doing nothing |
| **Visual** | The same streak, dimmed to ~16% and continuing to fade |
| **Colour** | `text-primary` at very low alpha |
| **Shape** | Unchanged — it is the same object, diminished |
| **Motion** | Continues, decaying |
| **Label** | Labelled at the region level, not per mark |
| **Reduced motion** | Drawn faint in the still |
| **Prohibited reading** | A lost customer · a specific missed revenue |

### 2.3 STALLED
| | |
|---|---|
| **Commercial meaning** | It arrived and **did not complete.** The conversion failure |
| **Visual** | The streak stops, and an **open square is drawn where it stopped** |
| **Colour** | `text-primary`, decaying |
| **Shape** | **Open square — a shape channel, legible with colour removed** |
| **Motion** | Deceleration to a stop, then a slow fade |
| **Label** | The region names it: *"stopped before it completed"* |
| **Reduced motion** | The open square is drawn at its stop point |
| **Prohibited reading** | A percentage of drop-off · a benchmark |

### 2.4 CAUGHT
| | |
|---|---|
| **Commercial meaning** | **The moment demand becomes commercially meaningful.** The core event of the whole direction |
| **Visual** | Decelerates to the capture line, turns amber, travels to a ledger slot, and a **named row arrives beside it** |
| **Colour** | `commercial-accent` |
| **Shape** | A solid square head with a short trail |
| **Motion** | **Transformational role.** Paced — a minimum ~1s between arrivals so four read as four events, not a burst |
| **Label** | **Always named.** A caught signal that is not named is meaningless |
| **Reduced motion** | The ledger renders fully populated, all kinds named |
| **Prohibited reading** | An enquiry count · a client · a deal |

### 2.5 TAGGED
| | |
|---|---|
| **Commercial meaning** | **It recorded where it came from.** Measurement working |
| **Visual** | An amber streak with a solid amber head |
| **Colour** | `commercial-accent`, higher alpha than travelling |
| **Shape** | Solid head + trail |
| **Motion** | Acquired on crossing a threshold; continues at the field's speed |
| **Label** | The source is named in text wherever a tagged mark is the subject |
| **Reduced motion** | Drawn amber in the still, past the threshold |
| **Prohibited reading** | An attribution rate · a share of channels |

### 2.6 UNTAGGED / UNATTRIBUTED
| | |
|---|---|
| **Commercial meaning** | **It arrived with no usable trail, and we say so rather than assigning it a channel.** The firm's most awkward honesty commitment |
| **Visual** | An **open square** with a bone streak or a **dashed** bar. **Never amber** |
| **Colour** | `text-primary` / `shape-recessive`. **Colour is never the distinguishing channel** |
| **Shape** | **Open or dashed — always** |
| **Motion** | Same as its neighbours. It is never de-emphasised by motion |
| **Label** | **Mandatory:** *"arrived with no usable trail — unattributed"*, and where the argument requires it, *"and never assigned to a channel"* |
| **Reduced motion** | Present and labelled in the still |
| **Prohibited reading** | An error · a failure · a thing to be minimised. **A gap in the measurement never removes an enquiry from the count** |

### 2.7 MEASURED ZERO
| | |
|---|---|
| **Commercial meaning** | **A measurement whose value is nothing.** It is a result, not an absence |
| **Visual** | The **ordinary measured mark** — a filled square — with its ordinary label. Nothing is dimmed, reddened, apologised for or removed |
| **Colour** | `text-secondary`. **Never red, never amber, never a warning treatment** |
| **Shape** | Filled square, identical to any other measured mark |
| **Motion** | None. It is a statement, not an event |
| **Label** | The finding is stated in words at full weight — e.g. *"we were named in none of them"* |
| **Reduced motion** | Unchanged; it is static already |
| **Prohibited reading** | A failure state · missing data · not-yet-measured. **Measured zero and not-measured are different things and must never share a treatment** |

### 2.8 NOT TESTABLE
| | |
|---|---|
| **Commercial meaning** | **It could not be measured at all** — distinct from measured-and-found-nothing, and distinct from not-yet-measured |
| **Visual** | A **hatched square** plus its word |
| **Colour** | `text-secondary`. Colour contributes nothing |
| **Shape** | **Hatched — its own shape**, distinct from filled and from open |
| **Motion** | None |
| **Label** | **Mandatory**, and the systems are **named but never characterised** — e.g. *"Claude and Grok. Not tested, and not characterised."* |
| **Reduced motion** | Unchanged |
| **Prohibited reading** | A poor result · an untested-therefore-bad implication of any kind |

---

## 3. The shape vocabulary, at a glance

| Shape | State | Never means |
|---|---|---|
| Streak | travelling / passed | a countable unit |
| Streak + solid head | tagged | a rate |
| Solid square | caught · measured | a number |
| **Open square** | stalled · **unattributed** | a failure to be fixed |
| **Hatched square** | **not testable** | a bad result |
| Dashed bar | unattributed, in a ledger | missing data |

**Filled, open and hatched are three different shapes carrying three different claims.** Merging
any two of them is an evidence failure.

---

## 4. Labelling and accessibility

1. **Every state that appears in a page's argument is named in text.** The canvas is
   `aria-hidden="true"`; **everything it says is also said in the DOM** — ledger names, beat copy,
   the standing "kinds, not counts" note, and the region-level labels for passed and stalled.
2. **No state is distinguished by colour alone.** Verified across all eight.
3. **Nothing in the vocabulary can be summed, scored, averaged, badged or metered.** There is no
   traffic light and none can be built from these classes.
4. **A state may not be invented casually.** A new one requires a genuine commercial meaning, its
   own shape, and an entry here.

## 5. Where signals may and may not appear

| | |
|---|---|
| **May** | Where demand, capture, conversion or measurement is the **subject** of the region |
| **May not** | As a page background · behind a reading region · in a header or footer · as a loader or page transition · as a section divider · on any page whose subject is not the chain |

**The ambient budget in `06_MOTION.md` is the hard limit** — 2 regions on the homepage, 1 on a
service page, 0 on editorial. **A signal field that appears where it is not explaining something is
the drift this direction is most likely to die of.**
