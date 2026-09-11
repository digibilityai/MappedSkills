# Content Brief — `/schedule-call`

**Session:** 09 · **Status:** **PROPOSED — NOT APPROVED.** · **Class:** LAUNCH — unconditional
**Page type:** Conversion — booking surface · **IA reference:** `PAGE_REASON_TO_EXIST_MATRIX.md` §6, `PAGE_TYPE_CRO_RULES.md` §9
**No copy or design is written in this brief.**

---

## 1. Page job
Complete the qualified enquiry through the booking surface. **A qualified meeting booking is a qualified enquiry — not a lesser conversion.**

## 2. Audience
A visitor who prefers a conversation to a form. **In the beachhead segment this is frequently the preferred route**, and price-stage buyers on `/pricing` want a person.

## 3. Search intent
**T** — brand navigational.

## 4. Primary query family
None.

## 5. Buyer problem
"I would rather talk to someone than write out my situation in a box."

## 6. Desired belief change
From *"booking a call means a sales pitch"* to *"I know who I am meeting, how long it takes, and what I get out of it even if I do not buy."*

## 7. Content requirements
| Element | Requirement |
|---|---|
| **What the call is** | Purpose, length, who is on it by name |
| **What the visitor gets** | Something useful whether or not they proceed |
| **What to bring** | So the call is worth both parties' time |
| **What it is not** | Not a pitch deck; not a free full audit — **and this framing changes once the entry-offer model is decided** |
| **Direct contact** | Phone and WhatsApp visible for those who would rather call now |

## 8. Proof requirement
**Minimal.** Proof here is a distraction from a decided visitor.

## 9. Questions the page must answer
1. Who will I be speaking to?
2. How long will it take?
3. What will we cover?
4. What do I need to prepare?
5. What happens afterwards?

## 10. Objections
| Objection | Honest handling |
|---|---|
| "It will be a sales call" | State what is actually covered and what the visitor leaves with |
| "I do not have time" | State the real length |
| "I would rather email" | Cross-link to the form surface. **Both are primary** |

## 11. Internal links in
Header CTA · every commercial page · `/pricing` (booking emphasised) · `/contact` · footer.

## 12. Internal links out
`/contact` (the other surface) · `/how-it-works` for anyone not yet ready. **Minimal.**

## 13. Primary CTA role
**PRIMARY only — the booking surface.** Secondary: cross-link to the form; DIRECT always visible.

## 14. Schema and content implications
`BreadcrumbList`. `noindex` is **not** applied — this is an indexable launch page. No `Event` schema; these are not public events.

## 15. What NOT to claim
- **No response-time or availability promise** that has not been measured or confirmed.
- No "free audit" or "free strategy session" framing **until the entry-offer model is decided** — that decision is open, and content must not pre-empt it.
- No guaranteed outcome from the call.
- **No fake scarcity** — no "only 3 slots left", no countdown.

## 16. Critical dependency — recorded, not solved here
**VERIFIED FACT: the production Calendly container renders empty, with zero iframes on the page, and the pre-hydration HTML shows a "Calendly booking link is not configured yet" fallback — which is what non-JS crawlers see.**

**Open technical question with a content consequence:** whether the booking tool can accept runtime custom fields and expose the completed booking server-side with those fields. **If it cannot, booking is demoted from a primary conversion surface to a secondary conversion** — and that demotion must be recorded rather than quietly accepted. **Attribution completeness still never disqualifies a legitimate enquiry.**

## 17. Owner input
Who takes the calls, real availability, and the business hours to publish.

## 18. Visual opportunities
Minimal. **A real photograph of the person the visitor will meet** does more than any graphic here, and it is the one visual with a direct conversion rationale.
