import { Container } from '@/components/layout/Container';

/**
 * ACTIVITY — the departure. A single calm beat between the hero and the
 * friction chapter, on the dark inverted surface: activity/traffic itself is
 * not the commercial outcome, and the same population is what carries
 * forward. No added metric, no second population, no scroll-linked carrier
 * animation (Phase D).
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter 2 ("the
 * departure").
 *
 * SESSION 25B: padding, carrier size and the statement's type scale are the
 * prototype's own `clamp()` values.
 */
export function HomepageActivity() {
  return (
    <section className="bg-resolve-ink py-[clamp(48px,7vw,104px)] text-resolve-ground">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className="flex items-center gap-6">
          <span
            aria-hidden="true"
            className="h-[clamp(20px,2.4vw,30px)] w-[clamp(20px,2.4vw,30px)] flex-none"
            style={{ background: 'var(--resolve-accent)' }}
          />
          <p className="m-0 max-w-[22ch] font-heading text-[clamp(1.5rem,3.6vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            The same demand, followed all the way down.{' '}
            <em className="not-italic" style={{ color: 'var(--resolve-accent)' }}>
              Here is where it goes.
            </em>
          </p>
        </div>
      </Container>
    </section>
  );
}
