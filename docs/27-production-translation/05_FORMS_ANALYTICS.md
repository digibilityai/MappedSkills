# Session 21 — Forms, Conversion, Analytics and Technical SEO

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**
**Nothing implemented.** Gate 6 CRO architecture (`DEC-012`) and the Session 08 analytics
specification are the inputs; this document maps them onto the actual codebase and names the gaps.

---

## 1. Forms and conversion

### 1.1 Current state — verified, not inferred

| Item | State |
|---|---|
| `components/forms/ContactForm.tsx` | **Submits nowhere.** `await new Promise(r => setTimeout(r, 1000))`, then `setIsSuccess(true)` |
| `app/api/` | **Does not exist.** Zero route handlers, zero `'use server'` actions in the repository |
| `lib/tracking.ts` `submitContactForm()` | POSTs to `/api/contact` — **a route that does not exist**. Imported by **no component** |
| Field set | **8 fields, 5 required — name, email, phone, service, budget** |
| Abuse controls | **None.** No CAPTCHA, no honeypot, no timing check, no rate limit, no idempotency key |
| `components/forms/CalendlyEmbed.tsx` | Calls `Calendly.initBadgeWidget()` — the **badge** API — against an **inline** container. The container never fills |
| `/thank-you` | Exists, `noindex`, and is **orphaned** — nothing links to it or redirects to it |
| Consent | **None**, while GTM and Meta Pixel both load |

> **The most important requirement is not a field choice — it is that a backend must exist at all.**
> A visitor today completes the form, sees *"Thank You! We've received your enquiry"*, and
> **nothing is transmitted.** This is a live production defect independent of the redesign.

### 1.2 Required production architecture

**Field set — 4 required, 3 optional, and no budget field.**

| Required | Type | WQE condition it evaluates |
|---|---|---|
| **Name** | `text`, `autocomplete="name"` | 2 — reachable identity |
| **Work email** | `email`, `autocomplete="email"` | 2, 3 (domain type), dedup key |
| **Company** | `text`, `autocomplete="organization"` | 3 — business context |
| **What you're trying to fix** | `textarea` | 4 — stated need |

| Optional | Note |
|---|---|
| **Phone / WhatsApp** | Optional on the form, **required on the booking surface.** Volunteering it is recorded as a positive soft signal |
| **Website** | `autocomplete="url"`. Satisfies condition 3 independently |
| **Marketing consent** | Separate, **unticked**, **never bundled with submission** |

**Removed from production behaviour, deliberately and flagged as such: the budget field.** It is
the highest-friction field on the page, it collects an unverifiable self-reported number, and
`QUALIFIED_ENQUIRY_DEFINITION.md` §1 explains why it **cannot qualify anything**. Price bands
belong on `/pricing`, where the buyer self-selects before enquiring.

**Service / problem interest is not asked.** It is **derived from the page the visitor converted
on** — visible and editable where a page maps to more than one, silent where it maps to one.

**Behavioural requirements**

| Aspect | Requirement |
|---|---|
| Steps | **Single step.** Four required fields do not justify multi-step |
| Validation | On **blur** for format, on **submit** for completeness. **Never validate an untouched field** |
| Errors | Field-level and adjacent, describing **how to fix it**; a summary at the top on submit failure, **focus moved to the first error** |
| Value preservation | **All values survive any validation failure, server error or network failure.** Losing a typed message is the most severe recoverable defect this form can have |
| Double submission | Disabled control **plus a client-generated idempotency key enforced server-side** — a disabled button alone does not survive a double-tap or a retry |
| Network failure | Explicit failure state, values preserved, retry available. **Never a silent failure and never a false success** |
| Success | Shown **only after the server confirms durable persistence** |
| Spam | Suspected spam receives the **same success state**. Telling a bot it failed teaches it to adapt |
| Keyboard | Fully completable and submittable by keyboard alone |
| Privacy | A short statement adjacent to submit, linking `/privacy-policy`, **distinct** from the consent control |

**Server-side — the part that does not exist**

1. A **route handler** (`app/api/enquiry/route.ts`) or a server action. Both are available: this
   deploys as a **custom Node server**, not a static export.
2. **Persist first, always.** The enquiry is durably stored **before** notification, CRM sync or
   enrichment. A failure downstream must never lose an enquiry.
3. Evaluate the **five WQE conditions** and write **two independent statuses**:
   `qualification_status` ∈ {`qualified`,`unqualified`,`spam`,`review_required`} and
   `attribution_status` ∈ {`complete`,`partial`,`unavailable`}.
4. **Attribution completeness never reduces qualification.** Direct traffic, a missing referrer,
   privacy restrictions, blocked analytics or a storage failure must **never** downgrade a real
   enquiry.
