import type { BarsSpec } from '@/components/cplus/research/evidence';

/** Horizontal bars with every value printed beside its bar from the start; the bar length repeats the value. */
export function EvidenceBars({ spec }: { spec: BarsSpec }) {
  return (
    <ol className="ed-bars" data-ed-evidence>
      {spec.rows.map((r, i) => (
        <li key={r.label}>
          <span className="l">{r.label}</span>
          <span className="tr" aria-hidden="true">
            <i style={{ width: `${r.value}%`, ['--i' as string]: i }} />
          </span>
          <b>{r.value}%</b>
        </li>
      ))}
    </ol>
  );
}
