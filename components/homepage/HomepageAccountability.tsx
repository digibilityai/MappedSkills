import { Container } from '@/components/layout/Container';

/**
 * ACCOUNTABILITY — claim, what it stands on, its boundary, and fit. THE
 * RECORD (the credibility/evidence system) informs this content but is not
 * the art direction: THE RESOLVE's visual language (ivory ground, ink,
 * tangerine, Bricolage/Manrope) is used throughout, not a report/archive/
 * document-viewer treatment.
 *
 * Combines three approved chapters — the accountability boundary, the
 * evidence admission/claim, and fit — into one static section, per the same
 * compression principle Session 18B applied. No case study, testimonial,
 * logo, rating or fabricated metric appears anywhere in this component.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapters "the
 * boundary", "evidence" and "fit".
 *
 * SESSION 25B: the approved display scale is restored (`clamp()` rather than
 * fixed Tailwind steps — the admission rendered at 60px against an approved
 * 86.4px at 1425), and the page's ours/not-ours SHAPE channel is restored to
 * this chapter: every "we do not promise" line carries the open dashed mark
 * and the owned statement carries the solid tangerine mark, exactly as in the
 * hero, the friction routes, the chain and fit. Without them the boundary was
 * carried by type alone.
 *
 * SESSION 26 — PHASE D. This chapter is INTENTIONALLY STILL. The only thing
 * added is the page's composition-level reveal (`.rsv-rv`), which is not a
 * budgeted tier: it makes a section appear and carries no meaning. The strike
 * through each promise that Sessions 18–18C documented was REMOVED in 19A
 * because it had never rendered, and it is deliberately NOT reintroduced. The
 * evidence claim is left permanently open rather than being put behind the
 * prototype's "lift this claim" disclosure — Phase C's composed-open state
 * shows more, hides nothing, and is the state the reader validated.
 */
const NOT_PROMISED = [
  'a specific Google ranking',
  'inclusion in an AI answer',
  'a fixed number of enquiries',
  'revenue',
  'a return on ad spend',
];

