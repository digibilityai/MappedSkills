# Correction-Pass Governance Findings — APPROVED

**Session:** 12 · Orchestrator correction / stress-test pass · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01. Gate 9A (Creative Direction) PASSED — see `DEC-015` in `DECISION_LOG.md`.** The five governance items below are approved as follows: §1's homepage copy concern was acted on (correction applied, see the update at the end of §1); §2's anti-pattern amendments are approved and binding on Gate 9B; §3's component-kit classification is approved future implementation guidance, no code changed; §4's directory recommendation is approved as future standalone housekeeping, not executed now; §5's residual risk register is carried forward unchanged as a live risk record for Gate 9B.

Five governance items arising from the stress test: a copy concern (report only), an anti-pattern review, a component-kit classification, a directory recommendation, and the residual risk register.

---

## 1. Homepage copy concern — REPORT ONLY

> **This session is NOT authorised to modify approved Session 11 copy, and did not. `docs/09-content-pages/` was read only. Nothing in it was changed.**

### The sentence

> *"There are buyers for what you sell, and most of them never reach you."*
> — approved homepage hero supporting copy (`/`), Gate 9, `DEC-014`

### Verdict: **THE CONCERN IS VALID.**

Three grounds, each against an approved rule.

**1. It is second-person and unhedged, which `VOICE_AND_TONE.md` §12 prohibits by name.**
That rule reads: *"Never 'you' in an accusatory shape. 'Your site is losing enquiries' asserts something unverified about the reader; 'this is where enquiries are usually lost, and here is how to check yours' does not."*
"Most of them never reach you" is structurally identical to the prohibited example, **and adds a quantifier the example does not have.** It is a stronger instance of the exact shape the rule bans.

**2. "Most" is a quantity claim carrying no provenance.**
`VOICE_AND_TONE.md` §8.1: *"Every number carries sample size, date, location and method… No exceptions, including in marketing copy."* §8.4: *"Where a figure does not exist, write UNKNOWN — not a range, not an estimate, not 'up to'."* `MESSAGING_ARCHITECTURE.md` §5.6 repeats it. **"Most" is an estimate expressed in words.** If "62%" would require a sample and a date, so does "most" — and no such measurement exists for any individual reader's market.

**3. The approved defence describes a sentence that was not written.**
The Evidence/Claim Note in `copy/homepage.md` classifies the line as *"E (inference), written as a situation, not a diagnosis of this reader… Stated as what this usually looks like."* **The word "usually" — or any equivalent hedge — is not in the sentence.** Block 2 of the same page handles the identical idea correctly, under the heading *"What this usually looks like from the inside"*, where the hedge does the governing work. The hero sentence has the classification of a hedged statement and the grammar of an unhedged one.

### The counter-argument, stated fairly
Read as a claim about the **market** rather than the reader's performance — *most buyers in your category do not reach any single supplier* — the sentence is close to analytically true, since no business receives most of its addressable market. Under that reading it is a framing device, not an empirical claim.

**Why it does not fully dispose of the concern:** a founder will not parse it analytically. They will read it as a statement about their own leakage. And the fix is small enough that relying on a charitable reading is not worth it.

### Scope — wider than one sentence
| Location | Form | Status |
|---|---|---|
| `copy/homepage.md` hero supporting copy *(twice — Option A and the H1 block)* | "most of them never reach you" | **Gate 9 approved** |
| `copy/services.md` opening | "most never reach you" | **Gate 9 approved** |
| `PAGE_COPY_AUDIT.md` ×2 | Recorded, and the duplication across `/` and `/services` **deliberately retained** | Approved record |
| `HOMEPAGE_MESSAGE_ARCHITECTURE.md` | Carried as an "illustrative headline direction" and in the Recommended Direction's supporting-line description | **Gate 8 approved** → **corrected 2026-09-01, `DEC-015`** |

**A correction touches two routes and two approved upstream documents.** It was not a single-line edit, which is why it required an authorised copy pass rather than an opportunistic fix. **Actioned at Gate 9A closure — see the update below.**

### Recommended later action
**A narrow correction, in a future authorised copy session — not a rewrite, and not a blocker on Gate 9A.**

The correction class: **move the clause into the general case, or remove the quantifier.** Block 2 of the same page already demonstrates the mechanism approved for this exact idea. **This session has deliberately not drafted the replacement sentence** — writing approved copy is Session 11's authority, not this session's.

**Priority: medium.** It is a hedging defect, not a claims-governance breach at the strategic level — the claim is already classified and ladder-levelled. It should be handled before the homepage is published, alongside the outstanding owner inputs that already block that route.

### The creative-direction consequence — which *is* this session's business

