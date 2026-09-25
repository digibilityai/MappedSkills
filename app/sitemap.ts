import { MetadataRoute } from 'next';
import { getBlogListPosts } from '@/lib/contentful/posts';
import { getCaseStudyListCards } from '@/lib/contentful/case-studies';

/**
 * SESSION 33 — PHASE I — the sitemap, rebuilt from the routes that are actually
 * indexable.
 *
 * ---------------------------------------------------------------------------
 * THE DEFECT THIS FIXES. The previous list contradicted the application's own
 * `robots` metadata:
 *
 *   · **`/work` was listed while the route sends `noindex, nofollow`.** That is
 *     a direct contradiction — a sitemap says "index this", the page says "do
 *     not" — and it is the one combination that reliably produces a Search
 *     Console error. `/work` is `noindex` because there are no published case
 *     studies and no permission to publish client results, which is a
 *     PROOF-POLICY decision, not an oversight. It is removed from the sitemap
 *     rather than the `noindex` being removed from the route.
 *
 *     **SUPERSEDED BY SEO-001 (GATE R4).** The proof policy has since changed:
 *     three permissioned case studies are published and the four unpermissioned
 *     ones were unpublished under GATE R1. `/work` is now indexable and is
 *     listed below. The contradiction this bullet describes is resolved in the
 *     other direction — both the route and the sitemap now say "index this".
 *
 *   · **Four live, indexable routes were missing** — `/ai-seo`,
 *     `/problems/traffic-but-no-enquiries`, `/privacy-policy` and `/terms`.
 *     The first two are launch content. The second two are `noindex` and so
 *     stay out; only the first two are added.
 *
 *   · **`changefreq` and `priority` were being emitted under the wrong keys.**
 *     Next's `MetadataRoute.Sitemap` reads `changeFrequency`, not `changefreq`,
 *     so every value was silently dropped. Rather than fix the spelling, BOTH
 *     ARE REMOVED: Google has stated it ignores both, they were invented
 *     numbers with no basis in how often these pages actually change, and a
 *     `priority: 0.9` that nothing acts on is noise the programme would have to
 *     keep maintaining honestly.
 *
 *   · **`lastModified: new Date()`** claimed every page changed at build time.
 *     It is removed for the same reason: it was not true, and a `lastmod` that
 *     is always "now" is worse than no `lastmod`, because a crawler that trusts
 *     it re-fetches pages that have not changed. Contentful entries keep no
 *     modification date in the list projections used here, so none is asserted
 *     for them either.
 *
 * ---------------------------------------------------------------------------
 * THE RULE THIS FILE NOW FOLLOWS: **a URL appears here only if the route it
 * points to sends an indexable `robots` directive.** Every exclusion below is
 * therefore checkable against the route's own `metadata`.
 *
 * EXCLUDED, AND WHY:
 *   `/thank-you`        `noindex, nofollow` — post-conversion, reachable by typing
 *   `/privacy-policy`   `noindex, nofollow`
 *   `/terms`            `noindex, nofollow`
 *   `/launch-checklist` `index: false` — internal
 *   404                 `noindex, nofollow`
 *   `/api/*`            not a content surface, and disallowed in `robots.ts`
 *
 * ---------------------------------------------------------------------------
 * CONTENTFUL ENTRIES ARE CONDITIONAL AND SELF-LIMITING. Both helpers fail soft
 * and return `[]` when Contentful is unconfigured or unreachable, so an outage
 * produces a smaller valid sitemap rather than a build failure or a list of
 * broken URLs. **At launch both are empty**, which is why no blog post or case
 * study URL is hard-coded here and none is invented.
 *
 * ✅ THE OWNER NOTE THIS FILE CARRIED IS NOW RESOLVED. It read: `/work` is
 * `noindex` while `/portfolio/[slug]` is indexable — harmless while no case
 * study exists, but **the first published case study makes an indexable page
 * whose only hub is `noindex`**, and at that point `/work`'s `noindex` must be
 * revisited in the same change. That is exactly what happened: three
 * permissioned studies are live and indexed, so SEO-001 (GATE R4) removed the
 * `noindex` from `app/(pages)/work/page.tsx` and added `/work` here, in one
 * commit, as the note required.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';

  /** Every route in this application whose own metadata says it is indexable. */
  const indexablePaths = [
    '/',
    // Proposition and capability routes
    '/services',
    '/seo',
    '/ai-seo',
    '/google-ads',
    '/social-media-ads',
    '/lead-generation',
    '/conversion-optimization',
    // Diagnostic, method, cost
    '/problems/traffic-but-no-enquiries',
    '/how-it-works',
    '/pricing',
    // The firm, questions, and the two enquiry surfaces
    '/about',
    '/faq',
    '/contact',
    '/schedule-call',
    // Case-study hub. SEO-001 (GATE R4): indexable now that the three
    // permissioned studies are published and the four unpermissioned ones are
    // unpublished. It is the only hub for the indexable `/portfolio/[slug]`
    // pages listed below.
    '/work',
    // Editorial index. Kept even while empty: it is indexable, it renders an
    // honest empty state rather than a broken shell, and it is linked from the
    // footer.
    '/blog',
  ];

  const [blogPosts, caseStudies] = await Promise.all([
    getBlogListPosts(),
    getCaseStudyListCards(),
  ]);

  return [
    ...indexablePaths.map((path) => ({ url: `${baseUrl}${path}` })),
    ...blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}` })),
    ...caseStudies.map((study) => ({ url: `${baseUrl}${study.href}` })),
  ];
}
