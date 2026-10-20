'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

import { EVENTS, pageTypeOf, safePagePath, track, trackOnce } from '@/lib/analytics';
import { attributionForAnalytics, attributionForSubmission } from '@/lib/attribution';
import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  EMAIL_PATTERN,
  SERVICE_OPTIONS,
  normalisePhone,
  type ContactIntent,
} from '@/lib/contact-request';
import { markEnquiryConfirmed } from '@/lib/enquiry-confirmation';
import { Icon } from '@/components/cplus/Icons';

/**
 * C1 (DEC-071) — THE ONE CONTACT FORM, with two visitor intentions.
 *
 * `/contact` and `/schedule-call` used to carry two forms (the H1 enquiry form, and its DEC-062 "Request a call"
 * variant). They are consolidated here: the visitor chooses "Send an enquiry" or "Request a call", and can switch at
 * any time without losing anything typed. `/contact` starts on the enquiry; `/contact?intent=call` (and the
 * `/schedule-call` redirect) starts on the call request. A call request is a REQUEST: there is no scheduling system,
 * the team contacts the visitor to arrange a time, and nothing here may imply that an appointment is confirmed.
 *
 * WHAT IS UNCHANGED FROM THE H1/H2 FORM, AND MUST STAY SO:
 *   - NO FALSE SUCCESS. The only path to `/thank-you` is inside `if (response.ok)`, and `POST /api/enquiry` returns
 *     2xx only after MariaDB has acknowledged a durable row. No timer, no optimistic state.
 *   - `lead_form_submitted` is emitted from that branch only, once per idempotency key (`trackOnce`). It cannot be
 *     produced by a click, a submit attempt, a passing client validation, a 4xx/5xx or a network failure.
 *     `form_id` keeps the two existing values — `contact_enquiry` and `call_request` — so existing reports and tags
 *     keep distinguishing the intentions. Event names, parameters and the conversion rule are unchanged.
 *   - NO PII IN ANY EVENT: path, page type, form id, field NAME, error CATEGORY and channel labels only.
 *   - The idempotency key (one per attempt, reused across retries), the synchronous in-flight guard, the honeypot
 *     and the timing signal. The server re-validates everything and is the only authority on what is stored.
 *   - NO PROMISES: no response time, no "shortly", no claim about who reads it.
 *
 * Analytics cannot break the form: `track`/`trackOnce` swallow their own errors and nothing is awaited.
 */

type FieldName = 'name' | 'email' | 'phone' | 'service' | 'message' | 'preferredContactTime';

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'service'] as const;

const LABELS: Record<FieldName, string> = {
  name: 'Full name',
  email: 'Business email',
  phone: 'Phone / WhatsApp number',
  service: 'What do you need help with?',
  message: 'Tell us a little about your requirements',
  preferredContactTime: 'Preferred time to be contacted',
};

/** Empty means no hint. Hints are associated with their field before entry, through `aria-describedby`. */
const HINTS: Record<FieldName, string> = {
  name: '',
  email: '',
  phone: 'Include your country code. Indian mobile numbers can be entered without +91.',
  service: '',
  message: '',
  preferredContactTime: 'For example, weekdays 2–5 PM IST. This helps us plan; it isn’t a booking.',
};

const MESSAGE_PLACEHOLDER: Record<ContactIntent, string> = {
  enquiry: 'What challenges are you facing, or what would you like to achieve?',
  call: 'What would you like to discuss on the call?',
};

const REQUIRED_MESSAGES: Record<(typeof REQUIRED_FIELDS)[number], string> = {
  name: CONTACT_MESSAGES.nameRequired,
  email: CONTACT_MESSAGES.emailRequired,
  phone: CONTACT_MESSAGES.phoneRequired,
  service: CONTACT_MESSAGES.serviceRequired,
};

const MAX_LENGTHS: Partial<Record<FieldName, number>> = {
  name: CONTACT_LIMITS.name,
  email: CONTACT_LIMITS.email,
  phone: CONTACT_LIMITS.phone,
  message: CONTACT_LIMITS.message,
  preferredContactTime: CONTACT_LIMITS.preferredContactTime,
};

