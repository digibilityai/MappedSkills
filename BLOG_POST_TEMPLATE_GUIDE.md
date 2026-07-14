# MappedSkills Individual Blog Post Template

## Overview

The Individual Blog Post Template is a complete, production-ready system for creating SEO-optimized, conversion-focused blog articles for MappedSkills Marketing. Each post targets specific keywords, provides real value to readers, and seamlessly guides visitors toward audit bookings, service exploration, or newsletter signups.

## Architecture

### File Structure
```
/vercel/share/v0-project/
├── app/(pages)/blog/
│   ├── page.tsx (Blog listing page)
│   └── [slug]/
│       └── page.tsx (Dynamic blog post route)
├── components/blog/
│   ├── BlogHero.tsx (Post header with metadata)
│   ├── BlogIntroduction.tsx (Hook, problem, promise)
│   ├── TableOfContents.tsx (Interactive TOC)
│   ├── CTABlock.tsx (In-article CTAs)
│   ├── StickySidebarCTA.tsx (Sticky sidebar)
│   ├── RelatedPosts.tsx (Related articles)
│   ├── RelatedServices.tsx (Related services)
│   ├── AuthorBio.tsx (Author information)
│   ├── FAQSection.tsx (FAQ accordion)
│   ├── SocialShare.tsx (Social sharing)
│   └── ContentBlock.tsx (Tip, warning, formula, checklist blocks)
├── lib/
│   └── blog-data.ts (Blog post data structure and sample data)
└── public/images/
    └── blog-google-ads-roi.png (Sample blog hero image)
```

## Data Structure

### BlogPost Interface
Each blog post is defined using the `BlogPost` interface in `/lib/blog-data.ts`:

```typescript
interface BlogPost {
  slug: string;                    // URL slug: 'how-to-calculate-google-ads-roi'
  title: string;                   // Article title
  metaTitle: string;               // SEO title (60 chars max)
  metaDescription: string;         // SEO description (150-160 chars)
  primaryKeyword: string;          // Main target keyword
  secondaryKeywords: string[];     // Supporting keywords
  category: BlogCategory;          // Google Ads, Social Media Ads, SEO, etc.
  excerpt: string;                 // 1-2 line summary for listings
  author: string;                  // Author name
  publishedDate: string;           // Publication date
  updatedDate: string;             // Last update date
  readingTime: string;             // e.g., '6 min read'
  heroImage: string;               // Hero image path
  heroImageAlt: string;            // Image alt text
  introduction: {                  // Hook, problem, promise structure
    hook: string;
    problem: string;
    promise: string;
  };
  tableOfContents: string[];       // H2 section titles (auto-linked)
  content: string;                 // Main article content (HTML or markdown)
  ctaType: CTAType;                // CTA variant: google-ads, social-ads, lead-gen, seo, cro, generic
  relatedServices: string[];       // Service page links
  relatedPostSlugs: string[];      // Related blog post slugs
  faqs: BlogFAQ[];                 // FAQ Q&A pairs
  openGraphTitle: string;          // Social share title
  openGraphDescription: string;    // Social share description
  openGraphImage: string;          // Social share image
  canonicalUrl: string;            // Canonical URL
}
```

### Adding a New Blog Post

1. Open `/lib/blog-data.ts`
2. Add new entry to `BLOG_POSTS_DATA` object:

```typescript
export const BLOG_POSTS_DATA: Record<string, BlogPost> = {
  'your-article-slug': {
    slug: 'your-article-slug',
    title: 'Your Article Title: Main Keyword Target',
    metaTitle: 'Your Article Title | MappedSkills',
    metaDescription: 'Brief description under 160 chars that includes your main keyword.',
    primaryKeyword: 'your main keyword',
    secondaryKeywords: ['keyword 1', 'keyword 2'],
    category: 'Google Ads', // or other category
    excerpt: 'Short excerpt for blog listing.',
    author: 'Amit Gupta',
    publishedDate: 'May 28, 2026',
    updatedDate: 'May 28, 2026',
    readingTime: '7 min read',
    heroImage: '/images/blog-your-slug.png',
    heroImageAlt: 'Descriptive alt text for the hero image',
    introduction: {
      hook: 'Opening statement about the problem.',
      problem: 'Explain why this matters to business owners.',
      promise: 'Tell readers what they will learn.',
    },
    tableOfContents: [
      'Section 1 Title',
      'Section 2 Title',
      'Section 3 Title',
      // ... more sections
    ],
    content: `Article body content here...`,
    ctaType: 'google-ads', // or 'social-ads', 'lead-gen', 'seo', 'cro', 'generic'
    relatedServices: ['/google-ads', '/conversion-optimization'],
    relatedPostSlugs: ['other-article-slug-1', 'other-article-slug-2'],
    faqs: [
      {
        question: 'Your first FAQ question?',
        answer: 'Your answer goes here.',
      },
      // ... more FAQs
    ],
    openGraphTitle: 'Article Title for Social Media Sharing',
    openGraphDescription: 'Description that appears when shared on social platforms',
    openGraphImage: '/images/blog-your-slug.png',
    canonicalUrl: 'https://mappedskills.com/blog/your-article-slug',
  },
};
```

