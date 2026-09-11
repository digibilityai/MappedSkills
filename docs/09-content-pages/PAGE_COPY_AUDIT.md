# Page Copy Audit — Session 11

**Session:** 11 — Page Copy Production · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **AUDIT OF NOW-APPROVED COPY. Quality Gate 9 (Page Copy Production) PASSED 2026-09-01 — see `DEC-014` in `DECISION_LOG.md`.** This audit did not pass the gate itself; the orchestrator's independent review did. **Gate passage does not upgrade any PARTIALLY BLOCKED, BLOCKED or CONDITIONAL status recorded in this audit.**
**Binding audit inputs:** `docs/08-messaging/MESSAGE_CONSISTENCY_MATRIX.md` and `docs/08-messaging/MESSAGE_QUALITY_GATE.md` (both approved, Gate 8, `DEC-013`), plus `docs/05-content/CONTENT_QUALITY_GATE.md` (Gate 7).

**A note on who ran this.** `MESSAGE_QUALITY_GATE.md` §3 assigns items 6, 7, 8, 12, 13, 14, 16, 19 and 20 to **a second reader**, and states plainly that nobody approves their own copy. **This audit is the writer's self-check. It is not the reviewer's pass and must not be recorded as one.**

---

## 1. Pages drafted

**17 copy files produced** in `docs/09-content-pages/copy/`, plus one conditional record where copy was deliberately not drafted.

| Status | Count | Routes |
|---|---|---|
| **FINAL-CANDIDATE** | **7** | `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries` |
| **PARTIALLY BLOCKED** | **7** | `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq` |
| **BLOCKED** | **1** | `/how-it-works` |
| **CONDITIONAL** | **3** | `/research` · `/blog` · `/industries/manufacturing` *(record only, no copy)* |

**Not drafted, and why:** two research entries and three unconditional articles (out of Session 11 scope — brief §15 excludes editorial production, and both categories have their own approved briefs) · one conditional article · five non-indexable routes (no page brief exists for any of them).

**FINAL-CANDIDATE means ready for orchestrator review. It does not mean approved, and it does not mean publishable** — several FINAL-CANDIDATE pages are sequence-dependent on `/how-it-works`, which is blocked.

---

## 2. Unresolved contradictions — reported, not resolved

### 2.1 The conditional vertical page: a genuine conflict between the session brief and approved documentation

**The Session 11 brief §16 lists "CONDITIONAL / BLOCKED PAGES" as production group E.** **`COPY_PLACEHOLDER_STANDARD.md` §1 item 19 — approved at Gate 8 and binding on this session — states that "the two conditional assets are not written until the gate clears."** `LAUNCH_CONTENT_INVENTORY.md` §2 carries the same condition.

**Action taken:** copy was **not** drafted for `/industries/manufacturing`. A record file was created stating the gate, the constraints that will bind the copy whenever it is written, and the reason for the decision. **No route was added or removed, and no unconditional page links to it.**

**Why this way round.** `CLAUDE.md` and the Session 11 brief §3 both make approved repository documentation authoritative over conversation instructions, and the brief's own stop conditions require reporting a contradiction rather than resolving it unilaterally. The independent reason is that the gate's third condition — one completed industrial engagement with a publishable result — is an owner action, and a vertical page written before it exists is how a candidate beachhead quietly becomes a settled specialisation.

**Decision required from the orchestrator:** whether Session 11's sequence overrides that rule. If it does, the page can be drafted in a short follow-up pass against the constraints already recorded.

### 2.2 `/thank-you` has a launch content requirement and no brief

`LAUNCH_CONTENT_INVENTORY.md` §3 specifies content for `/thank-you` — confirmation, what happens next, no numeric response time, next-best content only, no second ask — but **no page brief exists**, and the Session 11 brief instructs that every route be drafted against its approved brief.

**Action taken:** not drafted. A success-state pattern meeting the same requirement is drafted inside `copy/contact.md` §6, because the form surface needs one regardless.

**Decision required:** whether `/thank-you` receives its own copy file, or whether the conversion-surface copy carries it.

### 2.3 No contradiction found in the messaging system itself

The fifteen Gate 8 documents, the fourteen-row consistency matrix, the approved IA and the page briefs were reconcilable throughout. **No approved upstream document was modified.**

---

## 3. Cross-page consistency findings

**Method:** every draft was checked against its row in `MESSAGE_CONSISTENCY_MATRIX.md`, with the *prohibited drift* column checked last and hardest, plus mechanical term checks across the whole file set.

### 3.1 Checks that passed

