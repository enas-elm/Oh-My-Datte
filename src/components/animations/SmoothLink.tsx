"use client"

import React from "react"
import Link from "next/link"

type SmoothLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">

/**
 * Lien d'ancre qui défile en douceur (Lenis si actif) et s'arrête sous la
 * navbar. Les autres liens se comportent normalement.
 */
export default function SmoothLink({ href, children, className, onNavigate, ...rest }: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()
    if (!href.startsWith("#")) return

    const el = document.getElementById(href.slice(1))
    if (!el) return
    e.preventDefault()

    window.history.replaceState(null, "", href)

    const navbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navbar-hauteur")) || 94
    const offset = -(navbar + 16)

    if (window.lenis) {
      window.lenis.scrollTo(el, { offset, duration: 1.1 })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
    }

    // Le focus suit le lien, pour le clavier et les lecteurs d'écran
    el.setAttribute("tabindex", "-1")
    el.focus({ preventScroll: true })
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  )
}
