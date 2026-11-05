"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { QualityImage, QualityState } from "./QualitySection"

gsap.registerPlugin(ScrollTrigger)

// Front du repeint : un bord organique, comme la passe d'un pinceau chargé.
// Somme de deux ondulations lentes et d'un fin frémissement (valeurs fixes).
// --w va de -5 (rien) à 105 (tout) ; les décalages sont en % de la hauteur.
const WIPE_POINTS = 40
const WIPE_EDGE = Array.from({ length: WIPE_POINTS + 1 }, (_, i) => {
  const t = i / WIPE_POINTS
  const lent = Math.sin(t * Math.PI * 2.3 + 0.6) * 1.1 + Math.sin(t * Math.PI * 5.1 + 1.9) * 0.55
  const fin = Math.sin(t * Math.PI * 17 + 0.4) * 0.18 + Math.sin(t * Math.PI * 29 + 2.2) * 0.1
  return Math.round((2 + lent + fin) * 100) / 100
})
const WIPE = `polygon(${WIPE_EDGE.map((o, i) => `${(i * 100) / WIPE_POINTS}% calc(100% - var(--w) * 1% + ${o}%)`).join(", ")}, 100% 100%, 0% 100%)`

function TextBlock({ index, title, paragraphs }: { index: number; title: string; paragraphs: string[] }) {
  return (
    <div className="max-w-md space-y-4">
      <span className="block font-display text-[15px] font-semibold tracking-[0.25em] text-chocolat-doux lining-nums">
        {String(index).padStart(2, "0")} / 04
      </span>
      <h3 className="text-[1.6rem] font-semibold uppercase leading-tight tracking-[0.04em]">{title}</h3>
      {paragraphs.map((p) => (
        <p key={p} className="text-[1.05rem] leading-[1.75]">
          {p}
        </p>
      ))}
    </div>
  )
}

function Ingredient({ img }: { img: QualityImage }) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      className="h-[28vh] max-h-[240px] w-auto object-contain drop-shadow-datte"
      style={{ rotate: `${img.rotation ?? 0}deg` }}
    />
  )
}

/**
 * Desktop : la section s'épingle et le défilement fait passer d'un état à
 * l'autre. Une seule timeline pilote tout, en phases qui ne se chevauchent
 * pas : rien ne peut se superposer, même en défilant très vite.
 */
export default function QualitySectionDesktop({ states }: { states: QualityState[] }) {
  const pinnedRef = useRef<HTMLDivElement>(null)
  const entryRef = useRef<HTMLDivElement>(null)
  const group1Ref = useRef<HTMLDivElement>(null)
  const group2Ref = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const texts1Ref = useRef<HTMLDivElement[]>([])
  const texts2Ref = useRef<HTMLDivElement[]>([])
  const dotsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const pinned = pinnedRef.current
    if (!pinned) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const texts1 = texts1Ref.current
      const texts2 = texts2Ref.current
      const [dot1, dot2] = dotsRef.current

      gsap.set(texts2, { autoAlpha: 0, y: 48 })
      gsap.set(group2Ref.current, { autoAlpha: 0, yPercent: 30 })
      gsap.set(wipeRef.current, { "--w": -5 })

      // Entrée des ingrédients avant l'épinglage (élément distinct de la timeline)
      gsap.fromTo(
        entryRef.current,
        { autoAlpha: 0, yPercent: 25 },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: pinned, start: "top 75%", end: "top 15%", scrub: 0.6 },
        },
      )

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinned,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      tl.to({}, { duration: 0.5 })
        .addLabel("sortie")
        // 1. l'état 1 défile vers le haut et sort
        .to(texts1, { y: -48, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, "sortie")
        .to(group1Ref.current, { yPercent: -30, autoAlpha: 0, duration: 0.8 }, "sortie")
        // 2. le trait se repeint de bas en haut
        .to(wipeRef.current, { "--w": 105, duration: 0.9 }, "sortie+=0.35")
        .to(dot1, { scale: 1, opacity: 0.35, duration: 0.3 }, "sortie+=0.5")
        .to(dot2, { scale: 1.5, opacity: 1, duration: 0.3 }, "sortie+=0.5")
        // 3. l'état 2 arrive par le bas, une fois l'état 1 sorti
        .to(group2Ref.current, { yPercent: 0, autoAlpha: 1, duration: 0.8 }, "sortie+=0.95")
        .to(texts2, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }, "sortie+=1")
        .to({}, { duration: 0.5 })
    })

    return () => mm.revert()
  }, [])

  const setText = (store: React.RefObject<HTMLDivElement[]>, i: number) => (el: HTMLDivElement | null) => {
    if (el) store.current[i] = el
  }

  return (
    <div className="hidden lg:block">
      <div ref={pinnedRef} className="relative h-screen">
        {/* progression */}
        <div aria-hidden="true" className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
          {[0, 1].map((i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) dotsRef.current[i] = el
              }}
              className="block size-2 rounded-full bg-chocolat"
              style={i === 0 ? { transform: "scale(1.5)" } : { opacity: 0.35 }}
            />
          ))}
        </div>

        <div className="flex h-full items-center pt-20">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-10 pr-12 xl:gap-16">
            {/* Gauche */}
            <div className="relative flex min-h-[48vh] items-center justify-end">
              <div ref={setText(texts1Ref, 0)} className="absolute inset-0 flex items-center justify-end">
                <TextBlock index={1} {...states[0].left} />
              </div>
              <div ref={setText(texts2Ref, 0)} className="invisible absolute inset-0 flex items-center justify-end">
                <TextBlock index={3} {...states[1].left} />
              </div>
            </div>

            {/* Centre : trait pinceau et ingrédients */}
            <div className="relative flex h-[72vh] w-[220px] items-center justify-center xl:w-[250px]">
              <div aria-hidden="true" className="pinceau-vertical absolute inset-0" style={{ backgroundColor: states[0].brush }} />
              <div
                ref={wipeRef}
                aria-hidden="true"
                className="pinceau-vertical absolute inset-0"
                style={{ backgroundColor: states[1].brush, clipPath: WIPE, ["--w" as string]: -5 }}
              />

              <div ref={entryRef} className="absolute inset-0">
                <div ref={group1Ref} className="absolute inset-0 flex flex-col items-center justify-evenly">
                  <Ingredient img={states[0].topImage} />
                  <Ingredient img={states[0].bottomImage} />
                </div>
              </div>
              <div ref={group2Ref} className="invisible absolute inset-0 flex flex-col items-center justify-evenly">
                <Ingredient img={states[1].topImage} />
                <Ingredient img={states[1].bottomImage} />
              </div>
            </div>

            {/* Droite */}
            <div className="relative flex min-h-[48vh] items-center">
              <div ref={setText(texts1Ref, 1)} className="absolute inset-0 flex items-center">
                <TextBlock index={2} {...states[0].right} />
              </div>
              <div ref={setText(texts2Ref, 1)} className="invisible absolute inset-0 flex items-center">
                <TextBlock index={4} {...states[1].right} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
