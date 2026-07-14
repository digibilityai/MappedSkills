import Link from 'next/link';
import { Mail, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ms-dark text-white">
      {/* CTA Strip */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-3">
              Ready to Make Your Marketing Measurable?
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto">
              Book a free strategy call and discover what is working, what is leaking, and what can be improved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              asChild
            >
              <Link href="/schedule-call">Schedule Free Strategy Call</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Brand */}
            <div>
              <h3 className="text-lg font-bold font-heading mb-4">MappedSkills Marketing</h3>
              <p className="text-sm text-white/85 leading-relaxed mb-4">
                Performance marketing agency helping businesses generate qualified leads, improve ROI, and scale revenue through Google Ads, Meta Ads, SEO, lead generation, and conversion optimization.
              </p>
              <p className="text-xs text-white/80 font-medium">
                Performance Marketing | Lead Generation | SEO | CRO
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-white/90 mb-4">Services</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/google-ads"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Google Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/social-media-ads"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Social Media Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lead-generation"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Lead Generation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seo"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    SEO
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conversion-optimization"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Conversion Optimization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-white/90 mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/services"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/results"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-white/90 mb-4">Contact</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Phone</p>
                  <a
                    href="tel:+919873232662"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    +91 9873232662
                  </a>
                </li>
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:info@mappedskills.com"
                    className="text-sm text-white/85 hover:text-accent transition-colors"
                  >
                    info@mappedskills.com
                  </a>
                </li>
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm text-white/85">Pune, Maharashtra, India</p>
                </li>
                <li>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Service Area</p>
                  <p className="text-sm text-white/85">Pune, Mumbai, India-wide consulting</p>
                </li>
              </ul>
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/schedule-call"
                  className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Schedule Call →
                </Link>
              </div>
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
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4 sm:pt-0 sm:pl-6 sm:border-l sm:border-white/10">
                <a
                  href="https://linkedin.com/company/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/mappedskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@mappedskills.com"
                  className="text-white/80 hover:text-accent transition-colors"
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
