import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata(
    'Privacy Policy | MappedSkills Marketing',
    'Read the MappedSkills Marketing Privacy Policy to understand how we collect, use, store, and protect information submitted through our website.',
    '/privacy-policy'
  ),
  robots: 'noindex, nofollow',
};

const TABLE_OF_CONTENTS = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'lead-forms', label: 'Lead Forms and Contact Forms' },
  { id: 'analytics', label: 'Analytics and Tracking' },
  { id: 'cookies', label: 'Cookies and Similar Technologies' },
  { id: 'third-party', label: 'Third-Party Tools' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'external-links', label: 'External Links' },
  { id: 'policy-updates', label: 'Policy Updates' },
  { id: 'contact-us', label: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://mappedskills.com'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Privacy Policy',
                'item': 'https://mappedskills.com/privacy-policy'
              }
            ]
          })
        }}
      />

      {/* TODO: LEGAL REVIEW REQUIRED
          This Privacy Policy is intended for general website transparency and should be reviewed by a legal professional before final publishing.
          Ensure compliance with applicable privacy laws including Indian laws and any applicable international regulations.
      */}

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Privacy Policy</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Last Updated: May 2026
            </p>
            <p className="text-base text-foreground leading-relaxed">
              This Privacy Policy explains how MappedSkills Marketing collects, uses, stores, and protects information when you visit our website, contact us, submit a form, book a strategy call, or interact with our marketing content.
            </p>
          </div>
        </Container>
      </Section>

      {/* Table of Contents */}
      <Section className="bg-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TABLE_OF_CONTENTS.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-accent hover:text-accent/80 transition-colors text-sm py-2"
                >
                  → {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section>
        <Container>
          <div className="max-w-3xl space-y-12">
            {/* Section 1: Information We Collect */}
            <div id="information-we-collect">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We may collect information that you voluntarily submit through our website, forms, calls, emails, or booking tools.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Information You Provide:</h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company name</li>
                    <li>Website URL</li>
                    <li>Service interest</li>
                    <li>Marketing budget range</li>
                    <li>Business goals</li>
                    <li>Message or enquiry details</li>
                    <li>Call booking information</li>
                    <li>Any information you choose to share with us</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Technical and Usage Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Pages visited</li>
                    <li>Time spent on the website</li>
                    <li>Referral source</li>
                    <li>Campaign source</li>
                    <li>Form interaction data</li>
                    <li>CTA click data</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div id="how-we-use">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We may use collected information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Respond to enquiries</li>
                <li>Schedule strategy calls</li>
                <li>Understand your business requirements</li>
                <li>Provide marketing recommendations</li>
                <li>Prepare proposals</li>
                <li>Improve website experience</li>
                <li>Analyze website performance</li>
                <li>Track marketing campaign effectiveness</li>
                <li>Improve our services</li>
                <li>Send relevant business communication if consented or contextually appropriate</li>
              </ul>
              <Card className="p-4 bg-accent/5 border-accent/20">
                <p className="text-sm font-medium text-foreground">
                  <strong>Important:</strong> We do not sell personal information to third parties.
                </p>
              </Card>
            </div>

            {/* Section 3: Lead Forms and Contact Forms */}
            <div id="lead-forms">
              <h2 className="text-2xl font-bold mb-4">Lead Forms and Contact Forms</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                When you submit a contact form, audit request, or enquiry form, we use the information to understand your marketing challenge and contact you regarding your enquiry.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Form submissions may be stored in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Website backend or form system</li>
                <li>Email notification system</li>
                <li>CRM or lead management tool</li>
                <li>Google Sheets or reporting dashboard if configured</li>
                <li>Calendar booking platform if you schedule a call</li>
              </ul>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> We only collect fields that are required for business communication and qualification.
                </p>
              </Card>
            </div>

            {/* Section 4: Analytics and Tracking */}
            <div id="analytics">
              <h2 className="text-2xl font-bold mb-4">Analytics and Tracking</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We may use analytics and tracking tools to understand how visitors use our website and which marketing activities are effective.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Tools may include:</h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>Google Analytics 4</li>
                    <li>Google Tag Manager</li>
                    <li>Meta Pixel</li>
                    <li>Google Ads conversion tracking</li>
                    <li>Search Console</li>
                    <li>Heatmap or session recording tools if added later</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Tracked events may include:</h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>Page views</li>
                    <li>Button clicks</li>
                    <li>Form starts and submissions</li>
                    <li>Phone and email clicks</li>
                    <li>Schedule call clicks</li>
                    <li>Newsletter signups</li>
                    <li>Blog interactions</li>
                  </ul>
                </div>
              </div>
              <Card className="p-4 bg-blue-50/50 border-blue-200 mt-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Tracking IDs should be configurable through environment variables and should not be hardcoded.
                </p>
              </Card>
            </div>

            {/* Section 5: Cookies and Similar Technologies */}
            <div id="cookies">
              <h2 className="text-2xl font-bold mb-4">Cookies and Similar Technologies</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Our website may use cookies or similar technologies to improve user experience, measure website performance, and understand marketing effectiveness.
              </p>
              <h3 className="font-semibold mb-3">Cookies may be used for:</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Website functionality</li>
                <li>Analytics</li>
                <li>Advertising measurement</li>
                <li>Retargeting</li>
                <li>Conversion tracking</li>
                <li>User experience improvement</li>
              </ul>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> If required, a cookie consent banner or preference mechanism should be added before launch.
                </p>
              </Card>
            </div>

            {/* Section 6: Third-Party Tools */}
            <div id="third-party">
              <h2 className="text-2xl font-bold mb-4">Third-Party Tools</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We may use third-party tools to operate the website, manage enquiries, track performance, or schedule calls. Examples may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Vercel for hosting</li>
                <li>Google Analytics and Google Tag Manager</li>
                <li>Meta Pixel</li>
                <li>Calendly or similar booking tools</li>
                <li>Email service providers</li>
                <li>CRM tools</li>
                <li>Form handling tools</li>
                <li>Payment or billing tools if added later</li>
              </ul>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> These third-party tools may process information according to their own privacy policies.
                </p>
              </Card>
            </div>

            {/* Section 7: Data Sharing */}
            <div id="data-sharing">
              <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We may share information only when necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Respond to your enquiry</li>
                <li>Deliver services</li>
                <li>Use website, analytics, CRM, or booking tools</li>
                <li>Comply with legal obligations</li>
                <li>Protect business rights</li>
                <li>Work with service providers under appropriate confidentiality expectations</li>
              </ul>
              <Card className="p-4 bg-accent/5 border-accent/20">
                <p className="text-sm font-medium text-foreground">
                  <strong>Important:</strong> We do not sell personal information.
                </p>
              </Card>
            </div>

            {/* Section 8: Data Retention */}
            <div id="data-retention">
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We retain information only as long as needed for business, legal, reporting, or service-related purposes. Examples:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Enquiry data may be retained for follow-up and business communication</li>
                <li>Proposal-related data may be retained for business records</li>
                <li>Analytics data may be retained according to tool settings</li>
                <li>Client data may be retained as per agreement and legal requirements</li>
              </ul>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Retention periods should be reviewed legally before launch.
                </p>
              </Card>
            </div>

            {/* Section 9: Data Security */}
            <div id="data-security">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                We use reasonable technical and organizational measures to protect collected information. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Secure hosting</li>
                <li>HTTPS encryption</li>
                <li>Access controls</li>
                <li>Environment variables for sensitive keys</li>
                <li>Limited access to form submissions</li>
                <li>Avoiding unnecessary data collection</li>
              </ul>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Disclaimer:</strong> No method of internet transmission or electronic storage is 100% secure.
                </p>
              </Card>
            </div>

            {/* Section 10: Your Rights */}
            <div id="your-rights">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Depending on applicable law, users may have rights related to their personal data, including the right to access, correct, update, withdraw consent, or request deletion of personal information.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                To make a request, you can contact us at:
              </p>
              <a href="mailto:info@mappedskills.com" className="text-accent hover:text-accent/80 font-medium">
                info@mappedskills.com
              </a>
              <Card className="p-4 bg-blue-50/50 border-blue-200 mt-4">
                <p className="text-sm text-foreground">
                  <strong>Legal Review Note:</strong> Rights language should be reviewed for compliance with applicable Indian privacy law before publishing.
                </p>
              </Card>
            </div>

            {/* Section 11: Children's Privacy */}
            <div id="childrens-privacy">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-foreground leading-relaxed">
                MappedSkills Marketing does not knowingly collect personal information from children. The website and services are intended for business owners, professionals, and organizations.
              </p>
            </div>

            {/* Section 12: External Links */}
            <div id="external-links">
              <h2 className="text-2xl font-bold mb-4">External Links</h2>
              <p className="text-foreground leading-relaxed">
                The website may contain links to third-party websites. MappedSkills is not responsible for the privacy practices or content of those external websites.
              </p>
            </div>

            {/* Section 13: Policy Updates */}
            <div id="policy-updates">
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Updates will be reflected by changing the "Last Updated" date on this page.
              </p>
            </div>

            {/* Section 14: Contact Us */}
            <div id="contact-us">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <Card className="p-6 sm:p-8 border-2 border-accent/20">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">MappedSkills Marketing</p>
                    <p className="text-lg font-semibold">Pune, Maharashtra, India</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2">Get In Touch</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="mailto:info@mappedskills.com" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium">
                        <Mail className="h-5 w-5" />
                        info@mappedskills.com
                      </a>
                      <a href="tel:+919873232662" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium">
                        <Phone className="h-5 w-5" />
                        +91 9873232662
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Button asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Have Questions Before Working With Us?
            </h2>
            <p className="text-lg text-foreground mb-8">
              Contact MappedSkills and we&apos;ll help you understand the right next step for your marketing goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Tracking: contact_click */}
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              {/* Tracking: schedule_call_click */}
              <Button size="lg" variant="outline" asChild>
                <Link href="/schedule-call">Schedule Free Strategy Call</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
