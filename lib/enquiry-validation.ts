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
 * guessed. A non-empty message is required on an enquiry (optional on a call
 * request, DEC-062); a number invented here would be
 * invented precision, which this programme forbids.
 */

import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  EMAIL_PATTERN as CONTACT_EMAIL_PATTERN,
  normalisePhone,
  serviceLabelOf,
} from '@/lib/contact-request';

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
  /** SESSION 32 — H2. Matches the VARCHAR widths in migration 002. */
  attributionValue: 100,
  attributionPath: 255,
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

export type FieldName =
  | 'name'
  | 'email'
  | 'company'
  | 'message'
  | 'phone'
  | 'website'
  | 'service'
  | 'preferredContactTime';

/**
 * SESSION 32 — PHASE H2 — the acquisition context stored on the enquiry row.
 *
 * RE-VALIDATED HERE, NOT TRUSTED. `lib/attribution.ts` sanitises in the browser
 * so that what is sent is already small and clean; that is a convenience and it
 * is not evidence. Every value below is parsed, filtered and capped again from
 * the raw request body, exactly as the visitor-facing fields are, because the
 * request is an untrusted input regardless of which of our own files composed it.
 *
 * MISSING OR MALFORMED ATTRIBUTION NEVER FAILS A SUBMISSION. There is no field
 * error, no form error and no rejection path in this section. A bad value is
 * DROPPED to `null` and the enquiry proceeds. `ATTRIBUTION_MODEL.md` §1 and
 * `QUALIFIED_ENQUIRY_DEFINITION.md` §2A make attribution completeness and
 * qualification independent: measurement is reported, never enforced.
 */
export interface ValidatedAttribution {
  firstLandingPage: string | null;
  firstReferrerHost: string | null;
  firstSource: string | null;
  firstMedium: string | null;
  firstCampaign: string | null;
  firstContent: string | null;
  firstTerm: string | null;
  firstTouchAt: Date | null;
  firstSourceDerived: boolean | null;
  latestSource: string | null;
  latestMedium: string | null;
  latestCampaign: string | null;
  latestReferrerHost: string | null;
  status: 'complete' | 'partial' | 'unavailable';
}

/** What is stored when nothing usable arrived. Honest, not empty-by-accident. */
export const UNATTRIBUTED: ValidatedAttribution = {
  firstLandingPage: null,
  firstReferrerHost: null,
  firstSource: null,
  firstMedium: null,
  firstCampaign: null,
  firstContent: null,
  firstTerm: null,
  firstTouchAt: null,
  firstSourceDerived: null,
  latestSource: null,
  latestMedium: null,
  latestCampaign: null,
  latestReferrerHost: null,
  status: 'unavailable',
};

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
  /** SESSION 32 — H2. Never null: `UNATTRIBUTED` when nothing was captured. */
  attribution: ValidatedAttribution;
  /**
   * C1 (DEC-071). The visitor's intention. Always set: the consolidated form sends it, and the two earlier forms map
   * to it (`requestType: 'call'` → call, otherwise enquiry).
   */
  requestType: 'enquiry' | 'call';
  /** C1. The stable service value from `SERVICE_OPTIONS`; null from the earlier forms, which did not ask. */
  service: string | null;
  /** C1. The display label of `service` at submission time, for the CRM message lines; null with `service`. */
  serviceLabel: string | null;
  /** C1. Free text ("Weekdays, 2–5 PM IST"); call requests only, optional. Never a reservation. */
  preferredContactTime: string | null;
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

/**
 * SESSION 32 — PHASE H2 — one attribution value, re-cleaned server-side.
 *
 * The same conservative allow-list `lib/attribution.ts` applies in the browser,
 * applied again here because the browser's copy is a convenience and this one is
 * the authority. `@` is excluded specifically so an email address cannot survive
 * intact inside a campaign value — the realistic route by which PII enters
 * campaign data — and `<` / `>` are excluded so a stored value can never be
 * interpolated into markup as an element wherever it is later displayed.
 */
function attributionValue(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const cleaned = raw
    .toLowerCase()
    .replace(CONTROL_CHARS, '')
    .replace(/[^a-z0-9 ._\-|+/:]/g, '')
    .trim()
    .slice(0, FIELD_LIMITS.attributionValue);
  return cleaned === '' ? null : cleaned;
}

