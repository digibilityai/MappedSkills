import Image from 'next/image';
import Link from 'next/link';
import { EdClose } from '@/components/editorial/EdClose';
import { EdMotion } from '@/components/editorial/EdMotion';
import { EdCover } from '@/components/editorial/EdCover';
import type { CmsBlogCard } from '@/lib/contentful/types';
import { BLOG as B } from './content';
import '@/components/editorial/editorial.css';

/**
 * C+ Blog index (/blog), editorial direction R3 (owner-approved 2026-10-31): a deep-ink hero whose visual is the featured read, then one even
 * collection of the other articles on image-first cards, then the burnt close. The featured article is the real-estate developers guide (a fixed
 * slug; if it is not published, the first article leads), and it is not repeated in the collection. Each card shows the article's own image whole
 * (never stretched or cropped), or the typographic cover when it has none. Posts come from the unchanged `getBlogListPosts()` in its order; with none the page
 * says so and draws no placeholder cards. Server component, no client code.
 */
const meta = (p: CmsBlogCard) => [p.category, p.readingTime].filter(Boolean);
const altOf = (p: CmsBlogCard) => (p.image && p.image.alt !== p.title ? p.image.alt : '');

export function BlogBody({ posts }: { posts: CmsBlogCard[] }) {
  const has = posts.length > 0;
  const featured = posts.find((p) => p.slug === B.featured.slug) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const c = B.close;

  return (
    <>
      <section className="ed-hero" aria-labelledby="bl-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb">
            <Link href="/">Home</Link>
            <span aria-current="page">{B.crumb}</span>
          </nav>
          <div className="ed-hg">
            <div className="ed-hl">
              <p className="ed-k">{B.kicker}</p>
              <h1 id="bl-h1">
                {B.h1.a} <em>{B.h1.b}</em>
              </h1>
              <p className="ed-lede">{has ? B.lede : B.empty}</p>
            </div>
            {featured ? (
              <article className="ed-hr ed-feat" aria-labelledby="bl-feat-h">
                {featured.image ? (
                  <div className="ed-wipe">
                    <Image src={featured.image.url} alt={altOf(featured)} width={featured.image.w} height={featured.image.h} sizes="(min-width: 1081px) 640px, 100vw" priority />
                  </div>
                ) : (
                  <div className="ed-feat-cover">
                    <EdCover topic={featured.category} />
                  </div>
                )}
                <div className="t">
                  <p className="ed-pk">{[B.featured.kicker, ...meta(featured)].join(' · ')}</p>
                  <h2 id="bl-feat-h">
                    <Link href={featured.href}>{featured.title}</Link>
                  </h2>
                  {featured.excerpt ? <p className="x">{featured.excerpt}</p> : null}
                  <div className="ed-act">
                    <Link className="ed-btn" href={featured.href}>
                      {B.featured.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      {rest.length > 0 ? (
        <section className="ed-band" aria-labelledby="bl-list-l">
          <div className="ed-w">
            <div className="ed-head">
              <div>
                <p className="ed-ch">
                  <span>01</span>
                  {B.collection.ch}
                </p>
                <h2 id="bl-list-l" className="ed-h2">
                  {B.collection.a} <em>{B.collection.b}</em>
                </h2>
              </div>
              <p className="ed-ch">{B.count(posts.length)}</p>
            </div>
            <ul className="ed-grid">
              {rest.map((p) => (
                <li key={p.href}>
                  <article className="ed-card">
                    <div className="im">
                      {p.image ? <Image src={p.image.url} alt={altOf(p)} width={p.image.w} height={p.image.h} sizes="(min-width: 1081px) 420px, (min-width: 721px) 46vw, 100vw" /> : <EdCover topic={p.category} />}
                    </div>
                    <div className="t">
                      <p className="ey">
                        {meta(p).map((m, i) => (
                          <span key={i}>{m}</span>
                        ))}
                      </p>
                      <h3>
                        <Link href={p.href}>{p.title}</Link>
                      </h3>
                      {p.excerpt ? <p className="x">{p.excerpt}</p> : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <EdMotion />
      <EdClose id="b-close-h" h={c.h} body={c.body} primary={c.primary} secondary={c.secondary} />
    </>
  );
}
