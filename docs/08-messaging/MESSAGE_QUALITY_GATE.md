# Message Quality Gate — APPROVED

**Session:** 10 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01 (Gate 8, `DEC-013`).** **This document defines a per-page gate for future copy, now binding on Session 11. It is not itself the `QUALITY_GATES.md` entry** — Gate 8 (Messaging Architecture) is recorded there and in `DEC-013`.
**Complements, does not replace:** `docs/05-content/CONTENT_QUALITY_GATE.md` (approved, Gate 7), which governs the asset's *content*. This gate governs its *message*. **An asset must pass both.**

---

## 1. The gate

Every page of copy passes only when **all twenty** items are satisfied. **Any single failure blocks publication. There is no partial pass and no score.**

| # | Item | Pass condition | Fails when |
|---|---|---|---|
| **1** | **Correct company positioning** | Levels 1 and 2 of the message hierarchy are present and unchanged in meaning: demand capture → measurable qualified enquiries, with the accountability boundary | The page implies the company is a technique category · a capability has risen to Level 1 · the meaning of `DEC-005` has drifted while being reworded |
| **2** | **Correct page and search intent** | The page satisfies the intent it was architected for, and confirms the searched capability within the first screen where it has one | A commercial page delays or withholds search-intent confirmation to protect the positioning · the page serves a different intent than its assignment |
| **3** | **Relevance is legible quickly** | A visitor can tell within one screen whether this page is about their situation | The opening is abstract, aspirational, or could sit on any agency's site |
| **4** | **Commercial outcome is clear where appropriate** | The connection from this page to qualified enquiries is stated, not assumed | A capability page describes the discipline and never reaches the outcome · the outcome is implied by a CTA rather than stated |
| **5** | **Capabilities do not overwhelm the proposition** | Capabilities appear at Level 5, introduced by what they contribute to the chain | A card grid, a service menu, six capabilities as six pillars, or AI search given disproportionate space |
| **6** | **Claims are evidence-safe** | Every significant claim carries a governance class (A–F) and a ladder level (A–F), assigned at brief stage. **Zero class F, zero ladder F** | Any unclassifiable claim · any invented number · any guarantee · any superiority claim without a cited third-party basis · any prohibited figure |
| **7** | **No invented proof** | Every proof element on the page exists and can be produced on request | A logo wall · a client count · a testimonial · a rating · an award · a partnership · a "coming soon" gesture at proof · a CTA referencing case studies |
| **8** | **Uncertainty is appropriately qualified** | Limits are stated once, at full strength, in the right place — specifically, not vaguely | A limit softened into a hedge · scattered defensive disclaimers · a projected figure · "typically", "up to" or "on average" standing in for a number that does not exist |
| **9** | **Buyer-readable language** | India-first register; plain business English; technical terms defined in place at first use | US SaaS or RevOps vocabulary · "inquiry" · phrasing that presumes marketing fluency the buyer does not have |
| **10** | **No unnecessary jargon** | Every technical term on the page is load-bearing and glossed | An acronym the buyer does not use · a term used because it sounds expert · a coined or branded noun |
| **11** | **CTA matches intent** | The CTA role, commitment level and placement match the approved page-type rules | A PRIMARY CTA at the top of an article · a sticky CTA on research, methodology or editorial · a hard sell above the fold on the problem page · a CTA that promises an outcome |
| **12** | **No generic agency language** | Passes the swap test in §2 | Any prohibited term from `TERMINOLOGY_DICTIONARY.md` §3 · an unjustified restricted term from §4 · an opening that survives the company name being swapped |
| **13** | **No company-category drift** | The page does not redefine the company as the category it was found through | `/seo` reads as an SEO agency page · `/services` or `/` reads as an SEO, AI-search, GEO/AEO or performance-marketing agency · any industry framing at company level |
| **14** | **No AI hype** | AI search appears only where approved, sized honestly, with no guarantee and no score | An AI section on the homepage's first screen · GEO/AEO/LLMO as framing · any rank, score or blended figure · any claim about Claude or Grok · any trend from one measurement |
| **15** | **No SEO keyword stuffing** | The target phrasing appears where it is natural and where the buyer would use it | Repeated exact-match phrasing · a keyword in a heading that distorts the sentence · a term retained in body copy purely for a query |
| **16** | **No duplication of another page's message job** | The page's row in `MESSAGE_CONSISTENCY_MATRIX.md` is satisfied, and no other row's primary message has been taken | The problem page argues `/conversion-optimization`'s case · an article restates its research entry · two pages compete for one intent |
| **17** | **Required owner-input placeholders are visible** | Every missing fact carries the correct placeholder from `COPY_PLACEHOLDER_STANDARD.md` §2, and is listed in the page brief | A plausible default has been supplied · a gap has been written around so the fact stops being needed · a placeholder reads "TBD" |
| **18** | **Consistent terminology** | Every term comes from `TERMINOLOGY_DICTIONARY.md`, including the preferred/allowed/avoid rulings | "Leads" as MappedSkills' outcome word · "CRO" in body copy · "search visibility" or "AI visibility" as category nouns · a term not in the dictionary |
| **19** | **Evidence is connected to its claim** | Every claim needing support links to the asset that supports it, at the point of the claim | A claim whose supporting asset does not exist yet · proof interposed as a required step before the conversion · a bibliography with no in-text connection |
| **20** | **It sounds like one company** | Voice, register, terminology and the accountability boundary are consistent with every other page | The page reads as though a different firm wrote it · the boundary is stated differently here · an inconsistency with `/how-it-works`, `/pricing` or `/faq` |

