'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  /** Intensité du flou de départ, en px (10 à 14 selon le design system). */
  blur?: number
  as?: 'div' | 'p' | 'span' | 'h2' | 'h3' | 'li'
}

/**
 * Apparition Oh My Datte : du flou vers le net avec l'opacité, une seule fois
 * à l'entrée dans l'écran.
 */
export default function Reveal({ delay = 0, blur = 12, as = 'div', children, ...rest }: RevealProps) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      initial={{ opacity: 0, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
