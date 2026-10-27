# Education R2B: concise copy and FAQ consolidation

27 October 2026. Local only. Nothing committed, pushed, merged or deployed. Preview: `http://localhost:3412/education-preview-r2` (noindex, 404 in production). Live `/who-we-help/education` untouched. No visual, layout or animation change. The previous copy file is kept at `docs/education-r2/r2b/content.before.ts`.

## 1. Descriptions shortened (before to after)
| Section | Before | After |
|---|---|---|
| Hero | "...and judge your advertising by enquiries, purchases and enrolments, not clicks alone." | "...and judge advertising by enquiries, purchases and enrolments, not clicks alone." (23 words) |
| Challenge (33 words) | "An enquiry shows interest. It does not show that someone is the right fit, can afford the course or will join. Advertising works best when it is judged on what happens next." | "An enquiry shows interest, not fit or readiness to join. Advertising works best when judged on what happens next." (19) |
| Three ways learners join (30) | "Your courses may follow one of these routes or several. They are alternatives, not steps, so we plan advertising around the ones that fit." | "Your courses may follow one or several of these routes. They are alternatives, not steps." (15) |
| Where advertising fits (24) | "We recommend a starting point after looking at your courses, audience and budget. Most institutes begin with one or two." | "We recommend where to start after looking at your courses, audience and budget. Most begin with one or two." (19) |
| Measurement (30) | "Each step answers a different question. We keep them apart, so a good number early on is not mistaken for a result." | "Each step answers a different question. We keep them apart, so early numbers are not mistaken for results." (18) |
| Closing | "...what happens after someone shows interest. We will discuss where paid advertising could fit." | "...what happens after interest. We will discuss where advertising could fit." |
| Unchanged (already 15 to 22 words) | Discover, Readiness, Who does what (owner-supplied line) | no change |

Headings unchanged. Rendered description lengths now 15 to 23 words.

## 2. Sentences removed (exact)
| Section | Removed |
|---|---|
| Challenge | "You decide who is admitted. We use the information you share to keep advertising decisions realistic." |
| Three ways learners join | "Registration is not enrolment, and no route is certain. Some learners never reach the end of any of them." |
| Who does what | "The records you share show what followed, so we can improve the advertising." |
| Who does what | "Scoped separately unless your proposal includes it. Tracking setup, website changes, automation and extra creative production." |
| Who does what | "No advertising can guarantee enquiries or enrolments." (the ad spend line and pricing link went with its paragraph; both moved to the FAQ) |
| How we judge performance | "We review the data you share and the advertising platform reports. Tracking setup is scoped separately, as above." |

Checked: none of these appears in the page's visible text (exact-phrase check at 1440) or anywhere in `content.ts`. The unused CSS for the removed elements was deleted. The handoff's return line was one of the removed sentences, so its element is gone; the other handoff elements and timings are unchanged.

## 3. Updated FAQ list (10, was 8)
1. Is Google Ads or Meta Ads better for promoting a course? (shortened)
2. Can advertising help sell courses directly online? (tracking sentence moved to FAQ 8)
3. Can you run campaigns for demo classes or webinars? (now says a webinar or demo registration is not a confirmed enrolment)
4. **Can you advertise on YouTube, and who provides the videos and photographs?** (merged: YouTube is part of Google Ads; client provides original videos and photographs; static creative defined in the proposal; video and additional production scoped separately)
5. Can ads send prospective students to WhatsApp? (unchanged scope: suitable enquiry-led courses, team replies, no automation or follow-up unless proposed)
6. **Can you guarantee enquiries or enrolments?** (new: No)
7. Do you manage admissions and counselling? (unchanged)
8. **How do you measure enrolment performance, and is tracking included?** (merged: comparison levels; review and recommendations are part of ongoing management; tracking setup, repairs, website changes and automation scoped separately unless in the proposal)
9. **Is ad spend part of your fee?** (new: no, paid directly to Google or Meta, fee separate; link "Understand Our Pricing Approach" to `/pricing`)
10. What should an education business prepare before advertising? (shortened)

Full answers: `components/education-r2/content.ts` (`FAQS`). All answers use wording already approved in DEC-079 to DEC-082 and this round's owner direction. FAQPage JSON-LD is generated from the same list, so it matches the visible questions. All 10 open and close correctly in the browser.

## 4. Screenshots (`docs/education-r2/r2b/`)
- `education-r2b-1440-full.png`, `education-r2b-390-full.png` (reduced motion so blocks show final state; fixed layers hidden)
- Edited sections at both widths: `{1440,390}-edr2-ch-h.png`, `-jr-h`, `-mg-h`, `-ms-h`, `-faq-h`

## 5. QA
| Check | Result |
|---|---|
| Shortened copy readable | Reviewed in screenshots; journey still reads hero, challenge, routes, handoff, measurement |
| Whitespace after removals | No awkward gaps at 1440 or 390; no spacing changes were needed |
| FAQ | 10 of 10 open and show their answers; pricing link present |
| Repeated disclaimers in narrative | None; boundaries now sit in FAQs 4 to 9 and in the existing proof note |
| Overflow, scroll jump | None at 320, 390, 768, 1440; `scrollY` 0 |
| Layout shift | 0.034 (320), 0.001 (390), 0.016 (768), 0.011 (1440), the same shared-font shift as before |
| Console errors | None |
| Animations | Unchanged apart from the removed return line; reduced motion leaves 0 armed elements; no JavaScript shows all three handoff columns at full opacity and 10 FAQ items |
| CTAs | `/contact`, `/work`, `/google-ads`, `/social-media-ads`, `/pricing` 200 locally. Case link 404 locally only (Contentful) |
| Dashes | None |
| TypeScript, ESLint | No errors in the new files |
| `node --test tests/*.test.cjs` | 478 pass, 0 fail, 1 skipped |
| Live route | Zero diff |
| Not run | Production build, Safari, Firefox, real devices, screen reader |

## 6. Files changed this round
- `components/education-r2/content.ts` (copy and FAQs)
- `components/education-r2/EducationR2.tsx` (removed five text elements; FAQ renders an optional link)
- `components/education-r2/education-r2.css` (deleted rules for removed elements)
- `docs/education-r2/r2b/` (screenshots, `content.before.ts`), this report

## 7. Open points
- The proof note "The published case does not include enrolment or commercial figures, so we do not claim any." remains in the client-work card, because you listed the proof as not to be changed. Say if it should also move to an FAQ.
- Earlier open items still stand: decision-log entries (YouTube, Click-to-WhatsApp, D2C R1.1), H1 wording, title and description, and "qualified prospective students, as your team sees it".
