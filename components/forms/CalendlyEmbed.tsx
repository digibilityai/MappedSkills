'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface CalendlyEmbedProps {
  url?: string;
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCalendlyUrl, setHasCalendlyUrl] = useState(false);

  useEffect(() => {
    // Check if Calendly URL is configured
    if (!url) {
      setIsLoading(false);
      setHasCalendlyUrl(false);
      return;
    }

    setHasCalendlyUrl(true);

    // Lazy-load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      // Re-initialize Calendly after script loads
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initBadgeWidget({
          url,
          text: 'Schedule Time With Me',
          color: '#C41E3A',
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [url]);

  // Fallback if no Calendly URL
  if (!hasCalendlyUrl) {
    return (
      <Card className="p-8 sm:p-12 text-center bg-background border border-border">
        <Clock className="h-12 w-12 text-accent/30 mx-auto mb-4" />
        <p className="text-muted-foreground mb-4 font-semibold">
          Calendly booking link is not configured yet.
        </p>
        <p className="text-muted-foreground mb-8">
          Please contact us directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <a href="tel:+919873232662">Call +91 9873232662</a>
          </Button>
          <Button asChild>
            <a href="mailto:info@mappedskills.com">Email us</a>
          </Button>
        </div>
      </Card>
    );
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <Card className="p-8 sm:p-12 text-center bg-background border border-border min-h-96 flex flex-col items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-secondary rounded w-48 mx-auto" />
          <div className="h-4 bg-secondary rounded w-64 mx-auto" />
          <div className="h-64 bg-secondary rounded w-full" />
        </div>
      </Card>
    );
  }

  // Calendly embed container
  return (
    <div className="calendly-inline-widget min-h-96" data-url={url} style={{ minWidth: '280px' }}>
      {/* Calendly will populate this */}
    </div>
  );
}
