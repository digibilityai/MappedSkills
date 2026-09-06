# Session 30 — Phase H1 — Forms and Booking Backend

**Session:** 30 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `71e277c21fde011d1f739ade698e18b73f608601`
**Result:** **BLOCKED — OWNER / INFRASTRUCTURE INPUT REQUIRED.**
**Production code changed in this session: NONE.** This document is the whole of the output.

---

## 0. The finding, stated first

Phase H1's frozen acceptance is that **a real submission is durably persisted and retrievable**, and
that **success shows only after confirmed persistence**
(`06_IMPLEMENTATION_SEQUENCE.md` — Phase H1; `POST_SUBMISSION_AND_FOLLOWUP.md` §0, approved as part
of **Gate 6 / `DEC-011`**).

**No durable persistence of any kind exists in this repository or its configuration, and no
mechanism capable of delivering an enquiry anywhere exists either.** There is no database, no
datastore, no CRM, no webhook destination, no email transport, no email credential and no email
library. `CONTACT_NOTIFICATION_EMAIL` declares a destination but **nothing can send to it.**

A backend built today could therefore do exactly one honest thing on a valid submission: **fail.**
Any 2xx it returned would be a false success — the precise defect this phase exists to remove, and
the one outcome `POST_SUBMISSION_AND_FOLLOWUP.md` §0 names as *"never acceptable"*.

**H1 is consequently blocked at its load-bearing step, not at its edges.** The blocked part is not a
refinement of the enquiry flow; it is the enquiry flow.

---

## 1. Starting state — VERIFIED FACT

| Item | Observed |
|---|---|
| Branch | `test_branch` |
| HEAD | `71e277c` — *feat: translate remaining Resolve routes* |
| `origin/test_branch` | `4780d4b` — local is ahead; **nothing pushed in this session** |
| Working tree | Clean except untracked `README.md` |
| `README.md` | Untouched, unstaged, uncommitted |

---

## 2. Infrastructure audit — VERIFIED FACT

Every row below was established by repository inspection. Nothing is inferred from legacy code
alone, and nothing is assumed about the production host's environment, which this session **cannot
observe** and does not guess at.

| # | Capability | Exists? | Configured? | Provider | Required env | Owner input missing? | H1 action |
|---|---|---|---|---|---|---|---|
| 1 | Enquiry endpoint (route handler / server action) | **No** — `app/api/` does not exist; zero `'use server'` in `app/`, `components/`, `lib/` | n/a | n/a | none | No — buildable | **Not built.** Would have nothing to deliver to (rows 2–6) |
| 2 | **Durable persistence** | **No** | **No** | **None selected** | none declared | **YES — datastore decision + credential** | **BLOCKED** |
| 3 | **Transactional email (internal notification)** | **No** | **No** | **None** | destination `CONTACT_NOTIFICATION_EMAIL` declared in `.env.example` and **read by no source file**; **no provider or credential variable exists at all** | **YES — provider + API credential + verified sender identity** | **BLOCKED** |
| 4 | Acknowledgement email to enquirer | **No** | **No** | None | as row 3 | **YES** — same input | **BLOCKED** |
| 5 | CRM | **No** | **No** | None | none | **YES** — but see §4.3: **not H1-blocking** | Deferred |
| 6 | Outbound webhook destination | **No** | **No** | None | none | **YES** — endpoint URL, if this is the chosen delivery | **BLOCKED** |
| 7 | CAPTCHA | **No** | **No** | None | none | **No — and none is required.** `FORM_AND_BOOKING_SPEC.md` §8 places CAPTCHA at **layer 9**, *"only if layers 1–8 prove insufficient after launch"* and **"not deployed by default"** | **Correctly absent. Not a blocker** |
| 8 | Honeypot | **No** | n/a | Provider-independent | none | No | Not built — see §7 |
| 9 | Submission-timing check | **No** | n/a | Provider-independent | none | No | Not built — see §7 |
| 10 | Rate limiting | **No** | n/a | Provider-independent, but **in-process only** under Passenger; not durable across restarts | none | No | Not built — see §7 |
| 11 | Idempotency key enforcement | **No** | **No** | Requires row 2 | — | **YES** (via row 2) | **BLOCKED** |
| 12 | Duplicate detection | **No** | **No** | Requires row 2 | — | **YES** (via row 2) | **BLOCKED** — see §9 |
| 13 | Spam quarantine store | **No** | **No** | Requires row 2 | — | **YES** (via row 2) | **BLOCKED** |
| 14 | **Booking vendor** | Calendly code present **and defective** | **No** — `NEXT_PUBLIC_CALENDLY_URL` is **empty** in `.env.example`; the production value is **UNKNOWN to this session** | Calendly — **present in code, never recorded as selected** | `NEXT_PUBLIC_CALENDLY_URL` | **YES — vendor decision + real account URL** | **BLOCKED** — see §13 |
| 15 | Booking server-side confirmation (webhook) | **No** | **No** | None | none | **YES** — vendor capability + webhook secret | **BLOCKED** — see §14 |
| 16 | Consent mechanism | **No** | **No** | None | none | Yes | **Out of H1 scope** — H2 / Phase I |
| 17 | Analytics coupling inside form code | **Yes** — three direct `window.gtag(...)` calls in `ContactForm.tsx` | GTM conditional on `NEXT_PUBLIC_GTM_ID` | GTM | `NEXT_PUBLIC_GTM_ID` | No | **Left untouched** — see §15 |