3. The blog post will automatically appear at: `/blog/your-article-slug`

## Components

### BlogHero
**Location:** `/components/blog/BlogHero.tsx`

Renders the blog post header including:
- Breadcrumb navigation (Home > Blog > Title)
- Category badge
- H1 article title
- Author, publish date, update date, reading time
- Author avatar

**Props:**
- `title: string` - Article title
- `category: string` - Category name
- `author: string` - Author name
- `publishedDate: string` - Publication date
- `updatedDate: string` - Last update date
- `readingTime: string` - e.g., "6 min read"
- `heroImage: string` - Image path
- `heroImageAlt: string` - Image alt text

### BlogIntroduction
**Location:** `/components/blog/BlogIntroduction.tsx`

Renders the article introduction section:
- Hook (opening problem statement)
- Problem expansion
- Promise (what readers will learn)
- Styled in a highlighted card

**Props:**
- `hook: string` - Opening statement
- `problem: string` - Problem expansion
- `promise: string` - Learning promise

### TableOfContents
**Location:** `/components/blog/TableOfContents.tsx`

Interactive table of contents with:
- Numbered list of all H2 sections
- Auto-linking to section anchors
- Desktop/mobile responsive display

**Props:**
- `items: string[]` - Section titles from tableOfContents array

### CTABlock
**Location:** `/components/blog/CTABlock.tsx`

In-article CTA blocks that appear after important sections:
- Headline
- Copy text
- Button link
- Accent styling

**Variants by ctaType:**
- `'google-ads'` - Google Ads audit CTA
- `'social-ads'` - Social ads audit CTA
- `'lead-gen'` - Lead generation audit CTA
- `'seo'` - SEO audit CTA
- `'cro'` - Conversion optimization audit CTA
- `'generic'` - Strategy call CTA

**Usage:**
```tsx
import { CTABlockFromType } from '@/components/blog/CTABlock';

<CTABlockFromType ctaType="google-ads" />
```

### StickySidebarCTA
**Location:** `/components/blog/StickySidebarCTA.tsx`

Sticky sidebar visible on desktop only:
- Main strategy call CTA
- Related service card
- Newsletter signup integration
- "Sticky" positioning while scrolling article

**Props:**
- `ctaHeadline: string` - CTA headline
- `ctaLink: string` - Button link
- `relatedService: object` - Service card details

### RelatedPosts
**Location:** `/components/blog/RelatedPosts.tsx`

Displays 3 related blog posts at bottom of article:
- Article cards with category, title, excerpt
- Reading time
- Links to posts

**Props:**
- `posts: RelatedPost[]` - Array of related post data

### RelatedServices
**Location:** `/components/blog/RelatedServices.tsx`

Shows 3 relevant service pages based on article category:
- Service title
- Service description
- "Learn More" link

**Props:**
- `services: RelatedService[]` - Array of service data

**Auto-mapping by category:**
- Google Ads → Google Ads, Conversion Optimization, Lead Generation
- Social Media Ads → Social Ads, Lead Generation, Conversion Optimization
- Lead Generation → Lead Generation, Google Ads, SEO
- SEO → SEO, Lead Generation, Conversion Optimization
- Conversion Optimization → CRO, Google Ads, Lead Generation

### AuthorBio
**Location:** `/components/blog/AuthorBio.tsx`

Author information section:
- Author avatar (auto-generated from name)
- Name and role
- Bio text
- LinkedIn link button

**Props:**
- `name: string` - Author name
- `role: string` - Job title
- `bio: string` - Author biography
- `linkedinUrl?: string` - LinkedIn profile URL
- `avatarUrl?: string` - Avatar image URL (optional)

### FAQSection
**Location:** `/components/blog/FAQSection.tsx`

Accordion-style FAQ section:
- Each question as expandable item
- Full answer visible on expand
- Collapsible for clean design

**Props:**
- `faqs: FAQ[]` - Array of Q&A pairs

### SocialShare
**Location:** `/components/blog/SocialShare.tsx`

