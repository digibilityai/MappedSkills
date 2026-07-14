import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  problem?: string;
  solution?: string;
  bestFor?: string[];
  outcomeLabel?: string;
  keyOutcomes?: string[];
  ctaText?: string;
  ctaHref?: string;
  cta?: {
    text: string;
    href: string;
  };
}

export function ServiceCard({
  icon,
  title,
  description,
  problem,
  solution,
  bestFor,
  outcomeLabel,
  keyOutcomes,
  ctaText,
  ctaHref,
  cta,
}: ServiceCardProps) {
  // Premium service card (icon + title + description + outcome label + cta link)
  if (!problem && !solution && !bestFor && !keyOutcomes) {
    return (
      <Card className="group p-6 sm:p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-border/50 bg-card">
        {icon && (
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
            <div className="text-accent">{icon}</div>
          </div>
        )}
        <h3 className="mb-3 text-xl font-bold font-heading text-foreground">{title}</h3>
        {description && <p className="text-muted-foreground flex-grow leading-relaxed mb-4">{description}</p>}
        
        {outcomeLabel && (
          <div className="mb-4">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs">
              {outcomeLabel}
            </Badge>
          </div>
        )}
        
        {(cta || (ctaText && ctaHref)) && (
          <div className="mt-auto pt-4 flex items-center gap-2 text-accent font-semibold text-sm group/link">
            <Link href={cta?.href || ctaHref || '#'} className="flex items-center gap-2 hover:gap-3 transition-all">
              {cta?.text || ctaText}
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Card>
    );
  }

  // Detailed service card (problem + solution + best for + key outcomes)
  return (
    <Card className="p-8 sm:p-10 flex flex-col h-full hover:shadow-lg transition-shadow">
      <h3 className="mb-6 text-2xl font-bold text-accent">{title}</h3>

      {problem && (
        <div className="mb-6">
          <p className="mb-2 font-semibold text-foreground">The Problem:</p>
          <p className="text-muted-foreground leading-relaxed">{problem}</p>
        </div>
      )}

      {solution && (
        <div className="mb-6">
          <p className="mb-2 font-semibold text-foreground">Our Solution:</p>
          <p className="text-muted-foreground leading-relaxed">{solution}</p>
        </div>
      )}

      {bestFor && bestFor.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 font-semibold text-foreground">Best For:</p>
          <ul className="space-y-2">
            {bestFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {keyOutcomes && keyOutcomes.length > 0 && (
        <div className="mb-8 flex-grow">
          <p className="mb-3 font-semibold text-foreground">Key Outcomes:</p>
          <ul className="space-y-2">
            {keyOutcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ctaHref && ctaText && (
        <Button asChild className="w-full" variant="outline">
          <Link href={ctaHref} className="flex items-center justify-center gap-2">
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </Card>
  );
}
