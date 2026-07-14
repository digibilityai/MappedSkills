# MappedSkills Brand Upgrade - Implementation Checklist

## Phase 1: Foundation (Days 1-2)

### 1.1 Update globals.css
- [ ] Add CSS variables for new colors:
  - `--brand-red: #C41E3A`
  - `--dark-charcoal: #2C2C2C`
  - `--light-gray: #F5F5F5`
- [ ] Replace `--accent: #0066ff` with `--accent: #C41E3A`
- [ ] Update dark mode background: `#0a0a0a` → `#0F0F0F`
- [ ] Add typography variables:
  - `--font-heading: 'Montserrat'`
  - `--font-body: 'Inter'`

### 1.2 Update app/layout.tsx
- [ ] Import Montserrat font from next/font/google
- [ ] Import Inter font from next/font/google
- [ ] Add font classes to html element
- [ ] Verify fonts are loading correctly

### 1.3 Update Header.tsx
- [ ] Replace text logo with Image component
- [ ] Use Logo.png from provided URL
- [ ] Update navigation link fonts to Montserrat
- [ ] Update button colors to brand red
- [ ] Add hover effects to nav links
- [ ] Test mobile menu styling

### 1.4 Update Logo & Favicon
- [ ] Save Logo.png to /public/images/logo.png
- [ ] Save Favicon.png to /public/favicon.ico
- [ ] Update icon references in app/layout.tsx
- [ ] Test favicon displays in browser tab
- [ ] Test logo displays in header correctly

### 1.5 Verify Dependencies
- [ ] Confirm Framer Motion is installed: `npm list framer-motion`
- [ ] Run build to verify no errors: `pnpm build`
- [ ] Check for TypeScript errors: `pnpm tsc --noEmit`

---

## Phase 2: Component Upgrades (Days 3-5)

### 2.1 Upgrade Hero.tsx
- [ ] Add gradient background (charcoal fade)
- [ ] Update title to use Montserrat font
- [ ] Change subtitle/accent color to brand red
- [ ] Update button colors to brand red
- [ ] Add red accent decoration element (SVG triangle or div)
- [ ] Implement Framer Motion fade-in animation
- [ ] Test on mobile and desktop
- [ ] Verify animation performance

### 2.2 Upgrade ServiceCard.tsx
- [ ] Add 4-6px red left border
- [ ] Implement hover scale animation (1.03x)
- [ ] Add shadow increase on hover
- [ ] Update icon background color on hover to red
- [ ] Add arrow animation (slide right on hover)
- [ ] Update title font to Montserrat
- [ ] Test hover effects on all browsers

### 2.3 Upgrade CaseStudyCard.tsx
- [ ] Add red accent badge/label
- [ ] Implement hover lift animation (translateY)
- [ ] Update title font to Montserrat
- [ ] Make metrics use brand red color
- [ ] Add "View Case Study" CTA with arrow
- [ ] Animate arrow on hover
- [ ] Add image overlay effect

### 2.4 Upgrade PricingCard.tsx
- [ ] Add red border to featured/recommended plan
- [ ] Use red background for "Recommended" badge
- [ ] Make CTA button red
- [ ] Update plan name font to Montserrat
- [ ] Make price numbers larger and bold
- [ ] Change checkmark icons to red
- [ ] Add subtle background color to featured plan

### 2.5 Upgrade Other Card Components
- [ ] TestimonialCard.tsx - Red top border, red stars
- [ ] StatCard.tsx - Large Montserrat numbers, red metrics
- [ ] ValueCard.tsx - Red icon backgrounds
- [ ] BlogCard.tsx - Red featured badge
- [ ] All card components - consistent hover animations

### 2.6 Upgrade CTASection.tsx
- [ ] Use red background or strong red accent
- [ ] Make title large and Montserrat Bold
- [ ] Style buttons with red primary color
- [ ] Add decorative red elements
- [ ] Implement button animations (scale on hover)
- [ ] Improve spacing and emphasis

### 2.7 Upgrade Footer.tsx
- [ ] Add brand logo or mark at top
- [ ] Use red for section headers
- [ ] Apply Montserrat font to headers
- [ ] Add red accent line above footer
- [ ] Update link hover states to red
- [ ] Improve spacing and hierarchy

---

## Phase 3: Page Updates (Days 6-10)

