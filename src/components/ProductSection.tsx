import Reveal from '@/components/animations/Reveal';
import { products } from '@/lib/dattes';
import { ProductCard } from './ProductCard';

export default function ProductSection() {
  return (
    <section
      id="dattes"
      aria-labelledby="dattes-titre"
      className="aplat-cacao section-ancre my-16 py-[calc(var(--bord)+4rem)] text-creme md:my-24 md:py-[calc(var(--bord)+6rem)]"
    >
      <div aria-hidden="true" className="aplat-cacao__fond">
        <span className="bord bord--haut" />
        <span className="corps" />
        <span className="bord bord--bas" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="dattes-titre" className="mb-20 text-center sm:mb-28">
          <Reveal as="span" blur={14} className="block text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.3] tracking-[0.02em]">
            Rencontrez vos
          </Reveal>
          <Reveal as="span" blur={18} delay={0.1} className="block font-script text-[clamp(4.5rem,7vw,7rem)] font-normal leading-none">
            Dattes
          </Reveal>
        </h2>

        <ul className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2 md:gap-y-32">
          {products.map((product, i) => (
            <li key={product.id}>
              <ProductCard product={product} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
