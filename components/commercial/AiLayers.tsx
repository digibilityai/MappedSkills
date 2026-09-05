/**
 * SESSION 28 — PHASE F — the two `/ai-seo` explanatory objects.
 *
 * These are the only route-specific figures in Phase F, and they exist because
 * `/ai-seo` is D — NONE in the F1 taxonomy: F3 (the four layers) is this
 * page's one figure of full weight, and the run does not appear on the page at
 * all.
 *
 * F3 — THE FOUR LAYERS, KEPT SEPARATE.
 * Source: docs/08-messaging/AI_SEARCH_LANGUAGE.md §6, verbatim, including the
 * first-party results. This is the clearest available demonstration of why a
 * single score is the wrong instrument: the whole finding — access works, and
 * everything downstream of it is zero — would be invisible under any blended
 * number.
 *
 * PROHIBITIONS CHECKED ON BOTH OBJECTS:
 * - the layers are NEVER aggregated into a score, an average or a rating (B7);
 * - "not testable" is visually distinct from a MEASURED ZERO, and the two are
 *   distinguishable WITHOUT COLOUR (B1) — one is set in words, marked with the
 *   open dashed mark that means "no data" everywhere on this site, and the
 *   other states its run count;
 * - no claim of any kind is made about Claude or Grok beyond "not testable";
 * - GEO, AEO and LLMO appear nowhere;
 * - the removed vendor AI-referral-share statistic is not reintroduced.
 *
 * RESPONSIVE: both objects are real tables in a scroll container, so the PAGE
 * body never scrolls horizontally at any width even though a wide table can
 * scroll inside its own region (48 §M7).
 */

import { Mark } from '@/components/commercial/primitives';

type Layer = { layer: string; question: string; result: string };

const LAYERS: Layer[] = [
  { layer: 'Retrieval', question: 'Can a system find and read the site at all?', result: 'Works — full access, served correctly' },
  { layer: 'Discovery', question: 'Does the business appear when the buyer does not name it?', result: 'Zero, in 28 unbranded runs' },
  { layer: 'Recommendation', question: 'Is the business actually recommended?', result: 'Zero' },
  { layer: 'Citation', question: 'Is the site used as a source in an unbranded answer?', result: 'Zero' },
];

export function AiLayers() {
  return (
    <figure className="m-0 mt-[clamp(30px,3.6vw,52px)]">
      <figcaption className="m-0 mb-4 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
        The four layers, kept separate — never combined into one number
      </figcaption>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <caption className="sr-only">
            The four layers of AI search, each with the question it asks and MappedSkills&rsquo; own measured
            result on it, from 28 unbranded runs on four systems on one day, from Pune, in English, signed out.
          </caption>
          <thead>
            <tr className="border-b-2 border-resolve-ink">
              <th scope="col" className="py-3 pr-4 text-[.8rem] font-bold uppercase tracking-[0.12em] text-resolve-dim">
                Layer
              </th>
              <th scope="col" className="py-3 pr-4 text-[.8rem] font-bold uppercase tracking-[0.12em] text-resolve-dim">
                The question
              </th>
              <th scope="col" className="py-3 text-[.8rem] font-bold uppercase tracking-[0.12em] text-resolve-dim">
                Our own result
              </th>
            </tr>
          </thead>
          <tbody>
            {LAYERS.map((row) => (
              <tr key={row.layer} className="border-b border-resolve-line align-top">
                <th scope="row" className="py-[clamp(12px,1.6vw,18px)] pr-4 font-heading text-[1.02rem] font-bold tracking-[-0.02em]">
                  {row.layer}
                </th>
                <td className="py-[clamp(12px,1.6vw,18px)] pr-4 text-[.96rem] leading-relaxed text-resolve-dim">
                  {row.question}
                </td>
                <td className="py-[clamp(12px,1.6vw,18px)] text-[.96rem] font-semibold leading-relaxed">
                  {row.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NOT TESTABLE is stated in words and marked with the open/no-data mark.
          It is a different kind of statement from a measured zero and it is
          never rendered as one. */}
      <div
        className="mt-[clamp(18px,2.2vw,28px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]"
        style={{ borderColor: 'var(--resolve-gap)' }}
      >
        <p className="m-0 flex items-baseline gap-3 text-[1rem] font-bold leading-[1.4] text-resolve-dim">
          <Mark state="open" className="translate-y-px" />
          Two systems: not testable
        </p>
        <p className="mt-2 max-w-[58ch] text-[.96rem] leading-relaxed text-resolve-dim">
          Claude and Grok could not be tested at all. We hold no baseline for either.{' '}
          <b className="font-bold text-resolve-ink">
            That is not a zero, and it is not a result &mdash; it is an absence of data, and we make no claim
            about either system.
          </b>
        </p>
      </div>

      <p className="mt-[clamp(16px,2vw,24px)] max-w-[64ch] text-[.9rem] leading-[1.55] text-resolve-dim">
        28 unbranded runs on four systems, on one day, from Pune, in English, signed out. Counts, not rates. No
        confidence interval is claimed and none is available. Nothing on this table is averaged, blended or
        scored &mdash; the whole finding would be invisible under a single number, which is the argument for
        keeping the layers apart.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------------ */

/**
 * The training-crawler versus retrieval-crawler mapping, with the actual
 * user-agent tokens. The market conflates the two constantly, and the table
 * settles it faster than a paragraph.
 *
 * Source: docs/08-messaging/CLAIMS_LADDER.md — ladder A, primary documentation:
 * "`GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern training.
 * `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` govern retrieval."
 * No token is added to that list here, and none is invented.
 */
const TRAINING = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'];
const RETRIEVAL = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'];

export function CrawlerTable() {
  return (
    <figure className="m-0 mt-[clamp(30px,3.6vw,52px)]">
      <figcaption className="m-0 mb-4 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
        Two different things the market keeps treating as one
      </figcaption>

      <div className="grid grid-cols-1 gap-[clamp(22px,3vw,52px)] min-[761px]:grid-cols-2">
        <div className="border-t-2 border-resolve-ink pt-4">
          <h3 className="m-0 font-heading text-[1.08rem] font-bold tracking-[-0.02em]">Training crawlers</h3>
          <p className="mt-2 max-w-[42ch] text-[.96rem] leading-relaxed text-resolve-dim">
            Govern whether your pages may be used to train a model. Blocking one does not remove you from an
            answer.
          </p>
          <ul className="m-0 mt-4 list-none p-0">
            {TRAINING.map((token) => (
              <li key={token} className="border-b border-resolve-line py-2.5 text-[.98rem] font-semibold">
                {token}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-2 pt-4" style={{ borderColor: 'var(--resolve-accent-deep)' }}>
          <h3 className="m-0 font-heading text-[1.08rem] font-bold tracking-[-0.02em]">Retrieval crawlers</h3>
          <p className="mt-2 max-w-[42ch] text-[.96rem] leading-relaxed text-resolve-dim">
            Govern whether your pages can be fetched and read when a system is assembling an answer now. This is
            the access that matters, and having it proves nothing on its own.
          </p>
          <ul className="m-0 mt-4 list-none p-0">
            {RETRIEVAL.map((token) => (
              <li key={token} className="border-b border-resolve-line py-2.5 text-[.98rem] font-semibold">
                {token}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-[clamp(16px,2vw,24px)] max-w-[64ch] text-[.9rem] leading-[1.55] text-resolve-dim">
        The tokens above are the ones named in primary vendor documentation. Which crawlers a business should
        allow is a decision with consequences in both directions, and it is one we set out rather than take on
        anyone&rsquo;s behalf.
      </p>
    </figure>
  );
}
