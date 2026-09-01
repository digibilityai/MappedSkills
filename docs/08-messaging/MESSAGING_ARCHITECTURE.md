# Messaging Architecture — APPROVED

**Session:** 10 — Messaging Architecture
**Date:** 2026-09-01 · **Branch:** `test_branch`
**Model:** Claude Opus 5 (high effort)
**Status:** **APPROVED — 2026-09-01.** **The messaging gate (Gate 8) is PASSED**, recorded in `DECISION_LOG.md` as `DEC-013`. This document itself was reviewed and approved by the orchestrator, not by Claude.
**Governed by:** `docs/01-business/BUSINESS_STRATEGY.md` (frozen, `DEC-005`/`DEC-006`), `POSITIONING.md` §5 and §9, `DEC-007`, `DEC-008`, the approved IA (Gate 5, `DEC-010`), the approved CRO specification (Gate 6, `DEC-011`), and the approved content architecture (Gate 7, `DEC-012`).

**Nothing here reopens the approved business strategy, the approved IA, the approved CRO funnel or the approved content architecture.**

**Not produced in this session:** final page copy · complete pages · headlines or taglines approved for use · meta titles and descriptions · page designs, wireframes or components · any production code change · any new indexable URL · any fresh research.

---

## 0. What this document is, and what the other fourteen are

This is the **root document of the messaging system**. It establishes the message hierarchy, resolves the central tension between company message and search-landing message, and states the rules every other messaging document inherits.

| Document | What it decides |
|---|---|
| **`MESSAGING_ARCHITECTURE.md`** *(this file)* | The seven-level message hierarchy · the company-message / search-landing-message rule · search-landing consistency per commercial page · the governing rules |
| `POSITIONING_MESSAGE_SYSTEM.md` | The internal positioning statement · the one-sentence explanations · differentiation architecture · reasons to believe · objection architecture · trust language |
| `VALUE_PROPOSITION_ARCHITECTURE.md` | The primary value proposition and the minimum coherent set of supporting propositions |
| `PROBLEM_AND_OUTCOME_LANGUAGE.md` | Problem architecture · outcome language tiers · qualified-enquiry language · India-first language |
| `CAPABILITY_LANGUAGE.md` | Per-capability naming and language rules · SEO · conversion · measurement · paid media · automation |
| `AI_SEARCH_LANGUAGE.md` | AI-search terminology, permitted claims and prohibited claims |
| `CLAIMS_LADDER.md` | The six-level reusable claims ladder, mapped onto `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` |
| `VOICE_AND_TONE.md` | Practical writing rules |
| `TERMINOLOGY_DICTIONARY.md` | The canonical term list every future writer uses |
| `CTA_LANGUAGE_SYSTEM.md` | Candidate CTA language per approved CTA role |
| `HOMEPAGE_MESSAGE_ARCHITECTURE.md` | The homepage message sequence and five above-the-fold territories |
| `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` | The reusable commercial-page pattern, plus per-page message architectures for `/services`, `/pricing`, `/how-it-works`, the problem page, research, About, contact/booking and FAQ |
| `MESSAGE_CONSISTENCY_MATRIX.md` | The fourteen-page guardrail for the copywriting session |
| `COPY_PLACEHOLDER_STANDARD.md` | Owner-input blockers, and the placeholder taxonomy writers must use |
| `MESSAGE_QUALITY_GATE.md` | The twenty-item gate every page of copy must pass |

**Where this system conflicts with a frozen or approved document, the frozen or approved document governs.** This system decides *language*, not strategy, architecture, funnel or content scope.

---

## 1. The problem this system exists to solve

MappedSkills has an approved commercial direction and no approved way of saying it.

The approved direction (`DEC-005`) is:

> **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

That sentence is a **strategic foundation, not a headline**. `BUSINESS_STRATEGY.md` §1 and `POSITIONING.md` §1 both state that later messaging may find a sharper buyer-facing articulation, and that **the underlying meaning must be preserved while the wording may change.** This system is that work.

