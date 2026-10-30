/** /who-we-help/education, Education and Training R2 review variant (27 October 2026). NOT live, NOT a replacement for the
 * production page until the owner decides. Owner-confirmed: YouTube Ads (client supplies original video), Click-to-WhatsApp
 * where suitable. No figures, enrolment claims, minimum budgets or guarantees. No admissions, counselling, WhatsApp
 * automation or student follow-up. Tracking setup is separately scoped. No dashes used as punctuation.
 */
export const META = {
  title: 'Google & Meta Ads for Course Providers in India | MappedSkills',
  description: 'Google Ads, YouTube and Meta Ads management for course providers, coaching institutes and training businesses in India, judged by enquiries and enrolments.',
} as const;

export const HERO = {
  eyebrow: 'Who we help: education and training',
  h1: ['Find learners who are ', 'ready for what you teach.'],
  lede: 'Reach people looking for courses like yours, help others discover your programmes, and judge advertising by enquiries, purchases and enrolments, not clicks alone.',
  cta: 'Discuss Your Advertising',
  secondary: { label: 'See our work', href: '/work' },
  caption: 'Illustrative scene with a generic course. Not every learner enrols.',
  steps: ['Searches for a course', 'Finds one while browsing', 'Weighs it up', 'May buy, enquire or register'],
} as const;

export const CHALLENGE = {
  eyebrow: 'The education challenge',
  h2: ['More course enquiries ', 'don’t always mean more students.'],
  lede: 'An enquiry shows interest, not fit or readiness to join. Advertising works best when judged on what happens next.',
  chart: {
    label: 'Two campaigns, illustrated',
    rows: [
      { k: 'a', t: 'Many enquiries, few students', e: 100, s: 14 },
      { k: 'b', t: 'Fewer enquiries, more students', e: 52, s: 34 },
    ],
    e: 'Enquiries', s: 'Enrolments',
    caption: 'Not to scale and not real figures. Every course and institute is different.',
  },
} as const;

export const DISCOVER = {
  eyebrow: 'How learners find courses',
  h2: ['Some search. ', 'Some stumble on you.'],
  lede: 'People reach a course in different ways, and then weigh it up before they act.',
  entries: [
    { k: 'search', t: 'Searching', d: 'They know the skill or qualification they want and look for courses to compare.', tag: 'Often Google Search' },
    { k: 'browse', t: 'Browsing', d: 'They are watching videos or scrolling a feed when a course catches their attention.', tag: 'Often Meta or YouTube' },
  ],
  weigh: { t: 'Before they act, most learners check', items: ['What they will learn', 'Who it is for', 'What it costs', 'When it runs', 'Who teaches it', 'What others say'] },
} as const;

export const JOURNEYS = {
  eyebrow: 'Three ways learners join',
  h2: ['Different courses, ', 'different routes.'],
  lede: 'Your courses may follow one or several of these routes. They are alternatives, not steps.',
  paths: [
    { id: 'a', tag: 'Route A', t: 'Direct course purchase', steps: ['Searches for or discovers the course', 'Evaluates the course page', 'Buys online'], end: 'Purchase', who: 'Measured with the purchase records you share.' },
    { id: 'b', tag: 'Route B', t: 'Enquiry-led enrolment', steps: ['Finds the course and asks a question', 'Speaks with your team', 'May enrol'], end: 'Enrolment, if it happens', who: 'After the enquiry, your team takes over.' },
    { id: 'c', tag: 'Route C', t: 'Demo or webinar registration', steps: ['Finds the course and registers for a session', 'Attends the demo class or webinar', 'May enrol later'], end: 'Enrolment, if it happens', who: 'Your team runs the session and follows up.' },
  ],
} as const;

export const CHANNELS = {
  eyebrow: 'Where advertising fits',
  h2: ['The right channel ', 'for how learners arrive.'],
  lede: 'We recommend where to start after looking at your courses, audience and budget. Most begin with one or two.',
  items: [
    { k: 'search', platform: 'Google', t: 'Google Search', d: 'Reaches people already researching courses like yours.', fit: 'People search for what you teach and you want to meet that intent.' },
    { k: 'feed', platform: 'Meta', t: 'Meta Ads', d: 'Introduces courses to relevant audiences and supports consideration.', fit: 'Your course needs explaining, or learners may not know to search for it.' },
    { k: 'video', platform: 'Google', t: 'YouTube Ads', d: 'Shows your own video to relevant audiences, with the advertising managed by us.', fit: 'You can provide a suitable original video. Video production is scoped separately.' },
    { k: 'chat', platform: 'Meta', t: 'Click-to-WhatsApp', d: 'An ad that opens a WhatsApp chat with your team.', fit: 'Your learners prefer to ask questions first and your team can reply quickly.' },
  ],
  links: { google: { label: 'About Google Ads', href: '/google-ads' }, meta: { label: 'About Meta Ads', href: '/social-media-ads' } },
} as const;

export const READY = {
  eyebrow: 'What helps advertising work',
  h2: ['Ready before ', 'the ads are.'],
  lede: 'This is a conversation, not an exam. If something needs attention, we will say what and why.',
  items: [
    { t: 'A defined course and learner', d: 'You know what you teach and who it is for.' },
    { t: 'Credible course information', d: 'Accurate details, and teacher or institute information people can trust.' },
    { t: 'Clear pricing and offer', d: 'Visitors can see what it costs and what they get.' },
    { t: 'A usable page or enquiry route', d: 'Buying, asking a question or registering is simple.' },
    { t: 'Capacity to respond', d: 'Your team can answer enquiries and registrations promptly.' },
    { t: 'Data you can share', d: 'Purchase, enquiry or enrolment records where available.' },
  ],
  cta: { lead: 'Not sure what is ready? Tell us about your courses.', label: 'Discuss Your Advertising' },
} as const;

