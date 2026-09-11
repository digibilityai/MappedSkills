# Design Anti-Patterns — APPROVED, BINDING ON GATE 9B

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`). **If Gate 9A passes, this list is binding on the UX, design-system, component and implementation phases.**
**Revised 2026-09-01** by the orchestrator correction / stress-test pass: **A19 and A23 amended** (both were internal contradictions with other approved direction documents), **A17, A20 and B18 clarified**, and **B27–B32 added**. Review record and reasoning: `20_CORRECTION_PASS_GOVERNANCE.md` §2.

---

## 0. The standard applied

> **A pattern is banned when it harms this strategy — not because it is fashionable.**

Every entry below states the harm and, where one exists, cites the approved document that already prohibits it in another form. Patterns that are merely common, or merely to somebody's taste, are **not** listed. Several fashionable things are deliberately absent from this list because they do no harm here.

**Two ban categories:**
- **HARD** — never, under any circumstance, without an owner decision recorded in `DECISION_LOG.md`.
- **CONDITIONAL** — permitted only under the stated condition.

---

## A. Generic digital anti-patterns

| # | Pattern | Ban | The harm to *this* strategy |
|---|---|---|---|
| A1 | **Excessive cards / card grids as the default layout** | HARD | A card is a boundary, and the argument is that the joins between things are where results disappear. `/` Block 5 already prohibits capability cards of equal weight. Cards permitted only for genuinely discrete comparable items — research entries, articles — and then rule-bounded, not filled and shadowed |
| A2 | **Bento grids** | HARD | A layout that fills space with modules of assorted importance. Modular equivalence contradicts a chain argument, and MappedSkills has nothing to fill the cells with |
| A3 | **Dashboard cosplay** — fake analytics panels, KPI tiles, gauges, chart furniture as decoration | HARD | **MappedSkills has no dashboard product** (brief §16). Inventing one visually is fabricated proof under Project Rule 15, not a style choice |
| A4 | **Gradient overload; mesh gradients; glassmorphism; glow** | HARD | Category default, observed on multiple unrelated sites (2026-09-01). Carries no information and costs performance |
| A5 | **Dark mode adopted for technical credibility** | HARD | Observed on four unrelated sites this session. It now signals category membership rather than seriousness. Dark mode may exist as a **user preference**; it is never the brand |
| A6 | **Meaningless animation; ambient motion; parallax; scroll-jacking** | HARD | Fails all four questions of the motion test. Scroll-jacking additionally takes reading pace from a reader evaluating a purchase |
| A7 | **Entrance animations that gate the first screen** | HARD | Observed on Linear (2026-09-01). Costs comprehension, perceived performance and Core Web Vitals, and delays the one message the homepage exists to deliver |
| A8 | **Counting-up numbers / animated statistics** | HARD | Violates `VOICE_AND_TONE.md` §8: a number must arrive with its sample, date, location and method. A counting number arrives without them, repeatedly |
| A9 | **Enormous numbers without evidence** | HARD | The category's loudest device. **Observed: `Conversion`'s "$2 billion", DigiMark's "3x leads" / "100+ clients" (2026-09-01, COMPETITOR CLAIM).** `VOICE_AND_TONE.md` §8.2 and §8.6 already prohibit a figure as a hook and a number in a heading |
| A10 | **Fake statistics of any kind, including illustrative ones** | HARD | Project Rule 15. Includes placeholder numbers in mockups that could survive into production |
| A11 | **Logo-wall dependence; "trusted by"; award laurels; rating strips** | HARD | **MappedSkills has none of these, and the absence is a documented gap.** `/` Block 6 prohibits the whole class explicitly. A proof container with a substitute in it is fabrication by layout |
| A12 | **Oversized empty hero** | HARD | The premium-equals-minimal trap. **Observed on `Conversion`: the right half of the viewport is empty (2026-09-01).** With no proof, emptiness reads as emptiness |
| A13 | **An icon for every capability; the `icon + title + two lines` card, repeated** | HARD | The visual form of a service menu. `MESSAGING_ARCHITECTURE.md` §3 Level 5 prohibits capabilities as co-equal pillars |
| A14 | **Fake terminal / code aesthetic** | HARD | MappedSkills is not a developer product. Borrowing developer chrome is dashboard cosplay by another route |
| A15 | **Every section using the same layout** | HARD | Produces a modular catalogue. Section shape should follow the argument |
| A16 | **Stock photography** | HARD | **Observed on DigiMark: a desaturated smiling-office-team photograph behind the hero (2026-09-01).** The most category-generic device in this market. Brief §38: trust is not corporate photography |
| A17 | **Text disguised as visual design** — a paragraph in a box with a rule and an icon, presented as a "feature" | HARD | Adds visual noise and word count simultaneously. If a structure is present, draw it; if not, write it plainly. **Clarified 2026-09-01:** this bans a paragraph dressed up to imitate a feature. It does **not** ban a legitimately emphasised statement — emphasis is required by `16_COMMERCIAL_ENERGY_SYSTEM.md` §4C |
| A18 | **Modals, interstitials, exit-intent, newsletter pop-ups, cookie walls beyond what consent requires** | HARD | `PAGE_TYPE_CRO_RULES.md` §11.4 bans the first three outright |
| A19 | **Carousels** — paged or auto-advancing regions where content is **not simultaneously present** | HARD | Hides content from readers, from crawlers and from retrieval systems. On a site written to be quoted accurately, that is a direct cost. **Amended 2026-09-01:** the harm is *hiding content*, so a **scroll container** — all content present in the DOM, keyboard-accessible, no paging — is **not** a carousel and is **permitted**. `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §3.2 requires exactly that for wide tables and comparisons on narrow screens |
| A20 | **Accordions that start collapsed on load-bearing content** | CONDITIONAL — permitted on `/faq` where each item is a genuine discrete question; **never** for limits, attribution honesty, method, or anything a reader needs in order to evaluate a claim | Hiding the limits is the disclaimer treatment under another name. **Clarified 2026-09-01:** the **EXPANDABLE evidence apparatus** (`17_ARGUMENT_APPARATUS_HIERARCHY.md` §2) is permitted disclosure and is not caught by this rule. **Limits sections are never collapsible** — see B29 |
| A21 | **Auto-playing video or audio** | HARD | Performance, accessibility, and it is not the register |
| A22 | **Superlative or award graphics** | HARD | `POSITIONING.md` §5 item 6 prohibits superlatives in copy; the visual form is prohibited for the same reason |
| A23 | **Alternating or rhythmic full-width section banding** | HARD | Turns a continuous argument into a stack of modules. The site is one ground with things set on it. **Amended 2026-09-01:** the harm is *rhythmic alternation*, not differentiation as such. **At most two deliberate ground changes per page**, marking a genuine set-piece — typically the accountability boundary and the CTA region — are **permitted**, because `16_COMMERCIAL_ENERGY_SYSTEM.md` §4B–C requires pace and emphasis, and a rule forbidding all differentiation forbids emphasis. Never alternating, never per-section, never decorative |

