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

---
---

# SESSION 31 — H1 CONTINUATION — DURABLE ENQUIRY PERSISTENCE

**Session:** 31 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `2abc6c5a0bc5b67aafdd93bba88cb9841c756c11` — *docs: record Phase H1 forms and booking audit and blocker*
**Result:** **CONTACT ENQUIRY FLOW — IMPLEMENTED. Persistence code complete, tested against a
simulated database, and NOT YET VERIFIED AGAINST A REAL MariaDB SERVER — see §31.3, which is the
one thing standing between this and an unqualified H1 pass.**

Session 30's blocking input 1 — durable persistence — has been supplied by the owner. Inputs 2
(transactional email) and 3 (booking vendor) have not, and both remain open. Per §44 of this
session's brief the three are **not** collapsed into one all-or-nothing result.

---

## 31.0 What changed, stated first

The false-success defect is **gone**. `ContactForm.tsx` no longer contains the

```
await new Promise((resolve) => setTimeout(resolve, 1000));
setIsSuccess(true);
```

path that Session 30 §3.1 recorded. In its place:

```
POST /api/enquiry  →  validate  →  screen  →  INSERT into MariaDB  →  201  →  /thank-you
                                                    │
                                                    └─ any failure → 503 → stay on /contact,
                                                       values preserved, "not sent" stated plainly
```

**There is no code path left in which a visitor is shown success without a row existing.** That was
verified live: with no database configured, a fully valid submission returns **503** and the form
says the enquiry was not sent (§31.20).

---

## 31.1 Starting state — VERIFIED FACT

| Item | Observed |
|---|---|
| Branch | `test_branch` |
| HEAD | `2abc6c5` |
| `origin/test_branch` | `4780d4b` — local ahead; **nothing pushed** |
| Working tree | Clean except untracked `README.md` |
| `README.md` | Untouched, unstaged, uncommitted — and still so at session end |

---

## 31.2 Database configuration — NAMES ONLY

**No value of any kind was read, written, guessed, logged or recorded. No `.env` or `.env.local`
exists in the working tree; only `.env.example` is tracked, and the values added to it are empty.**

**Repository audit first, as required.** A repository-wide search for `mariadb|mysql|DB_HOST|DB_NAME|
DB_USER|DB_PASS|DATABASE_URL` across all source, config and documentation returned **zero matches**.
No naming convention existed to inherit. The smallest safe configuration consistent with the project
was therefore adopted:

| Variable | Role | Required |
|---|---|---|
| `DB_HOST` | Host — `localhost` on the production server | **Yes** |
| `DB_USER` | Database user | **Yes** |
| `DB_PASSWORD` | Password | **Yes** |
| `DB_NAME` | Schema/database name | **Yes** |
| `DB_PORT` | Port — **optional**, defaults to `3306` | No |

Four required values, matching the four the owner reports are available server-side. **None is
prefixed `NEXT_PUBLIC_`**, and `.env.example` states explicitly why that prefix would publish the
password to every visitor.

**Leak check — VERIFIED FACT.** After a production build, `.next/static/**` contains **no
occurrence** of `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` or `mysql2`. The only build artefact
referencing them is `.next/server/app/api/enquiry/route.js`, which is correct.

---

## 31.3 Connectivity — THE ONE UNVERIFIED ITEM, STATED PLAINLY

**A live connection to the production MariaDB was NOT established by this session, and no claim is
made that one was.**

| Check | Result |
|---|---|
| Reachable MariaDB/MySQL on this workstation | **No.** `127.0.0.1:3306` closed |
| `mysql` / `mariadb` client installed | **No** |
| Docker / Podman / Colima / Homebrew available to start one | **No** |
| `DB_*` variables present in this environment | **No** — none set |

The database is at **`localhost` on the production host**, which is by definition unreachable from a
development workstation. This session could not connect to it, and could not stand up a local
substitute.

**What was therefore built instead of asserted:** `scripts/db-migrate.cjs --verify`, a connectivity
check the owner runs **on the server**, which establishes exactly the three things §4 of the brief
asks for and prints no secret:

```bash
npm run db:verify
```

Its configuration-missing path was executed here and behaves correctly, reporting only variable
**names**:

```
FAIL — database configuration incomplete.
Missing environment variable(s): DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
This script never prints or requests a value; only names are shown.
```

**Consequence, stated honestly:** everything downstream of a live connection — that MariaDB accepts
this DDL, that the unique index enforces idempotency in the real engine, that a real row is written
and retrievable — is **verified in simulation only** (§31.18). The application logic, the SQL, the
parameter binding and the entire request path are exercised against a recording fake that reproduces
the driver's contract including its `ER_DUP_ENTRY` error. **That is not the same as a real server,
and it is not reported as one.**

---

## 31.4 Client library and connection strategy

