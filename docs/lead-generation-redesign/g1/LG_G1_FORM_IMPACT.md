# Lead Generation G1: form impact assessment (budget line)

- **Date:** 2026-10-17 · **Phase:** G1 design proposal only · **Scope:** `/lead-generation`
- **Owner request (PDF p2):** "The right-hand side form if we can remove the budget line. The form height can be reduced if possible."
- **Nothing was changed** in any form, API, database, analytics, CRM or notification code during G1.

## 1. Headline finding (VERIFIED FACT)

**The right-hand panel in the live `/lead-generation` hero is not a form.** It is an illustration (`<figure class="lg-fig">`)
of "a campaign enquiry" with blank grey bars and margin numbers 1 to 5. It contains no `<form>`, `<input>`, `<textarea>`
or `<select>` (live DOM check, 17 Oct 2026: 0 form controls in `<main>`). Its caption reads "Illustration of the proposed
process. Not a real enquiry."

Source: `components/cplus/lead-generation/content.ts` (`card.fields`, including `{ f: 'Budget — only if relevant', n: 2, optional: true }`)
rendered by `LeadGenBody.tsx` as a `<dl>` with a visually hidden "blank" per field.

*(Describes the LIVE panel. The G1 panel is now a filled-in example enquiry; see LG-D05 and Correction 02.)* It shows the kind of enquiry a **client campaign** would collect under the verification standard MappedSkills is
introducing (WP-5 pilot spec), where a client *may* opt into a declared budget question. It is **not** the
MappedSkills enquiry form.

**Why the owner read it as a form:** it has a form's anatomy (label, empty field, label, empty field) and sits where a
hero form usually sits. That is a real usability problem. A visitor may try to type in it. The proposal fixes it by
showing the example **filled in**, with a status chip, so it reads as an example, not as an input.

## 2. Dependency check for removing "Budget"

| Dependency the brief asked about | Finding | Evidence | Change needed for G2 |
|---|---|---|---|
| Form validation | None. The illustration has no validation. The real form (`components/forms/ContactForm.tsx`) has **no budget field** | ContactForm header: "BUDGET. `FORM_AND_BOOKING_SPEC.md` §1.4 removes it outright". Fields: name, work email, company, message (required); phone/WhatsApp, website, marketing consent (optional) | None |
| API request contract | None. `POST /api/enquiry` has no budget property | `lib/enquiries.ts`: "NO BUDGET COLUMN" | None |
| Database schema | None. No budget column | `db/migrations/001_create_enquiries.sql`: "NO BUDGET COLUMN … Phase H1's acceptance is 'no budget field exists'" | None |
| CRM or email integration | None found for the illustration. The CRM webhook sends the same enquiry row, with no budget | `lib/enquiries.ts`; Mini CRM out of scope (`DEC-052`) | None |
| Analytics / GTM | None. No event or `data-*` hook reads the illustration. Form events (`lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`) are on `/contact` only and carry no field values | `lib/analytics`, ContactForm H2 notes | None. Class and id changes are listed for E6 (LG-D20) |
| Lead qualification logic | Own site: the Website-Qualified Enquiry definition does not use budget (`QUALIFIED_ENQUIRY_DEFINITION.md` §1). Client campaigns (proposed standard): budget is an *optional, declared* criterion a client may choose | Live copy `split.agreed.d`: "Budget is one of the criteria only where it is relevant" | The proposal drops that sentence from the body (LG-D12). The client option itself is unaffected |
| Automated notifications | None for the illustration | n/a | None |

**Conclusion:** removing the budget line is a **visual and copy change only**. It needs no frontend logic, backend,
database, analytics or operational change.

## 3. Related inconsistency (out of scope, flagged)

`app/(pages)/privacy-policy/page.tsx` lists **"Marketing budget range"** under "Information You Provide", although the
website form has not collected budget since Phase H1. This is not part of this page. It is recorded as **LG-D22** for a
separate privacy-copy review. Nothing was changed.

## 4. Other fields

No other field is removed. The proposed example card shows four rows (Name, Business, Needs, Contact). These are
example contents, not field definitions. "Work email" and "Company" from the live illustration are folded into
"Contact" and "Business". This is presentational only (LG-D05).

## 5. Option not recommended: a real form in the hero

The brief's "including the form" could also mean putting the real enquiry form in the hero. **Not proposed**, because:
- it would be a new surface for `ContactForm`, and its `lead_form_started` / `lead_form_validation_error` events would
  begin firing on `/lead-generation`. That is a GTM and analytics change (`DEC-051`: "no new dataLayer events … without a
  taxonomy decision"), which needs an E6 check;
- the form has four required and three optional fields plus consent. It would not fit above the fold beside the
  headline at 1366 × 768 without cramping it;
- Brand DNA: "Commercial CTAs lead to /contact"; contact is a "protected functional surface".

If the owner wants it, it is a separate decision with its own analytics and QA plan.
