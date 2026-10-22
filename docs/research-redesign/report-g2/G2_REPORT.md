# Research report G2 (local implementation, 2026-10-22)

Branch `feat/research-report-g2` (worktree `../MappedSkills-report-g2`, from origin/main 8aa191c). **Nothing committed, pushed, merged or deployed.**

**Status: OD-10 resolved at the visual-editor evidence level (2026-10-22). G2 awaits the owner's visual approval of the running implementation.**

## OD-10 (resolved at the visual-editor evidence level)
- **Evidence:** the owner reviewed the Contentful editor screenshots and reported that no embedded item sits between "This contrast sits at the heart of the study." and "Most websites could preserve…". (Owner-reported; I did not see the screenshots.) This agrees with the public live HTML, which also shows a plain paragraph in that position.
- **Limitation:** the raw Contentful JSON was **not** inspected, so this is not a definitive source-node audit. An unsupported node that the editor view does not show cannot be excluded; the guard below would flag it on any credentialed run.
- Pipeline findings (V, code): the shared `ResearchRichText` returns `null` for non-finding block entries; `RICH_TEXT_WITH_LINKS` requests no `sys.id` for other entry types; inline entries and entry/asset links are not queried. Local Contentful keys are empty, and no credentials, caches or env files were read.
- Guard retained: `findUnrendered` (`report-rules.ts`) reports unresolved or non-finding block entries, assets without a file, inline entries, entry/asset links, unknown node types and marks. `ReportBody` logs a `console.warn` and sets `data-unrendered`. It detected every such shape inserted after that paragraph in a synthetic test, and `tests/research-report.test.cjs` covers them. Contentful was not modified.

## Test evidence (preview content is a FIXTURE)
The preview and browser checks use a local fixture rebuilt from the public live HTML (`/tmp` scratchpad; Contentful-shaped, served by a fetch preload). It is not Contentful data, so it cannot show embeds the live HTML never rendered.
- `tsc` clean; `eslint .` 0 errors (1 pre-existing warning); `npm test` 273 pass / 0 fail (10 new in `tests/research-report.test.cjs`); `npm run build` passes (with the fixture).
- Chromium, Firefox, WebKit at 1440/1280/768/375/320: no horizontal overflow, no text under 12 px, all anchors resolve (`#executive-summary`, `#body-1`…`#body-10`, `#methodology`, `#limitations`, `#findings`, `#cite`), 5 findings, 4 bar lists, 3 verified chart captions, 1 image kept, 4 status marks, one H1. Research text identical to the approved mockup (228 of 228 blocks).
- Heights: 17,078 px at 1440 (mockup 17,412); 23,612 px at 375 (mockup 23,768).
- Final re-check (production build, `next start`): served 200; 150 ms (0.15 s) link and rail transitions; reduced motion about 0 ms; 3 chart-image links return 200; all deep-link ids present; 0 console errors at 1440; no overflow at 320.
- Reduced motion: transitions ~0 ms. Keyboard focus outlines present in Chromium and Firefox; WebKit automation did not move focus with Tab (Safari default), so not verified there.
- Not run: real devices, screen readers, Contentful-backed run, Core Web Vitals.

## Differences from the approved mockup
- Real fonts/chrome and the consent banner (mockup used captured chrome).
- Copy buttons also announce through a polite live region.
- Replaced chart images are not in the DOM (mockup kept them `display:none`); the caption link opens them.
- A two-column table is a status list only if it holds YES/NO/UTD/N/A codes; otherwise a scrollable, focusable table.
- Close tertiary link keeps ink-on-tangerine like the secondary button.
- Added: guard, `data-unrendered`, Downloads and Related blocks (only when present).
- Images not matched to a list keep the mockup's choice: no visible caption (alt text remains).

## Evidence retention
Screenshots (29 PNG, 17 MB) are **not committed**; they stay local in `docs/research-redesign/report-g2/screenshots/` (git-ignored) in the worktree `../MappedSkills-report-g2`. The fixture and fetch preload used for the preview live outside the repository; production code has no fixture mode and uses the existing Contentful getters unchanged.
