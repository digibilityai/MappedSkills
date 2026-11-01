/**
 * THE PAID-ADVERTISING CASE STUDIES (local review batches, 30 and 31 October 2026: six, then eight, one SEO): the code-resident part. Words and files only; no
 * figure is computed here. Image slots (`lib/case-study-images.ts`), per-study presentation extras (`lib/case-study-presentation.ts`)
 * and the listing card copy (`components/b2/work-cards.ts`) are all built from this one list, so a case's card, hero and dashboard
 * can never be associated with another case.
 *
 * Inert without a matching Contentful entry: every record is keyed by the study's page address, and a study is public only when
 * its Contentful entry is published. The copy of each study is NOT here; it is Contentful content. For the local review it is
 * the development-only fixture in `lib/case-study-local-batch.ts`, which cannot run in a build, a test or a deployment.
 *
 * Artwork (supplied 30 October 2026, used as supplied): card 1586 x 992, hero 1672 x 941, dashboard 1586 x 992, plus a 2.6:1 desktop
 * hero derivative (1672 x 643) made by `docs/work-redesign/paid-case-batch/tools/make-wide-heroes.cjs`. The desktop stage shows the
 * derivative, narrow screens show the supplied hero whole, and the sharing image is the supplied hero. Each file name is
 * `<client>-<service>-<kind>.webp` under `/images/case-studies/`.
 */
export type PaidCaseKey =
  | 'anybodycanbake-meta-ads' | 'ekoching-google-ads' | 'klenzmo-meta-ads' | 'bakersville-google-ads' | 'phoenix-laundry-google-ads' | 'hutnhomes-meta-ads'
  // second batch (31 October 2026): eight further studies from the final case study set, in the order of that document
  | 'anybodycanbake-seo' | 'advit-prints-meta-ads' | 'meticulous-business-plan-google-ads' | 'libros-library-meta-ads'
  | 'bakedemy-google-ads' | 'bakedemy-meta-ads' | 'bblewrap-google-ads' | 'talreja-talreja-google-ads';

export type PaidCase = {
  key: PaidCaseKey;
  /** The study's page address; also its Contentful slug when released. */
  href: string;
  /** Client name as the card title and the outlined stage name. */
  client: string;
  service: 'Google Ads' | 'Meta Ads' | 'SEO';
  /** The industry as the owner wrote it on the case document and the card eyebrow. */
  industry: string;
  /** Listing card (text under the image): no figure, no outcome. */
  card: { eyebrow: string; body: string; cta: string };
  /** The short search and sharing description. */
  metaDescription: string;
  alt: { card: string; hero: string };
  /** The recreated agency dashboard inside "The impact"; null when it has not been supplied. */
  dashboard: { alt: string } | null;
};


