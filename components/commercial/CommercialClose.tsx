import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import {
  ActionPair,
  ChapterLabel,
  OPENER_GRID,
  OPENER_MAIN,
  OPENER_RAIL,
  type OpenerMode,
} from '@/components/commercial/primitives';
import { cn } from '@/lib/utils';

/**
 * SESSION 28 — PHASE F — move 9, convert.
 *
 * DELIBERATELY QUIETER THAN THE HOMEPAGE CLOSE, for two reasons that are worth
 * stating so a later pass does not "fix" it:
 *
 * 1. The full-bleed tangerine inversion is the homepage's second and LAST
 *    surface inversion. Repeating it on seven routes would turn a counted,
 *    meaningful event into a page-template device — the exact failure mode the
 *    figure taxonomy exists to prevent, applied to a surface instead of a
 *    figure. It would also put the site's loudest orange on every commercial
 *    page.
 *
 * 2. F10 — the homepage's final CTA is immediately followed by the footer's own
 *    commercial CTA strip. On these routes the same adjacency exists, so the
 *    route close is composed as the QUIET half of that pair: a hairline rule, a
 *    heading, one sentence and the action pair, against the ground. The footer's
 *    dark strip then reads as the second, louder close rather than as a
 *    duplicate of an identical one. This is a composition response inside Phase
 *    F's own files; the shared Footer is NOT modified here — see
 *    docs/27-production-translation/16_PHASE_F_COMMERCIAL_ROUTES.md §F10.
 *
 * I8 / B30 — the CTA region carries NO apparatus: no figure, no evidence
 * module, no proof link, no metric.
 *
 * PHASE J — STAGE 3 — `mode`. Eleven routes render this component, and before
 * Stage 3 all eleven opened at the same left edge, which made the close one of
 * the two largest remaining contributors to the site's single-left-edge
 * signature (docs/28-phase-j-visual-interaction/08 §7).
 *
 * The modes are COMPOSITION ONLY. The CTA architecture is untouched: /contact
 * stays the primary action and /schedule-call the secondary, through the same
 * `ActionPair`. No sticky bar, no urgency device, no scarcity device, no third
 * button, and no apparatus is added — I8/B30 still holds. `editorial` is the
 * default and renders exactly what this component rendered before Stage 3.
 */
export function CommercialClose({
  label,
  heading,
  body,
  action,
  mode = 'editorial',
}: {
  label: string;
  heading: ReactNode;
  body: ReactNode;
  action: string;
  /** composition only — never a figure slot (I8/B30) */
  mode?: OpenerMode;
}) {
  return (
    <section className="border-t-2 border-resolve-ink bg-resolve-ground py-[clamp(48px,6.4vw,110px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className={OPENER_GRID[mode]}>
          {/* The rail: the chapter label, and in `split` the closing heading
              with it. Both halves always carry content — every close has a
              label, a heading, a body and an action — so no mode of this
              component can render an empty column. */}
          <div className={OPENER_RAIL[mode]}>
            <ChapterLabel>{label}</ChapterLabel>
            {mode === 'split' && (
              <p className="m-0 mt-[18px] max-w-[20ch] font-heading text-[clamp(1.8rem,2.9vw,2.5rem)] font-extrabold leading-[1.0] tracking-[-0.038em]">
                {heading}
              </p>
            )}
          </div>

          <div className={OPENER_MAIN[mode]}>
            {mode !== 'split' && (
              <p
                className={cn(
                  'm-0 mt-[18px] max-w-[20ch] font-heading text-[clamp(1.8rem,3.8vw,3rem)] font-extrabold leading-[0.99] tracking-[-0.038em]',
                  mode === 'centred' && 'min-[1081px]:mx-auto',
                  mode === 'offset' && 'min-[1081px]:mt-0'
                )}
              >
                {heading}
              </p>
            )}
            <p
              className={cn(
                'mt-[20px] max-w-[52ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim',
                mode === 'centred' && 'min-[1081px]:mx-auto',
                mode === 'split' && 'min-[1081px]:mt-0'
              )}
            >
              {body}
            </p>
            <div className={cn(mode === 'centred' && 'min-[1081px]:[&>div]:justify-center')}>
              <ActionPair primaryLabel={action} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
