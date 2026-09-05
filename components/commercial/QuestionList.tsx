import type { ReactNode } from 'react';

/**
 * SESSION 28 — PHASE F.
 *
 * Move 8 — the objections this buyer actually has, as hairline rows with the
 * question set in the buyer's own words and the answer given directly beneath
 * it. NOT an accordion: an objection a sceptical reader has to open is an
 * objection the page has decided to hide, and both routes that carry this as a
 * named section (`/ai-seo`, `/seo`) carry it precisely because the answers are
 * the argument.
 *
 * Rendered as a description list so the question/answer relationship survives
 * heading-only and list navigation.
 */
export type QuestionItem = { q: string; a: ReactNode };

export function QuestionList({ items }: { items: QuestionItem[] }) {
  return (
    <dl className="m-0 mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink p-0">
      {items.map((item) => (
        <div key={item.q} className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
          <dt className="m-0 max-w-[40ch] font-heading text-[clamp(1.12rem,2vw,1.5rem)] font-bold leading-[1.18] tracking-[-0.03em]">
            &ldquo;{item.q}&rdquo;
          </dt>
          <dd className="m-0 mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