---

## B. MappedSkills-specific anti-patterns

**These exist only because of this firm's strategy and evidence position. Most would be harmless elsewhere.**

| # | Pattern | Ban | Why, for this firm |
|---|---|---|---|
| B1 | **Rendering a not-testable system as a zero** | HARD | **The most specific honesty rule on this site.** Claude and Grok returned no testable result; `AI_SEARCH_LANGUAGE.md` §2 permits no claim of any kind about either. A figure plotting six bars at zero is false; one plotting four and omitting two is misleading by omission. Six shown, four measured, two visually distinct as not-testable — **and distinguishable without colour** |
| B2 | **Any funnel, or any tapering path** | HARD | Brief §14. The run is a chain, not a narrowing shape. **The distance between "the run" and "a funnel" is one designer's decision about tapering** |
| B3 | **A three-step process graphic that reads as three services** | HARD | Explicitly prohibited in `/` Block 3. The three parts are connected, not sequential offerings |
| B4 | **Designing the `/how-it-works` stages figure before the owner supplies the real process** | HARD | The delivery process is an owner input; the page is BLOCKED. A speculative process diagram is fabricated proof in graphic form — and a diagram is *more* quotable than a paragraph |
| B5 | **A disclaimer typeface treatment for limits** — smaller, greyer, italic, bottom-of-page, collapsed | HARD | Explicitly prohibited in `/` Block 4. Limits are set at the same size and quality as claims |
| B6 | **Red-amber-green, or any colour that grades a result** | HARD | MappedSkills does not grade outcomes it does not control. Also fails colour independence |
| B7 | **Aggregating evidence status into a score, percentage, badge or coverage meter** | HARD | It is the AI Visibility Score arrived at by the back door. Rejected on the SERP, inside AI answers, and methodologically |
| B8 | **Any ranking, leaderboard, position graphic, or ordered list implying stable order in AI answers** | HARD | Order changed in every repeated prompt measured. `/research` §1: frequency, not rank. A rank would be a reading of noise |
| B9 | **A single blended figure across AI systems** | HARD | Blending destroys the only stable signal (`AI_SEARCH_LANGUAGE.md` §6) |
| B10 | **Drawing a trend, line or arrow from one measurement** | HARD | There is one measurement. "One measurement is not a trend" is stated in the asset rather than implied |
| B11 | **A hub-and-spoke source diagram with the client's own site at the centre** | HARD | States the opposite of the strategy. Appearing in AI answers is mostly an **off-site** source-authority problem, and "owned-site publishing cannot substitute for it" |
| B12 | **AI rendered as a visual theme** — purple gradients, brains, robots, sparkles, chat bubbles, neural wallpaper, a prompt field as a hero, a dark AI app shell | HARD | Brief §17. Would over-weight AI instantly and violate the approved subordination rule regardless of the copy |
| B13 | **Magnifying glasses, search-engine logos, "#1" imagery, SERP screenshots as wallpaper** | CONDITIONAL — a **real** SERP or AI-answer excerpt, dated, annotated and labelled, is legitimate evidence | The ban is on search iconography as decoration and on generic SERP imagery as texture |
| B14 | **A capability card grid on `/` or `/services`** | HARD | Explicitly prohibited in both. Capabilities are positioned by contribution, not listed as a menu |
| B15 | **Any proof container without proof in it**, or a substitute placed in the slot | HARD | Six components in the current codebase render exactly these containers: `HeroDashboard`, `SocialProofStrip`, `StatCard`, `TestimonialCard`, `BeforeAfterMetric`, `CaseStudyCard` |
| B16 | **A sticky CTA on `/how-it-works`, `/research`, `/research/*`, `/blog` or `/blog/*`** | HARD | `PAGE_TYPE_CRO_RULES.md` §§5–7. A persistent sales prompt undercuts the credibility those pages exist to build — and `/research` publishes the firm's own measured zero |
| B17 | **Proof elements on `/contact` or `/schedule-call`** | HARD | §9: "the only job left is not to lose them." Proof here is a distraction |
| B18 | **A branded name for the method, the chain, the run, or any stage** | HARD | `POSITIONING.md` §8: a named framework is explicitly **not** a moat. `MESSAGING_ARCHITECTURE.md` §3 Level 4 prohibits inventing one. This binds figure labels as much as copy |
| B19 | **Reusing "300%+ ROI", "₹100Cr+" or "₹10Cr+" in any visual, mockup or asset** | HARD | `DEC-007`. Currently live in production and being redistributed by AI systems as fact about the company |
| B20 | **Manufactured urgency, response-time promises, countdowns, "limited slots"** | HARD | `/` Block 8 prohibits a response-time number and manufactured urgency |
| B21 | **An "industries" or vertical grid, or manufacturing imagery on any unconditional page** | HARD | Manufacturing is candidate beachhead #1, **not approved specialisation**, and `/industries/manufacturing` is conditional. `/` explicitly does not link to it |
| B22 | **Illustrating a gap as an empty state, a spinner, a "coming soon", or an error** | HARD | A measured zero, an unmeasured stretch and an unattributed enquiry are **findings**. Empty-state grammar frames them as absence-of-content and destroys the site's most distinctive honest device |
| B23 | **A dashed line used decoratively** | HARD | On this site a dashed line **always** means an epistemic gap (`07_VISUAL_GRAMMAR.md` §6.2). Diluting it makes the honest device unreadable |
| B24 | **Making the run ambient** — in the header, as a background, as a loader, as a page transition, as a pattern | HARD | The moment it is everywhere it becomes a brand device, and a brand device shaped like a path is a funnel |
| B25 | **A gated diagnostic** on `/problems/traffic-but-no-enquiries` — email wall, sign-up, download, or a "get your score" | HARD | The page must be completable without contacting anyone. A gate converts it into the doorway page Project Rule 10 forbids, and `PAGE_TYPE_CRO_RULES.md` §3 makes it a CRO constraint too |
| B26 | **A lead score, grade, quality rating or budget-derived qualification shown anywhere** | HARD | `/lead-generation` Move 6 prohibits it. The definition deliberately does not judge fit, value or economics |
| B27 | **Apparatus above the fold on a commercial page** | HARD | Converts a commercial page into a publication in one screen. `17_ARGUMENT_APPARATUS_HIERARCHY.md` §3–4. The single exception is one dated item on the homepage hero |
| B28 | **A limit stated before the capability it limits** | HARD | A page that qualifies before it claims has argued itself down before the reader knows what is on offer. Order: what we do → what we are accountable for → where that stops |
| B29 | **A collapsible or collapsed limits section** | HARD | Everything else in the apparatus may be expandable. The accountability boundary, attribution limits and what is not promised stay open at every screen size. A collapsed limit is a hidden limit |
| B30 | **Apparatus inside or adjacent to a CTA region** | HARD | Selling beside a caveat weakens both. CTA regions carry no provenance, no scope note and no limit |
| B31 | **Archival or paper skeuomorphism** — aged or textured paper, faux print or letterpress, newspaper column rules and mastheads, typewriter or courier styling, file-folder / index-card / dossier metaphors, rubber-stamp graphics, "issue" or "volume" framing | HARD | The failure mode the internal territory name invites. **The Record is a working record, not an archive** (`16_COMMERCIAL_ENERGY_SYSTEM.md` §7). A serif-and-cream costume standing in for rigour is the opposite of the direction |
| B32 | **Honesty by volume** — gaps, limits, unmeasured states and not-testable markers accumulating more visual weight on a page than what the firm does and is accountable for | HARD | Honesty rendered without proportion becomes apology, and a buyer reads apology as incapacity. The proportion rule, `17_ARGUMENT_APPARATUS_HIERARCHY.md` §4.4 |

