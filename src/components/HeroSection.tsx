'use client';

import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import SmoothLink from '@/components/animations/SmoothLink';
import { buttonClasses } from '@/components/Button';

const MotionImage = motion.create(Image);

// Pendant le défilement, chaque datte change lentement d'échelle et de
// profondeur, une seule fois sur toute la course : un mouvement ample et
// continu plutôt qu'une pulsation.
const DEPTH = [
  { scale: [1, 1.08], y: [0, -18] },
  { scale: [1, 0.94], y: [0, 14] },
  { scale: [1, 1.05], y: [0, -10] },
];

const dattes = [
  { src: '/images/inside-datte.png', w: 208, className: 'w-[clamp(84px,18vw,180px)]' },
  { src: '/images/irresistible-irl.png', w: 224, className: 'w-[clamp(84px,20vw,208px)]' },
  { src: '/images/intrepide-irl.png', w: 232, className: 'w-[clamp(84px,22vw,208px)] relative top-4' },
];

const surtitres = ["Dattes d'exception", 'Événements', 'Atelier artisanal'];

const appear = (delay: number) => ({
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.4, delay },
});

function Datte({ index, progress, delay }: { index: number; progress: MotionValue<number>; delay: number }) {
  const reduce = useReducedMotion();
  const depth = DEPTH[index];
  const scale = useTransform(progress, [0, 1], reduce ? [1, 1] : depth.scale);
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : depth.y);
  const d = dattes[index];
  return (
    // apparition au chargement sur l'enveloppe, profondeur au défilement sur l'image
    <motion.div
      className={`shrink-0 ${d.className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 } }}
    >
      <MotionImage
        src={d.src}
        alt=""
        width={d.w}
        height={d.w}
        priority={index < 2}
        sizes="(max-width: 640px) 90px, 210px"
        className="h-auto w-full object-contain drop-shadow-datte will-change-transform"
        style={{ scale, y }}
      />
    </motion.div>
  );
}

// Course horizontale des dattes (début, fin), en % de la rangée
const SLIDE = {
  desktop: ['10%', '-21%'],
  mobile: ['4%', '-34%'],
};

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return mobile;
}

export default function HeroSection() {
  const targetRef = useRef(null);
  const reduce = useReducedMotion();

  // Pas de blocage du défilement : le glissement des dattes se joue pendant
  // que le hero remonte, et se termine quand son milieu atteint le haut.
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'center start'] });
  const mobile = useIsMobile();
  const course = reduce ? ['0%', '0%'] : mobile ? SLIDE.mobile : SLIDE.desktop;
  const x = useTransform(scrollYProgress, [0, 1], course);

  return (
    <section ref={targetRef} className="relative mt-[var(--navbar-hauteur)]">
      <div className="relative overflow-hidden pb-10 pt-14 text-center sm:pt-[100px]">
        <h1 className="relative text-chocolat">
          <motion.span
            {...appear(0.1)}
            className="block select-none text-[clamp(2.4rem,5vw,4.5rem)] uppercase leading-[1.1] tracking-[0.02em]"
          >
            Votre nouveau
          </motion.span>
          <motion.span
            {...appear(0.3)}
            className="relative z-10 -mt-1 block select-none font-script text-[clamp(6rem,20vw,12rem)] font-normal leading-none sm:mt-4"
          >
            Crunsh
          </motion.span>
        </h1>

        {/* Mobile : les dattes glissent entre « Crunsh » et les surtitres.
            Desktop : elles flottent autour du titre. */}
        <motion.div
          aria-hidden="true"
          style={{ x }}
          className="pointer-events-none relative left-16 mt-2 flex h-[104px] w-full items-center gap-[18vw] px-4 sm:absolute sm:left-44 sm:right-0 sm:top-[140px] sm:mt-0 sm:h-auto"
        >
          <Datte index={0} progress={scrollYProgress} delay={0.1} />
          <Datte index={1} progress={scrollYProgress} delay={0.1} />
          <Datte index={2} progress={scrollYProgress} delay={0.2} />
        </motion.div>

        <p className="mt-6 flex flex-col items-center justify-center gap-3 font-display text-[15px] font-semibold uppercase tracking-[0.25em] sm:mt-10 md:flex-row md:gap-8">
          {surtitres.map((mot, i) => (
            <Fragment key={mot}>
              {i > 0 && (
                <motion.span {...appear(0.3 + i * 0.1)} aria-hidden="true" className="h-[1.5px] w-6 shrink-0 bg-rouge" />
              )}
              <motion.span {...appear(0.2 + i * 0.2)}>{mot}</motion.span>
            </Fragment>
          ))}
        </p>

        <motion.div {...appear(0.8)} className="mt-12 sm:mt-14">
          <SmoothLink href="#dattes" className={buttonClasses('chocolat')}>
            Découvrir les dattes
          </SmoothLink>
        </motion.div>
      </div>
    </section>
  );
}
