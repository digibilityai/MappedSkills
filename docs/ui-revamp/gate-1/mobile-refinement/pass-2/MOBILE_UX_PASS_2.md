# Direction C — Mobile Refinement Pass 2 & Final Validation

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` (uncommitted) |
| **Scope** | Targeted refinement of the Direction C **prototype**. No application code changed |
| **Before (frozen)** | `prototypes/direction-c-resolution-r1.html`: the pass-1 result, copied byte-for-byte before any edit |
| **After** | `prototypes/direction-c-resolution.html` |
| **Before/after page** | `mobile-refinement/pass-2/compare.html` (serve `gate-1/` over HTTP, see `gate-1/README.md`) |
| **Result** | **COMPLETE WITH EXCEPTIONS** (§7) |

Evidence labels follow `CLAUDE.md`. Every result marked **VERIFIED** was produced in Playwright Chromium (`playwright-core` from `Digi_Brain`; nothing was installed here). The scripts and their raw output are in `pass-2/validation/`.

---

## 0. What exists where (VERIFIED)

| Question | Finding |
|---|---|
| Is Direction C in the application? | **No.** `git diff main...HEAD -- app components lib` is empty. No route renders Direction C. All of the before/after refinements exist **only in the prototype HTML** |
| Are the pass-1 fixes in the prototype? | **Yes.** The pass-1 audit (`validation/audit.cjs`) re-run on the frozen copy shows no overflow, no collapsed or wrapped text, no targets under 44px and no console errors at any of the six widths |
| Is the earlier clipped orange "Capture / Convert / Measure" text still present? | **No.** The boundary label is a full-width list item at ≤899px. It is not absolutely positioned or squeezed into a column. The root cause was fixed at the component level in pass 1 and has been re-checked here |
| Did pass 1 regress desktop or tablet? | No new defects at 768, 1024 or 1440 |
| Mobile defects in actual application routes | **Not re-audited in this pass** (see E3). The known live defect `LIVE-1` (mobile-menu CTAs under the sticky header) is tracked separately. `DEC-033` says it may not be absorbed into redesign work, so it was not touched |

Because Direction C exists only as the prototype, this pass refined the prototype. Building it into the Next.js app is Gate 2+ work and has not been authorised.

---

## A. Baseline audit: issues found in the pass-1 prototype

The pass-1 detector passed. These issues were found by inspecting section-level captures at 360, 390 and 430 (`pass-2/before/`) and were then confirmed in the DOM (`checks-before.txt`: **16/37**).

| # | Issue | Route / area | Widths | Severity | Evidence |
|---|---|---|---|---|---|
| B1 | **The chain's accountability label was ambiguous.** "We answer for this much" sat *below* its tangerine rule, directly above "Opportunity & revenue". That reads as if MappedSkills answers for revenue, the opposite of the intended meaning | Home · chain | ≤899 | **High** (an evidence-meaning error, not cosmetic) | `before/360-how.png` |
| B2 | **Content was hidden on mobile.** The key under the chain is "Measure — every join recorded" for the accountable items and "Reported, not promised" for opportunity and revenue. It was `display:none` below 900px, so on mobile the client-owned stage lost its qualifier | Home · chain | ≤899 | **High** (a qualification hidden at mobile) | `checks-before.txt` |
| B3 | **The /seo horizon was too far down.** The "How long this takes, and what we will not promise" panel (12-month-plus horizon, paid-search alternative, nothing promised) came after the whole "situation" block. At 360 it was **1,285px** below the /seo top and **607px after the CTAs**, so a visitor met the ask about a screen before the expectation | /seo | ≤899 | **High** (the brief's explicit concern) | `checks-before.txt` |
| B4 | **The menu button did not show its state.** The button kept the hamburger icon when the menu was open. Only its visually hidden label changed to "Close menu" | Header | <1200 | Medium | `before/360-menu-open.png` |
| B5 | **Menu CTAs were smaller than page CTAs.** The header's `.hdr .btn` sizing leaked into the menu, which sits inside `<header>`. Menu CTAs were 44px tall; every other mobile CTA pair is 52px | Menu | <600 | Medium (CTA consistency) | `checks-before.txt` |
| B6 | **Services and company links were weakly separated.** The services block and the company links were divided only by a 1px hairline, the same weight as the rules between company items | Menu | <1200 | Low | `before/*-menu-panel.png` |
| B7 | **Section labels left one word on the last line,** e.g. "…BOUGHT TO / FIX" and "…FROM THE / INSIDE" | Global labels | <600 | Low | `before/360-seo.png`, `before/360-how.png` |
| B8 | **The friction intro touched the list.** The note "With no measurement in place…" sat directly on the friction list's top rule, with a 0px gap | Home · strategy | ≤899 | Low | `before/360-how.png` |

**Checked and found sound (no change made):**
- **Hero and first viewport.** The H1, lede and both CTAs sit inside 800px at 360.
- **Traffic/Enquiries toggle.** It is 44px+, keyboard operable, and `aria-pressed` is correct.
- **Proof panels.** Readable at 360. Every count, scope and limitation is intact.
- **Services rows.**
- **Close CTA.**
- **Footer.** Two columns, 44px rows, no clipping at 360, and the legal and analytics-preference links are reachable.
- **Overflow.** None at any width.
- **Reduced motion.**

---

## B. Change log

All changes are in `prototypes/direction-c-resolution.html`. **No copy was added, removed or reworded.**

| # | Change | Why | Affects |
|---|---|---|---|
| C1 | **Boundary label moved above its rule.** Below 900px the boundary item now has its rule on the *bottom* edge, so "We answer for this much" closes the five accountable items above it. The spine segment beside "Opportunity & revenue" is now dashed in the gap colour, matching the desktop "Reported, not promised" treatment | B1 | Home chain, ≤899 |
| C2 | **Measure key restored on mobile.** The existing `.measure` row is no longer hidden below 900px. It shows as a two-line key: a solid ink rule for "Measure — every join recorded" and a dashed rule for "Reported, not promised". This uses the existing text and the existing rule styles | B2 | Home chain, ≤899 |
| C3 | **/seo commitment panel moved first in the DOM.** It now comes before the situation block. On desktop (≥900) it already sat first, on the left, through explicit grid placement, so the desktop composition is unchanged (0 px diff). Below 900px it now follows the CTAs directly: **741px from the /seo top and 63px after the CTAs at 360** (was 1,285 and 607). The DOM order now matches the visual order at every width | B3 | /seo, ≤899 |
| C4 | **Menu button shows a close mark when open.** The two bars cross into an X when `aria-expanded="true"`. It uses a transform and opacity transition, which is 1ms under reduced motion through the existing global rule. The accessible name toggling is unchanged | B4 | Header, <1200 |
| C5 | **Menu CTAs match page CTAs.** `.mnav .actions .btn` is now 52px with standard padding and type, the same as the hero, /seo and close pairs | B5 | Menu |
| C6 | **Stronger services/company break in the menu.** A 2px ink rule and 14px gap now sit between the services block and the company links, the same rule weight as the services-section stage heads. All destinations and their order are unchanged. No "Company" heading was added, because that would be new copy | B6 | Menu |
| C7 | **Labels balanced on narrow screens.** Below 600px, labels use `text-wrap: balance`. This was already used for display, statement and title type. It degrades to normal wrapping where unsupported | B7 | Labels, <600 |
| C8 | **Friction intro spacing.** A 28px gap now separates the friction intro from its list below 900px (`.fr-side`) | B8 | Home strategy, ≤899 |

