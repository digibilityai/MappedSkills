import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ProblemCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function ProblemCard({ icon, title, description }: ProblemCardProps) {
  return (
    <Card className="group p-6 sm:p-8 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white">
      {icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
          <div className="text-accent">{icon}</div>
        </div>
      )}
      <h3 className="mb-3 text-lg font-bold font-heading text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
