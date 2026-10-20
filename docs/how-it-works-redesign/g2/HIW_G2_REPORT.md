# How It Works G2: implementation report (18 Oct 2026)

- **Page:** `/how-it-works`.
- **Branch:** `feat/how-it-works-g2`, from `origin/main` `347ac5e`, in the worktree `../MappedSkills-hiw-g2`. No upstream is configured.
- **State:** uncommitted. Nothing is pushed, merged or deployed, and there is no PR.
- **Authority:** `DEC-058`, appended to `docs/00-project/DECISION_LOG.md` on this branch. It records the R2 and HW-D08 approvals and the G2 authorisation.
- **Source of truth:** the approved G1 R2 mockup (`../g1/mockup/`) and `../g1/HIW_G1_NOTES.md`. Plan: `HIW_G2_IMPLEMENTATION_PLAN.md`.

## 1. Change inventory

| File | Change |
|---|---|
| `app/(pages)/how-it-works/page.tsx` | Title and description set to the approved HW-D08 strings; header comment. Path, canonical and structured data unchanged. |
| `components/cplus/how-it-works/content.ts` | Rewritten: the R2 copy (`HOW`). It replaces `METHOD_PLAIN`, which nothing else imported. |
| `components/cplus/how-it-works/MethodBody.tsx` | Rewritten: seven sections, server component. Same export name. |
| `components/cplus/how-it-works/Journeys.tsx` | **New** client component: four sequences on the unchanged shared `useSequence` (`stepMs: 1500, first: 0, dwellMs: 300`). |
| `components/cplus/how-it-works/PrioritySort.tsx` | R2 markup. Behaviour unchanged: `aria-pressed` toggle, polite status, the FLIP glide, the no-JS sorted fallback. |
| `components/cplus/how-it-works/icons.tsx` | **New** page-local glyphs (the mockup's drawings). The shared `Icons.tsx` is unchanged. |
| `components/cplus/how-it-works/how-it-works.css` | Rewritten from the mockup `hx.css`. **Every selector is scoped to an `hx-` class.** This was checked by parsing the file, because the mockup had one unscoped `svg` selector that would have reached other pages; it was removed. |
| `tests/how-it-works-page.test.cjs` | **New:** 8 guards (§3). |
| `docs/00-project/DECISION_LOG.md` | `DEC-058` appended. |
| `docs/how-it-works-redesign/` | The G0 audit, G1 R1 and R2 records, the mockup, the plan, this report, `g2/results.json` and the G2 screenshots. Bulk G0 and G1 screenshots are left out (they stay in the main checkout's untracked folder). |

**Not changed:**
- shared components: `ai-seo/Sequence.tsx`, `Close.tsx`, `Interactive.tsx`, `Icons.tsx`, `Breadcrumb.tsx`, `cplus.css`, `direction-c/primitives.tsx`;
- any other page;
- `lib/analytics.ts` (the page type stays `methodology`; a guard checks it);
- `app/sitemap.ts`, the consent bootstrap, `ContactForm` and `BookingLink`.

`git diff --stat origin/main`: 6 tracked files modified, plus 3 new source and test files and the docs folder.

## 2. Static gates (run in the worktree)

| Gate | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` (whole repository) | pass, 0 problems |
| `npm test` (all suites) | **132 pass, 0 fail**, 1 skipped (the pre-existing DB test that needs a database) |
| `npm run build` | pass (BUILD_ID `JGvIXIE7CKGp1kyKpueZi`; `/how-it-works` prerendered as static) |
| `npm run verify:build` | pass (23 prerendered pages checked) |
| `npm run build:cpanel` | pass |

## 3. Guard tests (`tests/how-it-works-page.test.cjs`)

- the approved title and description, the path and the H1;
- no long or double dashes in the copy;
- the exact HW-D01 sentence, and only one "review call";
- HW-D02 and HW-D06 content is absent, and nothing says MappedSkills reviews or qualifies enquiries;
- no guarantee, timeline or metric;
- the limits section is present and not a disclosure;
- the 1.5 s sequences on the shared sequencer, with no pause, replay or live region;
- CTA and link destinations, and the `methodology` page type.

## 4. Browser verification (Chromium/Playwright, production build, `next start`; results in `results.json`)

| Check | Result |
|---|---|
| **Mockup vs G2, each section** (reduced motion, end states), at 1440, 1024, 768, 390 and 320 | **35 pairs, max 0.045% differing pixels.** Section sizes are identical in every pair. |
| **Initial animated state** (step 1 lit) vs mockup `?step=1`, all four sequences at 1440 and 390 | max **0.022%** (0% for the stages and the report) |
| Sequence timing | gaps **1,501 to 1,502 ms** in all four. Step 1 shows at load (`data-at=0`). Each plays once and ends with `data-done`. |
| Keyboard | 9 step buttons. Enter on "Show step 2: We plan" shows step 2, stops the sequence, and focus stays on the button. The sort toggle works by keyboard (`aria-pressed=true`, status announced, focus kept). |
| Reduced motion | everything shown complete; nothing at opacity 0 |
| No JavaScript | sorted groups shown; toggle and pile hidden; nothing hidden by opacity; FAQ closed |
| Layout | no horizontal overflow at 1440, 1366, 1280, 1024, 768, 390 and 320; no text under 12 px. Desktop hero ends at 610 px (1440×900), 598 px (1366×768) and 584 px (1280×720), with the CTAs inside the first screen. |
| Accessibility (axe, WCAG 2.2 AA plus best practice) | **0 violations** at 1440, 390 and 320 (end states), and 0 after the animated sequences finish. One H1, no skipped levels, every `aria-labelledby` resolves. |
| Console | **0 errors** |
| Head | title, description, `og:` and `twitter:` match HW-D08. `robots: index, follow`. The canonical is `https://mappedskills.com/how-it-works`. JSON-LD: `Organization` only, unchanged. |
| Links | `/contact`, `/schedule-call`, `/services`, `/pricing`, `/faq` and `/` all return 200 |
| Analytics | the only `dataLayer` event on load is the existing `page_view`. No events, pushes or `data-*` hooks were added. |
| **Regression** (`<main>` on the G2 build vs live production, same code) | `/`, `/lead-generation`, `/conversion-optimization`, `/google-ads`, `/ai-seo` and `/contact`: **0%** each. `/contact` after client navigation from `/how-it-works`: **0%**, so the new stylesheet does not leak; `/contact` reuses the old `hw-sheet` class names. |

## 5. Discrepancies and open items

- **Selecting a step:** the shared sequencer reveals the whole block and highlights the chosen step. The mockup script highlighted the chosen step but kept later steps dimmed. G2 follows the shared, released behaviour (`/ai-seo`, `/conversion-optimization`, `/lead-generation`), so the shared component was not changed. This is a minor interaction difference, not a visual one.
- **GTM, for E6:**
  - heading ids kept: `hw-h1`, `hw-h-sort`, `hw-h-work`, `b-close-h`;
  - new: `hw-h-start`, `hw-h-info`, `hw-h-gaps`, `hw-h-qs`;
  - removed: `hw-h-first`, `hw-h-audit`, `hw-h-review`, `hw-h-tog`, `hw-h-decides`, `hw-h-measure`, `hw-h-not`, `hw-h-unknown`;
  - new `button.hx-n` step buttons ("Show step N: …");
  - CTA text and destinations unchanged;
  - no analytics code reads these ids or classes. The container-level GTM Preview check stays with E6.
- **Build warning:** Next warns that it found more than one lockfile, because the worktree's `node_modules` is a symlink to the main checkout. This is environment-only and also appears in the other worktrees.
- **Not done:** SR-1 to SR-5 (VoiceOver and TalkBack), Firefox and WebKit, real devices, E6.
- **Not authorised:** commit, push, PR, merge, deployment.
