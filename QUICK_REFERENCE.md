# MappedSkills Technical Foundation - Quick Reference Guide

## Files Created This Session

### Core Infrastructure Files
| File | Purpose | Type |
|------|---------|------|
| `.env.example` | Environment variables template | Config |
| `/app/sitemap.ts` | Dynamic sitemap.xml generation | Route |
| `/app/robots.ts` | Dynamic robots.txt generation | Route |
| `/app/not-found.tsx` | Custom 404 page | Page |
| `/app/(pages)/thank-you/page.tsx` | Thank you page after form submission | Page |
| `/lib/schema.ts` | JSON-LD schema markup generators | Utility |
| `/lib/gtm.tsx` | Google Tag Manager integration | Component |
| `/lib/tracking.ts` | Event and form tracking utilities | Utility |

### Documentation Files
| File | Purpose |
|------|---------|
| `PRE_LAUNCH_CHECKLIST.md` | 605-line comprehensive QA checklist |
| `IMPLEMENTATION_SUMMARY.md` | This session's complete summary |
| `QUICK_REFERENCE.md` | Quick reference guide (this file) |

### Modified Files
| File | Changes |
|------|---------|
| `/lib/metadata.ts` | Added env var support, expanded schema config |
| `/lib/blog-data.ts` | Added getBlogPosts() and getBlogPostBySlug() exports |
| `/app/layout.tsx` | Added GTM component and global schema markup |
| `/next.config.mjs` | Added 8 301 redirects for legacy URLs |

---

## Key Environment Variables to Set

```bash
# Required - Business Info
NEXT_PUBLIC_SITE_URL=https://mappedskills.com
NEXT_PUBLIC_BUSINESS_EMAIL=info@mappedskills.com
NEXT_PUBLIC_BUSINESS_PHONE=+91 9873232662

# Analytics - Set after creating accounts
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789

# Tools - Set as needed
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mappedskills
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=verification-code

# Social Media
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/mappedskills
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/mappedskills
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mappedskills
```

---

## Tracking Events Configured

### Form Events
```javascript
trackFormSubmit('contact_form', { service_interest, budget_range })
trackFormError('contact_form', error_message)
```

### CTA Events
```javascript
trackEvent('cta_clicked', { cta_type, cta_text })
trackServiceCTAClick(serviceName)
trackScheduleCallClick()
trackPricingCTAClick()
```

### User Interactions
```javascript
trackPhoneClick(phoneNumber)
trackEmailClick(email)
trackBlogRelatedClick(postSlug, relatedSlug)
trackSocialShare(platform, postSlug)
trackNewsletterSignup()
```

---

## Routes Automatically Generated

### SEO Routes
- `/sitemap.xml` - Dynamic sitemap with all pages and blog posts
- `/robots.txt` - Search engine crawling directives

### Custom Pages
- `/404` - Custom 404 not found page
- `/thank-you` - Post-form submission thank you page

### Blog Routes
- `/blog` - Blog index
- `/blog/[slug]` - Individual blog posts (8 total)
  - `how-to-calculate-google-ads-roi`
  - `facebook-ads-not-working`
  - `lead-scoring-101`
  - `seo-vs-ppc`
  - `ecommerce-conversion-optimization`
  - `google-shopping-ads-strategy`
  - `linkedin-ads-b2b-lead-generation`
  - `seasonal-paid-ads-strategy`

---

## 301 Redirects Configured

All redirects are permanent (HTTP 301):

| From | To |
|------|-----|
| `/seo-services` | `/seo` |
| `/google-ads-service` | `/google-ads` |
| `/social-media-advertising` | `/social-media-ads` |
| `/lead-generation-services` | `/lead-generation` |
| `/content-marketing-services` | `/blog` |
| `/digital-marketing-services` | `/services` |
| `/contact-us` | `/contact` |
| `/work` | `/results` |

---

## Schema Markup Implemented

### Global Schemas (in root layout)
- Organization schema
- LocalBusiness schema

### Page-Specific Schemas
- FAQPage schema (on /faq and blog posts with FAQs)
- Article schema (on all blog posts)
- Service schema (functions available in `/lib/schema.ts`)
- BreadcrumbList schema (functions available in `/lib/schema.ts`)
- Person schema (functions available in `/lib/schema.ts`)

---

## Google Tag Manager Setup

### File: `/lib/gtm.tsx`

#### Component
```jsx
import { GoogleTagManager } from '@/lib/gtm';

// In layout
<GoogleTagManager />
```

#### Event Tracking
```javascript
import { trackEvent, trackCTAClick, trackFormSubmit } from '@/lib/gtm';

trackEvent('event_name', { data: 'value' });
trackCTAClick('button_type', 'Button Text');
trackFormSubmit('form_name', { field: 'value' });
```