**Secret handling.** No secret value was read, written, guessed or placed in any file. No `.env` or
`.env.local` exists in the working tree; only `.env.example` is tracked. **No placeholder production
credential was inserted anywhere**, and `.env.example` was not modified — adding provider variable
names for a provider nobody has chosen would encode a vendor decision the owner has not made.

### 2.1 What the deployment can support — VERIFIED FACT, and it is not the blocker

`server.cjs` is a plain Node HTTP server delegating to Next's own `getRequestHandler()`. **Route
handlers and server actions both work under it.** The deployment target (cPanel/Passenger, per
`CURRENT_INTEGRATIONS.md` §1) is **not** what blocks H1 — `FORM_AND_BOOKING_SPEC.md` §9 open
decision 1 is hereby answerable as **a Next.js route handler is viable**. It is blocked only by
having no destination to write to.

---

## 3. What exists today on the three routes — VERIFIED FACT

| Route | State |
|---|---|
| `/contact` | Phase G presentation. Renders `ContactForm`. §§2–4 render nothing (owner-blocked). One neutral cross-link to `/schedule-call` |
| `/schedule-call` | Phase G presentation. A plain outbound link to `NEXT_PUBLIC_CALENDLY_URL` **or the hard-coded default `https://calendly.com/mappedskills`**. `CalendlyEmbed` is **not rendered** on the route |
| `/thank-you` | Phase G presentation. `noindex, nofollow`, out of the sitemap, **still orphaned** — nothing links or redirects to it |

### 3.1 `ContactForm.tsx` — the live defect, unchanged by this session

```
await new Promise((resolve) => setTimeout(resolve, 1000));
setIsSuccess(true);
```

**The form has no submission target.** It waits on a client-side timer and then shows a success
state. Every enquiry it has received was lost while the visitor was told it had worked.

Its field set also violates the approved contract on three counts: it **requires phone**, it
**requires a service selection**, and it **requires a monthly budget band** — which
`QUALIFIED_ENQUIRY_DEFINITION.md` §1 establishes cannot qualify anything and
`FORM_AND_BOOKING_SPEC.md` §1.4 removes outright.

### 3.2 A second form with the identical defect

`components/forms/BlogNewsletterForm.tsx` fires a `gtag` event and sets a success message with **no
network call**. Same defect class, same blocker (no email provider). Recorded here; not in the
`/contact` test scope, and not repaired for the same reason.

### 3.3 `CalendlyEmbed.tsx` — three defects, all pre-existing

1. It mounts an **inline** widget container (`div.calendly-inline-widget`) and then calls
   **`Calendly.initBadgeWidget()`** — the **floating badge** API. The container is never populated.
2. `initBadgeWidget` injects a **floating persistent element**. The Resolve budget is **0 fixed and
   0 sticky elements site-wide**, so the badge cannot be used regardless.
3. Its no-URL fallback **hard-codes the owner-blocked phone number and email address.**

The component is unmodified and remains unrendered on any route. Phase G already routed around it.

---

## 4. Owner-dependent input

### 4.1 Derivable from the repository — NOT asked for

- **Notification destination.** `.env.example` declares `CONTACT_NOTIFICATION_EMAIL=info@mappedskills.com`.
- **The field contract.** Frozen by Gate 6 (§5 below).
- **Server validation rules, spam layers, WQE conditions, the two statuses.** All frozen by Gate 6.
- **Backend mechanism.** Answered in §2.1 — a route handler, verified viable.
- **Whether CAPTCHA is needed.** Answered: no, by `FORM_AND_BOOKING_SPEC.md` §8 layer 9.

### 4.2 Required, absent, and blocking