Three constraints shape every decision in it, and none is negotiable:

1. **The company is defined by an outcome, not a technique category** — while the buyers who will find MappedSkills search almost entirely in technique vocabulary. §2 resolves this.
2. **The proof deficit is the binding constraint, not the positioning.** MappedSkills has zero published case studies, zero reviews, no directory profiles, no analytics baseline, and appeared in **0 of 28** unbranded AI runs, while displaying ₹50K–₹2L/month in production. Messaging cannot close that gap and must not pretend to. It can only avoid making it worse, and make the most of what is genuinely available.
3. **Whatever the site asserts is what AI systems redistribute.** VERIFIED (Session 04): Google AI Mode surfaced and Perplexity repeated the site's own unsupported "300%+ ROI" claim as a description of the company. Messaging is therefore a **correctness** problem before it is a persuasion problem.

---

## 2. The governing distinction — company message vs search-landing message

This is the single most important rule in the system, and the most likely to be violated by accident.

**`DEC-008`: a page may target a search term that the company does not use as company-level positioning.**

Messaging inherits that architecturally-settled rule and adds the language layer:

| Layer | What it answers | Where it appears | Vocabulary |
|---|---|---|---|
| **COMPANY MESSAGE** | *What does this firm fundamentally help a business accomplish?* | `/`, `/services`, `/about`, `/how-it-works`, navigation, footer, entity data, schema, every company-level sentence anywhere on the site | The approved outcome, in plain commercial language. **No technique category. No acronym.** |
| **SEARCH-LANDING MESSAGE** | *Is this page about the thing I just searched for?* | The first screen of `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/pricing`, `/problems/traffic-but-no-enquiries`, `/industries/manufacturing` *(conditional)* | The buyer's search vocabulary, used accurately and without apology |

### The rule, stated so it cannot be misread

> **A page confirms the visitor's searched intent in its own words, then bridges to the company's outcome. It never redefines the company as the category it was found through, and it never withholds confirmation in order to protect the positioning.**

Both failure modes are real, and both are disqualifying:

- **Failure mode A — category capture.** `/seo` reads as an SEO agency page, then the homepage and `/services` drift to match it, and the company becomes an SEO agency by accumulation. *(This is what `SEARCH_ARCHITECTURE.md` §1 calls the architectural test: if `/` or `/services` reads as an SEO, GEO, AEO or AI-search agency, the architecture has been violated regardless of what `/seo` says.)*
- **Failure mode B — coy positioning.** `/seo` refuses to say "SEO" plainly, the visitor cannot tell within one screen whether the page is relevant, and the page loses the search demand it exists to capture. **Protecting the positioning by being vague is not a defensible trade** — it costs the acquisition the page was built for and communicates nothing about the company either.

### The two-move structure every commercial landing page uses

**Move 1 — Search intent confirmation.** State plainly, in the first screen, that MappedSkills does the thing that was searched for. Use the searcher's word.

**Move 2 — Company-level bridge.** In the next sentence or two, connect that capability to the commercial outcome and to the fact that it is not sold alone.

**Worked example, conceptual, not copy:**

> `SEO help` → *"Yes — we do SEO."* → *"We use it to capture buyer demand that already exists, and we stay accountable through to the enquiry, not just the ranking."*

### Search-landing consistency, per commercial page

**Conceptual, not final copy.** Each row states what the page must confirm and what it must bridge to.

