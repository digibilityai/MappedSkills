/**
 * THE FINAL FOUR CASE STUDIES (local review batch, 31 October 2026): ClassPe, InsurYo, Ameba Software and Wanderlooms, from
 * `MappedSkills_4_Additional_Case_Studies_and_Image_Briefs.docx`. The code-resident part, in the same shape as the paid batch
 * (`lib/case-study-paid-batch.ts`): words and files only, no figure is computed here. Image slots (`lib/case-study-images.ts`),
 * per-study presentation extras (`lib/case-study-presentation.ts`) and the listing card copy (`components/b2/work-cards.ts`) are all
 * built from this one list, so a case's card, hero and dashboard can never be associated with another case.
 *
 * THREE OF THE FOUR ALREADY HAVE PUBLIC PAGES. ClassPe, InsurYo and Ameba Software keep their routes and their place in the listing; this
 * list only replaces their artwork and card copy, and only for a study whose Contentful copy is the final copy (`finalFourActive`, below): the copy and fields are Contentful content,
 * so the release must update those three entries (and publish Wanderlooms) in the same step (docs/work-redesign/final-four/FINAL_FOUR_REPORT.md).
 *
 * Dashboards: only Ameba Software and Wanderlooms have one (owner correction, 31 October 2026: the ClassPe and InsurYo dashboards are
 * not published). Files are `<key>-<kind>.webp` under `/images/case-studies/`: card 1586 x 992, hero 1672 x 941 and a 2.6:1 crop of it
 * (1672 x 643) for the desktop stage; Wanderlooms was supplied 1 px smaller (card 1585 x 992, hero 1672 x 940) and is declared as supplied.
 */
export type FinalFourKey = 'classpe-social-media' | 'insuryo-organic-growth' | 'ameba-software-seo' | 'wanderlooms-meta-ads';

export type FinalFourCase = {
  key: FinalFourKey;
  /** The study's page address; also its Contentful slug when released. The first three exist already and are unchanged. */
  href: string;
  client: string;
  /** The service as the owner's document names it. Only a catalogue service is a tag; see `serviceKey`. */
  service: string;
  /** Existing catalogue key, or null when no accurate one exists (organic social and organic growth work are not catalogue services). */
  serviceKey: '/seo' | '/social-media-ads' | null;
  /** The industry as written on the listing card and the page. */
  industry: string;
  card: { eyebrow: string; body: string; cta: string };
  metaDescription: string;
  alt: { card: string; hero: string };
  /** Pixel sizes of the supplied files. */
  size: { card: { w: number; h: number }; hero: { w: number; h: number } };
  /** The recreated agency dashboard inside "The impact"; null where none is published. */
  dashboard: { alt: string } | null;
  /** The closing sentence and the button, as written in the final document. */
  close: { body: string; cta: string };
  /** True for the three studies that already have a public page (their Contentful copy is still the old copy until the release). */
  existing: boolean;
};

