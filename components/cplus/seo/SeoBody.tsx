import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { SEO_PLAIN as S } from './content';
import './seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ SEO (/seo), Direction B (owner-approved, 2026-10-15): one idea runs through the page, the route from a search to an
 * enquiry. The hero draws it, the problems section shows where it breaks, the work is the route as a staircase, and the
 * review sheet shows what a review covers without showing any figures. Server-rendered throughout; this phase is the
 * static composition (final state only). The metadata, canonical, breadcrumb and structured data are set in
 * `app/(pages)/seo/page.tsx` and are not touched here.
 */

/* Small illustrations of the four stations: decorative; every station is named in text beside it. */
function Glyph({ k }: { k: string }) {
  return (
    <svg className="sx-g-svg" viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      {k === 'search' && (
        <>
          <rect x="3" y="13" width="44" height="22" rx="11" className="sx-g-frame" />
          <path d="M13 24h18" className="sx-g-text" />
          <circle cx="53" cy="22" r="6" className="sx-g-stroke" />
          <path d="M57.5 26.5l4 4" className="sx-g-stroke" />
        </>
      )}
      {k === 'result' && (
        <>
          <rect x="6" y="5" width="52" height="9" rx="2" className="sx-g-dim" />
          <rect x="6" y="19" width="52" height="10" rx="2" className="sx-g-ink" />
          <rect x="6" y="34" width="38" height="9" rx="2" className="sx-g-dim" />
        </>
      )}
      {k === 'page' && (
        <>
          <rect x="13" y="3" width="38" height="42" rx="3" className="sx-g-frame" />
          <rect x="19" y="10" width="22" height="6" rx="1" className="sx-g-ink" />
          <path d="M19 23h26M19 30h22M19 37h18" className="sx-g-text" />
        </>
      )}
      {k === 'enquiry' && (
        <>
          <rect x="7" y="9" width="50" height="32" rx="3" className="sx-g-tang" />
          <path d="M8 11l24 17 24-17" className="sx-g-flap" />
        </>
      )}
    </svg>
  );
}

/* Anonymous marks travelling the problems trail (positions are layout only). */
const TRAIL_MARKS: { x: number; off?: boolean }[] = [
  { x: 6 },
  { x: 9 },
  { x: 12 },
  { x: 15, off: true },
  { x: 18, off: true },
  { x: 20, off: true },
  { x: 28 },
  { x: 31 },
  { x: 58 },
  { x: 66 },
  { x: 74 },
  { x: 84 },
  { x: 90 },
];

