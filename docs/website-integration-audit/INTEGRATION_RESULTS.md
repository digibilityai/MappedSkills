# Integration Results (WP0 to WP7)

27 October 2026. Local implementation and verification only. Nothing was pushed, opened as a PR, merged, deployed or sent to a CMS. The changes are uncommitted in the integration worktree, awaiting owner review.

## 1. Identity

| Item | Value |
|---|---|
| Branch | `integration/frozen-designs-wp0-7` |
| Worktree | `/Users/amitguptaamit/gitrepo/MappedSkills-integration` (new; created from `origin/main`) |
| Base SHA | `3e0e921a76935a475ff148b2c57397c525fccd63` (equals `origin/main` after `git fetch`; the local `main` branch is stale at `7e18ffc` and was not used) |
| Production identity | Workflow "Production release", run `40329305830` (`workflow_dispatch`, success, 2026-10-26 13:17 UTC) on `3e0e921`. The live sitemap and page heads match that code. The rollback target `BUILD_ID` is not recorded in the repository (UNKNOWN) |
| Preserved | `MappedSkills-home-r2` (branch `design/homepage-visual-r2`) is untouched, including its 71 uncommitted paths, previews and dev servers. Nothing was reverted or deleted anywhere |
| State | Uncommitted. 25 tracked files modified (296 insertions, 102 deletions) and 82 new files |

## 2. Decisions recorded

`DEC-085` in `docs/00-project/DECISION_LOG.md` records D1 to D5, the seven frozen versions, the H1 and CTA supersessions, and the local-only status. `CURRENT_STATE.md` has a short entry. The text is drafted for the owner to confirm at review.

## 3. What changed

| Area | Change |
|---|---|
| Frozen designs carried in | `components/` folders for `resolve-home-r3`, `google-ads-r41`, `meta-ads-r22`, `d2c-r1`, `education-r2`, `real-estate-r2`, `enquiry-led-r11`, plus only the earlier-round modules they import (`google-ads-r3`, `google-ads-r4`, `meta-ads-r1`, `meta-ads-r2`, `meta-ads-r21`), found by import closure. Images: `public/images/resolve-r3` and `public/images/google-ads-r3`. Report documents (markdown only) for each design |
| Existing routes | Component swapped inside the existing `page.tsx` for `/`, `/google-ads`, `/social-media-ads`, `/who-we-help/{d2c,education,real-estate}`. Metadata, canonicals and BreadcrumbList lines untouched |
| Structured data | The five JSON-LD components keep their wrappers and Service nodes; FAQPage now reads the FAQ of the frozen design |
| New route | `app/(pages)/who-we-help/enquiry-led-businesses/page.tsx` and `EnquiryLedJsonLd.tsx` (BreadcrumbList and FAQPage); one line each in `app/sitemap.ts` and `lib/analytics.ts` |
| Homepage | Policy A sentence (D4); the audience card id `enquiry-led` renamed `real-estate` (it was the real estate card); one quiet pointer line to the fourth audience below the card grid |
| Navigation | `nav.ts` and `SiteHeader.tsx` carry the Who We Help dropdown with four audiences and the overview link |
| Footer | New "Who We Help" group, and "More services" group with the one-line note (D3); two small CSS rules |
| Tests | New `frozen-designs-integration.test.cjs` and four ported design tests; five old FAQ-parity tests and three nav assertions in the superseded-component tests updated |
| Not carried | `DesignSwitcher` import in `app/layout.tsx`, `?design=` rewrites in `next.config.mjs`, all `app/*-preview*` routes, homepage R2.1 edits, `components/resolve-home` and `resolve-home-r2`, `enquiry-led-r1`, preview-only earlier rounds, `next-env.d.ts` |

Deviation from the plan: WP2 proposed renaming shared modules to stable names. They were kept under their existing folder names. Renaming changes nothing the visitor sees and adds risk; the import closure and a test that fails on any reference to a removed round guard the dependency instead.

## 4. Seven-page route matrix

