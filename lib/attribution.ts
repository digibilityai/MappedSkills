/**
 * SESSION 32 — PHASE H2 — acquisition attribution capture.
 *
 * WHAT THIS IS FOR. `ATTRIBUTION_MODEL.md` (Gate 6 / DEC-011) requires that a
 * qualified enquiry can be traced back to the acquisition that produced it, and
 * requires the model to STATE ITS OWN LIMITS rather than overclaim. This module
 * captures the smallest set of acquisition context that is genuinely available
 * in a browser, and the enquiry endpoint stores it on the row.
 *
 * FOUR RULES THAT ARE NOT NEGOTIABLE HERE:
 *
 *  1. ATTRIBUTION IS NOT A QUALIFICATION CONDITION. `ATTRIBUTION_MODEL.md` §1
 *     and `QUALIFIED_ENQUIRY_DEFINITION.md` §2A make `attribution_status` and
 *     qualification independent dimensions. Nothing in this module can cause a
 *     submission to fail, be delayed, or be downgraded. Every function returns a
 *     value or `null`; none throws, and the caller treats absence as normal.
 *  2. INTERNAL NAVIGATION MUST NEVER OVERWRITE ACQUISITION ATTRIBUTION —
 *     §5, "the most commonly broken rule in practice". UTM values are read ONLY
 *     when the referrer is external or absent, and the site's own hosts are
 *     excluded as referrers. `www.mappedskills.com` currently answers 200 rather
 *     than redirecting, and `testing.mappedskills.com` has been observed being
 *     cited externally, so same-site detection is by registrable domain rather
 *     than by exact host.
 *  3. FIRST-TOUCH IS WRITE-ONCE. A later acquisition updates LATEST-touch only.
 *  4. EVERY DERIVED VALUE IS FLAGGED AS DERIVED. "A derived attribution and a
 *     declared one must never be indistinguishable in a report" (§6).
 *
 * ------------------------------------------------------------------------
 * TWO DELIBERATE NARROWINGS OF THE APPROVED MODEL, BOTH RECORDED RATHER THAN
 * QUIETLY TAKEN. Each is a reduction in what is collected, never an expansion.
 *
 * A. SESSION-SCOPED STORAGE, NOT CROSS-SESSION.
 *    `ATTRIBUTION_MODEL.md` §4 specifies a first-touch that "persists across
 *    sessions for a defined window". That window would be `localStorage` or a
 *    cookie — device storage that outlives the visit — and NO CONSENT MECHANISM
 *    EXISTS ON THIS SITE. Choosing whether persistent device storage may be
 *    written before consent is a LEGAL question this programme has recorded as
 *    owner input, and it is not one an implementation session may answer by
 *    picking a default. `sessionStorage` is used instead: it is cleared when the
 *    tab closes, and it captures the realistic case — arrive from a campaign,
 *    read, enquire in the same visit.
 *    CONSEQUENCE, STATED: a visitor who arrives from a campaign today and
 *    enquires next week is recorded as `direct`. That is a REAL undercount of
 *    campaign attribution and it must not be presented as anything else. It is
 *    resolvable the moment the consent decision exists; the storage swap is one
 *    function.
 *
 * B. CLICK IDENTIFIER VALUES ARE NEVER STORED.
 *    `gclid`, `fbclid` and `msclkid` are per-click advertising identifiers. They
 *    do not appear in `ATTRIBUTION_MODEL.md`'s field list, no paid campaign is
 *    running, and storing one against a record containing a name, an email and a
 *    phone number is the highest-privacy-cost field in the whole set. Their
 *    PRESENCE is used to DERIVE a channel — `google/cpc`, `facebook/paid_social`,
 *    `bing/cpc` — and the value itself is discarded in this file and never
 *    reaches the network, the database or an analytics payload.
 *    CONSEQUENCE, STATED: offline conversion import into Google Ads or Meta is
 *    NOT possible with what is stored. That capability requires the identifier,
 *    and therefore requires an explicit owner decision with the consent question
 *    settled. Recorded as deferred, not as done.
 */

/** The one key. Namespaced so nothing else in session storage collides. */
const STORAGE_KEY = 'ms.h2.attribution.v1';

/** Every captured string is capped. A campaign value is a label, not a payload. */
const MAX_VALUE_LENGTH = 100;

/**
 * `complete` / `partial` / `unavailable` — `ATTRIBUTION_MODEL.md` §3.3. It
 * records how much acquisition context was captured and NOTHING about the
 * quality of the enquiry. §3.3: "This flag exists so that measurement gaps are
 * reported, not so that enquiries can be excluded."
 */