> **New binding rule (added to `08_EVIDENCE_DESIGN_LANGUAGE.md`): the design must never give visual amplification to a claim classified at ladder level D or E.**

Inference-class statements may be set plainly in the argument register. They must **never** be enlarged into a typographic graphic, pulled out as a display statement, set as a figure caption, animated, or used as a section opener at display scale. Visual amplification converts a hedged inference into an assertion, and this sentence is the clearest live example of why the rule is needed.

**Confirmation: no file under `docs/09-content-pages/` was modified in this pass.** Verified by `git status`.

**Update — 2026-09-01, Gate 9A closure (`DEC-015`).** The orchestrator authorised the narrow correction recommended above, as a one-time, explicitly scoped exception to this pass's own "report only" boundary. Applied to `copy/homepage.md` (both occurrences) and `copy/services.md`: *"most of them never reach you"* / *"most never reach you"* → *"There is buyer demand for what you sell, and some of it never reaches you."* The H1 and hero territory were not touched. `PAGE_COPY_AUDIT.md` carries a matching governance annotation. **`HOMEPAGE_MESSAGE_ARCHITECTURE.md` does carry the same unsupported quantity claim** — in the illustrative headline direction under Territory 2, and in the Recommended Direction's supporting-line description — and both were corrected on the same narrow basis, with a governance note on each. No other content in that document, or any other messaging document, was touched.

---

## 2. Anti-pattern review

**Reviewed for a different risk than the list was written for: does any prohibition unnecessarily constrain good design?**

**Two genuine defects found — both are internal contradictions, not preferences.** Three clarifications added. **No rule was loosened for flexibility.**

