'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CaseStudyCard } from '@/components/CaseStudyCard';

const SERVICES = ['All Results', 'Google Ads', 'Social Media Ads', 'Lead Generation', 'SEO', 'Conversion Optimization', 'Multi-Channel'];
const INDUSTRIES = ['All Industries', 'Real Estate', 'E-commerce', 'Education', 'B2B Services', 'Local Businesses', 'Coaches & Consultants'];

const ALL_CASE_STUDIES = [
  {
    title: 'Google Ads for B2B Service Business',
    industry: 'B2B Services',
    service: 'Google Ads',
    result: '2.5x ROAS in 30 days',
    summary: 'Improved return on ad spend through targeting refinement and bid optimization.',
    href: '#',
  },
  {
    title: 'Meta Ads for Real Estate Project',
    industry: 'Real Estate',
    service: 'Social Media Ads',
    result: '50 qualified leads/month',
    summary: 'Better lead quality and improved campaign structure for property enquiries.',
    href: '#',
  },
  {
    title: 'Lead Generation for Service Provider',
    industry: 'Professional Services',
    service: 'Lead Generation',
    result: '50 appointment-ready leads/month',
    summary: 'Predictable lead pipeline through form optimization and qualification.',
    href: '#',
  },
  {
    title: 'SEO Growth for Business Website',
    industry: 'Service Business',
    service: 'SEO',
    result: '150 keyword rankings',
    summary: 'Improved search visibility through technical SEO and content optimization.',
    href: '#',
  },
  {
    title: 'CRO for Landing Page',
    industry: 'Lead Generation',
    service: 'Conversion Optimization',
    result: '2.5x form submissions',
    summary: 'More leads without more traffic through landing page optimization.',
    href: '#',
  },
  {
    title: 'Multi-Channel Campaign for Growth Brand',
    industry: 'E-commerce',
    service: 'Google Ads + Meta Ads + CRO',
    result: 'Improved revenue consistency',
    summary: 'Better campaign scalability and performance through integrated strategy.',
    href: '#',
  },
];

interface ResultsFilterProps {
  onFilterChange?: (service: string, industry: string) => void;
}

export function ResultsFilter({ onFilterChange }: ResultsFilterProps = {}) {
  const [selectedService, setSelectedService] = useState('All Results');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    onFilterChange?.(service, selectedIndustry);
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    onFilterChange?.(selectedService, industry);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Services</p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <Button
              key={service}
              variant={selectedService === service ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleServiceChange(service)}
            >
              {service}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Industries</p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleIndustryChange(industry)}
            >
              {industry}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ResultsGridProps {
  selectedService: string;
  selectedIndustry: string;
}

export function ResultsGrid({ selectedService, selectedIndustry }: ResultsGridProps) {
  const filteredStudies = ALL_CASE_STUDIES.filter((study) => {
    const serviceMatch = selectedService === 'All Results' || study.service.includes(selectedService);
    const industryMatch = selectedIndustry === 'All Industries' || study.industry.includes(selectedIndustry);
    return serviceMatch && industryMatch;
  });

  return (
    <div>
      {filteredStudies.length > 0 ? (
        <div>
          <p className="text-muted-foreground mb-6">
            Showing {filteredStudies.length} result{filteredStudies.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudies.map((study) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                industry={study.industry}
                service={study.service}
                result={study.result}
                summary={study.summary}
                href={study.href}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No case studies match your filters. Try a different combination.</p>
        </Card>
      )}
    </div>
  );
}
