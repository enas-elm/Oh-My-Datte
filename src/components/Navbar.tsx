"use client"

import Image from "next/image"
import { useState } from "react"
import SmoothLink from "@/components/animations/SmoothLink"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "#qualite", label: "Qualité" },
    { href: "#vos-dattes", label: "Vos dat(t)es" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <motion.nav
      initial={{ transform: "translateY(-105%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      transition={{
        duration: 0.4,
        transform: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="font-times text-xl bg-vanilla rounded-b-2xl shadow-navbar overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex items-center gap-24 px-4 sm:px-6 py-4">
        <SmoothLink
          href="/"
          className="shrink-0 focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
        >
          <Image
            src="/images/icon_ohmydatte.svg"
            alt="Logo de Oh My Datte"
            width={80}
            height={80}
          />
        </SmoothLink>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center lg:gap-14 xl:gap-16">
          {navLinks.map((link) => (
            <SmoothLink
              key={link.href}
              href={link.href}
              className="animated-underline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
            >
              {link.label}
            </SmoothLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <SmoothLink
          href="#contact"
          className="ml-auto hidden lg:inline-flex border border-choco-500 font-times bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
        >
          COMMANDER
        </SmoothLink>

        {/* Mobile toggle button */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto lg:hidden inline-flex items-center justify-center rounded-md p-2
                     focus:outline-none focus-visible:ring-1 focus-visible:ring-choco-500
                     focus-visible:ring-offset-2 focus-visible:ring-offset-vanilla"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile panel (expands navbar) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden overflow-hidden"
          >
            {/* ✅ padding/border INSIDE pour qu'ils soient animés aussi */}
            <div className="px-4 sm:px-6 pb-5">
              <div className="h-px w-full bg-choco-500/20 mb-4" />

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SmoothLink
                    key={link.href}
                    href={link.href}
                    onNavigate={() => setOpen(false)}
                    className="animated-underline w-fit focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
                  >
                    {link.label}
                  </SmoothLink>
                ))}

                <SmoothLink
                  href="#contact"
                  onNavigate={() => setOpen(false)}
                  className="mt-2 inline-flex w-fit border border-choco-500 bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl
                       hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out
                       focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500"
                >
                  COMMANDER
                </SmoothLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}