# MappedSkills Brand DNA 4.0 (APPROVED DESIGN DIRECTION)

**Approval:** the owner approved revision 3 as the design direction on 1 November 2026, with four final corrections, applied here as revision 4. This approves a direction only. It does **not** authorise a site-wide redesign, implementation, commit, push, deployment or Contentful change; each implementation batch needs its own authorisation. Recorded in `DECISION_LOG.md` as DEC-118 (D-13), on the local homepage branch `feat/brand-dna4-homepage`.
**Status:** revision 4, 1 November 2026. Decisions marked OPEN in section E remain open within the approved direction.
**Visual reference:** the approved homepage, THE RESOLVE R3, as it stands on `main` `def66d2` (identical homepage code to live `0551b89`).
**Supersedes:** nothing. It extends Brand DNA 3.0 (24 October 2026) and the DEC-091 typography conventions; it does not replace approved logo artwork, colours, fonts or frozen page designs.

## How to read this document

Every important statement carries one label:

| Label | Meaning |
|---|---|
| **VERIFIED** | Read from code, Git, a decision record or the live site |
| **OWNER REQUIREMENT** | Direction given by the owner for this proposal (1 November 2026); still needs recording as a DEC entry |
| **RECOMMENDATION** | Proposed by this document; not a rule until approved |
| **OPEN** | Needs an owner decision |

Measurements carry one of three evidence classes:

| Class | Meaning | Examples in this document |
|---|---|---|
| **NEW (1 Nov 2026)** | Measured or checked in this session | Git SHAs and file differences; live HTTP status of case pages; live H1; contrast ratios calculated from the token values; CSS values read from source |
| **HISTORICAL** | Recorded earlier by another session; not re-checked here | Section heights and the "text under 12 px" flags recorded on 31 October 2026 (DEC-110, `docs/experience-review/SECTION_HEIGHTS.md`) on a local build at port 3500 |
| **UNTESTED** | Assumption or expected effect, not yet observed in a browser | Every effect of the recommendations on layout, height, wrapping, readability and motion |

**Outstanding:** the browser audit of the current homepage and of these proposals has not been done. Required audit widths: **1440, 1280, 390 and 360 px**; any other size (for example 1366, 820 or 200% zoom) is additional. No statement in this document should be read as the audit's result.

