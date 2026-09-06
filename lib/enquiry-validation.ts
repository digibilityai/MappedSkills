/**
 * SESSION 31 — PHASE H1 — server-side validation of the enquiry payload.
 *
 * THE SERVER IS AUTHORITATIVE. Nothing here trusts the client. The browser form
 * runs its own checks purely so a visitor is not made to wait on a round trip
 * to learn a field is empty; every rule that decides whether an enquiry is
 * stored is applied here, on values parsed from the raw request body.
 * `FORM_AND_BOOKING_SPEC.md` §8 layer 3: "Client validation is a convenience
 * and is never trusted."
 *
 * PRAGMATIC ON PURPOSE. This validates that a submission is well-formed and
 * addressable. It does NOT try to prove an address is a genuine corporate
 * mailbox: no domain blocking, no free-mail rejection, no MX lookup.
 * `QUALIFIED_ENQUIRY_DEFINITION.md` §3 makes condition 3 deliberately
 * permissive and §2B makes any such verification advisory and fail-open, so
 * rejecting on it would cost real enquiries to enforce a rule the approved
 * definition does not make.
 *
 * MINIMUM MESSAGE LENGTH IS NOT SET, and that is deliberate.
 * `QUALIFIED_ENQUIRY_DEFINITION.md` §10 decision 1 leaves it an open
 * calibration parameter, to be proposed against real submissions rather than
 * guessed. A non-empty message is required; a number invented here would be
 * invented precision, which this programme forbids.
 */

/** Hard ceiling on the raw request body. Comfortably above a real enquiry. */
export const MAX_BODY_BYTES = 16 * 1024;

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  message: 5000,
  phone: 40,
  website: 512,
  sourcePage: 255,
} as const;

/**
 * The visitor-facing text stored alongside a marketing opt-in, so what was
 * agreed to is reconstructable from the record (`POST_SUBMISSION_AND_FOLLOWUP.md`
 * §7, "consent record"). Changing the wording on the form means adding a NEW
 * version constant here, never editing this string — an edited string would
 * rewrite the history of what past enquirers actually agreed to.
 */
export const MARKETING_CONSENT_TEXT_V1 =
  'Email me occasionally about what MappedSkills publishes. Not required to send this.';

/** Below this, a submission is FLAGGED for review. It is never rejected. */
export const MIN_PLAUSIBLE_ELAPSED_MS = 2000;

export type FieldName = 'name' | 'email' | 'company' | 'message' | 'phone' | 'website';

export interface ValidatedEnquiry {
  idempotencyKey: string;
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string | null;
  website: string | null;
  sourcePage: string | null;
  marketingConsent: boolean;
  /** True when a cheap abuse layer fired. A flag for a human, not a verdict. */
  suspect: boolean;
}

export type ValidationResult =
  | { ok: true; value: ValidatedEnquiry }
  | { ok: false; formError?: 'malformed'; fieldErrors: Partial<Record<FieldName, string>> };

/**
 * Syntactic only, and intentionally close to what browsers accept for
 * `type="email"`. A stricter grammar buys nothing here: an address that parses
 * but does not exist is caught by the reply bouncing, not by a regex.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** C0 and C1 control characters. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;
/** The same set, but keeping tab, line feed and carriage return. */
const CONTROL_CHARS_KEEP_NEWLINES = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

/**
 * Returns a trimmed string for a value that IS a string, and `undefined` for
 * anything else — a number, an array, an object, a boolean, null. That
 * distinction is what stops `{"name": {"ne": null}}` or `{"name": [1,2]}` from
 * being coerced into something that looks valid.
 */
function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value.trim() : undefined;
}

/** Single-line fields: no control characters at all. */
function cleanLine(value: string): string {
  return value.replace(CONTROL_CHARS, '');
}

/**
 * The message is a textarea and its line breaks are meaningful — they are how a
 * person separates "what I'm getting" from "what I'm not". Newlines and tabs
 * are preserved; every other control character is removed.
 */
function cleanBlock(value: string): string {
  return value.replace(CONTROL_CHARS_KEEP_NEWLINES, '');
}

/**
 * Normalises a website value. A visitor typing `acme.com` means
 * `https://acme.com`, and rejecting that would be pedantry rather than
 * validation. Anything that still will not parse as http(s) with a dotted host
 * is reported back with a fixable message.
 */