All values measured on an isolated production build (`next build --webpack`, then `next start` on a spare port) unless stated.

| Route | Design | Status | Title, description, canonical vs live | JSON-LD vs live | H1 (visible) | Frozen design match |
|---|---|---|---|---|---|---|
| `/` | Homepage R3 | 200 | Identical | Identical (Organization) | Live H1 kept | Not pixel-identical to the preview, by design: Policy A sentence and the pointer line add 126 px of height at 390 and 102 px at 1440 |
| `/google-ads` | Google Ads R4.1 | 200 | Identical | Organization, BreadcrumbList, FAQPage (6), Service | "Reach customers when they're looking for what you sell." | 0 differing pixels at 390 and 1440 |
| `/social-media-ads` | Meta Ads R2.2 | 200 | Identical | Organization, BreadcrumbList, FAQPage (7), Service | "Turn attention on Facebook and Instagram into business opportunities." | 0 differing pixels |
| `/who-we-help/d2c` | D2C R1.1 | 200 | Identical | Organization, BreadcrumbList, FAQPage (7) | "More orders matter. So does what they cost." | 0 differing pixels |
| `/who-we-help/education` | Education R2B | 200 | Identical | Organization, BreadcrumbList, FAQPage (10) | "Find learners who are ready for what you teach." | 0 differing pixels |
| `/who-we-help/real-estate` | Real Estate R2.1 | 200 | Identical | Organization, BreadcrumbList, FAQPage (9) | Live H1 kept | 0 differing pixels |
| `/who-we-help/enquiry-led-businesses` | Enquiry-Led R1.1 | 200 (new) | New: title 59 characters, description 157, unique across the site | Organization, BreadcrumbList, FAQPage (7) | "More enquiries are good. Better conversations are worth more." | 0 differing pixels |

"Identical" is a live-versus-local comparison of title, description, canonical, robots, Open Graph and Twitter tags and the list of JSON-LD types on 14 existing routes (the seven above except the new one, plus `/services`, `/lead-generation`, `/seo`, `/ai-seo`, `/conversion-optimization`, `/pricing`, `/contact`, `/work`). Pixel comparison used the `main` element, reduced motion, cookie banner hidden, against the frozen previews running from the other worktree.

## 5. P1 resolution matrix

| ID | Resolution | Evidence | Status |
|---|---|---|---|
| P1-01 Enquiry-Led route | Route, metadata, BreadcrumbList, FAQPage, sitemap line and analytics page-type added | 200; one canonical; `index, follow`; in sitemap once; schema equals visible FAQ (test); `/lead-generation` untouched | **Resolved locally.** Title and description still need search-result validation before release (D2) |
| P1-02 Metadata and H1 drift | Live title, description and canonical preserved on all existing routes; the four frozen H1s adopted and recorded | Head diff against live: identical on 14 routes; `DEC-085` | **Resolved locally.** The four H1 changes are a visible change to indexed pages; Search Console impact is an evidence gap |
| P1-03 Schema and FAQ parity | Wrappers kept; FAQPage generated from the rendered content; BreadcrumbList and Service kept | Test: for each route, schema question count and text equal the visible `details` (6, 7, 7, 10, 9, 7); breadcrumb leaf as before; Service only on Google and Meta | **Resolved locally.** The FAQ counts changed on Google (7 to 6), Education (7 to 10) and Real Estate (7 to 9) |
| P1-04 Homepage review-call sentence | Replaced with the Reporting Policy A sentence | Test and rendered text; the sentence now matches the other six pages | **Resolved locally** |
| P1-05 Mixed tree, dev hooks, shared modules | New clean worktree from verified `origin/main`; only approved work carried; dev hooks not carried; dependencies kept | Test fails if `DesignSwitcher`, `resolve-home`, `?design=`, preview routes or imports of removed rounds exist; build exit 0; no preview route in the build | **Resolved locally.** The original worktree keeps its R2.1 edits and hooks, unchanged and uncommitted |
| P1-06 Path to the fourth audience | Fourth dropdown item and active state; footer group; homepage pointer; reciprocal sibling links already in the page | Browser: hover, Escape, arrow keys and Enter reach the page; mobile menu tap reaches the page and closes the menu; footer lists four pages | **Resolved locally** |
| P1-07 Retained service pages unlinked | Footer "More services" group with an accurate note | Footer renders the four links on every page; they return 200 | **Resolved locally.** Whether this is enough link equity is an evidence gap |
| P1-08 Decision records | `DEC-085` drafted, `CURRENT_STATE.md` updated | Files in this branch | **Drafted; needs owner confirmation** |

