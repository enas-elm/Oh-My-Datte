import './globals.css';
import type { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';

import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
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
