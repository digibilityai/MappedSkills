# SEO & Technical Setup Documentation - MappedSkills

## Complete Setup Guide for Maximum Search Visibility & Performance

---

## A. Configuration Checklist (Pre-Launch)

### Environment Variables Setup
```bash
# Add to .env.local (development) and Vercel project settings (production)

# GTM & Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX                    # Google Tag Manager ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                     # Google Analytics 4 Measurement ID

# Meta Pixel (optional)
NEXT_PUBLIC_META_PIXEL_ID=000000000000000          # Facebook Pixel ID (optional)

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://mappedskills.com      # Production URL
NEXT_PUBLIC_SITE_NAME=MappedSkills                 # Business name

# Calendly Integration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/username

# Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxx         # From Google Search Console
```

### Environment Variables Impact on Features
- **GTM_ID** → Google Tag Manager script loads
- **GA_ID** → Google Analytics tracking enabled
- **META_PIXEL_ID** → Facebook pixel retargeting enabled
- **NEXT_PUBLIC_CALENDLY_URL** → Calendly booking form loads
- **GOOGLE_SITE_VERIFICATION** → Search Console ownership verification

---

## B. Search Console Setup (Day 1)

### Steps
1. Go to https://search.google.com/search-console
2. Add property: https://mappedskills.com
3. Verify ownership via:
   - Option A: Add meta tag (add to NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
   - Option B: Add verification file (upload to /public)
   - Option C: DNS record (if using custom domain)
4. Submit sitemap: https://mappedskills.com/sitemap.xml
5. Monitor: Performance, Coverage, Enhancements

### What to Monitor
- Impressions (how often site appears in search)
- Click-through rate (CTR)
- Average position (ranking)
- Coverage (indexed vs excluded pages)
- Enhancements (mobile usability, AMP, etc.)

---

## C. Bing Webmaster Tools Setup (Day 1)

### Steps
1. Go to https://www.bing.com/webmasters
2. Add site: https://mappedskills.com
3. Verify via:
   - XML file upload
   - Meta tag
   - CNAME record
4. Submit sitemap
5. Monitor: Crawl, Diagnostics, Keywords

---

## D. Google Analytics 4 Setup (Day 1)

### Configuration
1. Property created with GA4 Measurement ID
2. Web data stream configured
3. Goals/Conversions to track:
   - Contact form submission
   - Schedule call booking
   - Inquiry form submission
   - Phone click
   - Email click
   - PDF download

### Key Reports to Set Up
1. **Acquisition Report** - Where traffic comes from
2. **Engagement Report** - Page views, time on page, bounce rate
3. **Conversion Report** - Goal completions, conversion rate
4. **Audience Report** - Visitor characteristics, behavior
5. **Landing Page Performance** - Which pages drive value

### Conversion Tracking
```
Contact Form Submit → value: $50 (estimated)
Schedule Call → value: $100 (higher intent)
Inquiry Form Submit → value: $75 (moderate intent)
Phone Click → value: $25 (lightweight interest)
Email Click → value: $10 (brand interest)
```

---

## E. GTM (Google Tag Manager) Setup (Day 2)

### Container Setup
1. Create GTM container: GTM-XXXXXXXX
2. Install GTM container ID in code (already done via layout.tsx)
3. Configure GA4 integration tag
4. Create custom event triggers

### Key Tags to Configure
1. **GA4 Config Tag** - Load GA4 with Measurement ID
2. **Contact Form Submission** - Track contact form completions
3. **Schedule Call Tracking** - Track booking completions
4. **Phone Click Tracking** - Track phone number clicks
5. **Email Click Tracking** - Track email link clicks
6. **CTA Click Tracking** - Track button clicks
7. **Page View Tracking** - Track all page views (GA4 default)

### Trigger Setup
- Form Submit Trigger (contact, inquiry forms)
- Click Trigger (buttons, links)
- Page View Trigger (all pages, specific pages)
- Scroll Depth Trigger (25%, 50%, 75%, 100%)
- YouTube Video Trigger (if using videos)

---

## F. Meta Pixel Setup (Day 2, Optional)

### Installation
1. Meta Business Account → Meta Pixel → Create Pixel
2. Copy Pixel ID
3. Add to NEXT_PUBLIC_META_PIXEL_ID environment variable
4. Meta Pixel component loads automatically in layout.tsx

### Key Events to Track
```javascript
// Purchase-like events (for lead magnet/free calls)
fbq('track', 'Lead', {
  content_name: 'Strategy Call',
  content_type: 'event',
});

// Inquiry event
fbq('track', 'Inquiry', {
  content_name: 'Contact Form',
  content_type: 'lead',
});

// Schedule event
fbq('track', 'Schedule', {
  content_name: 'Calendly Booking',
  content_type: 'booking',
});
```

### Retargeting Audiences
1. Website Visitors (all visitors)
2. Contact Form Viewers (viewed but didn't submit)
3. Contact Form Converters (submitted form)
4. Schedule Call Viewers (viewed Calendly)

---

## G. Sitemap & Robots.txt (Verified)

### Sitemap Configuration
- **File:** /app/sitemap.ts
- **Auto-generates:** https://mappedskills.com/sitemap.xml
- **Includes:** All 16 main pages + 8 blog posts + 3 case studies
- **Update frequency:** Weekly for homepage, monthly for services
- **Priority scores:** 1.0 (homepage), 0.9 (services), 0.7 (blog)

### Robots.txt Configuration
- **File:** /public/robots.txt
- **Allows:** All content (User-agent: *)
- **Blocks:** Bad bots (MJ12bot, AhrefsBot, SemrushBot)
- **References:** Sitemap location
- **Crawl-delay:** 0.1 (10 requests/second)

### Verification
```bash
# Test sitemap
curl https://mappedskills.com/sitemap.xml | head -20

# Test robots.txt
curl https://mappedskills.com/robots.txt
```

---

## H. Schema Markup (Automated)

### Implemented Schemas
1. **Organization Schema** - Company info, contact, social profiles
2. **LocalBusiness Schema** - Address, phone, hours (if applicable)
3. **BreadcrumbList Schema** - Navigation hierarchy (on each page)
4. **Product Schema** - For service pages (optional)
5. **AggregateOffer Schema** - For pricing page

### Schema Testing
```bash
# Test homepage schema
curl https://mappedskills.com | grep 'application/ld+json'

# Use Google Rich Results Test
# https://search.google.com/test/rich-results
```

### Monitor Rich Results in Search Console
- Enhancements section shows:
  - Rich results eligible
  - Issues (if any)
  - Valid markup count

---

## I. Performance Optimization

### Core Web Vitals Checklist
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Mobile-friendly (responsive design)
- [ ] HTTPS enabled (required)

### Page Speed Optimization
1. **Image Optimization**
   - Use Next.js Image component
   - WebP format for modern browsers
   - Lazy loading enabled

2. **JavaScript Optimization**
   - Code splitting (dynamic imports)
   - Tree shaking (remove unused code)
   - GTM/Meta Pixel lazy-loaded

3. **CSS Optimization**
   - CSS-in-JS (Tailwind, styled-components)
   - Critical CSS inline
   - Unused CSS removal

4. **Caching Strategy**
   - Static assets: 1 year cache
   - HTML pages: 1 hour cache
   - CDN caching: Automatic via Vercel

### Monitor Performance
- Google PageSpeed Insights
- WebPageTest.org
- Chrome DevTools Lighthouse
- Vercel Analytics Dashboard

---

## J. Mobile Optimization Checklist

### Mobile SEO
- [ ] Responsive design (tested on mobile)
- [ ] Mobile-friendly test passes (Search Console)
- [ ] Font size > 12px (readable without zoom)
- [ ] Touch targets > 48px (44px minimum)
- [ ] No horizontal scroll
- [ ] Viewport meta tag configured

### Mobile Conversion
- [ ] Click-to-call links (tel: protocol)
- [ ] One-tap email (mailto: protocol)
- [ ] Mobile form optimization (fewer fields)
- [ ] Fast form submission
- [ ] Clear CTA buttons

---

## K. Content Optimization

### On-Page SEO Checklist
- [ ] H1 present and unique (once per page)
- [ ] Meta title < 60 characters, keyword-rich
- [ ] Meta description < 160 characters, compelling
- [ ] Headers hierarchy (H1 > H2 > H3)
- [ ] Internal links (2-5 per page)
- [ ] Keywords naturally incorporated
- [ ] Unique content (no duplicate pages)
- [ ] Image alt text descriptive

### Content Quality
- [ ] Originality score > 85%
- [ ] Reading level: 8-9th grade (accessible)
- [ ] Content length: 500-2000 words (varies by type)
- [ ] Freshness: Update every 3-6 months
- [ ] Authority: Include sources/citations

### Blog Strategy
- Publish 2-4 posts per month
- 70% informational, 30% commercial
- Include internal links to service pages
- Track performance and popular topics
- Update top performers quarterly

---

## L. Link Building Strategy

### High-Priority Link Targets
1. **Industry Publications**
   - Marketing blogs
   - SaaS resources
   - Business publications

2. **Directories**
   - Google My Business (claimed)
   - Industry-specific directories
   - Local business directories

3. **Content-Driven Links**
   - Case studies
   - Whitepapers
   - Guides & tools

### Link-Building Activities
- Guest posting (1-2 posts/month)
- Interview outreach (thought leadership)
- Resource roundups (participate)
- Broken link fixing (link replacement)
- Dead link reclamation (restore old assets)

---

## M. Local SEO (India/Pune Focus)

### Google My Business Setup
1. Claim business listing
2. Add location: Pune, Maharashtra, India
3. Add phone: +91 9873232662
4. Add hours: 9 AM - 6 PM IST
5. Add services listed
6. Add photos/videos
7. Encourage reviews

### Local Keywords
- "Marketing agency Pune"
- "Google Ads management Pune"
- "Lead generation agency Pune"
- "Digital marketing agency India"
- "Performance marketing Pune"

---

## N. Competitor Analysis

### Quarterly Competitor Audit
1. **Top 10 competitors** (Google search: your keywords)
2. **Technical audit:** Page speed, mobile, SSL, sitemaps
3. **SEO audit:** Backlinks, keywords, content strategy
4. **Content audit:** Blog posts, guides, resources
5. **Link analysis:** Who's linking to them, how many, quality

### Tools
- SEMrush
- Ahrefs
- Moz
- SimilarWeb
- Screaming Frog

---

## O. Maintenance & Monitoring (Ongoing)

### Daily Monitoring
- [ ] Website up and running (200 status code)
- [ ] No broken links (404 errors)
- [ ] Analytics data flowing (GA4)
- [ ] Forms submitting successfully

### Weekly Monitoring
- [ ] Search Console: Any new errors?
- [ ] GA4: Any unusual traffic changes?
- [ ] Rankings: Check top 10 keywords
- [ ] Links: Monitor backlinks for spikes

### Monthly Maintenance
- [ ] Update blog with fresh content
- [ ] Check and fix broken links
- [ ] Analyze top pages performance
- [ ] Review conversion funnel
- [ ] Check competitor rankings
- [ ] Update pricing/services if needed

### Quarterly Review
- [ ] Full technical audit
- [ ] Content audit (refresh top 10 pages)
- [ ] Keyword research update
- [ ] Competitor analysis
- [ ] Goal review (revenue, leads, traffic)
- [ ] Plan content for next quarter

### Annual Review
- [ ] Complete website audit
- [ ] SEO strategy refresh
- [ ] Content strategy update
- [ ] Technical infrastructure review
- [ ] ROI analysis
- [ ] 12-month planning

---

## P. Success Metrics & Goals

### Tracking KPIs
| Metric | Target | Timeline |
|--------|--------|----------|
| Organic Traffic | 1,000/month | 3 months |
| Leads from website | 50/month | 3 months |
| Blog page views | 200/post | Ongoing |
| Avg ranking position | Top 20 | 6 months |
| Conversion rate | 2-5% | Ongoing |
| Avg session duration | >2 min | Ongoing |
| Bounce rate | <50% | Ongoing |

### ROI Tracking
```
Cost Per Lead = Marketing Spend / Leads Generated
Cost Per Acquisition = Total Spend / Customers
Lead to Customer Rate = Customers / Leads
Lifetime Value = (Avg Revenue per Customer × Customer Lifetime)
```

---

## Q. Troubleshooting Guide

### Issue: Low Organic Traffic
**Possible Causes:**
- Pages not indexed (check Search Console)
- Low rankings (need more backlinks/content)
- Poor meta descriptions (low CTR)
- Technical issues (crawlability, speed)

**Solutions:**
1. Submit sitemaps to Search Console
2. Build more backlinks (guest posts, directories)
3. Optimize meta titles/descriptions
4. Fix crawl errors
5. Improve page speed

### Issue: High Bounce Rate
**Possible Causes:**
- Poor page design/UX
- Irrelevant content
- Slow page load
- Too many ads/popups
- Mobile not optimized

**Solutions:**
1. Review page design
2. Ensure content matches search intent
3. Improve page speed
4. Reduce distractions
5. Test mobile experience

### Issue: No Form Submissions
**Possible Causes:**
- Form broken/not visible
- Unclear value proposition
- Too many form fields
- CTA not prominent
- Trust signals missing

**Solutions:**
1. Test form functionality
2. Improve copy/offer
3. Reduce form fields (3-5 max)
4. Make CTA prominent
5. Add testimonials/trust badges

---

## R. Quick Start Checklist

### Week 1
- [ ] Set up Google Search Console
- [ ] Set up Bing Webmaster Tools
- [ ] Configure Google Analytics 4
- [ ] Set up Google Tag Manager
- [ ] Verify sitemap submission
- [ ] Test robots.txt

### Week 2
- [ ] Set up Meta Pixel (if using)
- [ ] Configure GTM tags and triggers
- [ ] Set up conversion tracking (forms, CTAs)
- [ ] Test all tracking events
- [ ] Set up GA4 goals

### Week 3
- [ ] Run technical SEO audit
- [ ] Test mobile responsiveness
- [ ] Check all links (internal/external)
- [ ] Optimize images
- [ ] Set up monitoring/alerts

### Week 4
- [ ] Launch monitoring dashboard
- [ ] Start tracking rankings
- [ ] Begin content creation
- [ ] Start link-building outreach
- [ ] Plan quarterly review

---

## S. Documentation & Support

### Files Reference
- Tracking Events: `/TRACKING_GUIDE.md`
- Keywords: `/KEYWORD_STRATEGY.md`
- Internal Linking: `/INTERNAL_LINKING_GUIDE.md`
- Sitemap: `/app/sitemap.ts`
- Robots.txt: `/public/robots.txt`
- Meta Pixel: `/lib/meta-pixel.tsx`
- OG Images: `/lib/og-image.ts`
- Schemas: `/lib/schema.ts`
- GTM Setup: `/lib/gtm.tsx`

### External Resources
- Google Search Console: https://search.google.com/search-console
- Google Analytics 4: https://analytics.google.com
- Google Tag Manager: https://tagmanager.google.com
- Bing Webmaster: https://www.bing.com/webmasters
- Structured Data Tester: https://search.google.com/structured-data/testing-tool

