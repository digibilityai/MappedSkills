# Wireframe Scope and Fidelity Boundary — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Defines the remaining Gate 9B deliverable A and D. **No wireframe is produced in this pass.**

---

## 1. The principle

> **Wireframe the smallest set that can prove the system, and prove it by covering every structural difference — not every route.**

**Twenty-nine routes do not need twenty-nine wireframes.** They need enough artefacts to demonstrate that the spine holds, that the differentiation is real, that the responsive transformations work, and that the states are honest.

**Three artefact classes:**

| Class | Definition |
|---|---|
| **MASTER** | A page type's full structure. Every other page of that type inherits from it |
| **VARIANT** | A master with a stated, reasoned structural difference. **Not a second master** |
| **STATE** | The same structure in a different condition — a form mid-submission, a disclosure open, a slot omitted |

---

## 2. Masters (6)

| # | Master | Represents | Why it must be a master |
|---|---|---|---|
| **W1** | **Homepage** | `/` | Unique structure. Eight blocks, the only permitted first-screen apparatus exception, the only FULL RUN plus STATE on one page |
| **W2** | **Standard commercial page** — modelled on `/seo` | `/seo`, `/lead-generation`, and the shape every capability page inherits | The median commercial case. **PARTIAL RUN**, boundary above midpoint, evidence compressed |
| **W3** | **Problem page** | `/problems/traffic-but-no-enquiries` | Unique structure: no CTA above the fold, an instrument in the middle, the away-pointing outcomes, the last-position commercial transition |
| **W4** | **Conversion surface** — modelled on `/contact` | `/contact` | Zero apparatus page-wide, the only form on the site, the entity block |
| **W5** | **Long-form document** — modelled on a research entry | `/research/{slug}`, `/blog/{slug}`, and structurally `/how-it-works` | Reading column, IMMEDIATE apparatus, no sticky, byline, return path |
| **W6** | **Index** — modelled on `/research` | `/research`, `/blog` | Metadata-forward cards, the one legitimate use of cards on this site, pagination |

**`/services` is not a master.** It is the commercial spine with a capability-routing block; it is covered as **V-services** below.

---

## 3. Variants (6)

**Each exists to prove one structural difference. If a variant cannot state its difference in a sentence, it is not needed.**

| # | Variant | Of | The difference it proves |
|---|---|---|---|
| **V1** | **High-scepticism commercial** — `/ai-seo` | W2 | Evidence as an early named section · **F3 full weight** · **NO RUN** · objections as a section. **The longest commercial page** |
| **V2** | **Diagnostic-led commercial** — `/conversion-optimization` | W2 | The figure arrives as the **second move** · F2-shallow **is** the partial run, one object not two · opens on the loss |
| **V3** | **Minimal commercial** — `/social-media-ads` | W2 | **The shortest page in the set. No figure. No run.** Exists specifically to prove the system permits brevity, and that length parity is not required |
| **V4** | **Pricing** — `/pricing` | W2 | **Apparatus DEFERRED entirely** · booking emphasised · the price as the largest element on its screen · **the blocked price slot omitted** |
| **V5** | **Booking surface** — `/schedule-call` | W4 | Booking region rather than a form · the page's own content outside the embed · **no form fields of its own** |
| **V-services** | **`/services`** | W2 | Capability routing by contribution · **FULL RUN with the joins marked** · no card grid |

**`/blog/{slug}` is a variant of W5** and is covered by W5 plus a note — an article differs from a research entry only in apparatus state (EXPANDABLE rather than IMMEDIATE) and in carrying no method section. **It does not need its own artefact.**

---

## 4. States (5)

| # | State | Shows |
|---|---|---|
| **S1** | **Form lifecycle** — idle → busy → success → validation failure → server failure | **Values preserved through every failure. No false success.** The most consequential set in the whole system |
| **S2** | **Thank-you** — form variant / booking variant / link-omitted variant | The routing asymmetry in `25` §5, and case A omission |
| **S3** | **Evidence disclosure** — closed / open / print | In place, no shift above the reader's line, all open in print |
| **S4** | **Navigation** — closed / dropdown open / mobile panel open | The parent-is-a-link fix, and the panel's focus behaviour |
| **S5** | **Blocked slots** — a launching page with case A slots omitted, beside the same page filled | **Proves omission leaves no visible hole**, and that supplying the input is a content change rather than a redesign |

---

## 5. Mobile structural set (7)

**Not a courtesy pass. These are the seven places the architecture is most likely to fail.**