| | |
|---|---|
| **Driver** | `mysql2` ^3.24.3 — added; **10 packages total** including transitive |
| **Why** | The standard MariaDB/MySQL driver for Node, **pure JavaScript with no native compilation**, which matters on cPanel/CloudLinux where a build toolchain may not exist |
| **What was NOT added** | Prisma · Drizzle · Sequelize · TypeORM · Supabase · any ORM or platform SDK. This site needs durable enquiry persistence, not a data framework |
| **Pool** | Lazy singleton, `connectionLimit: 4`, `queueLimit: 20`, `connectTimeout: 10s`, keep-alive on |
| **Created** | On **first use**, never at module load — so `next build` never opens a socket and never needs credentials present |
| **Cached** | On `globalThis`, so dev HMR and repeated invocations reuse one pool instead of leaking one per compile |
| **`multipleStatements`** | **`false`** — the setting that stops an escaping mistake from becoming a second executable statement |
| **Client-side DB access** | **None, and structurally prevented.** `lib/db.ts` throws if evaluated in a browser |

`connectionLimit: 4` is deliberate: one low-traffic enquiry form on a shared host under a 512 MB
ceiling, not an application server.

---

## 31.5 Schema

**One table, `enquiries`.** Defined as reviewable SQL in `db/migrations/001_create_enquiries.sql` —
**not** as a string inside application code.

| Column | Type | Note |
|---|---|---|
| `id` | `BIGINT UNSIGNED AUTO_INCREMENT` | Primary key. **Never exposed to the visitor** |
| `idempotency_key` | `CHAR(36)` | **`UNIQUE`** — the durable duplicate guarantee |
| `created_at` / `updated_at` | `DATETIME(3)` | |
| `name` · `email` · `company` · `message` | `VARCHAR(120)` · `VARCHAR(254)` · `VARCHAR(160)` · `TEXT` | The four required fields |
| `phone` · `website` | `VARCHAR(40)` · `VARCHAR(512)` | Optional, nullable |
| `source_page` | `VARCHAR(255)` | Same-origin path only. Carries the service/problem context that `FORM_AND_BOOKING_SPEC.md` §1.3 derives instead of asking |
| `marketing_consent` · `marketing_consent_text` · `marketing_consent_at` | `TINYINT(1)` · `VARCHAR(255)` · `DATETIME(3)` | Reconstructs *what* was agreed to and *when* |
| `screening` | `ENUM('clean','suspect')` | What the abuse layers actually determined |
| `notification_status` | `ENUM('unconfigured','pending','sent','failed')` | Defaults to `unconfigured` and stays there |

**Indexes:** `PRIMARY (id)` · `UNIQUE uq_enquiry_idempotency (idempotency_key)` ·
`idx_enquiry_created_at` · `idx_enquiry_email_created (email(191), created_at)`.
The 191-character prefix keeps the index inside the 767-byte limit of the older COMPACT row format
still found on shared MariaDB hosts. `ENGINE=InnoDB`, `utf8mb4` / `utf8mb4_unicode_ci`.

### 31.5.1 What is deliberately NOT in the schema

- **NO BUDGET COLUMN** — `FORM_AND_BOOKING_SPEC.md` §1.4.
- **NO `qualification_status`.** Four of the five WQE conditions are evaluable server-side today.
  Condition 5 — no open enquiry from the same email within the deduplication window — rests on a
  window that `QUALIFIED_ENQUIRY_DEFINITION.md` §10 decision 1 leaves **deliberately unset**. A
  column asserting `qualified` while one of its five conditions had never been evaluated would be a
  **fabricated verdict**. It is not created. `screening` records only what was actually determined.
- **NO IP ADDRESS, NO USER AGENT, NO FINGERPRINT** — §31.17.
- **No scoring engine, no CRM mirror, no marketing-automation tables, no analytics tables, no
  revenue fields.**

---

## 31.6 Migration mechanism

```bash
npm run db:verify    # connectivity only, no writes
npm run db:status    # list migrations and their state
npm run db:migrate   # apply anything unapplied
```

| Property | How it is achieved |
|---|---|
| **Idempotent** | A `schema_migrations` ledger (version + SHA-256 + timestamp) records what has run. A second invocation applies nothing. **Safe to wire into every deploy** |
| **Never destructive** | The script issues no `DROP`, `TRUNCATE` or `DELETE`, and **refuses to apply a migration file containing one** |
| **Never recreates** | `001` is `CREATE TABLE IF NOT EXISTS` |
| **Explicit and reviewable** | Every change is a new numbered `.sql` file read in review as SQL. **Editing an already-applied file is detected by checksum and refused** — that is precisely the change that silently applies to fresh installs only and lets environments drift apart |
| **Not in the request path** | **No page render and no route handler runs DDL.** `lib/enquiries.ts` contains no DDL at all |
| **Transactional** | The ledger row is written in the same transaction as the change |

**Deployment step, and it is a real one:** `npm run db:migrate` must run once on the server before
the form can store anything. Until it does, a submission returns an honest 503 — it does not
silently fail, and it does not fake success.

---

## 31.7 Contact field contract — Gate 6, now implemented

