# Offer Architecture — APPROVED AND FROZEN (Commercial Architecture Only)

**Status:** APPROVED DECISION for the **commercial architecture**. Frozen in Session 06 (2026-08-31).
**Authority:** `DEC-005` in `docs/00-project/DECISION_LOG.md`.
**Supersedes:** the three parallel offer ladders (Search Visibility / CRO / Marketing Automation) previously in this file.
**Governed by:** `BUSINESS_STRATEGY.md` and `SERVICE_ARCHITECTURE.md`.

**What is approved here:** the *shape* of the commercial ladder — what each stage must do, what it must deliver, and what it must never promise.

**What is NOT approved here:** offer **names**, **packaging**, **prices**, **terms**, **inclusions lists** and **guarantees**. Those are later, separately approved work.

### Status of the Session 05 working labels
**WORKING HYPOTHESIS — not approved.** The labels **"Enquiry Diagnostic"** and **"Enquiry System"** appear in `FINAL_STRATEGY_SYNTHESIS.md` as working shorthand. They are **naming hypotheses only**. This session deliberately does **not** approve them. Naming may be revisited once buyer-language and messaging work has run, and the architecture below must hold regardless of what the offers are eventually called.

---

## 1. The ladder

| Stage | Commercial job | Approved? |
|---|---|---|
| **Entry** | Diagnose whether and where buyer demand is being lost, at low friction | Architecture approved; **entry model not yet chosen** (§2) |
| **Core** | Improve demand capture, conversion and measurement as one recurring or structured engagement | Architecture approved |
| **Expansion** | Extend once the core is working and the client feels the next pain | Architecture approved |
| **Retention** | Give the client a reason to continue that a replacement supplier cannot bring with it | Architecture approved |

The ladder exists so that the first commitment is small, the second is obvious, and the third is asked for by the client rather than argued by MappedSkills.

---

## 2. Entry

**Commercial job:** a **low-friction method for diagnosing whether and where buyer demand is being lost** — and producing something genuinely valuable to the prospect even if they never buy again.

### What the entry offer must do
1. **Be understandable without marketing vocabulary.** A business owner must grasp it in one sentence.
2. **Answer one commercial question:** *why isn't this business getting the enquiries its market is already generating, and what is the shortest path to fixing it?*
3. **Establish a baseline that did not previously exist.** The baseline is the deliverable, not a by-product.
4. **Be repeatable** — one protocol, not a bespoke exercise each time.
5. **End in a prioritised, costed plan**, which is the natural scope of the core engagement.
6. **Be reachable through search** — through vertical, buyer-symptom and AI-question query families.
7. **Qualify the prospect** against `ICP.md` §2 as a side effect of running.

### Indicative diagnostic components
Demand and visibility assessment · enquiry-path teardown · instrumentation and measurement audit · listings, reviews and entity check · AI-visibility baseline (per-system, run counts published) · prioritised and costed fix plan.

### The entry model — DELIBERATELY NOT YET DECIDED
**RESEARCH REQUIRED / OWNER DECISION.** Both models are live. The choice is not forced here, and no later session may treat either as settled without an owner decision recorded in `DECISION_LOG.md`.

| Model | Case for | Case against |
|---|---|---|
| **Free / lead-generation diagnostic** | Lowest friction; the standard market motion; generates volume at the top of the funnel; produces prospects to learn from while proof is being built | **VERIFIED FACT (Session 03):** `seo audit` demand is dominated by "free" and attracts tool-seekers, not buyers. Every competitor examined offers a free audit, which prices the analysis at zero. **OWNER-SUPPLIED FACT:** the current free-consultation model has not been generating enquiries |
| **Paid strategic diagnostic** | Prices the analysis honestly; qualifies the buyer; produces revenue during the 12-month organic ramp; public anchor exists — a Pune competitor prices discovery at ₹5K–₹35K | Higher friction with **zero proof inventory today**; asking a stranger to pay before any case study exists is a hard sale; may suppress volume at exactly the moment MappedSkills needs client data |

**A hybrid is permitted and should be evaluated** — for example a free, narrow, automated or self-serve check that leads to a paid, deep, human diagnostic. **No model is approved. The decision must be made deliberately, and it interacts with the proof position: the paid model becomes materially easier once §5 item 1 or 2 exists.**

### Constraints on the entry offer
- No guarantees of any kind.
- No price is set in this document.
- It must not be sold as an "AI Visibility Score", and must not produce a blended cross-system score.
- Its measurement sections must state run counts, dates, location and method, and must state what cannot be attributed.

---

## 3. Core engagement

**Commercial job:** the recurring or structured engagement that improves **demand capture · conversion · measurement** — as one system, against a published baseline.

**Why the client takes it:** it is the fix plan, executed by the people who wrote it, measured against a number that already exists.

### What the core engagement must contain
- **Demand** — organic search, and/or paid media where it is the right demand source for that client;
- **Conversion** — the enquiry path built and improved, not merely recommended;
- **Measurement** — instrumentation, enquiry-source capture, and reporting against the baseline;
- **A stated accountability boundary** — MappedSkills owns the chain to qualified enquiry, reports through to revenue on the client's own data, and states plainly what cannot be attributed.

