import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface CTABlockProps {
  headline: string;
  copy: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'default' | 'accent';
}

const CTA_CONFIG = {
  'google-ads': {
    headline: 'Not Sure If Your Google Ads Are Profitable?',
    copy: 'Get a free Google Ads audit and find out where your budget is leaking.',
    buttonText: 'Get Free Google Ads Audit',
    buttonLink: '/google-ads',
  },
  'social-ads': {
    headline: 'Getting Clicks But Not Leads From Social Ads?',
    copy: 'Let us review your Meta and social campaigns to find where quality is dropping.',
    buttonText: 'Get Free Social Ads Audit',
    buttonLink: '/social-media-ads',
  },
  'lead-gen': {
    headline: 'Getting Leads But Not Serious Prospects?',
    copy: 'Let us review your lead generation funnel and suggest where quality is dropping.',
    buttonText: 'Get Free Lead Audit',
    buttonLink: '/lead-generation',
  },
  'seo': {
    headline: 'Want SEO Traffic That Converts?',
    copy: 'Get your website reviewed for keywords, technical issues, and organic lead opportunities.',
    buttonText: 'Get Free SEO Audit',
    buttonLink: '/seo',
  },
  'cro': {
    headline: 'Traffic Is Coming. Leads Are Not?',
    copy: 'Get a conversion audit and see what is stopping visitors from taking action.',
    buttonText: 'Get Free Conversion Audit',
    buttonLink: '/conversion-optimization',
  },
  'generic': {
    headline: 'Need a Clear Marketing Direction?',
    copy: 'Book a free strategy call and get practical recommendations for your business.',
    buttonText: 'Schedule Free Strategy Call',
    buttonLink: '/schedule-call',
  },
};

export function CTABlock({ headline, copy, buttonText, buttonLink, variant = 'default' }: CTABlockProps) {
  return (
    <Card className={`p-6 sm:p-8 my-8 ${variant === 'accent' ? 'bg-accent/5 border-accent/20' : ''}`}>
      <h3 className="text-lg font-semibold mb-3">{headline}</h3>
      <p className="text-foreground mb-6">{copy}</p>
      <Button asChild>
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </Card>
  );
}

export function CTABlockFromType({ ctaType }: { ctaType: keyof typeof CTA_CONFIG }) {
  const config = CTA_CONFIG[ctaType];
  return (
    <CTABlock
      headline={config.headline}
      copy={config.copy}
      buttonText={config.buttonText}
      buttonLink={config.buttonLink}
      variant="accent"
    />
  );
}
