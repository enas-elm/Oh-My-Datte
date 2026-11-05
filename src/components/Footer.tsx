'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const reseaux = [
  { href: 'https://www.tiktok.com/@ohmydatte', label: 'TikTok', icon: '/images/tiktok.svg' },
  { href: 'https://www.instagram.com/oh.my.datte', label: 'Instagram', icon: '/images/instagram.svg' },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.footer
      ref={ref}
      className="container relative mx-auto overflow-hidden rounded-t-2xl px-4 text-creme shadow-footer [--lips-y:120px] [container-type:inline-size] sm:px-6 sm:[--lips-y:100px] lg:px-12"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Aplat chocolat percé d'une bouche, ombre portée dans la découpe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: 'drop-shadow(0 -4px 6px rgba(50, 20, 20, 0.70))' }}
      >
        <div
          className="h-full w-full bg-chocolat"
          style={{
            WebkitMaskImage: 'linear-gradient(#000 0 0), url(/images/lips-cutout.svg)',
            WebkitMaskRepeat: 'no-repeat, no-repeat',
            WebkitMaskPosition: '0 0, center var(--lips-y)',
            WebkitMaskSize: '100% 100%, 215px 104px',
            WebkitMaskComposite: 'source-out',
            maskImage: 'linear-gradient(#000 0 0), url(/images/lips-cutout.svg)',
            maskRepeat: 'no-repeat, no-repeat',
            maskPosition: '0 0, center var(--lips-y)',
            maskSize: '100% 100%, 215px 104px',
            maskComposite: 'exclude',
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center justify-between gap-8 py-12 sm:flex-row md:gap-20 sm:py-24">
          <ul className="flex w-full min-w-fit flex-1 flex-row justify-center gap-10 sm:flex-col sm:gap-4 xl:flex-row xl:justify-start xl:gap-16">
            {reseaux.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 focus-visible:outline-creme md:gap-4"
                >
                  <Image src={r.icon} width={32} height={32} className="size-6 md:size-8" alt="" />
                  <span className="lien-anime uppercase tracking-[0.06em] md:text-lg">{r.label}</span>
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Réserve la place de la bouche */}
          <div aria-hidden="true" className="h-[104px] w-[215px] shrink-0" />

          <address className="flex-1 text-center not-italic lg:text-right lg:text-lg">
            Pour toute question, contactez
            <br className="hidden lg:block" />{' '}
            <a className="lien-anime font-semibold focus-visible:outline-creme" href="mailto:ohmydatte@gmail.com">
              ohmydatte@gmail.com
            </a>
          </address>
        </div>

        <div aria-hidden="true" className="h-px w-full bg-creme/70" />
        <p className="my-4 overflow-hidden whitespace-nowrap text-center font-display text-[13cqw] font-medium leading-[1.2] sm:my-0">
          On se revoit&nbsp;?
        </p>
      </div>
    </motion.footer>
  );
}
