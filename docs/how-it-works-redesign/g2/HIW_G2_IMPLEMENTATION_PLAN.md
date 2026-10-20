# /how-it-works G2: implementation plan (planning only)

**Status: PLAN, awaiting owner go-ahead.** No branch has been created and no source file changed. Nothing is committed, pushed or deployed.

**Authority:** owner, 18 Oct 2026: "R2 approved, including the proposed SEO title and meta description (HW-D08). Prepare G2 planning only; don't start implementation yet."

**Source of truth for G2:**
- the approved G1 R2 mockup, `docs/how-it-works-redesign/g1/mockup/` (`src/body.html`, `hx.css`, `seq.js`);
- `docs/how-it-works-redesign/g1/HIW_G1_NOTES.md`, for the copy, the FAQ and the exact metadata.

**Template:** the Lead Generation G2 (`DEC-057`, `docs/lead-generation-redesign/g2/LG_G2_REPORT.md`): same structure, same checks, same commit discipline.

## 1. Branch and workspace

- New branch **`feat/how-it-works-g2`** from the latest **`origin/main`** (currently `347ac5e`) in a separate worktree, for example `../MappedSkills-hiw-g2`.
- The main checkout (`feat/ai-search-redesign`) stays untouched.
- **First change on the branch:** append `DEC-058` (draft in §8) to `docs/00-project/DECISION_LOG.md` and update `CURRENT_STATE.md`. The log is recorded on the branch, not on `feat/ai-search-redesign`.

## 2. Exact change inventory

| File | Change |
|---|---|
| `app/(pages)/how-it-works/page.tsx` | **Modified:** title and description become the approved HW-D08 strings (§3). Path, canonical and the global structured data are unchanged. Still no `BreadcrumbList` (unchanged; not in scope). |
| `components/cplus/how-it-works/content.ts` | **Rewritten:** the approved R2 copy as one typed object (`HOW`). It replaces `METHOD_PLAIN`; nothing else imports it (verified). |
| `components/cplus/how-it-works/MethodBody.tsx` | **Rewritten:** seven sections as a server component (hero, getting started, finding priorities, doing the work, keeping you informed with the limits band, questions, close). Same export name, so `page.tsx` needs no new import. |
| `components/cplus/how-it-works/Journeys.tsx` | **New** client component with four sequences on the shared `useSequence`: `HeroPath` (3), `StartStages` (3, plus the working sheet `data-from` rows), `ActionBoard` (4 rows, no step buttons, as in the mockup) and `ReportTrack` (3). Options: `{ stepMs: 1500, first: 0, dwellMs: 300 }`. |
| `components/cplus/how-it-works/PrioritySort.tsx` | **Adapted (page-owned):** R2 card and lane markup and copy. The behaviour stays as it is today: one `aria-pressed` toggle, polite status, FLIP glide of 560 ms, the no-JS sorted fallback. |
| `components/cplus/how-it-works/how-it-works.css` | **Rewritten:** ported from the mockup `hx.css`. The review banner, the `hx-month-i` remnants and the mockup-only selectors are dropped. Classes keep a page prefix (`hw-`/`hx-`) and touch no shared rule. |
| `components/cplus/how-it-works/icons.tsx` | **New, page-local.** It holds the mockup's own glyphs. The shared `Icons.tsx` lacks plan, reply, link, receipt, scale and shield, and draws chart, chat and devices differently (verified on `main`). Keeping all the page's glyphs in one local file matches the approved drawings exactly and leaves the shared `Icons.tsx` **unchanged**. |
| `tests/how-it-works-page.test.cjs` | **New** guards (§5). |
| `docs/how-it-works-redesign/g2/` | The G2 report, portable verification scripts and result JSON. |
| `docs/how-it-works-redesign/g0/`, `g1/` | The audit, R1 and R2 records, the mockup and its build tool. **Lean footprint as for LG:** bulk screenshots go to an evidence archive outside Git unless you ask otherwise. |

**Must not change:**
- `components/cplus/ai-seo/Sequence.tsx`, `Close.tsx`, `Interactive.tsx`, `Icons.tsx`, `Breadcrumb.tsx`, `cplus.css`, `components/direction-c/primitives.tsx`;
- any other page;
- `lib/analytics.ts` (it maps `/how-it-works` to the `methodology` page type, which stays as it is);
- `app/sitemap.ts`;
- the consent bootstrap, `ContactForm` and `BookingLink`.

