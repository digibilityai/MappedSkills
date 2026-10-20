/**
 * C1 — the consolidated `/contact` experience (DEC-071): the one contact form with two visitor intentions.
 *
 * Shared by the form (`components/forms/ContactForm.tsx`) and the server (`lib/enquiry-validation.ts`), so the
 * choices, limits, messages and the phone rule are defined once. Pure functions and constants only: no browser or
 * server API, so it is safe on both sides and testable on its own.
 *
 *   enquiry  "Send an enquiry": a question or a marketing requirement.
 *   call     "Request a call": MappedSkills contacts the visitor to arrange a conversation. It is a REQUEST, never a
 *            booking. There is no scheduling system and nothing may imply an appointment is confirmed (DEC-062).
 */

export type ContactIntent = 'enquiry' | 'call';

/** `/contact?intent=call` selects the call request; anything else (absent, unknown) is the enquiry. */
export function intentFromParam(value: string | null | undefined): ContactIntent {
  return value === 'call' ? 'call' : 'enquiry';
}

/**
 * "What do you need help with?" — stable internal values; the labels are display text only and may change without
 * touching stored data. The order is the approved one. Nothing is preselected.
 */
export const SERVICE_OPTIONS = [
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'paid_social', label: 'Paid Social / Meta Ads' },
  { value: 'seo', label: 'Search Engine Optimisation (SEO)' },
  { value: 'ai_search', label: 'AI Search Visibility' },
  { value: 'lead_generation', label: 'Lead Generation' },
  { value: 'cro', label: 'Conversion Rate Optimisation' },
  { value: 'strategy', label: 'Marketing Strategy / Not Sure' },
  { value: 'other', label: 'Something Else' },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value'];

export function serviceLabelOf(value: string): string | null {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? null;
}

/**
 * Field limits for the consolidated form. The message cap is 4000 (the original form allowed 5000) so that a
 * maximum-length message in a three-byte script, plus the request lines added for the CRM, stays inside the CRM's
 * 16 KB body and 5000-character message limits (`lib/crm-delivery.cjs`).
 */
export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  message: 4000,
  preferredContactTime: 120,
} as const;

/** Word-for-word on the client and the server, so a visitor never sees two explanations of the same problem. */
export const CONTACT_MESSAGES = {
  nameRequired: 'Enter your full name.',
  emailRequired: 'Enter your business email address.',
  emailFormat: 'Enter an email address in the form name@company.com.',
  phoneRequired: 'Enter a phone or WhatsApp number we can reach you on.',
  phoneFormat: 'Check the number. Include the country code, for example +44 for the UK.',
  serviceRequired: 'Select what you need help with.',
  tooLong: (max: number) => `Use ${max} characters or fewer.`,
} as const;

/** Syntactic only, as on the original form. A well-formed address is not proof that it receives mail. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Phone / WhatsApp normalisation to E.164 (`+` and 7–15 digits). India is the convenient default: a number written
 * without a country code is read as Indian when it has the Indian shape, and is otherwise refused with a request for
 * the country code rather than guessed.
 *
 * Accepted:
 *   +<country code><number>   7–15 digits, first digit not 0 (also written 00…)
 *   +91 numbers               must have a 10-digit national number; a stray trunk 0 (+91 0…) is dropped
 *   10 digits, no code        Indian mobile number (first digit 6–9)              → +91…
 *   0 + 10 digits             Indian number with the trunk prefix (landlines too) → +91…
 *   91 + 10 digits            Indian number missing only the "+"                  → +91…
 * Separators (spaces, hyphens, dots, brackets, slashes) are ignored. Letters, a "+" anywhere but the start, and a run
 * of one repeated digit are refused.
 *
 * DELIBERATELY NOT A NUMBERING-PLAN DATABASE. Per-country lengths and allocated ranges are not checked outside India,
 * so a well-formed but unallocated foreign number is accepted; rejecting a real buyer's valid number costs more than
 * storing a wrong one. A library with full metadata (libphonenumber) would tighten this at the cost of a new
 * dependency; recorded as an option in the C1 report, not adopted.
 */
export function normalisePhone(raw: string): string | null {
  const value = raw.trim();
  if (!value || !/^\+?[\d\s\-().\/]+$/.test(value)) return null;

  let digits = value.replace(/\D/g, '');
  let international = value.startsWith('+');
  if (!international && digits.startsWith('00')) {
    digits = digits.slice(2);
    international = true;
  }
  if (!digits || /^(\d)\1+$/.test(digits)) return null;

  if (international) {
    if (digits.startsWith('0')) return null;
    if (digits.startsWith('91')) {
      let national = digits.slice(2);
      if (national.length === 11 && national.startsWith('0')) national = national.slice(1);
      return indianNumber(national);
    }
    // One digit repeated after a one- to three-digit country code ("+44 0000000") is not a number.
    if ([1, 2, 3].some((cc) => /^(\d)\1{6,}$/.test(digits.slice(cc)))) return null;
    return digits.length >= 7 && digits.length <= 15 ? `+${digits}` : null;
  }

  if (/^[6-9]\d{9}$/.test(digits)) return indianNumber(digits);
  if (/^0[1-9]\d{9}$/.test(digits)) return indianNumber(digits.slice(1));
  if (/^91[6-9]\d{9}$/.test(digits)) return indianNumber(digits.slice(2));
  return null;
}

/** A 10-digit Indian national number (first digit 1–9, not one digit repeated) as E.164, else null. */
function indianNumber(national: string): string | null {
  return /^[1-9]\d{9}$/.test(national) && !/^(\d)\1+$/.test(national) ? `+91${national}` : null;
}
