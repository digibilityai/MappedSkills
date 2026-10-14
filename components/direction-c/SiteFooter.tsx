import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ConsentPreferencesLink } from '@/components/analytics/ConsentPreferencesLink';
import { offices, siteMetadata } from '@/lib/metadata';
import { FOOTER_COMPANY, FOOTER_SERVICES } from '@/components/direction-c/nav';

/**
 * UI REVAMP GATE 2 — DIRECTION C — footer.
 *
 * Ink, on the same 12 columns as the page; links in two columns below 600px to
 * cut length; every target 44px. CONTENT IS THE PRODUCTION FOOTER'S
 * (components/layout/Footer.tsx): the approved blurb (the homepage meta
 * description), the six service routes, the eleven company links, email, both
 * office phones, the service area, copyright, Privacy Policy, Terms, the
 * analytics-preferences control and the three social profiles.
 *
 * Differences from production, all deliberate (Gate 2 handoff):
 * - the social profiles are text links, not icons (Direction C uses no icon
 *   set, Gate 1 §4.6); their destinations are unchanged;
 * - the fourth icon (a second mailto link) is not repeated — the email address
 *   is already a link in the Contact column;
 * - service labels follow the /services names (see ./nav.ts).
 * No commercial CTA strip (Session 33 F10: each page closes once).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="dc dc-ftr dc-on-ink">
      <div className="dc-wrap dc-g12">
        <div className="dc-brand">
          <Logo href="/" onDark />
          <p>
            We help businesses get found by the buyers already looking for what they sell, turn more of those
            visits into real enquiries, and measure the whole path so they can see what worked.
          </p>
        </div>
        <div className="dc-col">
          <h2>Services</h2>
          <ul className="dc-fl">
            {FOOTER_SERVICES.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.short ?? l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="dc-col wide">
          <h2>Company</h2>
          <ul className="dc-two dc-fl">
            {FOOTER_COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="dc-col dc-contact">
          <h2>Contact</h2>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
              </dd>
            </div>
            {offices.map((office) => (
              <div key={office.city}>
                <dt>{office.city}</dt>
                <dd>
                  <a href={`tel:${office.phone}`}>{office.phoneDisplay}</a>
                </dd>
              </div>
            ))}
            <div>
              <dt>Service Area</dt>
              <dd>Pune, Mumbai, and India-wide consulting</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="dc-wrap">
        <div className="dc-base">
          <span>&copy; {year} MappedSkills Marketing. All rights reserved.</span>
          <span className="dc-base-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <ConsentPreferencesLink />
          </span>
          <span className="dc-base-links">
            <a href="https://linkedin.com/company/mappedskills" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://facebook.com/mappedskills" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com/mappedskills" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
