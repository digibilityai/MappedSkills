# Editorial R2 batch: local implementation report (31 October 2026)

**LOCAL only** on `feat/paid-case-studies-six-local`. Nothing committed, pushed, merged, deployed or published; no Contentful write. Decision record: `DEC-112`. Review preview: `http://localhost:3500` (left running). Production-build checks ran on a separate port (3511, now stopped) from an isolated copy with the preview switches off.

## Local links (port 3500)
- Blog: `/blog`, `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` (featured), `/blog/seo-company-in-pune`, and the five other articles
- Press: `/press`, `/press/marketing-measurement-gap-indian-websites`
- Research: `/research`, `/research/marketing-measurement-gap-indian-business-websites`, `/research/industry-benchmarks`

## Screenshots and recordings
- `screenshots/`: eight pages at 1440, 820, 390 and 360 px (production build, consent answered).
- `recordings/` (webm, real pages playing): `blog`, `press`, `research` on desktop in motion and with reduced motion; `research-phone` in motion and reduced; `report-contents-desktop`; `report-contents-phone-keyboard` (Enter opens "On this page", a chapter link jumps).
- `data/playback.json`: per-frame measurements of the real playback on the production build (below).

## What changed (built on the existing R3 implementation)
- **Blog:** excerpts shown in full (the three-line clamp is gone); ordinary reading-time labels only, no bars; featured article plus one collection of the other six; staged opening and an image reveal.
- **Press:** a light, ruled "The figures, each with its source." section (paper, ink rule, burnt figures) between the dark hero and the background records, so there is no uninterrupted dark block; figures are the latest release's recorded findings with their sample and source; section order alternates paper and ground; a link to the full release.
- **Research hub:** statement hero; the headline finding as its own scene; "what it means / what it doesn't mean"; the other findings, each with its own chart where validated; sector bars with values printed; the report once; method; close. Every chart has a text legend (below).
- **Report:** "On this page" grouped into five reading chapters over the existing headings (navigation and a plain "Chapter n of 5" label only); article, release and report keep every heading, text and anchor.
- **Type floor (editorial pages only):** labels 12 px, notes 14 px; no site-wide token changed.
- **Focus on first visit:** while the consent banner is up, a control that takes keyboard focus is scrolled out from behind it.
- Removed: `components/cplus/research/sample.ts` (superseded by explicit counts).

## Data
- **Press findings:** `/press` calls the existing `getPressReleaseBySlug` for the latest release and the existing `splitLeadingFigures`; no new query, field, schema or write. The route's metadata is unchanged.
- **Research counts:** explicit in `components/cplus/research/evidence.ts`; a chart is drawn only if the recorded headline, recorded description phrases, recorded sample size (120) and recorded percentage all agree; otherwise the finding stays as text and a warning is logged. Tested for each failure mode.
- **Google Analytics legend (as recorded):** 51 Google Analytics not observed, 67 Google Analytics observed, 2 unable to determine, in three distinct square styles; the 67 and the 2 are never combined.
- **Other findings:** Meta Pixel 43, Google Ads-related 33, UTM 117 of 120; the remainder is labelled "the other websites audited" because the record does not say more.
- **Sector bars:** Fashion 66.7%, Jewellery 60%, Technology 10%, Manufacturing 6.7%, each value printed beside its bar.

## Motion: measured in real playback (per-frame sampling at 60 fps; production build)
| Pattern | Result |
|---|---|
| Staged opening (blog, press, research, article) | kicker 0.03 s, headline 0.1 s, lede 0.23 s, orange clause 0.35 s, actions 0.35 s; each 0.2 to 0.3 s; monotonic; about 0.7 s in total |
| Image reveal | clip uncovers left to right in 0.48 s and ends fully uncovered (never cropped or stretched) |
| Headline chart | released when a quarter visible; starts plain, marks in 0.33 s, monotonic |
| Other chart | 0.28 s, monotonic |
| Sector bars | 0.48 s, monotonic; values printed from the first frame |
| Values and legends | readable on every sampled frame (true for all three) |
| Frame timing | median 16.7 ms, 95th percentile 16.8 ms, longest 16.8 ms during chart and bar playback; one 150 ms frame at page load (hydration), before the opening begins |
| Reduced motion | no animation; every chart starts and stays in its finished state |
No count-up, autoplay, scroll trapping, sticky stage or fade-up on every block.

