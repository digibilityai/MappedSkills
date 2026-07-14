import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GoogleTagManager } from '@/lib/gtm'
import { MetaPixel } from '@/lib/meta-pixel'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat'
});
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'MappedSkills - Performance Marketing for SaaS',
  description: 'Accelerate your SaaS growth with data-driven performance marketing. Google Ads, social media, lead generation, and conversion optimization.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    <html lang="en" className={`dark scroll-smooth ${montserrat.variable} ${inter.variable}`}>
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
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <GoogleTagManager />
        <MetaPixel />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
