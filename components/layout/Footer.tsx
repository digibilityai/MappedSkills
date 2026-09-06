import Link from 'next/link';
import { Mail, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { offices, siteMetadata } from '@/lib/metadata';
import { ConsentPreferencesLink } from '@/components/analytics/ConsentPreferencesLink';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ms-dark text-white">
      {/*
        SESSION 33 — PHASE I — THE FOOTER'S COMMERCIAL CTA STRIP IS REMOVED.

        WHAT WAS HERE: an `<h2>` reading "Ready to Make Your Marketing
        Measurable?", a line beginning "Book a free strategy call…", and two
        large buttons — "Contact Us" and "Schedule Free Strategy Call" — on
        EVERY page of the site.

        IT RESOLVED FIVE RECORDED DEFECTS AT ONCE, WHICH IS WHY THE STRIP GOES
        RATHER THAN ITS WORDING:

        1. F10 — THE SYSTEMIC DOUBLE-CLOSE. Every commercial and route page
           already ends in its own close (`CommercialClose`), and that
           component's own comment records the problem: "the homepage's final
           CTA is immediately followed by the footer's own commercial CTA
           strip… the shared Footer is NOT modified here". Phase F composed its
           close as the deliberately quieter half of a pair it could not fix.
           Phase I owns the other half. With the strip gone, each page closes
           once.

        2. "FREE". `app/not-found.tsx` records the approved treatment in its own
           words: "'Free' is blocked on the entry-offer decision — no candidate
           may say free until it is recorded". Phase G removed the identical CTA
           from `not-found` and `/schedule-call` and REPLACED IT WITH NOTHING.
           The same treatment is applied here rather than inventing a new line.

        3. THE 2 → 4 HEADING JUMP. The strip's `<h2>` sat above the columns'
           `<h4>` headings on every page. The `<h2>` is gone and the column
           headings are now `<h2>`, so the outline is h1 → h2 with no jump on
           any route.

        4. THE SECOND ASK ON `/thank-you`. That route's architecture is "NO
           SECOND ASK. The conversion has happened." — no CTA, no form, no
           booking prompt. The shared footer was contradicting it on the one
           page where it matters most. This is the smallest architectural fix:
           removing one shared element, rather than adding a per-route footer
           variant or a conditional the routes would have to opt into.

        5. THE THIRD ASK. A separate "Schedule Call →" block sat in the contact
           column as well, so the footer carried three commercial asks. It is
           removed with the strip; `/schedule-call` stays reachable as an
           ordinary navigation link below.

        WHAT REPLACES IT: NOTHING. The footer is now navigation, contact
        details and legal — chrome, not a close. **Contact remains the primary
        commercial action** and **booking remains secondary**: both are listed
        in the Company column, and both are still one click away from every
        page via the header and each page's own close.
      */}

      {/*
        SESSION 34 — PHASE I CLOSURE — FOOTER TOUCH TARGETS RAISED TO THE
        PROGRAMME FLOOR.

        THE DEFECT SESSION 33 RECORDED AND DID NOT FIX: all 17 footer links —
        14 navigation links, the email address and both phone numbers —
        rendered as 19px-tall boxes. The programme's own floor is ~40px
        ("touch targets comfortably above minimum, with real spacing between
        adjacent targets", `docs/16-ux/07_NAVIGATION_ARCHITECTURE.md` and
        `12_RESPONSIVE_UX.md`), and THE RESOLVE homepage was signed off at
        "0 targets under 40px" (`docs/26-resolve-homepage/03_RESPONSIVE.md`
        §5). WCAG 2.2 SC 2.5.8 passing on the 24px spacing exception does NOT
        waive the programme standard, so the standard is met rather than
        waived.

        THE GEOMETRY, AND WHY IT IS NOT A REDESIGN. This is the technique the
        approved Resolve prototype already uses on its own footer
        (`docs/26-resolve-homepage/prototype/index.html`:
        `.foot a{display:inline-block;padding:12px 0}` with
        `.foot li{margin-bottom:0}`) — the list's dead gap is converted into
        the link's own hit box instead of being added on top of it:

          - every footer link becomes `inline-flex items-center min-h-[40px]`,
            so the BOX is 40px while the TEXT, its size, weight, colour and
            hover treatment are all unchanged;
          - the two navigation lists drop from `space-y-2.5` (10px) to
            `space-y-1` (4px), because 6px of that gap is now inside the
            targets above and below it.

        NET EFFECT: measured pitch goes 36px -> 44px, so each link costs 8px,
        not 21px. Targets are 40px with a REAL 4px gap between adjacent ones —
        they do not touch and cannot collide. Nothing is stacked, no spacer is
        added, no column is re-laid-out, and the four-column / two-column /
        one-column composition, the heading hierarchy and the link order are
        all exactly as Session 33 left them.
      */}

      {/* Footer Columns */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Brand */}
            <div>
              <Logo href="/" className="h-8 mb-4" />
              {/*
                SESSION 33 — PHASE I. The previous blurb claimed the firm helps
                businesses "generate qualified leads, improve ROI, and scale
                revenue" — three unsupported outcome claims, on every page — and
                named "Meta Ads", which is not a route this site has. The line
                below is the HOMEPAGE'S OWN APPROVED META DESCRIPTION, used
                verbatim: approved copy reused, not new marketing copy written.

                The strapline "Performance Marketing | Lead Generation | SEO |
                CRO" is removed and not replaced. It restated a positioning the
                programme has superseded, and it asserted nothing the four
                navigation columns beneath it do not already show.
              */}
              <p className="text-sm text-white/85 leading-relaxed">
                We help businesses get found by the buyers already looking for what they sell, turn more of
                those visits into real enquiries, and measure the whole path so they can see what worked.
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              {/*
                SESSION 33 — PHASE I. These were `<h4>` under the removed CTA
                strip's `<h2>`, which produced a 2 → 4 jump in the outline of
                EVERY page. They are `<h2>` now — always valid after a page's
                single `<h1>`, and no jump on any route. The `!` prefixes hold
                the size and weight against the global display scale for `h2`
                in `app/globals.css`; the rendered appearance is unchanged.
              */}
              <h2 className="!text-sm !font-bold !leading-tight font-heading uppercase tracking-wider text-white/90 mb-4">Services</h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/google-ads"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Google Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/social-media-ads"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Social Media Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lead-generation"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Lead Generation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seo"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    SEO
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conversion-optimization"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Conversion Optimization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h2 className="!text-sm !font-bold !leading-tight font-heading uppercase tracking-wider text-white/90 mb-4">Company</h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/services"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  {/*
                    SESSION 33 — PHASE I. Relabelled from "Case Studies". The
                    route is `noindex` precisely because there are no published
                    case studies and no permission to publish client results,
                    and its own heading is "What we can show you, and what we
                    cannot." A footer link promising case studies to a page that
                    opens by saying it has none is the small dishonesty this
                    programme exists to remove.
                  */}
                  <Link
                    href="/work"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                {/*
                  SESSION 33 — PHASE I. The removed CTA strip was the ONLY
                  footer link to `/contact`, and the removed "Schedule Call →"
                  block the only one to `/schedule-call`. Both are restored here
                  as ordinary navigation, which keeps contact the primary
                  commercial action and booking the secondary one without
                  restoring a second close. Labels name the destination and
                  claim nothing about it.
                */}
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schedule-call"
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Book a call
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h2 className="!text-sm !font-bold !leading-tight font-heading uppercase tracking-wider text-white/90 mb-4">Contact</h2>
              <ul className="space-y-4 mb-6">
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors break-all"
                  >
                    {siteMetadata.email}
                  </a>
                </li>
                {offices.map((office) => (
                  <li key={office.city}>
                    <p className="text-xs text-white/80 uppercase tracking-wider mb-1">{office.city}</p>
                    <a
                      href={`tel:${office.phone}`}
                      className="inline-flex items-center min-h-[40px] text-sm text-white/85 hover:text-accent transition-colors"
                    >
                      {/* SESSION 33 — PHASE I. Was `office.phone`, the raw
                          `tel:` value, so the footer printed "+919873232662"
                          with no spacing. `phoneDisplay` is the published
                          formatting; the `href` keeps the raw value. */}
                      {office.phoneDisplay}
                    </a>
                  </li>
                ))}
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Service Area</p>
                  <p className="text-sm text-white/85">Pune, Mumbai, and India-wide consulting</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Social Row */}
      <div className="border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Copyright */}
            <div>
              <p className="text-sm text-white/80">
                © {currentYear} MappedSkills Marketing. All rights reserved.
              </p>
            </div>

            {/* Legal Links & Social */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="inline-flex min-h-[40px] items-center text-sm text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex min-h-[40px] items-center text-sm text-white/80 hover:text-white transition-colors"
                >
                  Terms
                </Link>
                {/*
                  SESSION 33 — PHASE H2. Withdrawal must be as easy as consent,
                  so the banner is reachable again from every page. A button,
                  not a link, because it goes nowhere; styled to match this row
                  and given the same 40px target as the controls beside it.

                  SESSION 34 — PHASE I CLOSURE. "Privacy Policy" and "Terms"
                  above now carry that same `inline-flex min-h-[40px]
                  items-center`. They already measured over 40px, but only
                  because this button stretched the flex row around them — so
                  their text sat on a different baseline from this one, which
                  is visible at 390px. Giving all three the same box aligns
                  them and adds NO height: the row was already this tall.
                */}
                <ConsentPreferencesLink className="inline-flex min-h-[40px] items-center text-sm text-white/80 hover:text-white transition-colors" />
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-1 pt-4 sm:pt-0 sm:pl-6 sm:border-l sm:border-white/10">
                <a
                  href="https://linkedin.com/company/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#141219] rounded"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#141219] rounded"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#141219] rounded"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${siteMetadata.email}`}
                  className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#141219] rounded"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
