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
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-choco-500 focus:rounded-sm">
        <Menu />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(var(--navbar-height)+12px)] left-4 sm:left-8 right-4 sm:right-8 bg-vanilla py-2 shadow-lg border border-choco-500 rounded-2xl overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 hover:bg-choco-100 hover:text-vanilla transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-choco-500 focus:rounded-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className=" w-fit block mt-2 mx-auto bg-choco-500 text-vanilla py-3 pb-2 px-4 shadow-button text-xl focus:outline-2 focus:outline-offset-2 focus:outline-choco-500 focus:rounded-sm">
            COMMANDER
          </Link>
        </div>
      )}
    </div>
  );
}