| Required (4) | Rendered | `aria-required` | `autocomplete` |
|---|---|---|---|
| Name | "Your name (required)" | ✅ | `name` |
| Work email | "Work email (required)" | ✅ | `email` |
| Company | "Company (required)" | ✅ | `organization` |
| What you're trying to fix | textarea (required) | ✅ | — |

| Optional (3) | Rendered |
|---|---|
| Phone / WhatsApp | "(optional)", `autocomplete="tel"`, `inputmode="tel"` |
| Website | "(optional)", `autocomplete="url"` |
| Marketing consent | Separate, **unticked**, never a condition of submitting |

**BUDGET FIELD: REMOVED.** **VERIFIED FACT** — the string "budget" does not appear in the rendered
`/contact` document, and the form contains **zero `<select>` elements**.

**Also removed:** the required phone (now optional, per §1.2) and the service-interest select (now
derived from the converting page, per §1.3). **Nothing replaced any of the three** — §1.4 equally
rules out job title, company size, revenue, timeframe and "how did you hear about us".

---

## 31.8 Server architecture

| | |
|---|---|
| **Endpoint** | `POST /api/enquiry` — `app/api/enquiry/route.ts` |
| **Runtime** | `nodejs`, `dynamic = 'force-dynamic'` |
| **Methods** | POST only. GET/PUT/PATCH/DELETE return **405 with `Allow: POST`** and never touch the pool |
| **cPanel compatibility** | `server.cjs` delegates to Next's own `getRequestHandler()`, which serves route handlers unchanged. Pure-JS driver, small pool, no native build |
| **Server actions** | None added |

---

## 31.9 Validation — server-authoritative

Applied on the server, from scratch, on values parsed from the raw body. Client checks are a
convenience and are never trusted.

| Check | Behaviour |
|---|---|
| Required present | `name`, `email`, `company`, `message` — **whitespace-only is empty** |
| Email | Syntactic. **No domain blocking, no free-mail rejection, no MX lookup** — `QUALIFIED_ENQUIRY_DEFINITION.md` §3 is deliberately permissive and §2B fails open |
| Lengths | 120 / 254 / 160 / 5000 / 40 / 512 |
| Payload size | **16 KB**, checked on the declared `Content-Length` *and* on the actual body |
| Content type | Non-JSON → **415** |
| Shape | Array, `null`, bare string or invalid JSON → **400** |
| Non-string values | A non-string where a string is expected is **not coerced** — it fails |
| Non-boolean consent | → **400** |
| Idempotency key | Must be a UUID → **400** otherwise |
| Control characters | Stripped from single-line fields; **newlines and tabs preserved in the message**, because a textarea's line breaks are meaningful |

**Minimum message length is NOT set.** `QUALIFIED_ENQUIRY_DEFINITION.md` §10 decision 1 makes it an
open calibration parameter. A non-empty message is required; **a number invented here would be
invented precision.** Recorded as still-open.

---

## 31.10 Abuse protection

| Layer (`FORM_AND_BOOKING_SPEC.md` §8) | Status |
|---|---|
| 1 **Honeypot** | **Implemented.** Hidden from sighted users *and* assistive technology (`aria-hidden`, `tabindex="-1"`, off-screen — **not** `display:none`) |
| 2 **Timing** | **Implemented.** Client-reported elapsed time; under 2000 ms is flagged |
| 3 **Server validation** | **Implemented** — §31.9 |
| 4 **Rate limiting** | **Implemented.** In-process, 8/10 min per address and 5/10 min per email |
| 5 Disposable-domain check | **Not implemented.** Routes to Review Required by spec, and no review workflow exists yet |
| 6 Message heuristics | **Not implemented** |
| 7 Duplicate detection | **See §31.12** — idempotency yes, business duplicate no |
| 9 **CAPTCHA** | **NOT IMPLEMENTED, and correctly so.** §8 deploys it only *after* launch if layers 1–8 prove insufficient. **No CAPTCHA provider or key was added or requested** |

**Layers 1 and 2 FLAG; they never reject.** A password manager can fill a hidden input and a
returning visitor pasting prepared text can be genuinely fast. `QUALIFIED_ENQUIRY_DEFINITION.md` §7A
is explicit that uncertain is not spam and that wrongly discarding a real buyer costs far more than a
human glance. **A flagged submission is stored exactly like any other, and the visitor sees the
identical success state** — per `FORM_AND_BOOKING_SPEC.md` §2, detection is never revealed.

**Rate limiting — its weaknesses, stated rather than glossed.** In-process fixed-window counters:
**reset by every restart** (Passenger recycles on idle and deploy), **not shared** across processes,
and dependent on a **proxy header a direct client can forge**. It is a speed bump against casual
abuse, not a security control. **The durable protection against the thing that actually matters —
duplicate rows — is the database's unique index, not this.** No IP address is ever stored: keys are
salted SHA-256 digests held only in memory, and the salt is regenerated per process.

---

## 31.11 Idempotency

