import Link from 'next/link';
import { ActionLink } from '../../paid-advertising/ActionLink';
import { PaReveal } from '../../paid-advertising/PaReveal';
import { HwSequence } from '../../b2/HwSequence';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { SEO_PLAIN as S } from './content';
import '../../paid-advertising/paid-advertising.css';
import '../../b2/b2.css';
import './seo.css';

/**
 * /seo as a THE RESOLVE story (Stage 4 Batch 2A, third pass: one fold, one message, one emotion). Same copy, claims, links
 * and service boundaries as the approved Direction B page (content.ts); only the composition changed. Every primary section
 * is one scene that is designed to fit one screen. The intensity follows the visitor's decision: the hero shows the pain
 * (your page is not in the results, so no enquiry arrives), the problems are three related breaks in sequence (medium), the
 * approach is the moment the route connects (high), the process is quiet (low), the review contrasts what is easy to count
 * with what matters (high), trust is calm, and the close is decisive (high). Conceptual and unquantified: nothing here
 * shows results.
 *
 * Motion is once-only and decorative, the homepage convention: the settled state is the base style, so no script and
 * reduced motion show the finished picture.
 * Metadata, canonical, breadcrumb and structured data live in `app/(pages)/seo/page.tsx` and are not touched here.
 */

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/* The four stations of the hero route, drawn as the pain: the first two are real, the rest are ghosts (your page is not in
   the results, so no enquiry arrives). All of it is decorative; every station is named in text beside it. */
function Viz({ k }: { k: string }) {
  if (k === 'search')
    return (
      <span className="sk-viz" aria-hidden="true">
        <span className="sk-v-bar">
          <i />
        </span>
      </span>
    );
  if (k === 'result')
    return (
      <span className="sk-viz" aria-hidden="true">
        <span className="sk-v-else">{S.trailMap.elsewhere}</span>
        <span className="sk-v-res">
          <b />
          <b />
          <b />
          <b className="gap" />
        </span>
      </span>
    );
  if (k === 'page')
    return (
      <span className="sk-viz" aria-hidden="true">
        <span className="sk-v-page">
          <b />
          <i />
          <i />
          <u />
        </span>
      </span>
    );
  return (
    <span className="sk-viz" aria-hidden="true">
      <svg className="sk-v-env" viewBox="0 0 64 44" focusable="false">
        <rect x="2" y="2" width="60" height="40" rx="4" />
        <path d="M4 6l28 20L60 6" />
      </svg>
    </span>
  );
}