/** The two intentions, as the visitor reads them. */
const INTENTS: { value: ContactIntent; label: string; detail: string }[] = [
  { value: 'enquiry', label: 'Send an enquiry', detail: 'Ask a question or tell us what you need.' },
  { value: 'call', label: 'Request a call', detail: 'We’ll contact you to arrange a conversation.' },
];

const SUBMIT_LABEL: Record<ContactIntent, string> = { enquiry: 'Send enquiry', call: 'Request a call' };
const SENDING_LABEL: Record<ContactIntent, string> = {
  enquiry: 'Sending your enquiry.',
  call: 'Sending your request.',
};
/** Owner-confirmed reply channels (DEC-051) and the DEC-062 "request, not a booking" line. No response time. */
const SEND_NOTE: Record<ContactIntent, string> = {
  enquiry: 'We’ll reply by email or WhatsApp.',
  call: 'This sends a request, not a booking. We’ll contact you by phone, WhatsApp or email to arrange a time.',
};

/**
 * Failure text, by the server's error code. Every one says the load-bearing thing — NOTHING WAS SAVED — and that
 * nothing typed has been lost. No fallback contact route is offered: the published phone and email are owner-blocked.
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
const formErrorText = (code: string, intent: ContactIntent) => {
  const text = FORM_ERRORS[code] ?? FORM_ERRORS.unknown;
  return intent === 'call' ? text.replace(/enquiry/g, 'request') : text;
};

type FormValues = Record<FieldName, string> & {
  /** Honeypot. Never shown, never read by a person. */
  contactReference: string;
};

const EMPTY: FormValues = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  preferredContactTime: '',
  contactReference: '',
};

/** Anything on the page can switch the form's intention (the "Request a call" link further down `/contact`). */
export const CONTACT_INTENT_EVENT = 'ms:contact-intent';

/** `isHydrated` reads no external store; the server snapshot (false) is what makes the hydration pass differ. */
const noSubscription = () => () => {};

/**
 * `labelledBy`: the id of the visible heading that names this form, so it is exposed as a named form region.
 * The starting intention comes from the route: `/contact?intent=call` is served by the `contact/call` segment
 * (a rewrite in `next.config.mjs`), so the server HTML is already in the right state and nothing flashes.
 */
