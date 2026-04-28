'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Product } from './ProductSection';

const BRUSH_MASK = {
  maskImage: 'url(/images/datte-brush-background.svg)',
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: 'url(/images/datte-brush-background.svg)',
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
} as const;

const BRUSH_ROTATIONS = ['-7deg', '-3deg', '-8deg', '-4deg'];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const rotation = BRUSH_ROTATIONS[index % BRUSH_ROTATIONS.length];

  return (
    <div ref={ref} className="flex flex-col items-center lg:max-w-120 mx-auto">
      {/* Image — blur + opacity */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{
          duration: 0.45,
          ease: 'easeOut',
        }}
        className="mb-8 relative w-[160px] h-[160px] flex items-center justify-center"
      >
        {/* Brush — soft cast shadow behind */}
        <div
          className="absolute z-0 -inset-x-[48%] -inset-y-[58%] sm:-inset-x-[63%] sm:-inset-y-[78%]"
          style={{
            ...BRUSH_MASK,
            transform: `rotate(${rotation}) translate(4px, 10px)`,
            backgroundColor: 'rgba(62, 42, 36, 0.34)',
            filter: 'blur(8px)',
          }}
          aria-hidden="true"
        />

        {/* Brush — painterly fill with radial highlight */}
        <div
          className="absolute z-0 -inset-x-[45%] -inset-y-[55%] sm:-inset-x-[60%] sm:-inset-y-[75%]"
          style={{
            ...BRUSH_MASK,
            transform: `rotate(${rotation})`,
            backgroundImage:
              'radial-gradient(ellipse 70% 60% at 32% 38%, #FFF4E4 0%, #F9E9DB 38%, #F2D2B6 78%, #E5B58F 100%)',
          }}
          aria-hidden="true"
        />

        {/* Brush — paper-grain texture overlay (multiply for warmth) */}
        <div
          className="absolute z-0 -inset-x-[45%] -inset-y-[55%] sm:-inset-x-[60%] sm:-inset-y-[75%] opacity-55 mix-blend-multiply"
          style={{
            ...BRUSH_MASK,
            transform: `rotate(${rotation})`,
            backgroundImage: 'url(/images/bg-texture.svg)',
            backgroundSize: '420px',
            backgroundRepeat: 'repeat',
            backgroundPosition: `${(index * 53) % 200}px ${(index * 71) % 200}px`,
          }}
          aria-hidden="true"
        />

        {/* Brush — inner edge shading for depth */}
        <div
          className="absolute z-0 -inset-x-[45%] -inset-y-[55%] sm:-inset-x-[60%] sm:-inset-y-[75%] mix-blend-multiply opacity-70"
          style={{
            ...BRUSH_MASK,
            transform: `rotate(${rotation})`,
            backgroundImage:
              'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 55%, rgba(94, 62, 54, 0.18) 85%, rgba(94, 62, 54, 0.32) 100%)',
          }}
          aria-hidden="true"
        />

        <Image
          src={product.imagePath}
          alt={`Datte au ${product.subtitle}`}
          width={200}
          height={200}
          className="object-contain aspect-square relative z-1 drop-shadow-[0_10px_8px_rgba(50,20,20,0.45)] max-w-[190px] sm:max-w-[190px]"
        />
      </motion.div>

      {/* 2. Title — blur + opacity */}
      <motion.h4
        className="uppercase text-[clamp(1.125rem,4vw,1.5rem)]"
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {product.title}
      </motion.h4>

      {/* Subtitle — blur + opacity */}
      <motion.p
        className="text-sm md:text-base "
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <span className='opacity-[.6]'>
          {product.subtitle}
        </span>
      </motion.p>


      {/* Decorative accent line */}
      <motion.div
        className="w-8 h-[1.5px] bg-gold-600 rounded-full my-4"
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      {/* Description — blur + opacity */}
      <motion.div
        className="text-center md:text-lg"
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
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