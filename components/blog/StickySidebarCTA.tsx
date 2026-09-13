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
    <div className="sticky top-28 space-y-6">
      {/* Main CTA */}
      <Card className="p-6 sm:p-8 bg-resolve-accent-deep/5 border-resolve-accent-deep/20 rounded-lg">
        {/* H3: Wide 28px - Medium 26px - Narrow 24px - Line-height 1.18-1.25 */}
        <h3 className="text-[clamp(24px,1.8vw,28px)] leading-[1.20] font-heading font-bold mb-3 text-resolve-ink">
          {ctaHeadline}
        </h3>
        {/* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */}
        <p className="text-[16px] leading-[1.60] text-resolve-dim mb-6">
          Tell us what is actually happening, and what you can currently see.
        </p>
        <Button asChild className="w-full bg-resolve-ink text-resolve-ground hover:bg-resolve-ink/90 font-semibold py-3">
          <Link href={ctaLink}>Book a call</Link>
        </Button>
      </Card>

      {/* Related Service */}
      {relatedService && (
        <Card className="p-6 bg-resolve-ground border-resolve-line rounded-lg">
          <span className="block text-[14px] leading-[1.50] font-semibold text-resolve-dim mb-2 uppercase tracking-wider">
            Related Service
          </span>
          {/* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */}
          <h4 className="text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-bold text-resolve-accent-deep mb-2">
            {relatedService.title}
          </h4>
          {/* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */}
          <p className="text-[16px] leading-[1.60] text-resolve-dim mb-4">{relatedService.description}</p>
          <Link
            href={relatedService.link}
            className="inline-flex items-center gap-2 text-resolve-accent-dark font-semibold text-[14px] leading-[1.50] group hover:underline"
          >
            Learn More
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Card>
      )}
    </div>
  );
}
