# MappedSkills Marketing Website - Launch QA Checklist

**Last Updated:** May 29, 2026  
**Status:** Ready for Pre-Launch QA  
**Website:** https://mappedskills.com  
**Project Type:** Next.js on Vercel

---

## How to Use This Checklist

- [ ] Copy this checklist to a project management tool (Linear, Notion, Asana)
- [ ] Assign each section to responsible team members
- [ ] Check off items as they are verified
- [ ] Document any issues found in the "Issues" section
- [ ] All items must be checked before marking launch ready
- [ ] Keep this checklist for post-launch monitoring

**Rule:** Do NOT mark website as launch-ready until every item below is checked.

---

## 1. Full Website Page Checklist

### Pages to Verify Exist and Load

- [ ] Home: `/`
- [ ] Services: `/services`
- [ ] Google Ads: `/google-ads`
- [ ] Social Media Ads: `/social-media-ads`
- [ ] Lead Generation: `/lead-generation`
- [ ] SEO: `/seo`
- [ ] Conversion Optimization: `/conversion-optimization`
- [ ] How It Works: `/how-it-works`
- [ ] Results: `/results`
- [ ] Pricing: `/pricing`
- [ ] About: `/about`
- [ ] Blog: `/blog`
- [ ] Blog Posts: `/blog/[slug]` (test 3+ posts)
- [ ] FAQ: `/faq`
- [ ] Contact: `/contact`
- [ ] Schedule Call: `/schedule-call`
- [ ] Thank You: `/thank-you`
- [ ] 404 Page: Visit `/invalid-page-test`

### Quality Checks for Each Page

- [ ] **URL Correctness:** Verify exact page URL
- [ ] **Title Tag:** Check browser tab shows correct title
- [ ] **H1 Tag:** Verify page has exactly one H1
- [ ] **Layout:** No broken layout, sections display properly
- [ ] **Content:** All sections present, no missing content
- [ ] **Placeholders:** No unintended placeholder text visible
- [ ] **CTA Buttons:** All buttons clickable and working
- [ ] **Mobile Layout:** Page displays correctly on mobile
- [ ] **Footer Visibility:** Footer present and accessible
- [ ] **Header Visibility:** Header present and accessible
- [ ] **Internal Links:** All internal links navigate correctly

**Issues Found:**
```
[ ] Issue: __________________ | Page: __________________ | Fix: __________________
```

---

## 2. Header QA

### Navigation & Links

- [ ] Logo links to homepage (`/`)
- [ ] Services dropdown opens and closes
- [ ] All service links in dropdown work:
  - [ ] Google Ads
  - [ ] Social Media Ads
  - [ ] Lead Generation
  - [ ] SEO
  - [ ] Conversion Optimization
- [ ] Results link works
- [ ] Pricing link works
- [ ] Blog link works
- [ ] Contact link works

### CTA Button

- [ ] "Schedule Free Strategy Call" button visible
- [ ] CTA button navigates to `/schedule-call`
- [ ] CTA button visible on mobile
- [ ] CTA button is not cut off or overlapped

### Header Behavior

- [ ] Header is sticky/remains visible when scrolling
- [ ] Header does not cover page content
- [ ] No horizontal scrolling caused by header
- [ ] Header responsive on mobile devices

### Mobile Menu

- [ ] Hamburger menu icon visible on mobile
- [ ] Hamburger menu opens on tap
- [ ] Hamburger menu closes on tap
- [ ] Mobile menu links work:
  - [ ] All service links
  - [ ] Results link
  - [ ] Pricing link
  - [ ] Blog link
  - [ ] Contact link
  - [ ] CTA button

**Issues Found:**
```
[ ] Issue: __________________ | Desktop/Mobile: __________________ | Fix: __________________
```

---

## 3. Footer QA

### Footer Links - Services

- [ ] Google Ads link works
- [ ] Social Media Ads link works
- [ ] Lead Generation link works
- [ ] SEO link works
- [ ] Conversion Optimization link works

### Footer Links - Company

- [ ] Services link works
- [ ] Results link works
- [ ] Pricing link works
- [ ] About link works
- [ ] Blog link works

### Footer Links - Support

- [ ] Contact link works
- [ ] Schedule Call link works
- [ ] FAQ link works
- [ ] Privacy Policy link works
- [ ] Terms link works

### Footer Contact Information

- [ ] Phone number visible: `+91 9873232662`
- [ ] Phone number is clickable (tel: link)
- [ ] Email visible: `info@mappedskills.com`
- [ ] Email is clickable (mailto: link)

### Footer Social Links

- [ ] LinkedIn link present or placeholder controlled
- [ ] Facebook link present or placeholder controlled
- [ ] Instagram link present or placeholder controlled
- [ ] Twitter/X link present or placeholder controlled

### Footer Design

- [ ] Copyright year is current (2026)
- [ ] Footer layout works on mobile
- [ ] No horizontal scrolling in footer
- [ ] No broken footer links
- [ ] Footer columns align properly on desktop

**Issues Found:**
```
[ ] Issue: __________________ | Section: __________________ | Fix: __________________
```

---

## 4. SEO Metadata QA

### Home Page

