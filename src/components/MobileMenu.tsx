'use client';

import { useState } from 'react';
import SmoothLink from "@/components/animations/SmoothLink"
import { motion, AnimatePresence } from 'motion/react';

export default function MobileMenu({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center ml-auto lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500 relative z-50 w-10 h-10 items-center justify-center group"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-choco-500 rounded-full"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-choco-500 rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-choco-500 rounded-full"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-[calc(var(--navbar-height)-8px)] left-4 sm:left-8 right-4 sm:right-8 bg-vanilla pb-4 shadow-lg rounded-b-2xl overflow-hidden"
          >
            {links.map((link) => (
              <SmoothLink
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 hover:bg-choco-100 hover:text-vanilla transition-colors focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
              >
                {link.label}
              </SmoothLink>
            ))}
            <SmoothLink href="#contact" onClick={() => setIsOpen(false)} className="font-times w-fit block mx-auto border border-choco-500 bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500">
              COMMANDER
            </SmoothLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
