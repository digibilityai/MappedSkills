import Image from 'next/image';
import Link from 'next/link';
import type { WorkStudy } from './work';
import { CaseArt, MOTIF_NOTE } from '../case-study/CaseArt';
import { ClientLogo } from '../clients/ClientLogo';
import './work-card.css';

/**
 * One case-study card in the homepage hierarchy (THE RESOLVE R3 "Featured work"): artwork with the official logo layered
 * on top and the conceptual-artwork disclosure beneath, then eyebrow, title, body and one text CTA. A study without
 * approved artwork is a text-only card: the same eyebrow, title, body and CTA set on a paper panel, with no image area,
 * so nothing stands in for artwork that does not exist. No imagery is invented and no outcome is shown. Use inside
 * `.rs-wc-grid` (lead, then side).
 */
export function WorkCard({ s, lead = false, sizes }: { s: WorkStudy; lead?: boolean; sizes?: string }) {
  const a = s.art;
  return (
    <article className={`rs-wc ${lead ? 'rs-wc-lead' : 'rs-wc-side'}${a || s.motif ? '' : ' rs-wc-textonly'}${s.motif && !a ? ' rs-wc-motif' : ''}`} aria-labelledby={`rs-wc-${s.id}`} data-reveal>
      {a && (
        <>
          <div className="rs-wc-img">
            <Image src={a.src} alt={a.alt} fill sizes={sizes ?? (lead ? '(min-width: 1081px) 740px, 100vw' : '(min-width: 1081px) 440px, (min-width: 761px) 70vw, 100vw')} />
            {a.logo ? <span className={`rs-wc-logo rs-wc-logo-${a.logo.fit}`}><Image src={a.logo.src} alt={a.logo.alt} width={a.logo.w} height={a.logo.h} /></span> : null}
          </div>
          {a.note ? <p className="rs-wc-note">{a.note}</p> : null}
        </>
      )}
      {!a && s.motif ? (
        <>
          <div className="rs-wc-img rs-wc-art ca-host" data-hw-seq>
            <CaseArt motif={s.motif} />
            {s.clientLogo ? <ClientLogo client={s.clientLogo} variant="chip" /> : null}
          </div>
          <p className="rs-wc-note">{MOTIF_NOTE}</p>
        </>
      ) : null}
      <p className="rs-wc-eyebrow">{s.eyebrow}</p>
      <h3 id={`rs-wc-${s.id}`}>{s.title}</h3>
      <p className="rs-wc-body">{s.body}</p>
      <Link className="rs-wc-cta" href={s.href}>{s.cta}<span aria-hidden="true">↗</span></Link>
    </article>
  );
}
