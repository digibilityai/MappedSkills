# Homepage UX Architecture — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `docs/09-content-pages/copy/homepage.md` (approved, `DEC-014`) · `18_HOMEPAGE_VISUAL_NARRATIVE.md` (approved, `DEC-015`) · `17_ARGUMENT_APPARATUS_HIERARCHY.md` · `PAGE_TYPE_CRO_RULES.md` §1.

**Scope discipline.** This translates the approved visual narrative into **UX structure**: information hierarchy, sequencing, choice architecture, skip paths, interaction rules and responsive behaviour. **It is not a layout.** No grid, position, dimension, size, colour or type value appears here. **No homepage copy is written, altered or reordered** — block numbering follows the approved copy file exactly.

**The approved H1, used unchanged:**

> **Judge us on the enquiries, not the traffic.**

---

## 1. First-screen information hierarchy

**Four elements. No fifth.**

| Rank | Element | Rule |
|---|---|---|
| 1 | **The H1** | Alone at the top of the hierarchy. Readable at first paint. Nothing animates it, nothing resolves into it, nothing gates it |
| 2 | **The supporting line** | Plainly subordinate. It does the acquisition work — the whole route to an enquiry — and it must not compete for first fixation |
| 3 | **The two primary actions** | Form and booking, at equal confidence, as distinct objects rather than text links |
| 4 | **One dated, checkable item** | The **single site-wide exception** to no-apparatus-above-the-fold. Adjacent to the hero, clearly subordinate. **SUPERSEDED AT LAUNCH — see the decision immediately below** |

> **REVISED 2026-09-02 — LAUNCH DEFAULT: ZERO APPARATUS ABOVE THE FOLD.**
> Element 4 was stress-tested against seven qualification criteria in `24_HOMEPAGE_APPARATUS_DECISION.md`. **No candidate available at launch satisfies all seven.** The strongest unblocked candidate — the AI-visibility baseline — fails because its content *is* a number and it reports an observation rather than an act; the only candidate passing six of seven, the own-site intervention record, is blocked on a technical prerequisite.
> **The homepage therefore launches with four first-screen elements and no fifth.** The Gate 9A exception is **preserved and unspent**, not withdrawn, and **unlocks when the own-site diagnostic publishes** — at which point all seven criteria are re-applied. The rest of this section describes the exception's requirements and remains binding for that moment.

**The fourth element exists for a specific reason and must be built for that reason.** The approved copy identifies the H1's own risk: *"judge us"* reads as bravado unless something checkable is immediately present. **One item. Not three. Not a row.**

**What it must not be:** a badge · a metric tile · a counter · a rating · a trust seal · a logo · a number set large · anything that would sit comfortably in the `SocialProofStrip` slot. A row of anything on a first screen is the credibility-wall convention observed on every competitor examined, and the point is that this is a record entry, not a wall.

**Failure test.** If a reader glancing at the first screen could mistake anything on it for machinery, the page has become a publication in one screen.

---

## 2. The first actionable choice

**The visitor's first real choice is not "convert or not". It is "convert, route, or check".** All three must be available from the first screen, at honestly different weights:

| Choice | Weight | Mechanism |
|---|---|---|
| **Convert** | Primary | The two hero actions |
| **Route** | Secondary | The header, which carries every destination the page routes to further down |
| **Check** | Tertiary | The PROOF secondary CTA. *(The one dated item does not render at launch — `24_HOMEPAGE_APPARATUS_DECISION.md`)* |

**This is why the header matters more on the homepage than anywhere else.** A mid-funnel visitor who arrived to find a specific capability page should never have to scroll to Block 5 to navigate. The header is the skip mechanism, and the capability block is the scanning mechanism — two paths to the same pages, for two different readers.

---

## 3. Sequence, and what each block is doing to the reader

Block numbering is the approved copy's. **The sequence is not reordered.**

