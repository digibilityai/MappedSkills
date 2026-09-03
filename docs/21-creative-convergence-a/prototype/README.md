# THE ARRIVAL — the approved visual direction

> ### **This is the APPROVED visual direction for MappedSkills.**
> Owner approval recorded 2026-09-03 as **`DEC-017`** in `docs/00-project/DECISION_LOG.md`:
> *"Yes, 15D is clearly better."*
>
> **Do not edit this prototype.** It is the reference the design system was frozen from. The
> durable specification is `docs/22-design-system/`.

**Still PROPOSED and not approved:** the design system, the homepage (which does not exist), and
Quality Gate 10.

## Run it

Serve from the **`docs` directory**, so the comparison links to the earlier directions work:

```bash
cd docs && python3 -m http.server 8801
```

| | Open |
|---|---|
| **The approved prototype** | `http://localhost:8801/21-creative-convergence-a/prototype/convergence-a.html` |
| **The four-way comparison the owner used** | `http://localhost:8801/21-creative-convergence-a/prototype/index.html` |

## The idea

**THE ARRIVAL — demand is light travelling across a dark plane. Almost all of it passes through.
A few are CAUGHT, and the moment one is caught it gains a colour, a name and a place on a ledger.**

Watch the hero for six seconds without touching anything, then press *Run it again*. Scroll the
three beats and watch signals stall at the thresholds and turn amber past the last one. Then
*"Five things travel straight past us. One does not."*, then *"Light it from beneath"*, then the
amber close. **Resize to ~390px and scroll again** — the field recomposes into a band that feeds the
ledger.

## What was verified on it

Re-inspected in Session 16 before freezing, at 1440×900 and 390×844 and under the reduced-motion
and no-JavaScript paths. **No defect was found and nothing was changed.**

0 text elements below the WCAG threshold (73 audited per width) · 0 text under 12px · no horizontal
overflow · focus ring 3px amber at 3px offset · **0 monospace elements** · 0 images · 0 fixed
elements · the pinned sequence unpins and every state retains real geometry under reduced motion.

**Not tested:** screen readers, real devices, other browsers, print, text resize, MEDIUM width, and
any user testing.

## Isolation

Self-contained and imported by nothing. No production file was read for it or changed by it.
The superseded explorations — `../../17-visual-validation/`, `../../18-design-system/`,
`../../19-creative-reset/`, `../../20-creative-convergence/` — are retained unchanged as decision
history.
