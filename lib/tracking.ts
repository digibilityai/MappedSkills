// Form and Event Tracking Utilities
import { trackEvent, trackFormSubmit, trackFormError } from './gtm';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  budget: string;
  message: string;
}

export async function submitContactForm(data: FormData) {
  try {
    trackEvent('contact_form_started', { service_interest: data.serviceInterest });

    // Validate form data
    if (!data.email || !data.name) {
      const error = 'Name and email are required';
      trackFormError('contact_form', error);
      throw new Error(error);
    }

    // Send to backend or email service
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    trackFormSubmit('contact_form', {
      service_interest: data.serviceInterest,
      budget_range: data.budget,
    });

    // Trigger Meta Pixel if available
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    trackFormError('contact_form', message);
    throw error;
  }
}

export function trackServiceCTAClick(serviceName: string) {
  trackEvent('service_cta_click', {
    service: serviceName,
  });
}

export function trackAuditCTAClick(auditType: string) {
  trackEvent('audit_cta_click', {
    audit_type: auditType,
  });
}

export function trackScheduleCallClick() {
  trackEvent('schedule_call_click');
}

export function trackPricingCTAClick() {
  trackEvent('pricing_cta_click');
}

export function trackBlogRelatedClick(postSlug: string, relatedSlug: string) {
  trackEvent('blog_related_click', {
    source_post: postSlug,
    related_post: relatedSlug,
  });
}

export function trackBlogServiceClick(postSlug: string, servicePath: string) {
  trackEvent('blog_service_click', {
    post: postSlug,
    service: servicePath,
  });
}

export function trackSocialShare(platform: string, postSlug: string) {
  trackEvent('social_share_click', {
    platform,
    post: postSlug,
  });
}

export function trackNewsletterSignup() {
  trackEvent('newsletter_signup');

  // Track Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Subscribe');
  }
}

// Phone and Email interaction tracking
export function createTrackablePhoneLink(phone: string) {
  return {
    href: `tel:${phone}`,
    onClick: () => {
      const cleanPhone = phone.replace(/\D/g, '');
      trackEvent('phone_click', { phone: cleanPhone });
    },
  };
}

export function createTrackableEmailLink(email: string) {
  return {
    href: `mailto:${email}`,
    onClick: () => {
      trackEvent('email_click', { email });
    },
  };
}

// Calendly event tracking
export function trackCalendlyInteraction(action: 'view' | 'click' | 'started' | 'completed') {
  trackEvent('calendly_interaction', { action });
}
