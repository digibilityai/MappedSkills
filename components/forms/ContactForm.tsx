'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { EVENTS, pageTypeOf, safePagePath, track, trackOnce } from '@/lib/analytics';
import { attributionForAnalytics, attributionForSubmission } from '@/lib/attribution';
import { markEnquiryConfirmed } from '@/lib/enquiry-confirmation';

/**
 * SESSION 31 — PHASE H1 — the enquiry form.
 *
 * WHAT THIS REPLACED, AND WHY THAT IS THE POINT OF THE PHASE.
 * The previous version of this file did this:
 *
 *     await new Promise((resolve) => setTimeout(resolve, 1000));
 *     setIsSuccess(true);
 *
 * There was no endpoint, no request and no record. It waited one second and
 * showed a success screen. Every enquiry it ever received was lost while the
 * visitor was told it had worked. `POST_SUBMISSION_AND_FOLLOWUP.md` §0 names a
 * false success as the one outcome that is "never acceptable", and deleting
 * that path is Phase H1's load-bearing acceptance condition. It is deleted, not
 * disabled: there is no longer any code path in this component that can show a
 * successful outcome without a 2xx from `POST /api/enquiry`, and that endpoint
 * returns 2xx only after MariaDB has acknowledged a durable row.
 *
 * THE FIELD CONTRACT IS THE FROZEN ONE — `FORM_AND_BOOKING_SPEC.md` §1, Gate 6
 * / DEC-011. Four required, three optional:
 *
 *   required   name · work email · company · what you're trying to fix
 *   optional   phone/WhatsApp · website · marketing consent
 *
 * THREE FIELDS ARE GONE, and each removal is specified rather than a preference:
 *   - BUDGET. `FORM_AND_BOOKING_SPEC.md` §1.4 removes it outright:
 *     unverifiable, the highest-friction control on the page, and
 *     `QUALIFIED_ENQUIRY_DEFINITION.md` §1 establishes it cannot qualify
 *     anything. Nothing replaces it — §1.4 also rules out job title, company
 *     size, revenue, timeframe and "how did you hear about us".
 *   - SERVICE INTEREST. §1.3 derives it from the converting page instead of
 *     asking; `sourcePage` below carries that context.
 *   - REQUIRED PHONE. §1.2 makes phone optional on the form and required on the
 *     booking surface. Requiring it costs completions and invites junk numbers.
 *
 * SESSION 32 — PHASE H2 — ANALYTICS, AND WHERE ITS AUTHORITY COMES FROM.
 *
 * The three `window.gtag(...)` calls that used to be here are gone and are not
 * coming back. One of them fired `contact_form_submit` on a submission that
 * never happened, which is the defect in miniature: an event that describes an
 * outcome the system never achieved. Their replacement is one event, and it is
 * derived from ONE FACT ONLY —
 *
 *     `POST /api/enquiry` RETURNED 2xx,
 *
 * which `app/api/enquiry/route.ts` does exclusively after MariaDB has
 * acknowledged a durable row. Read the submit handler below and there is exactly
 * one place `lead_form_submitted` can be emitted from: inside `if
 * (response.ok)`. It is unreachable from a click, from a submit attempt, from a
 * passing client validation, from a fetch that started, from a 4xx, from a 503,
 * from a network failure, and from a view of `/thank-you` — which is a separate
 * document this component has no code on.
 *
 * DELIVERY IS CLIENT-SIDE; AUTHORITY IS NOT. `05_FORMS_ANALYTICS.md` §2.2 asks
 * for this conversion to be DELIVERED by a server. It cannot be, today: server
 * delivery needs a configured provider endpoint and credential — a GA4
 * Measurement Protocol secret, a server-side container, a Meta CAPI token — and
 * NONE EXISTS. Inventing one is prohibited outright. So the server AUTHORS the
 * conversion and the browser only carries it, and the limitation that separation
 * leaves is stated rather than hidden: AN AD-BLOCKED OR OFFLINE VISITOR'S
 * CONVERSION IS NEVER DELIVERED TO ANY PLATFORM. It is not lost — the row is in
 * MariaDB either way, and the enquiries table, not an analytics property, is the
 * system of record for how many enquiries exist. Analytics is for channel and
 * behaviour, and it is known to undercount.
 *
 * NO PII, AND STRUCTURALLY SO. No event below is passed a form value. The
 * payloads carry a path, a page category, a field NAME, an error CATEGORY and
 * channel labels. Not the name, the email, the phone number, the company, the
 * website or one character of the message. The idempotency key is used as a
 * local de-duplication token inside `trackOnce` and is never put in a payload:
 * it is stored against the row, so it would be a database identifier resolvable
 * to a person.
 *
 * ANALYTICS CANNOT BREAK THIS FORM. `track` and `trackOnce` swallow their own
 * errors and return `void`, nothing is awaited, and the conversion call sits
 * before `router.push` in the same block rather than inside the request path.
 *
 * NO PROMISES. No response time, in hours, days, or as "shortly" or "soon". No
 * claim about what happens next, who reads it, or how secure the transmission
 * is. None of those has been measured or committed to, and this is the surface
 * where an unsupported promise would be least defensible.
 */