### Structural requirements
- **Recurring or structured**, with a defined initial term. The work compounds and cannot be judged in weeks.
- **Implementation, not advice.** The strategy explicitly rejects depending on the sale of vague strategy documents.
- **Instrumentation first.** Nothing outcome-based may be sold or reported before analytics and enquiry-source capture work.
- **Scope honesty on experimentation.** Below a real traffic and conversion threshold this is conversion research, diagnosis and design — **not** statistically valid A/B testing.

### Constraints
No guaranteed enquiry counts. No guaranteed rankings, AI citations or revenue. No promise of statistical significance the client's traffic cannot support.

---

## 4. Expansion

**Commercial job:** extend the relationship once the core is working — **sold when the client feels the pain, not when MappedSkills argues it.**

Potential additions:
- **paid acquisition**, where the client entered through organic (or additional paid channels where they entered through paid);
- **additional search markets** or additional products/segments;
- **AI-search and source-authority work** as a sustained programme;
- **follow-up automation** — enquiry routing, lead notifications, response-time workflows, email/WhatsApp follow-up, basic qualification, simple handoff automation;
- **vertical / export acquisition** — international-facing demand capture for Indian clients.

**The sequencing insight that makes expansion natural:** enquiry volume itself creates the follow-up problem that sells the automation, and the multi-channel question that sells the additional demand sources. MappedSkills does not need to argue for expansion; the working core creates the demand for it.

**Boundary carried from `SERVICE_ARCHITECTURE.md` §8:** enquiry-source capture is measurement and belongs to the core. Nurture, sequences and lifecycle work are automation and belong here. **CRM implementation, platform migrations, RevOps, lifecycle architecture and sales-ops consulting are excluded entirely.**

---

## 5. Retention

**Commercial job:** make continuing the rational choice, and make replacement expensive in a way that is honest rather than contractual.

**Why clients continue:**
1. **The enquiry trend.** A working, visible trend against a published baseline is the reason to continue, and the reason a pause is felt.
2. **The baseline history.** Accumulated, frozen-method measurement is the one thing a replacement supplier cannot bring with it. **This is the strongest honest retention asset available.**
3. **The compounding content and authority asset.** Organic and entity authority accrue slowly and are lost slowly — clients who stop see the cost late, which is a reason to explain the horizon honestly up front rather than a reason to rely on inertia.
4. **The measurement layer itself.** Reporting the client trusts, including what cannot be attributed. **This is why the instrumentation precondition is non-negotiable — retention rests on it.**
5. **Accumulated domain and account knowledge.** In a vertical, every engagement makes the next month faster and more specific.

**Not retention mechanisms:** lock-in clauses used in place of results, opaque reporting, or withholding access to the client's own data and instrumentation. **The client's measurement layer belongs to the client.**

---

## 6. Productisation requirements

Before any offer is taken to market, it must define: target customer · problem solved · scope · exclusions · prerequisites · deliverables · timeline · measurement method · reporting cadence · handoff · recurring component · **proof required to sell it honestly**.

**The last item is the binding one today.** MappedSkills currently has a significant proof deficit, so every offer must be checked against what can be honestly claimed at the time it is sold.

---

## 7. Commercial constraints — non-negotiable

1. **No prices are set in this document**, and none may be inferred from it.
2. **No guarantees are invented** — not rankings, not AI citations, not enquiry counts, not revenue, not ROI.
3. **Nothing outcome-based may be sold before analytics and enquiry-source capture work** — including on MappedSkills' own site.
4. **No offer may rely on the unsupported claims** "300%+ ROI", "₹100Cr+" or "₹10Cr+" as a reason to believe, until provenance and evidence are established.
5. **No A/B-testing or experimentation promise** where traffic cannot support statistical significance.
6. **No AI Visibility Score, average AI rank, or blended cross-system figure** as a product or a deliverable.
7. **No borrowed vendor benchmark quoted as MappedSkills' own** — specifically the Ahrefs 23× and Buffer 185% AI-visitor conversion multipliers, which are single-company figures with self-selecting audiences.
8. **Every number carries its sample size, date, location and method.**

---

## 8. Recorded pricing anchors — context, not recommendations

**VERIFIED FACT (Session 05, live check):** MappedSkills' production `/pricing` page currently displays **STARTER ₹50K–₹75K/month**, **GROWTH ₹1L–₹2L/month**, and Custom Pricing, with "Starting From ₹50K" in the hero and an FAQ recommending a management fee of at least ₹50K/month excluding ad spend. The ₹2,500/₹5,000 figures that appear in `lib/constants.ts` are **dead code, referenced by no file, and displayed nowhere.**

**Competitor anchors observed in research (secondary, single-date, not benchmarks):** a Pune competitor prices discovery at ₹5K–₹35K with a ₹1.5L+/month retainer; another Indian agency publishes ₹25,000–₹2,00,000+/month; a third sells packaged SEO from $199/month.

**Consequence, and it is the important one:** MappedSkills is **already positioned in the premium Indian band. The commercial problem is not that the price must rise — it is that the price is currently unbacked by any proof.** Pricing decisions are deferred; the proof programme is not.

---

## 9. What is deliberately NOT decided

Final offer names — including whether "Enquiry Diagnostic" and "Enquiry System" survive · packaging and tiering · prices, terms and contract length · the free vs paid vs hybrid entry model (§2) · sales process and collateral · delivery SLAs · what is credited against what.
