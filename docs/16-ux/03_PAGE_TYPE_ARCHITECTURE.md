# Page-Type UX Architecture — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `PAGE_TYPE_CRO_RULES.md` (approved, `DEC-011`) — which this document extends into UX behaviour and does not modify · `17_ARGUMENT_APPARATUS_HIERARCHY.md` §3 · the approved page copy.

**Rules by page *type*, not by URL**, so a new page inherits its rules rather than inventing them. **No layout is designed here.**

**Field definitions used throughout:**
- **First-screen requirement** — what must be present before any scroll, and what must not.
- **Section sequence logic** — the ordering principle, not a fixed section list.
- **Evidence placement** — the apparatus state from `17` §2, applied.
- **Must NOT appear** — content prohibited on this page type by approved rule, with the rule named.

---

## 1. Homepage — `/`

| | |
|---|---|
| **Primary job** | Make the proposition legible, make one reason to believe visible, then route or convert |
| **Primary user question** | *What is this firm, and is it worth my next click?* |
| **First screen** | The H1 alone at the largest scale, its supporting line plainly subordinate, two primary actions, and **exactly one dated checkable item** — the single site-wide exception to no-apparatus-above-the-fold. Nothing else. Nothing animates; nothing gates first paint |
| **Sequence logic** | Standard accepted → recognition → mechanism → boundary → routing → what can be checked → fit → act. **Pace: fast → fast → slow → slowest → fast → medium → warm → fast** |
| **Evidence placement** | ABSENT on the first screen except the one dated item · ADJACENT-SECONDARY and never collapsible at the boundary · IMMEDIATE in the "what you can check" block |
| **CTA behaviour** | PRIMARY, both surfaces, in the first screen and again at the end. PROOF as a secondary offer. DIRECT as a peer at the end. Sticky permitted |
| **Navigation behaviour** | Full header. No breadcrumb. The capability block duplicates header routes deliberately — a scanning visitor and a navigating visitor take different paths to the same pages |
| **Visual storytelling** | One figure of full weight only: the run (F1), at Block 3, reused as a state change at Block 4. No second full-weight figure |
| **Mobile** | Sequence unchanged. The capability block becomes the earliest useful skip target. The boundary stays fully expanded |
| **Must NOT appear** | Logo wall · client count · testimonial · rating · review count · award · "trusted by" · any business-performance metric · a case-study CTA · a capability card grid (B14) · manufacturing framing or any link to the conditional vertical page · a service or category term the page could rank for (IA §4) |
| **Dependencies** | People block **OWNER-BLOCKED** · own-site diagnostic link **TECHNICAL PREREQUISITE** · phone number and response ownership **OWNER-BLOCKED** · page metadata blocked on the `DEC-007` decision |

Full treatment: `04_HOMEPAGE_UX.md`.

---

## 2. Services hub — `/services`

| | |
|---|---|
| **Primary job** | Be the page that *is* the proposition, and route to the capability the visitor came for |
| **Primary user question** | *What does the whole thing actually consist of, and which part do I need?* |
| **First screen** | The outcome as the page's subject. **The method does not open this page**, and the run appears after the commercial statement, never as the entry. Zero apparatus |
| **Sequence logic** | Outcome → three connected parts (with the joins as the subject) → accountability boundary → capability routing → selective expansion → what we do not do → scope honesty → fit → act |
| **Evidence placement** | ABSENT above the fold · EXPANDABLE at mid-page claims · ADJACENT-SECONDARY, never collapsible, at the boundary |
| **CTA behaviour** | PRIMARY both surfaces; PROOF to `/how-it-works`; CONTEXTUAL to the problem page. Sticky permitted |
| **Navigation behaviour** | The only true capability hub. Every capability page links back up here. Breadcrumb: none (top level) |
| **Visual storytelling** | The run with **the joins marked** (F1 variant) — the joins are the page's argument, and a figure showing three tidy stages and no seams states the opposite of the page |
| **Mobile** | Capability routing must be reachable within one or two screens of the top for a visitor who came only to route |
| **Must NOT appear** | A service menu in any form · "Our services" as a heading · a capability card grid of equal weight · per-capability feature lists · icons per capability (A13) · a named framework (B18) · any AI-search section, hero or special treatment — AI search gets one paragraph inside capture |
| **Dependencies** | Sequence-dependent on `/how-it-works`, which is BLOCKED |

---

## 3. Capability / commercial page — `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`