5. Email handling **fails open** — DNS/MX verification is advisory, asynchronous, and a timeout
   passes condition 2 with an advisory flag. `review_required` is the safe landing state.
6. **Abuse screening:** honeypot · submission-timing plausibility · rate limits · link/abuse
   heuristics on the message. A **CAPTCHA is not required by the spec** and should be the last
   resort, not the first — it is an accessibility cost and the honeypot/timing pair carries most
   of the load at this volume.
7. Emit the **server-side** `lead_form_submitted` event on confirmed persistence.

**Booking.** No vendor is selected. The chosen system must accept **runtime hidden/custom fields
and persist them**, and must **expose a server-side webhook** — those two are what make a booking
measurable. If it cannot, **bookings remain a primary conversion surface** and are recorded with
`attribution_status = unavailable`; what is lost is channel measurement, not the conversion.

### 1.3 Gaps and dependencies

| Gap | Dependency |
|---|---|
| No backend of any kind | **None — buildable today.** Node server, route handlers available |
| No enquiry datastore | **Owner/infrastructure decision** — DB vs CRM-direct vs transactional email |
| No CRM | Owner decision. The join key is an **opaque `enquiry_id`, never an email** |
| Booking vendor unresolved | Owner decision against the 10 mandatory capabilities |
| Notification address | `.env.example` has `CONTACT_NOTIFICATION_EMAIL`; no sender is configured |
| `/thank-you` orphaned | Becomes the post-enquiry destination and the measurement endpoint |
| No consent mechanism | **Pre-launch blocker named by the site's own privacy policy** |

---

## 2. Analytics and measurement

### 2.1 Current state

Three parallel, uncoordinated event surfaces: `lib/gtm.tsx` (`dataLayer.push`), `lib/tracking.ts`
(12 helpers wrapping it), and `ContactForm.tsx` calling **`window.gtag` directly** — an API GTM
does not guarantee — and firing `contact_form_submit` **before** the simulated await. Vercel
Analytics runs in production. **No event fires from a server.**

**Two PII defects, verified in `lib/tracking.ts`:**
`createTrackableEmailLink` pushes a **raw email address** into `dataLayer`;
`createTrackablePhoneLink` pushes a digit-stripped phone number. Both violate
`EVENT_TAXONOMY.md` §7. **Both must be removed, not renamed.**

No event name in production matches the approved taxonomy (`contact_form_submit` vs
`lead_form_submitted`; `email_click` vs `email_clicked`).

### 2.2 Required event model

**★ = the two conversion events the business metric depends on. Both are server-only.**

| Event | Source |
|---|---|
| `primary_cta_clicked` · `lead_form_started` · `lead_form_validation_error` · `lead_form_abandoned` · `meeting_started` · `phone_clicked` · `email_clicked` · `proof_opened` · `research_opened` · `pricing_cta_clicked` | client |
| ★ **`lead_form_submitted`** — on **server-confirmed durable persistence** | **server** |
| ★ **`meeting_booked`** — on **booking webhook confirmation** | **server** |
| `meeting_rescheduled` · `meeting_cancelled` · `meeting_no_show` · `research_subscribed` | server |

> **Client-side conversion tracking is not evidence a conversion happened.** It fires
> inconsistently under ad blocking, can be triggered by a refresh, and — decisively — **would fire
> even when persistence failed.** Server-only ★ events are the direct fix for the current defect
> where a success screen shows while nothing is transmitted.

**Standard parameters:** `page_type` · `page_path` (**path only, never a URL with a query string**)
· `service` · `problem` · `content_cluster` · `cta_location` · `cta_role` · `conversion_surface` ·
`device_class` · `first_source/medium/campaign` · `latest_source/medium/campaign` · `landing_page`
· **`enquiry_id` — an opaque identifier, and the only join key to the CRM. Never an email.**

Naming is `snake_case`, `object_action`, past tense. **Event names are a contract — deprecate,
never rename.**

**Attribution.** Preserve first-touch and conversion-touch context where reliably available; carry
UTMs into the booking surface as hidden fields. Report qualified enquiries **broken down by
`attribution_status`**, so a rising `unavailable` share reads as *a measurement problem to fix* —
never as a quality problem, and never silently absorbed by moving enquiries out of the qualified
count.

**Revenue and ROI remain dependent on downstream client-supplied data. Do not invent revenue
attribution, and do not build a report that implies the website qualified on economics** — it
cannot, and any such report would be false.

**Consent.** GTM and Meta Pixel currently load unconditionally with no consent mechanism. Analytics
must be **consent-gated before launch**; a declined consent produces `attribution_status =
unavailable` and **must not** affect `qualification_status`.

### 2.3 Gaps

No server-side eventing · no consent gate · two live PII leaks · three competing event surfaces ·
no `enquiry_id` · no UTM capture or persistence · no dataLayer schema · no attribution storage ·
`/thank-you` orphaned so no conversion endpoint is reachable.

