/** Navigation: Google Ads, Meta Ads and SEO as three equal core services (Batch 1, positioning update).
 * Originally approved 26 October 2026.
 * Shared by the header, mobile menu and footer. Existing routes are retained
 * until the migration batch; historical service pages remain accessible.
 */

export type NavLink = { href: string; label: string; desc?: string };
export type NavGroup = {
  stage: string;
  mark: 'anon' | 'named' | 'owned';
  /** the approved stage line, e.g. "Get found." */
  line: string;
  links: NavLink[];
};

export const SERVICE_GROUPS: NavGroup[] = [
  {
    stage: 'Core services',
    mark: 'anon',
    line: 'Three ways to reach the right customers.',
    links: [
      { href: '/google-ads', label: 'Google Ads', desc: 'Reach people looking for what you offer.' },
      { href: '/social-media-ads', label: 'Meta Ads', desc: 'Bring your offer to customers on Facebook and Instagram.' },
      { href: '/seo', label: 'SEO', desc: 'Be found by customers searching for what you offer.' },
    ],
  },
];

export const SERVICES_HUB: NavLink = {
  href: '/services',
  label: 'All services',
  desc: 'Explore Google Ads, Meta Ads and SEO.',
};

/** Secondary, contextual link at the foot of the Services panel and section. */
export const PROBLEM_LINK: NavLink = {
  href: '/pricing',
  label: 'View Plans & Pricing',
};

/** "Who We Help" dropdown: the four audience pages only. */
export const WHO_WE_HELP_LABEL = 'Who We Help';
export const WHO_WE_HELP_LINKS: NavLink[] = [
  { href: '/who-we-help/d2c', label: 'D2C and Ecommerce', desc: 'Products sold online to customers directly.' },
  { href: '/who-we-help/education', label: 'Education and Training', desc: 'Programmes, training and coaching.' },
  { href: '/who-we-help/real-estate', label: 'Real Estate', desc: 'Property developers and Channel Partners.' },
  { href: '/who-we-help/enquiry-led-businesses', label: 'Enquiry-Led Businesses', desc: 'Customers who ask before they buy.' },
];
/** Plain-link target for the no-JavaScript fallback only; it is not listed in the dropdown or the mobile menu. */
export const WHO_WE_HELP_NOJS_HREF = '/#who-we-help';
export const WHO_WE_HELP_ROUTES = new Set(WHO_WE_HELP_LINKS.map((l) => l.href));

/** Primary navigation after Services and Who We Help. */
export const PRIMARY_LINKS: NavLink[] = [
  { href: '/work', label: 'Our Work' },
  { href: '/how-it-works', label: 'How We Work' },
  { href: '/about', label: 'About' },
];

export const CONTACT_LINK: NavLink = { href: '/contact', label: 'Discuss Your Growth' };
/** Secondary action in the mobile and tablet menu only (DEC-062 destination). */
export const CALL_LINK: NavLink = { href: '/contact?intent=call', label: 'Request a call' };

/** Capability routes: the Services column of the footer and the routes that mark "Services" current. */
const CAPABILITIES: NavLink[] = SERVICE_GROUPS.flatMap((g) => g.links);

/** Footer services: the hub, then the three core services (Google Ads, Meta Ads, SEO). */
export const FOOTER_SERVICES: NavLink[] = [SERVICES_HUB, ...CAPABILITIES];

/** Footer "Who We Help" group: the same four audience pages as the header. */
export const FOOTER_WHO: NavLink[] = WHO_WE_HELP_LINKS.map(({ href, label }) => ({ href, label }));

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

/** Routes that mark "Services" current: the hub and the three core services. */
export const SERVICE_ROUTES = new Set([SERVICES_HUB.href, ...CAPABILITIES.map((l) => l.href)]);
