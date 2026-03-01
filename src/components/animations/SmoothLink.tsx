"use client"

import React from "react"
import Link from "next/link"

type SmoothLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}

export default function SmoothLink({ href, children, className, onNavigate }: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      onNavigate?.()
      return
    }

    e.preventDefault()

    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return

    // Update URL sans polluer l’historique
    window.history.replaceState(null, "", href)

    const lenis = (window as any).lenis

    // Calcule une cible FIXE (le menu reste ouvert pendant le scroll => layout stable)
    const offset = 0 // mets -80 si tu veux compenser une navbar sticky
    const targetTop = el.getBoundingClientRect().top + window.scrollY + offset

    // Lance le scroll (Lenis si dispo)
    if (lenis?.scrollTo) {
      lenis.scrollTo(targetTop, { duration: 1.0 })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // ✅ Fermer seulement quand on est arrivé ET que ça s'est stabilisé
    const tolerance = 8 // px autour de la cible
    const stableDelta = 0.5 // px de variation max entre frames
    const requiredStableFrames = 6 // nombre de frames stables avant de fermer

    let stableCount = 0
    let lastY = window.scrollY
    let closed = false
    const startedAt = performance.now()
    const hardTimeoutMs = 2200 // sécurité large (durée scroll + marge)

    const tick = () => {
      if (closed) return

      const y = window.scrollY
      const dist = Math.abs(y - targetTop)
      const delta = Math.abs(y - lastY)

      const near = dist <= tolerance
      const stable = delta <= stableDelta

      if (near && stable) stableCount += 1
      else stableCount = 0

      // Ferme uniquement si on est stable plusieurs frames d'affilée
      if (stableCount >= requiredStableFrames) {
        closed = true
        onNavigate?.()
        return
      }

      lastY = y

      // Sécurité (si jamais l’utilisateur interrompt, etc.)
      if (performance.now() - startedAt > hardTimeoutMs) {
        closed = true
        onNavigate?.()
        return
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}