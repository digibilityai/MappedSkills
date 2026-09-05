import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { ActionPair } from '@/components/commercial/primitives';

/**
 * SESSION 28 — PHASE F.
 *
 * The commercial opener: move 1 (confirm the searched capability in the
 * searcher's own word) and move 2 (bridge to the commercial outcome) in the
 * FIRST SCREEN, with one primary action.
 *
 * I2 / B27 — ZERO APPARATUS ON THE FIRST SCREEN. No figure, no evidence
 * module, no proof block, no metric, no badge cluster renders here on any
 * route, at any width. That rule has no width exception and it is why this
 * component accepts no figure slot at all: the constraint is structural rather
 * than a thing each route has to remember.
 *
 * The scale sits one rank below the homepage hero deliberately — the homepage
 * carries the site's only T1 and its only surface inversions.
 */
export function CommercialHero({
  eyebrow,
  title,
  lede,
  action,
  children,
}: {
  /** the searched capability, in the searcher's own word */
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  action: string;
  /** the bridge, where a route needs a second paragraph to complete it */
  children?: ReactNode;
}) {
  return (
    <section className="bg-resolve-ground pb-[clamp(44px,6vw,96px)] pt-[clamp(32px,4.4vw,72px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <p className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          {eyebrow}
        </p>
        <h1 className="m-0 mt-[clamp(14px,1.8vw,22px)] max-w-[19ch] font-heading text-[clamp(2rem,4.6vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.038em]">
          {title}
        </h1>
        <div className="mt-[clamp(20px,2.4vw,30px)] max-w-[58ch] text-[clamp(1.04rem,1.25vw,1.2rem)] leading-relaxed text-resolve-dim [&>p+p]:mt-4">
          <p className="m-0">{lede}</p>
          {children}
        </div>
        <ActionPair primaryLabel={action} />
      </Container>
    </section>
  );
}
