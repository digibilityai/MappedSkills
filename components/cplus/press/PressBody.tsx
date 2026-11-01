import Image from 'next/image';
import Link from 'next/link';
import { EdClose } from '@/components/editorial/EdClose';
import { EdMotion } from '@/components/editorial/EdMotion';
import { siteMetadata } from '@/lib/metadata';
import type { CmsPressCard } from '@/lib/contentful/types';
import type { Figure } from '@/components/cplus/press-release/release-rules';
import { RELEASE as R } from '@/components/cplus/press-release/content';
import { PRESS as S } from './content';
import '@/components/editorial/editorial.css';

/**
 * C+ Press (/press), editorial direction R3 (owner-approved 2026-10-31): a deep-ink newsroom hero whose visual is the latest announcement (its own
 * release graphic whole, date, headline, summary, one button), compact dated records for any earlier releases, compact background records, and the
 * burnt media enquiry close. With no release the hero says so honestly and points to the research. Server component, no client code. The media address is
 * the existing one (`siteMetadata.email`), confirmed by the owner as the final media contact.
 */
export function PressBody({ releases, figures = [] }: { releases: CmsPressCard[]; figures?: Figure[] }) {
  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(S.media.subject)}`;
  const [lead, ...earlier] = releases;
  const hasFigs = Boolean(lead) && figures.length > 0;
  let n = 0;
  const ch = () => String(++n).padStart(2, '0');
  const tone = (i: number) => (i % 2 === 0 ? 'ed-band paper' : 'ed-band');
  let band = 0;
  return (
    <>
      <section className="ed-hero" aria-labelledby="pr-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb">
            <Link href="/">Home</Link>
            <span aria-current="page">{S.crumb}</span>
          </nav>
          <div className="ed-hg">
            <div className="ed-hl">
              <p className="ed-k">{S.hero.kicker}</p>
              <h1 id="pr-h1">
                {S.hero.h1.a} <em>{S.hero.h1.b}</em>
              </h1>
              <p className="ed-lede">{S.hero.lede}</p>
              <div className="ed-act">
                <a className="ed-btn" href={mailto}>
                  {S.latest.desk}
                </a>
                <a className="ed-link" href={mailto}>
                  {siteMetadata.email}
                </a>
              </div>
            </div>
            {lead ? (
              <article className="ed-hr ed-feat ed-ann" aria-labelledby="pr-lead-h">
                {lead.image ? (
                  <div className="ed-shot ed-wipe">
                    <Image src={lead.image.url} alt={lead.image.alt} width={lead.image.w} height={lead.image.h} sizes="(min-width: 1081px) 640px, 100vw" priority />
                  </div>
                ) : null}
                <div className="t">
                  <p className="ed-pk">
                    {S.latest.k} · <time>{lead.publishedDate}</time>
                  </p>
                  <h2 id="pr-lead-h">
                    <Link href={lead.href}>{lead.headline}</Link>
                  </h2>
                  {lead.excerpt ? <p className="x">{lead.excerpt}</p> : null}
                  <div className="ed-act">
                    <Link className="ed-btn" href={lead.href}>
                      {S.latest.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <div className="ed-hr ed-panel">
                <p className="ed-pk">{S.news.kicker}</p>
                <h2>{S.news.empty.h}</h2>
                <p className="x">{S.news.empty.body}</p>
                <p className="x">{S.news.empty.until}</p>
                <div className="ed-act">
                  <Link className="ed-btn" href="/research">
                    {S.news.empty.link}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {hasFigs && lead ? (
        <section className={tone(band++)} aria-labelledby="pr-h-figs">
          <div className="ed-w">
            <div className="ed-head">
              <div>
                <p className="ed-ch">
                  <span>{ch()}</span>
                  {S.figures.kicker}
                </p>
                <h2 id="pr-h-figs" className="ed-h2">
                  {S.figures.h.a} <em>{S.figures.h.b}</em>
                </h2>
                <p className="ed-dek">{S.figures.dek}</p>
              </div>
              <Link className="ed-link dk" href={lead.href}>
                {S.figures.link} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ol className="ed-figs">
              {figures.map((f, i) => (
                <li key={`${f.id}-${i}`}>
                  <p className="ed-fig v">{f.statistic}</p>
                  <h3 className="c">{f.headline}</h3>
                  {f.description ? <p className="d">{f.description}</p> : null}
                  {f.baseSample || f.sourceNote ? (
                    <p className="s">
                      {f.baseSample ? (
                        <>
                          <b>{R.evidence.sample}</b> {f.baseSample}{' '}
                        </>
                      ) : null}
                      {f.sourceNote ? (
                        <>
                          <b>{R.evidence.source}</b> {f.sourceNote}
                        </>
                      ) : null}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {earlier.length > 0 ? (
        <section className={tone(band++)} aria-labelledby="pr-h-news">
          <div className="ed-w">
            <div className="ed-head">
              <div>
                <p className="ed-ch">
                  <span>{ch()}</span>
                  {S.earlier.ch}
                </p>
                <h2 id="pr-h-news" className="ed-h2">
                  {S.earlier.a} <em>{S.earlier.b}</em>
                </h2>
              </div>
            </div>
            <ol className="ed-rec">
              {earlier.map((r) => (
                <li key={r.slug}>
                  <Link href={r.href}>
                    <p className="ty">
                      {S.news.kicker}
                      <small>{r.publishedDate}</small>
                    </p>
                    <div>
                      <h3>{r.headline}</h3>
                      {r.excerpt ? <p>{r.excerpt}</p> : null}
                    </div>
                    <span className="ar" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className={tone(band++)} aria-labelledby="pr-h-bg">
        <div className="ed-w">
          <div className="ed-head">
            <div>
              <p className="ed-ch">
                <span>{ch()}</span>
                {S.background.kicker}
              </p>
              <h2 id="pr-h-bg" className="ed-h2">
                {S.background.h.a} <em>{S.background.h.b}</em>
              </h2>
            </div>
          </div>
          <ul className="ed-rec">
            {S.background.tiles.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>
                  <p className="ty">{t.label}</p>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </div>
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EdMotion />
      <EdClose id="pr-h-media" h={S.media.h} body={S.media.body} primary={S.media.primary} secondary={S.media.secondary} primaryHref={mailto} />
    </>
  );
}
