/** /google-ads Content R2, approved by the owner 26 October 2026 with three refinements and Reporting Policy A.
 * Boundaries from DEC-053 (F-2 service boundary, proof restrictions) remain binding; DEC-079 supersedes only the H1,
 * seven-block structure, fixed CTA wording and the no-case-study rule. No YouTube or other channel, no figures, no
 * certifications, no campaign-type claims. Case wording is taken from the live case page.
 */
export const HERO = {
  eyebrow: 'Google Ads management',
  h1: 'Reach people already searching for what you sell.',
  tagline: 'We run your ads. We look beyond the click.',
  body: 'We plan and manage Google Ads to help your business reach people looking for what you sell. And we look beyond clicks to understand whether those visits become meaningful enquiries.',
} as const;

export const WHY = {
  lede: 'Someone searching for an online course, a local service or a product already has a need. Google Ads lets your business appear at that moment. It works best when every step after the search is right.',
  stages: [
    { k: 'Relevant search', d: 'Someone looks for what you sell.' },
    { k: 'Ad message', d: 'Your ad speaks to what they need.' },
    { k: 'Landing page', d: 'The page makes the next step clear.' },
    { k: 'Enquiry or purchase', d: 'They get in touch, or buy.' },
  ],
  note: 'Not every search becomes an enquiry. When the journey breaks, your ad budget may be spent without bringing you closer to a customer.',
} as const;

export const BREAKS = {
  rows: [
    { k: 'Irrelevant searches', wrong: 'Your ads show for searches that are not right for you.',
      manage: 'We choose and review the searches your ads show for, and exclude those that do not fit.', separate: null, yours: null },
    { k: 'Ad message does not match the offer', wrong: 'People click an ad that promises something your page does not.',
      manage: 'We plan campaigns around your offer, write and improve ads, test messages and manage your budget.', separate: null, yours: null },
    { k: 'Landing-page friction', wrong: 'Visitors arrive and cannot easily enquire or buy.',
      manage: 'We review the page and tell you what we find and what we would change.', separate: 'Creating or changing pages, and fixing forms.', yours: null },
    { k: 'Weak tracking or unanswered enquiries', wrong: 'You cannot tell which searches bring genuine enquiries, or enquiries go unanswered.',
      manage: 'We check tracking, explain what Google Ads can and cannot record, and tell you what is missing.', separate: 'Setting up or repairing tracking.', yours: 'Replying to enquiries promptly.' },
  ],
  fee: 'Management and oversight are covered by our management fee: campaign planning, relevant search targeting, ad messaging and testing, budget oversight, campaign reviews and landing-page recommendations.',
  reporting: 'Your proposal sets out how we report: a monthly performance report with ongoing management, and review calls as agreed. Where an enquiry cannot be traced to an ad, we say so.',
  ctaLead: 'Not sure where your campaigns are breaking?',
} as const;

export const FIT = {
  good: [
    { t: 'Online courses and training', d: 'People search for what to learn.' },
    { t: 'Specialist and local services with existing search demand', d: 'People look for them when they need them.' },
    { t: 'Searchable products with suitable economics and purchase journeys', d: 'Your website can take orders and the numbers work.' },
  ],
  premature: ['Little relevant search demand', 'Enquiries cannot be handled', 'Your website makes enquiries difficult', 'Customer value or acceptable acquisition cost is unclear', 'You expect guaranteed enquiry numbers, which no one can honestly promise'],
  note: 'We talk these through first, and say so if something else may suit you better.',
  meta: { lead: 'If your customers are not searching yet,', label: 'Meta Ads may fit better', href: '/social-media-ads' },
} as const;

export const STEPS = [
  { k: 'Understand', d: 'Your offer, your customers and what they search for.' },
  { k: 'Plan', d: 'Campaigns, budget and how success will be judged. You see a recommended plan before work begins.' },
  { k: 'Launch', d: 'The agreed campaigns go live, once you have approved them.' },
  { k: 'Test', d: 'Searches, ad messages and pages are refined as we learn.' },
  { k: 'Review', d: 'We go through results with you and what to change next.' },
] as const;

/** Verified against https://mappedskills.com/portfolio/google-ads-for-online-courses on 26 October 2026. */
export const CASE = {
  name: 'AnyBodyCanBake',
  tags: ['Google Ads', 'Online baking courses', 'Pune'],
  intro: 'AnyBodyCanBake is a Pune online baking school that teaches eggless and healthy baking. It wanted more students, but few people looking for online baking courses were finding it.',
  context: 'It sits in a crowded online education market, on a small-business budget, with courses aimed at a narrower audience than everyone who likes baking.',
  did: [
    { k: 'Keyword research', d: 'The searches people use when looking for online baking courses.' },
    { k: 'Ad copy and creative', d: 'Written around what the audience cared about and the problems they wanted to solve.' },
    { k: 'Audience targeting', d: 'By demographics, interests and online behaviour.' },
    { k: 'Ongoing optimisation', d: 'Campaign performance reviewed regularly and adjusted.' },
  ],
  placed: ['Ads matched to course searches', 'Targeting focused on the right learners', 'Campaigns that were managed, not just launched'],
} as const;

export const COST = {
  lines: [
    { t: 'Google ad spend', d: 'Paid directly to Google.' },
    { t: 'MappedSkills management fee', d: 'Charged separately, and shaped by the work involved.' },
  ],
  separate: { t: 'Separately scoped work', d: 'Landing-page, website, form or tracking changes. Agreed before they start.' },
  expect: 'Results vary with your offer, pricing, website, competition and follow-up. We cannot promise a number of enquiries or what each will cost. When performance disappoints, we tell you early and review what to change.',
} as const;

export const GOOGLE_FAQS = [
  { question: 'Is Google Ads right for my business?', answer: 'It depends on whether people already search for what you sell, what a customer is worth, and whether you can handle enquiries. We discuss this first, and say if another approach may suit you better.' },
  { question: 'How much should I budget?', answer: 'There is no single right amount. It depends on what a customer is worth, how competitive your searches are, and how much you need to spend to learn what works. Your ad spend goes directly to Google, and we discuss it with you before you commit.' },
  { question: 'Can you improve campaigns we already run?', answer: 'Yes. We review what is running, the searches and the landing page before suggesting changes, and record your starting performance where it is available.' },
  { question: 'What happens when I contact MappedSkills?', answer: 'We first understand your business, your offer and what you want advertising to achieve. We review the information available, discuss whether Google Ads is suitable and recommend a way forward. Work begins only after the scope and proposal are agreed.' },
  { question: 'Who handles my landing page?', answer: 'You, or whoever builds your website. We review the page and recommend improvements. Creating or changing pages and fixing forms is agreed separately.' },
  { question: 'How do you measure enquiries?', answer: 'Where tracking is in place, Google Ads can record actions such as a form being sent. Not every enquiry can be traced to an ad, and where we cannot tell, we say so.' },
  { question: 'What results can I expect?', answer: 'We cannot promise a number of enquiries or a cost per enquiry. Results also depend on your offer, pricing, website, competition and follow-up.' },
] as const;

export const CLOSE = {
  h: 'Already running Google Ads, or thinking about it?',
  body: 'Tell us about your business and what you want your advertising to achieve.',
} as const;
