# /who-we-help/real-estate: implementation notes

26 October 2026. Local only on `feat/paid-advertising-homepage`. Recorded as DEC-083. No commit, push, PR, merge or deployment.

## Sources
Content and SEO: `MappedSkills_Real_Estate_Content_SEO_R1_APPROVED.md` (approved). Design: the Real Estate Visual R1 concept image (approved as a concept; not embedded).

## Implementation
- `components/paid-advertising/real-estate/`: `PaidAdvertisingRealEstate.tsx`, `RealEstateArt.tsx` (original SVG illustration and icons), `content.ts`, `real-estate.css`, `RealEstateJsonLd.tsx`.
- Route `app/(pages)/who-we-help/real-estate/page.tsx` (new); sitemap and analytics entries; homepage "Real estate developers" card link; one sentence with a link on `/services`.

## Deviations from the visual concept (disclosed)
| Concept | Implemented |
|---|---|
| Photographs of buildings, a phone, people and a handshake | Original SVG illustration only. The concept's architectural imagery is conceptual and is not an Om Sai property; no property photography is published |
| Om Sai Developers | Om Sai Developer (the live case page spelling), flagged |
| Search, Meta marks | Generic icons, no brand marks |
| Hero showing a literal tower photograph | Flat tower illustration with floating step cards |

## Open before any publication
- Verify RERA-relevant information, approvals, possession, location and pricing with the developer before any specifics are published (none are stated now).
- Om Sai permission and case wording are as published on the live case page.
- Header and footer IA (Phase Two dropdown and footer group) remain deferred; the homepage Education and Real estate cards now link, so all three audience cards behave consistently.