| Check | Result |
|---|---|
| **Company-category drift** | **Pass.** No page describes MappedSkills as an SEO, AI-search, GEO/AEO/LLMO, performance-marketing, full-service, automation or RevOps firm. `/` and `/services` name no technique in their proposition |
| **Accidental SEO-agency positioning** | **Pass.** `/seo` says "SEO" plainly in its first screen and bridges within two sentences. The company message on `/` and `/services` does not move to match it |
| **Accidental AI-agency positioning** | **Pass.** AI search appears: one bullet on `/`, below the first screen · one paragraph inside "capture" on `/services` · its own page · one short section on `/how-it-works` · two FAQ answers · one research card. **Not in the homepage first screen. No AI hero, no AI section, no score anywhere** |
| **Enquiry / lead terminology** | **Pass.** "Enquiry" is the noun everywhere. "Lead" appears only on `/lead-generation` — 4 instances of the query phrase, 2 of "leads", both inside a buyer's own quoted objection. "Inquiry" (US spelling): zero occurrences |
| **"CRO" in body copy** | **Pass.** Zero occurrences in any body copy. The matches in the file set are all prohibition or routing instructions in the copy files' own notes |
| **Prohibited figures** | **Pass.** "300%+ ROI", "₹100Cr+" and "₹10Cr+" appear nowhere in any copy. The file matches are all owner-input placeholders about the production exposure |
| **ROI / ROAS / payback** | **Pass.** No instance except explicit refusals |
| **Superlatives** | **Pass** after correction — see §3.3 |
| **Generic-agency language** | **Pass.** No prohibited term from `TERMINOLOGY_DICTIONARY.md` §3 appears. No exclamation marks anywhere. No "insights"/"thought leadership" except as prohibitions on the two index pages |
| **Keyword stuffing** | **Pass.** `/lead-generation`: 4 exact-phrase instances across a full page. `/ai-seo`: 1 instance of "AI SEO", 3 of "AI search". `/seo`: 5 instances of "SEO". Nothing repeated to match a query |
| **CTA roles against the approved system** | **Pass.** PRIMARY on commercial pages; DIAGNOSTIC then LOW-COMMITMENT then PRIMARY on the problem page; PROOF-led with PRIMARY at the end and **no sticky CTA** on `/how-it-works`; RESEARCH with no gate on `/research`; LOW-COMMITMENT with no sticky CTA on `/blog`; PRIMARY-only on both conversion surfaces; booking emphasised on `/pricing` |
| **Engagement-model absolutes** | **Pass.** No page claims every client buys all three parts, that engagements cannot be scoped, that MappedSkills replaces three suppliers, that paid media is included by default, or that any engagement structure is settled. `/services` block 2 states explicitly that parts can be scoped |
| **Invented owner facts** | **Pass.** No founding year, team member, credential, award, partnership, client count, team size, price, response time, business hours or address appears anywhere. Every one is a placeholder |
| **Proof inflation** | **Pass.** No logo wall, client count, testimonial, rating, review count, award or case-study CTA. `/`, `/about` and `/pricing` each state the absence of case studies directly rather than gesturing past it |
| **Attribution consistency** | **Pass.** The governing rule — a measurement gap never disqualifies a legitimate enquiry — is stated in the same terms on `/`, `/services`, `/lead-generation`, `/how-it-works` and `/faq` |

### 3.2 Findings recorded, not defects

| # | Finding | Assessment |
|---|---|---|
| 1 | **The accountability boundary appears on `/`, `/services`, `/pricing`, `/lead-generation`, `/about` and `/faq`** | **Correct by design.** Levels 1 and 2 of the hierarchy are fixed sitewide and a page may compress them. **But it is the most likely source of a repetitive reading experience across a session**, and the design phase should vary its treatment rather than repeating an identical block. Flagged for Gate 9; not a copy defect |
| 2 | **`/lead-generation`'s H1 uses the query phrase "Lead generation"** | Permitted under `DEC-008` and the dictionary's ruling for that route's title and matching phrasing. **An H1 is title-adjacent rather than metadata, so this is recorded as a deliberate use requiring orchestrator confirmation.** The body copy uses "enquiry" throughout |
| 3 | **`/ai-seo`'s front matter names `generative engine optimization`, `aeo` and the other rejected phrasings** | They appear only in the copy file's *search status* section, as an explicit list of what the page does **not** target. **They appear nowhere in the page copy, in any heading or in the metadata**, which is what the acronym rule governs |
| 4 | **`/pricing` states the AI measurement result without its full scope line in the same sentence** | The scope travels with the link rather than the clause, to avoid a bare figure on a commercial page. **The linked entry carries sample, date, location and method.** Recorded because it is the one place a number sits closer to a claim than to its method |
| 5 | **Two visual dependencies are load-bearing rather than decorative** | The four-loss-zone decision tree (problem page) and the "what cannot be attributed" panel (`/how-it-works`). Both are flagged in the copy as *visual explanation useful here*; **no styling, layout or creative direction was specified anywhere** |

### 3.3 Defects found and corrected during this audit

| # | Defect | Correction |
|---|---|---|
| 1 | **`/conversion-optimization` had no explicit bridge to the commercial outcome** — move 2 is mandatory, and the page failed the boundary test in `MESSAGE_QUALITY_GATE.md` §2 | A bridge sentence was added to the hero: the work is the second half of one outcome, and accountability runs to the enquiry rather than to a conversion rate |
| 2 | **`/social-media-ads` stated what it produces without stating where accountability stops** | The hero now names the boundary: accountable to the qualified enquiry, not to reach, clicks or engagement |
| 3 | **`/faq` Q7 restated the attribution limitations at close to full strength**, duplicating `/how-it-works` §5 and violating "say the limit once, at full strength, in the right place" | Q7 trimmed to three examples plus a pointer to the method page. The answer remains accurate read alone |
| 4 | **Two uses of "best"** — "your best customers" and "the best supplier" — as ordinary adjectives rather than claims about MappedSkills | Both rewritten. The term is on the prohibited list and a reviewer greps for it; leaving an innocent instance costs review time |

### 3.4 Duplication boundaries, checked explicitly

| Pair at risk | Boundary held? |
|---|---|
| `/conversion-optimization` **vs** `/problems/traffic-but-no-enquiries` | **Yes.** The problem page answers *"why is this happening and which one is mine?"* and contains the runnable diagnostic. The commercial page answers *"who does this work and how?"*. **The buyer-symptom sentence appears only on the problem page**, and the commercial page's opening is deliberately about the brief a practitioner is handed |
| `/seo` **vs** `/ai-seo` | **Yes.** `/seo` cross-links and explicitly refuses to sell crawler configuration as a route to AI answers; `/ai-seo` carries the mechanism, the measurement and the limits |
| `/lead-generation` **vs** `/services` | **Yes.** `/services` describes the system; `/lead-generation` publishes the qualification definition, which appears in full on no other page |
| `/how-it-works` **vs** `/faq` | **Yes**, after the §3.3 correction |
| `/research` **vs** `/blog` | **Yes.** The index states the boundary explicitly, and the canonical-dataset rule is written into the research index |
| `/google-ads` **vs** `/social-media-ads` | **Yes.** Different demand sources, different scope sections, and `/social-media-ads` is deliberately the shortest page in the set |

