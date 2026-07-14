import { Zap, Target, TrendingUp, BarChart3, Users, Lightbulb, Search, Users2, Funnel, TrendingUpIcon, Zap as ConversionIcon, AlertTriangle, TrendingDown, BarChart2, Activity, Search as AuditIcon, Map, Rocket, TrendingUp as GrowthIcon } from 'lucide-react';

export const PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Discovery & Audit',
    description: 'We review your current marketing, website, funnel, tracking, and growth gaps.',
    icon: AuditIcon,
  },
  {
    stepNumber: '02',
    title: 'Strategy Design',
    description: 'We define the right channels, budget split, audience, offer, and conversion path.',
    icon: Map,
  },
  {
    stepNumber: '03',
    title: 'Campaign Launch',
    description: 'We build and launch campaigns with tracking, landing pages, and reporting in place.',
    icon: Rocket,
  },
  {
    stepNumber: '04',
    title: 'Optimize & Scale',
    description: 'We monitor performance, improve weak areas, and scale what produces measurable results.',
    icon: GrowthIcon,
  },
];

export const SERVICES = [
  {
    id: 'google-ads',
    title: 'Google Ads',
    description: 'Capture high-intent buyers actively searching for your product or service.',
    href: '/google-ads',
    outcomeLabel: 'Best for high-intent leads',
    icon: Search,
  },
  {
    id: 'social-media-ads',
    title: 'Social Media Ads',
    description: 'Reach, retarget, and convert your ideal audience across Facebook and Instagram.',
    href: '/social-media-ads',
    outcomeLabel: 'Best for audience targeting',
    icon: Users2,
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'Build a predictable pipeline of qualified leads for your sales team.',
    href: '/lead-generation',
    outcomeLabel: 'Best for qualified enquiries',
    icon: Funnel,
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Rank for high-intent keywords and build long-term organic visibility.',
    href: '/seo',
    outcomeLabel: 'Best for organic growth',
    icon: TrendingUpIcon,
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Optimization',
    description: 'Turn more visitors into leads and customers without increasing ad spend.',
    href: '/conversion-optimization',
    outcomeLabel: 'Best for improving conversion',
    icon: ConversionIcon,
  },
];

export const PROBLEM_CARDS = [
  {
    icon: AlertTriangle,
    title: 'Ads Are Running, But Leads Are Poor Quality',
    description: 'Your campaigns may be generating enquiries, but your sales team still wastes time on people who are not serious, not relevant, or not ready.',
  },
  {
    icon: TrendingDown,
    title: 'Website Traffic Is Coming, But Enquiries Are Low',
    description: 'People visit your website but leave without filling the form, calling, buying, or booking a meeting.',
  },
  {
    icon: BarChart2,
    title: 'Reports Show Numbers, But Not Business Impact',
    description: 'Clicks, impressions, and reach are visible, but you still do not know which campaign is helping revenue, sales, or qualified leads.',
  },
  {
    icon: Activity,
    title: 'Marketing Activity Is Happening, But Growth Is Not Predictable',
    description: 'Content, ads, and SEO may be active, but there is no clear system connecting traffic, leads, follow-up, and business growth.',
  },
];

export const STATS = [
  {
    stat: '300%+',
    label: 'Average ROI',
    description: 'Performance campaigns built around measurable return.',
  },
  {
    stat: '₹100Cr+',
    label: 'Revenue Influenced',
    description: 'Campaigns and funnels connected to business growth.',
  },
  {
    stat: '50+',
    label: 'Clients Served',
    description: 'Experience across real estate, education, e-commerce, and services.',
  },
  {
    stat: '65%+',
    label: 'Client Retention',
    description: 'Long-term trust built through transparency and performance.',
  },
];

export const METRICS_TRACKED = [
  'Leads',
  'Qualified Leads',
  'Cost Per Lead',
  'Conversion Rate',
  'ROAS',
  'Revenue Impact',
  'Landing Page Performance',
  'Campaign Quality',
  'SEO Visibility',
];

export const BENEFITS = [
  {
    icon: Zap,
    title: 'Performance-First Thinking',
    description: 'We focus on revenue, leads, ROAS, and conversion — not vanity metrics.',
  },
  {
    icon: Target,
    title: 'Transparent Reporting',
    description: 'You see what is working, what is not working, and what needs to change.',
  },
  {
    icon: TrendingUp,
    title: 'Strategy + Execution',
    description: 'We don&apos;t just run ads. We connect campaigns, landing pages, tracking, and optimization.',
  },
];

export const FEATURED_CASE_STUDIES = [
  {
    title: 'Real Estate Lead Generation Campaign',
    industry: 'Real Estate',
    service: 'Google Ads + Meta Ads',
    before: '15 qualified leads/month',
    after: '50 qualified leads/month',
    primaryResult: '3.3x increase in qualified leads',
    summary: 'MappedSkills helped improve campaign structure, targeting, lead capture, and follow-up clarity to generate more serious property enquiries.',
    href: '/results/real-estate-lead-generation',
  },
  {
    title: 'E-commerce Revenue Growth Campaign',
    industry: 'E-commerce',
    service: 'Social Media Ads + SEO',
    before: '₹20L monthly revenue',
    after: '₹100L monthly revenue',
    primaryResult: '5x revenue growth',
    summary: 'MappedSkills improved paid social strategy, product visibility, retargeting, and conversion paths to support scalable revenue growth.',
    href: '/results/ecommerce-revenue-growth',
  },
  {
    title: 'Online Education Enrollment Campaign',
    industry: 'Online Education',
    service: 'Google Ads + Lead Generation',
    before: '100 course enrollments',
    after: '500 course enrollments',
    primaryResult: '5x increase in enrollments',
    summary: 'MappedSkills improved targeting, campaign structure, lead capture, and nurturing to increase course enrollments.',
    href: '/results/online-education-enrollments',
  },
];

