# /social-media-ads Visual R1: implementation notes

26 October 2026. Local only on `feat/paid-advertising-homepage`. Recorded as DEC-080. No commit, push, PR, merge or deployment.

## Implementation
- `components/paid-advertising/meta-ads/`: `PaidAdvertisingMetaAds.tsx`, `FeedMockup.tsx`, `content.ts`, `meta-ads.css`, `MetaAdsJsonLd.tsx`.
- Route `app/(pages)/social-media-ads/page.tsx`: live metadata and `BreadcrumbJsonLd` (label "Paid social") unchanged; FAQPage and one Service node added. The Service node has the same `@id` and fields as the one `/services` emits.
- Superseded C+ components under `components/cplus/social-media-ads/` are left in place, unused; `tests/social-ads-copy.test.cjs` still guards them.

## Evidence and status
| Item | Status |
|---|---|
| SEO title and description | UNCHANGED from live, pending Search Console review. Provisional: "Meta Ads Management for Businesses in India \| MappedSkills" and "Reach relevant customers on Facebook and Instagram. MappedSkills plans and manages Meta Ads for growing Indian businesses, from audience to enquiry." |
| Om Sai | Wording follows the live case (2 and 3 BHK in Chembur, specific buyer brief, broad property advertising changed to lifestyle-led creative and messaging). Reported figures are on the case page and are not shown here |
| Wanderlooms | MISSING DESTINATION: no individual case page. Unlinked factual preview from the owner's credibility line |
| Click-to-WhatsApp | Owner confirmed delivery (recorded in DEC-080). No performance claims |
| Phone mockup | Illustrative and labelled "Sponsored, Illustrative ad". The product image is the generic apparel tile, not client creative |

## Follow-up work (separate batches, NOT done here)
- `/services` "Included in management" tracking line conflicts with DEC-080 and should be aligned.
- Homepage: reporting wording and the "free advertising account review" FAQ.
