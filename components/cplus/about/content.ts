/**
 * C+ About (/about): customer-facing copy of the owner-approved G1 design, frozen at R4, with the owner-directed R5
 * copy simplification of "Why we work this way" and "What you can count on us for" (proposed, pending visual approval) (docs/about-redesign/g1/:
 * AB_G1_NOTES.md, mockup/). Facts used: the owner confirmations recorded in docs/about-redesign/g0/AB_G0_DECISIONS.md
 * (independently operated agency; a wider team led by four team heads; plans and coordinates the services a client
 * hires it to manage; R4 process copy), DEC-053 OD-04, DEC-058 HW-D01 and HW-D03.
 */

export type AboutIcon = 'search' | 'ads' | 'site' | 'chart' | 'mail' | 'plan' | 'link' | 'report' | 'talk' | 'person';

export const AB = {
  crumb: 'About',
  kicker: 'About MappedSkills',
  h1: { a: 'A marketing partner', b: 'who sees the bigger picture.' },
  lede: 'We’re an independently operated digital marketing agency. We look at how all your marketing fits together, then help more of the right people find you and get in touch.',
  primary: 'Tell us about your business',

  big: {
    label: 'Illustration: search, ads, your website and tracking, all working towards one thing, your enquiries.',
    k: 'The bigger picture',
    parts: [
      { t: 'Search', icon: 'search' },
      { t: 'Ads', icon: 'ads' },
      { t: 'Your website', icon: 'site' },
      { t: 'Tracking', icon: 'chart' },
    ] as { t: string; icon: AboutIcon }[],
    centre: 'Your enquiries',
    cap: 'Illustration',
  },

  why: {
    kicker: 'Why we work this way',
    h: { a: 'Your marketing should', b: 'work together.' },
    body: 'Ads, search and your website shouldn’t work in isolation. We connect the services you hire us for, with one shared goal: more enquiries.',
    parts: [
      { t: 'Search', icon: 'search' },
      { t: 'Ads', icon: 'ads' },
      { t: 'Website', icon: 'site' },
    ] as { t: string; icon: AboutIcon }[],
    apart: { t: 'Working separately', end: 'Enquiries: nobody’s job', s: 'Separate reports. No shared picture.' },
    together: {
      t: 'Working together',
      end: 'Enquiries: the shared goal',
      s: 'One coordinated approach. Clear reporting.',
    },
    cap: 'Illustration of a common setup.',
  },

  count: {
    kicker: 'What you can count on us for',
    h: { a: 'Four things we', b: 'promise to do.' },
    items: [
      {
        t: 'A clear plan',
        icon: 'plan',
        d: 'You approve the approach and scope before we begin.',
      },
      {
        t: 'Connected work',
        icon: 'link',
        d: 'We coordinate the services you hire us to manage.',
      },
      {
        t: 'Honest measurement',
        icon: 'report',
        d: 'Monthly reports show what’s working and what needs attention.',
      },
      {
        t: 'Straight answers',
        icon: 'talk',
        d: 'We tell you what we recommend, and what the data can’t tell us.',
      },
    ] as { t: string; icon: AboutIcon; d: string }[],
    splitLabel: 'Who does what',
    ours: { t: 'Our part', d: 'Managing your marketing.' },
    yours: { t: 'Your part', d: 'Responding to enquiries and closing sales.' },
    honest: 'We commit to the work and how we do it, not guaranteed outcomes.',
    link: { href: '/how-it-works', label: 'See how the work runs' },
  },

  people: {
    kicker: 'The people',
    h: { a: 'Meet the people', b: 'leading the work.' },
    lede: 'MappedSkills has a wider team. These are the four people who lead it.',
    placeholderTag: 'Placeholders: photos, names, roles and introductions to come from the owner',
    photo: 'Photo',
  },

  close: {
    kicker: 'Say hello',
    h: { a: 'We’d like to hear', b: 'about your business.' },
    body: 'Tell us what’s working, what isn’t, and what you’d like to change. A few lines is plenty.',
    nextK: 'What happens next',
    next: [
      'You tell us what’s going on, using the form, email or WhatsApp.',
      'We share our findings, the approach we suggest and the scope.',
      'Work starts only after you approve it.',
    ],
  },
};

/**
 * The four team heads. PLACEHOLDERS: the owner supplies the real profiles (DEC-060). Replace each entry with the
 * approved name, role, one-sentence introduction and photo (`photo`: a path under /public, plus `alt`; written photo
 * consent from the person is a release requirement), and set
 * `placeholder: false`. While ANY entry is a placeholder, the page renders the visible placeholder tag and the
 * page must not be released publicly (owner condition, G2 authorisation).
 * Do not invent identities, credentials or biographies.
 */
export type TeamHead = {
  placeholder: boolean;
  name: string;
  role: string;
  intro: string;
  photo?: { src: string; alt: string };
};

const PLACEHOLDER: TeamHead = {
  placeholder: true,
  name: '[Name]',
  role: '[Role]',
  intro: '[One sentence introducing this person, in their own words.]',
};

export const TEAM_HEADS: TeamHead[] = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];
