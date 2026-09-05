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
const NOT_PROMISED = ['rankings', 'a position in AI answers', 'a number of enquiries', 'revenue', 'a return on spend'];

export function HomepageAccountability() {
  return (
    <section className="border-t border-resolve-line bg-resolve-ground pb-[clamp(66px,9vw,152px)] pt-[clamp(40px,5vw,72px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        {/* ---- the boundary ---- */}
        <h2 className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          What we are accountable for, and where that stops
        </h2>

        <div className="rsv-rv mt-[clamp(28px,3.6vw,52px)] grid grid-cols-1 items-start gap-[clamp(28px,4vw,68px)] min-[1000px]:grid-cols-2">
          <div>
            <span className="mb-3.5 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
              we do not promise
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
            <p className="mt-4 max-w-[40ch] text-[.82rem] font-medium leading-[1.5] text-resolve-dim">
              None of that is ours to control.
            </p>
          </div>

          <div className="border-l-4 pl-[clamp(20px,2.4vw,30px)]" style={{ borderColor: 'var(--resolve-accent-deep)' }}>
            <h3 className="m-0 mb-4 max-w-[16ch] font-heading text-[clamp(1.5rem,3.2vw,2.7rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              <span
                aria-hidden="true"
                className="mr-3.5 inline-block h-4 w-4 translate-y-px"
                style={{ background: 'var(--resolve-accent-deep)' }}
              />
              We are accountable for{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                the qualified enquiry.
              </em>
            </h3>
            <p className="max-w-[46ch] text-resolve-dim">
              Real, reachable, from a business context, with a stated need. What counts as one is
              published, and it is measured against a starting point we capture first.
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
        <div className="mt-[clamp(66px,9vw,152px)] border-t border-resolve-line pt-[clamp(66px,9vw,152px)]">
          <h2 className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            What you can check before you commit
          </h2>

          <p className="rsv-rv mt-[clamp(24px,3vw,44px)] max-w-[14ch] font-heading text-[clamp(2.5rem,6.4vw,5.4rem)] font-extrabold leading-[0.96] tracking-[-0.04em] max-[761px]:text-[clamp(2.7rem,9vw,5.4rem)]">
            We have no case studies to show you.
          </p>
          <p className="rsv-rv mt-[clamp(26px,3vw,44px)] max-w-[46ch] text-[clamp(1.06rem,1.3vw,1.26rem)] text-resolve-dim">
            Writing around that would be the first thing you should not trust us on. What we do have
            is published, dated and checkable.
          </p>

          <div className="rsv-rv rsv-ink-card mt-[clamp(32px,4vw,56px)] overflow-hidden rounded-[20px] bg-resolve-ink text-resolve-ground">
            <div className="p-[clamp(26px,4vw,58px)]">
              <p className="m-0 mb-4 max-w-[18ch] font-heading text-[clamp(1.55rem,4vw,3.2rem)] font-extrabold leading-[1.03] tracking-[-0.035em]">
                We ran the test on ourselves, and{' '}
                <em className="not-italic" style={{ color: 'var(--resolve-accent)' }}>
                  we were named in none of them.
                </em>
              </p>
              <p className="m-0 max-w-[54ch]" style={{ color: '#C0B9CA' }}>
                We asked four AI assistants for agencies like us, 28 times, on one day, from Pune, in
                English, signed out.
              </p>
            </div>
            <div
              className="border-t px-[clamp(26px,4vw,58px)] pb-[clamp(26px,3vw,40px)] pt-[clamp(20px,2.6vw,34px)]"
              style={{ borderColor: 'var(--resolve-rule)', background: 'var(--resolve-ink-deep)' }}
            >
              <p className="m-0 mb-[18px] max-w-[56ch] text-[.98rem]" style={{ color: '#C0B9CA' }}>
                28 runs on one day, one location, signed out. Counts, not rates.{' '}
                <b className="font-bold text-resolve-ground">No confidence interval is claimed and none is available.</b>{' '}
                Two systems could not be tested at all — they are named as untested, and not characterised.
              </p>
              <a
                href="/research/ai-visibility-baseline"
                className="inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.96rem] font-bold no-underline"
                style={{ color: 'var(--resolve-accent)' }}
              >
                The prompts, the run counts and the full method →
              </a>
            </div>
          </div>

          <ul className="rsv-rv mt-[clamp(30px,3.6vw,50px)] list-none border-t-2 border-resolve-ink p-0">
            <li className="border-b border-resolve-line">
              <a
                href="/how-it-works"
                className="block py-[clamp(15px,1.8vw,21px)] font-heading text-[clamp(1.1rem,2vw,1.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-resolve-ink no-underline"
              >
                The method, in full — including what cannot be attributed
                <span style={{ color: 'var(--resolve-accent-dark)' }}> →</span>
              </a>
            </li>
            <li className="border-b border-resolve-line">
              <a
                href="/research/ai-visibility-baseline"
                className="block py-[clamp(15px,1.8vw,21px)] font-heading text-[clamp(1.1rem,2vw,1.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-resolve-ink no-underline"
              >
                Our own visibility, measured and published
                <span style={{ color: 'var(--resolve-accent-dark)' }}> →</span>
              </a>
            </li>
          </ul>
        </div>

        {/* ---- fit ---- */}
        <div className="mt-[clamp(66px,9vw,152px)] border-t border-resolve-line pt-[clamp(66px,9vw,152px)]">
          <h2 className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            Who this is built for
          </h2>

          <div className="rsv-rv mt-[clamp(28px,3.6vw,52px)] grid grid-cols-1 gap-[clamp(26px,3.4vw,60px)] min-[900px]:grid-cols-2">
            <div className="border-t-2 border-resolve-ink pt-5">
              <h3 className="flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
                <span aria-hidden="true" className="h-3.5 w-3.5 flex-none" style={{ background: 'var(--resolve-accent-deep)' }} />
                This works where
              </h3>
              <p className="mt-4 max-w-[44ch] text-[clamp(1.04rem,1.25vw,1.2rem)]">
                A customer takes time to decide, one good enquiry is worth real money, and you are
                willing to let us measure the path properly.{' '}
                <b className="font-bold">That last one is not negotiable.</b>
              </p>
            </div>
            <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
              <h3 className="flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 flex-none"
                  style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
                />
                It is a poor fit where
              </h3>
              <p className="mt-4 max-w-[44ch] text-[clamp(1.04rem,1.25vw,1.2rem)] text-resolve-dim">
                Demand has to be created from nothing, what you sell is bought on impulse or price
                alone, or you need the outcome guaranteed.
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
