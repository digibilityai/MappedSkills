import type { ContentfulCaseStudy } from '@/lib/contentful/types';
import { doc, li, p, ul } from '@/lib/case-study-doc-builders';

/**
 * DEVELOPMENT-PREVIEW ONLY. The final copy of ClassPe, InsurYo, Ameba Software and Wanderlooms (`MappedSkills_4_Additional_Case_Studies_and_Image_Briefs.docx`,
 * 31 October 2026) as Contentful-shaped entries, so the owner can review the pages, the /work cards and the service and industry placements
 * before any Contentful change. It is applied by `withLocalPreview` (`lib/case-study-local-preview.ts`), which acts only when
 * `NODE_ENV === 'development'` AND `CASE_STUDY_LOCAL_PREVIEW=1`; `next build`, `next start`, the tests and every deployment ignore it, so
 * it cannot become a production fallback.
 *
 * ClassPe, InsurYo and Ameba Software already exist in Contentful: their preview entry REPLACES the published one in place (matched by
 * slug; the entry's own `sys` and `listingOrder` are kept, so the study keeps its place in the listing). Wanderlooms has no entry and no
 * reserved slug, so it is appended after the existing studies. The IDs below are used only for that new entry and are not Contentful IDs.
 *
 * Public copy only: the image briefs and each case's "Production note" are internal and are not here. Deliberate differences from the
 * document, each listed in docs/work-redesign/final-four/FINAL_FOUR_REPORT.md: thousands commas, "in-house" and "-led" hyphenation, the
 * ClassPe growth lead is written "≈95%" so the outcome board reads it as one reported figure, and the three "Metric / Result" tables are laid
 * out as the established outcome list. No testimonial. No figure, tactic or claim beyond the document.
 *
 * Remove this file (and its call in `lib/case-study-local-preview.ts`) when the entries are updated and created in Contentful.
 */