## Verification (production build, preview switches off)
| Check | Result |
|---|---|
| Tests | **PASS**: 594 run, 593 pass, 0 fail, 1 existing skip (new: `tests/editorial-batch2.test.cjs`, 10 tests) |
| `tsc --noEmit`, eslint | **PASS** |
| Fresh production build (isolated copy, `CASE_STUDY_LOCAL_PREVIEW` and `CONTENTFUL_CASE_STUDY_NEW_FIELDS` absent) | **PASS**: 45 static pages |
| 13 routes at 1440, 820, 390, 360 (52 checks; an earlier draft of this report said 14 routes and 56 checks, which miscounted): overflow, one h1, heading order, broken or stretched images, dead anchors, clipped content, nested scrolling, console and hydration, text floor (labels 12 px, notes 14 px), contrast (4.5:1, 3:1 large) | **48 pass; 4 flagged** at first (the heading order of one article, fixed below); **52 of 52 pass after DEC-113** |
| Links and CTAs in the pages | **PASS**: 28 internal targets resolve |
| Without JavaScript (14 route and width checks) | **PASS**: same words as with script, nothing hidden, charts in their finished state, the contents control opens and anchors jump natively |
| Reduced motion | **PASS** (above) |
| Keyboard: contents control (Enter), anchors, focus rings, share and copy controls | **PASS**; every focusable shows a 3 px ring |
| First-visit cookie banner (127 px, 169 px on phones), 28 route and width checks | Banner unchanged; Reject hides it and the choice persists across reload (28 of 28); no footer control sits behind it at page end; **no control is left behind it on keyboard focus (28 of 28)** after the focus handler. Before the handler, 15 of 28 route and width checks had at least one focused control partly under the banner |
| Metadata, canonical, robots, Open Graph, Twitter, JSON-LD vs the previous build (13 routes) and vs a HEAD build | **PASS**: identical |
| Substantive text | **PASS**: the only text removed from the previous build is the old "69 plain squares" caption (replaced by the legend) and the "15 sections" label; against HEAD, only the labels and the approved removals already recorded (`DEC-109`) |
| Production preview guards | **PASS**: untouched; tests green; preview-only studies absent from the production build |

## Unresolved (exact)
1. ~~Article heading order~~ corrected locally in the renderer (DEC-113); the recorded Contentful content is still h2 then h4 and is unchanged.
2. Imagery for articles without their own image (typographic cover shown; R3-4): needs owner assets.
3. Manual screen-reader and real-device checks were not run.
4. Recordings are Playwright webm (no ffmpeg here), at 1280 x 800 and 390 x 844.
5. Dead research stylesheet rules from earlier designs remain in `research.css` and `report.css` (harmless; remove with a later cleanup).
6. New small copy to confirm: "One sample. One clear result.", "Read the number. Then read its limits.", "The figures, each with its source.", the chart legends and captions, and the "Chapter n of 5" labels.


---

# Final editorial corrections (DEC-113)

Approved corrections, applied locally. No Contentful write; no commit, push or deployment.

## 1. Article heading order
- **Cause:** `/blog/performance-marketing-vs-digital-marketing` records seven h4 headings straight after the h2 "How Performance Marketing Works", with no h3 between (an h2 to h4 skip). The other six articles have no such pattern.
- **Fix (narrow, in the renderer):** an h4 that follows an h2 with no h3 in between renders as an `h3` with a presentational class (`ba-h4`) that keeps the h4 look (17 px, 700), the same text and **no id**. An h4 under a real h3 stays an h4; a well-ordered article renders exactly as recorded. A small tracker (`createHeadingOrderTracker`, `lib/contentful/heading-ids.ts`) holds the state, as the id allocator does.
- **Anchors:** none added, moved or renamed: the set of ids on the page is byte-identical to before, and the contents list is unchanged. The other six articles render the same heading tags as before.
- **Recheck at 1440, 820, 390, 360 px (production build):** h1 1, skipped levels 0, no overflow, no console errors, images fine, anchors resolve: **4 of 4 pass**.

