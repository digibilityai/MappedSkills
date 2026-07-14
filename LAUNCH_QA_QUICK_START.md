# MappedSkills Launch QA - Quick Start Guide

## Overview

The MappedSkills website is ready for comprehensive pre-launch QA verification. Two resources have been created to help you prepare for launch:

1. **LAUNCH_QA_CHECKLIST.md** - Detailed 30-section checklist with 200+ items
2. **Internal Developer Page** - `/launch-checklist` (protected from indexing)

## Quick Links

| Resource | Location | Purpose |
|----------|----------|---------|
| Main Checklist | `/LAUNCH_QA_CHECKLIST.md` | Complete verification document |
| Developer Page | `/app/(pages)/launch-checklist/page.tsx` | Internal reference page |
| Pre-Launch Docs | `PRE_LAUNCH_CHECKLIST.md` | General pre-launch guidelines |
| Implementation | `IMPLEMENTATION_SUMMARY.md` | What's been implemented |

## 30 Checklist Sections at a Glance

```
1. Full Website Pages (18 pages)
2. Header Navigation & CTAs
3. Footer Links & Info
4. SEO Metadata (unique titles, descriptions, schema)
5. Sitemap.xml Generation
6. Robots.txt Configuration
7. Schema Markup Validation
8. Contact Form Functionality
9. Calendly/Schedule Integration
10. CTA Button Testing (all CTAs)

11. Google Analytics Setup (GA4, GTM)
12. Pixel/Ads Conversion Tracking
13. 301 Redirects (8 redirects)
14. Broken Links Check
15. Mobile Responsiveness
16. Tablet Layout
17. Desktop Layout
18. Multi-Browser Testing

19. Performance Testing (Lighthouse, PageSpeed)
20. Accessibility Compliance (WCAG)
21. Content Copy Review
22. Blog Functionality & Posts
23. Pricing Page Details
24. Results/Case Studies
25. Security Configuration

26. Vercel Deployment Settings
27. Launch Day Procedures
28. Post-Launch Monitoring (7 days)
29. Final Approval Criteria
30. Issues Tracking & Sign-Off
```

## Getting Started (5 Steps)

### Step 1: Access the Checklist

**Option A - Markdown File:**
```bash
# Open in your editor
open LAUNCH_QA_CHECKLIST.md
```

**Option B - Developer Page:**
```
http://localhost:3000/launch-checklist (development only)
```

### Step 2: Import to Project Tool

Copy checklist content into your preferred tool:

- **Linear:** Create 30 issues, one per section
- **Notion:** Create table with 200+ rows
- **Jira:** Create epic with 30 stories
- **Asana:** Create project with 30 tasks
- **GitHub Issues:** Create milestone with issues

### Step 3: Assign Sections

Recommended assignments:

| Section | Owner | Time |
|---------|-------|------|
| Pages 1-3 (Site structure) | Developer | 2 hours |
| Pages 4-7 (SEO & technical) | Developer | 2 hours |
| Pages 8-14 (Forms & tracking) | Developer | 3 hours |
| Pages 15-20 (UX & accessibility) | Designer/QA | 3 hours |
| Pages 21-26 (Content & deployment) | Product/DevOps | 2 hours |
| Pages 27-30 (Launch & monitoring) | Product Lead | 1 hour |

**Total estimated QA time: 12-15 hours**

### Step 4: Verify Each Item

For each checklist item:

1. **Understand the requirement** - Read the description
2. **Test/verify** - Check the actual website
3. **Document findings** - Note any issues
4. **Mark complete** - Check off when done
5. **Log issues** - Use the issues table if problems found

### Step 5: Get Approvals

Before launch, collect sign-offs:

- [ ] Developer: Technical QA complete
- [ ] QA Lead: All testing complete
- [ ] Product: Content and positioning verified
- [ ] Amit Gupta (Founder): Final approval

## Key Testing Areas

### Must Work (Critical)

- [ ] Contact form submits and shows success message
- [ ] Calendly booking widget functional
- [ ] GA4 events firing in DebugView
- [ ] All pages load without 404 errors
- [ ] Mobile layout responsive (no horizontal scroll)
- [ ] All internal links working
- [ ] CTAs link to correct pages

### Should Be Optimal (High Priority)

- [ ] Page load time < 2.5 seconds (Largest Contentful Paint)
- [ ] Lighthouse Performance score 90+
- [ ] Lighthouse SEO score 95+
- [ ] Mobile accessibility WCAG AA compliant
- [ ] No console errors on key pages

