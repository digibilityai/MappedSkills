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

export function AuthorBio({ name, role, bio, linkedinUrl, avatarUrl }: AuthorBioProps) {
  return (
    <Card className="p-6 sm:p-8 border border-resolve-line bg-resolve-ground my-12 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
          <AvatarImage
            src={avatarUrl || "https://api.dicebear.com/10.x/toon-head/svg?seed=Alex%20Whi"}
            alt={name}
          />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          {/* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */}
          <h4 className="text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-bold mb-1 text-resolve-ink">
            About the Author
          </h4>
          {/* Body large: Wide 18px - Medium 18px - Narrow 17px - Line-height 1.55-1.65 */}
          <p className="text-[clamp(17px,1.15vw,18px)] leading-[1.60] text-resolve-accent-deep font-semibold mb-1">{name}</p>
          {/* Small/note: Wide 14px - Medium 14px - Narrow 14px - Line-height 1.45-1.55 */}
          {role ? <p className="text-[14px] leading-[1.50] text-resolve-dim mb-3">{role}</p> : null}
          {/* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */}
          <p className="text-[16px] leading-[1.60] text-resolve-dim mb-4">{bio}</p>
          {linkedinUrl && (
            <Button variant="outline" size="sm" asChild className="border-resolve-line hover:border-resolve-ink text-resolve-ink">
              <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2 text-resolve-accent-dark" />
                Connect on LinkedIn
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
