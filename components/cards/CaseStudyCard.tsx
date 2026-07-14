import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CaseStudyCardProps {
  title: string;
  industry?: string;
  service: string;
  before?: string;
  after?: string;
  primaryResult?: string;
  summary?: string;
  href?: string;
  featured?: boolean;
  // Legacy props for backward compatibility
  result?: string;
  beforeAfter?: string;
}

export function CaseStudyCard({
  title,
  industry,
  service,
  before,
  after,
  primaryResult,
  summary,
  href = '/results',
  featured = true,
  // Legacy props
  result,
  beforeAfter,
}: CaseStudyCardProps) {
  // Handle legacy props
  const displayPrimaryResult = primaryResult || result || '';
  const displayBefore = before;
  const displayAfter = after;
  const displaySummary = summary || beforeAfter || '';

  return (
    <Link href={href}>
      <Card className={`h-full hover:shadow-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-border/50 bg-white ${featured ? 'p-8 sm:p-10' : 'p-6 sm:p-8'}`}>
        {/* Badges */}
        {(industry || service) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {industry && (
              <Badge variant="secondary" className="bg-foreground/10 text-muted-foreground border-0">
                {industry}
              </Badge>
            )}
            {service && (
              <Badge variant="default" className="bg-accent/10 text-accent border-0">
                {service}
              </Badge>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold font-heading mb-4 group-hover:text-accent transition-colors ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
          {title}
        </h3>

        {/* Before/After Metrics (New Style) */}
        {displayBefore && displayAfter && (
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Before
              </p>
              <p className="text-sm sm:text-base font-semibold text-muted-foreground">
                {displayBefore}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                After
              </p>
              <p className="text-sm sm:text-base font-semibold text-muted-foreground">
                {displayAfter}
              </p>
            </div>
          </div>
        )}

        {/* Primary Result */}
        {displayPrimaryResult && (
          <div className={`mb-6 ${displayBefore && displayAfter ? 'pb-6 border-b border-border/30' : ''}`}>
            <p className={`font-bold font-heading text-accent ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
              {displayPrimaryResult}
            </p>
          </div>
        )}

        {/* Summary */}
        {displaySummary && (
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
            {displaySummary}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-accent font-semibold text-sm">
          View Case Study
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  );
}
