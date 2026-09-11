import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * THE CANONICAL OUTER CONTAINER. Every public page section, the header and the
 * footer pass through this one component, so the site has exactly ONE outer
 * edge and ONE gutter at every width.
 *
 * WHY THE MAX-WIDTH IS A calc() AND NOT A FLAT 1400px.
 * `--resolve-wrap` is the usable CONTENT width, measured inside the gutters.
 * Capping the border box at 1400px instead would spend the gutter out of the
 * content, leaving 1302px of usable width at 1440 and 1288px on a large
 * display, i.e. below the 1320px floor the layout system is specified to hold.
 * Adding the two gutters back keeps the content region at 1320-1400px while
 * the gutter stays a real gutter.
 *
 * WHY THERE IS NO `sm:` / `lg:` PADDING LADDER.
 * There used to be one (`px-4 sm:px-6 lg:px-8`), and it was the single largest
 * source of horizontal drift on the site. Fifteen call sites overrode it with
 * `px-[var(--resolve-pad)]`, but tailwind-merge only cancels the utility that
 * shares a variant: the unprefixed `px-4` was dropped and `sm:px-6 lg:px-8`
 * survived, then won inside their media queries. Every "Resolve" container on
 * the site was therefore rendering a 32px gutter rather than the 49-56px its
 * token asked for. One unprefixed, token-driven padding cannot be defeated
 * that way, and a caller passing `px-*` now genuinely overrides it.
 */
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[calc(var(--resolve-wrap)+2*var(--resolve-pad))] px-[var(--resolve-pad)]',
        className
      )}
    >
      {children}
    </div>
  );
}
