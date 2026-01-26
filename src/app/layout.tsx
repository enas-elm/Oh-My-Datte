import './globals.css';
import type { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';

import { Navbar } from '@/components/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-vanilla text-choco-500 font-times antialiased">
        <header className="w-full fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-20">
          <Navbar />
        </header>

        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