export const FINAL_FOUR: readonly FinalFourCase[] = [
  {
    key: 'classpe-social-media',
    href: '/portfolio/classpe-social-media-strategy',
    client: 'ClassPe',
    service: 'Social Media Management',
    serviceKey: null,
    industry: 'Education and training',
    card: {
      eyebrow: 'Education and training',
      body: 'A coaching brand whose social strategy and content explain its personalised approach to prospective students.',
      cta: 'Read the case study',
    },
    metaDescription:
      'Social strategy, brand narrative and content for ClassPe, a coaching brand: student strength grew by approximately 95% in the first four months of an ongoing retainership since July 2026.',
    alt: {
      card: 'ClassPe, Social Media Management. Approximately 95% student growth in four months. A mentor and a student at a desk with a laptop and a notebook, beside a content planning board.',
      hero: 'ClassPe, Social Media Management. Approximately 95 percent student growth in four months. Two people at a table with a laptop, in front of a whiteboard sketch of a video, a person and a web page.',
    },
    size: { card: { w: 1586, h: 992 }, hero: { w: 1672, h: 941 } },
    dashboard: null,
    close: { body: 'Want your social content to make your offer easier to understand?', cta: 'Discuss Your Social Media Goals' },
    existing: true,
  },
  {
    key: 'insuryo-organic-growth',
    href: '/portfolio/insuryo-organic-growth',
    client: 'InsurYo',
    service: 'Organic Growth Strategy',
    serviceKey: null,
    industry: 'Insurance',
    card: {
      eyebrow: 'Financial services and insurance',
      body: 'An early-stage company that needed a clear mission and practical routes to the organisations that could help deliver it.',
      cta: 'Read the case study',
    },
    metaDescription:
      'Organic growth strategy for InsurYo, an insurance company that began as an unregistered idea: four major projects in Bihar and the Gorakhpur area and a ₹20 crore company valuation within one year of operations. Engagement since September 2025.',
    alt: {
      card: 'InsurYo, Organic Growth Strategy. 4 major project wins, from an idea-stage business. Three people at a table in a bright room, one pointing at a document.',
      hero: 'InsurYo, Organic Growth Strategy. From an idea to four major projects and a ₹20 crore valuation. A person sketching in a notebook beside a laptop, and a group meeting around a table with plans.',
    },
    size: { card: { w: 1586, h: 992 }, hero: { w: 1672, h: 941 } },
    dashboard: null,
    close: { body: 'Want a clearer growth direction and stronger routes to your audience?', cta: 'Discuss Your Organic Growth Goals' },
    existing: true,
  },
  {
    key: 'ameba-software-seo',
    href: '/portfolio/seo-ameba-software',
    client: 'Ameba Software',
    service: 'SEO',
    serviceKey: '/seo',
    industry: 'Software and technology',
    card: {
      eyebrow: 'SEO · Software and technology',
      body: 'A B2B software company whose search work is followed through to relevant clicks and tracked organic enquiries.',
      cta: 'Read the SEO case study',
    },
    metaDescription:
      'SEO for Ameba Software, a B2B software company: organic clicks up 75.34% (7,300 to 12,800) and tracked organic enquiries up 55.88% (34 to 53), comparing two three-month periods.',
    alt: {
      card: 'Ameba Software, SEO. 75.34% more organic clicks and 55.88% more organic enquiries. A software team reviewing a web page on a large screen.',
      hero: 'Ameba Software, SEO. 75.34 percent more organic clicks and 55.88 percent more enquiries. A team in a meeting room reviewing a web page on a large screen, with icons for a server, a page and a person connected by a line.',
    },
    size: { card: { w: 1586, h: 992 }, hero: { w: 1672, h: 941 } },
    dashboard: {
      alt: 'A recreated agency dashboard for Ameba Software, SEO, comparing an earlier and a later three month period. Organic clicks 7,300 and 12,800, growth 75.34%. Nonbrand organic clicks 5,200 and 8,940, growth 71.92%. Tracked organic enquiries 34 and 53, growth 55.88%. Paired bars compare the two periods, and a table repeats the figures.',
    },
    close: { body: 'Want search to connect more relevant buyers with your services?', cta: 'Discuss Your SEO Goals' },
    existing: true,
  },
  {
    key: 'wanderlooms-meta-ads',
    href: '/portfolio/wanderlooms-meta-ads',
    client: 'Wanderlooms',
    service: 'Meta Ads',
    serviceKey: '/social-media-ads',
    industry: 'D2C and ecommerce',
    card: {
      eyebrow: 'Meta Ads · D2C and ecommerce',
      body: 'An adventure apparel brand whose Meta advertising is measured against attributed orders and order revenue.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription:
      'Meta Ads for Wanderlooms, an adventure apparel brand: 6,607 attributed orders at ₹544.88 per order and a 3.12× revenue ROAS on ₹36,00,000 of advertising spend, April to September 2026.',
    alt: {
      card: 'Wanderlooms, Meta Ads. 6,607 attributed orders and 3.12× revenue ROAS. Travellers in outdoor jackets with parked motorcycles at a hillside road trip stop.',
      hero: 'Wanderlooms, Meta Ads. 6,607 attributed orders and 3.12 times revenue ROAS. Travellers in outdoor jackets talking over drinks beside motorcycles on a hillside at sunset, with a purchase card and a close-up of a fleece fabric.',
    },
    size: { card: { w: 1585, h: 992 }, hero: { w: 1672, h: 940 } },
    dashboard: {
      alt: 'A recreated agency dashboard for Wanderlooms, Meta Ads, sales objective, April 2026 to September 2026, in rupees. Attributed orders 6,607. Advertising spend ₹36,00,000. Attributed revenue ₹1,12,32,000. Cost per order ₹544.88. Revenue ROAS 3.12 times. A bar chart compares advertising spend with attributed revenue, and a summary gives ₹3.12 revenue per ₹1 spent and an average attributed order value of ₹1,700.02.',
    },
    close: { body: 'Want your product discovery campaigns to support measurable purchases?', cta: 'Discuss Your Meta Ads Goals' },
    existing: false,
  },
];

/**
 * THE RELEASE GATE (DEC-117). ClassPe, InsurYo and Ameba Software are live with their earlier Contentful copy. Their new artwork, card copy,
 * dashboard, short description and the Ameba figures are code-resident, so they apply only to a study whose published summary is the approved final
 * summary (`hasFinalCopy`, `lib/case-study-release.ts`). The gate is the content, not an environment variable: the code can be deployed before or after the
 * Contentful update without a window of old proof or unmatched artwork, and nothing about it is a preview switch. Wanderlooms is new and inert
 * without a Contentful entry, so it is always on. `released` lists the page addresses (`/portfolio/...`) whose copy is final.
 */
export const finalFourActive = (c: FinalFourCase, released: ReadonlySet<string> | readonly string[] = []): boolean =>
  !c.existing || (released instanceof Set ? released.has(c.href) : (released as readonly string[]).includes(c.href));
export const activeFinalFour = (released: ReadonlySet<string> | readonly string[] = []): FinalFourCase[] => FINAL_FOUR.filter((c) => finalFourActive(c, released));

export const finalFourFor = (href: string): FinalFourCase | undefined => FINAL_FOUR.find((c) => c.href === href);

export const FINAL_FOUR_DIR = '/images/case-studies';
export const finalFourImage = (key: FinalFourKey, kind: 'card' | 'hero' | 'hero-wide' | 'dashboard'): string => `${FINAL_FOUR_DIR}/${key}-${kind}.webp`;

/** Same closing title as the paid batch (`PAID_CASE_CLOSE.title`); the sentence and button are the final document's own. */
export const FINAL_FOUR_CLOSE_TITLE = 'Tell us what you are trying to fix';