export const PAID_CASES: readonly PaidCase[] = [
  {
    key: 'anybodycanbake-meta-ads',
    href: '/portfolio/anybodycanbake-meta-ads',
    client: 'AnybodyCanBake',
    service: 'Meta Ads',
    industry: 'Education and training',
    card: {
      eyebrow: 'Meta Ads · Education and training',
      body: 'A Pune online baking school whose Meta advertising has been adapted since 2018 as learning preferences changed.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for AnybodyCanBake, an online baking school: 3,892 paid enrolments attributed to Facebook Ads and a 6.52× reported ROAS, Sep 2021 to Oct 2026.',
    alt: {
      card: 'AnybodyCanBake, Meta Ads. 3,892 paid enrolments. Working together since 2018; results September 2021 to October 2026. An illustrative baking-learning scene with a laptop showing a baking video beside dough, a rolling pin and pastries.',
      hero: 'AnybodyCanBake, Meta Ads. The way people learned changed. So did the advertising. Meta advertising for AnybodyCanBake since 2018. 3,892 paid enrolments and a 6.52 times reported ROAS for September 2021 to October 2026. An illustrative baking-learning scene with a laptop showing a baking video.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for AnybodyCanBake, Meta Ads, sales objective, September 2021 to October 2026, in rupees. Paid enrolments 3,892. Advertising spend ₹42,78,961. Reported revenue ₹2,78,95,678. Advertising cost per enrolment ₹1,099.42. Reported ROAS 6.52 times. A bar chart compares advertising spend with reported revenue, with the note that revenue return is not profit.',
    },
  },
  {
    key: 'ekoching-google-ads',
    href: '/portfolio/ekoching-google-ads',
    client: 'EKoching',
    service: 'Google Ads',
    industry: 'Education and training',
    card: {
      eyebrow: 'Google Ads · Education and training',
      body: 'A coaching institute whose Google Ads results are followed through to paid enrolments, not enquiries alone.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for EKoching, a coaching institute: 178 attributed paid enrolments and a 4.53× reported ROAS, August 2021 to September 2022.',
    alt: {
      card: 'EKoching, Google Ads. 178 paid enrolments, August 2021 to September 2022. An illustrative scene of a student at a laptop with a notebook and a search motif.',
      hero: 'EKoching, Google Ads. From course enquiries to paid enrolments. 178 paid enrolments and a 4.53 times reported ROAS, August 2021 to September 2022. An illustrative study scene with a laptop, notebook and books.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for EKoching, Google Ads, August 2021 to September 2022, in rupees. Enquiries 4,124. Attributed paid enrolments 178. Advertising spend ₹11,40,000. Cost per enquiry ₹276.43. Advertising cost per enrolment ₹6,404.49. Reported revenue ₹51,62,000. Reported ROAS 4.53 times. A campaign selector reads Search + Display. A count display repeats 4,124 enquiries and 178 attributed paid enrolments.',
    },
  },
  {
    key: 'klenzmo-meta-ads',
    href: '/portfolio/klenzmo-meta-ads',
    client: 'Klenzmo',
    service: 'Meta Ads',
    industry: 'D2C and ecommerce',
    card: {
      eyebrow: 'Meta Ads · D2C and ecommerce',
      body: 'A specialist cleaning brand whose Meta advertising is measured against products sold and advertising spend.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for Klenzmo: 3,957 products sold and a 5.18× reported ROAS, September 2024 to March 2025. Products sold are not confirmed order counts.',
    alt: {
      card: 'Klenzmo, Meta Ads. 3,957 products sold, September 2024 to March 2025. An illustrative still life of folded cleaning cloths, a glass of water and a wooden brush.',
      hero: 'Klenzmo, Meta Ads. Product sales measured against advertising spend. 3,957 products sold and a 5.18 times reported ROAS, September 2024 to March 2025. An illustrative still life of folded cleaning cloths and a wooden brush.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Klenzmo, Meta Ads, September 2024 to March 2025, in rupees. Products sold 3,957. Advertising spend ₹8,40,000. Reported revenue ₹43,52,700. Advertising cost per product sold ₹212.28. Reported ROAS 5.18 times. A bar chart compares advertising spend with reported revenue. Products sold are not confirmed order counts, and revenue return is not profit.',
    },
  },
  {
    key: 'bakersville-google-ads',
    href: '/portfolio/bakersville-google-ads',
    client: 'Bakersville',
    service: 'Google Ads',
    industry: 'D2C and ecommerce',
    card: {
      eyebrow: 'Google Ads · D2C and ecommerce',
      body: 'A baking-supplies business whose Google advertising is measured against products sold and advertising spend.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Bakersville, a baking-supplies business: 4,324 products sold and a 5.28× reported ROAS, November 2025 to August 2026.',
    alt: {
      card: 'Bakersville, Google Ads. 4,324 products sold, November 2025 to August 2026. An illustrative flat lay of baking ingredients and decorating tools with a faint search motif.',
      hero: 'Bakersville, Google Ads. Product sales measured against advertising spend. 4,324 products sold and a 5.28 times reported ROAS, November 2025 to August 2026. An illustrative scene of piping tips, cupcake cases and sprinkles.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Bakersville, Google Ads, November 2025 to August 2026, in rupees. Products sold 4,324. Advertising spend ₹9,00,000. Reported revenue ₹47,56,400. Advertising cost per product sold ₹208.14. Reported ROAS 5.28 times. A bar chart compares advertising spend with reported revenue. Products sold are not confirmed order counts, and revenue return is not profit.',
    },
  },
  {
    key: 'phoenix-laundry-google-ads',
    href: '/portfolio/phoenix-laundry-google-ads',
    client: 'Phoenix Laundry',
    service: 'Google Ads',
    industry: 'Local services',
    card: {
      eyebrow: 'Google Ads · Local services',
      body: 'A laundry business whose Google Ads results are followed from enquiries to new customers, with repeat business in view.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Phoenix Laundry: 1,600 enquiries and 640 new customers at ₹625 advertising cost each, December 2025 to 30 October 2026.',
    alt: {
      card: 'Phoenix Laundry, Google Ads. 640 new customers, December 2025 to 30 October 2026. An illustrative garment-care scene of pressed shirts on a rail beside folded clothes.',
      hero: 'Phoenix Laundry, Google Ads. Customer acquisition with repeat business in view. 640 new customers and ₹625 advertising spend per new customer, December 2025 to 30 October 2026. An illustrative garment-care scene of pressed shirts and folded knitwear.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Phoenix Laundry, Google Ads, December 2025 to 30 October 2026, in rupees. Enquiries 1,600. New customers 640. Advertising spend ₹4,00,000. Cost per enquiry ₹250. Advertising cost per new customer ₹625. Reported revenue ₹7,68,000. A campaign selector reads Search + Display. A tile labelled Lifetime Value shows ₹50,000.',
    },
  },
  {
    key: 'hutnhomes-meta-ads',
    href: '/portfolio/hutnhomes-meta-ads',
    client: 'HutnHomes',
    service: 'Meta Ads',
    industry: 'Real estate',
    card: {
      eyebrow: 'Meta Ads · Real estate',
      body: 'A property business whose Meta advertising is followed from qualified leads to site visits and reported sales.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for HutnHomes: 329 site visits and 23 reported sales from 2,348 marketing-qualified leads, September 2023 to December 2024.',
    alt: {
      card: 'HutnHomes, Meta Ads. 329 site visits and 23 reported sales, September 2023 to December 2024. An illustrative scene of a landscaped residential building in warm evening light.',
      hero: 'HutnHomes, Meta Ads. Beyond lead volume: site visits and reported sales. 845 sales-qualified leads and 23 reported sales, September 2023 to December 2024. An illustrative scene of a landscaped residential building.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for HutnHomes, Meta Ads, September 2023 to December 2024, in rupees. Marketing-qualified leads 2,348. Sales-qualified leads 845. Site visits 329. Reported sales 23. These are reported period totals, not a verified matched cohort. Advertising spend ₹15,00,000. Cost per marketing-qualified lead ₹638.84. Cost per sales-qualified lead ₹1,775.15. Cost per site visit ₹4,559.27. Advertising cost per reported sale ₹65,217.39. Reported business revenue ₹46,15,228. Reported revenue over ad spend 3.08 times.',
    },
  },
  // ---- second batch, 31 October 2026 (`MappedSkills_8_Final_Case_Studies_and_Image_Briefs.docx`) ----
  {
    key: 'anybodycanbake-seo',
    href: '/portfolio/anybodycanbake-seo',
    client: 'AnybodyCanBake',
    service: 'SEO',
    industry: 'Education and training',
    card: {
      eyebrow: 'SEO · Education and training',
      body: 'An online baking school whose organic search results are followed through to course enquiries, not clicks alone.',
      cta: 'Read the SEO case study',
    },
    metaDescription: 'SEO for AnybodyCanBake, an online baking school: 25.49% more organic clicks and 46.15% more tracked course enquiries, May to October 2026.',
    alt: {
      card: 'AnybodyCanBake, SEO. 25.49% more organic clicks. 46.15% more course enquiries. An illustrative scene of hands kneading dough on a baking workstation, with a search field leading to a recipe page and a course enquiry button.',
      hero: 'AnybodyCanBake, SEO. 25.49 percent more organic clicks and 46.15 percent more course enquiries. 25.49% organic click growth. Three illustrative frames: a search on a laptop, hands kneading dough, and a baking video on a laptop.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for AnybodyCanBake, SEO performance overview, May 2026 to July 2026 compared with August 2026 to October 2026. Organic click growth 25.49%, nonbrand click growth 30.56%, course enquiry growth 46.15%. Organic clicks 16,400 then 20,580. Nonbrand clicks 15,348 then 20,039. Course enquiries 91 then 133. The selector reads May to Jul vs Aug to Oct 2026. A table repeats the three comparisons with their growth.',
    },
  },
  {
    key: 'advit-prints-meta-ads',
    href: '/portfolio/advit-prints-meta-ads',
    client: 'Advit Prints',
    service: 'Meta Ads',
    industry: 'D2C and ecommerce',
    card: {
      eyebrow: 'Meta Ads · D2C and ecommerce',
      body: 'A handblock textile brand whose Meta advertising is measured against attributed orders and order revenue.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for Advit Prints: 874 attributed orders at ₹411.90 per order and a 3.16× revenue ROAS, February 2024 to August 2024.',
    alt: {
      card: 'Advit Prints, Meta Ads. 874 attributed orders. ₹411.90 cost per order. An illustrative scene of a floral handblock printed throw over an armchair beside printed cushions.',
      hero: 'Advit Prints, Meta Ads. 874 attributed orders from Meta Ads at ₹411.90 per order. 874 attributed orders and a 3.16 times revenue ROAS. An illustrative scene of a floral printed throw and cushions on an armchair.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Advit Prints, Meta Ads, in rupees, February 2024 to August 2024. Attributed orders 874. Advertising spend ₹3,60,000. Reported revenue ₹11,36,200. Cost per order ₹411.90. Revenue ROAS 3.16 times. A bar chart compares advertising spend with reported revenue. A performance summary shows ₹3.16 revenue per ₹1 spent and an average order value of ₹1,300.00.',
    },
  },
  {
    key: 'meticulous-business-plan-google-ads',
    href: '/portfolio/meticulous-business-plan-google-ads',
    client: 'Meticulous Business Plan',
    service: 'Google Ads',
    industry: 'Professional services',
    card: {
      eyebrow: 'Google Ads · Professional services',
      body: 'A business plan service whose Google Ads results are judged by qualified enquiries and signed work, not enquiry volume.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Meticulous Business Plan: 27 signed engagements from 287 enquiries at ₹13,333.33 each and a 3.38× revenue ROAS, April to September 2026.',
    alt: {
      card: 'Meticulous Business Plan, Google Ads. 27 signed engagements. 3.38 times revenue ROAS. An illustrative scene of a person at a desk reviewing printed pages with charts beside a laptop and a search result panel.',
      hero: 'Meticulous Business Plan, Google Ads. 27 signed engagements from Google Ads at ₹13,333.33 each. 287 enquiries, 94 qualified, 27 signed. An illustrative scene of a search field, a consultation and a person signing a document.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Meticulous Business Plan, Google Ads, Search + Display, in rupees, April 2026 to September 2026. Enquiries 287. New customers 27. Advertising spend ₹3,60,000. Cost per enquiry ₹1,254.36. Advertising cost per new customer ₹13,333.33. Reported revenue ₹12,15,000. Revenue ROAS 3.38 times.',
    },
  },
  {
    key: 'libros-library-meta-ads',
    href: '/portfolio/libros-library-meta-ads',
    client: 'Libros Library',
    service: 'Meta Ads',
    industry: 'Online Library',
    card: {
      eyebrow: 'Meta Ads · Online Library',
      body: 'An online library whose Meta advertising is followed from membership enquiries to new paid memberships.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for Libros Library: 540 new paid memberships at ₹400 per member from 2,204 membership enquiries, June 2025 to March 2026.',
    alt: {
      card: 'Libros Library, Meta Ads. 540 new paid memberships. ₹400 cost per new member. An illustrative reading corner where one person hands a book to another beside an armchair, bookshelves and a library bag.',
      hero: 'Libros Library, Meta Ads. 540 new paid memberships at ₹400 per member. ₹4,800 lifetime value per membership, shown separately. An illustrative scene of bookshelves and a person reading in an armchair.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Libros Library, Meta Ads, in rupees, June 2025 to March 2026. New paid memberships 540. Advertising spend ₹2,16,000. Enquiries 2,204. Cost per new member ₹400.00. Lifetime value per membership ₹4,800. A membership funnel bar chart compares 2,204 enquiries with 540 new paid memberships. A performance summary shows conversion 24.50%, cost per enquiry ₹98.00 and the supplied lifetime value per membership of ₹4,800.',
    },
  },
  {
    key: 'bakedemy-google-ads',
    href: '/portfolio/bakedemy-google-ads',
    client: 'Bakedemy',
    service: 'Google Ads',
    industry: 'Education and training',
    card: {
      eyebrow: 'Google Ads · Education and training',
      body: 'A baking education business whose Google Ads results are followed from course enquiries to paid enrolments.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Bakedemy: 627 paid enrolments from 5,620 enquiries at ₹3,827.75 each and a 3.92× revenue ROAS, March 2022 to March 2024.',
    alt: {
      card: 'Bakedemy, Google Ads. 627 paid enrolments. 3.92 times revenue ROAS. An illustrative scene of a learner browsing baking courses on a laptop beside dough, a rolling pin and piping tips.',
      hero: 'Bakedemy, Google Ads. 627 paid enrolments from learners searching for baking education. 627 paid enrolments and ₹3,827.75 cost per enrolment. An illustrative scene of a laptop showing baking pages beside cupcakes being piped.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Bakedemy, Google Ads, Search + Display, in rupees, March 2022 to March 2024. Enquiries 5,620. New customers 627. Advertising spend ₹24,00,000. Cost per enquiry ₹427.05. Advertising cost per new customer ₹3,827.75. Reported revenue ₹94,05,000. Revenue ROAS 3.92 times.',
    },
  },
  {
    key: 'bakedemy-meta-ads',
    href: '/portfolio/bakedemy-meta-ads',
    client: 'Bakedemy',
    service: 'Meta Ads',
    industry: 'Education and training',
    card: {
      eyebrow: 'Meta Ads · Education and training',
      body: 'A baking education business whose Meta advertising is followed from course enquiries to paid enrolments.',
      cta: 'Read the Meta Ads case study',
    },
    metaDescription: 'Meta Ads for Bakedemy: 738 paid enrolments from 4,800 enquiries at ₹3,658.54 each and a 4.10× revenue ROAS, October 2020 to March 2024.',
    alt: {
      card: 'Bakedemy, Meta Ads. 738 paid enrolments. 4.10 times revenue ROAS. An illustrative scene of a baking tutorial video on a tablet beside piped cupcakes and hands holding a piping bag.',
      hero: 'Bakedemy, Meta Ads. 738 paid enrolments by turning baking interest into learning intent. 738 paid enrolments and ₹3,658.54 cost per enrolment. An illustrative scene of a baking video on a phone, an enquiry form and cupcakes being decorated.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Bakedemy, Meta Ads, in rupees, October 2020 to March 2024. Paid enrolments 738. Advertising spend ₹27,00,000. Reported revenue ₹1,10,70,000. Cost per enrolment ₹3,658.54. Revenue ROAS 4.10 times. A bar chart compares advertising spend with reported revenue. A performance summary shows ₹4.10 revenue per ₹1 spent, 4,800 enquiries, ₹562.50 cost per enquiry and 15.38% enrolment conversion.',
    },
  },
  {
    key: 'bblewrap-google-ads',
    href: '/portfolio/bblewrap-google-ads',
    client: 'Bblewrap',
    service: 'Google Ads',
    industry: 'Professional services',
    card: {
      eyebrow: 'Google Ads · Professional services',
      body: 'A design consultancy whose Google Ads results are followed from project enquiries to qualified briefs and signed projects.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Bblewrap, a design consultancy: 6 signed design projects from 348 enquiries and a 2.73× revenue ROAS, September 2024 to March 2025.',
    alt: {
      card: 'Bblewrap, Google Ads. 6 signed design projects. ₹12 lakh project revenue. An illustrative design studio desk with identity prints, packaging prototypes and sample cards.',
      hero: 'Bblewrap, Google Ads. 6 signed design projects from Google Ads. A search, a project brief and 6 signed design projects. An illustrative design studio desk with packaging prototypes and material samples.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Bblewrap, Google Ads, Search + Display, in rupees, September 2024 to March 2025. Enquiries 348. New customers 6. Advertising spend ₹4,40,000. Cost per enquiry ₹1,264.37. Advertising cost per new customer ₹73,333.33. Reported revenue ₹12,00,000. Revenue ROAS 2.73 times.',
    },
  },
  {
    key: 'talreja-talreja-google-ads',
    href: '/portfolio/talreja-talreja-google-ads',
    client: 'Talreja & Talreja',
    service: 'Google Ads',
    industry: 'Professional services',
    card: {
      eyebrow: 'Google Ads · Professional services',
      body: 'A professional services firm whose Google Ads results are followed from enquiries to qualified consultations and signed engagements.',
      cta: 'Read the Google Ads case study',
    },
    metaDescription: 'Google Ads for Talreja & Talreja: 19 signed engagements from 580 enquiries at ₹9,473.68 each and a 3.17× revenue ROAS, March to September 2022.',
    alt: {
      card: 'Talreja & Talreja, Google Ads. 19 signed engagements. ₹9,473.68 cost per engagement. An illustrative professional desk with advisory documents, a pen, a notebook and a consultation calendar.',
      hero: 'Talreja & Talreja, Google Ads. 19 signed engagements from Google Ads at ₹9,473.68 each. An illustrative scene of a search field, a consultation across a table and a person signing an engagement document.',
    },
    dashboard: {
      alt: 'A recreated agency dashboard for Talreja & Talreja, Google Ads, Search + Display, in rupees (INR equivalent), March 2022 to September 2022. Enquiries 580. New customers 19. Advertising spend ₹1,80,000. Cost per enquiry ₹310.34. Advertising cost per new customer ₹9,473.68. Reported revenue ₹5,70,000. A tile labelled Average first contracted fee revenue per engagement shows ₹30,000.',
    },
  },
];

export const paidCaseFor = (href: string): PaidCase | undefined => PAID_CASES.find((c) => c.href === href);

export const PAID_CASE_DIR = '/images/case-studies';
export const paidCaseImage = (key: PaidCaseKey, kind: 'card' | 'hero' | 'hero-wide' | 'dashboard'): string => `${PAID_CASE_DIR}/${key}-${kind}.webp`;

/** The closing band for every study of the batch: the supplied wording, one primary button and the existing "Request a call". */
export const PAID_CASE_CLOSE = {
  title: 'Tell us what you are trying to fix',
  cta: 'Discuss Your Advertising',
  secondary: true,
} as const;

/** The closing sentence, by service, as written in the supplied case documents (see `lib/case-study-local-batch.ts` for the copy). */
export const PAID_CASE_CLOSE_BODY: Record<PaidCaseKey, string> = {
  'anybodycanbake-meta-ads': 'Has the advertising that used to work stopped delivering? Tell us what you sell and what has changed. We will help you assess the offer, the audience and where to focus next.',
  'ekoching-google-ads': 'Want your course advertising measured beyond enquiry volume? Tell us what you teach and how students enrol.',
  'klenzmo-meta-ads': 'Want to understand what your product advertising contributes to sales? Tell us about your products and current advertising.',
  'bakersville-google-ads': 'Want your Google Ads measured against product sales? Tell us about your catalogue and the results you want to improve.',
  'phoenix-laundry-google-ads': 'Want to acquire customers who can return? Tell us about your service areas, customer value and current advertising.',
  'hutnhomes-meta-ads': 'Want to measure property advertising beyond lead volume? Tell us about your projects and how your team qualifies and follows up with buyers.',
  'anybodycanbake-seo': 'Want more relevant visitors to discover your business through search?',
  'advit-prints-meta-ads': 'Want your product discovery campaigns to drive measurable orders?',
  'meticulous-business-plan-google-ads': 'Want enquiries from people ready to commission your services?',
  'libros-library-meta-ads': 'Want more customers to become paying members?',
  'bakedemy-google-ads': 'Want to reach learners actively comparing courses?',
  'bakedemy-meta-ads': 'Want to introduce your courses to more suitable learners?',
  'bblewrap-google-ads': 'Want more relevant project enquiries for your consultancy?',
  'talreja-talreja-google-ads': 'Want more qualified conversations for your professional services firm?',
};

/** The second batch's closing button, named for the service as in the final document ("Discuss your Google Ads goals"); the first six keep PAID_CASE_CLOSE.cta. */
export const PAID_CASE_CLOSE_CTA: Partial<Record<PaidCaseKey, string>> = {
  'anybodycanbake-seo': 'Discuss Your SEO Goals',
  'advit-prints-meta-ads': 'Discuss Your Meta Ads Goals',
  'meticulous-business-plan-google-ads': 'Discuss Your Google Ads Goals',
  'libros-library-meta-ads': 'Discuss Your Meta Ads Goals',
  'bakedemy-google-ads': 'Discuss Your Google Ads Goals',
  'bakedemy-meta-ads': 'Discuss Your Meta Ads Goals',
  'bblewrap-google-ads': 'Discuss Your Google Ads Goals',
  'talreja-talreja-google-ads': 'Discuss Your Google Ads Goals',
};
