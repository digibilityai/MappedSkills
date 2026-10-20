import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import type { CmsBlogCard } from '@/lib/contentful/types';
import { Breadcrumb } from '../Breadcrumb';
import { BLOG as B } from './content';
import './blog.css';

/**
 * C+ Blog index (/blog): the owner-approved G1 design (docs/blog-redesign/g1/mockup/) as a server component with no
 * client code. Three sections: hero; the article list (hairline rows, the whole row is the link, in Contentful order);
 * the shared tangerine close. With no posts the list is not rendered and the lede is the live "Nothing is published here
 * yet." (no placeholder rows). Row data is the Contentful listing data unchanged; a missing excerpt renders nothing.
 */
export function BlogBody({ posts }: { posts: CmsBlogCard[] }) {
  const has = posts.length > 0;
  const c = B.close;
  return (
    <>
      {/* A: hero (ground) */}
      <section className="b-hero bl-hero" aria-labelledby="bl-h1">
        <div className="px-wrap">
          <Breadcrumb current={B.crumb} />
          <p className="b-kicker">{B.kicker}</p>
          <h1 id="bl-h1" className="b-h1 bl-h1">
            <span>{B.h1.a}</span> <span className="b-named">{B.h1.b}</span>
          </h1>
          <p className="b-lede bl-lede">{has ? B.lede : B.empty}</p>
        </div>
      </section>

      {/* B: the list (paper) */}
      {has && (
        <section className="bl-body" aria-labelledby="bl-list-l">
          <div className="px-wrap">
            <h2 id="bl-list-l" className="bl-count">
              {B.count(posts.length)}
            </h2>
            <ul className="bl-list">
              {posts.map((post) => (
                <li key={post.href} className="bl-row">
                  <Link href={post.href} className="bl-link">
                    <span className="bl-meta">
                      {post.category && <span className="bl-cat">{post.category}</span>}
                      {post.category && post.readingTime && (
                        <span className="bl-sep" aria-hidden="true">
                          {' · '}
                        </span>
                      )}
                      {post.readingTime && <span className="bl-rt">{post.readingTime}</span>}
                    </span>
                    <span className="bl-main">
                      <span className="bl-t">{post.title}</span>
                      {post.excerpt && <span className="bl-x">{post.excerpt}</span>}
                      <span className="bl-go" aria-hidden="true">
                        {B.read}
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

      {/* C: close (shared tangerine close) */}
      <section className="b-close bl-close" aria-labelledby="b-close-h">
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
