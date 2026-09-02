# UX Anti-Patterns — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `14_DESIGN_ANTI_PATTERNS.md` (approved, `DEC-015`, **binding on Gate 9B**). **A1–A23 and B1–B32 are carried in full and are not restated here.** This document adds **UX-specific prohibitions only**, and only where the approved list does not already cover the behaviour.

---

## 0. The standard applied

> **A pattern is banned when it harms this strategy — not because it is fashionable, and not because it is to somebody's taste.**

Every entry below states **the harm to this firm** and names the approved rule it derives from or extends. **Where the approved list already prohibits something, it is not duplicated here** — the approved list is the authority.

**Two categories, as in the approved list:** **HARD** — never, without an owner decision recorded in `DECISION_LOG.md`. **CONDITIONAL** — permitted only under the stated condition.

**Nothing is banned here on taste.** Section 3 records what is deliberately *not* banned, so the list reads as judgement.

---

## 1. UX-specific anti-patterns

| # | Pattern | Ban | The harm to *this* strategy |
|---|---|---|---|
| **U1** | **Every section ending in a CTA** | HARD | Trains the reader to stop reading, converts an argument into a sales sequence, and directly contradicts the approved placement rule that CTAs sit where the relevant point is made rather than at a fixed interval. **On a site whose case rests on a considered middle, it is the fastest way to lose the middle** |
| **U2** | **A forced journey sequence** — a page or flow that requires the reader to pass through a step to reach the conversion | HARD | The approved architecture makes proof an offer and never a step (`DEC-010` 5c). Extends the same rule to any step: a diagnostic, a figure, a qualification question, a "choose your situation" gate. **The readiest buyers are the ones a detour costs** |
| **U3** | **A proof detour dressed as navigation** — a commercial CTA that leads to `/how-it-works` or `/research` instead of the conversion | HARD | Violates 5c by another route. A PROOF control is a link and leads to proof; a PRIMARY control leads to the conversion. **Swapping them is interposing proof while appearing not to** |
| **U4** | **A demoted honest outcome** — an outcome that points away from MappedSkills set smaller, greyer, collapsed, reordered later, or placed below the ones that route to the firm | HARD | The problem page's three away-pointing outcomes are its credibility and its ranking argument. **Demoting them is a dark pattern with good manners**, and it is the most likely single revision a conversion-minded editor would make |
| **U5** | **A CTA placed directly beneath an outcome that told the reader they do not need an agency** | HARD | Confirmshaming by adjacency. Dark patterns are prohibited outright; this is the form the prohibition would be violated in on this specific page |
| **U6** | **Two sticky elements competing at once**, or any sticky element that obscures content, a form field, the submit control, or anything while a mobile keyboard is open | HARD | Directly costs the conversion it exists to create, and on a small viewport it is the most common self-inflicted conversion loss. Named in the approved form spec |
| **U7** | **A disclosure whose content is fetched when it opens** | HARD | Content not in the DOM is invisible to search, to retrieval systems, to in-page find, and to a reader without script. **On a site written to be quoted accurately, that is a direct cost** — the same harm A19 identifies in carousels |
| **U8** | **A disclosure control that does not name what it reveals** — a bare chevron, "More", "Details", "Learn more" | HARD | The apparatus is credible because it is legible. An unnamed control is a cost with no signal, and it fails the link-purpose requirement simultaneously |
| **U9** | **A layout shift that moves the text the reader is currently reading** when a disclosure opens | HARD | Named in the approved responsive principles. It punishes the exact behaviour the site wants to encourage |
| **U10** | **Nested disclosures** | HARD | Two actions to reach provenance is not "one deliberate action", and a maze of evidence reads as evasion rather than openness |
| **U11** | **An "expand all" or global evidence toggle** | HARD | Makes the apparatus a feature the reader operates rather than a property of the page, and invites a "collapse all" that hides limits |
| **U12** | **A multi-step form**, or progressive disclosure of a required field | HARD | Four required fields do not justify it, and every step is an abandonment surface. Named in the approved form spec |
| **U13** | **A visitor-facing screening message** — a disposable-email warning, a "please use a work email" hint, a domain caution, or any new field added to support screening | HARD | Screening outcomes are invisible by design. Such a message either insults a legitimate enquirer or teaches an abuser exactly what to change. **The approved definition routes uncertainty to Review Required, never to rejection or to a prompt** |
| **U14** | **A disabled control with no stated reason** | CONDITIONAL — permitted only as the busy state of a submit control during submission | A dead end. Where a route genuinely does not exist yet — a blocked phone number, an unpublished research entry — **the control does not render at all** |
| **U15** | **A container held open for content that does not exist**, including a reserved "people" or "case studies" region rendering an empty state | HARD | B15 prohibits a proof container without proof; this extends it to **structural reservations**. A reserved position may exist in the design's logic; **it must render nothing** |
| **U16** | **Infinite scroll on any index** | HARD | Hides content from crawlers, breaks the back button, and makes an item unaddressable — on the two indexes whose whole job is making entries findable and citable |
| **U17** | **Duplicated content solely for layout** — a claim repeated in a mobile and a desktop variant, or a section rendered twice at different widths | HARD | Two sources drift, and on a site written to be quoted, a duplicated claim is a claim that can be quoted in two versions. It is also a direct search-duplication cost |
| **U18** | **A breadcrumb, nav label, heading or figure caption carrying a rejected category term** | HARD | The approved copy confines "CRO" to `/conversion-optimization`'s title and meta description only. **Navigation and figure labels are copy**, and this is the most likely place the confinement leaks |
| **U19** | **An unlabelled or unnamed navigation landmark, or a dropdown parent that is not a link** | HARD | The second is a **verified current defect** that makes `/services` unreachable by keyboard from the header. Both are structural, not cosmetic |
| **U20** | **A related-content module padded to a fixed count**, or one that renders "coming soon" | HARD | Filling a module with weak items is the visual form of writing around the proof deficit, which the approved copy explicitly refuses to do |

