import { Mark } from '@/components/direction-c/primitives';

/**
 * C+ Home figure, from the approved prototype (proto/direction-c-plus 0a8b611): `ReportPanel` (ConceptB.tsx), unchanged
 * except one owner-approved correction: the panel heading "What we report" is now "What we look at".
 */

const SOURCES = [
  { s: 'organic search', m: 'named' as const },
  { s: 'paid search', m: 'named' as const },
  { s: 'a page that answered the visit', m: 'named' as const },
  { s: 'arrived with no usable trail — unattributed', m: 'open' as const },
];

export function ReportPanel() {
  return (
    <div className="b-panel b-report" aria-hidden="true">
      <div className="b-panel-h">
        <span>What a traffic report shows</span>
        <span className="b-pill">visits</span>
      </div>
      <div className="b-field">
        {Array.from({ length: 60 }).map((_, i) => (
          <i key={i} className="dc-mk anon" style={{ ['--k' as string]: i }} />
        ))}
      </div>
      <div className="b-panel-h b-panel-h2">
        <span>What we look at</span>
        <span className="b-pill b-pill-on">enquiries</span>
      </div>
      <ul className="b-src">
        {SOURCES.map((x, i) => (
          <li key={x.s} style={{ ['--k' as string]: i }}>
            <Mark state={x.m === 'named' ? 'owned' : 'open'} />
            <span className="b-src-line" />
            {x.s}
          </li>
        ))}
      </ul>
    </div>
  );
}
