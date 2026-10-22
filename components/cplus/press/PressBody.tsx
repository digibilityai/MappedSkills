import Link from 'next/link';
import { CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { siteMetadata } from '@/lib/metadata';
import type { CmsPressCard } from '@/lib/contentful/types';
import { Breadcrumb } from '../Breadcrumb';
import { PRESS as S } from './content';
import './press.css';

/**
 * C+ Press (/press): the owner-approved G1 design (docs/press-redesign/g1/). Hero → latest news (an honest empty state,
 * else one dated row per release) → background links → the media enquiry close. Server component, no client JavaScript.
 * The media address is the existing one (`siteMetadata.email`), confirmed by the owner as the final media contact.
 */
export function PressBody({ releases }: { releases: CmsPressCard[] }) {
  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(S.media.subject)}`;
  return (
    <>
      {/* 1: hero (ivory) */}
      <section className="b-hero pr-hero" aria-labelledby="pr-h1">
        <div className="px-wrap">
          <Breadcrumb current={S.crumb} />
          <div className="pr-hero-g">
            <h1 id="pr-h1" className="b-h1 pr-h1">
              {S.hero.h1.a} <span className="b-named">{S.hero.h1.b}</span>
            </h1>
            <div>
              <p className="b-lede pr-lede">{S.hero.lede}</p>
              <p className="pr-desk">
                <span className="pr-label">{S.hero.contact}</span>
                <a className="pr-mail" href={mailto}>
                  {siteMetadata.email}
                </a>
                <a className="pr-go" href={`#${S.media.id}`}>
                  <span className="pr-go-t">{S.hero.reach}</span> <span aria-hidden="true">↓</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2: latest news (paper) */}
      <section className="b-sec b-paper pr-news" aria-labelledby="pr-h-news">
        <div className="px-wrap">
          <p className="b-kicker">{S.news.kicker}</p>
          <h2 id="pr-h-news" className="b-h2 pr-h2">
            {S.news.h}
          </h2>
          {releases.length > 0 ? (
            <ol className="pr-list">
              {releases.map((r) => (
                <li key={r.slug} className="pr-row">
                  <p className="pr-date">{r.publishedDate}</p>
                  <div>
                    <h3 className="pr-row-h">
                      <Link href={r.href}>{r.headline}</Link>
                    </h3>
                    {r.excerpt ? <p className="pr-row-x">{r.excerpt}</p> : null}
                  </div>
                  <span className="pr-row-a" aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="pr-empty">
              <p className="pr-empty-h">{S.news.empty.h}</p>
              <p className="pr-empty-b">{S.news.empty.body}</p>
              <p className="pr-empty-b">{S.news.empty.until}</p>
              <Link className="pr-go" href="/research">
                <span className="pr-go-t">{S.news.empty.link}</span> <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3: background (ivory) */}
      <section className="b-sec pr-bg" aria-labelledby="pr-h-bg">
        <div className="px-wrap">
          <p className="b-kicker">{S.background.kicker}</p>
          <h2 id="pr-h-bg" className="b-h2 pr-h2">
            {S.background.h.a} <span className="b-named">{S.background.h.b}</span>
          </h2>
          <ul className="pr-tiles">
            {S.background.tiles.map((t) => (
              <li key={t.href} className="pr-tile">
                <p className="pr-label">{t.label}</p>
                <h3 className="pr-tile-h">
                  <Link href={t.href}>{t.title}</Link>
                </h3>
                <p className="pr-tile-d">{t.body}</p>
                <span className="pr-tile-a" aria-hidden="true">
                  {t.cta}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4: media enquiry close (tangerine, the shared C+ close) */}
      <section className="b-close pr-close" id={S.media.id} aria-labelledby="pr-h-media" tabIndex={-1}>
        <div className="px-wrap b-close-in">
          <div>
            <h2 id="pr-h-media" className="b-h2">
              {S.media.h}
            </h2>
            <p className="b-lede">{S.media.body}</p>
            <p className="pr-close-mail">
              <a href={mailto}>{siteMetadata.email}</a>
            </p>
          </div>
          <div className="dc-actions">
            <a className="dc-btn dc-btn-primary" href={mailto}>
              <Mark />
              {S.media.primary}
            </a>
            <Link className="dc-btn dc-btn-secondary" href={CONTACT_HREF}>
              {S.media.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
