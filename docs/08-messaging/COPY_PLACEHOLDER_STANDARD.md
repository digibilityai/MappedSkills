# Copy Placeholder Standard — APPROVED

**Session:** 10 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01 (Gate 8, `DEC-013`).**
**Governed by:** `docs/05-content/OWNER_INPUT_REGISTER.md` and `CONTENT_EVIDENCE_GAPS.md` (approved, Gate 7) · Project Rule 15.

**The rule this document exists to enforce:** where a fact is missing, the draft carries a visible placeholder. **A future writer must not silently fill one with a plausible default.**

---

## 1. Owner inputs, classified against copy

Reviewed against `OWNER_INPUT_REGISTER.md` and filtered to what actually blocks messaging and page copy.

**Three classifications:**
- **BLOCKS COPY** — the asset, or a named section of it, cannot be written honestly at all.
- **COPY CAN PROCEED WITH PLACEHOLDER** — the page is written in full, with the missing fact marked.
- **NOT REQUIRED YET** — it affects something other than copy, or a later phase.

| # | Owner input | Classification | What it blocks, precisely |
|---|---|---|---|
| **1** | **The real delivery process** — what genuinely happens, stage by stage, by whom, with what the client must supply | **BLOCKS COPY** | **`/how-it-works` cannot be written.** It is the root dependency: every commercial page's proof link, the attribution-limits statement and both research entries point to it. **A methodology page describing an invented process is fabricated proof** |
| **2** | **Verified company facts** — legal entity name, complete registered postal address with a real postal code, phone, email, founding year | **BLOCKS COPY** *(for the NAP and entity blocks)* · placeholder elsewhere | `/contact`'s NAP · `/about`'s entity block · the footer · all `Organization`/`LocalBusiness` schema. **The current declaration's `postalCode` contains the word "India"**, and AI systems report a founding year of 2016 from LinkedIn that is **NOT VERIFIED** |
| **3** | **Current team members, roles and genuine expertise; who authors what** | **BLOCKS COPY** *(for the people sections)* | `/about`'s team section · every article and research byline · `Person` schema. **Credentials are never manufactured, and a "reviewed by" byline is used only where a genuine second reviewer exists** |
| **4** | **Confirmed prices** — bands, inclusions, exclusions, what changes the price, whether ad spend is separate, minimum engagement | **BLOCKS COPY** *(for every figure)* · the rest of `/pricing` proceeds | Every number on `/pricing`, and any price statement in `/faq`. **No price may be invented, changed, rounded or inferred by any Claude session** |
| **5** | **The entry-offer model — free, paid or hybrid** | **BLOCKS COPY** *(for CTA wording only)* | The **PRIMARY and DIAGNOSTIC CTA wording on every page**, and any "free" framing on `/schedule-call` and the problem page. **Page structure and message architecture survive any answer** |
| **6** | **Who owns enquiry response, and the business hours to publish** | **COPY CAN PROCEED WITH PLACEHOLDER** | The "what happens next" specifics on `/contact`, `/thank-you` and `/how-it-works`. **No numeric SLA may be published in any case, until one has been measured** |
| **7** | **The meeting format** — who takes the calls, real availability, call length | **COPY CAN PROCEED WITH PLACEHOLDER** | `/schedule-call`'s specifics, and the strongest meeting-CTA candidates |
| **8** | **How spend is separated from fee** | **COPY CAN PROCEED WITH PLACEHOLDER** | One statement on `/google-ads` and one on `/pricing` |
| **9** | **The decision on "300%+ ROI", "₹100Cr+", "₹10Cr+" in production** | **COPY CAN PROCEED WITH PLACEHOLDER** *(new copy is unaffected — the claims are prohibited regardless)* | **The current homepage title**, which carries the first of these. It is a live exposure verified as being redistributed by AI systems, and remediation is an owner decision |
| **10** | **Which client results may be published, with written permission** | **COPY CAN PROCEED WITH PLACEHOLDER** | `/work` and `/work/{slug}` are **not written at all**. Every commercial page ships on method and own-diagnostic proof, with no gap left visible for a result that does not exist |
| 11 | Genuine company history and milestones | COPY CAN PROCEED WITH PLACEHOLDER | `/about`'s history. **No invented milestones** |
| 12 | Which social and professional profiles are current | COPY CAN PROCEED WITH PLACEHOLDER | `/about` · the footer · `sameAs` in schema, currently an **empty array** on both blocks |
| 13 | Genuine partnerships, certifications, credentials, media features or awards | COPY CAN PROCEED WITH PLACEHOLDER | Any trust signal of that kind. **None may be implied without one** |
| 14 | Which industries MappedSkills has genuinely served | COPY CAN PROCEED WITH PLACEHOLDER | Honest domain-fluency framing without implying a specialisation or a case study |
| 15 | Consent wording, subject to legal review | COPY CAN PROCEED WITH PLACEHOLDER | The consent line on `/contact`. **A pre-launch blocker for tracking, not for the draft** |
| 16 | Google Business Profile status | **NOT REQUIRED YET** | Affects local discovery and off-site work, not page copy |
| 17 | Authorisation to create directory profiles | **NOT REQUIRED YET** | Off-site programme. **Blocked by nothing, and it should start now** |
| 18 | Funding for keyword tooling and a second AI measurement round | **NOT REQUIRED YET** | Copy is already constrained to claim no volume figure and no trend |
| 19 | The manufacturing validation gate | **NOT REQUIRED YET** | The two conditional assets are not written until the gate clears |

