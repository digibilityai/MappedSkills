/**
 * SESSION 31 — PHASE H1 — POST /api/enquiry.
 *
 * THE ONE INVARIANT THIS FILE EXISTS TO HOLD:
 *
 *   NO SUCCESS RESPONSE UNLESS A DURABLE ROW EXISTS.
 *
 * `POST_SUBMISSION_AND_FOLLOWUP.md` §0 fixes the processing order and makes
 * persistence the ONLY step permitted to block the response:
 *
 *   1. receive  2. validate + screen + PERSIST  3. return success
 *   4. then, asynchronously: notification, acknowledgement, CRM, conversion event
 *
 * Step 4 has no members today. No transactional email provider is configured
 * (session brief §18), so nothing is queued, nothing is retried, and — this is
 * the part that matters — NOTHING IN STEP 4 CAN AFFECT THE VISITOR'S RESULT.
 * The success contract depends on the database and on nothing else, which is
 * exactly why email being unresolved does not block this phase.
 *
 * WHAT REPLACED WHAT. Before this file existed, `ContactForm.tsx` awaited a
 * 1000 ms timer and then showed a success screen. There was no endpoint, no
 * request and no record: every enquiry was lost while the visitor was told it
 * had worked. That path is deleted, not disabled.
 *
 * `force-dynamic` because a route handler that writes to a database must never
 * be prerendered or cached. `nodejs` because the MariaDB driver needs sockets.
 */
import { NextResponse } from 'next/server';

import { DbConfigError } from '@/lib/db';
import { insertEnquiry } from '@/lib/enquiries';
import {
  MARKETING_CONSENT_TEXT_V1,
  MAX_BODY_BYTES,
  validateEnquiry,
} from '@/lib/enquiry-validation';
import { allowSubmission, clientAddress } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Every response body this route can produce. Deliberately a closed set of
 * machine-readable codes with no server detail in them: no SQL text, no driver
 * message, no table name, no stack, no connection information. §17 of the
 * session brief, and the general rule that an error page is not the place to
 * describe the database to the internet.
 */
type ErrorCode =
  | 'malformed'
  | 'validation'
  | 'too_large'
  | 'unsupported_media_type'
  | 'rate_limited'
  | 'unavailable';

function fail(code: ErrorCode, status: number, fieldErrors?: Record<string, string>) {
  return NextResponse.json(
    fieldErrors ? { ok: false, error: code, fieldErrors } : { ok: false, error: code },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request): Promise<Response> {
  // --- Layer 4a: address rate limit, before any parsing --------------------
  // Counted for EVERY request including malformed ones, so a flood of junk
  // bodies is throttled rather than merely rejected one at a time.
  const address = clientAddress(request.headers);
  if (!allowSubmission({ address, email: null })) {
    return fail('rate_limited', 429);
  }

  // --- Content type --------------------------------------------------------
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return fail('unsupported_media_type', 415);
  }

  // --- Request size --------------------------------------------------------
  // The declared length is checked first so an oversized body can be refused
  // without being read, and the actual text is checked afterwards because the
  // header is optional and can lie.
  const declaredLength = Number.parseInt(request.headers.get('content-length') ?? '', 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return fail('too_large', 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail('malformed', 400);
  }
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    return fail('too_large', 413);
  }

  // --- Parse ---------------------------------------------------------------
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return fail('malformed', 400);
  }

  // --- Validate, on the server, from scratch -------------------------------
  const result = validateEnquiry(parsed);
  if (!result.ok) {
    if (result.formError === 'malformed') return fail('malformed', 400);
    return fail('validation', 400, result.fieldErrors as Record<string, string>);
  }
  const enquiry = result.value;

  // --- Layer 4b: email rate limit ------------------------------------------
  if (!allowSubmission({ address: null, email: enquiry.email })) {
    return fail('rate_limited', 429);
  }

  // --- Persist. The only step allowed to block the response ----------------
  try {
    const outcome = await insertEnquiry({
      idempotencyKey: enquiry.idempotencyKey,
      name: enquiry.name,
      email: enquiry.email,
      company: enquiry.company,
      message: enquiry.message,
      phone: enquiry.phone,
      website: enquiry.website,
      sourcePage: enquiry.sourcePage,
      marketingConsent: enquiry.marketingConsent,
      marketingConsentText: MARKETING_CONSENT_TEXT_V1,
      // A flagged submission is stored and answered like any other. The flag is
      // for a human; it never changes what the visitor sees.
      screening: enquiry.suspect ? 'suspect' : 'clean',
    });

    // `created` and `duplicate` are BOTH success, and for the same reason: a
    // row bearing this idempotency key is durably in the database either way.
    // `duplicate` is the double-click, the browser retry and the network retry
    // — the enquiry arrived once and was stored once, so telling the visitor it
    // failed would be false.
    void outcome;
  } catch (error) {
    // Categories only. The driver's message can carry the database user and
    // host, and submitted values can appear in a constraint error, so neither
    // the message nor the parameters are logged.
    if (error instanceof DbConfigError) {
      console.error('[enquiry] persistence unavailable: configuration incomplete', {
        missing: error.missing.join(','),
      });
    } else {
      console.error('[enquiry] persistence failed', {
        code: (error as { code?: string })?.code ?? 'unknown',
      });
    }
    // The visitor is told the truth: it did not go through. No redirect, no
    // success state, and the form keeps every value they typed.
    return fail('unavailable', 503);
  }

  // Reached only after the database acknowledged the write.
  //
  // The body carries no record id and no submitted value. Nothing here, and
  // nothing on the destination page, is derived from PII — the id stays
  // server-side because the visitor has no use for it, and an opaque public
  // reference is H2's to introduce alongside the analytics that would need one.
  return NextResponse.json(
    { ok: true },
    { status: 201, headers: { 'Cache-Control': 'no-store' } }
  );
}

/**
 * Anything that is not a POST. Declared explicitly so the route answers 405
 * with an `Allow` header rather than Next's generic handling, and so a GET —
 * the shape a crawler or a curious visitor will try — never touches the pool.
 */
function methodNotAllowed(): Response {
  return NextResponse.json(
    { ok: false, error: 'method_not_allowed' },
    { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } }
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
