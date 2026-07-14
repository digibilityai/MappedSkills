'use client';

import Script from 'next/script';

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

export function trackCTAClick(ctaType: string, ctaText: string) {
  trackEvent('cta_clicked', {
    cta_type: ctaType,
    cta_text: ctaText,
  });
}

export function trackFormSubmit(formName: string, formData?: Record<string, any>) {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
}

export function trackFormError(formName: string, error: string) {
  trackEvent('form_error', {
    form_name: formName,
    error_message: error,
  });
}

export function trackPhoneClick(phoneNumber: string) {
  trackEvent('phone_click', {
    phone: phoneNumber,
  });
}

export function trackEmailClick(email: string) {
  trackEvent('email_click', {
    email,
  });
}

export function trackCalendlyBooking(action: string) {
  trackEvent('calendly_event', {
    action,
  });
}
