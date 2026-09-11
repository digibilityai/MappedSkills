# Commercial-Page UX System — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1 (approved, `DEC-013`) · `PAGE_TYPE_CRO_RULES.md` §2 · the approved copy for each of the six routes · `16_COMMERCIAL_ENERGY_SYSTEM.md` §4E · `17_ARGUMENT_APPARATUS_HIERARCHY.md`.

**Scope:** `/seo` · `/ai-seo` · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization`. `/services` is the hub above them and is treated in `03_PAGE_TYPE_ARCHITECTURE.md` §2; `/pricing` is a commercial page with a different job and is treated separately. The conditional vertical page inherits this system.

---

## 1. The question this document answers

> **Six pages, one firm, six different buyers. What must be identical, and what must differ?**

**The wrong answer is "make them all the same".** Six structurally identical pages are a template, and a template tells a buyer that the firm has one thing it says regardless of what was asked. **The equally wrong answer is "make them all different".** Six bespoke pages produce six inconsistent evidence behaviours, six conversion patterns to maintain, and a site that does not read as one system.

**The answer adopted here:** the **spine is invariant**; the **middle varies by buyer intent**; **nothing varies for visual novelty.**

---

## 2. What is invariant across all six

These are not preferences. Each traces to an approved rule, and violating any one of them is a strategy violation, not a design disagreement.

| # | Invariant | Source |
|---|---|---|
| **I1** | **The first screen confirms the searched capability in the searcher's own word, then bridges to the commercial outcome within two sentences** | `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.3.1 |
| **I2** | **Zero apparatus above the fold.** No provenance, no date, no sample, no status mark, no limit, no figure, no proof module | B27, `17` §3 |
| **I3** | **The boundary (move 5) sits above the midpoint** — a boundary at the bottom of a page is a disclaimer; near the top it is a position | §1.3.2 |
| **I4** | **Capability precedes accountability precedes limit.** No limit appears before the thing it limits | B28 |
| **I5** | **Limits and the accountability boundary are ADJACENT-SECONDARY and never collapsible**, at every screen size | B29 |
| **I6** | **Proof is in context and is never a step.** `/how-it-works` and the relevant research entry are linked prominently and are never interposed between the page and the conversion | `DEC-010` restriction 5c |
| **I7** | **One primary conversion outcome, two surfaces offered, direct contact present as a peer in the action region — one instance per page** *(corrected 2026-09-02, H4: available, not omnipresent)*. No second competing goal | `CTA_SYSTEM.md` §2.1, `21` §H4 |
| **I8** | **CTA regions carry no apparatus** — no provenance, no scope note, no limit in or beside them | B30 |
| **I9** | **Every page links up to `/services` and across to its matching problem page** | §1.3.4 |
| **I10** | **Where the run appears, it is one recognisable object with this page's segment emphasised**, the remainder recessive, never redrawn per page. **It does not appear on every commercial page** — see the binding taxonomy *(revised 2026-09-02)* | `19` F1, `22_F1_USAGE_TAXONOMY.md` |
| **I11** | **Breadcrumb present**, expressing the `/services` hierarchy the flat URL does not, generated from the same source as the emitted `BreadcrumbList` | IA §13 |
| **I12** | **Sticky CTA permitted, quiet, fixed, identical**, never obscuring content or a form control | `CTA_SYSTEM.md` §3 |
| **I13** | **The proportion rule holds page by page** | B32 |

**Invariance is what makes the variation legible.** A reader who has seen two of these pages knows where the boundary will be, knows proof is available and optional, and knows how to convert. That predictability is the budget that pays for the middle being different.

---

## 3. What varies, and the only permitted driver

**Variation is driven by buyer intent — specifically by four measured-or-reasoned properties of the buyer arriving on each page.**

