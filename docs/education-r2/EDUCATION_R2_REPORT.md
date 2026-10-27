# Education and Training R2: content-first local preview

27 October 2026. Local only. Nothing committed, pushed, merged or deployed. Reference: `docs/education-r1/EDUCATION_R1_AUDIT.md`.

## 1. Preview
`http://localhost:3412/education-preview-r2` (noindex, nofollow; `notFound()` when `NODE_ENV=production`; `force-static`; not in the sitemap). The production route `/who-we-help/education` is untouched (returns 200 locally and live, no diff).

## 2. Complete proposed copy
The full page copy is in one file: `components/education-r2/content.ts` (hero, 10 sections, 8 FAQs, closing band). Structure and key lines:

| # | Ground | Section | Headline |
|---|---|---|---|
| 1 | Ink Deep | Hero | **Find learners who are ready for what you teach.** Lede: "Reach people looking for courses like yours, help others discover your programmes, and judge your advertising by enquiries, purchases and enrolments, not clicks alone." CTA "Discuss Your Advertising" to `/contact`; text link "See our work" to `/work` |
| 2 | Paper | The education challenge | **More course enquiries don't always mean more students.** Two illustrated campaigns, no figures |
| 3 | Ground | How learners find courses | Some search. Some stumble on you. Two entry behaviours and what learners weigh up |
| 4 | Ink Deep | Three ways learners join | Different courses, different routes. A purchase, B enquiry-led, C demo or webinar. Alternatives, not steps |
| 5 | Paper | Where advertising fits | The right channel for how learners arrive. Google Search, Meta Ads, YouTube Ads, Click-to-WhatsApp; links to `/google-ads`, `/social-media-ads` |
| 6 | Ground | What helps advertising work | Ready before the ads are. Six readiness items, compact CTA |
| 7 | Paper | Who does what | We manage the advertising. You run the learning. Manages, handles, scoped separately, spend and fee line, `/pricing` link |
| 8 | Ink Deep | How we judge performance | Look past the click to what follows. Clicks and visits, enquiries and registrations, qualified prospective students, purchases or enrolments where verified |
| 9 | Paper | Verified client work | Google Ads for online baking courses. AnyBodyCanBake |
| 10 | Ink Deep | Questions | Eight FAQs, then closing band "Tell us about your courses and how learners join." |

No em dashes, en dashes or spaced hyphens in copy (checked in the rendered text).

## 3. Screenshots and frames (`docs/education-r2/`)
- `screenshots/education-r2-1440-full.png`, `screenshots/education-r2-390-full.png` (full page; run in reduced motion so every block shows its final state; fixed layers such as the cookie banner hidden for the capture).
- `screenshots/education-r2-nojs-1440-fold.png` (JavaScript disabled).
- `frames/hero-1440-t{0_1,0_6,1_3,2,3}.png`, `frames/hero-390-t{...}.png` (hero at 0.1, 0.6, 1.3, 2.0, 3.0 s).
- `frames/routes-1440-t{0,0_5,1,1_8}.png`, `frames/routes-390-t{...}.png` (three routes drawing after scrolling into view).

## 4. Motion
- **Hero:** the whole scene (search card, video card, course page, three outcome chips) is visible from the first frame as a quiet outline (30%), then each element reaches full strength once; about 2.6 s. Outcomes are dashed, meaning "may happen". Final state identical without animation.
- **Challenge chart:** two bars per campaign grow once when mostly in view.
- **Three routes:** each route draws its own line and nodes once, when that route is first mostly in view. No stagger between routes, so they do not read as a sequence.
- Nothing loops, nothing is sticky, no scroll jump. Reduced motion and no JavaScript: final states (measured: 0 armed elements, all art at opacity 1, no animation, bars unscaled).

## 5. Proof and capability verification
| Statement on page | Basis |
|---|---|
| YouTube Ads, client supplies original video, MappedSkills manages advertising, video production scoped separately | **OWNER REQUIREMENT** (this task) plus DEC-080 creative boundary. **Not yet in `DECISION_LOG.md`** |
| Click-to-WhatsApp where it suits; team replies; no automation, counselling, follow-up | DEC-080 (verified delivery) and this task's boundary |
| Google Ads and Meta Ads, monthly report, review calls as agreed | DEC-078 to DEC-080 (Policy A) |
| Tracking review only; setup, repairs, integrations separate | DEC-080, DEC-082 |
| Admissions, counselling, follow-up stay with the institute | DEC-082 |
| AnyBodyCanBake: Pune online baking school, eggless and healthy baking, four activities | Live case page 27 Oct; spelling per owner ruling 2026-10-22 |
| No numerical outcomes, no Bakedemy, no testimonials, no Meta claim for this client | `lib/case-study-proof.ts`, WORK-021, Education R1 audit section 4 |
| Image | Existing approved asset `public/images/paid-advertising/tile-baking.webp`, labelled "Conceptual artwork. Not an actual campaign creative." No client-supplied artwork was found to reuse |
| Case link `/portfolio/google-ads-for-online-courses` | Returns 200 in production. **Returns 404 on this local server** (Contentful is not available locally), so the link could not be click-tested locally |

