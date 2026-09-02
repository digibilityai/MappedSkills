# Wireframe — MASTER 04 — Conversion Surface (W4, `/contact`) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §12 · `09_FORM_AND_BOOKING_UX.md` §1–§7 · `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` §2 · `26_OWNER_BLOCKED_STRUCTURE_RULE.md` §3 (case 0 route).

---

## Margin notes

- **Page type:** Conversion surface (form). **Case 0** per `26` — the whole route is launch-blocked (no server endpoint, no durable persistence, no transactional email; NAP owner-blocked) regardless of copy.
- **First screen:** the ask, and the form. **Zero apparatus, zero figures, zero proof anywhere on the page** (B17).
- **F1 class:** **D — NONE.** `/contact` carries zero figures of any kind (`22` §3).
- **CTA roles/locations:** [FORM] is the page's only conversion object — one [ACT]-class submit. [SEC] cross-link to `/schedule-call`, once. [PEO] direct contact, always visible, equal weight to the form.
- **Omitted slots — margin annotation only; the artboard carries no `[BLK]` tag** (`30` §4.1). **The whole route is case 0** (`26` §3): it does not launch, so no omitted state of it can exist on a live page, and the diagram is deliberately drawn as the **FILLED** state at structural completeness. The blocked inputs on this route are: **complete NAP** *(owner)* · **"what happens after you send it"** *(owner: enquiry response ownership)* · **published phone number** *(owner)* · **server endpoint, durable persistence and transactional email** *(technical)*. **Case A/B omission behaviour within a launching page is proved on the homepage instead**, in S5 (`47_WIREFRAME_STATE_BLOCKED_CONTENT.md`).
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P1 · P8 *(prominent)* · P10 *(form)* · R1 · R2. **No figure pattern: this page carries zero figures.**
- **Width class shown:** WIDE (primary). NARROW in `48` §M4 (keyboard-open sticky-overlap test).
- **What this artefact uniquely proves:** the only form on the site; the entity block as content, not decoration; zero apparatus page-wide holds even on the page most tempted to add proof.

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Utility nav + header CTA. NOT a primary nav item.     │
├───────────────────────────────────────────────────────────┤
│ THE ASK                                            [ARG]    │
│  what the form is for, one line · [EVD: ABSENT]              │
├───────────────────────────────────────────────────────────┤
│ [FORM] — one step, 4 required + 3 optional (grouped after)   │
│  1. Your name (required)                                      │
│  2. Work email (required)                                     │
│  3. Company (required)                                        │
│  4. What you're trying to fix (required, largest control)     │
│  ── optional group, marked "optional" in words ──             │
│  5. Phone/WhatsApp (optional)                                 │
│  6. Website (optional)                                        │
│  ── consent, separated ──                                     │
│  [ ] Marketing consent (unticked, never bundled)               │
│  privacy statement, adjacent to submit                         │
│  [ACT] Submit                                                  │
│  (service/problem context carried invisibly from origin page) │
├───────────────────────────────────────────────────────────┤
│ WHAT HAPPENS NEXT — who reads it and what they do with it      │
│  (it will not say WHEN)                                         │
├───────────────────────────────────────────────────────────┤
│ DIRECT CONTACT — [PEO] phone / WhatsApp, EQUAL weight to form  │
│  own region, more space around it than surrounding content     │
├───────────────────────────────────────────────────────────┤
│ WHERE WE ARE — complete NAP, as content not decoration          │
├───────────────────────────────────────────────────────────┤
│ [SEC] one cross-link → /schedule-call, stated neutrally,        │
│  once — never a chooser, never a comparison (`25` §4)           │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer — R2 entity block, byte-identical to /about        │
│  and this page's own NAP                                        │
└───────────────────────────────────────────────────────────┘
```

**Prohibited on this wireframe (checked):** no proof element anywhere (B17), no fifth required field, no budget field, no "how did you hear about us?", no response-time number, no rating/client count, no second form surface, no comparison chooser against `/schedule-call`, **no `[BLK]` tag or placeholder drawn on the artboard** (`30` §4.1).
