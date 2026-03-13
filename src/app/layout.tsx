import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';

import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF9F0',
};

export const metadata: Metadata = {
  title: {
    default: 'Oh My Datte - Confiserie de dattes artisanales',
    template: '%s | Oh My Datte',
  },
  description:
    "Oh My Datte, c'est l'atelier artisanal qui transforme la datte en une véritable création pâtissière. L'assurance d'offrir une confiserie originale qui surprendra vos convives. Dattes deglet nour, pistache, chocolat, chocolat blanc.",
  metadataBase: new URL('https://www.ohmydatte.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Oh My Datte - Confiserie de dattes artisanales',
    description:
      "Oh My Datte, c'est l'atelier artisanal qui transforme la datte en une véritable création pâtissière. L'assurance d'offrir une confiserie originale qui surprendra vos convives. Dattes deglet nour, pistache, chocolat, chocolat blanc.",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" style={{ colorScheme: 'light only' }}>
      <body className="bg-vanilla text-choco-500 antialiased">
        <header className="container fixed top-0 left-0 right-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </header>

        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        
        <Footer/>
      </body>
    </html>
  );
}