| # | Input | Unblocks |
|---|---|---|
| **1** | **Durable persistence: which store, plus its credential.** One of a managed database, a hosted datastore, or a CRM used directly as the store | The persist-first rule · success semantics · idempotency · duplicate detection · spam quarantine — **rows 2, 11, 12, 13** |
| **2** | **Transactional email: provider, API credential, and a verified sender identity** | Internal notification · acknowledgement email — **rows 3, 4** |
| **3** | **Booking: vendor decision (repair Calendly or replace it), the real booking account URL, confirmation of whether the vendor can accept runtime custom fields and expose a server-side webhook, and the webhook signing secret** | **Rows 14, 15**, and the `meeting_booked` conversion H2 depends on |

### 4.3 Required but NOT blocking H1

**CRM.** `POST_SUBMISSION_AND_FOLLOWUP.md` §4 makes CRM a **step-4 asynchronous** integration: *"CRM
unavailable — visitor unaffected. Record queued for reconciliation. The enquiry exists in durable
storage regardless."* Once input 1 exists, H1 can complete without a CRM. The decision is still
required before launch; it is **not** on H1's critical path.

---

## 5. Contact field contract — frozen, not implemented

From `FORM_AND_BOOKING_SPEC.md` §1 (Gate 6, `DEC-011`).

| Required (4) | Maps to WQE condition |
|---|---|
| Name | 2 — reachable identity |
| Work email | 2 · 3 (domain type) · dedup key |
| Company | 3 — business context |
| What you're trying to fix | 4 — stated need |

| Optional (3) |
|---|
| Phone / WhatsApp — optional on the form, **required on the booking surface** |
| Website |
| Marketing consent — separate, unticked, **never bundled with submission** |

**No budget field.** **Service/problem interest is not asked** — it is derived from the converting page.

**Budget removed: NO — the legacy budget field is still present in `ContactForm.tsx`.** So are the
required phone and required service select. §7 states why none of the three was removed in isolation.

---

## 6. Server authority — not established

No server-side validation exists because no server endpoint exists. The current form's only
validation is client-side and is therefore not validation at all in the sense Gate 6 requires:
nothing confirms a submission, because nothing receives one.

**No fake success was introduced.** No endpoint returns 2xx without delivering, because no endpoint
was written.

---

## 7. Why no partial implementation was built or committed

The provider-independent parts of H1 — the 4+3 field contract, server-side validation, the honeypot,
the timing check, request-size limits, in-process rate limiting — **are** implementable today. They
were deliberately not built, for one reason:

> **Every one of them is a property of a submission path that cannot complete.**

Building them would produce a form that is visibly more correct — fewer fields, no budget, proper
`autocomplete`, an accessible error summary — and that **still cannot deliver an enquiry**. The
outcome is one of exactly two, and both are worse than the present state:

1. **It returns success anyway.** That is the false success `POST_SUBMISSION_AND_FOLLOWUP.md` §0
   forbids and this phase exists to delete. Excluded absolutely.
2. **It returns an honest failure.** `/contact` then has **no working enquiry path at all** — and no
   fallback, because the published phone number and email are **owner-blocked** and Phase G
   correctly renders them nowhere. Taking the site's only enquiry surface offline is an **owner
   decision**, not an implementation detail, and this session is not entitled to make it.

Session prompt §34-B permits committing preparatory work *"only if doing so does not leave production
in a misleading half-state."* A polished, contract-correct, undeliverable form is a textbook
misleading half-state: it raises the visitor's trust in a path that still loses everything they type.

**On the budget field specifically.** Removing it alone would leave phone and service still wrongly
required — a partial field rewrite, which is worse than none, on a form that transmits nothing. The
field contract is one atomic unit with the submission path, and it lands with it.

---

## 8. Abuse protection

| Layer (`FORM_AND_BOOKING_SPEC.md` §8) | Status |
|---|---|
| 1 Honeypot · 2 Timing · 3 Server validation · 4 Rate limit · 6 Message heuristics | **Not implemented** — §7 |
| 5 Disposable-domain check · 7 Duplicate detection | **Blocked** — requires persistence |
| **9 CAPTCHA** | **Not implemented, and correctly so.** The approved spec deploys it only *after launch* if layers 1–8 prove insufficient. **This is not a blocker and no CAPTCHA provider or key is requested** |

**No anti-abuse mechanism was faked, stubbed or simulated.**

---

## 9. Duplicate handling — honest status

