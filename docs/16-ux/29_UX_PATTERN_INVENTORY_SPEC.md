# UX Pattern Inventory — Specification for the Remaining Gate 9B Deliverable — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Defines Gate 9B deliverable B. **The inventory itself is not produced in this pass.**

> **This is not a React or implementation component inventory.** It describes **recurring structural elements and their behaviour**. Implementation components are Gate 13; visual component design is Gate 10.

---

## 1. Is the existing set sufficient?

**`17_REUSABLE_UX_PATTERNS.md` defines 11 patterns. Assessment: necessary, not sufficient.**

**Two gaps, both found by testing the patterns against the wireframe set in `28`.**

### Gap 1 — three recurring structural elements have no pattern

| Missing | Where it recurs | Why it qualifies |
|---|---|---|
| **P12 — Breadcrumb** | 5 route families | It has genuine where-permitted and where-prohibited rules, a responsive form, an accessibility requirement, and a schema-parity constraint. **It is currently specified only inside a navigation document, which is where it will be forgotten** |
| **P13 — Figure wrapper** | Every route carrying a figure | Caption, provenance placement, static-state requirement, text equivalent, print behaviour, keyboard reach. **These rules are currently distributed across `10` and `11` and are not attached to a single named thing a wireframe can reference** |
| **P14 — Long-form reading scaffold** | `/how-it-works`, research entries, articles | Reading column, heading rhythm, table of contents behaviour, byline placement, the no-sticky rule, the return path. **Currently spread across three documents** |

### Gap 2 — no pattern captures the required fields

The twelve fields below are the inventory's purpose. **`17`'s existing entries capture five of them.** Seven are missing from every pattern: content requirements · responsive behaviour · accessibility requirement · evidence behaviour · known variants · owner dependency · technical dependency.

### What is deliberately **not** added

**The header/navigation and the footer/entity block are sitewide *regions*, not patterns.** They appear once per page, identically, with no where-prohibited rules. **They are inventoried separately as two regions** against the same twelve fields, so their behaviour is captured without inflating the pattern count.

**And no micro-components are created.** No "button", no "link", no "heading", no "input". The inventory describes structures with behaviour, not the smallest visual units.

---

## 2. The required scope

> **14 patterns + 2 sitewide regions. Sixteen entries. No more.**

| # | Pattern | Source |
|---|---|---|
| P1 | Commercial opener | Existing |
| P2 | Capability routing | Existing |
| P3 | The run wrapper | Existing — **must now carry the FULL / PARTIAL / STATE / NONE taxonomy** |
| P4 | Evidence disclosure | Existing |
| P5 | The limits block | Existing |
| P6 | Problem diagnostic | Existing — **must now record that the recording affordance is NOT APPROVED for launch** |
| P7 | Fit test | Existing |
| P8 | Contact block | Existing — **must now carry the corrected H4 rule: available, not omnipresent** |
| P9 | Metadata-forward entry card | Existing |
| P10 | Conversion surface | Existing — **must now carry the `/contact` ↔ `/schedule-call` separation** |
| P11 | Return-to-decision link | Existing |
| **P12** | **Breadcrumb** | **NEW** |
| **P13** | **Figure wrapper** | **NEW** |
| **P14** | **Long-form reading scaffold** | **NEW** |
| **R1** | **Header and primary navigation** *(region)* | **NEW** |
| **R2** | **Footer and entity block** *(region)* | **NEW** |

---

## 3. The twelve fields, defined

Every entry captures all twelve. **A field with no content is written as "none", not omitted** — an absent field is indistinguishable from an unconsidered one.

| # | Field | What it must state |
|---|---|---|
| 1 | **Name** | Stable, and used identically in every wireframe annotation |
| 2 | **User job** | What the reader accomplishes. **Not what the business wants** |
| 3 | **Content requirements** | What must be present for the pattern to render at all, and what is optional. **This is the field that makes blocked slots visible** |
| 4 | **Interaction behaviour** | Every state, every input method, and what happens without JavaScript |
| 5 | **Responsive behaviour** | The transformation between width classes, and **what must never be dropped** |
| 6 | **Accessibility requirement** | Semantics, keyboard, focus, announcement, contrast independence, touch target |
| 7 | **Evidence behaviour** | Which apparatus visibility state applies, and whether limits appear — **the field that prevents the apparatus rules being lost at component level** |
| 8 | **Allowed page types** | Named explicitly |
| 9 | **Prohibited page types** | Named explicitly, **with the rule that prohibits it** |
| 10 | **Known variants** | Each with the difference it expresses. **A variant without a stated difference is a duplicate** |
| 11 | **Owner dependency** | Which owner input it needs, and **its omission behaviour under `26`: case 0, A or B** |
| 12 | **Technical dependency** | What must exist for it to function, and what it degrades to |