---

## 4. Search-intent findings

| # | Finding |
|---|---|
| 1 | **Every commercial page confirms its searched capability in the first screen, in the searcher's own word.** `/seo` says SEO. `/ai-seo` says AI search. `/google-ads` says Google Ads. `/lead-generation` says lead generation. `/conversion-optimization` says the work in buyer language, with the category term confined to metadata. **No page delays confirmation to protect the positioning** — the failure the messaging system calls "coy positioning" |
| 2 | **Three pages state that they have no query target** — `/services`, `/how-it-works` and `/research` — which is how they pass gate item 2. **None invents one** |
| 3 | **`/conversion-optimization` is the weakest commercial target in the set and the copy reflects it.** The residual family is low-value on recorded evidence, and the page is written to route down to the problem page, which is the real acquisition route |
| 4 | **The problem page's cadence obligation is recorded in its copy file.** Freshness is a live ranking lever on that results page, and it needs a named review owner at publication or the most winnable opening in the programme decays |
| 5 | **No local or Pune framing appears on `/seo`**, which is explicitly not that page's target |
| 6 | **No search volume, keyword difficulty or CPC figure appears anywhere in the set**, and `/seo` says plainly why |

---

## 5. Claims and evidence findings

| # | Finding |
|---|---|
| 1 | **Every copy file carries an Evidence / Claim Notes table** assigning a governance class and a ladder level to each significant claim, as `CLAIMS_LADDER.md` §5 requires |
| 2 | **Zero claims at ladder level E** — no client outcome appears in any form, including anonymised. **Zero at level F** |
| 3 | **Every first-party measurement carries sample, date, location, language, access tier and run counts in the sentence itself.** The 28-run zero appears on `/`, `/ai-seo`, `/about`, `/how-it-works`, `/faq` and `/research`, and its scope travels with it in all six |
| 4 | **Two claims require re-verification before publication** (Project Rule 19), both on `/ai-seo` and one repeated on `/faq`: Google's published statement that optimising for generative AI "is thus still SEO", and the ~0.28% AI-referral-traffic figure. **The vendor-blog caveat is written into the sentence itself so it cannot be stripped in editing** |
| 5 | **Claude and Grok are named as untested wherever AI systems are discussed**, and no claim is made about either |
| 6 | **No competitor is characterised as having "no AI visibility."** The two-agency observation on `/ai-seo` is stated as an observation within a 28-run signed-out sample |
| 7 | **No trend, improvement or percentage change in AI visibility appears anywhere.** One measurement is not a trend, and `/ai-seo` and `/how-it-works` both say so in the copy rather than leaving it implied |
| 8 | **The own-site diagnostic is used as evidence on four pages and is sequence-blocked on all four.** Until the fixes ship it is a list of live defects rather than research — each file carries the technical prerequisite, and `/conversion-optimization` and the problem page are written so the **finding** stands even where the **link** waits |

---

## 6. Owner-input dependencies, consolidated

| # | Input | Blocks | Pages affected |
|---|---|---|---|
| **1** | **The real delivery process, stage by stage** | **`/how-it-works` entirely** — and it is the proof link on every commercial page | `/how-it-works`; sequence-dependency on `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/pricing`, `/faq` |
| **2** | **Verified company facts** — legal entity name, complete address with a real postal code, phone, email, founding year | The entity blocks and the NAP | `/about`, `/contact`, `/`, footer |
| **3** | **Team members, roles and genuine expertise** | The people sections and every byline | `/about`, `/`, `/schedule-call`, `/research`, `/blog` |
| **4** | **Confirmed prices, inclusions, minimum, spend/fee separation** | Every figure on `/pricing` and three FAQ answers | `/pricing`, `/faq`, `/google-ads` |
| **5** | **The entry-offer model — free / paid / hybrid** | DIAGNOSTIC and some PRIMARY CTA wording. **Page structure survives any answer** | `/problems/traffic-but-no-enquiries`, `/schedule-call`, `/pricing`, `/` |
| **6** | **Who owns enquiry response, and business hours** | "What happens next" on three surfaces | `/contact`, `/`, `/how-it-works`, `/schedule-call` |
| **7** | **The decision on the prohibited production claims** | **Metadata, not copy** — the new copy carries none of them | `/` title, `/google-ads` title, and see §7 |
| **8** | **Which client results may be published** | Nothing in this set is written around a gap left for a result. **Level E stays empty** | All |
| **9** | **The manufacturing validation gate** | The conditional pair | `/industries/manufacturing`, C2 |
| **10** | **Named authorship** | The two index pages and every future byline | `/research`, `/blog` |

**Technical prerequisites — not owner inputs, but they block the same pages:** a working form backend with durable persistence and transactional email (`/contact`) · a working booking surface that can carry runtime custom fields and expose the completed booking server-side (`/schedule-call`) · the own-site fixes shipped, before the diagnostic can publish as research (four pages) · a `/blog` index that renders real articles.

---

## 7. Production observation, recorded and not acted on

**Read-only inspection of the production source, performed only to establish what must not migrate into new copy. Nothing was changed.**

**The prohibited "300%+ ROI" claim is materially more widespread in production than the approved documentation records.** `COPY_PLACEHOLDER_STANDARD.md` §1 item 9 and `briefs/homepage.md` §20 name **the homepage title**. Inspection found the string on **at least seven surfaces**: the homepage metadata title and a homepage statistic block · the `/google-ads` metadata title and a statistic block · a statistic block on `/lead-generation` · **two** statistic blocks on `/about` · a statistic block on `/how-it-works` · a statistic block on `/work` · and a hard-coded description in the blog article metadata.

