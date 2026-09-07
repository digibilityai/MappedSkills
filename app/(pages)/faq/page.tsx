import type { ReactNode } from 'react';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body } from '@/components/commercial/primitives';
import { RouteHero } from '@/components/routes/primitives';
import { CommercialClose } from '@/components/commercial/CommercialClose';

/**
 * SESSION 29 — PHASE G — `/faq`. ARCHETYPE 11 — support / entity.
 *
 * THE PAGE'S GOVERNING RULE IS A CORRECTNESS RULE, NOT A STYLE ONE. Systems
 * reading this site have already been observed reporting contradictory service
 * descriptions from it, and every answer here is written to be accurate WHEN
 * READ ALONE, because that is how they will be extracted. No answer below may
 * contradict `/how-it-works` or `/pricing`, and each was checked against them.
 *
 * BLOCKED ANSWERS.
 *
 *  - Q2, "Is ad spend separate from your fee?" — the ENTIRE answer is the
 *    owner-blocked fee/spend arrangement. The approved copy says the answer
 *    "will be one sentence, and it must match /pricing and /google-ads
 *    exactly". IT RENDERS NOTHING. The question does not appear as an
 *    unanswered heading, and no "it depends" stands in for it. `/google-ads`
 *    handles the same blocker the same way and Phase F recorded it.
 *  - Q1 and Q3 each carry a blocked half — the confirmed price bands and the
 *    minimum engagement length. THOSE HALVES RENDER NOTHING. What remains of
 *    each answer is unblocked, substantive and true on its own, so the question
 *    renders with the part that can be answered and no invented figure. A
 *    reader still gets no price and no minimum from this page, which is the
 *    honest state.
 *  - Q12's opening rests on a quotation of Google's published position that
 *    `copy/faq.md` flags `[VALIDATION REQUIRED — re-verify the quotation, its
 *    source and its date at publication]`. THE QUOTATION AND THE ATTRIBUTION
 *    RENDER NOTHING. The firm's own position on the question is unblocked and
 *    renders in full. `/ai-seo` handled the same flagged claim the same way in
 *    Phase F.
 *
 * THE HEADING SAYS "QUESTIONS WE GET ASKED", NOT "THE TWELVE QUESTIONS". With
 * one question blocked out, stating a count would state a number that does not
 * match what is on the page. Phase F made the same adjustment on `/ai-seo` for
 * the same reason; it is a heading-format change, which production translation
 * permits, and it is not a rewrite of approved copy.
 *
 * SCHEMA. `FAQPage` is emitted, and it is GENERATED FROM THE SAME ARRAY that
 * renders the visible questions, so the markup cannot describe a question the
 * page does not show or omit one it does. The page that shipped before this one
 * emitted markup for ONE question against a larger on-page set. Rich-result
 * eligibility must still be re-verified against current official guidance
 * before launch — recorded, not claimed.
 *
 * INTERACTION — CHANGED IN PHASE J STAGE 3, and the change is toward the
 * approved architecture rather than away from it.
 *
 * Session 29 shipped this page with every answer expanded and no accordion,
 * reasoning that "an answer a sceptical reader has to open is an answer the
 * page has decided to hide". That instinct is right for limits, method and
 * attribution — and the approved UX architecture already says so, and already
 * carves out this one page:
 *
 *   "`/faq` is the ONE page type where a collapsed-on-load accordion is
 *    permitted (A20 CONDITIONAL), because each item is a genuine discrete
 *    question the reader chooses between. It is NOT permitted for limits,
 *    method, attribution, or anything a reader needs in order to evaluate a
 *    claim."   — 03_PAGE_TYPE_ARCHITECTURE.md §14
 *
 * The same permission is recorded in 13_ACCESSIBILITY_REQUIREMENTS.md,
 * 15_SEARCH_DISCOVERY_UX.md §34 ("Yes, collapsed on load"),
 * 16_PAGE_STRUCTURE_MATRIX.md row 22 ("EXPANDABLE") and 18_UX_ANTI_PATTERNS.md.
 * Session 29 was therefore MORE conservative than the architecture allows, not
 * differently governed. Stage 3 takes the permission.
 *
 * WHAT IS PRESERVED, because the original reasoning still binds where it
 * applies:
 *   · Every question and every answer is in the server HTML, in full, in order.
 *   · `<details>` needs NO JAVASCRIPT to open. A reader with scripting off can
 *     read every answer. There is no client component on this route.
 *   · The emitted `FAQPage` schema is still generated FROM THE SAME ARRAY, so
 *     the markup and the visible page cannot describe different question sets.
 *   · The answers that cost the firm work are not demoted, reordered, greyed or
 *     collapsed differently from any other — every row is identical.
 *   · No accordion is applied anywhere else on the site.
 *
 * F1: D — NONE. No figure on this route.
 */
