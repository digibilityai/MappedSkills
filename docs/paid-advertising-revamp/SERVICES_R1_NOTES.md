# /services Visual R1: implementation notes

26 October 2026. Local only. Content R2 approved with five corrections; Visual R1 awaits owner review. No commit, push, PR, merge or deployment.

## Evidence and status
| Item | Status |
|---|---|
| Route `/services`, canonical `https://mappedskills.com/services` | Preserved |
| SEO title and description | PROVISIONAL, pending Search Console review of `/services`, `/google-ads`, `/social-media-ads` (16 months of queries, clicks, impressions, position, country; cannibalisation on "Google Ads management"; backlinks to `/services`) |
| AnyBodyCanBake case | Live: `/portfolio/google-ads-for-online-courses` (HTTP 200 on 26 Oct). Spelling follows the live site |
| Om Sai Developer case | Live: `/portfolio/om-sai-developer-meta-ads` (HTTP 200). No figures shown on `/services` |
| Wanderlooms | MISSING DESTINATION: no individual case page, not listed on `/work`. Card is informational with no link. Needs a case page, or an owner decision |
| Click-to-WhatsApp | Shown only as an option within Meta Ads. The live `/social-media-ads` page does not yet mention it; OPEN: confirm delivery and update that page in its own batch |
| Static ad design allowance | Owner decision (Phase One); quantity is per proposal, none stated. OPEN: operational proof |
| Reporting | Pricing page wording: monthly report with ongoing work, review calls where agreed. The homepage says "monthly reporting and a review call", slightly stronger. Align the homepage later with separate approval |
| Free advertising account review | Not on `/services`. The approved homepage FAQ still promises it. OPEN |
| Account ownership | Not stated. OPEN |

## Implementation
- `components/paid-advertising/services/`: `PaidAdvertisingServices.tsx`, `content.ts`, `services.css`, `ServicesJsonLd.tsx`.
- Shared `components/paid-advertising/AdMockups.tsx` extracted from the homepage; homepage markup verified byte-identical before and after.
- Schema: BreadcrumbList, FAQPage (the six visible questions) and two Service nodes with `areaServed` as Country (India). Global helpers untouched.
- Superseded C+ components under `components/cplus/services/` are left in place, unused.
- Test change: `tests/services-page.test.cjs` first test retargeted (the old title, description and H1 assertions describe the superseded page); the new behaviour is covered by `tests/paid-advertising-services.test.cjs`.

## Imagery
No client imagery on the page. Work cards are typographic. Mockups are labelled demonstrations, not client creative. The Meta mockup reuses the generic apparel tile as a product placeholder, as on the homepage.
