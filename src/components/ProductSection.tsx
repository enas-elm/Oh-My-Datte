'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ProductCard } from './ProductCard';

export interface Product {
  imagePath: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function ProductSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  const products: Product[] = [
    {
      imagePath: '/images/datte-2-shadow.png',
      title: "L'Irrésistible",
      subtitle: 'Blanc · Pistache',
      description:
        'Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs.',
    },
    {
      imagePath: '/images/datte-5-shadow.png',
      title: "L'Irrésistible",
      subtitle: 'Blanc · Pistache',
      description:
        'Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs.',
    },
    {
      imagePath: '/images/datte-4-shadow.png',
      title: "L'Irrésistible",
      subtitle: 'Blanc · Pistache',
      description:
        'Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs.',
    },
    {
      imagePath: '/images/datte-6-shadow.png',
      title: "L'Irrésistible",
      subtitle: 'Blanc · Pistache',
      description:
        'Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs.',
    },
  ];

  return (
    <section id='vos-dattes' className="section-scroll-mt my-32 py-52 sm:py-80 relative text-vanilla overflow-hidden">
      <Image
        src="/images/product-bg.svg"
        alt=""
        fill
        className="scale-x-150 translate-y-[4%] object-cover z-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          ref={titleRef}
          className="text-[clamp(2rem,4vw,7rem)] leading-snug mb-16 sm:mb-28"
        >
          <motion.span
            className="uppercase"
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={titleInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            Rencontrez{' '}
          </motion.span>
          <motion.span
            className="uppercase"
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={titleInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.14, duration: 0.45, ease: 'easeOut' }}
          >
            vos
          </motion.span>

          <motion.span
            className="block font-allura leading-none font text-[clamp(4rem,7vw,11rem)]"
            initial={{ opacity: 0, filter: 'blur(18px)' }}
            animate={titleInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.28, duration: 0.45, ease: 'easeOut' }}
          >
            Dattes
          </motion.span>
        </h2>

        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-8 gap-y-32 sm:gap-y-42">
          {products.map((product, i) => (
            <ProductCard key={i} product={product}/>
          ))}
        </div>
      </div>
    </section>
  );
}