**Rejected or not changed:**
- **Sticky CTA** and **full-screen menu overlay.** Both conflict with §4.5 "0 fixed/sticky" and with the pass-1 decisions.
- **Scroll-triggered entrance motion.**
- **Hiding the duplicate header "Contact Us" while the menu is open.** That would alter the CTA architecture (see F2).

---

## C. Before/after comparisons

`pass-2/compare.html` shows paired captures at **360, 390 and 430** for:
- the open menu panel;
- the open menu at a 600px-tall viewport;
- the first viewport with the menu open;
- strategy and chain;
- /seo;
- proof;
- services;
- the close;
- the footer;
- the hero.

It also includes full pages at 768, 1024 and 1440. All raw PNGs are in `pass-2/before/` and `pass-2/after/`; together they come to about 33 MB.

---

## D. Responsive regression results (VERIFIED, `audit-after.txt`, `diff-result.txt`)

| Width | Overflow | Layout defects | Targets <44px | Console errors | Pixel diff vs before |
|---|---|---|---|---|---|
| 360 | none | none | 0 | 0 | Changed only in the chain, /seo, menu and label areas. Hero and header: **0 px** |
| 390 | none | none | 0 | 0 | Same as 360. Hero and header: **0 px** |
| 430 | none | none | 0 | 0 | Same as 360. Hero: **0 px** |
| 768 | none | none | 0 | 0 | Changed. 768 uses the single-column <900 composition, so C1–C3 and C8 apply there too. This is the same defect fixed in the same component, not a new tablet composition |
| 1024 | none | none | 0 | 0 | **0 px (identical)** |
| 1440 | none | none | 0 | 0 | **0 px (identical)** |

The audit's two known false positives are unchanged and are not defects:
- the H1 "enquiries" × "traffic" inline-box overlap, which is intended at 0.98 leading;
- the visually hidden menu label.

The footer and close captures differ by 1–2px in height. This comes from label line-box rounding under C7. They were inspected and are visually identical.

The pixel diff needed `document.fonts.ready` before capture. Without it, one 1024 run showed a spurious full-page diff caused by the font swap. The script now waits.

---

## E. Functional and accessibility validation

