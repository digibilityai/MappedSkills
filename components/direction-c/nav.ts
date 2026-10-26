/** Paid-advertising navigation approved 26 October 2026.
 * Shared by the header, mobile menu and footer. Existing routes are retained
 * until the migration batch; historical service pages remain accessible.
 */

export type NavLink = { href: string; label: string; desc?: string };
export type NavGroup = {
  stage: 'Paid advertising';
  mark: 'anon' | 'named' | 'owned';
  /** the approved stage line, e.g. "Get found." */
  line: string;
  links: NavLink[];
};

export const SERVICE_GROUPS: NavGroup[] = [
  {
    stage: 'Paid advertising',
    mark: 'anon',
    line: 'Built around your business goals.',
    links: [
      { href: '/google-ads', label: 'Google Ads', desc: 'Reach people looking for what you offer.' },
      { href: '/social-media-ads', label: 'Meta Ads', desc: 'Bring your offer to customers on Facebook and Instagram.' },
    ],
  },
];

export const SERVICES_HUB: NavLink = {
  href: '/services',
  label: 'All services',
  desc: 'Explore Google Ads and Meta Ads management.',
};

/** Secondary, contextual link at the foot of the Services panel and section. */
export const PROBLEM_LINK: NavLink = {
  href: '/pricing',
  label: 'Understand Our Pricing Approach',
};

/** Primary navigation after Services. */
export const PRIMARY_LINKS: NavLink[] = [
  { href: '/#who-we-help', label: 'Who We Help' },
  { href: '/work', label: 'Our Work' },
  { href: '/how-it-works', label: 'How We Work' },
  { href: '/about', label: 'About' },
];

export const CONTACT_LINK: NavLink = { href: '/contact', label: 'Discuss Your Advertising' };
/** Secondary action in the mobile and tablet menu only (DEC-062 destination). */
export const CALL_LINK: NavLink = { href: '/contact?intent=call', label: 'Request a call' };

/** Capability routes: the Services column of the footer and the routes that mark "Services" current. */
const CAPABILITIES: NavLink[] = SERVICE_GROUPS.flatMap((g) => g.links);

/** Footer services: the hub and the two core advertising services. */
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
  { href: '/press', label: 'Press' },
];

/** Gate 4 B1 (DEC-037, strategy S3): every route renders Direction C chrome.
    This is the ROLLBACK / EXCEPTION list — exact pathnames that temporarily
    return to the legacy header and footer if a material regression is found
    on that route. It is intentionally EMPTY. An entry needs a recorded reason
    in the batch report. B11 removes this list, `ChromeSwitch` and the legacy
    chrome together. (Replaces the Gate 2 allow-list `DIRECTION_C_ROUTES`.) */
export const LEGACY_CHROME_ROUTES: ReadonlySet<string> = new Set<string>([]);

export const SERVICE_ROUTES = new Set([SERVICES_HUB.href, ...CAPABILITIES.map((l) => l.href)]);