Token names drop the CSS custom-property prefix (for example `c-tang` is the homepage token for #FF5B04).

**Sources read:** `DECISION_LOG.md` (DEC-018, DEC-019, DEC-069, DEC-071, DEC-078 to DEC-091, DEC-102, DEC-110, DEC-111, DEC-117); `CURRENT_STATE.md`; `docs/resolve-sitewide/TYPOGRAPHY_AND_HEADLINE_CONVENTIONS.md`; `components/resolve-home-r3/` (all files); `components/paid-advertising/home/content.ts`; `lib/clients.ts`; `lib/case-study-proof.ts`; `lib/case-study-images.ts`; `app/globals.css`; `app/direction-c.css`; `app/layout.tsx`; `docs/case-release/manifest/manifest.json`; Brand DNA 3.0 (owner's external file); Brand Kit README (DEC-069).

## Contents

- 0. Authoritative baseline
- A. Brand DNA 4.0 specification (A1 to A14)
- B. Existing versus proposed rules
- C. Homepage section refinement matrix
- D. Page storytelling principles
- E. Decision and approval register (13 decisions)
- F. Evidence register

## 0. Authoritative baseline

| Check | Finding | Label |
|---|---|---|
| Approved homepage version | THE RESOLVE R3, frozen 27 October 2026 (DEC-085), integrated in `4a3cb8d` (PR #60). Later approved changes: client showcase (DEC-090, in `dc6c9f3`, PR #66) and the logos approved on 31 October (DEC-104 owner decisions, in `b7acea5`). | VERIFIED, NEW |
| Authoritative SHA | `main` = `def66d2`. Live code = `0551b89` (DEC-117 completion). `0551b89` to `def66d2` changes only four documentation files, so homepage code on `main` equals live. The live H1 matches the source. | VERIFIED, NEW |
| Baseline decision | Resolved (D-01): the baseline is the verified `main` `def66d2` homepage, identical to live `0551b89`. No further checkout investigation is needed. | OWNER REQUIREMENT |
| Uncommitted homepage changes | The primary checkout has none in homepage files (its modified files are case-study and Contentful code). `MappedSkills-home-r2` holds uncommitted R2.1 edits to `PaidAdvertisingHome.tsx`, which `app/page.tsx` no longer renders and which DEC-085 says R3 supersedes. Excluded; not approved. | VERIFIED, NEW |
| Effect on this proposal | None. Homepage code is identical on `main` and live, so every token below is read from `main`. | VERIFIED |

## A. Brand DNA 4.0 specification

### A1. Brand personality and visual philosophy

- **Personality (carried from Brand DNA 3.0):** clear, commercial, candid, disciplined, human, confident. No hype, guarantees or superlatives.
- **Visual idea (THE RESOLVE, DEC-018), VERIFIED:** many anonymous signals resolve into a few named outcomes. Light-first ground, one accent, a dark stage for decisive moments, and a burnt closing band.
- **4.0 principle, RECOMMENDATION:** every section answers one buyer question and shows one idea, and every page gives a clear path to the next step. Drama comes from contrast of ground, scale of type, generous space and at most one purposeful motion, never from decoration.

### A2. Colour system

**OWNER REQUIREMENT:** preserve the existing logo colours and the existing website colours. No colour is added, removed or changed.

**Logo artwork (VERIFIED, Brand Kit README, DEC-069):** mark #FF5F24, "Skills" #FD5C03, ink #232323, text on dark #FAFAFA. Use the supplied files only; never recolour, stretch or re-typeset.

**Website colours (VERIFIED, `resolve-home-r3.css` and `app/globals.css`):**

| Role | Token / value | Use | Contrast (NEW, calculated from values) |
|---|---|---|---|
| Ground | `c-ground` #F7F3EC | Default light section | Ink on Ground 16.8:1 |
| Paper | `c-paper` #FFFDF9 | Raised light section and cards, with a Line border | |
| Ink | `c-ink` #141219 | Text and structure on light | |
| Ink Deep | `c-deep` #0F0D14 | Dark stage sections, footer | |
| Tangerine | `c-tang` #FF5B04 | Emphasis and marks on dark only | 6.2:1 on Ink Deep; white on Tangerine 3.11:1, so never small text |
| Tangerine Dark | `c-tang-dark` #D94400 | Display emphasis on light (H1, H2, large H3) | 3.97:1 on Ground: large text only |
| Tangerine Deep | `c-tang-deep` #A83400 | Small text, eyebrows, links, primary button, closing band | 6.02:1 on Ground; white on it 6.65:1 |
| Line / Rule | #DED6C8 on light, #2C2833 on dark | Rules and borders | |
| Dim | #5C5665 | Secondary text on light | 6.38:1 on Ground |
| Gap | #8E8798 | Dashed "your business" graphics only | 3.13:1: graphics only, never text |
| On dark | #E9E4DC body, #CFC8D6 soft, #B7B0BF captions | Text on Ink Deep | about 9.17:1 (#B7B0BF) to 15.25:1 (#E9E4DC); #CFC8D6 11.84:1 |

The logo and website values differ (for example #FF5F24 against #FF5B04, #232323 against #141219). Both stay: the logo is artwork, the website colours are interface tokens. Neither is adjusted to match the other.

### A3. Global typography and responsive hierarchy

Bricolage Grotesque 800 for headings and numerals; Manrope for body, labels, buttons and forms (VERIFIED, self-hosted through `next/font`). Sizes are fluid `clamp()`; breakpoints change layout, not type.

**Semantics and typography are separate (RECOMMENDATION).** The heading level (H1 to H6) follows the document structure: one H1, then levels in order without skipping. The visual style is chosen by class for the role. A heading's level never decides its size, and a size never decides its level. Any level, including H6, is used wherever the structure requires it. The "H1" to "H5" rows below are visual roles, not element rules.

| Visual role | Size | Weight / line height / tracking | Measure | Status |
|---|---|---|---|---|
| H1 | clamp(2.5rem, 4.8vw, 4.3rem) | 800 / .99 / -.025em | 15ch | VERIFIED |
| H2 section | clamp(2rem, 4vw, 3.5rem) | 800 / 1.05 / -.025em | 18ch | VERIFIED |
| H2 compact (dense sections, pricing) | clamp(1.9rem, 3vw, 2.7rem) to clamp(2rem, 3.6vw, 3.1rem) | same | 13 to 30ch | VERIFIED |
| H2 closing band | clamp(2rem, 4.4vw, 4rem) | 800 / 1 | 16ch | VERIFIED |
| H3 feature | clamp(1.6rem, 2.7vw, 2.5rem) | 800 / 1.05 | | VERIFIED |
| H3 card | clamp(1.3rem, 2vw, 1.9rem) | 800 / 1.05 | | VERIFIED |
| H3 small (steps, journey) | clamp(1.05rem, 1.4vw, 1.25rem) | 800 / 1.2 / -.015em | | VERIFIED |
| H4 | as H3 small | 800 / 1.2 | | Provisional (DEC-091); D-12 |
| H5 | 1rem Manrope | 800 | | Provisional (DEC-091); D-12 |
| H6 (element) | permitted where the structure needs a sixth level; styled with the H5 or label role | | | RECOMMENDATION |
| Hero lead | clamp(1.1rem, 1.6vw, 1.4rem) | 600 / 1.45 | 38ch | VERIFIED |
| Body | 1rem (blocks .95 to 1.05rem) | 400 / 1.6 | 46 to 54ch, never over 72ch | VERIFIED |
| **Label** (eyebrow, tag, stage name, legend, chip) | **minimum .75rem (12 px)** | 700 to 800 / 1.4 / .1 to .16em uppercase | | OWNER REQUIREMENT |
| **Explanatory caption** (disclosure, figure note, "illustrative" note, logo note) | **minimum .875rem (14 px)** | 500 to 600 / 1.45 | 60ch | OWNER REQUIREMENT |
| Button | 1rem, minimum height 52px, pill | 800 / 1.2 | | VERIFIED |

**Current values below the new minimums (VERIFIED, NEW, read from CSS):**

| Selector | Role | Current | Proposed |
|---|---|---|---|
| `.rv3-eyebrow` | Label | .74rem (11.8 px) | .75rem |
| `.rv3-ccm span` | Label | .68rem (10.9 px) | .75rem |
| `.rv3-j-tag` | Label | .7rem (11.2 px) | .75rem |
| `.rv3-j-n` | Label (step number) | .8rem (12.8 px) | unchanged |
| `.rv3-s-n` | Label | .74rem (11.8 px) | .75rem |
| `.rv3-legend` | Label | .8rem (12.8 px) | removed with the diagram (D-08) |
| `.rv3-hero-fig small` | Caption | .8rem (12.8 px) | .875rem |
| `.rv3-w-note` | Caption | .78rem (12.5 px) | .875rem |
| `.rv3-s-cap` | Caption | .8rem (12.8 px) | .875rem |
| `.cl-note` (client wall) | Caption | not measured in this session | .875rem if smaller |

The demo mock-ups (search result and social feed) imitate platform interfaces at platform sizes. RECOMMENDATION: treat them as images; their inner text is exempt, but their captions follow the 14 px rule.

Editorial pages already meet these minimums: DEC-112 set a type floor of 12 px labels and 14 px notes for blog, press and research (superseding the 11 px kicker note in DEC-109), and the implemented `components/editorial/editorial.css` on `main` sets its kickers, chips and chapter labels at .75rem (12 px) (VERIFIED, NEW). The minimums therefore change the homepage and other non-editorial pages only.

UNTESTED: the effect of the larger labels and captions on wrapping and section height. Expected to be small; to be checked in the outstanding browser audit.

### A4. Dual-tone H1 and H2 rules

Keeps the DEC-091 rule set (VERIFIED), with RECOMMENDED additions in items 4 to 7:

1. The emphasised phrase (`<em>`, normal style) carries the **customer outcome or the meaningful contrast**, chosen by meaning, not position.
2. Guidance, not a limit: usually about five words or fewer, and always less than the whole heading. Meaning decides; word count only flags a heading for a second look.
3. Light ground: Ink with #D94400. Dark ground: white with #FF5B04. Closing band: white only.
4. One emphasis per heading. Card titles, FAQ questions, legal headings and small section headings are normally single-colour.
5. **Approved editorial treatments are preserved:** the dual-tone headlines on blog, press and research pages (DEC-077, DEC-109; emphasis is the part of the recorded headline after its first colon or bar, `lib/headline-emphasis.ts`) stay as approved.
6. Where no phrase is an outcome or a contrast, use a single-colour heading. Labels such as "Businesses we've worked with" stay single-colour.
7. Punctuation: full sentences end with a full stop; phrase headlines take none. The homepage mixes both today (VERIFIED).

### A5. Section composition and whitespace

**OWNER REQUIREMENT:** preserve natural section heights and generous spacing.

VERIFIED tokens, kept unchanged:

- Container: 1360px maximum, side padding clamp(16px, 4vw, 56px); 12-column grid, gutter clamp(16px, 2vw, 32px).
- Section padding `sec` clamp(52px, 6vw, 96px); dense sections may use clamp(48px, 4.4vw, 64px), as Services does today.
- Spacing scale `sp-1` to `sp-4`: 10 to 16, 16 to 28, 24 to 44, 32 to 64 px. No one-off margins.
- Heading block to content: `sp-4`. Radius: 4px cards and media, 999px buttons, 8px logo chips.

RECOMMENDATIONS:

- Spacing is never reduced to save height. Where a section is long, remove repeated content (as in D-08), not space.
- Ground rhythm: alternate Ink Deep, Ground and Paper; never two Ink Deep sections together. Commercial pages end with the Tangerine Deep band; other pages use their approved endings (A11). The dark footer follows on every page.
- Composition: asymmetric 7/5 or 6/6 splits, one lead item with offset supporting items; three equal cards only where content is truly parallel.

### A6. Fold management without forced viewport heights

Follows DEC-111 (VERIFIED owner correction):

- No `100vh` or viewport-tied minimum heights. Every section takes its natural height.
- Desktop: a section stays within one screen when its content fits comfortably; otherwise it is allowed more height.
- Mobile: content flows; no text below the type scale, no clipping, no splitting of a coherent section to fit a screen.
- Hero (RECOMMENDATION, a preference, not a requirement): where it fits comfortably, the H1, lead and primary CTA appear in the first screen at 1440 x 900 and 1280 x 720 (the DEC-087 How We Work standard). Readability and spacing take precedence: the hero is never compressed, shrunk or crowded to achieve it. UNTESTED for the homepage in this session.
- Quality is judged with the seven DEC-111 checks: readability, spacing, hierarchy, content density, narrative continuity, useful motion, clear next action.

### A7. Distinct section drama and purposeful animation

**Homepage motion inventory (VERIFIED from source, NEW; timing not observed in a browser):**

| Pattern | Mechanism | Current duration | Role |
|---|---|---|---|
| Hero story (dots, attention, ad, outcomes) | CSS keyframes on SVG; the final frame is the base style | about 4.4s in total, once | Explains the idea |
| Section entrance | IntersectionObserver, only below the first screen; visible without script | .42s, 14px rise, once | Orientation |
| Buyer path draw | Observer arms, then nodes and lines draw in order | .75s per step, once | Cause and effect (removed under D-08) |
| Hover and focus | colour, 2px arrow shift, 2px button lift, FAQ plus rotates | .18s | Feedback |
| Reduced motion | all animation and transition removed | none | Accessibility |

**Motion limits are ceilings, not required durations (OWNER REQUIREMENT).** A shorter animation, or none, always complies. RECOMMENDED ceilings:

| Motion type | Ceiling |
|---|---|
| Hover and focus feedback | no more than 200ms |
| Section entrance | no more than 500ms, rise no more than 16px |
| Any single transition | no more than 500ms |
| Signature sequence (at most one per page, optional) | no more than 5s in total, plays once, final frame identical to the static design |
| Stagger between related items | no more than 100ms per item, no more than four items |

Never: counters, sticky stages, scroll hijack, parallax, autoplay, looping motion, animated text, or content that is hidden until an animation finishes.

Drama per section comes first from a change of ground, scale of type and one strong visual; motion is the last tool.

### A8. Customer-first storytelling principles

- Plan each section around the buyer's question it answers, then lead with the outcome and show how. The question is a planning tool, not a compulsory literal heading; a page may show it, as How We Work does with "You ask" (DEC-087), where that helps the reader.
- Speak to "you" and "your customers"; MappedSkills is the guide, not the hero.
- Separate what MappedSkills does from what the business owns (the existing Capture, Convert and Measure split).
- Proof follows a claim directly. Every figure carries its source, period and caveat. Illustrations are described accurately; a visible "illustrative" note is used where the approved pattern has one, within the disclosure exceptions in A13 (no visible disclosure on /work cards or in the case showcase).

### A9. Benefit-led, concise content-writing rules

- Lead with the benefit within the first six words. One idea per sentence; aim for 20 words or fewer.
- Headlines 4 to 10 words; section introductions two sentences at most; card text one or two sentences.
- Plain words over platform jargon; translate metrics into business meaning.
- Banned: guarantees, superlatives, and "ROI-driven", "data-driven" or "results-focused" without evidence. No invented numbers.
- No double dashes or long dashes; use full stops, commas or colons.
- Title Case for buttons and links (existing convention); sentence case for headings.

### A10. Page-specific storytelling architecture

**Commercial-page recipe (RECOMMENDATION).** Service, audience (industry), homepage and similar selling pages follow six stages. Editorial, legal and utility pages (blog, press, research, legal, FAQ, contact, thank-you, 404) are not bound by it; they follow their own approved structures.

1. **Recognition:** is this for me?
2. **Tension:** what goes wrong today?
3. **Approach:** how does it work?
4. **Proof:** real work, with honest limits.
5. **Fit and cost:** who it suits and what is included.
6. **Action:** one clear next step.

Commercial pages may merge or skip stages but never put Proof before Recognition. Section D gives each page's direction.

### A11. CTA hierarchy and conversion journeys

VERIFIED labels (DEC-085): "Discuss Your Advertising", "Discuss Your Google Ads", "Discuss Your Meta Ads", "Discuss Property Advertising". Call requests go to `/contact?intent=call` (DEC-071).

RECOMMENDED hierarchy:

- **A clear journey, not a CTA in every section.** Each page makes the next step easy to find; individual sections carry a CTA only where it helps.
- **Primary:** pill button, Tangerine Deep on light, Paper on the closing band. Where used, at most one per section and two per screen.
- **Secondary:** underlined text link with ↗ ("Explore Our Work", "See How We Work").
- **Tertiary:** inline contextual links.
- **Journeys:** Home to a service or audience page, to a case study, to `/contact` (enquiry or call). Commercial pages end with the closing band CTA; other pages use their approved ending.

### A12. Mobile-first layouts and accessibility

- Breakpoints (VERIFIED, layout only): 1080, 760 and 420 px. Below 760 px, sequences become vertical numbered timelines (journey and steps already do).
- Touch targets: 44px for links, 52px for buttons (VERIFIED in CSS).
- Visible focus: 3px #A83400 on light, white on dark (VERIFIED in CSS).
- WCAG 2.2 AA: contrast as in A2; one H1; no skipped heading levels; decorative SVGs hidden; no information that depends on animation.
- Required audit widths: 1440, 1280, 390 and 360 px. Additional sizes (1366, 820, 200% zoom) are optional extras. The consent banner must not hide the primary CTA (DEC-085 correction notes). This audit is outstanding.

### A13. Reusable components and permitted variations

| Component | Permitted variations |
|---|---|
| Section shell (ground, wrap, head) | Ink Deep, Ground or Paper; standard or compact padding |
| Section head (eyebrow, H2, intro, optional side link) | dual-tone or single-colour H2 |
| Button and text link | Tangerine Deep or Paper; light or dark |
| Lead card with offset cards | image above or beside; one lead plus two |
| Numbered sequence (journey, steps) | horizontal on desktop, vertical on mobile; ownership marks (solid for MappedSkills, dashed for your business) |
| Platform demo (search result, social feed) | always captioned as illustrative |
| Homepage work card (artwork, logo chip, eyebrow, title, link) | links to the case detail page; keeps its existing approved homepage treatment |
| **/work R2 library card** (DEC-108, accepted) | as approved: two columns on desktop, one on mobile; Search, Service and Industry filters with result count; card image shown whole; client name as the single link; service label and one line; the study's own lead figure with definition and period, or its approved summary; no visible artwork disclosure under the image (removed by owner decision, 31 October 2026) |
| **Reusable case showcase** (`components/case-showcase/`, DEC-115 and DEC-116, accepted) | as approved: one section per page with two or three relevant cases; grid on desktop, swipeable row at 1080 px and below with previous and next buttons and a "Case N of M" status; one once-only artwork reveal; hides at zero cases; View-all link rules as recorded; no visible artwork disclosure |
| Client logo wall | always with the "a logo shows who, not a result" note; homepage position unchanged |
| FAQ (`details`) | dark or light |
| Closing band | heading, one sentence, one CTA |

Artwork disclosure: there is no universal visible-disclosure requirement. The approved removals on /work and in the showcase stand; alt text and detail-page captions carry the description. Existing visible notes on pages that already have them (such as the homepage) are not changed by this document.

Not permitted without approval: new colours, new fonts, glow or gradient decoration, stock photography presented as client work, dashboards with invented numbers.

### A14. Design QA and acceptance checklist

1. One H1; heading levels follow structure (H6 allowed where needed); styles chosen by role; A4 dual-tone rules met.
2. Only A2 colours; logo files unaltered; contrast pairs as listed.
3. Paragraphs 16 px; labels 12 px minimum; explanatory captions 14 px minimum.
4. Lines 72 characters at most.
5. Preferred, not required: hero H1, lead and CTA in the first screen at 1440 and 1280 px, without compromising readability or spacing.
6. Checked at 1440, 1280, 390 and 360 px: no horizontal overflow, no clipped or overlapping text.
7. Every claim traceable; illustrations described accurately (alt text, captions where the approved pattern uses them); every logo authorised in `lib/clients.ts`.
8. Motion within the A7 ceilings; nothing moves under reduced motion; all content present without script.
9. Every focusable element shows a ring; targets meet A12.
10. A clear journey to the next step on every page; CTA labels from A11.
11. Section spacing uses the A5 tokens; no section compressed to save height.
12. No console errors; media dimensions reserved so nothing shifts.
13. Copy passes A9.

## B. Existing versus proposed rules

| Area | Existing (VERIFIED) | Proposed 4.0 |
|---|---|---|
| Logo colours | #FF5F24, #FD5C03, #232323 in artwork | Preserved unchanged (owner requirement) |
| Website colours | Ten tokens scoped to `.rv3`; same values in `resolve-*` globals | Preserved unchanged; roles and contrast limits documented |
| Labels | 10.9 to 11.8 px in several places | 12 px minimum |
| Explanatory captions | 12.5 to 12.8 px | 14 px minimum |
| Heading levels | H4 and H5 scale provisional (DEC-091); H6 not used for outline | Semantics separate from typography; H4 and H5 roles confirmed (D-12); H6 allowed where structure needs it |
| Headline emphasis | Outcome or contrast, about five words | Chosen by meaning; word count is guidance; approved editorial dual-tone kept; punctuation rule |
| Fold | No strict fold rule (DEC-111) | Same; first-screen hero fit is a preference behind readability and spacing |
| Storytelling | Brand DNA 3.0 arc for all pages | Six stages for commercial pages only; buyer questions as a planning tool |
| CTAs | DEC-085 labels | Same labels; a clear journey per page, not a CTA per section |
| Artwork disclosure | Removed on /work and showcases (31 October) | Removal kept; no universal requirement |
| Case components | /work R2 and showcase accepted (DEC-108, DEC-116) | Recorded as explicit component variants |
| Audit widths | Earlier checks used 1440, 820, 390, 360 | Required: 1440, 1280, 390, 360; others additional |
| Spacing | Fluid tokens `sec`, `sp-1` to `sp-4` | Same tokens; never reduced to save height |
| Motion | Brand DNA 3.0 proposed 180 to 320ms; homepage uses .42s entrances; DEC-111 checks used 500ms | Ceilings, not durations: 500ms per transition, 5s signature sequence |
| Homepage cases | Wanderlooms and Om Sai, both linking to `/work` | AnybodyCanBake Google Ads and Wanderlooms Meta Ads, each linking to its detail page |
| Process section | Five steps plus a buyer-path diagram | Five steps; diagram removed, unique facts kept |

## C. Homepage section refinement matrix

Heights are **HISTORICAL** (recorded 31 October 2026 at 1440 and 390 px, DEC-110; not re-checked; the homepage's client data changed afterwards in `b7acea5`). All effects of the proposed changes are **UNTESTED**.

| # | Section (ground) | Height 1440 / 390 | Keep unchanged | Refine | Simplify or consolidate | Decision |
|---|---|---|---|---|---|---|
| 1 | Hero (Ink Deep) | 775 / 1059 | H1, lead, support line, CTA pair, hero story animation | Disclosure caption to 14 px | None | D-03 |
| 2 | Buyer journey (Ground) | 788 / 1378 | Five stages, Capture, Convert and Measure, ownership marks | Labels to 12 px; emphasis "to an enquiry or a sale." names the outcome, so it stays (word count is guidance) | Receives the one responsibility sentence from section 7 (see D-08) | D-03, D-08 |
| 3 | Who we help (Paper) | 978 / 1504 | Lead plus two layout, imagery, Enquiry-Led pointer | None | None | |
| 4 | Services (Ink Deep) | 799 / 1830 | Two services, illustrative demos with captions | Captions to 14 px; check demo scale at 390 px | None | D-03 |
| 5 | Featured work (Ground) | 1068 / 1308 | Card layout, logo chips, disclosure notes | Cards become AnybodyCanBake Google Ads and Wanderlooms Meta Ads with direct detail links; captions to 14 px; emphasis "the work" is not an outcome | Removes the stale code that sends both cards to `/work` | D-05, D-06, D-10 |
| 6 | Clients (Paper) | 567 / 1002 | Logo wall, note and current position | Heading single-colour by meaning | None | D-07, D-10 |
| 7 | Process (Ground) | 1297 / 1930 | Five steps; reporting sentence (DEC-085 D4); "See How We Work" link | None | Buyer-path diagram removed; unique facts kept (see below) | D-08 |
| 8 | Pricing and FAQ (Ink Deep) | 547 / 824 | Fee separation, four FAQs | FAQ title is an H2 styled as an eyebrow: acceptable, document it | None | |
| 9 | Closing band (Tangerine Deep) | 384 / 344 | As is | None | None | |
| n/a | Code comments | n/a | n/a | Header comment still calls R3 "a DESIGN EXPERIMENT", which contradicts DEC-085; "6. Paper" sits on a Ground section | No visual change | |

### C1. Recommended homepage cases (D-05, D-06)

| Card | Route | Live status (NEW) | Evidence basis (VERIFIED) | Assets (VERIFIED) |
|---|---|---|---|---|
| AnybodyCanBake, Google Ads | `/portfolio/google-ads-for-online-courses` | 200; page names AnybodyCanBake | Figures released 30 October 2026 (DEC-102): owner attested the figures and gave permission to publish figures and images (`lib/case-study-proof.ts`) | Approved logo in `lib/clients.ts`; case card artwork in `lib/case-study-images.ts` |
| Wanderlooms, Meta Ads | `/portfolio/wanderlooms-meta-ads` | 200 | Published in the DEC-117 release (listing order 20) | Approved logo and conceptual artwork already on the homepage |

Why: one Google Ads and one Meta Ads case mirrors the two core services; both have live detail pages; today both homepage cards are Meta Ads and both send visitors to `/work` instead of the case.

Rules for the cards: link each card directly to its detail page with "Read the Case Study" (Title Case, following A11); reuse each case's approved title and card text from Contentful; repeat no figure that the case page does not publish; keep the existing homepage treatment for Wanderlooms and add no new visible disclosure requirement (the /work and showcase removals stand). Spelling is "AnybodyCanBake" (DEC-102).

Om Sai Developer leaves the homepage but stays first on `/work` and keeps its detail page.

### C2. Process diagram removal with unique information kept (D-08)

The buyer-path diagram (`PathFlow`) repeats the journey in section 2. A line-by-line comparison (VERIFIED, NEW):

| Diagram content | Already in section 2? | Disposition |
|---|---|---|
| Five stages: buyer intent, relevant advertising, website or landing page, enquiry or purchase, measurement and improvement | Yes, as the five journey stages | Removed |
| Ownership legend (MappedSkills, your business, your customer) | Partly: ownership marks and Capture, Convert, Measure labels | Keep one short legend in section 2 if the marks need explaining |
| "Website or landing page" owned by your business | Yes: "Your business: offer, website and follow up" | Removed |
| "MappedSkills tests and reviews" | Partly: "MappedSkills reviews" | Section 2 label becomes "MappedSkills tests and reviews" |
| Footnote: "MappedSkills plans, manages, tests and reviews advertising within the agreed scope. Your business owns the offer, the website and the follow up." | No: "within the agreed scope" is unique | Moves to section 2 as one sentence below the journey |
| Heading "How the advertising connects to the buyer's path" | Same idea as section 2's H2 | Removed |

The five process steps, the reporting sentence and the "See How We Work" link stay in section 7. Section spacing stays unchanged. UNTESTED: the expected height reduction in section 7.

## D. Page storytelling principles (direction only, no replacement pages)

| Page | Story | Signature moment (optional, within A7 ceilings) | Constraints |
|---|---|---|---|
| Google Ads | People already searching; are they finding you; how campaigns meet that intent; what you supply (offer, page, tracking); Google Ads proof; fees; discuss | A search result resolving from query to enquiry | Frozen R4.1 design and H1 kept (DEC-085); proof from published Google Ads cases only |
| Meta Ads | Attention in the feed; turning it into opportunity; audience, message and creative tests; Click-to-WhatsApp where relevant; Meta Ads proof; creative allowance and fees; discuss | One creative test resolving into a conversation | Frozen R2.2; tracking boundary from DEC-080 |
| Industry pages (D2C, Education, Real Estate, Enquiry-Led) | How your buyers decide; what success means for you (purchase, enrolment, site visit, qualified enquiry); channel fit; sector proof; fit | The sector's own buying path | Frozen designs kept; only shared rules apply |
| Case study | Client context; problem; what changed; evidence with period and source; limits; next step | One static before and after, no counting animation | DEC-117 content gate and eligibility rules unchanged |
| How We Work | Six acts, each opening with "You ask" (DEC-087) | Route diagram with the approval gate | Already the model for 4.0 storytelling |
| Contact | What happens next; enquiry or call; short form; privacy; calm confirmation | None beyond input feedback | Two intents (DEC-071); no pressure copy |

## E. Decision and approval register

"Owner direction" means the owner set the direction on 1 November 2026. Brand DNA 4.0 as a whole is approved as the design direction (revision 3, corrected in revision 4); OPEN items below stay open within it. Recorded as DEC-118. Nothing here authorises implementation.

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| D-01 | Authoritative homepage baseline | Verified `main` `def66d2`, identical homepage to live `0551b89`; no further checkout investigation | Resolved by owner direction |
| D-02 | Logo colours (#FF5F24, #FD5C03, #232323) and website colours (#FF5B04, #141219 and the rest of A2) | Preserve both sets unchanged, each in its own scope | Owner direction given |
| D-03 | Minimum sizes: labels 12 px, explanatory captions 14 px (changes frozen pages slightly) | Approve; apply page by page in later implementation batches | Owner direction given |
| D-04 | Motion ceilings: transitions no more than 500ms; optional signature sequence no more than 5s, once, static final frame | Approve as ceilings, not required durations | Owner direction given (ceilings); values OPEN |
| D-05 | Homepage cases: AnybodyCanBake Google Ads and Wanderlooms Meta Ads | Approve | Owner direction given |
| D-06 | Direct detail links for both cards, with approved CMS title and card text, "Read the Case Study" label | Approve | Owner direction given (links); card wording OPEN |
| D-07 | Client logo wall position | Keep its current position after Featured work | Resolved by owner direction |
| D-08 | Remove the buyer-path diagram; move its unique scope sentence and "tests and reviews" wording into the journey section | Approve | Owner direction given |
| D-09 | Heading punctuation: sentences take a full stop, phrases do not | Approve | OPEN |
| D-10 | Emphasis by meaning: journey emphasis kept; work and clients headings single-colour; approved editorial dual-tone kept | Approve | Owner direction given (meaning-led, editorial kept); homepage fixes OPEN |
| D-11 | Brand DNA 4.0 ceilings replace Brand DNA 3.0's 180 to 320ms entrance guidance | Approve | OPEN |
| D-12 | Separate heading semantics from typography; confirm the H4 and H5 visual roles; allow H6 where structure needs it | Approve | Owner direction given (semantics, H6); H4 and H5 roles OPEN |
| D-13 | Record Brand DNA 4.0 as a DEC entry and treat this file as its reference | Recorded as DEC-118 | Direction approved 1 November 2026; DEC-118 written locally, not yet on `main` |

## F. Evidence register

**NEW (measured or checked 1 November 2026):**
- Git: `main` `def66d2`; live code `0551b89`; their difference is four documentation files; the checkout comparisons in section 0.
- Live site: the homepage H1; `/portfolio/google-ads-for-online-courses`, `/portfolio/wanderlooms-meta-ads`, `/portfolio/om-sai-developer-meta-ads`, `/work` and `/who-we-help/enquiry-led-businesses` return 200; `/portfolio/anybodycanbake-google-ads` returns 404 (the case lives at the online-courses route).
- Contrast ratios in A2, calculated from the hex values (not measured on rendered pages).
- Every CSS value, motion timing and component structure quoted, read from source on `main`.

**HISTORICAL (recorded earlier, not re-checked):**
- Section heights at 1440 and 390 px and the "text under 12 px" flags, recorded 31 October 2026 on a local build (DEC-110, `docs/experience-review/SECTION_HEIGHTS.md`).
- Hero fit at the three desktop sizes on `/how-it-works` (DEC-087).

**UNTESTED (assumptions):**
- Wrapping and height effects of the 12 px and 14 px minimums.
- Height reduction from removing the diagram.
- Layout of the new case cards with AnybodyCanBake artwork and logo.
- Homepage hero fit at 1440 x 900 and 1280 x 720 (a preference, not a requirement).
- Rendered contrast, motion timing in a visible browser, Safari, Firefox, real devices and screen readers.

**OUTSTANDING:** the browser audit of the current homepage and of every recommendation above, at the required widths 1440, 1280, 390 and 360 px (other sizes additional).
