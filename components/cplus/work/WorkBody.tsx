import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { WORK as S } from './content';
import type { WorkStudy } from './studies';
import { WorkLibrary } from './WorkLibrary';
import type { FacetOption } from '@/lib/case-study-library';
import './work.css';

/**
 * C+ Case studies (/work and /work/page/[n]): the owner-approved G1 R3 design (docs/work-redesign/g1-r3/) as a library
 * (G7). Hero → client work (page 1: one featured study, then the rest on a wrapping grid; 12 studies per page; search
 * and filters from `CONTROLS_MIN_STUDIES` studies) → one evidence note → the shared tangerine close. No `data-rv`.
 */

export type WorkLibraryProps = {
  items: WorkStudy[];
  page: number;
  pages: number;
  total: number;
  facets: { sectors: FacetOption[]; services: FacetOption[] };
};

export function WorkBody({ library }: { library: WorkLibraryProps }) {
  return (
    <>
      {/* 1 — hero (ivory): breadcrumb, then the headline and the lede side by side. No CTA, no index. */}
      <section className="b-hero wk-hero" aria-labelledby="wk-h1">
        <div className="px-wrap">
          <Breadcrumb current={S.crumb} />
          <div className="wk-hero-g">
            <h1 id="wk-h1" className="b-h1">
              {S.hero.h1.a} <span className="b-named">{S.hero.h1.b}</span>
            </h1>
            <p className="b-lede">{S.hero.lede}</p>
          </div>
        </div>
      </section>

      {/* 2 — client work (paper). Only published studies; an honest line when there are none. */}
      <section className="b-sec b-paper wk-work" aria-labelledby="wk-h-work">
        <div className="px-wrap">
          <div className="wk-work-h">
            <p className="b-kicker">{S.work.kicker}</p>
            <h2 id="wk-h-work" className="b-h2">
              {S.work.h}
            </h2>
            <p className="wk-intro">{S.work.intro}</p>
          </div>
          {library.total ? <WorkLibrary {...library} /> : <p className="wk-empty">{S.library.none}</p>}
          <aside className="wk-note" aria-label="About the evidence">
            <p>
              <strong>{S.note.h}</strong> {S.note.body}
            </p>
          </aside>
        </div>
      </section>

      {/* close: the shared tangerine close */}
      <section className="b-close" aria-labelledby="wk-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker wk-close-k">{S.close.kicker}</p>
            <h2 id="wk-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {S.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              {S.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
