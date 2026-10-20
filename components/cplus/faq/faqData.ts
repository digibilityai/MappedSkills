/**
 * C+ FAQ (/faq) questions and answers: the owner-approved G1 copy (docs/faq-redesign/g1/FQ_G1_NOTES.md, mockup/), with
 * the final FQ-D3 answer (minimum commitment, verbatim) and the FQ-D7 qualifications (revenue reporting, paid-search
 * timing, enquiry-form fixes, account ownership). Recorded in DEC-063.
 *
 * One array drives both the visible page and the route's FAQPage structured data: `plainAnswer` joins the same strings
 * the page renders, so the two cannot drift. Every question keeps its live anchor id (`id`), so existing links to a
 * question still open it even where the wording changed; each category keeps the live group id (`legacyId`) as an anchor.
 */

export type Qa = {
  /** Live anchor id, unchanged from the previous page (or new, for the three FQ-D2 questions). */
  id: string;
  q: string;
  /** The direct answer, shown first and in bold. */
  direct: string;
  /** The explanation, one paragraph each. */
  body?: string[];
  /** Label/value rows, after the direct answer (used once: timing by channel). */
  rows?: { t: string; d: string }[];
  /** One related link after the answer. Not part of the structured data. */
  more?: { href: string; label: string };
};

export type FaqGroup = { id: string; legacyId: string; title: string; line: string; items: Qa[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'pricing',
    legacyId: 'g-commercial',
    title: 'Pricing',
    line: 'What it costs and what you pay for.',
    items: [
      {
        id: 'q-what-does-this-cost-and-what-changes-that-number',
        q: 'How much does it cost?',
        direct: 'It depends on what your business needs. Every quote is worked out for you; there are no packages or price lists.',
        body: [
          'Three things shape the price: what you need, what needs fixing (your website, tracking and existing setup), and how much work is involved. You see the scope and the fee in a proposal before anything starts.',
        ],
        more: { href: '/pricing', label: 'What affects your price' },
      },
      {
        id: 'q-is-the-ad-budget-part-of-your-fee',
        q: 'Is the ad budget part of your fee?',
        direct: 'No. If we run ads for you, the ad budget is paid directly to the platform.',
        body: ['Our fee is charged separately, as set out in your proposal.'],
      },
      {
        id: 'q-what-is-the-minimum-commitment',
        q: 'Is there a minimum commitment?',
        direct: 'It depends on the work.',
        body: [
          'Some projects have a defined scope and finish line; ongoing services need enough time to measure progress and make improvements. We’ll explain the proposed duration and terms before you commit.',
        ],
      },
    ],
  },
  {
    id: 'results',
    legacyId: 'g-outcome',
    title: 'Results',
    line: 'What to expect, and what we won’t promise.',
    items: [
      {
        id: 'q-why-wont-you-guarantee-results',
        q: 'Can you guarantee results?',
        direct: 'No. No one can honestly guarantee rankings, enquiries or revenue, so we don’t.',
        body: [
          'Too much sits outside anyone’s control: how search engines and AI tools choose what to show, what your competitors do, your prices, and how quickly enquiries are answered.',
          'What we do instead: record where you’re starting from, report what changes, and say plainly what the numbers can’t show.',
        ],
      },
      {
        id: 'q-what-are-you-accountable-for-and-what-will-you-not-promise',
        q: 'What are you responsible for?',
        direct: 'The marketing work we manage for you. We’re accountable up to the qualified enquiry.',
        body: [
          'That means a real, reachable person from a business with a stated need, not a duplicate. Replying to enquiries, quoting and selling stay with you. Where you share usable sales data and tracking allows, we can report through to revenue, shown as your numbers.',
          'We don’t promise rankings, a place in AI answers, a number of enquiries, revenue or a return on spend.',
        ],
      },
      {
        id: 'q-how-long-before-anything-changes',
        q: 'How long before we see a difference?',
        direct: 'It depends on the channel.',
        rows: [
          { t: 'Paid search', d: 'Campaigns can start producing measurable activity fairly quickly. How soon, and what results follow, varies.' },
          { t: 'Organic search', d: 'Usually 12 months or more. We say so before you commit.' },
          { t: 'A broken enquiry form', d: 'Simple problems can be fixed quickly. Complex ones depend on what we find, the access we have and what needs to be built.' },
        ],
      },
    ],
  },
  {
    id: 'measurement',
    legacyId: 'g-measurement',
    title: 'Measurement',
    line: 'How we count enquiries, and what tracking can’t see.',
    items: [
      {
        id: 'q-how-do-you-know-an-enquiry-came-from-your-work-and-what-cant-you-tell',
        q: 'How do you know where an enquiry came from?',
        direct: 'Where tracking allows, your website records where each enquiry came from at the moment it’s sent.',
        body: [
          'Some things can’t be tracked: someone who researched on their phone and enquired on a laptop, visitors who decline tracking, and phone calls or emails. We show those as “source unknown”. We never assign them to a channel to make a report look complete.',
        ],
        more: { href: '/how-it-works', label: 'What tracking can’t show' },
      },
      {
        id: 'q-what-counts-as-a-qualified-enquiry-here-and-who-decides',
        q: 'What counts as a qualified enquiry?',
        direct: 'A real person you can reach, from a business with a stated need, that isn’t spam or a duplicate.',
        body: [
          'It’s a check on the enquiry, not a judgement on whether the work is right for you. That takes a conversation.',
          'Job applications, sales pitches, student requests and requests for services we don’t offer aren’t counted.',
        ],
      },
    ],
  },
  {
    id: 'working-together',
    legacyId: 'g-fit',
    title: 'Working together',
    line: 'Who we suit, how it starts and what you get.',
    items: [
      {
        id: 'q-who-is-this-for-and-who-is-it-not-for',
        q: 'Are we a good fit for MappedSkills?',
        direct: 'Usually, if your customers take time to decide and one good enquiry is worth real money to you.',
        body: [
          'We’re usually a poor fit if demand would have to be created from scratch, if people buy on impulse or price alone, if no one can answer enquiries when they arrive, or if you need a guaranteed result.',
          'There’s no minimum size. What a customer is worth to you matters more than how big you are.',
        ],
      },
      {
        id: 'q-do-we-have-to-start-with-a-call',
        q: 'Do we have to start with a call?',
        direct: 'No. You can tell us about your business through the form, by email or on WhatsApp.',
        body: ['If you’d rather talk, you can request a call and we’ll get in touch to find a convenient time.'],
        more: { href: '/contact?intent=call', label: 'Request a call' },
      },
      {
        id: 'q-how-will-we-know-how-its-going',
        q: 'How will we know how it’s going?',
        direct: 'You get a monthly performance report as standard.',
        body: ['Review calls happen when we agree them in your proposal, not automatically every month.'],
      },
      {
        id: 'q-what-access-do-you-need-and-what-do-we-keep',
        q: 'What access do you need, and what do we keep?',
        direct: 'Access to your analytics, search console, ad accounts and website, and sight of where enquiries arrive.',
        body: [
          'Without measurement access, nothing we report could be checked. Accounts and measurement set up in your name stay with you, including if we stop working together. That doesn’t automatically extend to every third-party tool or agency asset.',
        ],
      },
    ],
  },
  {
    id: 'ai-search',
    legacyId: 'g-ai-search',
    title: 'AI search',
    line: 'ChatGPT, AI answers and the new acronyms.',
    items: [
      {
        id: 'q-can-you-get-our-business-into-chatgpt-and-ai-answers',
        q: 'Can you get our business into ChatGPT and AI answers?',
        direct: 'Nobody can honestly promise that.',
        body: [
          'AI tools build their answers mostly from other websites: directories, review sites and lists. We work on those places and on your own site, keep your business details consistent, then check what each AI tool says about you and report what changed, and what didn’t.',
          'We test our own business too. The full, dated record is on our AI search page.',
        ],
        more: { href: '/ai-seo', label: 'How AI search works with us' },
      },
      {
        id: 'q-is-geo-or-aeo-a-separate-discipline-from-seo',
        q: 'Is GEO or AEO different from SEO?',
        direct: 'Mostly, no.',
        body: [
          'The real difference is where the work goes: AI tools lean more on other websites when they put an answer together. It’s the same discipline, pointed at more places. Be wary of paying for the same work twice under a new name.',
        ],
      },
    ],
  },
];

/** Every question, in page order. */
export const QAS: Qa[] = FAQ_GROUPS.flatMap((g) => g.items);

/** The answer as one string, built from exactly what the page renders (minus the related link): the FAQPage text. */
export const plainAnswer = (qa: Qa) =>
  [qa.direct, ...(qa.rows ?? []).map((r) => `${r.t}: ${r.d}`), ...(qa.body ?? [])].join(' ');
