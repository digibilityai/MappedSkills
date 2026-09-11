# Typography — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

---

## 1. The pairing

| | Family | Weights in use | Role |
|---|---|---|---|
| **Display** | **Familjen Grotesk** | 500 · 600 · 700 | H1, section headings, commercial statements, the owned claim, the conversion line |
| **Interface & text** | **Instrument Sans** | 400 · 500 · 600 | Body, lede, labels, controls, evidence rows, navigation, form text |

**Approved as the working pairing.** Replaceable only for a **concrete technical or licensing
reason**, and only by a pairing that holds the same roles. Both are variable faces and both must be
**self-hosted and subset** in production; the prototype loads them from Google Fonts for
convenience only.

Fallback stacks are declared and every structural claim in this system holds on them:
`ui-sans-serif, system-ui, "Segoe UI", sans-serif`.

### 1.1 The rule that matters most

> ### **THERE IS NO MONOSPACE IN THIS SYSTEM. ANYWHERE.**

Monospace was the apparatus register that made the Session 15 homepage read as a document, and it
is simultaneously the register that makes a dark site read as a developer tool. **It is the single
face that can drift this direction into either failure**, so it is prohibited outright rather than
rationed.

**Verified in the approved prototype: 0 elements resolve to a monospace family.** This is a
countable check and should be run on every future page.

Small orientation labels — the role monospace used to fill — are set in **Instrument Sans 600 at
0.8rem with 0.18em tracking, uppercase**. That is the *label* register and it replaces the
technical one entirely.

---

## 2. The roles

Sizes are **ranges**, expressed as `clamp(min, fluid, max)`. A later session may move a value
inside its range; it may not reorder the hierarchy.

| Role | Family / weight | Range | Notes |
|---|---|---|---|
| **H1 / display** | Display 700 | `clamp(2.7rem, 7.6vw, 7.2rem)` | One per page. Line-height 0.94, tracking −0.035em |
| **H2 — major section** | Display 700 | `clamp(1.9rem, 5.4vw, 4.6rem)` | The argument's headline in a full-height region |
| **H2 — standard section** | Display 700 | `clamp(1.7rem, 4.4vw, 3.6rem)` | Evidence claims, ordinary sections |
| **Commercial statement** | Display 700 | `clamp(2rem, 5.2vw, 4.4rem)` | The page's heaviest single statement. **One per page** |
| **The conversion line** | Display 700 | `clamp(2.2rem, 6.2vw, 5.6rem)` | The CTA moment only |
| **H3 / owned claim** | Display 700 | `clamp(1.5rem, 3.3vw, 2.9rem)` | The one thing the firm answers for |
| **Seam line** | Display 600 | `clamp(1.35rem, 3.1vw, 2.5rem)` | The handoff between regions |
| **List statement** | Display 600 | `clamp(1.15rem, 2.3vw, 1.95rem)` | Argument lists — the refusals |
| **Lede** | UI 400 | `clamp(1.05rem, 1.32vw, 1.24rem)` | Hero support; never competes with the H1 |
| **Body** | UI 400 | `1.0625rem` / 1.62 | The floor for reading text |
| **Small body** | UI 400 | `0.95rem` | Ledger labels, secondary rows |
| **Note / caveat** | UI 400 | `0.86rem` | The "kinds, not counts" line and equivalents |
| **Label** | UI 600 | `0.8rem`, 0.18em tracking, uppercase | Orientation metadata. **Replaces monospace** |
| **Step label** | UI 600 | `0.8rem`, 0.1em tracking, uppercase | Progression rails |
| **Control** | UI 600 | `1rem` (`0.9rem` compact) | Buttons and controls |
| **Evidence row** | UI 400 / 600 for the term | `1rem` | Provenance. **Same size as body-adjacent text — never shrunk** |

### 2.1 Binding typographic rules

1. **Nothing that carries meaning renders below 12px.** Verified: 0 elements under 12px.
2. **Evidence text is never smaller, greyer or lighter than the copy around it.** Subordination is
   bought with position and disclosure, never with type quality. This is carried unchanged from the
   approved evidence doctrine.
3. **One H1 per page**, and it is the largest object on the page.
4. **One commercial statement per page.** A page with two has none.
5. **Sentence case throughout.** Uppercase is confined to the label roles above.
6. **No italics for emphasis** — emphasis is weight. Italic is available for genuine titles only.
7. **`text-wrap: balance` on display headings**, and punctuation stays with its word (a nowrap
   wrapper) so a comma never orphans onto its own line. *This was a real defect found twice by
   rendering.*
8. **Tabular lining numerals** wherever a figure appears, so any numeral reads as a recorded value.
9. **Measure:** reading text is capped at **56–60ch**; ledes at **40–44ch**; display headings at
   **12–19ch** depending on role.

---

## 3. How typography stays out of document territory

The Session 15 failure was not a bad typeface — it was a *geometry*. These four rules prevent the
return:

| Prohibited | Why |
|---|---|
| A **reading column with a metadata margin** as the page's dominant geometry | That shape *is* a report, whatever the typeface |
| **A persistent metadata register** running down a page | Evidence appears where a claim invites it, not continuously |
| **Rules used as chrome** — hairlines opening every section | Structure comes from surface, scale and space |
| **Type as the only visual system** | The signal field participates in the composition; typography shares the page with it |

**And the counter-rule, so this does not become an excuse for weak typography:** display type is
the largest object on every screen. THE ARRIVAL is not a picture with captions.

---

## 4. Responsive behaviour

Type scales **fluidly inside its range** rather than stepping at breakpoints. The rules:

- **The hierarchy never inverts.** At every width, H1 > commercial statement > H2 > H3 > lede >
  body > label.
- **Body never scales down.** 1.0625rem is the floor at every width.
- **Display maxima are reached only at WIDE**; at NARROW the H1 sits at its minimum and wraps to
  three lines, which is intended.
- **Ledes may compress toward body size at NARROW** but never below it.
- **Labels never scale.** They are already at the small-text floor.
- **No one-off sizes per breakpoint.** If a size is needed at one width only, the layout is wrong.
