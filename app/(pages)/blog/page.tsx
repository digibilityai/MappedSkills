import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { BlogBody } from '@/components/cplus/blog/BlogBody';
import { getBlogListPosts } from '@/lib/contentful/posts';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

/**
 * `/blog`: the owner-approved G1 blog index design (docs/blog-redesign/g1/BL_G1_NOTES.md, mockup/). The URL, title,
 * canonical and robots are unchanged; the description is the approved BL-D3 wording (the old one described two subjects
 * the published articles do not cover). Posts come from Contentful through the unchanged `getBlogListPosts()`, in the
 * order it returns them; with none, the page says so and renders no placeholder rows. No structured data is added or
 * removed. `/blog/[slug]` and every article component are untouched. The Direction C header and footer come from the
 * root layout.
 */
export const metadata = createMetadata(
  'Writing | MappedSkills',
  'Practical guides on search, paid ads, content and turning website visits into enquiries, written for business owners.',
  '/blog'
);

export default async function BlogPage() {
  const posts = await getBlogListPosts();

  return (
    <CplusPage>
      <BlogBody posts={posts} />
    </CplusPage>
  );
}