---

## 4. Fields 11 and 12 carry the most weight

**They are the reason this is a UX inventory and not a style list.**

Nine of the sixteen entries have an owner or technical dependency:

| Entry | Dependency | Omission behaviour |
|---|---|---|
| **P8 — contact block** | Published phone number *(owner)* | **B** — the region renders, the DIRECT control does not |
| **P10 — conversion surface** | Endpoint, persistence, email; a working booking surface *(technical)* | **Case 0** — the routes do not launch |
| **P13 — figure wrapper** | F7 needs the own-site fixes; **F17 is BLOCKED and must not be drawn** | **A** |
| **P14 — long-form scaffold** | Named authorship *(owner)* | **Case 0** for the assets themselves |
| **P5 — limits block** | None. **Deliberately** — it must never be blocked | — |
| **P9 — entry card** | Which entries publish *(owner)*; own-site fixes *(technical)* | **A** |
| **P6 — problem diagnostic** | None. **The reason this route can be built first** | — |
| **R2 — footer / entity block** | Complete NAP *(owner)* | **A** — the entity block does not render rather than render a partial address |
| **P2 — capability routing** | The conditional vertical item *(the manufacturing gate)* | **A**, **removable in a single change** |

**Two entries have no dependency at all — P5 and P6 — and that is worth stating,** because they are the two the programme can build immediately and the two that carry the most of the site's honesty.

---

## 5. Acceptance criteria for the inventory

| # | Criterion |
|---|---|
| 1 | **Sixteen entries. No more, and no micro-components** |
| 2 | **Every entry captures all twelve fields**, with "none" written where a field is empty |
| 3 | **Every pattern used in any wireframe exists in the inventory**, under the same name |
| 4 | **Every pattern in the inventory is used in at least one wireframe** — an unused pattern is a specification nobody needed |
| 5 | **Every prohibition names the rule that prohibits it** — no taste-based bans |
| 6 | **Every owner dependency names its omission case** — 0, A or B, per `26` |
| 7 | **Field 7 is populated for every entry**, including "none — this pattern carries no apparatus", so the apparatus rules survive into component design |
| 8 | **No entry specifies a font, colour, dimension, spacing value or breakpoint** |
| 9 | **The three retired components have no entry**, and `StatCard`/`CaseStudyCard` appear only as noted structural precedents with their banned defaults recorded |

---

## 6. Relationship to the existing components

**Carried from the approved Gate 9A classification. No code was read or modified in this pass.**

| Existing component | Inventory treatment |
|---|---|
| **HeroDashboard**, **SocialProofStrip**, **BeforeAfterMetric** | **No entry.** Retired. **No pattern in the inventory has a place for any of them** |
| **TestimonialCard** | **No entry at launch.** No testimonial exists, so it must not render; its `placeholder` path rendering the literal string `Client Name` **must be removed, not merely unused** |
| **StatCard** | **Not a pattern.** Recorded as a structural precedent inside **P13** only: "a value with adjacent metadata" is close to what the figure wrapper needs — **and its default presentation is the banned pattern.** Any reuse requires a **mandatory** provenance slot: it must be impossible to render a value without one |
| **CaseStudyCard** | **Not a pattern.** Recorded as a structural precedent inside **P9** — a metadata-forward entry card. **The name and its result-oriented fields must go; the structure need not** |

---

## 7. Sequencing

**Produce the inventory after the wireframes, not before.**

The fields that matter most — content requirements, responsive behaviour, known variants — **are discovered by wireframing.** An inventory written first would be a restatement of `17` with seven empty columns.

**Then run the consistency check in both directions:** every wireframe pattern is in the inventory, and every inventory pattern is in a wireframe.

---

## 8. What the inventory pass must not do

Create implementation components · specify visual design of any kind · introduce micro-components · add a pattern without three routes or a rule that must not vary · **modify `17`'s completed analysis rather than extending it** · resolve an owner blocker · **or pass Gate 9B.**
