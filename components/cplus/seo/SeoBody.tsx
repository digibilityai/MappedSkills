import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { SEO_PLAIN as S } from './content';
import './seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ SEO (/seo): the redesigned, visually led page. Server-rendered throughout; the only client behaviour is the shared
 * one-shot reveal (`data-rv`), which is off under reduced motion. The metadata, canonical, breadcrumb and structured data
 * are set in `app/(pages)/seo/page.tsx` and are not touched here.
 */

/* Small illustrations of the four stations — decorative; every station is named in text beside it. */
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

/* One short trail for the problem cards: four marks, broken where that version of the problem breaks. */
function MiniTrail({ kind }: { kind: number }) {
  return (
    <div className={`sx-mini sx-mini-${kind}`} aria-hidden="true">
      <span className="sx-mini-ln" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`sx-mini-m sx-mini-m${i}`} />
      ))}
      {kind === 0 && <span className="sx-mini-off">competitor</span>}
      {kind === 2 && <span className="sx-mini-rep">report</span>}
    </div>
  );
}

/* Schematic marks for the illustrative review panel. Deliberately flat and numberless: they show where a figure would sit,
   not a trend. */
function TileMark({ k }: { k: string }) {
  return (
    <svg className="sx-tm" viewBox="0 0 120 40" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
      {k === 'vis' && <path d="M4 20h112" className="sx-tm-dash" />}
      {k === 'visits' && (
        <>
          <rect x="6" y="12" width="14" height="22" className="sx-tm-bar" />
          <rect x="30" y="12" width="14" height="22" className="sx-tm-bar" />
          <rect x="54" y="12" width="14" height="22" className="sx-tm-bar" />
          <rect x="78" y="12" width="14" height="22" className="sx-tm-bar" />
          <rect x="102" y="12" width="14" height="22" className="sx-tm-bar" />
        </>
      )}
      {k === 'enq' && (
        <>
          <rect x="4" y="6" width="40" height="28" rx="2" className="sx-tm-env" />
          <path d="M5 8l19 14 19-14" className="sx-tm-flap" />
          <path d="M58 14h56M58 26h40" className="sx-tm-dash" />
        </>
      )}
    </svg>
  );
}