| Property | What it changes |
|---|---|
| **Sophistication** — how much the buyer already knows | How much explanation precedes the boundary |
| **Scepticism** — how much the buyer distrusts the category | How early evidence appears |
| **Misinformation** — how much the buyer believes that is wrong | Whether objection handling is a section or a sentence |
| **Dispute risk** — what argument this category usually produces | Which boundary is elevated |

**Not permitted as drivers:** visual novelty · a desire for the pages to look different · section-count parity · a designer's judgement that a page "needs something" · commercial preference between capabilities.

---

## 4. The six pages, with reasoning

The approved message pattern already assigns mandatory and optional moves per page. **This section adds the UX consequence of each assignment** and answers the specific questions the session brief raised.

### 4.1 `/seo` — high sophistication, long horizon

**Buyer:** sophisticated, provider-seeking, targeting `b2b seo` / `enterprise seo`. Knows the discipline. Has probably been sold it badly before.

**Moves:** 1, 2, 3, 4, 5, 6, 8, 9. **Move 7 is compressed** — the own-site technical diagnosis is the evidence.

**UX consequence:**
- **The educational sequence is short.** This buyer does not need SEO explained; explaining it insults them and delays the boundary. Move 4 (what the work involves) is **scope, plainly, month to month** — not a primer.
- **Move 5 carries the 12-month-plus horizon and it is elevated.** It is the single most important thing on this page for qualification, and it is the thing every competitor softens. It sits above the midpoint, ADJACENT-SECONDARY, always open, and it is stated as a **horizon, not a schedule** — no month is promised.
- **Evidence is compressed, not early.** This buyer's scepticism is about outcomes, not about whether measurement is real. Provenance stays EXPANDABLE.

**Answer to the brief's question — does `/seo` need a different educational sequence from `/google-ads`?** **Yes, and in the opposite direction from the obvious one.** `/seo` needs *less* explanation and an *earlier, heavier* horizon statement, because its buyer's risk is time. `/google-ads` needs *more* explanation of one specific thing — the fee/spend/measurement boundary — because its buyer's risk is money and the dispute is definitional.

---

### 4.2 `/ai-seo` — high scepticism, high misinformation, the highest-risk page on the site

**Buyer:** provider-seeking on `ai seo agency`, and **often misinformed** — the category vocabulary is fragmenting and the market conflates training crawlers with retrieval crawlers.

**Moves:** **all nine.** Moves 5 and 8 *are* the page.

**UX consequence:**
- **Evidence appears earlier here than on any other commercial page**, and this is the one deliberate exception to the general rule that evidence sits mid-page. Move 7 is a named section, not a compression. The reason is specific: this buyer has been sold a score by somebody, and the page's core argument — that four layers must be kept separate and that a single score is the wrong instrument — **cannot be made in prose**. F3 is the page's central figure and it is load-bearing for the argument, not for credibility.
- **It still does not appear above the fold.** I2 holds without exception. "Earlier" means *the first substantive section after the bridge and the problem*, not *the hero*.
- **Move 5 is stated early and at full strength**, and it is the strongest boundary on the site: what can and cannot be influenced, what cannot be measured, and which systems could not be tested at all.
- **Move 8 is a section, not a sentence.** The objections here are factual corrections, and a corrected buyer is a converted one.

**Answer to the brief's question — does `/ai-seo` need an evidence section earlier because scepticism is higher?** **Yes, but the mechanism is comprehension, not reassurance.** The figure is early because the argument needs it, and the credibility effect is a by-product. An evidence section placed early *for reassurance* would be apparatus-first reading, which `17` prohibits.

**Two binding honesty constraints on this page's figure:** two systems are rendered as **not testable, visually distinct from a measured zero, distinguishable without colour** (B1) — and the four layers are **never aggregated**, because that is the rejected score arrived at by the back door (B7).

---

### 4.3 `/google-ads` — the dispute page

**Buyer:** transactional, paid-search provider intent. The category's most common argument is about what the money buys.

