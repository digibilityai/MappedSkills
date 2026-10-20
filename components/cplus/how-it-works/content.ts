/**
 * C+ How It Works (/how-it-works): customer-facing copy of the owner-approved G1 R2 design (DEC-058;
 * docs/how-it-works-redesign/g1/). HW-D01 wording is exact. No response time, price, duration, guarantee or report metric,
 * and nothing says MappedSkills reviews or qualifies enquiries (HW-D02). No long or double dashes.
 */

export const HOW = {
  crumb: 'How it works',
  kicker: 'How it works',
  h1: { a: 'No mystery about', b: 'what happens next.' },
  lede: 'From the first conversation to the monthly review, here is how working with us runs. You see the plan before any work starts.',
  primary: 'Tell us what you’re trying to fix',

  hero: {
    label: 'Working with us',
    tag: 'Illustration',
    stages: [
      { t: 'We talk', d: 'About your business and what you want more of.', label: 'We talk', icon: 'chat' },
      { t: 'We plan', d: 'You see our findings and a proposal, then decide.', label: 'We plan', icon: 'plan' },
      { t: 'We do the work', d: 'And keep you informed every month.', label: 'We do the work', icon: 'trend' },
    ],
    loop: 'Every month',
    cap: 'How working with us runs: one conversation, one plan you approve, then the work.',
  },

  start: {
    kicker: 'Getting started',
    h: { a: 'First, we get to', b: 'know your business.' },
    lede: 'Nothing starts until you have seen what we found and agreed what we will do.',
    listLabel: 'What happens after you get in touch',
    stages: [
      { t: 'We get to know you', d: 'You tell us about your business. We reply by email or WhatsApp and book a discovery call.', chips: ['Get in touch', 'Our reply', 'Discovery call'] },
      { t: 'We look, then recommend', d: 'We audit how things work today, then send our findings, a plan and a proposal.', chips: ['Audit', 'Findings and plan', 'Proposal'] },
      { t: 'You decide', d: 'Work starts only when you say yes.', chips: ['Your approval'] },
    ],
    sheet: {
      title: 'Working sheet',
      tag: 'Example business',
      want: { k: 'What you want', v: 'More enquiries from local homeowners planning a renovation.' },
      pills: ['Replied on WhatsApp', 'Call booked'],
      found: { k: 'What we found', items: ['The contact form fails on some phones.', 'Nobody can see which enquiries came from Google.'] },
      plan: { k: 'What we recommend', v: 'Fix the form first. Then record where enquiries come from.' },
      decision: { k: 'Your decision', v: 'Approved by you' },
    },
    cap: 'The working sheet fills in at each stage. Example business. Illustration.',
  },

  sort: {
    kicker: 'Finding priorities',
    h: { a: 'Not everything', b: 'needs fixing.' },
    lede: 'An audit usually finds more than is worth doing. Problems that cost you enquiries come first. Things that only look dated can wait.',
    button: 'Sort by priority',
    pileLabel: 'What the audit found, in the order we found it.',
    statusSorted: 'Sorted into three groups: fix first, later, and not worth doing.',
    statusPile: 'Showing the findings in the order they were found.',
    lanes: [
      { key: 'first', t: 'Fix first', d: 'Costing you enquiries now.' },
      { key: 'later', t: 'Later', d: 'Worth doing once the basics work.' },
      { key: 'not', t: 'Not worth doing', d: 'Costs money, changes little.' },
    ],
    /* In the order the audit found them (the pile); `lane` is where each one belongs. */
    items: [
      { k: 'look', lane: 'not', t: 'The homepage looks a few years old', why: 'True, but it isn’t what is losing enquiries.' },
      { k: 'form', lane: 'first', t: 'The contact form fails on some phones', why: 'Some people who try to reach you never do.' },
      { k: 'town', lane: 'later', t: 'The page for your main town is hard to find on Google', why: 'More of the right visitors, once the form works.' },
      { k: 'track', lane: 'first', t: 'Nobody can see which enquiries came from where', why: 'Without it, no later change can be judged.' },
      { k: 'social', lane: 'not', t: 'There is no social media account', why: 'Not where people look for a renovation company.' },
      { k: 'areas', lane: 'later', t: 'The services page doesn’t say which areas you cover', why: 'Fewer enquiries from outside your area.' },
    ],
    cap: 'Example findings. Real findings, and how we weigh them, depend on your business. Illustration.',
    honest: 'If we don’t think something suits your business, we’ll say so.',
  },

  work: {
    kicker: 'Doing the work',
    h: { a: 'We do the work.', b: 'You stay in the loop.' },
    lede: 'Once you approve the plan, we handle most of the agreed work, with your input where needed. What’s included depends on your service. Some work, like website or tracking changes, may be agreed separately.',
    needH: 'What we’ll need from you',
    need: [
      { t: 'Access', d: 'To your website, accounts and wherever enquiries arrive.', icon: 'key' },
      { t: 'What you know', d: 'Who your customers are and what they ask before they buy.', icon: 'user' },
      { t: 'Quick decisions', d: 'Work that waits weeks for a yes loses momentum.', icon: 'clock' },
      { t: 'Replies to enquiries', d: 'That part is yours, and it matters most.', icon: 'chat' },
    ],
    board: {
      title: 'Approved actions',
      tag: 'Example renovation business',
      caption: 'Example approved actions, who does each one, and its status (illustration)',
      head: ['Action', 'Who', 'Status'],
      rows: [
        { t: 'Fix the contact form on phones', who: 'Us', both: false, s: 'Done', state: 'done' },
        { t: 'Record where enquiries come from, where possible', who: 'Us', both: false, s: 'Done', state: 'done' },
        { t: 'Add the areas you cover to the services page', note: 'Needs your list of areas', who: 'Us + you', both: true, s: 'In progress', state: 'doing' },
        { t: 'Improve the page for your main town', note: 'Needs photos of finished projects', who: 'Us + you', both: true, s: 'Next', state: 'next' },
      ],
    },
    cap: 'Approved actions, who does them, and where they stand. Illustration.',
  },

  info: {
    kicker: 'Keeping you informed',
    h: { a: 'Every month,', b: 'you see what changed.' },
    lede: 'Before we change anything, we note where things stand. Each month we compare against that starting point, where the data allows.',
    report: {
      title: 'Your monthly report',
      tag: 'Illustration',
      listLabel: 'What each monthly report covers',
      steps: [
        { t: 'Starting point', d: 'Where things stood before we began.', mark: 'start' },
        { t: 'What changed', d: 'This month, compared with your starting point.', mark: 'now' },
        { t: 'What’s next', d: 'What we suggest for the coming month.', mark: 'next' },
      ],
    },
    cap: 'One report, one story: where you started, what changed, what comes next. Illustration, not real data.',
    month: {
      k: 'Every month',
      /* HW-D01, exact */
      t: 'A monthly performance report, and a review call where your service includes one.',
      note: 'What the report covers depends on your service and on the data available.',
    },
    gaps: {
      h: 'What the numbers can’t always show',
      lead: 'Tracking helps, but it is never complete. We point out the gaps instead of hiding them.',
      items: [
        { t: 'Phone, then laptop', d: 'Someone who browses on a phone and enquires on a laptop can look like two different people.', icon: 'devices' },
        { t: 'Tracking declined', d: 'If a visitor says no to tracking, we respect it. Their enquiry arrives without a source.', icon: 'shield' },
        { t: 'Calls, emails and shared links', d: 'These often arrive with no record of how the person found you.', icon: 'link' },
        { t: 'Sales and revenue', d: 'We only report these when you share figures from your own system.', icon: 'receipt' },
        { t: 'Small numbers', d: 'When the numbers are too small to tell, we won’t claim a change caused a result.', icon: 'scale' },
      ],
      line: { a: 'A missing source doesn’t make an enquiry any less real.', b: 'We report the gap, not a tidier number.' },
    },
  },

  questions: {
    kicker: 'Questions',
    h: 'What people ask us',
    items: [
      { q: 'Do I have to commit before I see a plan?', a: 'No. You’ll see our findings, a plan and a proposal first. Nothing starts until you say yes.' },
      { q: 'How soon will we see results?', a: 'It depends on your service and your market, so we won’t promise a date. We note where you’re starting from, so you can see what changes each month.' },
      { q: 'Can you guarantee more enquiries or sales?', a: 'No. We can’t control your prices, your sales team or your market. We do the work we agreed and show you what changed.' },
      { q: 'Who replies to the enquiries?', a: 'Your team does. Replying quickly is the one part only you can do.' },
      { q: 'Do you do all the work, or do we?', a: 'We do most of it. From you, we’ll need access to your accounts, a little of your time and quick decisions. Some work, like website changes, may be agreed separately.' },
    ],
    related: {
      a: 'Related:',
      links: [
        { href: '/services', label: 'our services' },
        { href: '/pricing', label: 'pricing' },
        { href: '/faq', label: 'more questions' },
      ],
    },
  },

  close: {
    h: { a: 'Start with a', b: 'conversation.' },
    body: 'Tell us what you want more of. We’ll reply by email or WhatsApp, and nothing starts until you approve a plan.',
  },
} as const;