## 6. SEO recommendations (not applied; live page unchanged)
- **URL:** keep `/who-we-help/education`. No redirect or sitemap change needed.
- **Title (preview, 61 chars):** "Google & Meta Ads for Course Providers in India | MappedSkills". Live is 70 chars. Confirm with a SERP check first.
- **Description (preview, about 158 chars):** "Google Ads, YouTube and Meta Ads management for course providers, coaching institutes and training businesses in India, judged by enquiries and enrolments." Replaces the live "Focus on relevant enquiries and enrolment outcomes", which overstated.
- **Headings:** one H1, ten H2s in the order above; H3s inside cards.
- **Internal links:** `/google-ads`, `/social-media-ads`, `/pricing`, `/work`, case study, `/contact`. Consider `/faq` and `/how-it-works` later.
- **Breadcrumb:** keep Home, Education businesses (no `/who-we-help` hub). Schema only, as live.
- **Schema:** BreadcrumbList and FAQPage matching the eight visible questions. No Service, Course, Offer, Review or Rating nodes.
- **Keywords:** no volumes used; education search intent still RESEARCH REQUIRED.

## 7. Unresolved decisions
1. Record the YouTube and Click-to-WhatsApp scope for education in `DECISION_LOG.md` (and the D2C R1.1 approval, the DEC-081 H1 conflict and the production release status noted in the R1 audit).
2. Approve the H1 as given. It says "ready for what you teach", which is a mild readiness claim; "relevant learners" is a safer alternative.
3. Title and description changes: approve, or wait for SERP research.
4. Is a client-owned image of AnyBodyCanBake available and permitted? Otherwise the labelled conceptual tile stays.
5. Section 8 uses "qualified prospective students, as your team sees it". Confirm that wording.
6. Hero secondary link "See our work" is an addition to the single primary CTA in the brief. Keep or remove.

## 8. QA
| Check | Result |
|---|---|
| Widths 320, 360, 390, 768, 1024, 1440 | No horizontal overflow (scrollWidth equals clientWidth), `scrollY` 0 after load |
| Layout shift | CLS 0.034 at 320 and 360, 0.001 at 390, 0.016 at 768, 0.009 at 1024, 0.015 at 1440. All are one small shift about 0.25 s after load. The approved D2C R1.1 preview shows the same 0.034 at 320 under the same test, so this is the shared web-font swap, not page-specific. Below the 0.1 "good" threshold, but not 0.0 |
| Console errors | None at any width |
| CTA destinations | `/contact`, `/work`, `/google-ads`, `/social-media-ads`, `/pricing` return 200 locally; case link see section 5 |
| Reduced motion | Verified (section 4) |
| No JavaScript | Verified: H1, all sections and 8 FAQ items present in the DOM, art in final state |
| Dashes | None found in page text |
| Isolation | No edit to the production route, global nav, consent, approved pages. `tests/paid-advertising-education.test.cjs` and other modified files in `git status` were already modified before this task and untouched by me |
| TypeScript | `tsc --noEmit`: no errors in the new files |
| ESLint | Clean on `components/education-r2` and `app/education-preview-r2` |
| Tests | `node --test tests/*.test.cjs`: 478 pass, 0 fail, 1 skipped |
| **Not performed** | Production build to confirm the 404 in production (guard is `NODE_ENV` as in the D2C preview); Safari, Firefox, real devices; screen reader; keyboard walkthrough; checks of the approved pages beyond the test suite and an unchanged-diff check |
| Observation | The existing cookie banner covers the lower viewport on first load, as noted for D2C. Not changed |

## 9. Changed files and reversal
New files only:
- `app/education-preview-r2/page.tsx`
- `components/education-r2/{EducationR2.tsx,content.ts,education-r2.css,InViewOnce.tsx}`
- `docs/education-r1/EDUCATION_R1_AUDIT.md`, `docs/education-r2/` (this report, screenshots, frames)

Reverse everything:
```
rm -rf app/education-preview-r2 components/education-r2 docs/education-r2
```
(`docs/education-r1` can be kept as the audit record.)
