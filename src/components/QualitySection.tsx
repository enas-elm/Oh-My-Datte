<<<<<<< HEAD
'use client'

import Image from 'next/image';
import { motion } from "motion/react";
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const states = [
  {
    left: {
      title: "Un Fruit d'Exception",
      paragraphs: [
        "Symbole d'hospitalité et véritable concentré d'énergie, la datte est reconnue depuis des millénaires pour sa richesse en fibres et en antioxydants.",
        "Nous sélectionnons rigoureusement des dattes deglet nour charnues et naturellement sucrées. Elles offrent une base saine et fondante, parfaite pour accueillir nos créations sans culpabilité.",
      ],
    },
    right: {
      title: 'Cœur Fondant et Naturel',
      paragraphs: [
        "Praliné noisette, beurre de cacahuète, crème de pistache... Nos fourrages sont généreux et réalisés à partir d'oléagineux de premier choix.",
        "L'objectif ? Laisser s'exprimer le goût vrai et puissant de chaque noix, pour un équilibre parfait en bouche.",
      ],
    },
    topImage: { src: '/images/datte-1.png', alt: 'Datte deglet nour', w: 160, h: 224 },
    bottomImage: { src: '/images/pistachio.png', alt: 'Pistache', w: 130, h: 130 },
  },
  {
    left: {
      title: 'Enrobage Chocolat Premium',
      paragraphs: [
        "Pour une signature élégante, nous enveloppons nos dattes d'une fine couche de chocolat de qualité supérieure.",
        "Nous privilégions notamment le chocolat noir intense, apprécié pour sa richesse en cacao et ses bienfaits antioxydants, offrant un contraste croquant et raffiné qui sublime chaque bouchée.",
      ],
    },
    right: {
      title: 'Un écrin pour toutes vos occasions',
      paragraphs: [
        "Que ce soit pour un instant de plaisir personnel avec votre café, une pause énergie saine pour les sportifs, ou un cadeau raffiné à offrir lors de repas festifs, nos dattes s'adaptent à toutes vos envies.",
        "Oh My Datte, c'est l'assurance d'offrir une confiserie originale, visuellement belle et qui surprendra vos convives.",
      ],
    },
    topImage: { src: '/images/chocolate.png', alt: 'Chocolat noir', w: 160, h: 200, rotation: -20 },
    bottomImage: { src: '/images/datte-2-shadow.png', alt: 'Datte fourrée au chocolat', w: 160, h: 240, rotation: 10 },
  },
]

=======
'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
>>>>>>> 21abd8e (Add quality section animations)

