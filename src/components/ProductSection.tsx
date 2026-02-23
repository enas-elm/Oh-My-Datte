'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Product {
  imagePath: string
  title: string
  subtitle: string
  description: string
}

export default function ProductSection() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-8% 0px' })

  const products: Product[] = [
    {imagePath: "/images/intrepide-brush.png", title: "L'Intrépide", subtitle: "Noir · Cacahuète", description: "L'Intrépide ne demande pas la permission. Sous sa carapace de chocolat noir intense, elle cache un cœur de beurre de cacahuète généreux et des éclats croquants qui bousculent les codes.\n\nC'est la datte des audacieux : directe, efficace, et terriblement addictive."},
    {imagePath: "/images/irresistible-brush.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Elle entre en scène et le temps s'arrête. Vêtue d'un velouté de chocolat blanc et d'un cœur fondant à la pistache, L'Irrésistible mise sur l'éclat.\n\nDouce mais affirmée, elle offre un équilibre précieux entre luxe et délicatesse. On ne lui résiste pas, on succombe."},
    {imagePath: "/images/cool-kid-brush.png", title: "Le Cool Kid", subtitle: "Noir · Praliné", description: "L'allure chic, l'esprit libre. Le Cool Kid revisite le classique avec un praliné noisette-amande qui fond en bouche. Enrobé de chocolat noir, il impose son style sans en faire trop.\n\nC'est la gourmandise chill par excellence, celle qu'on invite à toutes les occasions."},
    {imagePath: "/images/sage-brush.png", title: "Le Sage", subtitle: "Noir · Coco", description: "L'équilibre trouvé entre l'intensité du cacao et la sérénité des îles. Le Sage apaise le caractère du beurre de cacahuète par un voile léger de noix de coco râpée.\n\nUn voyage intérieur, posé et réfléchi, pour ceux qui cherchent la profondeur sous la gourmandise."}
  ]

  return (
    <section id='vos-dattes' className="section-scroll-mt my-32 py-52 sm:py-80 relative text-vanilla overflow-hidden">
      <Image
        src="/images/product-bg.svg"
        alt=""
        fill
        className="scale-x-150 translate-y-[4%] object-cover z-0"
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <h2 className="text-[clamp(2rem,4vw,7rem)] leading-snug mb-16 sm:mb-28">
          <span className="uppercase block">Rencontrez vos</span>
          <span className="font-allura leading-none text-[clamp(4rem,8vw,12rem)]">Dattes</span>
        </h2>

        <div ref={gridRef} className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-evenly gap-8 lg:gap-y-12">
          {products.map((product, i) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex w-full sm:w-[calc(50%-1rem)] sm:max-w-md"
            >
              <div className="relative flex flex-col bg-beige/95 backdrop-blur-sm rounded-[1.25rem] overflow-hidden
                            text-choco-700 border border-transparent w-full">

                {/* Index number */}
                <span className="absolute top-4 left-5 font-times text-choco-100/25 text-xs tracking-[0.25em]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Product image */}
                <div className="pt-6 px-6 flex justify-center">
                  <div>
                    <Image
                      src={product.imagePath}
                      alt={`Datte au ${product.subtitle}`}
                      width={300}
                      height={300}
                      className='object-contain aspect-square drop-shadow-md'
                    />
                  </div>
                </div>

                {/* Ornamental divider */}
                <div className="flex items-center justify-center gap-4 px-10 my-5">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-choco-100/20" />
                  <svg width="10" height="10" viewBox="0 0 18 18" className="text-gold-600/70 shrink-0" aria-hidden="true">
                    <path d="M9 0 L11.5 6.5 L18 9 L11.5 11.5 L9 18 L6.5 11.5 L0 9 L6.5 6.5 Z" fill="currentColor" />
                  </svg>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-choco-100/20" />
                </div>

                {/* Content */}
                <div className="px-7 sm:px-9 pb-10 text-center flex-1 flex flex-col">
                  <h4 className='uppercase text-[clamp(1.125rem,2vw,1.5rem)] tracking-[0.08em] leading-tight'>
                    {product.title}
                  </h4>
                  <p className='text-[0.7rem] sm:text-xs text-choco-100 tracking-[0.2em] uppercase mt-1.5 mb-5'>
                    {product.subtitle}
                  </p>
                  <p className="text-sm md:text-[0.935rem] leading-[1.85] whitespace-pre-line text-choco-500/85">
                    {product.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