- [ ] Meta Title: Contains "performance marketing agency"
- [ ] Meta Description: Unique and compelling (150-160 chars)
- [ ] Canonical URL: https://mappedskills.com/
- [ ] OG Title: Correct
- [ ] OG Description: Correct
- [ ] OG Image: Present and correct
- [ ] Twitter Card: Title and description present
- [ ] H1: One only, performance marketing focused
- [ ] H2/H3 Hierarchy: Proper structure

### Services Page

- [ ] Meta Title: Contains "performance marketing services"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete
- [ ] H1: One only, services focused

### Google Ads Page

- [ ] Meta Title: Contains "google ads management agency"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete

### Social Media Ads Page

- [ ] Meta Title: Contains "facebook instagram ads management"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete

### Lead Generation Page

- [ ] Meta Title: Contains "B2B lead generation services"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete

### SEO Page

- [ ] Meta Title: Contains "SEO services for businesses"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete

### Conversion Optimization Page

- [ ] Meta Title: Contains "conversion rate optimization services"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct
- [ ] OG Tags: Complete

### How It Works Page

- [ ] Meta Title: Contains "performance marketing process"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### Results Page

- [ ] Meta Title: Contains "performance marketing case studies"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### Pricing Page

- [ ] Meta Title: Contains "performance marketing agency pricing"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### About Page

- [ ] Meta Title: Contains "performance marketing agency"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### Blog Page

- [ ] Meta Title: Contains "performance marketing blog"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### Contact Page

- [ ] Meta Title: Contains "contact performance marketing agency"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### FAQ Page

- [ ] Meta Title: Contains "performance marketing FAQs"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### Schedule Call Page

- [ ] Meta Title: Contains "schedule marketing consultation"
- [ ] Meta Description: Unique
- [ ] Canonical URL: Correct

### All Pages - Image Alt Text

- [ ] All images have descriptive alt text
- [ ] Alt text is not keyword-stuffed
- [ ] Hero images have meaningful alt text
- [ ] Logo has alt text: "MappedSkills Marketing"
- [ ] CTA buttons have labels (if images)

### All Pages - Internal Linking

- [ ] Relevant service pages linked from content
- [ ] Blog posts linked from relevant sections
- [ ] Related articles linked in blog posts
- [ ] CTA sections link to appropriate pages
- [ ] No orphaned pages (all pages have incoming links)

**SEO Metadata Issues Found:**
```
[ ] Page: __________________ | Issue: __________________ | Fix: __________________
```

---

## 5. Sitemap QA

### Sitemap Accessibility

- [ ] Sitemap loads: https://mappedskills.com/sitemap.xml
- [ ] Sitemap is valid XML format
- [ ] Sitemap returns HTTP 200 status

### Sitemap Content

- [ ] Home page included
- [ ] All service pages included
- [ ] All static pages included
- [ ] All blog posts included
- [ ] No broken URLs in sitemap
- [ ] No duplicate URLs in sitemap

### Sitemap Tags

- [ ] `<lastmod>` values present and accurate
- [ ] `<priority>` values appropriate (0.8-1.0 for key pages)
- [ ] `<changefreq>` values correct (daily/weekly/monthly)
- [ ] Canonical URLs correct

### Robots.txt Integration

- [ ] Sitemap URL referenced in robots.txt
- [ ] Format: `Sitemap: https://mappedskills.com/sitemap.xml`

**Sitemap Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 6. Robots.txt QA

### Robots.txt Accessibility

- [ ] Robots.txt loads: https://mappedskills.com/robots.txt
- [ ] Returns HTTP 200 status
- [ ] Valid robots.txt format

### Robots.txt Rules

- [ ] Search engines are allowed: `User-agent: * Allow: /`
- [ ] Sitemap referenced: `Sitemap: https://mappedskills.com/sitemap.xml`
- [ ] CSS/JS/Images NOT blocked (should be allowed)
- [ ] No important pages blocked
- [ ] Disallowed paths appropriate if any

### Bot Rules

- [ ] GPTBot disallowed if intentional
- [ ] CCBot disallowed if intentional
- [ ] Other harmful bots blocked appropriately

**Robots.txt Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 7. Schema Markup QA

**Tool:** Use Google Rich Results Test or Schema.org Validator

### Global Schema

- [ ] Organization schema present and valid
  - [ ] Company name: "MappedSkills"
  - [ ] Website: https://mappedskills.com
  - [ ] Phone: +91 9873232662
  - [ ] Email: info@mappedskills.com
  - [ ] Address: Present if applicable
  - [ ] Social profiles: Listed if applicable
- [ ] LocalBusiness schema present and valid
  - [ ] Business type correct
  - [ ] Contact info matches Organization schema

### Breadcrumb Schema

- [ ] BreadcrumbList on all inner pages
- [ ] Home breadcrumb correct
- [ ] Current page breadcrumb correct
- [ ] No schema errors

### Service Pages

- [ ] Service schema on each service page
- [ ] Service name matches H1
- [ ] Description present
- [ ] No schema errors

### FAQ Pages

- [ ] FAQPage schema present on FAQ page
- [ ] Question and answer pairs correctly structured
- [ ] All FAQs included in schema
- [ ] No schema errors

### Blog Posts

- [ ] Article schema on each blog post
  - [ ] Headline correct
  - [ ] Author present
  - [ ] Publish date correct
  - [ ] Modified date if updated
  - [ ] Image included
