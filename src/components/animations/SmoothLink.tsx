"use client"

import Link from "next/link"

type SmoothLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}

export default function SmoothLink({ href, children, className, onNavigate }: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ferme le menu (ou autre) quoi qu'il arrive
    const done = () => onNavigate?.()

    // Anchor scroll (#...)
    if (href.startsWith("#")) {
      e.preventDefault()

      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) {
        done()
        return
      }

      // Met à jour l'URL sans recharger (optionnel mais mieux)
      window.history.pushState(null, "", href)

      const lenis = (window as any).lenis
      if (lenis?.scrollTo) {
        // Important: scrollTo accepte un element
        lenis.scrollTo(el, { offset: 0, duration: 1.0 })
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }

      done()
      return
    }

    // Lien normal (route)
    done()
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}