| Page | Search intent confirmation *(move 1)* | Company-level bridge *(move 2)* | The specific drift this page must avoid |
|---|---|---|---|
| `/seo` | Yes, we do SEO — organic search, technical foundations, structure and content for commercial and problem-led queries | Search is how we capture demand that already exists; we stay accountable to the enquiry and we instrument the path | Becoming "the SEO agency page" that the rest of the site then has to live up to. Also: **no Pune/local framing** — that SERP is not this page's target |
| `/ai-seo` | Yes, we work on whether a business shows up in AI answers | It is mostly a source-authority problem, it is measured per system, and it sits inside the same enquiry outcome | Becoming a GEO/AEO/LLMO page, or an "AI visibility" product page with an implied score |
| `/google-ads` | Yes, we run Google Ads | Paid search is one demand source inside the enquiry system, on the same measurement layer, chosen on merit | Reading as a performance-marketing agency page — the rejected identity, and the category where the prohibited ROI claim originated |
| `/social-media-ads` | Yes, we run paid social | One optional demand source, selected on merit — and often the wrong one for a considered purchase, which we will say | Reading as social media management, or as brand-building. Neither is an acquisition capability here |
| `/lead-generation` | Yes, we generate leads — the enquiries a business can actually act on | The unit is the qualified enquiry, and what qualifies one is published | Volume framing, list-buying implications, or a lead-scoring claim that no model exists to support |
| `/conversion-optimization` | Yes, we work on why visits do not become enquiries | The loss may be upstream, on the page, in the path, or invisible — diagnosis comes before optimisation | Using "CRO" in body copy; and taking the buyer-symptom sentence that belongs to the problem page |
| `/pricing` | Yes, here is what it costs | And here is what moves that number, and who it is not for | Defensive justification, or an implied ROI |
| `/problems/traffic-but-no-enquiries` | Yes, this page is about exactly that symptom | And it might not be a conversion problem at all — here is how to tell which of four things it is | Becoming `/conversion-optimization` with a question-shaped headline |
| `/industries/manufacturing` *(conditional)* | Yes, we work on industrial and manufacturing B2B enquiry generation, including the RFQ path | Domain fluency inside the same outcome — **and no, we do not yet have a manufacturing result to show** | "A marketing agency for manufacturers." Prohibited everywhere, including on this page |

---

## 3. The message hierarchy

Seven levels. **A page may enter the hierarchy at a lower level, but it may never contradict a higher one.**

| Level | Name | What belongs here | What must never be here |
|---|---|---|---|
| **1** | **Company proposition** | What MappedSkills fundamentally helps a business accomplish, in plain commercial language. One idea. Stable across the whole site and across every external profile | **Any capability. Any technique. Any acronym. Any industry.** A capability at Level 1 is the single most damaging failure this system exists to prevent |
| **2** | **Commercial outcome** | Measurable qualified enquiries, and the accountability boundary — what MappedSkills owns, what it reports on, what it does not promise | Revenue as a promise · ROI · guaranteed counts · rankings or citations as the outcome |
| **3** | **Buyer problem** | The problem in the buyer's own words: not found → not converted → not measured. The symptoms a buyer recognises without a marketing vocabulary | Problems invented to justify a capability. A problem MappedSkills does not solve |
| **4** | **Mechanism** | How the outcome is produced: capture demand → convert it into enquiries → measure the whole chain, **as connected parts of one system, with the joins between them owned**. The published method | A branded framework name (`POSITIONING.md` §8 — a named framework is not a moat, and none is invented) · a process step that does not actually happen |
| **5** | **Capabilities** | SEO, AI search, Google Ads, paid social, enquiry generation, conversion work, measurement, constrained follow-up automation — each described by **what it contributes to the chain** | Capabilities presented as co-equal pillars, as a service menu, or as the reason to hire the firm |
| **6** | **Evidence / reason to believe** | The published method · MappedSkills' own AI-visibility baseline · MappedSkills' own site diagnostic · named people · primary-source-backed explanation | Client results, logos, testimonials, ratings, counts, awards, benchmarks borrowed from vendors — **none exists** |
| **7** | **Action** | One conversion outcome — a qualified enquiry — reachable by form or by booking. Direct contact always visible | A second competing goal · a CTA that promises an outcome · a CTA referencing proof that does not exist |

### The load-bearing rules of the hierarchy

