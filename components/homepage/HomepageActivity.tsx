import { Container } from '@/components/layout/Container';

/**
 * ACTIVITY — the departure. A single calm beat between the hero and the
 * friction chapter, on the dark inverted surface: activity/traffic itself is
 * not the commercial outcome, and the same population is what carries
 * forward. No added metric and no second population.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter 2 ("the
 * departure").
 *
 * SESSION 25B: padding, carrier size and the statement's type scale are the
 * prototype's own `clamp()` values.
 *
 * SESSION 26 — PHASE D. The approved T3 that joins two chapters: the surviving
 * mark — the atom of every chapter that follows — arrives, and the statement
 * follows it. It is a TRANSITION, not a resolve: nothing here is a figure,
 * nothing is counted, and the band itself never moves. The tangerine wipe that
 * once crossed this band was cut in Session 18A as decorative and is NOT
 * reintroduced. Composed and complete with no JavaScript and under reduced
 * motion.
 */
export function HomepageActivity() {
  return (
    <section
      id="rsv-dep"
      className="rsv-dep bg-resolve-ink py-[clamp(48px,7vw,104px)] text-resolve-ground"
    >
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className="flex items-center gap-6">
          <span
            aria-hidden="true"
            className="rsv-carrier h-[clamp(20px,2.4vw,30px)] w-[clamp(20px,2.4vw,30px)] flex-none"
            style={{ background: 'var(--resolve-accent)' }}
          />
          <p className="rsv-dep-t m-0 max-w-[22ch] font-heading text-[clamp(1.5rem,3.6vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
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
