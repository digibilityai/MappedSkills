'use client';

import { useState } from 'react';
import { ARTICLE as A } from './content';

/**
 * Share line for an article (BL-D6 G2). Same three destinations and the same share text as
 * `components/blog/SocialShare.tsx` (BLOG-006: the X label with the unchanged `twitter.com/intent/tweet` destination),
 * restyled as plain C+ text links. Like the component it replaces, it sends NO analytics: `share_click` is not in the
 * approved event taxonomy (Session 34, H2A). Only "Copy link" needs JavaScript; the three links work without it.
 */
export function ArticleShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const shareText = `${title} - MappedSkills Marketing`;
  const links = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}` },
  ];

  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };
    try {
      navigator.clipboard.writeText(url).then(done, done);
    } catch {
      done();
    }
  };

  return (
    <div className="ba-line">
      <span className="ba-line-l" id="ba-share-l">
        {A.share}
      </span>
      <ul className="ba-share" aria-labelledby="ba-share-l">
        {links.map((l) => (
          <li key={l.name}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.name}
              <span className="px-sr">{A.newTab}</span>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy}>
            {A.copy}
          </button>{' '}
          <span className="ba-copied" role="status" aria-live="polite">
            {copied ? A.copied : ''}
          </span>
        </li>
      </ul>
    </div>
  );
}
