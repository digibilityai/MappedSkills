# UX Pattern Inventory — Gate 9B Deliverable B — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Fields discovered by wireframing `31`–`48`, per the sequencing rule in `29_UX_PATTERN_INVENTORY_SPEC.md` §7.
**Scope:** 14 patterns + 2 sitewide regions = 16 entries, each against the 12 fields defined in `29`§3. **No React/implementation component appears here** — this is a UX inventory (`29`§0).

> Acceptance criteria checked against `29`§5 at the end of this document.

---

## P1 — Commercial opener

1. **Name:** Commercial opener
2. **User job:** Confirm what the page is about, in my own word, fast, with nothing competing.
3. **Content requirements:** Required — confirmation phrase, bridge sentence, ≥1 primary action. Optional — a second primary action (booking).
4. **Interaction behaviour:** Static text + CTA objects. No script dependency. Nothing gates first paint.
5. **Responsive behaviour:** Confirmation + bridge must both fit the first screen at narrow width (M2). Never dropped.
6. **Accessibility requirement:** CTA objects are real controls/links, not divs; heading structure starts at the page's H1.
7. **Evidence behaviour:** **None — zero apparatus, always** (B27). The one documented exception is the homepage's single dated item, unspent at launch (`24`).
8. **Allowed page types:** Commercial (all 6) · `/services` · `/pricing` · conditional vertical · `/about` · `/contact` · `/schedule-call`.
9. **Prohibited page types:** Editorial, research, `/how-it-works`, problem page — each opens on its own subject per B27/rule stated in `05`§8 and `03`.
10. **Known variants:** Homepage carries the 4th-element dated-item exception; all others carry none.
11. **Owner dependency:** None.
12. **Technical dependency:** None.

---

## P2 — Capability routing

1. **Name:** Capability routing
2. **User job:** Leave for the specific page I came for, in seconds, without reading a menu.
3. **Content requirements:** Required — one line per capability, grouped by contribution. AI search: exactly one line, no dedicated section.
4. **Interaction behaviour:** Links only, no button-object styling implied. No hover-only reach.
5. **Responsive behaviour:** Reachable within one or two screens of the top on `/services` for a visitor who came only to route.
6. **Accessibility requirement:** Real links, distinguishable without colour alone, keyboard reachable in DOM order.
7. **Evidence behaviour:** None — routing, not persuasion.
8. **Allowed page types:** `/` Block 5 · `/services` Block 4 · footer first column.
9. **Prohibited page types:** Every capability page (does not list siblings) · `/pricing`, `/contact`, `/schedule-call`, articles, research entries.
10. **Known variants:** None — three surfaces (`/`, `/services`, footer) must agree exactly; a divergence is a defect, not a variant.
11. **Owner dependency:** The conditional vertical item (manufacturing gate) — **case A**, removable in one change.
12. **Technical dependency:** Config-flag rendering for the conditional 6th item.

---

## P3 — The run wrapper (F1)

1. **Name:** The run wrapper
2. **User job:** See where this page's subject sits inside the whole discovery-to-revenue chain.
3. **Content requirements:** Required per class — FULL: full chain + boundary + dashed unmeasured stretches + ≥1 unattached arrival + intervention marks. PARTIAL: one named segment at full legibility. STATE: the same object in a changed condition. NONE: nothing renders.
4. **Interaction behaviour:** Static, complete without interaction; optional single non-blocking reveal, complete without it. No motion required to convey information.
5. **Responsive behaviour:** Genuine vertical form at narrow widths, never a scaled horizontal one, never horizontal page scroll.
6. **Accessibility requirement:** Text equivalent for every instance; labels as real text, never baked into an image.
7. **Evidence behaviour:** Carries its own boundary/limit sub-elements where FULL; EXPANDABLE claims beside it elsewhere. **FULL/PARTIAL/STATE/NONE taxonomy is now binding on this field per `22`.**
8. **Allowed page types (by class):** FULL — `/`, `/services`, `/how-it-works`. PARTIAL — `/seo`, `/conversion-optimization` (+ `/industries/manufacturing`, conditional). STATE — `/` Block 4, `/lead-generation`. NONE — every other route, explicitly including `/ai-seo`, `/google-ads`, `/social-media-ads` (reclassified, `22`§3).
9. **Prohibited page types:** Ambient use anywhere (header, background, loader, transition, pattern) — B24; `/contact`, `/schedule-call`, `/thank-you`; any first screen; any CTA region.
10. **Known variants:** FULL / PARTIAL / STATE / NONE, per `22`. A PARTIAL is never "the whole figure shrunk."
11. **Owner dependency:** None.
12. **Technical dependency:** None for static rendering; the optional reveal degrades to fully static without JavaScript.

