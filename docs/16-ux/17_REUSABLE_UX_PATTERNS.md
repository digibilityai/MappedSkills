# Reusable UX Patterns — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**

> **Prefer fewer, stronger patterns. Do not turn every content structure into a "component".**

> **EXTENDED 2026-09-02 — orchestrator correction / gate-scope reconciliation pass.** These eleven are **necessary but not sufficient** for the Gate 9B inventory. Three patterns are missing — **P12 breadcrumb · P13 figure wrapper · P14 long-form reading scaffold** — and two sitewide **regions** (header/navigation, footer/entity block) need inventorying separately. All sixteen entries must additionally capture six fields absent here: content requirements · responsive behaviour · accessibility requirement · evidence behaviour · owner dependency · technical dependency. **Scope: `29_UX_PATTERN_INVENTORY_SPEC.md`.** The analysis below is not rewritten.

**Eleven patterns.** Each earns its place by being used on **at least three routes** or by carrying a rule that must not vary. Anything used once is a page, not a pattern, and is specified in that page's own document.

**These are UX patterns — job, placement, behaviour, prohibitions.** They are **not** component specifications: no layout, dimension, style, prop or implementation appears here. Component design belongs to Gate 10.

---

## P1 — Commercial opener

**Job.** Confirm what the page is about in the reader's own word, bridge to the commercial outcome, and offer the first action — fast, with nothing competing.

**Where used.** Every commercial page · `/services` · `/pricing` · the conditional vertical page · `/about` · `/contact` · `/schedule-call`. **Eight-plus routes.**

**Where prohibited.** Editorial and research pages, which open on their own subject and never on a commercial statement.

**Behaviour.**
- A small number of elements, readable at first paint. Nothing gates it, nothing animates.
- **Zero apparatus.** No date, sample, provenance, status mark, scope note or limit (B27).
- **No figure, no image, no embed.**
- The primary action is a distinct object, not an inline link.

**Variation rules.** The confirmation phrase varies by page (it must). The number of actions varies — one or two. **The presence of apparatus does not vary. It is always zero.**

**The homepage carries the one documented exception sitewide** — exactly one dated, checkable item, clearly subordinate to the H1. **It is unspent at launch: no qualifying candidate exists, so the homepage opens with zero apparatus** (`24_HOMEPAGE_APPARATUS_DECISION.md`).

---

## P2 — Capability routing

**Job.** Let a reader leave for the page they came for, in seconds, with capabilities positioned by **what they contribute** rather than listed as a menu.

**Where used.** `/` Block 5 · `/services` Block 4 · the footer's first column. **Three surfaces, and they must agree.**

**Where prohibited.** Every capability page — a capability page does not list its siblings. `/pricing`, `/contact`, `/schedule-call`, articles, research entries.

**Behaviour.**
- Grouped by contribution, not enumerated.
- **One line per capability.** The detail lives on the page it links to.
- **Every link label describes the contribution**, not the discipline.
- Order reflects the chain, not commercial preference.
- **AI search gets one line. No dedicated section, no hero, no special treatment of any kind.**

**Prohibited.** A card grid of equal weight (B14) · an icon per capability (A13) · a per-capability feature list · "Our services" as a heading · a named framework (B18).

---

## P3 — The run wrapper

**Job.** Present one recognisable object where the chain is genuinely the page's subject, in the class appropriate to that page.

> **CORRECTED 2026-09-02 — `22_F1_USAGE_TAXONOMY.md` is BINDING.** **NONE is the default class; a route earns FULL, PARTIAL or STATE by argument.** F1 appears on **6 unconditional routes, not 8**.

**Where used.** **FULL** — `/` Block 3 · `/services` · `/how-it-works`. **PARTIAL** — `/seo` *(discovery)* · `/conversion-optimization` *(landing/enquiry)* · `/industries/manufacturing` *(conditional)*. **STATE** — `/` Block 4 · `/lead-generation`. **NONE** — `/ai-seo`, `/google-ads`, `/social-media-ads`, and every other route.

**Where prohibited.** **Anywhere ambient** — the header, a background, a loader, a page transition, a pattern (B24) · `/contact`, `/schedule-call`, `/thank-you` · any first screen · inside or beside a CTA region.