**Do not implement analytics before the backend exists.** Both ★ events are server-side by
definition, so analytics work is **downstream of Phase H's first half**, not parallel to it.

---

## 3. SEO and technical preservation

### 3.1 A — design-rollout dependencies (must be handled *with* the redesign)

| Item | Why |
|---|---|
| **Metadata rewrite per route** | The homepage title carries **`300%+ ROI`**, prohibited by `DEC-007`. The root layout still declares `generator: 'v0.app'` and a SaaS description contradicted by approved messaging |
| **`lib/metadata.ts` top-level `canonical`** | Not a field of Next's `Metadata` type — inert, and invisible only because `ignoreBuildErrors` is on. `alternates.canonical` already does the real work |
| **New routes into `sitemap.ts`** | `/ai-seo`, `/problems/*`, `/research`, `/research/*`, `/work/[slug]` |
| **`/work` out of the sitemap + `noindex`** | It renders **zero** case studies. An indexed empty hub against a premium price is an active harm |
| **Two new + one re-pointed redirect** | `/portfolio/:slug`→`/work/:slug`, `/portfolio`→`/work`, and `/results/:slug` re-pointed **directly** to `/work/:slug` so no chain is created |
| **Structured data per archetype** | `/seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` currently emit **no JSON-LD at all** |
| **Entity schema is BLOCKED** | The global `Organization`/`LocalBusiness` blocks carry a `postalCode` containing the word **"India"**. It **must not be carried forward and must not be treated as a partial answer** |
| **`/faq` schema** | Emits `FAQPage` for **one** Question against a larger on-page set. Rich-result eligibility must be re-verified |
| **`not-found.tsx`** | Hard-codes **three blog slugs that all 404**. Links must be generated from live routes |
| **Heading structure** | The `.lab`-as-real-heading + display-line-as-body pattern must survive translation. **0 heading-level jumps, exactly 1 `<h1>`** |
| **Skip link + `<main id="main">`** | Neither exists in `app/layout.tsx`; both are in the prototype |

### 3.2 B — existing technical debt (pre-dates the redesign; **must not be blamed on it**)

| Item | Severity | Note |
|---|---|---|
| **`Cache-Control: public, max-age=31536000, immutable` on `/:path*`** | **HIGH** | The intended override matches only `/:path*.(html|xml)`, which **cannot match App Router routes**. **RESEARCH REQUIRED:** whether Next's own response header wins at runtime was **not observed** and must be verified against a real response. If the custom header wins, returning visitors get the pre-redesign page for up to a year — a genuine launch hazard |
| **`robots.ts` disallows `GPTBot` and `CCBot`** | **HIGH** | Directly contradicts the programme's AEO/GEO/AI-visibility objective. A one-line change, but a **strategy decision the orchestrator must make**, not an implementation detail |
| **No consent mechanism** | **HIGH** | The site's own privacy policy names it as a pre-launch requirement |
| **No www/apex canonical redirect** | MEDIUM | Neither `next.config.mjs` nor `server.cjs` has one |
| **No CSP, no HSTS** | MEDIUM | Five other security headers are present |
| **`typescript.ignoreBuildErrors: true`** | MEDIUM | The build does not enforce the type checker |
| **`public.zip` — 4.1 MB at the repository root** | LOW | Not served, but committed |
| **`styles/globals.css` orphan · `lib/design-system.ts` second source of truth** | LOW | Both retired in Phase A |
| **Duplicate `public/robots.txt` beside `app/robots.ts`** | LOW | One must win; verify which |
| **Zero `loading.tsx` / `error.tsx`** | LOW | Contentful routes have no error boundary |
| **9 redirects emit 308, not 301** | LOW | Functionally equivalent for SEO; recorded, not changed |
| **`npm run lint` → `next lint`** | **RESEARCH REQUIRED** | Built-in lint support is removed in this Next major; no `eslint.config.*` exists |

### 3.3 C — later optimisation

`images.unoptimized: true` (irrelevant to the homepage — **zero images** — becomes relevant for
`/blog` and `/work`) · `/blog` has **no pagination** and Contentful is capped at 100 items ·
`blog[slug].dateModified` maps to any CMS republish and should be corrected · Vercel Analytics vs
GTM overlap · retiring `recharts`, `embla`, `vaul`, `cmdk`, `react-day-picker` and the ~45 unused
shadcn primitives · font subsetting beyond `latin`.

> **Rule: do not let §3.2 or §3.3 block the visual rollout.** The one genuine exception is the
> **caching rule** — if runtime verification shows the immutable header reaching document
> responses, it **must** be fixed before the redesign is deployed, or the redesign will not reach
> returning visitors.