export type AttributionStatus = 'complete' | 'partial' | 'unavailable';

/** What is captured, sent with a submission, and stored on the enquiry row. */
export interface AttributionPayload {
  /** Path of the first page seen in this session. Never a query string. */
  firstLandingPage: string | null;
  /** HOST ONLY — see `externalReferrerHost`. Never a full referrer URL. */
  firstReferrerHost: string | null;
  firstSource: string | null;
  firstMedium: string | null;
  firstCampaign: string | null;
  firstContent: string | null;
  firstTerm: string | null;
  /** ISO 8601. When the first acquisition context in this session was recorded. */
  firstTouchAt: string | null;
  /**
   * True when first-touch source/medium was INFERRED from a referrer or the
   * presence of a click identifier, rather than DECLARED in a `utm_source`.
   * §6: a derived attribution and a declared one must never look alike.
   */
  firstSourceDerived: boolean;
  latestSource: string | null;
  latestMedium: string | null;
  latestCampaign: string | null;
  latestReferrerHost: string | null;
  status: AttributionStatus;
}

/** An empty, honest payload. Used whenever nothing can be established. */
export const EMPTY_ATTRIBUTION: AttributionPayload = {
  firstLandingPage: null,
  firstReferrerHost: null,
  firstSource: null,
  firstMedium: null,
  firstCampaign: null,
  firstContent: null,
  firstTerm: null,
  firstTouchAt: null,
  firstSourceDerived: false,
  latestSource: null,
  latestMedium: null,
  latestCampaign: null,
  latestReferrerHost: null,
  status: 'unavailable',
};

/**
 * Conservative allow-list for a captured campaign value.
 *
 * A UTM is written by whoever built the link, which includes anyone who shares
 * one. Lowercasing is required by `EVENT_TAXONOMY.md` §3; the character filter
 * is a privacy control rather than a formatting one. `@` is excluded so an email
 * address cannot survive intact inside `utm_content`, which is the realistic way
 * PII enters campaign data; `<` and `>` are excluded so a value can never become
 * markup wherever it is later rendered.
 */
function cleanValue(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw
    .toLowerCase()
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[^a-z0-9 ._\-|+/:]/g, '')
    .trim()
    .slice(0, MAX_VALUE_LENGTH);
  return cleaned === '' ? null : cleaned;
}

/**
 * Registrable-ish domain: the last two labels of a hostname. Used for same-site
 * detection, so `www.`, `testing.` and any other subdomain of the site's own
 * domain are all recognised as internal without hard-coding a host list that
 * would go stale.
 */
function baseDomain(hostname: string): string {
  const labels = hostname.toLowerCase().split('.');
  return labels.length <= 2 ? labels.join('.') : labels.slice(-2).join('.');
}

/**
 * The referrer's HOST, and only when it is genuinely external.
 *
 * HOST ONLY, NEVER THE FULL REFERRER. A referrer URL carries a path and a query
 * string, and query strings carry identifiers — the exact reason
 * `EVENT_TAXONOMY.md` §7 bans them from `page_path`. The host is what channel
 * reporting actually needs, so the rest is discarded here and never stored.
 *
 * Returns `null` for: an absent referrer, an unparseable one, and any host on
 * the site's own registrable domain (rule 2 in the header).
 */
export function externalReferrerHost(referrer: string, currentHostname: string): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (!host) return null;
    if (host === currentHostname.toLowerCase()) return null;
    if (baseDomain(host) === baseDomain(currentHostname)) return null;
    return host.slice(0, MAX_VALUE_LENGTH);
  } catch {
    return null;
  }
}

/** Known search hosts, for the one derivation that is safe to make. */
const SEARCH_HOSTS = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|yandex\.[a-z.]+|ecosia\.org|baidu\.com|brave\.com)$/;

/**
 * Source and medium from an external referrer, per `ATTRIBUTION_MODEL.md` §6.
 *
 * A search-engine referrer gives `medium = organic` with the engine as source.
 * QUERY TERMS ARE NOT AVAILABLE AND ARE NOT INFERRED — §6 says so explicitly,
 * and inventing a term here would be exactly the fabricated precision this
 * programme forbids. Everything else is `referral` with the host as source,
 * which keeps the strategically important directory/listing traffic visible
 * rather than lost inside an undifferentiated bucket.
 */
function derivedFromReferrer(host: string): { source: string; medium: string } {
  if (SEARCH_HOSTS.test(host)) {
    return { source: host.replace(/^www\./, ''), medium: 'organic' };
  }
  return { source: host.replace(/^www\./, ''), medium: 'referral' };
}

