"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  { src: "/images/product/img_0159.webp", alt: "Coffrets Oh My Datte fermés, alignés autour d'un coffret ouvert" },
  { src: "/images/product/img_0102.webp", alt: "Plateau doré de dattes enrobées de chocolat blanc à la pistache et de chocolat noir aux amandes" },
  { src: "/images/product/img_0169.webp", alt: "Coffret de trois dattes ouvert" },
  { src: "/images/product/img_0150.webp", alt: "Assiette de dattes enrobées de chocolat noir et de chocolat blanc" },
]

// Cible tactile de 44 px, pastille visible de 34 px très translucide
const arrowClass =
  "group/fleche absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center focus-visible:outline-creme"
const arrowDot =
  "flex size-[34px] items-center justify-center rounded-full bg-creme/20 text-creme backdrop-blur-[2px] transition-colors duration-300 group-hover/fleche:bg-creme/70 group-hover/fleche:text-chocolat"

/**
 * Les quatre photos sont montées une fois et se relaient en fondu d'opacité :
 * pas de chargement ni de recalcul de mise en page à chaque changement.
 * Flèches, points et glissement. Le défilement automatique tourne en boucle :
 * il se met en pause au survol (ou au focus clavier), repart ensuite, et
 * chaque action manuelle relance simplement le compte à rebours.
 */
export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const startX = useRef<number | null>(null)
  const n = photos.length

  // `current` en dépendance : chaque changement (auto ou manuel) relance le délai
  useEffect(() => {
    if (paused || reduce) return
    const timer = setTimeout(() => setCurrent((p) => (p + 1) % n), 5000)
    return () => clearTimeout(timer)
  }, [current, paused, reduce, n])

  const go = (i: number) => setCurrent((i + n) % n)

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Photos de nos coffrets"
      className="group/carrousel relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl bg-beige shadow-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // pause au focus clavier seulement : un clic sur une flèche ne doit pas figer le carrousel
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        startX.current = null
        if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1))
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(current + 1)
        if (e.key === "ArrowLeft") go(current - 1)
      }}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            draggable={false}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(50,20,20,0.5)] to-transparent" />

      <button type="button" onClick={() => go(current - 1)} aria-label="Photo précédente" className={`${arrowClass} left-1.5`}>
        <span className={arrowDot}>
          <ChevronLeft size={18} strokeWidth={1.75} />
        </span>
      </button>
      <button type="button" onClick={() => go(current + 1)} aria-label="Photo suivante" className={`${arrowClass} right-1.5`}>
        <span className={arrowDot}>
          <ChevronRight size={18} strokeWidth={1.75} />
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-1 flex justify-center">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Afficher la photo ${i + 1} sur ${n}`}
            aria-current={i === current}
            className="group flex h-8 items-center px-[3px] focus-visible:outline-creme"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-6 bg-creme" : "w-1.5 bg-creme/60 group-hover:bg-creme"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