export function HomepageAccountability() {
  return (
    <section className="border-t border-resolve-line bg-resolve-ground py-[50px] text-resolve-ink">
      <Container>
        {/* ---- the boundary ---- */}
        <p className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          What we take responsibility for
        </p>

        <div className="rsv-rv mt-[clamp(28px,3.6vw,52px)] grid grid-cols-1 items-start gap-[clamp(28px,4vw,68px)] min-[1000px]:grid-cols-2">
          <div>
            <span className="mb-3.5 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
              What we don&rsquo;t guarantee
            </span>
            <ul className="m-0 list-none p-0">
              {NOT_PROMISED.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-resolve-line py-3.5 text-[clamp(1.05rem,2.1vw,1.5rem)] font-semibold leading-[1.25] text-resolve-dim"
                >
                  <i className="inline-flex flex-none items-center gap-3 text-[.8rem] font-semibold not-italic text-resolve-dim">
                    {String(i + 1).padStart(2, '0')}
                    <span
                      aria-hidden="true"
                      className="h-[13px] w-[13px] flex-none"
                      style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
                    />
                  </i>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[.82rem] font-medium leading-[1.5] text-resolve-dim">
              Those outcomes depend on factors beyond marketing alone. We measure what we can
              influence and make the limits visible.
            </p>
          </div>

          <div className="border-l-4 pl-[clamp(20px,2.4vw,30px)]" style={{ borderColor: 'var(--resolve-accent-deep)' }}>
            <h2 className="m-0 mb-4 max-w-[18ch] font-heading text-[clamp(1.5rem,3.2vw,2.7rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              <span
                aria-hidden="true"
                className="mr-3.5 inline-block h-4 w-4 translate-y-px"
                style={{ background: 'var(--resolve-accent-deep)' }}
              />
              We improve and measure{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                the path to a qualified enquiry.
              </em>
            </h2>
            <p className="max-w-none text-resolve-dim">
              We work on the parts of marketing we can influence: whether the right buyers find you,
              whether your website gives them a reason to enquire, and whether the enquiry can be
              traced back to what worked.
            </p>
          </div>
        </div>

        <a
          href="/how-it-works"
          className="rsv-rv mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
          style={{ color: 'var(--resolve-accent-dark)' }}
        >
          See what can and cannot be attributed
        </a>

        {/* ---- evidence ---- */}
        <div className="mt-[50px] border-t border-resolve-line pt-[50px]">
          <p className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            Proof you can check
          </p>

          <h2 className="rsv-rv mt-[clamp(24px,3vw,44px)] max-w-[20ch] font-heading text-[clamp(2.1rem,5.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
            We would rather show evidence than manufacture <span style={{ color: 'var(--resolve-accent)' }}>a success story. </span>
          </h2>
          <p className="rsv-rv mt-[clamp(26px,3vw,44px)] max-w-[80ch] text-resolve-dim">
            We are building our published case-study library. Until then, we show what we can
            verify: our methods, tests, measurement approach and their limitations.
          </p>

          <div className="rsv-rv rsv-ink-card mt-[clamp(32px,4vw,56px)] overflow-hidden rounded-[20px] bg-resolve-ink text-resolve-ground">
            <div className="p-[clamp(26px,4vw,58px)]">
              <h3 className="m-0 mb-4 max-w-[20ch] font-heading text-[clamp(1.55rem,4vw,3.2rem)] font-extrabold leading-[1.03] tracking-[-0.035em]">
                We tested our own AI search visibility.{' '}
                <em className="not-italic" style={{ color: 'var(--resolve-accent)' }}>
                  We weren&rsquo;t recommended once.
                </em>
              </h3>
              <p className="m-0 max-w-[54ch]" style={{ color: '#C0B9CA' }}>
                We asked four AI assistants 28 questions people could use to find an agency like
                ours. MappedSkills appeared zero times.
              </p>
            </div>
            <div
              className="border-t px-[clamp(26px,4vw,58px)] pb-[clamp(26px,3vw,40px)] pt-[clamp(20px,2.6vw,34px)]"
              style={{ borderColor: 'var(--resolve-rule)', background: 'var(--resolve-ink-deep)' }}
            >
              <p className="m-0 mb-[18px] text-[.98rem]" style={{ color: '#C0B9CA' }}>
                This was a one-day test from Pune, signed out. It is a snapshot, not a market-wide
                study.{' '}
                <b className="font-bold text-resolve-ground">
                  No confidence interval is claimed and none is available,
                </b>{' '}
                and two systems could not be tested at all, so they are named as untested rather
                than characterised. We publish the method so you can judge the evidence yourself.
              </p>
              {/*
                SESSION 33 — PHASE I. A link to `/research/ai-visibility-baseline`
                was here. THE ROUTE HAS NEVER EXISTED — a crawl of the built site
                returned 404 — and the research entry is recorded as NOT DRAFTED.
                Sending a reader who has just been told a number to a 404 is the
                worst place on this site to break a link, because the link is the
                evidence offer. The measurement, its scope and its stated limits
                are all in the paragraph above and are unchanged.
              */}
            </div>
          </div>

          <ul className="rsv-rv mt-[clamp(30px,3.6vw,50px)] list-none border-t-2 border-resolve-ink p-0">
            <li className="border-b border-resolve-line">
              <a
                href="/how-it-works"
                className="block py-[clamp(15px,1.8vw,21px)] font-heading text-[clamp(1.1rem,2vw,1.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-resolve-ink no-underline"
              >
                See the full test and methodology
                <span style={{ color: 'var(--resolve-accent-dark)' }}> →</span>
              </a>
            </li>
            {/*
              SESSION 33 — PHASE I. Second link to the same non-existent
              `/research/ai-visibility-baseline` route, removed for the same
              reason. The list keeps the entry that does resolve.
            */}
          </ul>
        </div>

        {/* ---- fit ---- */}
        <div className="mt-[50px] border-t border-resolve-line pt-[50px]">
          <h2 className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            Who this is built for
          </h2>

          <div className="rsv-rv mt-[clamp(28px,3.6vw,52px)] grid grid-cols-1 gap-[clamp(26px,3.4vw,60px)] min-[900px]:grid-cols-2">
            <div className="border-t-2 border-resolve-ink pt-5">
              <h3 className="flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
                <span aria-hidden="true" className="h-3.5 w-3.5 flex-none" style={{ background: 'var(--resolve-accent-deep)' }} />
                This works best when
              </h3>
              <p className="mt-4 max-w-[44ch] text-[clamp(1.04rem,1.25vw,1.2rem)]">
                Customers take time to make a decision, each qualified enquiry has meaningful
                commercial value, and you are willing to measure the journey properly.
              </p>
            </div>
            <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
              <h3 className="flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 flex-none"
                  style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
                />
                It may not be the right fit when
              </h3>
              <p className="mt-4 max-w-[44ch] text-[clamp(1.04rem,1.25vw,1.2rem)] text-resolve-dim">
                Customers mainly buy on impulse or price, demand must first be created from scratch,
                or you need marketing outcomes to be guaranteed.
              </p>
            </div>
          </div>

          <a
            href="/pricing"
            className="rsv-rv mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
            style={{ color: 'var(--resolve-accent-dark)' }}
          >
            What this costs, and what moves the number
          </a>
        </div>
      </Container>
    </section>
  );
}