## 6. Verification results (all run, 27 October 2026)

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `node --test tests/*.test.cjs` | 465 tests, 464 pass, 0 fail, 1 skipped (the skip was already present before this work) |
| Full `eslint .` | 0 errors, 2 warnings, both pre-existing in untouched files (`CaseStudyTemplate.tsx`, `paid-advertising-real-estate.test.cjs`) |
| Isolated production build | `next build --webpack` exit 0 in the integration worktree (its own `.next`; the dev server in the other worktree was not touched) |
| Preview isolation in production | `/resolve-preview-r3`, `/enquiry-led-preview-r11` and `/?design=…` serve 404 or the normal homepage; no preview route exists in the build or the sitemap |
| Routes | The seven routes and `/lead-generation`, `/seo`, `/ai-seo`, `/conversion-optimization`, `/contact` all 200; `/who-we-help` stays 404 by decision |
| Overflow, 320 / 360 / 390 / 768 / 1024 / 1440 | None on any of the seven pages (Chromium). Google and Meta tab strips scroll inside their own row at 390 and below, by design. WebKit and Firefox: 28 loads (7 pages, 390 and 1440), no overflow, no page errors |
| Header and content alignment | Equal left edges on all seven pages at all six widths |
| Initial scroll | 0 on all seven |
| Console | No errors or warnings, no failed responses (1440 px) |
| Reduced motion (emulated) | No running animations 800 ms after load; no faint headings |
| No JavaScript (emulated) | No hidden headings or sections; full text present |
| Keyboard | 40 Tab stops per page, every focused element had a visible focus style |
| Navigation | Dropdown by hover, Escape, arrows, Enter; active state on `Who We Help` and on the current audience link; Services stays active on `/google-ads`; mobile menu tap works and closes after navigation |
| Footer | No overflow at 320 to 1440; reviewed in a 1440 screenshot |
| Cookie banner | 209 px high at 390 by 844, hero CTA visible. At 360 by 640 and 320 by 568 the banner covers the lower part of the hero CTA until a choice is made; choosing "Reject analytics" removes it |
| Accessibility scan (axe-core, WCAG 2.0, 2.1 and 2.2 level A and AA tags plus best practice), 7 pages at 390 and 1440, run after all reveals settled | No violations on the homepage, Google Ads and Real Estate. Remaining colour-contrast items listed under P2-08 below. No other rule failed |
| Existing lead form | `/contact` renders one form (name, email, phone, service, message, "Send enquiry"); `/contact?intent=call` renders. **No form was submitted and no POST request was made.** Existing enquiry tests are part of the 465 |
| Analytics | `/who-we-help/enquiry-led-businesses` maps to page type `commercial` (test); the banner states that analytics stay off unless accepted (consent behaviour and event delivery to GTM were not exercised) |
| Metadata check for the new page | 59 and 157 characters; title and description unique among 17 other site pages; word overlap with `/lead-generation` title 0.22 and description 0.03 |

## 7. Remaining findings

### P2 (not launch-blocking)

