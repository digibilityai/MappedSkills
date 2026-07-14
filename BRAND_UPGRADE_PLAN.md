# MappedSkills Brand Upgrade Plan

## Executive Summary

The MappedSkills website will be upgraded from a vanilla Next.js marketing site into a modern, interactive, branded performance marketing agency website. All existing routes, structure, and content will be preserved while applying the new MappedSkills design system and brand identity.

**Design System:**
- Primary Red: #C41E3A (CTAs, accents, highlights)
- Dark Charcoal: #2C2C2C (dark backgrounds, primary text)
- Light Gray: #F5F5F5 (backgrounds, subtle accents)
- White: #FFFFFF (cards, contrast)
- Headings: Montserrat (bold, modern)
- Body: Inter (readable, professional)

**Key Upgrade Principles:**
- Preserve all routes and page structure
- Enhance UX with modern interactions
- Apply brand colors strategically (especially red accents)
- Add animations using Framer Motion (sparingly)
- Maintain fast, mobile-first, SEO-friendly design
- Improve conversion focus throughout

---

## Part 1: Styling System Upgrade

### 1.1 Update globals.css - Design Tokens

**Current State:** Blue accent (#0066ff), generic neutrals

**Changes Needed:**
- [ ] Replace primary brand color from #0066ff to #C41E3A (MappedSkills Red)
- [ ] Update accent color to #C41E3A across all themes
- [ ] Update typography tokens to include Montserrat (headings) and Inter (body)
- [ ] Define new color variables:
  - `--brand-red: #C41E3A`
  - `--dark-charcoal: #2C2C2C`
  - `--light-gray: #F5F5F5`
- [ ] Update dark mode background to be slightly warmer (#0F0F0F instead of pure black)

**Impact:** Affects all pages globally through CSS variables

---

## Part 2: Core Components Upgrade (11 components)

### 2.1 Header.tsx - Brand Integration

**Current State:** Text-only logo "MappedSkills"

**Upgrade Required:**
- [ ] Replace text logo with Logo.png image (hosted at provided URL)
- [ ] Add red accent stripe or element to header
- [ ] Make navigation links use Montserrat font
- [ ] Add hover effects with red color accent
- [ ] Update button styling to use brand red (#C41E3A)
- [ ] Improve mobile navigation styling
- [ ] Add subtle shadow/border for depth

**Key Changes:**
```
- Logo: Text → Logo.png (with Clicks to Customers tagline)
- Nav Font: Geist → Montserrat
- Button Color: Blue → Brand Red
- Hover Effects: Subtle charcoal fade
```

### 2.2 Footer.tsx - Brand Consistency

**Current State:** Generic footer

**Upgrade Required:**
- [ ] Add brand logo or mark at top of footer
- [ ] Use brand red for section headers
- [ ] Apply Montserrat font to headers
- [ ] Add subtle red accent line above footer
- [ ] Update link hover states to use brand red
- [ ] Improve spacing and visual hierarchy

### 2.3 Hero.tsx - Premium B2B SaaS Style

**Current State:** Basic centered hero with text and buttons

**Upgrade Required:**
- [ ] Add gradient background (charcoal to slightly lighter)
- [ ] Add decorative red accent element (triangle or line) to hero
- [ ] Implement scroll reveal animation (Framer Motion)
- [ ] Use Montserrat for title (bolder, more impact)
- [ ] Style CTA buttons with brand red
- [ ] Add subtle background animation or pattern
- [ ] Improve visual hierarchy with better spacing

**Key Changes:**
```
- Background: Solid → Gradient (charcoal fade)
- Title Font: Geist → Montserrat
- Subtitle: Blue → Brand Red
- CTA Buttons: Blue → Brand Red with hover scale animation
- Add: Red accent triangle decoration
- Animation: Hero content fade-in on scroll
```

### 2.4 HeroDashboard.tsx - Visual Impact

**Current State:** Dashboard mockup component

**Upgrade Required:**
- [ ] Add red accent border or highlight to dashboard mockup
- [ ] Implement parallax scroll effect
- [ ] Add subtle shadow beneath dashboard
- [ ] Use Montserrat for any text overlays
- [ ] Improve contrast and visual prominence
- [ ] Add hover state that reveals interaction hints

### 2.5 ServiceCard.tsx - Interactive Cards

**Current State:** Simple service card

**Upgrade Required:**
- [ ] Add red accent left border (4-6px width)
- [ ] Implement hover scale animation (1.02-1.05x)
- [ ] Add red background to icon area on hover
- [ ] Use Montserrat for service titles
- [ ] Improve spacing and padding
- [ ] Add subtle shadow that increases on hover
- [ ] Implement arrow icon that animates on hover

**Key Changes:**
```
- Left Border: None → 4px Brand Red
- Hover: Static → Scale 1.03 + shadow increase
- Icon Bg: Gray → Brand Red (on hover)
- Arrow: Static → Slide right (0.3s animation)
- Font: Service title → Montserrat Bold
```

### 2.6 CaseStudyCard.tsx - Results Showcase

**Current State:** Case study card with basic styling

**Upgrade Required:**
- [ ] Add red accent badge or label
- [ ] Implement hover lift animation (translateY)
- [ ] Use Montserrat for headings
- [ ] Add red metric highlight (use brand red for stat values)
- [ ] Improve card shadow and depth
- [ ] Add "View Case Study" CTA with arrow that animates
- [ ] Implement image overlay with red accent on hover

### 2.7 PricingCard.tsx - Premium Positioning

**Current State:** Pricing plan card

**Upgrade Required:**
- [ ] Highlight recommended plan with red accent border
- [ ] Use brand red for "Recommended" badge
- [ ] Make CTA button red with white text
- [ ] Use Montserrat for plan names
- [ ] Add red checkmark icons for features
- [ ] Improve pricing display with larger, bolder Montserrat font
- [ ] Add subtle background color for featured plan

### 2.8 TestimonialCard.tsx - Social Proof

**Current State:** Basic testimonial card

**Upgrade Required:**
- [ ] Add red accent top border or bar
- [ ] Use Montserrat for author names
- [ ] Add red star rating icons
- [ ] Improve quote styling with red accent quote mark
- [ ] Add subtle background color distinction
- [ ] Implement hover animation for deeper shadow

### 2.9 StatCard.tsx - Metrics Display

**Current State:** Simple stat card

**Upgrade Required:**
- [ ] Make numbers larger and use Montserrat Bold
- [ ] Use brand red for percentage increases (green → red with growth arrow)
- [ ] Add red accent line or bar chart
- [ ] Implement count animation (numbers count up on scroll)
- [ ] Add subtle background color differentiation
- [ ] Use Montserrat for labels

### 2.10 ValueCard.tsx - Benefits Display

**Current State:** Value proposition card

**Upgrade Required:**
- [ ] Add red accent icon background
- [ ] Use Montserrat for titles
- [ ] Implement hover scale animation
- [ ] Add red checkmark or icon highlight
- [ ] Improve spacing and visual weight
- [ ] Add subtle border or shadow on hover

### 2.11 CTASection.tsx - Call-to-Action Module

**Current State:** Generic CTA section

**Upgrade Required:**
- [ ] Use red background or strong red accent
- [ ] Make title large and Montserrat Bold
- [ ] Style buttons with contrasting colors (red primary, white secondary)
- [ ] Add decorative red elements (shapes, accent lines)
- [ ] Implement button animation (scale on hover)
- [ ] Improve spacing and visual emphasis

---

## Part 3: Page Upgrades (18 pages)

### 3.1 Homepage (app/page.tsx)

**Current State:** 12+ sections of content

**Upgrade Required:**
- [ ] Hero section: Add red accent element, gradient background
- [ ] SocialProofStrip: Use red for brand mentions
- [ ] Service cards section: Apply card upgrades (red borders, hover animations)
- [ ] Problems section: Add red accent to problem icons
- [ ] Benefits section: Apply value card upgrades
- [ ] Dashboard section: Apply HeroDashboard upgrades
- [ ] Stats section: Implement number count animations
- [ ] Case studies section: Apply card upgrades
- [ ] Testimonials section: Apply card upgrades
- [ ] Blog section: Highlight featured post with red accent
- [ ] Final CTA section: Strong red emphasis with animation

**Priority:** HIGH (Homepage has highest impact)

### 3.2 Services Pages (5 pages)

**Pages:**
- /services (overview)
- /google-ads
- /social-media-ads
- /lead-generation
- /conversion-optimization
- /seo

**Upgrade Required per page:**
- [ ] Hero section: Add service-specific red accent shape
- [ ] Service cards: Red borders and hover animations
- [ ] Results/stats: Animated stat cards
- [ ] Process section: Red accent on step numbers or backgrounds
- [ ] FAQ section: Red accent on active accordion items
- [ ] Final CTA: Strong red emphasis
- [ ] Service icon: Large red highlight behind icon

**Priority:** HIGH (Main service pages need consistency)

### 3.3 Results Page (/results)

**Upgrade Required:**
- [ ] Hero: Red accent, Montserrat title
- [ ] Case study cards: Red accents, hover animations, animated metrics
- [ ] Filter buttons: Red highlight for active filters
- [ ] Result metrics: Large Montserrat numbers in red
- [ ] "View Details" links: Red color with arrow animation
- [ ] Overall layout: Darker background with white cards

**Priority:** HIGH (Conversion-critical page)

### 3.4 How It Works (/how-it-works)

**Upgrade Required:**
- [ ] Step numbers: Large red numbers with Montserrat font
- [ ] Process timeline: Red connecting lines
- [ ] Step descriptions: Montserrat for headers
- [ ] Card backgrounds: Alternating light gray and white
- [ ] Icons: Red accent backgrounds
- [ ] Arrows between steps: Animated red arrows
- [ ] Final CTA: Strong red emphasis

### 3.5 About (/about)

**Upgrade Required:**
- [ ] Hero section: Red accent, gradient
- [ ] Team cards: Red accent borders
- [ ] Story section: Red highlight for key quotes
- [ ] Values section: Red accent icons
- [ ] Timeline: Red dots and connecting lines
- [ ] CTA buttons: Brand red styling

### 3.6 Pricing (/pricing)

**Upgrade Required:**
- [ ] Page hero: Red accent
- [ ] Plan comparison: Recommended plan with red highlight
- [ ] CTA buttons: All brand red
- [ ] Feature icons: Red checkmarks
- [ ] Pricing numbers: Large Montserrat font, possibly red
- [ ] Toggle annual/monthly: Red highlight for selected
- [ ] FAQ section: Red accents

**Priority:** HIGH (Conversion page)

### 3.7 Contact (/contact)

**Upgrade Required:**
- [ ] Hero section: Red accent
- [ ] Form: Red focus states on inputs
- [ ] Submit button: Large red button
- [ ] Contact info: Red highlight on phone/email
- [ ] Background: Subtle dark charcoal or pattern
- [ ] Success message: Red accent checkmark

**Priority:** HIGH (Conversion page)

### 3.8 Schedule Call (/schedule-call)

**Upgrade Required:**
- [ ] Page header: Red accent, Montserrat
- [ ] Calendly embed: Red highlight around calendar
- [ ] Instructions text: Montserrat headers in red
- [ ] Background: Dark charcoal with subtle pattern
- [ ] Benefit bullets: Red checkmarks/bullets

**Priority:** HIGH (Direct conversion page)

### 3.9 FAQ (/faq)

**Upgrade Required:**
- [ ] Hero section: Red accent
- [ ] Accordion items: Red accent on active state
- [ ] Accordion headers: Montserrat font
- [ ] Question icons: Red colored
- [ ] Category tabs: Red highlight for active
- [ ] CTA section: Red emphasis

### 3.10 Blog Pages (/blog, /blog/[slug])

**Upgrade Required:**
- [ ] Blog listing: Featured post with red accent badge
- [ ] Blog card: Red accent border, hover animation
- [ ] Article hero: Red accent, gradient background
- [ ] Article headers (H2, H3): Montserrat font
- [ ] Pull quotes: Red accent vertical bar on left
- [ ] Related posts: Red accent on cards
- [ ] Author bio: Red accent bar or background
- [ ] Newsletter CTA: Red button, strong emphasis
- [ ] Table of contents: Red accent dots for current section

**Priority:** MEDIUM-HIGH (Blog is important for SEO)

### 3.11 Other Pages (4 pages)

**Pages:**
- /thank-you
- /404 (not-found)
- /how-it-works
- /launch-checklist

**Upgrade Required:**
- [ ] /thank-you: Red checkmark, success message emphasis
- [ ] /404: Red accent shapes, friendly messaging
- [ ] All: Consistent red accents, Montserrat headers, animations

---

## Part 4: Animation & Interaction Strategy

### 4.1 Framer Motion Implementation

**What to Add:**
- [ ] Fade-in animations on scroll (hero sections, cards)
- [ ] Slide-in animations for text (from left/right on scroll)
- [ ] Scale animations on hover (cards, buttons)
- [ ] Stagger animations for lists (case studies, testimonials)
- [ ] Count-up animations for stats (number animations)
- [ ] Icon rotation/pulse animations (CTAs)
- [ ] Arrow slide animations (read more, CTA arrows)
- [ ] Parallax effects (hero dashboard, background)

**Implementation Approach:**
- Use `useInView` hook for scroll-based triggers
- Keep animations 0.3-0.6s duration (fast, not slow)
- Use `spring` physics for natural motion
- No animations on mobile for performance (use `prefers-reduced-motion`)

### 4.2 Micro-interactions

**Add to:**
- [ ] Button hover states (scale 1.05, shadow increase)
- [ ] Link hover states (color change to red, underline animation)
- [ ] Input focus states (red border, shadow)
- [ ] Icon animations (rotation, color change on hover)
- [ ] Loading states (spinning red accent)
- [ ] Form success feedback (red checkmark animation)

---

## Part 5: Logo & Favicon Updates

### 5.1 Replace Logo

**File:** /components/Header.tsx

**Current:**
```tsx
<span className="text-xl font-bold tracking-tight text-foreground">
  MappedSkills
</span>
```

**Updated:**
```tsx
<Image
  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-rDvI8KqnrSJIHeOkRkjHU0vM6nF5x6.png"
  alt="MappedSkills - Clicks to Customers"
  width={180}
  height={48}
  className="h-12 w-auto"
  priority
/>
```

**Also add to Footer** (smaller version at bottom)

### 5.2 Update Favicon

**Files to Update:**
- [ ] /public/favicon.ico → Replace with favicon
- [ ] /public/icon.svg → Replace with icon version
- [ ] /public/apple-icon.png → Update apple icon
- [ ] app/layout.tsx → Update icon configuration

**Action:** Save favicon.png to /public/favicon.ico and icon configs

---

## Part 6: Typography System Update

### 6.1 Add Fonts to layout.tsx

**Current:** Only Geist fonts

**Add:**
```tsx
import { Montserrat, Inter } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});
```

### 6.2 Update globals.css

**Add theme variables:**
```css
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Inter', sans-serif;
```

### 6.3 Create Typography Classes

**Add to globals.css:**
```css
.font-heading { @apply font-montserrat font-bold; }
.font-body { @apply font-inter; }
.h1-style { @apply text-4xl md:text-6xl font-montserrat font-bold; }
.h2-style { @apply text-3xl md:text-4xl font-montserrat font-bold; }
```

---

## Part 7: Color System Integration

### 7.1 Create Color Constants

**File:** Create /lib/colors.ts

```ts
export const colors = {
  brand: {
    red: '#C41E3A',
    charcoal: '#2C2C2C',
    lightGray: '#F5F5F5',
    white: '#FFFFFF',
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
};
```

### 7.2 Update CSS Variables in globals.css

```css
--brand-red: #C41E3A;
--dark-charcoal: #2C2C2C;
--light-gray: #F5F5F5;
```

### 7.3 Replace Color Usage

- [ ] All accent colors: #0066ff → #C41E3A
- [ ] All primary buttons: Update to red
- [ ] All hover states: Use brand red
- [ ] Background accents: Use charcoal
- [ ] Highlights: Use brand red

---

## Implementation Roadmap

### Phase 1: Foundation (Days 1-2)
1. [ ] Update globals.css with new color system and typography
2. [ ] Add Montserrat and Inter fonts to layout.tsx
3. [ ] Update Header.tsx with logo image
4. [ ] Update logo/favicon in public folder
5. [ ] Install/verify Framer Motion is available

### Phase 2: Component Upgrades (Days 3-5)
1. [ ] Upgrade Hero.tsx
2. [ ] Upgrade ServiceCard.tsx
3. [ ] Upgrade CaseStudyCard.tsx
4. [ ] Upgrade PricingCard.tsx
5. [ ] Upgrade other card components
6. [ ] Upgrade CTASection.tsx
7. [ ] Update Footer.tsx

### Phase 3: Page Updates (Days 6-10)
1. [ ] Upgrade Homepage
2. [ ] Upgrade Service pages
3. [ ] Upgrade Results page
4. [ ] Upgrade Pricing page
5. [ ] Upgrade Contact page
6. [ ] Upgrade Schedule Call page
7. [ ] Upgrade Other pages

### Phase 4: Animations & Polish (Days 11-12)
1. [ ] Add Framer Motion animations to key sections
2. [ ] Add hover/interaction effects
3. [ ] Add scroll reveal animations
4. [ ] Test on mobile and desktop
5. [ ] Performance optimization
6. [ ] Final QA

### Phase 5: Testing & Launch (Days 13-14)
1. [ ] Full QA across all pages
2. [ ] Mobile responsiveness testing
3. [ ] Browser compatibility
4. [ ] Performance audit (Lighthouse)
5. [ ] A/B testing setup (if needed)
6. [ ] Final deployment

---

## Component Upgrade Priority Matrix

### CRITICAL (Do First)
1. globals.css - affects everything
2. Header.tsx - brand visibility
3. Hero.tsx - homepage impact
4. Button styling - CTAs everywhere
5. CaseStudyCard.tsx - conversion impact

### HIGH (Do Next)
1. ServiceCard.tsx - main service pages
2. CTASection.tsx - conversions
3. PricingCard.tsx - pricing page
4. Homepage - biggest page
5. Service pages - traffic

### MEDIUM (Then Do)
1. BlogCard.tsx - SEO importance
2. TestimonialCard.tsx - social proof
3. FAQSection.tsx - engagement
4. Other card components
5. Remaining pages

### LOW (Optional Polish)
1. Admin/internal pages
2. Analytics pages
3. Development tools

---

## Testing Checklist

### Visual Design
- [ ] All red accents properly applied
- [ ] Montserrat font used for all headings
- [ ] Inter font used for body text
- [ ] Color contrast passes WCAG AA
- [ ] Spacing and alignment consistent

### Interactions
- [ ] Hover states working on all interactive elements
- [ ] Button animations smooth and performant
- [ ] Scroll animations triggering correctly
- [ ] Forms interactive and validated
- [ ] Links and CTAs functional

### Performance
- [ ] Page load time < 3 seconds
- [ ] Lighthouse Performance score > 85
- [ ] Lighthouse SEO score > 95
- [ ] No layout shift issues
- [ ] Images optimized

### Responsive
- [ ] Mobile (320px+) fully responsive
- [ ] Tablet (768px+) layout correct
- [ ] Desktop (1024px+) spacing balanced
- [ ] Touch targets minimum 44px
- [ ] No horizontal scrolling

### Cross-browser
- [ ] Chrome/Edge - 2024+
- [ ] Safari - 16+
- [ ] Firefox - 2024+
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## Success Metrics

After upgrade completion:
- [ ] All pages load with new branding
- [ ] No visual regressions vs. current design
- [ ] Conversion rate maintained or improved
- [ ] Page performance not degraded
- [ ] Mobile responsiveness perfect
- [ ] All animations smooth (60fps)
- [ ] Team approves brand expression
- [ ] Ready for launch

---

## Notes

- Do NOT rebuild from scratch - preserve all routes and content
- Do NOT over-animate - use animations to enhance, not distract
- DO maintain fast load times and SEO friendliness
- DO ensure mobile-first responsive design
- DO test thoroughly before launching
- DO get stakeholder approval on brand expression

---

Generated: May 29, 2026
Status: Ready for implementation
Next Step: Begin Phase 1 - Foundation
