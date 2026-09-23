'use client';

/**
 * SESSION 34 — PHASE H2A — the direct `window.gtag` emitters are REMOVED.
 *
 * WHAT WAS HERE. Two `window.gtag('event','share_click', …)` calls, each behind
 * a `typeof window.gtag` guard, sending `event_category`, `event_label` and
 * `page_title`. They were the last pre-H2 analytics API left in a component
 * that is actually rendered — `app/(pages)/blog/[slug]/page.tsx` line 382.
 *
 * WHY THEY ARE GONE RATHER THAN CONVERTED.
 *
 *   1. `share_click` IS NOT IN THE APPROVED H2 TAXONOMY. The five approved
 *      events are `page_view`, `lead_form_started`,
 *      `lead_form_validation_error`, `lead_form_submitted` and
 *      `meeting_started`. Converting this to `track(...)` would have meant
 *      inventing a sixth event, which is prohibited. Sharing is not a funnel
 *      step this programme has defined, so the honest action is to stop
 *      emitting rather than to rename.
 *   2. `dataLayer` MUST BE THE SOLE ANALYTICS API. `lib/analytics.ts` is the
 *      one boundary; a `gtag` command bypasses it entirely, skipping the
 *      parameter sanitiser and reaching GA4 directly, where no GTM tag
 *      configuration can filter or block it.
 *   3. THEY WERE A LATENT, NOT A THEORETICAL, RISK. Session 34 loaded the real
 *      `GTM-K8ZQPMXP` container and measured `typeof window.gtag` as
 *      `"undefined"`, so nothing was firing. But that is a property of how that
 *      container happens to be configured today, not a guarantee: a Google tag
 *      or a Google Ads tag that defines the global would have turned these into
 *      live, unapproved GA4 events with no code change and no warning.
 *
 * NOTHING A VISITOR SEES OR DOES HAS CHANGED. The copy-link behaviour, the
 * two-second "copied" state, every share destination, every icon, every label
 * and every class are exactly as they were. No share is measured any more, and
 * no share was being measured before.
 */

import { Button } from '@/components/ui/button';
import { Linkedin, Facebook, Twitter, Share2 } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `${title} - MappedSkills Marketing`;
  
  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      /**
       * BLOG-006 (owner, 2026-09-19) — label only. The destination is
       * deliberately unchanged: `twitter.com/intent/tweet` still redirects to
       * the current host, and re-pointing it is not part of this decision.
       */
      name: 'X',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="border-t border-b border-border py-6 my-12">
      <p className="text-sm font-semibold mb-4">Share this article:</p>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon className="h-4 w-4 mr-2" />
                {link.name}
              </a>
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          <Share2 className="h-4 w-4 mr-2" />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
}
