# /who-we-help/education Visual R4 (local): implementation notes

26 October 2026. Local only on `feat/paid-advertising-homepage`. Recorded as DEC-082. No commit, push, PR, merge or deployment.

## Sources
Content: `MappedSkills_Education_Content_R1.md` (working draft). Design: the Education Visual R4 reference image (composition inspiration, not embedded).

## Implementation
- `components/paid-advertising/education/`: `PaidAdvertisingEducation.tsx`, `EducationArt.tsx` (original SVG illustrations and icons), `content.ts`, `education.css`, `EducationJsonLd.tsx`.
- Route `app/(pages)/who-we-help/education/page.tsx` (new); sitemap and analytics entries; homepage Education card link; one sentence with a link on `/services`.

## Deviations from the R4 reference (disclosed)
| R4 reference | Implemented |
|---|---|
| Photographs of students and a hero learner | Original SVG illustration (no real or stock people, no faces of real people) |
| "Trusted by growing businesses across India" | "For education businesses such as" (no evidence of trust claims) |
| "Generate quality enquiries", "Support enrolment growth" | "Generate relevant enquiries", "Learn from outcomes" (no lead-quality or enrolment promise) |
| Google and Meta logos | Generic search and feed icons (no brand marks) |
| "Real education businesses. Real advertising work." | "Experience with specialist online education." (one verified case, so no plural claim) |
| No readiness section | A compact six-factor readiness section from R1 (substance retained) |
| AnybodyCanBake | AnyBodyCanBake, the live spelling (flagged) |

## Open
- R1 and R4 are not final: owner review of copy and visuals is outstanding.
- No individual enrolment or commercial outcome is published for the case.
- Header and footer IA (Phase Two dropdown and footer group) remain deferred.

## Status update (26 October 2026)
Education Visual R4 is owner-approved (recorded in DEC-083). Earlier "not yet approved" wording above is outdated. Publication still needs a separate, reviewed release.