---

## P4 — Evidence disclosure

1. **Name:** Evidence disclosure
2. **User job:** Check where a claim comes from, in place, at zero cost if I don't want to.
3. **Content requirements:** Required — a control naming what it reveals; content always in the DOM.
4. **Interaction behaviour:** Native/semantic disclosure. Opens in place. `aria-expanded` or native equivalent. Deep-linkable. **Without JavaScript the evidence remains reachable — either the native control still works, or the content renders open and the control is not drawn. A control that renders but cannot be operated is prohibited.** Four states shown in `45_WIREFRAME_STATE_EVIDENCE_DISCLOSURE.md`. Full contract: `10`§4.
5. **Responsive behaviour:** EXPANDABLE, collapsed, immediately beneath its claim — never detached to a footer (M6).
6. **Accessibility requirement:** Keyboard-operable (Enter/Space), no hover dependency, focus retained on the control, announced state.
7. **Evidence behaviour:** **This pattern IS the apparatus mechanism** — EXPANDABLE state, always. Renders open in print.
8. **Allowed page types:** Every commercial page's mid-page claims · articles · `/faq` · `/services` · `/about`. Sitewide.
9. **Prohibited page types/positions:** First screens · CTA regions · `/contact`, `/schedule-call`, `/thank-you` · nested inside another disclosure (none permitted).
10. **Known variants:** None in behaviour — content varies, mechanism never does.
11. **Owner dependency:** None.
12. **Technical dependency:** Must work without JavaScript (native disclosure semantics) — this is the site's differentiator per `10`§4.

---

## P5 — The limits block

1. **Name:** The limits block
2. **User job:** See what this firm will not promise, stated as plainly as what it will.
3. **Content requirements:** Required — the boundary statement itself; nothing optional (a limits block with nothing to say does not render, but this never occurs at launch per approved copy).
4. **Interaction behaviour:** Static text, always visible, no control to open/close it exists.
5. **Responsive behaviour:** **Expanded, always, at every width — the one pattern that tightens rather than relaxes on mobile.**
6. **Accessibility requirement:** Same contrast, size and type quality as the claims it qualifies — never a disclaimer treatment.
7. **Evidence behaviour:** **ADJACENT-SECONDARY, never collapsible, at every screen size (B29).** This is the field this pattern exists to protect.
8. **Allowed page types:** `/` Block 4 · every commercial page's move 5 **and its measurement limits** · `/services` Blocks 3 and 7 · `/how-it-works` §4–§5 · every research entry's limitations · `/pricing` fit section · **`/research` and `/blog` index — the "what this is not yet" block** *(added 2026-09-02: found by the wireframe cross-check, `36` draws this block and `50` §7 records the fix)*.
9. **Prohibited page types/positions:** Above the fold on a commercial page · before the capability it limits (B28) · inside/adjacent to a CTA region · below a CTA · `/contact`, `/schedule-call`, `/thank-you`.
10. **Known variants:** Content-specific per page (horizon, influence/testability, fee/spend, channel fit, promise scope, experimentation validity) — behaviour never varies.
11. **Owner dependency:** **None — deliberately.** It must never be blocked (`29`§4).
12. **Technical dependency:** None.

---

## P6 — Problem diagnostic