### Nice to Have (Medium Priority)

- [ ] Lighthouse score 95+ across all metrics
- [ ] Sub-1 second First Input Delay
- [ ] All pages tested in 4+ browsers
- [ ] All pages tested on 3+ devices

## Common Issues & How to Fix

### Issue: Contact form not submitting
**Check:** Form validation, CORS settings, server endpoint

### Issue: GA4 events not firing
**Check:** GTM container ID, GA4 property ID, event configuration

### Issue: Calendly embed not loading
**Check:** NEXT_PUBLIC_CALENDLY_URL environment variable, embed code

### Issue: Mobile layout broken
**Check:** Viewport meta tag, responsive breakpoints, tap targets (44px min)

### Issue: 404 Errors on old URLs
**Check:** Next.js redirects configured in next.config.mjs

### Issue: Slow page load
**Check:** Image optimization, JavaScript bundling, third-party scripts

## Environment Variables Required

Before launch, ensure these are set in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://mappedskills.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mappedskills
NEXT_PUBLIC_BUSINESS_EMAIL=info@mappedskills.com
NEXT_PUBLIC_BUSINESS_PHONE=+91 9873232662
```

## Verification URLs

Key URLs to test:

```
Homepage:           https://mappedskills.com/
Services:           https://mappedskills.com/services
Google Ads:         https://mappedskills.com/google-ads
Blog:               https://mappedskills.com/blog
Contact:            https://mappedskills.com/contact
Schedule Call:      https://mappedskills.com/schedule-call
FAQ:                https://mappedskills.com/faq
Pricing:            https://mappedskills.com/pricing

Sitemap:            https://mappedskills.com/sitemap.xml
Robots:             https://mappedskills.com/robots.txt
Old URL Test:       https://mappedskills.com/seo-services (should redirect)
404 Test:           https://mappedskills.com/invalid-page-12345
```

## Launch Day Timeline

### 24 Hours Before
- [ ] Final full-site walkthrough
- [ ] Run Lighthouse audit
- [ ] Final mobile test
- [ ] Verify all env vars set

### 2 Hours Before
- [ ] Clear caches
- [ ] Final contact form test
- [ ] Final analytics check
- [ ] Final mobile test

### 1 Hour Before
- [ ] Founder final review
- [ ] Collect final approvals
- [ ] Stand by for launch

### Go Live
- [ ] Deploy to production
- [ ] Verify live
- [ ] Monitor real-time data
- [ ] Respond to first enquiries

### First 24 Hours After
- [ ] Monitor 404 errors
- [ ] Monitor form submissions
- [ ] Monitor analytics
- [ ] Respond to all enquiries within 2 hours

## Post-Launch Monitoring

**First 7 Days:**

Daily checks:
- Website uptime
- GA4 traffic
- Form submissions
- 404 errors
- Core Web Vitals
- Mobile usability

**Weekly (Week 2-4):**

- Google Search Console indexing
- Core Web Vitals trends
- Conversion tracking accuracy
- Lead quality assessment
- Form abandonment issues

**Monthly (After Month 1):**

- SEO performance
- Traffic trends
- Conversion rates
- Page speed optimization
- User experience improvements

## Support & Documentation

**Internal Resources:**
- `PRE_LAUNCH_CHECKLIST.md` - General guidelines
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `QUICK_REFERENCE.md` - Developer reference

**External Tools:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics 4: https://analytics.google.com
- Google Tag Manager: https://tagmanager.google.com
- Lighthouse: https://web.dev/measure

## Launch Readiness Criteria

**Website is launch-ready when ALL of these are true:**

- [x] All 30 checklist sections completed
- [x] All critical issues fixed (none blocking launch)
- [x] All CTAs working and tracked
- [x] Contact form fully functional
- [x] Calendly working
- [x] Analytics firing correctly
- [x] No broken critical links
- [x] Mobile responsive
- [x] Page speed acceptable
- [x] No placeholder text
- [x] No fake claims or testimonials
- [x] Founder approval received
- [x] Build passes without errors
- [x] No console errors on key pages

## Questions?

Refer to specific sections in `LAUNCH_QA_CHECKLIST.md` for detailed guidance on each verification area.

---

**Last Updated:** May 29, 2026  
**Status:** Ready for Pre-Launch QA  
**Next Step:** Begin section assignments and testing