| Block | UX job | Reader state on arrival | Pace |
|---|---|---|---|
| **1 — Hero** | Establish the standard; offer the first choice | Unknown intent, low patience | **Fast** |
| **2 — Recognition** | Let the reader recognise their own situation without being diagnosed | "Is this about me?" | **Fast** |
| **3 — Mechanism** | Answer the question the H1 opens: *how does an enquiry actually get produced?* | Interested, willing to look | **Slow** — the first place the reader is asked to look rather than scan |
| **4 — Boundary** | Convert the limit into a position, on the object just learned | Evaluating honesty | **Slowest** |
| **5 — Capabilities** | **Route.** Not persuade | Ready to leave for the page they came for | **Fast** |
| **6 — What can be checked** | Make the evidence the point, briefly, including the admission | Checking | **Medium**, warm at the people element |
| **7 — Fit** | Let the wrong buyer leave | Self-assessing | **Medium** |
| **8 — Action** | Finish | Decided, or not | **Fast** |

**Shape of the page:** fast → fast → slow → slowest → fast → medium → warm → fast. **A commercial website with a considered middle, not a report with a headline on top.**

---

## 4. When the run appears, and how it behaves

**Block 3, once, at full weight. It is the page's only figure of full weight.**

| Property | Requirement |
|---|---|
| **Entry state** | Complete and readable with no interaction and no motion. Six approved points as one continuous object, the accountability boundary drawn, unmeasured stretches dashed, at least one arrival with no upstream segment, the client-data segment marked as the client's, intervention marks present |
| **Optional interaction** | A single non-blocking sequential reveal on entering view, **once**. Never scroll-scrubbed, never repeating, never gating the content beneath it |
| **Reduced motion** | The complete figure, all points visible, all labels present. **This is the primary state** |
| **Reuse at Block 4** | **A state change on the same object, not a second figure.** Reusing it is what makes the boundary feel like a property of the work rather than a legal section |
| **Text equivalent** | Required, conveying the same relationships — not a decorative alt string |
| **Prohibited** | Tapering (it becomes a funnel) · three-services or three-step reading · per-stage colours (it becomes a transit map) · every segment drawn as measured · omitting the unattached arrival · ambient reuse anywhere else on the site |

Full figure treatment: `11_FIGURE_UX.md` §1.

---

## 5. When accountability becomes explicit

**Block 4, immediately after the mechanism — high on the page, not at the bottom.**

**UX rules, all binding:**

- **ADJACENT-SECONDARY, at equal type quality to the claims, and never collapsible** at any screen size (B29).
- **It follows the capability it limits** (B28). The mechanism in Block 3 and the consequence in Block 2 must precede it.
- **It is not below a CTA and not inside one** (B30).
- **The three states it shows** — the accountable stretch, the client-data stretch, and enquiries arriving with no upstream segment — appear on the object the reader has just learned.
- **Proportion check applies here first.** This is the slowest point on the page and the point most at risk: if the gaps and limits accumulate more weight than what the firm does, the page becomes an apology (B32).

---

## 6. Where evidence begins, and where it stops

| Position | Apparatus state |
|---|---|
| Block 1 | **ABSENT**, except the one dated item |
| Block 2 | **ABSENT.** No statistic exists and none may be implied |
| Block 3 | **EXPANDABLE** at any mid-page claim |
| Block 4 | **ADJACENT-SECONDARY, always open** |
| Block 5 | **ABSENT.** This block is routing |
| Block 6 | **IMMEDIATE.** The one place the machinery is allowed to be the point |
| Block 7 | **ABSENT** |
| Block 8 | **ABSENT. No exceptions** (B30) |

**Block 6 will look sparse, and the UX must not compensate for it.** No filler links, no generic sources, no tags, no "coming soon", no proof container without proof in it. The apparatus should be built to hold more than it currently holds and left visibly not-full.

**Block 6 opens on the admission** — *"We have no case studies to show you"* — set plainly and at full weight, not shrunk, not softened, not tucked beneath the checkable items.

---

## 7. Where people and trust appear

**Within Block 6, and it is the warmest point on the page.**

**Currently BLOCKED** on the owner's team/people input. Until it exists, **this element does not appear at all** — no placeholder, no silhouette, no stock substitute, no "our team" without names.

**UX consequence of the block, recorded:** without visible named people the page has no staffing signal, and a publication has authors while a firm has people who answer the phone. Of everything blocking this page, this is the input that most affects whether it reads as a firm.

**Structural reservation:** the block is designed to accommodate the people element in a defined position, so that supplying the input is a content change and not a restructure. **The reserved position renders nothing while blocked** — it is not an empty container held open (B15).

---

## 8. Where the final CTA sits, and how it behaves