**The close section:** the R2 H2 sets "conversation." in paper on tangerine. The shared `Close` takes a plain string, so the page renders its own close section with the shared `b-close` classes and `ActionPair`, exactly as `/lead-generation` does. `Close.tsx` is not edited.

## 3. Metadata (HW-D08, approved)

| | From (live) | To (approved) |
|---|---|---|
| Title | How We Work, What We Measure, and What We Cannot Tell You \| MappedSkills | **How It Works: From First Call to Monthly Review \| MappedSkills** |
| Description | The published method: what is measured at each point on the chain, what cannot be attributed and why, and where a person decides rather than a process. Written to be checked. | **How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can’t show.** |

- The Open Graph and Twitter title and description follow automatically, because `createMetadata` reuses them.
- The H1 ("No mystery about what happens next."), URL, canonical, robots and JSON-LD are unchanged.
- **Typography note for your attention:** the mockup uses a curly apostrophe in "can’t". G2 will keep the curly form, matching the site's copy style, unless you prefer a straight one.

## 4. Build approach

1. **Port, don't redesign.** Map each mockup section to JSX one to one: the same headings, ids, class names (prefix kept), order and copy. Copy lives only in `content.ts`.
2. **Sequences:**
   - `useSequence` behaves as in the mockup: step 1 shown, 1.5 s apart, plays once, step buttons in the hero, stages and report, nothing moves under reduced motion or without JavaScript.
   - The working-sheet rows use the step index (`q.on`/state) instead of `data-from`.
   - The action board has no step buttons.
3. **Server-first.** The page body stays a server component. Only `Journeys.tsx` and `PrioritySort.tsx` are client components. No new dependencies.
4. **Accessibility carried over:**
   - one H1, no skipped levels;
   - native `<details>` closed on load;
   - a real `<table>` with a screen-reader caption, which becomes stacked rows on phones;
   - decorative figures `aria-hidden`, with captions;
   - visible focus;
   - every `aria-labelledby` resolves.

## 5. Tests and verification gates (all must pass before asking for G2 review)

