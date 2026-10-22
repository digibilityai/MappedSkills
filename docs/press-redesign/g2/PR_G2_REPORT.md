# /press G2: local implementation report

**Status:** **OWNER VISUALLY APPROVED (2026-10-22), empty and populated previews, including Research, About and the footer.** Committed on a feature branch with a PR; **NOT AUTHORISED TO MERGE OR DEPLOY.**
**Media contact:** `info@mappedskills.com` **confirmed by the owner** as final (was OD-7).
**Worktree:** `../MappedSkills-press-g1` (detached at `e62b380`, origin/main). **Decision:** `DEC-076` (appended; number to be re-checked at merge).

## Previews
| State | URL | What it is |
|---|---|---|
| Empty (live state) | http://127.0.0.1:3401/press | production build, `next start`, no Contentful credentials. The real empty code path, **not** Contentful-backed |
| Populated | http://127.0.0.1:3402/press | `next dev` on a scratch copy with a **fixture** fetch preload (3 fake releases labelled FIXTURE). Not Contentful data |
| Research / About | same hosts, `/research`, `/about` | |

## Files
| File | Change |
|---|---|
| `app/(pages)/press/page.tsx` | renders `CplusPage` + `PressBody`; metadata, `revalidate`, getter unchanged |
| `components/cplus/press/PressBody.tsx` | new: hero, latest news (empty / rows), background tiles, media close |
| `components/cplus/press/content.ts` | new: approved copy (mailto subject unchanged) |
| `components/cplus/press/press.css` | new: `pr-` scoped, 150 ms feedback, reduced-motion |
| `components/direction-c/nav.ts` | `FOOTER_INSIGHTS` + Press; header comment |
| `components/direction-c/SiteFooter.tsx` | comment only |
| `components/cplus/research/ResearchBody.tsx`, `content.ts` | one extra "Newsroom →" link in the "For journalists" strip |
| `components/cplus/about/AboutBody.tsx`, `content.ts`, `about.css` | slim "For journalists" strip before the close (`ax-press*`) |
| `docs/00-project/DECISION_LOG.md` | `DEC-076` appended; DEC-070 untouched |
| `tests/press-page.test.cjs` | new, 7 tests |

## Exact changes outside /press
- **Footer (every page):** Insights = Blog · Research · **Press**. Nothing else.
- **Research:** "Newsroom →" beside the existing "Media enquiry →" in the For journalists strip. Nothing else (the "embargoed materials" wording there is unchanged, per OD-4).
- **About:** new strip "For journalists. Press releases and our media contact are in the newsroom. Visit the newsroom →" between the team and the close. Team placeholders and their release gate are untouched.

## Results
- `tsc --noEmit`: clean. ESLint on touched dirs: clean. `npm test`: 281 tests, 280 pass, 0 fail (1 skipped, pre-existing). `npm run build`: succeeds, `/press` static with 1 m revalidate.
- Playwright Chromium, WebKit, Firefox × 1440/1280/768/375/320 (60 runs, `tools/check.cjs`, `screenshots/checks.json`): no horizontal overflow, no text under 12 px, one H1, footer Press link once. Only console errors: the dev server's HMR websocket on :3402 (dev-only; none on the production build).
- Footer shows Blog|Research|Press on `/`, `/services`, `/blog`, `/research`, `/about`, `/contact`, `/faq`, `/press`.
- Every internal link on `/press` returns 200. Title, canonical (`https://mappedskills.com/press`), robots (`index, follow`) unchanged; the only JSON-LD is the existing site-wide Organization.
- Keyboard: tab order reaches Home, email, "How to reach us", the Research link; 3 px outline on focus. "How to reach us" jumps to and focuses the close.
- Reduced motion: transitions ~0 s; normally 0.15 s.
- Populated (fixture): three dated rows, headline links to `/press/<slug>`, excerpt optional. Fixture slugs 404 on the detail route (no such Contentful entry), expected.
- `/research` and `/about` render with one extra link each and no overflow/console errors in all engines.

## Limitations (honest)
- **No real Contentful verification**: no credentials locally; live site shows zero releases (G1 audit). First real release should be checked after publishing.
- Not done: screen readers, real devices, GTM Preview, per-pixel regression diff of Research/About.
- `/press/[slug]` still uses the older body system (OD-6, out of scope).
- `JournalistsCta` is now unused, left in place.
- Screenshots in `screenshots/clean-*` hide the consent bar; `*-full.png` show it overlapping.

## Production
No production, Contentful, CI, server or GitHub changes. Local servers on 3401/3402 only.

## Pre-commit and final validation (2026-10-22, before commit)
- `origin/main` still `e62b380` (not advanced); no open PRs; `DEC-076` unique. DEC-070 untouched; DEC-076 addendum records the approval and the confirmed address.
- No change under `lib/` (Contentful getters, queries, mappers) or `app/(pages)/press/[slug]`; metadata unchanged.
- `tsc` clean; ESLint 0 errors, 1 pre-existing warning (`CaseStudyTemplate.tsx`, untouched); `npm test` 281 tests, 280 pass, 0 fail, 1 skipped; `npm run build` succeeds.
- Production build smoke: `/`, `/press`, `/research`, `/about` return 200, each with the footer Press link; `/press` mailto is `info@mappedskills.com`.
- The populated-state fixture and screenshots were **not** committed; the fixture is not Contentful data and does not verify real Contentful behaviour.

## Remaining
- Real Contentful check after the first release is published; screen readers, real devices, GTM Preview; release-detail page redesign (OD-6).
- Committed in the PR: all files in the Files table plus this report. Not committed: G1 folder, screenshots, check scripts.
