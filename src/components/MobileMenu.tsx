'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from './Button';

export default function MobileMenu({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center ml-auto lg:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer focus:outline-1 focus:outline-offset-3 focus:outline-choco-500">
        <Menu />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(var(--navbar-height)+12px)] left-4 sm:left-8 right-4 sm:right-8 bg-vanilla py-2 shadow-lg border border-choco-500 rounded-2xl overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 hover:bg-choco-100 hover:text-vanilla transition-colors focus:outline-1 focus:outline-offset-3 focus:outline-choco-500"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="font-times w-fit block mx-auto border border-choco-500 bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-choco-500">
            COMMANDER
          </Link>
        </div>
      )}
    </div>
  );
}