- [ ] BreadcrumbList on blog posts
- [ ] FAQPage schema if FAQs present in post

### About Page

- [ ] Person schema for Amit Gupta if present
  - [ ] Name correct
  - [ ] Role/title present
  - [ ] No fake credentials

### General Schema Checks

- [ ] No fake ratings or reviews in schema
- [ ] No fake testimonials in schema
- [ ] No misleading schema
- [ ] Business information consistent across all schema
- [ ] Phone number correct: +91 9873232662
- [ ] Email correct: info@mappedskills.com
- [ ] Website name consistent: MappedSkills Marketing

**Schema Issues Found:**
```
[ ] Page: __________________ | Issue: __________________ | Fix: __________________
```

---

## 8. Contact Form QA

### Form Fields Present

- [ ] Name field
- [ ] Email field
- [ ] Phone field
- [ ] Company Name field
- [ ] Service Interest field (dropdown/select)
- [ ] Monthly Marketing Budget field (if present)
- [ ] Message textarea

### Form Validation

- [ ] Required fields show error messages
- [ ] Email validation works (rejects invalid emails)
- [ ] Phone validation works (rejects invalid formats)
- [ ] Dropdowns work and can be selected
- [ ] Textarea allows multiple lines
- [ ] Character limits enforced (if applicable)

### Form Submission

- [ ] Submit button works on first click
- [ ] Button text clear: "Send Message" or similar
- [ ] Loading state visible during submission
- [ ] Success message appears after submission
- [ ] Form clears after successful submission
- [ ] Error message appears if submission fails
- [ ] Spam protection integrated (reCAPTCHA/Honeypot placeholder)

### Mobile Form Experience

- [ ] Form is readable on mobile
- [ ] Fields stack vertically on mobile
- [ ] Buttons are easy to tap (44px minimum height)
- [ ] Keyboard works correctly
- [ ] No horizontal scrolling
- [ ] Placeholder text visible

### Form Analytics

- [ ] GA4 event fires: `contact_form_submit`
- [ ] Event includes form data (service, budget if applicable)
- [ ] Event fires on all forms (header, footer, contact page)
- [ ] Meta Lead event fires if Meta Pixel is active

### Form Follow-up

- [ ] User offered option to schedule call after submission
- [ ] Thank-you page or modal appears
- [ ] Email confirmation placeholder works
- [ ] Form submission email includes all data

**Form Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 9. Schedule Call / Calendly QA

### Calendly Embed

- [ ] `/schedule-call` page loads
- [ ] Calendly embed loads on page
- [ ] Calendly is lazy-loaded if possible
- [ ] No layout shift when Calendly loads
- [ ] Calendly URL configurable via environment variable: `NEXT_PUBLIC_CALENDLY_URL`

### Booking Widget Functionality

- [ ] Desktop booking widget works
- [ ] Mobile booking widget works
- [ ] Can select date and time
- [ ] Can fill in name/email
- [ ] Can complete booking
- [ ] Confirmation appears after booking

### User Experience

- [ ] Clear CTA text near Calendly: "Schedule a Free Strategy Call"
- [ ] Alternative CTAs link to Calendly section
- [ ] Scrolls smoothly to Calendly when CTA clicked
- [ ] No overlapping elements

### Event Tracking

- [ ] `schedule_call_click` event fires when CTA clicked
- [ ] `calendly_view` event fires when widget loads
- [ ] `calendly_booking_started` event fires on interaction
- [ ] `calendly_booking_completed` tracked if supported

### Mobile Experience

- [ ] Calendly responds to mobile screens
- [ ] Can complete booking on mobile
- [ ] No horizontal scrolling
- [ ] Readable on small screens

**Calendly Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 10. CTA Button QA

### Main CTAs

- [ ] "Schedule Free Strategy Call" button
- [ ] "Get Free Marketing Audit" button
- [ ] "Get Free Google Ads Audit" button
- [ ] "Audit Your Ad Account" button
- [ ] "Get Free Lead Audit" button
- [ ] "Get Free SEO Audit" button
- [ ] "Get Free Conversion Audit" button
- [ ] "Get Custom Pricing Quote" button
- [ ] "Contact Us" button
- [ ] "View Results" button
- [ ] "Explore Services" button

### CTA Button Checks

For each CTA button, verify:

- [ ] Text is clear and action-oriented
- [ ] Button links to correct page or form
- [ ] Button visible and not cut off
- [ ] Button clickable on desktop
- [ ] Button clickable on mobile
- [ ] No CTA links to `#` or placeholder URL
- [ ] No CTA links to missing/404 page
- [ ] Proper hover state on desktop
- [ ] Proper active/focus state on mobile
- [ ] CTA tracking event fires when clicked

### CTA Tracking

- [ ] GA4 event fires: `service_cta_click`
- [ ] Event includes button text/label
- [ ] Event includes page location
- [ ] All CTAs properly tracked
- [ ] No CTAs missing tracking

### CTA Placement

- [ ] CTAs visible without excessive scrolling
- [ ] Multiple CTAs per page for user choice
- [ ] CTA buttons consistent styling across site
- [ ] CTA buttons prominent but not obnoxious
- [ ] CTA button color contrasts with background

**CTA Issues Found:**
```
[ ] CTA: __________________ | Issue: __________________ | Fix: __________________
```

---

## 11. Analytics QA