| | |
|---|---|
| **Mechanism** | Client generates one UUID per enquiry attempt (`crypto.randomUUID`, with a fallback for older Safari) and **reuses it across every retry** |
| **DB enforcement** | `UNIQUE KEY uq_enquiry_idempotency`. A second write raises `ER_DUP_ENTRY`, which the route treats as **success** — the row already exists, so reporting failure would be false |
| **Client guard** | A **synchronous ref**, not React state. A state check is stale within the tick that sets it: three rapid submits were **observed sending three requests** before this was corrected, and **one** afterwards (§31.19) |
| **Result** | Double-click, browser retry, network retry and "try again" after a failure all carry the same key → **one row** |

`uq_enquiry_idempotency` is the only non-primary unique constraint and the primary key is
auto-increment, so a 1062 at this insert can only mean an idempotency replay.

---

## 31.12 Business duplicate handling — NOT IMPLEMENTED, and not claimed

**Idempotency and business duplication are different things and are not conflated here.**

| | |
|---|---|
| **Request idempotency** | **IMPLEMENTED** — §31.11 |
| **Business duplicate (WQE condition 5)** | **NOT IMPLEMENTED** |
| **Definition available?** | **No.** `QUALIFIED_ENQUIRY_DEFINITION.md` §2 condition 5 requires "no existing open enquiry from the same email within the deduplication window", and §10 decision 1 leaves **the window deliberately unset** — setting it with zero real submissions would be invented precision |
| **Status** | **DEFERRED — manual.** `idx_enquiry_email_created` exists so the query is cheap when a window is chosen |

**A second genuine enquiry from the same person or company is NOT treated as a duplicate**, and must
not be: that would block legitimate future enquiries.

---

## 31.13 Persistence contract

| | |
|---|---|
| **Insert before success** | **Yes.** The 201 is returned only after the driver acknowledges the write |
| **Transaction** | **None, deliberately.** A single-row INSERT is already atomic in InnoDB; a BEGIN/COMMIT around one statement would add a round trip and hold a connection without changing the guarantee. The migration script *does* use one, where it is genuinely needed |
| **On failure** | **503**, no redirect, values preserved, accessible message stating **nothing was saved** |
| **Fake success path** | **None. Removed.** |
| **SQL safety** | **Every value is a bound parameter.** The INSERT is a constant string with **12 `?` placeholders and zero string literals** — verified by assertion, not by eye. No concatenation, no interpolation, anywhere |

---

## 31.14 Email notification — UNRESOLVED, NON-BLOCKING

| | |
|---|---|
| **Provider** | **None.** No Resend, SendGrid, Postmark, Mailgun, SMTP or Gmail configuration was added, invented or requested |
| **Credential** | **None exists and none was fabricated** |
| **Library** | **None installed** |
| **Blocking contact persistence?** | **NO.** `POST_SUBMISSION_AND_FOLLOWUP.md` §0 makes notification a **step-4 asynchronous** integration that "never fails the visitor's submission". Step 4 currently has **no members**, and nothing in it can affect the visitor's result |
| **Stored state** | `notification_status = 'unconfigured'`. **Nothing reads it. No delivery is simulated or claimed** |

**EMAIL NOTIFICATION UNRESOLVED — NON-BLOCKING.** Choosing a provider, obtaining a credential and
verifying a sender identity remain **owner input 2** and are unchanged from Session 30 §4.2.

---

## 31.15 Booking — STILL BLOCKED

**Nothing about booking was changed, and nothing about it is claimed.**

| | |
|---|---|
| **Vendor confirmed** | **No.** Calendly is in the code and has **never been recorded as an approved selection** |
| **Real URL confirmed** | **No.** `/schedule-call` still falls back to the hard-coded `https://calendly.com/mappedskills`. **Whether that account exists and accepts bookings remains UNVERIFIED** — an owner fact this session did not fabricate a verdict on |
| **Server webhook** | **Does not exist** |
| **Changed this session** | **Nothing.** `app/(pages)/schedule-call/page.tsx` and `CalendlyEmbed.tsx` are byte-identical to `2abc6c5`. No vendor switched, no availability fabricated, no scheduler simulated, no URL guessed, no webhook secret invented |
| **Booking conversion** | **Not implemented, and not claimed** |

**BOOKING — BLOCKED, OWNER DECISION REQUIRED.** It did **not** block contact persistence, which is
why the two results are reported separately.

**Still deserving the owner's attention:** `/schedule-call` sends every visitor to a Calendly URL
that no record in this repository confirms is real. §26 of the brief forbids redesigning the route,
so the least-misleading available treatment — Phase G's plain outbound link, unchanged — stands, and
the defect is recorded here rather than silently accepted.

---

## 31.16 Success and failure UX

**Success** — server-confirmed only, then `router.push('/thank-you')`. `/thank-you` is now **wired**
and no longer orphaned. **No PII in the URL, no query parameters, no `localStorage`, no analytics,
and no record id in the response body** — it is exactly `{"ok":true}` with `Cache-Control: no-store`.

