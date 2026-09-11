# CTA System — UX Behaviour — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `docs/07-cro/CTA_SYSTEM.md` (approved, `DEC-011`) and `CTA_LANGUAGE_SYSTEM.md` (approved, `DEC-013`). **The seven roles, the placement rules, the prohibitions and the candidate wording are not changed here.** This document adds **UX behaviour**: how each role behaves as an interface element, how repetition works, and how mechanism choice is presented.

**No CTA copy is written or selected here.**

---

## 1. The seven roles as UX objects

| Role | What it is, as an interface | Object type | Where it may sit |
|---|---|---|---|
| **PRIMARY** | Creates a qualified enquiry — form or booking | **A distinct object, never a text link inside a paragraph** | Header · first screen on commercial/vertical/pricing/homepage · end of every page |
| **DIAGNOSTIC** | The same conversion, framed for a problem-aware reader | Distinct object | Problem page, below the fold only, after an answer exists |
| **PROOF** | Navigational — the method, the research | **A link, deliberately** — a button would make an offer look like a step | In context, beside the claim it supports |
| **RESEARCH** | Open an entry, or subscribe | Link; subscription is a small form | `/research`, `/research/*` |
| **CONTEXTUAL** | In-content route to the relevant page | Link, inline | Where the relevant point is made |
| **LOW-COMMITMENT** | Read the guide, the problem page, the measurement | Link | After the answer is delivered |
| **DIRECT** | Call or WhatsApp | **A peer object at equal weight to PRIMARY** where it appears, never a smaller "or call us" | **Corrected 2026-09-02 (H4):** `/contact` and `/schedule-call` prominently · header utility · footer entity block · **one instance in the action region of any other page.** Not per-section, not a floating strip |

**The object/link distinction is load-bearing.** A PROOF CTA rendered as a button reads as a step in a flow; the approved rules say it is an offer. A PRIMARY CTA rendered as an inline link on a commercial page makes a reader hunt for the conversion. **Neither is a styling choice.**

---

## 2. The four behavioural rules

**R1 — One primary conversion outcome per page; two surfaces permitted; never a second goal.**
Form and booking may both appear. A newsletter sign-up, a download, a tool, or a second unrelated ask on the same page is a competing goal and is prohibited.

**R2 — CTA position follows the argument, not a rhythm.**
CTAs sit where the relevant point has just been made. **Not at every section end. Not at a fixed interval.** A section that ends without a CTA is the normal case.

**R3 — CTA regions carry no apparatus (B30).**
No provenance, no date, no sample, no scope note, no limit inside or adjacent to a CTA region. Selling beside a caveat weakens both.

**R4 — A CTA never depends on proof that does not exist.**
No "see our case studies", no "read client results", no rating, no client count. `/work` is `noindex` and out of navigation.

---

## 3. Placement and repetition on a long page

**The question a long commercial page raises: how often may the conversion be offered?**

| Position | Rule |
|---|---|
| **Header** | One PRIMARY control, sitewide, identical, non-sticky (see `07` §4) |
| **First screen** | PRIMARY on commercial, vertical, pricing and homepage. **Never** on editorial, research, methodology or the problem page |
| **Mid-page** | CONTEXTUAL and PROOF links only, placed at the point the relevant claim is made. **No PRIMARY object mid-page** unless the page exceeds the length at which a reader would reasonably have lost the first one — and on this site's page lengths, that case does not arise |
| **End of content** | PRIMARY, in its own region, with more space around it than anything preceding. **The pause before it is what makes it read as intentional rather than pushy** |
| **Sticky** | Permitted on homepage, commercial, vertical and pricing pages only. **Quiet, fixed, identical — never expanding, pulsing, animating or changing on scroll.** Prohibited on `/how-it-works`, `/research`, `/research/*`, `/blog`, `/blog/*` (B16); below the fold only, and suppressed inside the checks section, on the problem page |
| **Footer** | Navigational only |
| **Modal, interstitial, exit-intent, entry pop-up** | **Prohibited outright** |

**The repetition budget, stated as a number so it is checkable:** on a commercial page, **at most two PRIMARY objects** — the first screen and the end — plus at most one sticky instance of the same control. Anything beyond that is the "every section ends in a button" anti-pattern, which the brief names explicitly and which this system prohibits.

---

## 4. How the two surfaces are presented together

**Both at equal confidence. Neither framed as the lesser route.**

| Page type | Form | Booking | DIRECT |
|---|---|---|---|
| Homepage | **Leads** | Offered, equal confidence | Peer, at the action block |
| Commercial pages | **Leads** | Offered | Peer |
| Conditional vertical | **Leads** | Offered | **Elevated — this segment calls** |
| Problem page | **Leads**, diagnostic-framed | Secondary, below the fold | Present |
| `/pricing` | Offered | **Emphasised** — price-stage buyers want a person | Peer |
| `/how-it-works`, `/research` | Available, unemphasised, end only | Available, unemphasised | Present |
| `/blog`, articles | **Contextual link only** | **None** | Present in footer only |
| `/about` | **Leads** | Offered | Peer |
| `/contact` | **The surface** | Cross-link | Always visible, equal weight |
| `/schedule-call` | Cross-link | **The surface** | Always visible, equal weight |
| `/thank-you`, legal, 404 | **Neither** | **Neither** | Direct only, on `/thank-you` |

**"Emphasised" and "leads" describe order and prominence, not exclusivity.** Both surfaces remain reachable wherever both are listed.

---

## 5. Phone and WhatsApp