function normaliseWebsite(raw: string): string | null {
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.') || url.hostname.endsWith('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function validateEnquiry(input: unknown): ValidationResult {
  const fieldErrors: Partial<Record<FieldName, string>> = {};

  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, formError: 'malformed', fieldErrors };
  }
  const body = input as Record<string, unknown>;

  // --- Idempotency key -----------------------------------------------------
  // Not a visitor-facing field. A missing or malformed key is a client defect,
  // so it fails the request rather than producing a field error nobody can fix.
  const idempotencyKey = asString(body.idempotencyKey);
  if (!idempotencyKey || !UUID_PATTERN.test(idempotencyKey)) {
    return { ok: false, formError: 'malformed', fieldErrors };
  }

  // --- Required: name ------------------------------------------------------
  const name = asString(body.name);
  if (!name) {
    fieldErrors.name = 'Enter the name we should use when we reply.';
  } else if (name.length > FIELD_LIMITS.name) {
    fieldErrors.name = `Use ${FIELD_LIMITS.name} characters or fewer.`;
  }

  // --- Required: work email ------------------------------------------------
  const email = asString(body.email);
  if (!email) {
    fieldErrors.email = 'Enter an email address so we can reply to you.';
  } else if (email.length > FIELD_LIMITS.email) {
    fieldErrors.email = `Use ${FIELD_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Enter an email address in the form name@company.com.';
  }

  // --- Required: company ---------------------------------------------------
  const company = asString(body.company);
  if (!company) {
    fieldErrors.company = 'Enter your company name. One word is enough.';
  } else if (company.length > FIELD_LIMITS.company) {
    fieldErrors.company = `Use ${FIELD_LIMITS.company} characters or fewer.`;
  }

  // --- Required: what you're trying to fix ---------------------------------
  const message = asString(body.message);
  if (!message) {
    fieldErrors.message = 'Tell us what you are trying to fix, in your own words.';
  } else if (message.length > FIELD_LIMITS.message) {
    fieldErrors.message = `Use ${FIELD_LIMITS.message} characters or fewer.`;
  }

  // --- Optional: phone / WhatsApp ------------------------------------------
  let phone: string | null = null;
  const phoneRaw = asString(body.phone);
  if (phoneRaw !== undefined && phoneRaw !== '') {
    if (phoneRaw.length > FIELD_LIMITS.phone) {
      fieldErrors.phone = `Use ${FIELD_LIMITS.phone} characters or fewer.`;
    } else if ((phoneRaw.match(/\d/g) ?? []).length < 6) {
      // Deliberately loose. International formats vary far too much to pattern
      // match, and this field is optional — a strict rule here would reject
      // valid numbers to catch junk that costs nothing to store.
      fieldErrors.phone = 'Enter a number we can reach you on, or leave this blank.';
    } else {
      phone = phoneRaw;
    }
  }

  // --- Optional: website ---------------------------------------------------
  let website: string | null = null;
  const websiteRaw = asString(body.website);
  if (websiteRaw !== undefined && websiteRaw !== '') {
    if (websiteRaw.length > FIELD_LIMITS.website) {
      fieldErrors.website = `Use ${FIELD_LIMITS.website} characters or fewer.`;
    } else {
      website = normaliseWebsite(websiteRaw);
      if (website === null) {
        fieldErrors.website = 'Enter a web address like acme.com, or leave this blank.';
      }
    }
  }

  // --- Optional: marketing consent -----------------------------------------
  // Must be a real boolean. Absent means not given, which is the default state
  // of an unticked, separate opt-in that is never a condition of submitting.
  const consentRaw = body.marketingConsent;
  if (consentRaw !== undefined && typeof consentRaw !== 'boolean') {
    return { ok: false, formError: 'malformed', fieldErrors };
  }
  const marketingConsent = consentRaw === true;

  // --- Context: the page the enquiry was sent from -------------------------
  // Replaces the removed "service interest" dropdown: `FORM_AND_BOOKING_SPEC.md`
  // §1.3 derives service/problem interest from the converting page rather than
  // asking. A same-origin path only — never a full URL, never a query string,
  // so nothing a third party controls and nothing bearing PII is stored. A bad
  // value is DROPPED, never an error: page context is not the visitor's problem.
  let sourcePage: string | null = null;
  const sourcePageRaw = asString(body.sourcePage);
  if (
    sourcePageRaw &&
    sourcePageRaw.startsWith('/') &&
    !sourcePageRaw.startsWith('//') &&
    !sourcePageRaw.includes('?') &&
    !sourcePageRaw.includes('#') &&
    sourcePageRaw.length <= FIELD_LIMITS.sourcePage
  ) {
    sourcePage = sourcePageRaw;
  }

  // --- Abuse layers 1 and 2 — FLAG ONLY, NEVER REJECT ----------------------
  // A hidden field a human cannot see, and an implausibly fast submission. Both
  // are cheap signals and both are wrong sometimes — a password manager can
  // fill a hidden input, and a returning visitor pasting prepared text can be
  // genuinely fast. `QUALIFIED_ENQUIRY_DEFINITION.md` §7A: uncertain is not
  // spam, and wrongly discarding a real buyer costs far more than a human
  // glance. So a hit is recorded on the row and the submission is stored and
  // answered exactly like any other. Per `FORM_AND_BOOKING_SPEC.md` §2 the
  // visitor sees the same success state either way, and nothing in the
  // response reveals that a layer fired.
  const honeypot = asString(body.contactReference);
  const honeypotTripped = honeypot !== undefined && honeypot !== '';

  const elapsedRaw = body.elapsedMs;
  const elapsedMs =
    typeof elapsedRaw === 'number' && Number.isFinite(elapsedRaw) ? elapsedRaw : null;
  const impossiblyFast =
    elapsedMs !== null && elapsedMs >= 0 && elapsedMs < MIN_PLAUSIBLE_ELAPSED_MS;

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      idempotencyKey: idempotencyKey.toLowerCase(),
      name: cleanLine(name as string),
      email: (email as string).toLowerCase(),
      company: cleanLine(company as string),
      message: cleanBlock(message as string),
      phone: phone === null ? null : cleanLine(phone),
      website,
      sourcePage,
      marketingConsent,
      suspect: honeypotTripped || impossiblyFast,
    },
  };
}
