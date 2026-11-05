import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Allura, Archivo, Cormorant_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';

import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

const description =
  "Oh My Datte, c'est l'atelier artisanal qui transforme la datte en une véritable création pâtissière. L'assurance d'offrir une confiserie originale qui surprendra vos convives. Dattes deglet nour, pistache, chocolat, chocolat blanc.";

export const metadata: Metadata = {
  title: {
    default: 'Oh My Datte - Confiserie de dattes artisanales',
    template: '%s | Oh My Datte',
  },
  description,
  metadataBase: new URL('https://www.ohmydatte.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Oh My Datte - Confiserie de dattes artisanales',
    description,
    url: 'https://www.ohmydatte.com',
    siteName: 'Oh My Datte',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/product/img_0169.webp',
        width: 1200,
        height: 630,
        alt: 'Coffret Oh My Datte - Confiserie de dattes artisanales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oh My Datte - Confiserie de dattes artisanales',
    description:
      "Oh My Datte, c'est l'atelier artisanal qui transforme la datte en une véritable création pâtissière.",
    images: ['/images/product/img_0169.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#fffcf6',
  colorScheme: 'only light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      style={{ colorScheme: 'light only' }}
      className={`${cormorant.variable} ${allura.variable} ${archivo.variable}`}
    >
      <body className="bg-creme font-sans text-chocolat antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-creme focus:px-4 focus:py-3 focus:shadow-navbar"
        >
          Aller au contenu
        </a>

        <header className="container fixed inset-x-0 top-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </header>

        <SmoothScrollProvider>
          <main id="contenu">{children}</main>
          <Footer />
        </SmoothScrollProvider>

        <Analytics />
      </body>
    </html>
  );
}
