import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
  
  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1 },
    { url: '/services', changefreq: 'monthly', priority: 0.9 },
    { url: '/google-ads', changefreq: 'monthly', priority: 0.9 },
    { url: '/social-media-ads', changefreq: 'monthly', priority: 0.9 },
    { url: '/lead-generation', changefreq: 'monthly', priority: 0.9 },
    { url: '/seo', changefreq: 'monthly', priority: 0.9 },
    { url: '/conversion-optimization', changefreq: 'monthly', priority: 0.9 },
    { url: '/how-it-works', changefreq: 'monthly', priority: 0.8 },
    { url: '/results', changefreq: 'weekly', priority: 0.8 },
    { url: '/pricing', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/schedule-call', changefreq: 'monthly', priority: 0.7 },
    { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  ];

  // Dynamic blog posts
  const blogPosts = getBlogPosts().map((post) => ({
    url: `/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishedDate),
    changefreq: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic result/case study pages
  const caseStudies = [
    { url: '/results/saas-lead-gen', slug: 'saas-lead-gen' },
    { url: '/results/ecommerce-roas', slug: 'ecommerce-roas' },
    { url: '/results/b2b-sales', slug: 'b2b-sales' },
  ].map((item) => ({
    url: item.url,
    lastModified: new Date(),
    changefreq: 'monthly' as const,
    priority: 0.8,
  }));

  // Combine all pages
  const allPages = [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changefreq: page.changefreq as 'weekly' | 'monthly' | 'daily',
      priority: page.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: post.lastModified,
      changefreq: post.changefreq as 'weekly' | 'monthly' | 'daily',
      priority: post.priority,
    })),
    ...caseStudies.map((study) => ({
      url: `${baseUrl}${study.url}`,
      lastModified: study.lastModified,
      changefreq: study.changefreq as 'weekly' | 'monthly' | 'daily',
      priority: study.priority,
    })),
  ];

  return allPages;
}
