import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body, Note } from '@/components/commercial/primitives';
import { RouteHero, EntryList } from '@/components/routes/primitives';
import { getBlogListPosts } from '@/lib/contentful/posts';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

/**
 * SESSION 29 — PHASE G — `/blog`. ARCHETYPE 9 — index.
 *
 * THIS ROUTE IS CONDITIONAL AND ITS CONDITION IS NOT SATISFIED.
 * `PAGE_COPY_INDEX.md` §4 classifies `/blog` as CONDITIONAL; `copy/blog-index.md`
 * §2 states the condition in terms: "This page does not publish until at least
 * three exist; fewer than three reads as abandoned." The three approved launch
 * articles were never written — `PAGE_COPY_INDEX.md` §1 rows 16, 17 and 18
 * record all three as NOT DRAFTED, out of Session 11 scope — and Phase G does
 * not write them, because writing three articles is editorial production, not
 * route translation.
 *
 * SO THE INDEX COPY DOES NOT PUBLISH, AND NOTHING PRETENDS IT HAS. The two
 * approved cluster descriptions and the approved hero line ("a deliberately
 * small set of pieces on two subjects") describe articles that do not exist, so
 * they render only when articles do. There is no article card, no stub, no
 * placeholder, no skeleton, no invented date, no invented author, no invented
 * category and no "coming soon" entry. `EntryList` has no empty-slot rendering
 * path, so it cannot produce one.
 *
 * WHY THE ROUTE IS TRANSLATED RATHER THAN LEFT ALONE. It already returns HTTP
 * 200 and is already in the navigation, so "defer" does not mean "absent" here
 * — it means the legacy page stays live. That page carried five invented topic
 * clusters promising "improve ROI", "ROAS improvement" and "ranking
 * improvement", plus `FAQPage` markup for questions about a body of content
 * that does not exist. Retaining the route while removing the fabrication is
 * the "retain partially" treatment, and it is strictly more honest than leaving
 * it.
 *
 * THE LISTING ARCHITECTURE IS REAL AND DATA-DRIVEN. Where the CMS returns
 * posts, they render as hairline rows with their real date and cluster —
 * archetype 9's "hairline rows, not card grids" — and the standing statement
 * gives way to them. Nothing here has to be rewritten when the articles land.
 *
 * DEFERRED, NOT DONE HERE: `/blog/[slug]` is untouched. There is no article to
 * render through it, its bylines are owner-blocked, and pagination before the
 * CMS's 100-item ceiling is a Phase I item. The route's presence in
 * `app/sitemap.ts` is likewise not changed — sitemap work is out of Phase G
 * scope — and an indexable index with nothing on it is recorded for Phase I.
 *
 * F1: D — NONE. No figure on this route.
 */
export const metadata = createMetadata(
  'Writing | MappedSkills',
  'Pieces on why websites receive visits and not enquiries, and on how buyers find suppliers through AI-assisted search.',
  '/blog'
);

export default async function BlogPage() {
  const posts = await getBlogListPosts();

  return (
    <>
      <RouteHero
        eyebrow="Writing"
        title={<>Writing</>}
        lede={
          posts.length > 0 ? (
            <>
              A deliberately small set of pieces on two subjects: why websites receive visits and not
              enquiries, and how buyers are finding suppliers through AI-assisted search.
            </>
          ) : (
            <>Nothing is published here yet.</>
          )
        }
      >
        {posts.length > 0 ? (
          <p>
            Where something rests on a measurement we ran, it links to the measurement rather than restating
            it.
          </p>
        ) : null}
      </RouteHero>

      {posts.length > 0 ? (
        <CommercialSection tone="paper" mode="reverse">
          <ChapterLabel>Articles</ChapterLabel>
          <EntryList
            entries={posts.map((post) => ({
              href: post.href,
              title: post.title,
              meta: [post.category, post.publishedDate].filter(Boolean).join(' · '),
              summary: post.excerpt,
            }))}
          />
        </CommercialSection>
      ) : (
        <CommercialSection tone="paper" mode="split">
          <ChapterLabel>What will be here</ChapterLabel>
          <Display>Two subjects, and no archive.</Display>
          <Body>
            Why websites receive visits and not enquiries, and how buyers are finding suppliers through
            AI-assisted search. Two clusters, because that is what this firm has genuinely done work on
            &mdash; not a category taxonomy larger than the content it organises.
          </Body>
          <Note>
            No article card, stub or placeholder appears above, and no publishing cadence is promised. Both
            subjects already have pages that stand on their own:{' '}
            <Link
              href="/problems/traffic-but-no-enquiries"
              className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
            >
              the five checks for traffic that does not become enquiries
            </Link>{' '}
            and{' '}
            <Link href="/ai-seo" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
              what determines whether a business appears in AI answers
            </Link>
            .
          </Note>
        </CommercialSection>
      )}
    </>
  );
}
