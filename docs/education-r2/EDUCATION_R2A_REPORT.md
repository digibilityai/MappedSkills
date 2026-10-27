# Education R2: full experience audit and Who Does What redesign

27 October 2026. Local only. Nothing committed, pushed, merged or deployed. Preview: `http://localhost:3412/education-preview-r2` (noindex, 404 in production). Live `/who-we-help/education` and all approved pages untouched.

Method: real Chromium sessions at 1440 and 390 px, scrolling to each section and capturing at 0.25 s and 1.75 s (`r2a/audit/`), plus the earlier hero and route frames.

## 1. Section audit
| # | Section | Question answered | Story role and transition | Hierarchy | Motion | CTA | Issues |
|---|---|---|---|---|---|---|---|
| 1 | Hero | What is this and is it for me? | Opens with two entry behaviours resolving to possible outcomes | Strong | Explains (two ways in, outcomes may happen). Outline first frame, once, about 2.6 s | Primary and "See our work": fine | None |
| 2 | Challenge | Why are enquiries not enough? | States the central idea; bars show it | Strong | Bars grow once on view; useful | None, correct | None |
| 3 | How learners find courses | How do people arrive? | Bridges to routes | Good | None needed | None | None |
| 4 | Three routes | How do learners join? | Core of the story | Strong; routes visually distinct | Each route draws itself once, independently; no sequence implied | None | None (equal card heights fixed in R2) |
| 5 | Channels | Which advertising for which route? | Links learner behaviour to channels | Good | None needed | Text links to service pages | None |
| 6 | Readiness | What do I need? | Short | Good | None needed | Compact CTA: right moment | None |
| 7 | **Who does what** | Where do you stop and I start? | Was administrative: two dense columns, dashed exclusions box, long fee line. Broke the story between readiness and measurement | Weak | None | None | **Material: redesigned** |
| 8 | Measurement | How will I know it works? | Closes the loop from the handoff | Good | None needed | None | Repeated the tracking and admissions boundary now shown in section 7 (trimmed) |
| 9 | Client work | Have you done this? | Single honest example | Good | None needed | Case and work links | None. Local case link 404 only because Contentful is not available locally |
| 10 | FAQs | Remaining doubts | 8 questions | Good | Native details | None | None |
| 11 | Closing | What next? | One CTA | Good | None needed | "Discuss Your Advertising" | None |

Overall: no material problem outside section 7. Mobile length (about 12,700 px) is long but each section is short; I did not cut content without evidence it hurts. No loops anywhere. Channel, readiness, measurement, proof and closing have no motion by design.

## 2. Motion audit
| Animation | Meaningful | Timing | First frame | Settles | Reduced motion | No JS | Shift or jump |
|---|---|---|---|---|---|---|---|
| Hero scene | Yes | On load, about 2.6 s | Quiet outline of whole scene | Yes | Final state, no animation | Final state | None |
| Challenge bars | Yes | When half in view | Bars hidden until armed | Yes | Final | Final | None |
| Three routes | Yes, independence | Each when 35 percent in view | Dimmed route, no line | Yes | Final | Final | None |
| Handoff (new) | Yes, left to right order | When 30 percent in view, about 2.7 s | Dimmed three-part scene | Yes | Final | Final | None |
| Channels, readiness, measurement, proof, closing | None, none added | n/a | n/a | n/a | n/a | n/a | n/a |

Measured: reduced motion leaves 0 armed elements and all three handoff columns at opacity 1 with no transform; with JavaScript disabled all three columns are present and at full opacity. `scrollY` stays 0 after load at every width.

## 3. Who Does What redesign
- **Headline:** "We bring the right learners closer. You help them take the next step." Supporting line as briefed.
- **Visual:** three parts joined by two arrows. MappedSkills advertising (dark: manages Google, Meta and YouTube advertising; planning and testing, budget oversight, monthly report on shared data) to Learner action (dashed alternatives: buys online, sends an enquiry, registers for a demo or webinar; "Some courses use one of these, some use several") to Your institute (owns course delivery, pricing, website, admissions and student follow-up; online purchase completes on your page and checkout; enquiry or registration is followed up by your team). Counselling is not shown as universal.
- A dashed return line says the records you share let us improve the advertising, tying into measurement.
- **Disclosures kept, shortened and moved below the visual** as two plain lines: scoped separately unless the proposal includes it (tracking setup, website changes, automation, extra creative production); ad spend paid directly, management fee separate, no guarantee of enquiries or enrolments, with the pricing link.
- **Animation:** once only, in view. Outline first, then advertising, arrow, the three learner options together (alternatives), arrow, institute, return line. Stacks vertically on mobile with downward arrows.
- Uses existing tokens and content width.

## 4. Changes outside Who Does What
| Change | Justification |
|---|---|
| Measurement footnote shortened to "We review the data you share and the advertising platform reports. Tracking setup is scoped separately, as above." | It repeated the boundary and the admissions-control line now shown once in section 7 |
| (From the previous round) equal-height route cards and removal of a stray list margin | Already reported in R2 |

No other section changed.

## 5. Captures (`docs/education-r2/`)
- Before: `r2a/before/who-does-what-1440.png`, `r2a/before/who-does-what-390.png`
- After: `r2a/after/who-does-what-1440.png`, `r2a/after/who-does-what-390.png`
- Handoff frames: `r2a/after/handoff-1440-t{0_2,0_9,1_5,2_2,3_4}.png`, `r2a/after/handoff-390-t{...}.png` (frames predate a final speed-up of about half a second)
- Full page: `r2a/after/education-r2-1440-full.png`, `r2a/after/education-r2-390-full.png` (reduced motion, so every block shows its final state; fixed layers hidden)
- Audit frames: `r2a/audit/{1440,390}-<section>-t{0_25,1_75}.png`

## 6. QA
| Check | Result |
|---|---|
| Overflow 320, 390, 768, 1440 | None; `scrollWidth` equals `clientWidth`; no overflowing elements |
| Scroll jump | `scrollY` 0 after load at all widths |
| Layout shift | 0.034 (320), 0.001 (390), 0.016 (768), 0.014 (1440): the same single early shared-font shift seen in the approved D2C preview; below 0.1 |
| Console | No errors |
| CTAs | `/contact`, `/work`, `/google-ads`, `/social-media-ads`, `/pricing` 200. Case study link 404 locally only |
| Loops | None |
| Reduced motion and no JS | Verified, above |
| Dashes | None in page text |
| New claims | None: all handoff wording comes from DEC-080 and DEC-082 boundaries and the owner's brief |
| Other sections | Unchanged apart from one footnote; spot-checked in the audit frames |
| Isolation | `NODE_ENV` guard, noindex, not in sitemap; production route has zero diff |
| TypeScript, ESLint | No errors in the new files |
| `node --test tests/*.test.cjs` | 478 pass, 0 fail, 1 skipped |
| Not run | Production build, Safari, Firefox, real devices, screen reader, keyboard walkthrough |

## 7. Remaining decisions for the owner
1. Approve the redesigned section (the wording "Your team replies, follows up and decides admissions" applies to enquiry or registration only).
2. Earlier open items still stand: record YouTube and Click-to-WhatsApp scope and the D2C R1.1 approval in the decision log; H1 wording; title and description; "qualified prospective students, as your team sees it".
3. The handoff frame set was captured before a last timing speed-up; say if you want it regenerated.

## 8. Files changed this round
`components/education-r2/content.ts` (MANAGE, MEASURE.review), `EducationR2.tsx` (section 7), `education-r2.css` (section 7 rules). Reversal as in `EDUCATION_R2_REPORT.md`.
