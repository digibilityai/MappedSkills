# Self-Critique and the Four Standing Tests — Session 15D — PROPOSED

**Date:** 2026-09-03 · **Prototype:** `prototype/convergence-a.html`
**Method:** opened, interacted with, scrolled and inspected in a browser at 1440×900 and 390×844,
and compared directly against the unchanged **original A**, **original B** and **Session 15C** on
one page (`prototype/index.html`).

---

## 1. Static-quality test

> **Turn motion off. Does the composition still look premium, deliberate, contemporary and commercial?**

**YES.** Verified by applying the reduced-motion block and by removing the `js` class.

Motion off, the page is: espresso ground; a 100px+ display H1 with one amber word; a two-column
hero with an amber capture line and a named ledger of four kinds; a banded field drawn as one
composed still with its horizon and thresholds; a two-column argument with five refusals and one
amber commitment; an illuminated evidence substrate with six provenance rows; a full-bleed amber
close with four landed marks.

**That is a designed page, not a page waiting for animation.** This was B's best property and it
has been imported successfully into A's world.

**But — and this is the point of the test —** the experience is *substantially* better with motion
on. Static, the ledger is a list; in motion, it is four things being *caught* one at a time. The
static composition is the floor, not the design.

---

## 2. Digital test

> **Could this exist essentially unchanged in print?**

**NO.** A printed page cannot show demand crossing a plane, cannot catch four arrivals one at a
time, cannot stall a signal at a threshold, cannot turn a survivor amber at the moment it records
its source, cannot let a reader re-run the catch, and cannot light a surface from beneath.

The static frames are strong, but **the argument is made by behaviour**, and behaviour is the
medium.

---

## 3. Marketing-company test

> **Blur the copy. Look only at composition, rhythm, movement, hierarchy and art direction.**

Reading the page with the type unreadable, what remains is: a very large display mass top-left; a
warm dark plane with a single directional light field; one saturated amber accent used four or five
times in the whole page; a strong two-column argument; one illuminated panel; one full-colour
close. **The rhythm is long stillness punctuated by five events.**

**That reads as a high-end contemporary brand.** It does not read as:

| | Why not |
|---|---|
| **AI startup** | No mint/AI green, no neon pair, no gradient mesh, no glow orbs, no "intelligence" motif, no node graph |
| **Crypto** | No neon-on-black chart language, no coin/geometry motifs, no gradient text |
| **Developer tool** | **Zero monospace**, no terminal, no code, no syntax colour, no dark-UI chrome |
| **Research lab** | No apparatus register, no citations in the layout, no figure numbering |
| **Dashboard** | No panels, no cards, no tiles, no gauges, no axes, no legends, and **no bar of variable length anywhere** — the ledger marks are all identical by rule |
| **Publication** | No reading-column-plus-margin geometry, no editorial furniture, no serif display |

---

## 4. AI / tech-startup drift test — the specific one this session had to pass

**PASSES, and it was solved by art direction rather than by removing the field.** The five
decisions are listed in `00_DIRECTION.md` §5.1; the two that did most of the work were the
**temperature shift** (blue-black → espresso, cool light → warm bone) and the **removal of
monospace entirely**.

**Verified by counting in the rendered page: 0 monospace elements, 0 images, 0 gradients-as-
decoration, 0 fixed elements, one accent.**

**The residual risk, stated honestly:** a dark page with a moving light field is *adjacent* to that
category by construction. It is held out of it by discipline — warmth, one accent, no monospace, a
horizon, low density and mandatory stillness. **Any future page that raises the density, adds a
second accent or reintroduces a technical face will fall straight back in.**

---

## 5. The twelve inspection questions

| | Question | Answer |
|---|---|---|
| **1** | Is A unmistakably the foundation? | **Yes.** Dark-first, signal metaphor, kinetic hierarchy, movement through the system, a pinned three-beat sequence. Beside original A on the comparison page the lineage is immediate |
| **2** | Has A retained its energy? | **Yes.** Two live fields, a catch that happens to you, visible stalls, a colour change at the moment of recording |
| **3** | Is it more sophisticated than original A? | **Yes** — warmer world, one accent instead of two, no monospace, a masked field with a horizon instead of a full-bleed scatter, a composed two-column argument, and a full-colour close |
| **4** | Does it avoid AI/tech-startup drift? | **Yes**, by the specific decisions above — with the residual risk named |
| **5** | Is the motion more intentional? | **Yes.** Six behaviours, a written budget, mandatory stillness, and calm states after every resolution |
| **6** | Is the static composition stronger? | **Yes.** Original A's static state was a dark page with a stalled particle field; this one resolves to a finished layout |
| **7** | Is commercial meaning clearer? | **Yes.** Every state has a commercial name — caught, passed, stalled, tagged, unattributed — and the H1 is the largest object on the page |
| **8** | Is it less text-heavy perceptually? | **Yes.** The boundary's four paragraphs are experienced as an argument (five depart, one stays) before being read in full |
| **9** | Does THE RECORD remain secondary? | **Yes.** Evidence exists in one section and only after the reader asks for it |
| **10** | Is it memorable? | **Yes — the catch.** It is also the argument, which is the test a memorable moment must pass |
| **11** | Does it feel premium? | **Yes**, mainly because of restraint: one accent, long stillness, five events |
| **12** | Would the concept scale? | **Yes**, and the rule now exists — see `01_MOTION_BUDGET.md` §3.3 |

