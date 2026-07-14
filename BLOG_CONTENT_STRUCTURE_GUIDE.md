# How to Structure Blog Post Content

This guide shows you how to properly structure the `content` field in your blog post data.

## Content Structure Examples

### Example 1: Simple Paragraph Structure

```typescript
content: `
<section id="section-0">
  <h2>What is Google Ads ROI?</h2>
  <p>Google Ads ROI (Return on Investment) measures how much revenue you generate for every dollar spent on advertising. If you spend $1,000 and make $4,000 in revenue, your ROI is 300% (or a 4:1 return ratio).</p>
  <p>ROI is different from ROAS. While ROAS only looks at revenue generated, ROI accounts for the total cost of your advertising campaign.</p>
</section>

<section id="section-1">
  <h2>Why ROI Matters</h2>
  <p>Many businesses spend on Google Ads without calculating ROI. This leads to wasted budget on low-performing campaigns.</p>
  <p>By tracking ROI, you can:</p>
  <ul>
    <li>Identify which campaigns are actually profitable</li>
    <li>Make data-driven decisions about where to allocate budget</li>
    <li>Prove the value of marketing to stakeholders</li>
    <li>Scale winners and eliminate losers</li>
  </ul>
</section>
`,
```

### Example 2: With Formulas and Numbers

```typescript
content: `
<section id="section-2">
  <h2>The ROI Formula Explained</h2>
  <p>The basic ROI formula is:</p>
  <div class="bg-purple-50 border border-purple-200 rounded p-4 my-6 font-mono text-center">
    ROI = (Revenue - Ad Spend) ÷ Ad Spend × 100
  </div>
  <p><strong>Example:</strong> If you spent $1,000 on Google Ads and generated $4,000 in revenue:</p>
  <div class="bg-blue-50 border border-blue-200 rounded p-4 my-6">
    <p>ROI = ($4,000 - $1,000) ÷ $1,000 × 100 = 300%</p>
  </div>
  <p>This means for every $1 you spent, you got $3 back in profit.</p>
</section>
`,
```

### Example 3: With Lists and Callouts

```typescript
content: `
<section id="section-3">
  <h2>What Numbers You Need to Track</h2>
  <p>To calculate true ROI, you need to track these numbers from Google Ads:</p>
  
  <h3>Essential Metrics</h3>
  <ul>
    <li><strong>Total Ad Spend:</strong> Sum of all costs for the campaign</li>
    <li><strong>Leads Generated:</strong> Number of form submissions or inquiries</li>
    <li><strong>Cost Per Lead:</strong> Ad spend ÷ leads generated</li>
    <li><strong>Lead Value:</strong> Average value of each lead to your business</li>
    <li><strong>Revenue Generated:</strong> Total revenue from leads (leads × lead value)</li>
  </ul>

  <div class="bg-green-50 border border-green-200 rounded p-4 my-6">
    <strong>Tip:</strong> Use conversion tracking in Google Ads to automatically capture these metrics. You must have proper tracking set up, or all this calculation becomes guesswork.
  </div>
</section>
`,
```

### Example 4: With Comparison Tables

```typescript
content: `
<section id="section-4">
  <h2>How to Calculate ROAS vs ROI</h2>
  <p>While similar, ROAS and ROI are different metrics:</p>

  <table class="w-full border-collapse my-6">
    <tr>
      <th class="border p-3 text-left">Metric</th>
      <th class="border p-3 text-left">Formula</th>
      <th class="border p-3 text-left">What It Measures</th>
    </tr>
    <tr>
      <td class="border p-3"><strong>ROAS</strong></td>
      <td class="border p-3">Revenue ÷ Ad Spend</td>
      <td class="border p-3">Revenue generated per $ spent</td>
    </tr>
    <tr>
      <td class="border p-3"><strong>ROI</strong></td>
      <td class="border p-3">(Revenue - Ad Spend) ÷ Ad Spend</td>
      <td class="border p-3">Profit generated per $ spent</td>
    </tr>
  </table>

  <p><strong>Example:</strong></p>
  <ul>
    <li>Revenue: $4,000</li>
    <li>Ad Spend: $1,000</li>
    <li>ROAS = $4,000 ÷ $1,000 = 4:1 (or 400%)</li>
    <li>ROI = ($4,000 - $1,000) ÷ $1,000 × 100 = 300%</li>
  </ul>
</section>
`,
```

### Example 5: With Warnings and Best Practices

