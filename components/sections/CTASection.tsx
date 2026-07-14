import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="py-16 bg-secondary/5 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {title}
          </h2>
          {description && (
            <p className="mb-8 text-lg text-foreground text-balance">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
            >
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
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
        </div>
      </div>
    </section>
  );
}
