# Services G2: implementation report (18 Oct 2026)

- **Page:** `/services`.
- **Branch:** `feat/services-g2`, from `origin/main` `8618bbe`, in the worktree `../MappedSkills-services-g2`. No upstream is configured.
- **State:** **G2 approved by the owner (2026-10-18)**; uncommitted (commit not yet authorised). Nothing is pushed, merged or deployed, and there is no PR.
- **Authority:** `DEC-059`, appended to `docs/00-project/DECISION_LOG.md` on this branch.
- **Source of truth:** the approved G1 mockup (`../g1/mockup/`) and `../g1/SV_G1_NOTES.md`.

## 1. Files changed

| File | Change |
|---|---|
| `components/cplus/services/content.ts` | Rewritten: the approved copy as one typed object (`SV`). It replaces `SV_PLAIN`, which nothing else imported. |
| `components/cplus/services/ServicesBody.tsx` | Rewritten: five sections, server component. Same export name, so `page.tsx` is **unchanged**. |
| `components/cplus/services/Interactive.tsx` | **New** client component. `ProblemPicker` handles the selector and the six cards. `EnquiryJourney` runs on the unchanged shared `useSequence` (`stepMs: 1500, first: 0, dwellMs: 300`). |
| `components/cplus/services/icons.tsx` | **New**, page-local: the mockup's own glyphs. The shared `Icons.tsx` is unchanged. |
| `components/cplus/services/services.css` | Rewritten from the mockup `sv.css`. **Every selector is scoped to an `sx-` class**, and a test checks this. The mockup's unscoped `.px svg[aria-hidden]` rule, its `:root` variable and the review banner were not carried over. |
| `components/cplus/services/Journey.tsx` | Deleted. It was the old four-step journey, used only by the old body. |
| `tests/services-page.test.cjs` | **New:** 9 guards (§2). |
| `docs/00-project/DECISION_LOG.md` | `DEC-059` appended. |
| `docs/services-redesign/` | The G0 audit (with the 3 screenshots it shows), the G1 notes, mockup and tools, this report, `g2/results.json`, `g2/tools/verify.cjs` and 3 G2 screenshots. Other G0 and G1 review screenshots stay outside Git, in the main checkout's untracked folder. |

**Not changed:**
- `app/(pages)/services/page.tsx`: the title, description, canonical and path are unchanged;
- the shared `ai-seo/Sequence.tsx`, `Breadcrumb.tsx`, `Icons.tsx`, `cplus.css`, `direction-c/primitives.tsx` (`ActionPair` is reused), the header, footer and navigation;
- any other page;
- `lib/analytics.ts`: `/services` stays `commercial`;
- `app/sitemap.ts`, consent, the contact form, booking and the backend.

## 2. Tests and build (run in the worktree)

