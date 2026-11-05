"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import SmoothLink from "@/components/animations/SmoothLink"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Menu, X } from "lucide-react"
import { buttonClasses } from "@/components/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#qualite", label: "Qualité" },
  { href: "#dattes", label: "Vos dat(t)es" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <motion.nav
      aria-label="Navigation principale"
      initial={reduce ? false : { transform: "translateY(-105%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      transition={{
        duration: 0.4,
        transform: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="overflow-hidden rounded-b-2xl bg-creme font-display text-xl font-medium shadow-navbar"
    >
      <div className="flex h-[76px] items-center gap-6 px-4 sm:px-6 lg:h-[var(--navbar-hauteur)] lg:gap-16">
        <SmoothLink href="#contenu" className="shrink-0" aria-label="Oh My Datte, retour en haut de page">
          <Image src="/images/icon_ohmydatte.svg" alt="" width={80} height={27} priority className="w-20" />
        </SmoothLink>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-12 lg:flex xl:gap-14">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SmoothLink href={link.href} className="lien-anime">
                {link.label}
              </SmoothLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          {/* Action principale : dans la barre sur desktop, dans le menu sur mobile */}
          <SmoothLink href="#contact" className={cn(buttonClasses("rouge"), "hidden lg:inline-flex")}>
            Commander
          </SmoothLink>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md lg:hidden"
          >
            {open ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="px-4 pb-6 sm:px-6">
              <div className="mb-2 h-px w-full bg-ligne" />
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SmoothLink
                      href={link.href}
                      onNavigate={() => setOpen(false)}
                      className="flex items-center justify-between py-3 text-2xl"
                    >
                      {link.label}
                      <span aria-hidden="true" className="h-[1.5px] w-6 bg-rouge" />
                    </SmoothLink>
                  </li>
                ))}
              </ul>
              <SmoothLink
                href="#contact"
                onNavigate={() => setOpen(false)}
                className={cn(buttonClasses("rouge"), "mt-5 w-full")}
              >
                Commander
              </SmoothLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
