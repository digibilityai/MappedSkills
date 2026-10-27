# Pre-Release QA Matrix

27 October 2026. Read-only. Every row says **how** it was checked.

**Method key**
- **BT-C** browser-tested, Chromium (Playwright, headless) against the dev server `:3412` of this worktree. Fresh browser context per width. 
- **BT-WF** browser-tested, WebKit and Firefox (Playwright), 390 and 1440 px, load, overflow and page errors.
- **BT-P** browser-tested in the built-in browser pane (Enquiry-Led R1.1 only, six widths).
- **CMD** command run (`tsc`, `node --test`, `eslint`, isolated `next build` and `next start`).
- **CI** code-inspected only, **not** observed running.
- **NT** not tested; an evidence gap.

Pages: **H** Homepage R3 · **G** Google Ads R4.1 · **M** Meta Ads R2.2 · **D** D2C R1.1 · **E** Education R2B · **R** Real Estate R2.1 · **Q** Enquiry-Led R1.1.

## 1. Responsive and visual (320, 360, 390, 768, 1024, 1440 px)

| Check | H | G | M | D | E | R | Q | Method | Notes |
|---|---|---|---|---|---|---|---|---|---|
| No horizontal page overflow | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C, BT-P | `scrollWidth` equals viewport at all six widths on all seven. G and M have inner tab strips that scroll inside their own row at 390 and below (by design). M's root clips 7 px at 390 (P2-04). The 1024 and 1440 "overflow" flags on M are an animated carousel inside a clipped phone mock, not a defect |
| Overflow in WebKit and Firefox | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-WF | 390 and 1440 px, no page overflow, no page errors |
| Content aligned to header | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | H1 left edge equals header bar content edge: 16 px (320 to 390), 31 (768), 41 (1024), 96 (1440) on all seven |
| H1 scale | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | 35 to 40 px mobile, 42 to 49 px at 1024, 59 to 69 px at 1440 |
| Typography, spacing, section rhythm | **NT** | **NT** | **NT** | **NT** | **NT** | **NT** | Partly | CI | Approved designs; not re-reviewed (frozen). Screenshots in each design's report folder are the baseline |
| One `h1`, one `main`, skip link, `lang=en`, images have `alt` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | |
| Sticky or fixed UI overlap | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | Header is `position: relative` (not sticky). The only fixed element is the cookie banner |
| Cookie banner interference | Obs | Obs | Obs | Obs | Obs | Obs | Obs | BT-C | 209 px tall at 390 (about 25% of an 844 px screen), 127 px at 1024. Hero CTAs remain visible at 844 px. 320 by 568 not tested (P2-05) |
| Footer layout | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | Shared component; no overflow |
| Mobile menu | Pass | – | – | – | – | – | Pass | BT-C (touch) | Opens at 320, 390 and 768; links 44 to 60 px; Escape closes. Tested through the Q route; the header is shared by all seven |

## 2. Motion, interaction and accessibility

| Check | H | G | M | D | E | R | Q | Method | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Initial scroll position | 0 | 0 | 0 | 0 | 0 | 0 | 0 | BT-C | `scrollY` is 0 after load on all seven at 390 and 1440 |
| Reduced motion | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C (`reducedMotion: reduce`) | Zero running CSS or Web animations 800 ms after load; no heading left faint. JavaScript-driven frame loops and CSS transitions were not counted. Closes the "reduced motion not browser-emulated" item in the Enquiry-Led R1.1 report |
| No JavaScript | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C (`javaScriptEnabled: false`) | No heading or section below 0.3 opacity or hidden; text length 4.5k to 8.8k characters present. Resolves the open "true no-JavaScript" item in the Enquiry-Led R1.1 report |
| Once-only animations | Pass (CI) | NT | NT | Pass (CI) | Pass (CI) | Pass (CI) | Pass (CI) | CI | H uses `RvReveal3` (`unobserve` after first intersection); D, E, R and Q use `InViewOnce` (`disconnect` after first intersection, and no arming under reduced motion). G and M hero animations and selectors were not inspected for looping or replay. Frame captures exist in each report folder. Replay on scroll-back was not browser-tested |
| Keyboard reachability and visible focus | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | 40 consecutive Tab stops per page; every focused element had an outline or shadow. Visible-style presence only, contrast of the ring not measured |
| Keyboard operation of custom controls | – | NT | NT | – | – | – | Pass | BT-C (Q), CI (G, M) | Q: the "All enquiries / Relevant to you" radios change state with Space (Chromium) and by label click in Chromium, WebKit and Firefox. G campaign selector and M format selector expose `role=tablist` with 5 tabs and one selected tab; arrow-key behaviour not exercised |
| FAQ accessibility | Pass | Pass | Pass | Pass | Pass | Pass | Pass | BT-C | Native `details` and `summary` on every page (4, 6, 7, 7, 10, 9, 7); no custom ARIA to get wrong |
| Touch interaction | Pass (menu) | NT | NT | NT | NT | NT | Pass (menu) | BT-C (`hasTouch`) | Hover-only effects on Q are desktop extras; the numbers carry the meaning on touch (report note) |
| Layout shift (lab) | 0.001 | 0.044 | 0.002 | 0.002 | 0.001 | 0.001 | 0.00001 | BT-C | 390 px, development server, scrolled end to end. All under 0.1. Not field data |
| Colour contrast | NT | NT | NT | NT | NT | NT | NT | NT | Not measured. Tangerine on paper and grey states on the dark grounds are the places to check |
| Screen reader | NT | NT | NT | NT | NT | NT | NT | NT | No NVDA or VoiceOver run |
| `:has()` dependence on Q | – | – | – | – | – | – | Pass | BT-C, BT-WF | Toggle works in all three engines. Older engines without `:has()` show "All enquiries" only (content still readable) |

