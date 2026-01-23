import "./globals.css";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";

import { Navbar } from "@/components/Navbar";
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-vanilla text-choco-500 font-times antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