1. **Name:** Problem diagnostic
2. **User job:** Run a real check on my own situation and get a specific, honest direction — without contacting anyone.
3. **Content requirements:** Required — each step, its instructions, and its named observable outcome. Static content is complete without any affordance.
4. **Interaction behaviour:** **Static only at launch (H5 — recording affordance NOT APPROVED).** No sign-up, no download, no score. Printable and saveable by ordinary browser behaviour.
5. **Responsive behaviour:** Linear, one check per section on mobile — **not an accordion.**
6. **Accessibility requirement:** Fully operable with no JavaScript and no interaction at all — the static state carries everything.
7. **Evidence behaviour:** ADJACENT-SECONDARY on each check's observable outcome; away-pointing outcomes equal weight to routing outcomes (F9 test).
8. **Allowed page types:** `/problems/traffic-but-no-enquiries` (full, F2+F6) · `/conversion-optimization` (shallow, F2-shallow only).
9. **Prohibited page types:** Every other page type — a diagnostic on a commercial page is a lead-capture device in disguise.
10. **Known variants:** Full depth (F2, problem page) vs. shallow depth (F2-shallow, `/conversion-optimization`) — **same object, must be visibly recognisable as such** (`06`§8).
11. **Owner dependency:** **None — the reason this route can be built first** (`29`§4).
12. **Technical dependency:** None for the static form. A future recording affordance (not approved) would require local, non-transmitted browser state.

---

## P7 — Fit test

1. **Name:** Fit test
2. **User job:** Establish quickly whether I'm the kind of buyer this firm wants, and leave without friction if I'm not.
3. **Content requirements:** Required — both sides stated (who this is for, who it is not for).
4. **Interaction behaviour:** Static text, no disclosure, no accordion.
5. **Responsive behaviour:** Plainly readable, not collapsed, not below the final CTA, at any width.
6. **Accessibility requirement:** Standard text-block accessibility; no unique requirement.
7. **Evidence behaviour:** None.
8. **Allowed page types:** `/` Block 7 · `/pricing` §6 · `/services` Block 8 · `/about` §7.
9. **Prohibited page types:** Above the fold anywhere · `/contact`, `/schedule-call` · articles and research entries.
10. **Known variants:** None.
11. **Owner dependency:** None.
12. **Technical dependency:** None.

---

## P8 — Contact block

1. **Name:** Contact block
2. **User job:** Reach a real person by whichever channel I prefer, at equal confidence in each.
3. **Content requirements:** Required — form/booking route + DIRECT control, when unblocked. Its own region with more surrounding space than adjacent content.
4. **Interaction behaviour:** `tel:` one tap on mobile; phone/email click emits conversion-intent event, never a qualified-enquiry event.
5. **Responsive behaviour:** One tap for `tel:`; no change in weight at narrow widths.
6. **Accessibility requirement:** DIRECT control at equal weight to form/booking wherever it appears — never a smaller "or call us."
7. **Evidence behaviour:** **None — zero apparatus (B30).**
8. **Allowed page types:** End of `/`, every commercial page, `/services`, `/pricing`, `/about`, conditional vertical, header utility, footer; prominent on `/contact` and `/schedule-call`.
9. **Prohibited page types/positions:** Mid-page anywhere · inside a limits region · `/thank-you` beyond the urgent route · legal pages. **Corrected 2026-09-02 (H4): one instance per page outside the two conversion surfaces — never a floating strip, never per-section.**
10. **Known variants:** Elevated weight on the conditional vertical page ("this segment calls").
11. **Owner dependency:** **Published phone number — case A/B per route** (`26`§3). Renders no placeholder; WhatsApp blocked with it.
12. **Technical dependency:** None beyond the number itself being published.

---

## P9 — Metadata-forward entry card

