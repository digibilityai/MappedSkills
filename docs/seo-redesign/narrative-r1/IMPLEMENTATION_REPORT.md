# /seo seven-scene redesign: implementation report (local, for visual review)

**Date:** 2026-10-31 · **Where:** `MappedSkills-six-cases` (branch `feat/paid-case-studies-six-local`), preview on **port 3500** (left running). **Decision:** `DEC-105`.
Nothing committed, pushed, merged, deployed or published. Contentful was read, never written.

## Changes (all in `MappedSkills-six-cases`)
| File | Change |
|---|---|
| `components/cplus/seo/SeoBody.tsx` | Rewritten as seven scenes. Removed: the work route rail and mobile strip, the review sheet, the pledges, the projects list, the auto-populating cards and their `Suspense`. Added: the work lines, one composed proof section (AnybodyCanBake stage, Ameba row), the closing line under the steps |
| `components/cplus/seo/content.ts` | New copy (approved wording reused; new lines marked in the proposal) |
| `components/cplus/seo/proof.ts` (new) | Server loader: which of the two SEO cases is in the public library |
| `app/(pages)/seo/page.tsx` | Now `async`, awaits `loadSeoProof()`. Metadata, canonical, breadcrumb unchanged |
| `components/cplus/seo/seo.css` | Pruned the old scenes; added work, proof, how-it-runs styles; motion reduced to hero route, problems and steps (once, gated to no-preference) |
| `tests/seo-page.test.cjs` | Rewritten for the new structure and proof rules |
| `tests/case-study-paid-batch-2.test.cjs`, `tests/stage5d-accessibility.test.cjs` | Two assertions that described the removed cards and pledges now describe the new gating and proof rows |
| `docs/00-project/DECISION_LOG.md` | `DEC-105` appended |

## Hydration mismatch: cause and fix
- **Reported error:** "A tree hydrated but some attributes of the server rendered HTML didn't match", only on `/seo`.
- **Cause (diagnosed from React's diff, not guessed):** `RelatedCaseCards` is an async server component inside `<Suspense>`. `PaReveal` and `HwSequence` (client effects) run as soon as their own part hydrates and set `data-pending` and `data-anim="armed"` on `[data-reveal]` and `[data-hw-seq]` elements already in the document, including those inside the not-yet-hydrated Suspense content. React then hydrated that boundary and found two attributes the server HTML did not have. The diff named exactly those two attributes on the case cards. `/google-ads` and `/` showed no error.
- **Fix:** the page now resolves the case-study availability on the server before rendering (`await loadSeoProof()`), so there is no streamed boundary and the whole page hydrates in one pass. No warning was suppressed (`suppressHydrationWarning` is not used).
- **Result:** 0 console errors on `/seo` at 1440, 390 and 360 in the dev server and in the production build.

## Verification
| Check | Result |
|---|---|
| `node --test tests/*.test.cjs` | 561 tests, 560 pass, 0 fail (1 skipped, as before) |
| `tsc --noEmit` | clean |
| `eslint` on the changed `/seo` files | clean |
| Fresh production build (`rm -rf .next`, `next build --webpack`) | compiled, 48 static pages, `/seo` static with 1 m revalidate |
| Narrative order, 1440 / 390 / 360 | seven scenes in order; h1 plus six h2s |
| Overflow, broken images, clipped figures | none at 1440, 390, 360 (2 images, both load) |
| Proof, local preview | AnybodyCanBake stage: 46.15% lead, 91 → 133, 16,400 → 20,580 (+25.49%), 15,348 → 20,039 (+30.56%), period, caveat; both case links return 200 |
| Mobile menu, FAQ, close CTA | menu opens at 390 and 360 and lists the nav; FAQ opens; close CTA `/contact`, 52 px (64 px at 360) |
| **Production behaviour, preview disabled** (`next start` with real Contentful read) | `/seo` 200; **no** `anybodycanbake-seo` link, **no** 46.15%/16,400 figures, `/portfolio/anybodycanbake-seo` is 404 as expected; proof shows **Ameba Software only**, heading "SEO work we've delivered", with its case link (200); no empty section; no preview data |
| Page length | 1440: 8,034 → 6,713 px; 390: 9,305 → 7,554 px; 360: 9,391 → 7,661 px (local preview, with both cases) |

## Differences from the proposal
- The "Related" strip lists Google Ads, AI search, All services (as proposed).
- In production today the proof heading falls back to "SEO work we've delivered" and shows Ameba only, until `anybodycanbake-seo` is published in Contentful. I added this so no unpublished link or figure can appear.
- The headline reads exactly "46.15% more tracked organic course enquiries" as the lead; "91 → 133" is directly under it.

## Unresolved issues for Amit
1. **Release dependency:** `/seo` will show the AnybodyCanBake proof only after the `anybodycanbake-seo` entry is published in Contentful. Releasing `/seo` alone shows Ameba only (safe, but thinner).
2. **Ameba logo artwork** on the `/work` card reads "Ameba Softwares" (the client's wordmark). Not on `/seo`; not edited.
3. **Visual review needed** at the three widths (desktop pacing of the dark proof stage, the mobile order of stage then text).
4. The Next.js dev "N" badge appears over some screenshots; it is the dev overlay, not page content.

## Screenshots (`screenshots-implemented/`)
`seo-new-{1440,390,360}-full.png` and per-section crops (local preview, both cases); `seo-new-{1440,390,360}-faq-open.png`; `seo-new-{390,360}-menu-open.png`; `seo-prod-*` (production behaviour, Ameba only).
