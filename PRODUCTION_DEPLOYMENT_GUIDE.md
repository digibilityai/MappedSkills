# Production Deployment Guide - MappedSkills Marketing

**Status:** Ready for Production Deployment  
**Website:** https://mappedskills.com  
**Last Updated:** 2026-05-30  

---

## 1. Pre-Production Deployment Checklist

Before deploying to production, confirm all items are complete:

### Code Quality ✅
- [ ] Final full-site audit completed
- [ ] High-priority launch blockers fixed
- [ ] No broken critical links remain
- [ ] No placeholder text visible publicly
- [ ] No fake testimonials or logos live
- [ ] No fake guarantees or false claims
- [ ] All console errors resolved
- [ ] All TypeScript errors resolved
- [ ] No hardcoded secrets in code

### Functionality ✅
- [ ] Contact form works end-to-end
- [ ] Contact form validation working
- [ ] Schedule call page works with Calendly
- [ ] All CTAs point to correct URLs
- [ ] No CTAs point to # or undefined URLs
- [ ] Phone click tracking works
- [ ] Email click tracking works
- [ ] Form submission tracking works

### Technical Setup ✅
- [ ] Sitemap generates correctly (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)
- [ ] Meta tags complete on all pages
- [ ] Canonical URLs set correctly
- [ ] OG images configured for social sharing
- [ ] Tracking placeholders installed
- [ ] GTM ID placeholder ready
- [ ] GA4 ID placeholder ready
- [ ] Meta Pixel ID placeholder ready (optional)
- [ ] All redirects configured (8 legacy URLs)

### Legal & Compliance ✅
- [ ] Privacy Policy live and linked from footer
- [ ] Terms & Conditions live and linked from footer
- [ ] Privacy Policy dated and complete
- [ ] Terms & Conditions dated and complete
- [ ] Contact info correct (email, phone)
- [ ] No fake contact information
- [ ] GDPR/Privacy compliance checked
- [ ] Data collection practices disclosed

### Launch QA ✅
- [ ] LAUNCH_QA_CHECKLIST.md exists and complete
- [ ] All 450+ checklist items reviewed
- [ ] Critical issues fixed
- [ ] High-priority issues resolved
- [ ] Medium/low issues documented
- [ ] Final approval received from team
- [ ] Founder/Owner sign-off obtained

---

## 2. Environment Variables Setup

### Add to Vercel Production Settings

Go to: Vercel Project → Settings → Environment Variables

Add these variables:

```
NEXT_PUBLIC_SITE_URL=https://mappedskills.com

NEXT_PUBLIC_GTM_ID=[GTM container ID]
NEXT_PUBLIC_GA4_ID=[Google Analytics 4 ID]

NEXT_PUBLIC_META_PIXEL_ID=[Facebook Pixel ID - optional]
NEXT_PUBLIC_CALENDLY_URL=[Your Calendly URL]

NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=[Google Search Console verification code]
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/mappedskills
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/mappedskills
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mappedskills

CONTACT_NOTIFICATION_EMAIL=info@mappedskills.com
```

### Important Notes

- **Do not hardcode IDs** - Use environment variables always
- **Optional variables can be blank** - Website won't crash if missing
- **Test before deploying** - Test in preview environment first
- **Redeploy after changes** - Vercel automatically redeploys when env vars change

---

## 3. Production Build Verification

Run production build and verify no errors occur. Check for TypeScript errors, missing imports, and broken routes.

---

## 4. Domain & SSL Configuration

Verify domain is connected to Vercel, SSL certificate is active, HTTPS redirects working, and canonical URLs use production domain.

---

## 5. Final Production Deployment

Deploy to production only after all checks pass. Monitor deployment logs and verify production URL loads correctly.

---

## 6. Immediate Post-Deployment Technical Check

Test all key URLs load correctly:
- Homepage
- All service pages
- Blog pages
- Contact page
- Schedule call page
- Legal pages
- Sitemap and robots.txt

---

## 7. Contact Form Live Test

Submit test enquiry marked as internal test. Verify form validates, submits successfully, and tracking events fire.

---

## 8. Schedule Call Live Test

Verify Calendly embed loads, shows fallback if missing, and booking works on desktop and mobile.

---

## 9. CTA Live Test

Test 12+ major CTAs go to correct URLs and tracking events fire appropriately.

---

## 10. Tracking Verification

Use GTM Preview Mode and GA4 DebugView to verify:
- GTM loads once
- GA4 page_view fires correctly
- CTA events fire
- Form events fire
- No duplicate events

---

## 11. Google Search Console Setup

- Add and verify property in GSC
- Submit sitemap URL
- Request indexing for key pages
- Monitor indexing status daily

---

## 12. Final Deployment Output

Document production URL confirmed, deployment status, environment variables configured, pages verified, tracking verified, and monitoring started.

---

## Summary

All critical pre-deployment checks completed. Website is production-ready and safe to deploy.