**Moves:** 1, 2, 4, 5, 6, 9. Move 3 compressed; move 7 minimal.

**UX consequence:**
- **Move 5 is elevated to near-hero adjacency** — immediately after the bridge — because the fee-versus-spend separation is the thing this buyer most needs settled and the thing most likely to produce a dispute later. It is the earliest boundary placement on any of the six pages.
- **F9, the fee/spend/measurement boundary, is the page's figure** and it is inherently practical. The page should read like a straightforward, competent supplier settling the question that causes most disputes in the category.
- **Move 2 must be unambiguous that this is not a performance marketing agency** — and the approved copy achieves that **without printing the rejected category in order to deny it**, which is a live risk given that this site's assertions are verifiably redistributed by AI systems. The UX consequence: no heading, label, breadcrumb, nav item or figure caption may reintroduce the rejected term.

**Answer to the brief's question — which pages need pricing context?** **`/google-ads` needs *spend* context, which is not pricing.** The fee/spend separation is a scope boundary. The only pages that need a link to `/pricing` in their body are `/services` (the hub) and the homepage fit block; the rest reach it through navigation. **Adding a pricing link to every commercial page would create a second competing goal** on pages whose job is one conversion outcome.

---

### 4.4 `/social-media-ads` — the modest page, and it should read that way

**Buyer:** paid-social provider intent. **The weakest independent search evidence of the three paid pages**, retained rather than merged because backlink data is UNKNOWN for every URL on this site.

**Moves:** 1, 2, 4, 5, 9. Moves 3, 7 and 8 minimal.

**UX consequence:**
- **This is the shortest of the six pages, and its brevity is the design.** A page padded to match its siblings' length would be claiming an emphasis the strategy does not give it.
- **Move 5 carries the honest channel answer** — that this channel is often the wrong one for a considered purchase. That statement is the page's most valuable content and must not be softened by placement.
- **No figure of any kind.** *(CORRECTED 2026-09-02 — orchestrator ruling C.)* This sentence previously read that "the run with the relevant segment emphasised is sufficient". **That is a pre-taxonomy statement and it is stale.** The later binding taxonomy in `22_F1_USAGE_TAXONOMY.md` §3 classifies `/social-media-ads` as **D — NONE**: no page-specific figure **and no run**. `22` controls. Inventing any figure here to achieve parity would be visual novelty as a driver, which §3 prohibits — and adding the run to a page with no figure of its own would be applying F1 for consistency, which `22` §2 prohibits.

**This page is the clearest test of whether the system is honest.** If it ends up the same length and depth as `/ai-seo`, the system has been overridden by symmetry.

---

### 4.5 `/lead-generation` — the definition page

**Buyer:** transactional/commercial-investigation on `lead generation agency` — the live Indian phrasing.

**Moves:** 1, 2, 3, 5, 6, 8, 9. Move 4 compressed. **Move 6 is the differentiator.**

**UX consequence:**
- **The qualified-enquiry definition appears earlier than the boundary**, which inverts the usual mid-page order — and it is legitimate because **on this page the definition *is* the capability**, not a limit on it. I4 is satisfied: the definition is what the buyer is getting, and the boundary that follows limits it.
- **It is framed as a commercial promise-boundary — what you are buying and what we will answer for — not as a taxonomy.** F5 is a diagram, not a paragraph, and the approved copy says so.
- **It appears in full on no other page.** Other pages link here rather than restating it. This is the single strongest anti-duplication rule in the commercial set.
- **Prohibited on this page specifically:** any lead score, grade, quality rating, or budget-derived qualification shown anywhere (B26).

**Answer to the brief's question — does `/lead-generation` need the qualified-enquiry definition earlier?** **Yes — and "earlier" here means before the boundary, not above the fold.** I2 still holds.

---

### 4.6 `/conversion-optimization` — the page that opens on the loss

