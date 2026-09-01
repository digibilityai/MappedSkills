# Argument / Apparatus Hierarchy — APPROVED, BINDING

**Session:** 12 · Orchestrator correction / stress-test pass · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01 (Gate 9A, `DEC-015`).**

> **This is the single biggest execution risk in the recommended direction.** The territory's differentiator and its principal failure mode are the same feature. This document exists so that the feature cannot quietly become the failure.

---

## 1. The governing rule

> **The buyer meets commercial meaning first, and evidence second. Never the reverse.**
>
> **Emphasis is commercial. Presence is evidential.**

The apparatus is **everywhere** — that is what makes the site credible. It is **never the loudest thing on a screen** — that is what makes it commercial. Presence and emphasis are different axes.

### The two tests that decide every case

**Test 1 — The standalone test.**
> Hide every apparatus element on the page. **The page must still sell.**

If it does not, the argument register is incomplete and the apparatus has been made load-bearing. The apparatus is *pure addition*. This is the rule most likely to erode in execution and it is the one to check first at every review.

**Test 2 — The first-fixation test.**
> On any screen, what does the eye land on first?

If the answer is a date, a sample size, a method note, a status mark or a scope line, the screen is wrong — **regardless of how good it looks.** The correct answer is always a commercial statement in the argument register.

---

## 2. The five apparatus visibility states

| State | What it means | Reader effort |
|---|---|---|
| **IMMEDIATE** | Visible on arrival, at full weight, in the primary reading path | None |
| **ADJACENT-SECONDARY** | Visible without action, positioned beside or beneath the claim, subordinate in prominence but **not** subordinate in type quality | None |
| **EXPANDABLE** | Present and signposted; content revealed by a deliberate action, in place, without navigation | One action |
| **DEFERRED** | Not on this screen; carried in a later, named section of the same page | Scroll to a signposted section |
| **ABSENT** | Not on this page or region at all | n/a |

**"Subordinate in prominence, not in type quality"** is the load-bearing phrase. ADJACENT-SECONDARY means smaller in the visual hierarchy — it never means smaller-grey-italic. The disclaimer-treatment prohibition (`/` Block 4, anti-pattern B5) binds every state above.

---

## 3. The binding table — apparatus state by context

| Context | Apparatus state | Why |
|---|---|---|
| **First screen — every page, without exception** | **ABSENT** | The commercial statement owns the first screen. This is the fast-open rule from `16` §4B |
| **Homepage first screen — the single exception** | **ONE** dated, checkable item, ADJACENT-SECONDARY | The approved copy identifies the H1's own risk: *"judge us"* reads as bravado unless something checkable is immediately present. Exactly one item, clearly subordinate to the H1. **Not a badge, not a metric tile, not a counter** |
| **Commercial page — opening moves** | **ABSENT** | Search-intent confirmation and the company bridge must be unobstructed. `MESSAGING_ARCHITECTURE.md` §2 failure mode B — a page that will not confirm intent plainly loses the demand it exists to capture |
| **Commercial page — mid-page claims** | **EXPANDABLE** | Provenance available on demand, without lengthening the page for a reader who does not want it. This is the mechanism that keeps the site from being text-heavy |
| **Commercial page — limits / accountability boundary** | **ADJACENT-SECONDARY** | Visible without action, at equal type quality to the claims. **Never expandable, never collapsible** — see §4 |
| **`/how-it-works`** | **IMMEDIATE** | This page *is* the apparatus. Its own approved copy: *"This page exists to be checked"* |
| **Research entries** | **IMMEDIATE** | `/research` §1: sample, date, location and method *"in the entry itself rather than in a methodology appendix nobody opens"* |
| **Research index cards** | **IMMEDIATE** | The metadata schema — date · systems or scope · sample · version — is the thing that distinguishes the index from a blog listing |
| **Problem page — opening** | **ABSENT** | The reader is problem-aware and has not named a discipline. Machinery first would lose them |
| **Problem page — diagnostic section** | **ADJACENT-SECONDARY** | The observable outcome of each check is part of the instrument, not commentary on it |
| **Articles** | **EXPANDABLE**, byline IMMEDIATE | Named authorship is a trust asset and belongs in the reading path; sourcing belongs on demand |
| **CTA regions — everywhere** | **ABSENT. No exceptions** | Selling beside a caveat weakens both. New anti-pattern B30 |
| **`/pricing`** | **DEFERRED** to "what moves the number" | The most commercial page on the site. Price first, machinery later |
| **`/contact`, `/schedule-call`, `/thank-you`** | **ABSENT** | `PAGE_TYPE_CRO_RULES.md` §9 — proof here is a distraction |
| **`/about`** | **ADJACENT-SECONDARY** | People and credentials lead; provenance supports |
| **`/faq`** | **EXPANDABLE** | The answer leads; its basis is available |