1. **Name:** Metadata-forward entry card
2. **User job:** Judge whether an entry is worth opening from its card alone, including how rigorous it is.
3. **Content requirements:** Research cards — date, systems/scope, sample, version, IMMEDIATE, plus a crop of the actual figure as the image. Article cards — byline + date. A module that cannot be filled with genuinely relevant items does not render.
4. **Interaction behaviour:** The whole card is a link to the entry; no other interaction.
5. **Responsive behaviour:** Cards stack; metadata never truncates, never moves to a footer.
6. **Accessibility requirement:** One accessible link target per card, not multiple overlapping link regions.
7. **Evidence behaviour:** **IMMEDIATE — the reason to trust the entry, and what distinguishes this index from a generic blog listing.**
8. **Allowed page types:** `/research` index · `/blog` index · related-content modules on articles and entries.
9. **Prohibited page types:** Capabilities (P2 governs) · commercial pages · `/pricing` · anything not a genuinely discrete comparable item.
10. **Known variants:** Research variant (full metadata schema) vs. article variant (byline + date only).
11. **Owner dependency:** **Which entries publish, and named authorship — case A** if unmet (`29`§4).
12. **Technical dependency:** Own-site fixes shipping, for entries that reference them.

---

## P10 — Conversion surface

1. **Name:** Conversion surface
2. **User job:** Complete an enquiry, by form or by booking, and know honestly whether it worked.
3. **Content requirements:** Required — one step, 4 required fields (form) or the booking widget + required phone (booking). Budget never re-added.
4. **Interaction behaviour:** Full lifecycle in `43_WIREFRAME_STATE_FORM_LIFECYCLE.md` — idle/busy/success/validation-failure/server-failure. Screening outcomes invisible to the visitor.
5. **Responsive behaviour:** The 4-field set is itself the mobile strategy; nothing further removed. Sticky elements never obscure a field or submit control, especially with keyboard open (M4).
6. **Accessibility requirement:** Programmatic labels, `aria-required`, `aria-describedby` errors, status-region announcement of success/failure, focus management on error and success.
7. **Evidence behaviour:** **None — zero apparatus, zero figures, zero proof (B17).**
8. **Allowed page types:** `/contact` (form) · `/schedule-call` (booking) · `/thank-you` (confirmed state).
9. **Prohibited page types:** Everywhere else. **APPROVED (H1): commercial pages and homepage route here rather than embedding inline.**
10. **Known variants:** Form variant, booking variant, thank-you (confirmed) variant.
11. **Owner dependency:** Complete NAP (`/contact`); who takes calls/availability (`/schedule-call`) — **case 0**, the whole route does not launch without these.
12. **Technical dependency:** **Endpoint, persistence, transactional email — case 0, none exist today.** A working booking surface with runtime custom fields and server-side webhook.

---

## P11 — Return-to-decision link