---

## 2. The swap test, and three others

Item 12 is checked with the swap test. Items 3, 6 and 20 have their own.

1. **The swap test (item 12).** Replace "MappedSkills" with a competitor's name. **If the opening paragraph still works, the page fails.**
2. **The "how do you know that?" test (item 6).** A prospect asks it of any sentence on the page. **Every sentence must have an answer, and the answer must be on the page or one click away.**
3. **The read-aloud test (items 3 and 20).** Read the first screen aloud. **If it sounds like a brochure, a press release or a chatbot, it fails.**
4. **The boundary test (items 1 and 20).** Find the sentence that says where accountability stops. **If the page states what MappedSkills produces and there is no such sentence, it fails.**

---

## 3. Who runs the gate

| Role | Responsibility |
|---|---|
| **Writer** | Items 1–5, 9, 10, 15, 17, 18 before submitting. Lists every significant claim with its governance class and ladder level, and every placeholder |
| **Reviewer** *(a second person)* | Items 6, 7, 8, 12, 13, 14, 16, 19, 20 — and runs all four tests in §2 |
| **Owner** | Items 6, 7 and 17 for anything involving company facts, prices, people, client evidence or permissions. **No Claude session can substitute for this** |
| **Orchestrator** | Item 16 across the whole set, because cross-page drift is invisible from inside one page |

**Nobody approves their own copy.** Where no second reader is available, the page waits — it does not ship with a self-review recorded as a review.

---

## 4. Exceptions

**Three, and they are narrower than they look.**

1. **A correction** to published copy re-runs items 6, 7, 8, 17 and 18 only, and is labelled as a correction.
2. **A page whose only change is a resolved placeholder** re-runs items 6, 7, 17 and 20.
3. **A page with no query target** passes item 2 by stating that it has none and naming the job it does instead. **It may not pass by inventing one.**

**There is no exception for launch pressure.** A page that cannot pass is deferred, not published with a note.

---

## 5. What this gate deliberately does not do

- **It does not score.** A page passes or it does not.
- **It does not replace `CONTENT_QUALITY_GATE.md`.** Both apply, in full, to every asset.
- **It does not judge design, layout or visual hierarchy.** Those belong to later gates.
- **It does not measure performance** — no ranking, traffic or conversion check is possible until analytics exists in production.
- **It does not approve any quality gate.** Gate advancement is an owner and orchestrator action recorded in `DECISION_LOG.md`.

---

## 6. Gate status

> **THE MESSAGING GATE (GATE 8) IS PASSED — 2026-09-01.** See `DEC-013` in `DECISION_LOG.md`.
>
> This document defines the per-page gate for the copywriting session and is now **binding on Session 11**. It is not itself the entry in `QUALITY_GATES.md`.
