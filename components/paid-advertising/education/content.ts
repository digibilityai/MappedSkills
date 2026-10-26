/** /who-we-help/education: Content R1 (working draft, owner-authorised for local implementation) shortened to the Visual R4 direction;
 * recorded as DEC-082. Visible copy follows MappedSkills_Education_Content_R1.md; the FAQ answers are the seven R1 answers verbatim.
 * No "trusted by", no student testimonials, no admissions, lead-quality, enrolment or return promises, and no AnyBodyCanBake
 * outcomes beyond the published case. Reporting Policy A and the tracking boundary (DEC-080) apply.
 */
export const HERO = {
  eyebrow: 'Paid advertising for education businesses',
  body: 'Google Ads and Meta Ads to help education businesses reach prospective students and generate relevant enquiries.',
} as const;

export const AUDIENCE = {
  label: 'For education businesses such as',
  items: [
    { k: 'courses', t: 'Course providers' },
    { k: 'coaching', t: 'Coaching institutes' },
    { k: 'training', t: 'Training centres' },
    { k: 'programmes', t: 'Specialist programmes' },
  ],
} as const;

export const VALUE = {
  body: 'Reach people who may be a good fit for your courses, and give your team enquiries to work with.',
  items: [
    { k: 'reach', t: 'Reach relevant students', d: 'Advertising planned around who your programme is for.' },
    { k: 'enquire', t: 'Generate relevant enquiries', d: 'A clear way for interested people to ask questions.' },
    { k: 'review', t: 'Learn from outcomes', d: 'We review enquiry and admissions feedback where it is shared.' },
  ],
} as const;

export const READY = {
  intro: 'Advertising can introduce your course to more people. But whether those enquiries become students depends on more than the campaign.',
  items: [
    { t: 'Course demand', d: 'Is there evidence that people want the programme you offer?' },
    { t: 'Course and fee clarity', d: 'Can prospective students quickly see what they will learn, who it is for and what it costs?' },
    { t: 'Admission capacity', d: 'Can you accommodate new students in the upcoming batch or enrolment period?' },
    { t: 'Counselling and follow-up', d: 'Can your team respond promptly and help people make an informed decision?' },
    { t: 'Enrolment economics', d: 'How much can you reasonably spend to acquire an enrolled student?' },
    { t: 'Trust and credibility', d: 'Can visitors find accurate course details, instructor information and genuine evidence of student experience?' },
  ],
  closing: 'If something needs improvement, we will tell you what to address alongside advertising, and why it matters.',
} as const;

export const PLATFORMS = {
  google: { t: 'Google Ads', tag: 'People searching', d: 'Reach people already searching for courses, coaching or training related to what you offer. Especially useful when prospective students know what they want and are comparing options.', href: '/google-ads', cta: 'Explore Google Ads' },
  meta: { t: 'Meta Ads', tag: 'People discovering', d: 'Introduce your programme to people who may be interested but are not searching for it yet. Useful for explaining course benefits and encouraging relevant prospective students to enquire.', href: '/social-media-ads', cta: 'Explore Meta Ads' },
  closing: 'Not every education business needs both platforms. We assess your programme, audience, budget and enrolment process before recommending where to begin.',
} as const;

export const JOURNEY = {
  stages: [
    { k: 'Discover', d: 'Reach people whose interests or searches are relevant to your programme.', side: 'ours' },
    { k: 'Consider', d: 'Help prospective students understand the course, fees, format and suitability.', side: 'ours' },
    { k: 'Enquire', d: 'Give interested people a clear way to ask questions or request more information.', side: 'ours' },
    { k: 'Counsel', d: 'Understand the student’s needs, explain the programme and help them decide.', side: 'yours' },
    { k: 'Enrol', d: 'Record actual enrolments where information is available, and use the findings to improve advertising decisions.', side: 'yours' },
  ],
  ours: { t: 'MappedSkills', d: 'Advertising management' },
  yours: { t: 'Your education business', d: 'Counselling and admissions' },
  caveat: 'An enquiry is not an enrolment. Someone who fills out a form may not be suitable, ready or able to join. We want to understand which advertising brings relevant interest, and where possible, which enquiries progress towards enrolment.',
  we: { t: 'We handle', d: 'Paid campaign planning and management, audience, keyword and message testing, budget oversight, and review of available campaign and outcome data.' },
  you: { t: 'You handle', d: 'Course details, fees, admissions policies, counselling, enquiry follow-up, admission decisions and fulfilment.' },
  sep: { t: 'Scoped separately unless your proposal includes it', d: 'Landing-page development, CRM implementation, technical tracking changes and additional creative production.' },
} as const;

