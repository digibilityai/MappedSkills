/**
 * MappedSkills Design System
 * Central location for design tokens, colors, spacing, and styling utilities
 */

export const colors = {
  brand: {
    red: '#C41E3A',
    dark: '#2C2C2C',
    light: '#F5F5F5',
    white: '#FFFFFF',
    navy: '#1A2A3A',
    gray: '#666666',
    success: '#2D8C5F',
    alert: '#E67E22',
  },
  neutral: {
    background: '#0F0F0F',
    foreground: '#f5f5f5',
    card: '#1a1a1a',
    border: '#2a2a2a',
    muted: '#3a3a3a',
  },
} as const;

export const typography = {
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Geist Mono", monospace',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

export const spacing = {
  xs: '0.25rem',      // 4px
  sm: '0.5rem',       // 8px
  md: '1rem',         // 16px
  lg: '1.5rem',       // 24px
  xl: '2rem',         // 32px
  '2xl': '3rem',      // 48px
  '3xl': '4rem',      // 64px
  '4xl': '5rem',      // 80px
  '5xl': '6rem',      // 96px
  '6xl': '7.5rem',    // 120px
} as const;

export const borderRadius = {
  sm: '0.375rem',     // 6px
  md: '0.5rem',       // 8px
  lg: '0.75rem',      // 12px
  xl: '1rem',         // 16px
  '2xl': '1.5rem',    // 24px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'accent': '0 10px 25px -5px rgba(196, 30, 58, 0.15)',
} as const;

export const animations = {
  durations: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easings: {
    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
    'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1280px',
} as const;

/**
 * Reusable Tailwind class combinations
 */
export const classNames = {
  // Containers
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerWide: 'w-full max-w-[1400px] mx-auto px-4',
  
  // Sections
  sectionSmall: 'py-8 md:py-12',
  sectionBase: 'py-16',
  sectionLarge: 'py-16',
  
  // Flex utilities
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  flexColCenter: 'flex flex-col items-center justify-center',
  
  // Typography
  headingLarge: 'text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight',
  headingBase: 'text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight',
  headingSmall: 'text-2xl md:text-3xl lg:text-4xl font-heading font-semibold leading-tight',
  
  // Buttons
  ctaPrimary: 'inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold',
  ctaSecondary: 'inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold',
  
  // Cards
  cardBase: 'bg-card rounded-xl border border-border/50 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1',
  
  // Badges
  badge: 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/10 text-red-600',
  
  // Inputs
  inputBase: 'w-full px-4 py-2.5 md:py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200',
  
  // Overlays
  gradientOverlay: 'absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80',
} as const;

export type ColorKey = keyof typeof colors;
export type TypographyKey = keyof typeof typography;
export type SpacingKey = keyof typeof spacing;
