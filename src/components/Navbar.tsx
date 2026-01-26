import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import MobileMenu from './MobileMenu';

export function Navbar() {
  const navLinks = [
    { href: '#vos-dattes', label: 'Vos dat(t)es' },
    { href: '#coffrets', label: 'Les coffrets' },
    { href: '#qualite', label: 'Qualité' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="w-full max-w-7xl text-xl flex items-center border border-choco-500 bg-vanilla lg:gap-14 xl:gap-24 px-4 sm:px-6 py-4 rounded-b-2xl shadow-navbar">
      <Link href="/" className=" shrink-0">
        <Image
          src="/images/icon_omd.svg"
          alt="Logo de Oh My Datte"
          width={60}
          height={60}
        />
      </Link>

      <div className="hidden lg:flex items-center lg:gap-14 xl:gap-24">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="#contact" className="ml-auto hidden lg:flex">
        <Button>COMMANDER</Button>
      </Link>

      <MobileMenu links={navLinks} />
    </nav>
  );
}
