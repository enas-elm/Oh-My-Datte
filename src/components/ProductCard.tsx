import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';
import type { Product } from '@/lib/dattes';

// Inclinaison des tuiles pinceau, en boucle (tokens pinceau-1 à pinceau-4) :
// un geste presque à plat, à peine vivant
const BRUSH_ROTATIONS = ['-2deg', '1deg', '-1.5deg', '2deg'];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const rotation = BRUSH_ROTATIONS[index % BRUSH_ROTATIONS.length];

  return (
    <article className="mx-auto flex max-w-[30rem] flex-col items-center text-center">
      <Reveal blur={14} className="relative mb-10 flex h-[150px] w-[290px] items-center justify-center sm:h-[170px] sm:w-[340px] md:h-[150px] md:w-[290px] xl:h-[170px] xl:w-[340px]">
        {/* Tuile pinceau : un geste calme, beige uni */}
        <div
          aria-hidden="true"
          className="pinceau-tuile absolute -inset-x-8 -inset-y-2 bg-beige sm:-inset-x-12 md:-inset-x-8 xl:-inset-x-12"
          style={{ rotate: rotation }}
        />
        <Image
          src={product.imagePath}
          alt={product.imageAlt}
          width={200}
          height={200}
          sizes="190px"
          className="relative aspect-square w-[170px] object-contain drop-shadow-datte sm:w-[190px]"
        />
      </Reveal>

      <Reveal blur={14} delay={0.05}>
        <h3 className="text-[clamp(1.35rem,4vw,1.6rem)] font-semibold uppercase leading-tight tracking-[0.04em]">
          {product.title}
        </h3>
        <p className="mt-1 text-[0.95rem] text-nude-500">{product.subtitle}</p>
      </Reveal>

      <Reveal blur={14} delay={0.1} aria-hidden="true" className="my-5 h-[1.5px] w-8 rounded-full bg-nude-600" />

      <Reveal blur={14} delay={0.15}>
        <p className="text-[1.05rem] leading-[1.75] md:text-lg">{product.description}</p>
        <p className="mt-5 italic leading-[1.7] text-nude-300">{product.chute}</p>
      </Reveal>
    </article>
  );
}