**Second observation:** the sitewide default title in the application layout is *"MappedSkills - Performance Marketing for SaaS"*. That carries a **rejected company-level positioning** (`DEC-005` principle 14) **and a segment claim — "for SaaS" — that contradicts the approved ICP and the candidate beachhead.**

**Why this is recorded now rather than at implementation.** Session 04 verified that these surfaces are what AI systems redistribute as fact about the company. **Remediation is an owner decision (`DEC-007`) and no production content was changed here.** It is recorded because it widens a known exposure, and because several pages in this copy set cannot ship over a title that contradicts them.

---

## 8. Excessive copy volume — checked

**No page runs past four paragraphs without a heading, a list or a table.** Paragraphs are 1–3 sentences on commercial and problem pages, 1–2 on the conversion surfaces, and 2–5 only on `/how-it-works` and the research index, where the argument needs development.

**The two longest pages are the problem page and `/how-it-works`**, and both earn it: one contains a runnable five-check diagnostic, the other is the site's proof asset. **`/social-media-ads` is deliberately the shortest**, as its brief requires.

**One volume risk recorded:** `/services` block 4 lists seven capability entries. Routing is that page's job and each entry is one or two sentences — but it is the block most at risk of being rendered as the card grid the architecture prohibits. **Flagged for the design phase.**

---

## 9. Recommended corrections before approval

**Ordered by consequence.**

1. **Select the homepage H1.** Three options are set out with a critical comparison and a recommendation in `copy/homepage.md`. **Claude does not approve it**, and every downstream surface — metadata, the entity description, directory profiles — inherits from it.
2. **Decide the conditional-page question in §2.1** — whether `/industries/manufacturing` copy is drafted now against the recorded constraints, or held until the gate clears.
3. **Obtain owner input 1 — the real delivery process.** The single largest blocker in the launch set; nine other pages link to `/how-it-works` as their proof.
4. **Obtain owner inputs 2 and 3** — company facts and people. They block two pages outright and weaken the homepage's only reason-to-believe block.
5. **Confirm the prices (input 4)** and decide the entry-offer model (input 5). Between them they unblock `/pricing`, three FAQ answers and the diagnostic CTA on the most winnable page in the programme.
6. **Run the two re-verification checks** on `/ai-seo` before publication, and confirm whether the AI-referral figure is retained at all.
7. **Confirm the `/lead-generation` H1 use of the query phrase** (§3.2 finding 2).
8. **Decide `/thank-you`** (§2.2).
9. **Assign a second reviewer.** Nine of the twenty gate items are the reviewer's, and `MESSAGE_QUALITY_GATE.md` §3 states that where no second reader is available the page waits rather than shipping with a self-review recorded as a review.
10. **Assign a freshness owner** for the problem page at publication.

---

## 10. Gate status

> **THE COPY GATE IS NOT PASSED.**
>
> No page in this set is approved. **FINAL-CANDIDATE means ready for orchestrator review.** The Message Quality Gate has been run by the writer for the writer's items only; the reviewer's items and the owner's items are outstanding on every page, and **Claude has no authority to pass a gate on its own judgement** (`QUALITY_GATES.md`, Rule on Gate Advancement).

---
---

# SECOND-READER REVIEW — orchestrator correction pass

**Date:** 2026-09-01 · **Branch:** `test_branch` · **Same session, different role.**
**Method:** every file in `docs/09-content-pages/copy/` was re-read as actual words, by a reader instructed to distrust §1–§10 above, the session summary, and the writer's own evidence notes. The test applied to every page was: **what would a commercially intelligent first-time visitor actually conclude from these words?**

**Orchestrator decisions carried into this pass:** the homepage H1 is approved as a copy direction · `/lead-generation` may use the query phrase in its H1 · the conditional manufacturing page stays undrafted · `/thank-you` gets a dedicated artifact.

> **The first pass over-reported its own quality.** The §1–§10 audit above recorded four defects. This pass found **twenty-five** substantive corrections plus three self-reference violations. The most consequential were an **engagement-model absolute on `/services`** that the first audit explicitly claimed to have checked and passed, and **three separate claims that went beyond their evidence**. §1–§10 are preserved unedited as the record of the first pass; **where they conflict with this section, this section governs.**

---

## 11. Per-route second-reader verdicts