**Buyer:** residual category intent only. The **real acquisition route for this problem is `/problems/traffic-but-no-enquiries`**, and this page exists to hold the category term.

**Moves:** 1, 2, 3, 5, 6, 7, 9. Move 4 compressed. **Move 5 carries the experimentation boundary.**

**UX consequence:**
- **The page opens on the loss, not on the discipline.** Diagnosis is the second move, not the first impression.
- **The diagnostic visual appears early — earlier than on any other commercial page except `/ai-seo`'s F3.** The four loss zones (F2, shallow variant) appear as move 3, because this buyer's actual question is *where is it going wrong*, and the four-zone structure is the answer. It is deliberately shallower than the problem page's version and must be **visibly the same object at two depths** — that is a design instruction from the approved copy, not a content note.
- **Move 5 carries the experimentation boundary**: below a real traffic threshold this is conversion research, diagnosis and design — **not statistically valid A/B testing**. This is a scope boundary that protects the firm and qualifies the buyer simultaneously.
- **Move 2 routes down to the problem page**, and that route must be genuinely prominent, because it is the honest destination for most of this page's traffic.
- **"CRO" appears in the title and meta description only**, confined to what the residual query requires, and **nowhere in the body, in any heading, breadcrumb, nav label, figure caption or CTA**.

**Answer to the brief's question — does `/conversion-optimization` need the diagnostic visual earlier?** **Yes.** It is the page's second move rather than a mid-page proof element, because the buyer's question is diagnostic from the first sentence.

---

## 5. The variation table, in one view

> **EXTENDED 2026-09-02.** A full six-question stress test of these pages — buyer's first question, unique second move, what appears earlier, what is omitted, figure justification, and what would make each a clone — is in **`23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md`**, together with two architectural fixes it produced and the sequence comparison proving no two pages share a UX order. **The figure column below is superseded by `22_F1_USAGE_TAXONOMY.md`.**

| Page | Educational depth | Evidence position | Boundary position | Objection handling | Page-specific figure | Relative length |
|---|---|---|---|---|---|---|
| `/seo` | **Low** — sophisticated buyer | Compressed, mid-page | Above midpoint, **horizon elevated** | Section | F11 (Tier 3 — a table is sufficient) | Medium |
| `/ai-seo` | **High** — misinformed buyer | **Early**, as a named section | **Early**, at full strength | **Section — it is the page** | **F3, central** | **Longest** |
| `/google-ads` | **Focused** — one thing, deeply | Minimal | **Earliest of the six** | Sentence | F9 | Medium |
| `/social-media-ads` | **Low** | Minimal | Above midpoint, carries the honest channel answer | Minimal | **None** | **Shortest** |
| `/lead-generation` | Medium | Mid-page | After the definition | Section | **F5, central** | Medium |
| `/conversion-optimization` | Medium | Beside the claim | Above midpoint, experimentation boundary | Sentence | **F2 shallow, early** | Medium |

---

## 6. How the pages avoid becoming clones — five structural separations

1. **Different first sentences by necessity.** Each confirms a different searched capability in a different searcher's word. This is enforced by I1 and cannot be genericised.
2. **Different boundary content and different boundary positions.** Horizon · influence and testability · fee versus spend · channel fit · promise scope · experimentation validity. No two are the same boundary in the same place.
3. **Different figure emphasis on one shared object.** The run is one figure with six emphases, which is what makes the site read as one system while each page reads as its own answer.
4. **Different lengths, deliberately.** `/social-media-ads` is the shortest; `/ai-seo` is the longest. **Length parity is a symptom of template thinking.**
5. **Different onward routes.** Each links to a different problem-page relationship, a different research entry, and a different sibling.

---

## 7. Two open design decisions — NOW RESOLVED