**Behaviour.**
- Complete and readable statically, with a text equivalent, at every width.
- **One instance per page, and one figure of full weight per page.**
- Emphasis is set by the page; the object is not redrawn.
- Optional single non-blocking reveal; complete without it.

**Variation rules.** **Class** (FULL / PARTIAL / STATE), emphasis and depth vary. **Geometry, labels, the boundary, the dashed stretches and the unattached arrival do not** — and a PARTIAL is a segment at full legibility, never the whole figure shrunk.

---

## P4 — Evidence disclosure

**Job.** Make a claim's provenance reachable in one action, in place, at zero cost to a reader who does not want it.

**Where used.** Every commercial page's mid-page claims · articles · `/faq` · `/services` · `/about`. **Sitewide.**

**Where prohibited.** First screens · CTA regions · `/contact`, `/schedule-call`, `/thank-you` · **anything that is a limit** (P5 governs those) · nested inside another disclosure.

**Behaviour.** Full contract in `10_EVIDENCE_INTERACTION_UX.md` §4. In summary: native and semantic · content always in the DOM · opens in place · no layout shift above the reader's line · the control names what it reveals · keyboard operable · no hover · deep-linkable · **open in print** · works without JavaScript.

**Variation rules.** What it contains varies. **How it behaves never varies** — one pattern sitewide is what makes the apparatus recognisable.

---

## P5 — The limits block

**Job.** State the accountability boundary, the attribution limits, or what is not promised — **as a position, at full weight, always open.**

**Where used.** `/` Block 4 · every commercial page's move 5 · `/services` Block 3 · `/how-it-works` §4–§5 · every research entry's limitations · `/pricing` fit section.

**Where prohibited.** Above the fold on a commercial page · before the capability it limits · inside or adjacent to a CTA region · below a CTA · on `/contact`, `/schedule-call` or `/thank-you`.

**Behaviour.**
- **ADJACENT-SECONDARY and never collapsible, at every screen size** (B29).
- Same contrast, same size, same type quality as the claims it qualifies.
- **Follows the capability it limits** (B28).
- Subject to the proportion rule — it must not out-weigh what the firm does (B32).

**Prohibited.** A disclaimer typeface treatment — smaller, greyer, italic, bottom-of-page, collapsed (B5) · hedging, legalese or an apology · a warning colour · red-amber-green (B6).

**This is the pattern most likely to be quietly degraded during design, and the one to check first at every review.**

---

## P6 — Problem diagnostic

**Job.** Hand the reader an instrument they can operate without contacting anyone, and let it end in a direction rather than a verdict.

**Where used.** `/problems/traffic-but-no-enquiries` (full) · `/conversion-optimization` (shallow) · potentially future problem pages.

**Where prohibited.** Every other page type. **A diagnostic on a commercial page is a lead-capture device wearing a diagnostic's clothes.**

> **CORRECTED 2026-09-02 (H5).** The recording affordance is **NOT APPROVED for launch**. The instrument is **static, ungated, complete without interaction, and must print and save cleanly by ordinary browser behaviour.** No local state, no persistence, no scoring, no completion tracking, no browser storage. Phase 2 / research-required only.

**Behaviour.**
- **Completable with no tool, no sign-up, no download, no email, no score** (B25).
- Each step ends in a **named observable outcome**.
- The static form is **the only form at launch**. Any future recording affordance would be local, ungated, optional and never required — **and is not approved.**
- Outcomes that point away from the firm carry **equal weight and equal openness** to those that do not.
- **No CTA inside the instrument.**

**Prohibited.** A score, grade, percentage or rating · a diagnosis presented as certain · any implication of frequency or likelihood · red-amber-green · transmitting recorded outcomes to a server · a CTA placed directly beneath an outcome that told the reader they do not need an agency.

---

## P7 — Fit test

**Job.** Let a poor-fit buyer establish that they are a poor fit and leave **without enquiring** — which is the pattern working, not failing.

**Where used.** `/` Block 7 · `/pricing` §6 · `/services` Block 8 · `/about` §7.

**Where prohibited.** Above the fold anywhere · `/contact`, `/schedule-call` · articles and research entries.

