'use client';

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
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share_click', {
        event_category: 'engagement',
        event_label: 'copy_link',
        page_title: title,
      });
    }
  };

  const trackShare = (platform: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share_click', {
        event_category: 'engagement',
        event_label: platform,
        page_title: title,
      });
    }
  };

  const shareText = `${title} - MappedSkills Marketing`;
  
  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      onClick: () => trackShare('linkedin'),
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      onClick: () => trackShare('facebook'),
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      onClick: () => trackShare('twitter'),
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
              onClick={link.onClick}
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
