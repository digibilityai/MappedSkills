/**
 * C+ AI search (/ai-seo): customer-facing copy of the owner-approved G1 R2 design (docs/ai-search-redesign, R2 review
 * package; R2_COPY.md). The research figures are the 31 August 2026 record, unchanged
 * (docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md). Nothing here states a result, a score, a reporting frequency or
 * access to AI platform data. Headings are stored as { a, b }: `a` in the plain colour, `b` in orange (`.b-named`).
 */

export const MEASURED_ON = '31 August 2026';

/** One run is one question that did not name us, asked once in one AI tool. */
export const RUNS = 28;

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

  /* 3 — where answers come from (paper), then our own dated test */
  src: {
    kicker: 'Where answers come from',
    h: { a: 'AI answers lean on', b: 'what others say about you.' },
    feeds: ['Directories and listings', 'Review sites', 'Lists and articles by others'],
    own: { t: 'Your website', d: 'One voice among many' },
    hub: 'The AI answer',
    cap: 'Illustration. Line weight shows the idea, not measured shares.',
  },
  test: {
    h: 'We tested this on ourselves first.',
    meta: ['one round', 'one location', 'English', 'signed out'],
    checked: {
      l: 'What we checked',
      big: '28 questions',
      t: 'a buyer might ask that didn’t name us. Each asked once, across five AI tools:',
      tools: ['Google AI Mode', 'Google AI Overviews', 'ChatGPT', 'Perplexity', 'Gemini'],
      untested: 'Claude and Grok couldn’t be tested. No data, so not a zero.',
    },
    found: {
      l: 'What we found',
      fig: '0',
      of: 'of 28',
      t: 'answers named us.',
      layersLabel: 'Four results, kept separate',
      layers: [
        { q: 'AI crawlers could read our site', r: 'Yes, both checked', kind: 'access' },
        { q: 'Named in the answer', r: '0 of 28', kind: 'runs' },
        { q: 'Recommended', r: '0 of 28', kind: 'runs' },
        { q: 'Our site quoted as a source', r: '0 of 28', kind: 'runs' },
      ] as { q: string; r: string; kind: 'access' | 'runs' }[],
      key: 'Each open square is one question. Counts, not rates. Gemini showed no sources at all.',
      branded: 'Asked about us by name, 7 of 8 answers described us substantially accurately.',
    },
    taught: {
      l: 'What it taught us',
      lead: 'Being readable isn’t enough.',
      t: 'At least 10 of the 28 answers cited directories. On the day, we weren’t listed on the two cited most.',
      so: 'So listings come first in our work.',
    },
    lim: {
      b: 'What this test doesn’t show:',
      t: 'that our work raises anyone’s visibility, or that AI answers bring enquiries. It’s one round on one day, not a before and after.',
    },
  },
  record: {
    summary: 'How we measured, and the full record',
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

  /* 4 — how the work moves (ink): five steps, auto-advancing every 2 s, playing once */
  journey: {
    kicker: 'How the work moves',
    h: { a: 'Five steps.', b: 'Most of them off your website.' },
    steps: [
      { w: 'In the answers', t: 'See what AI says now', d: 'We ask your buyers’ questions in each AI tool and note who gets named, and from which sites.' },
      { w: 'Your website', t: 'Open your site to AI', d: 'Check AI tools can read your pages, and that key questions get clear answers.' },
      { w: 'Everywhere', t: 'Get your facts straight', d: 'The same name, services, location and contact details wherever you appear.' },
      { w: 'Other sites', t: 'Be where answers come from', d: 'Get listed on the directories, review sites and lists the answers use. The biggest part of the work.' },
      { w: 'In the answers', t: 'Check again, honestly', d: 'Ask the same questions again. Report what changed, and what didn’t.' },
    ],
    /** Index of the step that stays orange once the journey is complete ("the biggest part of the work"). */
    big: 3,
    ctl: { pause: 'Pause', play: 'Play', replay: 'Replay', of: 'the five-step journey' },
  },
  /* crawler names as listed in each vendor's documentation, retrieved 2026-08-31 (AI_CRAWLER_POLICY.md) */
  crawl: {
    summary: 'For your web team: the AI crawlers we check',
    retrieval: { b: 'Retrieval crawlers', t: 'read your pages while an answer is being written: OAI-SearchBot, Claude-SearchBot, PerplexityBot. Needed, but not enough on their own.' },
    training: { b: 'Training crawlers', t: 'decide whether your pages can train a model: GPTBot, ClaudeBot, Google-Extended, CCBot. Blocking one does not remove you from answers.' },
    note: `Which to allow is your decision. We set out the trade-offs. Names as listed in each vendor’s documentation, retrieved ${MEASURED_ON}.`,
  },

  /* 5 — clear reporting (paper): one picture with a line through it */
  rep: {
    kicker: 'Clear reporting',
    h: { a: 'What we can check.', b: 'What nobody can promise.' },
    can: {
      l: 'We can check and explain',
      items: [
        { b: 'Your site', t: 'Can AI tools read it?' },
        { b: 'Your details', t: 'Are they the same everywhere?' },
        { b: 'Other sites', t: 'Are you on the ones answers use?' },
        { b: 'The answers', t: 'Were you named, how, and from which sites?' },
      ],
    },
    line: 'Past this line, the AI tool decides',
    not: {
      l: 'We can’t promise',
      items: [
        { b: 'A place in the answer', t: 'Ask again and the names can change.' },
        { b: 'A ranking or a score', t: 'There’s no fixed order to rank in.' },
        { b: 'Improvement every time', t: 'Some checks show no change. We’ll say so.' },
        { b: 'Enquiries', t: 'Being named doesn’t mean a buyer gets in touch.' },
      ],
    },
    note: 'Each time we check, you see the same questions asked in each AI tool, and what changed. A tool we couldn’t test shows as untested, never as zero.',
    why: { b: 'Why no score?', t: 'One number would hide how much answers change from one ask, and one tool, to the next.' },
  },

  /* 6 — is it right for you (ivory): our usual judgement, not eligibility rules */
  fit: {
    kicker: 'Is it right for you?',
    h: { a: 'Worth doing now,', b: 'or later?' },
    lede: 'AI search isn’t the right first step for every business. Here’s how we usually see it.',
    start: 'Where are you today?',
    yes: {
      h: 'Worth exploring now',
      items: ['You already show up on Google.', 'Buyers compare a few suppliers before they get in touch.', 'Your details are missing, or differ, across listings.'],
      next: 'We’d start by checking what AI tools say about you today.',
    },
    other: {
      h: 'Something else may come first',
      items: [
        { b: 'You don’t show up on Google yet.', link: { t: 'Organic search', href: '/seo' }, t: 'usually comes first.' },
        { b: 'You need more enquiries this quarter.', t: 'This is slower work. We’ll talk through what could move sooner.' },
        { b: 'Visitors come, but few get in touch.', link: { t: 'Making it easier to enquire', href: '/conversion-optimization' }, t: 'may come first.' },
      ] as { b: string; t: string; link?: { t: string; href: string } }[],
    },
    close: 'Not sure which side you’re on? That’s what a first conversation is for.',
  },

  /* 7 — questions (paper). Q2 no longer says these tools cannot show cited sources: their paid reports can (R2 evidence notes §5). */
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