const REQUIRED_FIELDS = ['name', 'email', 'company', 'message'] as const;
type FieldName = 'name' | 'email' | 'company' | 'message' | 'phone' | 'website';

const FIELD_LABELS: Record<FieldName, string> = {
  name: 'Your name',
  email: 'Work email',
  company: 'Company',
  message: 'What you’re trying to fix',
  phone: 'Phone or WhatsApp',
  website: 'Website',
};

/**
 * C+ presentation copy (proto/direction-c-plus 0a8b611, CONTACT_PLAIN): the hint under each label, the three field
 * groups and the line above the send button. Labels, error messages, the consent text and the privacy line are
 * unchanged. No hint asks for anything the frozen field contract does not already collect. The phone hint keeps the
 * original meaning (a call), with WhatsApp as the other owner-confirmed reply channel (owner decision, 2026-10-14).
 */
const FIELD_HINTS: Record<FieldName, string> = {
  name: 'However you would like us to address you.',
  email: 'Where the reply goes.',
  company: 'One word is enough.',
  message: 'What’s happening now, in your own words. A few sentences is enough.',
  phone: 'Only if you would rather we called or replied on WhatsApp.',
  website: 'If you have one. It is usually the thing being discussed.',
};

const FIELD_GROUPS = { you: 'About you', what: 'What’s happening', optional: 'Optional' };

/** Owner-confirmed follow-up channels (DEC-051). No response time is stated, here or anywhere on the form. */
const REPLY_LINE = 'We’ll reply by email or WhatsApp.';

/**
 * Word-for-word the server's messages in `lib/enquiry-validation.ts`. Kept
 * identical on purpose: a visitor who fails the same check twice — once locally
 * and once on the server — must not be shown two different explanations of the
 * same problem.
 */
const REQUIRED_MESSAGES: Record<(typeof REQUIRED_FIELDS)[number], string> = {
  name: 'Enter the name we should use when we reply.',
  email: 'Enter an email address so we can reply to you.',
  company: 'Enter your company name. One word is enough.',
  message: 'Tell us what you are trying to fix, in your own words.',
};

/**
 * Mirrors `lib/enquiry-validation.ts`. These are a convenience so a visitor is
 * not made to wait on a round trip to learn a box is empty — the server applies
 * every one of them again and is the only authority on whether a submission is
 * stored.
 */
const MAX_LENGTHS: Record<FieldName, number> = {
  name: 120,
  email: 254,
  company: 160,
  message: 5000,
  phone: 40,
  website: 512,
};

/**
 * Must match `MARKETING_CONSENT_TEXT_V1` in `lib/enquiry-validation.ts`, which
 * is what gets stored against the record. Changing the wording means adding a
 * new version constant on the server, not editing the existing one.
 */
const MARKETING_CONSENT_LABEL =
  'Email me occasionally about what MappedSkills publishes. Not required to send this.';

type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string;
  website: string;
  marketingConsent: boolean;
  /** Honeypot. Never shown, never read by a person. */
  contactReference: string;
};

const EMPTY: FormValues = {
  name: '',
  email: '',
  company: '',
  message: '',
  phone: '',
  website: '',
  marketingConsent: false,
  contactReference: '',
};

