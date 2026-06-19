import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cmstudio.digital'),
  title: {
    default: 'CM Studio | Web & Software Solutions for Growing Businesses',
    template: '%s | CM Studio',
  },
  description:
    'CM Studio builds modern landing pages, business websites, e-commerce platforms, web applications, and automation solutions for companies ready to grow online.',
  keywords: [
    'web development',
    'landing pages',
    'business websites',
    'e-commerce',
    'web applications',
    'automation',
    'El Salvador',
    'digital studio',
    'software solutions',
  ],
  authors: [{ name: 'CM Studio', url: 'https://cmstudio.digital' }],
  creator: 'CM Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_SV'],
    url: 'https://cmstudio.digital',
    siteName: 'CM Studio',
    title: 'CM Studio | Web & Software Solutions for Growing Businesses',
    description:
      'CM Studio builds modern landing pages, business websites, e-commerce platforms, web applications, and automation solutions for companies ready to grow online.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CM Studio - Web & Software Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CM Studio | Web & Software Solutions',
    description:
      'Modern landing pages, websites, e-commerce, and web applications for growing businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://cmstudio.digital',
    languages: {
      'en-US': 'https://cmstudio.digital',
      'es-SV': 'https://cmstudio.digital/es',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className={`${inter.className} bg-bg-primary text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
