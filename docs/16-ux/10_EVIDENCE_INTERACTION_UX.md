# Evidence Interaction UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `08_EVIDENCE_DESIGN_LANGUAGE.md` and `17_ARGUMENT_APPARATUS_HIERARCHY.md` (approved, `DEC-015`). **The apparatus vocabulary, the status set, the visibility states and the four untradeable rules are not changed here.** This document turns them into **interaction rules**.

> **The apparatus is everywhere — that is what makes the site credible. It is never the loudest thing on a screen — that is what makes it commercial.**
>
> **Presence and emphasis are different axes.**

---

## 1. What the reader can do with the apparatus

**Four verbs. That is the whole interaction surface.**

| Verb | Where | Cost |
|---|---|---|
| **Read** | Anything IMMEDIATE or ADJACENT-SECONDARY | None |
| **Open** | Anything EXPANDABLE | One deliberate action |
| **Reach** | Anything DEFERRED — a signposted section of the same page | A scroll to a named place |
| **Cite** | Any figure, finding or entry | A copyable, linkable reference |

**There is no fifth verb.** No filtering, no sorting, no toggling of evidence on and off, no "show sources" global switch, no density control, no expand-all. Each of those would make the apparatus a feature the reader operates rather than a property of the page.

---

## 2. The apparatus elements, and how each is reached

The vocabulary is closed — five elements plus the status set. A page uses the ones that apply and **does not invent new ones**.

| Element | Default reach | Never |
|---|---|---|
| **Provenance line** — what · when · where · how many · by whom | EXPANDABLE on commercial pages; IMMEDIATE on research and `/how-it-works` | Behind a tooltip · in a footer · in a modal |
| **Status mark** — measured · observed · inferred · owner-supplied · unmeasured · not testable · unattributed · **changed** | **Always visible where it applies.** It is a fact about the statement, not a note about it | Colour alone · aggregated · graded |
| **Scope note** — what this does and does not support | Adjacent to what it scopes | Below a CTA · collapsed |
| **Version stamp** — dated version; previous versions remain readable | IMMEDIATE on research entries | Hidden behind "history" with no route to the previous version |
| **Source** — where it came from, primary or secondary | EXPANDABLE | Omitted for brevity |
| **Limits and the accountability boundary** | **ADJACENT-SECONDARY, always open, at every screen size** | **Collapsible. Ever.** |

---

## 3. The five states as interaction contracts

| State | Contract | Failure |
|---|---|---|
| **IMMEDIATE** | Visible on arrival, at full weight, in the primary reading path | Being placed in a sidebar the reader's eye skips |
| **ADJACENT-SECONDARY** | Visible without action, beside or beneath its claim, **subordinate in prominence, never in type quality** | Smaller-grey-italic. That is a disclaimer treatment and it is prohibited |
| **EXPANDABLE** | Present and signposted; revealed by a deliberate action, **in place, without navigation** | A modal · a new page · a layout shift that moves the line the reader is on |
| **DEFERRED** | Not on this screen; carried in a **named** section of the same page, signposted from the claim | An unsignposted section the reader has no reason to look for |
| **ABSENT** | Not present on this page or region at all | Sneaking a "small" provenance line into a CTA region or a first screen |

---

## 4. The disclosure pattern — the site's characteristic interaction

**One pattern, used everywhere EXPANDABLE applies. It is not a component decision; it is a behaviour contract.**

| Requirement | Detail |
|---|---|
| **Works without JavaScript** | The disclosure is a native, semantic disclosure. **If script fails, the evidence is still reachable.** This is the site's differentiator; it must not depend on a bundle loading |
| **Content is in the DOM** | Always. Not fetched on open. It must be findable by search, by retrieval systems, and by in-page find |
| **Opens in place** | No navigation, no modal, no overlay, no position loss |
| **No layout shift above the reader's current line** | Content expands downward. **Nothing that moves the text the reader is currently reading** |
| **The control names what it reveals** | "Method and sample", "Where this figure comes from" — **never "More", "Details", "Learn more" or a bare chevron** |
| **State is conveyed programmatically** | `aria-expanded`, or the equivalent native semantics |
| **Focus is retained** | Focus stays on the control when opened. **Focus is never lost when a disclosure expands or collapses** |
| **Keyboard** | Operable by `Enter` and `Space`. Nothing requires a pointer |
| **No hover** | Hover may not open, close, or reveal anything load-bearing |
| **Deep-linkable** | A fragment link targeting a closed disclosure **opens it and moves focus to it** |
| **Print and screenshot** | **All disclosures render open in print.** The figures and their provenance exist to be cited; a printed page with collapsed evidence is a page with the evidence removed |
| **Reduced motion** | Instant appearance, focus managed correctly. No transition |
| **Nesting** | **None.** A disclosure inside a disclosure is a maze |

**Prohibited:** an "expand all" control · a global evidence toggle · a disclosure that starts open on desktop and closed on mobile for the *same* content class, other than the documented mobile rule in §7 · a disclosure animation that delays the content.

---

## 5. What is never collapsible

**The single rule in this document that cannot be traded.**

> **Limits are never collapsible.** The accountability boundary, the attribution limits, and the scope of what is not promised are **ADJACENT-SECONDARY and always open** — on every page, at every screen size, in every context. **A collapsed limit is a hidden limit.**

**This binds:**
- `/` Block 4 — the accountability boundary
- Every commercial page's move 5 boundary
- `/how-it-works` §4 and §5 — what is not measured, and what cannot be attributed
- `/services` Block 3
- Every research entry's limitations section
- The not-testable state on any figure

**And it binds mobile hardest**, because mobile is where the temptation to collapse is greatest and where most of the audience is.

