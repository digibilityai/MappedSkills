import { MetadataRoute } from 'next';
import { getBlogListPosts } from '@/lib/contentful/posts';
import { getCaseStudyListCards } from '@/lib/contentful/case-studies';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';

  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1 },
    { url: '/services', changefreq: 'monthly', priority: 0.9 },
    { url: '/google-ads', changefreq: 'monthly', priority: 0.9 },
    { url: '/social-media-ads', changefreq: 'monthly', priority: 0.9 },
    { url: '/lead-generation', changefreq: 'monthly', priority: 0.9 },
    { url: '/seo', changefreq: 'monthly', priority: 0.9 },
    { url: '/conversion-optimization', changefreq: 'monthly', priority: 0.9 },
    { url: '/how-it-works', changefreq: 'monthly', priority: 0.8 },
    { url: '/work', changefreq: 'weekly', priority: 0.8 },
    { url: '/pricing', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/schedule-call', changefreq: 'monthly', priority: 0.7 },
    { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  ];

  const blogPosts = await getBlogListPosts();
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changefreq: 'monthly' as const,
    priority: 0.7,
  }));

  const caseStudies = await getCaseStudyListCards();
  const caseStudyEntries = caseStudies.map((study) => ({
    url: `${baseUrl}${study.href}`,
    lastModified: new Date(),
    changefreq: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changefreq: page.changefreq as 'weekly' | 'monthly' | 'daily',
      priority: page.priority,
    })),
    ...blogEntries,
    ...caseStudyEntries,
  ];
}