export function SeoBody() {
  return (
    <>
      {/* 1 — hero (ivory): the claim, two short sentences, and the trail from a search to an enquiry */}
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

          <figure className="sx-hero-fig">
            <ol className="sx-trail" aria-label={S.trailLabel}>
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

      {/* 2 — customer questions (paper): three cards, each with a trail that breaks somewhere else */}
      <section className="b-sec b-paper sx-prob-sec" aria-labelledby="sx-h-prob">
        <div className="px-wrap">
          <p className="b-kicker">{S.probKicker}</p>
          <h2 id="sx-h-prob" className="b-h2">
            {S.probH.a} <span className="b-named">{S.probH.b}</span>
          </h2>
          <ol className="sx-prob" data-rv="">
            {S.problems.map((p, i) => (
              <li key={p.q} className="sx-card" data-rv-i="">
                <span className="sx-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <MiniTrail kind={i} />
                <h3 className="sx-card-q">{p.q}</h3>
                <p className="sx-card-a">{p.a}</p>
              </li>
            ))}
          </ol>
          <p className="b-tlink">
            <Link href={S.probLink.href}>{S.probLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 3 — what the work includes (ivory): four groups, each tied to a station of the trail */}
      <section className="b-sec sx-work-sec" aria-labelledby="sx-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{S.workKicker}</p>
          <h2 id="sx-h-work" className="b-h2">
            {S.workH.a} <span className="b-named">{S.workH.b}</span>
          </h2>
          <p className="sx-sub">{S.workSub}</p>
          <ol className="sx-grp" data-rv="">
            {S.groups.map((g, i) => (
              <li key={g.key} className="sx-card sx-gcard" data-rv-i="">
                <div className="sx-gcard-top">
                  <span className="sx-gnum" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="sx-g sx-g-sm">
                    <Glyph k={g.key} />
                  </span>
                </div>
                <h3 className="sx-gcard-t">{g.t}</h3>
                <p className="sx-gcard-d">{g.d}</p>
                <ul className="sx-chips">
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

      {/* 4 — how we work (paper): a slim four-step flow */}
      <section className="b-sec b-paper sx-how-sec" aria-labelledby="sx-h-how">
        <div className="px-wrap">
          <p className="b-kicker">{S.howKicker}</p>
          <h2 id="sx-h-how" className="b-h2">
            {S.howH.a} <span className="b-named">{S.howH.b}</span>
          </h2>
          <ol className="sx-flow" aria-label={S.howLabel} data-rv="">
            {S.steps.map((st, i) => (
              <li key={st.k} className="sx-step" data-rv-i="">
                <span className="sx-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="sx-step-t">{st.k}</h3>
                <p className="sx-step-d">{st.d}</p>
              </li>
            ))}
          </ol>
          <p className="b-tlink">
            <Link href={S.howLink.href}>{S.howLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 5 — measurement (ink): an illustrative review layout, with marks only and no figures */}
      <section className="b-sec b-ink sx-meas-sec" aria-labelledby="sx-h-meas">
        <div className="px-wrap">
          <p className="b-kicker">{S.measKicker}</p>
          <h2 id="sx-h-meas" className="b-h2">
            {S.measH.a} <span className="b-named">{S.measH.b}</span>
          </h2>
          <figure className="sx-rev" data-rv="">
            <figcaption className="sx-rev-tag">{S.measTag}</figcaption>
            <ul className="sx-tiles">
              {S.tiles.map((t) => (
                <li key={t.key} className={'sx-tile' + (t.lead ? ' is-lead' : '')} data-rv-i="">
                  <h3 className="sx-tile-t">{t.t}</h3>
                  <p className="sx-tile-d">{t.d}</p>
                  {t.key === 'next' ? (
                    <ul className="sx-todo" aria-hidden="true">
                      {S.nextRows.map((r, i) => (
                        <li key={r}>
                          <span className={'sx-todo-k' + (i === 1 ? ' is-next' : '')}>{i === 0 ? '✓' : '→'}</span>
                          <span className="sx-todo-l">{r}</span>
                          <span className="sx-todo-bar" />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <TileMark k={t.key} />
                  )}
                </li>
              ))}
            </ul>
          </figure>
          <p className="sx-meas-note">{S.measNote}</p>
          <p className="b-tlink sx-link-ink">
            <Link href={S.measLink.href}>{S.measLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 6 — commitments (ivory): four short promises about how we work, none about results */}
      <section className="b-sec sx-com-sec" aria-labelledby="sx-h-com">
        <div className="px-wrap">
          <p className="b-kicker">{S.comKicker}</p>
          <h2 id="sx-h-com" className="b-h2">
            {S.comH.a} <span className="b-named">{S.comH.b}</span>
          </h2>
          <p className="sx-com-line">{S.comLine}</p>
          <ul className="sx-com" data-rv="">
            {S.commitments.map((c, i) => (
              <li key={c.t} className="sx-com-i" style={{ ['--sx-rise' as string]: i }} data-rv-i="">
                <span className="sx-tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 className="sx-com-t">{c.t}</h3>
                <p className="sx-com-d">{c.d}</p>
              </li>
            ))}
          </ul>
          <p className="sx-com-note">{S.comNote}</p>
        </div>
      </section>

      {/* 7 — projects (ink): two separate historical SEO projects; no results, no links */}
      <section className="b-sec b-ink sx-proj-sec" aria-labelledby="sx-h-proj">
        <div className="px-wrap">
          <p className="b-kicker">{S.projKicker}</p>
          <h2 id="sx-h-proj" className="b-h2">
            {S.projH.a} <span className="b-named">{S.projH.b}</span>
          </h2>
          <p className="sx-sub sx-sub-ink">{S.projIntro}</p>
          <ul className="sx-proj" data-rv="">
            {S.projects.map((p) => (
              <li key={p.key} className="sx-pc" data-rv-i="">
                <div className="sx-pc-top">
                  <span className="sx-pc-mark" aria-hidden="true">
                    {p.initial}
                  </span>
                  <span className="sx-pc-tag">{p.tag}</span>
                </div>
                <h3 className="sx-pc-name">{p.name}</h3>
                <p className="sx-pc-field">{p.field}</p>
                <p className="sx-pc-role">{p.role}</p>
                <p className="sx-pc-state">{p.state}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — questions (paper): four native disclosures, closed on load (the approved FAQ pattern) */}
      <section className="b-sec b-paper sx-q-sec" aria-labelledby="sx-h-qs">
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
