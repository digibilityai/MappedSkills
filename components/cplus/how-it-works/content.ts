/**
 * C+ How It Works (/how-it-works) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts, METHOD_PLAIN), with owner-approved corrections:
 * the review heading no longer promises proof (`review.h`), and attribution is qualified in the illustrated action
 * (`work.rows[1].t`) and the enquiry's measured point (`review.measure.points[3].d`). The prototype's internal review registers are not carried over.
 */

export const METHOD_PLAIN = {
  kicker: 'How it works',
  h1: { a: 'No mystery about', b: 'what happens next.' },
  lede: 'How an enquiry becomes a plan, how the work begins, and how we review progress with you — in the order it happens.',
  example: 'Example renovation business · illustration',
  sheetTitle: 'Working sheet',
  heroCaption: 'The working sheet: one record of your business that fills in as the work goes on. Illustration.',
  rows: ['What you want', 'What the audit found', 'What we recommend', 'What you approved', 'What has been done', 'What changed'],
  startHere: 'Start here',

  first: {
    kicker: 'The first conversation',
    h: { a: 'First, we get to', b: 'know your business.' },
    body: 'You send us a message. We get back to you by email or WhatsApp. The next step is a discovery call — a conversation about your business, your customers and what you want more of.',
    steps: [
      { t: 'You get in touch', d: 'Tell us about your business and what you want to change.', icon: 'message' },
      { t: 'We reply', d: 'By email or WhatsApp.', icon: 'arrow' },
      /* OD-03 correction B (HW-09/F10): the conversation begins here; approved work begins after the audit, proposal and approval */
      { t: 'Discovery call', d: 'This is where the conversation about your business begins. The agreed work starts only after the audit, the proposal and your approval.', icon: 'phone' },
    ],
    note: 'Your message becomes the first line on the sheet.',
    bubble: '“We do home renovations locally. The website gets visits, but the phone has gone quiet.”',
    entryLabel: 'What you want',
    entry: 'More enquiries from local homeowners planning a renovation.',
  },

  audit: {
    kicker: 'Before any work starts',
    h: { a: 'We look before', b: 'we recommend.' },
    body: 'You see what we found and what we propose before anything is done. Nothing starts until you approve it.',
    steps: [
      { t: 'Discovery call', d: 'We learn what you sell, who buys it and what you want more of.' },
      { t: 'Audit', d: 'We review what we can learn about your business before recommending the next steps.' },
      { t: 'Findings and a recommended plan', d: 'What we found, and what we would do first.' },
      { t: 'Proposal', d: 'The work we propose, described so you can judge it.' },
      { t: 'Your approval', d: 'Work begins only once you have said yes.' },
    ],
    then: 'Then the work begins.',
    sheet: {
      want: 'More enquiries from local homeowners planning a renovation.',
      found: ['The contact form fails on some phones.', 'Nobody can see which enquiries came from Google.', 'The services page doesn’t say which areas you cover.'],
      plan: 'Fix the form first. Then start recording every enquiry.',
      proposal: 'The work, what it covers, and what we need from you.',
      approved: 'Approved by you',
    },
    caption: 'How the sheet fills in before any work starts. Illustration.',
  },

  sort: {
    kicker: 'Deciding what comes first',
    h: { a: 'Not everything', b: 'needs fixing.' },
    body: 'An audit usually turns up more than is worth doing. The order decides where your budget goes first: a problem that stops enquiries reaching you matters more than a page that looks a little dated.',
    button: 'Sort by priority',
    pileLabel: 'What the audit turned up, in the order we found it',
    statusSorted: 'Sorted into three groups: fix first, later, and not worth doing.',
    statusPile: 'Showing the findings in the order they were found.',
    lanes: [
      { key: 'first', t: 'Fix first', d: 'Enquiries are being lost now.' },
      { key: 'later', t: 'Later', d: 'Worth doing, once the basics work.' },
      { key: 'not', t: 'Not worth doing', d: 'Costs money, changes little.' },
    ],
    items: [
      { k: 'look', lane: 'not', t: 'The homepage looks a few years old', why: 'True — but it isn’t what is losing enquiries.' },
      { k: 'form', lane: 'first', t: 'The contact form fails on some phones', why: 'Some people who try to contact you never reach you.' },
      { k: 'town', lane: 'later', t: 'The page for your main town is hard to find on Google', why: 'More of the right visitors — after the form works.' },
      { k: 'track', lane: 'first', t: 'Nobody can see which enquiries came from where', why: 'Without it, no later change can be judged.' },
      { k: 'social', lane: 'not', t: 'There is no social media account', why: 'Not where people look for a renovation company.' },
      { k: 'areas', lane: 'later', t: 'The services page doesn’t say which areas you cover', why: 'Fewer enquiries from outside your area.' },
    ],
    caption: 'Illustration. Real findings, and how they are weighed, depend on your business — this is not a scoring system every engagement uses.',
    /* OD-03 T8 — live §6 "Where a person decides, not a process", condensed to five visible points. Heading and lead
       are live verbatim. Items 2, 4, 5 verbatim; item 1 drops "Much of what looks like demand in this market is
       students, job-seekers and competitors" (unsupported market claim, flagged); item 3 shortened, limit kept. */
    decides: {
      h: 'Where a person decides, not a process',
      lead: 'Five places, named rather than hidden behind process language.',
      items: [
        { t: 'Which demand is worth capturing.' },
        /* OD-03 correction A (F8): the four failures named, with the live §1 sentence verbatim */
        { t: 'Which of four failures a symptom indicates,', d: 'when the evidence is partial. Traffic that does not become enquiries is one of four failures — the demand, the page, the enquiry path, or the measurement — and the same symptom appears in all four.' },
        { t: 'Whether an enquiry is a real fit.', d: 'The website can check that it is real, reachable and in context. It cannot judge what an opportunity is worth to you, and no form can. That is a conversation.' },
        { t: 'What a partial measurement means,', d: 'and what it does not license us to say.' },
        { t: 'When to tell a client a channel is wrong', d: 'for their business, including when we would be paid to run it.' },
      ],
    },
  },

  work: {
    kicker: 'Doing the work',
    h: { a: 'A plan is only useful when', b: 'someone acts on it.' },
    body: 'Once you approve the work, we handle most of the agreed work, with your input where needed. Some steps also need access to a system someone else runs. What exactly depends on the service and on what we agreed.',
    head: { action: 'Approved action', status: 'Status' },
    rows: [
      { t: 'Fix the contact form on phones', s: 'Done', state: 'done' },
      { t: 'Record each enquiry and its source, where available', s: 'Done', state: 'done' },
      { t: 'Add the areas you cover to the services page', s: 'In progress', state: 'doing', note: 'Needs your list of areas' },
      { t: 'Improve the page for your main town', s: 'Next', state: 'next', note: 'Needs photos of finished projects' },
    ],
    caption: 'Approved actions become completed actions. Illustration.',
  },

  review: {
    kicker: 'Measuring and reviewing',
    h: { a: 'You’ll see what changed,', b: 'and what the information can and cannot show.' },
    body: 'Everything is compared with where you started. So before we change anything, we record how things are today.',
    band: [
      { t: 'Starting point', d: 'How things were before we changed anything.', eg: 'e.g. enquiries recorded in the month before work began' },
      { t: 'Work completed', d: 'What was actually done.', eg: 'e.g. the form fixed, enquiry recording switched on' },
      { t: 'What changed', d: 'What moved, compared with the starting point.', eg: 'e.g. enquiries now arriving from phones' },
      { t: 'What remains uncertain', d: 'What the information can’t show — and why.', eg: 'e.g. whether a quiet month was the season or the work' },
    ],
    bandCaption: 'What every review looks at. The examples are illustrations.',
    monthlyH: 'Every month',
    monthly: [
      { t: 'A performance report', icon: 'chart' },
      { t: 'A review call to go through it together', icon: 'phone' },
    ],
    /* OD-03 (brief `121fa15` §3). The checkpoint-3 `honest` pair is absorbed: [0] (few enquiries, chance) into T3
       item 4, [1] (phone → laptop, "they still count") into T4 item 1 and T5. Wording below is the LIVE
       /how-it-works copy unless a line says otherwise; see docs/ui-revamp/c-plus/od03/COPY_REGISTER.md. */

    /* T1 — live §3 "What we measure" (six points, MEASURED) and its grouping (STAGES, boundary label). T7 is condensed
       into the lead: live §1 sentences 3 and the Note, lightly joined. Qualified enquiry = live published wording. */
    measure: {
      h: 'What we measure',
      lead: 'Six points on one chain. The work at the top of the chain and the work at the bottom of it are connected, and the joins between them are where a result quietly disappears. What a given piece of work covers is decided per client.',
      listLabel: 'The six measured points',
      points: [
        { n: '01', g: 'Capture', t: 'Discovery and source', d: 'How someone first found the business, where that is knowable.' },
        { n: '02', g: 'Convert', t: 'Landing', d: 'What they arrived on, and from what.' },
        { n: '03', g: 'Convert', t: 'Interaction', d: 'What they did before enquiring, at the level of pages and actions rather than surveillance.' },
        { n: '04', g: 'Convert', t: 'The enquiry', d: 'Recorded at the moment it is made, with its source where the information is available, rather than reconstructed later.' },
        { n: '05', g: 'Measure', t: 'The qualified enquiry', d: 'Whether it is real, reachable, from a business context, with a stated need, and not a duplicate. This is the accountable number.', owned: true },
        { n: '06', g: 'Measure', t: 'Opportunity and revenue', d: 'Only where the client supplies their own close data, reported as the client’s numbers from the client’s system.', beyond: true },
      ],
      boundary: 'Accountable up to here',
    },
    /* T2 — live §3 Note ("Every one of those" → "Every one of the six points", because it no longer sits directly under
       the list) + the own-site clause from live §4 item 6. */
    baseline: {
      t: 'No starting point, no before-and-after.', // PROPOSED label (new wording)
      d: 'Every one of the six points is reported against a starting point captured before the work begins. Where no starting point was captured, there is no before, and we say so rather than manufacturing one. This applies to our own site as much as to a client’s.',
    },

    /* T3 — live §4 "What we do not measure, and cannot". Labels and bodies verbatim, except item 3 (corrected: Claude and
       Grok "could not be tested without an account" — Claude needed a login, Grok gated after the first message;
       `AI_ACCESS_CAPABILITY.md` §1). Item 2 carries a measured AI-search finding: FLAG (C) re-check against the
       first-party record before reuse. */
    notPromised: {
      h: 'What we do not promise',
      lead: 'Six things this method does not produce.',
      listLabel: 'Six things we do not promise',
      items: [
        { t: 'Revenue we do not control.', d: 'We do not set the price, build the product, staff the sales team, follow up the enquiry or close the deal. Revenue is reported from client data; it is never promised.' },
        { t: 'A rank in any AI system.', d: 'There is no such number. Order changed in every repeated prompt we measured, so a position would be a reading of noise.' },
        { t: 'Anything about systems we cannot test.', d: 'Claude and Grok could not be tested without an account, so we hold no baseline for either and make no claim about either.' },
        { t: 'Statistical significance below a real traffic threshold.', d: 'Below it, the work is research, diagnosis and design, and we describe it that way rather than calling an observation a test.' },
        { t: 'Enquiries with no usable acquisition context.', d: 'Direct entry, missing referrer, consent declined, and manually received enquiries — a phone call or an email — carry no first-touch attribution at all.' },
        { t: 'A before-and-after where no baseline was captured first.', d: 'This applies to our own site as much as to a client’s.' },
      ],
    },

    /* T4 — live §5. Heading, statement and definition verbatim. Each live paragraph is split into "what happens" and
       "what the record shows"; the record half is live wording, the situation half is a PROPOSED condensation of the
       live subject (see register). Item 3's tail "In this market…" is a live market claim: FLAG (C). */
    gaps: {
      h: 'What we cannot tell you about where an enquiry came from',
      lead: 'Attribution is useful, incomplete, and unevenly incomplete.',
      define: 'Attribution means connecting an enquiry back to how the person first found the business and what they were looking at when they enquired.',
      colA: 'What happens',
      colB: 'What the record shows',
      listLabel: 'Six gaps in attribution',
      items: [
        { a: 'Someone researches on their phone and enquires from a laptop.', b: 'They appear as two different people. We cannot join them.' },
        { a: 'A visitor declines tracking consent.', b: 'They are not tracked. That is correct, and it means their enquiry arrives with no source.' },
        { a: 'A link is shared in WhatsApp, an email or a private message.', b: 'It arrives with no referrer and is recorded as direct. The direct bucket is a residual, not a channel.' },
        { a: 'Someone was recommended by a customer, saw the business somewhere offline, or simply typed the domain in.', b: 'They arrive with nothing to attribute.' },
        { a: 'Someone phones or emails.', b: 'It carries no first-touch attribution at all. It is entered by a person, with the source recorded as unknown, and it is never quietly assigned to a channel.' },
        { a: 'Linking an enquiry to revenue.', b: 'Depends entirely on data the client supplies from their own system. Where it is not supplied, that part of the chain is empty and shown as empty.' },
      ],
    },

    /* T5 — live §5 callout, verbatim; the first sentence is set as the display line. */
    counts: {
      lead: 'A measurement gap never disqualifies a legitimate enquiry.',
      d: 'Whether an enquiry counts and whether we can tell where it came from are two separate questions. An enquiry we could not trace is still a real enquiry, it stays in the count, and the gap is reported as a gap — because moving it out would make the measurement look tidier and the business smaller.',
    },
    /* T10 (live §7 "Where the other capabilities sit in this") is OMITTED from this page by owner instruction
       (OD-03 refinement): it states service scope rather than measurement, and its automation sentence must first be
       checked against DEC-005 / SERVICE_ARCHITECTURE.md (brief §5 item 8). T11 (live close) is replaced by the
       approved C+ close. Both recorded in the copy register. */
  },

  together: {
    kicker: 'Working together',
    h: { a: 'Good work needs', b: 'both sides.' },
    youH: 'What we need from you',
    /* OD-03 T9: the live limits C+ dropped are restored — the lead (live §8 body), "what a good customer looks like.
       Nobody outside your business has that." and "the one part of the chain we do not control". */
    youLead: 'The work does not function without them.',
    you: [
      { t: 'Access', d: 'To your website, your Google and advertising accounts, and wherever enquiries arrive.', icon: 'key' },
      { t: 'What you know', d: 'What you sell, who buys it, what they ask before they buy, and what a good customer looks like. Nobody outside your business has that.', icon: 'user' },
      { t: 'Decisions', d: 'At a reasonable pace. Work that waits weeks for a yes loses more than it looks.', icon: 'clock' },
      { t: 'Following up', d: 'Replying to the enquiries that arrive. An enquiry nobody answers isn’t a result, and it is the one part of the chain we do not control.', icon: 'message' },
    ],
    usH: 'What you get from us',
    us: [
      'A reply by email or WhatsApp.',
      'A discovery call and an audit before we recommend anything.',
      'The findings, a recommended plan and a proposal before work starts.',
      'Nothing starts without your approval.',
      'We handle most of the agreed work, with your input where needed.',
      'A monthly performance report and a monthly review call.',
    ],
    /* OD-03 T6 — live §10 "What we do not know". CORRECTED after the evidence review (owner-approved): item 1 is dated
       (no keyword tool as of 2026-08-31, the latest verifiable date); item 2 states that analytics began in September
       2026 (DEC-021) without asserting that no baseline exists; item 3 is described as our research-based position, not
       three independent lines of evidence; item 4 names the tested surfaces instead of a "four systems" count
       (`AI_VISIBILITY_BASELINE.md` §4.1). "One location": no city, per OD-01. */
    unknown: {
      h: 'What we do not know',
      lead: 'Visible, rather than a footnote.',
      listLabel: 'Four things we do not know',
      items: [
        { t: 'Absolute search volume is unknown to us.', d: 'As of August 2026, no keyword tool has been available in this programme, so we quote no volume, no difficulty and no cost-per-click figure anywhere on this site. Where a figure would normally go, we write unknown.' },
        { t: 'Our own analytics only began in September 2026.', d: 'Collection started then, but the evidence we have reviewed does not establish a before-and-after baseline for our own site. Until it does, we do not show you one.' },
        { t: 'Organic search is a 12-month-plus horizon.', d: 'That is our position, drawn from our own research into how this category works for a new site. It is a horizon, not a schedule.' },
        { t: 'Our AI measurement is one round.', d: 'One day, one location, English, signed out, on Google’s AI Mode and AI Overviews, ChatGPT, Perplexity and Gemini. Claude and Grok could not be tested. One measurement is not a trend, and we will not describe a change until there is a second.' },
      ],
    },
  },

  close: {
    h: 'Start with a conversation.',
    body: 'Tell us about your business and what you want more of. We’ll get back to you by email or WhatsApp.',
  },
};
