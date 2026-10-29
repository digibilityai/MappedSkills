import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { WORK as S } from '../cplus/work/content';
import type { WorkStudy } from '../cplus/work/studies';
import type { FacetOption } from '@/lib/case-study-library';
import { HwSequence } from './HwSequence';
import { WorkLibrary } from './WorkLibrary';
import { toCard } from './work-cards';
import '../paid-advertising/paid-advertising.css';
import './b2.css';
import '../resolve/work-card.css';
import './work.css';

/**
 * /work and /work/page/[n] as a THE RESOLVE story (Stage 3). Hero (dark): the approved H1 and lede beside the route every
 * case study follows. Then the work: on page 1 the featured study and the next in the homepage lead and side composition
 * (paper), then the library on the shared case-study cards with search, filters and pages (ground). Then the evidence rule
 * (dark) and the closing band. Studies, counts and order come from Contentful (`components/cplus/work/load.ts`); no figure,
 * outcome or testimonial reaches this page. Motion follows /about: once only, decorative parts only.
 */

export type WorkLibraryProps = {
  items: WorkStudy[];
  page: number;
  pages: number;
  total: number;
  facets: { sectors: FacetOption[]; services: FacetOption[] };
  /** Whether any published study states figures or outcomes (the matching evidence rules are shown only then). */
  evidence: { figures: boolean; outcomes: boolean };
};

const R = S.resolve;

export function Work({ library }: { library: WorkLibraryProps }) {
  const { evidence, total, page, pages } = library;
  const rules: Array<[string, string]> = [];
  if (evidence.figures) rules.push([R.rules.figures, S.key.figures]);
  if (evidence.outcomes) rules.push([R.rules.outcomes, S.key.outcomes]);
  if (library.items.some((s) => toCard(s).art)) rules.push([R.rules.art, R.rules.artBody]);

  return (
    <div className="pa b2 wk">
      <PaReveal />
      <HwSequence scope=".wk" />

      {/* Hero, Ink Deep: the promise of the page, and the route every study follows */}
      <section className="wk-hero wk-dark" aria-labelledby="wk-h1">
        <div className="pa-wrap">
          <nav aria-label="Breadcrumb" className="wk-crumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-hidden="true">/</span> <span aria-current="page">{S.crumb}</span></li>
            </ol>
          </nav>
          <div className="wk-hero-grid">
            <div className="wk-hero-copy">
              <h1 id="wk-h1">{S.hero.h1.a} <span>{S.hero.h1.b}</span></h1>
              <p className="b2-lede">{S.hero.lede}</p>
              {total ? (
                <p className="wk-count">
                  {R.count(total)}
                  {pages > 1 ? <span> · Page {page} of {pages}</span> : null}
                </p>
              ) : null}
            </div>
            <figure className="wk-route" aria-labelledby="wk-route-cap">
              <p className="wk-route-k">{R.route.k}</p>
              <ol>
                {R.route.steps.map((s, i) => (
                  <li key={s.b} style={{ '--i': i } as React.CSSProperties}>
                    <span className="wk-node" aria-hidden="true">{i + 1}</span>
                    <b>{s.b}</b>
                    <span>{s.t}</span>
                  </li>
                ))}
              </ol>
              <figcaption id="wk-route-cap">{R.route.cap}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {total ? (
        <WorkLibrary {...library} />
      ) : (
        <section className="wk-act wk-ground" aria-label="Case studies">
          <div className="pa-wrap"><p className="wk-empty">{S.library.none}</p></div>
        </section>
      )}

      {/* The evidence rule, Ink Deep */}
      <section className="wk-act wk-dark" aria-labelledby="wk-h-ev">
        <div className="pa-wrap">
          <header className="wk-head" data-reveal>
            <p className="wk-ch">{R.evidence.ch}</p>
            <h2 id="wk-h-ev" className="b2-h2">{R.evidence.a} <span className="b2-em">{R.evidence.b}</span></h2>
            <p className="b2-lede">{S.note.body}</p>
          </header>
          {rules.length ? (
            <ul className="wk-rules" role="list">
              {rules.map(([b, t], i) => <li key={b} data-reveal style={{ '--i': i } as React.CSSProperties}><b>{b}</b><span>{t}</span></li>)}
            </ul>
          ) : null}
        </div>
      </section>

      {/* The closing band (burnt), with the page's existing actions */}
      <section className="b2-band" aria-labelledby="wk-h-close">
        <div className="pa-wrap">
          <p className="wk-close-k">{S.close.kicker}</p>
          <h2 id="wk-h-close">{S.close.h}</h2>
          <p>{S.close.body}</p>
          <div className="pa-actions">
            <ActionLink href={CONTACT_HREF} variant="dark">{S.close.primary}</ActionLink>
            <ActionLink href={BOOKING_HREF} variant="text">{S.close.secondary}</ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
