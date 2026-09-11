# Claude Session Handoff — Session 12

## Session
- **Session ID:** 12 — Creative / Art Direction
- **Date:** 2026-09-01
- **Model:** Claude Opus 5 (high effort)
- **Branch:** `test_branch`
- **Role:** Repository research, synthesis and documentation layer. **ChatGPT/orchestrator remains the approval layer.**
- **Passes:** (1) original creative / art direction; (2) **orchestrator correction / stress-test pass, 2026-09-01** — appended at §"Correction pass" below. **The original record above and below is preserved unchanged.**
- **Purpose:** Establish the strategic creative / art direction for the transformed MappedSkills website — what it should look and feel like, and why — **before** UX, page design, component design or implementation begins.

## Objective
Determine, from the approved commercial strategy, a distinctive and commercially appropriate visual world for a future designer and implementation system to work within.

**Explicitly out of scope and not produced:** page layouts · wireframes · Figma screens · React or CSS · component dimensions · a design system · page redesigns · UX · homepage implementation · final fonts · final colour values.

---

## Starting repository state — VERIFIED

| Check | Result |
|---|---|
| Branch | `test_branch` ✓ |
| `git status --porcelain` at start | `?? README.md` only ✓ |
| Session 11 commit `b9868b6e08fb8995e4deeb1628898c75c43ad627` | **Exists** — "Produce approved page copy" ✓ |
| Root `README.md` | Pre-existing **untracked** file. **Not modified, not staged** ✓ |
| Gate 8 — Messaging Architecture | **PASSED** ✓ |
| Gate 9 — Page Copy Production | **PASSED** ✓ |
| Gate 9A — Creative Direction | Was `NOT STARTED, NOT APPROACHED, NOT PASSED` ✓ |
| Gate 9B — UX | `NOT STARTED, NOT APPROACHED, NOT PASSED` ✓ |

**No contradiction with the session brief was found.** Repository state matched exactly.

**One discrepancy recorded, not resolved:** `docs/11-schema/` already exists, and the brief mandated creating `docs/11-creative/`. Two directories now share the `11-` prefix. `docs/08-design/` also exists as an empty placeholder README describing "future creative direction … artifacts", which overlaps this directory's purpose. **Nothing outside the permitted file set was renamed, moved or modified.** See "Decisions requiring orchestrator approval" #6.

---

## Context Read

**Programme state:** `CURRENT_STATE.md` · `QUALITY_GATES.md` · `DECISION_LOG.md` · `SOURCE_AND_EVIDENCE_POLICY.md` · `SESSION_HANDOFF_TEMPLATE.md` · `CLAUDE.md`

**Business (frozen):** `POSITIONING.md` (full) · `ICP.md` · plus `BUSINESS_STRATEGY.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md` as referenced through the approved messaging system

**Research:** `COMPETITOR_RESEARCH.md` (competitor matrix, positioning, whitespace findings)

**IA:** `PAGE_INVENTORY.md`

**CRO:** `PAGE_TYPE_CRO_RULES.md` (full)

**Messaging:** `MESSAGING_ARCHITECTURE.md` (full) · `VOICE_AND_TONE.md` (full) · `AI_SEARCH_LANGUAGE.md` (full)

**Page copy (Session 11):** `homepage.md` (full) · `problems-traffic-but-no-enquiries.md` · `how-it-works.md` · `research-hub.md` · `lead-generation.md` · `services.md` · plus a repository-wide scan of all 19 copy files for `Visual explanation useful here` markers and section structure

**Technical:** `CURRENT_CODEBASE_AUDIT.md` (incl. Session 01B live production verification)

**Source inspected, read-only:** `app/globals.css`, `styles/globals.css`, the `components/` tree (`sections/`, `cards/`, `layout/`, `blog/`, `ui/`), directory structure. **No production code, config, asset or content file was modified.**

---

## External research performed

**VERIFIED FACT.** Seventeen websites were loaded in a real browser and observed directly on **2026-09-01**.

**Method limits, stated at full strength and repeated in the artifacts:** entry screens only in most cases (scroll blocked by fixed overlays on several); desktop only at 1440×900; one location, one date; **no consent banner was accepted or dismissed**; no accessibility, performance or code inspection was run on any external site; no colour value or font name was measured. It is a **purposive sample**, supporting statements about convention and principle — **not** about prevalence or trend.

