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
    'Terms and Conditions | MappedSkills Marketing',
    'Read the MappedSkills Marketing Terms and Conditions for using our website, submitting enquiries, and engaging our marketing services.',
    '/terms'
  ),
  robots: 'noindex, nofollow',
};

const TABLE_OF_CONTENTS = [
  { id: 'use-of-website', label: 'Use of Website' },
  { id: 'services-information', label: 'Services Information' },
  { id: 'no-guarantee', label: 'No Guarantee of Results' },
  { id: 'enquiries-calls', label: 'Enquiries and Strategy Calls' },
  { id: 'proposals', label: 'Proposals and Engagements' },
  { id: 'client-responsibilities', label: 'Client Responsibilities' },
  { id: 'fees-payments', label: 'Fees and Payments' },
  { id: 'ad-spend', label: 'Ad Spend and Third-Party Costs' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'content-accuracy', label: 'Content and Website Accuracy' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'third-party-platforms', label: 'Third-Party Platforms' },
  { id: 'limitation-liability', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes-terms', label: 'Changes to Terms' },
  { id: 'contact-us', label: 'Contact Us' },
];

export default function TermsPage() {
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
                'name': 'Terms and Conditions',
                'item': 'https://mappedskills.com/terms'
              }
            ]
          })
        }}
      />

      {/* TODO: LEGAL REVIEW REQUIRED
          These Terms and Conditions are intended as a general website template and should be reviewed by a legal professional before final publishing.
          Ensure compliance with applicable laws of India and any applicable international regulations.
          Jurisdiction and dispute resolution wording must be reviewed before publishing.
      */}

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Terms and Conditions</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Last Updated: May 2026
            </p>
            <p className="text-base text-foreground leading-relaxed">
              These Terms and Conditions explain the rules for using the MappedSkills Marketing website and engaging with our services, content, forms, proposals, and communication.
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
            {/* Section 1: Use of Website */}
            <div id="use-of-website">
              <h2 className="text-2xl font-bold mb-4">Use of Website</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                By using this website, you agree to use it only for lawful purposes and in a way that does not harm the website, its users, or MappedSkills Marketing.
              </p>
              <h3 className="font-semibold mb-3">Users should not:</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Attempt to break website functionality</li>
                <li>Submit false or misleading information</li>
                <li>Copy website content without permission</li>
                <li>Use the website for spam or unlawful activity</li>
                <li>Attempt unauthorized access to systems or data</li>
              </ul>
            </div>

            {/* Section 2: Services Information */}
            <div id="services-information">
              <h2 className="text-2xl font-bold mb-4">Services Information</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                The website explains MappedSkills Marketing services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Google Ads management</li>
                <li>Social Media Ads management</li>
                <li>Lead Generation</li>
                <li>SEO</li>
                <li>Conversion Optimization</li>
                <li>Tracking and reporting</li>
                <li>Marketing strategy and audits</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Information on the website is for general business understanding. Final scope, pricing, deliverables, timelines, and responsibilities will be defined in a written proposal, agreement, or statement of work.
              </p>
            </div>

            {/* Section 3: No Guarantee of Results */}
            <div id="no-guarantee">
              <h2 className="text-2xl font-bold mb-4">No Guarantee of Results</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                MappedSkills does not guarantee specific leads, rankings, sales, revenue, ROAS, or business outcomes.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Marketing performance depends on many factors, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Budget</li>
                <li>Offer</li>
                <li>Competition</li>
                <li>Target audience</li>
                <li>Landing page quality</li>
                <li>Tracking setup</li>
                <li>Sales follow-up</li>
                <li>Market demand</li>
                <li>Platform behavior</li>
                <li>Client implementation speed</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                MappedSkills focuses on structured strategy, execution, tracking, reporting, and optimization, but outcomes cannot be guaranteed.
              </p>
            </div>

            {/* Section 4: Enquiries and Strategy Calls */}
            <div id="enquiries-calls">
              <h2 className="text-2xl font-bold mb-4">Enquiries and Strategy Calls</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Submitting a form or booking a call does not create a client-agency relationship.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Strategy calls are intended to understand business goals, current marketing setup, and possible next steps.
              </p>
              <p className="text-foreground leading-relaxed">
                MappedSkills may choose whether or not to proceed with a proposal based on business fit, scope, budget, and service suitability.
              </p>
            </div>

            {/* Section 5: Proposals and Engagements */}
            <div id="proposals">
              <h2 className="text-2xl font-bold mb-4">Proposals and Engagements</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Any formal engagement will be based on a separate written proposal, agreement, invoice, or statement of work.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                The engagement document may define:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Services included</li>
                <li>Deliverables</li>
                <li>Monthly fees</li>
                <li>Setup fees</li>
                <li>Payment terms</li>
                <li>Timelines</li>
                <li>Reporting structure</li>
                <li>Client responsibilities</li>
                <li>Exclusions</li>
                <li>Termination terms</li>
              </ul>
            </div>

            {/* Section 6: Client Responsibilities */}
            <div id="client-responsibilities">
              <h2 className="text-2xl font-bold mb-4">Client Responsibilities</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Clients may be required to provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Access to ad accounts</li>
                <li>Analytics access</li>
                <li>Website or CMS access</li>
                <li>Product or service information</li>
                <li>Brand assets</li>
                <li>Business details</li>
                <li>Offer details</li>
                <li>Sales feedback</li>
                <li>Approval for campaigns and content</li>
                <li>Payment of ad spend directly to platforms</li>
                <li>Timely communication and approvals</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Delays in access, approval, content, payment, or feedback may affect timelines and performance.
              </p>
            </div>

            {/* Section 7: Fees and Payments */}
            <div id="fees-payments">
              <h2 className="text-2xl font-bold mb-4">Fees and Payments</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Fees, payment cycles, taxes, and due dates will be defined in the proposal, agreement, or invoice.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Unless clearly stated, website pricing is indicative and may vary based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Scope</li>
                <li>Number of channels</li>
                <li>Ad budget</li>
                <li>Complexity</li>
                <li>Reporting needs</li>
                <li>Tracking setup</li>
                <li>Funnel requirements</li>
                <li>Implementation support</li>
              </ul>
            </div>

            {/* Section 8: Ad Spend and Third-Party Costs */}
            <div id="ad-spend">
              <h2 className="text-2xl font-bold mb-4">Ad Spend and Third-Party Costs</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Platform ad spend is separate from MappedSkills management fees unless specifically agreed otherwise.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Clients are usually responsible for paying directly to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                <li>Google Ads</li>
                <li>Meta Ads</li>
                <li>LinkedIn Ads</li>
                <li>Software tools</li>
                <li>CRM tools</li>
                <li>Landing page builders</li>
                <li>Analytics tools</li>
                <li>Hosting or domain providers</li>
                <li>Creative production vendors</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                MappedSkills is not responsible for third-party pricing changes, account restrictions, platform downtime, or policy decisions.
              </p>
            </div>

            {/* Section 9: Intellectual Property */}
            <div id="intellectual-property">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Website content, structure, designs, copy, visuals, frameworks, and brand assets created by MappedSkills remain protected unless otherwise agreed.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Client-owned assets remain the property of the client.
              </p>
              <p className="text-foreground leading-relaxed">
                Final ownership of campaign assets, reports, creatives, landing pages, or documents should be defined in the service agreement.
              </p>
            </div>

            {/* Section 10: Content and Website Accuracy */}
            <div id="content-accuracy">
              <h2 className="text-2xl font-bold mb-4">Content and Website Accuracy</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                MappedSkills aims to keep website information accurate and updated. However, content may change over time and may not always reflect the latest service scope, pricing, tools, or legal requirements.
              </p>
              <p className="text-foreground leading-relaxed">
                Website content should not be treated as professional legal, financial, or tax advice.
              </p>
            </div>

            {/* Section 11: Confidentiality */}
            <div id="confidentiality">
              <h2 className="text-2xl font-bold mb-4">Confidentiality</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                During business discussions or engagements, both parties may share confidential information.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                MappedSkills will make reasonable efforts to protect client business information, campaign data, account information, and strategy discussions.
              </p>
              <p className="text-foreground leading-relaxed">
                Detailed confidentiality terms should be defined in the formal agreement where needed.
              </p>
            </div>

            {/* Section 12: Third-Party Platforms */}
            <div id="third-party-platforms">
              <h2 className="text-2xl font-bold mb-4">Third-Party Platforms</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                MappedSkills may work with platforms such as Google, Meta, LinkedIn, Vercel, analytics tools, CRM systems, and booking tools.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                These platforms have their own terms, policies, algorithms, and account rules.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                MappedSkills cannot control:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Platform approvals</li>
                <li>Ad disapprovals</li>
                <li>Account restrictions</li>
                <li>Algorithm changes</li>
                <li>CPC/CPM fluctuations</li>
                <li>Platform outages</li>
                <li>Tracking limitations</li>
                <li>Third-party policy updates</li>
              </ul>
            </div>

            {/* Section 13: Limitation of Liability */}
            <div id="limitation-liability">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                To the maximum extent permitted by applicable law, MappedSkills will not be liable for indirect, incidental, special, or consequential losses arising from website use, third-party tools, platform actions, or marketing performance.
              </p>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Legal Review Note:</strong> This section must be reviewed by a legal professional before publishing.
                </p>
              </Card>
            </div>

            {/* Section 14: Termination */}
            <div id="termination">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-foreground leading-relaxed">
                Engagement termination terms, notice period, pending payments, handover, access removal, and final deliverables will be governed by the relevant proposal, agreement, or statement of work.
              </p>
            </div>

            {/* Section 15: Governing Law */}
            <div id="governing-law">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                These terms should be governed by the applicable laws of India, unless a separate agreement states otherwise.
              </p>
              <Card className="p-4 bg-blue-50/50 border-blue-200">
                <p className="text-sm text-foreground">
                  <strong>Legal Review Note:</strong> Jurisdiction and dispute resolution wording must be reviewed by a legal professional before publishing.
                </p>
              </Card>
            </div>

            {/* Section 16: Changes to Terms */}
            <div id="changes-terms">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                MappedSkills may update these Terms from time to time. Updates will be reflected by changing the "Last Updated" date on this page.
              </p>
            </div>

            {/* Section 17: Contact Us */}
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