### Amendment 1 — A19 (carousels) contradicted the responsive direction
**Defect:** A19 banned carousels HARD on the grounds that they hide content from readers, crawlers and retrieval systems. But `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §3.2 **requires** wide tables and comparisons to scroll horizontally *within their own container* on narrow screens. As written, A19 catches a pattern the direction mandates.

**Amendment:** A19 now distinguishes a **carousel** (paged or auto-advancing; content not simultaneously present in the DOM) — **HARD ban, unchanged** — from a **scroll container** (all content present, keyboard-accessible, no paging) — **permitted**, as `13` §3.2 requires. The strategic harm was always *hiding content*; the amendment names the harm rather than the mechanism.

### Amendment 2 — A23 (section bands) contradicted the new emphasis system
**Defect:** A23 banned alternating full-width coloured section bands HARD. The harm — turning a continuous argument into a stack of modules — is real. But the ban as written forbids **any** ground differentiation, and this pass's commercial-energy work depends on emphasis and pace (`16` §4B–C). The accountability-boundary set-piece and the CTA region both need to read as distinct moments. A rule that forbids all differentiation forbids emphasis, and a site without emphasis is the flatness that produced the 3/5 India-first score.

**Amendment:** A23 now bans **alternating or rhythmic banding** — HARD, unchanged, since that is what produces the module-stack read — while permitting **at most two deliberate ground changes per page marking a genuine set-piece.** Never alternating, never per-section, never decorative.

**This is the one amendment that loosens a rule, and it does so because the original rule conflicted with a finding of this pass, not to create latitude.**

### Clarifications (no change of substance)
- **A17** *(text disguised as visual design)* — sharpened so it bans a paragraph boxed and iconed to imitate a feature, and does **not** ban a legitimately emphasised statement. Emphasis is required by `16` §4C.
- **A20** *(accordions)* — clarified that the **expandable evidence apparatus** is permitted disclosure and is not caught by this rule, while **limits sections are never collapsible** (new B29).
- **B18** *(no branded names)* — clarified that **internal working names** — "The Record", "the run", "the annotation tie" — are permitted and are never surfaced to a visitor. The rule binds visitor-facing labels, including figure labels.

### Six anti-patterns added by this pass
**B27** apparatus above the fold on a commercial page · **B28** a limit stated before the capability it limits · **B29** a collapsible limits section · **B30** apparatus inside a CTA region · **B31** archival or paper skeuomorphism *(the failure mode the territory name invites)* · **B32** **honesty by volume** — gaps and limits accumulating more visual weight than what the firm does, which reads as incapacity rather than candour.

### Rules examined and deliberately left unchanged
**A2** bento grids · **A5** dark-for-credibility · **A11** credibility walls · **A12** oversized empty hero · **B1** not-testable rendered as zero · **B2** funnels · **B16** sticky-CTA prohibitions *(inherited from approved CRO rules, not taste)*. Each was tested for taste-masquerading-as-strategy and each has a stated strategic harm that survives.

---

## 3. Existing component kit — classification

> **Recommendation for a later implementation phase. No code was modified, deleted or renamed in this pass. All six files were read only.**

**A** = retire from the future design language · **B** = may be repurposed with real evidence · **C** = neutral primitive despite its current name.

**VERIFIED FACT (repository inspection, 2026-09-01).** The six components were read at implementation level — not by name — in `components/sections/` and `components/cards/`.

| Component | Class | Finding |
|---|---|---|
| **HeroDashboard** | **A — RETIRE** | **Hard-codes the prohibited claims**: `'300%+'` Average ROI, `'₹100Cr+'` Revenue Influenced, `'1,247'` Total Leads, `'42'` Active Campaigns, with `'+32% this month'`. It is simultaneously the fabricated-dashboard pattern *(A3)*, the metric-counter pattern *(A9)*, and a live `DEC-007` violation. Nothing rehabilitates it |
| **SocialProofStrip** | **A — RETIRE** | Hard-codes `'300%+'`, `'₹100Cr+'`, `'50+ Clients Served'`, `'9+ Years Experience'`. It is the credibility-wall slot *(A11)* with prohibited claims baked in, for a firm with zero published clients |
| **BeforeAfterMetric** | **A — RETIRE as a metric pair** | Signature is `{label, before, after, improvement}` — a numeric pair plus an improvement claim, with an arrow between them. This is the prohibited before/after metric. **The *concept* survives in a different form:** F7, the intervention record, is a **state pair** — conditions, dated, on the firm's own property — not a metric pair. Retire the component; keep the idea, renamed and re-specified |
| **StatCard** | **C — NEUTRAL PRIMITIVE despite its name** | Signature is `{stat, label, description?}` with **no hard-coded content**. Structurally it is "a value with adjacent metadata" — which is close to what the evidence apparatus needs. **Its default presentation is the banned pattern**, though: centred, `text-6xl` bold accent numeral, uppercase label. **Neutral primitive, banned default.** Any reuse requires a **mandatory** provenance slot *(it must be impossible to render a value without one)*, tabular numerals, no accent-colour numeral, no animation |
| **CaseStudyCard** | **C — NEUTRAL PRIMITIVE despite its name** | Generic props — title, meta, summary, href, plus legacy fields — with no hard-coded claims. Structurally it is a metadata-forward entry card, which is what `/research` and `/blog` need *(F10)*. **The name and its result-oriented fields (`primaryResult`, `before`, `after`) must go**; the card structure need not |
| **TestimonialCard** | **B — REPURPOSABLE, WITH A HARD PRECONDITION** | **Finding worth flagging: it carries a `placeholder` prop that renders the literal string `Client Name`.** It is built to display a testimonial that does not exist. The pattern — an attributed quote from a named, consenting person — is legitimate **only** with written permission, a real name, and a date. **The `placeholder` path must be removed, not merely unused.** No testimonial exists today, so it must not render at all |

**Materially wider `DEC-007` exposure — reported, not acted on.** Session 11 documented the prohibited claims on **seven production surfaces** as page content. This inspection shows the mechanism is **component-level**: `HeroDashboard` and `SocialProofStrip` carry the claims inside the components themselves, and the six components are imported by `app/page.tsx`, `app/(pages)/services`, `/pricing`, `/about`, `/google-ads` and `/work`. **Remediation remains an owner decision under `DEC-007`, and no production code was touched.**

---

## 4. Directory / numbering collision — recommendation

> **Nothing was renamed, moved or deleted in this pass.** `docs/11-schema/` and `docs/08-design/` were read only.

### CURRENT STATE
`docs/` contains, in order: `00-project` · `01-business` · `02-research` · `03-search` · `04-ai-visibility` · `05-content` · `06-IA` · `07-cro` · **`08-design`** · **`08-messaging`** · `09-content-pages` · `10-technical` · **`11-schema`** · **`11-creative`** · `12-analytics` · `13-automation` · `14-qa`.

**Two duplicate prefixes: `08-` and `11-`.** The `08-` collision **predates this session** — `08-design` and `08-messaging` have coexisted since before Session 10.

**VERIFIED FACT:** `docs/08-design/` contains **one placeholder README** (131 bytes) and `docs/11-schema/` contains **one placeholder README** (80 bytes). **Neither holds any substantive content.** Every reference to either directory anywhere in `docs/` — seven each — originates in Session 12's own handoff and `CURRENT_STATE.md`, discussing this collision. **There are zero substantive inbound references to either.**

### PROBLEM
1. Duplicate prefixes break the implied phase sequence the numbering exists to communicate.
2. **`08-design/`'s README describes exactly what `docs/11-creative/` now contains** — *"future creative direction, design system, component, visual asset, motion, and accessibility-design artifacts"*. Two directories claim the same purpose, and a future session could reasonably write into either.
3. The numbering already ceased to be a reliable sequence before this session, so restoring a strict one is larger work than the problem justifies.

### RECOMMENDED FUTURE STRUCTURE
**Move only the empty directories. Leave everything with content exactly where it is.**

| Action | Directory | Cost |
|---|---|---|
| **1. Retire `docs/08-design/`** — replace its README with a one-line pointer to `docs/11-creative/`, or remove it | Empty placeholder | **Near zero.** Resolves the `08-` collision and the duplicate-purpose problem in one step |
| **2. Renumber `docs/11-schema/` → `docs/15-schema/`** *(or any free prefix)* | Empty placeholder, 80 bytes, zero substantive references | **Near zero.** Resolves the `11-` collision |
| **3. Leave `docs/11-creative/` exactly where it is** | 20 files, referenced from `CURRENT_STATE.md` and the handoff | **Moving it would break the programme record for no semantic gain** |
| **4. Leave `08-messaging`, and every other content-bearing directory, untouched** | Gate-8-approved, heavily cross-referenced | Any renumbering here would break approved documents |

**Why this is the simplest durable resolution**, judged against the stated criteria: *semantic clarity* — `11-creative` sits between technical and analytics, which is where creative direction genuinely falls in the programme sequence · *future sequence* — schema work has not begun, so `15-schema` costs nothing and QA can move later if ever needed · *minimising broken references* — only two placeholder READMEs move, with zero inbound substantive references · *avoiding duplicate prefixes* — both collisions resolved · *preserving approved historical material* — **no approved document is touched.**

**Explicitly rejected:** moving `11-creative` into `08-design` *(breaks live references, and inherits the `08-` collision)* · renumbering the whole tree *(large churn across approved documents for a cosmetic gain)* · leaving both collisions *(a future session writes design work into `08-design` and the record splits)*.

### WHEN THE RECONCILIATION SHOULD OCCUR
**As a standalone repository-hygiene change, never bundled with substantive work**, at the earlier of:
- the start of the phase that first writes real content into a schema directory; or
- the start of Gate 9B (UX), which is when a designer would first plausibly open `08-design/` and find the wrong thing.

**Not now.** This pass is a creative correction and must not carry a repository restructure. **The reconciliation was not performed in this pass.**

**Executed 2026-09-01, as a standalone documentation-directory hygiene session, exactly as recommended above:** `docs/08-design/` retired (removed — confirmed to hold only the placeholder README); `docs/11-schema/` moved to `docs/15-schema/`, contents unchanged; `docs/11-creative/` left in place; `08-messaging` and every content-bearing directory untouched. No creative, strategy or copy content changed.

---

## 5. Residual creative risks after this pass

| # | Risk | Status after refinement |
|---|---|---|
| 1 | **The apparatus dominates; the argument register recedes; the site reads as a publication** | **Reduced, not eliminated.** `17` makes it a binding hierarchy with two testable checks. **Still the single biggest execution risk**, because it degrades gradually and no individual screen looks wrong while it happens |
| 2 | **The run tapers or becomes ambient → a funnel** | Unchanged. Bounded by `07` §5 and B2/B24. The intervention marks *help*, since a funnel has no repair points |
| 3 | **The India-first register still under-delivers** | **Reduced to 4/5, not resolved.** R1–R10 address every identified mechanism, but **none has been tested with a real Indian buyer.** This remains the recommendation's weakest point and an owner judgement |
| 4 | **A figure renders a not-testable system as a zero** | Unchanged, and now specified per figure in `19` F3. Easiest rule to violate accidentally in a chart |
| 5 | **F4 is drawn with invented proportions** | **Newly identified in this pass.** A plausible-looking attribution split is a fabricated statistic in graphic form. Specified in `19` F4 |
| 6 | **Honesty by volume reads as incapacity** | **Newly identified.** Now the proportion rule (`17` §4.4) and anti-pattern B32 |
| 7 | **The existing component kit is reused by default** | **Worsened by inspection.** Two components carry prohibited `DEC-007` claims in their own source, and one is built to render a fake testimonial. §3 above |
| 8 | **The people input stays blocked** | Unchanged, and its cost is now better understood: without visible named people the site has no staffing signal, which is `16` failure mode 8 |
| 9 | **This direction is read as permission to begin UX** | **Updated 2026-09-01.** Gate 9A is now PASSED (`DEC-015`), but **it is still not permission to begin UX.** Gate 9B (UX) has not started, and the approved documentation-directory hygiene reconciliation must be performed as a standalone change first |
