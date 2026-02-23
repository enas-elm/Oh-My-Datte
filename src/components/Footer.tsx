'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.footer
      ref={ref}
      className="text-vanilla relative container mx-auto px-4 sm:px-6 lg:px-12 rounded-t-2xl shadow-footer overflow-hidden [--lips-y:120px] sm:[--lips-y:100px]"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Overlay with lip cutout + drop-shadow into the hole */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ filter: "drop-shadow(0 -4px 6px rgba(50, 20, 20, 0.70))" }}
      >
        <div
          className="w-full h-full bg-choco-500"
          style={{
            WebkitMaskImage:
              "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
            WebkitMaskRepeat: "no-repeat, no-repeat",
            WebkitMaskPosition: "0 0, center var(--lips-y)",
            WebkitMaskSize: "100% 100%, 215px 104px",
            WebkitMaskComposite: "source-out",
            maskImage:
              "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
            maskRepeat: "no-repeat, no-repeat",
            maskPosition: "0 0, center var(--lips-y)",
            maskSize: "100% 100%, 215px 104px",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-20 py-12 sm:py-24">

          <div className="flex flex-row justify-center xl:justify-normal sm:flex-col xl:flex-row gap-[10cqw] sm:gap-4 xl:gap-16 min-w-fit w-full flex-1">
            <a
              href="https://www.tiktok.com/@ohmydatte"
              target="_blank"
              className="flex items-center gap-2 md:gap-4 group cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-vanilla">
              <Image src="/images/tiktok.svg" width={32} height={32} className="scale-75 md:scale-100" alt="" />
              <span className="uppercase md:text-lg group-animated-underline">TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/oh.my.datte"
              target="_blank"
              className="flex items-center gap-2 md:gap-4 group cursor-pointer focus-visible:outline-1 *: focus-visible:outline-offset-3 focus-visible:outline-vanilla"
            >
              <Image
                src="/images/instagram.svg"
                width={32}
                height={32}
                className="scale-75 md:scale-100"
                alt="Instagram"
              />
              <span className="uppercase md:text-lg group-animated-underline">Instagram</span>
            </a>
          </div>

          {/* Réserve la place */}
          <div aria-hidden className="shrink-0 w-[215px] h-[104px]" />

          <address className="flex-1 lg:text-lg not-italic text-center lg:text-right">
            Pour toute question, contactez <a className="font-bold animated-underline focus-visible:outline-1   focus-visible:outline-offset-3 focus-visible:outline-vanilla" href="mailto:contact@ohmydatte.com">contact@ohmydatte.com</a>

          </address>
        </div>

        <div className="bg-vanilla pointer-events-none select-none h-[1px] w-full" />
        <div className="font-times text-center text-[13cqw] leading-snug max-w-full overflow-hidden whitespace-nowrap my-6 sm:my-0">
          On se revoit ?
        </div>
      </div>
    </motion.footer>
  )
}