**Failure** — stays on `/contact`, every value preserved, an accessible summary that takes focus.
Handled: validation failure · DB unavailable · insert failure · rate limit · malformed payload ·
oversized payload · network failure. Every message says the same load-bearing thing: **nothing was
saved**.

**One gap, stated rather than papered over.** `POST_SUBMISSION_AND_FOLLOWUP.md` §4 asks for a
**fallback contact route** on a persistence failure. **None is offered**, because the published phone
number and email address are **owner-blocked** and Phase G correctly renders them nowhere. Inventing
one would be worse than the gap — a failing form that then sends people to an address nobody has
confirmed is monitored. **Owner dependency, recorded.**

---

## 31.17 PII treatment

| Surface | Result |
|---|---|
| **Analytics** | **Zero.** No `dataLayer`, no `gtag`, no `fbq` anywhere in the changed code. The three legacy `window.gtag` calls in `ContactForm.tsx` are **deleted** — they were the false-success path's only observable effect |
| **URL / query string** | **Zero.** Success is a plain navigation to `/thank-you` |
| **Server logs** | **Categories only.** Driver *messages* are never logged — they routinely embed the database user and host — only the driver's error **code**. Observed live: `[enquiry] persistence unavailable: configuration incomplete { missing: 'DB_HOST,DB_USER,DB_PASSWORD,DB_NAME' }` — **names, no values, no PII** |
| **Browser console** | **Nothing logged.** The legacy `console.error('[v0] Form submission error:', error)` is gone |
| **Client bundle** | **No DB variable name, no driver, no legacy event name** — verified against `.next/static/**` |
| **Stored** | Only what services the enquiry. **No IP, no user agent, no fingerprint** |
| **Response bodies** | No SQL, no table name, no stack trace, no connection detail, no driver code |

---

## 31.18 Database test matrix — 30 cases, all passing

Executed against the **real compiled route handler, real validation module and real INSERT SQL**,
with a recording fake pool injected through the `globalThis` slot `lib/db.ts` already uses for HMR.
**No production code was altered to make this testable.** The fake reproduces the driver's contract
including `ER_DUP_ENTRY`, `ECONNREFUSED` and `ER_NO_SUCH_TABLE`.

**It does NOT establish that a real MariaDB accepts the DDL or the INSERT — see §31.3.**

| Case | Expected | Actual | Row created | Result |
|---|---|---|---|---|
| D1 Connectivity: open, select db, query | ok + db name | `ok, database=…` | 0 | **PASS** |
| D1b Connectivity failure | code only, no message | `connection_failed`, driver message suppressed | 0 | **PASS** |
| D2 Valid insert | 201 | `201 {ok:true}` | **1** | **PASS** |
| D3 Missing required field | 400, no row | `400 validation (company)` | 0 | **PASS** |
| D4 Malformed email | 400, no row | `400 validation (email)` | 0 | **PASS** |
| D5 Whitespace-only fields | 400, no row | `400 validation (name,message)` | 0 | **PASS** |
| D6 Oversized field | 400, no row | `400 validation (name)` | 0 | **PASS** |
| D7 Oversized payload | 413, no row | `413 too_large` | 0 | **PASS** |
| D8 Declared length over cap | 413 before reading body | `413 too_large` | 0 | **PASS** |
| D9 Unexpected shapes ×6 | 400 each | `400` for array, null, string, bad JSON, object-valued field, non-boolean consent | 0 | **PASS** |
| D10 Wrong content type | 415, no row | `415` | 0 | **PASS** |
| D11 **DB unavailable** | 503, **no fake success** | `503 unavailable`, no driver detail | **0** | **PASS** |
| D12 **Insert failure** | 503, **no fake success** | `503`, no table name leaked | **0** | **PASS** |
| D13 **Duplicate idempotency key** | success, **one row** | `201` both times | **1** | **PASS** |
| D14 **Repeated submit ×5, same key** | **one row** | `5 × 201` | **1** | **PASS** |
| D15 **SQL-injection strings** | stored as data | 12 placeholders, **0 literals in SQL**, payload bound as parameter | 1 | **PASS** |
| D16 Unicode / emoji / quotes / newline | preserved verbatim | round-tripped exactly | 1 | **PASS** |
| D17 Optional fields absent | `NULL`, not `''` | phone/website/consent `NULL`, flag `0` | 1 | **PASS** |
| D18 Optional fields present | normalised | `acme-industrial.com` → `https://acme-industrial.com/`; consent text + timestamp stored | 1 | **PASS** |
| D19 **Honeypot tripped** | **same success state**, flagged | `201 {ok:true}` identical to clean; `screening=suspect` | **1** | **PASS** |
| D20 Implausibly fast | flagged, **never rejected** | `201`, `screening=suspect` | 1 | **PASS** |
| D21 Rate limit per address | 8 then refuse | 8 accepted, 4 × 429 | 8 | **PASS** |
| D22 Rate limit per email | 5 then refuse | 5 accepted, 3 × 429 | 5 | **PASS** |
| D23 GET | 405, pool untouched | `405 Allow: POST`, 0 statements | 0 | **PASS** |
| D24 Success body | no PII, no id | `{"ok":true}`, `no-store` | 1 | **PASS** |
| D25 `sourcePage` | path only | URL / protocol-relative / query / relative all dropped to `NULL` | 5 | **PASS** |
| D26 Malformed idempotency key ×4 | 400 | `400 malformed` | 0 | **PASS** |
| D27 Ordering | validate **before** any DB contact | 0 statements issued | 0 | **PASS** |
| D28 mysql2 escaper (real library) | payload becomes one literal | `'\'); DROP TABLE enquiries; --'`, round-trips | 0 | **PASS** |
| D29 Message minimum length | not invented | 1-char message accepted | 0 | **PASS** |