| ID | Finding |
|---|---|
| P2-01 | CTA labels still vary by page (recorded in `DEC-085`) |
| P2-02 | Homepage card and dropdown say "Real estate developers" and "Real Estate"; the page says "property developers and Channel Partners". Homepage card text is frozen |
| P2-03 | One standalone link under 24 px: Google R4.1 "Meta Ads may fit better…" (183 by 22) and the Meta R2.2 equivalent (516 by 22) |
| P2-04 | Meta R2.2 root clips 7 px at 390 (no scroll) |
| P2-05 | Cookie banner still covers the homepage hero button on viewports shorter than about 740px until a choice is made. Reduced and made non-obstructive by section 10, not removed |
| P2-06 | `/lead-generation` has no link back to the Enquiry-Led page (needs approval to edit that page) |
| P2-07 | After release: delete unused superseded components (old `paid-advertising/*` page components are no longer rendered) and the 15 preview routes in the original worktree |
| P2-08 | RESOLVED in section 10. Earlier measurement: Contrast, measured: Meta R2.2 mock-up labels in the ad illustration ("Sponsored", "yourbrand.com", "Name", "Phone": 1.9 to 2.1 to 1); D2C "One order, illustrated" caption (3.4 to 1) and Education "Two campaigns, illustrated" caption (3.1 to 1) against 4.5 to 1; Enquiry-Led intentionally dimmed inbox rows (4.25 to 1). All are in frozen designs and were not changed |

### Deferred (unchanged)

`/services` tracking wording and the homepage free-account-review wording (`DEC-080` follow-ups); `/ppc-marketing` redirect; Wanderlooms case page; `/who-we-help` hub; `www` normalisation, `.htaccess`, GPTBot and CCBot; pricing page wording.

## 8. Limitations and unresolved risks

1. **Case-study links.** `/portfolio/om-sai-developer-meta-ads` and `/portfolio/google-ads-for-online-courses` return 404 in the local production build because Contentful credentials are not configured here. They return 200 on the live site (checked 27 October). Not exercised locally.
2. **SERP validation** of the Enquiry-Led title and description is not done; only length, uniqueness and overlap were checked.
3. **Search Console, rankings, backlinks** unavailable. The effect of the four H1 changes and the new FAQ counts on indexed pages is unmeasured.
4. **Screen readers and real devices** were not tested. Automated axe checks and keyboard checks do not replace them.
5. **Tests.** Several older `paid-advertising-*` tests still render the superseded components, so they pass without testing the live route. The new integration test covers route wiring.
6. **Rollback target** `BUILD_ID` of production is not recorded.
7. **Analytics events and consent** were checked by banner behaviour and page-type mapping only; events were not sent to GTM.
8. **Canonical:** the homepage canonical in the local HTML matches live, but a browser reading `link.href` reports a trailing slash; the underlying `createMetadata` code is unchanged.
9. **Deployment workflow:** the readiness smoke list in the deploy workflow was not run or changed; check at the deployment step that no path it asserts is affected.

## 9. Exact next approval needed

Review the branch and approve one of:

1. **Commit locally** on `integration/frozen-designs-wp0-7` so the diff can be reviewed as a commit (no push), after confirming `DEC-085`.
2. **Amend** any of the four H1 adoptions (P1-02), the footer note, or the homepage pointer line.

Separately, and only after review, authorise any of: push of the branch, a pull request, merge, and the dispatch of the production deployment (each a separate approval, none given).

## 10. Final local corrections (second pass, 27 October 2026)

Base SHA re-verified as `3e0e921a76935a475ff148b2c57397c525fccd63` on `integration/frozen-designs-wp0-7`. Still uncommitted; nothing pushed, merged or deployed.

### 10.1 Cookie banner (`components/analytics/ConsentBanner.tsx`, `app/globals.css`)

What changed: below 768px the banner is compact (smaller padding, 13px text, tighter gaps); while open it publishes its own height as `--consent-h`, which adds equal bottom padding to the page and `scroll-padding-bottom`. The two buttons keep identical classes, wording, order and size; no new state, no timers, no scroll behaviour; the stored choice and its tracking effect are untouched. Removing the variable on choice returns the page to normal (checked).

| Viewport | Banner height before | after | Hero button covered at load, before | after |
|---|---|---|---|---|
| 320x568 | 254 | 191 | button below the fold | below the fold |
| 360x640 | 209 | 169 | covered | covered |
| 390x664 | 209 | 169 | covered | covered |
| 360x740 | 209 | 169 | covered | **not covered** |
| 390x844 | 209 | 169 | not covered | not covered |
| 768x1024, 1440x900 | 150, 127 | 150, 127 | not covered | not covered |

