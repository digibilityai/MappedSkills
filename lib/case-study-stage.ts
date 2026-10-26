/** Historical work labels must not change when the current service menu changes. */
const STAGES: Readonly<Record<string, 'Capture' | 'Convert'>> = {
  '/seo': 'Capture',
  '/google-ads': 'Capture',
  '/social-media-ads': 'Capture',
  '/ai-seo': 'Capture',
  '/conversion-optimization': 'Convert',
  '/lead-generation': 'Convert',
};

export function caseStudyStage(serviceRoute: string | undefined) {
  return serviceRoute ? STAGES[serviceRoute] ?? null : null;
}
