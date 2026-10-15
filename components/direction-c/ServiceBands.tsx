import Link from 'next/link';
import { Mark, type MarkState } from '@/components/direction-c/primitives';

/**
 * UI REVAMP GATE 2 — DIRECTION C — the services overview: the population
 * narrows. Four ways in (Capture, anonymous marks), two through (Convert,
 * named), one check (Measure, owned), in the order the chain runs. Hairline
 * rows routed by contribution — never a card grid, never equal-weight tiles.
 *
 * The count line ("4 capabilities") is a DEC-034 ruling-3 label; it is
 * computed from the rows it heads, so it cannot disagree with them.
 */
export type Band = {
  stage: string;
  mark: MarkState;
  items: { href: string; name: string; body: string }[];
};

export function ServiceBands({ bands }: { bands: Band[] }) {
  return (
    <>
      {bands.map((band) => (
        <div className="dc-band" key={band.stage}>
          <div className="dc-bl">
            <h3 className="dc-title">{band.stage}</h3>
            <p className="dc-cnt">
              {band.items.length} {band.items.length === 1 ? 'capability' : 'capabilities'}
            </p>
            <span className="dc-count" aria-hidden="true">
              {band.items.map((item) => (
                <i key={item.href} className={`dc-mk ${band.mark}`} />
              ))}
            </span>
          </div>
          <ul className="dc-rows">
            {band.items.map((item) => (
              <li key={item.href}>
                <Link className="dc-svc" href={item.href}>
                  <b>
                    <Mark state={band.mark} />
                    {item.name}
                  </b>{' '}
                  <span className="dc-desc">{item.body}</span>
                  <span className="dc-go" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
