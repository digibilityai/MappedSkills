# Google Ads R4.1: final visual refinements (local review variant, NOT live)

Preview: `/google-ads-preview-r41` (development only; 404 in production). R4 and R3 are kept for comparison.
Nothing committed, pushed, merged or deployed.

## Changed (only these three areas)
1. **Hero**: new paragraph (owner text); illustration column 6 to 5 grid columns (stage 610 to 503px wide, about 17.5% smaller, aspect ratio kept); search results card 94% of the stage, landing page 50% and softened so it reads as secondary; same animation sequence.
2. **Why Google Ads**: heading and one-line intro sit side by side, shorter intro and note, tighter lane padding. The three approved examples are untouched (test compares them with R4).
3. **Campaign types**: same five-tab selector, heading and intro side by side, smaller section padding, tighter panel spacing. Panels still share one grid cell, so the height is that of the tallest panel and tab switching never shifts the page.

## Section heights at 1440px
| Section | R4 | R4.1 |
|---|---|---|
| Hero | 767 | 696 |
| Why Google Ads | 1067 | 749 |
| Campaign types | 1026 | 749 |

Selector height is identical across all five tabs at every width checked.

## Files (all new, untracked)
`components/google-ads-r41/{content.ts,GoogleAdsR41.tsx,CampaignSelector.tsx,google-ads-r41.css}`, `app/google-ads-preview-r41/page.tsx`, `tests/google-ads-r41-preview.test.cjs`, `docs/google-ads-r3/REVIEW_R41.md`, `docs/google-ads-r3/r41/`.
R4.1 imports the R4 hero animation and journey track and re-exports R4 copy for every unchanged section.

## Reversal
`rm -rf components/google-ads-r41 app/google-ads-preview-r41 tests/google-ads-r41-preview.test.cjs docs/google-ads-r3/r41 docs/google-ads-r3/REVIEW_R41.md`
