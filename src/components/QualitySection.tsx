"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import QualitySectionMobile from "./QualitySectionMobile"
import QualitySectionDesktop from "./QualitySectionDesktop"

gsap.registerPlugin(ScrollTrigger)

export type QualityState = {
  left: { title: string; paragraphs: string[] }
  right: { title: string; paragraphs: string[] }
  topImage: { src: string; alt: string; w: number; h: number; rotation?: number }
  bottomImage: { src: string; alt: string; w: number; h: number; rotation?: number }
}

const states: QualityState[] = [
  {
    left: {
      title: "Un Fruit d'Exception",
      paragraphs: [
        "Symbole d'hospitalité et véritable concentré d'énergie, la datte est reconnue depuis des millénaires pour sa richesse en fibres et en antioxydants.",
        "Nous sélectionnons rigoureusement des dattes deglet nour charnues et naturellement sucrées. Elles offrent une base saine et fondante, parfaite pour accueillir nos créations sans culpabilité.",
      ],
    },
    right: {
      title: "Cœur Fondant et Naturel",
      paragraphs: [
        "Praliné noisette, beurre de cacahuète, crème de pistache... Nos fourrages sont généreux et réalisés à partir d'oléagineux de premier choix.",
        "L'objectif ? Laisser s'exprimer le goût vrai et puissant de chaque noix, pour un équilibre parfait en bouche.",
      ],
    },
    topImage: { src: "/images/datte-1.png", alt: "Datte deglet nour", w: 160, h: 224 },
    bottomImage: { src: "/images/pistachio.png", alt: "Pistache", w: 130, h: 130 },
  },
  {
    left: {
      title: "Enrobage Chocolat Premium",
      paragraphs: [
        "Pour une signature élégante, nous enveloppons nos dattes d'une fine couche de chocolat de qualité supérieure.",
        "Nous privilégions notamment le chocolat noir intense, apprécié pour sa richesse en cacao et ses bienfaits antioxydants, offrant un contraste croquant et raffiné qui sublime chaque bouchée.",
      ],
    },
    right: {
      title: "Un écrin pour toutes vos occasions",
      paragraphs: [
        "Que ce soit pour un instant de plaisir personnel avec votre café, une pause énergie saine pour les sportifs, ou un cadeau raffiné à offrir lors de repas festifs, nos dattes s'adaptent à toutes vos envies.",
        "Oh My Datte, c'est l'assurance d'offrir une confiserie originale, visuellement belle et qui surprendra vos convives.",
      ],
    },
    topImage: { src: "/images/chocolate.png", alt: "Chocolat noir", w: 160, h: 200, rotation: -20 },
    bottomImage: { src: "/images/datte-2-shadow.png", alt: "Datte fourrée au chocolat", w: 160, h: 240, rotation: 10 },
  },
]

export default function QualitySection() {
  // refs desktop seulement (passés au composant Desktop)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const brushRef = useRef<HTMLDivElement>(null)
  const postPinRef = useRef<HTMLDivElement>(null)

  const leftText1Ref = useRef<HTMLDivElement>(null)
  const rightText1Ref = useRef<HTMLDivElement>(null)
  const topImg1Ref = useRef<HTMLDivElement>(null)
  const bottomImg1Ref = useRef<HTMLDivElement>(null)

  const leftText2Ref = useRef<HTMLDivElement>(null)
  const rightText2Ref = useRef<HTMLDivElement>(null)
  const topImg2Ref = useRef<HTMLDivElement>(null)
  const bottomImg2Ref = useRef<HTMLDivElement>(null)

  const dot1Ref = useRef<HTMLDivElement>(null)
  const dot2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pinned = pinnedRef.current
    const brush = brushRef.current
    if (!pinned || !brush) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const h = brush.offsetHeight
      const entryY = h * 0.6
      const topRest = -h * 0.20
      const bottomRest = h * 0.20

      gsap.set(topImg2Ref.current, { y: topRest + 12, autoAlpha: 0, filter: "blur(6px)" })
      gsap.set(bottomImg2Ref.current, { y: bottomRest + 12, autoAlpha: 0, filter: "blur(6px)" })
      gsap.set(topImg1Ref.current, { y: entryY, autoAlpha: 0 })
      gsap.set(bottomImg1Ref.current, { y: entryY, autoAlpha: 0 })

      gsap.set([leftText1Ref.current, rightText1Ref.current], { autoAlpha: 1 })
      gsap.set([leftText2Ref.current, rightText2Ref.current], { autoAlpha: 0 })

      gsap.set(dot1Ref.current, { scale: 1.6, opacity: 1 })
      gsap.set(dot2Ref.current, { scale: 1, opacity: 0.3 })

      gsap.to(topImg1Ref.current, {
        y: topRest,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: pinned, start: "top 50%", end: "top top", scrub: 0.4 },
      })
      gsap.to(bottomImg1Ref.current, {
        y: bottomRest,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: pinned, start: "top 45%", end: "top top", scrub: 0.4 },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 0.5,
        },
      })

      tl.to({}, { duration: 0.6 })

      tl.to(topImg1Ref.current, { autoAlpha: 0, y: topRest - 12, filter: "blur(6px)", duration: 1, ease: "power1.out" })
      tl.to(bottomImg1Ref.current, { autoAlpha: 0, y: bottomRest - 12, filter: "blur(6px)", duration: 1, ease: "power1.out" }, "<")

      tl.to([leftText1Ref.current, rightText1Ref.current], { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, "<0.2")
      tl.to([leftText2Ref.current, rightText2Ref.current], { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, ">-0.1")

      tl.to(dot1Ref.current, { scale: 1, opacity: 0.3, duration: 0.4 }, "<")
      tl.to(dot2Ref.current, { scale: 1.6, opacity: 1, duration: 0.4 }, "<")

      tl.to(topImg2Ref.current, { y: topRest, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power1.out" }, "<0.1")
      tl.to(bottomImg2Ref.current, { y: bottomRest, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power1.out" }, "<0.15")

      tl.to({}, { duration: 0.6 })
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      <QualitySectionMobile states={states} />

      <QualitySectionDesktop
        states={states}
        refs={{
          pinnedRef,
          brushRef,
          postPinRef,
          leftText1Ref,
          rightText1Ref,
          topImg1Ref,
          bottomImg1Ref,
          leftText2Ref,
          rightText2Ref,
          topImg2Ref,
          bottomImg2Ref,
          dot1Ref,
          dot2Ref,
        }}
      />
    </>
  )
}