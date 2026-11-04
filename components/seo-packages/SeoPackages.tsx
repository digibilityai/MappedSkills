import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { SEO_AUDIT, SEO_CARD_KEYS, SEO_COMPARE, SEO_DEFINITIONS, SEO_EXTRA_NOTE, SEO_EXTRA_SCOPE, SEO_GST_NOTE, SEO_PLANS, SEO_TERMS } from './data';
import './seo-packages.css';

type Copy = {
  kicker: string; h: { a: string; b: string }; intro: string; compareLabel: string;
  defHeading: string; termsHeading: string; extraHeading: string; auditKicker: string; auditLead: string; cta: string;
};

/** The SEO packages, comparison, audit, terms and exclusions on `/seo`. Server component; no script. */
export function SeoPackages({ copy, chapter }: { copy: Copy; chapter: string }) {
  const cardRows = (i: number) => SEO_COMPARE.filter((r) => (SEO_CARD_KEYS as readonly string[]).includes(r.k)).map((r) => ({ k: r.k, v: r.v[i] }));
  return (
    <section id="packages" className="sk-act sk-paper sk-pkg" aria-labelledby="sk-h-pkg">
      <div className="pa-wrap">
        <header className="sk-head" data-reveal>
          <p className="sk-ch"><span>{chapter}</span>{copy.kicker}</p>
          <h2 id="sk-h-pkg" className="b2-h2">{copy.h.a} <span className="b2-em">{copy.h.b}</span></h2>
          <p className="sk-intent">{copy.intro}</p>
          <p className="sk-sub">{SEO_GST_NOTE}</p>
        </header>

        <ul className="skp-plans">
          {SEO_PLANS.map((pl, i) => (
            <li key={pl.id} className={'skp-plan' + ('featured' in pl && pl.featured ? ' is-featured' : '')} data-reveal>
              <h3>{pl.name}</h3>
              <p className="skp-fee"><b>{pl.fee}</b> <span>{pl.per}</span></p>
              <p className="skp-fit">{pl.fit}</p>
              <dl>
                {cardRows(i).map((r) => (<div key={r.k}><dt>{r.k}</dt><dd>{r.v}</dd></div>))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="skp-table-wrap" data-reveal>
          <table className="skp-table">
            <caption>{copy.compareLabel}</caption>
            <thead><tr><th scope="col">Deliverable</th>{SEO_PLANS.map((pl) => <th key={pl.id} scope="col">{pl.name}</th>)}</tr></thead>
            <tbody>
              {SEO_COMPARE.map((r) => (
                <tr key={r.k}><th scope="row">{r.k}</th>{r.v.map((v, i) => <td key={i} data-label={SEO_PLANS[i].name}>{v}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skp-notes">
          <div data-reveal><h3>{copy.defHeading}</h3><ul>{SEO_DEFINITIONS.map((t) => <li key={t}>{t}</li>)}</ul></div>
          <div data-reveal><h3>{copy.termsHeading}</h3><ul>{SEO_TERMS.map((t) => <li key={t}>{t}</li>)}</ul></div>
          <div data-reveal><h3>{copy.extraHeading}</h3><ul>{SEO_EXTRA_SCOPE.map((t) => <li key={t}>{t}</li>)}</ul><p>{SEO_EXTRA_NOTE}</p></div>
        </div>

        <article className="skp-audit" aria-labelledby="skp-audit-h" data-reveal>
          <div>
            <p className="skp-audit-k">{copy.auditKicker}</p>
            <h3 id="skp-audit-h">{SEO_AUDIT.name}</h3>
            <p className="skp-fee"><b>{SEO_AUDIT.fee}</b> <span>{SEO_AUDIT.per}</span></p>
            <p>{copy.auditLead}</p>
            <p className="skp-credit">{SEO_AUDIT.credit}</p>
          </div>
          <div>
            <ul>{SEO_AUDIT.includes.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="skp-excl">{SEO_AUDIT.excludes}</p>
          </div>
        </article>

        <p className="sk-more">
          <ActionLink href={CONTACT_HREF}>{copy.cta}</ActionLink>{' '}
          <Link className="skp-pl" href="/pricing">Compare with Google Ads and Meta Ads pricing</Link>
        </p>
      </div>
    </section>
  );
}
