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

/**
 * SESSION 33 — PHASE I — SIX FREE-AUDIT OFFERS REMOVED.
 *
 * WHAT WAS HERE. Every variant promised a free deliverable — "Get a free Google
 * Ads audit", "Get Free Social Ads Audit", "Get Free Lead Audit", "Get Free SEO
 * Audit", "Get Free Conversion Audit", "Schedule Free Strategy Call" — plus
 * offers to "review your Meta and social campaigns" and "review your lead
 * generation funnel".
 *
 * WHY ALL OF IT GOES. `app/not-found.tsx` records the rule in its own words:
 * "'Free' is blocked on the entry-offer decision — no candidate may say free
 * until it is recorded." NO ENTRY OFFER HAS BEEN APPROVED. There is no free
 * audit, no free review and no free call, so six buttons were offering things
 * the firm has not agreed to provide. Phase G removed the identical CTA from
 * `not-found` and `/schedule-call` and replaced it with nothing.
 *
 * WHAT REPLACES THEM. Each button now NAMES THE PAGE IT GOES TO and promises
 * nothing. The link targets are unchanged. The headlines are questions about
 * the reader's situation, claim nothing, and are left as they are.
 *
 * ⚠ THIS SURFACE RENDERS ON ZERO ROUTES TODAY. It appears only inside a
 * Contentful blog post, and there are none. The corrections above remove
 * blocked claims from the codebase; they do NOT make this approved copy.
 * **Before any article is published, this block needs copy that has been
 * through the programme's copy gate** — recorded as owner input, not as done.
 */
const CTA_CONFIG = {
  'google-ads': {
    headline: 'Not Sure If Your Google Ads Are Profitable?',
    copy: 'What paid search looks like when it is run against enquiries rather than clicks.',
    buttonText: 'How we run Google Ads',
    buttonLink: '/google-ads',
  },
  'social-ads': {
    headline: 'Getting Clicks But Not Leads From Social Ads?',
    copy: 'Where the channel fits, and where it does not.',
    buttonText: 'How we treat social ads',
    buttonLink: '/social-media-ads',
  },
  'lead-gen': {
    headline: 'Getting Leads But Not Serious Prospects?',
    copy: 'What counts as a qualified enquiry here, published in full.',
    buttonText: 'How lead generation is measured',
    buttonLink: '/lead-generation',
  },
  'seo': {
    headline: 'Want SEO Traffic That Converts?',
    copy: 'Being found by the buyers already looking for what you sell.',
    buttonText: 'How search work is run',
    buttonLink: '/seo',
  },
  'cro': {
    headline: 'Traffic Is Coming. Leads Are Not?',
    copy: 'Diagnosis first, because two of the four causes are not the page.',
    buttonText: 'How conversion work starts',
    buttonLink: '/conversion-optimization',
  },
  'generic': {
    headline: 'Need a Clear Marketing Direction?',
    copy: 'Tell us what is actually happening, and what you can currently see.',
    buttonText: 'Tell us what you\u2019re trying to fix',
    buttonLink: '/contact',
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
