import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface StickySidebarCTAProps {
  ctaHeadline: string;
  ctaLink: string;
  relatedService?: {
    title: string;
    description: string;
    link: string;
  };
}

export function StickySidebarCTA({ ctaHeadline, ctaLink, relatedService }: StickySidebarCTAProps) {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Main CTA */}
      <Card className="p-6 sm:p-8 bg-accent/5 border-accent/20">
        <h3 className="font-semibold text-lg mb-3">{ctaHeadline}</h3>
        <p className="text-sm text-foreground mb-6">
          Book a free strategy call and get clear recommendations based on your current marketing setup.
        </p>
        <Button asChild className="w-full">
          <Link href={ctaLink}>Schedule Free Call</Link>
        </Button>
      </Card>

      {/* Related Service */}
      {relatedService && (
        <Card className="p-6">
          <h4 className="font-semibold mb-2 text-sm">Related Service</h4>
          <h3 className="text-accent font-semibold mb-2">{relatedService.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{relatedService.description}</p>
          <Link
            href={relatedService.link}
            className="inline-flex items-center gap-2 text-accent font-medium text-sm group"
          >
            Learn More
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Card>
      )}
    </div>
  );
}
