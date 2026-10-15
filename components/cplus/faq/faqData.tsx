import type { ReactNode } from 'react';
import { InlineLink } from '@/components/direction-c/primitives';

/**
 * C+ FAQ questions and answers: the production /faq `Qa` type, `QAS` and `GROUPS`, moved here unchanged from
 * app/(pages)/faq/page.tsx so the page body and the route's FAQPage structured data read the same array. The approved
 * prototype (proto/direction-c-plus 0a8b611, faqData.tsx) is a mechanical copy of this content with one prototype-only
 * deviation ("from Pune" → "from one location") that the owner has NOT approved for production; it is not applied here.
 * One owner-approved correction (Batch 4): the attribution answer's first sentence is qualified ("Where the information
 * is available, an enquiry made through the website records its source…"), in both `a` and `plain`.
 */

export type Qa = { group: string; q: string; a: ReactNode; plain: string };

/* Every answer's `plain` string is the same answer as prose, and it is what the
   emitted FAQPage carries. Keeping both on one object is what makes drift
   impossible. */
export const QAS: Qa[] = [
  {
    group: 'Commercial',
    q: 'What does this cost, and what changes that number?',
    a: (
      <>
        What moves the number is scope, how many demand sources are involved, how complex the site is, whether
        measurement already works, how much content is needed, and how competitive your specific searches are.
        Two businesses of the same size get different quotes for that reason.{' '}
        <InlineLink href="/pricing">
          Which way each factor pushes
        </InlineLink>
        .
      </>
    ),
    plain:
      'What moves the number is scope, how many demand sources are involved, how complex the site is, whether measurement already works, how much content is needed, and how competitive your specific searches are. Two businesses of the same size get different quotes for that reason.',
  },
  {
    group: 'Commercial',
    q: 'What is the minimum commitment?',
    a: (
      <>
        Organic search is a 12-month-plus engine, and a three-month organic engagement is not a short version
        of the work &mdash; it is the part before anything happens. If you need results faster than that, paid
        search is the honest route and we would say so before taking the money.
      </>
    ),
    plain:
      'Organic search is a 12-month-plus engine, and a three-month organic engagement is not a short version of the work — it is the part before anything happens. If you need results faster than that, paid search is the honest route and we would say so before taking the money.',
  },
  {
    group: 'Outcome',
    q: 'What are you accountable for, and what will you not promise?',
    a: (
      <>
        <p>
          We are accountable up to the qualified enquiry: real, reachable, from a business with a stated need,
          not a duplicate. That is the number we work to and the number we report, against a starting point we
          capture before anything changes.
        </p>
        <p>
          Where you supply your close data, we report through to the revenue your own system recorded, as your
          numbers, with what we did not control stated alongside.
        </p>
        <p>
          We do not promise rankings, positions in AI answers, a number of enquiries, revenue, or a return on
          spend.
        </p>
      </>
    ),
    plain:
      'We are accountable up to the qualified enquiry: real, reachable, from a business with a stated need, not a duplicate. That is the number we work to and the number we report, against a starting point we capture before anything changes. Where you supply your close data, we report through to the revenue your own system recorded, as your numbers, with what we did not control stated alongside. We do not promise rankings, positions in AI answers, a number of enquiries, revenue, or a return on spend.',
  },
  {
    group: 'Outcome',
    q: "Why won't you guarantee results?",
    a: (
      <>
        <p>
          Because we do not control the ranking systems, your competitors, your price, your product, your
          capacity, or how quickly you answer an enquiry. A guarantee covering things somebody else controls is
          either meaningless or it is written so narrowly that meeting it changes nothing in your business.
        </p>
        <p>
          What replaces the guarantee is that the result is checkable: a starting point captured first, the
          enquiries counted, the sources reported, and the gaps in the measurement shown rather than smoothed
          over.
        </p>
      </>
    ),
    plain:
      'Because we do not control the ranking systems, your competitors, your price, your product, your capacity, or how quickly you answer an enquiry. A guarantee covering things somebody else controls is either meaningless or it is written so narrowly that meeting it changes nothing in your business. What replaces the guarantee is that the result is checkable: a starting point captured first, the enquiries counted, the sources reported, and the gaps in the measurement shown rather than smoothed over.',
  },
  {
    group: 'Outcome',
    q: 'How long before anything changes?',
    a: (
      <>
        <p>Organic search: 12 months and beyond. That is our position and we state it before you commit.</p>
        <p>Paid search: weeks, where the demand is already there.</p>
        <p>
          A broken enquiry path: days. If that is what is wrong, it is the cheapest result you will get from
          us, and it is more common than people expect.
        </p>
      </>
    ),
    plain:
      'Organic search: 12 months and beyond. That is our position and we state it before you commit. Paid search: weeks, where the demand is already there. A broken enquiry path: days. If that is what is wrong, it is the cheapest result you will get from us, and it is more common than people expect.',
  },
  {
    group: 'Measurement',
    q: "How do you know an enquiry came from your work, and what can't you tell?",
    a: (
      <>
        <p>
          Where the information is available, an enquiry made through the website records its source at the
          moment it is made &mdash; where the person first arrived from, and what they were on when they
          enquired &mdash; rather than being reconstructed afterwards.
        </p>
        <p>
          What we cannot tell you: anyone who researched on a phone and enquired on a laptop looks like two
          people. Anyone who declines tracking consent has no recorded source, correctly. And phone calls and
          emails carry no source at all.
        </p>
        <p>
          Those enquiries are shown as unattributed. They are never assigned to a channel to make a report look
          complete.{' '}
          <InlineLink href="/how-it-works">
            The full list of what breaks, and why
          </InlineLink>
          .
        </p>
      </>
    ),
    plain:
      'Where the information is available, an enquiry made through the website records its source at the moment it is made — where the person first arrived from, and what they were on when they enquired — rather than being reconstructed afterwards. What we cannot tell you: anyone who researched on a phone and enquired on a laptop looks like two people. Anyone who declines tracking consent has no recorded source, correctly. And phone calls and emails carry no source at all. Those enquiries are shown as unattributed. They are never assigned to a channel to make a report look complete.',
  },
  {
    group: 'Measurement',
    q: 'What counts as a qualified enquiry here, and who decides?',
    a: (
      <>
        <p>
          The system decides, automatically, at the moment the enquiry arrives, against five checks: it passes
          abuse screening, there is a reachable name and email, there is a business context (a company, a
          website or a work email domain &mdash; any one), there is a stated need, and it is not a duplicate.
        </p>
        <p>
          It deliberately does not judge whether you should want the work. Fit and value per opportunity cannot
          be established by a form, and a budget dropdown produces an unverified number that makes reports look
          precise and nothing more. That is a conversation.
        </p>
        <p>
          Job applications, course enquiries, vendor pitches, student requests and requests for work we do not
          do are not counted. They are stored and readable, and reported separately.{' '}
          <InlineLink href="/lead-generation">
            The published definition
          </InlineLink>
          .
        </p>
      </>
    ),
    plain:
      'The system decides, automatically, at the moment the enquiry arrives, against five checks: it passes abuse screening, there is a reachable name and email, there is a business context (a company, a website or a work email domain — any one), there is a stated need, and it is not a duplicate. It deliberately does not judge whether you should want the work. Fit and value per opportunity cannot be established by a form, and a budget dropdown produces an unverified number that makes reports look precise and nothing more. That is a conversation. Job applications, course enquiries, vendor pitches, student requests and requests for work we do not do are not counted. They are stored and readable, and reported separately.',
  },
  {
    group: 'Measurement',
    q: 'What access do you need, and what do we keep?',
    a: (
      <>
        <p>
          Analytics, search console, ad accounts, the site, and visibility of where enquiries land. Measurement
          access is not negotiable &mdash; without it nothing we report afterwards can be checked, and you
          would be taking our word for it.
        </p>
        <p>
          The measurement layer is yours. The accounts are in your name, the data is yours, and if we stop
          working together it stays with you rather than leaving with us.
        </p>
      </>
    ),
    plain:
      'Analytics, search console, ad accounts, the site, and visibility of where enquiries land. Measurement access is not negotiable — without it nothing we report afterwards can be checked, and you would be taking our word for it. The measurement layer is yours. The accounts are in your name, the data is yours, and if we stop working together it stays with you rather than leaving with us.',
  },
  {
    group: 'Fit',
    q: 'Who is this for, and who is it not for?',
    a: (
      <>
        <p>
          It works for businesses where a customer takes time to decide, one good enquiry is worth real money,
          and demand for what you sell already exists or can reasonably be reached.
        </p>
        <p>
          It is a poor fit where demand would have to be created from nothing, where the purchase is impulse or
          price-only, where enquiries cannot be answered when they arrive, or where a guaranteed outcome is a
          requirement.
        </p>
        <p>
          We do not set a revenue or headcount threshold. What one customer is worth matters; how big you are
          does not.
        </p>
      </>
    ),
    plain:
      'It works for businesses where a customer takes time to decide, one good enquiry is worth real money, and demand for what you sell already exists or can reasonably be reached. It is a poor fit where demand would have to be created from nothing, where the purchase is impulse or price-only, where enquiries cannot be answered when they arrive, or where a guaranteed outcome is a requirement. We do not set a revenue or headcount threshold. What one customer is worth matters; how big you are does not.',
  },
  {
    group: 'AI search',
    q: 'Can you get our business into ChatGPT and AI answers?',
    a: (
      <>
        <p>No, and nobody can promise that.</p>
        <p>
          What we can do is work on the things those answers are actually assembled from. When we measured this
          ourselves &mdash; 28 unbranded runs across four systems on one day, from Pune, in English, signed out
          &mdash; we appeared zero times, and directory and listing sources appeared in 15 of those runs. In
          one of them, ChatGPT stated plainly that it had picked the brands it named by reading two
          directories.
        </p>
        <p>
          So the work is entity accuracy, the sources those answers draw on, and pages precise enough to be
          quoted &mdash; much of which sits off your own website. We measure it per system, with the run counts
          published. We do not produce a score, and there is no ranking in these systems to be had: the order
          changed in every repeated prompt we ran.{' '}
          <InlineLink href="/ai-seo">
            What that work involves
          </InlineLink>
          .
        </p>
      </>
    ),
    plain:
      'No, and nobody can promise that. What we can do is work on the things those answers are actually assembled from. When we measured this ourselves — 28 unbranded runs across four systems on one day, from Pune, in English, signed out — we appeared zero times, and directory and listing sources appeared in 15 of those runs. In one of them, ChatGPT stated plainly that it had picked the brands it named by reading two directories. So the work is entity accuracy, the sources those answers draw on, and pages precise enough to be quoted — much of which sits off your own website. We measure it per system, with the run counts published. We do not produce a score, and there is no ranking in these systems to be had: the order changed in every repeated prompt we ran.',
  },
  {
    group: 'AI search',
    q: 'Is GEO or AEO a separate discipline from SEO?',
    a: (
      <>
        <p>
          Mostly not. Where non-Google systems genuinely differ is in which third-party sources they lean on
          when assembling an answer, which changes where the work goes rather than making it a new discipline.
        </p>
        <p>The acronyms are mostly a way of selling the same work twice.</p>
      </>
    ),
    plain:
      'Mostly not. Where non-Google systems genuinely differ is in which third-party sources they lean on when assembling an answer, which changes where the work goes rather than making it a new discipline. The acronyms are mostly a way of selling the same work twice.',
  },
];

export const GROUPS = ['Commercial', 'Outcome', 'Measurement', 'Fit', 'AI search'] as const;