export const metadata = createMetadata(
  'Questions We Get Asked, Answered Plainly | MappedSkills',
  'Including the ones with answers that lose us work: what we are accountable for, why we will not guarantee results, what we cannot tell you about where an enquiry came from, and what counts as a qualified enquiry.',
  '/faq'
);

type Qa = { group: string; q: string; a: ReactNode; plain: string };

/* Every answer's `plain` string is the same answer as prose, and it is what the
   emitted FAQPage carries. Keeping both on one object is what makes drift
   impossible. */
const QAS: Qa[] = [
  {
    group: 'Commercial',
    q: 'What does this cost, and what changes that number?',
    a: (
      <>
        What moves the number is scope, how many demand sources are involved, how complex the site is, whether
        measurement already works, how much content is needed, and how competitive your specific searches are.
        Two businesses of the same size get different quotes for that reason.{' '}
        <Link href="/pricing" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
          Which way each factor pushes
        </Link>
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
        <p className="m-0">
          We are accountable up to the qualified enquiry: real, reachable, from a business with a stated need,
          not a duplicate. That is the number we work to and the number we report, against a starting point we
          capture before anything changes.
        </p>
        <p className="mt-3">
          Where you supply your close data, we report through to the revenue your own system recorded, as your
          numbers, with what we did not control stated alongside.
        </p>
        <p className="mt-3">
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
        <p className="m-0">
          Because we do not control the ranking systems, your competitors, your price, your product, your
          capacity, or how quickly you answer an enquiry. A guarantee covering things somebody else controls is
          either meaningless or it is written so narrowly that meeting it changes nothing in your business.
        </p>
        <p className="mt-3">
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
        <p className="m-0">Organic search: 12 months and beyond. That is our position and we state it before you commit.</p>
        <p className="mt-3">Paid search: weeks, where the demand is already there.</p>
        <p className="mt-3">
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
        <p className="m-0">
          Each enquiry records its own source at the moment it is made &mdash; where the person first arrived
          from, and what they were on when they enquired &mdash; rather than being reconstructed afterwards.
        </p>
        <p className="mt-3">
          What we cannot tell you: anyone who researched on a phone and enquired on a laptop looks like two
          people. Anyone who declines tracking consent has no recorded source, correctly. And phone calls and
          emails carry no source at all.
        </p>
        <p className="mt-3">
          Those enquiries are shown as unattributed. They are never assigned to a channel to make a report look
          complete.{' '}
          <Link
            href="/how-it-works"
            className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
          >
            The full list of what breaks, and why
          </Link>
          .
        </p>
      </>
    ),
    plain:
      'Each enquiry records its own source at the moment it is made — where the person first arrived from, and what they were on when they enquired — rather than being reconstructed afterwards. What we cannot tell you: anyone who researched on a phone and enquired on a laptop looks like two people. Anyone who declines tracking consent has no recorded source, correctly. And phone calls and emails carry no source at all. Those enquiries are shown as unattributed. They are never assigned to a channel to make a report look complete.',
  },
  {
    group: 'Measurement',
    q: 'What counts as a qualified enquiry here, and who decides?',
    a: (
      <>
        <p className="m-0">
          The system decides, automatically, at the moment the enquiry arrives, against five checks: it passes
          abuse screening, there is a reachable name and email, there is a business context (a company, a
          website or a work email domain &mdash; any one), there is a stated need, and it is not a duplicate.
        </p>
        <p className="mt-3">
          It deliberately does not judge whether you should want the work. Fit and value per opportunity cannot
          be established by a form, and a budget dropdown produces an unverified number that makes reports look
          precise and nothing more. That is a conversation.
        </p>
        <p className="mt-3">
          Job applications, course enquiries, vendor pitches, student requests and requests for work we do not
          do are not counted. They are stored and readable, and reported separately.{' '}
          <Link
            href="/lead-generation"
            className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
          >
            The published definition
          </Link>
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
        <p className="m-0">
          Analytics, search console, ad accounts, the site, and visibility of where enquiries land. Measurement
          access is not negotiable &mdash; without it nothing we report afterwards can be checked, and you
          would be taking our word for it.
        </p>
        <p className="mt-3">
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
        <p className="m-0">
          It works for businesses where a customer takes time to decide, one good enquiry is worth real money,
          and demand for what you sell already exists or can reasonably be reached.
        </p>
        <p className="mt-3">
          It is a poor fit where demand would have to be created from nothing, where the purchase is impulse or
          price-only, where enquiries cannot be answered when they arrive, or where a guaranteed outcome is a
          requirement.
        </p>
        <p className="mt-3">
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
        <p className="m-0">No, and nobody can promise that.</p>
        <p className="mt-3">
          What we can do is work on the things those answers are actually assembled from. When we measured this
          ourselves &mdash; 28 unbranded runs across four systems on one day, from Pune, in English, signed out
          &mdash; we appeared zero times, and directory and listing sources appeared in 15 of those runs. In
          one of them, ChatGPT stated plainly that it had picked the brands it named by reading two
          directories.
        </p>
        <p className="mt-3">
          So the work is entity accuracy, the sources those answers draw on, and pages precise enough to be
          quoted &mdash; much of which sits off your own website. We measure it per system, with the run counts
          published. We do not produce a score, and there is no ranking in these systems to be had: the order
          changed in every repeated prompt we ran.{' '}
          <Link href="/ai-seo" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            What that work involves
          </Link>
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
        <p className="m-0">
          Mostly not. Where non-Google systems genuinely differ is in which third-party sources they lean on
          when assembling an answer, which changes where the work goes rather than making it a new discipline.
        </p>
        <p className="mt-3">The acronyms are mostly a way of selling the same work twice.</p>
      </>
    ),
    plain:
      'Mostly not. Where non-Google systems genuinely differ is in which third-party sources they lean on when assembling an answer, which changes where the work goes rather than making it a new discipline. The acronyms are mostly a way of selling the same work twice.',
  },
];