**Behaviour.**
- Both sides stated: who this is for, and who it is not for.
- **No disparagement** of the businesses this is not for, and no disparagement of cheaper suppliers.
- Plainly readable; not collapsed; not below the final CTA.
- **No revenue, turnover or headcount threshold** — the approved ICP deliberately sets none, and inventing one here would be a strategy decision made in design.

---

## P8 — Contact block

**Job.** Offer both surfaces at equal confidence with direct contact as a peer.

**Where used.** The end of `/`, every commercial page, `/services`, `/pricing`, `/about`, the conditional vertical page · the header utility · the footer.

> **CORRECTED 2026-09-02 (H4).** **B16 takes precedence over R7: direct contact is available, not omnipresent.** Prominent on `/contact` and `/schedule-call`, elevated on the conditional vertical page, present in the header utility and the footer entity block — and **one instance per page** in the action region elsewhere. **Never a floating strip, never repeated per section, never a second navigation system.**

**Where prohibited.** Mid-page on any page · inside a limits region · on `/thank-you` beyond the urgent route · on legal pages.

**Behaviour.**
- Its own region, with **more space around it than surrounding content** — the pause is what makes it read as intentional.
- **Phone and WhatsApp at equal weight to the form and booking *where the pattern appears*. Never a smaller "or call us"** — and never repeated beyond one instance per page outside the two conversion surfaces.
- **Zero apparatus** (B30).
- `tel:` is one tap on mobile.
- A phone or email click is **conversion intent, never a qualified enquiry**.

**Prohibited.** A response-time number · business hours until the owner confirms them · manufactured urgency · a second competing goal · a "free" framing before the entry-offer decision · a case-study CTA.

**Blocked:** the published phone number is an owner input. **It renders no placeholder, and the WhatsApp action is blocked with it.**

---

## P9 — Metadata-forward entry card

**Job.** Present a discrete item — a research entry or an article — with the metadata that makes it trustworthy visible on the card itself.

**Where used.** `/research` index · `/blog` index · related-content modules on articles and entries.

**Where prohibited.** **Capabilities** (P2 governs those; a capability card grid is prohibited) · commercial pages · `/pricing` · anything that is not a genuinely discrete comparable item.

**Behaviour.**
- **Research cards carry date · systems or scope · sample · version, IMMEDIATE.** This is what distinguishes the index from a blog listing.
- **Article cards carry the byline and date.**
- Rule-bounded, not filled and shadowed.
- **A research card's image is a crop of the actual figure** — never a stock image or an abstract.
- **A module that cannot be filled with genuinely relevant items does not render.** No padding, no "coming soon".

**This is the one place cards are legitimate on this site,** and the reason is that these are genuinely discrete comparable items.

---

## P10 — Conversion surface

**Job.** Complete the enquiry without losing anyone, and be honest about every state.

**Where used.** `/contact` (form) · `/schedule-call` (booking) · `/thank-you` (the confirmed state).

**Where prohibited.** Everywhere else. **APPROVED 2026-09-02 (H1): commercial pages and the homepage route to `/contact` with context preserved and carry no inline form.** `/contact` is the dedicated enquiry surface, and it is the only place on the site with a form.

**Behaviour.** Full specification in `09_FORM_AND_BOOKING_UX.md`. The pattern's invariants:
- **Zero apparatus, zero figures, zero proof on the page** (B17).
- One step. Four required fields. **Budget never re-added.**
- Values preserved through every failure.
- **Success shown only after the server confirms durable persistence.**
- **Screening outcomes are invisible to the visitor** — qualified, unqualified, review-required and spam all see the same success.
- **Never a false success. Never a silent failure.**

---

## P11 — Return-to-decision link

**Job.** Make the proof detour reversible, so a reader who chose to evaluate can get back to the commercial decision they left.

**Where used.** `/how-it-works` · `/research` · `/research/{slug}` · `/about` · articles.

**Where prohibited.** Commercial pages, which do not need one · `/contact`, `/schedule-call`, `/thank-you`, which must not offer routes away from a decided visitor.

**Behaviour.**
- Contextual where the origin is known — the specific capability or page the evaluation was about; `/services` where it is not.
- **A link, not a CTA object.** It is navigation, not conversion.
- Placed after the content it follows, never interrupting it.
- **On research and methodology pages it is not accompanied by a sticky CTA** (B16).

