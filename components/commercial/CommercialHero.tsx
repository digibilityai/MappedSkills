import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import {
  ActionPair,
  OPENER_GRID,
  OPENER_MAIN,
  OPENER_RAIL,
  type OpenerMode,
} from '@/components/commercial/primitives';
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
    <section className="bg-resolve-ground pb-[clamp(44px,6vw,96px)] pt-[clamp(32px,4.4vw,72px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className={OPENER_GRID[mode]}>
          {/* THE RAIL. `split` carries the eyebrow and the H1 — the move-1
              "confirm the searched capability" half. `offset` carries the
              eyebrow alone and the H1 joins the reading column. Both always
              have content, so neither can render an empty column. */}
          <div className={OPENER_RAIL[mode]}>
            <p className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
              {eyebrow}
            </p>
            {mode === 'split' && (
              <h1 className="m-0 mt-[clamp(14px,1.8vw,22px)] max-w-[19ch] font-heading text-[clamp(2rem,3.4vw,3.1rem)] font-extrabold leading-[1.0] tracking-[-0.038em]">
                {title}
              </h1>
            )}
          </div>

          <div className={cn(OPENER_MAIN[mode], mode === 'offset' && 'max-[1080px]:mt-0')}>
            {mode !== 'split' && (
              <h1
                className={cn(
                  'm-0 mt-[clamp(14px,1.8vw,22px)] font-heading text-[clamp(2rem,4.6vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.038em]',
                  mode === 'centred' ? 'max-w-[19ch] min-[1081px]:mx-auto' : 'max-w-[19ch]',
                  /* At WIDE the rail already supplies the gap under the eyebrow,
                     so the H1 must not add a second one on top of it. */
                  mode === 'offset' && 'min-[1081px]:mt-0'
                )}
              >
                {title}
              </h1>
            )}
            <div
              className={cn(
                'mt-[clamp(20px,2.4vw,30px)] max-w-[58ch] text-[clamp(1.04rem,1.25vw,1.2rem)] leading-relaxed text-resolve-dim [&>p+p]:mt-4',
                mode === 'centred' && 'min-[1081px]:mx-auto',
                /* In `split` the reading column starts level with the rail. */
                mode === 'split' && 'min-[1081px]:mt-0'
              )}
            >
              <p className="m-0">{lede}</p>
              {children}
            </div>
            <div className={cn(mode === 'centred' && 'min-[1081px]:[&>div]:justify-center')}>
              <ActionPair primaryLabel={action} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
