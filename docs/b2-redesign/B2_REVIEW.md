# B2 Design Review: six pages, desktop and mobile

**Status:** DESIGN ONLY. Awaiting owner approval. Nothing implemented, pushed, merged or deployed.
**Baseline:** `origin/main` = `a1cc927f55b17adeac16a6c1aa1836301939a6bc` (VERIFIED FACT, confirmed by `git fetch`). The working branch is `feat/ai-search-redesign` with unrelated local changes; this batch added files only under `docs/b2-redesign/`.

## Revision 3: correction log and unresolved facts

| # | Page | Change |
|---|---|---|
| 1 | `/pricing` | The proposal sentence is now exactly: "Your written proposal confirms the agreed scope, deliverables, fees and terms." The "where this page and your proposal differ" wording is gone. |
| 2 | `/how-it-works` | "We do most of the work" now reads: "We plan, run and report on the agreed advertising. You provide access and knowledge, make decisions and follow up the enquiries that come in." The Test step and the "Replies to enquiries" row now say your team replies to and follows up enquiries, and that quick replies matter. "The one part only you can do" is removed. Website, landing page and tracking changes stay in the separate "agreed separately" box. |
| 3 | `/about` | "Independently operated" **checked and kept.** Source: owner-confirmed fact (OWNER REQUIREMENT) in `docs/00-project/DECISION_LOG.md` (the /about G1 decision of 2026-10-18, item 3) and `docs/about-redesign/g0/AB_G0_DECISIONS.md`. |
| 4 | Both PDFs | Rebuilt. Desktop has all six pages at 1440px, composed separately from mobile (two-column heroes, ledger and gate, split panels, form beside its guidance). Mobile has the three corrections. Scripted checks again show no overflow and no tap target under 44px at 390, 768, 1024 and 1440px. |

Functional contract unchanged and re-checked against the drawings: all eight service options, the honeypot and privacy line, the two intentions with values kept on switch, the thank-you gating and conversion semantics, all FAQ question ids with native disclosure, and no SEO metadata change.

**Unresolved facts for the owner**
1. **"Independently operated" sits in the same 2026-10-18 owner decision as the team-heads statement you have now removed.** It is verified against that source, but please reconfirm it still stands. If not, the About hero line needs one phrase removed.
2. **FAQ timing wording** for Google Ads and Meta Ads (reworded from approved copy) needs approval.
3. **New headlines** for pricing, about and FAQ need approval.
4. **Removal of the old how-it-works priority-sort example and journey illustrations** needs sign-off.

## Revision 2: changes made and remaining blockers

Owner corrections applied to the existing designs (visual direction unchanged):

| Page | Change |
|---|---|
| `/about` | People section removed entirely, with all four placeholders. The wider-team wording, founding-year and history slots and the facts strip are gone. Nothing replaces them. Sections now run hero, dark belief stage, Google Ads and Meta Ads split, working approach, verified case studies, closing band, with the case studies moved onto the paper surface to keep the rhythm. |
| `/how-it-works` | Five steps and the approval gate kept. "Every engagement runs the same way" is now "How the work usually runs", with a line that detail differs by business and the proposal sets out what applies. Diagram caption says "usually". The priority-sort example stays removed. |
| `/pricing` | Two-stream diagram kept. Added a three-part legend: ad spend (paid to the platform), management fee (paid to us), separately scoped work (quoted in the proposal). The proposal block now reads "The written proposal is what counts", listing scope, deliverables, fees, duration and terms, separately agreed work and reporting. No prices, packages or guarantees. |
| `/faq` | Six groups and all question ids kept. The timing answer now covers Google Ads, Meta Ads and the enquiry form, with no dates and no organic search row. |
| `/contact` | Form unchanged. The states frame now states that switching intention keeps every typed value, and only the call-only time field and its error come and go. |
| `/thank-you` | Unchanged. |
| Site-wide | Content column and gutters now match the live site (measured on mappedskills.com: 1360px maximum with 56px gutters at 1440, header 77px, logo 28px). A medium layout (1080px and below) was added, with the menu button replacing the nav. Footer links and footer base links are 44px tall. |

Checks on this revision (Chrome, scripted): no horizontal overflow and no tap target under 44px, footer links included, at 390, 768, 1024 and 1440px. The earlier note about an unknown page width and missing medium layout is resolved. Still not checked: real devices, screen readers, JavaScript-off and reduced-motion behaviour, cross-browser.

**Remaining blockers and decisions**
1. **New FAQ timing copy.** The Meta Ads and Google Ads timing rows are reworded from approved wording and need owner approval. Whenever the FAQ answers change, the FAQPage structured data must be generated from the same array, as it is today.
2. **New headlines** for pricing, about and FAQ (see decision 3 below) still need approval.
3. Pricing proposal sentence: resolved in Revision 3 with the owner-approved wording.
4. **Contact service dropdown** still lists eight options including SEO and AI Search, kept because it is the CRM contract. Not changed.
5. **Content removed from the live how-it-works page** (priority-sort example and journey illustrations) still needs sign-off at implementation.
6. Resolved by the owner: About people, founding year and history are out.

