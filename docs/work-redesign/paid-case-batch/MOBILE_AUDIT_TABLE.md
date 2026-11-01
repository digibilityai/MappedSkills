# Local mobile audit at 390 px and 360 px (30 October 2026)

Run against the local dev server (`NODE_ENV=development`, preview switch on). 35 routes x 2 widths = **70 route-width checks, 70 PASS, 0 FAIL, plus the blocked routes below**. Tooling: `tools/audit-mobile.cjs` (overflow, elements outside the viewport, clipped text, broken images, page and console errors, cookie banner, forms, accordions, footer, tap targets, screenshots), `tools/menu-check.cjs` (the phone header menu and its two groups on every route: opens, links inside the viewport, closes), `tools/overlap-check.cjs` (visible overlapping text), `tools/audit-table.cjs` (this table). Raw results: `screenshots/mobile/*.jsonl`. Screenshots (full page, 390 and 360): `screenshots/mobile/390/` and `360/` for the six cases, AnybodyCanBake Google Ads, /work, all six placement pages and the corrected pages.

Route inventory: `/sitemap.xml` (29 URLs) plus the routes in `app/` that are not in it: `/privacy-policy`, `/terms`, `/thank-you`, `/launch-checklist` (internal, development only, 404 in production), `/contact/call` (redirects to `/contact?intent=call`, like `/schedule-call`) and the 404 page. `/work/page/2` and `/work/index.json` are not pages (404 while there is one page of studies; JSON). Every internal link found on those pages (144 unique) was requested: all return 200 or a redirect except `/portfolio/om-sai-developer-meta-ads` (404 locally, see BLOCKED).

PASS means: no horizontal overflow, nothing outside the viewport, no clipped text, no broken visible image, no page error, a menu that opens and closes inside the viewport, a cookie banner inside the viewport (checked on first load), form controls inside the viewport. Two findings were reviewed by eye and accepted as design, not defects: `/how-it-works` (a decorative swirl clipped inside the "gate" section) and `/social-media-ads` (the Meta ad-format tabs scroll sideways inside their own strip, with the next tab cut off as the cue).

| Route | 390 | 360 | Notes |
|---|---|---|---|
| `/` | PASS | PASS | Paid advertising built around how your customers buy. |
| `/about` | PASS | PASS | An advertising agency that answers to your enquiries. |
| `/ai-seo` | PASS | PASS | When buyers ask AI, is your business in the answer? |
| `/blog` | PASS | PASS | Marketing guides, written plainly. |
| `/contact` | PASS | PASS | Let’s talk about your business. |
| `/contact/call` | PASS | PASS | redirects to /contact?intent=call |
| `/conversion-optimization` | PASS | PASS | Plenty of visitors, not enough enquiries? We find out why. |
| `/does-not-exist` | PASS | PASS | That page is not here. |
| `/faq` | PASS | PASS | What owners ask before they start. |
| `/google-ads` | PASS | PASS | Reach customers when they’re looking for what you sell. |
| `/how-it-works` | PASS | PASS | No mystery about what happens next. |
| `/lead-generation` | PASS | PASS | Lead generation, where the unit is an enquiry you can actual |
| `/portfolio/anybodycanbake-meta-ads` | PASS | PASS | Adapting course advertising as learning preferences changed |
| `/portfolio/bakersville-google-ads` | PASS | PASS | Google Ads linked to 4,324 products sold for Bakersville |
| `/portfolio/ekoching-google-ads` | PASS | PASS | Google Ads linked to 178 paid enrolments for a coaching inst |
| `/portfolio/hutnhomes-meta-ads` | PASS | PASS | Meta Ads linked to 329 site visits and 23 reported sales for |
| `/portfolio/phoenix-laundry-google-ads` | PASS | PASS | Google Ads linked to 640 new customers for Phoenix Laundry |
| `/press` | PASS | PASS | News from MappedSkills, on the record. |
| `/pricing` | PASS | PASS | One fixed monthly fee for Google and Meta ads management. |
| `/privacy-policy` | PASS | PASS | Privacy Policy |
| `/problems/traffic-but-no-enquiries` | PASS | PASS | People visit your website. So why don’t they get in touch? |
| `/research` | PASS | PASS | We look at real business websites. Then we publish what we f |
| `/seo` | PASS | PASS | SEO that is judged on the enquiries it produces. |
| `/services` | PASS | PASS | Reach more of the right customers with Google Ads and Meta A |
| `/social-media-ads` | PASS | PASS | Turn attention on Facebook and Instagram into business oppor |
| `/terms` | PASS | PASS | Terms and Conditions |
| `/thank-you` | PASS | PASS | Sending an enquiry? |
| `/who-we-help/d2c` | PASS | PASS | More orders matter. So does what they cost. |
| `/who-we-help/education` | PASS | PASS | Find learners who are ready for what you teach. |
| `/who-we-help/enquiry-led-businesses` | PASS | PASS | More enquiries are good. Better conversations are worth more |
| `/who-we-help/real-estate` | PASS | PASS | More property enquiries. More of the right buyers. |
| `/work` | PASS | PASS | Real work. Judge it for yourself. |
| `/launch-checklist` | PASS | PASS | Launch QA Checklist |
| `/portfolio/klenzmo-meta-ads` | PASS | PASS | Meta Ads linked to 3,957 products sold for Klenzmo |
| `/portfolio/google-ads-for-online-courses` | PASS | PASS | 1,410 paid enrolments attributed to Google Ads |

