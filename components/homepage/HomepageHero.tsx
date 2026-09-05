import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { PopulationToggle } from '@/components/homepage/PopulationToggle';

/**
 * FAR — the hero. The approved H1 is preserved exactly. Primary CTA routes to
 * /contact; booking is secondary. The population figure (traffic vs.
 * enquiries) is rendered by PopulationToggle, the session's one bounded
 * client leaf — everything else here is a Server Component.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, hero + population
 * chapter. No dashboard, no fake metric, no decorative chart.
 *
 * SESSION 25B: type scale, hero padding, the two-column breakpoint (1060px)
 * and the narrow full-width CTA rule are taken from the approved prototype's
 * own `clamp()` values rather than fixed Tailwind steps, which had rendered
 * the composition materially smaller at MEDIUM/WIDE. The primary CTA is the
 * approved tangerine `--resolve-accent` with ink text (5.97:1), not the
 * deep-orange/white pairing Phase C first shipped.
 */
export function HomepageHero() {
  // `py-0` neutralises the global `section { @apply py-16 }` base rule in
  // app/globals.css so the hero owns its own approved padding.
  return (
    <section className="bg-resolve-ground py-0 text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className="pb-[clamp(34px,5vw,78px)] pt-[clamp(30px,4.6vw,66px)]">
          <h1 className="max-w-[15ch] text-[clamp(2.55rem,7vw,6.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-balance">
            Judge us on the{' '}
            <span className="whitespace-nowrap" style={{ color: 'var(--resolve-accent-deep)' }}>
              enquiries,
            </span>{' '}
            not the <span className="whitespace-nowrap text-resolve-dim">traffic.</span>
          </h1>

          <div className="mt-[clamp(24px,2.8vw,44px)] grid grid-cols-1 items-start gap-[clamp(26px,3.2vw,60px)] max-[761px]:gap-[clamp(84px,26vw,112px)] min-[1060px]:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="max-w-[46ch] text-[clamp(1.06rem,1.35vw,1.28rem)] text-resolve-dim">
                <b className="font-bold text-resolve-ink">
                  There is buyer demand for what you sell, and some of it never reaches you.
                </b>{' '}
                We work on the whole route to an enquiry.
              </p>

              <div className="mt-[26px] flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
                  style={{
                    background: 'var(--resolve-accent)',
                    borderColor: 'var(--resolve-accent)',
                    color: '#141219',
                  }}
                >
                  Tell us what you&rsquo;re trying to fix
                </Link>
                <Link
                  href="/schedule-call"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-resolve-ink px-[26px] text-base font-bold text-resolve-ink no-underline max-[761px]:basis-full"
                >
                  Book a call
                </Link>
              </div>

              <Link
                href="/how-it-works"
                className="mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold text-resolve-dim no-underline hover:text-resolve-ink"
              >
                See the method, including what we can&rsquo;t attribute
              </Link>
            </div>

            <div>
              <PopulationToggle />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