/**
 * Failure text, by the server's error code. Every one of these says the same
 * load-bearing thing in different words — NOTHING WAS SAVED — because the
 * defect this phase exists to remove is a visitor believing otherwise.
 *
 * NO FALLBACK CONTACT ROUTE IS OFFERED, and its absence is deliberate.
 * `POST_SUBMISSION_AND_FOLLOWUP.md` §4 asks for one on a persistence failure,
 * but the published phone number and email address are OWNER-BLOCKED and Phase
 * G correctly renders them nowhere. Inventing one here would be worse than the
 * gap: a failing form that then sends people to an address nobody has confirmed
 * is monitored. Recorded as an owner dependency in the H1 document.
 */
const FORM_ERRORS: Record<string, string> = {
  unavailable:
    'We could not save your enquiry, so it has not reached us. Nothing you typed has been lost — try sending it again in a moment.',
  rate_limited:
    'That is several attempts in a short time, so this one was not saved. Wait a few minutes and try again.',
  too_large:
    'That is longer than this form can accept, so it was not saved. Shorten the last box and try again.',
  network:
    'We could not reach the server, so your enquiry has not been saved. Check your connection and try again.',
  unknown:
    'Something went wrong at our end and your enquiry was not saved. Nothing you typed has been lost — try again.',
};

/** `isHydrated` reads no external store; the server snapshot (false) is what makes the hydration pass differ. */
const noSubscription = () => () => {};

/**
 * `labelledBy`: the id of the visible heading that names this form (C+ `/contact`: its H1), so the form is exposed as a
 * named form region. Presentation only; nothing about submission depends on it.
 */
