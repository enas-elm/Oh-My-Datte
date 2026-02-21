import Image from 'next/image';
import React from 'react';

interface Product {
    imagePath: string,
    title: string,
    subtitle: string,
    description: string
}

export default function ProductSection() {
  const products: Product[] = [
    {imagePath: "/images/datte-2-shadow.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-5-shadow.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-4-shadow.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-6-shadow.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."}
  ]

  return (
    <section className="my-64 py-52 sm:py-80 relative text-vanilla overflow-hidden">
        <Image 
          src="/images/product-bg.svg" 
          alt="" 
          fill
          className="scale-x-150 translate-y-[4%] object-cover z-0"
        />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <h2 className="text-[clamp(1.5rem,4vw,7rem)] leading-snug mb-16 sm:mb-28">
            <span className="uppercase block">Rencontrez vos</span>
            <span className="font-allura leading-none font text-[clamp(4rem,8vw,12rem)]">Dattes</span>
        </h2>
        <div className="grid grid-flow-col grid-cols-4 gap-8 gap-y-32 sm:gap-y-42">
            <div className='flex flex-col items-center max-w-72 mx-auto'>
                <Image src={products[0].imagePath} alt={`Datte au ${products[0].subtitle}`} width={200} height={200} className='object-contain aspect-square mb-8'/>
                <h4 className='uppercase text-[clamp(1.125rem,4vw,1.5rem)]'>{products[0].title}</h4>
                <p className='text-sm md:text-base mb-6'>{products[0].subtitle}</p>
                <p className="text-center md:text-lg">{products[0].description}</p>
            </div>

            <div className='flex flex-col items-center max-w-72 mx-auto'>
                <Image src={products[1].imagePath} alt={`Datte au ${products[1].subtitle}`} width={200} height={200} className='scale-105 object-contain aspect-square mb-8'/>
                <h4 className='uppercase text-[clamp(1.125rem,4vw,1.5rem)]'>{products[1].title}</h4>
                <p className='text-sm md:text-base mb-6'>{products[1].subtitle}</p>
                <p className="text-center md:text-lg">{products[1].description}</p>
            </div>

            <div className='flex flex-col items-center max-w-72 mx-auto'>
                <Image src={products[2].imagePath} alt={`Datte au ${products[2].subtitle}`} width={200} height={200} className='scale-105 object-contain aspect-square mb-8'/>
                <h4 className='uppercase text-[clamp(1.125rem,4vw,1.5rem)]'>{products[2].title}</h4>
                <p className='text-sm md:text-base mb-6'>{products[2].subtitle}</p>
                <p className="text-center md:text-lg">{products[2].description}</p>
            </div>

            <div className='flex flex-col items-center max-w-72 mx-auto'>
                <Image src={products[3].imagePath} alt={`Datte au ${products[3].subtitle}`} width={200} height={200} className='object-contain aspect-square mb-8'/>
                <h4 className='uppercase text-[clamp(1.125rem,4vw,1.5rem)]'>{products[3].title}</h4>
                <p className='text-sm md:text-base mb-6'>{products[3].subtitle}</p>
                <p className="text-center md:text-lg">{products[3].description}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