**30 cases, 30 passed, 0 failed.** No destructive test was run against any real data, because no
real database was reachable.

---

## 31.19 Contact user-flow tests — live server

Run against `node server.cjs` serving the **production build**, with **no database configured** —
which is itself the most important test in the phase.

| Case | Server | UI | Redirect | Row | Result |
|---|---|---|---|---|---|
| Valid submission, DB absent | **503** | "Your enquiry was not sent." + "Nothing you typed has been lost" | **None** | **None** | **PASS — no fake success** |
| Empty submit | not reached | 4 field errors, summary takes focus | None | None | **PASS** |
| Invalid email + empty required | **400 validation** | field errors, wording identical to server's | None | None | **PASS** |
| Wrong content type | **415** | — | — | None | **PASS** |
| Malformed JSON | **400 malformed** | — | — | None | **PASS** |
| GET the endpoint | **405 `Allow: POST`** | — | — | None | **PASS** |
| **Three rapid submits** | 1 request | pending state throughout | None | — | **PASS — one request, one key** |
| Values after failure | — | name, email, company, phone and **both message lines** intact | None | None | **PASS** |
| Pending state | — | button disabled, "Sending…", live region "Sending your enquiry." | — | — | **PASS** |
| Focus after failure | — | summary focused, `role="alert"` | — | — | **PASS** |

**The success → `/thank-you` navigation was NOT exercised by a live browser click**, because
producing a 201 requires a database this workstation cannot reach. It is verified at the route level
(D2, D13, D14) and by code inspection: `router.push('/thank-you')` is inside `if (response.ok)` and
is the only branch that leaves the form.

**Defect found and fixed during testing.** Three rapid submits initially sent **three** requests: the
`if (isSubmitting) return` guard read React state, which is stale within the tick that sets it. All
three carried the same idempotency key, so the database would still have produced one row — but the
requests were wasteful and consumed the rate limit. Replaced with a synchronous ref; re-tested at
**one request**. A second bug in the same fix — `finally` reopening the guard during the success
navigation — was caught and corrected before it shipped.

---

## 31.20 Accessibility — measured in the rendered DOM

| Requirement | Result |
|---|---|
| One `<h1>` | **1** |
| Labels programmatically associated | **All 7 controls.** Placeholder is never the only label — **there are no placeholders at all** |
| Required conveyed in **text** | **"(required)" / "(optional)" in words**, not colour or an asterisk alone |
| `aria-required` | Set on all four required fields |
| `aria-invalid` | Toggles per field; all four observed `true` after a failed submit |
| Errors associated | `aria-describedby` carries **hint *and* error** for every field |
| Live region | Summary is `role="alert"` + `aria-live="assertive"`; status is `aria-live="polite"` |
| Focus on failed submit | **Summary receives focus** — verified `document.activeElement === summary` |
| Error summary links | Each entry is a real link to its field |
| Keyboard | Logical tab order; submit reachable; **honeypot absent from the tab order** |
| Visible focus | Accent border + ring on `:focus-visible` — confirmed visually |
| Pending state | Announced, not only shown |
| Touch targets | Inputs **44 px**, submit **48 px**, consent label **354 × 54 px** |
| Colour-only error | **No** — every error has text |
| Hints before entry | Present on every field, not only after an error |

---

## 31.21 Responsive — `/contact` at all eight required widths

| Width | Horizontal overflow | Input h | Submit h | Form width | Summary |
|---|---|---|---|---|---|
| 360 | **0** | 44 | 48 | 324 | renders, 129 px with 4 errors |
| 390 | **0** | 44 | 48 | 354 | renders |
| 760 | **0** | 44 | 48 | 712 | renders |
| 761 | **0** | 44 | 48 | 713 | renders |
| 860 | **0** | 44 | 48 | 720 | renders |
| 1080 | **0** | 44 | 48 | 720 | renders |
| 1081 | **0** | 44 | 48 | 720 | renders |
| 1425 | **0** | 44 | 48 | 720 | renders; footer joins cleanly |

Spot-checks: `/thank-you` and `/schedule-call` at **390** and **1425** — **0 overflow** at both.

---

## 31.22 No-JS — the honest position

