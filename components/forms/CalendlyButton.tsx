'use client';

import { Button } from '@/components/ui/button';

interface CalendlyButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CalendlyButton({
  href,
  children,
  variant = 'default',
  size = 'lg',
  className,
}: CalendlyButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'schedule_call_click', {
        event_category: 'engagement',
        event_label: 'calendly_button'
      });
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
