# /google-ads Visual R1: implementation notes

26 October 2026. Local only on `feat/paid-advertising-homepage`. Recorded as DEC-079. No commit, push, PR, merge or deployment.

## Implementation
- `components/paid-advertising/google-ads/`: `PaidAdvertisingGoogleAds.tsx`, `content.ts`, `google-ads.css`, `GoogleAdsJsonLd.tsx`.
- Route `app/(pages)/google-ads/page.tsx`: metadata and `BreadcrumbJsonLd` (trail Home, What we do, Paid search) unchanged; FAQPage and one Service node added. The Service node reuses the `/services` node's `@id` and fields, so the two pages do not conflict.
- Superseded C+ components under `components/cplus/google-ads/` are left in place, unused.

## Evidence and status
| Item | Status |
|---|---|
| SEO title and description | UNCHANGED from live, pending Search Console review. Provisional replacement: "Google Ads Management for Businesses in India \| MappedSkills" and "Reach people already searching for what you sell. MappedSkills plans and manages Google Ads for growing Indian businesses, from searches to enquiries." |
| Case study | Wording from the live page `/portfolio/google-ads-for-online-courses`; typographic, no image, no figures. Spelling AnyBodyCanBake (the owner brief used AnybodyCanBake) |
| Reporting | Policy A. Follow-up corrections needed on other pages, NOT done here: the homepage says "monthly reporting and a review call"; `/pricing` and `/services` use "review calls where agreed" (consistent with Policy A) |
| `/ppc-marketing` redirect | In the migration register; not implemented (URL returns 404 today) |
| Secondary CTA | "Request a call" to `/contact?intent=call` (a request form, not a booking calendar) |