New, measured at every viewport above: a keyboard-focused hero button scrolls clear of the banner, the last footer link can be scrolled clear of the banner, and after "Reject analytics" the variable and padding are removed. **Not met: at 360x640 and 390x664 the banner still covers the hero button at first load.** The button sits at 519 to 571px; a banner clear of it would have to be under 70px high, which cannot hold the required text and two 44px choices. Options that need owner approval: move the hero button up (frozen design), or place the banner in the page flow at the top (layout shift and a change to the recorded design of the banner).

### 10.2 Contrast (colour only; no layout or token changes)

| Item | Cause | Fix | Before | After (axe-core) |
|---|---|---|---|---|
| Meta mock-up labels ("Sponsored", "yourbrand.com", "Name", "Phone") | The homepage rule `.rv3-hero-fig small` (colour #B7B0BF) also matched these labels, overriding the #5C5665 they were designed with. Essential-to-the-illustration text, so corrected | Scoped overrides in `meta-ads-r22.css` restoring #5C5665 and `--c-dim` | 1.93 to 2.10 | no violation |
| D2C caption "One order, illustrated" | `--c-gap` | `--c-dim` | 3.40 | no violation |
| Education caption "Two campaigns, illustrated" | `--c-gap` | `--c-dim` | 3.12 | no violation |
| Enquiry-Led dimmed rows | opacity .5 | opacity .6 (calculated 5.5 to 1) | 4.25 | no violation |

First tried: changing the homepage caption rule itself. That altered the Google Ads hero, so it was reverted for a scoped override. Pixel check against the frozen previews afterwards (reduced motion, `main` only): Google Ads 0, Real Estate 0, Meta 881 and 1270 px, D2C 794 and 816 px, Education 949 and 971 px, Enquiry-Led 3265 and 3269 px (all at 390 and 1440, all in the corrected text); axe-core, 7 pages at 390 and 1440, with and without reduced motion after all reveals settled: 0 colour-contrast nodes in 28 runs.

New finding, not corrected (outside the four items): on Enquiry-Led, after choosing "Relevant to you", the rows that are not relevant fade to opacity .28 (about 1.8 to 1). This is the intended dimming of that view. Proposal if you want it changed: raise the opacity to about .6, which weakens the contrast between views.

### 10.3 Regression tests (`tests/frozen-designs-integration.test.cjs`)

Now 31 tests in that file, 475 in the suite (474 pass, 0 fail, 1 skipped as before). Added: for each of the seven routes, rendered markup carries the frozen design's class marker and none of the superseded `pa-` markup, the wrapper no longer imports the superseded component, the contact CTA is present and no long dash appears; Enquiry-Led is reachable from the homepage heading, the header, the footer and the sitemap and its route file exists; consent banner choices are styled identically, publish and remove `--consent-h`, and have no timers or scroll triggers; contrast fixes cannot silently revert. Existing metadata, schema, navigation, footer, redirects and dev-hook tests from the first pass remain.

### 10.4 Homepage height versus the frozen R3 (reduced motion, `main` element)

| Width | Before correction | After | Remaining cause |
|---|---|---|---|
| 390 | +126 (earlier measurement) | **+69** | pointer link 44 (touch target) and the Policy A sentence wrapping 25 |
| 360 | not measured | +76 | same |
| 320 | not measured | +103 | same plus an extra line |
| 768 | not measured | +101 | pointer 44 and sentence 57 |
| 1024 | not measured | +31 | sentence wrapping 32 (pointer adds 0) |
| 1200 and 1440 | +102 (earlier measurement at 1440) | **0** | none |

Cause found: the pointer was a separate row under the card grid. It now sits in the audience heading: beside the heading from 1024px (no height) and as one line under it below that. The remainder is the required Reporting Policy A wording and the 44px touch target; neither was shortened. Hierarchy and the approved sections are unchanged.

### 10.5 Verification, final build

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `node --test` | 475 tests, 474 pass, 0 fail, 1 skipped |
| `eslint .` | 0 errors, 2 warnings (pre-existing, untouched files) |
| `next build --webpack` | exit 0 (own `.next` of this worktree) |
| Production isolation | 0 preview directories in `app`; `/resolve-preview-r3`, `/google-ads-preview-r41`, `/enquiry-led-preview-r11` return 404; `/?design=resolve-r3` returns the normal homepage; sitemap has no "preview"; no switcher markup; `app/layout.tsx` and `next.config.mjs` contain no dev hook |
| Seven routes | 200; head and JSON-LD types identical to live on 14 existing routes; Enquiry-Led as designed |
| Overflow at 320, 360, 390, 768, 1024, 1440 | none on all seven; content and header edges aligned; scroll position 0 at load |
| Reduced motion, no-JS, keyboard focus | 0 running animations; 0 hidden headings or sections without JS; visible focus style on all 40 Tab stops per page |
| Console and network | no errors, no failed responses |
| WebKit and Firefox | 28 loads, no overflow, no page errors |
| Internal navigation | dropdown, Escape, arrow keys, Enter, mobile menu tap, active states, footer groups verified in the first pass; not changed since except the homepage heading link, covered by a test and the screenshots |

### 10.6 Limitations and blockers

1. **Hero button covered at first load at 360x640 and 390x664** (section 10.1); not fixable inside the approved designs and the existing banner position. Needs an owner decision.
2. Non-relevant rows in the Enquiry-Led "Relevant to you" view are about 1.8 to 1 (section 10.2).
3. Search-result validation of the Enquiry-Led title and description; Search Console, backlinks, screen readers, real devices, GTM events and the case-study links (404 here only because Contentful is not configured) remain as in section 8.
4. The consent bootstrap, provider and stored values were not modified; GTM event delivery was not exercised.

### 10.7 Is a local commit safe?

Yes for a local commit on this branch: base SHA matches, working tree contains only intended changes, tests, typecheck, lint and the production build pass, no secrets or untracked artefacts from other worktrees are included, and nothing leaves the machine. The two points above are product decisions, not reasons to withhold a local commit. Push, PR, merge and deployment remain unauthorised.

## 11. Owner decisions applied (27 October 2026, third pass)

1. **Consent banner on short phones.** At widths up to 767px and heights up to 739px the banner is in normal page flow as the first block, above the header (`.consent-banner`, `app/globals.css`); it no longer overlays anything there, so the homepage hero button cannot be covered. Taller phones and all wider screens keep the fixed bar and its clearance. Wording, the two identical choices, tab order (Privacy Policy, Accept, Reject), storage (`ms.consent.v1` becomes `granted` or `denied`, kept after reload) and region semantics are unchanged; axe finds no violations in the open banner. Measured at 320x568, 320x640, 360x640, 390x664 and 390x739: banner static at the top, hero button not covered, no overflow; at 360x740, 390x844, 768x1024 and 1440x900 the fixed bar is as before and does not cover the button. **Material risk: layout shift.** The banner appears after the page loads, so on a first visit on a short phone the content moves down by the banner height; measured CLS 0.23 to 0.34 on those viewports (0 elsewhere and for returning visitors). That is above the 0.1 target for those visits. Avoiding it needs space reserved before the page paints, which means a change to the consent bootstrap and is not done.
2. **Enquiry-Led "Relevant to you".** Non-relevant rows are subdued by muted brand colour (`--c-dim`, about 6 to 1), lighter weight, dashed outline, no fill and a lighter dot, instead of 28% opacity. axe finds 0 contrast violations in both views at 390 and 1440, three rows carry the Relevant tag, and "All enquiries" restores the original rows.

Superseded statements: section 10.1 (banner not met) and the 10.2 note on the 1.8 to 1 rows are resolved by this section; section 10.6 point 1 is replaced by the layout shift risk above.

