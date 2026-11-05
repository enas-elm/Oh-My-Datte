"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import Reveal from "@/components/animations/Reveal"
import type { QualityState } from "./QualitySection"

const EASE = [0.32, 0.72, 0, 1] as const

/**
 * Mobile et tablette : un seul trait pinceau portant deux ingrédients, et un
 * seul bloc de texte (01 à 04). On passe d'un bloc à l'autre en glissant ou
 * avec les points : le texte défile latéralement, puis les ingrédients
 * quand on change d'état (blocs 1-2 : fruit, blocs 3-4 : chocolat).
 */
export default function QualitySectionMobile({ states }: { states: QualityState[] }) {
  const blocks = states.flatMap((s) => [s.left, s.right])
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const startX = useRef<number | null>(null)
  const state = Math.floor(active / 2)

  const go = (i: number) => setActive(Math.max(0, Math.min(blocks.length - 1, i)))

  // Glisser horizontalement change de bloc ; le défilement vertical reste libre
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
  }

  const slide = (offset: number, delay = 0) => ({
    x: reduce ? 0 : Math.sign(offset) * 64,
    opacity: offset === 0 ? 1 : 0,
    transition: { duration: reduce ? 0.2 : 0.55, ease: EASE, delay: offset === 0 ? delay : 0 },
  })

  return (
    <Reveal className="mx-auto mt-14 max-w-xl md:mt-20 lg:hidden">
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label="Nos engagements qualité"
        className="touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1)
          if (e.key === "ArrowLeft") go(active - 1)
        }}
      >
        {/* Trait pinceau : la couleur suit l'état */}
        <div className="relative mx-auto flex h-[170px] w-full max-w-[400px] items-center justify-center overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="pinceau-tuile absolute inset-0"
            initial={false}
            animate={{ backgroundColor: states[state].brush }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            style={{ rotate: "-2deg" }}
          />
          {states.map((s, k) => (
            <motion.div
              key={s.left.title}
              aria-hidden={k !== state}
              className="absolute inset-0 flex items-center justify-center gap-8"
              initial={false}
              animate={slide(k - state, 0.2)}
            >
              {[s.topImage, s.bottomImage].map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={k === state ? img.alt : ""}
                  width={img.w}
                  height={img.h}
                  className="h-[118px] w-auto object-contain drop-shadow-datte"
                  style={{ rotate: `${img.rotation ?? 0}deg` }}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Textes empilés dans la même cellule : la hauteur ne saute pas */}
        <div className="mt-8 grid overflow-hidden" aria-live="polite">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              className="col-start-1 row-start-1 space-y-3"
              aria-hidden={i !== active}
              inert={i !== active}
              initial={false}
              animate={slide(i - active)}
            >
              <span className="block font-display text-[15px] font-semibold tracking-[0.25em] text-chocolat-doux lining-nums">
                {String(i + 1).padStart(2, "0")} / 04
              </span>
              <h3 className="text-[1.45rem] font-semibold uppercase leading-tight tracking-[0.04em]">{block.title}</h3>
              {block.paragraphs.map((p) => (
                <p key={p} className="leading-[1.75]">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Points : position et navigation */}
        <div className="mt-6 flex items-center justify-center">
          {blocks.map((b, i) => (
            <button
              key={b.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} sur ${blocks.length} : ${b.title}`}
              aria-current={i === active}
              className="group flex h-11 items-center justify-center px-[5px]"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-6 bg-chocolat" : "w-1.5 bg-chocolat/30 group-hover:bg-chocolat/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
