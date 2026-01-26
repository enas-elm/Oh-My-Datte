'use client';

import Image from 'next/image';
import { Button } from './Button';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const targetRef = useRef(null);

  // On suit la progression du scroll sur l'élément cible
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // On transforme le scroll (0 à 1) en translation x (de 0% à -50%)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    // 400vh définit la durée du scroll
    <section ref={targetRef} className="mt-[calc(var(--navbar-height)+100px)] h-[400vh] relative">
      <div className="sticky top-[calc(var(--navbar-height)+100px)] h-screen text-center overflow-hidden">
        <h1 className="font-times text-center">
          <span className="block text-[clamp(2rem,5vw,7rem)] select-none">
            VOTRE NOUVEAU
          </span>
          <span className="font-allura block text-[clamp(5rem,20vw,192px)] leading-none mt-8 relative z-10 select-none">
            Crunsh
          </span>
        </h1>
        <motion.div style={{ x }} className="absolute left-16 sm:left-44 right-0 top-8 sm:top-0 flex items-center gap-[18vw] w-full px-4 pointer-events-none">
          <Image
            src="/images/datte-1.png"
            alt="Bowl of dates"
            width={208}
            height={208}
            className="object-contain w-[clamp(64px,18vw,208px)] max-w-[208px] h-auto"
          />
          <Image
            src="/images/datte-2.png"
            alt="Bowl of dates"
            width={224}
            height={224}
            className="object-contain w-[clamp(64px,20vw,208px)] max-w-[224px] h-auto relative"
          />
          <Image
            src="/images/datte-3.png"
            alt="Bowl of dates"
            width={232}
            height={232}
            className="object-contain w-[clamp(64px,22vw,208px)] max-w-[232px] h-auto relative top-4"
          />
          <Image
            src="/images/datte-2.png"
            alt="Bowl of dates"
            width={242}
            height={242}
            className="object-contain w-[22vw] max-w-[242px] h-auto rotate-12"
          />
        </motion.div>
        <p className="mb-14">
          Artisanal <span className="block sm:inline font-bold text-2xl mx-2">~</span>{' '}
          Ingrédients de qualité{' '}
          <span className=" block sm:inline font-bold text-2xl mx-2">~</span> Prêt à déguster
        </p>
        <Link href="#contact">
          <Button>COMMANDER</Button>
        </Link>
      </div>
    </section>
  );
}