**Journey G depends on this pattern existing.** A proof page that dead-ends turns an evaluator into a bounce.

---

## What is deliberately **not** a pattern

Recorded so the restraint reads as judgement.

| Not a pattern | Why |
|---|---|
| **A hero** | Every page's opening does a different job. Genericising them produces the template this system exists to avoid |
| **A stats block** | There are no statistics to put in one, and the container would be a proof container without proof (B15) |
| **A testimonial** | None exists, and the current component is built to render a placeholder client name |
| **A logo wall / social proof strip** | Nothing to put in it. The existing component hard-codes prohibited claims |
| **A before/after metric** | Prohibited as a metric pair. The surviving idea is F7, a dated **state pair** on the firm's own property |
| **A pricing table** | One price surface exists, and it is blocked. A pattern for one blocked page is premature |
| **A section wrapper with a standard header** | Section shape follows the argument (A15) |
| **A CTA band** | Full-width coloured CTA bands are prohibited; P8 is a region, not a band |
| **A newsletter block** | Research subscription lives on `/research` only, and it is not a sitewide module |
| **A tab set** | Nothing in the architecture needs tabs, and tabs risk hiding content from retrieval |

---

## Pattern coverage check

| Route family | Patterns used |
|---|---|
| `/` | P1 · P2 · P3 · P4 · P5 · P7 · P8 |
| `/services` | P1 · P2 · P3 · P4 · P5 · P7 · P8 |
| Commercial pages | P1 · P3 · P4 · P5 · P8 |
| `/problems/*` | P4 · P5 · P6 · P8 |
| `/pricing` | P1 · P4 · P5 · P7 · P8 |
| `/how-it-works` | P3 · P4 · P5 · P8 · P11 |
| `/research`, entries | P4 · P5 · P9 · P11 |
| `/blog`, articles | P4 · P9 · P11 |
| `/about` | P1 · P4 · P5 · P7 · P8 · P11 |
| `/contact`, `/schedule-call`, `/thank-you` | P1 · P10 |
| Conditional vertical | P1 · P3 · P4 · P5 · P8 |

**Every pattern is used on at least three routes. No route requires a pattern that does not exist here.**

---

## Existing component kit — where implementation conflicts with this system

**Read-only classification carried from `20_CORRECTION_PASS_GOVERNANCE.md` §3 (approved as future implementation guidance, `DEC-015`). No code was inspected or modified in this session; nothing below is a code change.**

| Component | Class | Conflict with the UX system above |
|---|---|---|
| **HeroDashboard** | **RETIRE** | Fabricated-dashboard pattern, metric counters, and hard-coded prohibited claims. **No pattern here has a place for it** |
| **SocialProofStrip** | **RETIRE** | The credibility-wall slot with prohibited claims baked in. **P1 explicitly excludes it from every opener** |
| **BeforeAfterMetric** | **RETIRE as a metric pair** | The concept survives only as F7 — a dated **state pair** of conditions on the firm's own property, never a numeric pair with an improvement claim |
| **TestimonialCard** | **CONDITIONAL** | Permitted only with written permission, a real name and a date. **It carries a `placeholder` prop rendering the literal string `Client Name`; that path must be removed, not merely unused.** No testimonial exists, so it must not render at all |
| **StatCard** | **Neutral primitive, banned default** | Structurally "a value with adjacent metadata", which is close to what P4 needs. **Its default presentation — large centred accent numeral, uppercase label — is the banned pattern.** Any reuse requires a **mandatory** provenance slot: it must be impossible to render a value without one |
| **CaseStudyCard** | **Neutral primitive** | Structurally a metadata-forward entry card, which is what **P9** needs. **The name and its result-oriented fields must go**; the structure need not |

**Two further implementation assumptions that conflict with this UX system, flagged rather than fixed:**

1. **Four of five service pages hand-roll their hero** rather than using the shared one — five pages that should be one opener are two implementations. **P1 assumes one.**
2. **Dark mode is hard-forced in the root layout** and the light palette is unreachable, while the theme provider is dead code. **The direction is light-first, and dark mode is a user preference, never the brand.** This is a structural unwind, not a styling change.