| Route | Verdict | Principal strength | Principal weakness found | Correction made | Unresolved blocker | Status |
|---|---|---|---|---|---|---|
| **`/`** | **Corrected — now sound** | Block 4 does something almost nothing in this category does: states the accountability limit at full strength, high on the page, without hedging | **The hero failed on the orchestrator's own test.** "What brings them in" was vague enough that "traffic" in the H1 pulled the whole proposition towards SEO-only. It also used **"qualified enquiry" in the first screen**, which `PROBLEM_AND_OUTCOME_LANGUAGE.md` §3.2 reserves for pages that can explain qualification immediately, and carried **two** boundary clauses in a hero | Hero rewritten: names search **and** paid demand without a capability dump, uses "enquiries" not "qualified enquiries", and carries one boundary line — *"Traffic is where that route starts. The enquiries are the part we answer for."* Block 5 cut to one line per capability | People · response owner · phone · the production-claims decision (metadata) | **PARTIALLY BLOCKED** |
| **`/services`** | **Corrected — was a gate failure** | The scope-honesty and "what we do not do" blocks are specific enough to be checkable | **An engagement-model absolute: "Here they are one piece of work."** That asserts the bundling that `POSITIONING_MESSAGE_SYSTEM.md` §3.5 prohibits and the owner has not decided. **The first audit claimed this check passed** | Rewritten to the approved formulation — connected, joins owned, the enquiry is what we answer for. Block 1 de-duplicated against block 3 | None for the copy; sequence-dependent on `/how-it-works` | **FINAL-CANDIDATE** |
| **`/seo`** | **Corrected** | The 12-month horizon is stated before the reader is asked for anything, and the page says plainly when paid is the better answer | **Two evidence overreaches.** It generalised Session 03's finding about *agency-category* queries into a claim about *the client's commercial terms*; and it repeated the 28-run AI figure, which `AI_SEARCH_LANGUAGE.md` §7 limits on this page to **a cross-link only** | Search-demand paragraph reframed to what a reader can verify. The AI figure removed and replaced with a cross-link | None | **FINAL-CANDIDATE** |
| **`/ai-seo`** | **Corrected — strongest page in the set** | It refuses a score, a rank and a guarantee in the section a competitor would use to sell all three, and it names its own zero | The competitor observation was **worded as a jab** — *"appeared zero times in the same 28 runs we appeared zero times in"* — clever, and one step from characterising a competitor as having no AI visibility. Two clauses over-reached: "the whole engagement", and an editorial swipe at the category | Competitor line rewritten to a scoped observation with an explicit "not a verdict on them". Both over-reaching clauses trimmed. Third-person self-reference removed | Two `[VALIDATION REQUIRED]` re-verifications before publication | **FINAL-CANDIDATE** |
| **`/google-ads`** | **Corrected — was carrying a real risk** | The fee/spend boundary and the server-side conversion point are the two things this buyer has actually been burned by | **It printed "performance marketing agency" and "media-buying desk" in order to deny them.** Session 04 verified that what this site asserts is what AI systems redistribute — putting the rejected category on the page as a negation is how it ends up in a description of the company. It also carried an **unevidenced swipe** at competitors ("quietly dropped by month four") and the same search-term overreach as `/seo` | Rewritten positively: where paid search sits, what it is measured on. Both the negation and the swipe removed. Search-term section reframed | Fee/spend separation · the production-claims decision (title) | **PARTIALLY BLOCKED** |
| **`/social-media-ads`** | **Corrected** | Genuinely says the channel is often wrong, which is the only reason the page is credible | *"Cheap clicks and expensive enquiries"* was stated as fact. **Nothing has been measured**, and it is an effectiveness claim about an outcome | Rewritten as a labelled judgement with the mechanism named | None | **FINAL-CANDIDATE** |
| **`/lead-generation`** | **Corrected — mandatory move was missing** | The qualification section is the best page on the site: five checks, two exclusions, and a disqualifier list a buyer can hold us to | **Move 2 was absent.** The page confirmed the searched category and never bridged to the wider system, so it read as a standalone lead-generation service — precisely the drift the orchestrator flagged | A bridge paragraph added to the hero: enquiries are not bought in and forwarded; they come out of connected work. The page now runs category → buyer meaning → qualified enquiries | None | **FINAL-CANDIDATE** |
| **`/conversion-optimization`** | **Corrected** | The experimentation boundary is stated as arithmetic rather than as modesty | The own-site diagnostic was retold in near-identical words to the problem page — the clearest duplication in the set | Compressed to two sentences and pivoted to what it changed about the order of work. The full narrative now lives only on the problem page and in the research entry | None | **FINAL-CANDIDATE** |
| **`/pricing`** | **Corrected** | "What moves the number" genuinely lets a buyer place themselves before enquiring | Two lines were **presumptuous or disparaging**: *"which is what the last supplier probably did"*, and a characterisation of what cheaper suppliers deliver ending *"often nothing more"*. The approved guidance permits naming what they deliver — not adjudicating that it is not enough | Both rewritten. The cheaper-supplier paragraph now says plainly that where that is what a business needs, paying more here would be a poor decision | **Prices, inclusions, minimum, spend/fee — BLOCKING** · entry-offer model | **PARTIALLY BLOCKED** |
| **`/problems/traffic-but-no-enquiries`** | **Corrected — materially improved** | The five checks are genuinely runnable and end in observable outcomes | **It had no honest "cannot tell yet" outcome and no "fix this yourself" outcome.** Every branch eventually implied work. On the page whose credibility rests on not pre-diagnosing, that was the most important omission found in this review | Two outcomes added: too little volume to diagnose honestly, and two findings the reader should fix themselves without hiring anyone. An unverified "more often than anyone admits" removed | Entry-offer model (CTA wording only) | **FINAL-CANDIDATE** |
| **`/how-it-works`** | **Sound within its limits** | The attribution section is the strongest writing on the site and is stated once, at full strength, in the right place | Nothing correctable. **The page cannot be completed** | **The real delivery process — BLOCKING** · people per stage · response ownership | **BLOCKED** |
| **`/research`** | **Sound** | The standard is stated on the index, which is what separates it from a blog listing | None material | Which entries publish · named authorship | **CONDITIONAL** |
| **`/blog`** | **Sound** | Deliberately small and says so | None material | The articles existing · authorship · index technical prerequisites | **CONDITIONAL** |
| **`/about`** | **Corrected** | "Where we are today" states the thinness plainly instead of dressing it | *"This category has spent a decade teaching people not to"* — editorial, unverified and faintly bitter. *"In most arrangements it is nobody's job"* over-claimed. The AI-measurement paragraph was near-verbatim to the homepage | All three fixed; the measurement now appears in different words with a different frame | **People and company facts — BLOCKING** | **PARTIALLY BLOCKED** |
| **`/contact`** | **Sound** | Field labels ask for the situation rather than lead data; the failure state protects what the visitor typed | None material | **NAP — BLOCKING** · response ownership · consent wording · the form backend | **PARTIALLY BLOCKED** |
| **`/schedule-call`** | **Sound but hollow** | The "what it is not" section is honest and useful | **Everything that would make this page worth reading is owner-blocked** — who takes the call, how long, what you leave with. What remains is structurally correct and says little | Nothing to correct without inventing facts | Who takes calls · length · availability · entry-offer model · the booking surface | **PARTIALLY BLOCKED** |
| **`/faq`** | **Sound** | Answers are accurate read alone, which is how they will be extracted | None material beyond the Q7 trim already made in the first pass | Prices · spend/fee · minimum · one validation check | **PARTIALLY BLOCKED** |
| **`/thank-you`** | **New — created in this pass** | Refuses the one thing a visitor most wants here and this business has never measured: a response time | The temptation this page exists to resist is inventing the next step | Written short, with the next-step section left explicitly blocked | Response owner and sequence · hours · phone · the persistence prerequisite | **PARTIALLY BLOCKED** |
| **`/industries/manufacturing`** | **Correctly withheld** | The constraints are recorded so nothing drifts while it waits | — | None. **Orchestrator has confirmed it stays undrafted** | **CONDITIONAL — NOT DRAFTED** |