The sections below are the first-round review; where they mention About people, history, width or the medium layout, this revision supersedes them.

## Deliverables

| File | Contents |
|---|---|
| `pdf/b2-desktop.pdf` | 10 frames at 1440px: cover, six pages, three supplemental state frames |
| `pdf/b2-mobile.pdf` | The same 10 frames at 390px, laid out for mobile, not scaled down |
| `src/` | `build.mjs`, `style.css`, `render.mjs` (regenerate with `node build.mjs && node render.mjs`), `render-report.json` (automated checks) |

Frame order: 1 `/how-it-works` · 2 `/pricing` · 3 `/about` · 4 `/faq` (all closed) · 5 `/faq` expanded state · 6 `/contact` · 7 `/contact` states (validation, sending, server or network error, call intention) · 8 `/thank-you` · 9 `/thank-you` call-request and direct-visit variants, with the tracking contract. Every frame carries a page label, the approved header and the approved footer.

## The six designs in brief

| Page | Job | Layout idea (deliberately different per page) |
|---|---|---|
| `/how-it-works` | Remove fear of the unknown | Vertical journey rail in the hero. A ledger of the five approved steps (Assess, Plan, Launch, Test, Review) with We do / You do / You receive. The ledger is interrupted by one dark **approval gate** (tangerine diamond): "Nothing starts until you say yes." Then your part, then the monthly report beside a hatched "what the numbers cannot show" panel. |
| `/pricing` | Make the money logic clear with no number | Two-stream diagram: ad spend goes to the platform, management fee goes to MappedSkills. Three staggered fee factors. A three-part ledger: included in management / agreed separately (dashed) / paid to the platform (dark). A proposal sheet. Quote steps and a readiness check. |
| `/about` | Trust from philosophy and focus | Dark belief stage ("Traffic is not the finish line. Enquiries are."), Google Ads vs Meta Ads as a split panel, three commitments with a who-does-what split, **flagged placeholders** for people and history, two case-study links with no outcomes. |
| `/faq` | Answer buyer concerns | Six concern groups (18 questions), each a two-column band, native disclosure, "Open all answers" and jump chips kept. Expanded state shown as a specification frame. |
| `/contact` | Make it easy to explain the business | Quiet editorial column left, the one form right. The form is the single commercial action. "What we'll talk about" and a calm close below. Mobile puts the form before the helper note. |
| `/thank-you` | Confirm without promising a time | A receipt: message received (tangerine tick), reply by email or WhatsApp (next), discovery call (if it helps, dashed). Three useful onward links. |

## Key visual and UX decisions

1. **One dark moment per page, tangerine only at events.** The how-it-works approval gate, the about belief stage, the pricing platform column, the closing orange band. Tangerine marks the gate, the received tick and the CTA, not wallpaper.
2. **Honest fills.** Dashed and hatched surfaces mean "not part of the fee", "cannot be measured" or "awaiting an approved fact". They never imply data. No numbers, scales or charts appear anywhere.
3. **Process shown as a structure, not step cards.** Ledger rows and a gate on how-it-works, a payment flow on pricing, a receipt on thank-you, accordions on FAQ. No two pages share a layout.
4. **Five steps match the live /services page** (Assess, Plan, Launch, Test, Review) and the line "Nothing starts until you approve it".
5. **One CTA label everywhere:** "Discuss Your Advertising" (as in the approved header). Each page closes once. Contact's own action is "Send enquiry" / "Request a call", unchanged.
6. **Contact functional contract preserved exactly:** the intent toggle, six field labels, required and optional markers, hints, error strings, honeypot, privacy line and failure texts all come from `components/forms/ContactForm.tsx` and `lib/contact-request.ts` at a1cc927. No new fields, no response-time commitment, no WhatsApp workflow.
7. **FAQ copy is reused verbatim** from the approved `faqData.ts` (read from a1cc927 by the build script). Only five questions are new, taken from the live /services accordion or readiness text. Question ids are untouched.
8. **Thank-you tracking untouched:** no code on the page, `lead_form_submitted` still fires from the form on the 2xx, confirmation still gated by the one-time marker, page stays `noindex`.
9. **Motion specification (static PDFs cannot show it).** Calm, event, calm, once per view, no loops, no pinning. How-it-works: the gate diamond fills tangerine once as it scrolls into view. Pricing: the two payment paths draw once. FAQ: height-only open and close. Thank-you: the first row's tick fills once. Reduced motion and no JavaScript: everything renders in its final state and all meaning stays in the text.

## Comparison with THE RESOLVE and the live pages

