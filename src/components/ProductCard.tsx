'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Product } from './ProductSection';

export function ProductCard({ product }: { product: Product}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="flex flex-col items-center max-w-72 mx-auto">
      {/* 1. Image — scale + opacity + bounce */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          delay: 0.4,
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1], // spring-like bounce
        }}
        className="mb-8"
      >
        <Image
          src={product.imagePath}
          alt={`Datte au ${product.subtitle}`}
          width={200}
          height={200}
          className="object-contain aspect-square"
        />
      </motion.div>

      {/* 2. Title — blur + opacity */}
      <motion.h4
        className="uppercase text-[clamp(1.125rem,4vw,1.5rem)]"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + 0.22, duration: 0.35, ease: 'easeOut' }}
      >
        {product.title}
      </motion.h4>

      {/* 3. Subtitle — blur + opacity */}
      <motion.p
        className="text-sm md:text-base mb-6"
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + 0.34, duration: 0.3, ease: 'easeOut' }}
      >
        {product.subtitle}
      </motion.p>

      {/* 4. Description — blur + opacity */}
      <motion.p
        className="text-center md:text-lg"
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + 0.45, duration: 0.3, ease: 'easeOut' }}
      >
        {product.description}
      </motion.p>
    </div>
  );
}