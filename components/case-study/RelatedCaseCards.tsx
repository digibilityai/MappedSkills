import Link from 'next/link';
import { WorkCard } from '../resolve/WorkCard';
import { toCard } from '../b2/work-cards';
import { loadLibrary } from '../cplus/work/load';
import type { WorkStudy } from '../cplus/work/studies';
import type { ServiceRoute } from '@/lib/case-study-library';
import { relatedStudies, type Audience } from '@/lib/case-study-related';
import '../resolve-home-r3/resolve-home-r3.css';
import './related-cases.css';

/**
 * "More case studies" for a service page or an industry page: the published studies of the /work library that belong to this
 * page, on the shared case-study card (`components/resolve/WorkCard`), so every appearance uses the study's own listing image and
 * links to its own detail page. Selection reuses the library's own fields (service classification and sector or industry; nothing
 * is hard-coded per study), so a study released later appears here without a code change, and several studies can share a page.
 *
 * `exclude`: addresses the page already presents in its own bespoke card (kept as it is, never replaced). Nothing is rendered when
 * no study is left, so a page is unchanged until its studies are published; a library that cannot be read also renders nothing.
 */
type Props = {
  id: string;
  title: readonly [string, string];
  service?: ServiceRoute;
  audience?: Audience;
  exclude?: readonly string[];
  /** Background of the section, chosen by the page so it alternates with its neighbours. */
  tone?: 'paper' | 'ground';
  /** The section follows a section of the same tone: no extra top space. */
  follow?: boolean;
};

export async function RelatedCaseCards({ id, title, service, audience, exclude = [], tone = 'paper', follow = false }: Props) {
  let items: WorkStudy[] = [];
  try {
    const { all } = await loadLibrary();
    items = relatedStudies(all, { service, audience, exclude });
  } catch {
    return null;
  }
  if (!items.length) return null;
  return (
    <section className={`rcc rv3-${tone}${follow ? ' rcc--follow' : ''}`} aria-labelledby={id}>
      <div className="rv3-wrap">
        <header className="rv3-head">
          <p className="rv3-eyebrow">More client work</p>
          <h2 id={id}>
            {title[0]}
            <em>{title[1]}</em>
          </h2>
        </header>
        <ul className="rcc-grid" role="list">
          {items.map((s) => (
            <li key={s.slug}>
              <WorkCard s={toCard(s)} sizes="(min-width: 1081px) 420px, (min-width: 761px) 45vw, 100vw" />
            </li>
          ))}
        </ul>
        <p className="rcc-more">
          <Link className="rv3-tl" href="/work">
            See all our work<span aria-hidden="true">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