/** Verified against https://mappedskills.com/portfolio/google-ads-for-online-courses (the live spelling is AnyBodyCanBake). */
export const PROOF = {
  name: 'AnyBodyCanBake',
  tags: ['Google Ads', 'Online baking education'],
  body: 'MappedSkills ran Google Ads for a Pune online baking school offering specialist eggless and healthy baking courses. The work connected relevant course searches with the school’s specialised programmes.',
  note: 'The published case does not establish numerical enrolment or commercial outcomes, so we do not claim them here.',
  cta: 'See the education advertising work',
  qs: { k: 'Our approach, not client findings', h: 'Questions we would ask about your courses', items: ['Which courses have the strongest demand and commercial fit?', 'What questions or objections arise before someone enrols?', 'How quickly are enquiries followed up?', 'Can we compare advertising enquiries with actual admissions outcomes?'] },
} as const;

export const MEASURE = {
  lede: 'A low cost per lead can look attractive, even when few enquiries turn into students. We look beyond the advertising dashboard wherever reliable admissions feedback is available.',
  levels: [
    { t: 'Enquiries', d: 'How many people express interest?' },
    { t: 'Relevant enquiries', d: 'How many appear suitable for the programme?' },
    { t: 'Enrolments', d: 'How many actually join, where records allow comparison?' },
  ],
  venn: { a: 'Campaign performance', b: 'Enrolment outcomes', mid: 'Relevant enquiries', bnote: 'where records allow' },
  checks: [
    { t: 'Monthly reporting with ongoing management', sep: false },
    { t: 'Review calls as agreed in your proposal', sep: false },
    { t: 'Review of available data and recommendations', sep: false },
    { t: 'New tracking setup, repairs and integrations (separately scoped unless included)', sep: true },
  ],
  cost: 'Ad spend is paid directly to Google or Meta. MappedSkills management fees are separate. No advertising campaign can guarantee enquiries, admissions or a particular return.',
} as const;

export const EDU_FAQS = [
  { question: 'Can you guarantee student admissions?', answer: 'No. Advertising can help generate interest and enquiries, but admissions also depend on course fit, fees, counselling, availability and the prospective student’s decision.' },
  { question: 'Which is better for my institute, Google Ads or Meta Ads?', answer: 'Google Ads can reach people already searching for relevant courses. Meta Ads can help people discover programmes they may not yet be searching for. We recommend a channel based on your programme, audience and budget.' },
  { question: 'Can you help us get more relevant enquiries instead of just more leads?', answer: 'We plan targeting and messaging around course fit and review available feedback on enquiry quality. We cannot promise that every enquiry will be qualified or become an enrolment.' },
  { question: 'Do you manage admission calls and counselling?', answer: 'No. Your admissions team handles student conversations, counselling, follow-up and enrolment decisions unless a separate agreement expressly includes additional services.' },
  { question: 'Can you track which enquiries become students?', answer: 'We can review admissions feedback and available records when you share them. New CRM integrations, tracking setup or technical changes are separately scoped unless included in your proposal.' },
  { question: 'Do you create course videos and advertising creatives?', answer: 'Static creative requirements and allowances are defined in your proposal. Video, reels and additional production are scoped separately.' },
  { question: 'How much should we spend on advertising?', answer: 'It depends on course economics, competition, available budget and enrolment goals. Platform ad spend is paid directly to Google or Meta, and our management fee is separate. We do not guarantee admissions or returns.',
    link: { href: '/pricing', label: 'Understand Our Pricing Approach' } },
] as const;

export const CLOSE = {
  h: 'Tell us about your courses and enrolment goals.',
  body: 'Share what you teach, who your ideal students are and what happens after someone enquires. We’ll discuss where paid advertising could fit.',
} as const;
