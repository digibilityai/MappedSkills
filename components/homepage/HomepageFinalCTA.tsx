import type { CSSProperties } from 'react';
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
 *
 * SESSION 26 — PHASE D. The marks now ARRIVE: they come from above and land,
 * and the last movement on the page is downward and it ends. Their number,
 * their order and the open/dashed one never change — the gesture adds arrival,
 * not arithmetic. The delays below are order only.
 */
const ARRIVE: { open: boolean; at: number }[] = [
  { open: false, at: 0 },
  { open: false, at: 110 },
  { open: false, at: 220 },
  { open: true, at: 330 },
  { open: false, at: 440 },
];

export function HomepageFinalCTA() {
  return (
    <section
      id="rsv-close"
      className="rsv-close relative overflow-hidden py-[var(--resolve-section-xl)]"
      style={{ background: 'var(--resolve-accent)', color: '#141219' }}
    >
      <Container>
        <div
          aria-hidden="true"
          className="rsv-arrive mb-[clamp(28px,3.4vw,44px)] flex gap-3 max-[761px]:gap-[9px]"
        >
          {ARRIVE.map((mark, i) => (
            <span
              key={i}
              className="rsv-mark h-6 w-6 max-[761px]:h-[17px] max-[761px]:w-[17px]"
              style={
                {
                  background: mark.open ? 'transparent' : '#141219',
                  border: mark.open ? '2px dashed #141219' : undefined,
                  '--rsv-d': `${mark.at}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <h2 className="rsv-rv m-0 max-w-[18ch] font-heading text-[clamp(2rem,5.2vw,4.4rem)] font-extrabold leading-[1] tracking-[-0.035em]">
          Tell us where your enquiry path is breaking.
        </h2>
        <p className="rsv-rv mt-[22px] max-w-[44ch] text-[clamp(1.06rem,1.4vw,1.26rem)] font-medium">
          Not sure whether the problem is visibility, conversion or measurement? Tell us what
          you&rsquo;re seeing. We&rsquo;ll start there.
        </p>
        <div className="rsv-rv mt-[26px] flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
            style={{ background: '#141219', borderColor: '#141219', color: '#ffffff' }}
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
        <p className="rsv-rv mt-[26px] text-[.95rem] font-semibold">
          Prefer writing? Send the problem first. Prefer talking? Book a time.
        </p>
      </Container>
    </section>
  );
}
