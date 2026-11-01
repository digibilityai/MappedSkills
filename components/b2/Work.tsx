import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { ActionLink } from '../paid-advertising/ActionLink';
import { WORK as S } from '../cplus/work/content';
import type { WorkStudy } from '../cplus/work/studies';
import type { FacetOption } from '@/lib/case-study-library';
import { WorkLibrary } from './WorkLibrary';
import '../paid-advertising/paid-advertising.css';
import './b2.css';
import './work.css';

/**
 * /work and /work/page/[n] (R2, 31 October 2026; owner-approved docs/editorial-redesign/PROPOSAL_WORK_R2): a compact heading and
 * introduction, then the library (Search, Service, Industry, result count, two-column cards, numbered pages), then the closing band.
 * The client-logo strip, the route panel and the "start here" block are removed from this page only. Studies, counts and order come
 * from Contentful (`components/cplus/work/load.ts`); nothing here is hard-coded.
 */

export type WorkLibraryProps = {
  items: WorkStudy[];
  /** Every public study's address in library order (for the client-logo band, which spans all pages). */
  hrefs?: string[];
  page: number;
  pages: number;
  total: number;
  facets: { sectors: FacetOption[]; services: FacetOption[] };
  /** Whether any published study states figures or outcomes (the matching evidence rules are shown only then). */
  evidence: { figures: boolean; outcomes: boolean };
};


export function Work({ library }: { library: WorkLibraryProps }) {
  const { total } = library;

  return (
    <div className="pa b2 wk">
      <section className="wk-top" aria-labelledby="wk-h1">
        <div className="pa-wrap">
          <nav aria-label="Breadcrumb" className="wk-crumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-hidden="true">/</span> <span aria-current="page">{S.crumb}</span></li>
            </ol>
          </nav>
          <h1 id="wk-h1">{S.hero.h1.a} <span>{S.hero.h1.b}</span></h1>
          <p className="b2-lede">{S.hero.lede}</p>
        </div>
      </section>

      {total ? (
        <WorkLibrary {...library} />
      ) : (
        <section className="wk-lib" aria-label="Case studies">
          <div className="pa-wrap"><p className="wk-empty">{S.library.none}</p></div>
        </section>
      )}

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