---

## 6. Ordering rules

| Rule | Source |
|---|---|
| **The claim comes before its apparatus, in the DOM, always** — regardless of visual position at any width | `17` §5 |
| **No limit appears before the capability it limits** | B28 |
| **No apparatus above the fold on a commercial page.** One dated item on the homepage hero is the only exception sitewide | B27 |
| **No apparatus inside or adjacent to a CTA region** | B30 |
| **The proportion rule** — cumulative weight of gaps, limits and not-testable markers must not exceed what the firm does and answers for | B32 |

---

## 7. Mobile

**The apparatus column does not exist on narrow screens. It becomes a content relationship, and the rules tighten rather than relax.**

| Context | Behaviour |
|---|---|
| **Default** | **EXPANDABLE, collapsed, immediately beneath its claim** — never in a footer, never detached, never in a modal |
| **Limits and the accountability boundary** | **Expanded. Always.** The one thing that never collapses |
| **Research entries and index cards** | Metadata stays IMMEDIATE. It is the reason to trust the entry |
| **Commercial pages** | Apparatus stays ABSENT above the fold. **The constraint is stronger on mobile**, where the fold is smaller and the buyer is likelier to be a founder on a phone |
| **DOM order** | Claim, then apparatus. **A screen-reader user and a mobile user receive the same relationship a desktop reader receives** |

**Nothing that carries information disappears on mobile.** If an apparatus element can be dropped on a phone, it was decoration and should be reconsidered on desktop too.

---

## 8. The status vocabulary as an interface

Eight states. **Each carries shape + label, with colour at most a third channel.**

| State | Interaction requirement |
|---|---|
| **Measured** | Its provenance is reachable in one action from the value |
| **Observed** | Same |
| **Inferred** | **Labelled as reasoning in the reading path, not only in a disclosure.** A hedged inference that reads as an assertion is the failure this label exists to prevent |
| **Owner-supplied** | Marked as the client's, adjacent to what MappedSkills did and did not control |
| **Unmeasured** | Rendered as a **finding**, not as an empty state, a spinner, a warning or a "coming soon" (B22) |
| **Not testable** | **Visually distinct from a measured zero, distinguishable without colour, in the figure and in its text equivalent.** This is simultaneously the site's strictest honesty rule and an accessibility rule |
| **Unattributed** | Drawn at **true proportion** — a real category with real weight, never a thin residual, never "other", never omitted so categories sum tidily |
| **Changed** | Carries what it was, what was done, when, and by whom. **A state pair, never a metric pair** |

**Prohibited across all eight:** aggregation into a score, percentage, badge or coverage meter (B7) · red-amber-green or any colour that grades (B6) · a ranking or leaderboard (B8) · a trend line from a single measurement (B10) · an invented proportion in any figure.

---

## 9. Citation and shareability

The figures and findings are **the site's most citable assets and the most likely to be quoted by systems that cannot see them.**

| Requirement | Detail |
|---|---|
| **Every figure and every research finding is addressable** | A stable fragment identifier that survives republication |
| **Every figure has a text or tabular equivalent** | Conveying the same relationships. **Not a decorative alt string** |
| **Provenance travels with the claim** | A reader who copies a figure's caption gets its sample, date, location and method with it |
| **A citation format is offered on research entries** | Plain text, copyable. **No account, no email, no gate** |
| **Versions, not edits** | A revised finding gets a dated version; **previous versions remain readable** at a stable address |
| **Print fidelity** | Figures and their provenance survive printing. Disclosures open |

**Prohibited:** text rendered as an image, ever, including figure labels and quoted evidence excerpts · a figure whose labels are baked into a bitmap · a "share" widget · a gated download of any research asset.

---

## 10. Where the apparatus is absent, and why that is not a gap

| Location | Apparatus | Reason |
|---|---|---|
| Every first screen | **ABSENT** | The commercial statement owns it |
| Homepage hero | **One dated item only** | The H1's own stated risk |
| Every CTA region | **ABSENT** | Selling beside a caveat weakens both |
| `/contact`, `/schedule-call`, `/thank-you` | **ABSENT, page-wide** | The only job left is not to lose them |
| `/pricing` above "what moves the number" | **DEFERRED** | The most commercial page on the site. Price first, machinery later |
| Capability routing blocks | **ABSENT** | Routing, not persuasion |

---

## 11. The two tests, applied to interaction

**Test 1 — the standalone test.** Hide every apparatus element on the page. **The page must still sell.** If it does not, the apparatus has been made load-bearing and the argument register is incomplete.

**Test 2 — the first-fixation test.** On any screen, if the eye lands first on a date, a sample, a status mark, a method note or a scope line, **the screen is wrong regardless of how good it looks.**

**A third test, specific to interaction:**

**Test 3 — the no-script, no-hover, no-colour test.** Disable JavaScript, use only a keyboard, and render in greyscale. **Every claim's evidence must still be reachable, every status must still be distinguishable, and every limit must still be visible.** If any fails, the interaction is wrong — not the evidence.

---

## 12. What the apparatus will look like at launch, and the instruction that follows

At launch the apparatus carries at most two research entries — one of them technically blocked — the published method (partly blocked), named people (blocked), and a set of stated limits. **It will look sparse.**

**That is the correct appearance and the UX must not compensate for it.** The visual equivalent of writing around the proof deficit is filling the apparatus with volume: related links, tags, generic citations, "sources" that are vendor blogs, or containers held open for content that does not exist.

> **Build the apparatus to hold more than it currently holds, and leave it visibly not full.** A firm whose evidence layer grows is a better story than a firm whose evidence layer was always exactly as full as it needed to look.
