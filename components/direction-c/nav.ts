/**
 * UI REVAMP GATE 2 — DIRECTION C — navigation data, ONE source for the
 * header, the mobile menu and the footer.
 *
 * DESTINATIONS are the production ones, unchanged (components/layout/Header.tsx,
 * components/layout/Footer.tsx). Nothing is added to or removed from the set of
 * places the site links to; "Measurement" → /how-it-works is the destination
 * `/services` already gives that capability.
 *
 * LABELS. The approved prototype groups services in chain order (Capture ·
 * Convert · Measure) and names each capability as the approved `/services`
 * page does (DEC-014 copy) — e.g. "Paid social" for /social-media-ads. The two
 * Convert destinations are the exception (Gate 3 R3, owner requirement):
 * "Conversion optimisation" and "Lead generation", the names the homepage's
 * approved stage links use, so one page never names one destination twice;
 * the legacy header's descriptions (e.g. "Rank for high-intent keywords…")
 * are not carried into Direction C, and the prototype's own panel
 * descriptions are not used because they are new copy with no approval
 * (Gate 2 handoff, owner decisions). The legacy chrome on every other route
 * is untouched.
 */

export type NavLink = { href: string; label: string; short?: string };
export type NavGroup = { stage: 'Capture' | 'Convert' | 'Measure'; mark: 'anon' | 'named' | 'owned'; links: NavLink[] };

export const SERVICE_GROUPS: NavGroup[] = [
  {
    stage: 'Capture',
    mark: 'anon',
    links: [
      { href: '/seo', label: 'Organic search (SEO)', short: 'SEO' },
      { href: '/google-ads', label: 'Google Ads' },
      { href: '/social-media-ads', label: 'Paid social' },
      { href: '/ai-seo', label: 'AI search' },
    ],
  },
  {
    stage: 'Convert',
    mark: 'named',
    links: [
      /* Gate 3 R3 (owner requirement): one name per destination across the
         homepage, header, mobile menu and footer — the names the homepage's
         own approved links already use. */
      { href: '/conversion-optimization', label: 'Conversion optimisation' },
      { href: '/lead-generation', label: 'Lead generation' },
    ],
  },
  {
    stage: 'Measure',
    mark: 'owned',
    links: [{ href: '/how-it-works', label: 'Measurement' }],
  },
];

export const SERVICES_HUB: NavLink = { href: '/services', label: 'All services' };

/** Primary navigation after Services — production order (NAV-011, NAV-017). */
export const PRIMARY_LINKS: NavLink[] = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/work', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

/** Footer "Services" column: the six capability routes (production set). */
export const FOOTER_SERVICES: NavLink[] = SERVICE_GROUPS.flatMap((g) => g.links).filter((l) => l.href !== '/how-it-works');

/** Footer "Company" column — production set and order (NAV-026). */
export const FOOTER_COMPANY: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/work', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/research', label: 'Research' },
  { href: '/press', label: 'Press' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/schedule-call', label: 'Book a call' },
];

/** Gate 4 B1 (DEC-037, strategy S3): every route renders Direction C chrome.
    This is the ROLLBACK / EXCEPTION list — exact pathnames that temporarily
    return to the legacy header and footer if a material regression is found
    on that route. It is intentionally EMPTY. An entry needs a recorded reason
    in the batch report. B11 removes this list, `ChromeSwitch` and the legacy
    chrome together. (Replaces the Gate 2 allow-list `DIRECTION_C_ROUTES`.) */
export const LEGACY_CHROME_ROUTES: ReadonlySet<string> = new Set<string>([]);

export const SERVICE_ROUTES = new Set(['/services', ...SERVICE_GROUPS.flatMap((g) => g.links.map((l) => l.href)).filter((h) => h !== '/how-it-works')]);
