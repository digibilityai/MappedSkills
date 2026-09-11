import { Card } from '@/components/ui/card';

interface BlogIntroductionProps {
  hook: string;
  problem: string;
  promise: string;
}

export function BlogIntroduction({ hook, problem, promise }: BlogIntroductionProps) {
  return (
    <div className="py-12 border-b border-border mb-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-foreground/90 mb-4 leading-relaxed">
          <strong>{hook}</strong>
        </p>
        <p className="text-base text-foreground mb-4 leading-relaxed">
          {problem}
        </p>
        <Card className="p-6 bg-accent/5 border-accent/20">
          <p className="text-foreground/90 font-semibold">What you&apos;ll learn:</p>
          <p className="text-foreground mt-2">{promise}</p>
        </Card>
      </div>
    </div>
  );
}
