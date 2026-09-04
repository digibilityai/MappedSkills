'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    name: 'Google Ads',
    description: 'High-intent campaigns that drive leads and sales.',
    href: '/google-ads',
  },
  {
    name: 'Social Media Ads',
    description: 'Facebook and Instagram ads for leads, sales, and retargeting.',
    href: '/social-media-ads',
  },
  {
    name: 'Lead Generation',
    description: 'Build a qualified enquiry pipeline.',
    href: '/lead-generation',
  },
  {
    name: 'SEO',
    description: 'Rank for high-intent keywords and grow organic visibility.',
    href: '/seo',
  },
  {
    name: 'Conversion Optimization',
    description: 'Turn more visitors into leads and customers.',
    href: '/conversion-optimization',
  },
];

const navLinks = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Case Studies', href: '/work' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (isServicesOpen) {
        setIsServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    function onPointerDown(e: MouseEvent) {
      if (isServicesOpen && servicesWrapRef.current && !servicesWrapRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isServicesOpen, isMenuOpen]);

  return (
    <header className="relative z-40 bg-background border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo priority />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 ml-12" aria-label="Primary">
            <div ref={servicesWrapRef} className="relative flex items-center">
              <Link
                href="/services"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1"
              >
                Services
              </Link>
              <button
                ref={servicesButtonRef}
                type="button"
                aria-expanded={isServicesOpen}
                aria-controls="services-menu"
                aria-label={isServicesOpen ? 'Hide services list' : 'Show services list'}
                onClick={() => setIsServicesOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div
                  id="services-menu"
                  role="menu"
                  aria-label="Services"
                  className="absolute left-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg py-2"
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      role="menuitem"
                      className="block px-4 py-2.5 hover:bg-accent/10 focus-visible:outline-none focus-visible:bg-accent/10"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <span className="block text-sm font-medium text-foreground">{service.name}</span>
                      <span className="block text-xs text-muted-foreground">{service.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs — primary goes to /contact; booking is secondary */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link
              href="/schedule-call"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1"
            >
              Book a call
            </Link>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center text-foreground hover:bg-accent/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="lg:hidden border-t border-border/30 pb-4 pt-4 space-y-1">
            <div className="px-2 py-2">
              <Link
                href="/services"
                className="block px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <div className="mt-1 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-3 py-2.5 pl-6 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-2 py-2 border-t border-border/30">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="px-2 py-3 border-t border-border/30 space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
              </Button>
              <Link
                href="/schedule-call"
                className="block text-center text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a call
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
