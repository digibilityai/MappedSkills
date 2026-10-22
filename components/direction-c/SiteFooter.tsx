import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ConsentPreferencesLink } from '@/components/analytics/ConsentPreferencesLink';
import { siteMetadata } from '@/lib/metadata';
import { CONTACT_LINK, FOOTER_COMPANY, FOOTER_INSIGHTS, FOOTER_SERVICES, type NavLink } from '@/components/direction-c/nav';

/**
 * DIRECTION C — footer (navigation redesign, R2 prototype:
 * docs/nav-redesign/prototype/index.html).
 *
 * Ink. The brand block (wordmark, the approved blurb and the stage chain), then
 * four columns: Services, Company, Insights and Contact. The base row keeps the
 * copyright, Privacy Policy, Terms, the analytics-preferences control and the
 * three social profiles, unchanged.
 *
 * The Contact column carries the email and "Pune, India" only. The footer no
 * longer lists the Mumbai office, the two phone numbers or the service-area
 * line. (Press is back in Insights: DEC-076.) Those details are untouched elsewhere (lib/metadata.ts `offices`,
 * structured data, /contact and the other pages).
 * No commercial CTA strip (Session 33 F10: each page closes once).
 */
function Column({ id, title, links }: { id: string; title: string; links: NavLink[] }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <ul>
        {links.map((l, i) => (
          <li key={l.href}>
            <Link className={i === 0 && l.href === '/services' ? 'hub' : undefined} href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="dc dc-ftr dc-on-ink">
      <div className="dc-wrap">
        <div className="dc-ftr-top">
          <div className="dc-brand">
            <Logo href="/" onDark />
            <p>
              We help businesses get found by the buyers already looking for what they sell, turn more of those
              visits into real enquiries, and measure the whole path so they can see what worked.
            </p>
            <p className="dc-ftr-chain" aria-hidden="true">
              <span>
                <span className="dc-mk anon" />
                Capture
              </span>
              <span className="sep">&rarr;</span>
              <span>
                <span className="dc-mk named" />
                Convert
              </span>
              <span className="sep">&rarr;</span>
              <span>
                <span className="dc-mk owned" />
                Measure
              </span>
            </p>
          </div>

          <div className="dc-ftr-cols">
            <Column id="dc-f-svc" title="Services" links={FOOTER_SERVICES} />
            <Column id="dc-f-co" title="Company" links={FOOTER_COMPANY} />
            <Column id="dc-f-ins" title="Insights" links={FOOTER_INSIGHTS} />
            <section className="dc-contact" aria-labelledby="dc-f-ct">
              <h2 id="dc-f-ct">Contact</h2>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Pune, India</dd>
                </div>
              </dl>
              <Link className="go" href={CONTACT_LINK.href}>
                <span className="u">{CONTACT_LINK.label}</span>{' '}
                <span className="dc-arr" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>

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