## 2. Research heading
- "One sample. One clear result." is replaced by **"What we found across 120 websites."** The number is the report's recorded sample size, never typed into the copy; without one the heading reads "What we found." The other new labels, the chart captions and "Chapter n of 5" stand as approved.

## 3. Shared focus handler regression
- **What it is:** `EdMotion` (editorial pages only) listens for `focusin` while an editorial page is mounted and removes the listener on unmount. It acts only on **keyboard** focus (`:focus-visible`) inside `main`, and never on a control inside the banner or the header. One change made in this pass: the `:focus-visible` gate, so a mouse or touch press can never move the page.
- **Test:** `tools/focus-regression.cjs`, production build, cookie banner visible, at 1440, 390 and 360 px on `/contact`, `/work`, `/social-media-ads` (with `/blog` and `/press` for contrast): a 40-stop keyboard walk, the open menu (mobile menu button; desktop Services dropdown), contact form controls (typing, select, textarea), Reject, persistence after reload, and client-side navigation from an editorial page.
- **Result: 15 of 15 route and width cases clean, 0 defects introduced by the handler.**
  - `window.scrollBy` calls on `/contact`, `/work`, `/social-media-ads`: **0**, on direct load and after client-side navigation from `/blog` (the handler is gone once the editorial page unmounts).
  - Menu: opens, 8 stops with a visible focus ring each, Escape closes; **0** handler scrolls in the menu on every route (the page also scrolls natively while Tab walks the open phone menu, identically on `/contact` and `/blog`).
  - Contact form: name, email, phone, select and message take typed values; no scrolling by the handler.
  - Reject hides the banner and the choice persists after reload (15 of 15).
  - Every keyboard stop shows a focus ring (including the stretched card links on `/work`, whose ring is drawn on the link's overlay).
  - On `/blog` and `/press` (where the handler is active) it scrolls 5 to 10 times per 40 stops, only to lift a control from behind the banner; no editorial control is left behind it.
- **Existing obstruction, not introduced by the handler and not changed (as instructed):** with the banner up, keyboard focus on `/contact` (the email field at 390 px, "Request a call" at 390 and 360 px) and `/social-media-ads` (several controls, e.g. "Feed Ads", the case-study links) can sit behind the banner. These pages do not mount the handler. Extending the same handler to them would fix it; that is a separate decision.

## 4. Verification (fresh production build, preview switches off)
| Check | Result |
|---|---|
| Tests | 597 run, 596 pass, 0 fail, 1 existing skip (13 tests in `tests/editorial-batch2.test.cjs`, 3 new: heading order, research heading, focus handler scope) |
| `tsc --noEmit`, eslint | pass |
| Production build | pass, 45 static pages; environment has no preview switches |
| 13 editorial routes at 4 viewports | **52 of 52 pass**; 28 internal links resolve |
| Metadata, canonical, robots, Open Graph, JSON-LD vs the previous build | identical on all 13 routes |
| Substantive text vs the previous build | unchanged apart from the research heading and the chart captions already reported |
| Banner and focus on editorial routes (28 route and width checks) | 28 of 28: no focused control left behind the banner; Reject hides it and the choice persists |

## Remaining
1. Existing keyboard-focus obstruction by the cookie banner on `/contact` and `/social-media-ads` (above).
2. Imagery for articles without their own image (R3-4) and manual screen-reader and real-device checks, unchanged from the first report.
3. Unused CSS and article imagery were not touched in this pass, as instructed.
4. (Superseded by the next section: the banner obstruction on `/contact` and `/social-media-ads` is now handled.)


---

# Banner focus guard extended to /contact and /social-media-ads (DEC-114)

Local only; no commit, push, PR, merge, Contentful write or deployment. Preview: `http://localhost:3500`.

## What changed (smallest scoped change)
- **One implementation:** the focus code moved out of `EdMotion` into `components/editorial/BannerFocus.tsx` (client, renders nothing). `EdMotion` now renders it, so the editorial pages use exactly the same code as before, from one place.
- **Mounted on two more routes:** `app/(pages)/contact/page.tsx` (it returned `null`; the body lives in the shared layout) and `app/(pages)/social-media-ads/page.tsx` (one line). Nothing else on either page was touched. `/contact/call` shares the contact layout but its own page does not mount the guard (not requested).
- **No duplicate listeners, cleanup on navigation:** the listeners are attached once for the whole document and counted; the last unmount removes them (`mounts++ === 0` attach, `--mounts === 0` remove).
- **Acts only when needed:** only after the keyboard (Tab, arrows, Enter, Space, Escape) was the last input; a pointer, mouse or touch press switches it off. The control must match `:focus-visible`, must not be inside the banner or the site header (menus untouched), and its bottom edge plus room for the focus ring (6 px) must sit behind the banner. It then scrolls once, by the least amount that puts the control 22 px (6 px ring plus 16 px of air) above the banner, never so far that the control's own top leaves the view. A control already visible gets no scroll.
- **Scope widened from `main` to the whole document minus header and banner**, so footer controls are covered too; the header is excluded so the menus are never moved.
- **Untouched:** consent behaviour, banner design, forms, menus, both pages' design and content.

## Verification (production build on a separate port, preview switches off; banner visible)
| Check | Result |
|---|---|
| Tests | 597 run, 596 pass, 0 fail, 1 existing skip (new test of the guard's rules); `tsc` clean; eslint clean |
| Fresh production build | pass, 45 static pages; environment has no preview switches |
| Keyboard walk of the whole page, 15 route and width cases (`/contact`, `/social-media-ads`, `/blog`, `/press`, `/work` at 1440, 390, 360) | **0 controls left behind the banner** on all four guarded routes, 0 stops without a focus ring, 0 controls taller than the space above the banner |
| `/contact` fields and CTAs | email (reached by keyboard from a position that put it under the banner: clear at all three widths), phone, service, message, "Send enquiry", "Request a call" and "Send an enquiry" all clear; typing, select and textarea values correct |
| `/social-media-ads` links, controls, CTAs | all 79 keyboard stops at 390 (69 at 1440) end clear of the banner |
| Pointer, mouse and touch | **0 corrective scrolls** in 12 of 12 modality checks (control straddling the banner edge focused after a mouse press and after a touch: no scroll; after a Tab key: exactly one scroll, ending 22 to 24 px above the banner); real clicks and taps on a form input and a button also caused 0 guard scrolls |
| Already-visible controls | 0 guard scrolls (steps to controls well above the banner, 3 cases per route); an isolated control run showed identical scroll with the guard on and off |
| Mobile menu / desktop dropdown | opens with Enter, 8 stops with a visible ring, Escape closes it; 0 guard scrolls (header is excluded) |
| Reject and persistence | banner hides on Reject and stays hidden after reload: 15 of 15 |
| Client-side navigation | listeners from the framework baseline: +1 on guarded pages, +0 on `/work`; `/blog` to `/contact` or `/social-media-ads` stays at +1 (no duplicate), then to `/work` returns to the baseline (cleanup works) |
| Existing editorial protection | `/blog`, `/press`: 0 left behind the banner; the full editorial banner run (7 routes, 4 widths): 28 of 28 clear, Reject persists 28 of 28; 52 of 52 editorial route checks still pass |
| Console errors | none from the pages on any run |

## Remaining failures
None found in this pass.

Informational (not failures):
- On `/social-media-ads` and `/contact` a real tap or click on a button or input can move the page a little through the browser's own focus handling (`scrollBy` calls: 0, so not the guard).
- `/contact/call` shares the contact layout but does not mount the guard (outside the request).

## Checks not performed
- Real devices and real touch hardware (touch was emulated), iOS and Android on-screen keyboards with the banner, Safari and Firefox (Chromium only), browser zoom at 200%, screen readers.
- A valid contact-form submission (not sent, to avoid creating an enquiry); invalid-form focus behaviour was not exercised either.
- Every page other than the two requested, apart from `/work` as a control and the editorial routes.
- The development server was not used for the final guard run (its overlay adds a focusable element); results above are the production build.
