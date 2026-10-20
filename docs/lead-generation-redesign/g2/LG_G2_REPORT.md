# Lead Generation G2: implementation report (17 Oct 2026)

- **Page:** `/lead-generation` · **Branch:** `feat/lead-generation-g2` (created from `origin/main` `0fe87b2`) · **Commit state:** one local commit on that branch (see the commit itself for the hash); **nothing pushed, merged or deployed; no PR.**
- **Authority:** owner "G1 Approved, Begin G2 Implementation" (17 Oct 2026), recorded as **`DEC-057`** in `docs/00-project/DECISION_LOG.md`. Source of truth: the final G1 mockup and `docs/lead-generation-redesign/g1/LG_G1_CONFIRMATION_04.md`.
- **Gate:** G2 was reviewed and approved by the owner (17 Oct 2026); push, PR, merge and deployment are not authorised (`DEC-057` addendum).

## 1. Summary

The approved G1 design is implemented as production code. The page keeps its route, title, canonical, H1, breadcrumb schema and global structured data. Seven sections follow the approved order: hero, the problem, what we do, how an enquiry reaches you, what we answer for, questions, close. Four journeys (hero, what we do, how it reaches you, what happens next) run at **2 s per step**, start with step 1 on screen, play once, stop when a visitor selects a step, and show everything complete without JavaScript or under reduced motion. The meta description is the approved option A. The G2 page matches the G1 mockup to **0 to 0.05 % differing pixels** in every section capture at 1440, 1024, 768, 390 and 320 and in all journey states (§4).

Factual boundaries as built: MappedSkills manages advertising campaigns; enquiries go directly to the client’s own form, CRM or WhatsApp, depending on setup; no manual review, approval or release by MappedSkills; delivery-route testing is conditional; clients receive a monthly campaign performance report; no monthly review call; no guarantee or quality claim.

## 2. Local preview (during the G2 review; not a permanent address)

The page was served by a production build (`npm run build`, then `next start`) and a dev server on local ports, with the approved G1 mockup served statically for comparison. These addresses only existed during the review session. To reproduce, see §8.

## 3. Exact change inventory (final commit)

| File | Change |
|---|---|
| `app/(pages)/lead-generation/page.tsx` | Modified: meta description → option A (LG-D19); header comment. Title, path, breadcrumb, structured data unchanged |
| `components/cplus/lead-generation/content.ts` | Rewritten: approved copy (`LG`), 136 lines |
| `components/cplus/lead-generation/LeadGenBody.tsx` | Rewritten: seven sections, server component, 228 lines |
| `components/cplus/lead-generation/Journeys.tsx` | **New** client component: four journeys on the shared sequencer, 153 lines |
| `components/cplus/lead-generation/lead-gen.css` | Rewritten: ported from the mockup `lx.css` (banner and unused outcome rules dropped), plus the kept questions and close helpers, 253 lines |
| `tests/lead-generation-page.test.cjs` | **New**: 8 guards for metadata, H1, dashes, boundaries, journeys, links, what happens next |
| `docs/00-project/DECISION_LOG.md` | Appended `DEC-057` and its addenda |
| `docs/lead-generation-redesign/g1/` | **New**: the approved G1 package (records, copy, register with approval marks, mockup, owner PDF, live-baseline and result JSON, `tools/build.cjs`), 41 files |
| `docs/lead-generation-redesign/g2/` | **New**: this report, 5 portable verification scripts, result JSON |

**Not in Git (repository footprint decision, 17 Oct 2026):** 192 screenshots, `LG_G1_REVIEW.html`, `LG_G2_REVIEW.html` and 7 superseded or non-portable tools are in the evidence archive `LG_G1_G2_evidence_archive.zip`, stored outside the repository (204 files with a SHA-256 manifest). Source changes: 4 files modified, 2 added. **No other page, no shared component and no `ai-seo/Sequence.tsx` change.**