```typescript
content: `
<section id="section-5">
  <h2>Common Mistakes in ROI Calculation</h2>

  <div class="bg-amber-50 border border-amber-200 rounded p-4 my-6">
    <strong>⚠️ Warning:</strong> Many businesses only count the ad spend in ROI calculations. Don't forget:
    <ul class="mt-3">
      <li>Landing page creation and optimization</li>
      <li>Sales team time to close leads</li>
      <li>Customer success and support costs</li>
      <li>Product/service delivery costs</li>
    </ul>
  </div>

  <h3>Mistake 1: Only Counting Direct Revenue</h3>
  <p>Your Google Ads may generate leads that convert weeks or months later. Track the full customer lifetime value, not just immediate sales.</p>

  <h3>Mistake 2: Not Tracking Properly</h3>
  <p>Without proper conversion tracking in Google Ads and your CRM, you can't calculate real ROI. Set up tracking before you start spending.</p>

  <div class="bg-green-50 border border-green-200 rounded p-4 my-6">
    <strong>✓ Best Practice:</strong> Review your ROI weekly. Look for campaigns trending down and pause them before wasting more budget.
  </div>
</section>
`,
```

## Content Best Practices

1. **Use semantic HTML:** `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>` tags
2. **Section IDs:** Use `id="section-N"` for Table of Contents linking
3. **Readable paragraphs:** Keep to 2-4 sentences per paragraph
4. **Scannable content:** Use lists, subheadings, highlighted boxes
5. **Real examples:** Include actual numbers and scenarios
6. **Call-out boxes:** Use for tips, warnings, best practices
7. **Proper spacing:** Use margins between sections
8. **Internal links:** Link to related posts and service pages
9. **Images:** Consider adding charts, screenshots, dashboards
10. **Length:** Aim for 1,500-3,000 words depending on topic

## Integration with Components

Your content will be rendered by the dynamic route `/blog/[slug]/page.tsx`:

```tsx
<article className="prose dark:prose-invert max-w-none mb-12">
  <p>Article content from post.content rendered here</p>
  
  {/* Sections will auto-render from HTML */}
  {/* Include <section id="section-N"> tags for TOC linking */}
  
  {/* CTA blocks placed after every 2-3 sections */}
  <CTABlockFromType ctaType={post.ctaType} />
</article>
```

## Example Full Blog Post Entry

Here's how to add this complete post to `/lib/blog-data.ts`:

```typescript
'your-article-slug': {
  slug: 'your-article-slug',
  title: 'Your Article Title: Main Keyword',
  metaTitle: 'Your Article Title | MappedSkills',
  metaDescription: 'Description with main keyword, under 160 characters.',
  primaryKeyword: 'main keyword target',
  secondaryKeywords: ['keyword 1', 'keyword 2', 'keyword 3'],
  category: 'Google Ads',
  excerpt: 'Short excerpt for blog listings.',
  author: 'Amit Gupta',
  publishedDate: 'May 28, 2026',
  updatedDate: 'May 28, 2026',
  readingTime: '7 min read',
  heroImage: '/images/blog-your-slug.png',
  heroImageAlt: 'Descriptive alt text for image',
  introduction: {
    hook: 'Opening problem statement here.',
    problem: 'Why this matters to business owners.',
    promise: 'What readers will learn from this article.',
  },
  tableOfContents: [
    'What is Google Ads ROI?',
    'Why ROI Matters',
    'The ROI Formula Explained',
    'What Numbers You Need to Track',
    'How to Calculate ROAS vs ROI',
    'Common Mistakes in ROI Calculation',
    'When to Audit Your Campaigns',
    'Final Recommendation',
  ],
  content: `<section id="section-0">...</section>...`, // Your HTML content here
  ctaType: 'google-ads',
  relatedServices: ['/google-ads', '/conversion-optimization', '/lead-generation'],
  relatedPostSlugs: ['other-post-slug-1', 'other-post-slug-2'],
  faqs: [
    {
      question: 'What is a good Google Ads ROI?',
      answer: 'A healthy ROI is typically 300%+. This varies by industry.',
    },
    // ... more FAQs
  ],
  openGraphTitle: 'Article Title for Social Sharing',
  openGraphDescription: 'Description for social sharing',
  openGraphImage: '/images/blog-your-slug.png',
  canonicalUrl: 'https://mappedskills.com/blog/your-article-slug',
},
```

## Using Content Blocks in Your Article

The `/components/blog/ContentBlock.tsx` component provides styled boxes. Import and use:

```tsx
import { ContentBlock } from '@/components/blog/ContentBlock';

// In your article content or as imported component:
<ContentBlock
  type="tip"
  title="Pro Tip"
  content="Your tip text here"
/>

<ContentBlock
  type="warning"
  title="Common Mistake"
  content="What to avoid"
/>

<ContentBlock
  type="formula"
  title="Calculation"
  content="ROI = (Revenue - Spend) ÷ Spend × 100"
/>

<ContentBlock
  type="checklist"
  title="Pre-Audit Checklist"
  content={[
    "Item 1",
    "Item 2",
    "Item 3",
  ]}
/>
```

---

Ready to create your first blog post? Start with the example above and customize it for your topic.
