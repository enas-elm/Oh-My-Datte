'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function MobileMenu({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center ml-auto lg:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer">
        <Menu />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(var(--navbar-height)+12px)] left-4 sm:left-8 right-4 sm:right-8 bg-vanilla py-2 shadow-lg border border-choco-500 rounded-2xl overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-choco-100 hover:text-vanilla transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
