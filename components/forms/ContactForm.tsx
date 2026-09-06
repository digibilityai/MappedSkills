'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
 * NO ANALYTICS. The three `window.gtag(...)` calls that were here — including a
 * `contact_form_submit` fired on a submission that never happened — are gone.
 * They were the false-success path's only observable effect. H2 owns the
 * replacement, and both conversion events are server-side by definition
 * (`06_IMPLEMENTATION_SEQUENCE.md`), so this component deliberately leaves a
 * clean boundary rather than a client-side event for H2 to unpick. There is no
 * `dataLayer`, no `gtag` and no `fbq` in this file, and no form value is passed
 * to anything but the enquiry endpoint.
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
  message: "What you're trying to fix",
  phone: 'Phone or WhatsApp',
  website: 'Website',
};

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

export function ContactForm() {
  const router = useRouter();
  const pathname = usePathname();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (shouldFocusSummaryRef.current && summaryRef.current) {
      shouldFocusSummaryRef.current = false;
      summaryRef.current.focus();
    }
  });

  function setValue<K extends keyof FormValues>(field: K, value: FormValues[K]) {
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    attemptedRef.current = true;
    setFormError(null);

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      shouldFocusSummaryRef.current = true;
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

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey: idempotencyKeyRef.current,
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
        }),
      });

      // The ONLY branch that leads anywhere but back to this form. A 2xx is
      // returned by `app/api/enquiry/route.ts` only after the database has
      // acknowledged the write, so this is the point at which the enquiry
      // demonstrably exists. No timer, no optimistic state, no assumption.
      if (response.ok) {
        // No id, no email, no company, no message — nothing in the URL, nothing
        // in storage, nothing handed to a third party. The destination page is
        // a confirmation, not a record.
        // The guard STAYS CLOSED. `finally` runs even on this early return, so
        // it must be told not to reopen it: the navigation is still in flight
        // and this form is about to unmount, so a click landing in between has
        // to be ignored rather than sent as a second request.
        navigatedRef.current = true;
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
      } else {
        setFormError(FORM_ERRORS[payload.error ?? 'unknown'] ?? FORM_ERRORS.unknown);
      }
      shouldFocusSummaryRef.current = true;
    } catch {
      // Thrown before a response existed: offline, DNS, a dropped connection.
      // Nothing reached the server, so nothing was saved, and that is what the
      // visitor is told. Every value they typed is still in state.
      setFormError(FORM_ERRORS.network);
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

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
        className={
          hasSummary
            ? 'rounded-lg border border-destructive/40 bg-destructive/5 p-4 outline-none focus-visible:ring-2 focus-visible:ring-destructive/50'
            : 'sr-only'
        }
      >
        {hasSummary ? (
          <>
            <p className="text-sm font-semibold text-destructive">
              {formError ? 'Your enquiry was not sent.' : 'Check the form before sending.'}
            </p>
            {formError ? (
              <p className="mt-1 text-sm text-destructive">{formError}</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {errorEntries.map((field) => (
                  <li key={field} className="text-sm">
                    <a href={`#${field}`} className="text-destructive underline underline-offset-2">
                      {FIELD_LABELS[field]}: {fieldErrors[field]}
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

      <Field
        id="name"
        label={FIELD_LABELS.name}
        required
        error={fieldErrors.name}
        hint="However you would like us to address you."
      >
        {({ describedBy, invalid }) => (
          <Input
            id="name"
            name="name"
            type="text"
            className="h-11"
            autoComplete="name"
            maxLength={MAX_LENGTHS.name}
            value={values.name}
            onChange={(event) => setValue('name', event.target.value)}
            aria-required="true"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      <Field
        id="email"
        label={FIELD_LABELS.email}
        required
        error={fieldErrors.email}
        hint="Where the reply goes."
      >
        {({ describedBy, invalid }) => (
          <Input
            id="email"
            name="email"
            type="email"
            className="h-11"
            autoComplete="email"
            inputMode="email"
            maxLength={MAX_LENGTHS.email}
            value={values.email}
            onChange={(event) => setValue('email', event.target.value)}
            aria-required="true"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      <Field
        id="company"
        label={FIELD_LABELS.company}
        required
        error={fieldErrors.company}
        hint="One word is enough."
      >
        {({ describedBy, invalid }) => (
          <Input
            id="company"
            name="company"
            type="text"
            className="h-11"
            autoComplete="organization"
            maxLength={MAX_LENGTHS.company}
            value={values.company}
            onChange={(event) => setValue('company', event.target.value)}
            aria-required="true"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      <Field
        id="message"
        label={FIELD_LABELS.message}
        required
        error={fieldErrors.message}
        hint="What you are getting, what you are not, and what you can currently see. Not a brief."
      >
        {({ describedBy, invalid }) => (
          <Textarea
            id="message"
            name="message"
            className="min-h-32"
            maxLength={MAX_LENGTHS.message}
            value={values.message}
            onChange={(event) => setValue('message', event.target.value)}
            aria-required="true"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      <Field
        id="phone"
        label={FIELD_LABELS.phone}
        error={fieldErrors.phone}
        hint="Only if you would rather we called."
      >
        {({ describedBy, invalid }) => (
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="h-11"
            autoComplete="tel"
            inputMode="tel"
            maxLength={MAX_LENGTHS.phone}
            value={values.phone}
            onChange={(event) => setValue('phone', event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      <Field
        id="website"
        label={FIELD_LABELS.website}
        error={fieldErrors.website}
        hint="If you have one. It is usually the thing being discussed."
      >
        {({ describedBy, invalid }) => (
          <Input
            id="website"
            name="website"
            type="url"
            className="h-11"
            autoComplete="url"
            inputMode="url"
            maxLength={MAX_LENGTHS.website}
            value={values.website}
            onChange={(event) => setValue('website', event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </Field>

      {/*
        MARKETING CONSENT — separate, unticked, and never a condition of
        submitting (`POST_SUBMISSION_AND_FOLLOWUP.md` §7). A native checkbox
        rather than a scripted one, so it behaves correctly for every assistive
        technology without depending on this component's own state machine. The
        wrapping label gives it a target well above 44px on touch.
      */}
      <div>
        <label
          htmlFor="marketingConsent"
          className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm"
        >
          <input
            id="marketingConsent"
            name="marketingConsent"
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border accent-current"
            checked={values.marketingConsent}
            onChange={(event) => setValue('marketingConsent', event.target.checked)}
            disabled={isSubmitting}
          />
          <span className="text-muted-foreground">{MARKETING_CONSENT_LABEL}</span>
        </label>
      </div>

      {/*
        PENDING STATE, announced rather than only shown. `aria-live="polite"`
        means a screen-reader user is told the form is sending instead of
        meeting a silently disabled button. Success is not announced here —
        success is a navigation to `/thank-you`, which announces itself.
      */}
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? 'Sending your enquiry.' : ''}
      </p>

      <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send this'}
      </Button>

      {/*
        Privacy statement adjacent to the submit control, per
        `FORM_AND_BOOKING_SPEC.md` §2. It states the PURPOSE of the processing
        and nothing more. In particular it makes no security claim — "your info
        is secure" was removed from this page in Session 29 and is not
        reintroduced here in a quieter form.
      */}
      <p className="text-xs text-muted-foreground">
        We use what you send here to reply to you.{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2">
          Privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

/**
 * One field, wired for accessibility once so no call site can forget a piece.
 *
 * The requirement is conveyed in TEXT ("required" / "optional") as well as
 * through `aria-required`, because `FORM_AND_BOOKING_SPEC.md` §7 forbids colour
 * or an asterisk alone carrying it. The hint is associated BEFORE entry rather
 * than appearing only after an error, and the error is associated with the
 * input through `aria-describedby` rather than merely sitting next to it.
 */
function Field({
  id,
  label,
  hint,
  error,
  required = false,
  children,
}: {
  id: FieldName;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: { describedBy: string | undefined; invalid: boolean }) => React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}{' '}
        <span className="font-normal text-muted-foreground">{required ? '(required)' : '(optional)'}</span>
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children({ describedBy, invalid: Boolean(error) })}</div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
