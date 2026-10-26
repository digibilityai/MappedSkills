# Paid-advertising revamp — development batch 01

26 October 2026. Local branch `feat/paid-advertising-homepage`, baseline main `142bcee`.

## Owner approvals

Phase 3 copy/case-study drafts complete. Homepage visual direction approved. Development start explicitly authorised.
These current approvals supersede conflicting historical positioning and homepage restrictions; historical records are retained.

## Implemented

- Homepage server component with responsive hero, audience recognition, Google/Meta service cards, case previews,
  business questions, five-step process, pricing, native FAQ disclosures and enquiry CTA.
- Shared ActionLink and SectionHeading, scoped responsive CSS using existing brand tokens/fonts.
- Existing accessible header/mobile-menu implementation retained; only Google/Meta promoted. Who We Help targets a real homepage section.
- Light footer using the actual logo, retained contact information, legal links and analytics-preferences control.
- Updated homepage title/description; canonical and revalidation preserved. No enquiry backend, CMS, analytics or consent changes.
- Historical case-stage labels decoupled from sales navigation so retained SEO/organic work keeps its prior classification.
- Illustrative AI triptych, generated with the built-in image tool, compressed to WebP. It is visibly labelled and does not depict named client work.

## Boundaries and follow-up

This batch does not implement the other approved page copy, URL migration or case-study CMS changes.
The existing `/social-media-ads` destination stays operational until the Meta URL migration is implemented.
The real logo replaces the text-only placeholder in the mockup. The footer retains legal/preferences links missing from the mockup.
The founder-per-account promise is omitted following the later explicit owner instruction.
Audience cards are recognition points; separate audience-page destinations come in the next batch.
Replace illustrative campaign images with actual examples when available. Replace/remove Wanderlooms placeholder figures before launch.
The homepage review snapshot has no application backend; use it for visual/menu/FAQ review, not form submissions or complete-site navigation.

## Verification

- TypeScript check and production build completed successfully.
- Regression suite and additional homepage rendering/navigation/classification checks run; final counts in session handoff.
- Browser review through the managed preview, including desktop and mobile-width iframe. Exact dimensions and observations in handoff.
- Real-device mobile, other browser engines, live CMS content and production form delivery are not verified in this batch.

## Preview

The managed preview daemon supplies Vite arguments incompatible with `next dev`. No product startup script was changed.
A local ignored `.preview` folder serves the successful production build's homepage HTML and static assets.
`mobile.html` frames the same page at a 390px outer width. This is a static review snapshot, not a deployment.
No remote Git mutation, CMS mutation or production release performed.

## Next step

Review the implemented homepage, then build the Google/Meta service template and audience/case/contact templates with approved copy.
