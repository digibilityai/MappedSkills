/**
 * C+ AI search (/ai-seo): customer-facing copy of the owner-approved R3 design (docs/ai-search-redesign/r3, R3_COPY.md;
 * hero, shortlist, questions and close are the approved G1 R2 copy, unchanged). The research figures are the 31 August
 * 2026 record, unchanged (docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md), kept in full under "The record". Nothing
 * here states a result, a score, a reporting frequency, an industry statistic or access to AI platform data; every
 * example is labelled as an illustration. Headings are stored as { a, b }: `a` in the plain colour, `b` in orange.
 */

export const MEASURED_ON = '31 August 2026';

export const AI_PLAIN = {
  crumb: 'AI search',
  kicker: 'AI search',
  h1: { a: 'When buyers ask AI,', b: 'is your business in the answer?' },
  lede: 'AI tools like ChatGPT build their answers mostly from other websites: directories, review sites and lists. We work on those places and on your own site, then check what each AI tool says about you.',
  primary: 'Tell us what you’re trying to fix',
  secondary: 'Book a call',

  /* 1 — hero illustration: one answer, and the sites each name came from */
  chat: {
    askK: 'A buyer asks',
    ask: '“Which suppliers do this near me?”',
    ansK: 'The AI answer names',
    name: 'A business',
    names: ['from a directory', 'from a review site', 'from someone’s “top 10” list'],
    you: { b: 'Your business', t: 'Not in this answer' },
    cap: 'Illustration, not real data.',
  },

  /* 2 — what is changing (ink) */
  shift: {
    kicker: 'What’s changing',
    h: { a: 'Buyers used to get a list of links.', b: 'Now they get a shortlist.' },
    then: { l: 'Search, as it was', t: 'Ten links. The buyer clicks around and compares.' },
    now: {
      l: 'An AI answer',
      names: ['Name', 'Name', 'Name'],
      you: 'You?',
      t: 'A few names, already chosen.',
      tb: 'If you’re not one of them, the buyer may never hear of you.',
    },
    size: { b: 'How big is this?', t: 'Our view, not a measurement: still much smaller than ordinary Google search. Worth getting right. Not worth betting everything on.' },
  },

  /* 3 — industry examples (paper): illustrative questions only, no statistics */
  industry: {
    kicker: 'Your customers',
    h: { a: 'Your customers are asking AI.', b: 'Are they finding businesses like yours?' },
    group: 'Choose an industry',
    labels: { ask: 'A buyer asks', ans: 'AI answers', names: 'A few names appear', you: 'And you?' },
    youQ: 'Is your business one of them?',
    cap: 'Example questions for illustration. Not real AI answers or search data.',
    items: [
      { k: 'Manufacturing', q: '“Which companies make custom packaging in Mumbai?”', a: 'A few suppliers, with what they make and where.', name: 'Supplier', sr: 'Three suppliers are named.' },
      { k: 'Jewellery', q: '“Which jewellery brands should I compare?”', a: 'A few brands, with what each is known for.', name: 'Brand', sr: 'Three brands are named.' },
      { k: 'D2C brands', q: '“What are some good skincare brands for sensitive skin?”', a: 'A few brands, with what each is known for.', name: 'Brand', sr: 'Three brands are named.' },
      { k: 'Real estate', q: '“Which residential projects should I consider in this area?”', a: 'A few projects, with where they are and who builds them.', name: 'Project', sr: 'Three projects are named.' },
    ],
  },

  /* 4 — scenario (ivory): one illustrative question, two fictional businesses, then the visitor's own */
  scenario: {
    kicker: 'A closer look',
    h: { a: 'The question is already being asked.', b: 'Will your business be considered?' },
    steps: [
      { w: 'A buyer asks', label: 'A buyer asks', q: '“Which suppliers can manufacture custom packaging in Mumbai?”' },
      { w: 'AI looks for information', label: 'AI looks for information', t: 'It reads what it can find about each business.', where: ['Their websites', 'Directories', 'Reviews', 'Lists by others'], whereLabel: 'Where it looks' },
      {
        w: 'Two businesses, one question',
        label: 'Two businesses, one question',
        a: { n: 'Business A', s: 'Clearly described online', items: ['What they make', 'Where they are', 'How to contact them', 'Listed and reviewed elsewhere'] },
        b: { n: 'Business B', s: 'Hard to find online', items: ['What they make is unclear', 'Location is missing', 'Contact details are out of date', 'No listings found'] },
        cap: 'Two fictional businesses. An illustration, not a prediction: clear information gives AI more to work with, and no answer is guaranteed.',
      },
      { w: 'Your turn', label: 'Where does your business stand?', t: 'Where does your business stand?', p: 'We help you understand what AI can find about your business and where your online information needs work.', cta: 'Ask us how your business appears' },
    ],
  },

  record: {
    kicker: 'The record',
    h: 'We test our own business too, and publish the record.',
    summary: `Our own test, in full: 28 questions, 5 AI tools, ${MEASURED_ON}`,
    tableCap: `Questions that did not name us, by where we asked, ${MEASURED_ON}`,
    cols: ['Where we asked', 'Asked', 'We appeared'],
    rows: [
      { s: 'Google AI Mode', n: 19, note: '' },
      { s: 'Google AI Overviews', n: 3, note: 'Answered queries only' },
      { s: 'ChatGPT', n: 2, note: '' },
      { s: 'Perplexity', n: 3, note: 'Signed-out version' },
      { s: 'Gemini', n: 1, note: 'Signed-out version; no sources shown' },
    ],
    total: 'Total',
    untested: { b: 'Not tested:', t: 'Claude (needed a login) and Grok (needed a sign-up; no answer). No data, so no claim, and not a zero.' },
    notes: [
      {
        b: 'Four results, kept separate, never one number.',
        t: 'Can AI read the site? Yes, for the two crawlers we checked. Named when buyers didn’t ask for us? 0 of 28. Recommended? 0 of 28. Our site quoted as a source? 0 of 28 (Gemini showed no sources).',
      },
      {
        b: 'The directory finding:',
        t: 'directories were cited in at least 10 of the 28 answers. One ChatGPT answer credited the agencies it named to two directories. When we measured, we had a profile on neither.',
      },
      { b: 'Asked about us by name:', t: '7 of 8 answers described us substantially accurately.' },
      {
        b: 'What this does not show:',
        t: 'a trend (it is one round, on one day); anything about Claude or Grok; signed-in answers, other places or languages; why we were absent (consistent with missing directory profiles, not proof of it); whether AI answers bring enquiries.',
      },
      {
        b: 'How we measured:',
        t: `one run is one question that does not name us, asked once in one AI tool, on ${MEASURED_ON}, from one location, in English, signed out. On a fourth Google query, no AI Overview appeared, so three are counted. Perplexity and Gemini were used signed out, which gives shorter answers. Crawler check: we requested our homepage identifying as OAI-SearchBot and as ClaudeBot (the names, not the companies’ own crawlers); both were served the full page, and our robots.txt blocked no AI crawler. The other crawlers were not checked. Counts, not rates. No confidence interval is claimed.`,
      },
    ],
  },

  /* 5 — how the work moves (ink): five steps, auto-advancing every 1.5 s, playing once (copy unchanged from G1 R2) */
  journey: {
    kicker: 'How the work moves',
    h: { a: 'Five steps.', b: 'Most of them off your website.' },
    steps: [
      { w: 'In the answers', t: 'See what AI says now', label: 'Step 1: See what AI says now', d: 'We ask your buyers’ questions in each AI tool and note who gets named, and from which sites.' },
      { w: 'Your website', t: 'Open your site to AI', label: 'Step 2: Open your site to AI', d: 'Check AI tools can read your pages, and that key questions get clear answers.' },
      { w: 'Everywhere', t: 'Get your facts straight', label: 'Step 3: Get your facts straight', d: 'The same name, services, location and contact details wherever you appear.' },
      { w: 'Other sites', t: 'Be where answers come from', label: 'Step 4: Be where answers come from', d: 'Get listed on the directories, review sites and lists the answers use. The biggest part of the work.' },
      { w: 'In the answers', t: 'Check again, honestly', label: 'Step 5: Check again, honestly', d: 'Ask the same questions again. Report what changed, and what didn’t.' },
    ],
  },
  /* crawler names as listed in each vendor's documentation, retrieved 2026-08-31 (AI_CRAWLER_POLICY.md) */
  crawl: {
    summary: 'For your web team: the AI crawlers we check',
    retrieval: { b: 'Retrieval crawlers', t: 'read your pages while an answer is being written: OAI-SearchBot, Claude-SearchBot, PerplexityBot. Needed, but not enough on their own.' },
    training: { b: 'Training crawlers', t: 'decide whether your pages can train a model: GPTBot, ClaudeBot, Google-Extended, CCBot. Blocking one does not remove you from answers.' },
    note: `Which to allow is your decision. We set out the trade-offs. Names as listed in each vendor’s documentation, retrieved ${MEASURED_ON}.`,
  },

  /* 6 — clear reporting (paper): Ask, Compare, Track */
  rep: {
    kicker: 'Clear reporting',
    h: { a: 'See where your business stands.', b: 'See what changes.' },
    steps: [
      { w: 'Ask', label: 'Step 1: Ask', t: 'See what AI says', d: 'We ask the questions your buyers ask, in the AI tools they use.', q: '“Who should I buy this from?”' },
      { w: 'Compare', label: 'Step 2: Compare', t: 'See who gets named', d: 'Which businesses and which sites appear in the answers.', cmp: ['from a directory', 'from a review site'], you: 'You?' },
      {
        w: 'Track',
        label: 'Step 3: Track',
        t: 'See what changes',
        d: 'We repeat the same checks and show you what moved, and what didn’t.',
        tag: 'Illustrative example',
        cap: 'Example only: the same two questions, checked twice',
        cols: ['First check', 'Next check'],
        rows: [
          { q: 'Question 1', a: 'Not named', b: 'Named', up: true },
          { q: 'Question 2', a: 'Not named', b: 'Not named', up: false },
        ],
      },
    ],
    note: 'We show what we found and what changed. AI answers can vary.',
    cap: 'Illustration: example wording only, not a report or real results.',
  },

  /* 8 — questions (paper). Q2 no longer says these tools cannot show cited sources: their paid reports can (R2 evidence notes §5). */
  qKicker: 'Questions',
  qH: 'What people ask us',
  questions: [
    {
      q: 'Everyone sells this now. What makes you different?',
      a: 'We start by finding out which sites your buyers’ AI answers are built from, and whether you’re on them. Then we work on those places, not only your website.',
    },
    {
      q: 'Ahrefs and Semrush give me a checker for free.',
      a: 'They’re worth running. A checker shows whether you appear, and some paid versions also show which sites the answers cite. Different tools answer different questions. A report tells you where you stand. Getting listed on those sites, and keeping your details right, is the work we do.',
    },
    {
      q: 'Can you get us into ChatGPT?',
      a: 'Nobody can honestly promise that. We fix your business facts, work on the sites answers are built from, check whether anything changes, and tell you when it hasn’t.',
    },
  ],
  across: { a: 'Related:', link: 'organic search', href: '/seo', link2: 'the whole system', href2: '/services' },

  /* close (tangerine) */
  close: {
    h: 'Wondering where you stand in AI answers?',
    body: 'Tell us what you sell and who buys it. We’ll talk it through, and tell you if another starting point makes more sense.',
  },
};
