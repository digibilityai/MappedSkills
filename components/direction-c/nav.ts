/**
 * DIRECTION C — navigation data, ONE source for the header, the mobile menu
 * and the footer.
 *
 * NAVIGATION REDESIGN (R2 prototype, docs/nav-redesign/prototype/index.html):
 * - one Services disclosure, its links grouped by stage (Capture · Convert ·
 *   Measure), each with the approved stage line and descriptor;
 * - sentence-case labels throughout, one name per destination;
 * - "How it works" sits in the main navigation AND in the Measure stage. The
 *   Measure stage describes how the work is measured; it is not a separate
 *   purchasable service, so the footer's Services column does not list it;
 * - the footer has four columns: Services, Company, Insights, Contact.
 *
 * DESTINATIONS are unchanged production routes. The redesign drops links from
 * the chrome (the footer's Press, Contact and Book a call entries, the header's
 * Book a call) but adds no new destination.
 */

export type NavLink = { href: string; label: string; desc?: string };
export type NavGroup = {
  stage: 'Capture' | 'Convert' | 'Measure';
  mark: 'anon' | 'named' | 'owned';
  /** the approved stage line, e.g. "Get found." */
  line: string;
  links: NavLink[];
};

export const SERVICE_GROUPS: NavGroup[] = [
  {
    stage: 'Capture',
    mark: 'anon',
    line: 'Get found.',
    links: [
      { href: '/seo', label: 'SEO', desc: 'Judged on the enquiries it produces.' },
      { href: '/google-ads', label: 'Google Ads', desc: 'Measured on enquiries, not clicks.' },
      { href: '/social-media-ads', label: 'Paid social', desc: 'Only where it fits your business.' },
      { href: '/ai-seo', label: 'AI search', desc: 'Is your business in the answer?' },
    ],
  },
  {
    stage: 'Convert',
    mark: 'named',
    line: 'Get enquiries.',
    links: [
      { href: '/conversion-optimization', label: 'Conversion optimisation', desc: 'Find where visits are lost.' },
      { href: '/lead-generation', label: 'Lead generation', desc: 'Enquiries you can act on.' },
    ],
  },
  {
    stage: 'Measure',
    mark: 'owned',
    line: 'See what’s working.',
    links: [{ href: '/how-it-works', label: 'How it works', desc: 'From first call to monthly review.' }],
  },
];

export const SERVICES_HUB: NavLink = {
  href: '/services',
  label: 'All services',
  desc: 'Explore how our services work together.',
};

/** Secondary, contextual link at the foot of the Services panel and section. */
export const PROBLEM_LINK: NavLink = {
  href: '/problems/traffic-but-no-enquiries',
  label: 'Getting traffic but no enquiries?',
};

/** Primary navigation after Services. */
export const PRIMARY_LINKS: NavLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/work', label: 'Case studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export const CONTACT_LINK: NavLink = { href: '/contact', label: 'Contact us' };
/** Secondary action in the mobile and tablet menu only (DEC-062 destination). */
export const CALL_LINK: NavLink = { href: '/contact?intent=call', label: 'Request a call' };

/** Capability routes: the Services column of the footer and the routes that mark "Services" current. */
const CAPABILITIES: NavLink[] = SERVICE_GROUPS.filter((g) => g.stage !== 'Measure').flatMap((g) => g.links);

/** Footer "Services" column: the hub, then the six capability routes. */
export const FOOTER_SERVICES: NavLink[] = [SERVICES_HUB, ...CAPABILITIES];

/** Footer "Company" column. */
export const FOOTER_COMPANY: NavLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/work', label: 'Case studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

/** Footer "Insights" column. */
export const FOOTER_INSIGHTS: NavLink[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/research', label: 'Research' },
];

/** Gate 4 B1 (DEC-037, strategy S3): every route renders Direction C chrome.
    This is the ROLLBACK / EXCEPTION list — exact pathnames that temporarily
    return to the legacy header and footer if a material regression is found
    on that route. It is intentionally EMPTY. An entry needs a recorded reason
    in the batch report. B11 removes this list, `ChromeSwitch` and the legacy
    chrome together. (Replaces the Gate 2 allow-list `DIRECTION_C_ROUTES`.) */
export const LEGACY_CHROME_ROUTES: ReadonlySet<string> = new Set<string>([]);

export const SERVICE_ROUTES = new Set([SERVICES_HUB.href, ...CAPABILITIES.map((l) => l.href)]);
