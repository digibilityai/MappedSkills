# Session 15C — the convergence prototype

**PROPOSED. NOT APPROVED. NOT PRODUCTION. NOT A DESIGN SYSTEM. NOT THE COMPLETE HOMEPAGE.**

**B foundation + A energy — "THE RESOLVE".** Traffic is a field of identical, anonymous marks.
Enquiries are a few distinct, named objects. The site's one move is **resolution** — the same
population, resolved.

## Run it

Serve from the **`docs` directory**, so the links across to the original prototypes work:

```bash
cd docs && python3 -m http.server 8801
```

Then open **`http://localhost:8801/20-creative-convergence/prototype/index.html`** — the
comparison sheet, with the convergence and the unchanged original B side by side.

Straight to the prototype: `http://localhost:8801/20-creative-convergence/prototype/convergence.html`

Opening the files directly from the filesystem also works. With no network the two webfonts fall
back to system faces and every behaviour still reads.

## What to do, in order

1. **Do nothing for two seconds.** The page opens on *traffic* — a dense lattice of identical
   marks — and then the same population **resolves** into four named objects. That is the whole
   direction, in one move.
2. Press **Traffic** and **Enquiries** to run it yourself. Watch the rule in the H1 move to
   whichever word currently governs.
3. Scroll slowly through **01 capture → 02 convert → 03 measure**. Each act resolves once as you
   reach it; the spine beneath fills 33 → 66 → 100.
4. Reach **“Five things fall away. One does not.”** — a rule is drawn through each promise in turn
   while the one commitment resolves in beside them. All three approved paragraphs stay in full
   underneath.
5. Press **“Lift this claim”** in the evidence section.
6. Finish on the tangerine panel: the marks arrive, and that is where they land.
7. **Resize to ~390px and scroll again.** On a narrow screen the resolve is triggered when you
   reach it rather than played to an empty screen, and the lattice is sized to the rows it becomes.

## Compare against

| | Path |
|---|---|
| **Original B — The Switch** *(unchanged)* | `../../19-creative-reset/prototype/b-switch.html` |
| Direction A — The Signal Field *(unchanged)* | `../../19-creative-reset/prototype/a-signal.html` |
| Direction C — The Trace *(unchanged)* | `../../19-creative-reset/prototype/c-trace.html` |
| The rejected Session 15 homepage *(unchanged)* | `../../18-design-system/prototype/homepage.html` |

## Honest notes

- **Motion actually runs.** No canvas, no animation library, no video. ~120 lines of inline vanilla
  JavaScript; everything animates `transform`, `opacity` or a colour token.
- **Nothing loops or idles.** Eight events across a page-length read, each followed by stillness.
- **Nothing is invented.** The approved H1 is verbatim, the approved copy meaning is preserved, and
  every evidence fact (28 unbranded runs, 2026-08-31, Pune, English, signed out, four assistants
  across five surfaces, named in none, Claude and Grok not testable) is first-party measurement
  already in this repository. No metric, client result, logo, testimonial or photograph appears.
- **No quantity is drawn.** The mark fields carry the standing line: *the marks are kinds, not
  counts — no quantity, proportion or rate is drawn or claimed.*
- **It works without motion and without JavaScript.** Reduced motion resolves everything instantly
  and removes the lattice; with JS off the page shows every resolved state, the evidence substrate
  open, and all copy and actions.

## Isolation

Self-contained and imported by nothing. Nothing in `app/`, `components/`, `styles/`, `hooks/`,
`lib/`, `public/`, `scripts/` or any config was read for this or changed by it. Sessions 15B, 15
and 14 are all unchanged.