1. **Levels 1 and 2 are fixed sitewide.** They are the same on the homepage, on `/seo`, in the footer, in the FAQ and on a directory profile. A page may compress them into a clause; it may not vary their meaning.
2. **Level 5 never rises to Level 1.** A capability page describes a capability at Level 5 and states Levels 1–2 alongside it. It does not promote the capability into the company's identity to make the page feel stronger.
3. **Level 6 is thin, and messaging must not disguise that.** The honest response to a thin evidence layer is specificity — method, dates, run counts, named people — not volume of assertion.
4. **Level 4 carries the weight that Level 6 cannot.** The published method is the strongest asset available today, and it is where a premium price without case studies is defended.
5. **Level 3 is where the buyer recognises themselves.** Every page that opens at Level 5 must reach Level 3 quickly, or it reads as a service description rather than an argument.

---

## 4. Where each level is allowed to lead

| Page type | Leads at | Reaches by the end |
|---|---|---|
| Homepage | **1 + 2 together** | 3 → 4 → 5 → 6 → 7 |
| `/services` | **2 + 4** | 1, 5, 6, 7 |
| Capability pages | **5** *(search-intent confirmation)*, bridged to **2** within one or two sentences | 3, 4, 6, 7 |
| `/pricing` | **2 + 4** *(what is being bought)*, then price | 3, 6, 7 |
| Problem page | **3** | 4, then 5 and 7 late |
| `/how-it-works` | **4** | 2, 6, 7 at the end only |
| Research | **A question**, then method | 6 primarily; 7 minimally, at the end |
| Editorial | **3** or a buyer question | 6, then a single low-commitment step |
| `/about` | **1** and the people | 4, 6, 7 |
| `/contact`, `/schedule-call` | **7** | Nothing else competes |
| `/faq` | Whatever the question is | 2 and 4 as the honest answer |

---

## 5. Rules inherited by every messaging document

1. **Preserve the meaning of `DEC-005`.** Reword freely; never drift the meaning.
2. **No new company category.** None is introduced anywhere in this system, and none may be introduced later without an owner decision recorded in `DECISION_LOG.md`.
3. **Search is a capability, never the company identity.** So is AI search. So is paid media.
4. **Automation stays constrained** to the approved expansion scope and gets a sentence, never a section that reads like a service line.
5. **Revenue is reported, never promised. ROI is never stated.** No guarantee of rankings, citations, AI recommendations or enquiry counts.
6. **Every number carries sample size, date, location and method.** No exceptions, including in marketing copy.
7. **What cannot be attributed is stated, once, at full strength, in the right place** — never scattered as defensive disclaimers.
8. **No invented proof, of any kind, in any form** (Project Rule 15).
9. **Missing facts use the placeholder taxonomy** in `COPY_PLACEHOLDER_STANDARD.md` and are never filled with a plausible default.
10. **No engagement-model absolute is asserted.** Do not imply that every client buys all three parts, that engagements cannot be scoped, that MappedSkills replaces three suppliers, that paid media is included by default, or that a particular engagement structure has been approved. **The delivery process and engagement model are owner-blocked.** Say the parts are connected and the joins are owned; say the measurement is the part that is not optional. Full rule: `POSITIONING_MESSAGE_SYSTEM.md` §3.5.
11. **Terminology comes from `TERMINOLOGY_DICTIONARY.md`.** Where a writer needs a term the dictionary does not carry, the dictionary is extended by decision — not by improvisation on one page.

---

## 6. What this document does not decide

Final page copy · approved headlines or taglines · meta titles and descriptions · design, layout, typography or components · navigation labels *(functional descriptions only exist; final labels belong to the copywriting session under these rules)* · the entry-offer model · prices · offer names · which client results may be published · whether the manufacturing gate clears.

**And it does not pass any gate.** Gate advancement is an owner and orchestrator action recorded in `DECISION_LOG.md`.
