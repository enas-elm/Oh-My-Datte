"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="max-w-7xl mx-auto">
      <nav className="mx-8 sm:mx-20 border z-50 border-choco-500 bg-vanilla sticky top-0 flex max-w-7xl items-center justify-between px-6 py-4 rounded-b-2xl">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/icon_OMD.svg"
            alt="Oh My Datte logo"
            width={60}
            height={60}
            className="object-contain"
          />{" "}
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-8 font-times items-center text-choco-500">
          <Link href="/produits">Qualité</Link>

          <Link href="/a-propos">Vos dattes</Link>

          <Link href="/contact">Contact</Link>

          <Button>COMMANDER</Button>
        </div>

        {/* MENU MOBILE */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MENU DÉROULANT MOBILE */}
      {/* {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-3 px-6 py-4 text-gray-700">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/produits" onClick={() => setOpen(false)}>
                Produits
              </Link>
            </li>
            <li>
              <Link href="/a-propos" onClick={() => setOpen(false)}>
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/commander"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-pink-500 px-5 py-2 text-center text-white hover:bg-pink-600 transition-colors"
              >
                Commander
              </Link>
            </li>
          </ul>
        </div>
      )} */}
    </header>
  );
}