interface AcquisitionTouch {
  landingPage: string;
  referrerHost: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  derived: boolean;
  at: string;
}

/**
 * Reads one navigation and decides whether it is an ACQUISITION — an arrival
 * from outside the site — or ordinary internal movement.
 *
 * Returns `null` for internal navigation, which is what enforces the write-once
 * and never-overwrite rules above: an internal page view can never produce a
 * touch, so it can never displace one.
 *
 * UTMs ARE READ ONLY WHEN THE REFERRER IS EXTERNAL OR ABSENT (§5). A UTM on an
 * internal link — which the approved model forbids creating, but which this code
 * does not get to assume never happens — is therefore ignored rather than
 * allowed to make the site its own traffic source.
 */
export function readAcquisition(
  href: string,
  referrer: string,
  hostname: string
): AcquisitionTouch | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const referrerHost = externalReferrerHost(referrer, hostname);
  const referrerIsInternal = referrer !== '' && referrerHost === null;
  if (referrerIsInternal) return null;

  const params = url.searchParams;
  const declaredSource = cleanValue(params.get('utm_source'));
  const declaredMedium = cleanValue(params.get('utm_medium'));
  const campaign = cleanValue(params.get('utm_campaign'));
  const content = cleanValue(params.get('utm_content'));
  const term = cleanValue(params.get('utm_term'));

  // Click identifiers: PRESENCE ONLY. The value is read to test for existence
  // and is never assigned, stored or transmitted — narrowing B in the header.
  const hasGclid = params.has('gclid') || params.has('wbraid') || params.has('gbraid');
  const hasFbclid = params.has('fbclid');
  const hasMsclkid = params.has('msclkid');

  let source = declaredSource;
  let medium = declaredMedium;
  let derived = false;

  if (!source) {
    if (hasGclid) {
      source = 'google';
      medium = medium ?? 'cpc';
      derived = true;
    } else if (hasMsclkid) {
      source = 'bing';
      medium = medium ?? 'cpc';
      derived = true;
    } else if (hasFbclid) {
      source = 'facebook';
      medium = medium ?? 'paid_social';
      derived = true;
    } else if (referrerHost) {
      const fromReferrer = derivedFromReferrer(referrerHost);
      source = fromReferrer.source;
      medium = medium ?? fromReferrer.medium;
      derived = true;
    }
  }

  // No declared UTM, no click id, no external referrer. `ATTRIBUTION_MODEL.md`
  // §6 records this bucket honestly as ambiguous rather than assigning it a
  // channel: it contains dark social, apps, email clients and privacy tooling.
  if (!source) {
    source = 'direct';
    medium = 'none';
    derived = true;
  }

  return {
    landingPage: url.pathname.slice(0, 255),
    referrerHost,
    source,
    medium: medium ?? null,
    campaign,
    content,
    term,
    derived,
    at: new Date().toISOString(),
  };
}

/**
 * `attribution_status`, derived from what was ACTUALLY captured.
 *
 *   complete    — a source was DECLARED in a UTM at first touch.
 *   partial     — a source was DERIVED, from a referrer or a click identifier.
 *   unavailable — no usable acquisition context: direct entry with no referrer,
 *                 or storage was unavailable so nothing could be carried.
 *
 * `unavailable` is not a failure and is never hidden. §3.3: any figure broken
 * down by source must show it as an explicit bucket, because dropping it from
 * the denominator silently overstates every measurable channel.
 */
function statusOf(first: AcquisitionTouch | null): AttributionStatus {
  if (!first) return 'unavailable';
  if (!first.derived && first.source) return 'complete';
  if (first.source && first.source !== 'direct') return 'partial';
  return 'unavailable';
}

interface StoredAttribution {
  first: AcquisitionTouch;
  latest: AcquisitionTouch;
}

function read(): StoredAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed || typeof parsed !== 'object' || !parsed.first || !parsed.latest) return null;
    return parsed;
  } catch {
    return null;
  }
}

function write(value: StoredAttribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* Private window, disabled site data, quota. Attribution is lost; the
       enquiry is not. `attribution_status` becomes `unavailable`, which is
       exactly what §3.3 requires that value to mean. */
  }
}

