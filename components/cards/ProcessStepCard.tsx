import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface ProcessStepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export function ProcessStepCard({
  stepNumber,
  title,
  description,
  icon,
}: ProcessStepCardProps) {
  return (
    <Card className="group relative p-8 sm:p-10 h-full hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 border border-border/50 bg-white">
      {/* Step Number Badge */}
      <div className="mb-6 flex items-start justify-between">
        <Badge className="bg-accent text-white text-lg font-bold px-3 py-1">
          {stepNumber}
        </Badge>
      </div>

      {/* Icon */}
      {icon && (
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
          <div className="text-accent">{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3 className="mb-4 text-xl sm:text-2xl font-bold font-heading text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