| Gate | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` (whole repository) | pass, 0 problems |
| `npm test` (all suites) | **141 pass, 0 fail**, 1 skipped (the pre-existing DB test that needs a database) |
| `npm run build` | pass. `/services` is prerendered as static (BUILD_ID `zF7bJ28_x3crl_Q4Vvp9i`). |
| `npm run verify:build` | pass (23 prerendered pages) |
| `npm run build:cpanel` | pass (BUILD_ID `CkYSfzxl0Dp9wAFFZXEyu`, the build used for the browser checks) |

**Guards** (`tests/services-page.test.cjs`):
- the title, description and path are unchanged, and the H1 is as approved;
- the six links go to existing pages, and measurement is not a seventh service;
- no guarantee, "qualified", figure or review call;
- the kitchen fitter is labelled as illustrative;
- no long dashes;
- the journey uses the shared sequencer at 1.5 s, once, with no pause or replay, and transitions are 150 ms;
- the selector highlights without hiding anything;
- `ActionPair` appears in both the hero and the close;
- the stylesheet is scoped.

## 3. Visual comparison against G1

Method: Chromium on the production build (`next start`). Each of the five sections was captured from the mockup and from G2, and the two were compared pixel by pixel (a pixel counts as different if any channel differs by more than 8/255).

| Comparison | Result |
|---|---|
| 5 sections × 1440, 820, 390 and 320 px (end states) | **20 pairs: 17 at 0.000%, max 0.032%.** Section sizes are identical in every pair. |
| Selector with "People visit, but few get in touch" chosen; journey at step 1 (1440 and 390) | 4 pairs, max **0.027%** |
| Hero: stations level with their headline lines | **0 px offset** at 1440, 1366 and 1280 |

The only non-zero pairs (≤ 0.032%) are anti-aliasing on the selector buttons' borders at phone widths. There is no layout or colour difference.

**Two capture artefacts were found and fixed in the verification script, not in the page:**
- The consent banner overlaid the bottom of the G2 captures. The script now rejects analytics first.
- The pointer was left over a card, so it was captured in its hover state. The script now moves the pointer away.

**Screenshots:** `g2/screenshots/full-1440.png`, `full-390.png` and `full-1440-nojs.png`.

## 4. Functional and accessibility results (`results.json`)

| Check | Result |
|---|---|
| Problem selector | Choosing "Not enough people find us" sets it pressed, marks Get found "Start here" and shows the status "Start with Get found: four services, just below." Switching moves the mark. Pressing the chosen option again clears everything. **All 6 cards stay visible in every state.** |
| Service links | the six cards go to `/seo`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/conversion-optimization` and `/lead-generation`. Every in-page link returns **200**, including `/how-it-works`, `/pricing`, `/contact`, `/schedule-call` and `/`. |
| CTAs | hero and close: primary "Tell us what you're trying to fix" → `/contact`; secondary "Book a call" → `/schedule-call` |
| Journey | step 1 is on screen at load (`data-at=0`); the gap between steps is **1,501 ms**; it ends with `data-done` and stays on step 3 (checked 3 s later). It plays once. |
| Micro-interactions | computed transition durations on the options, cards, icons, link and step buttons are all **150 ms** |
| Keyboard | Space toggles an option, and focus stays on it. Enter on "Show step 2: Get enquiries" shows step 2 and keeps focus. Focus ring: 3px solid tangerine. Tab order: hero CTAs → 3 options → "Something else?" → 6 cards → report link → 3 step buttons → pricing → close CTAs. |
| Reduced motion | the journey is complete (`is-static is-all`) and nothing is dimmed |
| No JavaScript | the selector is not shown; each group shows its problem line; all 6 cards are visible; the steps are plain numbers; nothing is dimmed |
| Layout | no horizontal overflow at 1440, 1366, 1280, 1024, 820, 390 or 320 px; no text under 12 px; the hero CTA ends at 532 px (1440×900) and 449 px (390). Page heights: 5,070 px (1440) and 6,942 px (390), as in G1. |
| Accessibility (axe, WCAG 2.2 AA plus best practice) | **0 page violations** at 1440, 390 and 320, in the reduced-motion state, after the journey plays, and with a problem selected. One H1, no skipped heading levels. |
| Console | **0 errors** |
| Requests | 11 header and footer `_rsc` prefetches (`/work`, `/blog`, `/`) were aborted when the test navigated away. The same URLs return 200 when requested directly. No request failed because of this page. |
| Head | the title, description, `og:title` and canonical (`https://mappedskills.com/services`) are unchanged; robots `index, follow`; JSON-LD `Organization` only, as before |
| Analytics | `dataLayer` holds only the existing `consent:default`, `page_view` and `consent:update` |
| **Regression** (`<main>` of the G2 build vs live production) | `/`, `/how-it-works`, `/seo`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/conversion-optimization`, `/lead-generation`, `/contact`: **0.000% each** |

**Accessibility notes:**
- **While the journey is waiting or playing,** steps not yet reached are dimmed (opacity 0.3), and axe reports contrast on them. This is the same transitional pattern as the released `/how-it-works`, and the end states are clean.
- **One axe item comes from the shared site chrome, not this page.** When the shared skip link has focus, it partly covers the header logo (`target-size`). The same happens on live `/how-it-works`. It is out of scope and was not changed.

## 5. Deviations from the approved design

- **Selecting a journey step:** the shared sequencer shows the whole journey and highlights the chosen step. The mockup's script highlighted the chosen step but kept later steps dimmed. G2 follows the shared, released behaviour, as `/how-it-works` G2 did, and the shared component was not changed. This changes the interaction only, not the visuals.
- **No other deviation.** Copy, layout, typography, spacing, illustrations and responsive behaviour match the mockup (see §3).

## 6. Remaining checks and risks

- **Not done:**
  - SR-1 to SR-5 manual screen-reader checks (VoiceOver, TalkBack);
  - Firefox and WebKit;
  - real devices;
  - the container-level GTM Preview (E6).
- **SEO:** the H1 changes from "Digital marketing that works together." to the approved SV-D01 H1. The title and description, which still contain "Digital Marketing That Works Together", are unchanged. Review Search Console for `/services` after release.
- **E6:** the heading ids are recorded in `DEC-059`. No analytics code reads them (checked with `git grep`).
- **Build warning:** Next warns that it found more than one lockfile, because the worktree's `node_modules` is a symlink. This is environment-only, as in the other worktrees.
- **Not authorised:** commit, push, PR, merge, deployment.

**Rerun the checks** with the mockup served on port 3198 and the build on port 3199:

```bash
node docs/services-redesign/g2/tools/verify.cjs
```