Social sharing buttons and link copy:
- LinkedIn share
- Facebook share
- Twitter/X share
- Copy link to clipboard
- GA4 tracking for each platform

**Props:**
- `title: string` - Article title for sharing
- `url: string` - Article URL

**GA4 Events Tracked:**
- `share_click` event with platform label

### ContentBlock
**Location:** `/components/blog/ContentBlock.tsx`

Reusable content blocks for various content types:

**Types:**
- `'tip'` - Green highlighted tip box with lightbulb icon
- `'warning'` - Amber highlighted warning box with alert icon
- `'example'` - Blue highlighted example box
- `'formula'` - Purple box with monospace formula display
- `'checklist'` - Indigo box with numbered checklist items

**Props:**
- `type: 'tip' | 'warning' | 'example' | 'formula' | 'checklist'`
- `title: string` - Block title
- `content: string | string[]` - Block content (string for most, array for checklist)

**Usage Examples:**

```tsx
// Tip box
<ContentBlock
  type="tip"
  title="Pro Tip"
  content="Always review your Quality Score to improve ad performance."
/>

// Formula box
<ContentBlock
  type="formula"
  title="ROI Formula"
  content="ROI = (Revenue - Ad Spend) / Ad Spend × 100"
/>

// Checklist
<ContentBlock
  type="checklist"
  title="Pre-Audit Checklist"
  content={[
    "Verify conversion tracking is working",
    "Check landing page alignment",
    "Review keyword list",
    "Analyze competitor bids",
  ]}
/>
```

## Dynamic Route: `/blog/[slug]/page.tsx`

### How It Works

1. **Static Params:** Pre-generates all blog post pages at build time
2. **Metadata:** Dynamically generates SEO metadata per post
3. **Schema Markup:** Auto-generates Article, FAQ, and Breadcrumb schemas
4. **Service Mapping:** Auto-selects related services based on category
5. **Related Posts:** Fetches and displays related articles

### URL Pattern
All blog posts follow this URL pattern:
```
/blog/{slug}
```

Examples:
- `/blog/how-to-calculate-google-ads-roi`
- `/blog/facebook-ads-not-working`
- `/blog/lead-scoring-101`

### Auto-Generated Schema Markup

The blog post template automatically generates:

**1. Article Schema**
```json
{
  "@type": "Article",
  "headline": "Post Title",
  "author": "Author Name",
  "datePublished": "2026-05-28",
  "dateModified": "2026-05-28",
  "keywords": ["primary keyword", "secondary keywords"]
}
```

**2. FAQPage Schema**
Automatically generated from `post.faqs` array:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": { "@type": "Answer", "text": "Answer text" }
    }
  ]
}
```

**3. BreadcrumbList Schema**
Automatically generated breadcrumb:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home" },
    { "position": 2, "name": "Blog" },
    { "position": 3, "name": "Article Title" }
  ]
}
```

### SEO Requirements Met

✓ **One H1 tag** - Article title in BlogHero
✓ **Meta title** - Under 60 characters
✓ **Meta description** - 150-160 characters with primary keyword
✓ **Primary keyword** - In H1 and introduction
✓ **Secondary keywords** - In H2/H3 sections
✓ **Internal links** - 3-5 links to service pages and related posts
✓ **Image alt text** - Descriptive alt for all images
✓ **Canonical URL** - Set per post
✓ **Article schema** - Automatically generated
✓ **FAQPage schema** - Automatically generated if FAQs exist
✓ **BreadcrumbList schema** - Automatically generated
✓ **Open Graph tags** - Auto-populated for social sharing
✓ **Twitter Card** - Auto-populated for Twitter sharing

### GA4 Tracking

Automatic GA4 event tracking for:
- Newsletter signups (`newsletter_signup`)
- Social shares (`share_click` with platform label)
- Related post clicks (via existing analytics)
- CTA button clicks (via existing analytics)

## Design & Layout

### Two-Column Layout (Desktop)
- **Left column (2/3):** Main article content
- **Right column (1/3):** Sticky sidebar with CTAs

### Responsive Behavior
- **Mobile:** Single column, sidebar stacks below article
- **Tablet:** 2 columns with adjusted spacing
- **Desktop:** Full 2-column layout with sticky sidebar

### Typography
- **H1 (Hero Title):** 40px/56px mobile-to-desktop
- **H2 (Sections):** 24px/32px mobile-to-desktop
- **H3 (Subsections):** 18px/20px mobile-to-desktop
- **Body:** 16px with 1.6 line-height
- **Meta info:** 14px text with icons

