# Wireframe — VARIANT 05 — Booking Surface (V5, `/schedule-call`) — of W4 — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Inherits `34_WIREFRAME_MASTER_CONTACT.md` (W4).
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §13 · `09_FORM_AND_BOOKING_UX.md` §8 · `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` §3.

---

## Margin notes

- **Page type:** Conversion surface, booking variant of W4. **Structural difference: booking region rather than a form; the page's own content outside the embed; no form fields of its own.**
- **First screen:** what the call is, and the route into booking it. Zero apparatus.
- **F1 class:** **D — NONE.**
- **CTA roles/locations:** [BOOK] is the page's conversion object. [SEC] one cross-link to `/contact`, stated as an equal, once. [PEO] direct contact, prominent, equal weight to booking.
- **Omitted slots — margin annotation only; the artboard carries no `[BLK]` tag** (`30` §4.1). **The whole route is case 0** (`26` §3) and does not launch, so the diagram is the **FILLED** state at structural completeness. Blocked inputs: **who takes the calls, what the call is, its length and availability** *(owner)* · **a published phone number** for the DIRECT peer *(owner)* · **a working booking surface accepting runtime custom fields** *(technical)*.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P1 · P8 *(prominent)* · P10 *(booking variant)* · R1 · R2.
- **Width class shown:** WIDE (primary). NARROW: the booking surface must be usable at the smallest supported width — "an embed that only works on desktop fails a mandatory capability" (`03` §13).
- **What this artefact uniquely proves:** the vendor-failure decision rule (`25` §3) — the page is useful before the embed loads and if it never loads; loading / failed / no-availability states are all explicit and never a silent empty region.

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Utility nav + header CTA. NOT a primary nav item.      │
├───────────────────────────────────────────────────────────┤
│ WHAT THE CALL IS                                    [ARG]   │
├───────────────────────────────────────────────────────────┤
│ WHAT YOU GET EITHER WAY                             [ARG]   │
├───────────────────────────────────────────────────────────┤
│ WHAT IT IS NOT                                      [ARG]   │
├───────────────────────────────────────────────────────────┤
│ WHAT TO HAVE TO HAND                                [ARG]   │
├───────────────────────────────────────────────────────────┤
│ [BOOK] — booking region, progressively enhanced               │
│  ┌─────────────────────────────────────────────┐              │
│  │ default: booking widget (server-rendered      │              │
│  │ page content survives around it — never the    │              │
│  │ page's only content)                            │              │
│  └─────────────────────────────────────────────┘              │
│  timezone shown explicitly, defaults to visitor's detected     │
│  zone                                                            │
├───────────────────────────────────────────────────────────┤
│ [PEO] direct contact — prominent, equal weight to booking       │
├───────────────────────────────────────────────────────────┤
│ [SEC] one cross-link → /contact, stated as an equal, once        │
│  (`25`§4 — no comparison, no chooser)                             │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                      │
└───────────────────────────────────────────────────────────┘
```

**Vendor-failure states (annotated per `25`§3, drawn as three alternate states of the [BOOK] region only — see also S1 in `43`):**
```
LOADING          → honest pending state, never an empty container
FAILED TO LOAD   → explicit statement + form route + direct contact shown in place of widget
NO AVAILABILITY  → stated plainly + form route + direct contact
```

**Prohibited on this wireframe (checked):** proof elements, scarcity/"limited slots" framing, a "free" framing before the entry-offer decision, any availability/response-time promise, a guaranteed outcome from the call, form fields duplicating `/contact`'s, **any `[BLK]` tag or placeholder drawn on the artboard** (`30` §4.1).