---

## C. Things deliberately NOT banned

Recorded so the list reads as judgement rather than as taste, and so a designer does not over-apply it.

| Not banned | Condition |
|---|---|
| **Cards** | For genuinely discrete comparable items — research entries, articles. Rule-bounded, not filled and shadowed |
| **Tables** | Encouraged where content is genuinely tabular (`VOICE_AND_TONE.md` §13). Much of this site's material is |
| **Dark mode** | As a **user preference**, correctly implemented. Never as the brand |
| **Monospace** | As the apparatus register at small optical sizes. Never as headline, body, hero, or a credibility signal |
| **Real screenshots** | Real SERPs, real AI answers, real analytics — dated, annotated, labelled as excerpts |
| **Photography** | Named, identified people and real specific places only |
| **Motion** | Where it resolves an uncertainty and has a complete static state |
| **A prominent phone number and WhatsApp** | Required. Observed as a genuine credibility signal in this market, and required by `/` Block 8 and `PAGE_TYPE_CRO_RULES.md` §10 |
| **Large type** | The argument register is meant to be plain and large |
| **A sticky CTA** | On the page types where the approved CRO rules permit it — and only there |
| **Colour** | Where it marks, or distinguishes known from unknown. Never where it grades |
| **Scroll containers** | All content present, keyboard-accessible, no paging. Required for wide tables on narrow screens. Not a carousel — see A19 |
| **Deliberate ground change** | At most two per page, marking a genuine set-piece. Not alternating — see A23 |
| **Expandable evidence disclosure** | The apparatus pattern. Not an accordion hiding limits — see A20 and B29 |
| **Emphasis** | Required. Consequence carries the heaviest treatment on a page (`16` §4C) |

