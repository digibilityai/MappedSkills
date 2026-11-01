import type { ContentfulCaseStudy } from '@/lib/contentful/types';
import { doc, h3, li, p, ul } from '@/lib/case-study-doc-builders';

/**
 * DEVELOPMENT-PREVIEW ONLY. The copy of the six paid-advertising case studies supplied on 30 October 2026 (AnybodyCanBake Meta Ads,
 * EKoching, Klenzmo, Bakersville, Phoenix Laundry, HutnHomes), as Contentful-shaped entries, so the owner can review the pages, the
 * /work cards and the service and industry placements before any Contentful change. It is added by `withLocalPreview`
 * (`lib/case-study-local-preview.ts`), which applies only when `NODE_ENV === 'development'` AND `CASE_STUDY_LOCAL_PREVIEW=1`;
 * `next build`, `next start`, the tests and every deployment ignore it, so it cannot become a production fallback. The entry IDs
 * are deliberately not Contentful IDs.
 *
 * Source: the six approval-draft DOCX files. Public copy only: the production image briefs and "Notes for approval" are not here.
 * Deliberate differences from the DOCX, each listed in docs/work-redesign/paid-case-batch/CASE_BATCH_REPORT.md: thousands commas in
 * numbers, "reported sales" for HutnHomes (the draft says "23 sales" and "completed sales"), and the three reconciliation remarks
 * about rounded or earlier supplied costs (Klenzmo and Bakersville "consistent with ... rounding", Phoenix "rather than the
 * supplied ₹615") are not shown publicly. No testimonial. No figure, tactic or claim beyond the drafts.
 *
 * SECOND BATCH (31 October 2026): eight further studies from `MappedSkills_8_Final_Case_Studies_and_Image_Briefs.docx` (AnybodyCanBake
 * SEO, Advit Prints, Meticulous Business Plan, Libros Library, Bakedemy Google Ads, Bakedemy Meta Ads, Bblewrap, Talreja & Talreja),
 * appended after the first six in the order of that document. Public copy only: the image briefs, the "Calculation corrections and
 * production notes" page and the "Production note" of each case are internal and are not here. Deliberate differences from the
 * document are listed in docs/work-redesign/paid-case-batch/CASE_BATCH_REPORT.md (second batch).
 *
 * Remove this file (and its call in `lib/case-study-local-preview.ts`) when the entries are created in Contentful.
 */
type Spec = {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  sector: 'education' | 'ecommerce-retail' | 'real-estate' | 'professional-services' | null;
  serviceKey: '/google-ads' | '/social-media-ads' | '/seo';
  /** Month precision only: the page shows months, never a day boundary. */
  periodStart: string | null;
  periodEnd: string | null;
  summary: string;
  problem: ReturnType<typeof doc>;
  whatWeDid: ReturnType<typeof doc>;
  impact: ReturnType<typeof doc>;
  evidenceNote: string;
};