| | |
|---|---|
| **Primary job** | Confirm the searched capability, bridge to the outcome, and convert |
| **Primary user question** | *Do you do this, and are you the kind of firm I want doing it?* |
| **First screen** | Search-intent confirmation in the searcher's own word, the bridge to the commercial outcome within two sentences, and the primary action. **Zero apparatus (B27). No figure. No proof module** |
| **Sequence logic** | The nine approved message moves, of which **1 and 2 always sit in the first screen** and **5 (the boundary) always sits above the midpoint**. Which of the remaining moves appear, and in what order, is driven by buyer intent — see `05_COMMERCIAL_PAGE_UX.md` |
| **Evidence placement** | ABSENT in the opening moves · EXPANDABLE at mid-page claims · ADJACENT-SECONDARY and never collapsible at the boundary and the measurement limits |
| **CTA behaviour** | PRIMARY, both surfaces, above the fold and at the end. PROOF and CONTEXTUAL in the middle, at the point the relevant claim is made — **never at a fixed interval, never at every section end**. Sticky permitted |
| **Navigation behaviour** | Breadcrumb present, expressing the `/services` hierarchy the flat URL does not. Links up to `/services` and across to the matching problem page |
| **Visual storytelling** | The run with **one segment emphasised and the remainder recessive** — the same object the reader may already know, showing where this capability sits. Page-specific figures per `19` |
| **Mobile** | Confirmation and bridge must both fit the first screen at the smallest supported width. If they do not, the copy is too long for the opening, and that is a finding to report — not a reason to move the bridge below the fold |
| **Must NOT appear** | A rejected category term as framing · "CRO" in body copy · "leads" as MappedSkills' own outcome word · a number without its sample, date, location and method · a proof step interposed before the conversion · a guarantee |
| **Dependencies** | `/google-ads` fee/spend separation **OWNER-BLOCKED** · `/ai-seo` carries a `[VALIDATION REQUIRED]` claim · `/conversion-optimization` own-diagnostic link **TECHNICAL PREREQUISITE** |

---

## 4. Problem page — `/problems/{symptom}`

| | |
|---|---|
| **Primary job** | Be materially useful on its own terms, then let those who want help ask for it |
| **Primary user question** | *Why is this happening to me, and which of these is mine?* |
| **First screen** | The symptom named in the reader's own words, and the promise that the checks are on this page and runnable today. **No hard sell. No apparatus. No CTA above the fold** |
| **Sequence logic** | Validate → refuse the assumption → the four causes → self-identification → the runnable checks → what each finding means (**including the outcomes that point away from the firm**) → the worked example → commercial transition, last |
| **Evidence placement** | ABSENT at the opening · ADJACENT-SECONDARY on each check's observable outcome — the outcome is part of the instrument, not commentary on it |
| **CTA behaviour** | DIAGNOSTIC, below the fold, after the reader has an answer. LOW-COMMITMENT mid-page, then PRIMARY at the very end. Sticky permitted **below the fold only**, and **never inside the checks section** |
| **Navigation behaviour** | Breadcrumb present. **Not in the primary navigation** — a "Problems" menu would advertise a family with one member |
| **Visual storytelling** | The four causes (F2) at full depth — the page's core value. The five checks as an operable instrument (F6) |
| **Mobile** | The four-cause figure has a genuine vertical form. The checks are a linear sequence, one at a time, each ending in its observable outcome |
| **Must NOT appear** | A gate of any kind — email wall, sign-up, download, "get your score" (B25) · a score, grade or diagnosis · a conversion benchmark or uplift figure (none exists) · a fabricated before/after · a hard sell above the fold · a dead end in a service pitch |
| **Dependencies** | DIAGNOSTIC CTA wording blocked on the entry-offer decision — **structure survives any answer** · worked-example link **TECHNICAL PREREQUISITE** |

Full treatment: `06_PROBLEM_PAGE_UX.md`.

---

## 5. Pricing — `/pricing`

