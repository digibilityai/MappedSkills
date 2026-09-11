# Content Brief — `/contact`

**Session:** 09 · **Status:** **PROPOSED — NOT APPROVED.** · **Class:** LAUNCH — unconditional
**Page type:** Conversion — form surface · **IA reference:** `PAGE_REASON_TO_EXIST_MATRIX.md` §6, `PAGE_TYPE_CRO_RULES.md` §9
**No copy, form copy, label, validation message or design is written in this brief.**

---

## 1. Page job
Complete the qualified enquiry, and carry the entity data that local and AI-answer discovery depend on. **The visitor has decided; the only job left is not to lose them.**

## 2. Audience
Any visitor ready to enquire.

## 3. Search intent
**T / N.**

## 4. Primary query family
Brand navigational only.

## 5. Buyer problem
"I want to talk to someone, and I want to know it will actually reach them."

## 6. Desired belief change
From *"I hope this goes somewhere"* to *"this is a real business, at a real address, and my enquiry has arrived."*

## 7. Core proposition
Minimal friction, a real address, a real person on the other end, and an honest statement of what happens next.

## 8. Content requirements
| Element | Requirement |
|---|---|
| **The form** | 4 required fields — name, work email, company, what you're trying to fix. 3 optional — phone/WhatsApp, website, marketing consent (**separate and unticked**). Service/problem **pre-filled from page context, never asked**. **Budget is removed from the required set** |
| **What happens next** | Stated plainly. **No numeric SLA until one has been measured** |
| **Direct contact** | Phone and WhatsApp genuinely visible. **A real conversion path in this market, not a fallback** |
| **Complete NAP** | Legal name, complete postal address, phone, email |
| **Consent and privacy** | A clear statement of what is collected and why, linked to the policy |

## 9. Proof requirement
**Minimal. Proof here is a distraction.** No case studies, no logos, no testimonials, no evidence modules.

## 10. Questions the page must answer
1. How do I reach you?
2. What happens after I send this?
3. Where are you actually based?
4. What will you do with my information?

## 11. Objections
| Objection | Honest handling |
|---|---|
| "Will anyone reply?" | Say what happens next, without promising a number that has not been measured |
| "Why do you need my company?" | One short line explaining why the field exists |
| "Are you a real business?" | The complete address and real contact details answer it |

## 12. Internal links in
Every page (header CTA, footer, utility navigation).

## 13. Internal links out
`/schedule-call` (the other conversion surface) · `/privacy-policy`. **Minimal outbound linking — do not offer routes away from a decided visitor.**

## 14. Primary CTA role
**PRIMARY only — the form surface.** No competing goal. Secondary: cross-link to booking; DIRECT always visible.

## 15. Schema and content implications
`Organization` · `ContactPoint` · `LocalBusiness` · `BreadcrumbList`. **The verified entity defect must be fixed here and in schema together: `streetAddress` is currently `"Pune, Maharashtra, India"` and `postalCode` contains the word `"India"`.** No `geo`, no `openingHours`, no `aggregateRating` currently exist — and **`aggregateRating` must not be added without genuine permissioned first-party review data.**

Existing 308 target from `/contact-us`; the URL does not move.

## 16. What NOT to claim
- **No response-time promise, in hours or days**, until one has been measured. Publishing an unmeasured promise would demonstrate the failure MappedSkills sells the fix for.
- No "we reply to every enquiry within X".
- **No rating, review count or client count.**
- **No fake urgency, no countdown, no limited availability.**
- No consent pre-ticked; no bundled consent.

## 17. Critical dependency — recorded, not solved here
**VERIFIED FACT: the production form has no `action` and no `method` and transmits nothing, while showing a success screen.** There is no backend — no `app/api/`, no route handler, no email capability. **Every enquiry since that code shipped was lost and the visitor was told it succeeded.**

**No content change fixes this.** The page is content-ready and **launch-blocked on the technical prerequisite.** Persist-first architecture is specified in `POST_SUBMISSION_AND_FOLLOWUP.md`; **a false success is the one outcome that is never acceptable.**

## 18. Owner input — BLOCKING
The complete registered postal address with a real postal code · the phone and email to publish · who owns enquiry response and the business hours to state · consent wording, subject to legal review.

## 19. Visual opportunities
Minimal by design. **A real map or a real photograph of a real location only if one exists** — no stock office imagery, and nothing that implies a presence the business does not have.