| Property | Result |
|---|---|
| Page readable without JS | **Yes.** The complete form, every label, every hint and the privacy link are in the server-rendered HTML |
| Field purpose understandable | **Yes** — labels and hints are static markup |
| Fake success without JS | **None** |
| **Submission without JS** | **NO. It does not work, and no claim is made that it does** |

The form has **no `action` and no `method`** — verified in the raw server HTML. Submission requires
JavaScript.

**Why this was not "fixed" in H1.** Real progressive submission would require accepting
`application/x-www-form-urlencoded`, redirecting on success, and — to satisfy the frozen rule that
**all entered values survive a failure** — server-rendering the form's error state. That last part
would make `/contact` a **dynamic route**, regressing the static baseline every prior phase
established. That is an architecture decision with a performance cost, not an implementation detail,
and it is **not in H1's scope**. **Recorded as an open decision**, not quietly dropped.

---

## 31.23 Regression sweep

| Route | H1 | Header | Footer | Inline `gtag`/`dataLayer`/`fbq` | Overflow |
|---|---|---|---|---|---|
| `/` | 1 | ✅ | ✅ | none | 0 @390, 0 @1425 |
| `/services` | 1 | ✅ | ✅ | none | 0 |
| `/seo` | 1 | ✅ | ✅ | none | 0 |
| `/problems/traffic-but-no-enquiries` | 1 | ✅ | ✅ | none | 0 |
| `/faq` | 1 | ✅ | ✅ | none | 0 |
| `/contact` | 1 | ✅ | ✅ | none | 0 at all 8 widths |
| `/thank-you` | 1 | ✅ | ✅ | none | 0 |
| `/schedule-call` | 1 | ✅ | ✅ | none | 0 |

All ten checked routes return **200**. `/thank-you` retains `noindex, nofollow`. **Header and Footer
were not edited.** No unrelated visual regression observed.

**Not verified live:** `/blog/[slug]`, and therefore the newsletter card in situ — the route requires
Contentful credentials that are absent from this workstation, so no article prerenders. The
component change is verified by build and by inspection only, and is stated as such.

---

## 31.24 The second false-success defect — BlogNewsletterForm

Session 30 §3.2 recorded it. This session assessed it as required by §27 of the brief and found it
**an active misleading production behaviour**, because it is **rendered on every article**:

1. **False success.** No network call of any kind, then "Thanks! Check your email for confirmation."
   No list exists and no confirmation could ever arrive.
2. **PII into analytics.** It passed the submitted address to
   `window.gtag('event', 'newsletter_signup', { email })` — prohibited outright by
   `POST_SUBMISSION_AND_FOLLOWUP.md` §7 and `EVENT_TAXONOMY.md` §7 — on any page load where GTM is
   configured.

**Minimal defensive correction applied.** The input, the button, the fabricated success message and
the `gtag` call are removed; the card now states plainly that there is no mailing list yet, which is
true. With no state left it is **no longer a client component**.

**NO newsletter backend, provider, persistence, CRM or email-marketing infrastructure was created**,
and whether a newsletter exists at all remains an **owner decision** that this change does not
pre-empt.

---

## 31.25 H2 boundary — not crossed

| | |
|---|---|
| `dataLayer` | **None added.** None present in any changed file |
| `gtag` conversion | **None.** Three legacy calls **removed** from `ContactForm.tsx`, one from `BlogNewsletterForm.tsx` |
| `fbq` | **None** |
| Attribution persistence | **None.** No UTM capture, no first-touch storage, no referrer storage |
| PII in analytics | **None — and one live leak was removed** (§31.24) |
| Consent gate | **Not built.** H2's |
| `lib/tracking.ts` | **NOT deleted.** Confirmed dead — **zero call sites** repository-wide — but Session 30 §14 and `06_IMPLEMENTATION_SEQUENCE.md` assign both PII-leaking helpers to **H2**, and removing it changes no production behaviour. Deleting it would have been scope widening for no launch-risk reduction. **Recorded for H2** |

H1 leaves H2 exactly one thing to instrument: **a server-confirmed persistence success**.

---

## 31.26 Phase I boundary — not crossed

**Not touched, recorded only:** `Organization` / `LocalBusiness` sitewide schema · the malformed
`postalCode` containing the word "India" · `app/layout.tsx` · `lib/schema.ts` · robots · sitemap ·
www/apex redirect · cache headers · CSP · HSTS · canonical cleanup · `ignoreBuildErrors`.

**Shared chrome untouched.** `Header` and `Footer` are byte-identical to `2abc6c5`. The known footer
debts — F10 double close, ROI language, SEO/CRO language, heading jump, "free strategy call" wording,
and the **second ask that appears on `/thank-you`** (observed again this session) — are **unchanged
and remain Phase I's**.

---

## 31.27 Builds — VERIFIED FACT, both run

| Build | Result |
|---|---|
| `npm run build` | **Succeeds** |
| `npm run build:cpanel` | **Succeeds** under the unchanged `--max-old-space-size=512` ceiling |

