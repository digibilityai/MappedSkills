# Wireframe — STATE 01 — Form Lifecycle (S1) — idle → focused → busy → success → validation failure → server failure — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Applies to the [FORM] region of `34_WIREFRAME_MASTER_CONTACT.md` (W4, `/contact`).
**Source of structure:** `09_FORM_AND_BOOKING_UX.md` §4–§6.

---

## Margin notes

- **Page type:** Conversion surface — form region only, all six states of the same object.
- **First screen / apparatus:** N/A — this is a component-state artefact, not a full page. Zero apparatus in all five states (B17 holds throughout).
- **F1 class:** N/A.
- **CTA roles/locations:** [ACT] submit control across every state; its label, enabled-state and focus behaviour are the subject of this artefact.
- **Omitted slots:** none — this artefact exists to prove nothing is omitted through failure (values preserved through every failure, `09` §5).
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P10 *(the form region only — this is a component-state artefact, not a page)*.
- **Width class shown:** WIDE. Behaviour is width-independent; mobile-specific overlap risk covered in `48` §M4.
- **What this artefact uniquely proves:** **values are preserved through every failure. No false success is possible.** The most consequential state set in the whole system (`28` §4 S1). It also carries the analytics and privacy contract for the conversion path (§ below), because that is where a screening outcome would leak if it leaked anywhere.

---

## Six states, each as a diagram of the [FORM] region only

```
STATE 1 — IDLE
┌─────────────────────────────────────┐
│ [fields, empty or partially filled]   │
│ [ACT] Submit — enabled, no busy state │
└─────────────────────────────────────┘

STATE 2 — FOCUSED (any field or the submit control has focus)
┌─────────────────────────────────────┐
│ [field: Work email]  ← VISIBLE FOCUS  │
│  indicator on the focused control,     │
│  never removed and never conveyed by   │
│  colour alone (B1/F5 logic applies to  │
│  controls as well as figures)           │
│ label remains visible while the field    │
│  is focused and filled — never a          │
│  placeholder standing in for a label       │
│ any field-level help/format hint stays     │
│  visible on focus, not on hover              │
│ [ACT] Submit — enabled                        │
└─────────────────────────────────────┘
  · Focus order follows DOM order: 4 required, then the
    optional group, then consent, then privacy, then submit.
  · Focus is never moved by the page while the visitor is
    typing; it moves only on submit outcomes (STATE 4, 5, 6).
  · No focus trap. Tab leaves the form in both directions.
  · Nothing sticky may overlay the focused control or the
    submit control at any width — the keyboard-open case is
    `48` §M4.

STATE 3 — BUSY (immediately on submit press)
┌─────────────────────────────────────┐
│ [fields — values retained as typed]   │
│ [ACT] Submit — DISABLED, busy state,  │
│  announced via status region (not     │
│  only shown visually)                  │
└─────────────────────────────────────┘

STATE 4 — SUCCESS (only after server confirms durable persistence)
┌─────────────────────────────────────┐
│ [form region replaced by confirmation]│
│ focus moves to confirmation, announced│
│ via status region → routes to         │
│ /thank-you (see S2, `44`)              │
└─────────────────────────────────────┘

STATE 5 — VALIDATION FAILURE
┌─────────────────────────────────────┐
│ [SUMMARY] N fields need attention —   │
│  each item links to its field          │
│ [fields — ALL VALUES PRESERVED,        │
│  error fields marked with field-level  │
│  message describing HOW to fix]        │
│ focus moves to first error             │
│ [ACT] Submit — re-enabled                │
└─────────────────────────────────────┘

STATE 6 — SERVER / NETWORK FAILURE
┌─────────────────────────────────────┐
│ [fields — EVERY TYPED VALUE PRESERVED] │
│ "This was a fault at our end, not      │
│  yours." — explicit failure statement   │
│ [ACT] Retry                             │
│ [PEO] fallback: email / phone route      │
│ NEVER a silent failure. NEVER a false    │
│ success.                                  │
└─────────────────────────────────────┘
```

**Additional annotated states, per `09`§5, not independently diagrammed (identical UI to STATE 4 — success — by design):**
- **Double submission** — disabled control + client idempotency key; same visible success state, no duplicate record.
- **Suspected spam** — identical success state. Detection logic never revealed to the submitter.
- **Screening outcomes** (qualified / unqualified / review-required) — all render STATE 4 identically. §6 of `09` — invisible to the visitor by design.

## Analytics and privacy contract for this form — binding

**Recorded here, on the artefact that shows the states, because a state that is invisible to the visitor can still be visible in an analytics dataset.** Carried from `EVENT_TAXONOMY.md` §7 (PII prohibition), §6 (spam) and `POST_SUBMISSION_AND_FOLLOWUP.md`; nothing here is new policy.

**1 — No PII in analytics, ever.**

| Never in any event, parameter, page path or URL |
|---|
| name · work email · phone/WhatsApp number · company name · website URL · **the free-text "what you're trying to fix" content** · IP address as a stored dimension · any UTM value carrying an identifier |

- On a validation failure (STATE 5), **only `field_name` is recorded — never `field_value`.**
- **Message text is never sampled, truncated or hashed** into an analytics payload.
- `page_path` excludes query strings, which can carry identifiers.
- The opaque **`enquiry_id`** is the only join to identified data, and resolving it requires CRM access.

**2 — The screening outcome must not leak through analytics.**

`09` §6 and B5 make qualified / unqualified / review-required / spam **invisible to the visitor**: all four render STATE 4 identically. **That invisibility must hold on the wire as well as on the screen.**

| Rule | Consequence |
|---|---|
| **`qualification_status` is carried only on the server-side conversion event.** It is never attached to a client-side event, never written into the DOM, and never exposed in a response body, redirect URL, `/thank-you` query string or cookie the browser can read | A visitor — or anyone reading their network traffic — cannot infer how they were screened |
| **Confident spam fires no analytics event at all** (`EVENT_TAXONOMY.md` §6) | A spam submission is indistinguishable from a legitimate one *to the submitter*, and cannot corrupt the business metric |
| **`review_required` fires the conversion event with that status and is excluded from the business metric** until a human resolves it | Suspicion is not a silent rejection, and it is not a visible one either |
| **The detection logic itself is never revealed** — no "this looked like spam", no retry hint, no differing timing, wording or redirect | The success state is byte-identical across all four outcomes |
| **`unqualified_reason` is a category, never free text** | No fragment of the visitor's message reaches analytics by the back door |

**3 — What this does not change.** The **server-confirmed success model is untouched**: STATE 4 still renders only after the server confirms durable persistence, both conversion events still fire server-side, and a `/thank-you` pageview still creates no conversion (`09` §9.5). **No internal qualification logic is documented here, and none may be** — the rules above describe what must not escape, not how the screening works.

**Prohibited on this wireframe (checked):** any client-side-timer or optimistic success (STATE 4 must depend on server confirmation), any error state that clears preserved values, a red-border-only error signal, an error summary that does not link to its fields, any visible distinction between a legitimate success and a screened/spam success, **any client-side event or browser-readable value carrying a qualification/spam/review state**, **any PII in an analytics payload**, a focus indicator suppressed or conveyed by colour alone, a placeholder used in place of a visible label, and any focus movement while the visitor is typing.
