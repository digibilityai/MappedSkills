# PHASE J — STAGE 3 — FAQ · ABOUT · HOW-IT-WORKS

**Date:** 2026-09-07 · **Status:** **IMPLEMENTED (two of three) — AWAITING OWNER / ChatGPT REVIEW**

---

## 1. `/faq` — native disclosure

### The permission this rests on

The route file shipped in Session 29 with a header note reading **"INTERACTION: NONE … an answer a
sceptical reader has to open is an answer the page has decided to hide."** That instinct is right,
and the approved UX architecture already says so — **and already carves out this one page**:

> *"`/faq` is the **ONE** page type where a collapsed-on-load accordion is permitted
> (A20 CONDITIONAL), because each item is a genuine discrete question the reader chooses between.
> It is **not** permitted for limits, method, attribution, or anything a reader needs in order to
> evaluate a claim."*
> — `docs/16-ux/03_PAGE_TYPE_ARCHITECTURE.md` §14

The same permission is recorded in four further approved documents:
`13_ACCESSIBILITY_REQUIREMENTS.md` · `15_SEARCH_DISCOVERY_UX.md` §34 (*"Yes, collapsed on load"*) ·
`16_PAGE_STRUCTURE_MATRIX.md` row 22 (*"EXPANDABLE"*) · `18_UX_ANTI_PATTERNS.md`.

**Session 29 was more conservative than the architecture allows, not differently governed.**
Stage 3 takes the permission, and the route header now records that.

### What was built

`<dl>/<dt>/<dd>` → a list of native `<details>`/`<summary>`, **collapsed on load from the server**.

| Property | Result |
|---|---|
| Collapsed by | **The server** — no script, no hydration step, **no layout shift** |
| Client components added | **0** |
| No-JS | `<details>` is a native control. A reader with scripting off can open **every** answer. Verified: 11 `<details>`, **0** carrying `hidden` or `display:none` |
| Crawlable | Every question and answer is in the server HTML. Verified by string match on the served page |
| Keyboard | Native — `<summary>` is focusable, Enter and Space toggle |
| ARIA added | **None.** `<summary>` exposes its own expanded state; a hand-rolled `aria-expanded` would be ARIA papering over structure |
| Motion | One 180 ms T4 micro on the plus/minus affordance. **The only line of motion Stage 3 adds anywhere.** Covered by the global `prefers-reduced-motion` floor in `app/globals.css` |
| Answers that cost the firm work | Rendered identically to every other row — not demoted, reordered, greyed or collapsed differently |

### Schema — verified, not assumed

`FAQPage` is still generated **from the same array** that renders the visible questions.
Measured against the served page:

| Check | Result |
|---|:--:|
| Schema questions | **11** |
| Visible `<summary>` elements | **11** |
| Duplicate questions | **0** |
| Schema questions absent from the HTML | **0** |
| Schema answers absent from the HTML | **0** |
| Answers empty or stubbed | **0** |

(11, not 12: Q2 is the owner-blocked fee/spend question and still renders nothing — unchanged.)

---

## 2. `/about` — Prototype C, translated

`StateComparison` is added to `components/routes/primitives.tsx` and used once, on §5
*"Who we work with / And who we do not."*

| | |
|---|---|
| **Arrays** | `FOR_WHOM` and `NOT_FOR_WHOM` — **unchanged. Six sentences in, six sentences out** |
| **Copy added** | **Six words** — the two column labels *"Where this works"* / *"Where it does not"*, which are the labels the approved Prototype C carried |
| **Semantic equality** | The two halves are **equal width at every viewport** — measured at 1425 px: 611 px and 611 px, with a 1 px rule between. No area, count or ordering implies one set is larger or more likely |
| **Marks** | The site's existing states — `owned` for a condition met, `open` (dashed) for one not met. Same convention as everywhere else |
| **Headings** | Two `<h3>` under the section's `<h2>`. **No heading jump**; one `<h1>` retained |
| **Narrow** | The halves stack and the limit becomes a horizontal rule — a 1 px vertical hairline between stacked blocks says nothing |
| **Motion** | **None.** Prototype C carried one T2 (the rule drawing itself in). **It is deliberately not implemented** — the composition already states that there are two halves and a limit, the motion budget records that "zero is a legitimate answer for T1 and T2", and `/about` therefore ships with **no client component and no JavaScript** |
| **Proof boundary** | This compares **stated fit criteria**. It is not evidence, not a result, not a client count. No history, founder story, team size, years, growth, markets, logos or awards appears |

**One defect found and fixed here.** A first draft used the section's own chapter label and display
line as the column labels, on the reasoning that it added no copy at all. It rendered
*"WHO WE WORK WITH"* twice within about eighty pixels, which reads as a mistake rather than as a
structure. Six structural words is the better trade, and it is the version already reviewed.

---

## 3. `/how-it-works` — BLOCKED. No bespoke change made.

The brief §15 asked to *"transform the page around CAPTURE → CONVERT → MEASURE"* so the model is
*"understandable within seconds"*. **Two independent, recorded constraints prevent it, and neither
can be resolved from inside this session.**

### 3.1 The stage content is owner-blocked

The route's §2 — the stages themselves — **renders nothing today, deliberately**:

> *"§2 — THE STAGES — OWNER-BLOCKED, AND IT RENDERS NOTHING. There is deliberately no element here.
> Not an empty section, not a heading with nothing under it … and not the six-word stage outline
> from the brief, which the approved copy states is architecture and must not be published as
> though it were a description of what happens."*

**`CAPTURE → CONVERT → MEASURE` does not appear anywhere in `/how-it-works`' approved copy.**
Verified by grep: the only occurrence of those words on the route is inside the comment describing
the blocked five-stage outline. Building a three-stage system here would mean either publishing the
blocked architecture or importing wording from `/services`, and both are the failure this
programme's proof rules exist to prevent.

### 3.2 A disclosure treatment is prohibited on this page

The same clause that permits an accordion on `/faq` forbids it here:

> *"It is **not** permitted for limits, **method**, attribution, or anything a reader needs in order
> to evaluate a claim."*

**`/how-it-works` is the method page.** Its `FindingList` carries a further binding rule from
`06_PROBLEM_PAGE_UX.md` §5 — findings are *"never collapsed by default, never behind a disclosure"*
— because several of them point away from the firm.

### 3.3 What the route did receive

The shared Stage 3 opener system: `RouteHero mode="offset"` and `CommercialClose mode="centred"`.
Measured effect at 1425 px: **9 848 → 9 807 px**. At 390 px and 860 px it is **unchanged**.

### 3.4 Owner decision required

A **static three-band annotation** of the existing `MethodChain` figure — marking which of the six
measured points falls under capture, convert and measure — is buildable and would need no new
prose. It is **not built**, because the same three labels on the method page could reasonably be
read as the stage description that §2 is blocked from making, and this session cannot resolve that
ambiguity. **The owner should decide whether that reading is acceptable.** The alternative is to
supply the blocked stage content, at which point §2 becomes a content change at its existing
position rather than a redesign.