| Metric | Before | After |
|---|---|---|
| Route entries | 26 | **27** |
| API routes | 0 | **1** |
| Dynamic (ƒ) routes | 0 | **1** |
| Static/SSG routes | 26 | **26 — unchanged** |
| Dependencies | — | **+1 direct (`mysql2`), 10 packages incl. transitive** |

**The one dynamic-route change, explained:** `ƒ /api/enquiry` is the enquiry endpoint. It is
`force-dynamic` because a handler that writes to a database must never be prerendered or cached.
**Every page route is unchanged** — `/contact`, `/thank-you` and `/schedule-call` all remain `○
Static`, so the Phase G performance baseline is intact.

**Warnings — both pre-existing and unrelated to H1:** a Next workspace-root inference warning from
multiple lockfiles, and `[contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN`, the
documented fail-soft path. `next-env.d.ts` and `tsconfig.tsbuildinfo` were rewritten by the builds
and **restored**; the tree is clean.

**Type checking:** `tsc --noEmit` reports **10 errors, all pre-existing, all in files this session
did not touch** (`SocialShare.tsx`, `CategoryFilter.tsx`, `CalendlyButton.tsx`, `lib/metadata.ts`).
The count **fell from 18** because the removed `window.gtag` calls were themselves 8 of them.
**Zero new type errors.** `ignoreBuildErrors` remains on and remains Phase I's to remove.

---

## 31.28 Files changed

| File | Action | Purpose |
|---|---|---|
| `lib/db.ts` | **new** | Pool, config by name, connectivity check, no-secret logging |
| `lib/enquiries.ts` | **new** | The single parameterised INSERT; idempotency outcome |
| `lib/enquiry-validation.ts` | **new** | Server-authoritative validation; consent text version |
| `lib/rate-limit.ts` | **new** | Layer 4, in-memory, no address ever stored |
| `app/api/enquiry/route.ts` | **new** | `POST /api/enquiry` — persist-first, 405 for other methods |
| `db/migrations/001_create_enquiries.sql` | **new** | The schema, as reviewable SQL |
| `scripts/db-migrate.cjs` | **new** | Idempotent, non-destructive migration + `--verify` |
| `components/forms/ContactForm.tsx` | **rewritten** | 4+3 contract, no budget, accessible, server-confirmed success |
| `components/forms/BlogNewsletterForm.tsx` | **modified** | False success and PII-to-analytics removed |
| `app/(pages)/contact/page.tsx` | **comment only** | Stale H1 warning replaced. **No layout, copy or structure change** |
| `.env.example` | **modified** | Four DB variable **names**, empty. Notification honestly marked unresolved |
| `package.json` | **modified** | `mysql2` + three `db:*` scripts |
| `package-lock.json` | **modified** | Lockfile |
| `docs/.../18_PHASE_H1_FORMS_BOOKING.md` | **extended** | This record |

---

## 31.29 Rollback

| Layer | How |
|---|---|
| **Whole session** | `git revert` the single commit. `/contact` returns to the Session 30 form — which means returning to the false-success defect, so this is a last resort |
| **Endpoint only** | Delete `app/api/enquiry/`. The form then fails honestly on every submit; it never fakes success |
| **Schema** | `001` is additive and `IF NOT EXISTS`. Rolling back code does **not** require dropping the table, and the migration script will not drop it |
| **Dependency** | `mysql2` is imported only by `lib/db.ts` |
| **Data** | No destructive operation exists anywhere in this change |

---

## 31.30 Handoff

**Phase H1 contact flow: implemented, pending one live verification.**

### Owner action required, in order

1. **Run `npm run db:verify` on the production server.** Confirms the four variables reach the Node
   process and MariaDB answers. **This is the last unverified step in the contact flow.**
2. **Run `npm run db:migrate`.** Creates `enquiries` and the ledger. Idempotent; safe on every deploy.
3. **Submit one real test enquiry** and confirm the row exists, then confirm a double-submit produces
   exactly one row.
4. **Transactional email — owner input 2.** Provider, credential, verified sender. **Non-blocking.**
5. **Booking — owner input 3.** Vendor decision, real account URL, custom-field and webhook
   capability, signing secret. **Blocking for booking only.**

### Still open, and deliberately not invented here

- **Minimum message length** and the **deduplication window** — `QUALIFIED_ENQUIRY_DEFINITION.md` §10
  decision 1. Propose against real submissions after a baseline period.
- **`qualification_status`** — blocked on the window above.
- **Spam quarantine store** and **Review Required workflow** — no reviewer or cadence is defined.
- **Fallback contact route on failure** — blocked on the owner-blocked phone and email.
- **No-JS submission** — requires making `/contact` dynamic; an architecture decision (§31.22).
- **Retention policy** — a privacy and security decision requiring review, per §6/§7A.

**H2 must not start until step 1 above passes**, because its acceptance rests on a
server-confirmed persistence event that has not yet been observed against a real database.
