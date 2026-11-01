import { activeFinalFour, FINAL_FOUR_CLOSE_TITLE, finalFourImage } from '@/lib/case-study-final-four';
import { PAID_CASES, PAID_CASE_CLOSE, PAID_CASE_CLOSE_BODY, PAID_CASE_CLOSE_CTA, paidCaseImage } from '@/lib/case-study-paid-batch';

/**
 * PER-STUDY PRESENTATION EXTRAS for the new case-study template, by page address. Words and files only: nothing here
 * computes, derives or infers a figure. A study with no entry renders exactly as before.
 *
 * - `impactMedia`: one supplied image shown inside "The impact", after the results board, shown whole (never cropped) and
 *   an ordinary responsive image (no link, no caption).
 * - `close`: the closing band's copy and button label, for a study whose approved wording differs from the template's.
 * - `metaDescription`: the short search and sharing description, where it must differ from the longer visible introduction
 *   (Contentful has no separate field for it and none is added).
 */
export type ImpactMedia = { src: string; w: number; h: number; alt: string };
/** `secondary`: also show the existing "Request a call" link beside the one button. */
export type CloseCopy = { title: string; body: string; cta: string; secondary?: boolean };
/** `card`: the listing card's eyebrow, body and button, for a study whose approved wording differs from the generated one (no figure). */
export type CardCopy = { eyebrow: string; body: string; cta: string };
export type StudyPresentation = { impactMedia?: ImpactMedia; close?: CloseCopy; metaDescription?: string; card?: CardCopy };

const PRESENTATION: Record<string, StudyPresentation> = {
  '/portfolio/google-ads-for-online-courses': {
    metaDescription: 'Google Ads for AnybodyCanBake’s online baking courses: 1,410 paid enrolments attributed to it and ₹66.36 lakh in reported revenue, Feb 2020 to Aug 2021.',
    impactMedia: {
      src: '/images/resolve-r3/anybodycanbake-dashboard.webp',
      w: 1586,
      h: 992,
      alt: 'A recreated agency dashboard for AnybodyCanBake, Google Ads, February 2020 to August 2021, in rupees. Paid enrolments 1,410. Advertising spend ₹12,66,390. Reported revenue ₹66,36,000. Cost per enrolment ₹898.15. ROAS 5.24 times. A bar chart compares advertising spend with reported revenue, with the note that revenue return is not profit.',
    },
    close: {
      title: 'Want more paid enrolments for your courses?',
      body: 'Tell us what you teach and what you want your advertising to achieve.',
      cta: 'Discuss Your Advertising',
    },
  },
};

/** The paid-advertising studies of both batches (`lib/case-study-paid-batch.ts`): card copy, short description, closing band and, where supplied, the dashboard. */
const BATCH: Record<string, StudyPresentation> = Object.fromEntries(
  PAID_CASES.map((c) => [
    c.href,
    {
      metaDescription: c.metaDescription,
      card: c.card,
      close: { ...PAID_CASE_CLOSE, body: PAID_CASE_CLOSE_BODY[c.key], ...(PAID_CASE_CLOSE_CTA[c.key] ? { cta: PAID_CASE_CLOSE_CTA[c.key] } : {}) },
      ...(c.dashboard ? { impactMedia: { src: paidCaseImage(c.key, 'dashboard'), w: 1586, h: 992, alt: c.dashboard.alt } } : {}),
    } satisfies StudyPresentation,
  ])
);

/** The final four (31 October 2026, `lib/case-study-final-four.ts`): card copy, short description, closing band and, for Ameba Software and Wanderlooms only, the dashboard. */
const finalPresentation = (released: readonly string[]): Record<string, StudyPresentation> => Object.fromEntries(
  activeFinalFour(released).map((c) => [
    c.href,
    {
      metaDescription: c.metaDescription,
      card: c.card,
      close: { title: FINAL_FOUR_CLOSE_TITLE, body: c.close.body, cta: c.close.cta, secondary: true },
      ...(c.dashboard ? { impactMedia: { src: finalFourImage(c.key, 'dashboard'), w: 1586, h: 992, alt: c.dashboard.alt } } : {}),
    } satisfies StudyPresentation,
  ])
);

export const presentationFor = (href: string, finalCopy = false): StudyPresentation => finalPresentation(finalCopy ? [href] : [])[href] ?? BATCH[href] ?? PRESENTATION[href] ?? {};
