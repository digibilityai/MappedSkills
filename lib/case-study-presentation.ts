/**
 * PER-STUDY PRESENTATION EXTRAS for the new case-study template, by page address. Words and files only: nothing here
 * computes, derives or infers a figure. A study with no entry renders exactly as before.
 *
 * - `impactMedia`: one supplied image shown inside "The impact", after the results board, shown whole (never cropped) and
 *   openable at full size. Its caption says what it is.
 * - `close`: the closing band's copy and button label, for a study whose approved wording differs from the template's.
 * - `metaDescription`: the short search and sharing description, where it must differ from the longer visible introduction
 *   (Contentful has no separate field for it and none is added).
 */
export type ImpactMedia = { src: string; w: number; h: number; alt: string; caption: string };
export type CloseCopy = { title: string; body: string; cta: string };
export type StudyPresentation = { impactMedia?: ImpactMedia; close?: CloseCopy; metaDescription?: string };

const PRESENTATION: Record<string, StudyPresentation> = {
  '/portfolio/google-ads-for-online-courses': {
    metaDescription: 'Google Ads for AnybodyCanBake’s online baking courses: 1,410 paid enrolments attributed to it and ₹66.36 lakh in reported revenue, Feb 2020 to Aug 2021.',
    impactMedia: {
      src: '/images/resolve-r3/anybodycanbake-dashboard.webp',
      w: 1586,
      h: 992,
      alt: 'A recreated agency dashboard for AnybodyCanBake, Google Ads, February 2020 to August 2021, in rupees. Paid enrolments 1,410. Advertising spend ₹12,66,390. Reported revenue ₹66,36,000. Cost per enrolment ₹898.15. ROAS 5.24 times. A bar chart compares advertising spend with reported revenue, with the note that revenue return is not profit.',
      caption: 'Recreated agency dashboard showing reported campaign totals, February 2020 to August 2021.',
    },
    close: {
      title: 'Want more paid enrolments for your courses?',
      body: 'Tell us what you teach and what you want your advertising to achieve.',
      cta: 'Discuss Your Advertising',
    },
  },
};

export const presentationFor = (href: string): StudyPresentation => PRESENTATION[href] ?? {};