| Test | Result |
|---|---|
| **Pass-2 checks** (`checks.cjs`) at 360/390/430, plus desktop invariants at 1024/1440 | **37/37 PASS** after (16/37 before). Checks cover: icon open/close state; menu CTA height = page CTA height (52); menu CTAs full width; 15 menu links, none under 44px; horizon panel before the situation block and within one screen; boundary directly before "Opportunity & revenue" with its label above the rule; Measure key visible; desktop /seo panel still left on the same row; desktop chain unchanged |
| **Focus visibility** | **46 focus stops** walked by Tab at each mobile width. All have a ≥2px visible outline |
| **Keyboard and menu suite** (pass-1 `kb.cjs`, unchanged) | **20/20 PASS**. Covers: skip link first with a visible 3px focus ring; Tab order; Enter opens and the name becomes "Close menu"; CTAs first in the menu and inside 390×780; header not sticky; Escape closes and returns focus; a link closes the menu; at 390×600 the last item is reachable; toggle on Enter and Space; desktop disclosure (Enter, Tab into the panel, Escape, closed links inert, no `role=menu`) |
| **Motion** (`mmotion.cjs`) | Reduced motion: 0 pre-states and the stage is resolved. Motion on: 4 armed elements at load, 0 left unresolved after a full scroll. Menu opacity: 0 → 0.75 at 120ms → 1.00 at 450ms. Under reduced motion: 1.00 at 20ms |
| **Contrast** | No new colours. C1 and C2 use `--gap` and `--ink` rules, which are decorative, and the existing `--gap-text` label colour (4.90:1 on paper). C4 uses `currentColor` (ink) |
| **Screen-reader order** | C3 makes the DOM order equal the visual order on /seo at every width. The `.measure` key stays `aria-hidden`, as on desktop; the chain figure carries an `aria-label` and the boundary is a list item in sequence |
| **Repository checks** | `npm run typecheck` exit 0 · `npx eslint .` exit 0, no output · `npm test` **11/11 pass**. These cover the application, which this pass did not change |
| **Light/dark** | The prototype has **no dark mode**: THE RESOLVE is ivory/ink, and there is no `prefers-color-scheme` rule. Not applicable |

**Not performed (UNKNOWN):**
- real iOS Safari or Android Chrome;
- Firefox or WebKit engines;
- VoiceOver or TalkBack;
- 200% zoom;
- landscape phones;
- Windows High Contrast;
- production Core Web Vitals.

The 360/390/430 results come from Chromium emulation.

---

## F. Exceptions and owner decisions (not implemented, or needing sign-off)

| # | Item | Needs |
|---|---|---|
| **F1** | **C3 moves the /seo commitment panel ahead of the situation block on mobile.** Reverting it is one move in the DOM. It is not a new section and the copy is unchanged, but it changes what a phone reader meets second | **Owner sign-off** (recommended: keep) |
| F2 | **Two "Contact Us" buttons appear while the menu is open:** the one in the header bar and the one in the menu. Hiding either would change the frozen CTA architecture, so both were left | Owner decision |
| F3 | **"Capture" / "Convert" stage labels are hidden on mobile** (`.chain .stages`). Capture, Convert and Measure are explained in the list directly below the chain, so it is not restored. Restoring it would mean new mobile composition work | Owner decision (optional) |
| F4 | **The menu's company links have no group heading.** Adding one such as "Company" would be new copy, so C6 separates them with a rule instead | Copy approval if wanted |
| F5 | **Pass-1 §2.1 interface labels are still unapproved:** "How to read the marks", the 28-run key line, capability counts, and the /seo row labels | Copy approval (carried forward) |
| F6 | **Prototype hrefs are placeholders.** Mobile "Measurement" points to `#how`, while desktop points to `#services`. The real destinations come from production routing at Gate 2 | Gate 2 (not changed) |
| F7 | **`DECISION_LOG.md` still does not record Direction C as chosen** (pass-1 E6) | **Owner action** |
| F8 | **CLS 0.005–0.37 per run, caused by the Google Fonts swap** (pass-1 E1). Production self-hosts fonts through `next/font`, and its CLS has not been measured | RESEARCH REQUIRED |
| F9 | `LIVE-1`, `LIVE-2` and `PROC-1` were not touched (`DEC-033`) | Tracked separately |

**E3, application routes:** this pass did not run the app or re-audit live routes. The "representative additional routes using shared components" check does not apply, because the prototype is one page with no shared component library yet. The mobile state of the live routes is as recorded in the Gate 0 audit.

---

## G. Recommendation

**COMPLETE WITH EXCEPTIONS. The prototype is ready for owner review.**

Against the definition of done:
- **Overflow:** no verified critical mobile overflow remains (VERIFIED, six widths).
- **Menu and navigation:** usable and accessible: 20/20 keyboard, a visible state icon, 44px+ targets, and Escape and focus return.
- **CTA hierarchy:** clear and consistent. Every mobile CTA pair is 52px, full width, with the primary first.
- **SEO horizon:** now encountered within about one screen of the /seo top. This is subject to F1 sign-off.
- **Dense evidence panels:** legible and unaltered. The one place a qualification was hidden on mobile (B2) is fixed.
- **Footer:** readable at 360 with 44px rows.
- **Regressions:** desktop is unchanged (0 px at 1024 and 1440).
- **Automated checks:** they pass.

**It is not a production implementation.** Direction C exists only in the prototype. The owner needs to record the direction decision (F7) and sign off F1 before Gate 2 builds it into the application. No deployment was made.
