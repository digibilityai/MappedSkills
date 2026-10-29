import Image from 'next/image';
import Link from 'next/link';
import type { WorkStudy } from './work';
import './work-card.css';

/**
 * One case-study card in the homepage hierarchy (THE RESOLVE R3 "Featured work"): artwork with the official logo layered
 * on top and the conceptual-artwork disclosure beneath, then eyebrow, title, body and one text CTA. A study without
 * approved artwork gets a text-led panel of the same proportions: the channel and the client name set as type over the
 * Resolve field of marks. No imagery is invented and no outcome is shown. Use inside `.rs-wc-grid` (lead, then side).
 */
export function WorkCard({ s, lead = false, sizes }: { s: WorkStudy; lead?: boolean; sizes?: string }) {
  const a = s.art;
  return (
    <article className={`rs-wc ${lead ? 'rs-wc-lead' : 'rs-wc-side'}`} aria-labelledby={`rs-wc-${s.id}`} data-reveal>
      {a ? (
        <>
          <div className="rs-wc-img">
            <Image src={a.src} alt={a.alt} fill sizes={sizes ?? (lead ? '(min-width: 1081px) 740px, 100vw' : '(min-width: 1081px) 440px, (min-width: 761px) 70vw, 100vw')} />
            <span className={`rs-wc-logo rs-wc-logo-${a.logo.fit}`}><Image src={a.logo.src} alt={a.logo.alt} width={a.logo.w} height={a.logo.h} /></span>
          </div>
          <p className="rs-wc-note">{a.note}</p>
        </>
      ) : (
        <div className="rs-wc-img rs-wc-text" aria-hidden="true">
          <span className="rs-wc-chan">{s.channel}</span>
          <span className="rs-wc-name">{s.title}</span>
        </div>
      )}
      <p className="rs-wc-eyebrow">{s.eyebrow}</p>
      <h3 id={`rs-wc-${s.id}`}>{s.title}</h3>
      <p className="rs-wc-body">{s.body}</p>
      <Link className="rs-wc-cta" href={s.href}>{s.cta}<span aria-hidden="true">↗</span></Link>
    </article>
  );
}
