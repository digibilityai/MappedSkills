import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LaunchChecklistPage() {
  // Check for environment variable or password to protect this page
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment && process.env.ENABLE_INTERNAL_PAGES !== 'true') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-muted-foreground">INTERNAL PAGE</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Launch QA Checklist</h1>
          <p className="text-xl text-muted-foreground">
            Complete verification checklist for MappedSkills pre-launch QA
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">About This Checklist</h2>
          <p className="text-muted-foreground mb-4">
            This comprehensive QA checklist contains 30 sections with 200+ verification items to ensure the website is launch-ready before going live.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>30 major verification sections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>200+ individual checklist items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Organized by functional area (SEO, Performance, Mobile, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Issue tracking and sign-off sections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Post-launch monitoring guide</span>
            </li>
          </ul>
        </div>

        {/* Sections Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Checklist Sections (30)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {checklistSections.map((section, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {section.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.items} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="space-y-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
                <span><strong>Review the sections below:</strong> Use this page as your launch QA reference</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
                <span><strong>Import to your tool:</strong> Notion, Linear, Jira, or project management tool</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</span>
                <span><strong>Assign sections:</strong> Distribute sections to team members</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</span>
                <span><strong>Work through items:</strong> Check off items as verified</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</span>
                <span><strong>Log issues:</strong> Document any issues found</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">6</span>
                <span><strong>Get sign-off:</strong> Founder approval before launch</span>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Important:</strong> Do NOT mark website as launch-ready until every item in the checklist is verified and checked.
            </p>
          </div>
        </div>

        {/* Key Verification Areas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Critical Items to Verify</h2>
          <div className="space-y-4">
            {criticalItems.map((item, index) => (
              <div key={index} className="flex gap-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex-shrink-0 text-primary font-bold">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Checklist */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Environment Variables Required</h2>
          <div className="bg-card border border-border rounded-lg p-6 font-mono text-sm">
            <div className="space-y-2 text-muted-foreground">
              <div>NEXT_PUBLIC_SITE_URL=https://mappedskills.com</div>
              <div>NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX</div>
              <div>NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX</div>
              <div>NEXT_PUBLIC_META_PIXEL_ID=123456789</div>
              <div>NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mappedskills</div>
              <div>NEXT_PUBLIC_BUSINESS_EMAIL=info@mappedskills.com</div>
              <div>NEXT_PUBLIC_BUSINESS_PHONE=+91 9873232662</div>
            </div>
          </div>
        </div>

        {/* Page Status */}
        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <h2 className="text-lg font-semibold">Page Status</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Document Status:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">Complete</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Last Updated:</span>
              <span className="font-semibold">May 29, 2026</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Checklist Items:</span>
              <span className="font-semibold">200+</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Development:</span>
              <span className="font-semibold">{isDevelopment ? 'Local' : 'Production'}</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>This page is protected and not indexed by search engines.</p>
          <p className="mt-2">Work through each section on this page before marking the site launch-ready.</p>
        </div>
      </div>
    </div>
  );
}

const checklistSections = [
  { number: 1, title: 'Full Website Page Checklist', items: '18 pages' },
  { number: 2, title: 'Header QA', items: '13 items' },
  { number: 3, title: 'Footer QA', items: '15 items' },
  { number: 4, title: 'SEO Metadata QA', items: '25+ items' },
  { number: 5, title: 'Sitemap QA', items: '8 items' },
  { number: 6, title: 'Robots.txt QA', items: '8 items' },
  { number: 7, title: 'Schema Markup QA', items: '20+ items' },
  { number: 8, title: 'Contact Form QA', items: '20 items' },
  { number: 9, title: 'Schedule Call / Calendly QA', items: '12 items' },
  { number: 10, title: 'CTA Button QA', items: '25 items' },
  { number: 11, title: 'Analytics QA', items: '15 items' },
  { number: 12, title: 'Pixel / Ads Tracking QA', items: '12 items' },
  { number: 13, title: 'Redirect QA', items: '16 items' },
  { number: 14, title: 'Broken Link QA', items: '15 items' },
  { number: 15, title: 'Mobile QA', items: '25 items' },
  { number: 16, title: 'Tablet QA', items: '12 items' },
  { number: 17, title: 'Desktop QA', items: '10 items' },
  { number: 18, title: 'Browser QA', items: '18 items' },
  { number: 19, title: 'Performance QA', items: '22 items' },
  { number: 20, title: 'Accessibility QA', items: '35 items' },
  { number: 21, title: 'Content QA', items: '20 items' },
  { number: 22, title: 'Blog QA', items: '28 items' },
  { number: 23, title: 'Pricing Page QA', items: '18 items' },
  { number: 24, title: 'Results Page QA', items: '16 items' },
  { number: 25, title: 'Security QA', items: '15 items' },
  { number: 26, title: 'Vercel Deployment QA', items: '15 items' },
  { number: 27, title: 'Launch Day Checklist', items: '30+ items' },
  { number: 28, title: 'Post-Launch Monitoring', items: '25 items' },
  { number: 29, title: 'Final Approval Criteria', items: '20 items' },
  { number: 30, title: 'Issues Tracking & Sign-Off', items: 'Tracking log' },
];

const criticalItems = [
  {
    title: 'All Pages Load Correctly',
    description: '18 key pages must load without errors and have correct URLs, titles, and H1 tags.',
  },
  {
    title: 'Contact Form Works',
    description: 'Form must submit successfully and GA4 contact_form_submit event must fire.',
  },
  {
    title: 'Calendly/Schedule Call Works',
    description: 'Calendly must load and users must be able to complete bookings on desktop and mobile.',
  },
  {
    title: 'Analytics Firing',
    description: 'GA4, GTM, and event tracking must be firing correctly on all pages.',
  },
  {
    title: 'Mobile Responsive',
    description: 'All pages must render correctly on mobile devices (no horizontal scrolling, readable text).',
  },
  {
    title: 'No Broken Links',
    description: 'All internal and external links must work (no 404s or redirect chains).',
  },
  {
    title: 'SEO Metadata Complete',
    description: 'All pages must have unique titles, descriptions, canonical URLs, and proper schema markup.',
  },
  {
    title: 'Performance Acceptable',
    description: 'Lighthouse score 90+, LCP under 2.5 seconds, Core Web Vitals in green.',
  },
  {
    title: 'No Placeholder Text',
    description: 'No unintended placeholder text, fake testimonials, fake badges, or unsupported claims visible.',
  },
  {
    title: 'Founder Approval',
    description: 'Amit Gupta must review and approve the entire website before launch.',
  },
];
