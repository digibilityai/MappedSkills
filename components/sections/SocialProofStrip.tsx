import { Card } from '@/components/ui/card';

export function SocialProofStrip() {
  const proofs = [
    {
      stat: '300%+',
      label: 'Average ROI',
    },
    {
      stat: '₹100Cr+',
      label: 'Revenue Influenced',
    },
    {
      stat: '50+',
      label: 'Clients Served',
    },
    {
      stat: '9+',
      label: 'Years Experience',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {proofs.map((proof, idx) => (
        <Card
          key={idx}
          className="p-4 sm:p-6 text-center bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-md"
        >
          <p className="text-2xl sm:text-3xl font-bold font-heading text-accent mb-2">
            {proof.stat}
          </p>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {proof.label}
          </p>
        </Card>
      ))}
    </div>
  );
}