**References (11)** — `themarkup.org` + `/show-your-work` · `ourworldindata.org` · `pudding.cool` · `propublica.org/nerds` · `worksinprogress.co` · `docs.stripe.com` · `baymard.com` · `nngroup.com` · `linear.app` *(anti-example)* · `perplexity.ai` *(category convention)* · `kagi.com` *(anti-example)*

**Competitors (6), all already examined in Session 02** — `upgrowth.in` · `riseatseven.com` · `ipullrank.com` · `conversion.com` · `tryprofound.com` · `digimarkagency.com`

**Deliberately non-agency-weighted**, per the brief: 11 of 17 sites are research organisations, publications, documentation or search products.

---

## Competitor visual findings — summary

**Now generic** (each observed across firms with little else in common): dark grounds and gradients as a credibility device · superlative eyebrows · the credibility wall in any form — clients, awards, platforms, star ratings · a large unqualified number near the hero · the free-diagnostic CTA · "AI" as a headline modifier · centred hero with a pill CTA · motion applied to headline text.

**Where the whitespace is** — five positions observed on **none** of the six competitor entry screens:
1. **Drawn absence** — no competitor showed a gap, a limit or a system it could not test.
2. **A visible evidence apparatus** — not one attached a date, sample, method or scope to any claim.
3. **Per-system separation** — the convention is to *merge* surfaces into an impression of coverage.
4. **Light-ground technical seriousness** — only iPullRank was observed escaping the dark convention.
5. **The enquiry as the designed object** — every entry screen ended in a CTA to start a process, none treated the enquiry itself as worth designing.

---

## Four creative territories

| | Territory | Primary object | Strongest at | Principal risk |
|---|---|---|---|---|
| **T1** | **The Record** | The document | Evidence, long-form, honesty | Becomes an academic paper |
| **T2** | **The Run** | The path | Explaining the chain; conversion; motion | **Becomes a funnel** |
| **T3** | **The Standing** | The status | Per-statement uncertainty | **Becomes the dashboard/score it rejects** |
| **T4** | **The Straight Answer** | The sentence | Legibility, accessibility, cost, India-first directness | **Interchangeable — fails the swap test** |

Each is specified across fifteen dimensions (A–O) in `04_CREATIVE_TERRITORIES.md`.

## Evaluation

Scored 1–5 across the twenty required criteria in `05_TERRITORY_EVALUATION.md`.

| | T1 | T2 | T3 | T4 |
|---|:--:|:--:|:--:|:--:|
| **Total / 100** | **90** | 65 | 64 | 58 |
| **Six load-bearing criteria / 30** | **30** | 16 | 19 | 16 |

Scores were not tuned to produce a winner: **T4 beats T1 on buyer comprehension, implementation realism and accessibility potential; T2 beats T1 on comprehension, conversion, motion and memorability.** T1's two honest weaknesses are **India-first register (3/5)** and **motion potential (3/5)**.

---

## Recommended territory

> **T1 — THE RECORD.** The site behaves like the working record of a firm that measures things: kept, dated, revised in the open, and left available for inspection. Two registers — a plain, commercially direct **argument** register that leads every page, and an **apparatus** register carrying provenance, status, dates and limits. Structure from rules and space, not cards. Colour nearly absent, doing one job: known versus unknown.

