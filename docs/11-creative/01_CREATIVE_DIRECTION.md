# Creative Direction — APPROVED

**Session:** 12 — Creative / Art Direction
**Date:** 2026-09-01 · **Branch:** `test_branch`
**Model:** Claude Opus 5 (high effort)
**Status:** **APPROVED — 2026-09-01 (Gate 9A, `DEC-015`).**
**Revised 2026-09-01** by an orchestrator correction / stress-test pass on T1 only. Documents `16`–`20` were added; `05`, `06`, `08`, `14` and `15` were amended. **The four-territory competition was not rerun, no fifth territory was created, no UX was begun, and no approved page copy was modified.**
**Governed by:** `BUSINESS_STRATEGY.md` and `POSITIONING.md` (frozen, `DEC-005`/`DEC-006`) · the approved IA (Gate 5, `DEC-010`) · the approved CRO specification (Gate 6, `DEC-011`) · the approved content architecture (Gate 7, `DEC-012`) · the approved messaging architecture (Gate 8, `DEC-013`) · the approved page copy (Gate 9, `DEC-014`).

**Nothing in this document or its companions reopens any of the above.** Where this direction appears to conflict with a frozen or approved document, the frozen or approved document governs and this direction is wrong.

---

## 0. What this session produced, and what it did not

**Produced:** a strategic visual direction — what the transformed MappedSkills website should look and feel like, and why, derived from the approved commercial strategy.

**Not produced, and explicitly out of scope:** page layouts · wireframes · Figma screens · a design system · component specifications · final fonts · final hex values · React or CSS · homepage design · any production change of any kind.

**The test this direction must pass** is not "is it attractive". It is: *can a designer and an implementation system build a distinctive, commercially credible, accessible website from this without inventing strategy, and without drifting into the category conventions the strategy rejects?*

**A second test was added by the 2026-09-01 correction pass, and it is equally binding:** *does the result read as a firm that does commercial work, or as a research publisher?* The original direction did not answer it — see `16_COMMERCIAL_ENERGY_SYSTEM.md` §1.

### Numbering collision — recorded at the time, since resolved
`docs/11-schema/` already existed in this repository. This session was instructed to create `docs/11-creative/`, and did so. **Two directories shared the `11-` prefix**, and `docs/08-design/` (an empty placeholder README describing "future creative direction … artifacts") overlapped this directory's purpose. **No file outside the permitted set was renamed, moved or modified in this session.** Resolution was an orchestrator decision, approved as `DEC-015` and **executed 2026-09-01**: `docs/08-design/` was retired (removed) and `docs/11-schema/` was moved to `docs/15-schema/`. `docs/11-creative/` was not moved.

---

## 1. The creative problem, stated exactly

MappedSkills must look more credible than its competitors **while showing less proof than any of them.**

That sentence is the whole brief. It is not a rhetorical framing; it is the documented position:

- **VERIFIED FACT (Session 02, twelve competitors by direct retrieval):** every competitor examined that occupies a premium position leads with proof of a kind MappedSkills does not have — named clients, published result figures, ratings, awards, platform tier badges, or a productised tool.
- **VERIFIED FACT (Session 04):** MappedSkills appeared **0 times in 28** unbranded AI runs across four systems on one dated day, from Pune, in English, signed out. Two further systems returned no testable result at all.
- **VERIFIED FACT (Sessions 01/01B):** the production contact form has no `action` and no submission endpoint; the booking widget renders an empty 384px box; there is no analytics; there is no surfaced Google Business Profile; the blog and case-study indexes are empty; and unsubstantiated figures ("300%+ ROI", "₹100Cr+", "₹10Cr+") are live and are being redistributed by AI systems as fact about the company.
- **APPROVED DECISION (`MESSAGING_ARCHITECTURE.md` §3, Level 6):** the reason-to-believe layer is thin, and "the honest response to a thin evidence layer is specificity — method, dates, run counts, named people — not volume of assertion."

Every visual device the category uses to manufacture credibility — the logo wall, the metric counter, the rating strip, the client carousel, the awards row, the case-study grid — is **unavailable to MappedSkills, not merely unfashionable.** Using a visual container designed to hold proof, with nothing real inside it, is fabrication by layout. Project Rule 15 forbids it as surely as it forbids an invented statistic.

So the design cannot borrow credibility from asserted outcomes. It has to earn it from **the visible apparatus of checking**: method, provenance, dates, sample sizes, run counts, named people, stated limits, and honestly rendered gaps.

### The second half of the problem, which is equally binding