export function SeoBody() {
  const tm = S.trailMap;
  return (
    <>
      {/* 1 — hero (ivory): the claim, two short sentences, and the route from a search to an enquiry as one connected line */}
      <section className="b-hero sx-hero" aria-labelledby="sx-h1">
        <div className="px-wrap b-hero-g h-hero-g sx-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="sx-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span> {S.h1.c}
            </h1>
            <p className="b-lede">
              {S.lede[0]} {S.lede[1]}
            </p>
            <div className="dc-actions">
              <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
                <Mark />
                {S.primary}
              </Link>
              <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
                <Mark />
                {S.secondary}
              </Link>
            </div>
          </div>

          <figure className="sx-route">
            <div className="sx-route-art" aria-hidden="true">
              <span className="sx-route-ln" />
              <span className="sx-route-fill" />
            </div>
            <ol className="sx-route-list" aria-label={S.trailLabel}>
              {S.trail.map((st, i) => (
                <li key={st.key} className={'sx-st' + (i === 3 ? ' is-end' : '')}>
                  <span className="sx-g">
                    <Glyph k={st.key} />
                  </span>
                  <span className="sx-st-tx">
                    <span className="sx-st-t">{st.name}</span>
                    {st.tag && <span className="sx-st-tag">{st.tag}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <figcaption className="px-cap">{S.trailCap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — where SEO goes wrong (paper): one trail, three points of failure */}
      <section className="b-sec b-paper sx-prob-sec" aria-labelledby="sx-h-prob">
        <div className="px-wrap">
          <p className="b-kicker">{S.probKicker}</p>
          <h2 id="sx-h-prob" className="b-h2">
            {S.probH.a} <span className="b-named">{S.probH.b}</span>
          </h2>

          {/* the drawing is decorative and shown only on wide screens; every question below is real text */}
          <div className="sx-trail" aria-hidden="true">
            <span className="sx-tl" style={{ left: `${tm.stations[0].x}%`, width: `${tm.stations[3].x - tm.stations[0].x}%` }} />
            <span className="sx-tl is-dash" style={{ left: `${tm.stations[3].x}%`, width: `${96 - tm.stations[3].x}%` }} />
            {TRAIL_MARKS.map((m) => (
              <span key={m.x} className={'sx-tm' + (m.off ? ' is-off' : '')} style={{ ['--x' as string]: `${m.x}%` }} />
            ))}
            <span className="sx-else" style={{ ['--x' as string]: '14%' }}>
              {tm.elsewhere}
            </span>
            {tm.stations.map((st) => (
              <span key={st.name} className={'sx-sta' + (st.end ? ' is-end' : '')} style={{ ['--x' as string]: `${st.x}%` }}>
                <i />
                <b>{st.name}</b>
              </span>
            ))}
            {tm.breaks.map((x, i) => (
              <span key={x} className="sx-brk" style={{ ['--x' as string]: `${x}%` }}>
                {i + 1}
              </span>
            ))}
          </div>
          <ol className="sx-co">
            {S.problems.map((p, i) => (
              <li key={p.q} className="sx-co-i" style={{ ['--x' as string]: `${tm.breaks[i]}%` }}>
                <span className="sx-co-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="sx-co-q">{p.q}</h3>
                <p className="sx-co-a">{p.a}</p>
              </li>
            ))}
          </ol>
          <p className="b-tlink">
            <Link href={S.probLink.href}>{S.probLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 3 — what the work includes (ivory): the route as a staircase of four stages */}
      <section className="b-sec sx-work-sec" aria-labelledby="sx-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{S.workKicker}</p>
          <h2 id="sx-h-work" className="b-h2">
            {S.workH.a} <span className="b-named">{S.workH.b}</span>
          </h2>
          <p className="sx-sub">{S.workSub}</p>
          <ol className="sx-stairs">
            {S.groups.map((g, i) => (
              <li key={g.key} className={'sx-stair' + (i === 3 ? ' is-end' : '')} style={{ ['--i' as string]: i }}>
                <span className="sx-g sx-g-sm">
                  <Glyph k={g.key} />
                </span>
                <h3 className="sx-stair-t">{g.t}</h3>
                <p className="sx-stair-d">{g.d}</p>
                <ul className="sx-stair-l">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {g.also && <p className="sx-also">{g.also}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — how we work (paper): one quiet line of four words */}
      <section className="b-sec b-paper sx-how-sec" aria-labelledby="sx-h-how">
        <div className="px-wrap">
          <p className="b-kicker">{S.howKicker}</p>
          <h2 id="sx-h-how" className="b-h2 sx-how-h">
            {S.howH.a} <span className="b-named">{S.howH.b}</span>
          </h2>
          <ol className="sx-how" aria-label={S.howLabel}>
            {S.steps.map((st, i) => (
              <li key={st.k}>
                <h3 className="sx-how-t">
                  {st.k}
                  {i < S.steps.length - 1 && (
                    <span className="sx-how-ar" aria-hidden="true">
                      →
                    </span>
                  )}
                </h3>
                <p className="sx-how-d">{st.d}</p>
              </li>
            ))}
          </ol>
          <p className="b-tlink">
            <Link href={S.howLink.href}>{S.howLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 5 — measurement (ink): one ruled sheet with withheld (hatched) fills; no figures */}
      <section className="b-sec b-ink sx-meas-sec" aria-labelledby="sx-h-meas">
        <div className="px-wrap">
          <p className="b-kicker">{S.measKicker}</p>
          <div className="sx-meas">
            <div>
              <h2 id="sx-h-meas" className="b-h2">
                {S.measH.a} <span className="b-named">{S.measH.b}</span>
              </h2>
              <p className="sx-meas-note">{S.measNote}</p>
              <p className="b-tlink sx-link-ink">
                <Link href={S.measLink.href}>{S.measLink.label} →</Link>
              </p>
            </div>
            <figure className="sx-sheet">
              <figcaption className="sx-stamp">{S.measTag}</figcaption>
              <ul>
                {S.tiles.map((t) => (
                  <li key={t.key} className={t.lead ? 'is-lead' : undefined}>
                    <div>
                      <h3 className="sx-sheet-t">{t.t}</h3>
                      <p className="sx-sheet-d">{t.d}</p>
                    </div>
                    {t.key === 'next' ? (
                      <div className="sx-nx" aria-hidden="true">
                        {S.nextRows.map((r, i) => (
                          <span key={r}>
                            <b className={i === 1 ? 'is-next' : undefined}>{i === 0 ? '✓' : '→'}</b>
                            {r}
                            <i />
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="sx-bar" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </div>
      </section>

      {/* 6 — commitments (ivory): a statement and a ruled list */}
      <section className="b-sec sx-com-sec" aria-labelledby="sx-h-com">
        <div className="px-wrap sx-com">
          <div>
            <p className="b-kicker">{S.comKicker}</p>
            <h2 id="sx-h-com" className="b-h2">
              {S.comH.a} <span className="b-named">{S.comH.b}</span>
            </h2>
            <p className="sx-com-line">{S.comLine}</p>
            <p className="sx-com-note">{S.comNote}</p>
          </div>
          <ul className="sx-cl">
            {S.commitments.map((c, i) => (
              <li key={c.t}>
                <span className={'sx-cl-m' + (i === S.commitments.length - 1 ? ' is-last' : '')} aria-hidden="true" />
                <h3 className="sx-cl-t">{c.t}</h3>
                <p className="sx-cl-d">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — projects (paper): two separate historical SEO projects, set as index entries; no results, no links */}
      <section className="b-sec b-paper sx-proj-sec" aria-labelledby="sx-h-proj">
        <div className="px-wrap">
          <p className="b-kicker">{S.projKicker}</p>
          <h2 id="sx-h-proj" className="b-h2">
            {S.projH.a} <span className="b-named">{S.projH.b}</span>
          </h2>
          <p className="sx-sub">{S.projIntro}</p>
          <ul className="sx-pj">
            {S.projects.map((p) => (
              <li key={p.key}>
                <span className="sx-pj-i" aria-hidden="true">
                  {p.initial}
                </span>
                <div className="sx-pj-b">
                  <h3 className="sx-pj-name">{p.name}</h3>
                  <p className="sx-pj-field">{p.field}</p>
                  <p className="sx-pj-role">
                    {p.role} <span className="sx-pj-tag">{p.tag}</span>
                  </p>
                </div>
                <p className="sx-pj-state">
                  <span>{p.state}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — questions (ivory): four native disclosures, closed on load (the approved FAQ pattern) */}
      <section className="b-sec sx-q-sec" aria-labelledby="sx-h-qs">
        <div className="px-wrap sx-q-g">
          <div>
            <p className="b-kicker">{S.qKicker}</p>
            <h2 id="sx-h-qs" className="b-h2">
              {S.qH.a} <span className="b-named">{S.qH.b}</span>
            </h2>
          </div>
          <ul className="fq-list">
            {S.questions.map((qa) => (
              <li key={qa.q}>
                <details className="fq-d">
                  <summary>
                    <span className="fq-q">{qa.q}</span>
                    <span className="fq-pm" aria-hidden="true" />
                  </summary>
                  <div className="fq-a">
                    <p>{qa.a}</p>
                    {qa.link && (
                      <p className="b-tlink">
                        <Link href={qa.link.href}>{qa.link.label} →</Link>
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* close (tangerine): the shared close's markup and classes */}
      <section className="b-close" aria-labelledby="sx-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker sx-close-k">{S.close.label}</p>
            <h2 id="sx-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {S.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              <Mark />
              {S.secondary}
            </Link>
          </div>
        </div>
        <nav className="px-wrap sx-rel" aria-label={S.related.label}>
          <span className="sx-rel-k" aria-hidden="true">
            {S.related.label}
          </span>
          <ul>
            {S.related.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