/**
 * Module-scoped, so it lives exactly as long as the DOCUMENT does. An App Router
 * client navigation keeps the same document, so this stays `true` across every
 * in-app route change; a hard navigation, a reload or a new tab creates a new
 * document and resets it.
 *
 * IT IS THE FIRST OF THE TWO GUARDS BELOW, AND IT FIXES A REAL DEFECT THAT
 * SOURCE INSPECTION DOES NOT SHOW. `document.referrer` is a property of the
 * DOCUMENT, not of the current route: after a client-side navigation it still
 * reports whatever the ORIGINAL page's referrer was. Without this flag, moving
 * from `/seo` to `/contact` inside the app re-ran acquisition detection against
 * that stale referrer, found nothing external, and wrote the `direct` residual
 * over a known campaign — which was OBSERVED in the browser during this phase's
 * runtime testing. `ATTRIBUTION_MODEL.md` §5 names that exact failure as "the
 * most commonly broken rule in practice and the one that silently destroys
 * attribution quality".
 */
let acquisitionEvaluatedForDocument = false;

/**
 * Called on every page view. Records an acquisition touch only if this
 * navigation genuinely is one, and does nothing at all otherwise.
 *
 * TWO GUARDS, EACH CLOSING A DIFFERENT ROUTE TO THE SAME BUG:
 *
 *   1. ONLY THE FIRST PAGE VIEW OF A DOCUMENT CAN BE AN ACQUISITION. Everything
 *      after it is in-app movement by definition — see the flag above.
 *   2. THE `direct` RESIDUAL NEVER DISPLACES A STORED TOUCH. `direct` does not
 *      mean "arrived directly"; it means NO ACQUISITION CONTEXT WAS OBSERVED
 *      (`ATTRIBUTION_MODEL.md` §6 records it honestly as an ambiguous bucket
 *      containing dark social, apps, email clients and privacy tooling). Absence
 *      of evidence is not evidence of a new visit, so it may establish a
 *      first-touch when nothing is stored, and may never overwrite one that is.
 *      This is what protects a mid-session hard load of a bookmarked internal
 *      page, which arrives in a fresh document with an empty referrer.
 *
 * FIRST-TOUCH IS WRITTEN ONCE AND NEVER OVERWRITTEN, INCLUDING NEVER WITH
 * BLANKS: the only `write` that sets `first` is the one taken when nothing is
 * stored at all.
 */
export function recordPageView(): void {
  if (typeof window === 'undefined') return;
  try {
    if (acquisitionEvaluatedForDocument) return;
    acquisitionEvaluatedForDocument = true;

    const touch = readAcquisition(
      window.location.href,
      document.referrer,
      window.location.hostname
    );
    if (!touch) return;

    const existing = read();
    if (!existing) {
      write({ first: touch, latest: touch });
      return;
    }
    if (touch.source === 'direct' && !touch.referrerHost) return;
    write({ first: existing.first, latest: touch });
  } catch {
    /* Never allowed to affect the page. */
  }
}

/**
 * The payload sent with an enquiry submission.
 *
 * ALWAYS RETURNS A VALUE. When nothing is known it returns `EMPTY_ATTRIBUTION`
 * with `status: 'unavailable'` rather than throwing or omitting the field, so a
 * submission is never shaped differently because measurement failed.
 */
export function attributionForSubmission(): AttributionPayload {
  if (typeof window === 'undefined') return EMPTY_ATTRIBUTION;
  try {
    const stored = read();
    if (!stored) return EMPTY_ATTRIBUTION;
    const { first, latest } = stored;
    return {
      firstLandingPage: first.landingPage,
      firstReferrerHost: first.referrerHost,
      firstSource: first.source,
      firstMedium: first.medium,
      firstCampaign: first.campaign,
      firstContent: first.content,
      firstTerm: first.term,
      firstTouchAt: first.at,
      firstSourceDerived: first.derived,
      latestSource: latest.source,
      latestMedium: latest.medium,
      latestCampaign: latest.campaign,
      latestReferrerHost: latest.referrerHost,
      status: statusOf(first),
    };
  } catch {
    return EMPTY_ATTRIBUTION;
  }
}

/**
 * The subset that may accompany an ANALYTICS event.
 *
 * Deliberately narrower than what is stored. Source, medium and campaign are
 * categorical channel labels and are in `EVENT_TAXONOMY.md` §3's standard
 * parameter list. `utm_content`, `utm_term`, the referrer host and the landing
 * page are NOT sent: they are the free-form, longest-tail values, and the
 * marginal analytical value of putting them in a third-party platform does not
 * justify the marginal chance that one of them carries something identifying.
 * They remain on the enquiry row, which is first-party and access-controlled.
 */
export function attributionForAnalytics(payload: AttributionPayload) {
  return {
    first_source: payload.firstSource,
    first_medium: payload.firstMedium,
    first_campaign: payload.firstCampaign,
    latest_source: payload.latestSource,
    latest_medium: payload.latestMedium,
    latest_campaign: payload.latestCampaign,
    attribution_status: payload.status,
  };
}