### Google Tag Manager Setup

- [ ] GTM container installed on all pages
- [ ] GTM loads without errors in console
- [ ] GTM noscript fallback present
- [ ] Only one GTM installation (no duplicates)
- [ ] GTM container ID in env var: `NEXT_PUBLIC_GTM_ID`

### GA4 Setup

- [ ] GA4 property created and configured
- [ ] GA4 ID in env var: `NEXT_PUBLIC_GA4_ID`
- [ ] GA4 installed via GTM or direct
- [ ] GA4 page views firing for each page
- [ ] GA4 route changes tracked for SPA navigation
- [ ] No duplicate page views
- [ ] GA4 DebugView shows events correctly

### Important GA4 Events

- [ ] `page_view` - Firing on all pages
- [ ] `contact_form_submit` - Fires when form submitted
- [ ] `schedule_call_click` - Fires when CTA clicked
- [ ] `free_audit_click` - Fires on audit CTAs
- [ ] `phone_click` - Fires when phone number clicked
- [ ] `email_click` - Fires when email link clicked
- [ ] `service_cta_click` - Fires on service CTAs
- [ ] `pricing_cta_click` - Fires on pricing CTAs
- [ ] `blog_cta_click` - Fires on blog CTAs
- [ ] `newsletter_signup` - Fires on newsletter signup
- [ ] `related_service_click` - Fires on related services
- [ ] `social_share_click` - Fires on social shares
- [ ] `page_404_view` - Fires on 404 page

### Analytics Testing

- [ ] Open GA4 DebugView
- [ ] Click each CTA and verify event appears
- [ ] Submit contact form and verify event
- [ ] Click phone/email and verify event
- [ ] Visit 404 page and verify event
- [ ] Check real-time data for incoming traffic

**Analytics Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 12. Pixel / Ads Tracking QA

### Meta Pixel Setup