export function ContactForm({ labelledBy }: { labelledBy?: string } = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * False in the server HTML and until this component has hydrated, so the send button is rendered DISABLED and
   * cannot trigger the browser's native submission (with JavaScript off, or before it has loaded). Only the
   * `handleSubmit` path below can send an enquiry. `method="post"` on the form is the second line: even a native
   * submission could never put a field value in the URL.
   */
  const isHydrated = useSyncExternalStore(noSubscription, () => true, () => false);

  /**
   * The synchronous in-flight guard. `isSubmitting` drives what the visitor
   * SEES, but React state is not readable within the tick that sets it, so two
   * clicks landing before the next render would both pass a state-based check
   * and both send a request. A ref is updated immediately, so the second one is
   * dropped where it happens.
   *
   * This does not replace the database's unique index — nothing on the client
   * can, because a browser retry or a reload is outside this component's
   * lifetime entirely. It just stops the redundant requests that a state check
   * would let through.
   */
  const inFlightRef = useRef(false);
  /** Set once the success navigation has started, so the guard is never reopened. */
  const navigatedRef = useRef(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  /** Set once the form has actually been submitted, so nothing is validated before it is touched. */
  const attemptedRef = useRef(false);
  /** Focus moves to the summary only on the submit that produced it, never on a re-render. */
  const shouldFocusSummaryRef = useRef(false);

  /**
   * Abuse layer 2 — the submission-timing signal. Recorded on mount rather than
   * on first keystroke so a script that posts the moment the page parses is
   * visible. It is a soft signal: the server FLAGS an implausibly fast
   * submission for review and never rejects it.
   */
  const mountedAtRef = useRef<number>(0);

  /**
   * Abuse layer, and the durable one — the idempotency key. Generated once per
   * enquiry attempt and reused across retries, so a double-click, a browser
   * retry or a "try again" after a network error all carry the SAME key. The
   * database's unique index on that column is what actually guarantees one row;
   * the disabled button below is only the first line of defence and does not
   * survive a retry.
   */
  const idempotencyKeyRef = useRef<string | null>(null);

  /**
   * SESSION 32 — H2. `lead_form_started` fires ONCE per mounted form, on the
   * first real edit of a real field. A ref rather than state because the guard
   * has to hold within the same tick as the keystroke that trips it, and because
   * re-rendering the whole form to record that it has been touched would be a
   * measurable cost paid for nothing.
   *
   * NOT ON EVERY KEYSTROKE, and not on focus. The session brief is explicit that
   * per-keystroke instrumentation is out of proportion, and a focus event fires
   * when someone tabs past a field without intending to fill it in.
   */
  const startedRef = useRef(false);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (shouldFocusSummaryRef.current && summaryRef.current) {
      shouldFocusSummaryRef.current = false;
      summaryRef.current.focus();
    }
  });

  /**
   * The page context every event on this form carries. Path only — the query
   * string is stripped by `safePagePath`, per `EVENT_TAXONOMY.md` §7, because it
   * is the part of a location that carries identifiers.
   */
  function pageContext() {
    const path = safePagePath(pathname ?? '/contact');
    return { page_path: path, page_type: pageTypeOf(path), form_id: 'contact_enquiry' };
  }

  function setValue<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    // `lead_form_started` — first meaningful interaction, once. The honeypot is
    // excluded deliberately: it is invisible to people, so a fill there is a
    // machine and must not be reported as a human starting the form.
    if (!startedRef.current && field !== 'contactReference') {
      startedRef.current = true;
      track(EVENTS.LEAD_FORM_STARTED, pageContext());
    }
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear a field's error as soon as it is edited, but only after a submit
    // has been attempted — re-validating on every keystroke before that would
    // shout at someone halfway through typing their address.
    if (attemptedRef.current && field in fieldErrors) {
      setFieldErrors((previous) => {
        const next = { ...previous };
        delete next[field as FieldName];
        return next;
      });
    }
  }

  function validateLocally(): Partial<Record<FieldName, string>> {
    const errors: Partial<Record<FieldName, string>> = {};

    for (const field of REQUIRED_FIELDS) {
      if (!values[field].trim()) {
        errors[field] = REQUIRED_MESSAGES[field];
      } else if (values[field].trim().length > MAX_LENGTHS[field]) {
        errors[field] = `Use ${MAX_LENGTHS[field]} characters or fewer.`;
      }
    }

    if (!errors.email && values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      errors.email = 'Enter an email address in the form name@company.com.';
    }

    return errors;
  }

  /**
   * `lead_form_validation_error` — `EVENT_TAXONOMY.md` §2 row 3, whose
   * `error_type` enum (`required` · `format` · `server` · `rate_limited`) covers
   * both the client's own checks and a rejection that came back from the server.
   *
   * FIELD NAME ONLY, NEVER FIELD VALUE. §7 states that rule in exactly those
   * words, and it is enforced by this function's signature: it takes a
   * `FieldName`, so there is no parameter a value could be passed through.
   *
   * ONE EVENT PER FAILING FIELD PER SUBMIT ATTEMPT — not per keystroke, and not
   * one aggregate event that hides which field people are actually failing.
   */
  function reportValidationErrors(
    errors: Partial<Record<FieldName, string>>,
    classify: (field: FieldName) => 'required' | 'format' | 'server'
  ) {
    for (const field of Object.keys(errors) as FieldName[]) {
      if (!errors[field]) continue;
      track(EVENTS.LEAD_FORM_VALIDATION_ERROR, {
        ...pageContext(),
        field_name: field,
        error_type: classify(field),
        error_scope: 'field',
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    attemptedRef.current = true;
    setFormError(null);

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      shouldFocusSummaryRef.current = true;
      // A DIAGNOSTIC, AND EMPHATICALLY NOT A CONVERSION. Nothing was sent and
      // nothing was stored; this records only that the visitor was stopped here.
      reportValidationErrors(localErrors, (field) =>
        values[field].trim() === '' ? 'required' : 'format'
      );
      return;
    }

    setFieldErrors({});
    inFlightRef.current = true;
    setIsSubmitting(true);

    if (idempotencyKeyRef.current === null) {
      idempotencyKeyRef.current =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : // Older Safari. The value only has to be unique enough for the
            // database's unique index to do its job on a retry seconds later.
            `${Date.now().toString(16).padStart(12, '0').slice(-8)}-0000-4000-8000-${Math.random()
              .toString(16)
              .slice(2, 14)
              .padEnd(12, '0')}`;
    }
    /** Narrowed once, so nothing below has to re-assert it is set. */
    const idempotencyKey = idempotencyKeyRef.current;

    // SESSION 32 — H2. Read ONCE, before the request, and passed through
    // untouched. It is captured from `sessionStorage` by `lib/attribution.ts`
    // and it CANNOT fail this submission: `attributionForSubmission` never
    // throws and returns `EMPTY_ATTRIBUTION` — every field null,
    // `status: 'unavailable'` — whenever storage is unavailable or nothing was
    // recorded. The server re-validates all of it and can also reduce it to
    // nothing without rejecting the enquiry. `ATTRIBUTION_MODEL.md` §1:
    // measurement is reported, never enforced.
    const attribution = attributionForSubmission();

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey,
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
          phone: values.phone,
          website: values.website,
          marketingConsent: values.marketingConsent,
          contactReference: values.contactReference,
          elapsedMs: mountedAtRef.current ? Date.now() - mountedAtRef.current : null,
          sourcePage: pathname,
          attribution,
        }),
      });

      // The ONLY branch that leads anywhere but back to this form. A 2xx is
      // returned by `app/api/enquiry/route.ts` only after the database has
      // acknowledged the write, so this is the point at which the enquiry
      // demonstrably exists. No timer, no optimistic state, no assumption.
      if (response.ok) {
        // No id, no email, no company, no message — nothing in the URL, nothing
        // handed to a third party beyond the event below. The destination page
        // is a confirmation, not a record.
        // The guard STAYS CLOSED. `finally` runs even on this early return, so
        // it must be told not to reopen it: the navigation is still in flight
        // and this form is about to unmount, so a click landing in between has
        // to be ignored rather than sent as a second request.
        navigatedRef.current = true;
        // The one-time `/thank-you` confirmation signal: a timestamp only, and it cannot throw (see the module).
        markEnquiryConfirmed();

        /*
         * ★ THE PRIMARY CONTACT CONVERSION — SESSION 32 / PHASE H2.
         *
         * THE ONLY PLACE IN THIS APPLICATION THAT EMITS IT. Reaching this line
         * required a 2xx from `POST /api/enquiry`, and that handler returns 2xx
         * on exactly one path: after `insertEnquiry` resolved, which happens only
         * once MariaDB has acknowledged a durable row. Every other outcome —
         * 400, 413, 415, 429, 503, a thrown fetch — leaves this block unentered.
         * The event therefore cannot be produced by a click, a submit attempt, a
         * passing client validation, a started request, a failed persistence, or
         * a visit to `/thank-you`.
         *
         * `trackOnce`, KEYED ON THE IDEMPOTENCY KEY — the same key the database's
         * unique index uses. One enquiry produces one row and one event, and the
         * two agree by construction. A double-click is stopped earlier by
         * `inFlightRef`; a retry after a network failure re-sends the SAME key,
         * so the server's duplicate path returns 2xx a second time and this guard
         * suppresses the second event. The key is a de-duplication token here and
         * NOTHING ELSE: it is stored against the row, so it is resolvable to a
         * person, and it never enters a payload.
         *
         * `qualification_status: 'not_evaluated'` IS THE HONEST VALUE AND IS SENT
         * DELIBERATELY. `EVENT_TAXONOMY.md` §4 makes this event a BUSINESS
         * CONVERSION ONLY WHEN `qualification_status = 'qualified'`. Nothing in
         * this system can currently establish that: WQE condition 5 needs a
         * deduplication window `QUALIFIED_ENQUIRY_DEFINITION.md` §10 leaves
         * unset, and no column, workflow or reviewer exists to resolve it. Sending
         * `qualified` would fabricate a verdict; omitting the parameter would let
         * a container default it. An explicit out-of-enum value is visible, cannot
         * be mistaken for a verdict, and makes any report that counts these as
         * qualified enquiries fail loudly instead of quietly.
         */
        trackOnce(EVENTS.LEAD_FORM_SUBMITTED, idempotencyKey, {
          ...pageContext(),
          conversion_surface: 'form',
          qualification_status: 'not_evaluated',
          ...attributionForAnalytics(attribution),
        });

        router.push('/thank-you');
        return;
      }

      let payload: { error?: string; fieldErrors?: Partial<Record<FieldName, string>> } = {};
      try {
        payload = await response.json();
      } catch {
        /* A non-JSON error body is still a failure; it just cannot say more. */
      }

      if (payload.fieldErrors && Object.keys(payload.fieldErrors).length > 0) {
        setFieldErrors(payload.fieldErrors);
        setFormError(null);
        reportValidationErrors(payload.fieldErrors, () => 'server');
      } else {
        setFormError(FORM_ERRORS[payload.error ?? 'unknown'] ?? FORM_ERRORS.unknown);
        /*
         * A WHOLE-FORM FAILURE. NO ROW EXISTS AND NO CONVERSION IS EMITTED — the
         * conversion block above was not entered, and this is a sibling branch of
         * it, so there is no ordering or timing by which both could run.
         *
         * CATEGORIES ONLY. `error_type` is the server's own machine-readable
         * code, which `app/api/enquiry/route.ts` defines as a closed set
         * containing no SQL, no driver message, no table name and no connection
         * detail. The visitor-facing sentence is not sent, and neither is
         * anything they typed. An unrecognised code is reported as `unexpected`
         * rather than passed through, so a future code cannot leak by default.
         */
        const code = payload.error ?? 'unexpected';
        track(EVENTS.LEAD_FORM_VALIDATION_ERROR, {
          ...pageContext(),
          error_type: code === 'rate_limited' ? 'rate_limited' : 'server',
          error_scope: 'form',
          failure_reason: code in FORM_ERRORS || code === 'validation' ? code : 'unexpected',
        });
      }
      shouldFocusSummaryRef.current = true;
    } catch {
      // Thrown before a response existed: offline, DNS, a dropped connection.
      // Nothing reached the server, so nothing was saved, and that is what the
      // visitor is told. Every value they typed is still in state.
      setFormError(FORM_ERRORS.network);
      // Nothing reached the server, so nothing was saved and NO CONVERSION IS
      // EMITTED. This is the branch an offline visitor and a dropped connection
      // land in, and it is a diagnostic.
      track(EVENTS.LEAD_FORM_VALIDATION_ERROR, {
        ...pageContext(),
        error_type: 'server',
        error_scope: 'form',
        failure_reason: 'network',
      });
      shouldFocusSummaryRef.current = true;
    } finally {
      if (!navigatedRef.current) {
        inFlightRef.current = false;
        setIsSubmitting(false);
      }
    }
  }

  const errorEntries = (Object.keys(fieldErrors) as FieldName[]).filter((key) => fieldErrors[key]);
  const hasSummary = errorEntries.length > 0 || formError !== null;

  /**
   * One field, in the approved C+ layout (proto/direction-c-plus 0a8b611, DemoContactForm). The hint is associated
   * before entry and the error through `aria-describedby`. Every label says "(required)" or "(optional)" in text
   * (`FORM_AND_BOOKING_SPEC.md` §7; owner decision, 2026-10-14), and a required field also carries `aria-required`.
   */
  function field(
    id: FieldName,
    opts: { required?: boolean; type?: string; autoComplete?: string; inputMode?: 'email' | 'tel' | 'url'; area?: boolean }
  ) {
    const error = fieldErrors[id];
    const describedBy = [`${id}-hint`, error ? `${id}-error` : null].filter(Boolean).join(' ');
    const common = {
      id,
      name: id,
      maxLength: MAX_LENGTHS[id],
      value: values[id],
      'aria-required': opts.required ? ('true' as const) : undefined,
      'aria-invalid': Boolean(error),
      'aria-describedby': describedBy,
      disabled: isSubmitting,
      className: 'ct-input' + (opts.area ? ' ct-area' : '') + (error ? ' is-invalid' : ''),
    };
    return (
      <div className="ct-field">
        <label htmlFor={id} className="ct-label">
          {FIELD_LABELS[id]}
          <span className="ct-opt"> ({opts.required ? 'required' : 'optional'})</span>
        </label>
        <p id={`${id}-hint`} className="ct-hint">
          {FIELD_HINTS[id]}
        </p>
        {opts.area ? (
          <textarea {...common} rows={6} onChange={(event) => setValue(id, event.target.value)} />
        ) : (
          <input
            {...common}
            type={opts.type ?? 'text'}
            autoComplete={opts.autoComplete}
            inputMode={opts.inputMode}
            onChange={(event) => setValue(id, event.target.value)}
          />
        )}
        {error ? (
          <p id={`${id}-error`} className="ct-err">
            <span className="ct-err-ic" aria-hidden="true">
              !
            </span>
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate className="ct-form" aria-labelledby={labelledBy}>
      {/*
        NO JAVASCRIPT. The form cannot send without it (the send button stays disabled), so say so before anyone
        types, and keep the booking route, which works without JavaScript, one link away.
      */}
      <noscript>
        <p className="ct-summary ct-summary-p">
          This form needs JavaScript to send, and it is turned off in your browser. Nothing you type here can be sent.
          You can still <Link href="/schedule-call">book a call</Link>.
        </p>
      </noscript>
      {/*
        ERROR SUMMARY. `FORM_AND_BOOKING_SPEC.md` §7 requires errors announced
        through a live region and focus moved to the first error on a failed
        submit. It is focusable (`tabIndex={-1}`) but not in the tab order, and
        each entry is a real link to its field, so a keyboard or screen-reader
        user reaches the problem in one step rather than hunting for it.
      */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={hasSummary ? 'ct-summary' : 'px-sr'}
      >
        {hasSummary ? (
          <>
            <p className="ct-summary-h">{formError ? 'Your enquiry was not sent.' : 'Check the form before sending.'}</p>
            {formError ? (
              <p className="ct-summary-p">{formError}</p>
            ) : (
              <ul>
                {errorEntries.map((key) => (
                  <li key={key}>
                    <a href={`#${key}`}>
                      {FIELD_LABELS[key]}: {fieldErrors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>

      {/*
        HONEYPOT — abuse layer 1. Hidden from sighted users AND from assistive
        technology: `aria-hidden` plus `tabIndex={-1}` means a screen reader
        never announces it and a keyboard user never lands on it, so no
        legitimate visitor can fill it in by accident. It is NOT
        `display: none`, which some bots detect and skip.

        A hit FLAGS the row for review; it never rejects the submission. A
        password manager can fill a hidden input, and
        `QUALIFIED_ENQUIRY_DEFINITION.md` §7A is explicit that the cost of
        wrongly discarding a real buyer far exceeds the cost of a human glance.
      */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label htmlFor="contactReference">Do not fill this in</label>
        <input
          id="contactReference"
          name="contactReference"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.contactReference}
          onChange={(event) => setValue('contactReference', event.target.value)}
        />
      </div>

      <fieldset className="ct-group">
        <legend className="ct-legend">{FIELD_GROUPS.you}</legend>
        {field('name', { required: true, autoComplete: 'name' })}
        {field('email', { required: true, type: 'email', autoComplete: 'email', inputMode: 'email' })}
        {field('company', { required: true, autoComplete: 'organization' })}
      </fieldset>
      <fieldset className="ct-group">
        <legend className="ct-legend">{FIELD_GROUPS.what}</legend>
        {field('message', { required: true, area: true })}
      </fieldset>
      <fieldset className="ct-group">
        <legend className="ct-legend">{FIELD_GROUPS.optional}</legend>
        {field('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
        {field('website', { type: 'url', autoComplete: 'url', inputMode: 'url' })}
        {/*
          MARKETING CONSENT — separate, unticked, and never a condition of
          submitting (`POST_SUBMISSION_AND_FOLLOWUP.md` §7). A native checkbox
          rather than a scripted one, so it behaves correctly for every assistive
          technology without depending on this component's own state machine. The
          wrapping label gives it a target above 44px on touch.
        */}
        <label htmlFor="marketingConsent" className="ct-check">
          <input
            id="marketingConsent"
            name="marketingConsent"
            type="checkbox"
            checked={values.marketingConsent}
            onChange={(event) => setValue('marketingConsent', event.target.checked)}
            disabled={isSubmitting}
          />
          <span>{MARKETING_CONSENT_LABEL}</span>
        </label>
      </fieldset>

      <div className="ct-send-w">
        <p className="ct-reply">{REPLY_LINE}</p>
        {/*
          PENDING STATE, announced rather than only shown. `aria-live="polite"`
          means a screen-reader user is told the form is sending instead of
          meeting a silently disabled button. Success is not announced here —
          success is a navigation to `/thank-you`, which announces itself.
        */}
        <p aria-live="polite" className="px-sr">
          {isSubmitting ? 'Sending your enquiry.' : ''}
        </p>
        <button type="submit" className="ct-send" disabled={isSubmitting || !isHydrated}>
          {isSubmitting ? 'Sending…' : 'Send this'}
        </button>
        {/*
          Privacy statement adjacent to the submit control, per
          `FORM_AND_BOOKING_SPEC.md` §2. It states the PURPOSE of the processing
          and nothing more. In particular it makes no security claim.
        */}
        <p className="ct-privacy">
          We use what you send here to reply to you. <Link href="/privacy-policy">Privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