| # | Mobile wireframe | The specific risk it tests |
|---|---|---|
| **M1** | **Homepage first screen + the run's vertical form + the boundary** | Four elements must fit; the run must have a genuine vertical form; **the boundary must be expanded** |
| **M2** | **Commercial page first screen** | **Confirmation and bridge must both fit at the smallest supported width.** If they do not, that is a finding to report — **not a reason to move the bridge below the fold** |
| **M3** | **Problem page — the checks sequence and the four-cause figure** | Vertical four-cause form; checks linear, **not an accordion**; **the three away-pointing outcomes not collapsed** |
| **M4** | **Contact form with the keyboard open** | **The sticky-overlap test.** Nothing may obscure a field or the submit control |
| **M5** | **Navigation panel open** | Focus containment that is escapable; the parent still a link; nothing removed for width |
| **M6** | **Research entry with the apparatus re-parented inline** | **The single biggest responsive risk in the direction.** Apparatus beneath its claim, never a footer, DOM order preserved |
| **M7** | **A wide comparison at narrow width** — the six-system view on `/ai-seo` | Scroll container with all content present, **and the page body not scrolling horizontally** |

---

## 6. Total and coverage check

**24 artefacts: 6 masters + 6 variants + 5 states + 7 mobile.**

**Coverage against the orchestrator's twelve named candidates:**

| Candidate | Covered by |
|---|---|
| 1 Homepage | **W1**, M1 |
| 2 Standard commercial | **W2**, M2 |
| 3 High-scepticism commercial | **V1**, M7 |
| 4 Diagnostic-heavy commercial | **V2** |
| 5 Problem page | **W3**, M3 |
| 6 Pricing | **V4** |
| 7 Contact | **W4**, S1, M4 |
| 8 Schedule-call | **V5** |
| 9 Research entry | **W5**, M6 |
| 10 Article | **W5 + note** — a variant in apparatus state only |
| 11 Research / blog index | **W6** |
| 12 Thank-you | **S2** |

**Plus three the candidate list did not name and that this set adds, each for a stated reason:** **V3** (proves brevity is permitted) · **V-services** (the only FULL RUN with joins) · **S5** (proves omission leaves no hole).

**Routes requiring no artefact of their own:** `/google-ads` and `/lead-generation` inherit W2 with different boundary positions and figure assignments, both already specified in `23`. `/about` and `/faq` inherit W2 and W5 respectively. `/work`, the legal pages and 404 have no structure worth wireframing. `/industries/manufacturing` inherits W2 — **and is not wireframed at all unless the gate clears.**

---

## 7. Fidelity boundary — what a wireframe MAY represent

| Permitted |
|---|
| Hierarchy — what is more and less important |
| Order — what comes before what |
| Relative emphasis — this is larger, heavier or more isolated than that |
| Grouping — what belongs with what |
| Approximate spatial relationship — beside, beneath, within, apart |
| Navigation structure and behaviour |
| CTA placement, role and repetition |
| Figure placement, role and relative size |
| Evidence placement and visibility state |
| Responsive transformation between width classes |
| Form flow, field order and state transitions |
| Omitted slots, annotated **in the margin** |

## 8. Fidelity boundary — what a wireframe MUST NOT decide

| Prohibited |
|---|
| Final fonts, or any typeface choice |
| Final colours, or any palette |
| Final border, rule or divider treatment |
| Visual motif execution |
| Final icons |
| Final illustration |
| Final photography, or any image content |
| Final spacing tokens or a spacing scale |
| Numeric breakpoint values |
| Polished motion, easing or timing |
| Component aesthetics of any kind |
| **The rendered form of F1–F4** — placement and role only, never the drawing |

> **Wireframes test UX. They must not smuggle in visual design.**

**Three practical rules that keep the boundary honest:**

1. **Greyscale only, and one type weight range.** A wireframe that needs colour to communicate hierarchy has failed the site's own colour-independence rule.
2. **Figures are shown as labelled placement blocks with their role, static-state requirement and text-equivalent note** — never as attempted drawings. **A half-drawn F1 is a design decision made by accident**, and F17 must not appear at all.
3. **Width classes, not pixel values.** Narrow / medium / wide. Numeric breakpoints are a Gate 10 output and must not be fixed here.

---

## 9. Annotation requirements

Each wireframe carries margin notes stating:

- the **page type** and which master it inherits from;
- the **first-screen requirement**, and confirmation that no apparatus appears above the fold;
- the **apparatus visibility state** for each region;
- the **F1 class** — FULL / PARTIAL / STATE / NONE — and why;
- **CTA roles and locations**, with the repetition count;
- **omitted slots**, with the blocker that omits them;
- **the width class** shown;
- **what this artefact proves** that no other artefact proves.

**The last note is the one that keeps the set small.** A wireframe that cannot state what it uniquely proves should not be produced.

---

## 10. What the wireframe pass must not do

Begin visual design · produce high-fidelity UI · draw F1–F4 or any figure · **sketch, prototype or placeholder F17** · invent owner-blocked content · add a route · change approved copy · change the IA · introduce a sticky sales CTA · resolve the sticky-navigation experiment by preference rather than against its stated question · **or pass Gate 9B, which remains an orchestrator action.**
