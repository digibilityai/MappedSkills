/**
 * C+ AI search (/ai-seo) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/aiSeoContent.ts, MEASURED_ON, AI_PLAIN), with owner-approved
 * corrections that remove unconfirmed reporting promises (`measH`, `sheet.cap`, `sheet.blendedT`) and unsupported
 * frequency wording (`meas`, `sitWaysLabel`). The research figures are unchanged. The prototype's internal review
 * registers are not carried over.
 */

export const MEASURED_ON = '31 August 2026';

export const AI_PLAIN = {
  crumb: 'AI search',
  kicker: 'AI search',
  h1: { a: 'AI search: why your business is', b: 'not in the answer,', c: 'and what actually moves it.' },
  lede: 'Yes, we work on whether your business shows up when someone asks an AI assistant for a supplier. The short answer: those answers are built mostly from sources outside your website — and being readable is not the same as being chosen.',
  side: 'We measure each AI assistant separately, publish the counts, and do not sell a score.',
  primary: 'Tell us what you’re trying to fix',
  secondary: 'Book a call',

  /* hero illustration: one answer, taken apart into what it was built from */
  answer: {
    label: 'An AI answer',
    ask: '“Which suppliers do this near me?”',
    builtFrom: 'Built from',
    sources: [
      { n: 1, t: 'Directories and listings' },
      { n: 2, t: 'Review platforms' },
      { n: 3, t: 'Other people’s lists' },
    ],
    own: { t: 'Your website', d: 'Readable — not chosen' },
    cap: 'Illustration, not real data.',
  },

  /* 2 — the situation (ink) */
  sitKicker: 'Why people ask',
  sitH: 'Worth sizing before you spend on it.',
  sitWaysLabel: 'How people find out',
  sitWays: [
    { ask: 'Typed the company name into ChatGPT', got: 'Nothing useful' },
    { ask: 'Asked it to recommend a supplier', got: 'A list without you' },
    { ask: 'Ran a free AI checker', got: 'Absent — no reason given' },
  ],
  sitSize: 'AI discovery is real. Our reading — not a measurement — is that it is still much smaller than ordinary search.',
  sitLimit: {
    b: 'We won’t put a share figure on it.',
    t: 'Published numbers come from vendor panels nobody outside those vendors can audit. If enquiries must improve this quarter, this is not the work that does it.',
  },

  /* 3 — the work (paper): where each part of it happens */
  workKicker: 'What the work involves',
  workH: 'Most of the work happens off your website.',
  zones: { own: 'On your website', off: 'Everywhere else that describes you', both: 'Both places', answers: 'In the answers' },
  work: {
    access: { lead: 'Check AI can read your pages', body: 'Quick to check. Essential — and proves nothing on its own.' },
    citable: { lead: 'Pages worth quoting', body: 'Clear answers to real questions, with claims sourced and dated.' },
    authority: { lead: 'Get listed where answers come from', body: 'The substantial part of the work — and it is not publishing.' },
    entity: { lead: 'Consistent facts about you', body: 'Name, services, location and contact details stated the same way everywhere. Inconsistency is how two AI assistants end up describing you differently.' },
    measure: { lead: 'Measure each AI assistant separately', body: 'The same buyer questions, asked repeatedly, recorded with the date, place and language.' },
  },

  /* crawler mapping (live tokens; AI_CRAWLER_POLICY.md, vendor documentation retrieved 2026-08-31) */
  crawl: {
    cap: 'Two kinds of AI crawler, often confused',
    training: {
      h: 'Training crawlers',
      t: 'Decide whether your pages can be used to train a model. Blocking one does not remove you from answers.',
      tokens: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'],
      dest: 'Leads to: training data',
    },
    retrieval: {
      h: 'Retrieval crawlers',
      t: 'Decide whether your pages can be read while an answer is being written. Needed — but not enough.',
      tokens: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'],
      dest: 'Leads to: an answer, now',
    },
    checked: ['OAI-SearchBot', 'ClaudeBot'],
    checkedTag: 'checked',
    uncheckedTag: 'not checked',
    note: `Tags show what we checked on our own site on ${MEASURED_ON}. Which crawlers to allow is your decision; we set out the trade-offs.`,
  },

  /* 4 — evidence (ink), BEFORE the boundary (frozen order) */
  evKicker: 'Our own measurement',
  evH: { a: '28 questions that didn’t name us.', b: 'We appeared in none of the answers.' },
  record: {
    title: 'Measurement record',
    date: MEASURED_ON,
    meta: [
      { k: 'Rounds', v: 'One' },
      { k: 'Place', v: 'One location' },
      { k: 'Language', v: 'English' },
      { k: 'Access', v: 'Signed out' },
    ],
    tableCap: 'Questions that did not name us, by where we asked',
    cols: ['Where we asked', 'Asked', 'We appeared'],
    rows: [
      { s: 'Google AI Mode', n: 19, note: '' },
      { s: 'Google AI Overviews', n: 3, note: 'Answered queries only' },
      { s: 'ChatGPT', n: 2, note: '' },
      { s: 'Perplexity', n: 3, note: 'Signed-out version' },
      { s: 'Gemini', n: 1, note: 'Signed-out version; no sources shown' },
    ],
    total: 'Total',
    untestedK: 'Could not be tested',
    untested: [
      { s: 'Claude', t: 'needed a login.' },
      { s: 'Grok', t: 'needed a sign-up; no answer.' },
    ],
    untestedNote: 'No data, so no claim — and not a zero.',
    branded: 'Asked about us by name: 7 of 8 answers described us substantially accurately.',
  },
  method: {
    summary: 'How we measured',
    items: [
      'One “run” is one question that does not name us, asked once in one AI surface, on 31 August 2026, from one location, in English, signed out.',
      'Google AI Overviews: the three answered queries are counted. On a fourth, Google showed no AI Overview.',
      'Perplexity and Gemini were used in their signed-out versions, which give shorter answers. Gemini showed no sources at all, so its run could not show a citation.',
      'Crawler check: we requested our homepage identifying as OAI-SearchBot and as ClaudeBot — the names, not the companies’ own crawlers. Both were served the full page, and our robots.txt blocked no AI crawler. The other crawlers were not checked.',
      'Crawler names are as listed in each vendor’s own documentation, retrieved 31 August 2026.',
      'Counts, not rates. No confidence interval is claimed and none is available. The full dataset is kept for a future research page.',
    ],
  },
  findings: [
    { b: 'Directories were cited in at least 10 of the 28 answers.', t: 'One ChatGPT answer credited the agencies it named to two directories. When we measured, we had a profile on neither.' },
    { b: 'Our homepage was readable to the two AI crawlers we checked.', t: 'We still appeared zero times.' },
  ],
  findingsBold: 'Being readable is necessary. It is not enough.',

  layersCap: 'Four layers, kept separate — never one number',
  layers: [
    { k: 'Retrieval', q: 'Can AI read your site?', r: 'Yes, for the two crawlers we checked', kind: 'access' },
    { k: 'Discovery', q: 'Do you appear when buyers don’t name you?', r: '0 of 28', kind: 'runs' },
    { k: 'Recommendation', q: 'Are you recommended?', r: '0 of 28', kind: 'runs' },
    { k: 'Citation', q: 'Is your site quoted as a source?', r: '0 of 28 · Gemini showed no sources', kind: 'runs' },
  ] as { k: string; q: string; r: string; kind: 'access' | 'runs' }[],
  layersKey: 'Each square is one question. Counts, not rates.',
  layersUntested: { k: 'Claude and Grok', t: 'Not tested — no data, so no squares and no number.' },

  limitsK: 'What this does not show',
  limits: [
    'A trend — it is one round, on one day.',
    'Anything about Claude or Grok.',
    'Signed-in answers, other places or languages.',
    'Why we were absent — consistent with missing directory profiles, not proof of it.',
    'Whether AI answers bring enquiries.',
  ],

  /* 5 — the boundary (paper), AFTER the evidence */
  bdKicker: 'What we won’t claim',
  bdH: { a: 'There is no AI visibility score here, and', b: 'there will not be one.' },
  bdScore: { k: 'AI visibility score', v: 'Not produced', cap: 'The number this page does not give you.' },
  bdLede: 'When we repeated questions on Google AI Mode, the order of names changed every time. Across different AI assistants, the names barely overlapped. One blended score would hide both.',
  bdBody: ['There is no “rank in ChatGPT” to be had.', `One round, on ${MEASURED_ON}, is not a trend — so we will not describe an improvement or a decline.`],
  notPromisedK: 'We do not promise',
  notPromised: [
    'appearance in any AI assistant',
    'a mention, citation or recommendation',
    'a position — there is no ranking',
    'an improvement, decline or percentage change',
  ],
  notPromisedClose: 'Nobody can, and the mechanism is largely outside anyone’s website.',

  /* 6 — measurement (ivory) */
  measKicker: 'What you get',
  measH: 'Each AI assistant, looked at separately.',
  meas: 'We ask the questions your buyers would ask, repeatedly, and record — for each assistant — whether you appeared, how, and which sources the answer used. The sources are the part you can act on.',
  sheet: {
    cap: 'Illustration: what we record for each assistant. No data.',
    sys: ['Assistant 1', 'Assistant 2', 'Assistant 3'],
    rows: ['Appeared', 'How', 'Sources'],
    untested: 'Untested assistant',
    untestedT: 'Shown as untested',
    blended: 'Combined score',
    blendedT: 'Not produced',
  },
  measLimit: { a: 'We cannot give you', b: 'a position, a score, or a meaningful comparison across assistants.' },

  /* 7 — questions (paper). The approved second objection rests on a Google quotation that is still
     [VALIDATION REQUIRED]; it renders nothing — no placeholder, no paraphrase. */
  qKicker: 'Questions',
  qH: 'What people ask us',
  questions: [
    {
      q: 'Everyone sells this now — what makes you different?',
      a: 'In the same 28 questions, two agencies in our market that sell exactly this did not appear either. That is one sample, on one day — not a verdict on them. Selling the terminology is not the same as having the mechanism. We start with the diagnosis: which sources the answers are built from, and whether you are on them.',
    },
    {
      q: 'Ahrefs and Semrush give me a checker for free.',
      a: 'True, and they are good tools: they report the absence accurately. They do not show which sources the answer was built from, or do the off-site work that changes it. That is where the work is — the reporting part is free.',
    },
    {
      q: 'Can you get us into ChatGPT?',
      a: 'No — and nobody can honestly promise it. We fix your business facts, work on the sources answers are built from, measure whether anything changes, and tell you when it has not.',
    },
  ],
  across: { a: 'Related:', link: 'organic search', href: '/seo', link2: 'the whole system', href2: '/services' },

  /* close */
  close: {
    label: 'Where this fits',
    h: 'One place buyers look — and, as far as we can see, a small one.',
    body: 'It serves the same goal as all our work: enquiries you can act on, measured. If you are not found in ordinary search either, we would start there — and say so.',
  },
};