warn / @390: 3 text overlap(s): p / p 358x20; p / p 358x20
warn / @360: 3 text overlap(s): p / p 328x20; p / p 328x20
warn /ai-seo @390: 8 text overlap(s): p / p.pa-eyebrow.ai-k 358x15; p / h2#as-h-rp.b2-h2 358x98
warn /ai-seo @360: 8 text overlap(s): p / p.pa-eyebrow.ai-k 328x15; p / h2#as-h-rp.b2-h2 328x98
warn /contact @390: 2 small tap target(s): input 20x20 ""; input 20x20 ""
warn /contact @360: 2 small tap target(s): input 20x20 ""; input 20x20 ""
warn /contact/call @390: 2 small tap target(s): input 20x20 ""; input 20x20 ""
warn /contact/call @360: 2 small tap target(s): input 20x20 ""; input 20x20 ""
warn /conversion-optimization @390: 1 small tap target(s): a.co-start-a 298x21 "Not sure where you’re losing t"
warn /conversion-optimization @360: 1 small tap target(s): a.co-start-a 298x21 "Not sure where you’re losing t" | 3 text overlap(s): li / li 47x22; a / li 43x22
warn /faq @390: 8 text overlap(s): p.direct / li 350x15; p / li 350x60
warn /faq @360: 8 text overlap(s): p.direct / li 320x15; p / li 320x60
warn /google-ads @390: 8 text overlap(s): li / p.rv3-eyebrow 358x14; li / h2#ga41-mea-h 358x26
warn /google-ads @360: 8 text overlap(s): li / p.rv3-eyebrow 328x14; li / h2#ga41-mea-h 328x26
warn /how-it-works @390: reviewed by eye, design: section#hw-gate.hw-act.hw-gate 621>390 | 7 small tap target(s): a 270x20 "First conversation"; a 270x20 "1. Assess"; a 270x20 "2. Plan"
warn /how-it-works @360: reviewed by eye, design: section#hw-gate.hw-act.hw-gate 579>360 | 7 small tap target(s): a 240x20 "First conversation"; a 240x20 "1. Assess"; a 240x20 "2. Plan"
warn /lead-generation @390: 8 text overlap(s): p / li 337x81; p / p 337x63
warn /lead-generation @360: 8 text overlap(s): p / li 307x81; p / p 307x63
warn /portfolio/anybodycanbake-meta-ads @390: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/anybodycanbake-meta-ads @360: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/bakersville-google-ads @390: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/bakersville-google-ads @360: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/ekoching-google-ads @390: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/ekoching-google-ads @360: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/hutnhomes-meta-ads @390: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/hutnhomes-meta-ads @360: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/phoenix-laundry-google-ads @390: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /portfolio/phoenix-laundry-google-ads @360: 2 small tap target(s): a 38x19 "Home"; a 85x19 "Case studies"
warn /pricing @390: 7 text overlap(s): p / p.prr-faq-direct 358x43; p / p.prr-faq-direct 358x26
warn /pricing @360: 7 text overlap(s): p / p.prr-faq-direct 328x43; p / p.prr-faq-direct 328x26
warn /privacy-policy @390: 2 small tap target(s): a.hover:text-foreground.transition-colors 38x23 "Home"; a.text-accent.hover:text-accent/80 178x22 "info@mappedskills.com"
warn /privacy-policy @360: 2 small tap target(s): a.hover:text-foreground.transition-colors 38x23 "Home"; a.text-accent.hover:text-accent/80 178x22 "info@mappedskills.com"
warn /seo @390: 3 text overlap(s): p / li 358x65; p / li 358x65
warn /seo @360: 4 text overlap(s): p / li 328x85; p / p 328x7
warn /services @390: 3 text overlap(s): p / p 350x57; p / p 350x60
warn /services @360: 4 text overlap(s): p / p 320x47; p / p 320x11
warn /social-media-ads @390: reviewed by eye, design: div.rv3.mr1 397>390 | 8 text overlap(s): li / p.rv3-eyebrow 358x13; li / h2#mr1-proc-h 358x26
warn /social-media-ads @360: reviewed by eye, design: div.rv3.mr1 367>360 | 8 text overlap(s): li / p.rv3-eyebrow 328x13; li / h2#mr1-proc-h 328x26
warn /terms @390: 1 small tap target(s): a.hover:text-foreground.transition-colors 38x23 "Home"
warn /terms @360: 1 small tap target(s): a.hover:text-foreground.transition-colors 38x23 "Home"
warn /who-we-help/d2c @390: 7 text overlap(s): p / p 358x71; p / p 358x45
warn /who-we-help/d2c @360: 7 text overlap(s): p / p 328x71; p / p 328x45
warn /who-we-help/education @390: 8 text overlap(s): p / p 358x97; p / p 358x20
warn /who-we-help/education @360: 8 text overlap(s): p / p 328x97; p / p 328x20
warn /who-we-help/enquiry-led-businesses @390: 8 text overlap(s): p / p 358x57; p / p 358x45
warn /who-we-help/enquiry-led-businesses @360: 8 text overlap(s): p / p 328x45; p / p 328x45
warn /who-we-help/real-estate @390: 8 text overlap(s): p / p 358x45; p / p 358x57
warn /who-we-help/real-estate @360: 8 text overlap(s): p / p 328x71; p / p 328x83