> **CORRECTED 2026-09-02 (H4).** Anti-pattern **B16 takes precedence over `16_COMMERCIAL_ENERGY_SYSTEM.md` §5 R7** where they conflict. **Direct contact is available, not omnipresent.** R7's "persistent... sitewide" wording, carried into this section by Session 13, is superseded. Full table in `21_ORCHESTRATOR_DECISIONS_H1_H5.md` §H4.
>
> **It must not become:** a persistent floating contact strip · a repeated CTA on every section · a second competing navigation system · a high-pressure conversion device.
>
> **Operative rule: one instance per page outside the two conversion surfaces.**

| Requirement | Detail |
|---|---|
| **Weight** | Equal to the form and booking **where it appears** — prominently on `/contact` and `/schedule-call`, elevated on the conditional vertical page, and once in the action region elsewhere. **Never a smaller "or call us"** |
| **Mobile** | `tel:` is one tap. WhatsApp is one tap to the same number |
| **Measurement** | A `tel:` or `mailto:` click emits `phone_clicked` / `email_clicked`. **Never a qualified enquiry — conversion intent only** |
| **Labelling** | The label must not imply an outcome, and **no business hours may be published until the owner confirms them** |
| **Blocked** | **The published phone number is OWNER-BLOCKED.** The WhatsApp action shares the same number and is blocked with it. **Neither renders a placeholder** |

---

## 6. CTA states

| State | Requirement |
|---|---|
| **Default** | Definite, unambiguous edges, high contrast against a quiet ground. **Energy from contrast against restraint, not from size, saturation or a coloured band** |
| **Hover** | Feedback only. Nothing is revealed on hover |
| **Focus** | Visible, distinctive, consistent, part of the identity — never removed, never the low-contrast browser default |
| **Active / pressed** | Immediate feedback |
| **Busy** | On submission only, per `09_FORM_AND_BOOKING_UX.md`. **A navigational CTA never has a busy state** |
| **Disabled** | **Avoided.** A control the reader cannot use, with no stated reason, is a dead end. Where a route genuinely does not exist yet — a blocked phone number, an unpublished research entry — **the control does not render at all** |

**No CTA animates, pulses, bounces, glows or changes on scroll.**

---

## 7. Measurement requirements the UX must satisfy

Every CTA emits its role-appropriate event carrying `cta_role`, `cta_location`, `page_type`, `service`/`problem` context and `conversion_surface` where applicable.

**Two UX consequences:**

1. **Every CTA must be attributable to a location.** `header`, `hero`, `inline`, `section_end`, `sticky`, `footer`, `content`. A CTA that cannot be distinguished from another instance of the same control on the same page cannot be improved.
2. **A CTA click is a diagnostic metric, never a business conversion.** Reporting CTA clicks as conversions is the most common way a funnel report becomes flattering and useless. The UX must not present, imply or design around click counts as outcomes.

**None of this is measurable today** — no analytics runs in production.

---

## 8. Prohibited CTA behaviours

| Prohibited | Harm |
|---|---|
| Every section ending in a button | Converts an argument into a sales sequence; trains the reader to stop reading |
| A PRIMARY CTA above the answer on an article or the problem page | Costs the read and the trust; converts nobody |
| A sticky CTA on a credibility surface | Undercuts the job the page exists to do (B16) |
| A CTA inside or beside an apparatus region | B30 |
| A modal, interstitial, exit-intent or entry pop-up | A18; `PAGE_TYPE_CRO_RULES.md` §11.4 |
| Manufactured urgency, countdowns, "limited slots", scarcity | B20; dark pattern |
| Confirmshaming on a decline | Dark pattern |
| A CTA promising an outcome — rankings, citations, enquiries, revenue, ROI | `DEC-007`, `BUSINESS_STRATEGY.md` §5 |
| "Free" framing before the entry-offer decision | Undecided; every competitor examined offers a free audit |
| A response-time promise | No SLA until one has been measured |
| A generic label — "Learn more", "Click here", "Read more" | Carries no information about the destination |
| "Contact us" as the primary control on a commercial, vertical or pricing page | Carries no information about what the contact is for. Acceptable **only** in utility navigation and the footer |
| A CTA that obscures a form field or the submit control, especially with a mobile keyboard open | Directly costs the conversion it exists to create |
| A second competing goal on any page | R1 |

---

## 9. Open decisions — RESOLVED 2026-09-02

| # | Decision | Status |
|---|---|---|
| 1 | **Which surface the header CTA leads to** | **APPROVED (H2): the enquiry/contact surface.** No form or booking embedded in navigation; no aggressive persistent control. Final visual treatment remains a Gate 10 decision |
| 2 | **Inline form on commercial pages, or route to `/contact`** | **APPROVED (H1): route to `/contact` with context preserved. No inline form.** The ruling names the homepage; its extension to commercial pages is Claude's reading and is flagged in `21` §H1 |
| 3 | **Sticky header versus non-sticky** | **APPROVED (H3): non-sticky by default.** A compact **orientation-only** sticky navigation carrying **no CTA** may be tested on long commercial pages during wireframe validation, under six constraints. An inconclusive experiment does not promote itself |
| 3b | **The R7 / B16 tension** | **RESOLVED (H4): B16 takes precedence. Direct contact is available, not omnipresent** — see §5 |
| 4 | **Final CTA wording per role and per page** | Not this session. Blocked in part on the entry-offer model, which changes PRIMARY and DIAGNOSTIC wording but not this structure |
