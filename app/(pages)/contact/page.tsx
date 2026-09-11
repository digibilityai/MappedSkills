import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { CommercialSection, ChapterLabel, Display, Body } from '@/components/commercial/primitives';
import { RouteHero } from '@/components/routes/primitives';
import { ContactForm } from '@/components/forms/ContactForm';

/**
 * SESSION 29 — PHASE G — `/contact`. ARCHETYPE 7 — conversion surface.
 *
 * PRESENTATION IS PHASE G'S AND IS UNCHANGED. SESSION 31 (Phase H1) did not
 * alter one line of layout, copy or structure on this route. It changed only
 * `components/forms/ContactForm.tsx` and added the endpoint behind it. This
 * comment block is updated because it previously described defects that no
 * longer exist, and a stale warning is worse than none.
 *
 * WHAT PHASE H1 RESOLVED, item by item against what this block used to list:
 *   1. THE FORM NOW HAS A SUBMISSION TARGET. It POSTs to `/api/enquiry`, which
 *      writes to MariaDB and returns success ONLY after the database has
 *      acknowledged a durable row. The `setTimeout` that faked success — and
 *      lost every enquiry it ever received — is deleted.
 *   2. THE BUDGET FIELD IS GONE, per `FORM_AND_BOOKING_SPEC.md` §1.4. Nothing
 *      replaced it.
 *   3. PHONE IS OPTIONAL AND THE SERVICE SELECT IS GONE. The frozen contract is
 *      four required (name, work email, company, what you're trying to fix) and
 *      three optional (phone/WhatsApp, website, marketing consent). Service
 *      interest is derived from the converting page, per §1.3.
 *   4. NO FORM VALUE REACHES `dataLayer`. All three `window.gtag` calls are
 *      removed; H2 owns the replacement, server-side.
 *
 * ON SUCCESS THE VISITOR GOES TO `/thank-you`, which H1 wires as the
 * destination — after confirmed persistence and never before. On failure they
 * stay here with every value preserved and an accessible explanation that
 * NOTHING WAS SAVED.
 *
 * STILL OWNER-BLOCKED, AND STILL RENDERING NOTHING:
 *   - No transactional email is configured, so no acknowledgement and no
 *     internal notification is sent. Persistence does not depend on it
 *     (`POST_SUBMISSION_AND_FOLLOWUP.md` §0, step 4 is asynchronous).
 *   - No fallback contact route is offered when persistence fails, because the
 *     published phone number and email remain owner-blocked.
 *
 * TWO BLOCKED SECTIONS, AND BOTH RENDER NOTHING.
 *
 *  - §2 "What happens after you send it" — who reads enquiries and what they do
 *    with it is OWNER-BLOCKED, and a measured response-time distribution has
 *    never existed. Nothing renders. In particular NO RESPONSE TIME appears
 *    anywhere on this page, in any form: not "within 24 hours", not "shortly",
 *    not "as soon as we can". Publishing an unmeasured response promise would
 *    demonstrate the exact failure this business sells the fix for.
 *  - §3 "Or call us" and §4 "Where we are" — the published phone number, the
 *    email, the legal entity name and the complete registered address are ALL
 *    OWNER-BLOCKED. A "call us" section with no number is not a section, so
 *    nothing renders. The production default phone and the address whose
 *    postal-code field contains the word "India" are NOT carried forward, and
 *    THIS PAGE EMITS NO `LocalBusiness` OR `Organization` JSON-LD — `03` §4.2
 *    binds all entity schema to the same fact set and requires it to render
 *    nothing rather than a partial address.
 *
 * A SITE-WIDE ENTITY BLOCK STILL EXISTS AND IS NOT FIXED HERE. `app/layout.tsx`
 * emits `Organization` and `LocalBusiness` on every route from `lib/schema.ts`,
 * carrying the blocked phone and email, the superseded "performance marketing
 * agency" description and the malformed `postalCode`. It is shared chrome,
 * present identically on the homepage and every Phase F route, and the standing
 * instruction for shared-chrome defects is record and defer. Recorded in this
 * phase's document.
 *
 * MANDATORY STILLNESS (M6). Zero figures, zero resolves, zero motion, zero
 * proof elements, zero evidence modules, zero apparatus of any kind — on the
 * page most tempted to add proof. F1: D — NONE, and `22` §3 additionally puts
 * this route at zero figures of ANY kind.
 *
 * ONE CONVERSION OBJECT. The form is the page's only conversion object, and
 * there is exactly one neutrally-stated cross-link to `/schedule-call` — never
 * a chooser, never a comparison. This page therefore does not use `ActionPair`,
 * because a `/contact` CTA on `/contact` is noise and a booking button beside
 * the form would compete with it.
 */
export const metadata = createMetadata(
  "Tell Us What You're Trying to Fix | MappedSkills",
  'Send us what is actually happening — what you are getting, what you are not, and what you can currently see. If you would rather talk than type, you can book a time instead.',
  '/contact'
);

export default function ContactPage() {
  return (
    <>
      <RouteHero
        eyebrow="Enquiries"
        title={<>Tell us what you&rsquo;re trying to fix.</>}
        lede={
          <><p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>
            The more useful the last answer is, the more useful our first reply will be. If you would rather
            talk than type, you can book a time instead.</p>
          </>
        }
        size="quiet"
        mode="editorial"
      />

      {/* ------------------------------------------------------------- §1 */}
      <section className="border-t border-resolve-line bg-resolve-paper py-[var(--resolve-section-sm)] text-resolve-ink">
        <Container>
          <div className="max-w-[62ch]">
            <ChapterLabel>Send us your situation</ChapterLabel>
            <Body>
              The most useful thing you can put in the last box is what is actually happening &mdash; what you
              are getting, what you are not, and what you can currently see. Not a brief. We will read it
              before anyone replies.
            </Body>
          </div>

          {/* PHASE H1 OWNS THIS COMPONENT. Untouched by Phase G. */}
          <div className="mt-[clamp(28px,3.4vw,44px)] max-w-[720px]">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/*
        §2 — WHAT HAPPENS AFTER YOU SEND IT — OWNER-BLOCKED, RENDERS NOTHING.
        §3 — DIRECT CONTACT — the published number is OWNER-BLOCKED, RENDERS NOTHING.
        §4 — WHERE WE ARE — the complete NAP is OWNER-BLOCKED, RENDERS NOTHING.

        No headings, no containers, no partial address, no default phone number,
        no entity JSON-LD. When the owner supplies the fact set, all three take
        it as a content change at these positions; the sections below and above
        already read as consecutive and there is no gap or marker between them.
      */}

      {/* ------------------------------------------------------------- §5
          Exactly one cross-link, stated neutrally, once. Neither route is a
          lesser one and the page does not present them as a choice to weigh. */}
      <CommercialSection>
        <ChapterLabel>If you would rather talk</ChapterLabel>
        <Display>Booking a time reaches the same place.</Display>
        <Body>
          It is usually faster if you have questions rather than a description.{' '}
          <Link
            href="/schedule-call"
            className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
          >
            Book a time to talk
          </Link>
          .
        </Body>
      </CommercialSection>
    </>
  );
}
