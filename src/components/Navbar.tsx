import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

export function Navbar() {
  const navLinks = [
    { href: '#vos-dattes', label: 'Vos dat(t)es' },
    { href: '#coffrets', label: 'Les coffrets' },
    { href: '#qualite', label: 'Qualité' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="font-times text-xl flex items-center bg-vanilla gap-24 px-4 sm:px-6 py-4 rounded-b-xl shadow-navbar">
      <Link href="/" className="shrink-0 focus:outline-1 focus:outline-offset-3 focus:outline-choco-500"
      >
        <Image
          src="/images/icon_omd.svg"
          alt="Logo de Oh My Datte"
          width={60}
          height={60}
        />
      </Link>

      <div className="hidden lg:flex items-center lg:gap-14 xl:gap-24">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="focus:outline-1 focus:outline-offset-3 focus:outline-choco-500 animated-underline">
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="#contact" className="ml-auto hidden lg:inline-flex border border-choco-500 font-times bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-choco-500">
        COMMANDER
      </Link>

      <MobileMenu links={navLinks} />
    </nav>
  );
}