| Check | Result |
|---|---|
| Tokens (Ground, Paper, Ink, Ink Deep, Tangerine; Tangerine Deep for small text) | Used as specified. |
| Bricolage Grotesque headings, Manrope body | Yes (fonts confirmed loaded in the render). The mock fetches them from Google Fonts. The site's own self-hosted files apply in implementation. |
| Light-first with dark decisive stages | Yes. |
| No sticky or pinned narrative, no looping animation | Yes. |
| Vanity or decorative numbers, fake dashboards | None. |
| Banned vocabulary (guaranteed, 360, full-service, and so on) | "Guarantee" appears only in refusals. |
| Long or double dashes in copy | None found in markup (scripted check). One existing string uses an en dash (`2–5 PM IST` hint in `ContactForm.tsx`); the design writes "2 to 5 PM IST". |
| Header, nav labels, CTA label, footer | Match `components/direction-c/nav.ts` and `SiteFooter.tsx` at a1cc927. |
| Page width | Content column is 1200px (1280 with 40px gutters). **UNKNOWN** whether this equals the live `dc-wrap`; verify during implementation. |
| Breakpoints | Narrow 760 and below per the Brand DNA. A distinct medium layout (761 to 1080) is not drawn; implementation should reflow the two-column bands to one column at that range. |

## Automated checks (run in Chrome on the final HTML; see `src/render-report.json`)

- **Overflow:** none at 1440 or 390 (no horizontal scroll, no element past the viewport).
- **Tap targets:** every button, text link, accordion icon, chip, menu button and intent option is at least 44px high.
- **Contrast (WCAG ratios):** Ink on Ground 16.8, Ink on Tangerine 5.97, Tangerine Deep on Ground 6.02, Tangerine on Ink Deep 6.2, captions on Ground 8.16, error red on its tint 6.99. **White on Tangerine is 3.11, so it is not used:** buttons use Ink text on Tangerine, and small tangerine text uses Tangerine Deep.
- **Not checked:** footer link tap height (about 29 to 32px as drawn, so implementation needs padding to reach 44px on mobile), real screen readers, real devices, JavaScript-off and reduced-motion behaviour (specified only), cross-browser.

## Material open business decisions

1. **About, people (blocks release).** Names, roles, one-line introductions, photos and written photo consent for the four team heads are **UNKNOWN**. They stay as flagged placeholders. The existing G2 owner condition says the page must not go live while any placeholder shows. Options: supply the profiles, or release About without the People section.
2. **About, history.** No approved founding year or history exists. A flagged slot is drawn; omit it unless the owner supplies a fact. "Independently operated" and the Pune base are used (owner confirmation recorded in the About G0 notes; the footer lists Pune only). The Mumbai office is not mentioned.
3. **New headlines.** `/how-it-works` keeps its approved H1. New proposed H1s: pricing "Pay for the work your business needs.", about "An advertising agency that answers to your enquiries.", FAQ "What owners ask before they start." Contact and thank-you keep their approved headings. Please approve or amend.
4. **Contact service dropdown.** The contract still offers eight options, including SEO, AI Search and Lead Generation. That sits awkwardly with "supporting capabilities must not become a second catalogue", but changing labels or order touches the CRM mapping and stored values. Left unchanged; if wanted, it is a separate approved change.
5. **FAQ scope.** The two AI search questions are kept in a "Beyond paid advertising" group so existing anchors still work. The approved "How long before we see a difference" answer includes an organic search row ("12 months or more") and has **no approved Meta Ads timing**. Decide whether to keep the row and whether to supply Meta timing.
6. **How-it-works content removed.** The interactive "Sort by priority" example (a renovation business) and the three journey illustrations are not carried over because they illustrate unrelated services. This removes live-page content and two client components. Confirm.
7. **New microcopy.** The contact helper box ("Helpful to mention, if you can") and the thank-you onward links are new copy, not new fields. Confirm.

## Implementation risks (for the next cycle, not actions now)

- **FAQPage schema must keep coming from the same array as the visible text.** Only the five new items are additions; metadata, canonical URL and question ids must not change.
- **`/contact` and `/contact/call` share one layout and one form instance** (typed values survive a toggle). The new grid areas (form before the helper note on mobile) must not remount the form.
- **Thank-you gating:** the neutral state must remain the server default, with the confirmation shown only after the marker check. Keep the page `noindex` and out of the sitemap.
- **Replacing the C+ CSS** (`how-it-works.css`, `pricing.css`, `about.css`, `faq.css`, `contact.css`) risks regressions. Prefer shared primitives, matching how /services was done.
- **Consent banner and layout shift:** the cookie banner was a CLS fix in DEC-085; new hero heights must be checked with it open.
- **Footer tap targets and a medium-width layout** need real work at implementation (see above).

## Confirmation

No production page code, shared component, CMS content, database, form, routing, SEO metadata, consent, analytics or tracking was modified. Nothing was committed, pushed, merged, deployed or opened as a PR. B3 was not started. The only changes are new files under `docs/b2-redesign/` (untracked).