export function ContactForm({ labelledBy }: { labelledBy?: string } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const routeIntent: ContactIntent = useSelectedLayoutSegment() === 'call' ? 'call' : 'enquiry';

  const [intent, setIntentState] = useState<ContactIntent>(routeIntent);
  // A navigation to the other intention (a header link while already on /contact) re-renders the shared layout
  // without remounting this form, so typed values survive; the intention follows the route.
  const [seenRouteIntent, setSeenRouteIntent] = useState<ContactIntent>(routeIntent);
  if (seenRouteIntent !== routeIntent) {
    setSeenRouteIntent(routeIntent);
    setIntentState(routeIntent);
  }

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** False in the server HTML: the send button is disabled until hydration, so only `handleSubmit` can send. */
  const isHydrated = useSyncExternalStore(noSubscription, () => true, () => false);

  /** Synchronous double-submit guard (state is not readable within the tick that sets it). */
  const inFlightRef = useRef(false);
  /** Set once the success navigation has started, so the guard is never reopened. */
  const navigatedRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  /** Set once the form has been submitted, so nothing is validated before it is touched. */
  const attemptedRef = useRef(false);
  const shouldFocusSummaryRef = useRef(false);
  /** Abuse layer 2: recorded on mount; the server FLAGS an implausibly fast submission, never rejects it. */
  const mountedAtRef = useRef<number>(0);
  /** One key per attempt, reused across retries; the database's unique index guarantees one row. */
  const idempotencyKeyRef = useRef<string | null>(null);
  /** `lead_form_started` fires once per mounted form, on the first real edit of a real field. */
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
   * Changes the intention and keeps the address bar in step (`?intent=call`, or none for the enquiry), so a reload or
   * a shared link opens the same state. Every other query parameter is kept. `replaceState` adds no history entry and
   * does not navigate, so nothing typed is touched.
   */
  function chooseIntent(next: ContactIntent) {
    if (isSubmitting) return;
    setIntentState(next);
    // The preferred-time error belongs to the call request only.
    if (next === 'enquiry' && fieldErrors.preferredContactTime) {
      setFieldErrors((previous) => {
        const rest = { ...previous };
        delete rest.preferredContactTime;
        return rest;
      });
    }
    try {
      const url = new URL(window.location.href);
      if (next === 'call') url.searchParams.set('intent', 'call');
      else url.searchParams.delete('intent');
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    } catch {
      /* The address bar is a convenience; the form state is what counts. */
    }
  }

  // Links elsewhere on the page ask for an intention through a DOM event (the form owns the state).
  const chooseIntentRef = useRef(chooseIntent);
  useEffect(() => {
    chooseIntentRef.current = chooseIntent;
  });
  useEffect(() => {
    function onIntent(event: Event) {
      const next = (event as CustomEvent<ContactIntent>).detail;
      if (next === 'call' || next === 'enquiry') chooseIntentRef.current(next);
    }
    window.addEventListener(CONTACT_INTENT_EVENT, onIntent);
    return () => window.removeEventListener(CONTACT_INTENT_EVENT, onIntent);
  }, []);

  /** Path only (`safePagePath` strips the query string); `form_id` names the intention. */
  function pageContext(forIntent: ContactIntent = intent) {
    const path = safePagePath(pathname ?? '/contact');
    return {
      page_path: path,
      page_type: pageTypeOf(path),
      form_id: forIntent === 'call' ? 'call_request' : 'contact_enquiry',
    };
  }

  function setValue(field: keyof FormValues, value: string) {
    // The honeypot is excluded: a fill there is a machine, not a person starting the form.
    if (!startedRef.current && field !== 'contactReference') {
      startedRef.current = true;
      track(EVENTS.LEAD_FORM_STARTED, pageContext());
    }
    setValues((previous) => ({ ...previous, [field]: value }));
    // After a submit attempt, an edited field's error clears as it is edited; never before.
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
      if (!values[field].trim()) errors[field] = REQUIRED_MESSAGES[field];
    }
    for (const field of Object.keys(MAX_LENGTHS) as FieldName[]) {
      if (field === 'preferredContactTime' && intent !== 'call') continue;
      const max = MAX_LENGTHS[field] as number;
      if (!errors[field] && values[field].trim().length > max) errors[field] = CONTACT_MESSAGES.tooLong(max);
    }
    if (!errors.email && !EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = CONTACT_MESSAGES.emailFormat;
    }
    if (!errors.phone && normalisePhone(values.phone) === null) {
      errors.phone = CONTACT_MESSAGES.phoneFormat;
    }
    return errors;
  }

  /** One diagnostic per failing field per submit attempt: field NAME and error CATEGORY, never a value. */
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
      // A diagnostic, not a conversion: nothing was sent.
      reportValidationErrors(localErrors, (field) => (values[field].trim() === '' ? 'required' : 'format'));
      return;
    }

    setFieldErrors({});
    inFlightRef.current = true;
    setIsSubmitting(true);
    // The intention is fixed for this attempt: the controls are disabled while it is in flight.
    const sentIntent = intent;

    if (idempotencyKeyRef.current === null) {
      idempotencyKeyRef.current =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : // Older Safari: unique enough for the unique index to catch a retry seconds later.
            `${Date.now().toString(16).padStart(12, '0').slice(-8)}-0000-4000-8000-${Math.random()
              .toString(16)
              .slice(2, 14)
              .padEnd(12, '0')}`;
    }
    const idempotencyKey = idempotencyKeyRef.current;

    // Never throws; `EMPTY_ATTRIBUTION` when storage is unavailable. Measurement is reported, never enforced.
    const attribution = attributionForSubmission();

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: sentIntent,
          idempotencyKey,
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.message,
          // Kept in the form when the visitor switches, but sent only with a call request.
          preferredContactTime: sentIntent === 'call' ? values.preferredContactTime : '',
          contactReference: values.contactReference,
          elapsedMs: mountedAtRef.current ? Date.now() - mountedAtRef.current : null,
          sourcePage: pathname,
          attribution,
        }),
      });

      // THE ONLY BRANCH THAT LEADS ANYWHERE BUT BACK TO THIS FORM: a durable row exists.
      if (response.ok) {
        navigatedRef.current = true;
        // The one-time `/thank-you` signal: a timestamp (prefixed `call:` for a call request), no personal data.
        markEnquiryConfirmed(sentIntent);
        // ★ THE PRIMARY CONTACT CONVERSION — the only place it is emitted. `qualification_status: 'not_evaluated'`
        // is the honest value (nothing can establish `qualified` yet). The key de-duplicates; it is never sent.
        trackOnce(EVENTS.LEAD_FORM_SUBMITTED, idempotencyKey, {
          ...pageContext(sentIntent),
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
        setFormError(formErrorText(payload.error ?? 'unknown', sentIntent));
        // A whole-form failure: no row, no conversion. Categories only; an unknown code is reported as `unexpected`.
        const code = payload.error ?? 'unexpected';
        track(EVENTS.LEAD_FORM_VALIDATION_ERROR, {
          ...pageContext(sentIntent),
          error_type: code === 'rate_limited' ? 'rate_limited' : 'server',
          error_scope: 'form',
          failure_reason: code in FORM_ERRORS || code === 'validation' ? code : 'unexpected',
        });
      }
      shouldFocusSummaryRef.current = true;
    } catch {
      // Nothing reached the server, so nothing was saved and no conversion is emitted. Every value is still in state.
      setFormError(formErrorText('network', sentIntent));
      track(EVENTS.LEAD_FORM_VALIDATION_ERROR, {
        ...pageContext(sentIntent),
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

  const visibleFields: FieldName[] = ['name', 'email', 'phone', 'service', 'message'];
  if (intent === 'call') visibleFields.push('preferredContactTime');
  const errorEntries = visibleFields.filter((key) => fieldErrors[key]);
  const hasSummary = errorEntries.length > 0 || formError !== null;

  /** Describes a field by its hint (before entry) and its error (after a failed submit). */
  function describedBy(id: FieldName) {
    return [HINTS[id] ? `${id}-hint` : null, fieldErrors[id] ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;
  }

  function labelAndHint(id: FieldName, required: boolean) {
    return (
      <>
        <label htmlFor={id} className="ct-label">
          {LABELS[id]}
          <span className="ct-opt"> ({required ? 'required' : 'optional'})</span>
        </label>
        {HINTS[id] ? (
          <p id={`${id}-hint`} className="ct-hint">
            {HINTS[id]}
          </p>
        ) : null}
      </>
    );
  }

  function errorOf(id: FieldName) {
    const error = fieldErrors[id];
    return error ? (
      <p id={`${id}-error`} className="ct-err">
        <span className="ct-err-ic" aria-hidden="true">
          !
        </span>
        {error}
      </p>
    ) : null;
  }

  function input(
    id: Exclude<FieldName, 'service' | 'message'>,
    opts: { required?: boolean; type?: string; autoComplete?: string; inputMode?: 'email' | 'tel'; placeholder?: string }
  ) {
    const error = fieldErrors[id];
    return (
      <div className="ct-field">
        {labelAndHint(id, Boolean(opts.required))}
        <input
          id={id}
          name={id}
          type={opts.type ?? 'text'}
          autoComplete={opts.autoComplete}
          inputMode={opts.inputMode}
          placeholder={opts.placeholder}
          maxLength={MAX_LENGTHS[id]}
          value={values[id]}
          aria-required={opts.required ? 'true' : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id)}
          disabled={isSubmitting}
          className={'ct-input' + (error ? ' is-invalid' : '')}
          onChange={(event) => setValue(id, event.target.value)}
        />
        {errorOf(id)}
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate className="ct-form ct-form-c1" aria-labelledby={labelledBy}>
      {/* The form cannot send without JavaScript (the send button stays disabled), so say so before anyone types. */}
      <noscript>
        <p className="ct-summary ct-summary-p">
          This form needs JavaScript to send, and it is turned off in your browser. Nothing you type here can be sent.
        </p>
      </noscript>

      {/*
        ERROR SUMMARY — announced through a live region; focus moves here on a failed submit. Each entry links to its
        field, so a keyboard or screen-reader user reaches the problem in one step.
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
            <p className="ct-summary-h">
              {formError
                ? intent === 'call'
                  ? 'Your request was not sent.'
                  : 'Your enquiry was not sent.'
                : 'Check the form before sending.'}
            </p>
            {formError ? (
              <p className="ct-summary-p">{formError}</p>
            ) : (
              <ul>
                {errorEntries.map((key) => (
                  <li key={key}>
                    <a href={`#${key}`}>
                      {LABELS[key]}: {fieldErrors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>

      {/*
        HONEYPOT — abuse layer 1. Hidden from sighted users and from assistive technology (`aria-hidden`, no tab stop),
        not `display: none`. A hit FLAGS the row for review; it never rejects the submission.
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

      {/*
        THE INTENTION — a native radio group, so arrow keys, Tab and screen readers behave as they expect without any
        scripted focus management. Switching keeps every value typed.
      */}
      <fieldset className="ct-intent">
        <legend className="ct-intent-l">How would you like to start?</legend>
        <div className="ct-intent-g">
          {INTENTS.map((option) => (
            <label key={option.value} className={'ct-intent-o' + (intent === option.value ? ' is-on' : '')}>
              <input
                type="radio"
                name="intent"
                value={option.value}
                checked={intent === option.value}
                disabled={isSubmitting}
                aria-describedby={`intent-${option.value}-d`}
                onChange={() => chooseIntent(option.value)}
              />
              <span className="ct-intent-t">{option.label}</span>
              <span id={`intent-${option.value}-d`} className="ct-intent-d">
                {option.detail}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ct-call-fields">
        {input('name', { required: true, autoComplete: 'name' })}
        {input('email', { required: true, type: 'email', autoComplete: 'email', inputMode: 'email' })}
        {input('phone', {
          required: true,
          type: 'tel',
          autoComplete: 'tel',
          inputMode: 'tel',
          placeholder: '+91 98765 43210',
        })}

        <div className="ct-field">
          {labelAndHint('service', true)}
          <div className="ct-select-w">
            <select
              id="service"
              name="service"
              value={values.service}
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.service)}
              aria-describedby={describedBy('service')}
              disabled={isSubmitting}
              className={'ct-input ct-select' + (values.service ? '' : ' is-empty') + (fieldErrors.service ? ' is-invalid' : '')}
              onChange={(event) => setValue('service', event.target.value)}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="ct-select-ic" aria-hidden="true" />
          </div>
          {errorOf('service')}
        </div>

        <div className="ct-field">
          {labelAndHint('message', false)}
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={CONTACT_LIMITS.message}
            placeholder={MESSAGE_PLACEHOLDER[intent]}
            value={values.message}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={describedBy('message')}
            disabled={isSubmitting}
            className={'ct-input ct-area ct-area-s' + (fieldErrors.message ? ' is-invalid' : '')}
            onChange={(event) => setValue('message', event.target.value)}
          />
          {errorOf('message')}
        </div>

        {/* Call requests only. Not rendered for an enquiry, but its value stays in state, so it survives a switch. */}
        {intent === 'call'
          ? input('preferredContactTime', { autoComplete: 'off', placeholder: 'Weekdays, 2–5 PM IST' })
          : null}
      </div>

      <div className="ct-send-w ct-send-w-call">
        {/* The pending state is announced, not only shown. Success is the navigation to /thank-you. */}
        <p aria-live="polite" className="px-sr">
          {isSubmitting ? SENDING_LABEL[intent] : ''}
        </p>
        <button type="submit" className="ct-send" disabled={isSubmitting || !isHydrated}>
          {isSubmitting ? (
            'Sending…'
          ) : (
            <>
              {SUBMIT_LABEL[intent]}
              <Icon name="arrow" size={22} />
            </>
          )}
        </button>
        <p className="ct-call-note">{SEND_NOTE[intent]}</p>
        <p className="ct-privacy">
          We use these details only to respond to you. <Link href="/privacy-policy">Privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