### Colors & Styling
- **Accent color:** All CTAs, links, badges
- **Section backgrounds:** Alternating secondary/5 backgrounds
- **CTA blocks:** Accent/5 background with accent border
- **Tip/Warning blocks:** Green/Amber/Blue/Purple backgrounds
- **Icons:** Calendar, Clock, User, ArrowRight from lucide-react

## Content Best Practices

### Article Structure
1. **Hero** - Title, category, metadata
2. **Introduction** - Hook, problem, promise
3. **Table of Contents** - Numbered sections with links
4. **Introduction Section** - Expanded context and promise
5. **Body Content** - Main article with sections
6. **CTA Blocks** - After every 2-3 major sections
7. **Social Share** - Sharing buttons
8. **Related Posts** - 3 related articles
9. **Related Services** - 3 relevant service pages
10. **Author Bio** - Author credibility
11. **FAQ Section** - Article-specific FAQs (3-5 items)
12. **Newsletter** - Email signup form
13. **Final CTA** - Strategy call
14. **Footer CTA** - Services and alternate CTAs

### Writing Guidelines
- **Readability:** Short paragraphs, bullet points, subheadings
- **Keywords:** Natural inclusion of primary + secondary keywords
- **Links:** Internal links to service pages, related posts
- **Value:** Focus on solving real business problems
- **CTAs:** Non-salesy, offer real audits and strategy calls
- **Length:** 1,500-3,000 words depending on topic
- **Examples:** Use real business scenarios

## Adding Custom Content Blocks

To add custom content to articles beyond the basic template:

1. **Use ContentBlock component** for tips, warnings, formulas, checklists
2. **Create new component** if needed for complex content
3. **Update blog-data.ts** with additional content structure fields
4. **Render content** conditionally in the dynamic route

Example:
```tsx
<ContentBlock
  type="example"
  title="Real Business Example"
  content="A SaaS company with $5,000/month ad spend generating 50 leads monthly..."
/>
```

## Maintenance & Updates

### Updating a Blog Post
1. Open `/lib/blog-data.ts`
2. Find the post slug in `BLOG_POSTS_DATA`
3. Update fields as needed
4. Update `updatedDate` field
5. Rebuild (`pnpm build`)

### Adding More Blog Posts
1. Create hero image in `/public/images/blog-{slug}.png`
2. Add new entry to `BLOG_POSTS_DATA` in `/lib/blog-data.ts`
3. Include all required fields from `BlogPost` interface
4. Rebuild (`pnpm build`)
5. Post automatically appears at `/blog/{slug}`

### Related Posts Algorithm
- Shows posts from same category first
- Falls back to latest posts if not enough in category
- Maximum 3 posts displayed
- Can be customized via `relatedPostSlugs` array

## Performance Optimization

✓ **Static Generation:** All blog posts pre-rendered at build time
✓ **Image Optimization:** Next.js Image component with lazy-loading
✓ **Lazy-Loading:** Below-the-fold sections load on demand
✓ **Code Splitting:** Each component independently bundled
✓ **Metadata:** Server-side rendering for SEO
✓ **Caching:** Automatic Next.js caching strategies

## Future Enhancements

Potential additions to the blog template:

1. **Rich Content Editor:** Allow editing blog posts via admin panel
2. **Auto-Related Posts:** ML-based recommendation system
3. **Comment System:** Reader engagement and feedback
4. **Scheduled Publishing:** Future date scheduling
5. **Blog Stats:** View counts, engagement metrics
6. **Email Notifications:** Notify subscribers of new posts
7. **A/B Testing:** Test different CTA variants
8. **Comment Moderation:** Spam filtering and approval
9. **Social Proof:** Show reader testimonials inline
10. **Analytics Dashboard:** Track blog performance metrics

## Troubleshooting

### Blog post not appearing at /blog/[slug]
- Check that slug is correctly formatted in `blog-data.ts`
- Verify slug matches blog post entry key
- Rebuild with `pnpm build`

### Schema markup not showing
- Check browser DevTools for embedded JSON-LD scripts
- Verify all required schema fields are populated
- Test with Google's Schema Markup Validator

### Sidebar not sticky on mobile
- Sidebar automatically stacks on mobile (by design)
- Check breakpoint: desktop only has sticky positioning

### CTAs not linking correctly
- Verify link paths exist in routes
- Check for typos in href values
- Test links manually in browser

### Related posts not showing
- Verify `relatedPostSlugs` array has correct slugs
- Check that referenced posts exist in `BLOG_POSTS_DATA`
- Ensure posts are spelled correctly

---

**Created:** May 28, 2026
**Last Updated:** May 28, 2026
**Version:** 1.0
