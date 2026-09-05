import Link from 'next/link';
import { Container } from '@/components/layout/Container';

/**
 * FRICTION — why buyer activity can fail to become an enquiry. Three routes
 * fail for three different reasons and produce one identical outcome from
 * the outside. Rendered in its COMPOSED (aligned) state directly — the
 * prototype's own no-JS/no-motion default — rather than the staggered
 * realignment interaction, which is Phase D motion.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter 3
 * ("recognition"). Not an analytics dashboard, not a conversion funnel, no
 * invented benchmark or score.
 *
 * SESSION 25B: three approved elements were restored — the tangerine failure
 * clause on each route (`.fail__t em`), the "from the outside, all three look
 * identical" label at EVERY width (Phase C had hidden it above 640px, so the
 * sentence that names the figure's argument was absent at MEDIUM and WIDE),
 * and the prototype's own 900px recomposition boundary. Type and spacing use
 * the approved `clamp()` values.
 *
 * QUANTITY SAFETY: each route's marks are a run that stops. The stop mark is
 * pushed to the shared alignment column (`ml-auto`) exactly as the approved
 * figure's settled state does — the routes are not comparable lengths, and the
 * rule is what makes the three outcomes identical.
 */
const ROUTES = [
  { lead: 'They are searching, and', clause: 'finding somebody else.', marks: 4 },
  { lead: 'The visits arrive and', clause: 'the enquiries do not.', marks: 7 },
  { lead: 'Enquiries arrive, and', clause: 'nobody can say which came from where.', marks: 10 },
];

export function HomepageFriction() {
  return (
    <section className="border-t border-resolve-line bg-resolve-ground py-[clamp(66px,9vw,152px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <h2 className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          What this usually looks like from the inside
        </h2>
        <p className="mt-[18px] max-w-[16ch] font-heading text-[clamp(2rem,5vw,4.3rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          That reads like three problems.{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>It behaves like one.</span>
        </p>

        <div className="relative mt-[clamp(26px,3.4vw,44px)] border-t border-resolve-line">
          {ROUTES.map((route) => (
            <div
              key={route.clause}
              className="grid grid-cols-1 items-center gap-x-5 gap-y-3.5 border-b border-resolve-line py-[clamp(14px,1.8vw,22px)] min-[900px]:grid-cols-[minmax(0,26ch)_1fr]"
            >
              <p className="m-0 max-w-[34ch] text-[clamp(1rem,1.7vw,1.32rem)] font-semibold leading-[1.3]">
                {route.lead}{' '}
                <em className="font-bold not-italic" style={{ color: 'var(--resolve-accent-dark)' }}>
                  {route.clause}
                </em>
              </p>
              <div className="relative flex min-h-[22px] items-center gap-[7px] pr-0.5">
                {Array.from({ length: route.marks - 1 }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="h-[13px] w-[13px] flex-none"
                    style={{ background: 'var(--resolve-dim)', opacity: 0.42 }}
                  />
                ))}
                <span
                  aria-hidden="true"
                  className="ml-auto h-[15px] w-[15px] flex-none"
                  style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
                />
                {/* NARROW/MEDIUM: the rule becomes a tick at the right of each run —
                    stacked, the three read as one broken vertical. */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 -right-0.5 -top-1.5 w-0.5 min-[900px]:hidden"
                  style={{ background: 'var(--resolve-ink)' }}
                />
              </div>
            </div>
          ))}
          {/* WIDE: one tall rule crosses all three runs. */}
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 right-0 top-1.5 hidden w-0.5 min-[900px]:block"
            style={{ background: 'var(--resolve-ink)' }}
          />
          <span className="mt-3.5 block max-w-none text-right text-[.78rem] font-bold uppercase leading-[1.3] tracking-[0.1em] min-[900px]:absolute min-[900px]:-top-[30px] min-[900px]:right-0 min-[900px]:mt-0 min-[900px]:max-w-[20ch]">
            from the outside, all three look identical
          </span>
        </div>

        <p className="mt-5 max-w-[52ch] text-[clamp(1.02rem,1.2vw,1.16rem)] text-resolve-dim">
          With no measurement in place,{' '}
          <b className="font-bold text-resolve-ink">all three failures look identical from the outside.</b>
        </p>
        <Link
          href="/problems/traffic-but-no-enquiries"
          className="mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
          style={{ color: 'var(--resolve-accent-dark)' }}
        >
          If that is the shape of it, this page is about exactly that
        </Link>
      </Container>
    </section>
  );
}