**OWNER REQUIREMENT (recorded in this session's brief, §26):** the owner explicitly does not want a text-heavy website.

A naive reading of the first half produces exactly that — a wall of caveats. The two requirements look contradictory. They are not, and resolving them is the single most useful thing this direction does. See §4.

---

## 2. The core creative question, and its answer

> **What should MappedSkills look like if its visual language is an expression of: "Follow buyer demand all the way to the enquiry — and show what actually happened"?**

Answered as a visual grammar rather than as adjectives, that sentence contains five instructions:

| The words | The visual instruction |
|---|---|
| **"Follow … all the way"** | **Continuity.** The site's structural gesture is a *run* from one end of something to the other — not a set of discrete, equal, interchangeable modules. Composition is directional. Cards are the wrong primitive because a card is a boundary, and the argument is that the boundaries are where results disappear |
| **"buyer demand"** | **Origin is drawn.** Demand exists before the business; the route starts off the business's own property. Real queries, real discovery surfaces and real third-party sources are visual material, and the company's own site is *one node among many* — which is literally the strategic argument about source authority |
| **"to the enquiry"** | **A terminus that is a real event.** The enquiry is the unit. It has a moment of arrival, and that moment deserves design attention equal to the hero |
| **"show"** | **Apparatus is visible.** Every assertion carries its provenance where a reader can see it without hunting. Evidence is displayed, not footnoted |
| **"what actually happened"** | **Absence is rendered.** The unmeasured, the unattributed and the untestable are *drawn*, not omitted. A gap in the record is a mark on the page, not a blank |

The last two are where the differentiation actually lives. The first three are achievable by any competent designer. **A site that draws its own gaps is not something any competitor in this category currently does.**

---

## 3. What the visual identity must communicate, and how each is earned

The brief lists nine qualities. Adjectives are not a direction, so each is restated as a thing the design does.

| Quality | How it is earned visually — not asserted |
|---|---|
| Commercial intelligence | The first screen of every page states the commercial thing plainly and early; the sophistication is in the apparatus below it, never in the headline |
| Clarity | One argument per screen, a measured reading column, sentence-case headings that describe rather than tease, and no section whose meaning depends on decoration |
| Accountability | The accountability boundary is **drawn on the diagram**, not written under it. Where the firm's responsibility stops is a visible line |
| Evidence | A fixed, sitewide evidence apparatus — date, sample, method, scope, status, version — set at the same typographic quality as the prose it supports |
| Modern marketing competence | Genuine artefacts, correctly labelled: a real AI answer excerpt with its retrieval date, a real query string, a real analytics view — never a mock-up of one |
| Understanding of search and modern discovery | Queries and discovery surfaces treated as typographic data; AI systems named and separated, never blended; source authority shown as an off-site network |
| Understanding of conversion | Friction rendered as interruption in a continuous path; the enquiry-arrival state designed as a real surface |
| Understanding of measurement | Known and unknown given distinct, colour-independent visual states; uncertainty shown as extent, never as a score |
| Confidence without hype | No superlative, no counter, no gradient, no glow, no number in a heading. Confidence is expressed as restraint plus specificity |

---

## 4. The resolution of the central tension — apparatus leaves the prose

**This is the load-bearing idea of the whole direction.**

The honesty requirement and the "not text-heavy" requirement collide only if honesty is expressed as *more sentences*. It need not be.

Today, in the approved Session 11 copy, provenance is carried inside the prose because prose was the only medium available to the copywriting session. Read the approved homepage hero support, or `/research` §1, or `/how-it-works` §3–4: a great deal of the word count is sample sizes, dates, systems, locations, access tiers, run counts and scope limits. That material is not padding — it is mandated by `VOICE_AND_TONE.md` §8 and `MESSAGING_ARCHITECTURE.md` §5.6 — but it does not have to be *sentences*.

> **The direction: move the apparatus out of the prose and into a persistent, designed evidence layer.**
>
> The claim stays in the reading column, short and declarative. Its provenance — what, when, where, how many, by whom, what it does and does not support — moves to an adjacent apparatus that is always available and never hidden.

Three things follow, and all three are wins:

1. **The prose gets shorter**, which is the owner's requirement.
2. **The honesty gets *more* visible, not less** — it becomes a designed, repeating, recognisable feature of the site rather than a qualifying clause a skim-reader drops.
3. **It creates the differentiator.** No competitor examined in Session 02 has an evidence apparatus, because none of them needs one. It is a design feature that only a firm with this position would ever build, which makes it uncopyable in the only sense that matters — a competitor copying it would have to start publishing its own provenance.

Detailed specification: `08_EVIDENCE_DESIGN_LANGUAGE.md`.

---

## 5. The recommended territory, in one paragraph

**THE RECORD** — the site behaves like the working record of a firm that measures things: kept, dated, revised, and deliberately left open to inspection. An editorial-technical hybrid drawn from research institutes and investigative newsrooms rather than from agencies or SaaS products. Two typographic registers run throughout — an **argument** register that is plain, large and commercially direct, and an **apparatus** register that carries provenance, status and dates. Structure comes from rules, space and a measured reading column rather than from cards. Colour is nearly absent and does exactly one job: distinguishing what is known from what is not. The explanatory weight is carried by a small number of high-quality figures — chief among them **the run**, a continuous traced route from demand to qualified enquiry with the accountability boundary and the unmeasured stretches drawn on it.

Full recommendation, including what must be protected during UX and design: `06_RECOMMENDED_ART_DIRECTION.md`.

---

## 6. Judgement rules this direction commits to

Restated from the session brief §38 because they are the most likely failure modes, and because a later designer will read this file first.

- **Distinctive, not novel.** MappedSkills should look recognisably itself. It should not look strange. Nothing here is unusual for the sake of being unusual.
- **Premium is not minimal black-and-white typography.** `Conversion` (observed 2026-09-01) demonstrates the trap: an immaculate monochrome hero, half the screen empty, then a logo wall. MappedSkills cannot follow it — it has no logo wall, and minimalism without proof reads as emptiness, not as confidence.
- **Modern is not gradients, glassmorphism, bento grids or 3D.** All four are category conventions in 2026 and all four are prohibited here.
- **Technical credibility is not dashboards, terminals or code.** MappedSkills has no dashboard product (§16 of the brief) and inventing one visually would be fabricated proof.
- **Energy is not constant animation.** Motion in this direction must communicate information or it does not ship.
- **Trust is not corporate photography.** `DigiMark` (observed 2026-09-01) uses a desaturated stock office-team photograph behind its hero. It is the single most category-generic device in the Indian mid-market, and it is prohibited.

---

## 7. Companion documents

| File | What it decides |
|---|---|
| `01_CREATIVE_DIRECTION.md` *(this file)* | The creative problem, the core question, the tension resolution, the governing rules |
| `02_VISUAL_RESEARCH.md` | External references, observed directly, with the principle learned and the copying prohibition for each |
| `03_COMPETITOR_VISUAL_PATTERNS.md` | Category visual conventions, what is now generic, and where the whitespace is |
| `04_CREATIVE_TERRITORIES.md` | Four distinct territories, each specified across fifteen dimensions |
| `05_TERRITORY_EVALUATION.md` | All four scored against twenty criteria, with the meaningful differences explained |
| `06_RECOMMENDED_ART_DIRECTION.md` | The single recommendation, and what must be protected downstream |
| `07_VISUAL_GRAMMAR.md` | Composition, typography, colour, motif, density, the visual metaphor system |
| `08_EVIDENCE_DESIGN_LANGUAGE.md` | Evidence as a design material — the apparatus, the status vocabulary, the rules |
| `09_SEARCH_AI_CONVERSION_VISUAL_LANGUAGE.md` | Visual language for search, AI search, conversion and measurement |
| `10_IMAGERY_PHOTOGRAPHY_ILLUSTRATION.md` | Photography, illustration, iconography and diagram decisions |
| `11_MOTION_AND_INTERACTION_PRINCIPLES.md` | The motion philosophy, three motion classes, interaction character |
| `12_VISUAL_STORYTELLING_OPPORTUNITIES.md` | Actual Session 11 copy that should become visual explanation |
| `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` | Responsive character and accessibility at direction level |
| `14_DESIGN_ANTI_PATTERNS.md` | The binding anti-pattern list, generic and MappedSkills-specific |
| `15_CREATIVE_DIRECTION_QUALITY_GATE.md` | The proposed Gate 9A test |
| **`16_COMMERCIAL_ENERGY_SYSTEM.md`** | *Correction pass.* The refined thesis · action, pace, emphasis, CTA character, commercial pages, people · the India-first stress test and revised scores · the territory-name decision |
| **`17_ARGUMENT_APPARATUS_HIERARCHY.md`** | *Correction pass.* **Binding.** The argument/apparatus hierarchy and the five apparatus visibility states, per context, including mobile |
| **`18_HOMEPAGE_VISUAL_NARRATIVE.md`** | *Correction pass.* The homepage as a visual narrative on the approved H1 and approved block order |
| **`19_FIGURE_PRIORITISATION.md`** | *Correction pass.* Explanatory figures ranked Tier 1/2/3, with full specification for Tier 1 |
| **`20_CORRECTION_PASS_GOVERNANCE.md`** | *Correction pass.* Copy concern *(report only)* · anti-pattern review · component-kit classification · directory recommendation · residual risks |

---

## 8. What this document does not decide

Final fonts · final colour values · type scale · spacing scale · grid columns · component specifications · page layouts · wireframes · the design system · the homepage · any production code · any asset. Those belong to Gate 9B (UX) and the design-system phase, and **Claude should not autonomously advance into them.**

**Gate 9A is not passed by the existence of these artifacts.** Gate advancement is an orchestrator and owner action recorded in `DECISION_LOG.md`.