### 3.1 Homepage (app/page.tsx)
- [ ] Hero section complete (red accents, gradient, animation)
- [ ] Service cards section (red borders, hover animations)
- [ ] Benefits section (updated value cards)
- [ ] Dashboard section (red highlights)
- [ ] Stats section (animate count-up on scroll)
- [ ] Case studies section (red accents, animations)
- [ ] Testimonials section (red accents)
- [ ] Blog section (featured post highlight)
- [ ] Final CTA section (red emphasis)
- [ ] Test full page flow
- [ ] Verify mobile responsiveness

### 3.2 Service Pages (6 pages)
- [ ] /services - Service overview with upgrades
- [ ] /google-ads - Red accents, animations
- [ ] /social-media-ads - Brand consistency
- [ ] /lead-generation - Upgraded cards and CTAs
- [ ] /seo - Red accents, animations
- [ ] /conversion-optimization - Updated components
- [ ] All - Apply same upgrade pattern
- [ ] All - Test on mobile and desktop

### 3.3 Results Page (/results)
- [ ] Hero section with red accent
- [ ] Case study cards with animations
- [ ] Filter buttons with red highlights
- [ ] Metrics display with large numbers
- [ ] "View Details" links with red arrows
- [ ] Dark background with white cards
- [ ] Test filtering functionality
- [ ] Verify animation performance

### 3.4 How It Works (/how-it-works)
- [ ] Step numbers - large red with Montserrat
- [ ] Timeline - red connecting lines
- [ ] Step descriptions - Montserrat headers
- [ ] Icon backgrounds - red color
- [ ] Arrows - animated red arrows
- [ ] Final CTA - red emphasis
- [ ] Test timeline visuals

### 3.5 About (/about)
- [ ] Hero section - red accent, gradient
- [ ] Team cards - red accent borders
- [ ] Story section - red quote highlights
- [ ] Values section - red icon accents
- [ ] Timeline - red dots and lines
- [ ] CTA buttons - brand red

### 3.6 Pricing (/pricing)
- [ ] Page hero - red accent
- [ ] Plan cards - recommended plan red highlight
- [ ] Feature icons - red checkmarks
- [ ] Pricing numbers - large Montserrat font
- [ ] Toggle annual/monthly - red highlight
- [ ] FAQ section - red accents
- [ ] Test interactivity

### 3.7 Contact (/contact)
- [ ] Hero section - red accent
- [ ] Form inputs - red focus states
- [ ] Submit button - large red button
- [ ] Contact info - red highlights
- [ ] Background - subtle dark charcoal
- [ ] Success message - red checkmark animation
- [ ] Test form submission

### 3.8 Schedule Call (/schedule-call)
- [ ] Page header - red accent
- [ ] Calendly embed - red highlight
- [ ] Instructions - Montserrat headers in red
- [ ] Background - dark charcoal
- [ ] Benefit bullets - red checkmarks
- [ ] Test Calendly functionality

### 3.9 FAQ (/faq)
- [ ] Hero section - red accent
- [ ] Accordion - red active state highlight
- [ ] Headers - Montserrat font
- [ ] Icons - red colored
- [ ] Category tabs - red highlight
- [ ] CTA section - red emphasis

### 3.10 Blog Pages (/blog, /blog/[slug])
- [ ] Blog listing - featured post red badge
- [ ] Blog cards - red borders, hover animations
- [ ] Article hero - red accent, gradient
- [ ] Article headers - Montserrat font
- [ ] Pull quotes - red vertical bar accent
- [ ] Related posts - red accents
- [ ] Author bio - red accent bar
- [ ] Newsletter CTA - red button
- [ ] Table of contents - red active indicators

### 3.11 Other Pages
- [ ] /thank-you - Red checkmark, success emphasis
- [ ] /404 - Red accent shapes, friendly messaging
- [ ] /about - Full brand upgrades
- [ ] All consistency checks

---

## Phase 4: Animations & Polish (Days 11-12)

### 4.1 Framer Motion Implementations
- [ ] Fade-in animations on scroll (Hero, Cards, Sections)
- [ ] Slide-in animations (Text from left/right)
- [ ] Scale animations on hover (All interactive elements)
- [ ] Stagger animations (Lists of items)
- [ ] Count-up animations (Stats/metrics)
- [ ] Icon animations (Rotation, pulse, slide)
- [ ] Parallax effects (Hero dashboard, backgrounds)
- [ ] Test performance (60fps target)
- [ ] Disable animations on `prefers-reduced-motion`

