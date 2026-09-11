import { Card } from '@/components/ui/card';

/**
 * SESSION 31 — PHASE H1 — MINIMAL DEFENSIVE CORRECTION. NOT a newsletter build.
 *
 * This component is RENDERED IN PRODUCTION on every article
 * (`app/(pages)/blog/[slug]/page.tsx`), and it had the same defect class as the
 * contact form plus one the contact form did not have:
 *
 *   1. FALSE SUCCESS. It made no network call of any kind and then displayed
 *      "Thanks! Check your email for confirmation." No list exists, no provider
 *      is configured, and no confirmation email could ever arrive. Every address
 *      typed into it was discarded while the visitor was told to go and look
 *      for a message.
 *   2. PII INTO ANALYTICS. It passed the submitted address to
 *      `window.gtag('event', 'newsletter_signup', { email })`. Sending an email
 *      address to analytics is prohibited outright by
 *      `POST_SUBMISSION_AND_FOLLOWUP.md` §7 and `EVENT_TAXONOMY.md` §7, and it
 *      would have executed on any page load where GTM was configured.
 *
 * WHAT CHANGED, AND ONLY THIS. The input, the submit button and the fabricated
 * success message are gone, and so is the `gtag` call and the address it
 * carried. NO BACKEND, NO PROVIDER, NO PERSISTENCE AND NO CRM WAS ADDED —
 * session brief §27 forbids expanding H1 into a newsletter project, and the
 * approved sequence gives analytics to H2. What remains is the card stating
 * plainly that there is nothing to subscribe to yet, which is true.
 *
 * WHY NOT JUST LEAVE IT FOR LATER. A control that collects an address, throws
 * it away and thanks the visitor is a knowingly false successful submission
 * state on a live route, and it was leaking PII to analytics on every use.
 * Neither could ship. Whether a newsletter exists at all is an owner decision
 * and is recorded as one; this change does not pre-empt it, and reinstating a
 * real signup later is a new form against a real destination.
 *
 * It is also no longer a client component. With no state and no handler there
 * is nothing to hydrate, so `'use client'` and the `useState` import are gone
 * and the card ships as static markup.
 */

export function BlogNewsletterForm() {
  return (
    <Card className="p-8 sm:p-10 bg-secondary/5 border-accent/20">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="mb-2 text-xl sm:text-2xl font-bold">
          There is no mailing list yet.
        </h3>
        <p className="text-muted-foreground">
          When there is something worth sending, this is where you will be able to sign up for it.
        </p>
      </div>
    </Card>
  );
}
