# Wireframe — STATE 02 — Thank-You (S2) — form variant / booking variant / link-omitted variant — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §16 · `09_FORM_AND_BOOKING_UX.md` §9 · `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` §5.

---

## Margin notes

- **Page type:** `/thank-you`. Reached only from a confirmed submission or confirmed booking. Never in navigation, never in sitemap, `noindex`.
- **First screen:** the confirmation. That is the whole first screen — visible without scrolling.
- **F1 class:** **D — NONE.**
- **CTA roles/locations:** **None.** The conversion has happened. At most one LOW-COMMITMENT link (form variant only).
- **Omitted slots — margin annotation only; nothing below is drawn on any of the three artboards** (`26` §5, `30` §4.1):

  | Slot | Case | Blocker | Artboard |
  |---|---|---|---|
  | "What happens next" | **A** | Owner: enquiry response ownership. **It will not say when, in any variant** | **Nothing drawn**, on any variant. Never a heading with nothing beneath it |
  | "If it is urgent" — phone/WhatsApp | **A** | Owner: published phone number | **Nothing drawn**, on any variant |
  | The one useful link *(form variant only)* | **A** while its destination is blocked | The mapped destinations are case-0 routes | Drawn in **Variant A**, where the destination is unblocked. **Nothing drawn in Variant C** |

  **Variant C is Variant A with the link's destination still blocked.** The two artboards differ only by the presence of that one link — there is no container, heading or placeholder in Variant C where Variant A has it, which is exactly what case A means.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P10 *(confirmed state)* · R1 *(utility only)* · R2.
- **Width class shown:** WIDE (primary). NARROW: confirmation visible without scrolling.
- **What this artefact uniquely proves:** the routing asymmetry in `25` §5 (form variant gets one context-derived link; booking variant gets none) and the case-A omission rule applied to a real launch page.

---

## Three variants, each a full page diagram

```
VARIANT A — FORM SUBMISSION (context known, destination unblocked)
┌───────────────────────────────────────────────────────────┐
│ [NAV] utility only — never primary nav                       │
├───────────────────────────────────────────────────────────┤
│ CONFIRMATION — "it arrived", reference shown where one exists │
│  visible without scrolling, entire first screen                │
│ [EVD: ABSENT]                                                    │
├───────────────────────────────────────────────────────────┤
│ [SEC] ONE LOW-COMMITMENT LINK, derived from origin page          │
│  (mapping: commercial page → method · problem page → diagnostic  │
│  entry · research entry → research index · pricing → method)      │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                       │
└───────────────────────────────────────────────────────────┘

VARIANT B — MEETING BOOKING
┌───────────────────────────────────────────────────────────┐
│ [NAV] utility only                                             │
├───────────────────────────────────────────────────────────┤
│ CONFIRMATION — booking confirmed, TIME REPEATED in visitor's    │
│  own timezone, visible without scrolling                          │
│ [EVD: ABSENT]                                                      │
├───────────────────────────────────────────────────────────┤
│ NO LINK. (deliberate asymmetry — `25`§5: informational need        │
│  of zero; everything useful was on /schedule-call, just read)      │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                         │
└───────────────────────────────────────────────────────────┘

VARIANT C — FORM SUBMISSION, LINK DESTINATION STILL BLOCKED
(case A applied to the link itself: the section simply is not there)
┌───────────────────────────────────────────────────────────┐
│ [NAV] utility only                                              │
├───────────────────────────────────────────────────────────┤
│ CONFIRMATION (identical to Variant A)                           │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                          │
└───────────────────────────────────────────────────────────┘
```

**Prohibited on all three variants (checked):** a second ask of any kind, a response-time statement in any form including "shortly"/"soon", celebration language or exclamation marks, a progress bar or "step N of N", anything implying the enquiry has been assessed, an upsell/referral/review/social-follow prompt, more than one link on the form variant, any link on the booking variant, any `[BLK]` tag, container or placeholder drawn on any of the three artboards (`30` §4.1), a `/thank-you` pageview treated as a conversion event (both conversion events fire server-side per `09`§9.5).