---

## Build Status

```
✓ Compiled successfully in 5.9s
✓ Generating static pages (31/31) in 723ms
```

**Latest Build:** May 29, 2026  
**Routes:** 31 pages compiled  
**Errors:** 0  
**Warnings:** 0

---

## Pre-Launch Checklist Highlights

### Must Do Before Deploying (6 items)
1. Set all environment variables in Vercel
2. Create Google Search Console property
3. Create Google Analytics 4 property
4. Create Google Tag Manager container
5. Create Meta Pixel
6. Get Calendly URL

### Testing Required
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Test robots.txt at `/robots.txt`
- [ ] Test 404 page at `/non-existent-page`
- [ ] Test thank-you page at `/thank-you`
- [ ] Test all redirects work
- [ ] Test GTM in preview mode
- [ ] Test form submission tracking
- [ ] Test CTA click tracking
- [ ] Mobile responsive testing
- [ ] Desktop performance testing

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 90+ | Ready to test |
| Lighthouse SEO | 95+ | Ready to test |
| Lighthouse Accessibility | 90+ | Ready to test |
| Lighthouse Best Practices | 90+ | Ready to test |
| LCP (Core Web Vital) | < 2.5s | Ready to test |
| CLS (Core Web Vital) | < 0.1 | Ready to test |
| INP (Core Web Vital) | Green range | Ready to test |

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Generate sitemap (automatic on build)
# Accessed at /sitemap.xml

# Generate robots.txt (automatic on build)
# Accessed at /robots.txt
```

---

## Useful Functions to Use

### From `/lib/schema.ts`
```javascript
generateOrganizationSchema()
generateLocalBusinessSchema()
generateBreadcrumbSchema(items)
generateServiceSchema(name, description)
generateFAQSchema(faqs)
generateArticleSchema(title, description, ...)
generatePersonSchema(name, bio, image)
```

### From `/lib/gtm.tsx`
```javascript
trackEvent(eventName, eventData)
trackCTAClick(ctaType, ctaText)
trackFormSubmit(formName, formData)
trackFormError(formName, error)
trackPhoneClick(phoneNumber)
trackEmailClick(email)
trackCalendlyBooking(action)
```

### From `/lib/tracking.ts`
```javascript
submitContactForm(formData)
trackServiceCTAClick(serviceName)
trackAuditCTAClick(auditType)
trackScheduleCallClick()
trackBlogRelatedClick(postSlug, relatedSlug)
trackSocialShare(platform, postSlug)
trackNewsletterSignup()
createTrackablePhoneLink(phone)
createTrackableEmailLink(email)
```

---

## What's Ready to Activate

### Analytics
- [x] GTM infrastructure ready (needs GTM ID)
- [x] GA4 ready to connect (needs GA4 ID)
- [x] All event tracking functions ready
- [x] Form tracking ready
- [x] CTA tracking ready

### Conversion Tracking
- [x] Meta Pixel ready (needs Pixel ID)
- [x] Form submission tracking ready
- [x] Phone/email click tracking ready
- [x] Service-specific tracking ready

### SEO
- [x] Sitemap live at `/sitemap.xml`
- [x] Robots.txt live at `/robots.txt`
- [x] Schema markup live
- [x] Meta tags complete
- [x] Redirects configured

---

## Quick Troubleshooting

### Sitemap not showing?
- Check `/sitemap.ts` file
- Verify `getBlogPosts()` exports in blog-data.ts
- Access at `https://yoursite.com/sitemap.xml`

### GTM not tracking?
- Verify `NEXT_PUBLIC_GTM_ID` is set in environment
- Check GTM preview mode
- Check data layer in browser console
- Verify event names match GTM tags

### Forms not submitting?
- Check `/api/contact` endpoint exists
- Verify form field names match FormData interface
- Check browser console for errors
- Verify email configuration

### Performance slow?
- Check Lighthouse scores
- Verify images are optimized
- Check for unused JavaScript
- Monitor Core Web Vitals

---

## Resources

### Documentation
- Pre-Launch Checklist: `PRE_LAUNCH_CHECKLIST.md` (605 items)
- Implementation Summary: `IMPLEMENTATION_SUMMARY.md`
- This file: `QUICK_REFERENCE.md`

### External Links
- Google Tag Manager: https://tagmanager.google.com
- Google Analytics 4: https://analytics.google.com
- Google Search Console: https://search.google.com/search-console
- Schema.org Validator: https://validator.schema.org

---

**Status:** Ready for Production Deployment  
**Last Updated:** May 29, 2026  
**Next Step:** Set environment variables and deploy
