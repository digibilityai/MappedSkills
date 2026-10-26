# /who-we-help/d2c Visual R1: implementation notes

26 October 2026. Local only on `feat/paid-advertising-homepage`. Recorded as DEC-081. No commit, push, PR, merge or deployment.

## Implementation
- `components/paid-advertising/d2c/`: `PaidAdvertisingD2C.tsx`, `D2CArt.tsx` (product-neutral illustrations), `content.ts`, `d2c.css`, `D2CJsonLd.tsx`.
- Route `app/(pages)/who-we-help/d2c/page.tsx` (new). Sitemap entry added in `app/sitemap.ts`; analytics page type "commercial" in `lib/analytics.ts`.
- Inbound links: homepage D2C card (title is the card link; `pa-card--link` styles added to `paid-advertising.css`) and one line in the `/services` platform-fit section.

## Status
| Item | Status |
|---|---|
| Metadata | New page, no legacy SEO. Keywords are hypotheses until search data exists |
| Proof | Wanderlooms unlinked preview only; no individual case page exists |
| Imagery | Product-neutral line illustrations only; no client or stock imagery |
| Header and footer | UNCHANGED. Phase Two dropdown and footer group deferred (separate IA decision) |
| `/google-ads-for-ecommerce` | Still excluded and reserved; no redirects created |
| Publication | NOT authorised. The page must not publish without the homepage link, the services link and the sitemap entry |

## Status update (26 October 2026)
D2C Visual R1 is owner-approved (recorded in DEC-083). Earlier "not yet approved" wording above is outdated. Publication still needs a separate, reviewed release.