**Definition (`QUALIFIED_ENQUIRY_DEFINITION.md` §2, condition 5):** no existing open enquiry from the
same email within the deduplication window. The window itself is an **open calibration parameter**
(§10 decision 1) — deliberately unset, because setting it with zero real submissions to test against
would be invented precision.

**Persistence available: none. Implemented: no. Duplicate detection is NOT implemented and is not
claimed to be.** It is unimplementable without owner input 1: detecting a duplicate requires
remembering the first submission, and nothing in this system can remember anything.

The same dependency blocks **idempotency** (a double-tap must create one record) and **spam
quarantine** (§7A requires a separate retention-bound store).

---

## 10. Enquiry delivery

**Mechanism: none. Destination: none reachable. Provider: none. Server-confirmed: no.**

`CONTACT_NOTIFICATION_EMAIL` names an address, and **no code reads it and nothing can send to it** —
there is no SMTP configuration, no email API credential, and no email library in `package.json`
(verified: no `resend`, `nodemailer`, `@sendgrid/*`, `postmark`, `mailgun`; zero repository-wide
matches for any of them). **No delivery destination was invented.**

---

## 11. Success and failure contracts

**Neither is implemented, and the existing false-success path is unchanged.**

The contracts remain as frozen: success only on server-confirmed durable persistence, never on a
client timer; `/thank-you` as the destination, wired **at the point a server can confirm
persistence and not before**; on failure, stay on the form, preserve every entered value, expose no
stack trace or secret, and never redirect to `/thank-you`.

`/thank-you` **remains orphaned**, which is the correct state while success cannot be confirmed. It
exposes no enquiry data, and **no PII is placed in any URL or query parameter** — no mechanism that
could do so was created.

---

## 12. Booking

| | |
|---|---|
| Vendor | Calendly in code. **Never recorded as an approved selection** in `DECISION_LOG.md` |
| Config | `NEXT_PUBLIC_CALENDLY_URL` — **empty in `.env.example`.** The production host's value is **UNKNOWN** to this session and is not assumed either way |
| URL in use | `/schedule-call` falls back to the hard-coded **`https://calendly.com/mappedskills`**. **Whether that account exists and accepts bookings is UNVERIFIED** — it is an owner fact, and this session did not fabricate a verdict on it |
| Embed viability | The badge-vs-inline defect (§3.3) makes the current embed non-functional, and the badge API is prohibited by the 0-sticky budget regardless |
| Changed here | **Nothing.** No vendor switched, no availability fabricated, no scheduler simulated |

**The hard-coded default deserves the owner's attention**: `/schedule-call` currently sends every
visitor to a Calendly URL that no record in this repository confirms is real.

---

## 13. Booking conversion contract

`FORM_AND_BOOKING_SPEC.md` §3.1 capabilities 1 and 2, and `POST_SUBMISSION_AND_FOLLOWUP.md` §2, make
`meeting_booked` **server-side, from the booking webhook** — never from a client confirmation screen.

| | |
|---|---|
| Client-side booking event | **None implemented** |
| Server webhook | **Does not exist** |
| Server-confirmed booking | **NO** |
| Conversion-ready for H2 | **NO** |

**Only link navigation works today, and no booking conversion is claimed.** Clicking "Open the
booking page" is not a conversion and is not recorded as one.

---

## 14. Analytics boundary

**H2 was not started.** No `dataLayer`, `gtag` or `fbq` call was added anywhere.

The three pre-existing `window.gtag(...)` calls in `ContactForm.tsx` — including a
`contact_form_submit` fired on a submission that never happens — **were left in place.** Session
prompt §19 conditions their removal on it being *"necessary to establish clean server authority"*.
No server authority was established, so removing them would have been an isolated H2 edit
(`06_IMPLEMENTATION_SEQUENCE.md` gives *"remove the direct `window.gtag` path"* to **H2**) with none
of its replacement. They are recorded for H2, not repaired here.

**No PII entered analytics**, because no analytics code was written or altered. The two known
PII-leaking helpers in `lib/tracking.ts` remain **H2's deletions**; `lib/tracking.ts` is dead code —
imported by no component.

---

## 15. Contact test matrix — NOT EXECUTED, and why

**No implementation exists to test.** Running the 15-case matrix against the unchanged legacy form
would document a defect already documented in §3.1, not validate H1 work. It is therefore **not
run**, rather than run and reported as though it exercised H1.

What the matrix would find today is a single row, true of **every** case including malformed
payloads, oversized values and abuse payloads:

| Case | Server | UI | Redirect | PII leak | Analytics |
|---|---|---|---|---|---|
| All 15 cases, wherever client validation passes | **No request is made** | **False success after a 1s timer** | None — `/thank-you` unreachable | None to a server; **form values are pushed to `dataLayer` via `gtag`** where GTM is loaded | **`contact_form_submit` fires** — legacy, pre-existing |

**Analytics fired in H1: NO — nothing was added.** The row above is the pre-existing legacy path,
recorded honestly rather than omitted.

## 16. Booking test matrix — NOT EXECUTED

No booking integration was implemented. The configured-link path is Phase G's, already validated
there as link navigation only. **No booking conversion path exists to test**, and none is claimed.

## 17. Responsive, accessibility, no-JS, regression sweep — NOT RE-RUN, and why

**The code delta in this session is zero bytes.** `/contact`, `/schedule-call` and `/thank-you`
render byte-identically to the Phase G validated HEAD, so there is **no regression surface** and no
responsive, accessibility or no-JS property can have changed. Re-running the 390/860/1425 sweep, the
360–1081 contact widths, the homepage and the Phase F/G spot-checks would re-verify Phase G, not
verify H1. **They are recorded as not re-run rather than reported as passes.**

Two properties do carry forward as **known and unchanged**:

- **Accessibility.** The legacy form's error handling does not meet the Gate 6 §7 bar — no error
  summary, no live region, no focus management on failed submit, no `aria-describedby` association.
  **H1's form rewrite owns all of it.** Labels are present and are not placeholder-only.
- **No-JS.** All three pages are fully readable without JavaScript — Phase G's own acceptance. The
  contact form **does not submit without JavaScript**, because it has no `action` and no `method`
  and no server target. It never has. **This is stated, not glossed:** the progressive-enhancement
  contract for submission is unmet, and it lands with the endpoint.

---

## 18. Builds — VERIFIED FACT, both run this session

| Build | Result |
|---|---|
| `npm run build` | **Succeeds.** 26 route entries |
| `npm run build:cpanel` | **Succeeds** under the unchanged `--max-old-space-size=512` ceiling |

**Route delta: 0. Dynamic/static delta: 0.** Every route remains `○ Static` or `● SSG`. **Zero API
routes and zero dynamic routes exist** — the direct consequence of §7.

Warnings, both pre-existing and unrelated to H1: a Next workspace-root inference warning from
multiple lockfiles (`pnpm-lock.yaml` beside `package-lock.json`), and
`[contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN` — the documented fail-soft
path. `next-env.d.ts` was rewritten by the production build and **restored**; the tree is clean.

---

## 19. Carried forward, not fixed

### 19.1 Phase I — SEO / structured-data blocker
`app/layout.tsx` emits `Organization` and `LocalBusiness` sitewide from `lib/schema.ts`, carrying
owner-blocked facts and a **`postalCode` containing the word "India"**. **`app/layout.tsx` was not
edited.** Phase I owns it.

### 19.2 Shared footer debts
F10 double close · footer ROI language · footer SEO/CRO language · footer heading jump · footer
"free strategy call" wording · footer second ask on `/thank-you`. **Header and Footer were not
edited.**

### 19.3 Additional findings recorded by this session
- `BlogNewsletterForm.tsx` shows a false success with no network call (§3.2).
- `/schedule-call` sends visitors to an **unverified hard-coded Calendly URL** (§12).
- `lib/tracking.ts` is dead code containing two PII-leaking helpers — **H2's deletions.**

---

## 20. Rollback boundary

**No rollback is required. No commit changes any production behaviour.** This session's only commit
adds this document under `docs/`. Reverting it removes a record and nothing else. The site at
`71e277c` and the site after this commit are byte-identical in every shipped artefact.

---

## 21. Handoff

**Phase H2 must not start.** Both ★ conversion events (`lead_form_submitted`, `meeting_booked`) are
**server-only by definition**, and no server confirms anything. H2 remains strictly downstream.

**Continuation once inputs 1–3 (§4.2) are supplied:** re-run **Session 30 / Phase H1 unchanged**. The
audit above is complete and the architecture is fully specified by Gate 6; what is missing is a
destination, not a design. In implementation order: route handler → persist-first → the 4+3 field
contract with full Gate 6 accessibility → abuse layers 1–4 and 6 → idempotency and dedup → async
notification and acknowledgement → `/thank-you` wired → booking vendor and webhook.

**If input 1 (persistence) arrives alone, H1 can substantially proceed**: persistence is the only
input the success contract depends on. Notification is a step-4 asynchronous integration whose
failure, by `POST_SUBMISSION_AND_FOLLOWUP.md` §0, *"never fails the visitor's submission"*.