| | |
|---|---|
| **Primary job** | Let a buyer place themselves before contacting anyone, and let a poor fit leave without enquiring |
| **Primary user question** | *What does this cost, and am I in the right range?* |
| **First screen** | What is actually being bought, then the horizon, then the price. **The most commercial page on the site**: sparse, confident, undecorated. Apparatus DEFERRED entirely |
| **Sequence logic** | What is bought → horizon → **price** → what moves the number → what the engagement needs from you → who this is not for → the hardest objection → act |
| **Evidence placement** | DEFERRED to "what moves the number". No provenance sits beside the price |
| **CTA behaviour** | PRIMARY with **booking emphasised** — price-stage buyers want a person. PROOF secondary. Sticky permitted |
| **Navigation behaviour** | Primary nav item. Breadcrumb optional; the page is top-level |
| **Visual storytelling** | The factor matrix (F8) — **not a calculator, and it produces no quote** |
| **Mobile** | The price is the largest element on its own screen. The factor matrix linearises; it must not become a horizontally scrolled table of the whole page |
| **Must NOT appear** | A decorated price · a calculator or value estimator · an ROI figure, payback period or "clients typically see" · disparagement of cheaper suppliers · urgency, scarcity or limited-time framing · a claim of proof that does not exist |
| **Dependencies** | **Every figure is OWNER-BLOCKED** — prices, inclusions, exclusions, whether spend is separate, minimum engagement. Entry-offer model affects CTA framing |

---

## 6. Methodology — `/how-it-works`

