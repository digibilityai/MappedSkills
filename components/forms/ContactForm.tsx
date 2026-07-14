'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  service: string;
  budget: string;
  improvements?: string[];
  message?: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    service: '',
    budget: '',
    improvements: [],
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone))
      newErrors.phone = 'Invalid phone number';
    if (!formData.service) newErrors.service = 'Service interest is required';
    if (!formData.budget) newErrors.budget = 'Budget range is required';
    if (!formData.message?.trim()) newErrors.message = 'Please tell us about your challenge';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      // Tracking: contact_form_error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_error', {
          error_fields: Object.keys(errors).join(','),
        });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Tracking: contact_form_submit
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          service_interest: formData.service,
          budget_range: formData.budget,
          has_website: !!formData.website,
          has_message: !!formData.message,
        });
      }

      // Simulate API call - in production, replace with actual backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send data to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        service: '',
        budget: '',
        improvements: [],
        message: '',
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('[v0] Form submission error:', error);
      // Tracking: contact_form_error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_error', {
          error_type: 'submission_error',
        });
      }
      setErrors({ name: 'Something went wrong. Please try again or email us directly at info@mappedskills.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-accent mb-4" />
        <h3 className="mb-2 text-lg font-semibold">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          We&apos;ve received your enquiry. Our team will review your details and get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <a href="/schedule-call">Schedule Call Now</a>
          </Button>
          <Button asChild>
            <a href="/services">Explore Services</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tracking: contact_form_start, service_interest_selected, budget_range_selected */}
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone <span className="text-destructive">*</span>
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98732 32662"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company Name
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company (optional)"
        />
      </div>

      {/* Website Field */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium mb-2">
          Website
        </label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourcompany.com (optional)"
        />
      </div>

      {/* Service Interest Field */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          Service Interest <span className="text-destructive">*</span>
        </label>
        <Select value={formData.service} onValueChange={(value) => handleSelectChange('service', value)}>
          <SelectTrigger
            id="service"
            aria-invalid={!!errors.service}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google-ads">Google Ads</SelectItem>
            <SelectItem value="social-media-ads">Social Media Ads</SelectItem>
            <SelectItem value="lead-generation">Lead Generation</SelectItem>
            <SelectItem value="seo">SEO</SelectItem>
            <SelectItem value="conversion-optimization">Conversion Optimization</SelectItem>
            <SelectItem value="full-performance-marketing">Full Performance Marketing</SelectItem>
            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="mt-1 text-xs text-destructive">{errors.service}</p>
        )}
      </div>

      {/* Budget Field */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium mb-2">
          Current Monthly Marketing Budget <span className="text-destructive">*</span>
        </label>
        <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
          <SelectTrigger
            id="budget"
            aria-invalid={!!errors.budget}
          >
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="below-50k">Below ₹50K</SelectItem>
            <SelectItem value="50k-1l">₹50K - ₹1L</SelectItem>
            <SelectItem value="1l-5l">₹1L - ₹5L</SelectItem>
            <SelectItem value="5l-plus">₹5L+</SelectItem>
            <SelectItem value="not-decided">Not decided yet</SelectItem>
          </SelectContent>
        </Select>
        {errors.budget && (
          <p className="mt-1 text-xs text-destructive">{errors.budget}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Tell us briefly about your current marketing challenge <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="e.g., Currently getting 10 leads/month but only 2 convert. Looking to improve lead quality."
          className="min-h-32"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit — We\'ll Call You'}
      </Button>

      {/* Trust & Security Badges */}
      <Card className="p-4 bg-secondary/30 border-secondary text-center">
        <p className="text-xs text-muted-foreground">
          ✓ We respond within 24 hours  |  ✓ No pushy sales calls  |  ✓ Your info is secure
        </p>
      </Card>
    </form>
  );
}