**Unit guards** (`tests/how-it-works-page.test.cjs`, LG style):
- **Metadata and H1:** the exact approved title and description; path `/how-it-works`; H1 unchanged.
- **Copy:** no long or double dashes.
- **HW-D01:** the exact sentence is present, and there is no other "review call" wording.
- **HW-D02:** no "qualified enquiry", "accountable" or six-point ledger.
- **HW-D06:** no keyword-tool, analytics-start or AI-round lines.
- **No promises:** no guarantee, timeline or metric (the "Can you guarantee…" FAQ is the allowed exception, phrased as "No.").
- **Sequences:** `stepMs: 1500, first: 0`; no `setInterval`, Pause, Replay or `aria-live` in the sequences (the sort's own status line is allowed).
- **CTAs:** `/contact` and `/schedule-call`; "Related" links to `/services`, `/pricing` and `/faq`.

**Static gates:**
- `npm run typecheck`, `npm run lint` and `npm test` (all suites, not only the new one);
- `npm run build`, then `npm run verify:build`;
- `npm run build:cpanel`.

**Browser checks** on the production build (Chromium/Playwright, as for LG):
- **Mockup versus G2 pixel comparison:** each section at 1440, 1024, 768, 390 and 320, plus the journey states. Target: about 0.1% differing pixels or less, with any difference explained.
- **Layout:** no horizontal overflow at the seven widths; 0 console errors; axe 0 violations at 1440, 390 and 320.
- **Sequences:** timing gaps of 1,500 ms ± 10.
- **Keyboard:** every step button and the sort toggle are reachable, and focus stays put.
- **Reduced motion and no JavaScript:** everything shown complete.
- **Links:** every in-page link returns 200.
- **Head:** title, description, Open Graph, Twitter, canonical, robots and JSON-LD match §3.

**Regression:**
- `/`, `/lead-generation`, `/conversion-optimization`, `/google-ads` and `/ai-seo` main-content pixels are identical before and after (shared code untouched).
- `git diff --stat origin/main` shows only the files in §2.

**Analytics:**
- no new events, `dataLayer` pushes or `data-*` hooks;
- the page type stays `methodology`;
- heading-id changes recorded for E6 (§6).

**Not covered by G2** (stated, not claimed): SR-1 to SR-5 manual screen-reader checks, Firefox and WebKit, real devices, and the container-level GTM Preview (E6).

## 6. GTM and E6 record

No analytics code reads these ids or classes. That was verified for the current ids, and will be re-checked with `rg` in G2.

- **Kept:** `hw-h1`, `hw-h-sort`, `hw-h-work`, `b-close-h`.
- **New:** `hw-h-start`, `hw-h-info`, `hw-h-gaps`, `hw-h-qs`.
- **Removed:** `hw-h-first`, `hw-h-audit`, `hw-h-review`, `hw-h-tog`, `hw-h-decides`, `hw-h-measure`, `hw-h-not`, `hw-h-unknown`.
- **New elements:** step buttons (`button.hx-n`, labelled "Show step N: …"). The sort toggle stays a `button[aria-pressed]`.
- **CTA text and destinations:** unchanged.

## 7. Delivery sequence and stop points

1. Create the branch and worktree, then add `DEC-058` and the `CURRENT_STATE.md` update. *(Starts only on your go-ahead.)*
2. Implement, run the §5 gates, and write `HIW_G2_REPORT.md`. Serve a local production preview next to the mockup.
3. **Stop for your G2 review.** You approve or request changes.
4. Only on separate authorisations, each its own step:
   - a local commit;
   - push and a PR (to be reviewed by `anikesh-dev` under the branch ruleset; re-check the ruleset with `gh api` first);
   - merge;
   - a dispatch deploy with the documented rollback target.

**Effort:** roughly one working session for the build and verification, the same size as the LG G2.

## 8. Draft decision-log entry (to be appended on the G2 branch at step 1)

> ### DEC-058
> - **Date:** 2026-10-18
> - **Status:** Approved (owner): `/how-it-works` G1 R2 design, copy and SEO metadata. G2 planning authorised; implementation not yet authorised.
> - **Decision:**
>   1. The G1 R2 mockup is approved: `docs/how-it-works-redesign/g1/`, with the design, copy and FAQ as in `HIW_G1_NOTES.md`.
>   2. **HW-D01:** "A monthly performance report, and a review call where your service includes one." (approved 2026-10-17).
>   3. **HW-D02:** the qualified-enquiry ledger and "Accountable up to here" are removed from this page. The `DEC-005` wording elsewhere is unchanged.
>   4. **HW-D06:** "What we do not know" is removed.
>   5. **HW-D08:** title "How It Works: From First Call to Monthly Review | MappedSkills"; meta description "How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can’t show." The H1, URL, canonical and structured data are unchanged.
>   6. **HW-D03, D04, D05 and D07** as resolved in G1: the audit step is kept; the channel line is softened; the limits are visible and condensed; 1.5 s between steps.
> - **Not authorised:** implementation, commit, push, PR, merge, deployment; changes to other pages or shared components.
> - **Read with:** `DEC-005`, `DEC-051`, `DEC-053`, `DEC-056`, `DEC-057`.
> - **Approved by:** Project owner, 2026-10-17 (HW-D01) and 2026-10-18 (R2 and HW-D08).

## 9. Risks

| Risk | Mitigation |
|---|---|
| SEO change on a live URL (title and description) | Approved (HW-D08). Record the current title and Search Console impressions for the URL before release, where available, and review after release. |
| The shared sequencer or close is edited by mistake | Treat the files listed in §2 as read-only; check the diff stat in the gates. |
| Removed method content may have supported long-tail search or AI citation | Accepted with HW-D02 and HW-D06. The limits section is kept. Review Search Console after release. |
| The inbound links from CO, Google Ads, About and FAQ promise "what cannot be attributed" | Kept: the "What the numbers can’t always show" section stays, and a guard test checks its heading exists. |
| Release-readiness items still open (SR-1 to SR-5, E1, E6) | Carried forward and not claimed. They don't block G2 review, but they stay open for release. |