---

## D. The five tests before any screen is submitted

Modelled on the four copy tests in `VOICE_AND_TONE.md` §14, which remain binding on copy.

1. **The swap test.** Replace every word with a competitor's. If the design still works, it fails.
2. **The empty-container test.** Point at every container. If any could hold proof MappedSkills does not have, remove the container — not just its contents.
3. **The greyscale test.** Print it in greyscale. If any status, state or figure becomes ambiguous — especially a measured zero versus a not-testable system — it fails.
4. **The "how do you know that?" test.** Ask it of every number, chart and figure. Each must have a visible answer in the apparatus.
5. **The screenshot test.** Screenshot any figure with motion disabled. If it no longer carries its information, the figure is wrong.
6. **The standalone test** *(added 2026-09-01)*. Hide every apparatus element. **The page must still sell.** If it does not, the apparatus has been made load-bearing — `17_ARGUMENT_APPARATUS_HIERARCHY.md` §1.
7. **The first-fixation test** *(added 2026-09-01)*. On any screen, if the eye lands first on a date, sample, status mark or method note, the screen is wrong regardless of how good it looks.
8. **The proportion test** *(added 2026-09-01)*. Weigh every gap, limit and dashed state against what the firm does and is accountable for. If the gaps win, the page reads as incapacity — B32.
