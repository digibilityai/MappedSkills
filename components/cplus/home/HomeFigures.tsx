import { Mark } from '@/components/direction-c/primitives';

/**
 * C+ Home figures, from the approved prototype (proto/direction-c-plus 0a8b611): `ReportPanel` and `CountBar`
 * (ConceptB.tsx) and `Num` (PxPage.tsx), unchanged except one owner-approved correction: the panel heading "What we
 * report" is now "What we look at". `Num` prints the real value; CplusMotion counts it up once.
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

export function CountBar({ label, value, of, mark }: { label: string; value: number; of: number; mark: 'owned' | 'named' }) {
  return (
    <div className="b-cbar">
      <p className="b-cbar-h">
        <span>{label}</span>
        <b>
          <Num value={value} /> <span className="b-of">of {of}</span>
        </b>
      </p>
      <div className="b-cbar-row" aria-hidden="true">
        {Array.from({ length: of }).map((_, i) => (
          <i key={i} className={'dc-mk ' + (i < value ? mark : 'open')} style={{ ['--k' as string]: i }} />
        ))}
      </div>
    </div>
  );
}

export function Num({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className}>
      <span aria-hidden="true" data-count={value}>
        {value}
      </span>
      <span className="px-sr">{value}</span>
    </span>
  );
}