**The load-bearing idea:** provenance moves **out of the prose** into a persistent designed evidence layer. The prose gets shorter (the owner's not-text-heavy requirement), the honesty gets *more* visible, and it creates a differentiator observed on no competitor.

**Bounded borrowings, stated so they cannot expand:** *the run* from T2 survives as **a figure**, never the site's structure or brand. *The status vocabulary* from T3 survives as a **component-level system inside the evidence apparatus**, never a sitewide grading system and never aggregated. *Plainness* from T4 governs **the first screen of every page**, never below it.

**Claude recommends. Claude does not approve.**

---

## Other recommendations made

| Question | Recommendation |
|---|---|
| **Visual metaphor system** | **Yes, one, and only as a figure.** "The run" — the continuous route from demand to qualified enquiry, with the accountability boundary, dashed unmeasured stretches, unattached (unattributed) arrivals and the client-data segment drawn on it. **Recommended AGAINST making it ambient or a brand device** — that is where it becomes a funnel |
| **Graphic motif** | **Yes** — the **annotation tie** (a mark that ties a statement to its provenance), plus the **dashed segment** meaning honest absence. Both derive from the strategy; both are typographic marks, not pictures. The annotation tie is recommended to double as the **focus indicator**, making accessibility part of the identity |
| **Evidence design** | A closed five-element apparatus — provenance · status · scope · version · source — set at the **same typographic quality as the prose**. Seven status states drawn from the programme's existing evidence labels. **Never colour-alone, never a traffic light, never aggregated into a score** |
| **Photography** | **HIGHLY SELECTIVE.** Named, identified people and real specific places only. Environmental, unposed, minimally treated. **No stock, ever.** No atmosphere photography |
| **Illustration** | **LIMITED AND STRICTLY EXPLANATORY.** Conventional illustration **absent**. The entire budget goes into five explanatory figures built to a high craft standard |
| **Iconography** | **MINIMAL AND FUNCTIONAL.** UI affordances, contact channels, evidence status marks. **No capability icons. No icon-card grid** |
| **Motion** | **"Motion resolves an uncertainty, or it does not ship."** Four essential explanatory classes; a short optional list; a long prohibited list. **The static state is the primary state** — a motion whose information exists only in motion is disqualified |
| **Density** | Defined per page type, from sparse (`/contact`) to information-rich (`/how-it-works`, research) |
| **Colour** | **Light-first and warm.** Dark mode as a user preference, never the brand. One accent meaning "mark". A separate non-decorative channel for evidence state. **No red-amber-green anywhere** |
| **Typography** | Two registers, semantically distinct. **Tabular lining figures everywhere** (a hard requirement — numbers here always sit beside samples and dates). No fonts chosen |

---

## Visual storytelling opportunities

**22 identified and classified** in `12_VISUAL_STORYTELLING_OPPORTUNITIES.md`, against actual approved Session 11 copy. **No copy was altered.**

- **12 already flagged by Session 11** as `Visual explanation useful here` — classified here, with the honesty constraint each figure must satisfy.
- **10 additional** identified in this session, including the `/thank-you` enquiry-arrival state, the five-check diagnostic as an operable instrument, and capabilities positioned on the run as the direct answer to the ban on capability card grids.
- **Highest-value, buildable today, needing nobody's permission:** the AI-visibility baseline figure — four systems, 28 runs, zero appearances, **two systems not testable and visually distinct from a measured zero**.
- **One item is BLOCKED and must not be designed:** `/how-it-works` §2 stages (V-05). The real delivery process is an owner input; a speculative process diagram would fabricate the exact content the page exists to prove.

---

## Accessibility implications

WCAG 2.2 AA (Project Rule 13) is achievable **by construction** rather than by remediation: hierarchy comes from type, rule and space rather than colour; the annotation-tie motif doubles as the focus indicator; every evidence status carries shape + label; no red-amber-green anywhere; nothing load-bearing depends on hover; the static state is primary for all motion.

**The single biggest responsive risk** is the apparatus column. It must be built as a **content relationship**, not a desktop layout feature — collapsing to inline expandable disclosure beneath its claim on narrow screens, never disappearing, never becoming a footer, with correct DOM reading order regardless of visual position.

**One accessibility rule is also an honesty rule:** a not-testable system must be distinguishable from a measured zero **without colour**, in the figure and in its text equivalent.

---

## Evidence gathered
- 17 external sites observed directly, 2026-09-01, with limits recorded in `02_VISUAL_RESEARCH.md` §0 and `03_COMPETITOR_VISUAL_PATTERNS.md` §0.
- Repository inspection of the current design token set and component inventory: **VERIFIED FACT** that `globals.css` is an unmodified shadcn/ui default with every neutral at `chroma 0`, and that the component tree contains six components rendering proof containers MappedSkills cannot currently fill (`HeroDashboard`, `SocialProofStrip`, `StatCard`, `TestimonialCard`, `BeforeAfterMetric`, `CaseStudyCard`).
- Repository scan confirming **12** explicit `Visual explanation useful here` markers in approved Session 11 copy.

## Tests actually run
**NONE.** No build was run. No page was rendered. No linter, test suite, Lighthouse run, contrast measurement or accessibility audit was executed — on MappedSkills' site or on any external site. **Nothing in these artifacts is a compliance or performance assessment.** Feasibility, accessibility, responsiveness and performance items in the proposed gate are recorded as **NOT YET ASSESSABLE**.

---

## Files Created (16)

```
docs/11-creative/01_CREATIVE_DIRECTION.md
docs/11-creative/02_VISUAL_RESEARCH.md
docs/11-creative/03_COMPETITOR_VISUAL_PATTERNS.md
docs/11-creative/04_CREATIVE_TERRITORIES.md
docs/11-creative/05_TERRITORY_EVALUATION.md
docs/11-creative/06_RECOMMENDED_ART_DIRECTION.md
docs/11-creative/07_VISUAL_GRAMMAR.md
docs/11-creative/08_EVIDENCE_DESIGN_LANGUAGE.md
docs/11-creative/09_SEARCH_AI_CONVERSION_VISUAL_LANGUAGE.md
docs/11-creative/10_IMAGERY_PHOTOGRAPHY_ILLUSTRATION.md
docs/11-creative/11_MOTION_AND_INTERACTION_PRINCIPLES.md
docs/11-creative/12_VISUAL_STORYTELLING_OPPORTUNITIES.md
docs/11-creative/13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md
docs/11-creative/14_DESIGN_ANTI_PATTERNS.md
docs/11-creative/15_CREATIVE_DIRECTION_QUALITY_GATE.md
docs/00-project/handoffs/SESSION_12_CREATIVE_ART_DIRECTION.md
```

## Files Modified (1)
```
docs/00-project/CURRENT_STATE.md   — Session 12 added as PROPOSED / AWAITING ORCHESTRATOR REVIEW
```

## Files explicitly NOT modified
`DECISION_LOG.md` · `QUALITY_GATES.md` · every directory from `01-business` to `13-automation` · `docs/08-design/` · `docs/11-schema/` · `docs/14-qa/` · all production and source code · root `README.md` · config · dependencies · assets.

---

## Decisions Proposed
1. Adopt **T1 — The Record** as the governing creative territory.
2. Adopt **the run** as the single recurring explanatory figure, bounded as a figure only.
3. Adopt **the annotation tie** and **the dashed segment** as the graphic motifs; the tie doubles as the focus indicator.
4. Adopt the **evidence apparatus** with its closed five-element vocabulary and seven status states.
5. **Photography highly selective; illustration limited to explanatory figures; iconography minimal and functional.**
6. **Light-first, warm, one accent; no red-amber-green anywhere.**
7. Adopt the **motion philosophy** and its three classes.
8. Adopt `14_DESIGN_ANTI_PATTERNS.md` as **binding** on all downstream design phases.
9. Adopt the **proposed Gate 9A** in `15_CREATIVE_DIRECTION_QUALITY_GATE.md`.

## Decisions Approved During Session
**NONE.** No decision was approved, and `DECISION_LOG.md` was not modified.

---

## Decisions requiring orchestrator approval

1. **Territory selection.** T1 is recommended. **If a different territory is selected, documents `06`–`14` are superseded and must be rewritten against it.**
2. **The India-first register risk.** T1's weakest score (3/5). The owner is better placed than any Claude session to judge whether the record register lands with a Pune owner-led buyer. Mitigations are specified; they are mitigations, not proof.
3. **Investment in the explanatory figures.** They are the site's principal visual assets and require real craft. Whether that budget exists is an owner decision.
4. **Whether `14_DESIGN_ANTI_PATTERNS.md` becomes binding** on Gate 9B and the design-system phase.
5. **Whether the six proof-container components** (`HeroDashboard`, `SocialProofStrip`, `StatCard`, `TestimonialCard`, `BeforeAfterMetric`, `CaseStudyCard`) are retired at the design-system phase. **Flagged only. No action taken and none recommended in this session.**
6. **Repository numbering and overlap.** `docs/11-creative/` and `docs/11-schema/` now share a prefix, and `docs/08-design/` overlaps in purpose. A hygiene decision, not a creative one.
7. **Photography production**, contingent on the blocked team/people owner input.
8. **Whether Gate 9A passes.** Passing it is an orchestrator and owner action recorded in `DECISION_LOG.md`.

---

## Assumptions Introduced
1. **That a light-first, warm ground is right for this buyer.** Reasoned from category convention observed on 2026-09-01 and from the prohibition on dark-for-credibility. **Not user-tested.**
2. **That the buyer will register the evidence apparatus as reassuring without reading it.** Plausible and unvalidated. `WORKING HYPOTHESIS`.
3. **That "the run" can be drawn without reading as a funnel.** The direction states the constraints; whether execution holds is a design-phase risk.
4. **That the explanatory figures can be made responsive, static-complete and accessible.** Believed achievable; **untested**.

## Risks / Regressions
- **Highest execution risk:** the run tapers, or becomes ambient, and the site acquires a funnel.
- **Second:** the apparatus dominates, the argument register recedes, and the site reads as an academic paper — the founder buyer bounces. This is T1's principal risk and the India-first score is its measure.
- **Third:** the apparatus is implemented as a desktop margin and quietly disappears on mobile, removing the differentiator for the majority of visitors.
- **Fourth:** a figure renders a not-testable system as a zero. It is the most specific honesty rule on the site and the easiest to violate accidentally in a chart.
- **Fifth:** the existing component kit is reused by default, reintroducing proof containers with nothing in them.
- **Sixth:** the direction is read as permission to begin UX. **It is not.**

## Unresolved Issues
- `/how-it-works` stages figure (V-05) is **BLOCKED** pending the owner's real delivery process.
- Named-person photography is **BLOCKED** pending the team/people owner input.
- The research index's visual density depends on how many entries publish at launch — the own-site diagnostic carries a technical prerequisite.
- The `docs/11-creative` / `docs/11-schema` / `docs/08-design` overlap is unresolved by design.

---

## Git state
- **Branch:** `test_branch` — unchanged.
- **Nothing staged. Nothing committed.** No `git add`, no `git commit`, no branch operation was performed.
- Root `README.md` remains **untracked and unmodified**.
- **No prohibited path was changed.**

## Gate 9A Status

> **Gate 9A — Creative Direction: NOT PASSED.**
>
> Artifacts delivered. Orchestrator and owner review pending. The recommendation of T1 is **a recommendation only**.

---

## Recommended Next Task
**Orchestrator review of Gate 9A.** If it passes, the next substantive phase is **Session 13 — UX (Gate 9B)**, which should begin from the recommended territory and treat `14_DESIGN_ANTI_PATTERNS.md` and the ten protections in `06` §6 as binding constraints.

**Independently of Gate 9A**, the highest-value unblocked work in the programme remains the technical prerequisites the funnel depends on — the enquiry form, enquiry-source capture, analytics and the booking surface — and the AI-visibility research entry, which requires no permission from anyone.

## Next Session Should Read
1. `docs/11-creative/06_RECOMMENDED_ART_DIRECTION.md` — the recommendation and the ten things that must be protected
2. `docs/11-creative/14_DESIGN_ANTI_PATTERNS.md` — the binding prohibitions
3. `docs/11-creative/08_EVIDENCE_DESIGN_LANGUAGE.md` and `12_VISUAL_STORYTELLING_OPPORTUNITIES.md` — what the site is actually made of, and which figures to build first
4. `docs/00-project/CURRENT_STATE.md` and `docs/00-project/DECISION_LOG.md` — for whether Gate 9A passed

## Stop Condition
**This session stopped after creative / art direction documentation, the proposed quality gate, this handoff, the `CURRENT_STATE.md` update and git safety verification.**

**The next session must stop before any of the following unless Gate 9A has passed and UX has been explicitly commissioned:** UX · wireframes · page layouts · a design system · homepage design · a visual prototype · any implementation.

---
---

# CORRECTION / STRESS-TEST PASS — 2026-09-01

**Appended, not overwritten. Everything above is the original Session 12 record and is unchanged.**

**Instruction:** one focused orchestrator correction / stress-test pass on T1 only. **Visual research was not restarted. No fifth territory was created. No UX, wireframe, layout, mockup or style frame was produced. No approved page copy was modified. Gate 9A remains NOT PASSED.**

**The orchestrator's question:** *can THE RECORD become commercially energetic, buyer-readable and appropriate for an India-first considered-purchase audience without losing the evidence-led distinction that makes it valuable?*

## Verdict

**Yes — and doing so required correcting a genuine contradiction in the original specification, not softening it.**

The original 3/5 India-first score was correct; the diagnosis behind it was incomplete. It attributed the weakness to *register*. **The actual defect was conceptual: the territory had a complete visual vocabulary for measurement and none for action.** A record of a firm that measures things is a record of an observer, and MappedSkills intervenes — it finds what is broken, fixes it, and reports what changed. Every mechanism by which T1 read as academic, institutional, NGO-like, passive or cold traces to that single gap.

**The correction extends the evidence system rather than diluting it**, because the strongest evidence a firm can publish is a dated record of something it changed. **Every item on the orchestrator's approved-in-principle list survives intact; nothing was traded for commercial energy.**

## Refined thesis

> **THE RECORD — A WORKING RECORD, NOT AN ARCHIVE.** The site is the working record of a firm that **finds what is broken, fixes it, and records what changed**. It is kept by people who intervene, not by observers. **Commercial meaning leads every screen; the evidence stands beside it, always present and never in front.** Its energy comes from consequence and contrast — a problem that costs money, an action taken, a dated change — never from colour, motion, scale or claim.

## What the pass produced

| Item | Where |
|---|---|
| **Commercial energy system** — action, pace, emphasis, CTA character, commercial pages, people | `11-creative/16` §4 |
| **India-first stress test** and revised scores | `11-creative/16` §5 |
| **Argument/apparatus hierarchy** — binding, with five visibility states per context including mobile | `11-creative/17` |
| **Homepage visual narrative** | `11-creative/18` |
| **Figure prioritisation** — Tier 1/2/3, Tier 1 fully specified | `11-creative/19` |
| **Copy concern, anti-pattern review, component kit, directory recommendation, residual risks** | `11-creative/20` |

**Six new commercial-energy devices**, all derived from approved material: the **intervention mark** on the run · the **state pair** (broken → done → changed, dated) · consequence carrying the heaviest emphasis · verb-led emphasis · arrival as an event · decisions rendered as the reader's.

**Two new binding rules:** *"emphasis is commercial, presence is evidential"* and *"every page opens fast; no page opens slow."*

## Revised T1 scores — conditional

| Criterion | Original | Revised |
|---|:--:|:--:|
| India-first appropriateness | 3 | **4** |
| Commercial credibility | 5 | **5** (unchanged, at ceiling) |
| Buyer comprehension | 4 | **5** |
| **Total** | 90 | **92** |

**Conditional on refinements R1–R10 being binding.** If not adopted, the original scores stand. **No other territory was rescored; the competition was not rerun; the six load-bearing criteria are unchanged at 30/30.** Motion potential deliberately left at 3.

## Territory name — decision

**Option A: retain "THE RECORD", with a binding implementation qualifier** — *it is a working record, not an archive, a document, a publication, a periodical or a report, and must not be styled as one.* Banned readings recorded as anti-pattern **B31**. Alternative if the orchestrator prefers a rename: **"THE WORKING RECORD"** — same thesis, one word, requiring a find-and-replace across `docs/11-creative/`. **Claude recommends Option A.**

## Copy concern — REPORT ONLY, and copy was NOT modified

> *"There are buyers for what you sell, and most of them never reach you."* — approved homepage hero support, Gate 9, `DEC-014`.

**The concern is VALID**, on three grounds: it is second-person and unhedged, which `VOICE_AND_TONE.md` §12 prohibits by name; **"most" is a quantity claim carrying no provenance** (§8.1, §8.4); and the approved Evidence Note defends it as *"stated as what this usually looks like"* when **the word "usually" is not in the sentence** — Block 2 of the same page handles the identical idea correctly.

**Scope is wider than one sentence:** it appears on `/` (twice) and `/services`, is recorded twice in `PAGE_COPY_AUDIT.md` as a deliberate retention, and is carried in Gate-8-approved `HOMEPAGE_MESSAGE_ARCHITECTURE.md`.

**Recommendation:** a **narrow correction in a future authorised copy session** — move the clause to the general case or drop the quantifier. **Medium priority; not a Gate 9A blocker.** This session deliberately did not draft the replacement sentence.

**Creative-direction consequence, which is this session's business:** new binding rule in `08` §8.13 — **the design must never give visual amplification to a claim classified at ladder level D or E.**

**Confirmed: no file under `docs/09-content-pages/` was modified.**

## Anti-pattern review

**Two genuine defects found — both internal contradictions, not preferences. No rule loosened for flexibility.**
- **A19 amended** — it banned carousels in terms that also caught the horizontally-scrollable containers `13` §3.2 *requires* on mobile. Now distinguishes carousel (content hidden) from scroll container (content present).
- **A23 amended** — it banned all section banding, which forbids the emphasis this pass requires. Now bans *alternating/rhythmic* banding; permits at most two deliberate ground changes per page.
- **Clarified:** A17, A20, B18.
- **Added: B27–B32** — apparatus above the fold on a commercial page · a limit before the capability it limits · a collapsible limits section · apparatus in a CTA region · archival skeuomorphism · **honesty by volume**.
- **Three new submission tests:** standalone, first-fixation, proportion.

## Component kit — classification (recommendation only; no code touched)

Read at **implementation level**, not by name.

| Component | Class | Basis |
|---|---|---|
| **HeroDashboard** | **A — RETIRE** | **Hard-codes `'300%+'`, `'₹100Cr+'`, `'1,247'` leads, `'42'` campaigns.** Fabricated dashboard + metric counter + live `DEC-007` violation |
| **SocialProofStrip** | **A — RETIRE** | Hard-codes `'300%+'`, `'₹100Cr+'`, `'50+ Clients Served'`, `'9+ Years Experience'` |
| **BeforeAfterMetric** | **A — RETIRE as a metric pair** | `{label, before, after, improvement}`. The concept survives as F7, a **state pair** |
| **StatCard** | **C — NEUTRAL PRIMITIVE** | `{stat, label, description?}`, no hard-coded content. **Banned default presentation.** Reuse requires a mandatory provenance slot |
| **CaseStudyCard** | **C — NEUTRAL PRIMITIVE** | Generic card props. Name and result fields must go; structure is reusable for `/research` |
| **TestimonialCard** | **B — REPURPOSABLE, hard precondition** | **Carries a `placeholder` prop rendering the literal string `Client Name`** — built to display a testimonial that does not exist. That path must be removed, not merely unused |

**New finding: `DEC-007` exposure is component-level, not only page-level.** Session 11 documented seven production surfaces as page content; the prohibited claims are **inside two components**, imported by `app/page.tsx`, `/services`, `/pricing`, `/about`, `/google-ads` and `/work`. **Remediation remains an owner decision; no production code was touched.**

## Directory / numbering — recommendation only, not performed

**VERIFIED FACT:** `docs/08-design/` and `docs/11-schema/` each contain **one placeholder README and no substantive content**, and **every reference to either anywhere in `docs/` originates in Session 12's own documents discussing the collision.** Zero substantive inbound references. The `08-` collision predates this session.

**Recommendation — move only the empty directories:** retire `docs/08-design/` (its README describes exactly what `11-creative/` now holds) · renumber `docs/11-schema/` → `docs/15-schema/` · **leave `docs/11-creative/` where it is** (20 files, live references) · leave every content-bearing directory untouched.
**When:** a standalone hygiene change, never bundled with substantive work, at the start of the schema phase or of Gate 9B — whichever comes first. **Not now.**

## Additional decisions requiring orchestrator approval

9. **Territory name** — Option A (qualifier) vs Option B (rename to "The Working Record").
10. **Whether refinements R1–R10 are binding.** The revised scores of 4 and 5 are conditional on this.
11. **A responder's portrait on `/contact` and `/schedule-call`.** Recommended as a **conversion affordance**, but `PAGE_TYPE_CRO_RULES.md` §9 sets proof there to "minimal". **This is an interpretation of an approved rule and needs orchestrator confirmation**; it is blocked on the team/people input regardless.
12. **The two anti-pattern amendments (A19, A23)** and the six additions (B27–B32).
13. **The component-kit classification**, including whether `TestimonialCard`'s `placeholder` path is removed.
14. **The directory reconciliation**, and when it happens.
15. **Whether the homepage copy concern is scheduled** for a future narrow copy correction.

## Files created in this pass (5)
`docs/11-creative/16_COMMERCIAL_ENERGY_SYSTEM.md` · `17_ARGUMENT_APPARATUS_HIERARCHY.md` · `18_HOMEPAGE_VISUAL_NARRATIVE.md` · `19_FIGURE_PRIORITISATION.md` · `20_CORRECTION_PASS_GOVERNANCE.md`

## Files amended in this pass (8)
`docs/11-creative/01`, `04`, `05`, `06`, `08`, `12`, `14`, `15` — each with a dated revision note; **no original analysis, research record or score was deleted or rewritten.** Plus this handoff and `CURRENT_STATE.md`.

## Tests actually run in this pass
**NONE.** No build, lint, render, Lighthouse, contrast measurement or accessibility audit. The only new evidence gathered was **read-only repository inspection** of six component implementations and two placeholder directories.

## Gate status after this pass

> **Gate 9A — Creative Direction: NOT PASSED.** Refined recommendation delivered. Orchestrator and owner review pending.

## Gate 9A approved — 2026-09-01 (annotation added later)

**The orchestrator completed the review this handoff called for, and Quality Gate 9A (Creative Direction) was reviewed and PASSED on 2026-09-01.** Decision trail: `DEC-015` in `DECISION_LOG.md`.

**Approved specifically, resolving the additional decisions listed above:**
9. **Territory name:** retained as **The Record**, with the qualifier (Option A) — *"a working record, not an archive."*
10. **Refinements R1–R10 are binding.** The revised scores stand: India-first appropriateness 4/5, buyer comprehension 5/5, total 92/100.
11. **Responder's portrait on `/contact` and `/schedule-call`:** approved **in principle**, as a conversion affordance / human-contact cue rather than testimonial or proof, conditional on the person genuinely handling or owning enquiry response and on no person, role or responsibility being invented. **Implementation remains BLOCKED** on owner-supplied people / response-ownership information, independent of this approval.
12. **The A19 and A23 anti-pattern amendments, plus additions B27–B32, are approved and binding on Gate 9B.**
13. **The component-kit classification is approved as future implementation guidance:** RETIRE — `HeroDashboard`, `SocialProofStrip`, `BeforeAfterMetric` as a metric-pair pattern; REPURPOSABLE/CONDITIONAL — `TestimonialCard`, only with genuine permissioned testimonial evidence, its `placeholder` path must not survive future implementation; NEUTRAL PRIMITIVE SUBJECT TO REDESIGN — `StatCard`, `CaseStudyCard`. No production code was modified.
14. **The directory reconciliation is approved as a recommendation, to occur as standalone housekeeping** — retire or pointer-only `docs/08-design/`; move `docs/11-schema/` → `docs/15-schema/`; leave `docs/11-creative/` in place — **before substantive Gate 9B work begins. Not executed in this pass.**
15. **The homepage copy concern was acted on**, as one explicitly authorised, narrowly scoped exception to this session's "report only" boundary: *"There are buyers for what you sell, and most of them never reach you"* (and the `/services` variant, "and most never reach you") → **"There is buyer demand for what you sell, and some of it never reaches you."** Applied to `docs/09-content-pages/copy/homepage.md` (both occurrences), `copy/services.md`, `PAGE_COPY_AUDIT.md` (governance annotation), and `docs/08-messaging/HOMEPAGE_MESSAGE_ARCHITECTURE.md` (the illustrative headline direction and the Recommended Direction's supporting-line description, both found on inspection to carry the same claim). **The H1, the hero territory and homepage messaging architecture were not reopened; no new positioning idea was introduced.**

