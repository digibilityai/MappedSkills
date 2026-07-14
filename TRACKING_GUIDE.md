# MappedSkills Tracking & Analytics Guide

## Overview
This document defines all tracking events implemented across the MappedSkills website. All events are tracked via Google Analytics 4 (GA4) through Google Tag Manager (GTM).

**GTM Container ID:** `GTM-XXXXXX` (set via environment variable)
**GA4 Measurement ID:** `G-XXXXXXXXXX` (set via environment variable)

---

## A. Page View Events

All page views are automatically tracked by GA4. Custom events below track user interactions.

### Standard GA4 Events
- `page_view` - Page loaded (automatic, includes page_title, page_location, page_path)
- `scroll` - User scrolled (automatic)
- `click` - Link/button clicked (automatic)
- `form_start` - Form interaction started (automatic)
- `form_submit` - Form submitted (automatic)

---

## B. CTA & Navigation Events (30+ Events)

### Hero CTA Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `hero_cta_primary` | Primary CTA clicked in hero | location: page_name, cta_text |
| `hero_cta_secondary` | Secondary CTA clicked in hero | location: page_name, cta_text |
| `hero_learn_more` | Learn more / scroll trigger | location: page_name |

### Service Page Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `service_explore_click` | "Explore Service" link clicked | service: service_name |
| `service_pricing_view` | Pricing section scrolled into view | service: service_name |
| `service_case_study_click` | Case study/result link clicked | service: service_name |
| `service_faq_expand` | FAQ accordion expanded | service: service_name, question |

### Schedule Call Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `schedule_call_click` | Schedule call button clicked | source: page_name, cta_location |
| `schedule_call_form_start` | Calendly form started | source: page_name |
| `schedule_call_form_complete` | Calendly booking completed | source: page_name, meeting_type |
| `schedule_call_form_abandon` | Calendly form abandoned | source: page_name, step |

### Contact Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `contact_click` | Contact button clicked | source: page_name |
| `contact_form_start` | Contact form interaction started | source: page_name |
| `contact_form_submit` | Contact form submitted | source: page_name, service_interest |
| `contact_form_abandon` | Contact form abandoned | source: page_name, step |

### Inquiry Form Events (Lead Magnet)
| Event | Trigger | Properties |
|-------|---------|-----------|
| `inquiry_form_start` | Inquiry form started | source: page_name |
| `inquiry_form_submit` | Inquiry form submitted | source: page_name, business_type, budget_range |
| `inquiry_form_error` | Inquiry form error | source: page_name, error_field |
| `inquiry_form_abandon` | Inquiry form abandoned | source: page_name, step |

### Direct Contact Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `phone_click` | Phone number clicked (tel: link) | phone: +91 9873232662, source: page_name |
| `email_click` | Email link clicked (mailto: link) | email: info@mappedskills.com, source: page_name |
| `whatsapp_click` | WhatsApp link clicked | source: page_name |

### Link Engagement
| Event | Trigger | Properties |
|-------|---------|-----------|
| `internal_link_click` | Internal link clicked | link_text, link_destination, source_page |
| `external_link_click` | External link clicked | link_url, link_text, source_page |
| `blog_link_click` | Blog article link clicked | article_title, source: page_name |
| `resource_download_click` | Resource/PDF download clicked | resource_name, source: page_name |

---

## C. Content Engagement Events

### Blog Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `blog_page_view` | Blog index page loaded | post_count |
| `blog_post_view` | Blog article loaded | article_title, article_slug, reading_time |
| `blog_post_scroll_depth` | Reading progress tracked | article_title, scroll_percentage (25/50/75/100) |
| `blog_post_share` | Share button clicked | article_title, share_platform |
| `blog_post_comment_start` | Comment form started | article_title |
| `blog_cta_click` | CTA within blog article clicked | article_title, cta_text, position |

### FAQ Events
| Event | Trigger | Properties |
|-------|---------|-----------|
| `faq_page_view` | FAQ page loaded | faq_count |
| `faq_expand` | FAQ accordion expanded | question_text, category |
| `faq_search` | FAQ search performed | search_term, results_count |

### Results/Case Studies
| Event | Trigger | Properties |
|-------|---------|-----------|
| `case_study_view` | Case study page loaded | company_name, industry |
| `case_study_metric_view` | Key metric section scrolled into view | metric_type: leads/revenue/roi |
| `case_study_testimonial_play` | Video testimonial play clicked | company_name |