---

## 6. Material defects found by inspecting, and fixed

Recorded because a self-critique with nothing in it has usually not been performed.

| # | Defect | Fix |
|---|---|---|
| 1 | **Both canvases consumed a grid track** — `.heroRow > *{position:relative}` overrode `position:absolute`, so the field pushed the capture apparatus onto a second row and the beat copy to the bottom of the stage | Scoped the absolute rule to the canvas specifically |
| 2 | **The field sat on top of the supporting copy**, hurting readability and reading as wallpaper | A left-to-right mask, so the field **emerges from** the sentence describing demand and gathers toward the capture line |
| 3 | **The ledger bars had different lengths** — a horizontal bar chart, which is exactly the fabricated-metric pattern the programme prohibits | **Every ledger mark is now the same length.** They name kinds; no comparison is possible |
| 4 | The hero note was `--bone-3` at 13.4px — **below AA** | Raised to `--bone-2` |
| 5 | **Inactive step labels and the footer were 4.28:1** | New token `--bone-4` (6.58:1) for small recessive text; `--bone-3` restricted to display type and shapes |
| 6 | **The sequence field was a full-bleed scatter** with no structure at beat 01 | Banded top and bottom with a mask, given a horizon line, density reduced and streak presence raised |
| 7 | **Stalls were invisible** — a stalled signal only dimmed | A stalled signal now draws an **open square where it stopped** — a shape channel, legible in greyscale |
| 8 | **The measure beat had no transformation** — it only removed stops | Crossing the third threshold now turns a survivor **amber with a solid head**, or leaves it **open** if it has no trail |
| 9 | **Beat copy could be left invisible.** The Web Animations call used `fill:'both'` from `opacity:0`; if interrupted the text stayed hidden | Replaced with a CSS class whose **resting state is fully visible** — the entrance is an enhancement that cannot hide content |
| 10 | **The boundary section left half the width empty** and the argument read as a single column | Recomposed as two columns — the five that depart, and the one that stays, side by side |
| 11 | **On narrow the field scattered vertically** down a tall single column instead of feeding the ledger | A separate narrow band (`midN`/`spreadN`), a vertical-band mask and 50% opacity — a genuine recomposition |
| 12 | **The narrow header CTA dominated the first screen** | Reduced padding and size below 820px |

**One motion was refused rather than added:** the brief invited more energy, and none was added for
its own sake. The field's density was **reduced** and its calm states introduced, because A's
problem was never too little energy — it was energy without art direction.

---

## 7. Open risks — named, not resolved

**R1 — The field is one decision away from the category it is avoiding.** *(highest)* Raise the
density, add a second accent, or reintroduce a technical face, and this becomes a developer-tool
landing page. The budget in `01_MOTION_BUDGET.md` is the guard; **it must be treated as binding, not
advisory.**

**R2 — Canvas is a real production cost.** 170 live signals at WIDE is modest and the off-screen
pause is implemented, but this is the one part of the direction that must be profiled on a real
mid-range Android before it ships. **No such measurement exists.**

**R3 — Dark-first has a reach cost that has not been assessed.** A dark commercial site is
distinctive; it is also harder in bright sunlight and for some low-vision readers, and it inverts
the convention for a B2B services buyer. **Contrast passes; comprehension in the field is untested.**

**R4 — "Kinds, not counts" is a disclosure, not a guarantee.** Four ledger rows unavoidably suggest
a quantity. Equal-length marks and the standing note reduce it; they do not eliminate it. **If any
page ever puts a figure beside these marks, the device becomes a fabricated metric and must be
withdrawn.**

**R5 — Still one designer's reading of one prototype.** No user has seen it, and nothing here says
anything about whether it converts.

---

## 8. Verdict on the convergence

A is unmistakably the foundation and its energy survives. The sophistication is real and it came
from art direction — temperature, one accent, no monospace, a horizon, restraint and a written
budget — rather than from making the page quieter or more typographic. B contributed principles and
none of its appearance.

**The single most important thing this session produced is not the prototype. It is §3 of
`01_MOTION_BUDGET.md`** — the numbers that stop this direction becoming a tic across 22 routes.
Sessions 14A, 15B and 15C each identified that gap and left it open. It is now closed.
