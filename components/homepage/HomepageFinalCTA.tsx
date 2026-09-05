import Link from 'next/link';
import { Container } from '@/components/layout/Container';

/**
 * ACTION — the full-bleed tangerine final chapter, the second and last
 * surface inversion. Ink on tangerine (never white on tangerine, which fails
 * contrast). Primary destination /contact; booking secondary. Finishes
 * decisively — no further explanation after this.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter "the
 * close".
 *
 * SESSION 25B: two approved elements were restored. The ARRIVAL MARKS — four
 * solid and one open/dashed — are the page's one-population journey landing
 * for the last time, including the one that has no trail, because that one
 * still counts; Phase C had omitted them from the DOM entirely rather than
 * merely leaving them un-animated. And the close's own scale is restored to
 * the approved `clamp()` values: "Two ways to start." rendered at 60px against
 * an approved 92.8px at 1425, which cost the close its decisiveness.
 */
const ARRIVE = [false, false, false, true, false];

export function HomepageFinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-[clamp(70px,10vw,168px)]"
      style={{ background: 'var(--resolve-accent)', color: '#141219' }}
    >
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div
          aria-hidden="true"
          className="mb-[clamp(28px,3.4vw,44px)] flex gap-3 max-[761px]:gap-[9px]"
        >
          {ARRIVE.map((open, i) => (
            <span
              key={i}
              className="h-6 w-6 max-[761px]:h-[17px] max-[761px]:w-[17px]"
              style={open ? { background: 'transparent', border: '2px dashed #141219' } : { background: '#141219' }}
            />
          ))}
        </div>

        <h2 className="m-0 max-w-[11ch] font-heading text-[clamp(2.4rem,6.6vw,5.8rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          Two ways to start.
        </h2>
        <p className="mt-[22px] max-w-[44ch] text-[clamp(1.06rem,1.4vw,1.26rem)] font-medium">
          Write to us, or book a time to talk. Both reach the same place, and neither is a form for a
          salesperson to chase.
        </p>
        <div className="mt-[26px] flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
            style={{ background: '#141219', borderColor: '#141219', color: 'var(--resolve-accent)' }}
          >
            Tell us what you&rsquo;re trying to fix
          </Link>
          <Link
            href="/schedule-call"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
            style={{ borderColor: '#141219', color: '#141219' }}
          >
            Book a call
          </Link>
        </div>
        <p className="mt-[26px] max-w-[46ch] text-[.95rem] font-semibold">The page states what happens next, not when.</p>
      </Container>
    </section>
  );
}
