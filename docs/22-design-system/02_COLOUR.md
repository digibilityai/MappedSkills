# Colour System — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**Derived from, and measured in,** `docs/21-creative-convergence-a/prototype/convergence-a.html`

---

## 1. The principle

> **A near-monochrome warm-dark world with ONE accent, and the accent means "commercially
> meaningful".**

Colour does four jobs and no others: it is the **ground**, it is the **light** (which is also the
signal), it is the **commercial mark**, and it is the **structure** (rules and edges). It is never
a mood, a section tint, a gradient, a brand wash or a grade on a measured result.

**The temperature is load-bearing.** Direction A's blue-black read as a technology product; the
same idea on **espresso** reads as a brand. A later session may adjust values — it may not make the
world cool.

---

## 2. Semantic roles

The role is the contract. The value is an implementation detail that must preserve the role and
clear the contrast floor.

| Semantic role | Value | What it is for |
|---|---|---|
| `background-primary` | `#0B0908` | The site's ground. Warm near-black |
| `background-raised` | `#151110` | A lifted surface for a distinct region — the commercial argument, the evidence substrate |
| `border-hairline` | `#1E1815` | Section edges and quiet structure |
| `text-primary` | `#F4EFE7` | Headlines, body, action labels. Warm bone, not white |
| `text-secondary` | `#B3AAA1` | Supporting copy, labels, evidence rows |
| `text-tertiary` | `#9C938A` | Small recessive text — inactive step labels, footer |
| `shape-recessive` | `#7C736B` | **Drawn shapes and display type only. Never small text** |
| `commercial-accent` | `#FF8A1E` | **Amber.** Caught, tagged, owned, actionable |
| `accent-on-light` | `#C96200` | Amber darkened for text on a light inversion. **Currently unused** — no light inversion exists |
| `inversion-ground` | `#FF8A1E` | The amber surface of the conversion moment |
| `inversion-text` | `#0B0908` | Ground colour used as ink on the amber surface |
| `inversion-text-2` | `#3D1E00` | Supporting copy on the amber surface |
| `inversion-shape` | `#7A3B00` | Dashed/open marks on the amber surface |
| `border-control` | `#3A322C` | Secondary control outlines on the dark ground |
| `focus` | `#FF8A1E` | The focus ring. **The accent doubles as the focus colour** |

**`shape-recessive` is the one restricted token.** At 4.28:1 it clears the 3:1 large-text floor and
fails the 4.5:1 small-text floor, so it is confined to **drawn shapes** and to **display type**.
This is the same discipline the earlier sessions applied to their recessive figure stroke, and it
is why a separate `text-tertiary` exists.

---

## 3. Measured contrast

Computed directly from the token values, not estimated. **Every text pairing in the rendered
prototype was also swept element by element at both widths: 73 text-bearing elements, 0 below
threshold, 0 under 12px.**

| Pairing | Ratio | AA | AAA |
|---|---|---|---|
| `text-primary` on `background-primary` | **17.36** | ✔ | ✔ |
| `text-secondary` on `background-primary` | **8.69** | ✔ | ✔ |
| `text-tertiary` on `background-primary` | **6.58** | ✔ | ✔ (large) |
| `shape-recessive` on `background-primary` | **4.28** | ✔ **large text only** | — |
| `commercial-accent` on `background-primary` | **8.43** | ✔ | ✔ |
| `text-primary` on `background-raised` | **16.39** | ✔ | ✔ |
| `text-secondary` on `background-raised` | **8.20** | ✔ | ✔ |
| `commercial-accent` on `background-raised` | **7.96** | ✔ | ✔ |
| `inversion-text` on the amber surface | **8.43** | ✔ | ✔ |
| `inversion-text-2` on the amber surface | **6.43** | ✔ | ✔ (large) |
| Focus ring against `background-primary` | **8.43** | ✔ | — |

**Contrast floors, binding:** body and small text **≥ 4.5:1**; display text (≥24px, or ≥18.66px at
700) **≥ 3:1**; the focus ring **≥ 3:1** against both the element and its surround.

---

## 4. Where amber is permitted — and where it is not

Amber is the scarcest thing on the page. Its power is entirely a function of how rarely it appears.

**PERMITTED**

1. **The commercial state.** A caught signal, a tagged arrival, the ledger mark, the capture line.
2. **The primary action.** The CTA button fill, and the conversion moment's full surface.
3. **One word in the H1** — the word naming the commercial outcome (*enquiries*).
4. **The commercially owned claim** — the one thing the firm answers for.
5. **A limitation that must not be skipped** inside an evidence reveal.
6. **The focus ring.**
7. **The active step** in a progression rail.

**PROHIBITED**

- As a section background other than the single conversion inversion.
- As a gradient, glow, halo, shadow or blur of any kind.
- On more than one word of any headline.
- On any evidence status mark — those are shape-and-word only, never colour-coded.
- **To grade a measured result.** A measured zero is not red; a good number is not green. There is
  no green and no red in this system at all.
- As a hover state on ordinary links, list items or navigation.
- On decorative rules, dividers or borders.

**The counting rule:** *if a screenful contains more than about five amber events, the accent has
become decoration.* The approved prototype's densest screen carries four.

---

## 5. What is absent, deliberately

**There is no green, no red, no blue, no purple and no second accent.** Specifically absent, each
for a stated reason:

| Absent | Why |
|---|---|
| Mint / AI green | The single most recognisable AI-startup signal. Direction A carried it and it was the strongest driver of the technology-demo reading |
| Cyber neon pairs | Crypto and gaming |
| Red / amber / green status colours | **Colour must never grade a result.** Status is shape + word |
| SaaS blue | Category default |
| Purple | The AI cliché |
| Gradients, meshes, glows, orbs | Generic 2020s decoration; they also destroy the "one accent means one thing" contract |

---

## 6. Implementation notes

- Express the roles as semantic custom properties (`--bg-primary`, `--text-secondary`,
  `--commercial-accent`), **not** as literal colour names. A future value change must not require
  a rename.
- **Do not build a numeric ramp** (`amber-100 … amber-900`). There is one amber. A ramp invites a
  second meaning.
- `color-scheme: dark` on the root.
- The light inversion is unbuilt. **Before the first one ships, its rules must be written** — which
  roles invert, what happens to the accent, and what happens to the signal field.