---

## D. Video & Media Events

| Event | Trigger | Properties |
|-------|---------|-----------|
| `video_start` | Video playback started | video_title, video_duration |
| `video_complete` | Video fully watched | video_title, watch_time |
| `video_engagement` | Video progress tracked | video_title, progress_percent (25/50/75) |

---

## E. Page-Specific Events

### Thank You Page (Conversion)
- `thank_you_page_view` - Page loaded (conversion confirmation)
- `schedule_call_click` - Fast-track booking from thank you page
- `service_explore_click` - Service card clicked from thank you
- `related_article_click` - Blog article clicked from thank you
- `phone_click` - Phone number clicked from thank you
- `email_click` - Email clicked from thank you

### 404 Error Page
- `page_404_view` - 404 page displayed
- `404_recovery_link_click` - User clicked recovery link
- `404_search_attempt` - User searched or used navigation

---

## F. Performance & Technical Events

| Event | Trigger | Properties |
|-------|---------|-----------|
| `page_load_time` | Page fully loaded | page_name, load_time_ms |
| `js_error` | JavaScript error occurred | error_message, page_name |
| `gtag_config_error` | GA4 configuration error | error_type |

---

## G. Implementation Examples

### React Component - Track Button Click
```javascript
import { useCallback } from 'react';

export function ContactButton() {
  const handleClick = useCallback(() => {
    gtag('event', 'contact_click', {
      source: 'homepage',
    });
  }, []);

  return <button onClick={handleClick}>Contact Us</button>;
}
```

### Track Form Submission
```javascript
import { useCallback } from 'react';

export function ContactForm() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    gtag('event', 'contact_form_submit', {
      source: 'contact_page',
      service_interest: formData.service,
    });
    
    // Submit form
  }, []);

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Scroll Depth
```javascript
import { useEffect } from 'react';

export function useScrollTracking(articleTitle: string) {
  useEffect(() => {
    let lastScroll = 0;
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      if (scrollPercent >= 25 && lastScroll < 25) {
        gtag('event', 'blog_post_scroll_depth', {
          article_title: articleTitle,
          scroll_percentage: 25,
        });
      }
      
      lastScroll = scrollPercent;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleTitle]);
}
```

---

## H. Meta Pixel Events (Conversion Tracking)

Integration with Meta Pixel for Facebook/Instagram retargeting:

```javascript
import { trackMetaPixelEvent } from '@/lib/meta-pixel';

// Track lead event
trackMetaPixelEvent('Lead', {
  content_name: 'Contact Form Submission',
  content_type: 'lead_magnet',
  value: 0.00,
  currency: 'INR',
});

// Track inquiry event
trackMetaPixelEvent('Inquiry', {
  content_name: 'Contact Form',
  content_type: 'inquiry',
});

// Track schedule call
trackMetaPixelEvent('Schedule', {
  content_name: 'Strategy Call',
  content_type: 'booking',
});
```

---

## I. Privacy & Compliance

- All tracking respects user privacy settings
- No sensitive personal data tracked by default
- GDPR/CCPA compliant cookie handling via banner
- User can opt-out of analytics
- Cookies are first-party only (no third-party tracking cookies)
- Cookie consent checked before GTM/GA4 initialization

---

## J. Dashboard & Analysis

### Key Metrics to Monitor
1. **Acquisition:** Where users come from
2. **Behavior:** Pages visited, time on page, scroll depth
3. **Conversions:** Form submissions, CTA clicks, schedule calls
4. **Goals:** Track specific high-value actions
5. **Funnel Analysis:** Contact form → thank you page → return visitor

### Recommended Dashboards
1. **Homepage Performance** - Views, CTAs clicked, conversion rate
2. **Service Pages** - Views by service, interest level, CTA performance
3. **Blog Performance** - Views, scroll depth, internal link clicks
4. **Lead Generation** - Form starts, submissions, abandonment
5. **Contact Funnel** - Form start → submission → phone call

---

## K. Maintenance & Updates

- Quarterly review of tracking data quality
- Monthly analysis of drop-off points
- Yearly audit of tracking implementation
- Remove obsolete events/properties
- Update event properties as business evolves
