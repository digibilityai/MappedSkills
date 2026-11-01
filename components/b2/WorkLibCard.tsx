import Image from 'next/image';
import Link from 'next/link';
import { CaseArt } from '../case-study/CaseArt';
import type { LibCard } from './work-cards';

/**
 * One /work library card (R2, 31 October 2026). The dedicated card image is shown whole at its own ratio (no crop, overlay, zoom or
 * badge), then the client name, the service (only a catalogue service; none for ClassPe or InsurYo) and ONE line: the study's own lead
 * figure with its definition and period, as readable text, or the short approved summary when no figure exists or its proof is withheld.
 * One link per card: the client name, stretched over the image by CSS (hover: tangerine underline; keyboard focus: a 3 px outline).
 * Used only by the /work library; the shared `WorkCard` (home, about, service pages) is unchanged.
 */
export function WorkLibCard({ c }: { c: LibCard }) {
  return (
    <article className="wl" aria-labelledby={`wl-${c.id}`}>
      {c.art ? (
        <div className="wl-im">
          <Image src={c.art.src} alt={c.art.alt} width={c.art.w} height={c.art.h} sizes="(min-width: 1081px) 640px, (min-width: 721px) 46vw, 100vw" style={c.art.position ? { objectPosition: c.art.position } : undefined} />
        </div>
      ) : c.motif ? (
        <div className="wl-im wl-art ca-host" data-hw-seq>
          <CaseArt motif={c.motif} />
        </div>
      ) : null}
      <h3 id={`wl-${c.id}`} className="wl-n">
        <Link href={c.href}>{c.name}</Link>
      </h3>
      {c.service ? <p className="wl-sv">{c.service}</p> : null}
      <p className="wl-tx">
        {c.lead ? (
          <>
            <strong>{c.lead.v}</strong> {c.lead.c}
          </>
        ) : (
          c.summary
        )}
      </p>
    </article>
  );
}
