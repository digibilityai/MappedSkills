import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { ActionPair, ChapterLabel } from '@/components/commercial/primitives';

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
 */
export function CommercialClose({
  label,
  heading,
  body,
  action,
}: {
  label: string;
  heading: ReactNode;
  body: ReactNode;
  action: string;
}) {
  return (
    <section className="border-t-2 border-resolve-ink bg-resolve-ground py-[clamp(48px,6.4vw,110px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <ChapterLabel>{label}</ChapterLabel>
        <p className="m-0 mt-[18px] max-w-[20ch] font-heading text-[clamp(1.8rem,3.8vw,3rem)] font-extrabold leading-[0.99] tracking-[-0.038em]">
          {heading}
        </p>
        <p className="mt-[20px] max-w-[52ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim">
          {body}
        </p>
        <ActionPair primaryLabel={action} />
      </Container>
    </section>
  );
}
