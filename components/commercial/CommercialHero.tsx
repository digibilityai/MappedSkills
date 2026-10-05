import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { ActionPair, type OpenerMode } from '@/components/commercial/primitives';
import { hasContent } from '@/lib/has-content';
import { cn } from '@/lib/utils';

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
 *
 * PHASE J — STAGE 3 — `mode`. A composition only: it moves the eyebrow, the H1,
 * the lede and the action pair relative to one another at WIDE and changes
 * nothing below 1081px. **It does NOT add a figure slot** — see the I2/B27 note
 * on `OPENER_GRID` in `primitives.tsx`. `editorial` is the default and renders
 * exactly what this component rendered before Stage 3.
 */
export function CommercialHero({
  eyebrow,
  title,
  lede,
  action,
  mode = 'editorial',
  children,
}: {
  /** the searched capability, in the searcher's own word */
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  action: string;
  /** composition only — never a figure slot (I2/B27) */
  mode?: OpenerMode;
  /** the bridge, where a route needs a second paragraph to complete it */
  children?: ReactNode;
}) {
  return (
    <section className="bg-resolve-ground pb-[65px] pt-[70px] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        {/* One left column at ~60% of the viewport. `mode` stays on the API so
            existing routes do not change props; it no longer centres or splits
            the opener. */}
        <div className={cn('max-w-full text-left min-[1081px]:max-w-[60vw]', mode === 'editorial' && 'text-left')}>
          <p className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            {eyebrow}
          </p>
          {hasContent(title) && (
            <h1 className="m-0 mt-[clamp(14px,1.8vw,22px)] font-heading text-[clamp(2rem,4.6vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.038em]">
              {title}
            </h1>
          )}
          <div className="mt-[clamp(20px,2.4vw,30px)] leading-relaxed text-resolve-dim [&>p+p]:mt-4">
            {hasContent(lede) && <p className="m-0">{lede}</p>}
            {children}
          </div>
          <ActionPair primaryLabel={action} />
        </div>
      </Container>
    </section>
  );
}
