import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  linkedinUrl?: string;
  avatarUrl?: string;
}

export function AuthorBio({ name, role, bio, linkedinUrl }: AuthorBioProps) {
  return (
    <Card className="p-6 sm:p-8 border-t border-b border-border my-12">
      <div className="flex gap-4 sm:gap-6">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">About the Author</h3>
          <p className="text-accent font-semibold mb-3">{name}</p>
          <p className="text-sm text-foreground leading-relaxed mb-4">{bio}</p>
          {linkedinUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" />
                Connect on LinkedIn
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
