import type { ReactNode } from 'react';

/**
 * SESSION 28 — PHASE F.
 *
 * "What the work involves" — hairline rows, never a card grid, never an icon
 * per item, never an equal-weight tile (B14, A13). The lead phrase carries the
 * scope and the sentence after it carries the reason; that is the approved
 * capability treatment, and it is what keeps six capability routes from
 * collapsing into six identical feature grids.
 *
 * `numbered` is order only. It is never a quantity, a rank, a score or a
 * sequence the reader is promised.
 */
export type ScopeItem = { lead: string; body: ReactNode };

export function ScopeList({ items, numbered = false }: { items: ScopeItem[]; numbered?: boolean }) {
  return (
    <ul className="m-0 mt-[clamp(24px,3vw,40px)] list-none border-t-2 border-resolve-ink p-0">
      {items.map((item, i) => (
        <li
          key={item.lead}
          className="grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] gap-y-2 border-b border-resolve-line py-[clamp(16px,2vw,24px)] min-[900px]:grid-cols-[minmax(0,26ch)_1fr]"
        >
          <p className="m-0 flex items-baseline gap-3 text-[clamp(1.02rem,1.5vw,1.24rem)] font-bold leading-[1.25]">
            {numbered && (
              <i className="flex-none text-[.78rem] font-semibold not-italic text-resolve-dim">
                {String(i + 1).padStart(2, '0')}
              </i>
            )}
            {item.lead}
          </p>
          <p className="m-0 max-w-[58ch] text-[1.0rem] leading-relaxed text-resolve-dim">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