const SPECS: Spec[] = [
  {
    id: 'local-preview-anybodycanbake-meta-ads',
    slug: 'anybodycanbake-meta-ads',
    title: 'Adapting course advertising as learning preferences changed',
    client: 'AnybodyCanBake, Pune, India',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: '/social-media-ads',
    periodStart: '2021-09-01',
    periodEnd: '2026-10-30',
    summary:
      'MappedSkills has worked on AnybodyCanBake’s Meta advertising since 2018. When demand shifted back towards offline learning after COVID, approaches that had worked for online courses became less effective. Course price revisions and expansion into international markets helped the business return to profitability, according to MappedSkills founder Amit Gupta. For September 2021 to October 2026, the business reports 3,892 paid enrolments attributed to Facebook Ads and ₹2,78,95,678 in revenue on ₹42,78,961 in advertising spend.',
    problem: doc(
      p({ b: 'What worked earlier stopped working as well' }),
      p('Amit describes a learning market that moved from offline towards online courses, swung back towards offline learning after COVID, and is now seeing renewed interest in online learning. For AnybodyCanBake, the shift back towards offline demand affected advertising economics and profitability.'),
      ul(
        li({ b: 'Changing customer preference:' }, ' Selling an online learning offer became harder when more prospective learners preferred an offline experience.'),
        li({ b: 'Pressure on profitability:' }, ' Continuing with an approach that had worked earlier was no longer enough to maintain profitable acquisition.'),
        li({ b: 'The objective stayed the same:' }, ' The campaigns remained focused on sales. The response needed to address the commercial offer and the markets reached.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Revisit pricing and reach beyond the existing market' }),
      p('The response combined course price revisions with expansion of sales advertising into international locations. It addressed both the value of a sale and the markets in which the offer could find buyers.'),
      ul(
        li({ b: 'Course price revisions:' }, ' Pricing was revised as part of the response to weaker advertising economics. Course names, prices and individual offers are not disclosed.'),
        li({ b: 'International expansion:' }, ' The advertising reach expanded into international locations, opening the offer to learners beyond the existing market.'),
        li({ b: 'Sales remained the focus:' }, ' The campaigns continued to pursue purchases through changing market conditions rather than changing the success measure to clicks or views.'),
      ),
    ),
    impact: doc(
      p({ b: '3,892 paid enrolments and ₹2 crore 79 lakh in reported revenue' }),
      p('From September 2021 to October 2026, the reported totals show 3,892 paid enrolments attributed to Facebook Ads and ₹2,78,95,678 in revenue. The corresponding advertising spend was ₹42,78,961.'),
      ul(
        li({ b: '6.52×' }, ' return on ad spend. Approximately ₹6.52 in reported revenue per ₹1 of advertising spend, calculated from the whole-period totals, September 2021 to October 2026. ROAS alone does not establish profit.'),
        li({ b: '3,892' }, ' paid enrolments attributed to Facebook Ads for the selected reporting period, September 2021 to October 2026.'),
        li({ b: '₹2,78,95,678' }, ' in reported revenue, approximately ₹2.79 crore, across September 2021 to October 2026.'),
        li({ b: '₹42,78,961' }, ' in advertising spend across September 2021 to October 2026.'),
        li({ b: '₹1,099.42' }, ' advertising cost per paid enrolment. Advertising spend divided by paid enrolments, calculated from the whole-period totals.'),
      ),
      h3('A return to profitability with continued adaptation'),
      p('Amit reports that price revisions and international expansion helped restore profitability. The engagement continues as online learning interest picks up again. These aggregate figures do not imply that results improved every month or that every phase was profitable.'),
    ),
    evidenceNote:
      'The relationship history, market observations, sales-campaign objective, commercial changes and results were supplied by MappedSkills founder Amit Gupta. The displayed results cover September 2021 to October 2026, as supplied on 30 October 2026; they do not cover the full relationship since 2018 or a complete future month-end. Cost per enrolment is ₹42,78,961 divided by 3,892. ROAS is ₹2,78,95,678 divided by ₹42,78,961. These are whole-period calculations, not before-and-after comparisons. Phase-level results, attribution settings, refund treatment and a profit reconciliation were not supplied. The return to profitability is founder-reported; ROAS alone does not establish profit. The totals have not been independently checked against account exports and order records.',
  },
  {
    id: 'local-preview-ekoching-google-ads',
    slug: 'ekoching-google-ads',
    title: 'Google Ads linked to 178 paid enrolments for a coaching institute',
    client: 'EKoching',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: '/google-ads',
    periodStart: '2021-08-01',
    periodEnd: '2022-09-30',
    summary:
      'EKoching’s Google Ads engagement generated 4,124 enquiries and 178 attributed paid enrolments between August 2021 and September 2022. Reported revenue was ₹51,62,000 against ₹11,40,000 in advertising spend.',
    problem: doc(
      p({ b: 'Measure the students who join as well as those who enquire' }),
      p('For a coaching institute, an enquiry starts a conversation; a paid enrolment is the commercial outcome. This case follows both stages so prospective education clients can assess the advertising cost against admissions.'),
      ul(
        li({ b: 'Enquiries and admissions are different:' }, ' The campaign result needs to distinguish initial interest from a paid decision.'),
        li({ b: 'Follow the full journey:' }, ' Enquiries, admissions and revenue need to be read over the same reporting period.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Google Ads with admissions as the business measure' }),
      p('MappedSkills’ engagement covered Google Ads for EKoching, managing Search and Display campaigns. The supplied results connect enquiry generation with attributed paid enrolments and revenue, allowing the case to show both the response volume and the cost of an admission.'),
    ),
    impact: doc(
      p({ b: '4,124 enquiries and 178 paid enrolments' }),
      p('The reported totals translate to ₹276.43 per enquiry and ₹6,404.49 in advertising spend per paid enrolment. Paid enrolments were equivalent to 4.32% of the enquiry count; this is a period-level ratio rather than a verified matched-cohort conversion rate.'),
      ul(
        li({ b: '178' }, ' attributed paid enrolments, August 2021 to September 2022.'),
        li({ b: '4.53×' }, ' return on ad spend. Reported revenue divided by advertising spend, calculated from the engagement totals, August 2021 to September 2022. Revenue return is not profit.'),
        li({ b: '4,124' }, ' enquiries generated, August 2021 to September 2022.'),
        li({ b: '₹6,404.49' }, ' advertising cost per paid enrolment. Advertising spend divided by attributed paid enrolments.'),
        li({ b: '₹11,40,000' }, ' in advertising spend, August 2021 to September 2022.'),
        li({ b: '₹51,62,000' }, ' in reported revenue, August 2021 to September 2022.'),
      ),
    ),
    evidenceNote:
      'Figures and engagement dates supplied and confirmed by Amit Gupta on 30 October 2026. Cost per enquiry = ₹11,40,000 ÷ 4,124. Cost per enrolment = ₹11,40,000 ÷ 178. ROAS = ₹51,62,000 ÷ ₹11,40,000. Totals cover the engagement, not a before-and-after comparison. Attribution and refund treatment were not specified. Revenue return is not profit.',
  },
  {
    id: 'local-preview-klenzmo-meta-ads',
    slug: 'klenzmo-meta-ads',
    title: 'Meta Ads linked to 3,957 products sold for Klenzmo',
    client: 'Klenzmo',
    industry: 'D2C and ecommerce',
    sector: 'ecommerce-retail',
    serviceKey: '/social-media-ads',
    periodStart: '2024-09-01',
    periodEnd: '2025-03-31',
    summary:
      'Klenzmo’s Meta Ads engagement recorded 3,957 products sold and ₹43,52,700 in reported revenue between September 2024 and March 2025, against ₹8,40,000 in advertising spend.',
    problem: doc(
      p({ b: 'Connect product discovery with commercial results' }),
      p('For a specialist cleaning brand, advertising needs to move beyond attention to product sales. This case examines the reported product volume and revenue alongside the advertising investment.'),
      ul(
        li({ b: 'Attention needs a buying outcome:' }, ' Reach and engagement alone do not explain the value of advertising to a product business.'),
        li({ b: 'Sales need a clear cost:' }, ' The number of products sold should be assessed against spend and reported revenue.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Meta advertising assessed against product sales' }),
      p('MappedSkills’ engagement covered Meta Ads for Klenzmo. The confirmed reporting scope is product sales, advertising spend and revenue during the selected period.'),
    ),
    impact: doc(
      p({ b: '3,957 products sold and ₹43 lakh 53 thousand in revenue' }),
      p('The supplied totals produce an advertising cost of ₹212.28 per product sold and a 5.18× revenue return on advertising spend.'),
      ul(
        li({ b: '3,957' }, ' products sold, September 2024 to March 2025. Not labelled as orders, purchases or unique customers.'),
        li({ b: '5.18×' }, ' return on ad spend. Reported revenue divided by advertising spend, calculated from the reported totals, September 2024 to March 2025. Revenue return is not profit.'),
        li({ b: '₹8,40,000' }, ' in advertising spend, September 2024 to March 2025.'),
        li({ b: '₹43,52,700' }, ' in reported revenue, September 2024 to March 2025.'),
        li({ b: '₹212.28' }, ' advertising cost per product sold. Advertising spend divided by products sold, calculated from the reported totals.'),
      ),
    ),
    evidenceNote:
      'Figures and dates supplied and confirmed by Amit Gupta on 30 October 2026. Cost per product = ₹8,40,000 ÷ 3,957. ROAS = ₹43,52,700 ÷ ₹8,40,000. The count was supplied as products sold; it is not labelled as orders, purchases or unique customers. The figures do not establish profit, net revenue after refunds or new-customer acquisition cost.',
  },
  {
    id: 'local-preview-bakersville-google-ads',
    slug: 'bakersville-google-ads',
    title: 'Google Ads linked to 4,324 products sold for Bakersville',
    client: 'Bakersville',
    industry: 'D2C and ecommerce',
    sector: 'ecommerce-retail',
    serviceKey: '/google-ads',
    periodStart: '2025-11-01',
    periodEnd: '2026-08-31',
    summary:
      'Bakersville’s Google Ads engagement recorded 4,324 products sold and ₹47,56,400 in reported revenue between November 2025 and August 2026. Advertising spend for the period was ₹9,00,000.',
    problem: doc(
      p({ b: 'Make product advertising accountable to sales' }),
      p('A baking-supplies business needs to assess whether advertising contributes to sales, not just website traffic. This case presents the reported sales volume and revenue against the advertising investment.'),
      ul(
        li({ b: 'Traffic is only an intermediate result:' }, ' The useful business measures are products sold and the revenue attributed to the advertising.'),
        li({ b: 'Use a consistent reporting window:' }, ' Spend and sales outcomes need to cover the same period to make the comparison useful.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Google advertising with a product sales focus' }),
      p('MappedSkills’ engagement covered Google Ads for Bakersville. The confirmed outcome measures are products sold, advertising spend and revenue.'),
    ),
    impact: doc(
      p({ b: '4,324 products sold and ₹47 lakh 56 thousand in revenue' }),
      p('The reported totals produce ₹208.14 in advertising cost per product sold and a 5.28× revenue return on advertising spend.'),
      ul(
        li({ b: '4,324' }, ' products sold, November 2025 to August 2026. Not assumed to equal orders or unique customers.'),
        li({ b: '5.28×' }, ' return on ad spend. Reported revenue divided by advertising spend, calculated from the reported totals, November 2025 to August 2026. Revenue return is not profit.'),
        li({ b: '₹9,00,000' }, ' in advertising spend, November 2025 to August 2026.'),
        li({ b: '₹47,56,400' }, ' in reported revenue, November 2025 to August 2026.'),
        li({ b: '₹208.14' }, ' advertising cost per product sold. Advertising spend divided by products sold, calculated from the reported totals.'),
      ),
    ),
    evidenceNote:
      'Figures and dates supplied and confirmed by Amit Gupta on 30 October 2026. Cost per product = ₹9,00,000 ÷ 4,324. ROAS = ₹47,56,400 ÷ ₹9,00,000. Products sold are not assumed to equal orders or unique customers. Brand and non-brand sales, refund treatment and profit have not been separated in the supplied totals.',
  },
  {
    id: 'local-preview-phoenix-laundry-google-ads',
    slug: 'phoenix-laundry-google-ads',
    title: 'Google Ads linked to 640 new customers for Phoenix Laundry',
    client: 'Phoenix Laundry',
    industry: 'Local services',
    sector: null, // the sector list has no local-services key; the industry name is the chip
    serviceKey: '/google-ads',
    periodStart: '2025-12-01',
    periodEnd: '2026-10-30',
    summary:
      'Phoenix Laundry’s Google Ads engagement generated 1,600 enquiries and 640 new customers from December 2025 to 30 October 2026. Advertising spend was ₹4,00,000, with ₹7,68,000 in reported revenue.',
    problem: doc(
      p({ b: 'Judge acquisition in the context of a repeat service' }),
      p('For a laundry business, a customer can return after the first transaction. The case therefore needs to show the acquisition cost and revenue already generated while keeping estimated lifetime value separate.'),
      ul(
        li({ b: 'An enquiry is not a customer:' }, ' The enquiry count needs to be read alongside the number of new customers acquired.'),
        li({ b: 'Lifetime value needs context:' }, ' Expected future value can inform acquisition decisions, but it is not revenue already collected.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Google advertising measured through to new customers' }),
      p('MappedSkills’ engagement covered Google Ads for Phoenix Laundry, managing Search and Display campaigns. The supplied reporting follows the response from enquiries to new customers and reports revenue generated during the engagement.'),
    ),
    impact: doc(
      p({ b: '640 new customers at ₹625 each in advertising spend' }),
      p('The reported new-customer count is equivalent to 40% of the enquiry count. Advertising cost was ₹250 per enquiry and ₹625 per new customer. Reported revenue was ₹7,68,000, equal to 1.92× advertising spend. The period-level ratio does not establish matched-cohort conversion.'),
      ul(
        li({ b: '640' }, ' new customers, December 2025 to 30 October 2026.'),
        li({ b: '₹625' }, ' advertising cost per new customer. Advertising spend divided by new customers, calculated from the reported totals.'),
        li({ b: '1,600' }, ' enquiries, December 2025 to 30 October 2026.'),
        li({ b: '₹4,00,000' }, ' in advertising spend, December 2025 to 30 October 2026.'),
        li({ b: '₹7,68,000' }, ' in reported revenue generated, December 2025 to 30 October 2026.'),
        li({ b: '1.92×' }, ' revenue return on ad spend. Reported revenue divided by advertising spend, calculated from the reported totals. Revenue return is not profit.'),
      ),
      h3('Customer lifetime value is a separate business estimate'),
      p('The business supplied an average customer lifetime value of ₹50,000. It is an estimate with no method, horizon or revenue-versus-profit basis supplied. It is not realised revenue from these 640 customers and is not included in the revenue or ROAS figures above.'),
    ),
    evidenceNote:
      'Figures, dates and average lifetime value supplied by Amit Gupta on 30 October 2026. Acquisition cost = ₹4,00,000 ÷ 640. ROAS = ₹7,68,000 ÷ ₹4,00,000. The ₹50,000 average lifetime value is a business estimate with no method, horizon or revenue-versus-profit basis supplied. It is not realised revenue from these 640 customers and is not included in ROAS.',
  },
  {
    id: 'local-preview-hutnhomes-meta-ads',
    slug: 'hutnhomes-meta-ads',
    title: 'Meta Ads linked to 329 site visits and 23 reported sales for HutnHomes',
    client: 'HutnHomes',
    industry: 'Real estate',
    sector: 'real-estate',
    serviceKey: '/social-media-ads',
    periodStart: '2023-09-01',
    periodEnd: '2024-12-31',
    summary:
      'HutnHomes’ Meta Ads engagement recorded 2,348 marketing-qualified leads, 845 sales-qualified leads, 329 site visits and 23 reported sales between September 2023 and December 2024. Advertising spend was ₹15,00,000 and reported revenue was ₹46,15,228.',
    problem: doc(
      p({ b: 'Measure buyer progress beyond the first enquiry' }),
      p('Property advertising needs to be assessed through the sales journey. Qualified leads, site visits and reported sales provide a more commercially useful view than lead volume alone.'),
      ul(
        li({ b: 'Qualification has stages:' }, ' Marketing-qualified and sales-qualified leads need separate counts and definitions.'),
        li({ b: 'Visits and sales matter:' }, ' The value of the lead flow becomes clearer when the case follows buyers towards site visits and sales.'),
      ),
    ),
    whatWeDid: doc(
      p({ b: 'Meta advertising with visibility into the sales journey' }),
      p('MappedSkills’ engagement covered Meta Ads for HutnHomes. The supplied results distinguish marketing-qualified leads, sales-qualified leads, site visits and reported sales. This gives the case a sales-journey view without assuming that platform lead submissions alone equal qualified buyers.'),
    ),
    impact: doc(
      p({ b: '845 sales-qualified leads and 23 reported sales' }),
      p('Advertising cost worked out to ₹638.84 per marketing-qualified lead, ₹1,775.15 per sales-qualified lead and ₹4,559.27 per site visit. The spend per reported sale was ₹65,217.39. Reported revenue was 3.08 times advertising spend.'),
      ul(
        li({ b: '329' }, ' site visits, September 2023 to December 2024. Whether visits were attended has not been confirmed.'),
        li({ b: '23' }, ' reported sales, September 2023 to December 2024. Not asserted as completed sales.'),
        li({ b: '845' }, ' sales-qualified leads, September 2023 to December 2024.'),
        li({ b: '2,348' }, ' marketing-qualified leads, September 2023 to December 2024.'),
        li({ b: '₹15,00,000' }, ' in advertising spend, September 2023 to December 2024.'),
        li({ b: '₹46,15,228' }, ' in reported business revenue, September 2023 to December 2024. Not property transaction value or confirmed brokerage income.'),
      ),
      p('The stage counts are reported period totals, not a verified matched cohort.'),
    ),
    evidenceNote:
      'Figures and dates supplied and confirmed by Amit Gupta on 30 October 2026. Each unit cost is ₹15,00,000 divided by the relevant reported count. Revenue return = ₹46,15,228 ÷ ₹15,00,000. Lead-stage definitions, site-visit attendance basis and sale attribution method were not supplied. Revenue is kept as reported business revenue; it is not presented as total property transaction value or confirmed brokerage income. Stage counts are period totals, not a verified matched cohort.',
  },

  // ---------------------------------------------------------------------------------------------------------------------------
  // SECOND BATCH (31 October 2026)
  // ---------------------------------------------------------------------------------------------------------------------------
  {
    id: 'local-preview-anybodycanbake-seo',
    slug: 'anybodycanbake-seo',
    title: '25.49 percent more organic clicks and 46.15 percent more course enquiries',
    client: 'AnybodyCanBake, Pune, India',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: '/seo',
    periodStart: '2026-05-01',
    periodEnd: '2026-10-01', // months only (May 2026 to October 2026); the page shows month precision, no day boundary is implied
    summary:
      'AnybodyCanBake recorded 20,580 organic clicks from August 2026 to October 2026, up from 16,400 from May 2026 to July 2026. Tracked organic course enquiries increased from 91 to 133, connecting stronger search discovery with more interest in paid learning.',
    problem: doc(
      p('A baking website can attract recipe readers without making its learning offer easy to discover. The challenge was to connect relevant searches with useful content and a clear path towards course enquiries.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Separate discovery from learning intent.' }, ' Organise recipe searches and course related searches around the questions each visitor needs answered.'),
        li({ b: 'Make useful content easier to navigate.' }, ' Strengthen page titles, content structure and internal links so readers can find the next relevant learning step.'),
        li({ b: 'Measure beyond traffic.' }, ' Review indexing and mobile usability alongside organic clicks, nonbrand discovery and tracked course enquiries.'),
      ),
    ),
    impact: doc(
      p({ b: '25.49% more organic clicks and 46.15% more tracked course enquiries' }),
      p('Across two matched three-month periods, May 2026 to July 2026 and August 2026 to October 2026, organic clicks rose from 16,400 to 20,580, nonbrand organic clicks from 15,348 to 20,039 and tracked organic course enquiries from 91 to 133.'),
      ul(
        li({ b: '25.49%' }, ' organic click growth. Organic clicks rose from 16,400 in May 2026 to July 2026 to 20,580 in August 2026 to October 2026.'),
        li({ b: '30.56%' }, ' nonbrand click growth. Nonbrand organic clicks rose from 15,348 in May 2026 to July 2026 to 20,039 in August 2026 to October 2026.'),
        li({ b: '46.15%' }, ' organic enquiry growth. Tracked organic course enquiries rose from 91 in May 2026 to July 2026 to 133 in August 2026 to October 2026.'),
        li({ b: '16,400 → 20,580' }, ' organic clicks, May 2026 to July 2026, then August 2026 to October 2026.'),
        li({ b: '15,348 → 20,039' }, ' nonbrand organic clicks, May 2026 to July 2026, then August 2026 to October 2026.'),
        li({ b: '91 → 133' }, ' tracked organic course enquiries, May 2026 to July 2026, then August 2026 to October 2026.'),
      ),
      p('August 2026 to October 2026 delivered 4,180 more organic clicks and 42 more tracked course enquiries. Nonbrand clicks rose by 4,691 and represented 97.37% of clicks in August 2026 to October 2026. The result gives the case a business focus beyond traffic alone. This compares two periods and does not show that the work alone caused the change.'),
      p('More discovery should create a useful next step for the visitor. Here, course enquiries grew faster than organic clicks.'),
    ),
    evidenceNote:
      'The figures were supplied by MappedSkills and the periods confirmed by the owner on 31 October 2026. They compare two three-month periods, May 2026 to July 2026 and August 2026 to October 2026; exact day boundaries were not supplied, and October is not described as a completed month. Growth is the later figure divided by the earlier figure, less one. The nonbrand share is 20,039 divided by 20,580. How nonbrand clicks were classified, how course enquiries were tracked and which search pages or content changed were not supplied, and no keyword positions or monthly trends are shown. This is a comparison of two periods, not proof that the work alone caused the change. The figures have not been independently checked against search console or analytics exports.',
  },
  {
    id: 'local-preview-advit-prints-meta-ads',
    slug: 'advit-prints-meta-ads',
    title: '874 attributed orders from Meta Ads at ₹411.90 per order',
    client: 'Advit Prints',
    industry: 'D2C and ecommerce',
    sector: 'ecommerce-retail',
    serviceKey: '/social-media-ads',
    periodStart: '2024-02-01',
    periodEnd: '2024-08-31',
    summary:
      'For Advit Prints, the campaign connected visual product discovery with measurable orders. Advertising spend of ₹3,60,000 generated 874 attributed orders and ₹11,36,200 in attributed revenue, a 3.16× revenue return on ad spend.',
    problem: doc(
      p('Handblock prints need more than an attractive product shot. Buyers want to understand the fabric, finish and how a piece will look in use. The challenge was to communicate those details clearly enough to move from interest to purchase.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Show the product in use.' }, ' Combine fabric closeups with styling and home use scenes to make the product easier to evaluate.'),
        li({ b: 'Match creative to buying stage.' }, ' Give new audiences a clear introduction and use relevant product reminders for eligible returning visitors.'),
        li({ b: 'Keep the campaign focused on orders.' }, ' Review creative through purchase cost and order value, supported by catalogue availability and purchase tracking.'),
      ),
    ),
    impact: doc(
      p({ b: '874 attributed orders and ₹11,36,200 in attributed order revenue' }),
      p('The campaign delivered an average attributed order value of ₹1,300 against an acquisition cost of ₹411.90 per order. That places the commercial story around purchases and revenue efficiency, rather than clicks or engagement.'),
      ul(
        li({ b: '874' }, ' attributed orders from Meta Ads, February 2024 to August 2024.'),
        li({ b: '₹411.90' }, ' cost per attributed order. Advertising spend divided by attributed orders.'),
        li({ b: '3.16×' }, ' revenue return on ad spend. Attributed order revenue divided by advertising spend. Revenue return is not profit.'),
        li({ b: '₹11,36,200' }, ' in attributed order revenue, February 2024 to August 2024.'),
        li({ b: '₹3,60,000' }, ' in advertising spend, February 2024 to August 2024.'),
        li({ b: '₹1,300.00' }, ' average attributed order value. Attributed order revenue divided by attributed orders.'),
      ),
      p('For a visual textile brand, show the details that help a customer decide and measure the result at purchase level.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Cost per order is ₹3,60,000 divided by 874. Average order value is ₹11,36,200 divided by 874. Revenue ROAS is ₹11,36,200 divided by ₹3,60,000. The month range does not establish exact day boundaries. Attribution settings, refund treatment, product margins and the share of repeat buyers were not supplied, and revenue return is not profit. The figures have not been independently checked against account exports and order records.',
  },
  {
    id: 'local-preview-meticulous-business-plan-google-ads',
    slug: 'meticulous-business-plan-google-ads',
    title: '27 signed engagements from Google Ads at ₹13,333.33 each',
    client: 'Meticulous Business Plan',
    industry: 'Professional services',
    sector: 'professional-services',
    serviceKey: '/google-ads',
    periodStart: '2026-04-01',
    periodEnd: '2026-09-30',
    summary:
      'Meticulous Business Plan generated 287 enquiries through Google Ads, of which 94 were qualified and 27 became signed engagements. With ₹3,60,000 in advertising spend and ₹12,15,000 in engagement revenue, the campaign delivered 3.38× revenue ROAS.',
    problem: doc(
      p('Someone searching for a business plan may want a free template, academic help or a paid consulting engagement. The challenge was to reach businesses ready to commission work and judge performance by the quality of the resulting pipeline.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Focus on commercial service intent.' }, ' Separate business plan and project report searches into focused campaign themes.'),
        li({ b: 'Reduce irrelevant enquiries.' }, ' Review search terms for free template, academic and unrelated research intent, and align the landing page with the service searched.'),
        li({ b: 'Follow leads through to signed work.' }, ' Use enquiry qualification and engagement outcomes to assess the campaign beyond lead volume.'),
      ),
    ),
    impact: doc(
      p({ b: '27 signed engagements from 287 enquiries' }),
      p('Of 287 unique enquiries, 94 were qualified and 27 became signed engagements. Advertising spend of ₹3,60,000 worked out at ₹1,254.36 per enquiry and ₹13,333.33 per signed engagement.'),
      ul(
        li({ b: '27' }, ' signed engagements, April 2026 to September 2026.'),
        li({ b: '₹13,333.33' }, ' cost per signed engagement. Advertising spend divided by signed engagements.'),
        li({ b: '3.38×' }, ' revenue return on ad spend. Revenue from engagements divided by advertising spend. Revenue return is not profit.'),
        li({ b: '287' }, ' unique enquiries, of which 94 were qualified. Cost per enquiry ₹1,254.36.'),
        li({ b: '₹12,15,000' }, ' in revenue from engagements, April 2026 to September 2026.'),
        li({ b: '₹3,60,000' }, ' in advertising spend, April 2026 to September 2026.'),
      ),
      p('32.75% of enquiries qualified, and 28.72% of qualified enquiries became signed engagements. Across all enquiries, the conversion rate to signed work was 9.41%. The average revenue per signed engagement was ₹45,000. These are ratios of period totals, not a tracked cohort.'),
      p('₹45,000 is revenue per engagement, not acquisition cost. The acquisition cost was ₹13,333.33, making signed work the most useful result to lead with.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Costs and percentages are calculated from the supplied counts and rounded to two decimal places: cost per enquiry ₹3,60,000 divided by 287, cost per signed engagement ₹3,60,000 divided by 27, revenue ROAS ₹12,15,000 divided by ₹3,60,000. The enquiry, qualification and signing totals are period totals, so the rate of enquiries that became signed work is a period ratio, not a tracked cohort. The qualification criteria, the signing date basis and the attribution method were not supplied, and revenue return is not profit. The figures have not been independently checked against account exports and the client’s records.',
  },
  {
    id: 'local-preview-libros-library-meta-ads',
    slug: 'libros-library-meta-ads',
    title: '540 new paid memberships at ₹400 per member',
    client: 'Libros Library',
    industry: 'Online Library',
    sector: null, // the sector list has no matching key; the industry name is the chip (owner decision 31 October 2026)
    serviceKey: '/social-media-ads',
    periodStart: '2025-06-01',
    periodEnd: '2026-03-31',
    summary:
      'Libros Library generated 2,204 membership enquiries and acquired 540 new paid memberships through Meta Ads. Advertising spend of ₹2,16,000 translated into ₹400 per new member. The supplied lifetime value is ₹4,800 per membership.',
    problem: doc(
      p('A subscription library asks customers to build an ongoing reading habit. The campaign needed to explain the value of membership clearly to customers of an online library serving readers across India.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Make the membership easy to understand.' }, ' Build creative around reading routines, book selection and membership convenience.'),
        li({ b: 'Describe the library accurately.' }, ' Present Libros Library as an online library serving customers across India.'),
        li({ b: 'Measure paid membership separately.' }, ' Follow the journey from enquiry to first paid membership so lead volume does not become the only measure of success.'),
      ),
    ),
    impact: doc(
      p({ b: '540 new paid memberships from 2,204 enquiries' }),
      p('Advertising spend of ₹2,16,000 worked out at ₹98.00 per membership enquiry and ₹400.00 per new paid member.'),
      ul(
        li({ b: '540' }, ' new paid memberships, June 2025 to March 2026.'),
        li({ b: '₹400.00' }, ' cost per new paid member. Advertising spend divided by new paid memberships.'),
        li({ b: '24.50%' }, ' of enquiries became paid memberships. 540 divided by 2,204, a ratio of period totals rather than a tracked cohort.'),
        li({ b: '2,204' }, ' unique membership enquiries, June 2025 to March 2026. Cost per enquiry ₹98.00.'),
        li({ b: '₹2,16,000' }, ' in advertising spend, June 2025 to March 2026.'),
        li({ b: '₹4,800' }, ' lifetime value per membership, as supplied. This is not revenue collected during the campaign and is not part of any return on ad spend.'),
      ),
      p('At ₹400 in advertising cost per new member, the acquisition cost was one twelfth of the supplied ₹4,800 lifetime value. That comparison explains why recurring membership economics matter; lifetime value is not revenue collected during the campaign.'),
      p('Lead with member acquisition cost and the value of an ongoing membership. Keep lifetime value separate from campaign revenue and ROAS.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Cost per enquiry is ₹2,16,000 divided by 2,204, cost per new member ₹2,16,000 divided by 540, and the enquiry to membership rate is 540 divided by 2,204. The ₹4,800 lifetime value per membership is a supplied figure with no method or horizon supplied. It is not multiplied by the number of memberships, is not presented as revenue and is not used to compute a revenue return. Initial membership revenue was not supplied, so no revenue ROAS is shown. The enquiry and membership totals are period totals, not a tracked cohort. The figures have not been independently checked against account exports and membership records.',
  },
  {
    id: 'local-preview-bakedemy-google-ads',
    slug: 'bakedemy-google-ads',
    title: '627 paid enrolments from learners searching for baking education',
    client: 'Bakedemy',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: '/google-ads',
    periodStart: '2022-03-01',
    periodEnd: '2024-03-31',
    summary:
      'Bakedemy’s Google Ads campaign generated 5,620 course enquiries and 627 paid enrolments. Advertising spend of ₹24,00,000 supported ₹94,05,000 in attributed enrolment revenue, with a cost per enrolment of ₹3,827.75 and 3.92× revenue ROAS.',
    problem: doc(
      p('People comparing baking courses have different learning goals, budgets and preferred formats. The challenge was to connect serious learning intent with a relevant enquiry journey and follow that interest through to paid admission.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Organise campaigns around learning intent.' }, ' Match search themes and ad messages to the learner’s needs without exposing private course details.'),
        li({ b: 'Keep the landing journey relevant.' }, ' Use focused landing pages and filter irrelevant recipe, job and free content searches through search term review.'),
        li({ b: 'Measure admissions beyond enquiries.' }, ' Track enquiries and paid enrolments as separate stages, with admission outcomes informing performance reporting.'),
      ),
    ),
    impact: doc(
      p({ b: '627 paid enrolments from 5,620 course enquiries' }),
      p('Advertising spend of ₹24,00,000 worked out at ₹427.05 per course enquiry and ₹3,827.75 per paid enrolment.'),
      ul(
        li({ b: '627' }, ' paid enrolments, March 2022 to March 2024.'),
        li({ b: '₹3,827.75' }, ' cost per paid enrolment. Advertising spend divided by paid enrolments.'),
        li({ b: '3.92×' }, ' revenue return on ad spend. Attributed enrolment revenue divided by advertising spend. Revenue return is not profit.'),
        li({ b: '5,620' }, ' unique course enquiries, March 2022 to March 2024. Cost per enquiry ₹427.05.'),
        li({ b: '₹94,05,000' }, ' in attributed enrolment revenue, March 2022 to March 2024.'),
        li({ b: '₹24,00,000' }, ' in advertising spend, March 2022 to March 2024.'),
      ),
      p('11.16% of enquiries became paid enrolments. Average attributed revenue per enrolment was ₹15,000. The case connects relevant search demand with admissions, giving prospective education clients a clear view of both lead cost and enrolment cost. These are ratios of period totals, not a tracked cohort.'),
      p('A course enquiry matters most when it leads to the right learner joining. Report the admissions outcome alongside enquiry volume.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Cost per enquiry is ₹24,00,000 divided by 5,620, cost per enrolment ₹24,00,000 divided by 627 and revenue ROAS ₹94,05,000 divided by ₹24,00,000. The enquiry and enrolment totals are period totals, so the 11.16% rate is a period ratio, not a tracked cohort. Bakedemy’s Meta Ads results are a separate study. Google and Meta reporting periods overlap, and the two sets of attributed enrolments and revenue are not combined into an unduplicated total. Attribution settings, refund treatment and profit were not supplied. The figures have not been independently checked against account exports and admission records.',
  },
  {
    id: 'local-preview-bakedemy-meta-ads',
    slug: 'bakedemy-meta-ads',
    title: '738 paid enrolments by turning baking interest into learning intent',
    client: 'Bakedemy',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: '/social-media-ads',
    periodStart: '2020-10-01',
    periodEnd: '2024-03-31',
    summary:
      'Bakedemy’s Meta Ads activity generated 4,800 course enquiries and 738 paid enrolments. Advertising spend of ₹27,00,000 produced ₹1,10,70,000 in attributed enrolment revenue, with ₹3,658.54 cost per enrolment and 4.10× revenue ROAS.',
    problem: doc(
      p('Enjoying baking content does not automatically mean someone is ready to join a course. The challenge was to explain the learning offer, qualify interest and move suitable learners towards paid enrolment.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Let teaching introduce the offer.' }, ' Use instructor demonstrations, learning outcome explanations and approved learner stories to show the experience.'),
        li({ b: 'Match the message to readiness.' }, ' Give new audiences a clear introduction and use relevant follow up creative for eligible warm audiences.'),
        li({ b: 'Assess the result at enrolment level.' }, ' Follow enquiries through to paid admissions rather than treating lead generation as the final outcome.'),
      ),
    ),
    impact: doc(
      p({ b: '738 paid enrolments from 4,800 course enquiries' }),
      p('Advertising spend of ₹27,00,000 worked out at ₹562.50 per course enquiry and ₹3,658.54 per paid enrolment.'),
      ul(
        li({ b: '738' }, ' paid enrolments, October 2020 to March 2024.'),
        li({ b: '₹3,658.54' }, ' cost per paid enrolment. Advertising spend divided by paid enrolments.'),
        li({ b: '4.10×' }, ' revenue return on ad spend. Attributed enrolment revenue divided by advertising spend. Revenue return is not profit.'),
        li({ b: '4,800' }, ' unique course enquiries, October 2020 to March 2024. Cost per enquiry ₹562.50.'),
        li({ b: '₹1,10,70,000' }, ' in attributed enrolment revenue, October 2020 to March 2024.'),
        li({ b: '₹27,00,000' }, ' in advertising spend, October 2020 to March 2024.'),
      ),
      p('15.38% of enquiries converted into paid enrolments. Average attributed revenue per enrolment was ₹15,000. The commercial story is the progression from discovery to paid learning, supported by a clear acquisition cost. These are ratios of period totals, not a tracked cohort.'),
      p('Demonstration can earn attention; the value of that attention is best assessed through paid enrolments.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Cost per enquiry is ₹27,00,000 divided by 4,800, cost per enrolment ₹27,00,000 divided by 738 and revenue ROAS ₹1,10,70,000 divided by ₹27,00,000. The enquiry and enrolment totals are period totals, so the 15.38% rate is a period ratio, not a tracked cohort. Bakedemy’s Google Ads results are a separate study. Google and Meta reporting periods overlap, and the two sets of attributed enrolments and revenue are not combined into an unduplicated total. The learner stories mentioned were approved for use; none is quoted here. Attribution settings, refund treatment and profit were not supplied. The figures have not been independently checked against account exports and admission records.',
  },
  {
    id: 'local-preview-bblewrap-google-ads',
    slug: 'bblewrap-google-ads',
    title: '6 signed design projects from Google Ads',
    client: 'Bblewrap',
    industry: 'Professional services',
    sector: 'professional-services',
    serviceKey: '/google-ads',
    periodStart: '2024-09-01',
    periodEnd: '2025-03-31',
    summary:
      'Bblewrap generated 348 project enquiries, including 42 qualified design briefs and six signed projects. Advertising spend of ₹4,40,000 supported ₹12,00,000 in project revenue, resulting in ₹73,333.33 per signed project and 2.73× revenue ROAS.',
    problem: doc(
      p('Design searches attract different audiences, including businesses, students and jobseekers. The challenge was to reach businesses with a genuine design requirement and assess the resulting enquiries by brief quality and signed work.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Separate branding and package design intent.' }, ' Match search themes to the specific service a prospective client needs.'),
        li({ b: 'Make the portfolio support qualification.' }, ' Connect service focused enquiries with relevant work examples and clear project requirements.'),
        li({ b: 'Follow briefs through to signed projects.' }, ' Review lead quality alongside acquisition cost, keeping project enquiries and signed work distinct.'),
      ),
    ),
    impact: doc(
      p({ b: '6 signed design projects from 348 enquiries' }),
      p('Of 348 unique project enquiries, 42 were qualified design briefs and 6 became signed projects. Advertising spend of ₹4,40,000 worked out at ₹1,264.37 per enquiry and ₹73,333.33 per signed project.'),
      ul(
        li({ b: '6' }, ' signed projects, September 2024 to March 2025.'),
        li({ b: '₹73,333.33' }, ' cost per signed project. Advertising spend divided by signed projects.'),
        li({ b: '2.73×' }, ' revenue return on ad spend. Revenue from signed projects divided by advertising spend. Revenue return is not profit.'),
        li({ b: '348' }, ' unique project enquiries, of which 42 were qualified design briefs. Cost per enquiry ₹1,264.37.'),
        li({ b: '₹12,00,000' }, ' in revenue from signed projects, September 2024 to March 2025.'),
        li({ b: '₹4,40,000' }, ' in advertising spend, September 2024 to March 2025.'),
      ),
      p('12.07% of project enquiries qualified as design briefs, and 14.29% of qualified briefs became signed projects. Average revenue per signed project was ₹2,00,000. That is distinct from the ₹73,333.33 advertising cost to acquire each signed project. These are ratios of period totals, not a tracked cohort.'),
      p('For a design consultancy, the strongest story is the work won from qualified briefs. Enquiry volume alone does not show commercial value.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Costs and percentages are calculated from the supplied counts and rounded to two decimal places: cost per enquiry ₹4,40,000 divided by 348, cost per signed project ₹4,40,000 divided by 6, revenue ROAS ₹12,00,000 divided by ₹4,40,000. With only six signed projects, small changes in the count move the cost and revenue figures sharply. The enquiry, brief and project totals are period totals, not a tracked cohort. The brief qualification criteria, the signing date basis, the attribution method and whether revenue is fully collected were not supplied, and revenue return is not profit. The figures have not been independently checked against account exports and the client’s records.',
  },
  {
    id: 'local-preview-talreja-talreja-google-ads',
    slug: 'talreja-talreja-google-ads',
    title: '19 signed engagements from Google Ads at ₹9,473.68 each',
    client: 'Talreja & Talreja',
    industry: 'Professional services',
    sector: 'professional-services',
    serviceKey: '/google-ads',
    periodStart: '2022-03-01',
    periodEnd: '2022-09-30',
    summary:
      'Talreja & Talreja generated 580 enquiries through Google Ads, with 127 qualified consultations and 19 signed engagements. Advertising spend of ₹1,80,000 supported ₹5,70,000 in first contracted fee revenue, producing 3.17× revenue ROAS.',
    problem: doc(
      p('An enquiry for a professional service can be an information request or a business ready to appoint an adviser. The challenge was to connect relevant search demand with qualified consultations and paid work.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Keep service intent clear.' }, ' Structure search themes around the professional service the potential client needs.'),
        li({ b: 'Align the enquiry journey.' }, ' Use relevant landing page information and qualification questions to make the next step clear.'),
        li({ b: 'Report the commercial outcome.' }, ' Follow enquiries through qualified consultations and signed engagements, keeping each stage visible in reporting.'),
      ),
    ),
    impact: doc(
      p({ b: '19 signed engagements from 580 enquiries' }),
      p('Of 580 unique enquiries, 127 led to qualified consultations and 19 became signed engagements. Advertising spend of ₹1,80,000 (INR equivalent) worked out at ₹310.34 per enquiry and ₹9,473.68 per signed engagement.'),
      ul(
        li({ b: '19' }, ' signed engagements, March 2022 to September 2022.'),
        li({ b: '₹9,473.68' }, ' cost per signed engagement. Advertising spend divided by signed engagements.'),
        li({ b: '3.17×' }, ' revenue return on ad spend. First contracted fee revenue divided by advertising spend. Revenue return is not profit.'),
        li({ b: '580' }, ' unique enquiries, of which 127 led to qualified consultations. Cost per enquiry ₹310.34.'),
        li({ b: '₹5,70,000' }, ' in first contracted fee revenue (INR equivalent), March 2022 to September 2022.'),
        li({ b: '₹1,80,000' }, ' in advertising spend (INR equivalent), March 2022 to September 2022.'),
      ),
      p('21.90% of enquiries led to qualified consultations, and 14.96% of those consultations became signed engagements. Average first contracted fee revenue per engagement was ₹30,000; advertising acquisition cost per engagement was ₹9,473.68. These are ratios of period totals, not a tracked cohort.'),
      p('Lead with signed engagements and acquisition cost. Recurring fees or lifetime value are not included in the supplied first contracted fee revenue.'),
    ),
    evidenceNote:
      'The figures and the month range were supplied by MappedSkills in the final case study set of 30 October 2026. Advertising spend and first contracted fee revenue are stated in INR equivalent. Costs and percentages are calculated from the supplied counts and rounded to two decimal places: cost per enquiry ₹1,80,000 divided by 580, cost per signed engagement ₹1,80,000 divided by 19, revenue ROAS ₹5,70,000 divided by ₹1,80,000. The ₹30,000 is the average first contracted fee revenue per engagement; it is not a lifetime value, and recurring fees are not included. The enquiry, consultation and engagement totals are period totals, not a tracked cohort. The qualification criteria, the signing date basis and the attribution method were not supplied, and revenue return is not profit. The figures have not been independently checked against account exports and the client’s records.',
  },
];

const entry = (s: Spec): ContentfulCaseStudy => ({
  sys: { id: s.id, firstPublishedAt: '2026-10-30T00:00:00.000Z', publishedAt: '2026-10-30T00:00:00.000Z', publishedVersion: 1 },
  title: s.title,
  slug: s.slug,
  clientName: { clientName: s.client, date: '' },
  industry: { name: s.industry },
  summary: s.summary,
  problem: { json: s.problem },
  whatWeDid: { json: s.whatWeDid },
  impact: { json: s.impact },
  evidenceNote: s.evidenceNote,
  showTestimonial: false,
  sector: s.sector,
  serviceKey: s.serviceKey,
  periodStart: s.periodStart,
  periodEnd: s.periodEnd,
});

/** The fourteen Contentful-shaped entries: the six of 30 October (documents 02, 04, 05, 06, 07, 08), then the eight of 31 October in the order of the final document. */
export const batchPreviewEntries = (): ContentfulCaseStudy[] => SPECS.map(entry);
export const BATCH_SPECS = SPECS;
