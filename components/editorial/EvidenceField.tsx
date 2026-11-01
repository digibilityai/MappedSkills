import type { FieldSpec } from '@/components/cplus/research/evidence';

/**
 * One 120-square chart (one square per audited website) with a text legend that names every group and its count.
 * The groups come from an explicit, validated spec (components/cplus/research/evidence.ts), never from prose.
 * Server-rendered in its finished state; `EdMotion` may replay the marking once when it scrolls into view.
 * `idBase` makes the legend id unique when several charts share a page.
 */
export function EvidenceField({ spec, idBase }: { spec: FieldSpec; idBase: string }) {
  const cols = spec.total / 10;
  const kinds = spec.parts.flatMap((p) => Array.from({ length: p.count }, () => p.kind));
  const legendId = `${idBase}-legend`;
  const spoken = spec.parts.map((p) => `${p.count} ${p.label}`).join(', ');
  return (
    <figure className="ed-ef" data-ed-evidence>
      <div className="ed-sqf" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="img" aria-labelledby={legendId}>
        {kinds.map((k, i) => (
          <span key={i} className={`ed-sq is-${k}`} style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <figcaption>
        <ul className="ed-leg" id={legendId}>
          {spec.parts.map((p) => (
            <li key={p.label}>
              <span className={`ed-sw is-${p.kind}`} aria-hidden="true" />
              <strong>{p.count}</strong> {p.label}
            </li>
          ))}
        </ul>
        <p className="ed-capt">
          Each square is one audited website, grouped by answer ({spoken}).
        </p>
      </figcaption>
    </figure>
  );
}