**The single most consequential line in this table is #1.** `/how-it-works` is the highest-value proof asset available and the root dependency of the entire content programme, and **it cannot be started without the owner.**

---

## 2. The placeholder taxonomy

**Six types. Each names what is missing and, implicitly, who can close it.**

| Placeholder | Use when | Who closes it |
|---|---|---|
| **`[OWNER INPUT REQUIRED — <specific item>]`** | A fact only the owner holds — a company fact, a price, a person, a process, an operating commitment | Owner |
| **`[EVIDENCE REQUIRED — <specific claim>]`** | A claim that would be legitimate if evidence existed, and it does not yet — a client outcome, a measured response time, a trend | Measurement, or a permissioned client |
| **`[DECISION REQUIRED — <specific open decision>]`** | An open commercial or architectural decision changes the wording — the entry-offer model, whether booking stays a primary surface | Owner or orchestrator |
| **`[VALIDATION REQUIRED — <specific check>]`** | A narrow, named check must be run before a claim is made — the article-2 and article-3 phrasing checks, FAQ schema eligibility | The content phase, before final copy |
| **`[LEGAL REVIEW REQUIRED — <item>]`** | Consent, retention, privacy or contractual wording | Legal, with the owner |
| **`[TECHNICAL PREREQUISITE — <item>]`** | The sentence depends on something that does not exist in production yet — a working backend, analytics, a functioning booking widget | The technical phase |

### 2.1 Format rules

1. **Square brackets, the type in capitals, an em dash, then the specific item.** Not "TBD", not "XXX", not "lorem ipsum", not a highlighted guess.
2. **Name the specific item, never the category.** `[OWNER INPUT REQUIRED — registered postal code]`, not `[OWNER INPUT REQUIRED — address details]`.
3. **The placeholder sits where the fact would sit**, inside the sentence, so the surrounding copy can be judged as written.
4. **Where the whole section is blocked, the placeholder replaces the section** and states what the section would contain.
5. **One placeholder per missing fact.** Do not bundle four unknowns into one bracket.

### 2.2 Rules of use

1. **A placeholder is never filled with a plausible default**, however obvious the answer seems. The existing site is a documented source of the problem and may not be used as a source of truth for any of these facts.
2. **A placeholder that would be trivially guessable is still a placeholder.** A founding year reported by two AI systems from the same LinkedIn profile is not corroboration.
3. **No placeholder reaches production.** A page with an unresolved placeholder is not publishable — it is a complete draft awaiting an input.
4. **Every placeholder in a draft is listed in that page's brief**, so the set is trackable without reading every draft.
5. **A placeholder is not a licence to write around the gap.** Copy must not be reshaped so the missing fact stops being needed, where the fact is genuinely load-bearing — that is how a proof deficit gets disguised.
6. **Removing a placeholder requires the input, recorded in the repository** (Project Rule 2), not a verbal answer in conversation.
7. **A claim whose supporting asset does not exist yet is not written yet**, with or without a placeholder. `[EVIDENCE REQUIRED]` marks a genuine future claim, not a way to draft an unsupported one.

### 2.3 Worked examples

| Situation | Correct | Incorrect |
|---|---|---|
| Founding year unknown | "Working in Pune since `[OWNER INPUT REQUIRED — founding year]`." | "Working in Pune since 2016." |
| No case study exists | `[EVIDENCE REQUIRED — a permissioned client outcome. Until one exists, this page ships with method and own-diagnostic proof only.]` | "Case studies coming soon." |
| Entry-offer model open | "`[DECISION REQUIRED — entry-offer model]` — the CTA reads as a diagnostic offer; whether it is free, paid or hybrid changes the wording." | "Get your free enquiry audit." |
| Response time | "We'll come back to you `[OWNER INPUT REQUIRED — business hours]`." | "We reply within 24 hours." |
| Article 2's search target | `[VALIDATION REQUIRED — targeted India-lens autocomplete check on the candidate phrasings. PRIMARY SEARCH TARGET = UNVALIDATED until it clears.]` | Claiming a query family for the article |
| The form | `[TECHNICAL PREREQUISITE — a server endpoint, durable persistence and transactional email. The production form has no action and no method and transmits nothing.]` | Writing success copy as though the path worked |