export function SeoBody() {
  return (
    <div className="pa b2 sk">
      <PaReveal />
      <HwSequence scope=".sk" />

      {/* Hero, Ink Deep: the promise, and the route from a search to an enquiry */}
      <section className="sk-hero sk-dark" aria-labelledby="sk-h1">
        <div className="pa-wrap sk-hero-grid">
          <div className="sk-hero-copy">
            <nav aria-label="Breadcrumb" className="sk-crumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> What we do{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> <span aria-current="page">{S.crumb}</span>
                </li>
              </ol>
            </nav>
            <p className="pa-eyebrow">{S.kicker}</p>
            <h1 id="sk-h1">
              {S.h1.a} <span>{S.h1.b}</span> <span className="sk-nw">{S.h1.c}</span>
            </h1>
            <p className="b2-lede">
              {S.lede[0]} {S.lede[1]}
            </p>
            <div className="pa-actions">
              <ActionLink href={CONTACT_HREF}>{S.primary}</ActionLink>
              <ActionLink href={BOOKING_HREF} variant="text">
                {S.secondary}
              </ActionLink>
            </div>
          </div>
          <figure className="sk-fig" aria-labelledby="sk-fig-cap">
            <div className="sk-panel">
              <ol className="sk-route" aria-label={S.trailLabel}>
                {S.trail.map((st, i) => (
                  <li key={st.key} className={'sk-st' + (i >= 2 ? ' is-ghost' : '') + (i === 3 ? ' is-end' : '')} style={css({ '--i': i })}>
                    <span className="sk-node" aria-hidden="true" />
                    <span className="sk-st-tx">
                      <span className="sk-st-t">{st.name}</span>
                      {st.tag && <span className="sk-st-tag">{st.tag}</span>}
                    </span>
                    <Viz k={st.key} />
                  </li>
                ))}
              </ol>
            </div>
            <figcaption id="sk-fig-cap">{S.trailCap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 01, Ground: where a search breaks before it reaches an enquiry */}
      <section className="sk-act sk-ground sk-prob" aria-labelledby="sk-h-prob">
        <div className="pa-wrap">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>01</span>
              {S.probKicker}
            </p>
            <h2 id="sk-h-prob" className="b2-h2">
              {S.probH.a} <span className="b2-em">{S.probH.b}</span>
            </h2>
          </header>
          <ol className="sk-breaks" data-hw-seq>
            {S.problems.map((p, i) => (
              <li key={p.q} style={css({ '--i': i })}>
                <span className="sk-gate" aria-hidden="true" />
                <p className="sk-tag">{S.probTags[i]}</p>
                <h3>{p.q}</h3>
                <p className="sk-a">{p.a}</p>
              </li>
            ))}
          </ol>
          <p className="sk-more">
            <ActionLink href={S.probLink.href} variant="text">
              {S.probLink.label}
            </ActionLink>
          </p>
        </div>
      </section>

      {/* 02, Ink Deep: the moment of understanding. The four things the work does are the four stations of the route; the
          line goes from broken (dashed, hollow) to connected (solid, lit). */}
      <section className="sk-act sk-dark sk-approach" aria-labelledby="sk-h-work">
        <div className="pa-wrap">
          <div className="sk-scene">
            <header className="sk-head" data-reveal>
              <p className="sk-ch">
                <span>02</span>
                {S.workKicker}
              </p>
              <h2 id="sk-h-work" className="b2-h2">
                {S.workH.a} {S.workH.b}
              </h2>
              <p className="sk-sub">{S.workSub}</p>
            </header>
            {/* Narrow screens only: the whole route in one glance (the same four stations as the hero), then a way down to the detail. */}
            <div className="sk-strip" aria-hidden="true" data-hw-seq>
              {S.trail.map((st, i) => (
                <span key={st.key} className={i === 3 ? 'is-end' : undefined} style={css({ '--i': i })}>
                  <i>{i + 1}</i>
                  <em>{st.name}</em>
                </span>
              ))}
            </div>
            <a className="sk-cont" href="#sk-stages">
              What each stage includes <span aria-hidden="true">{'\u2193'}</span>
            </a>
          </div>
          <ol id="sk-stages" className="sk-stages" data-hw-seq>
            {S.groups.map((g, i) => (
              <li key={g.key} className={i === 3 ? 'is-end' : undefined} style={css({ '--i': i })}>
                <span className="sk-node" aria-hidden="true" />
                <h3>{g.t}</h3>
                <p className="sk-sd">{g.d}</p>
                <ul className="sk-items">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {g.also && <p className="sk-also">{g.also}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03, Paper: the order we work in */}
      <section className="sk-act sk-paper" aria-labelledby="sk-h-how">
        <div className="pa-wrap">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>03</span>
              {S.howKicker}
            </p>
            <h2 id="sk-h-how" className="b2-h2">
              {S.howH.a} {S.howH.b}
            </h2>
          </header>
          <ol className="sk-steps" data-hw-seq aria-label={S.howLabel}>
            {S.steps.map((st, i) => (
              <li key={st.k} className={i === S.steps.length - 1 ? 'is-end' : undefined} style={css({ '--i': i })}>
                <span className="sk-sn" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{st.k}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <p className="sk-more">
            <ActionLink href={S.howLink.href} variant="text">
              {S.howLink.label}
            </ActionLink>
          </p>
        </div>
      </section>

      {/* 04, Ground: what a review can cover. What is easy to count is small and quiet; what matters is large and lit.
          One illustrative sheet, with withheld (hatched) fills; no figures. */}
      <section className="sk-act sk-ground sk-measure" aria-labelledby="sk-h-meas">
        <div className="pa-wrap sk-meas">
          <header className="sk-head sk-meas-h" data-reveal>
            <p className="sk-ch">
              <span>04</span>
              {S.measKicker}
            </p>
            <h2 id="sk-h-meas" className="b2-h2">
              {S.measH.a} <span className="b2-em">{S.measH.b}</span> {S.measH.c}
            </h2>
          </header>
          <figure className="sk-sheet" data-reveal>
            <figcaption className="sk-stamp">{S.measTag}</figcaption>
            <ul>
              {S.tiles.map((t) => (
                <li key={t.key} className={t.lead ? 'lead' : undefined}>
                  <div>
                    <h3>{t.t}</h3>
                    <p>{t.d}</p>
                  </div>
                  {t.key === 'next' ? (
                    <div className="sk-nx" aria-hidden="true">
                      {S.nextRows.map((r, i) => (
                        <span key={r}>
                          <b className={i === 1 ? 'is-next' : undefined}>{i === 0 ? '✓' : '→'}</b>
                          {r}
                          <i />
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="sk-bar" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </figure>
          <div className="sk-meas-n">
            <p className="sk-sub">{S.measNote}</p>
            <p className="sk-more">
              <ActionLink href={S.measLink.href} variant="text">
                {S.measLink.label}
              </ActionLink>
            </p>
          </div>
        </div>
      </section>

      {/* 05, Ink Deep: what you can expect */}
      <section className="sk-act sk-dark" aria-labelledby="sk-h-com">
        <div className="pa-wrap sk-com">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>05</span>
              {S.comKicker}
            </p>
            <h2 id="sk-h-com" className="b2-h2">
              {S.comH.a} <span className="b2-em">{S.comH.b}</span>
            </h2>
            <p className="sk-answer">{S.comLine}</p>
            <p className="sk-sub">{S.comNote}</p>
          </header>
          <ul className="sk-pledges" data-reveal>
            {S.commitments.map((c, i) => (
              <li key={c.t} className={i === S.commitments.length - 1 ? 'is-end' : undefined}>
                <span className="sk-pm" aria-hidden="true" />
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06, Paper: two separate historical SEO projects, set as index entries; no results, no links */}
      <section className="sk-act sk-paper" aria-labelledby="sk-h-proj">
        <div className="pa-wrap">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>06</span>
              {S.projKicker}
            </p>
            <h2 id="sk-h-proj" className="b2-h2">
              {S.projH.a} {S.projH.b}
            </h2>
            <p className="sk-sub">{S.projIntro}</p>
          </header>
          <ul className="sk-pj" data-reveal>
            {S.projects.map((p) => (
              <li key={p.key}>
                <span className="sk-pj-i" aria-hidden="true">
                  {p.initial}
                </span>
                <div className="sk-pj-b">
                  <h3>{p.name}</h3>
                  <p className="sk-pj-field">{p.field}</p>
                  <p className="sk-pj-role">
                    {p.role} <span className="sk-pj-tag">{p.tag}</span>
                  </p>
                </div>
                <p className="sk-pj-state">
                  <span>{p.state}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07, Ground: four native disclosures, closed on load (the approved FAQ pattern) */}
      <section className="sk-act sk-ground" aria-labelledby="sk-h-qs">
        <div className="pa-wrap sk-q">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>07</span>
              {S.qKicker}
            </p>
            <h2 id="sk-h-qs" className="b2-h2">
              {S.qH.a} {S.qH.b}
            </h2>
          </header>
          <ul className="b2-list-q">
            {S.questions.map((qa) => (
              <li key={qa.q}>
                <details className="b2-d">
                  <summary>
                    <span>{qa.q}</span>
                    <span className="b2-pm" aria-hidden="true" />
                  </summary>
                  <div className="b2-a">
                    <p>{qa.a}</p>
                    {qa.link && (
                      <p className="more">
                        <Link href={qa.link.href}>{qa.link.label}</Link>
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close: the single closing action, full-bleed tangerine with Ink text */}
      <section className="b2-band sk-band" aria-labelledby="sk-h-close">
        <div className="pa-wrap sk-band-in">
          <div className="sk-band-copy">
            <p className="sk-band-k">{S.close.label}</p>
            <h2 id="sk-h-close">{S.close.h}</h2>
            <p>{S.close.body}</p>
            <div className="pa-actions">
              <ActionLink href={CONTACT_HREF} variant="dark">
                {S.primary}
              </ActionLink>
              <ActionLink href={BOOKING_HREF} variant="text">
                {S.secondary}
              </ActionLink>
            </div>
          </div>
          <div className="sk-band-art" aria-hidden="true" data-hw-seq>
            <i />
            <i />
            <i />
            <b>
              <svg viewBox="0 0 64 44" focusable="false">
                <rect x="2" y="2" width="60" height="40" rx="4" />
                <path d="M4 6l28 20L60 6" />
              </svg>
            </b>
          </div>
          <nav className="sk-rel" aria-label={S.related.label}>
            <span className="sk-rel-k" aria-hidden="true">
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
        </div>
      </section>
    </div>
  );
}
