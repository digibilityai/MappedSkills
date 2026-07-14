'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function BlogNewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      // GA4 event for newsletter signup
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'blog_newsletter',
          email: email,
        });
      }

      // Placeholder for actual newsletter signup
      // In production, integrate with email service (Mailchimp, ConvertKit, etc)
      setMessage('Thanks! Check your email for confirmation.');
      setEmail('');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 bg-secondary/5 border-accent/20">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="mb-2 text-xl sm:text-2xl font-bold">
          Want Practical Growth Insights in Your Inbox?
        </h3>
        <p className="mb-6 text-muted-foreground">
          Get simple, useful marketing tips on ads, SEO, leads, ROAS, and conversion growth.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="sm:whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Subscribe for Growth Insights'}
          </Button>
        </form>

        {message && (
          <p className={`text-sm ${message.includes('Thanks') ? 'text-accent' : 'text-destructive'}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          No spam. Only practical marketing insights.
        </p>
      </div>
    </Card>
  );
}