export const BLOG_ARTICLES = [
  {
    title: 'How to Calculate Google Ads ROI',
    category: 'Google Ads',
    publishDate: 'May 2026',
    excerpt: 'Learn the exact formula to calculate Google Ads ROI and determine if your campaigns are actually profitable.',
    readingTime: '6 min read',
    href: '/blog/how-to-calculate-google-ads-roi',
  },
  {
    title: '5 Reasons Your Facebook Ads Are Not Working',
    category: 'Social Media Ads',
    publishDate: 'May 2026',
    excerpt: 'Find out why your Facebook and Instagram ads may be getting clicks but not serious leads, sales, or enquiries.',
    readingTime: '7 min read',
    href: '/blog/facebook-ads-not-working',
  },
  {
    title: 'Lead Scoring 101: How to Qualify Your Sales Leads',
    category: 'Lead Generation',
    publishDate: 'May 2026',
    excerpt: 'Learn how to separate serious prospects from random enquiries using a simple lead scoring framework for better sales follow-up.',
    readingTime: '8 min read',
    href: '/blog/lead-scoring-101',
  },
  {
    title: 'SEO vs PPC: Which Should Your Business Choose?',
    category: 'Marketing Strategy',
    publishDate: 'May 2026',
    excerpt: 'Understand when your business should invest in SEO, when PPC makes more sense, and when both channels should work together.',
    readingTime: '7 min read',
    href: '/blog/seo-vs-ppc',
  },
  {
    title: 'E-commerce Conversion Optimization: 7 Proven Tactics',
    category: 'Conversion Optimization',
    publishDate: 'May 2026',
    excerpt: 'Improve your e-commerce conversion rate with practical tactics for product pages, checkout flow, trust signals, mobile UX, offers, and abandoned carts.',
    readingTime: '8 min read',
    href: '/blog/ecommerce-conversion-optimization',
  },
  {
    title: 'Google Shopping Ads Strategy: Complete Setup Guide',
    category: 'Google Ads',
    publishDate: 'May 2026',
    excerpt: 'Learn how Google Shopping Ads help e-commerce brands show products on Google, improve product visibility, and generate measurable sales.',
    readingTime: '9 min read',
    href: '/blog/google-shopping-ads-strategy',
  },
  {
    title: 'LinkedIn Ads for B2B Lead Generation: Best Practices',
    category: 'Lead Generation',
    publishDate: 'May 2026',
    excerpt: 'Learn how B2B businesses can use LinkedIn Ads to reach decision-makers, generate qualified leads, and build a stronger sales pipeline.',
    readingTime: '8 min read',
    href: '/blog/linkedin-ads-b2b-lead-generation',
  },
  {
    title: 'Seasonal Paid Ads Strategy: Holiday Marketing Guide',
    category: 'Marketing Strategy',
    publishDate: 'May 2026',
    excerpt: 'Learn how to plan festive and holiday paid ad campaigns with the right timing, budget, offer, creative testing, retargeting, and conversion tracking.',
    readingTime: '7 min read',
    href: '/blog/seasonal-paid-ads-strategy',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'MappedSkills helped us improve lead quality and understand exactly where our marketing budget was going.',
    clientName: 'Client Name',
    industry: 'Real Estate',
    placeholder: true,
  },
  {
    quote: 'The team brought clarity to our campaigns and helped us focus on numbers that actually matter.',
    clientName: 'Client Name',
    industry: 'Service Business',
    placeholder: true,
  },
  {
    quote: 'We finally had a marketing partner who could explain performance in simple business language.',
    clientName: 'Client Name',
    industry: 'E-commerce',
    placeholder: true,
  },
];

