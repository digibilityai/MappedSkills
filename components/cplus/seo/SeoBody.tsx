import Link from 'next/link';
import { ActionLink } from '../../paid-advertising/ActionLink';
import { PaReveal } from '../../paid-advertising/PaReveal';
import { HwSequence } from '../../b2/HwSequence';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { CaseShowcase, type ShowcaseData } from '@/components/case-showcase/CaseShowcase';
import { SEO_PLAIN as S } from './content';
import { SeoPackages } from '../../seo-packages/SeoPackages';
import '../../paid-advertising/paid-advertising.css';
import '../../b2/b2.css';
import './seo.css';

/**
 * /seo as a seven-scene THE RESOLVE story (narrative redesign, owner-approved 2026-10-31; supersedes DEC-092 for this scope).
 * One section answers one question: the hero says what this is; "where SEO usually goes wrong" names the three breaks; "the
 * work" matches each search to a page that answers it; one composed proof section shows two SEO case studies; "how it runs"
 * says what happens if you start; the approved questions; one closing action. The route graphic appears only in the hero.
 *
 * Proof is the shared case showcase (DEC-115), loaded by the page from the public library only (`./showcase.ts`): AnybodyCanBake with its
 * owner-approved SEO figure, period and qualification, and Ameba Software with its own approved entry (a summary, no figure, until its proof is
 * released). A case that is not published produces no card and no link; with neither, the section is not rendered and the later sections renumber.
 *
 * Motion is the approved once-only reveal and sequence helpers: the settled state is the base style, so no script and reduced
 * motion show the finished page. Nothing counts up, loops, pins or hijacks scroll.
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

export function SeoBody({ showcase = null }: { showcase?: ShowcaseData | null }) {
  const showProof = !!showcase && showcase.cards.length > 0;
  /* chapter numbers follow the sections that are actually rendered */
  const nHow = showProof ? '04' : '03';
  const nPkg = showProof ? '05' : '04';
  const nQs = showProof ? '06' : '05';

  return (
    <div className="pa b2 sk">
      <PaReveal />
      <HwSequence scope=".sk" />

      {/* Hero, Ink Deep: the promise, and the route from a search to an enquiry (the only place the route is drawn) */}
      <section className="sk-hero sk-dark" aria-labelledby="sk-h1">
        <div className="pa-wrap sk-hero-grid">
          <div className="sk-hero-copy">
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

      {/* 01, Ground: where a search breaks before it reaches an enquiry (the three approved questions) */}
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

      {/* 02, Ink Deep: what the work is, led by search intent. Three typographic rows, no route, no cards. */}
      <section className="sk-act sk-dark sk-work" aria-labelledby="sk-h-work">
        <div className="pa-wrap sk-work-in">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>02</span>
              {S.workKicker}
            </p>
            <h2 id="sk-h-work" className="b2-h2">
              {S.workH.a} <span className="b2-em">{S.workH.b}</span>
            </h2>
            <p className="sk-intent">{S.workIntent}</p>
            <p className="sk-sub">{S.workSub}</p>
            <p className="sk-more">
              <ActionLink href={S.workLink.href} variant="text">
                {S.workLink.label}
              </ActionLink>
            </p>
          </header>
          <ol className="sk-lines" data-reveal>
            {S.work.map((w, i) => (
              <li key={w.k}>
                <span className="sk-ln" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{w.k}</h3>
                  <p className="sk-ld">{w.d}</p>
                  {w.also && <p className="sk-also">{w.also}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03, Paper: the one case-study showcase (DEC-115), replacing the composed proof section. Same heading id (sk-h-proof); each case keeps its own
          figure, period and qualification; a case that is not published produces no card, and with none the section is not rendered. */}
      <CaseShowcase data={showcase} />

      {/* 04, Ground: how it runs. Four quiet steps; the monthly report and review call is the last. */}
      <section className="sk-act sk-ground sk-how" aria-labelledby="sk-h-how">
        <div className="pa-wrap">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>{nHow}</span>
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
          <div className="sk-how-n" data-reveal>
            <p className="sk-how-line">{S.howLine}</p>
            <p className="sk-sub">{S.howNote}</p>
            <p className="sk-more">
              <ActionLink href={S.howLink.href} variant="text">
                {S.howLink.label}
              </ActionLink>
            </p>
          </div>
        </div>
      </section>

      {/* 05, Paper: packages, comparison, audit, terms and exclusions (data: components/seo-packages/data.ts) */}
      <SeoPackages
        chapter={nPkg}
        copy={{ kicker: S.pkgKicker, h: S.pkgH, intro: S.pkgIntro, compareLabel: S.pkgCompareLabel, defHeading: S.pkgDefHeading, termsHeading: S.pkgTermsHeading, extraHeading: S.pkgExtraHeading, auditKicker: S.auditKicker, auditLead: S.auditLead, cta: S.pkgCta }}
      />

      {/* 06, Ground: native disclosures, closed on load (the approved FAQ pattern) */}
      <section className="sk-act sk-ground" aria-labelledby="sk-h-qs">
        <div className="pa-wrap sk-q">
          <header className="sk-head" data-reveal>
            <p className="sk-ch">
              <span>{nQs}</span>
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
