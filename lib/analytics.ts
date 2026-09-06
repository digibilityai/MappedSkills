/**
 * SESSION 32 — PHASE H2 — the provider-independent analytics boundary.
 *
 * ONE SURFACE. Session 21 (`05_FORMS_ANALYTICS.md` §2.1) found THREE parallel,
 * uncoordinated event surfaces: `lib/gtm.tsx`, `lib/tracking.ts` and direct
 * `window.gtag(...)` calls inside route components. This module replaces them
 * with a single boundary that the application emits through and that knows
 * about exactly one thing: `window.dataLayer`.
 *
 * WHY `dataLayer` AND NOTHING ELSE. There is no `gtag`, no `fbq` and no vendor
 * SDK call anywhere below this line. The application's job is to state, in
 * approved vocabulary, WHAT HAPPENED. Deciding which vendor hears about it is
 * the tag manager's job — an external container this repository cannot see and
 * must not encode. That separation is what lets a provider be added, swapped or
 * removed without touching a route component, and it is what makes the consent
 * question tractable: `dataLayer` is a first-party JavaScript array in the
 * visitor's own tab. Pushing to it sets no cookie, writes no storage, sends no
 * request and identifies nobody. NOTHING IS PROCESSED UNTIL A CONTAINER LOADS,
 * and no container loads unless `NEXT_PUBLIC_GTM_ID` is configured.
 *
 * ANALYTICS FAILURE IS NON-BLOCKING — the mandatory H2 invariant. Every export
 * here swallows its own errors and returns `void`. Nothing awaits anything.
 * There is no code path in which a measurement failure can change what a
 * visitor sees or whether their enquiry is stored.
 *
 * NO PII. EVER. `EVENT_TAXONOMY.md` §7 prohibits, without exception: name,
 * email, phone, company, website, free-text message content, raw form values,
 * and any database identifier that could be resolved back to a person.
 * `sanitiseParams` below is a hard filter, not a convention — a value that is
 * not a string, number or boolean is dropped, strings are length-capped and
 * stripped of the characters an address needs to survive, and no caller can opt
 * out of it.
 */

/**
 * THE EVENT NAMES ARE THE APPROVED CONTRACT — `EVENT_TAXONOMY.md` §2, Gate 6 /
 * DEC-011. "Event names are a contract. Renaming breaks historical continuity.
 * Deprecate rather than rename." Every name below is taken from that document
 * unchanged; none was invented for this session, and the events that document
 * lists but this phase cannot yet fire honestly are simply absent rather than
 * approximated.
 */
export const EVENTS = {
  /**
   * Navigation. Diagnostic. CLIENT authority — it is a statement about a
   * browser, and it is never, under any circumstance, a conversion.
   */
  PAGE_VIEW: 'page_view',
  /** Funnel step. Diagnostic. Fires ONCE per mounted form. */
  LEAD_FORM_STARTED: 'lead_form_started',
  /** Diagnostic. Carries an error CATEGORY and a field NAME — never a value. */
  LEAD_FORM_VALIDATION_ERROR: 'lead_form_validation_error',
  /**
   * THE PRIMARY CONTACT CONVERSION, and the only conversion this phase emits.
   *
   * Its truth condition is `POST /api/enquiry` having returned 2xx, which
   * `app/api/enquiry/route.ts` does ONLY after MariaDB has acknowledged a
   * durable row. It is not a click, not a submit attempt, not a client
   * validation pass, not a fetch start and not a view of `/thank-you`.
   */
  LEAD_FORM_SUBMITTED: 'lead_form_submitted',
  /**
   * Diagnostic. `EVENT_TAXONOMY.md` §2 row 6, "Booking surface opened", and §4
   * lists it explicitly as NOT a business conversion. It means an outbound link
   * to the booking page was activated IN THIS BROWSER. It confirms no booking,
   * no meeting and no attendance — see `meeting_booked`, which this phase
   * cannot and does not emit.
   */
  MEETING_STARTED: 'meeting_started',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

/** The only value shapes an event parameter may carry. */
export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

/**
 * `page_type`, from `EVENT_TAXONOMY.md` §3 and `PAGE_TYPE_CRO_RULES.md`.
 * `other` is this phase's ONE extension, and it exists so that a route with no
 * approved page type — `/work`, `/portfolio/*`, `/faq`, `/terms`,
 * `/privacy-policy`, `/thank-you`, `/launch-checklist`, 404 — is reported
 * honestly as unclassified rather than pushed into the nearest approved bucket
 * it does not belong in. `page_path` still distinguishes them individually.
 */
export type PageType =
  | 'homepage'
  | 'commercial'
  | 'problem'
  | 'pricing'
  | 'methodology'
  | 'research'
  | 'editorial'
  | 'about'
  | 'contact'
  | 'booking'
  | 'other';

const COMMERCIAL_PATHS = new Set([
  '/services',
  '/seo',
  '/ai-seo',
  '/google-ads',
  '/social-media-ads',
  '/lead-generation',
  '/conversion-optimization',
]);

/**
 * Path to approved page type. A pure function of the PATH ONLY: it never sees a
 * query string, so no parameter a visitor or a campaign controls can influence
 * the category.
 */
export function pageTypeOf(path: string): PageType {
  if (path === '/') return 'homepage';
  if (COMMERCIAL_PATHS.has(path)) return 'commercial';
  if (path === '/problems' || path.startsWith('/problems/')) return 'problem';
  if (path === '/pricing') return 'pricing';
  if (path === '/how-it-works') return 'methodology';
  if (path === '/research' || path.startsWith('/research/')) return 'research';
  if (path === '/blog' || path.startsWith('/blog/')) return 'editorial';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/schedule-call') return 'booking';
  return 'other';
}

/**
 * `page_path` — PATH ONLY, NEVER A URL WITH A QUERY STRING.
 * `EVENT_TAXONOMY.md` §7 names the query string specifically, because it is the
 * one part of a location that routinely carries identifiers: an email in a
 * `utm_content`, a session token, a click id. Anything from `?` or `#` onwards
 * is removed here rather than at each call site, so no caller can forget.
 */
export function safePagePath(pathOrUrl: string): string {
  const withoutHash = pathOrUrl.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  if (!withoutQuery.startsWith('/')) return '/';
  return withoutQuery.slice(0, 255);
}

/** Longest string any single analytics parameter may carry. */
const MAX_PARAM_LENGTH = 100;

/** C0 and C1 control characters. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;

/**
 * The hard filter. Applied to EVERY parameter of EVERY event, with no way for a
 * caller to bypass it.
 *
 *   - `undefined` and `null` are dropped, so an absent value is absent rather
 *     than the string "undefined".
 *   - Anything that is not a string, finite number or boolean is dropped. An
 *     object or an array cannot be flattened into a payload by accident, which
 *     is how raw form values reach analytics in practice.
 *   - Strings are stripped of control characters, of `@`, and of `<` and `>`,
 *     then capped at 100 characters. `@` matters specifically: without it an
 *     email address cannot survive intact inside a campaign value, which is the
 *     realistic route by which PII enters a UTM. `<` and `>` mean a value can
 *     never be interpolated into markup as an element.
 */
export function sanitiseParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'boolean') {
      clean[key] = value;
    } else if (typeof value === 'number') {
      if (Number.isFinite(value)) clean[key] = value;
    } else if (typeof value === 'string') {
      const trimmed = value
        .replace(CONTROL_CHARS, '')
        .replace(/[@<>]/g, '')
        .trim()
        .slice(0, MAX_PARAM_LENGTH);
      if (trimmed !== '') clean[key] = trimmed;
    }
  }
  return clean;
}