---

## 12. Cross-page findings

### 12.1 Repeated phrases and arguments

| Repetition | Assessment | Action |
|---|---|---|
| **The 28-run AI measurement appeared on seven pages** | The most serious repetition in the set. A visitor reading three pages would have read the same paragraph three times, and it gave AI search more site-wide presence than the architecture allows | **Removed from `/seo`** (cross-link only, per `AI_SEARCH_LANGUAGE.md` §7). **Reworded on `/` and `/about`** so no two pages phrase it alike. Retained in full on `/ai-seo`, `/how-it-works`, `/faq` and `/research`, where each does a different job |
| **"There are buyers for what you sell, and most never reach you"** *(corrected 2026-09-01, Gate 9A, `DEC-015` — see the annotation at §"Swap-test flags" item 1 below)* | Opened both `/` and `/services` in almost the same words | Left deliberately on both — it is the Level 1–2 message and the two pages are a step apart in one journey — **but flagged for the design phase**, because identical openings on consecutive pages read as a template even when the strategy is correct |
| **The accountability boundary on six pages** | Correct by design; Levels 1 and 2 are fixed sitewide | No copy change. **Design phase must vary the treatment**, or the site will read as one paragraph repeated |
| **The own-site diagnostic narrative** | Told at length on both the problem page and `/conversion-optimization` | Compressed on `/conversion-optimization` |
| **"The situation this is usually bought to fix"** as a heading on three capability pages | A template tell | **Left as-is deliberately** — the heading is honest and the sections beneath it are genuinely different — but it is the clearest remaining signal of a shared skeleton, and a reviewer should decide whether to vary it |

### 12.2 Pages most at risk of sounding templated

1. **`/google-ads` and `/social-media-ads`** — same move order, same section names, and both now open with a channel-fit judgement. They are differentiated in substance (§13) but they are the pair most likely to read as one page with nouns swapped.
2. **`/seo` and `/lead-generation`** — both run problem → what the work involves → boundary → objections. The content differs sharply; the rhythm does not.
3. **Every capability page ends with a "tell us what X is doing now" CTA section.** Consistent, and one variation short of formulaic.

### 12.3 Category-positioning risks

- **The largest was on `/google-ads`**, and it was created by a denial rather than a claim. Now removed.
- **AI search prominence, after correction:** one line on `/`, one paragraph in `/services`, its own page, one short section on `/how-it-works`, two FAQ answers, one research card, and a cross-link from `/seo`. **Within the approved limits.**
- **No page now reads as an SEO-only, AI-only, performance-marketing, full-service or automation firm.** The homepage hero was the one place where "traffic" could have produced the first of those by implication, and it no longer can.

### 12.4 Evidence risks

1. **Three claims went beyond their evidence and were rewritten, not disclaimed** — the search-term contamination generalisation on `/seo` and `/google-ads`, and the channel-effectiveness assertion on `/social-media-ads`.
2. **Two competitor characterisations were softened** to observations with their sample and an explicit statement of what they do not prove.
3. **Two `[VALIDATION REQUIRED]` items remain** on `/ai-seo`, one repeated on `/faq`. The 0.28% figure is the weakest evidence anywhere in the set — a vendor blog citing an unaudited panel — and **a reviewer should decide whether it earns its place at all**, since the page's argument survives its removal.
4. **No claim in the set now sits at ladder level E or F**, and this pass verified that by reading the sentences rather than the evidence tables.

### 12.5 Pages requiring orchestrator attention, in order

1. **`/how-it-works`** — blocked, and nine pages point at it.
2. **`/pricing`** — every figure blocked, and it carries the largest credibility gap on the site.
3. **`/schedule-call`** — structurally fine and substantively empty until four owner inputs arrive.
4. **`/ai-seo`** — the two validation checks, and the decision on the 0.28% figure.
5. **`/` homepage** — confirm the rewritten hero holds the approved H1 without narrowing the firm to search.

---

## 13. Capability-page differentiation, checked page by page

**The test: could each page's opening two screens be swapped with a sibling's and still make sense? If yes, the page does not deserve to exist.**

| Page | Unique buyer situation | Unique problem | Unique method | Unique evidence / boundary | Deserves to exist? |
|---|---|---|---|---|---|
| **`/seo`** | Has decided the problem is search; often a marketing lead | Found for the wrong things, or found and nothing follows | Demand selection, technical foundations, migration and equity protection | **The 12-month horizon, stated before commitment** | **Yes** |
| **`/ai-seo`** | Absent from AI answers; often misinformed by vendors | Cannot find out *why* they are absent | The diagnostic chain, entity accuracy, off-site source authority, per-system measurement | **The refusal of a score, and a published zero of its own** | **Yes** |
| **`/google-ads`** | Spending now, cannot trace enquiries | Spend goes out, traceable enquiries do not come back | Account, search-term review, landing experience, **server-side conversion measurement** | **The fee/spend separation** | **Yes** |
| **`/social-media-ads`** | Already running something on Meta | Volume and clicks, few enquiries worth quoting | Channel-fit judgement before anything else | **The willingness to decline the channel** | **Yes, narrowly** — it is retained for URL equity and reads as the most modest page in the set, which is correct |
| **`/lead-generation`** | Counts enquiries, not sessions | Not enough, or enough and the wrong ones | Qualification, published and machine-checkable | **The definition itself, and what it refuses to judge** | **Yes** |
| **`/conversion-optimization`** | Arrived through the category term; already has a solution in mind | The brief is already a solution, and often the wrong one | Diagnosis before optimisation; built, not recommended | **The experimentation threshold, stated as arithmetic** | **Yes** |

