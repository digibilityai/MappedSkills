import type { ReactNode } from 'react';

/**
 * SESSION 29 — PHASE G — F8, "what moves the number". `/pricing` §4.
 *
 * `19_FIGURE_PRIORITISATION.md` F8: "Factor matrix with the direction each
 * factor pushes. NOT A CALCULATOR; PRODUCES NO QUOTE." The approved copy adds:
 * "No calculator producing an implied return. No payback period. No 'clients
 * typically see'."
 *
 * This component therefore cannot produce a number. It has no inputs, no
 * controls, no state and no arithmetic — it is a static table of directions in
 * words. There is nothing to disable, so there is nothing to re-enable by
 * accident later.
 *
 * WHY A REAL TABLE. A matrix whose whole job is "for each factor, which way
 * does it push" is tabular data, and a well-set table is the correct answer
 * (the same finding `19` records for F12 on `/ai-seo`). Real `<table>` markup
 * with a caption and `scope` attributes lets a screen-reader user navigate it
 * by row and column; a grid of divs does not.
 *
 * The direction words are relative and carry no magnitude: "lower" and "higher"
 * against each other, never a figure, never a multiplier, never a percentage,
 * never a band. Every price on this page is owner-blocked, so a matrix that
 * implied a magnitude would be inventing the blocked fact sideways.
 */

export type Factor = { factor: string; lower: ReactNode; higher: ReactNode };

export function FactorMatrix({ factors }: { factors: Factor[] }) {
  return (
    <figure className="m-0 mt-[clamp(26px,3.2vw,44px)]">
      {/* The region scrolls, not the page. `48` §M7: a wide table may scroll
          inside its own overflow region, and the document must not scroll
          horizontally at any width. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <caption className="mb-4 max-w-[64ch] text-left text-[.9rem] leading-[1.55] text-resolve-dim">
            Which way each factor pushes the number. This is a direction, not a calculation: no figure,
            multiplier, percentage or band appears in it, and reading it produces no quote.
          </caption>
          <thead>
            <tr className="border-b-2 border-resolve-ink">
              <th
                scope="col"
                className="py-3 pr-6 align-bottom text-[.8rem] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-resolve-dim"
              >
                Factor
              </th>
              <th
                scope="col"
                className="py-3 pr-6 align-bottom text-[.8rem] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-resolve-dim"
              >
                Pushes it lower
              </th>
              <th
                scope="col"
                className="py-3 align-bottom text-[.8rem] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-resolve-dim"
              >
                Pushes it higher
              </th>
            </tr>
          </thead>
          <tbody>
            {factors.map((row) => (
              <tr key={row.factor} className="border-b border-resolve-line align-top">
                <th
                  scope="row"
                  className="py-[clamp(14px,1.8vw,20px)] pr-6 text-[1.02rem] font-bold leading-[1.3] text-resolve-ink"
                >
                  {row.factor}
                </th>
                <td className="py-[clamp(14px,1.8vw,20px)] pr-6 text-[.98rem] leading-relaxed text-resolve-dim">
                  {row.lower}
                </td>
                <td className="py-[clamp(14px,1.8vw,20px)] text-[.98rem] leading-relaxed text-resolve-dim">
                  {row.higher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
