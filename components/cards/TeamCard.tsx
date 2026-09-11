import { Card } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

interface TeamCardProps {
  name: string;
  title: string;
  specialty: string;
  linkedinUrl?: string;
  imageUrl?: string;
}

export function TeamCard({ 
  name, 
  title, 
  specialty,
  linkedinUrl = '#',
  imageUrl 
}: TeamCardProps) {
  return (
    <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow flex flex-col">
      <div className="mb-4 flex justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent/60 text-sm font-medium">
            Photo
          </div>
        )}
      </div>
      <h3 className="mb-1 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-accent font-medium mb-3">{title}</p>
      <p className="text-sm text-muted-foreground flex-grow mb-4">{specialty}</p>
      {linkedinUrl && linkedinUrl !== '#' && (
        <Link 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          <span>Connect</span>
        </Link>
      )}
    </Card>
  );
}