**No two pages share a primary message.** The pair that came closest — `/google-ads` and `/social-media-ads` — differ on the only axis that matters commercially: one is about making spend traceable, the other about whether to spend at all.

---

## 14. Problem-page test, run explicitly

**Requirement:** at least some diagnostic outcomes must lead to no MappedSkills work, a different capability, or "not enough evidence to diagnose yet."

| Outcome | Where it leads | Present? |
|---|---|---|
| Wrong traffic | **A different capability** — acquisition, not conversion work; and the page says selling conversion work here is selling the wrong thing | ✔ (original) |
| Enquiries real but wrong-fit | **Upstream of the website** — what you rank or bid for, or how the offer is described | ✔ (original) |
| No analytics, or a form that does not deliver | **No MappedSkills work.** "Whoever built or maintains your site can do them, usually in a day. You do not need an agency for that, and you should not pay one for it" | ✔ **added in this pass** |
| Too little volume to tell | **No diagnosis available yet.** "Anyone confidently diagnosing your business from them is guessing" | ✔ **added in this pass** |
| Page does not answer the visit | The one case where page-level conversion work is right | ✔ |

**Verdict: the page is now a genuine diagnostic.** Three of its outcomes lead somewhere other than a MappedSkills engagement, and one tells the reader they cannot yet know. Before this pass, every branch eventually implied work — which would have made it a well-disguised sales page.

---

## 15. Production claim finding — confirmed, unchanged, unactioned

The finding in §7 above is **confirmed and is not superseded**: "300%+ ROI" appears on **at least seven production surfaces** — the homepage title and a homepage statistic block, the `/google-ads` title and a statistic block, statistic blocks on `/lead-generation`, `/about` (twice), `/how-it-works` and `/work`, and a hard-coded blog metadata description — where the approved documentation records the homepage title only. The sitewide default title carries **"Performance Marketing for SaaS"**, a rejected company-level positioning plus a segment claim that contradicts the approved ICP.

**No production file was opened for modification in this pass, no technical audit was expanded, and no remediation was performed.** It remains an owner decision under `DEC-007`.

---

## 16. Gate status after the second-reader pass

> **THE COPY GATE IS STILL NOT PASSED.**
>
> Twenty-five substantive corrections were made to the words themselves in this pass, including one prohibited engagement-model absolute, three claims beyond their evidence, one missing mandatory message move, and one problem page that lacked an honest "we cannot tell yet" outcome. **A set requiring that many corrections at second reading is not a set to approve on the first review.**
>
> **Seven pages are FINAL-CANDIDATE — meaning ready to be reviewed, by someone other than their writer.** `MESSAGE_QUALITY_GATE.md` §3 still applies in full: nobody approves their own copy, and this pass does not substitute for an independent reviewer, an owner sign-off on facts, or an orchestrator gate decision.

---
---

# FINAL ORCHESTRATOR-DIRECTED CHECK

**Date:** 2026-09-01 · **Branch:** `test_branch` · **Third pass, deliberately narrow.**
**Not a rewrite.** No strategy reconsidered, no alternative positioning generated, no research performed, no page rewritten for style. **Earlier review history (§1–§16) is preserved unedited.**

**Scope:** the actual current copy of the seven FINAL-CANDIDATE pages, plus the homepage, whose hero was materially corrected in the second pass. Seven fixed tests per page: first-screen comprehension · category · claims · engagement model · terminology · swap · AI-writing.

---

## 17. Orchestrator decisions applied

| # | Decision | Applied |
|---|---|---|
| 1–2 | Homepage H1 and revised supporting direction approved | Confirmed in place, unchanged |
| 3 | `/thank-you` treatment approved | Unchanged |
| 4 | Conditional manufacturing page stays undrafted | Unchanged |
| 5 | `/how-it-works` remains BLOCKED | Unchanged |
| 6 | `/schedule-call` remains PARTIALLY BLOCKED | Unchanged |
| 7 | Repeated structural headings need no forced variation | **Applied — the §12.2 flag is withdrawn.** No heading was changed to manufacture difference |
| 8 | **Remove the ~0.28% AI-referral statistic** | **Done.** Removed from `/ai-seo`, the only page carrying it. **No replacement statistic added.** Evidence note replaced with the removal record |
| 9 | `[VALIDATION REQUIRED]` claims are not publication-ready | **Recorded on the page itself.** `/ai-seo`'s Copy Status now states the standing rule explicitly; `/faq` Q12 carries the same flag inline |

---

## 18. Test results — seven FINAL-CANDIDATE pages plus the homepage

