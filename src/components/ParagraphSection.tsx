'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ParagraphSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px' })

  return (
    <section
      ref={sectionRef}
      className="my-48 md:my-60 mx-auto w-11/12 max-w-4xl text-center font-archivo text-choco-700"
    >
      {/* Top ornamental divider */}
      <motion.div
        className="flex items-center justify-center gap-5 mb-14"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="block h-px w-16 bg-gradient-to-r from-transparent to-red" />
        <svg width="18" height="18" viewBox="0 0 18 18" className="text-red shrink-0" aria-hidden="true">
          <path d="M9 0 L11.5 6.5 L18 9 L11.5 11.5 L9 18 L6.5 11.5 L0 9 L6.5 6.5 Z" fill="currentColor" />
        </svg>
        <span className="block h-px w-16 bg-gradient-to-l from-transparent to-red" />
      </motion.div>

      {/* Cursive brand accent */}
      <motion.p
        className="font-allura text-[clamp(2.5rem,5vw,4rem)] text-red leading-none mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        Oh My Datte
      </motion.p>

      {/* Opening statement — larger, bolder */}
      <motion.p
        className="text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.85] tracking-[0.005em] max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Découvrez l&apos;atelier artisanal qui transforme la datte
        en une véritable création pâtissière.
      </motion.p>

      {/* Small dot separator */}
      <motion.div
        className="flex justify-center gap-2 mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
        aria-hidden="true"
      >
        <span className="block w-1 h-1 rounded-full bg-red" />
        <span className="block w-1 h-1 rounded-full bg-red" />
        <span className="block w-1 h-1 rounded-full bg-red" />
      </motion.div>

      {/* Supporting paragraph — refined body */}
      <motion.p
        className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[2] tracking-[0.01em] text-choco-500 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        À la croisée de l&apos;authenticité et de la gourmandise, nous
        revisitons ce trésor du désert pour offrir une expérience gustative
        inédite. Charnues, moelleuses et délicatement fourrées, nos dattes sont
        enrobées à la main avec des ingrédients d&apos;exception. Succombez à
        une nouvelle façon de déguster la datte&nbsp;: plus moderne, plus
        raffinée, mais toujours aussi pure.
      </motion.p>

      {/* Bottom ornamental divider */}
      <motion.div
        className="flex items-center justify-center gap-5 mt-14"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <span className="block h-px w-16 bg-gradient-to-r from-transparent to-red" />
        <svg width="18" height="18" viewBox="0 0 18 18" className="text-red shrink-0" aria-hidden="true">
          <path d="M9 0 L11.5 6.5 L18 9 L11.5 11.5 L9 18 L6.5 11.5 L0 9 L6.5 6.5 Z" fill="currentColor" />
        </svg>
        <span className="block h-px w-16 bg-gradient-to-l from-transparent to-red" />
      </motion.div>
    </section>
  )
}
    <section className="my-60">
      <motion.p
        initial={{ opacity: 0, filter: "blur(5px)", y: 100 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="text-[clamp(1.3rem,2vw,4rem)] font-archivo text-center w-2/3 mx-auto"
      >
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
      </motion.p>
    </section>
  );
}
