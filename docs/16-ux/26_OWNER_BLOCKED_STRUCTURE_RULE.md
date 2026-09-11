# Owner-Blocked Structure — The Omission Rule — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Sharpens `19_OWNER_BLOCKERS_AND_DEPENDENCIES.md` §13; does not replace it.

---

## 1. The ambiguity being fixed

Session 13's rule was:

> *"Where a fact is missing, the UX reserves the position and renders nothing."*

**"Reserves the position" is ambiguous, and the ambiguity is dangerous.** It can be read as *keep the heading and the container, leave the content empty* — which produces exactly the visible blank architecture the orchestrator flagged: a heading with nothing under it, a section that explains its own absence, a dotted rectangle that survives into production as an empty state.

**The corrected rule distinguishes two cases and prefers the first.**

---

## 2. The three-way test

Applied to every blocked slot, in order. **The first case that matches decides.**

### Case 0 — The blocker is BLOCKING for the route

> **The route does not launch.** No empty structure exists, because no page exists.

This is not a UX decision — it is the copy status already recorded at Gate 9. **Where it applies, cases A and B do not arise**, and the question of blank architecture is moot.

**Routes in case 0:** `/how-it-works` *(the real delivery process)* · `/pricing` *(prices, inclusions, minimum, spend/fee)* · `/about` *(people and company facts)* · `/contact` *(complete NAP, plus the technical prerequisite)* · `/schedule-call` *(who takes calls, and the technical prerequisite)*.

### Case A — Omit the slot entirely **(the default, and strongly preferred)**

> **The section, its heading, its container and its whitespace do not render.** The surrounding content closes up as though the slot were never designed.

**Applies when the slot can be removed without breaking the surrounding argument.** This is the default and should be the answer in nearly every case.

**Test:** read the page with the slot deleted. **If nothing is missing that the reader would notice, it is case A.**

### Case B — Structure present, content blocked

> **The structure renders, and the blocked element within it does not.**

**Applies only when the surrounding structure is load-bearing for a route that does launch** — that is, the section as a whole carries content that exists, and only one element inside it is blocked.

**Case B never renders an empty heading.** It renders a section whose *other* content is real, minus one element.

### Case C — does not exist

> **There is no third category.** No visible empty state · no "coming soon" · no placeholder human · no placeholder testimonial · no fake pricing row · no dotted outline · no "details to follow" · no section that explains why it is empty.

**If a slot cannot be handled by case 0, A or B, that is itself a finding:** the route should be reclassified as blocked rather than shipped with a hole.

---

## 3. Classification of every blocked slot

| Slot | Case | Behaviour |
|---|---|---|
| **`/` Block 6 — the people element** | **A** | The element does not render. Block 6 keeps its other items and its opening admission. **It will be shorter, and that is correct — the direction says it will look sparse and must not be compensated for** |
| **`/` Block 8 — "what happens next"** | **B** | Block 8 is the conversion region and must exist. **The "what happens next" sentence does not render** — the block carries the two surfaces and direct contact, and says nothing about timing |
| **`/` Block 8 — the phone number** | **B** | The action region renders; **the DIRECT control does not**, and the WhatsApp action is blocked with it. Form and booking remain |
| **`/` first screen — the dated item** | **A** | Does not render. **Launch default is four elements** — see `24_HOMEPAGE_APPARATUS_DECISION.md` |
| **`/` Block 6 — own-site diagnostic link** | **A** | The link **and its sentence** do not render, exactly as the approved copy specifies |
| **`/about` §4 — the people section** | **Case 0** | The route does not launch. If it later launches without people, **case A: the whole section is omitted** — never a "Our team" heading with nothing beneath it |
| **`/about` §6 — company facts** | **Case 0** | The route does not launch |
| **`/contact` §2 — "what happens after you send it"** | **Case 0** for the route; **A** for the slot | The section is omitted entirely. **Never a heading followed by silence** |
| **`/contact` §4 — "where we are"** | **Case 0** | The route does not launch. **A partial address is never rendered**, and the malformed production `postalCode` value is never carried forward |
| **`/schedule-call` §1 — what the call is** | **Case 0** | The route does not launch |
| **`/thank-you` §2 — "what happens next"** | **A** | The section is omitted. The page confirms arrival and offers the urgent route. **It says nothing about when** |
| **`/thank-you` §4 — the one useful link** | **A** | While the destination is blocked, **the section does not render.** Restraint, not a substitute |
| **`/pricing` §3 — the price** | **Case 0** | The route does not launch. **No band, no "from", no range, no "contact for pricing" standing in for a price** |
| **`/how-it-works` §2 — the stages** | **Case 0** | The route does not launch. **F17 must not be designed** |
| **`/work`** | **A** | The route exists, `noindex`, out of the sitemap and navigation. **No content. No placeholder.** It enters navigation the day the first permissioned case study publishes |
| **`/industries/manufacturing` + its article** | **A** | Both absent unless the gate clears. **The dropdown renders correctly with five children**; every internal link is removable in one change |
| **Every research entry and article byline** | **Case 0** | Those assets are not drafted; authorship blocks their publication, not a slot within a published page |

**Every slot resolves to case 0, A or B. None requires case C, and none is left unclassified.**

---

## 4. The consequence nobody should discover late

**Reading the table above together with the technical prerequisites produces one finding worth stating plainly:**

> **Five of the twenty-two unconditional routes are in case 0 today** — `/how-it-works`, `/pricing`, `/about`, `/contact`, `/schedule-call` — **and both conversion surfaces are among them.**
>
> **No route carrying a conversion can launch until the backend exists**, regardless of any owner input, because the form transmits nothing and the booking surface renders empty.

**This is not a new fact.** It is the approved position restated: *"a repositioned website with a form that transmits nothing would change the words on a site that still cannot receive an enquiry."* **The omission rule does not soften it, and the UX must not be designed as though it did.**

---

## 5. Wireframe consequence

The wireframe pass must show **the omitted state, not the reserved state**, for every case A slot — and must not draw a container, heading or placeholder for anything that does not render.

**One dedicated wireframe state is required** (`S5` in `28_WIREFRAME_SCOPE_AND_FIDELITY.md`): a launching page with its case A slots omitted, **placed beside the same page with the slots filled**, to prove that omission leaves no visible hole and that supplying the input later is a **content change rather than a redesign**.

**Wireframe annotation convention, binding:** a blocked slot is annotated in the wireframe's **margin notes**, never drawn on the artboard. A dotted rectangle labelled "people — TBC" inside the layout is how a placeholder survives into production.

---

## 6. The rule this document exists to enforce

> **Prefer omission. Where the surrounding structure is load-bearing for a launching route, render the structure and omit the element. Never render a container for content that does not exist.**
>
> **And do not reshape a page so that a missing load-bearing fact stops being needed** — that is not preserving a blocker, it is disposing of one.
