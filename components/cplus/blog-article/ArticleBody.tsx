import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { FAQSection } from '@/components/blog/FAQSection';
import type { CmsBlogCard, CmsBlogPost } from '@/lib/contentful/types';
import type { ServiceCard } from '@/lib/services';
import { mainHeadings } from '@/lib/contentful/heading-ids';
import { ArticleRichText } from './ArticleRichText';
import { ArticleShare } from './ArticleShare';
import { ARTICLE as A } from './content';
import '../blog/blog.css';
import './article.css';

/**
 * C+ blog article (`/blog/[slug]`): the owner-approved BL-D6 G1 design (docs/blog-redesign/bl-d6/g1/mockup/), as a
 * server component. Only the share line's "Copy link" is client code.
 *
 *   A. hero (ground): breadcrumb, category · reading time, title, excerpt, verified byline (Contentful author name and
 *      dates only — no avatar, role or generated bio);
 *   B. article (paper): 3 px ink rule; a sticky contents rail at ≥1081 px, a closed "In this article" panel below; the
 *      reading column; the approved related-service link(s) (`lib/blog-services.ts`, unchanged) and the share line;
 *   C. more on this topic (ground): same-category articles as the approved `/blog` rows — only when there are any;
 *   D. the shared tangerine close with the approved `/blog` copy — the ONE conversion section.
 *
 * Removed against the legacy template: the TOC card, in-body CTA card, sticky sidebar CTA and its service card, the
 * "Need Help With This?" card grid, the author card and cartoon avatar, the dead newsletter block and the final CTA band.
 * Contentful wording is rendered unchanged.
 */
export function ArticleBody({
  post,
  services,
  related,
}: {
  post: CmsBlogPost;
  services: ServiceCard[];
  related: CmsBlogCard[];
}) {
  const contents = mainHeadings(post.tableOfContents);
  const hasContents = contents.length >= 2;
  const showsH3 = contents.some((i) => i.level === 3);
  const updated = post.updatedAtISO && post.updatedDate && post.updatedDate !== post.publishedDate;
  const dateIso = updated ? post.updatedAtISO : post.publishedAtISO;
  const dateText = updated ? post.updatedDate : post.publishedDate;
  const c = A.close;

  const list = (
    <ol className="ba-toc">
      {contents.map((item) => (
        <li key={item.id} className={showsH3 && item.level === 3 ? 'ba-l3' : undefined}>
          <a href={`#${item.id}`}>{item.text}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* A: hero (ground) */}
      <section className="b-hero ba-hero" aria-labelledby="ba-h1">
        <div className="px-wrap">
          <nav aria-label="Breadcrumb" className="b-crumb">
            <ol>
              <li>
                <Link href="/">{A.crumb.home}</Link>
              </li>
              <li>
                <span aria-hidden="true">/</span> <Link href="/blog">{A.crumb.blog}</Link>
              </li>
              <li>
                <span aria-hidden="true">/</span> <span aria-current="page">{post.title}</span>
              </li>
            </ol>
          </nav>
          {(post.category || post.readingTime) && (
            <p className="b-kicker">
              {[post.category, post.readingTime].filter(Boolean).join(' · ')}
            </p>
          )}
          <h1 id="ba-h1" className="ba-h1">
            {post.title}
          </h1>
          {post.excerpt && <p className="b-lede ba-lede">{post.excerpt}</p>}
          <p className="ba-by">
            {A.by} <strong>{post.author.name}</strong>
            {dateText && dateText !== 'Draft' && (
              <>
                {' · '}
                {updated ? A.updated : A.published} <time dateTime={dateIso}>{dateText}</time>
              </>
            )}
          </p>
        </div>
      </section>

      {/* B: article (paper) */}
      <section className="ba-body" aria-label="Article">
        <div className="px-wrap">
          <div className="ba-rule" />
          <div className="ba-grid">
            {hasContents && (
              <nav className="ba-rail" aria-labelledby="ba-toc-l">
                <p id="ba-toc-l" className="ba-toc-l">
                  {A.contents}
                </p>
                {list}
              </nav>
            )}
            <div className="ba-col">
              {hasContents && (
                <details className="ba-tocm">
                  <summary>
                    {A.contents} <span className="ba-n">{A.sections(contents.length)}</span>
                  </summary>
                  <nav aria-label={A.contents}>{list}</nav>
                </details>
              )}
              <article aria-labelledby="ba-h1">
                {post.contentJson && <ArticleRichText document={post.contentJson} links={post.contentLinks} />}
              </article>
              {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} />}
              <div className="ba-after">
                {services.length > 0 && (
                  <div className="ba-line">
                    <span className="ba-line-l" id="ba-svc-l">
                      {A.related}
                    </span>
                    <span className="ba-svcs">
                      {services.map((s) => (
                        <Link key={s.link} href={s.link} className="ba-go" aria-describedby="ba-svc-l">
                          {s.title}
                        </Link>
                      ))}
                    </span>
                  </div>
                )}
                <ArticleShare title={post.title} url={post.canonicalUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C: more on this topic (ground) — same-category articles, as the approved /blog rows */}
      {related.length > 0 && (
        <section className="ba-more" aria-labelledby="ba-more-l">
          <div className="px-wrap">
            <h2 id="ba-more-l" className="bl-count">
              {A.more}
            </h2>
            <ul className="bl-list">
              {related.map((r) => (
                <li key={r.href} className="bl-row">
                  <Link href={r.href} className="bl-link">
                    <span className="bl-meta">
                      {r.category && <span className="bl-cat">{r.category}</span>}
                      {r.category && r.readingTime && (
                        <span className="bl-sep" aria-hidden="true">
                          {' · '}
                        </span>
                      )}
                      {r.readingTime && <span className="bl-rt">{r.readingTime}</span>}
                    </span>
                    <span className="bl-main">
                      <span className="bl-t">{r.title}</span>
                      {r.excerpt && <span className="bl-x">{r.excerpt}</span>}
                      <span className="bl-go" aria-hidden="true">
                        {A.read}
                      </span>
                    </span>
                    <span className="bl-arw" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* D: close (shared tangerine close, approved /blog copy) */}
      <section className="b-close ba-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <h2 id="b-close-h" className="b-h2">
                {c.h}
              </h2>
              <p className="b-lede">{c.body}</p>
            </div>
            <ActionPair primaryLabel={c.primary} secondaryLabel={c.secondary} />
          </div>
        </div>
      </section>
    </>
  );
}