/**
 * Environment, on every event. A container can exclude non-production traffic
 * with one trigger condition, so a developer running locally with a real
 * container id configured cannot silently pollute a production property.
 */
function environment(): 'production' | 'development' {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

/**
 * THE ONLY WRITE TO `dataLayer` IN THIS APPLICATION.
 *
 * The array is CREATED IF ABSENT rather than skipped. That is deliberate and it
 * is what makes the conversion event survive a slow network: GTM's own snippet
 * begins `w[l]=w[l]||[]` and its container reads whatever is already queued when
 * it finishes loading. If the boundary instead did nothing when `dataLayer` was
 * missing — as the helper this file replaces did — an enquiry completed before
 * `gtm.js` finished executing would be silently lost. If no container ever
 * loads, the array simply holds a few objects in the tab's memory and nothing
 * observes them, which is precisely the inert behaviour required while no
 * provider is configured and no consent mechanism exists.
 *
 * It cannot throw. Every failure mode — a frozen `window`, a `dataLayer` that
 * some other script replaced with a non-array, a serialisation error — is
 * swallowed here, because analytics failure must never reach the visitor.
 */
export function track(event: EventName, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const target = window as unknown as { dataLayer?: unknown[] };
    if (!Array.isArray(target.dataLayer)) target.dataLayer = [];
    target.dataLayer.push({
      event,
      environment: environment(),
      ...sanitiseParams(params),
    });
  } catch {
    /* Measurement never breaks the page. */
  }
}

/** Namespace for the one-shot markers, so nothing else in storage collides. */
const ONCE_PREFIX = 'ms.h2.once.';

/**
 * ONE-SHOT GUARD, for events that must not repeat for the same underlying
 * occurrence — today, exactly one: the contact conversion.
 *
 * `sessionStorage` rather than a React ref, because the duplicates that matter
 * outlive a component: a remount, a bfcache restore, a back-navigation into a
 * form that still holds its state. It is scoped to the tab and cleared when the
 * tab closes, which is the correct lifetime for "this enquiry has already been
 * counted".
 *
 * THE TOKEN NEVER LEAVES THIS FUNCTION. The caller passes the enquiry's
 * idempotency key, which IS stored against the row in MariaDB and is therefore
 * resolvable to a person. It is used here only as a local comparison key and is
 * never included in an event payload — a database identifier linkable to PII
 * must not enter analytics, and that is enforced by this function not returning
 * it and by no caller having a reason to.
 *
 * Fails OPEN. If `sessionStorage` is unavailable — a private window, disabled
 * site data, a sandboxed frame — the event is emitted rather than suppressed. A
 * conversion measured twice is a reporting defect; one silently never measured
 * is worse, and the in-flight guard in `ContactForm` already makes a second 2xx
 * for the same key impossible within one mounted form.
 */
export function trackOnce(event: EventName, token: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  let alreadySent = false;
  try {
    const key = `${ONCE_PREFIX}${event}.${token}`;
    if (window.sessionStorage.getItem(key) === '1') {
      alreadySent = true;
    } else {
      window.sessionStorage.setItem(key, '1');
    }
  } catch {
    /* Storage unavailable — fail open and emit. */
  }
  if (!alreadySent) track(event, params);
}
