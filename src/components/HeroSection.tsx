'use client';

import Image from 'next/image';
import SmoothLink from "@/components/animations/SmoothLink"
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function HeroSection() {
  const targetRef = useRef(null);

  // On suit la progression du scroll sur l'élément cible
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // On transforme le scroll (0 à 1) en translation x (de 0% à -50%)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  const percentRange = () => {
    return Array.from({ length: 10 }, (_, i) => i / (10 - 1))
  }

  const valueRange = (min: number, max: number) => {
    return Array.from({ length: 10 }, () => Math.random() * (max - min) + min)
  }

  // Effet de bounce sur les images avec le scroll
  const scale1 = useTransform(scrollYProgress, percentRange(), valueRange(0.9, 1.1));
  const scale2 = useTransform(scrollYProgress, percentRange(), valueRange(0.9, 1.1));
  const scale3 = useTransform(scrollYProgress, percentRange(), valueRange(0.9, 1.1));
  const scale4 = useTransform(scrollYProgress, percentRange(), valueRange(0.9, 1.1));

  const MotionImage = motion.create(Image);

  return (
    // 350vh définit la durée du scroll
    <section ref={targetRef} className="mt-[calc(var(--navbar-height)+100px)] h-[350vh] relative">
      <div className="sticky top-[calc(var(--navbar-height)+100px)] py-3 text-center overflow-hidden">
        <h1 className="font-times text-center">
          <motion.span
            className="text-[clamp(2.5rem,5vw,7rem)] select-none"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            VOTRE{' '}
          </motion.span>
          <motion.span
            className="text-[clamp(2.5rem,5vw,7rem)] select-none"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            NOUVEAU
          </motion.span>
          <motion.span
            className="font-allura block text-[clamp(6rem,20vw,192px)] leading-none mt-8 relative z-10 select-none"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Crunsh
          </motion.span>
        </h1>
        <motion.div style={{ x }} className="absolute left-16 sm:left-44 right-0 top-8 sm:top-0 flex items-center gap-[18vw] w-full px-4 pointer-events-none">
          <MotionImage
            src="/images/inside-datte.png"
            alt="Bowl of dates"
            width={208}
            height={208}
            className="object-contain w-[clamp(88px,18vw,208px)] max-w-[208px] h-auto"
            style={{ scale: scale1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          />
          <MotionImage
            src="/images/irresistible-irl.png"
            alt="Bowl of dates"
            width={224}
            height={224}
            className="object-contain w-[clamp(88px,20vw,208px)] max-w-[224px] h-auto relative"
            style={{ scale: scale2 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          />
          <MotionImage
            src="/images/intrepide-irl.png"
            alt="Bowl of dates"
            width={232}
            height={232}
            className="object-contain w-[clamp(88px,22vw,208px)] max-w-[232px] h-auto relative top-4"
            style={{ scale: scale3 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          />
          <MotionImage
            src="/images/datte-2.png"
            alt="Bowl of dates"
            width={242}
            height={242}
            className="object-contain w-[22vw] max-w-[242px] h-auto rotate-12"
            style={{ scale: scale4 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          />
        </motion.div>

        <p className="flex items-center justify-center gap-3 sm:gap-8 mt-7 mb-14 flex-col md:flex-row md:flex-wrap">
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="uppercase tracking-[0.25em] text-[13px] sm:text-[15px] font-times"
          >
            Dattes d&apos;Exception
          </motion.span>
          <motion.span
            className="inline-block w-6 h-[1.5px] bg-red shrink-0 "
            aria-hidden="true"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="uppercase tracking-[0.25em] text-[13px] sm:text-[15px] font-times"
          >
            Événements
          </motion.span>
          <motion.span
            className="inline-block w-6 h-[1.5px] bg-red shrink-0"
            aria-hidden="true"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="uppercase tracking-[0.25em] text-[13px] sm:text-[15px] font-times"
          >
            Atelier Artisanal
          </motion.span>
        </p>
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <SmoothLink
            href="#contact"
            className='inline-flex border border-choco-500 font-times bg-choco-500 text-vanilla py-3 px-4 shadow-button text-xl hover:bg-transparent hover:text-choco-500 transition-colors duration-300 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-choco-500'
          >
            COMMANDER
          </SmoothLink>
        </motion.div>
      </div>
    </section>
  );
}
