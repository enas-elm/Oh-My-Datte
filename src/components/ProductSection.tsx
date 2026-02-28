'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion'
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
      title: "L'Intrépide",
      subtitle: 'Noir · Cacahuète',
      description:
        'L’Intrépide ne demande pas la permission. Sous sa carapace de chocolat noir intense, elle cache un cœur de beurre de cacahuète généreux et des éclats croquants qui bousculent les codes.\n\nC’est la datte des audacieux : directe, efficace, et terriblement addictive.',
    },
    {
      imagePath: '/images/datte-5-shadow.png',
      title: "L'Irrésistible",
      subtitle: 'Blanc · Pistache',
      description:
        'Elle entre en scène et le temps s’arrête. Vêtue d’un velouté de chocolat blanc et d’un cœur fondant à la pistache, L\'Irrésistible mise sur l’éclat.\n\nDouce mais affirmée, elle offre un équilibre précieux entre luxe et délicatesse. On ne lui résiste pas, on succombe.',
    },
    {
      imagePath: '/images/datte-4-shadow.png',
      title: "Le Cool Kid",
      subtitle: 'Noir · Praliné',
      description:
        'L’allure chic, l’esprit libre. Le Cool Kid revisite le classique avec un praliné noisette-amande qui fond en bouche. Enrobé de chocolat noir, il impose son style sans en faire trop.\n\nC’est la gourmandise chill par excellence, celle qu’on invite à toutes les occasions.',
    },
    {
      imagePath: '/images/datte-6-shadow.png',
      title: "Le Sage",
      subtitle: 'Noir · Coco',
      description:
        'L’équilibre trouvé entre l’intensité du cacao et la sérénité des îles. Le Sage apaise le caractère du beurre de cacahuète par un voile léger de noix de coco râpée.\n\nUn voyage intérieur, posé et réfléchi, pour ceux qui cherchent la profondeur sous la gourmandise.',
    },
  ];

  return (
    <section className="section-scroll-mt my-32 py-52 sm:py-80 relative text-vanilla overflow-hidden">
      <Image
        id='vos-dattes'
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
  )
}