/**
 * A same-origin PATH, on the same terms as `sourcePage`: no scheme, no host, no
 * query string, no fragment. Anything else is dropped rather than corrected,
 * because a landing page that cannot be trusted is worth less than nothing.
 */
function attributionPath(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const value = raw.trim();
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('?') ||
    value.includes('#') ||
    value.length > FIELD_LIMITS.attributionPath
  ) {
    return null;
  }
  return cleanLine(value);
}

/**
 * Parses the attribution object off a submission.
 *
 * IT CANNOT FAIL A SUBMISSION. There is no error return. Absent, null, an array,
 * a string, a number or an object full of rubbish all produce `UNATTRIBUTED`,
 * and the enquiry is stored and treated exactly as any other. That is the direct
 * expression of `ATTRIBUTION_MODEL.md` §1: this model's job is to capture what is
 * reliably available and to make what is missing visible, "never to gate the
 * conversion".
 *
 * `status` IS RECOMPUTED, NOT ACCEPTED. A client-supplied `complete` is ignored;
 * the flag is derived from what actually survived validation here, so it can
 * never claim more context than is stored beside it.
 */
function parseAttribution(raw: unknown): ValidatedAttribution {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return UNATTRIBUTED;
  const input = raw as Record<string, unknown>;

  const firstSource = attributionValue(input.firstSource);
  const derivedRaw = input.firstSourceDerived;
  const firstSourceDerived = typeof derivedRaw === 'boolean' ? derivedRaw : null;

  let firstTouchAt: Date | null = null;
  if (typeof input.firstTouchAt === 'string') {
    const parsed = new Date(input.firstTouchAt);
    // A timestamp the server cannot parse, or one from the future or the distant
    // past, is discarded rather than stored as a fact about when someone arrived.
    const now = Date.now();
    if (
      !Number.isNaN(parsed.getTime()) &&
      parsed.getTime() <= now + 60_000 &&
      parsed.getTime() > now - 365 * 24 * 60 * 60 * 1000
    ) {
      firstTouchAt = parsed;
    }
  }

  // Derived from what is actually held, never from what was claimed:
  //   complete    — a source was DECLARED in a UTM (not derived)
  //   partial     — a source was DERIVED from a referrer or a click identifier
  //   unavailable — no source, or only the honest `direct` residual
  let status: ValidatedAttribution['status'] = 'unavailable';
  if (firstSource && firstSource !== 'direct') {
    status = firstSourceDerived === false ? 'complete' : 'partial';
  }

  return {
    firstLandingPage: attributionPath(input.firstLandingPage),
    firstReferrerHost: attributionValue(input.firstReferrerHost),
    firstSource,
    firstMedium: attributionValue(input.firstMedium),
    firstCampaign: attributionValue(input.firstCampaign),
    firstContent: attributionValue(input.firstContent),
    firstTerm: attributionValue(input.firstTerm),
    firstTouchAt,
    firstSourceDerived,
    latestSource: attributionValue(input.latestSource),
    latestMedium: attributionValue(input.latestMedium),
    latestCampaign: attributionValue(input.latestCampaign),
    latestReferrerHost: attributionValue(input.latestReferrerHost),
    status,
  };
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

  // --- C1 (DEC-071): the consolidated /contact form ------------------------
  // It always sends `service`; the two earlier forms never did. Their rules below are unchanged, so a page loaded
  // before a release (or any other existing client) keeps working exactly as before.
  if (body.service !== undefined) {
    return validateContactRequest(body, idempotencyKey);
  }

  // --- Request type --------------------------------------------------------
  // DEC-062. `'call'` is the /schedule-call "Request a call" form: name, email and phone are required, and the message
  // is optional. Company is not asked for. Absent means the original enquiry form, so every existing client is
  // unchanged. Anything else is a client defect, so it fails the request like a bad idempotency key.
  const requestTypeRaw = body.requestType;
  if (requestTypeRaw !== undefined && requestTypeRaw !== 'enquiry' && requestTypeRaw !== 'call') {
    return { ok: false, formError: 'malformed', fieldErrors };
  }
  const isCall = requestTypeRaw === 'call';

  // --- Required: name ------------------------------------------------------
  const name = asString(body.name);
  if (!name) {
    fieldErrors.name = isCall
      ? 'Enter the name we should use when we get in touch.'
      : 'Enter the name we should use when we reply.';
  } else if (name.length > FIELD_LIMITS.name) {
    fieldErrors.name = `Use ${FIELD_LIMITS.name} characters or fewer.`;
  }

  // --- Required: work email ------------------------------------------------
  const email = asString(body.email);
  if (!email) {
    fieldErrors.email = isCall
      ? 'Enter an email address so we can get in touch.'
      : 'Enter an email address so we can reply to you.';
  } else if (email.length > FIELD_LIMITS.email) {
    fieldErrors.email = `Use ${FIELD_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Enter an email address in the form name@company.com.';
  }

  // --- Company: required on an enquiry; not collected on a call request ----
  // A call request stores '' (the column is NOT NULL), so no migration is needed. A company sent with a call request
  // is ignored rather than stored: the form does not ask for one.
  let company = '';
  if (!isCall) {
    const companyRaw = asString(body.company);
    if (!companyRaw) {
      fieldErrors.company = 'Enter your company name. One word is enough.';
    } else if (companyRaw.length > FIELD_LIMITS.company) {
      fieldErrors.company = `Use ${FIELD_LIMITS.company} characters or fewer.`;
    } else {
      company = companyRaw;
    }
  }

  // --- Message: required on an enquiry; optional on a call request ---------
  // An empty optional message is stored as '' (the column is NOT NULL).
  const message = asString(body.message) ?? '';
  if (!message && !isCall) {
    fieldErrors.message = 'Tell us what you are trying to fix, in your own words.';
  } else if (message.length > FIELD_LIMITS.message) {
    fieldErrors.message = `Use ${FIELD_LIMITS.message} characters or fewer.`;
  }

  // --- Phone / WhatsApp: optional on an enquiry; required on a call request -
  let phone: string | null = null;
  const phoneRaw = asString(body.phone);
  if (phoneRaw !== undefined && phoneRaw !== '') {
    if (phoneRaw.length > FIELD_LIMITS.phone) {
      fieldErrors.phone = `Use ${FIELD_LIMITS.phone} characters or fewer.`;
    } else if ((phoneRaw.match(/\d/g) ?? []).length < 6) {
      // Deliberately loose. International formats vary far too much to pattern
      // match, and a strict rule here would reject valid numbers to catch junk
      // that costs nothing to store.
      fieldErrors.phone = isCall
        ? 'Enter a number we can reach you on, including the country code.'
        : 'Enter a number we can reach you on, or leave this blank.';
    } else {
      phone = phoneRaw;
    }
  } else if (isCall) {
    fieldErrors.phone = 'Enter a number we can reach you on, including the country code.';
  }

  // --- Optional: website (not collected on a call request) -----------------
  let website: string | null = null;
  const websiteRaw = isCall ? undefined : asString(body.website);
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
  const sourcePage = parseSourcePage(body.sourcePage);

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
  const suspect = isSuspect(body);

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      idempotencyKey: idempotencyKey.toLowerCase(),
      name: cleanLine(name as string),
      email: (email as string).toLowerCase(),
      company: cleanLine(company),
      message: cleanBlock(message),
      phone: phone === null ? null : cleanLine(phone),
      website,
      sourcePage,
      marketingConsent,
      suspect,
      attribution: parseAttribution(body.attribution),
      requestType: isCall ? 'call' : 'enquiry',
      service: null,
      serviceLabel: null,
      preferredContactTime: null,
    },
  };
}

/**
 * The page the submission was sent from. Replaces the removed "service interest" dropdown of the original form:
 * `FORM_AND_BOOKING_SPEC.md` §1.3 derives interest from the converting page. A same-origin path only — never a full
 * URL, never a query string, so nothing a third party controls and nothing bearing PII is stored. A bad value is
 * DROPPED, never an error: page context is not the visitor's problem.
 */
function parseSourcePage(raw: unknown): string | null {
  const value = asString(raw);
  if (
    value &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('?') &&
    !value.includes('#') &&
    value.length <= FIELD_LIMITS.sourcePage
  ) {
    return value;
  }
  return null;
}

/**
 * Abuse layers 1 and 2 — FLAG ONLY, NEVER REJECT. A hidden field a human cannot see, and an implausibly fast
 * submission. Both are cheap signals and both are wrong sometimes — a password manager can fill a hidden input, and a
 * returning visitor pasting prepared text can be genuinely fast. `QUALIFIED_ENQUIRY_DEFINITION.md` §7A: uncertain is
 * not spam. A hit is recorded on the row and the submission is stored and answered exactly like any other; per
 * `FORM_AND_BOOKING_SPEC.md` §2 nothing in the response reveals that a layer fired.
 */
function isSuspect(body: Record<string, unknown>): boolean {
  const honeypot = asString(body.contactReference);
  const honeypotTripped = honeypot !== undefined && honeypot !== '';

  const elapsedRaw = body.elapsedMs;
  const elapsedMs =
    typeof elapsedRaw === 'number' && Number.isFinite(elapsedRaw) ? elapsedRaw : null;
  const impossiblyFast =
    elapsedMs !== null && elapsedMs >= 0 && elapsedMs < MIN_PLAUSIBLE_ELAPSED_MS;

  return honeypotTripped || impossiblyFast;
}

/**
 * C1 (DEC-071) — the consolidated `/contact` form: one form, two intentions (`requestType` 'enquiry' | 'call').
 * Required: full name, business email, phone / WhatsApp (normalised to E.164 by `normalisePhone`) and the service.
 * Optional: the message and, on a call request only, the preferred time to be contacted (ignored and not stored on an
 * enquiry). Company, website and marketing consent are not asked for: company is stored as '' (the column is NOT
 * NULL), website as null, consent as not given. Same honeypot, timing flag, attribution and source-page handling as
 * the earlier forms.
 */
function validateContactRequest(body: Record<string, unknown>, idempotencyKey: string): ValidationResult {
  const fieldErrors: Partial<Record<FieldName, string>> = {};

  // A missing or unknown intention, or a non-boolean consent value, is a client defect, not a visitor's mistake.
  const requestType = body.requestType;
  if (requestType !== 'enquiry' && requestType !== 'call') {
    return { ok: false, formError: 'malformed', fieldErrors };
  }
  if (body.marketingConsent !== undefined && typeof body.marketingConsent !== 'boolean') {
    return { ok: false, formError: 'malformed', fieldErrors };
  }

  const name = asString(body.name);
  if (!name) {
    fieldErrors.name = CONTACT_MESSAGES.nameRequired;
  } else if (name.length > CONTACT_LIMITS.name) {
    fieldErrors.name = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS.name);
  }

  const email = asString(body.email);
  if (!email) {
    fieldErrors.email = CONTACT_MESSAGES.emailRequired;
  } else if (email.length > CONTACT_LIMITS.email) {
    fieldErrors.email = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS.email);
  } else if (!CONTACT_EMAIL_PATTERN.test(email)) {
    fieldErrors.email = CONTACT_MESSAGES.emailFormat;
  }

  let phone: string | null = null;
  const phoneRaw = asString(body.phone);
  if (!phoneRaw) {
    fieldErrors.phone = CONTACT_MESSAGES.phoneRequired;
  } else if (phoneRaw.length > CONTACT_LIMITS.phone) {
    fieldErrors.phone = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS.phone);
  } else {
    phone = normalisePhone(phoneRaw);
    if (phone === null) fieldErrors.phone = CONTACT_MESSAGES.phoneFormat;
  }

  // Only a value from SERVICE_OPTIONS is accepted; the stored value is the stable key, never the label.
  const service = asString(body.service) ?? '';
  const serviceLabel = serviceLabelOf(service);
  if (serviceLabel === null) {
    fieldErrors.service = CONTACT_MESSAGES.serviceRequired;
  }

  const message = asString(body.message) ?? '';
  if (message.length > CONTACT_LIMITS.message) {
    fieldErrors.message = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS.message);
  }

  // A preference, not a reservation. Sent with an enquiry (the form keeps the value when the visitor switches), it is
  // ignored: the visitor did not ask for a call.
  let preferredContactTime: string | null = null;
  if (requestType === 'call') {
    const time = asString(body.preferredContactTime) ?? '';
    if (time.length > CONTACT_LIMITS.preferredContactTime) {
      fieldErrors.preferredContactTime = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS.preferredContactTime);
    } else if (time) {
      preferredContactTime = cleanLine(time);
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      idempotencyKey: idempotencyKey.toLowerCase(),
      name: cleanLine(name as string),
      email: (email as string).toLowerCase(),
      company: '',
      message: cleanBlock(message),
      phone,
      website: null,
      sourcePage: parseSourcePage(body.sourcePage),
      marketingConsent: false,
      suspect: isSuspect(body),
      attribution: parseAttribution(body.attribution),
      requestType,
      service,
      serviceLabel,
      preferredContactTime,
    },
  };
}
