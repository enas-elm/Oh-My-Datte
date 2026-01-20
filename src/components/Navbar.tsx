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
      <nav className=" navbar mx-8 sm:mx-20 border z-50 border-choco-500 bg-vanilla sticky top-0 flex max-w-7xl items-center justify-between px-6 py-4 rounded-b-2xl">
        <Link href="/">
          <Image
            src="/images/icon_OMD.svg"
            alt="Oh My Datte logo"
            width={60}
            height={60}
            className="object-contain"
          />{" "}
        </Link>

        <div className="hidden md:flex gap-8 font-times items-center text-choco-500">
          <Link href="/produits">Qualité</Link>

          <Link href="/a-propos">Vos dattes</Link>

          <Link href="/contact">Contact</Link>

          <Button>COMMANDER</Button>
        </div>
      </nav>
    </header>
  );
}