export const MANAGE = {
  eyebrow: 'Who does what',
  h2: ['We bring the right learners closer. ', 'You help them take the next step.'],
  lede: 'Getting someone interested is one part of the journey. What happens after they enquire or register matters just as much.',
  us: { tag: 'MappedSkills', t: 'Advertising', d: 'We manage your Google, Meta and YouTube advertising.', items: ['Campaign planning and testing', 'Budget oversight', 'Monthly report on the data you share'] },
  action: { tag: 'Learner action', t: 'They choose how to act', items: ['Buys the course online', 'Sends an enquiry', 'Registers for a demo or webinar'], note: 'Some courses use one of these, some use several.' },
  you: {
    tag: 'Your institute', t: 'Course, page and follow-up', d: 'You own course delivery, pricing, your website, admissions and student follow-up.',
    cases: [
      { k: 'buy', t: 'Online purchase', d: 'Your course page and checkout complete the sale.' },
      { k: 'talk', t: 'Enquiry or registration', d: 'Your team replies, follows up and decides admissions.' },
    ],
  },
} as const;

export const MEASURE = {
  eyebrow: 'How we judge performance',
  h2: ['Look past the click ', 'to what follows.'],
  lede: 'Each step answers a different question. We keep them apart, so early numbers are not mistaken for results.',
  ladder: [
    { t: 'Clicks and visits', d: 'Did people come to the course?' },
    { t: 'Enquiries and registrations', d: 'Did they raise a hand?' },
    { t: 'Qualified prospective students', d: 'Were they a fit for the course, as your team sees it?' },
    { t: 'Purchases or enrolments, where verified', d: 'Did they join, according to your records?' },
  ],
  warn: { h: 'A registration is not an enrolment.', d: 'We compare advertising reports with the records you share, so decisions follow students, not just form fills.' },
} as const;

export const WORK = {
  eyebrow: 'Verified client work',
  h2: ['Google Ads for ', 'online baking courses.'],
  item: {
    img: { src: '/images/paid-advertising/tile-baking.webp', alt: 'A cake being finished on a stand', note: 'Conceptual artwork. Not an actual campaign creative.' },
    tag: 'Google Ads · Online baking education',
    name: 'AnybodyCanBake',
    body: 'MappedSkills ran Google Ads for a Pune online baking school offering specialist eggless and healthy baking courses. The work connected relevant course searches with the school’s specialised programmes.',
    did: ['Keyword research', 'Ad copy and creative', 'Audience targeting', 'Ongoing optimisation'],
  },
  note: 'The case study reports whole-period totals for the engagement, not a before-and-after comparison.',
  link: { label: 'Read the case study', href: '/portfolio/google-ads-for-online-courses' },
  all: { label: 'See all our work', href: '/work' },
} as const;

export const FAQS = [
  { question: 'Is Google Ads or Meta Ads better for promoting a course?', answer: 'It depends on the course. Google Ads reaches people already searching. Meta Ads can introduce a course to people who have not searched yet. We recommend where to start after looking at your course, audience and budget.' },
  { question: 'Can advertising help sell courses directly online?', answer: 'Yes, where the course is bought online. Ads can lead people to your course page to buy. Results also depend on your price, page and checkout.' },
  { question: 'Can you run campaigns for demo classes or webinars?', answer: 'Yes. A webinar or demo registration shows interest, not a confirmed enrolment. Your team runs the session and follows up, and we review registrations and any enrolment feedback you share.' },
  { question: 'Can you advertise on YouTube, and who provides the videos and photographs?', answer: 'Yes. YouTube ads are part of Google Ads. You provide original videos and photographs, and we manage the advertising. Static ad creative is defined in your proposal. Video and additional production are scoped separately.' },
  { question: 'Can ads send prospective students to WhatsApp?', answer: 'Yes, Click-to-WhatsApp ads on Meta can suit enquiry-led courses where your team can reply quickly. The ad opens a chat with your team. Chat automation and follow-up are not included unless your proposal says so.' },
  { question: 'Can you guarantee enquiries or enrolments?', answer: 'No. Advertising can bring interest, but enquiries and enrolments also depend on your course, price, website and follow-up.' },
  { question: 'Do you manage admissions and counselling?', answer: 'No. Your team handles counselling, admission decisions, student follow-up and enrolment. We manage the advertising and review the data you share.' },
  { question: 'How do you measure enrolment performance, and is tracking included?', answer: 'We compare clicks, enquiries, qualified prospective students and, where you share records, purchases or enrolments. Reviewing data and recommending improvements is part of ongoing management. New tracking setup, repairs, website changes and automation are scoped separately unless your proposal includes them.' },
  { question: 'Is ad spend part of your fee?', answer: 'No. You pay ad spend directly to Google or Meta, and our management fee is separate.',
    link: { href: '/pricing', label: 'Understand Our Pricing Approach' } },
  { question: 'What should an education business prepare before advertising?', answer: 'A clear course and learner, accurate details and pricing, a usable course page or enquiry route, capacity to reply quickly, and any purchase, enquiry or enrolment records you can share.' },
] as const;

export const CLOSE = {
  h: 'Tell us about your courses and how learners join.',
  body: 'Share what you teach, who it is for and what happens after interest. We will discuss where advertising could fit.',
  cta: 'Discuss Your Advertising',
} as const;