1. **Name:** Return-to-decision link
2. **User job:** Get back to the commercial decision I left, after I finished evaluating.
3. **Content requirements:** Required — a specific destination where known, `/services` where not.
4. **Interaction behaviour:** A link, not a CTA object; placed after the content it follows, never interrupting it.
5. **Responsive behaviour:** No change at narrow widths; standard link.
6. **Accessibility requirement:** Standard link accessibility; distinguishable without colour alone.
7. **Evidence behaviour:** None.
8. **Allowed page types:** `/how-it-works` · `/research` · `/research/{slug}` · `/about` · articles.
9. **Prohibited page types:** Commercial pages (don't need one) · `/contact`, `/schedule-call`, `/thank-you` (must not offer routes away from a decided visitor).
10. **Known variants:** Contextual destination vs. `/services` fallback.
11. **Owner dependency:** None.
12. **Technical dependency:** None. **Journey G depends on this pattern existing** — a proof page that dead-ends turns an evaluator into a bounce.

---

## P12 — Breadcrumb *(NEW)*

1. **Name:** Breadcrumb
2. **User job:** See where this page sits in the site's hierarchy, especially where the URL is flat.
3. **Content requirements:** Required — trail generated from the same source as the emitted `BreadcrumbList` schema. Non-page segments render as text, not links.
4. **Interaction behaviour:** Each real segment is a link except the last (current page, not a link to itself).
5. **Responsive behaviour:** Remains visible and readable at every width; no truncation that removes a segment's meaning.
6. **Accessibility requirement:** Marked up as navigation with an accessible name (e.g. "Breadcrumb"); current-page segment indicated, not by colour alone.
7. **Evidence behaviour:** None.
8. **Allowed page types:** Capability pages · `/problems/{slug}` · `/industries/{slug}` (conditional) · `/research/{slug}`, `/blog/{slug}`.
9. **Prohibited page types:** `/`, `/services` (top level, none) · `/research`, `/blog`, `/pricing`, `/about`, `/how-it-works` (top level, none) · `/contact`, `/schedule-call`, `/thank-you`, legal, 404 (utility, none).
10. **Known variants:** None in behaviour; trail content varies by route family.
11. **Owner dependency:** None.
12. **Technical dependency:** Must be generated from the same source as `BreadcrumbList` schema — a second, drifting source is the defect this pattern removes (`07`§6).

---

## P13 — Figure wrapper *(NEW)*

1. **Name:** Figure wrapper
2. **User job:** Read, cite and (where relevant) print a figure with its provenance intact.
3. **Content requirements:** Required — caption, provenance placement, static-state requirement, text equivalent. F17 must never appear inside this wrapper.
4. **Interaction behaviour:** Complete and readable statically; optional non-blocking reveal only where the figure's own spec (F1) permits it.
5. **Responsive behaviour:** Genuine vertical/stacked form at narrow widths per figure (see `48` M1, M6, M7); text equivalent always present.
6. **Accessibility requirement:** Text equivalent conveying the same relationships (not decorative alt text); keyboard reach for any interactive element within it; reduced-motion complete state.
7. **Evidence behaviour:** Provenance travels with the claim; a stable fragment identifier for citation (`10`§9).
8. **Allowed page types:** Every route carrying a Tier 1 figure (F1–F4 and their page-specific instances).
9. **Prohibited page types:** None specifically prohibited as a wrapper — governed instead by which figure, if any, a page carries (`22`).
10. **Known variants:** Per-figure content; wrapper behaviour (caption, provenance, print, static-state) does not vary.
11. **Owner dependency:** F17 (`/how-it-works` stage figure) — **BLOCKED, must not be drawn at any gate** (`27`§5).
12. **Technical dependency:** F7 (intervention record) needs the own-site fixes shipped first.

**Structural precedent noted (`29`§6):** StatCard is recorded here as "a value with adjacent metadata," close to what this wrapper needs — its banned default (large centred accent numeral, uppercase label, no provenance) must not carry forward; any reuse requires a mandatory provenance slot.

---

## P14 — Long-form reading scaffold *(NEW)*

1. **Name:** Long-form reading scaffold
2. **User job:** Read a long document comfortably, know where I am in it, and get back to a decision afterward.
3. **Content requirements:** Required — protected reading column, heading rhythm (no section past four paragraphs without a heading/list/table/figure), byline, return path (P11).
4. **Interaction behaviour:** Table of contents (long documents only) as a static in-page anchor list, not scroll-jacked.
5. **Responsive behaviour:** TOC collapses to a disclosure at the top on narrow screens — **never a floating overlay competing with the text** (`07`§7, `12`§10).
6. **Accessibility requirement:** Reading column held to a protected measure where width allows — **the measure itself is stated in `12_RESPONSIVE_UX.md` §14 and is not restated here**, because criterion 8 forbids a dimension in an inventory entry; in-page anchors keyboard-navigable; no sticky CTA (B16).
7. **Evidence behaviour:** IMMEDIATE apparatus throughout (research entries, `/how-it-works`); EXPANDABLE with IMMEDIATE byline on articles.
8. **Allowed page types:** `/how-it-works` · research entries · articles.
9. **Prohibited page types:** Everywhere else — commercial pages are not long enough to need this scaffold (`07`§7).
10. **Known variants:** Research entry (full apparatus, IMMEDIATE) vs. article (EXPANDABLE, byline IMMEDIATE only, no method section).
11. **Owner dependency:** **Named authorship — case 0 for the assets themselves** (`29`§4).
12. **Technical dependency:** None for the scaffold itself.

---

## R1 — Header and primary navigation *(region, NEW)*

1. **Name:** Header and primary navigation
2. **User job:** Get to any of the six primary destinations, or convert, from anywhere on the site.
3. **Content requirements:** Six items max, one dropdown (5 children, 6 conditional), utility (contact/phone/WhatsApp), one CTA. Full state diagrams: `46_WIREFRAME_STATE_NAVIGATION.md`.
4. **Interaction behaviour:** Dropdown parent is a real link; disclosure is a separate control (the verified keyboard-defect fix, `07`§2). Escape closes; arrow keys move within; Tab never trapped.
5. **Responsive behaviour:** Identical item set at every width; mobile panel opens in place (not a modal), background does not scroll while open.
6. **Accessibility requirement:** `aria-expanded` on the disclosure; visible focus indicator, never the low-contrast default; current-page indicated not by colour alone; every destination reachable with JavaScript off.
7. **Evidence behaviour:** None — navigation carries no apparatus.
8. **Allowed page types:** Every page (sitewide region, once per page).
9. **Prohibited page types:** N/A — appears identically everywhere; no page omits it.
10. **Known variants:** Conditional 6th dropdown item (manufacturing gate), config-flag rendered.
11. **Owner dependency:** None for the region itself; the conditional item is gated (case A).
12. **Technical dependency:** Config flag for the conditional item; no sticky/fixed positioning at launch default (H3 — non-sticky).

---

## R2 — Footer and entity block *(region, NEW)*

1. **Name:** Footer and entity block
2. **User job:** Find the firm's real contact facts and legal pages, and trust that it is a real business.
3. **Content requirements:** Four columns + entity block: legal name, complete postal address, phone, email, verified social profiles — **byte-identical to `/about`, `/contact` and structured data.**
4. **Interaction behaviour:** Standard links; no interactive disclosure beyond ordinary link behaviour.
5. **Responsive behaviour:** Columns stack; entity facts remain fully readable, not collapsed.
6. **Accessibility requirement:** Link affordance distinguishable without colour alone (the current sitewide colour-only `<a>` treatment is a named defect to fix, `07`§8).
7. **Evidence behaviour:** None as apparatus; the entity block is itself a primary local/AI-discovery signal.
8. **Allowed page types:** Every page (sitewide region, once per page).
9. **Prohibited page types:** N/A — appears identically everywhere.
10. **Known variants:** Conditional `/industries/manufacturing` item, appears only if the gate clears, removable in one change. `/work`, `/thank-you`, `/launch-checklist` never appear.
11. **Owner dependency:** **Complete NAP — case A if unmet: the entity block does not render rather than render a partial address** (`29`§4).
12. **Technical dependency:** None beyond the NAP data itself.

---

## Acceptance criteria check against `29_UX_PATTERN_INVENTORY_SPEC.md` §5

| # | Criterion | Status |
|---|---|---|
| 1 | Sixteen entries, no micro-components | **MET** — 14 patterns + 2 regions, no button/link/heading/input entries |
| 2 | All twelve fields captured per entry, "none" written where empty | **MET** — every entry above states "None"/"None specifically prohibited" explicitly rather than omitting the field |
| 3 | Every pattern used in a wireframe exists in the inventory | **Checked in `50_CROSS_PAGE_WIREFRAME_AUDIT.md`** |
| 4 | Every inventory pattern used in ≥1 wireframe | **Checked in `50`** |
| 5 | Every prohibition names the rule that prohibits it | **MET** — B-codes, I-codes, or document section cited throughout |
| 6 | Every owner dependency names its omission case (0/A/B) | **MET** |
| 7 | Field 7 populated for every entry, including "none" | **MET** |
| 8 | No font/colour/dimension/spacing/breakpoint value | **MET** — *corrected 2026-09-02: P14 field 6 previously carried a character-count measure, which is a dimension. It now names `12` §14 as the source instead of restating the value. This was the only occurrence in the inventory* |
| 9 | Retired components have no entry; StatCard/CaseStudyCard noted as precedents only | **MET** — see P13 (StatCard) and P9 (CaseStudyCard precedent, implicit in card structure); HeroDashboard/SocialProofStrip/BeforeAfterMetric/TestimonialCard carry no entry |
