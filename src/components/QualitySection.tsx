'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: "Un Fruit d'Exception",
    paragraphs: [
      "Symbole d'hospitalité et véritable concentré d'énergie, la datte est reconnue depuis des millénaires pour sa richesse en fibres et en antioxydants.",
      "Nous sélectionnons rigoureusement des dattes deglet nour charnues et naturellement sucrées. Elles offrent une base saine et fondante, parfaite pour accueillir nos créations sans culpabilité.",
    ],
    image: '/images/datte-1.png',
    imageAlt: 'Datte deglet nour',
    imageSize: { w: 200, h: 280 },
    imageRotation: 0,
  },
  {
    title: 'Cœur Fondant et Naturel',
    paragraphs: [
      "Praliné noisette, beurre de cacahuète, crème de pistache... Nos fourrages sont généreux et réalisés à partir d'oléagineux de premier choix.",
      "L'objectif ? Laisser s'exprimer le goût vrai et puissant de chaque noix, pour un équilibre parfait en bouche.",
    ],
    image: '/images/pistachio.png',
    imageAlt: 'Pistache',
    imageSize: { w: 160, h: 160 },
    imageRotation: 0,
  },
  {
    title: 'Enrobage Chocolat Premium',
    paragraphs: [
      "Pour une signature élégante, nous enveloppons nos dattes d'une fine couche de chocolat de qualité supérieure.",
      "Nous privilégions notamment le chocolat noir intense, apprécié pour sa richesse en cacao et ses bienfaits antioxydants, offrant un contraste croquant et raffiné qui sublime chaque bouchée.",
    ],
    image: '/images/chocolate.png',
    imageAlt: 'Chocolat noir',
    imageSize: { w: 200, h: 252 },
    imageRotation: -20,
  },
  {
    title: 'Un écrin pour toutes vos occasions',
    paragraphs: [
      "Que ce soit pour un instant de plaisir personnel avec votre café, une pause énergie saine pour les sportifs, ou un cadeau raffiné à offrir lors de repas festifs, nos dattes s'adaptent à toutes vos envies.",
      "Oh My Datte, c'est l'assurance d'offrir une confiserie originale, visuellement belle et qui surprendra vos convives.",
    ],
    image: '/images/datte-2-shadow.png',
    imageAlt: 'Datte fourrée au chocolat',
    imageSize: { w: 200, h: 300 },
    imageRotation: 10,
  },
]

export default function QualitySection() {
  const pinnedRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<(HTMLDivElement | null)[]>([])
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const pinned = pinnedRef.current
    if (!pinned) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const productEls = productsRef.current.filter(Boolean) as HTMLDivElement[]
      const textEls = textsRef.current.filter(Boolean) as HTMLDivElement[]
      const dotEls = dotsRef.current.filter(Boolean) as HTMLDivElement[]

      // Initial states — hide all except first
      productEls.forEach((el, i) => {
        if (i > 0) gsap.set(el, { yPercent: 100, autoAlpha: 0, scale: 0.85 })
      })
      textEls.forEach((el, i) => {
        if (i > 0) gsap.set(el, { yPercent: 60, autoAlpha: 0 })
      })

      // First dot active
      if (dotEls[0]) gsap.set(dotEls[0], { scale: 1.5, opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned,
          start: 'top top',
          end: () => `+=${window.innerHeight * steps.length}`,
          pin: true,
          scrub: 0.8,
        },
      })

      for (let i = 0; i < steps.length; i++) {
        const product = productEls[i]
        const text = textEls[i]

        // --- ENTER ---
        if (i > 0) {
          tl.to(product, { yPercent: 0, autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' })
          tl.to(text, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, '<0.1')

          // Dot indicators
          if (dotEls[i - 1]) tl.to(dotEls[i - 1], { scale: 1, opacity: 0.3, duration: 0.3 }, '<')
          if (dotEls[i]) tl.to(dotEls[i], { scale: 1.5, opacity: 1, duration: 0.3 }, '<')
        }

        // --- HOLD ---
        tl.to({}, { duration: 0.5 })

        // --- EXIT ---
        if (i < steps.length - 1) {
          tl.to(product, { yPercent: -100, autoAlpha: 0, scale: 0.85, duration: 1, ease: 'power2.in' })
          tl.to(text, { yPercent: -60, autoAlpha: 0, duration: 1, ease: 'power2.in' }, '<0.05')
        }
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="qualite" className="section-scroll-mt my-32">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex w-full justify-between mx-auto items-center gap-8 sm:gap-20">
          <div className="bg-choco-500 pointer-events-none select-none h-[1px] w-full" />
          <h2 className="uppercase text-center text-[clamp(2rem,4vw,7rem)] leading-snug">
            Des&nbsp;produits de&nbsp;qualités
          </h2>
          <div className="bg-choco-500 pointer-events-none select-none h-[1px] w-full" />
        </div>
      </div>

      {/* Desktop — scroll-hijacked pinned area */}
      <div ref={pinnedRef} className="hidden md:block h-screen relative overflow-hidden">
        {/* Dot progress indicator */}
        <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el }}
              className="w-2 h-2 rounded-full bg-choco-500 opacity-30"
            />
          ))}
        </div>

        {/* Fixed two-column layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center gap-8 lg:gap-16 xl:gap-24">
          {/* LEFT — brush (always visible) + product images (swap) */}
          <div className="flex-1 flex items-center justify-center relative min-h-[50vh]">
            {/* Brush — static, always present */}
            <Image
              src="/images/green-brush-bg.svg"
              alt=""
              width={200}
              height={697}
              className="absolute h-[75vh] w-auto pointer-events-none select-none"
            />

            {/* Product images — stacked, animated in/out */}
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { productsRef.current[i] = el }}
                className="absolute z-10"
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={step.imageSize.w}
                  height={step.imageSize.h}
                  className="object-contain drop-shadow-lg"
                  style={{ transform: `rotate(${step.imageRotation}deg)` }}
                />
              </div>
            ))}
          </div>

          {/* RIGHT — text blocks (swap) */}
          <div className="flex-1 relative min-h-[40vh] flex items-center">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { textsRef.current[i] = el }}
                className="absolute inset-0 flex items-center"
              >
                <div className="space-y-4 max-w-xl">
                  <span className="text-sm tracking-[0.3em] uppercase text-choco-500/40 block">
                    {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>
                  <h4 className="uppercase text-[clamp(1.125rem,3vw,1.75rem)]">{step.title}</h4>
                  {step.paragraphs.map((p, j) => (
                    <p key={j} className="text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — simple stacked layout */}
      <div className="md:hidden container mx-auto px-4 space-y-20">
        {steps.map((step, i) => (
          <div key={i} className="space-y-6">
            <div className="flex items-center justify-center relative h-48">
              <Image
                src="/images/green-brush-bg.svg"
                alt=""
                width={100}
                height={350}
                className="absolute h-full w-auto pointer-events-none select-none"
              />
              <Image
                src={step.image}
                alt={step.imageAlt}
                width={Math.round(step.imageSize.w * 0.55)}
                height={Math.round(step.imageSize.h * 0.55)}
                className="object-contain relative z-10"
                style={{ transform: `rotate(${step.imageRotation}deg)` }}
              />
            </div>
            <div className="space-y-2">
              <h4 className="uppercase text-[clamp(1.125rem,4vw,1.75rem)]">{step.title}</h4>
              {step.paragraphs.map((p, j) => (
                <p key={j} className="text-base">{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
