import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface BeforeAfterMetricProps {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export function BeforeAfterMetric({
  label,
  before,
  after,
  improvement,
}: BeforeAfterMetricProps) {
  return (
    <Card className="p-6 sm:p-8">
      <p className="text-sm font-medium text-muted-foreground mb-4">{label}</p>
      <div className="flex items-center gap-4 sm:gap-6 mb-4">
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-muted-foreground">{before}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Before</p>
        </div>
        <ArrowRight className="h-5 w-5 text-accent flex-shrink-0" />
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-accent">{after}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">After</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-accent">{improvement}</p>
    </Card>
  );
}
