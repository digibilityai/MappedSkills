import { Card } from '@/components/ui/card';

interface StatCardProps {
  stat: string;
  label: string;
  description?: string;
}

export function StatCard({ stat, label, description }: StatCardProps) {
  return (
    <Card className="p-8 sm:p-10 text-center hover:shadow-lg transition-shadow bg-white border border-border/50">
      <p className="mb-3 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-accent">
        {stat}
      </p>
      <h3 className="mb-3 text-lg sm:text-xl font-bold font-heading text-foreground uppercase tracking-wider">
        {label}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </Card>
  );
}
