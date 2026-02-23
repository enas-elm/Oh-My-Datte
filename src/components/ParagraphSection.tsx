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

      {/* Cursive brand accent */}
      <motion.p
        className="font-allura text-[clamp(2.5rem,5vw,4rem)] text-red leading-none mb-10"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Oh My Datte
      </motion.p>

      {/* Opening statement — larger, bolder */}
      <motion.p
        className="text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.85] tracking-[0.005em] max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Découvrez l&apos;atelier artisanal qui transforme la datte
        en une véritable création pâtissière.
      </motion.p>

      {/* Small dot separator */}
      <motion.span
        className="inline-block w-10 h-[1.5px] bg-red shrink-0 mb-8 "
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

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

    </section>
  )
}
//     <section className="my-60">
//       <motion.p
//         initial={{ opacity: 0, filter: "blur(5px)", y: 100 }}
//         whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.8, ease: "easeOut" as const }}
//         className="text-[clamp(1.3rem,2vw,4rem)] font-archivo text-center w-2/3 mx-auto"
//       >
//         Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
//       </motion.p>
//     </section>
//   );
// }
