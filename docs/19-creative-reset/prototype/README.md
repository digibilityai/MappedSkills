# Session 15B — three digital creative directions

**PROPOSED. NOT APPROVED. NOT PRODUCTION. NOT A DESIGN SYSTEM.**

These are **creative-direction prototypes**, not homepages. Each shows enough to judge the art
direction: hero, typography, colour, composition, motion, CAPTURE → CONVERT → MEASURE, evidence
treatment, one content-heavy section, CTA treatment, section rhythm and mobile behaviour.

## Run them

```bash
cd docs/19-creative-reset/prototype && python3 -m http.server 8791
```

Then open **`http://localhost:8791/index.html`** — a comparison sheet with all three side by side —
or go straight to a direction:

| | File | The one idea |
|---|---|---|
| **A** | `a-signal.html` | Demand is a live field of signals; the site is the instrument that catches, routes and tags them |
| **B** | `b-switch.html` | The page has two states — traffic and enquiries — and the whole surface switches |
| **C** | `c-trace.html` | The site instruments this visit and shows you the record it kept, including what it could not see |

Opening the files directly from the filesystem also works. With no network the webfonts fall back
to system faces; every idea still reads.

## What to actually do in each

- **A** — scroll into the field, then **close a gate** and watch the recorded count stop rising.
  Then press *"probe this claim"* in the evidence section.
- **B** — wait ~1.5s and the hero demonstrates its own switch once; then drive the
  **Traffic / Enquiries** control yourself. Scroll for the three acts, then *lift the claim* in the
  evidence section.
- **C** — watch the record fill on the right (bottom, on mobile) as you read, then reach
  *"Here is the record of your visit."* Open the network tab first if you want to check the claim
  that nothing is sent.

**Resize the window to ~390px on each** — the mobile behaviour is materially different in all
three, especially C.

## Honest notes

- **Motion actually runs.** It is not described in Markdown. A uses a canvas field; B uses CSS
  token transitions and one keyframed sweep; C uses an SVG stroke tied to scroll.
- **Nothing is invented.** The approved H1 is verbatim, the approved copy meaning is preserved, and
  every evidence fact (28 unbranded runs, 2026-08-31, Pune, English, signed out, four assistants
  across five surfaces, named in none, Claude and Grok not testable) is first-party measurement
  already in this repository. No metric, client result, logo, testimonial or photograph appears.
- **Quantity is never drawn.** A's counters are labelled *"marks in this diagram, not clients"*;
  B's mark rows are labelled *"Illustrative. No quantity, rate or client figure is drawn or
  claimed."*
- **C sends nothing.** No network request, no cookie, no `localStorage`, no identifier, no
  third-party script. Only the two webfonts are fetched, and the page says so.
- **Known prototype limitation:** A's and B's evidence disclosures are script-driven buttons rather
  than native `<details>`, so with JavaScript disabled they do not open. C's is a native
  `<details>` and does. In production all three would use the native element. B additionally
  resolves its acts to the answered state when JavaScript is off.

## Isolation

Self-contained and imported by nothing. Nothing in `app/`, `components/`, `styles/`, `hooks/`,
`lib/`, `public/`, `scripts/` or any config was read for these or changed by them.

## Negative reference

The rejected Session 15 homepage is **deliberately unchanged** at
`../../18-design-system/prototype/homepage.html`. Open it alongside these three: it is the thing
each of them was checked against.
