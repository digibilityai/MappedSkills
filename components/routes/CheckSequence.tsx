import type { ReactNode } from 'react';

/**
 * SESSION 29 — PHASE G — F6, the five checks, as an operable instrument.
 *
 * `/problems/traffic-but-no-enquiries` Move 5.
 *
 * WHY THIS IS HTML AND NOT A DRAWING. F6 is not a diagram the reader looks at;
 * it is an instrument they operate, in a different tab from their analytics,
 * frequently on a phone. `06_PROBLEM_PAGE_UX.md` §4.2 (H5) makes printability
 * an explicit requirement: "the checks, their outcomes and all six findings
 * must print cleanly, in order, with every disclosure open, and the reader must
 * be able to save the page by ordinary browser behaviour with nothing lost."
 * Real text in real list semantics does that; text inside an SVG does not
 * reflow, does not resize with the reader's text settings and does not select
 * cleanly.
 *
 * WHAT H5 RULED OUT FOR LAUNCH, and is therefore absent from this component
 * entirely rather than disabled by a flag:
 *   local saved state · checklist persistence · scoring · completion tracking ·
 *   browser-storage state · a diagnostic account · email capture · a gated
 *   result · any percentage, grade, health rating or "you scored X".
 * There is no client component here, no state, no storage and no control: the
 * instrument is a static, complete, ungated document, and the page "loses
 * nothing" by it, as `06` §4.2 records.
 *
 * NOT AN ACCORDION. `06` §7: the checks are sequential content, not a menu of
 * choices, and each observable outcome is ADJACENT-SECONDARY and expanded. A
 * check a reader has to open is a check they will not run.
 *
 * NO CTA INSIDE THIS SECTION (`06` §6): "the reader is working. Interrupting an
 * instrument is the fastest way to make it look like a sales device." The
 * component accepts no action slot, so that rule is structural.
 */

export type Check = {
  /** the check, in the reader's own terms */
  title: string;
  /** what to actually do — completable in minutes, with tools they already have */
  body: ReactNode;
  /** the named thing they can observe afterwards. Never a score, never a grade */
  outcome: ReactNode;
};

export function CheckSequence({ checks }: { checks: Check[] }) {
  return (
    <ol className="m-0 mt-[clamp(26px,3.2vw,44px)] list-none border-t-2 border-resolve-ink p-0">
      {checks.map((check, i) => (
        <li
          key={check.title}
          className="grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] border-b border-resolve-line py-[clamp(20px,2.6vw,32px)] min-[900px]:grid-cols-[minmax(0,7ch)_1fr]"
        >
          {/* Order, not quantity. This is the sequence to work through; it is
              not a rank, a score, a weight or a count of anything. */}
          <p className="m-0 text-[.82rem] font-semibold uppercase leading-[1.6] tracking-[0.14em] text-resolve-dim">
            <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="sr-only">Check {i + 1}</span>
          </p>
          <div className="mt-2 min-[900px]:mt-0">
            <h3 className="m-0 max-w-[44ch] font-heading text-[clamp(1.14rem,2vw,1.5rem)] font-bold leading-[1.18] tracking-[-0.03em]">
              {check.title}
            </h3>
            <div className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed [&>p+p]:mt-3">{check.body}</div>

            {/* ADJACENT-SECONDARY, and permanently open. The outcome is the
                point of the check: an instruction with no observable end is
                advice, not an instrument. */}
            <div
              className="mt-4 max-w-[58ch] border-l-4 pl-[clamp(14px,1.6vw,20px)]"
              style={{ borderColor: 'var(--resolve-accent-deep)' }}
            >
              <span className="block text-[.8rem] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-resolve-dim">
                what you will be able to see
              </span>
              <p className="m-0 mt-2 text-[1.0rem] leading-relaxed">{check.outcome}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