| | |
|---|---|
| **Primary job** | Be the proof. Establish credibility, including by publishing what cannot be attributed |
| **Primary user question** | *How do you actually work, and what will you admit you cannot tell me?* |
| **First screen** | That the page exists to be checked. **Not "our process."** This is the one page type whose apparatus is IMMEDIATE from the top — and it still opens fast, because the opening is a plain commercial statement about checkability, not a method dump |
| **Sequence logic** | The diagnostic argument → the stages **[BLOCKED]** → what is measured → what is not and cannot be → **what cannot be attributed** (the highest-value section on the site, at a third of the page's weight) → where human judgement enters → where capabilities sit → what the client provides → what happens after an enquiry **[BLOCKED]** → uncertainty, visible → act, at the end only |
| **Evidence placement** | **IMMEDIATE throughout.** This page *is* the apparatus |
| **CTA behaviour** | PROOF is the page's role. PRIMARY appears **at the end only**. **Sticky CTA prohibited (B16)** |
| **Navigation behaviour** | Primary nav item. Must carry an obvious contextual route **back** to the commercial decision — journey G depends on the return path existing |
| **Visual storytelling** | The run (F1) at §3 · what cannot be attributed (F4) at full depth at §4/§5. **F17, the stage sequence, is BLOCKED — no sketch, no prototype, no placeholder** |
| **Mobile** | The measured / not-measured pair must remain a pair. If it cannot be shown side by side, it is stacked **adjacent and at equal weight**, never one collapsed and one open |
| **Must NOT appear** | A branded framework or methodology name (B18) · a speculative process diagram (B4) · a sticky CTA · a numeric response-time commitment · a stage description invented to fill the blocked section |
| **Dependencies** | **BLOCKED.** The real delivery process is the single most consequential owner input in the programme |

---

## 7. Research index — `/research`

| | |
|---|---|
| **Primary job** | Make the standard visible, and make each entry findable and citable |
| **Primary user question** | *What has this firm actually measured, and how carefully?* |
| **First screen** | What research means here and what standard applies. The entries begin immediately after |
| **Sequence logic** | The standard → what is and is not research here → the entries → how to cite → what this is not yet |
| **Evidence placement** | **IMMEDIATE on every card.** The metadata schema — date · systems or scope · sample · version — is what distinguishes this index from a blog listing |
| **CTA behaviour** | RESEARCH primary. PRIMARY well below the fold, if at all. **Sticky prohibited** |
| **Navigation behaviour** | Primary nav item ("Evidence"). Breadcrumb parent for entries |
| **Visual storytelling** | Entry cards whose image is a **crop of the actual figure**, never a stock image or an abstract (F10) |
| **Mobile** | Cards stack. Metadata stays on the card; it is the reason to trust the entry and must not be truncated away |
| **Must NOT appear** | A gate, email wall or download form · a sticky CTA · decorated stubs · "coming soon" · more entries than genuinely exist |
| **Dependencies** | **CONDITIONAL** on which entries publish. Named authorship **OWNER-BLOCKED** |

---

## 8. Research entry — `/research/{slug}`

| | |
|---|---|
| **Primary job** | Publish a finding, including an adverse one, in enough detail to be reproduced |
| **Primary user question** | *What did you find, how did you find it, and what does it not support?* |
| **First screen** | The question and why it was asked. **Never the conclusion as a hook** |
| **Sequence logic** | Question → method → findings (adverse included) → interpretation, labelled as such → limitations → commercial relevance, short, at the end, once |
| **Evidence placement** | **IMMEDIATE.** Sample, date, location, method in the entry itself, never in an appendix nobody opens |
| **CTA behaviour** | RESEARCH; LOW-COMMITMENT (subscribe); PRIMARY well below the fold. **Sticky prohibited** |
| **Navigation behaviour** | Breadcrumb: Home → Evidence → entry. Named authorship in the reading path |
| **Visual storytelling** | The four AI layers per system (F3) on the baseline entry; the intervention record (F7) on the own-site diagnostic |
| **Mobile** | Provenance stays IMMEDIATE. Per-system comparison must not require horizontal scrolling of the page body |
| **Must NOT appear** | A not-testable system rendered as zero (B1) · a blended cross-system figure (B9) · a ranking or leaderboard (B8) · a trend line from one measurement (B10) · an aggregate score (B7) · an entry that would be pointless with its commercial paragraph deleted |
| **Dependencies** | Baseline entry is **READY** and needs no owner input. Own-site diagnostic is **TECHNICAL PREREQUISITE**. Both need named authorship |

---

## 9. Blog index — `/blog`

| | |
|---|---|
| **Primary job** | Make the editorial stream legible and each article findable |
| **Primary user question** | *Is there anything here worth reading?* |
| **First screen** | What is written about here, then the articles |
| **Sequence logic** | What this is → the articles → the boundary with research |
| **Evidence placement** | Byline IMMEDIATE on each card. Nothing else |
| **CTA behaviour** | LOW-COMMITMENT. **Sticky prohibited** |
| **Navigation behaviour** | Primary nav item. **Pagination is required before the stream scales** — the Contentful query ceiling is 100 items and silently truncates the index, `generateStaticParams` and the sitemap together |
| **Visual storytelling** | None required. Cards are permitted here — genuinely discrete comparable items, rule-bounded, not filled and shadowed |
| **Mobile** | Cards stack. Category filtering, if present, must not be the only route to an article |
| **Must NOT appear** | A newsletter modal · a sticky CTA · both a `?category=` parameter and a category path (pick one) · filler posts to make the index look full |
| **Dependencies** | **CONDITIONAL** — cannot publish before the articles it lists exist |

---

## 10. Article — `/blog/{slug}`

| | |
|---|---|
| **Primary job** | Deliver the answer, then offer one relevant next step |
| **Primary user question** | *What is the answer to the thing I searched?* |
| **First screen** | The article's own opening. Byline present. **No CTA, no booking prompt, no interruption before the answer is delivered** |
| **Sequence logic** | The article's own argument. Sourcing is available on demand, not in the reading path |
| **Evidence placement** | **EXPANDABLE**, with the byline IMMEDIATE |
| **CTA behaviour** | LOW-COMMITMENT after the answer. CONTEXTUAL to the matching commercial or problem page. **Sticky prohibited. No booking prompt, ever** |
| **Navigation behaviour** | Breadcrumb. Table of contents on long articles. Related articles within the cluster only |
| **Visual storytelling** | Per article. Figures reused from the canonical source rather than redrawn |
| **Mobile** | Table of contents collapses to a disclosure at the top; it must not become a floating overlay competing with the text |
| **Must NOT appear** | A sticky CTA · a booking prompt · a gated download · a newsletter interstitial · a PRIMARY CTA above the answer |
| **Dependencies** | Three unconditional articles **NOT DRAFTED**. Named authorship **OWNER-BLOCKED** |

**Recorded, not resolved:** these pages will attract non-buyers by design — the target vocabulary is career- and course-contaminated. **Editorial conversion rate will look poor and must not be optimised by adding pressure.**

---

## 11. About — `/about`

| | |
|---|---|
| **Primary job** | Be the entity anchor, and let specificity substitute for scale |
| **Primary user question** | *Who are these people, and is this a real firm?* |
| **First screen** | Who we are and what we can actually show you. People are the point of the page and should be reachable fast |
| **Sequence logic** | Why the firm exists → what it will and will not answer for → how it works → **the people [BLOCKED]** → what you can check → **company facts [BLOCKED]** → who this is for → where the firm is today |
| **Evidence placement** | **ADJACENT-SECONDARY.** People and credentials lead; provenance supports |
| **CTA behaviour** | PROOF primary; PRIMARY secondary. Sticky not required |
| **Navigation behaviour** | **Newly promoted into the primary navigation** from footer-only. Entity facts must be byte-identical to `/contact`, the footer and the structured data |
| **Visual storytelling** | Real portraits of named people, when unblocked. **No stock, no silhouettes, no "our team" without names** |
| **Mobile** | People block stays high. Entity facts remain fully readable, not collapsed |
| **Must NOT appear** | Invented milestones · a founding myth · a founding year that is not verified · a rating, review count or client count · `aggregateRating` markup without genuine permissioned first-party review data |
| **Dependencies** | **Sections 4 and 6 are OWNER-BLOCKED** and are exactly the sections a writer is most tempted to fill |

---

## 12. Contact — `/contact`

| | |
|---|---|
| **Primary job** | Complete the qualified enquiry, and carry the entity data local and AI-answer discovery depend on |
| **Primary user question** | *How do I reach you, and is this a real business at a real address?* |
| **First screen** | The ask, and the form. **Zero apparatus, zero figures, zero proof anywhere on the page** |
| **Sequence logic** | The form → what happens next **[BLOCKED]** → direct contact → where we are **[BLOCKED]** → cross-link to booking |
| **Evidence placement** | **ABSENT.** Proof here is a distraction |
| **CTA behaviour** | PRIMARY only — no competing goal. Cross-link to the booking surface. DIRECT always visible at equal weight |
| **Navigation behaviour** | Utility navigation and the header CTA, not a primary nav item. **Minimal outbound linking** — do not offer routes away from a decided visitor |
| **Visual storytelling** | None. A real map or a real photograph of a real location **only if one exists** |
| **Mobile** | `tel:` is one tap. Correct input types and `inputmode`. Sticky elements must never obscure a field or the submit control, especially with the keyboard open |
| **Must NOT appear** | Any proof element (B17) · a fifth required field · budget · "how did you hear about us?" · a response-time number · a rating or client count |
| **Dependencies** | **NAP OWNER-BLOCKED** · response ownership **OWNER-BLOCKED** · consent wording **LEGAL REVIEW** · **the whole route is launch-blocked on a server endpoint, durable persistence and transactional email** |

---

## 13. Schedule call — `/schedule-call`

| | |
|---|---|
| **Primary job** | Complete the qualified enquiry through the booking surface. **A qualified booking is a qualified enquiry, not a lesser conversion** |
| **Primary user question** | *Who will I be talking to, how long is it, and what do I get out of it?* |
| **First screen** | What the call is, and the route into booking it. Zero apparatus |
| **Sequence logic** | What the call is **[BLOCKED]** → what you get either way → what it is not → what to have to hand → the other route |
| **Evidence placement** | **ABSENT** |
| **CTA behaviour** | PRIMARY only — the booking surface. Cross-link to the form. DIRECT visible |
| **Navigation behaviour** | Reached from the header CTA where that leads here, from `/pricing`, from `/contact`, and from every commercial page |
| **Visual storytelling** | None |
| **Mobile** | The booking surface must be usable at the smallest supported width. **A booking embed that only works on desktop fails a mandatory capability** |
| **Must NOT appear** | Proof elements · scarcity or "limited slots" · a "free" framing before the entry-offer decision · any availability or response-time promise · a guaranteed outcome from the call |
| **Dependencies** | Who takes calls, call length, availability **OWNER-BLOCKED** · entry-offer model · **a working booking surface that accepts runtime custom fields and exposes the booking server-side** |

---

## 14. FAQ — `/faq`

| | |
|---|---|
| **Primary job** | Answer late-stage and long-tail questions plainly |
| **Primary user question** | *You have not answered this yet — what is the answer?* |
| **First screen** | The page's purpose and the first group of questions |
| **Sequence logic** | Grouped by subject — commercial, outcome, measurement, fit, AI search — then act |
| **Evidence placement** | **EXPANDABLE.** The answer leads; its basis is available |
| **CTA behaviour** | LOW-COMMITMENT primary; PRIMARY at the end |
| **Navigation behaviour** | Footer. Late-stage and long-tail; not a primary nav item |
| **Visual storytelling** | None |
| **Mobile** | Same disclosure behaviour as desktop |
| **Must NOT appear** | Restated attribution limits — **they are stated once, at full strength, on `/how-it-works`** · a price that contradicts `/pricing` · an accordion hiding anything that is not a genuine discrete question |
| **Dependencies** | Three price answers **OWNER-BLOCKED** · one `[VALIDATION REQUIRED]` claim |

**Accordion note.** `/faq` is the **one** page type where a collapsed-on-load accordion is permitted (A20 CONDITIONAL), because each item is a genuine discrete question the reader chooses between. It is not permitted for limits, method, attribution, or anything a reader needs in order to evaluate a claim.

---

## 15. Industry page — `/industries/manufacturing` *(CONDITIONAL)*

| | |
|---|---|
| **Primary job** | Capture industrial B2B provider intent and convert it, RFQ-shaped |
| **Primary user question** | *Do you understand my kind of business?* |
| **First screen** | The searched capability confirmed in this segment's own terms, and the primary action, **with phone/WhatsApp genuinely prominent** — this segment calls |
| **Sequence logic** | Confirm → bridge → the buyer's problem → what the work involves → **the boundary, which must say plainly that no manufacturing result exists** → objections, including "you have not worked with manufacturers" → act |
| **Evidence placement** | ABSENT above the fold; ADJACENT-SECONDARY at the boundary |
| **CTA behaviour** | PRIMARY with DIRECT elevated. Sticky permitted |
| **Navigation behaviour** | One dropdown item, **rendered from a config flag** so the dropdown works correctly with five children. **Every internal link to it must be removable in a single change** |
| **Visual storytelling** | The run with the relevant segment emphasised. **No manufacturing imagery on any unconditional page** (B21) |
| **Mobile** | Phone and WhatsApp at the top and the bottom |
| **Must NOT appear** | Any implication that a manufacturing case study exists · "agency for manufacturers" framing anywhere outside this page · a vertical grid or an `/industries` hub |
| **Dependencies** | **The manufacturing validation gate.** Copy is deliberately **NOT DRAFTED** until it clears |

---

## 16. Thank-you — `/thank-you`

| | |
|---|---|
| **Primary job** | Confirm the enquiry arrived, say what happens next only as far as it is genuinely known, offer one useful thing |
| **Primary user question** | *Did that work?* |
| **First screen** | The confirmation. That is the whole first screen |
| **Sequence logic** | Confirmation → what happens next **[BLOCKED]** → if it is urgent → one useful thing to read |
| **Evidence placement** | **ABSENT** |
| **CTA behaviour** | **None.** The conversion has happened. One LOW-COMMITMENT link, chosen from the page the enquiry came from |
| **Navigation behaviour** | Reached only from a confirmed submission or a confirmed booking. Never in navigation, never in the sitemap, `noindex` |
| **Visual storytelling** | The enquiry arriving, as a state — not a celebration graphic |
| **Mobile** | Confirmation visible without scrolling |
| **Must NOT appear** | A second ask of any kind · a response-time statement in any form, including "shortly" or "soon" · celebration language or exclamation marks · a progress bar or "step 3 of 3" · anything implying the enquiry has been assessed · an upsell, referral request, review request or social follow prompt |
| **Dependencies** | Response ownership and the real post-enquiry sequence **OWNER-BLOCKED** · **reached only after the server confirms durable persistence** |

Full treatment: `09_FORM_AND_BOOKING_UX.md` §7.

---

## 17. Utility and legal — `/privacy-policy`, `/terms`, `/work` (held back), 404

| | |
|---|---|
| **Primary job** | Be accurate, be readable, and recover the visitor where recovery applies |
| **First screen** | The document's own title and its effective date |
| **Evidence placement** | ABSENT |
| **CTA behaviour** | **None** on legal pages. Recovery navigation only on 404 |
| **Navigation behaviour** | Footer. `/work` is `noindex`, out of the sitemap and out of navigation until at least one permissioned case study exists |
| **Must NOT appear** | A conversion prompt on a legal page · a "coming soon" placeholder on `/work` — **no content is the correct content there** · hard-coded recovery links on 404 |
| **Dependencies** | Legal pages require **legal review, not copywriting**. The 404 recovery links **must be generated from live routes** — the current page hard-codes three blog slugs that all return 404 |

---

## 18. Page types the architecture does not create

| Not created | Why |
|---|---|
| Author pages (`/about/{person}`) | PHASE 2. Justified once a body of authored work exists |
| Category archives | Only if categories get real paths. **Do not build both a parameter and a path** |
| `/industries` hub | One child. Created when a second vertical exists; `/industries` 404s at launch, an accepted and recorded condition |
| A tool page of any kind | Zero tools at launch |
| A case-study detail page | `/work/{slug}` consolidation is blocked on the Contentful slug inventory, and zero case studies are published |
