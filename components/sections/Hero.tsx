import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  title: string;
  subtitle?: string;
  subheadline?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: ReactNode;
}

export function Hero({
  title,
  subtitle,
  subheadline,
  description,
  cta,
  secondaryCta,
  children,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col">
            {/* Eyebrow Badge */}
            {(subtitle || subheadline) && (
              <Badge variant="red" className="w-fit mb-4 sm:mb-6">
                {subtitle || subheadline}
              </Badge>
            )}

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-balance leading-tight mb-4 sm:mb-6 text-foreground">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg sm:text-xl text-foreground text-balance leading-relaxed mb-8 sm:mb-10">
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            {(cta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                {cta && (
                  <Button
                    size="lg"
                    asChild
                  >
                    <Link href={cta.href}>{cta.text}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                  </Button>
                )}
              </div>
            )}

            {/* Micro Trust Line */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              No pushy sales call. Get clear recommendations on what is working, what is leaking, and what can improve.
            </p>
          </div>

          {/* Right Column: Dashboard Visual */}
          {children && (
            <div className="hidden lg:block">
              {children}
            </div>
          )}
        </div>

        {/* Mobile Dashboard */}
        {children && (
          <div className="lg:hidden mt-12 sm:mt-16">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
