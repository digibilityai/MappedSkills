import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GoogleTagManager } from '@/lib/gtm'
import { MetaPixel } from '@/lib/meta-pixel'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema'
import { siteMetadata } from '@/lib/metadata'
import './globals.css'

// THE RESOLVE — display + body. Self-hosted and preloaded by next/font, so
// there is no runtime request to Google Fonts. Both are variable fonts; weight
// is set in CSS rather than by shipping extra static cuts.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'MappedSkills - Performance Marketing for SaaS',
  description: 'Accelerate your SaaS growth with data-driven performance marketing. Google Ads, social media, lead generation, and conversion optimization.',
  generator: 'v0.app',
  icons: {
    icon: siteMetadata.faviconPath,
    apple: siteMetadata.faviconPath,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <head>
        {/* Global Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground`}>
        <a href="#main" className="skip-link">Skip to main content</a>
        <GoogleTagManager />
        <MetaPixel />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
