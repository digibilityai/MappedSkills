import Image from 'next/image';
import Link from 'next/link';
import { FAQSection } from '@/components/blog/FAQSection';
import { EdClose } from '@/components/editorial/EdClose';
import { EdMotion } from '@/components/editorial/EdMotion';
import { EdCover } from '@/components/editorial/EdCover';
import { OnThisPage } from '@/components/editorial/OnThisPage';
import { splitAfterMarker } from '@/lib/headline-emphasis';
import type { CmsBlogCard, CmsBlogPost } from '@/lib/contentful/types';
import type { ServiceCard } from '@/lib/services';
import { mainHeadings } from '@/lib/contentful/heading-ids';
import { ArticleRichText } from './ArticleRichText';
import { ArticleShare } from './ArticleShare';
import { ARTICLE as A } from './content';
import './article.css';
import '@/components/editorial/editorial.css';

/**
 * C+ blog article (`/blog/[slug]`), editorial direction R3 (owner-approved 2026-10-31). Deep-ink hero (topic, reading time and the recorded
 * Published or Updated date as chips; the recorded headline with the part after its first colon or bar in tangerine; the excerpt; the recorded
 * author), then one paper band: "On this page" (a static list on wide screens, one collapsed control below), the article's own image shown whole
 * when it has one, the unchanged rich text and FAQs, and the related service and share cards; then up to two related articles (same topic first,
 * then newest, `lib/blog-related.ts`) with the blog-index link; then the burnt close. Authors and dates are read from the article, nothing is
 * hard-coded, and the article's JSON-LD, metadata and wording are unchanged (the page file is untouched).
 */
export function ArticleBody({ post, services, related }: { post: CmsBlogPost; services: ServiceCard[]; related: CmsBlogCard[] }) {
  const contents = mainHeadings(post.tableOfContents);
  const updated = post.updatedAtISO && post.updatedDate && post.updatedDate !== post.publishedDate;
  const dateIso = updated ? post.updatedAtISO : post.publishedAtISO;
  const dateText = updated ? post.updatedDate : post.publishedDate;
  const hasDate = Boolean(dateText && dateText !== 'Draft');
  const head = splitAfterMarker(post.title);
  const c = A.close;
  const img = post.featuredImageUrl
    ? { url: post.featuredImageUrl, alt: post.featuredImageAlt !== post.title ? post.featuredImageAlt : '', w: post.featuredImageWidth || 1200, h: post.featuredImageHeight || 600 }
    : null;
  const keep = related.length === 2 ? A.keep.two : related.length === 1 ? A.keep.one : null;

  return (
    <>
      <section className="ed-hero ba-hero" aria-labelledby="ba-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb">
            <Link href="/">{A.crumb.home}</Link>
            <Link href="/blog">{A.crumb.blog}</Link>
            <span aria-current="page">{post.title}</span>
          </nav>
          <div className="ed-hg">
            <div className="ed-hl wide">
              <ul className="ed-chips" aria-label="About this article">
                {post.category ? (
                  <li>
                    <span className="ed-chip">{post.category}</span>
                  </li>
                ) : null}
                {post.readingTime ? (
                  <li>
                    <span className="ed-chip plain">{post.readingTime}</span>
                  </li>
                ) : null}
                {hasDate ? (
                  <li>
                    <span className="ed-chip plain">
                      {updated ? A.updated : A.published} <time dateTime={dateIso}>{dateText}</time>
                    </span>
                  </li>
                ) : null}
              </ul>
              <h1 id="ba-h1" className="long">
                {head.emphasis ? (
                  <>
                    {head.before}
                    <em>{head.emphasis}</em>
                  </>
                ) : (
                  post.title
                )}
              </h1>
              {post.excerpt ? <p className="ed-lede">{post.excerpt}</p> : null}
              <p className="ed-by">
                {A.by} <strong>{post.author.name}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-body" aria-label="Article">
        <div className="ed-w">
          <div className="ed-shell">
            <aside className="ed-rail">
              <OnThisPage items={contents.map((i) => ({ id: i.id, text: i.text, sub: i.level === 3 }))} label={A.contents} />
            </aside>
            <div className="ed-col ba-col">
              {img ? (
                <figure className="ed-stage">
                  <Image src={img.url} alt={img.alt} width={img.w} height={img.h} sizes="(min-width: 1081px) 700px, 100vw" priority />
                </figure>
              ) : null}
              <article aria-labelledby="ba-h1">{post.contentJson && <ArticleRichText document={post.contentJson} links={post.contentLinks} />}</article>
              {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} />}
              <div className="ed-sup">
                {services.length > 0 && (
                  <div className="ed-note">
                    <p className="ed-pk" id="ba-svc-l">
                      {A.related}
                    </p>
                    <p className="ed-svcs">
                      {services.map((s) => (
                        <Link key={s.link} href={s.link} aria-describedby="ba-svc-l">
                          {s.title}
                        </Link>
                      ))}
                    </p>
                  </div>
                )}
                <div className="ed-note">
                  <ArticleShare title={post.title} url={post.canonicalUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {keep ? (
        <section className="ed-band ba-more" aria-labelledby="ba-more-l">
          <div className="ed-w">
            <div className="ed-head">
              <div>
                <p className="ed-ch">
                  <span>02</span>
                  {A.keep.ch}
                </p>
                <h2 id="ba-more-l" className="ed-h2">
                  {keep.a} <em>{keep.b}</em>
                </h2>
              </div>
              <Link className="ed-link dk" href="/blog">
                {A.keep.all} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ul className="ed-grid ed-grid-2">
              {related.map((r) => (
                <li key={r.href}>
                  <article className="ed-card">
                    <div className="im">
                      {r.image ? <Image src={r.image.url} alt={r.image.alt !== r.title ? r.image.alt : ''} width={r.image.w} height={r.image.h} sizes="(min-width: 1081px) 640px, 100vw" /> : <EdCover topic={r.category} />}
                    </div>
                    <div className="t">
                      <p className="ey">
                        {[r.category, r.readingTime].filter(Boolean).map((m, i) => (
                          <span key={i}>{m}</span>
                        ))}
                      </p>
                      <h3>
                        <Link href={r.href}>{r.title}</Link>
                      </h3>
                      {r.excerpt ? <p className="x">{r.excerpt}</p> : null}
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