**Also approved:** the refined thesis — *"The Record — a working record, not an archive… finds what is broken, fixes it, and records what changed. Commercial meaning leads every screen; evidence remains visible and rigorous, but never competes with the commercial argument for first attention."* — and the Tier 1 figure prioritisation (F1 the run, F2 the four causes, F3 the four AI layers separated per system, F4 what cannot be attributed) with every evidence constraint preserved. **F17 (`/how-it-works` stages) remains BLOCKED** — no sketch, placeholder or speculative process diagram.

**§ "Gate status after this pass" above and every historical research/stress-test section are preserved as the record of this session's own stop state**; they are superseded as current fact by this note and by `QUALITY_GATES.md` / `CURRENT_STATE.md`. This annotation performs no new research, produces no wireframe or mockup, and reopens nothing beyond the one explicitly authorised copy correction described above.

**Next phase: Gate 9B — UX, after the approved documentation-directory hygiene change.** Neither has begun. **Session 12 is closed.**

## Documentation-directory hygiene reconciliation performed — 2026-09-01 (annotation added later)

**The directory-reconciliation recommendation above (item 14) was executed on 2026-09-01, in a dedicated housekeeping session, exactly as recommended:** `docs/08-design/` was retired — removed, since inspection confirmed it held only the single placeholder README with no substantive historical material — and `docs/11-schema/` was moved to `docs/15-schema/` with its contents unchanged. `docs/11-creative/` was left exactly where it is, and `docs/08-messaging/` was not touched. **This was a repository-structure change only: no strategy, IA, CRO, content, messaging, creative direction or copy was altered, and no production code was touched.** No new decision-log entry was created for this execution step, consistent with `DEC-015` already recording the approval. **This does not begin Gate 9B — UX**, which remains NOT STARTED.
