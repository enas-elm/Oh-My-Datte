import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";

export function Navbar() {

  const navLinks = [
    {href: "#vos-dattes", label:"Vos dat(t)es"},
    {href: "#coffrets", label:"Les coffrets"},
    {href: "#qualite", label:"Qualité"},
    {href: "#contact", label:"Contact"},
  ]

  return (
    <header className="w-full">
      <nav className="max-w-7xl w-full mx-8 sm:mx-20 text-xl flex items-center gap-24 fixed top-0 border z-50 border-choco-500 bg-vanilla px-6 py-4 rounded-b-2xl shadow-navbar">
        <Link href="/">
          <Image
            src="/images/icon_omd.svg"
            alt="Logo de Oh My Datte"
            width={60}
            height={60}
          />
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Link href="#contact" className='ml-auto'>
          <Button>COMMANDER</Button>
        </Link>
      </nav>
    </header>
  );
}