**Block 8. The page finishes fast.**

| Property | Requirement |
|---|---|
| **Isolation** | Its own region, with more space around it than anything preceding. **The pause before it is what makes it read as intentional rather than pushy** |
| **Both surfaces** | Form and booking at equal confidence |
| **Direct contact** | Phone and WhatsApp **as peers, not a smaller "or call us"** |
| **Apparatus** | **ABSENT. No exceptions** |
| **Sticky** | Permitted on this page type, quiet, fixed and identical sitewide where used. It must never obscure content, and must never cover anything while a mobile keyboard is open |
| **Prohibited** | A response-time number · manufactured urgency · a second competing goal · any "free" framing before the entry-offer decision · a case-study CTA |

**Failure mode to watch for, named in the approved narrative:** a CTA buried in editorial calm. On this page that is **as costly as an aggressive one**, and it is the more likely of the two.

---

## 9. How returning and informed users skip ahead

Four mechanisms, none of which requires a new UI affordance:

1. **The header.** Every destination Block 5 routes to is in the header or its dropdown. A returning visitor navigates without scrolling.
2. **Genuine heading hierarchy.** Headings describe their sections, so heading-only navigation delivers the argument — which is how a screen-reader user, a keyboard user and a scanning reader all skip.
3. **A skip link to main content**, which the current site lacks entirely.
4. **Block 5's position.** Routing sits immediately after the argument's slow middle, so a scanning reader reaches the routes on the second or third screen rather than at the end.

**What is deliberately not built:** an in-page anchor menu, a progress indicator, a "jump to" control, or any persistent secondary navigation. The page is eight blocks long. Furniture for navigating eight blocks is furniture.

---

## 10. How mobile sequencing changes

**It does not.** The block order is unchanged, because the order is the argument.

**What changes is transformation, not sequence:**

| Element | Mobile behaviour |
|---|---|
| **First screen** | Still four elements. **If they do not fit, the dated item moves immediately below the fold — it is the only one of the four permitted to move**, and it never disappears |
| **The run (Block 3)** | A genuine vertical form, not a scaled-down horizontal one. **Never horizontal page scrolling** |
| **The boundary (Block 4)** | **Fully expanded. Always.** The one thing that never collapses |
| **Capabilities (Block 5)** | A linear list of routes, one per line. Still not cards |
| **Block 6 items** | Stacked, metadata retained |
| **Apparatus generally** | EXPANDABLE, collapsed, **immediately beneath its claim** — never in a footer, never detached, never in a modal |
| **DOM order** | **Claim, then its apparatus. Always**, regardless of visual position at any width |
| **Direct contact** | `tel:` and WhatsApp one tap, at Block 8 and in the header |

**The mobile constraint is stronger, not weaker.** The fold is smaller and the buyer is likelier to be a founder on a phone.

---

## 11. The three checks that decide whether this is right

Carried from the approved narrative and restated as UX acceptance tests.

1. **The forty-second read.** A founder who scrolls the page in forty seconds without opening a single disclosure comes away knowing what the firm does, what it answers for, what it will not promise, and how to make contact.
2. **The first-fixation check, per screen.** On no screen does the eye land first on a date, sample, status mark or method note.
3. **The proportion check.** The weight of every gap, limit, dashed state and "no case studies" admission does not exceed the weight of the problem, the mechanism and the accountability the firm accepts.

---

## 12. Homepage dependencies

| Dependency | Type | Effect on structure |
|---|---|---|
| Team and people | **OWNER-BLOCKED** | Block 6's people element does not render. Position reserved, nothing displayed |
| Enquiry-response owner and business hours | **OWNER-BLOCKED** | Block 8 states what happens next, not when. No default may be substituted |
| Published phone number | **OWNER-BLOCKED** | The DIRECT CTA cannot render its number. **The WhatsApp action shares the same number and is blocked with it** |
| Own-site fixes shipped | **TECHNICAL PREREQUISITE** | Block 6's own-diagnostic link and its sentence do not appear |
| `DEC-007` production-claims decision | **OWNER-BLOCKED** | Does not affect body structure. **Blocks the page's title and metadata**, which currently carry a prohibited claim |
| Analytics in production | **TECHNICAL PREREQUISITE** | No CTA, route or read-depth behaviour on this page is measurable until it exists |