> **RESOLVED 2026-09-02 (orchestrator, `21_ORCHESTRATOR_DECISIONS_H1_H5.md`).**
> **D1 / H1 — APPROVED: route to `/contact`. No inline form.** The orchestrator's ruling names the homepage explicitly; the stated reason — *"the contact page is the dedicated enquiry surface"* — and H2's routing of the header CTA to the same surface are read as settling commercial pages in the same direction. **That extension is Claude's reading and is flagged for confirmation** in `21` §H1.
> **D2 / H2 — APPROVED: the header CTA routes to the enquiry/contact surface.** No form or booking embedded in navigation; no aggressive persistent control.
> The reasoning below is preserved as the decision trail, including the honest counter-argument.

Both are recorded in the approved CRO documents as design-phase decisions (`CTA_SYSTEM.md` §7, `FORM_AND_BOOKING_SPEC.md` §9.5). **This session proposes an answer to each and does not treat either as settled.**

### D1 — Inline form on commercial pages, or route to `/contact` with context preserved?

**Recommendation, now APPROVED: route to `/contact`, carrying page context, at launch.**

**Reasoning.**
- **There is no backend.** The endpoint, validation, persistence, spam layer, idempotency, accessibility behaviour and failure states must all be built from zero. **Building one form surface once, correctly, is materially safer than building six.**
- **`/contact` carries the entity data** that local and AI-answer discovery depend on, and it needs the traffic anyway.
- **Six inline forms create six CTA regions that must each stay apparatus-free** (B30) on pages dense with boundaries and limits. That is six chances to violate a hard rule.
- **The approved spec already solves the only real objection**: service/problem context is derived from the page the visitor came from and never asked, so the transition costs the visitor nothing.

**The honest counter-argument, stated rather than buried.** An inline form removes one navigation step, and in the general case that is a real conversion advantage. **There is no measurement to settle it here, there will not be for a long time, and `BUSINESS_STRATEGY.md` §7 forbids claiming statistically valid experimentation below a real traffic threshold — including on MappedSkills' own site.** This is therefore a judgement, not a test result, and it should be revisited after the first baseline period rather than defended.

### D2 — Which surface does the header CTA lead to?

**Recommendation, now APPROVED: the form surface (`/contact`).**

**Reasoning.** The header CTA is the one control that must work for every visitor state on every page type, including editorial and research readers who have not declared a need. **The form is the lower-commitment of the two surfaces**, and the approved routing already makes the form primary on the homepage, commercial pages, the problem page and `/about`. **Booking is emphasised exactly where the approved rules say it should be — `/pricing`, the conditional vertical page, and `/schedule-call` — through in-page CTAs, not through the header.**

**The label must remain changeable when the entry-offer decision is made, without altering the navigation structure.**

---

## 8. What must not appear on any of the six

| Prohibited | Rule |
|---|---|
| Apparatus above the fold | B27 |
| A limit before the capability it limits | B28 |
| A collapsed or collapsible limits section | B29 |
| Apparatus inside or beside a CTA region | B30 |
| A proof step between the page and the conversion | `DEC-010` 5c |
| A capability card grid | B14 |
| An icon per capability | A13 |
| A branded name for the method, the run, or any stage | B18 |
| Every section ending in a button | `CTA_SYSTEM.md` §3 — CTAs sit where the relevant point is made, not at a fixed interval |
| A number without its sample, date, location and method | `VOICE_AND_TONE.md` §8 |
| "300%+ ROI", "₹100Cr+", "₹10Cr+" in any form | `DEC-007`, B19 |
| A guarantee of rankings, citations, enquiries, revenue or ROI | `BUSINESS_STRATEGY.md` §5 |
| "CRO" in body copy · "leads" as MappedSkills' own outcome word · GEO/AEO/LLMO as positioning | `DEC-013` |
| A rejected category term in a heading, nav label, breadcrumb or figure caption | `DEC-005` |
| A manufacturing reference or link | B21 — the vertical page is conditional |
| A case-study CTA or any "results" reference | None exists; `/work` is `noindex` |