Outside this branch: the main checkout keeps its own untracked copy of the original G1 working folder, and its `.claude/launch.json` carries two preview entries (`lg-g2-dev`, `lg-g2-prod`) that can be removed.

## 4. Verification (Chromium/Playwright only; production build unless stated)

| Check | Result |
|---|---|
| G1 versus G2 pixel comparison (reduced motion, same viewport, consent bar and dev badge removed) | 56 pairs compared (folds, each section at 1440, 1024, 768, 390, 320, full pages at 1440 and 390, 8 selected journey states, 4 initial states): **max 0.052 % differing pixels, 34 pairs identical (0 %)**. Journey states by selection and the initial armed states: **0 %** |
| Section heights | Identical to G1 at every width |
| Desktop hero above the fold | 1440×900: ends 611 px · 1366×768: 600 px · 1280×720: 587 px · CTAs inside the fold at all three. Tablet landscape (1024×768), tablet portrait (768×1024) and phones stack by design (as in G1); the fold rule applies to desktop |
| Layouts | 1440, 1366, 1280, 1024, 768, 390, 320 captured (screenshots in the evidence archive) |
| Horizontal overflow | None at any of the seven widths |
| Console errors | **0** on the production build (page load, reload, journeys, keyboard). On the **dev server** React logs a hydration warning about the `px-js` class on `<html>`; it appears identically on `/conversion-optimization`, `/google-ads` and `/seo`, so it is a pre-existing site-wide dev message, not from this page |
| Journey timing | Gaps 2,000 to 2,003 ms in all four journeys; step 1 shown at load; each plays once and stops on the last step |
| Keyboard | All 15 step buttons are reached by Tab; Enter on "Show step 2" shows step 2, stops the sequence, and it stays after 2.6 s; focus stays on the button; 3 px focus outline; no live regions |
| Reduced motion | All four journeys complete and still, no step highlighted, no dimming, nothing advances after 2.6 s; step buttons still work |
| No JavaScript | 15 steps all visible, none dimmed; hero chip and ad strip visible; FAQ items closed; 0 step buttons (numbers are `aria-hidden` markers) |
| Navigation and CTAs | Primary "Tell us what you’re trying to fix" → `/contact`; "Book a call" → `/schedule-call` (hero and close); `/how-it-works`, `/problems/traffic-but-no-enquiries`, `/services`, `/seo`, `/google-ads`, `/` all return **200** |
| SEO | Title unchanged; description = option A (also Open Graph and Twitter); `robots: index, follow`; canonical follows the site-URL setting (`http://localhost:3000` in this local environment; production reads its own value); JSON-LD: `Organization` and `BreadcrumbList` (Home › What we do › Enquiry generation), unchanged; one H1; no skipped heading levels; every `aria-labelledby` resolves |
| Copy | 0 long or double dashes; 0 of 43 forbidden terms (review, approve, confirm, verif, filter, criteria, qualified, genuine, guarantee, review call, right buyers, calling back, every enquiry, and others) |
| `npm test` | **125 tests, 124 pass, 0 fail, 1 skipped** (pre-existing skip); includes the 8 new guards |
| `npx tsc --noEmit` | Clean |
| `npx eslint .` | Clean (exit 0) |
| `npm run build` | Succeeds (webpack, 14.6 s); `/lead-generation` prerendered static; `npm run verify:build` OK (23 pages). The build warns that Next inferred the workspace root; that comes from this worktree sharing the main checkout’s `node_modules` by symlink, not from the page |

## 5. Not performed (do not treat the automated checks above as substitutes)
- **Manual screen-reader testing** (VoiceOver, NVDA, JAWS, TalkBack): not run. SR-style checks remain open.
- **Cross-browser testing** (Safari, Firefox, Edge, and mobile Safari/Chrome): not run. Everything above is Chromium.
- **Real-device touch and viewport testing:** not run (emulated widths only).
- Formal contrast measurement, 200 % zoom and text-spacing overrides, forced-colours mode, Lighthouse and Core Web Vitals: not run.
- Analytics and GTM (E6): no events were added or changed; a GTM Preview pass was not run.
- The deployed canonical, Open Graph image and structured data on the production host: not verifiable locally.

