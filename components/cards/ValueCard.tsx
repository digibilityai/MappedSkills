import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ValueCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <Card className="p-6 sm:p-8 flex flex-col h-full">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
          <div className="text-accent text-xl">{icon}</div>
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </Card>
  );
}