export const CASE_STUDIES = [
  {
    company: 'TechFlow',
    industry: 'B2B SaaS',
    challenge: 'Low lead quality and high CAC',
    result: '250% increase in qualified leads, 45% reduction in CAC',
    timeframe: '6 months',
  },
  {
    company: 'GrowthLabs',
    industry: 'E-commerce',
    challenge: 'Plateau in traffic and conversions',
    result: '180% traffic increase, 35% conversion rate improvement',
    timeframe: '4 months',
  },
  {
    company: 'CloudSync',
    industry: 'Enterprise SaaS',
    challenge: 'Inefficient paid advertising',
    result: '3.2x ROAS, $1.2M in qualified pipeline',
    timeframe: '5 months',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '2,500',
    period: '/month',
    description: 'Perfect for new growth-focused companies',
    features: [
      'One paid channel (Google Ads or Social)',
      'Monthly strategy sessions',
      'Basic reporting',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '5,000',
    period: '/month',
    description: 'Most popular for scaling companies',
    features: [
      'Two paid channels',
      'Weekly optimization',
      'Advanced analytics dashboard',
      'Priority support',
      'Monthly strategy sessions',
      'A/B testing',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For companies with complex needs',
    features: [
      'Unlimited channels',
      'Dedicated account team',
      'Custom integrations',
      '24/7 support',
      'In-depth quarterly reviews',
      'Custom solutions',
    ],
    cta: 'Schedule Call',
  },
];

export const GOOGLE_ADS_SERVICES = [
  {
    title: 'Search Ads',
    description: 'Capture buyers actively searching for your product or service on Google Search.',
    icon: Search,
  },
  {
    title: 'Shopping Ads',
    description: 'Show your products directly on Google Shopping with images, price, and seller info.',
    icon: BarChart3,
  },
  {
    title: 'Display Ads',
    description: 'Reach potential customers across millions of websites with targeted visual ads.',
    icon: Target,
  },
  {
    title: 'YouTube Ads',
    description: 'Connect with your audience through video ads on YouTube and partner sites.',
    icon: TrendingUp,
  },
  {
    title: 'Remarketing Ads',
    description: 'Re-engage website visitors who didn&apos;t convert on their first visit.',
    icon: Funnel,
  },
  {
    title: 'App Promotion Ads',
    description: 'Drive app downloads and in-app actions from Google Search and Display networks.',
    icon: Zap,
  },
];

export const GOOGLE_ADS_USE_CASES = [
  {
    title: 'Generate Qualified Leads',
    description: 'Capture serious prospects searching for your service with targeted landing pages and forms.',
    industries: ['Real Estate', 'Education', 'B2B Services'],
  },
  {
    title: 'Drive E-commerce Sales',
    description: 'Show products to buyers ready to purchase with Shopping Ads and search campaigns.',
    industries: ['E-commerce', 'Retail', 'D2C Brands'],
  },
  {
    title: 'Increase Local Foot Traffic',
    description: 'Reach nearby customers searching for businesses like yours with local services ads.',
    industries: ['Restaurants', 'Clinics', 'Gyms'],
  },
  {
    title: 'Build Brand Awareness',
    description: 'Reach your target audience across Google Display Network and YouTube with video campaigns.',
    industries: ['SaaS', 'Apps', 'Media'],
  },
  {
    title: 'Boost App Downloads',
    description: 'Promote your app and drive quality installs and in-app actions with App Promotion campaigns.',
    industries: ['Mobile Apps', 'Games', 'SaaS'],
  },
];

export const GOOGLE_ADS_PRICING_TIERS = [
  {
    name: 'Starter',
    price: '₹2,500',
    period: '/month',
    description: 'Perfect for new Google Ads campaigns',
    features: [
      'One Google Ads campaign',
      'Basic keyword research & bid strategy',
      'Monthly performance report',
      'Ad copy optimization',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₹5,000',
    period: '/month',
    description: 'Best for scaling campaigns',
    features: [
      'Multiple Google Ads campaigns',
      'Advanced keyword & competitor research',
      'Weekly optimization & bid adjustments',
      'Landing page improvements',
      'A/B testing of ad copy & landing pages',
      'Detailed analytics dashboard',
      'Priority support',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Performance',
    price: 'Custom',
    period: '',
    description: 'For enterprise-level campaigns',
    features: [
      'Unlimited campaigns',
      'Dedicated account manager',
      'Conversion tracking & attribution',
      'Custom integrations',
      'Quarterly strategy reviews',
      '24/7 support',
      'Advanced automation & AI bidding',
    ],
    cta: 'Schedule Call',
  },
];

export const GOOGLE_ADS_FAQS = [
  {
    question: 'How much should I spend on Google Ads?',
    answer: 'Google Ads works at any budget, from ₹500/month to ₹500,000+. We recommend starting with ₹2,000-5,000/month to generate consistent data and optimize effectively.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Most campaigns show initial results within 1-2 weeks. Meaningful optimization happens within 4-6 weeks as we gather data and adjust keywords, bids, and targeting.',
  },
  {
    question: 'What is a good Google Ads ROI?',
    answer: 'ROI varies by industry, but a healthy target is 3:1 (₹3 revenue for every ₹1 spent). High-intent industries like real estate can see 5:1+ returns.',
  },
  {
    question: 'How do you improve Google Ads performance?',
    answer: 'We improve keyword targeting, ad copy, landing pages, bid strategy, and negative keywords based on performance data. We also test new audiences and ad formats.',
  },
  {
    question: 'Can Google Ads work for my industry?',
    answer: 'Google Ads works for almost any business. We help SaaS, e-commerce, real estate, education, B2B services, local businesses, and more generate qualified leads and sales.',
  },
  {
    question: 'What tracking do you set up?',
    answer: 'We set up conversion tracking, lead tracking, revenue tracking, and connect your ads to your CRM. This helps us prove ROI and optimize for the right business outcomes.',
  },
];

export const GOOGLE_ADS_CASE_STUDIES = [
  {
    title: 'Real Estate: 3.3x Qualified Leads',
    before: '15 qualified leads/month',
    after: '50 qualified leads/month',
    result: '3.3x increase in qualified leads',
    description: 'Improved keyword targeting, landing page clarity, lead capture form, and follow-up process.',
    placeholder: true,
  },
  {
    title: 'E-commerce: 5x Revenue Growth',
    before: '₹20L monthly revenue',
    after: '₹100L monthly revenue',
    result: '5x revenue growth',
    description: 'Optimized product feed, implemented Shopping Ads, improved remarketing, tested new audiences.',
    placeholder: true,
  },
  {
    title: 'Online Education: 5x Enrollments',
    before: '100 course enrollments',
    after: '500 course enrollments',
    result: '5x increase in enrollments',
    description: 'Built targeted search campaigns, optimized landing pages, created lead nurturing sequence.',
    placeholder: true,
  },
];

export const GOOGLE_ADS_DIFFERENTIATORS = [
  {
    icon: Target,
    title: 'Performance-First Approach',
    description: 'We focus on ROAS, qualified leads, and revenue — not vanity metrics like clicks or impressions.',
  },
  {
    icon: TrendingUp,
    title: 'Deep Optimization',
    description: 'We improve keywords, ad copy, landing pages, targeting, and bid strategies based on real data.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: 'You see exactly what is working, what is not, and what we recommend changing each month.',
  },
  {
    icon: Users,
    title: 'Expert Strategy',
    description: 'We combine proven Google Ads strategies with your unique business goals for sustainable growth.',
  },
];

export const SOCIAL_MEDIA_ADS_SERVICES = [
  {
    title: 'Facebook Ads Management',
    description: 'Build and optimize campaigns for awareness, leads, enquiries, conversions, and sales.',
  },
  {
    title: 'Instagram Ads Management',
    description: 'Use feed, reels, stories, and explore placements to reach and convert the right audience.',
  },
  {
    title: 'Audience Research & Segmentation',
    description: 'Define cold, warm, custom, lookalike, and retargeting audiences based on campaign goals.',
  },
  {
    title: 'Creative Testing & Optimization',
    description: 'Test hooks, formats, visuals, copy, offers, and CTAs to find winning ad angles.',
  },
  {
    title: 'Lead Generation Campaigns',
    description: 'Create campaigns designed to generate enquiries, form submissions, WhatsApp leads, or booked calls.',
  },
  {
    title: 'E-commerce Conversion Campaigns',
    description: 'Optimize product sales through conversion campaigns, catalog ads, retargeting, and offer-led campaigns.',
  },
  {
    title: 'Retargeting Campaigns',
    description: 'Bring back engaged users, website visitors, video viewers, and abandoned prospects.',
  },
  {
    title: 'Conversion Tracking Setup',
    description: 'Track form submissions, calls, WhatsApp clicks, purchases, add-to-cart events, and booked meetings.',
  },
];

export const SOCIAL_MEDIA_ADS_VERTICALS = [
  {
    title: 'Real Estate Agents & Builders',
    description: 'Generate qualified property enquiries through location targeting, lead forms, WhatsApp campaigns, and retargeting.',
  },
  {
    title: 'E-commerce Brands',
    description: 'Improve product visibility, purchases, repeat sales, and ROAS through conversion-focused campaign structures.',
  },
  {
    title: 'Online Education & Courses',
    description: 'Drive course enquiries, webinar registrations, admissions, and enrollments through interest and intent-led campaigns.',
  },
  {
    title: 'Service-Based Businesses',
    description: 'Generate leads for clinics, consultants, agencies, finance businesses, and local service providers.',
  },
];

export const SOCIAL_MEDIA_ADS_DIFFERENTIATORS = [
  {
    title: 'Creative + Data Thinking',
    description: 'We do not guess creatives. We test angles, hooks, formats, and offers based on audience response.',
  },
  {
    title: 'Lead Quality Focus',
    description: 'We do not celebrate cheap leads if they do not convert into real business opportunities.',
  },
  {
    title: 'Full-Funnel Strategy',
    description: 'We connect ads, landing pages, WhatsApp, forms, retargeting, and reporting into one growth path.',
  },
  {
    title: 'Clear Reporting',
    description: 'You see what worked, what failed, what needs to change, and where your money went.',
  },
];

export const SOCIAL_MEDIA_ADS_FAQS = [
  {
    question: 'Are Facebook and Instagram ads still effective?',
    answer: 'Yes, but only when the audience, creative, offer, funnel, and tracking are properly aligned. Random boosting or generic campaigns usually waste money.',
  },
  {
    question: 'Do you create ad creatives too?',
    answer: 'Yes, we help with creative strategy, ad copy, angles, and performance-focused creative direction. Actual design or video production can be handled based on the agreed scope.',
  },
  {
    question: 'Can you improve my existing campaigns?',
    answer: 'Yes. We first audit your current campaigns, audience setup, creatives, tracking, and results before recommending changes.',
  },
  {
    question: 'What is a good ROAS for Meta ads?',
    answer: 'It depends on your margins, product price, sales cycle, and business model. We focus on profitable growth, not just a vanity ROAS number.',
  },
  {
    question: 'Do you run lead generation campaigns or sales campaigns?',
    answer: 'Both. We create campaigns based on your business goal — leads, enquiries, WhatsApp conversations, purchases, bookings, or registrations.',
  },
];

export const FAQs = [
  {
    question: 'How long does it take to see results?',
    answer:
      'Most clients start seeing measurable results within 2-4 weeks. Significant improvements typically appear within 6-8 weeks as we optimize campaigns.',
  },
  {
    question: 'What if we&apos;re not happy with the results?',
    answer:
      'We offer a 30-day guarantee. If you&apos;re not satisfied, we&apos;ll work with you to adjust strategy or provide a full refund.',
  },
  {
    question: 'Do you work with small businesses?',
    answer:
      'Yes! We work with businesses of all sizes, from startups to enterprises. We have solutions tailored to fit different budgets.',
  },
  {
    question: 'What information do you need from us?',
    answer:
      'We&apos;ll need access to your analytics, ad accounts, website, and information about your sales process. We keep everything secure and confidential.',
  },
  {
    question: 'Can you work with our existing team?',
    answer:
      'Absolutely. We often work alongside internal marketing teams to enhance their efforts without replacing them.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We track metrics that matter to your business: leads, conversions, revenue, CAC, and LTV. We provide transparent monthly reporting.',
  },
];

export const LEAD_GEN_SERVICES = [
  {
    title: 'Ideal Customer Profile Mapping',
    description: 'Define exactly who should be targeted and who should be filtered out.',
  },
  {
    title: 'Landing Page Strategy',
    description: 'Create focused pages that convert visitors into enquiries or booked calls.',
  },
  {
    title: 'Lead Form Optimization',
    description: 'Design forms that collect enough information without killing conversion rates.',
  },
  {
    title: 'WhatsApp Lead Flow',
    description: 'Move prospects from ad click to WhatsApp conversation with clear follow-up steps.',
  },
  {
    title: 'Paid Ads for Lead Generation',
    description: 'Run Google Ads and Meta Ads campaigns focused on qualified lead capture.',
  },
  {
    title: 'Retargeting Campaigns',
    description: 'Bring back visitors, form openers, video viewers, and warm audiences.',
  },
  {
    title: 'Lead Scoring',
    description: 'Score leads based on intent, fit, budget, requirement, and readiness.',
  },
  {
    title: 'Reporting & Lead Quality Review',
    description: 'Track lead volume, lead quality, cost per lead, source, and sales conversion feedback.',
  },
];

export const LEAD_GEN_INDUSTRIES = [
  {
    title: 'Real Estate',
    description: 'Generate buyer enquiries for residential, commercial, and redevelopment projects with better targeting and qualification.',
  },
  {
    title: 'Service Providers',
    description: 'Build a pipeline of prospects looking for professional services, consultations, or vendor support.',
  },
  {
    title: 'SaaS & Tech',
    description: 'Drive demos, free trials, product enquiries, or sales conversations with intent-led campaigns.',
  },
  {
    title: 'Education & Courses',
    description: 'Generate course enquiries, webinar registrations, admissions leads, and student signups.',
  },
];

export const LEAD_GEN_FAQS = [
  {
    question: 'What qualifies as a qualified lead?',
    answer: 'A qualified lead is a prospect who matches the agreed customer profile and has shared enough information to indicate genuine interest, need, location, budget, or intent.',
  },
  {
    question: 'How many leads can you deliver?',
    answer: 'Lead volume depends on industry, offer, location, budget, competition, and qualification criteria. We focus on leads that have business value, not just high numbers.',
  },
  {
    question: 'What is the typical lead cost?',
    answer: 'Lead cost varies by industry and platform. We calculate expected cost after reviewing your target audience, offer, funnel, and competition.',
  },
  {
    question: 'Do you provide appointment setting?',
    answer: 'We can support appointment-focused funnels through lead forms, WhatsApp flows, calendar booking pages, and follow-up structures based on the agreed scope.',
  },
  {
    question: 'Can you improve our current lead quality?',
    answer: 'Yes. We audit your campaigns, lead forms, landing pages, qualification questions, targeting, and sales feedback before recommending changes.',
  },
];

export const LEAD_GEN_ATTRIBUTES = [
  'Name',
  'Phone number',
  'Email',
  'Company name',
  'Location',
  'Requirement',
  'Budget range',
  'Service interest',
  'Timeline or urgency',
  'Pain point',
  'Source campaign',
  'Lead status',
  'Follow-up status',
];

export const LEAD_GEN_TRUST_CARDS = [
  {
    title: 'Clear ICP Before Campaigns',
    description: 'We do not launch campaigns without defining who should become a lead.',
  },
  {
    title: 'Qualification Questions',
    description: 'We add relevant filters to understand intent, budget, need, and fit.',
  },
  {
    title: 'Source-Level Reporting',
    description: 'You see which channel, campaign, or ad is generating better quality.',
  },
  {
    title: 'Sales Feedback Loop',
    description: 'We use your sales team&apos;s feedback to improve targeting, copy, forms, and follow-up.',
  },
];

export const LEAD_GEN_PRICING_TIERS = [
  {
    name: 'Pay-Per-Lead',
    description: 'Best for businesses with clearly defined qualified lead criteria.',
    features: ['Lead criteria setup', 'Lead delivery process', 'Quality review'],
  },
  {
    name: 'Hybrid Model',
    description: 'Best for businesses that need campaign management plus lead delivery.',
    features: ['Monthly management fee', 'Campaign setup', 'Optimization', 'Cost-per-lead tracking'],
    highlighted: true,
  },
  {
    name: 'Performance-Based',
    description: 'Best for businesses with strong sales tracking and clear revenue attribution.',
    features: ['Monthly base fee', 'Performance-linked bonus', 'Sales feedback loop'],
  },
];

export const SEO_PROBLEMS = [
  {
    title: 'Wrong Keywords',
    description: 'Your website may be ranking for terms that bring traffic, but not serious buyers or leads.',
  },
  {
    title: 'Generic Content',
    description: 'Publishing blogs without search intent, internal linking, and topic authority rarely moves business results.',
  },
  {
    title: 'Technical SEO Issues',
    description: 'Slow pages, crawl errors, poor structure, missing schema, and weak indexing can quietly block growth.',
  },
  {
    title: 'No Lead Conversion Path',
    description: 'Even when traffic increases, visitors may leave because the page has weak CTAs, unclear messaging, or poor UX.',
  },
];

export const SEO_AUDIT_CHECKS = [
  {
    title: 'Competitor Keyword Opportunities',
    description: 'We identify keywords your competitors rank for and where your business can realistically compete.',
  },
  {
    title: 'Technical SEO Health',
    description: 'We check speed, indexing, crawl errors, broken links, redirects, schema, sitemap, robots.txt, and mobile performance.',
  },
  {
    title: 'Content Gap Analysis',
    description: 'We identify missing pages, weak service content, poor blog coverage, and search intent gaps.',
  },
  {
    title: 'Backlink Profile Review',
    description: 'We review your current authority, toxic links, citation gaps, and link-building opportunities.',
  },
  {
    title: 'Conversion Path Review',
    description: 'We check whether your organic landing pages can convert visitors into calls, enquiries, or leads.',
  },
];

export const SEO_SERVICES = [
  {
    title: 'Technical SEO',
    description: 'Fix website structure, speed, indexing, crawlability, metadata, schema, and performance issues.',
  },
  {
    title: 'Keyword Strategy',
    description: 'Target keywords based on intent, difficulty, business value, and ranking opportunity.',
  },
  {
    title: 'On-Page SEO',
    description: 'Optimize titles, headings, content structure, internal links, image alt text, and page relevance.',
  },
  {
    title: 'Content Optimization',
    description: 'Improve existing pages and blogs so they match search intent and convert better.',
  },
  {
    title: 'SEO Content Planning',
    description: 'Create blog and landing page plans around high-intent keywords and topic clusters.',
  },
  {
    title: 'Local SEO',
    description: 'Improve visibility for Pune, Mumbai, and India-based searches using location pages, citations, and Google Business Profile.',
  },
  {
    title: 'Link Building',
    description: 'Build relevant authority through citations, partnerships, guest posts, and trustworthy backlink opportunities.',
  },
  {
    title: 'SEO Reporting',
    description: 'Track rankings, organic traffic, impressions, clicks, conversions, and lead quality from search.',
  },
];

export const SEO_INDUSTRIES = [
  {
    title: 'Real Estate SEO',
    description: 'Rank for property, location, project, and buyer-intent searches while improving enquiry conversion.',
  },
  {
    title: 'E-commerce SEO',
    description: 'Improve product, category, and collection page visibility to drive organic product discovery and sales.',
  },
  {
    title: 'B2B SEO',
    description: 'Target decision-makers searching for vendors, service providers, consultants, and industry solutions.',
  },
  {
    title: 'Education & Course SEO',
    description: 'Rank for course-related searches and turn organic visitors into enquiries, registrations, or enrollments.',
  },
];

export const SEO_TIMELINE = [
  {
    period: 'Months 1-2',
    title: 'Audit, Strategy & Implementation',
    description: 'We audit your site, fix technical issues, map keywords, optimize key pages, and create the content roadmap.',
  },
  {
    period: 'Months 3-6',
    title: 'Ranking Improvements Begin',
    description: 'You should start seeing movement in impressions, rankings, indexed pages, and early organic traffic growth.',
  },
  {
    period: 'Months 6-12',
    title: 'Scale Organic Visibility',
    description: 'We expand content clusters, improve authority, build backlinks, optimize pages, and scale rankings across more keywords.',
  },
];

export const SEO_FAQS = [
  {
    question: 'How long does SEO take to show results?',
    answer: 'SEO usually takes 90+ days to show meaningful ranking signals. Stronger results often come between months 3-6 and continue compounding over time.',
  },
  {
    question: 'Do you guarantee #1 rankings?',
    answer: 'No. Any agency guaranteeing #1 rankings is overselling. We focus on the right keyword strategy, technical SEO, content quality, authority building, and measurable growth.',
  },
  {
    question: 'What keywords will you target?',
    answer: 'We target keywords based on business value, search intent, competition, ranking difficulty, and the likelihood of generating leads or sales.',
  },
  {
    question: 'Do you write SEO blogs?',
    answer: 'Yes. We can create SEO blog topics, outlines, and content based on keyword strategy and search intent.',
  },
  {
    question: 'Do you handle technical SEO?',
    answer: 'Yes. We audit and recommend fixes for indexing, site speed, page structure, schema, redirects, broken links, sitemap, robots.txt, and Core Web Vitals.',
  },
  {
    question: 'Can SEO generate leads?',
    answer: 'Yes, but only when the right pages rank for the right intent and have strong CTAs, clear messaging, and conversion-focused page structure.',
  },
];

export const SEO_PILLARS = [
  {
    title: 'Technical SEO',
    description: 'We fix site speed, crawlability, indexing, metadata, schema, internal linking, page structure, redirects, and Core Web Vitals issues.',
  },
  {
    title: 'Content Strategy',
    description: 'We map keywords to pages, build topic clusters, create search-intent-driven content, and improve existing pages for better rankings.',
  },
  {
    title: 'Authority Building',
    description: 'We improve trust signals through backlinks, local citations, Google Business Profile optimization, reviews, and industry relevance.',
  },
];

export const SEO_PRICING_TIERS = [
  {
    name: 'Starter SEO',
    description: 'Best for small businesses with limited pages and local growth goals.',
    features: ['SEO audit', 'Technical fixes', 'On-page optimization', 'Basic keyword mapping', 'Monthly reporting'],
  },
  {
    name: 'Growth SEO',
    description: 'Best for businesses targeting multiple services, locations, or content clusters.',
    features: ['Technical SEO', 'Keyword strategy', 'Content roadmap', 'Blog optimization', 'Internal linking', 'Monthly reporting'],
    highlighted: true,
  },
  {
    name: 'Authority SEO',
    description: 'Best for competitive industries and aggressive organic growth.',
    features: ['Full SEO strategy', 'Technical SEO', 'Content clusters', 'Link building plan', 'Local SEO', 'Advanced reporting'],
  },
];

export const CRO_PROBLEMS = [
  {
    title: 'Visitors Are Not Taking Action',
    description: 'People land on your website but leave without filling the form, calling, buying, or booking a meeting.',
  },
  {
    title: 'Forms Create Friction',
    description: 'Too many fields, unclear labels, weak placement, or poor mobile experience can reduce enquiries.',
  },
  {
    title: 'Weak Page Messaging',
    description: 'Your landing page may not clearly explain the offer, value, proof, urgency, or next step.',
  },
  {
    title: 'No Funnel Visibility',
    description: 'You may not know where users are dropping off because tracking, events, and analytics are incomplete.',
  },
];

export const CRO_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Funnel & Data Audit',
    description: 'We review traffic sources, landing pages, user journeys, analytics, conversion events, forms, and drop-off points.',
  },
  {
    step: '02',
    title: 'Friction & Hypothesis Mapping',
    description: 'We identify what may be stopping users from converting — unclear copy, weak CTA, poor layout, missing trust, slow page, or bad form flow.',
  },
  {
    step: '03',
    title: 'Testing & Optimization Plan',
    description: 'We create a practical CRO plan with page changes, CTA improvements, form edits, copy changes, trust blocks, and test priorities.',
  },
  {
    step: '04',
    title: 'Implementation & Measurement',
    description: 'We help implement improvements and track changes in conversion rate, lead quality, cost per lead, and revenue impact.',
  },
];

export const CRO_SERVICES = [
  {
    title: 'Landing Page Optimization',
    description: 'Improve page structure, messaging, trust sections, CTA placement, and lead flow.',
  },
  {
    title: 'Form Optimization',
    description: 'Reduce friction, improve field structure, and increase form completion rates.',
  },
  {
    title: 'CTA Optimization',
    description: 'Improve CTA copy, placement, visibility, and intent alignment across pages.',
  },
  {
    title: 'Landing Page Copy Review',
    description: 'Make the page clearer, sharper, more persuasive, and aligned with buyer intent.',
  },
  {
    title: 'Funnel Analysis',
    description: 'Identify where visitors drop off between ad click, page visit, form start, and conversion.',
  },
  {
    title: 'Mobile Experience Review',
    description: 'Improve mobile layout, readability, speed, spacing, and form usability.',
  },
  {
    title: 'Trust Signal Improvement',
    description: 'Add testimonials, case studies, numbers, reviews, badges, guarantees, and proof where needed.',
  },
  {
    title: 'Tracking & Event Review',
    description: 'Check whether form submissions, calls, WhatsApp clicks, purchases, and booked calls are being tracked properly.',
  },
];

export const CRO_OPTIMIZATION_AREAS = [
  {
    title: 'Landing Page Hero',
    items: [
      'Is the offer clear?',
      'Is the CTA visible?',
      'Is the proof strong?',
    ],
  },
  {
    title: 'Forms',
    items: [
      'Are there too many fields?',
      'Is the form mobile-friendly?',
      'Is the next step clear?',
    ],
  },
  {
    title: 'Copy',
    items: [
      'Is the message simple?',
      'Is the pain point clear?',
      'Is the outcome specific?',
    ],
  },
  {
    title: 'Trust',
    items: [
      'Are testimonials visible?',
      'Are case studies used?',
      'Are numbers credible?',
    ],
  },
  {
    title: 'Speed & UX',
    items: [
      'Does the page load fast?',
      'Is the layout clean?',
      'Is navigation distracting?',
    ],
  },
  {
    title: 'Tracking',
    items: [
      'Are conversions tracked?',
      'Are CTA clicks tracked?',
      'Are lead sources visible?',
    ],
  },
];

export const CRO_TOOLS = [
  {
    title: 'Google Analytics 4',
    description: 'Understand traffic sources, conversion paths, user behavior, and page performance.',
  },
  {
    title: 'Google Tag Manager',
    description: 'Track key events like form submissions, CTA clicks, WhatsApp clicks, and booked calls.',
  },
  {
    title: 'Heatmaps',
    description: 'See where users click, scroll, stop, and ignore important sections.',
  },
  {
    title: 'Session Recordings',
    description: 'Review real user journeys to identify friction, confusion, or drop-offs.',
  },
  {
    title: 'A/B Testing',
    description: 'Test different headlines, CTAs, layouts, forms, and offers when traffic volume supports it.',
  },
  {
    title: 'Landing Page Audits',
    description: 'Review page structure, copy, UX, trust, speed, and conversion path manually.',
  },
];

export const CRO_DIFFERENTIATORS = [
  {
    title: 'Marketing + UX Thinking',
    description: 'We review pages from both business and user behavior perspectives.',
  },
  {
    title: 'Traffic Source Awareness',
    description: 'We understand whether users are coming from Google Ads, Meta Ads, SEO, email, or referral traffic.',
  },
  {
    title: 'Tracking Before Judgment',
    description: 'We make sure key conversion events are tracked before making decisions.',
  },
  {
    title: 'Business Outcome Focus',
    description: 'We optimize for leads, sales, booked calls, revenue, and lower acquisition cost.',
  },
];

export const CRO_PRICING_TIERS = [
  {
    name: 'Landing Page Audit',
    description: 'Best for businesses that want to improve one important page.',
    features: ['Page review', 'Conversion recommendations', 'CTA and form review', 'Tracking checklist'],
  },
  {
    name: 'Growth CRO',
    description: 'Best for businesses running paid ads or SEO campaigns.',
    features: ['Funnel audit', 'Landing page recommendations', 'Form optimization', 'Tracking review', 'Monthly reporting'],
    highlighted: true,
  },
  {
    name: 'Advanced CRO',
    description: 'Best for high-traffic websites, e-commerce, SaaS, or multi-step funnels.',
    features: ['Heatmaps', 'Session recordings', 'A/B testing plan', 'Funnel tracking', 'Conversion experiments'],
  },
];

export const CRO_FAQS = [
  {
    question: 'What is conversion rate optimization?',
    answer:
      'Conversion rate optimization is the process of improving a website, landing page, form, or funnel so more visitors take the desired action, such as filling a form, calling, buying, or booking a meeting.',
  },
  {
    question: 'Do I need CRO if I already run ads?',
    answer:
      'Yes. If your landing page does not convert well, your ad spend becomes more expensive. CRO helps you get better results from the same traffic.',
  },
  {
    question: 'How much traffic do I need for A/B testing?',
    answer:
      'A/B testing needs enough traffic and conversions to produce useful data. If traffic is low, we start with audit-based improvements and track performance changes.',
  },
  {
    question: 'Can CRO reduce my cost per lead?',
    answer:
      'Yes. If more visitors convert from the same ad spend, your cost per lead or cost per sale can reduce.',
  },
  {
    question: 'Do you redesign landing pages?',
    answer:
      'We provide conversion-focused recommendations and page structure improvements. Design and development implementation can be included depending on the agreed scope.',
  },
  {
    question: 'What pages should be optimized first?',
    answer:
      'Start with pages that receive paid traffic, important service pages, product pages, pricing pages, checkout pages, and contact forms.',
  },
];

export const RESULTS_STATS = [
  {
    metric: '50+',
    label: 'Clients Delivered Results',
    description: 'Across B2B, B2C, SaaS, and e-commerce',
  },
  {
    metric: '₹10Cr+',
    label: 'Client Revenue Generated',
    description: 'Through optimized marketing and conversion',
  },
  {
    metric: '300%+',
    label: 'Average ROI',
    description: 'From performance marketing campaigns',
  },
  {
    metric: '45%',
    label: 'Average Conversion Lift',
    description: 'Through CRO and funnel optimization',
  },
];

export const WHAT_WE_MEASURE = [
  {
    metric: 'ROAS',
    description: 'Return on ad spend',
    focus: 'Google Ads, Meta Ads, performance channels',
  },
  {
    metric: 'Cost Per Lead',
    description: 'Acquisition cost per qualified lead',
    focus: 'Lead generation, B2B sales funnels',
  },
  {
    metric: 'Conversion Rate',
    description: 'Percentage of visitors taking desired action',
    focus: 'Landing pages, forms, checkouts',
  },
  {
    metric: 'Search Visibility',
    description: 'Organic traffic and ranking growth',
    focus: 'SEO, high-intent keywords',
  },
  {
    metric: 'Lead Quality',
    description: 'Qualified leads vs total leads',
    focus: 'Lead scoring, sales team feedback',
  },
  {
    metric: 'Revenue Per Visitor',
    description: 'Total revenue divided by traffic',
    focus: 'E-commerce, lifetime value',
  },
];

export const PROOF_PRINCIPLES = [
  {
    title: 'No Fake Results',
    description: 'All case studies are real clients with real results. We clearly mark any placeholder or example scenarios.',
  },
  {
    title: 'Transparent Process',
    description: 'You see how we got the results: audit, strategy, execution, optimization, measurement.',
  },
  {
    title: 'Context Matters',
    description: 'We explain industry, starting point, challenges, and market to show what improved and why.',
  },
  {
    title: 'Ongoing Optimization',
    description: 'Results came from continuous testing, not one-time fixes. We show the journey, not just the destination.',
  },
];