---

## 2. Anti-patterns tested and found already covered

The brief listed several patterns to test. **Each is already prohibited by an approved rule, and is recorded here with its source rather than duplicated as a new ban.**

| Tested pattern | Already prohibited by |
|---|---|
| Excessive tabs | Not banned as such, but no tab set exists in the architecture. **Any tab region must keep all panels in the DOM** (the A19 harm) — recorded in `15_SEARCH_DISCOVERY_UX.md` §1 |
| Hidden essential evidence | **A20, B29** — limits are never collapsible; accordions may not hide anything needed to evaluate a claim |
| Mega-menu complexity | `NAVIGATION_ARCHITECTURE.md` §1.2 — no mega-menu; one dropdown, five or six children |
| Accordions hiding primary content | **A20 CONDITIONAL** — permitted on `/faq` only |
| Carousels for core information | **A19 HARD**, with the amendment that a **scroll container is not a carousel** and is required for wide tables at narrow widths |
| Fake interactive diagnostics | **B25, B7, B26** — no gate, no score, no grade, no rating |
| Modal-heavy flows | **A18 HARD**, and `PAGE_TYPE_CRO_RULES.md` §11.4 bans modals, interstitials and exit-intent outright |
| Scroll-jacking | **A6 HARD** |
| Sticky elements competing on mobile | Partly covered by the approved CTA placement rules; **U6 states the full prohibition** |
| Unnecessary multi-step forms | `FORM_AND_BOOKING_SPEC.md` §2; **U12** states it as a ban |
| Duplicated content solely for layout | Not previously stated as a UX ban; **U17** adds it |

---

## 3. Deliberately **not** banned

Recorded so a designer does not over-apply the list, and so the bans above read as judgement rather than reflex.

| Not banned | Condition |
|---|---|
| **Scroll containers** | All content in the DOM, keyboard-accessible, no paging. **Required** for wide tables and comparisons at narrow widths |
| **Cards** | For genuinely discrete comparable items — research entries, articles. Rule-bounded, not filled and shadowed |
| **Tables** | Encouraged where content is genuinely tabular. Much of this site's material is |
| **Disclosure** | The apparatus pattern. It is the site's characteristic interaction |
| **An accordion on `/faq`** | Each item a genuine discrete question |
| **A sticky CTA** | On the page types the approved CRO rules permit, and only there |
| **Sequential reveal on a figure** | Once, non-blocking, complete without it |
| **Hover feedback** | Supplementary only. Everything it reveals is reachable by tap and keyboard |
| **A prominent phone number and WhatsApp** | **Required.** Observed as a genuine credibility signal in this market |
| **Long pages** | `/how-it-works` and research entries are long because the content is. Length is not a defect; **unstructured length is** |
| **Repeating the conversion at the end of a page** | Expected. The ban is on repeating it at every section end (U1) |
| **Two deliberate ground changes per page** | Marking a genuine set-piece. Never alternating, never per-section |
| **Emphasis** | Required. Consequence carries the heaviest treatment on a page |
| **A reserved position for blocked content in the design's logic** | Provided it renders nothing (U15) |

---

## 4. The tests, extended to UX

The approved list carries eight tests. **Three UX-specific tests are added; they do not replace any of the eight.**

| # | Test | Fails if |
|---|---|---|
| **U-T1** | **The no-script, no-hover, greyscale test.** Disable JavaScript, use only a keyboard, render in greyscale | Any claim's evidence is unreachable · any status is ambiguous · any limit is invisible · any destination is unreachable |
| **U-T2** | **The detour test.** From any page, count the steps to the conversion | Any page requires more than one action to reach a conversion surface, or interposes anything between the reader and it |
| **U-T3** | **The away-outcome test.** On the problem page, compare the three outcomes that point away from MappedSkills with the ones that do not | They differ in size, weight, contrast, default openness, or order priority |

**And the three carried tests that matter most at this gate**, restated because they are the ones that degrade gradually and invisibly:

- **The standalone test.** Hide every apparatus element. **The page must still sell.**
- **The first-fixation test.** On any screen, the eye must not land first on a date, sample, status mark or method note.
- **The proportion test.** Gaps and limits must not out-weigh what the firm does and answers for.