## 3. SEO, schema and content safety

| Check | Result | Method |
|---|---|---|
| Preview routes `noindex, nofollow`, no canonical | Pass on all seven | BT-C |
| Preview routes 404 in production | Pass: all 15 preview routes and the Enquiry-Led production URL return 404 with `noindex` | CMD (isolated build, `next start :3499`, stopped) |
| Dev switcher and `?design=` rewrite inert in production | Pass: `/` and `/?design=resolve-r3` return the normal homepage; no switcher markup | CMD |
| Previews absent from `sitemap.xml` | Pass (0 matches) | CMD |
| Live title, H1, schema parity | **Fail by design**: four routes differ in title and H1; FAQ and schema counts differ on three (P1-02, P1-03) | CMD (`curl`) vs BT-C |
| No invented results, prices, testimonials, ratings | Pass | Rendered text scan on all seven (percentages, rupee amounts, ROI, "trusted by", "guarantee") plus read of the matches |
| Reporting Policy A | **Fail on H** (P1-04); pass on the other six | Text and source |
| Tracking boundary, creative scope, Click-to-WhatsApp, ad-spend billing | Pass on G, M, D, E, R, Q | Source |
| Console errors and warnings | None on all seven at 1440 px | BT-C |
| Failed requests (4xx, 5xx) | None | BT-C |

## 4. Technical

| Check | Result | Method |
|---|---|---|
| TypeScript | exit 0 (`tsc --noEmit --incremental false`) | CMD |
| Unit tests | 502 run, 501 pass, 1 skipped, 0 fail. Tests encode the live pages and the R2.1 homepage; they will need updating for R3 | CMD |
| ESLint, scoped | exit 0 on the seven component folders, `components/direction-c`, preview routes | CMD |
| ESLint, full repository | Not run | NT |
| Production build | `next build --webpack` exit 0 in an isolated copy (46 static pages). The repository `.next` was not touched | CMD |
| Analytics page-type mapping for new route | Not present for Enquiry-Led | CI |
| Deploy readiness smoke list | The workflow's readiness smoke list was not changed or inspected for a new route; check at WP8 | NT |

## 5. Manual checks the owner or a later session must still do

1. NVDA and VoiceOver pass on one page of each type (homepage, a platform page, an audience page).
2. Real-device touch on at least one iPhone and one Android handset (menu, tab strips, the Enquiry-Led toggle).
3. Contrast measurement of the tangerine, muted and dark-ground text states.
4. Cookie banner against the hero at 320 by 568.
5. Search Console URL Inspection and rich-results check on the new and changed routes after deploy.
6. GTM and consent events on the new page set (consent default off; events fire after accept).

## 6. Regression guard for the integration itself

For each of the six existing routes capture `curl` head, JSON-LD, internal-link list and sitemap line **before** the swap; diff **after** the swap in an isolated build; accept only the differences the owner approved in D1 to D4. The same diff on `/lead-generation`, `/services`, `/seo`, `/ai-seo`, `/conversion-optimization` and the redirect list must be empty.