---

## 4. The four rules that cannot be traded

**1. Limits are never collapsible.**
Everything else in the apparatus may be EXPANDABLE. The accountability boundary, the attribution limits and the scope of what is not promised are **ADJACENT-SECONDARY and always open** — on every screen size, including mobile. A collapsed limit is a hidden limit, and the approved copy is explicit that these are positions, not disclaimers. *(New anti-pattern B29.)*

**2. No limit appears before the capability it limits.**
Order on every page: **what we do → what we are accountable for → where that stops.** A page that qualifies before it claims has argued itself down before the reader knows what is on offer. *(New anti-pattern B28.)*

**3. No apparatus above the fold on a commercial page.**
*(New anti-pattern B27.)*

**4. The proportion rule.**
On any page, the cumulative visual weight of gaps, limits, unmeasured states and not-testable markers must not exceed that of what the firm does and is accountable for. **Honesty rendered without proportion becomes apology.** *(New anti-pattern B32.)*

---

## 5. Mobile

The apparatus column does not exist on narrow screens. It becomes a **content relationship**, and the rules tighten rather than relax.

| Context | Mobile behaviour |
|---|---|
| **Default** | **EXPANDABLE, collapsed, immediately beneath its claim** — never in a footer, never detached, never in a modal |
| **Limits and the accountability boundary** | **Expanded. Always.** The one thing that never collapses |
| **Research entries and index cards** | The metadata schema stays IMMEDIATE. It is the reason to trust the entry |
| **Commercial pages** | Apparatus remains ABSENT above the fold — the constraint is *stronger* on mobile, where the fold is smaller and the buyer is likelier to be a founder on a phone |
| **DOM order** | **Claim, then its apparatus. Always** — regardless of visual position at any width. A screen-reader user and a mobile user receive the same relationship a desktop reader receives |

**Nothing that carries information disappears on mobile.** If an apparatus element can be dropped on a phone, it was decoration and should be reconsidered on desktop too.

---

## 6. How the apparatus strengthens the argument rather than competing with it

Three mechanisms, stated so the relationship is designed rather than hoped for:

1. **It shortens the argument.** Every date, sample, run count and scope note that leaves the prose is a sentence the buyer does not read. The apparatus is what makes a plain, short, confident argument register *possible* — it is the reason the site is not text-heavy, not the reason it might become so.
2. **It answers the question the argument provokes.** A short declarative claim invites *"how do you know that?"*. The apparatus answers it at the exact moment it is asked, without the argument having to defend itself mid-sentence.
3. **It is felt more often than it is read.** Most buyers will never open a disclosure. They will register that disclosures exist, uniformly, beside everything. That impression is most of the commercial effect — which is precisely why the apparatus must be **consistent and visible** but must **never lead**.

> If the apparatus is ever competing with the argument, the fault is in placement or emphasis — never in the amount of evidence. **The correct response is to move it or subordinate it. It is never to publish less provenance.**