export default function QualitySection() {
  const pinnedRef = useRef<HTMLDivElement>(null)

  // Refs for state 1 elements
  const leftText1Ref = useRef<HTMLDivElement>(null)
  const rightText1Ref = useRef<HTMLDivElement>(null)
  const topImg1Ref = useRef<HTMLDivElement>(null)
  const bottomImg1Ref = useRef<HTMLDivElement>(null)

  // Refs for state 2 elements
  const leftText2Ref = useRef<HTMLDivElement>(null)
  const rightText2Ref = useRef<HTMLDivElement>(null)
  const topImg2Ref = useRef<HTMLDivElement>(null)
  const bottomImg2Ref = useRef<HTMLDivElement>(null)

  // Dot refs
  const dot1Ref = useRef<HTMLDivElement>(null)
  const dot2Ref = useRef<HTMLDivElement>(null)

  const brushRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pinned = pinnedRef.current
    const brush = brushRef.current
    if (!pinned || !brush) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const h = brush.offsetHeight
      const entryY = h * 0.6      // below brush (clipped)
      const exitY = -h * 0.6      // above brush (clipped)
      const topRest = -h * 0.17   // upper resting position
      const bottomRest = h * 0.17 // lower resting position

      // All images start at entry point (bottom of brush, hidden)
      gsap.set([topImg1Ref.current, bottomImg1Ref.current, topImg2Ref.current, bottomImg2Ref.current], {
        y: entryY, autoAlpha: 0,
      })

      // State 1 text visible, state 2 text hidden
      gsap.set([leftText1Ref.current, rightText1Ref.current], { autoAlpha: 1 })
      gsap.set([leftText2Ref.current, rightText2Ref.current], { autoAlpha: 0 })

      // Dots
      gsap.set(dot1Ref.current, { scale: 1.6, opacity: 1 })
      gsap.set(dot2Ref.current, { scale: 1, opacity: 0.3 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 0.8,
        },
      })

      // --- ENTER state 1: images rise from bottom to resting positions ---
      tl.to(topImg1Ref.current, { y: topRest, autoAlpha: 1, duration: 1.2, ease: 'power2.out' })
      tl.to(bottomImg1Ref.current, { y: bottomRest, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, '<0.15')

      // --- HOLD state 1 ---
      tl.to({}, { duration: 0.5 })

      // --- EXIT state 1: images continue upward out the top ---
      tl.to(topImg1Ref.current, { y: exitY, autoAlpha: 0, duration: 1, ease: 'power2.in' })
      tl.to(bottomImg1Ref.current, { y: exitY, autoAlpha: 0, duration: 1, ease: 'power2.in' }, '<0.1')

      // Text crossfade — pure opacity, no movement
      tl.to([leftText1Ref.current, rightText1Ref.current], { autoAlpha: 0, duration: 0.6, ease: 'power1.in' }, '<0.2')
      tl.to([leftText2Ref.current, rightText2Ref.current], { autoAlpha: 1, duration: 0.6, ease: 'power1.out' }, '>-0.1')

      // Dots
      tl.to(dot1Ref.current, { scale: 1, opacity: 0.3, duration: 0.4 }, '<')
      tl.to(dot2Ref.current, { scale: 1.6, opacity: 1, duration: 0.4 }, '<')

      // --- ENTER state 2: images rise from bottom to resting positions ---
      tl.to(topImg2Ref.current, { y: topRest, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, '<0.1')
      tl.to(bottomImg2Ref.current, { y: bottomRest, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, '<0.15')

      // --- HOLD state 2 ---
      tl.to({}, { duration: 0.5 })
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
          <div ref={dot1Ref} className="w-2 h-2 rounded-full bg-choco-500 opacity-30" />
          <div ref={dot2Ref} className="w-2 h-2 rounded-full bg-choco-500 opacity-30" />
        </div>
        <div className='grid grid-flow-col grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-y-16 md:gap-y-32 lg:gap-y-42 xl:gap-y-58 gap-x-10 lg:gap-x-24 mx-auto'>
          <motion.div 
            className='space-y-2'
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
          >
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </motion.div>
          
          <motion.div 
            className='space-y-2'
            initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
          >
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </motion.div>

          <div className='row-span-2 md:row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain space-y-16 lg:space-y-12 hidden md:flex flex-col items-center justify-center'>
            <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain'/>
            <Image src="/images/chocolate.png" alt="" width={200} height={252} className='object-contain -rotate-[20deg]'/>
          </div>

          <motion.div 
            className='space-y-2'
            initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
          >
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </motion.div>

          <motion.div 
            className='space-y-2'
            initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
          >
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </motion.div>

          {/* Image mobile */}
          <div className='row-span-2 md:row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain space-y-16 lg:space-y-12 flex md:hidden flex-col items-center justify-center overflow-hidden sticky top-1/3 self-center'>
            <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain'/>
            <Image src="/images/chocolate.png" alt="" width={200} height={252} className='object-contain -rotate-[20deg]'/>
          </div>
        </div>

            {/* LEFT — text panels */}
            <div className="relative min-h-[40vh] flex items-center justify-end">
              {/* State 1 — left */}
              <div ref={leftText1Ref} className="absolute inset-0 flex items-center justify-end">
                <div className="space-y-4 max-w-md">
                  <span className="text-xs tracking-[0.3em] uppercase text-choco-500/40 block">
                    01 / 04
                  </span>
                  <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">
                    {states[0].left.title}
                  </h4>
                  {states[0].left.paragraphs.map((p, j) => (
                    <p key={j} className="text-base lg:text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              {/* State 2 — left */}
              <div ref={leftText2Ref} className="absolute inset-0 flex items-center justify-end">
                <div className="space-y-4 max-w-md">
                  <span className="text-xs tracking-[0.3em] uppercase text-choco-500/40 block">
                    03 / 04
                  </span>
                  <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">
                    {states[1].left.title}
                  </h4>
                  {states[1].left.paragraphs.map((p, j) => (
                    <p key={j} className="text-base lg:text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER — brush + ingredient images (overflow-hidden clips entry/exit) */}
            <div ref={brushRef} className="relative flex items-center justify-center w-[200px] lg:w-[260px] h-[75vh] overflow-hidden">
              {/* Brush — always visible */}
              <Image
                src="/images/green-brush-bg.svg"
                alt=""
                width={200}
                height={697}
                className="absolute h-full w-auto pointer-events-none select-none"
              />

              {/* All images centered via inset+margin — transform is free for GSAP */}
              <div ref={topImg1Ref} className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={states[0].topImage.src}
                  alt={states[0].topImage.alt}
                  width={states[0].topImage.w}
                  height={states[0].topImage.h}
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div ref={topImg2Ref} className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={states[1].topImage.src}
                  alt={states[1].topImage.alt}
                  width={states[1].topImage.w}
                  height={states[1].topImage.h}
                  className="object-contain drop-shadow-lg"
                  style={{ rotate: `${states[1].topImage.rotation ?? 0}deg` }}
                />
              </div>
              <div ref={bottomImg1Ref} className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={states[0].bottomImage.src}
                  alt={states[0].bottomImage.alt}
                  width={states[0].bottomImage.w}
                  height={states[0].bottomImage.h}
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div ref={bottomImg2Ref} className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={states[1].bottomImage.src}
                  alt={states[1].bottomImage.alt}
                  width={states[1].bottomImage.w}
                  height={states[1].bottomImage.h}
                  className="object-contain drop-shadow-lg"
                  style={{ rotate: `${states[1].bottomImage.rotation ?? 0}deg` }}
                />
              </div>
            </div>

            {/* RIGHT — text panels */}
            <div className="relative min-h-[40vh] flex items-center">
              {/* State 1 — right */}
              <div ref={rightText1Ref} className="absolute inset-0 flex items-center">
                <div className="space-y-4 max-w-md">
                  <span className="text-xs tracking-[0.3em] uppercase text-choco-500/40 block">
                    02 / 04
                  </span>
                  <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">
                    {states[0].right.title}
                  </h4>
                  {states[0].right.paragraphs.map((p, j) => (
                    <p key={j} className="text-base lg:text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              {/* State 2 — right */}
              <div ref={rightText2Ref} className="absolute inset-0 flex items-center">
                <div className="space-y-4 max-w-md">
                  <span className="text-xs tracking-[0.3em] uppercase text-choco-500/40 block">
                    04 / 04
                  </span>
                  <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">
                    {states[1].right.title}
                  </h4>
                  {states[1].right.paragraphs.map((p, j) => (
                    <p key={j} className="text-base lg:text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </div>

          </div>
       
    </section>
  );
}