### 4.2 Micro-interactions
- [ ] Button hover states (scale, shadow)
- [ ] Link hover states (color change, underline)
- [ ] Input focus states (red border, shadow)
- [ ] Icon animations (Rotation, color change)
- [ ] Loading states (Spinning red accent)
- [ ] Form success feedback (Red checkmark animation)
- [ ] All smooth (0.3-0.6s duration)

### 4.3 Mobile Optimization
- [ ] Disable heavy animations on mobile
- [ ] Optimize for touch (larger tap targets)
- [ ] Test on iPhone, iPad, Android
- [ ] Verify performance on slower devices
- [ ] Check viewport meta tags

### 4.4 Polish & Edge Cases
- [ ] Test all state transitions
- [ ] Verify all interactions feel smooth
- [ ] Check for layout shifts
- [ ] Test dark mode (if applicable)
- [ ] Verify print styles (if needed)
- [ ] Test form error states
- [ ] Check loading states

---

## Phase 5: QA & Launch (Days 13-14)

### 5.1 Visual QA
- [ ] **All pages** - Brand red accents visible
- [ ] **All pages** - Montserrat used for headings
- [ ] **All pages** - Inter used for body text
- [ ] **Color contrast** - WCAG AA compliant
- [ ] **Spacing** - Consistent alignment
- [ ] **Typography** - Font sizes appropriate
- [ ] **Buttons** - All red and consistent
- [ ] **Cards** - Consistent styling
- [ ] **Forms** - Red focus states

### 5.2 Functionality QA
- [ ] Contact form submits correctly
- [ ] Calendly booking widget works
- [ ] All forms validate properly
- [ ] All links navigate correctly
- [ ] All CTAs functional
- [ ] All filters work
- [ ] All modal/dialogs functional
- [ ] Mobile menu opens/closes

### 5.3 Performance Audit
- [ ] Run Lighthouse on all pages
- [ ] Performance score > 85
- [ ] SEO score > 95
- [ ] Accessibility score > 90
- [ ] Best Practices > 85
- [ ] Core Web Vitals green
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP in green

### 5.4 Responsive Testing
- [ ] Mobile (320px) - No horizontal scrolling
- [ ] Tablet (768px) - Layout correct
- [ ] Desktop (1024px) - Spacing balanced
- [ ] XL (1280px+) - Content balanced
- [ ] Touch targets - Minimum 44px
- [ ] Text readable on all sizes
- [ ] Images responsive

### 5.5 Browser Compatibility
- [ ] Chrome/Edge (2024+) - All working
- [ ] Safari (16+) - All working
- [ ] Firefox (2024+) - All working
- [ ] Mobile Safari (iOS 15+) - All working
- [ ] Chrome Android - All working
- [ ] No console errors
- [ ] All animations smooth

### 5.6 SEO Verification
- [ ] Meta tags on all pages
- [ ] Open Graph tags correct
- [ ] Schema markup valid
- [ ] Sitemap generates correctly
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Images have alt text

### 5.7 Final Checks
- [ ] All pages built successfully
- [ ] No TypeScript errors
- [ ] No lint warnings
- [ ] No console errors
- [ ] All animations 60fps
- [ ] No broken links
- [ ] All forms working
- [ ] Ready for launch

---

## Approval Sign-Off

### Designer/Product
- [ ] Brand expression approved
- [ ] Color application approved
- [ ] Typography approved
- [ ] Animations approved
- [ ] Overall design approved

### Developer
- [ ] Code quality checked
- [ ] Performance optimized
- [ ] Mobile responsive
- [ ] Browser compatible
- [ ] Ready for production

### QA Lead
- [ ] All testing completed
- [ ] No critical issues
- [ ] Performance meets targets
- [ ] Mobile friendly
- [ ] Approved for launch

### Founder/Leadership
- [ ] Website approved
- [ ] Brand represented well
- [ ] Conversion-focused
- [ ] Ready to launch
- [ ] APPROVED FOR PRODUCTION

---

## Launch Readiness

All checkboxes completed: ✓ READY FOR LAUNCH

- Total checkboxes: 200+
- Estimated time: 14 days
- Team size: 2-3 developers

Deployment date: _____________
Launched by: _____________
Launch time: _____________

---

**Document Version:** 1.0
**Created:** May 29, 2026
**Status:** Ready to use
