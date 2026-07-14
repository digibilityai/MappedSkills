import { Card } from '@/components/ui/card';

interface IndustryCardProps {
  title: string;
  description: string;
}

export function IndustryCard({ title, description }: IndustryCardProps) {
  return (
    <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
      <h3 className="mb-3 text-lg font-semibold text-accent">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
