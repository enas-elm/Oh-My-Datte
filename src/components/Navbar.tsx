"use client"

import Image from 'next/image';
import MobileMenu from './MobileMenu';
import SmoothLink from "@/components/animations/SmoothLink"
import {motion} from "motion/react"

export function Navbar() {
  const navLinks = [
    { href: '#qualite', label: 'Qualité' },
    { href: '#vos-dattes', label: 'Vos dat(t)es' },
    { href: '#contact', label: 'Contact' },
  ];

  return (  
    <motion.nav 
      initial={{transform: "translateY(-105%)", opacity: 0}} 
      animate={{transform: "translateY(0%)", opacity: 1}} 
      transition={{
        duration: 0.4,
        transform: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="font-times text-xl flex items-center bg-vanilla gap-24 px-4 sm:px-6 py-4 rounded-b-2xl shadow-navbar"
    >
      <SmoothLink href="/" className="shrink-0 focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500">
        <Image
          src="/images/icon_ohmydatte.svg"
          alt="Logo de Oh My Datte"
          width={80}
          height={80}
        />
      </SmoothLink>

      <div className="hidden lg:flex items-center lg:gap-14 xl:gap-16">
        {navLinks.map((link) => (
          <SmoothLink key={link.href} href={link.href} className="focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500 animated-underline">
            {link.label}
          </SmoothLink>
        ))}
      </div>

      <SmoothLink href="#contact" className="ml-auto hidden lg:inline-flex border border-choco-500 font-times bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500">
        COMMANDER
      </SmoothLink>

      <MobileMenu links={navLinks} />
    </motion.nav>
  );
}