## 6. Deviations from the approved G1 (all listed)

1. **Sequencer implementation.** G1 used a small vanilla script; G2 uses the repository’s shared React sequencer (`ai-seo/Sequence.tsx`, unchanged) with `stepMs 2000, first 0, dwell 300`. Behaviour measured the same. Its "in view" thresholds differ slightly (40 % of the block or 45 % of the window, against 50 % or 40 % in G1), so a journey may start a few percent of scroll earlier or later.
2. **Hydration moment.** The server HTML shows every step complete; after hydration the journeys arm and show step 1 only (the pattern used on the other redesigned pages). On a slow connection a brief complete-then-step-1 change can be seen. G1 armed in its own script before first paint.
3. **Reduced-motion hero shadow.** The first G2 build showed an ink instead of a tangerine shadow on the example card under reduced motion; fixed with one CSS rule so it matches G1 (now 0.01 % difference).
4. **No review-only features.** The G1 banner, the `?step=`, `?motion=` and `?banner=` flags are not in G2 (they were review aids).
5. **Unused G1 CSS removed.** The banner and the outcome-card rules from Correction 01 were dropped; nothing visible changed.
6. **Questions breakpoint.** The two-column FAQ layout collapses at 767 px (the previous page’s value, which G1’s live CSS also used).
7. **Header, footer and breadcrumb** come from the live components rather than G1’s captured HTML. Pixel comparison shows no visible difference.
8. **Meta description** is option A as approved; the **canonical** shows `localhost:3000` locally only because of this environment’s site-URL setting.
9. **Docs location.** The G1 package was copied into the branch so `DEC-057` and the report point at files that travel with it.

## 7. Outstanding items and owner questions
- **Status:** G2 is owner-approved and committed locally; pushing, a PR, merge and deployment each need further authorisation.
- **Open from earlier, unchanged:** LG-D22 and LG-D29 (separate correction scoping, not started); LG-D24 (production factual correction, not authorised). **Note:** shipping G2 replaces the live page’s "Reviewed by us" and confirmation claims, which LG-D24 describes; it does not fix `/faq`, the 404 list, the blog CTA, the header description or the homepage text that point to a "published definition" (LG-D29).
- **Unverified claims on the page** (carried from `LG_G1_CONFIRMATION_04.md` §7): that any particular client’s integration works (not claimed); the data basis of the monthly report; "Where we can tell, which work brought it in".
- `DEC-057` numbering: other unmerged branches might also use the next number; check at merge.
- `CURRENT_STATE.md` was not updated (no phase change recorded until the owner decides).

## 8. Reproduce the verification (portable)
Run from the repository root, with `playwright-core` (a devDependency) and a Chromium it can launch. Serve the page (`npm run build`, then `npx next start -p <port>`) and the G1 mockup (`g1/mockup` with any static server).
- `node docs/lead-generation-redesign/g2/tools/shot.cjs <url> <outDir>` for folds, sections, full pages and metrics (run once on the G1 mockup URL into `<dir>/g1` and once on `http://<host>:<port>/lead-generation` into `<dir>/g2`).
- `node .../storyboard.cjs <url> <dir>/<g1|g2>/storyboard` and `node .../initial.cjs <url> <dir>/<g1|g2>/storyboard` for journey states.
- `node .../compare.cjs <dir>` for the pixel comparison (writes `<dir>/compare/summary.json`).
- `node .../checks.cjs http://<host>:<port> <outDir>` for timing, keyboard, reduced motion, no-JavaScript, copy, links and SEO.
The results recorded for the review are in `g2/screenshots/g2/checks.json`, `g2/screenshots/g2/metrics.json` and `g2/screenshots/compare/summary.json`.
