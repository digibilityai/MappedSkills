import type { ReactNode } from 'react';
import { ChapterLabel, Mark } from '@/components/commercial/primitives';

/**
 * SESSION 28 — PHASE F.
 *
 * The boundary. I3 puts it ABOVE THE MIDPOINT on every commercial route, and
 * I5 makes it ADJACENT-SECONDARY and NEVER COLLAPSIBLE AT ANY WIDTH — so this
 * component contains no disclosure, no accordion and no "read more". It is
 * always open because a limit a reader can close is a disclaimer.
 *
 * The open dashed mark carries "not ours to control" here exactly as it does
 * on the homepage's accountability chapter and at the chain's unattributed
 * arrival. The meaning never varies, and it is never the only carrier: every
 * line states its own limit in words.
 *
 * WHERE THE BOUNDARY SITS IS THE PRIMARY DIFFERENTIATOR between the six
 * capability routes (23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md §4, F-3). The
 * component is shared; its POSITION is per route and must not be normalised.
 */
export function BoundaryBlock({
  label,
  heading,
  intro,
  notPromised,
  children,
  closing,
}: {
  label: string;
  heading: ReactNode;
  intro?: ReactNode;
  /** each is a thing we will not promise — never a feature, never a benefit */
  notPromised?: string[];
  children?: ReactNode;
  closing?: ReactNode;
}) {
  return (
    <>
      <ChapterLabel>{label}</ChapterLabel>
      <div className="mt-[clamp(20px,2.6vw,36px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]" style={{ borderColor: 'var(--resolve-accent-deep)' }}>
        <h2 className="m-0 max-w-[24ch] font-heading text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          {heading}
        </h2>
        {intro && <div className="mt-4 max-w-none text-resolve-dim leading-relaxed [&>p+p]:mt-4">{intro}</div>}
      </div>

      {children && <div className="mt-[clamp(22px,2.8vw,38px)] max-w-none text-resolve-dim leading-relaxed [&>p+p]:mt-4">{children}</div>}

      {notPromised && notPromised.length > 0 && (
        <div className="mt-[clamp(26px,3.2vw,44px)]">
          <span className="mb-3 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
            we do not promise
          </span>
          <ul className="m-0 list-none p-0">
            {notPromised.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-resolve-line py-3 text-[clamp(1.0rem,1.7vw,1.28rem)] font-semibold leading-[1.3] text-resolve-dim"
              >
                <Mark state="open" className="translate-y-px" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {closing && <p className="mt-4 max-w-none text-[.94rem] font-medium leading-[1.55] text-resolve-dim">{closing}</p>}
    </>
  );
}