- [ ] Meta Pixel ID configurable via: `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Pixel installed if ID provided
- [ ] PageView event ready
- [ ] Lead event ready for form submissions
- [ ] Purchase event ready if e-commerce
- [ ] Schedule event ready for Calendly bookings
- [ ] No hardcoded pixel IDs in code
- [ ] No pixel ID in version control

### Google Ads Conversion Setup

- [ ] Conversion tracking placeholder ready
- [ ] Conversion labels configurable
- [ ] Form submission event ready
- [ ] Schedule call event ready
- [ ] Phone click event ready
- [ ] No hardcoded conversion IDs

### Environment Variables Security

- [ ] All IDs stored in environment variables
- [ ] No secrets in frontend code
- [ ] `.env.local` is git-ignored
- [ ] No sensitive data in version control
- [ ] Vercel env vars configured

**Pixel/Ads Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 13. Redirect QA

### 301 Redirects Testing

For each redirect, verify:

- [ ] `/seo-services` → `/seo` (permanent)
- [ ] `/google-ads-service` → `/google-ads` (permanent)
- [ ] `/social-media-advertising` → `/social-media-ads` (permanent)
- [ ] `/lead-generation-services` → `/lead-generation` (permanent)
- [ ] `/content-marketing-services` → `/blog` (permanent)
- [ ] `/digital-marketing-services` → `/services` (permanent)
- [ ] `/contact-us` → `/contact` (permanent)
- [ ] `/work` → `/results` (permanent)

### Redirect Checks

- [ ] Old URL returns 301 status code
- [ ] Redirects are permanent (not 302)
- [ ] No redirect chains (A → B → C)
- [ ] No redirect loops (A → B → A)
- [ ] Old URLs do not show 404
- [ ] SEO value preserved (301 transfers authority)
- [ ] GA4 tracks to new URL, not old

**Redirect Issues Found:**
```
[ ] Old URL: __________________ | New URL: __________________ | Status: __________________
```

---

## 14. Broken Link QA

**Tool:** Use Screaming Frog, Broken Link Checker, or manual testing

### Headers Links

- [ ] Logo link works
- [ ] All nav links work
- [ ] CTA button link works
- [ ] Mobile menu links work

### Footer Links

- [ ] All service links work
- [ ] All company links work
- [ ] All support links work
- [ ] Phone link works (tel:)
- [ ] Email link works (mailto:)
- [ ] Social links work

### Content Links

- [ ] Internal service page links work
- [ ] Internal blog links work
- [ ] CTA section links work
- [ ] Related article links work
- [ ] Related service links work
- [ ] Case study links work
- [ ] FAQ links work

### External Links

- [ ] External links open in new tab
- [ ] External links don't break (verify 200 status)
- [ ] Social media links work
- [ ] Resource links work

### Specific Checks

- [ ] No 404 links
- [ ] No redirect chains
- [ ] No placeholder links (href="#")
- [ ] No empty href attributes
- [ ] No links to dev URLs (localhost, staging)

**Broken Links Found:**
```
[ ] URL: __________________ | Status: __________________ | Fix: __________________
```

---

## 15. Mobile QA

**Test on:** iPhone, Android, and tablet sizes

### Header & Navigation

- [ ] Header visible on mobile
- [ ] Hamburger menu visible
- [ ] Hamburger menu opens
- [ ] Hamburger menu closes
- [ ] Menu doesn't cover content
- [ ] All nav links accessible
- [ ] CTA visible on mobile

### Content & Layout

- [ ] No horizontal scrolling
- [ ] Text is readable (16px minimum)
- [ ] Images scale correctly
- [ ] Cards stack vertically
- [ ] Sections don't overlap
- [ ] Buttons easy to tap (44px minimum height)
- [ ] Form fields readable
- [ ] Dropdowns work
- [ ] Accordions work (FAQ)

### CTAs & Forms

- [ ] CTA buttons visible
- [ ] CTA buttons easy to tap
- [ ] Form fields accessible
- [ ] Form inputs work
- [ ] Submit button works
- [ ] Error messages visible
- [ ] Success message visible

### Calendly

- [ ] Calendly loads on mobile
- [ ] Calendly is usable on mobile
- [ ] Can complete booking on mobile
- [ ] No layout shift when loading

### Footer

- [ ] Footer visible
- [ ] Footer links accessible
- [ ] Phone number clickable
- [ ] Email link clickable
- [ ] No footer scrolling issues

### Blog

- [ ] Blog posts readable on mobile
- [ ] Related posts visible
- [ ] TOC accessible
- [ ] Sidebar doesn't block content

### Performance

- [ ] Page loads quickly on mobile
- [ ] No excessive animation or lag
- [ ] Scrolling is smooth
- [ ] Images load properly

**Mobile Issues Found:**
```
[ ] Device/Size: __________________ | Issue: __________________ | Fix: __________________
```

---

## 16. Tablet QA

**Test on:** iPad (landscape/portrait), Android tablet

### Layout

- [ ] Navigation works
- [ ] Hero sections look balanced
- [ ] Service cards align properly
- [ ] Pricing cards aligned
- [ ] Comparison tables readable
- [ ] Blog layout proper

### Forms & CTAs

- [ ] Contact form easy to fill
- [ ] Calendly works
- [ ] Buttons easy to tap
- [ ] Dropdown menus work

### Content

- [ ] Text is readable
- [ ] Images display properly
- [ ] No excessive white space
- [ ] Tables are scrollable if needed

**Tablet Issues Found:**
```
[ ] Device: __________________ | Issue: __________________ | Fix: __________________
```

---

## 17. Desktop QA

**Test on:** 1280px, 1440px, 1920px, 2560px screens

### Layout & Spacing

- [ ] Hero sections balanced
- [ ] Cards align in grid
- [ ] Columns align properly
- [ ] Spacing consistent
- [ ] No excessive white space
- [ ] No overlapping elements
- [ ] Footer columns align

### Navigation

- [ ] Header sticky works
- [ ] Dropdown menus open correctly
- [ ] Hover states visible
- [ ] Sidebar doesn't overlap content

### Content

- [ ] Paragraphs not too wide
- [ ] Tables readable
- [ ] Code blocks formatted
- [ ] Images at proper size

### Performance

- [ ] Page loads quickly
- [ ] Smooth scrolling
- [ ] Animations smooth
- [ ] No janky interactions

**Desktop Issues Found:**
```
[ ] Screen Size: __________________ | Issue: __________________ | Fix: __________________
```

---

## 18. Browser QA

**Test on:** Chrome, Safari, Firefox, Edge

### Chrome

- [ ] All features work
- [ ] No console errors
- [ ] Forms submit
- [ ] Animations smooth
- [ ] No layout issues

### Safari

- [ ] All features work
- [ ] No console errors
- [ ] Forms submit
- [ ] Animations smooth
- [ ] CSS works correctly

### Firefox

- [ ] All features work
- [ ] No console errors
- [ ] Forms submit
- [ ] Animations smooth

### Edge

- [ ] All features work
- [ ] No console errors
- [ ] Forms submit

### Cross-Browser Checks

- [ ] Fonts display correctly
- [ ] Colors accurate
- [ ] Buttons functional
- [ ] Forms work
- [ ] Calendly loads
- [ ] No performance issues

**Browser Issues Found:**
```
[ ] Browser: __________________ | Issue: __________________ | Fix: __________________
```

---

## 19. Performance QA

**Tools:** Google PageSpeed Insights, Lighthouse, WebPageTest

### Lighthouse Scores Target

- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 95+

### Core Web Vitals Target

- [ ] LCP (Largest Contentful Paint): < 2.5 seconds
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] INP (Interaction to Next Paint): In green range

### Performance Optimizations

- [ ] Images optimized (WebP/AVIF)
- [ ] Next.js Image component used
- [ ] Lazy loading enabled
- [ ] Calendly lazy-loaded
- [ ] Fonts optimized
- [ ] JavaScript minimized
- [ ] CSS minimized
- [ ] No unused code
- [ ] No render-blocking resources
- [ ] No unused third-party scripts

### Specific Checks

- [ ] No layout shifts when elements load
- [ ] No cumulative layout shift issues
- [ ] Button clicks respond quickly
- [ ] Form inputs are responsive
- [ ] Scrolling is 60 FPS

### Performance by Page

- [ ] Homepage: LCP < 2.5s
- [ ] Service pages: LCP < 2.5s
- [ ] Blog posts: LCP < 3.0s
- [ ] Contact page: LCP < 2.5s

**Performance Issues Found:**
```
[ ] Page: __________________ | Metric: __________________ | Issue: __________________
```

---

## 20. Accessibility QA

**Tool:** axe DevTools, WAVE, Lighthouse Accessibility

### Images & Media

- [ ] All images have alt text
- [ ] Alt text is descriptive
- [ ] Decorative images have empty alt
- [ ] Logo alt text: "MappedSkills Marketing"
- [ ] Hero images have meaningful alt text

### Forms & Inputs

- [ ] All form fields have labels
- [ ] Labels are associated with inputs
- [ ] Error messages are clear
- [ ] Error messages linked to fields
- [ ] Placeholder text not used as labels
- [ ] Required fields marked

### Navigation & Links

- [ ] All links have descriptive text
- [ ] No "click here" links
- [ ] Links are keyboard accessible
- [ ] Focus states visible
- [ ] No link underlines removed without alt styling

### Keyboard Navigation

- [ ] Tab order is logical
- [ ] Can navigate forms with keyboard
- [ ] Can submit forms with Enter
- [ ] Can close modals with Escape
- [ ] Hamburger menu operable with keyboard

### Color & Contrast

- [ ] Text contrast ratio: 4.5:1 minimum
- [ ] Button contrast ratio: 4.5:1 minimum
- [ ] Don't rely on color alone (use text)
- [ ] Color-blind friendly design

### Heading Structure

- [ ] H1 at top of page
- [ ] One H1 per page only
- [ ] Heading order is logical (H1 → H2 → H3)
- [ ] No skipped heading levels

### ARIA & Semantics

- [ ] Proper semantic HTML (main, nav, section, article)
- [ ] ARIA labels where needed
- [ ] No duplicate IDs
- [ ] No empty buttons

### Accessible Components

- [ ] FAQ accordions keyboard operable
- [ ] Dropdowns keyboard operable
- [ ] Modals accessible
- [ ] Skip to main content link (if applicable)

**Accessibility Issues Found:**
```
[ ] Component: __________________ | Issue: __________________ | Fix: __________________
```

---

## 21. Content QA

### Copy Review

- [ ] No spelling mistakes
- [ ] No grammar errors
- [ ] No placeholder text visible
- [ ] No fake claims
- [ ] No unsupported guarantees
- [ ] No outdated information
- [ ] No generic fluff

### Specific Content Checks

- [ ] Phone number correct: +91 9873232662
- [ ] Email correct: info@mappedskills.com
- [ ] Company name: MappedSkills Marketing
- [ ] All titles match page topic
- [ ] All H1s unique and descriptive
- [ ] No duplicate H1s on page
- [ ] No duplicate H1s across site

### Content to Remove

- [ ] "We do everything" removed
- [ ] Fake guarantees removed
- [ ] Overpromising language removed
- [ ] Services limited to core 5
- [ ] Unsupported testimonials removed
- [ ] Fake badges removed
- [ ] Fake certifications removed

### Tone & Messaging

- [ ] Tone is professional and clear
- [ ] Business-focused language
- [ ] Service positioning consistent
- [ ] Messaging consistent across pages
- [ ] No contradictory claims

### Technical Content

- [ ] Code examples formatted correctly
- [ ] Code syntax highlighted
- [ ] No hardcoded values in content
- [ ] No API keys or secrets in examples

**Content Issues Found:**
```
[ ] Page: __________________ | Issue: __________________ | Fix: __________________
```

---

## 22. Blog QA

### Blog Listing Page

- [ ] Featured article appears at top
- [ ] Category filters work or placeholder noted
- [ ] Blog cards display properly
- [ ] Blog post links work
- [ ] Search placeholder if not implemented
- [ ] Newsletter form works or placeholder noted
- [ ] Pagination/load more works
- [ ] No broken images
- [ ] Meta description shows

### Individual Blog Posts

- [ ] H1 correct and descriptive
- [ ] Category badge visible and clickable
- [ ] Author visible: "Amit Gupta"
- [ ] Published date visible
- [ ] Updated date visible if updated
- [ ] Reading time visible (e.g., "8 min read")
- [ ] Featured image loads
- [ ] Featured image has alt text

### Blog Post Content

- [ ] Table of Contents works
- [ ] TOC links navigate to sections
- [ ] Heading hierarchy correct (no skips)
- [ ] Code blocks formatted if present
- [ ] Images have alt text
- [ ] No placeholder text

### Blog Post Sidebar

- [ ] Sticky sidebar works on desktop
- [ ] Related articles display (3+)
- [ ] Related services display (2+)
- [ ] CTA section present
- [ ] Newsletter signup works or placeholder

### Blog Post Footer

- [ ] Author info present
- [ ] Social sharing buttons work
- [ ] Related articles links work
- [ ] FAQ section works if present

### Blog Post Tracking

- [ ] GA4 event fires: `blog_post_view`
- [ ] Blog interactions tracked
- [ ] CTA clicks tracked
- [ ] Social shares tracked

### Blog Mobile Experience

- [ ] Blog post readable on mobile
- [ ] Related articles visible
- [ ] TOC accessible (collapsible if needed)
- [ ] Images scale properly
- [ ] No horizontal scrolling

**Blog Issues Found:**
```
[ ] Post: __________________ | Issue: __________________ | Fix: __________________
```

---

## 23. Pricing Page QA

### Pricing Cards Display

- [ ] Starter plan card visible
- [ ] Growth plan card visible (highlighted/featured)
- [ ] Enterprise plan card visible
- [ ] Cards stack properly on mobile
- [ ] Cards align on desktop

### Pricing Details

- [ ] Prices clear and not misleading
- [ ] "Growth" plan is recommended/highlighted
- [ ] Exclusions clear (does not include ad spend)
- [ ] Ad spend separation clear
- [ ] Free/paid features clear
- [ ] No fake discounts

### Comparison Table

- [ ] Table visible on desktop
- [ ] Table responsive on mobile
- [ ] All features listed
- [ ] Checkmarks/X marks clear
- [ ] Text readable

### CTAs

- [ ] Get Quote button works on each plan
- [ ] Buttons link to contact or custom form
- [ ] Button text clear
- [ ] Buttons accessible on mobile

### FAQ

- [ ] Pricing FAQ section present
- [ ] Questions answered
- [ ] Accordions work
- [ ] No unanswered questions

**Pricing Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 24. Results/Case Studies QA

### Results Page Listing

- [ ] Case study cards display
- [ ] Before/after metrics clear
- [ ] Client logos present (placeholder noted if needed)
- [ ] Cards link to individual case studies
- [ ] Category filters work if present
- [ ] Results claims are factual or marked as placeholders

### Individual Case Study

- [ ] H1 clear and descriptive
- [ ] Before metrics displayed
- [ ] After metrics displayed
- [ ] Results are specific numbers
- [ ] Results are realistic (not exaggerated)
- [ ] Service/approach explained
- [ ] Client quote/testimonial if genuine
- [ ] No fake testimonials
- [ ] No unsupported claims

### Case Study CTA

- [ ] CTA button present
- [ ] CTA links to contact or schedule call
- [ ] CTA tracking fires

### Results QA

- [ ] No fake case studies
- [ ] No exaggerated claims
- [ ] Results marked as estimates if applicable
- [ ] No "average results" as fact
- [ ] Disclaimers added if needed

**Results Issues Found:**
```
[ ] Case Study: __________________ | Issue: __________________ | Fix: __________________
```

---

## 25. Security QA

### HTTPS & SSL

- [ ] HTTPS enabled on all pages
- [ ] SSL certificate valid
- [ ] Green padlock in browser
- [ ] No mixed content warnings

### Secrets & Environment Variables

- [ ] No API keys in frontend code
- [ ] No secrets in public files
- [ ] Environment variables used for all IDs
- [ ] `.env.local` is git-ignored
- [ ] No secrets in version control
- [ ] `.env.example` provided for developers

### Form Security

- [ ] Form inputs validated
- [ ] Form inputs sanitized
- [ ] Spam protection placeholder added
- [ ] CSRF tokens if using forms
- [ ] No sensitive data in URLs

### Code Security

- [ ] No console.log of sensitive data
- [ ] No hardcoded credentials
- [ ] Dependencies up to date
- [ ] No known vulnerabilities
- [ ] Security headers configured

**Security Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 26. Vercel Deployment QA

### Local Build

- [ ] Build passes locally: `pnpm build`
- [ ] Build completes without errors
- [ ] Build completes without warnings
- [ ] Build time acceptable (< 60 seconds)

### TypeScript & Linting

- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Type checking passes

### Vercel Configuration

- [ ] Environment variables added in Vercel Settings
- [ ] All required env vars present:
  - [ ] NEXT_PUBLIC_SITE_URL
  - [ ] NEXT_PUBLIC_GTM_ID
  - [ ] NEXT_PUBLIC_GA4_ID
  - [ ] NEXT_PUBLIC_CALENDLY_URL
  - [ ] Others as needed
- [ ] Build command correct: `pnpm build`
- [ ] Start command correct: `pnpm start`

### Domain & SSL

- [ ] Production domain connected
- [ ] Domain points to Vercel
- [ ] SSL certificate active
- [ ] No SSL warnings

### Preview & Production

- [ ] Preview deployment tested
- [ ] Preview environment works
- [ ] Production deployment tested
- [ ] Production environment works
- [ ] Rollback strategy available

**Deployment Issues Found:**
```
[ ] Issue: __________________ | Fix: __________________
```

---

## 27. Launch Day Checklist

### Morning Before Launch

- [ ] **Full Website Walkthrough**
  - [ ] Visit homepage
  - [ ] Check all service pages
  - [ ] Check blog
  - [ ] Check FAQ
  - [ ] Check pricing
  - [ ] Check results
  - [ ] Check about
  - [ ] Check contact
  - [ ] Check thank you page

- [ ] **Mobile Testing**
  - [ ] Test on iPhone
  - [ ] Test on Android
  - [ ] Test tablet
  - [ ] Verify all CTAs work
  - [ ] Verify forms work

- [ ] **Core Functionality**
  - [ ] Contact form submission
  - [ ] Calendly booking
  - [ ] All CTA links
  - [ ] All internal links

- [ ] **Speed Testing**
  - [ ] Run Lighthouse
  - [ ] Run PageSpeed
  - [ ] Check Core Web Vitals
  - [ ] Verify LCP < 2.5s

- [ ] **Redirects**
  - [ ] Test old URLs redirect
  - [ ] Verify 301 status

- [ ] **Technical Verification**
  - [ ] Check robots.txt
  - [ ] Check sitemap.xml
  - [ ] Check schema markup
  - [ ] Verify SSL

- [ ] **Analytics**
  - [ ] Verify GA4 events firing
  - [ ] Verify GTM loading
  - [ ] Check DebugView in GA4

- [ ] **Cache Clearing**
  - [ ] Clear Vercel cache if needed
  - [ ] Clear CDN cache if needed
  - [ ] Clear browser cache

- [ ] **Domain Verification**
  - [ ] Domain points correctly
  - [ ] DNS configured
  - [ ] SSL working
  - [ ] Email MX records (if applicable)

- [ ] **Founder Approval**
  - [ ] [ ] Amit Gupta reviewed entire site
  - [ ] [ ] Amit Gupta approved messaging
  - [ ] [ ] Amit Gupta approved results/case studies
  - [ ] [ ] Amit Gupta gave go/no-go for launch

### Launch Hour

- [ ] [ ] Website is live
- [ ] [ ] Homepage loads
- [ ] [ ] Check real-time traffic in GA4
- [ ] [ ] Monitor error logs
- [ ] [ ] Monitor 404 errors
- [ ] [ ] Check form submissions coming through

### Post-Launch Verification

- [ ] [ ] Homepage loads in 3 browsers
- [ ] [ ] All service pages load
- [ ] [ ] Contact form works
- [ ] [ ] Schedule call works
- [ ] [ ] Analytics firing
- [ ] [ ] No critical errors in console

**Launch Day Issues Found:**
```
[ ] Time: __________________ | Issue: __________________ | Resolution: __________________
```

---

## 28. First 7 Days Post-Launch Monitoring

### Daily Checks

**Day 1-7 (Each Day):**

- [ ] Website uptime (is site up?)
- [ ] GA4 traffic present
- [ ] Form submissions coming through
- [ ] Schedule call clicks working
- [ ] Contact form errors (if any)
- [ ] 404 error count
- [ ] Broken links (if any)
- [ ] Core Web Vitals in green
- [ ] Mobile usability issues
- [ ] Page speed acceptable

### Hours 0-24

- [ ] Website loads without errors
- [ ] All pages accessible
- [ ] Contact form fully functional
- [ ] Calendly bookings working
- [ ] GA4 showing organic traffic
- [ ] No critical 404 errors
- [ ] No console errors on key pages

### Days 2-3

- [ ] Monitor Google Search Console for crawl errors
- [ ] Check for new 404 errors
- [ ] Verify Core Web Vitals stable
- [ ] Monitor form submission volume
- [ ] Check for any spike in errors

### Days 4-7

- [ ] Check Google Search Console indexing
- [ ] Review GA4 traffic sources
- [ ] Analyze conversion events
- [ ] Review form submission details
- [ ] Check mobile traffic performance
- [ ] Verify all external links still work
- [ ] Monitor bounce rate by page

### Lead Response

- [ ] Lead enquiries responded to within 24 hours
- [ ] Preferred: Within 2 hours
- [ ] Schedule call bookings confirmed
- [ ] Contact form submissions logged
- [ ] All leads tracked in CRM

**Post-Launch Issues Found:**
```
[ ] Date: __________________ | Issue: __________________ | Resolution: __________________
```

---

## 29. Final Launch Approval Criteria

**Website can go live ONLY when ALL of these are true:**

- [ ] All key pages live and working
- [ ] All CTAs working and tracked
- [ ] Contact form fully functional and tracked
- [ ] Calendly/Schedule page working
- [ ] Sitemap generated and working
- [ ] Robots.txt configured correctly
- [ ] Meta tags complete and unique
- [ ] Schema markup added and validated
- [ ] GA4 installed and events firing
- [ ] GTM installed and functioning
- [ ] Conversion tracking ready
- [ ] 301 redirects configured
- [ ] No broken critical links
- [ ] Mobile responsive and working
- [ ] Page speed acceptable (LCP < 2.5s)
- [ ] Core Web Vitals in green
- [ ] No placeholder text visible
- [ ] No fake testimonials or claims
- [ ] No fake badges or certifications
- [ ] Founder (Amit Gupta) approval received

**[ ] APPROVED FOR LAUNCH** - Date: __________________ - Approved by: __________________

---

## 30. Issues Tracking Log

### Critical Issues (Must Fix Before Launch)

| Issue | Location | Severity | Status | Fixed By |
|-------|----------|----------|--------|----------|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### High Priority Issues (Fix ASAP)

| Issue | Location | Severity | Status | Fixed By |
|-------|----------|----------|--------|----------|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### Medium Priority Issues (Fix Soon)

| Issue | Location | Severity | Status | Fixed By |
|-------|----------|----------|--------|----------|
|  |  |  |  |  |
|  |  |  |  |  |

### Low Priority Issues (Can Fix Post-Launch)

| Issue | Location | Severity | Status | Fixed By |
|-------|----------|----------|--------|----------|
|  |  |  |  |  |
|  |  |  |  |  |

---

## Sign-Off

**QA Lead:** ________________________ **Date:** __________________

**Founder/Owner:** ________________________ **Date:** __________________

**Developer:** ________________________ **Date:** __________________

---

## Notes

Use this space for additional notes, blockers, or observations:

```
_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________
```

---

**Document Version:** 1.0  
**Last Updated:** May 29, 2026  
**Status:** Ready for QA  
**Next Review:** After completing checklist