## Contentful-driven pages (second pass, 2026-10-30 evening, delivery access configured)

Previously BLOCKED, now checked with the live Contentful content at 390 and 360 px: **all PASS** (38 route-width checks; raw results `screenshots/existing/audit-cms-results.jsonl`).

| Route | 390 | 360 |
|---|---|---|
| `/portfolio/om-sai-developer-meta-ads` | PASS | PASS |
| `/portfolio/classpe-social-media-strategy` | PASS | PASS |
| `/portfolio/insuryo-organic-growth` | PASS | PASS |
| `/portfolio/seo-ameba-software` | PASS | PASS |
| `/portfolio/seo-for-home-decor-brand` (unlisted, kept unlisted) | PASS | PASS |
| `/blog` and 7 articles (`/blog/7-proven-strategies-...`, `building-an-email-list`, `content-marketing-services-in-pune`, `facebook-advertising-agency-pune`, `importance-of-content-writing`, `performance-marketing-vs-digital-marketing`, `seo-company-in-pune`) | PASS | PASS |
| `/research`, `/research/industry-benchmarks`, `/research/marketing-measurement-gap-indian-business-websites` | PASS | PASS |
| `/press`, `/press/marketing-measurement-gap-indian-websites` | PASS | PASS |
| `/work` (11 studies) | PASS | PASS |

Still not applicable: `/work/page/[n]` (11 studies fit one page; page 2 does not exist). No published Wanderlooms case study exists (nothing created). The four existing studies were also checked at 1440 px: PASS.

## Warnings (not failures)

- `/contact`, `/contact/call`: two 20 x 20 px checkboxes (the label beside each is the larger target).
- `/how-it-works`: stacked in-page navigation links 20 px high. `/privacy-policy`, `/terms`: "Home" link 23 px high. Existing pages, not touched.
- The first-pass "overlapping text" counts on many pages came from collapsed FAQ answers and the cookie banner; the second pass (`overlap-results.jsonl`) found one pair only, the wrapping breadcrumb on `/conversion-optimization` at 360 px, which reads correctly (two lines).
- Dashboards shown at phone width are small by nature (a 1586 px screenshot at 328 px); each has an "Open full size" link and a caption carrying the figures and limits.

## Defects fixed

| Where | Defect | Fix |
|---|---|---|
| `/launch-checklist` (internal) | 140 px (390) and 170 px (360) horizontal overflow from the unbroken environment-variable lines | `break-all` on that block (`app/(pages)/launch-checklist/page.tsx`) |
| Case-study pages (six new, AnybodyCanBake Google Ads, Om Sai) | Breadcrumb links 19 px high | `display: inline-block; padding-block: 3px` on `.ct-crumb a` (`components/case-study/case-study.css`), 25 px high |

No other change to existing pages. Re-run after the fixes: both pass at both widths, no warnings.