type Spec = {
  /** The slug of the existing public entry this replaces, or null for the new Wanderlooms entry. */
  replaces: string | null;
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  sector: 'education' | 'financial-services' | 'software-technology' | 'ecommerce-retail';
  serviceKey: '/seo' | '/social-media-ads' | null;
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
    replaces: 'classpe-social-media-strategy',
    id: 'local-preview-classpe-social-media',
    slug: 'classpe-social-media-strategy',
    title: 'Approximately 95 percent student growth in four months',
    client: 'ClassPe',
    industry: 'Education and training',
    sector: 'education',
    serviceKey: null,
    periodStart: '2026-07-01',
    periodEnd: null,
    summary:
      'During the first four months of its ongoing engagement with MappedSkills, ClassPe’s student strength grew by approximately 95%. We helped the coaching brand communicate its personalised approach through a clearer social media strategy, consistent content and a focused brand narrative.',
    problem: doc(
      p('ClassPe had a strong personalised coaching offer, but awareness relied heavily on word of mouth. Its social content did not consistently explain what made its approach different or give prospective students a connected picture of the brand.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Built the channel strategy.' }, ' We developed a direction for Instagram and YouTube around personalised coaching, student support and learning outcomes.'),
        li({ b: 'Created a consistent brand story.' }, ' We organised content around defined pillars and produced material, including influencer-led content, that reinforced the same proposition.'),
        li({ b: 'Supported programme discovery.' }, ' We developed IAT-focused content to help prospective students understand the offer. We also recommended paid campaigns, which ClassPe’s in-house team executed.'),
      ),
    ),
    impact: doc(
      p({ b: 'Approximately 95% student growth in the first four months' }),
      p('ClassPe’s student strength grew by approximately 95% during the first four months of an ongoing retainership that began in July 2026.'),
      ul(
        li({ b: '≈95%' }, ' student growth in the first four months of the engagement, from July 2026. This is overall business growth during that period, not growth attributed to social content alone.'),
        li({ b: 'Ongoing retainership' }, ' since July 2026.'),
        li({ b: 'Social strategy, brand narrative and content' }, ' were MappedSkills’s scope.'),
      ),
      p('The approximately 95% increase reflects overall business growth during the four month period. Alongside that growth, ClassPe gained a more organised social presence and a consistent explanation of its personalised coaching offer. Paid campaign execution remained with the client’s team.'),
      p('The case brings the business outcome and the agency’s contribution into one clear story: more students, supported by a stronger public presentation of the coaching offer.'),
    ),
    evidenceNote:
      'The growth figure and the engagement details were supplied by MappedSkills in the final case study set of 31 October 2026. The approximately 95% is a growth in student strength over the first four months of the engagement; it reflects overall business growth during that period and is not attributed to organic social content alone. Starting and ending student counts, monthly growth, admission sources and follower totals were not supplied and are not shown. Paid campaign execution was carried out by ClassPe’s in-house team, not by MappedSkills. The figure has not been independently checked against ClassPe’s records.',
  },
  {
    replaces: 'insuryo-organic-growth',
    id: 'local-preview-insuryo-organic-growth',
    slug: 'insuryo-organic-growth',
    title: 'From an idea to four major projects and a ₹20 crore valuation',
    client: 'InsurYo',
    industry: 'Insurance',
    sector: 'financial-services',
    serviceKey: null,
    periodStart: '2025-09-01',
    periodEnd: null,
    summary:
      'When MappedSkills joined InsurYo, the company was still an idea and had not yet been registered. We helped shape its organic growth direction and build routes to institutional partners. Within one year of operations, the business was valued at ₹20 crore, and its team secured four major projects in Bihar and the Gorakhpur area.',
    problem: doc(
      p('InsurYo wanted to make insurance accessible to underprivileged students. Before the idea could reach that audience, it needed a clear proposition, a credible public presence and relationships with organisations that already worked with the communities it aimed to serve.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Turned the purpose into a growth direction.' }, ' We developed an organic strategy around accessible insurance and the needs of underprivileged students.'),
        li({ b: 'Made the mission easier to communicate.' }, ' We created organic and influencer-led content that explained the purpose and made the proposition more understandable.'),
        li({ b: 'Helped open institutional conversations.' }, ' We supported introductions and meetings with potential partners and relevant authorities. The outreach context included NGOs and government organisations such as Anganwadi networks. No paid advertising formed part of this work.'),
      ),
    ),
    impact: doc(
      p({ b: 'Four major projects and a ₹20 crore company valuation' }),
      p('InsurYo progressed from an unregistered idea to a business with four major project wins and a ₹20 crore valuation within one year of operations.'),
      ul(
        li({ b: '4' }, ' major projects secured by the InsurYo team, in Bihar and the Gorakhpur area.'),
        li({ b: '₹20 crore' }, ' company valuation within one year of operations. This is a company milestone, separate from revenue, funding raised and marketing results.'),
        li({ b: 'Idea stage, not yet registered' }, ' was the starting point when the engagement began in September 2025. The engagement is ongoing.'),
      ),
      p('These are company milestones achieved through the work of its founders, team and partners, alongside MappedSkills’s contribution to organic strategy, content and institutional access.'),
      p('For an early stage business, a clear mission needs practical routes to the people and organisations that can help deliver it.'),
    ),
    evidenceNote:
      'The engagement details and milestones were supplied by MappedSkills in the final case study set of 31 October 2026. The four major projects and the ₹20 crore company valuation are InsurYo company milestones; they are not marketing-attributed results and are not credited to MappedSkills’s work alone. The valuation is a company valuation, not revenue, funding raised or a return on any spend, and no valuation date, project values or institutional details were supplied or are shown. The figures have not been independently checked against InsurYo’s records.',
  },
  {
    replaces: 'seo-ameba-software',
    id: 'local-preview-ameba-software-seo',
    slug: 'seo-ameba-software',
    title: '75.34 percent more organic clicks and 55.88 percent more enquiries',
    client: 'Ameba Software, Chandigarh',
    industry: 'Software and technology',
    sector: 'software-technology',
    serviceKey: '/seo',
    periodStart: null,
    periodEnd: null,
    summary:
      'Ameba Software’s organic clicks increased from 7,300 to 12,800 across two comparable three month periods. Tracked organic enquiries rose from 34 to 53. The SEO work brought technical improvements, clearer service page targeting and content development together around relevant business searches.',
    problem: doc(
      p('Ameba’s prospective buyers needed to find the software business when searching for solutions. Limited content, weak page targeting and technical issues restricted its ability to capture relevant organic demand.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Targeted relevant buyer searches.' }, ' We researched commercial search intent and improved priority service pages so their content better matched prospective clients’ needs.'),
        li({ b: 'Strengthened the technical foundations.' }, ' We worked on titles, headings, speed, mobile usability, indexing and structured data to improve the site’s search foundations.'),
        li({ b: 'Developed content and authority.' }, ' We planned content around buyer questions and built relevant technology links to support the website’s organic presence.'),
      ),
    ),
    impact: doc(
      p({ b: '75.34% more organic clicks and 55.88% more tracked organic enquiries' }),
      p('Across two comparable three month periods, organic clicks rose from 7,300 to 12,800, nonbrand organic clicks from 5,200 to 8,940 and tracked organic enquiries from 34 to 53.'),
      ul(
        li({ b: '75.34%' }, ' organic click growth. Organic clicks rose from 7,300 in the earlier three month period to 12,800 in the later one.'),
        li({ b: '71.92%' }, ' nonbrand click growth. Nonbrand organic clicks rose from 5,200 in the earlier three month period to 8,940 in the later one.'),
        li({ b: '55.88%' }, ' organic enquiry growth. Tracked organic enquiries rose from 34 in the earlier three month period to 53 in the later one.'),
        li({ b: '7,300 → 12,800' }, ' organic clicks, earlier three month period then later three month period.'),
        li({ b: '5,200 → 8,940' }, ' nonbrand organic clicks, earlier three month period then later three month period.'),
        li({ b: '34 → 53' }, ' tracked organic enquiries, earlier three month period then later three month period.'),
      ),
      p('The later period generated 5,500 additional organic clicks and 19 more tracked organic enquiries. Nonbrand clicks increased by 3,740, showing broader discovery beyond searches for the company name. The result connects stronger search visibility with more business enquiries. This compares two periods and does not show that the work alone caused the change.'),
      p('For a B2B software company, organic growth becomes more useful when more relevant discovery is accompanied by more enquiries.'),
    ),
    evidenceNote:
      'The figures were supplied by MappedSkills in the final case study set of 31 October 2026. They compare two three month periods; the calendar dates of the periods were not supplied, so none is shown. Growth is the later figure less the earlier figure, divided by the earlier figure: 5,500 ÷ 7,300, 3,740 ÷ 5,200 and 19 ÷ 34. How nonbrand clicks were classified, how enquiries were tracked and which pages changed were not supplied, and no rankings, impressions, sessions or monthly trends are shown. This is a comparison of two periods, not proof that the work alone caused the change. The figures have not been independently checked against Search Console, analytics exports or Ameba Software’s own records.',
  },
  {
    replaces: null,
    id: 'local-preview-wanderlooms-meta-ads',
    slug: 'wanderlooms-meta-ads',
    title: '6,607 attributed orders and 3.12× revenue ROAS from Meta Ads',
    client: 'Wanderlooms',
    industry: 'Adventure apparel',
    sector: 'ecommerce-retail',
    serviceKey: '/social-media-ads',
    periodStart: '2026-04-01',
    periodEnd: '2026-09-30',
    summary:
      'From April to September 2026, Wanderlooms generated 6,607 attributed orders and ₹1,12,32,000 in attributed revenue from ₹36,00,000 in Meta advertising spend. Cost per attributed order was ₹544.88, with average attributed order value of ₹1,700.02 and revenue ROAS of 3.12×.',
    problem: doc(
      p('Adventure apparel buyers need to understand style, fit and use before buying from a brand discovered through social media. The campaign needed to connect compelling product discovery with a clear purchase journey and measurable acquisition economics.'),
    ),
    whatWeDid: doc(
      ul(
        li({ b: 'Showed the products in use.' }, ' We used outdoor lifestyle scenes, product details and fit demonstrations to help shoppers evaluate the offer.'),
        li({ b: 'Matched messages to purchase readiness.' }, ' We distinguished new audience discovery from relevant follow up to eligible visitors, keeping the message connected to where the shopper was in the buying journey.'),
        li({ b: 'Measured purchase efficiency.' }, ' We reviewed order acquisition cost, attributed order value and revenue, alongside product availability and returns, to keep reporting focused on commercial outcomes.'),
      ),
    ),
    impact: doc(
      p({ b: '6,607 attributed orders and ₹1,12,32,000 in attributed order revenue' }),
      p('The campaign generated ₹3.12 in attributed revenue for every ₹1 spent on Meta advertising. Average attributed order value was ₹1,700.02 against an advertising acquisition cost of ₹544.88 per order.'),
      ul(
        li({ b: '6,607' }, ' attributed orders from Meta Ads, April 2026 to September 2026.'),
        li({ b: '₹544.88' }, ' cost per attributed order. Advertising spend divided by attributed orders.'),
        li({ b: '3.12×' }, ' revenue return on ad spend. Attributed order revenue divided by advertising spend. Revenue return is not profit.'),
        li({ b: '₹1,12,32,000' }, ' in attributed order revenue, April 2026 to September 2026.'),
        li({ b: '₹36,00,000' }, ' in advertising spend, April 2026 to September 2026.'),
        li({ b: '₹1,700.02' }, ' average attributed order value. Attributed order revenue divided by attributed orders.'),
      ),
      p('These figures describe revenue efficiency; profitability also depends on product, fulfilment, return and other business costs.'),
      p('For an apparel brand, order acquisition cost and order value make the paid media result easier to assess than clicks or engagement alone.'),
    ),
    evidenceNote:
      'The figures and the reporting period were supplied by MappedSkills in the final case study set of 31 October 2026. Cost per attributed order is ₹36,00,000 divided by 6,607. Average attributed order value is ₹1,12,32,000 divided by 6,607. Revenue ROAS is ₹1,12,32,000 divided by ₹36,00,000. The month range does not establish exact day boundaries. Attribution settings, refund treatment, product margins, new-customer counts and campaign-level results were not supplied, and revenue return is not profit. The figures have not been independently checked against account exports and order records.',
  },
];

const entry = (s: Spec): ContentfulCaseStudy => ({
  sys: { id: s.id, firstPublishedAt: '2026-10-31T00:00:00.000Z', publishedAt: '2026-10-31T00:00:00.000Z', publishedVersion: 1 },
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

export const FINAL_FOUR_SPECS = SPECS;

/**
 * Applies the four entries to a list of entries. An existing entry with the same route slug is replaced IN PLACE (its `sys`, so its
 * identity and eligibility, and its `listingOrder` are kept); an entry that does not exist yet is appended. Nothing else is touched.
 */
export function applyFinalFour(entries: ContentfulCaseStudy[]): ContentfulCaseStudy[] {
  const routeOf = (e: ContentfulCaseStudy) => (e.slug ?? '').replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
  const out = entries.map((e) => {
    const spec = SPECS.find((s) => s.replaces !== null && s.replaces === routeOf(e));
    if (!spec) return e;
    return { ...entry(spec), sys: e.sys, slug: e.slug, ...(e.listingOrder != null ? { listingOrder: e.listingOrder } : {}) };
  });
  for (const spec of SPECS) {
    const present = out.some((e) => routeOf(e) === spec.slug);
    if (!present) out.push(entry(spec));
  }
  return out;
}