const GROUPS = ['Commercial', 'Outcome', 'Measurement', 'Fit', 'AI search'] as const;

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: QAS.map((qa) => ({
              '@type': 'Question',
              name: qa.q,
              acceptedAnswer: { '@type': 'Answer', text: qa.plain },
            })),
          }),
        }}
      />

      <RouteHero
        eyebrow="Questions"
        title={<>Questions we get asked, answered plainly.</>}
        lede={<>Including the ones with answers that lose us work.</>} mode="offset">
        <p>
          An honest answer that costs an enquiry is the right answer &mdash; the alternative is finding out in
          month three.
        </p>
      </RouteHero>

      {GROUPS.map((group, gi) => {
        const items = QAS.filter((qa) => qa.group === group);
        if (items.length === 0) return null;
        return (
          <CommercialSection key={group} tone={gi % 2 === 0 ? 'paper' : 'ground'} mode="split">
            <ChapterLabel>{group}</ChapterLabel>
            <ul className="m-0 mt-[clamp(24px,3vw,40px)] list-none border-t-2 border-resolve-ink p-0">
              {items.map((qa) => (
                <li key={qa.q} className="m-0 border-b border-resolve-line">
                  {/* Collapsed on load, from the SERVER — not by script. There
                      is no hydration step here and no layout shift, and a
                      reader with no JavaScript can still open every answer,
                      because `<details>` is a native control. */}
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-[clamp(20px,2.4vw,30px)] [&::-webkit-details-marker]:hidden">
                      <span className="m-0 max-w-[44ch] font-heading text-[clamp(1.14rem,2vw,1.5rem)] font-bold leading-[1.18] tracking-[-0.03em]">
                        {qa.q}
                      </span>
                      {/* Two hairlines making a plus; the upright is dropped
                          when the row is open. `aria-hidden` because `<summary>`
                          already exposes its own expanded state natively. */}
                      <span
                        aria-hidden="true"
                        className="relative mt-[.55em] block h-[2px] w-[15px] flex-none bg-resolve-dim
                                   before:absolute before:left-[6.5px] before:top-[-6.5px] before:block before:h-[15px]
                                   before:w-[2px] before:bg-resolve-dim before:transition-transform
                                   before:duration-[180ms] before:ease-[cubic-bezier(0.65,0,0.35,1)]
                                   before:content-[''] group-open:before:scale-y-0"
                      />
                    </summary>
                    <div className="max-w-[62ch] pb-[clamp(20px,2.4vw,30px)] text-[1.02rem] leading-relaxed text-resolve-dim">
                      {qa.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </CommercialSection>
        );
      })}

      {/* The action section. LOW-COMMITMENT routes first, then the PRIMARY. */}
      <CommercialSection mode="split">
        <ChapterLabel>Something not answered here</ChapterLabel>
        <Display>Then it is worth asking directly.</Display>
        <Body>
          The answer will be the same one we would give on a call. If it is the method or the cost you are
          after,{' '}
          <Link href="/how-it-works" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the method is published in full
          </Link>{' '}
          and{' '}
          <Link href="/pricing" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            what moves the number is set out here
          </Link>
          .
        </Body>
      </CommercialSection>

      <CommercialClose
        label="Ask the one that matters to you"
        heading={<>The awkward ones get the same answer either way.</>}
        body={<>Tell us what is actually happening and we will tell you where we think the problem sits.</>}
        action="Tell us what you're trying to fix" mode="centred" />
    </>
  );
}