| Route | First-screen | Category | Claims | Engagement model | Terminology | Swap | AI-writing | Overall |
|---|---|---|---|---|---|---|---|---|
| `/` | PASS | PASS | PASS | PASS | PASS | PASS *(one flag)* | PASS | **PASS** |
| `/services` | PASS | PASS | PASS | PASS | PASS | PASS *(one flag)* | PASS | **PASS** |
| `/seo` | PASS | PASS | PASS | PASS | PASS | PASS | PASS *(corrected)* | **PASS** |
| `/ai-seo` | PASS | PASS | PASS *(corrected)* | PASS | PASS | PASS | PASS | **PASS** |
| `/social-media-ads` | PASS | PASS | PASS | PASS | PASS *(corrected)* | PASS | PASS | **PASS** |
| `/lead-generation` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/conversion-optimization` | PASS | PASS | PASS | PASS | PASS | PASS | PASS *(corrected)* | **PASS** |
| `/problems/traffic-but-no-enquiries` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |

**All eight pages pass all seven tests as they now stand.**

### Homepage special check

**"This is basically an SEO agency"** is not a reasonable conclusion from the current first screen. The H1 names traffic only in order to set it aside; the first supporting sentence is about buyers rather than channels; the second names **being found in search *and* paid demand where it earns its place**, alongside the page and the measurement. Search and paid appear proportionately — one clause each in the hero, one line each in block 5 — and **the hero is not a service list.**

### Swap-test flags — recorded, not corrected

1. *"There are buyers for what you sell, and most of them never reach you"* opens both `/` and `/services`. A competitor could publish that sentence. **It is retained** because it is the approved Level 1–2 supporting message and the H1 above it is not swappable — but it is the one prominent line in the set that carries no differentiation on its own. **[Governance note, 2026-09-01, Gate 9A, `DEC-015`.]** This audit's swap-test finding stands unchanged as history. Separately, the Session 12 creative stress-test identified that the "most of them" clause is an unsupported second-person quantity assertion, distinct from the swap-test concern recorded here. The orchestrator authorised a narrow correction, applied on `/` and `/services`, to *"There is buyer demand for what you sell, and some of it never reaches you."* The swap-test observation above (no differentiation) is unaffected by that correction and remains recorded as-is.
2. Intent-confirmation openers on the capability pages (*"We do the organic search work…"*, *"We run paid social advertising…"*) are ordinary functional language and are correctly generic. **Not flagged.**

### AI-writing findings

- **Em dashes** run at roughly one per 50–90 words across each file, but the majority sit in the documentation scaffolding — evidence tables, supporting-element notes — rather than in page prose. **In body copy the rate is acceptable.** Two stacked instances were removed (§19).
- **One repetitive construction was real:** `/seo` used "rather than" four times in its body copy. Two were rewritten.
- **No three-part slogan rhythms, no artificial contrasts, no consultant vocabulary** were found in the current copy. The single deliberate contrast — *"Traffic is where that route starts. The enquiries are the part we answer for."* — is the approved hero mechanic and earns its place.

---

## 19. Exact sentences corrected in this pass

| # | Page | Before | After | Reason |
|---|---|---|---|---|
| 1 | `/ai-seo` | *"…AI assistants sent roughly 0.28% of total web traffic in March 2026, against Google's 28.12% — a figure published on a vendor's blog citing an unaudited third-party panel… It is small, it is growing, and it is not where your enquiries are coming from this quarter."* | *"Discovery through AI assistants is real and it is growing. It is also, on everything we have seen, still much smaller than ordinary search. We will not put a share figure on it. The published numbers come from vendor panels nobody outside those vendors can audit, and a number we cannot stand behind is worse than no number at all. If your enquiries have to improve this quarter, this is not the work that does it."* | **Orchestrator direction 8.** Weak third-party evidence removed; **no replacement statistic**; the refusal to publish an unauditable figure now does the work the figure did |
| 2 | `/social-media-ads` | *"…we are accountable up to the qualified enquiry, not up to reach, clicks or engagement."* | *"…we are accountable for the enquiries it produces rather than for reach, clicks or engagement."* | **Terminology.** "Qualified enquiry" appeared in a first screen on a page that cannot explain qualification there; the approved default noun is "enquiries" |
| 3 | `/conversion-optimization` | *"It is not sold as a separate service. It is the second half of one outcome — enquiries you can act on — and we are accountable up to that enquiry rather than up to a conversion rate."* | *"It is not a separate service here. It is the second half of one outcome, and the number we answer for is enquiries you can act on, not a conversion rate."* | **AI-writing.** Stacked "not X, it is Y" plus a parenthetical em-dash pair in one sentence |
| 4 | `/seo` | *"…the reporting is against a starting point rather than against a memory."* | *"…the reporting has a starting point to be measured against."* | **AI-writing.** Fourth "rather than" in one page's body copy |
| 5 | `/seo` | *"…the measurement is part of the engagement rather than a monthly PDF."* | *"…the measurement is part of the work itself, not a monthly PDF."* | Same; also avoids implying a fixed engagement shape |

**Nothing else was changed.** No page was rewritten for style, and no heading was varied to manufacture difference.

---

## 20. Status after the final check

**No status was upgraded by this review.** A review does not supply a missing owner fact.

| Status | Routes |
|---|---|
| **FINAL-CANDIDATE (7)** | `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries` |
| **PARTIALLY BLOCKED (8)** | `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq` · `/thank-you` |
| **BLOCKED (1)** | `/how-it-works` |
| **CONDITIONAL (3)** | `/research` · `/blog` · `/industries/manufacturing` *(undrafted)* |

**Validation-required claims still outstanding:** one — Google's published statement that optimising for generative AI "is thus still SEO", appearing on `/ai-seo` (move 8) and `/faq` (Q12). **It is documented, it is flagged in place, and it is not publication-ready until re-verified.**

**The `/ai-seo` statistic is not on this list.** It was removed rather than deferred, and must not be reintroduced.

---

## 21. Gate status after the final check

> **THE COPY GATE IS STILL NOT PASSED, AND IS NOT PASSED BY THIS SECTION.**
>
> The seven FINAL-CANDIDATE pages passed every test applied here and are **recommended to the orchestrator for approval** on their substantive copy. That recommendation is not an approval: gate advancement is an owner and orchestrator action recorded in `DECISION_LOG.md`, and `MESSAGE_QUALITY_GATE.md` §3 still requires a reader who is not the writer.
