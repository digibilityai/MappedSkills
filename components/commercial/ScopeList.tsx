import type { ReactNode } from 'react';
import { ScopeDisclosure } from '@/components/commercial/ScopeDisclosure';

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
 *
 * ---------------------------------------------------------------------------
 * PHASE J — STAGE 2 — J8 PROGRESSIVE DISCLOSURE + J4 SYSTEM ANATOMY.
 *
 * THE MEASURED PROBLEM. This one component renders the same shape on SIX
 * routes: /seo, /ai-seo, /google-ads, /lead-generation, /conversion-optimization
 * and /services. On /seo it produced a 1 025 px section at WIDE and a 2 773 px
 * section at 390 px — every lead and every body open at once, with no way for a
 * reader to take one at a time.
 *
 * THE ANATOMY IS THE COLLAPSED SET, NOT A NEW DRAWING. Collapsed, the component
 * shows every member of the set at once, in order, at equal weight, with one
 * expanded — which is exactly J4's informational job: see the whole system,
 * examine one part. NO CHAIN IS DRAWN HERE. Five of the six routes this renders
 * on are F1 class D — NONE or already carry their own figure, and adding a
 * second path-shaped drawing would be precisely the "figure becomes a
 * signature" failure docs/16-ux/22_F1_USAGE_TAXONOMY.md §1 exists to prevent.
 *
 * SEMANTIC EQUALITY (Phase J grammar J-9). Every row is the same weight, the
 * same size and the same colour. No row is larger, heavier, earlier-coloured or
 * marked as more important, because the approved copy establishes no such
 * hierarchy. The only ordering signal is `numbered`, which was already order-
 * only before this change and still is.
 *
 * THE THRESHOLD IS A RULE, NOT A PER-PAGE SETTING. Disclosure engages at FOUR
 * OR MORE items. A set of three has no reading-burden problem to solve, and
 * collapsing it would hide two thirds of a short list for nothing. This is why
 * /services — whose three parts ARE the page's central proposition — renders
 * exactly what it rendered before, with no `<details>`, no client leaf and no
 * change of any kind.
 *
 * NO COPY CHANGED. Every `lead` and every `body` is the approved string, passed
 * through untouched. This component adds no locator, no caption and no label.
 */
export type ScopeItem = { lead: string; body: ReactNode };

/** Below this, a set is short enough to read whole and is left alone. */
const DISCLOSURE_MIN_ITEMS = 4;

const ROW = 'border-b border-resolve-line';
const LEAD =
  'm-0 flex items-baseline gap-3 text-[clamp(1.02rem,1.5vw,1.24rem)] font-bold leading-[1.25]';
const ORDINAL = 'flex-none text-[.78rem] font-semibold not-italic text-resolve-dim';
const BODY = 'm-0 max-w-none text-[1.0rem] leading-relaxed text-resolve-dim';

export function ScopeList({ items, numbered = false }: { items: ScopeItem[]; numbered?: boolean }) {
  const list = 'm-0 mt-[clamp(24px,3vw,40px)] list-none border-t-2 border-resolve-ink p-0';

  /* ---- Short set: the Phase F treatment, byte-for-byte unchanged ---------- */
  if (items.length < DISCLOSURE_MIN_ITEMS) {
    return (
      <ul className={list}>
        {items.map((item, i) => (
          <li
            key={item.lead}
            className={`grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] gap-y-2 ${ROW} py-[clamp(16px,2vw,24px)] min-[900px]:grid-cols-[minmax(0,26ch)_1fr]`}
          >
            <p className={LEAD}>
              {numbered && <i className={ORDINAL}>{String(i + 1).padStart(2, '0')}</i>}
              {item.lead}
            </p>
            <p className={BODY}>{item.body}</p>
          </li>
        ))}
      </ul>
    );
  }

  /* ---- Four or more: disclose --------------------------------------------
     EVERY `<details>` IS RENDERED `open`. That is deliberate and it is the
     whole no-JS and SEO contract: the server sends the complete set, expanded,
     in document order, so a reader without JavaScript, a failed hydration and a
     crawler that does not execute script all receive exactly the content Phase F
     shipped. `ScopeDisclosure` collapses to one member only once it is running,
     and it does so by setting `open` — it never touches the content itself. */
  return (
    <ScopeDisclosure>
      <ul className={list}>
        {items.map((item, i) => (
          <li key={item.lead} className={ROW}>
            <details open data-scope-item className="group">
              {/* `list-none` plus the WebKit pseudo-element removes the native
                  triangle; the sign on the right replaces it. The row is a
                  40px-minimum control at every width, and it is the whole row
                  rather than a small glyph, so the tap target is generous on
                  touch without a second overlapping hit area. */}
              <summary
                className={`${LEAD} flex cursor-pointer list-none items-baseline justify-between gap-4 py-[clamp(16px,2vw,24px)] [&::-webkit-details-marker]:hidden`}
              >
                <span className="flex items-baseline gap-3">
                  {numbered && <i className={ORDINAL}>{String(i + 1).padStart(2, '0')}</i>}
                  <span>{item.lead}</span>
                </span>
                {/* The affordance is drawn, not iconographic: two hairlines that
                    make a plus, and lose the vertical one when the row is open.
                    aria-hidden because `<summary>` already exposes its own
                    expanded/collapsed state to assistive technology — a second,
                    hand-rolled announcement would be the ARIA-papering-over-
                    structure that the Phase J rules prohibit. */}
                <span
                  aria-hidden="true"
                  className="relative mt-[.35em] block h-[2px] w-[14px] flex-none bg-resolve-dim
                             before:absolute before:left-[6px] before:top-[-6px] before:block before:h-[14px]
                             before:w-[2px] before:bg-resolve-dim before:transition-transform
                             before:duration-[180ms] before:ease-[cubic-bezier(0.65,0,0.35,1)]
                             before:content-[''] group-open:before:scale-y-0"
                />
              </summary>
              <div className="pb-[clamp(16px,2vw,24px)]">
                <p className={BODY}>{item.body}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </ScopeDisclosure>
  );
}
