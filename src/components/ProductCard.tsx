'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Product } from './ProductSection';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Stagger: even-index cards enter slightly before odd ones
  const stagger = (index % 2) * 0.15;

  return (
    <div ref={ref} className="flex flex-col items-center lg:max-w-120 mx-auto">
      {/* 1. Image — scale + opacity + bounce */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          delay: 0.4 + stagger,
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1], // spring-like bounce
        }}
        className="mb-8 relative"
      >
        {/* Brush-stroke background */}
        <div
          className="absolute inset-0 z-0 scale-x-[1.9] scale-y-[2.1] sm:scale-x-[2.2] sm:scale-y-[2.5] rotate-[-5deg]"
          style={{ backgroundImage: 'url(/images/datte-brush-background.svg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
          aria-hidden="true"
        />
        <Image
          src={product.imagePath}
          alt={`Datte au ${product.subtitle}`}
          width={200}
          height={200}
          className="object-contain aspect-square relative z-1 drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] max-w-[175px] sm:max-w-[200px]"
        />
      </motion.div>

      {/* 2. Title — blur + opacity */}
      <motion.h4
        className="uppercase text-[clamp(1.125rem,4vw,1.5rem)]"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + stagger + 0.22, duration: 0.35, ease: 'easeOut' }}
      >
        {product.title}
      </motion.h4>

      {/* 3. Decorative accent line */}
      <motion.div
        className="w-8 h-[1.5px] bg-gold-600 rounded-full mt-2 mb-3"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ delay: 0.4 + stagger + 0.3, duration: 0.4, ease: 'easeOut' }}
      />

      {/* 4. Subtitle — blur + opacity */}
      <motion.p
        className="text-sm md:text-base mb-6"
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + stagger + 0.34, duration: 0.3, ease: 'easeOut' }}
      >
        <span className='opacity-[.6]'>
          {product.subtitle}
        </span>
      </motion.p>

      {/* 5. Description — blur + opacity */}
      <motion.div
        className="text-center md:text-lg"
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.4 + stagger + 0.45, duration: 0.3, ease: 'easeOut' }}
      >
        {product.description.split('\n\n').map((paragraph, i) => (
          <p key={i} className={i > 0 ? 'mt-6 text-base md:text-[1.05rem] italic opacity-70' : ''}>
            {paragraph}
          </p>
        ))}
      </motion.div>
    </div>
  );
}