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
    {imagePath: "/images/datte-2.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-5.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-4.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."},
    {imagePath: "/images/datte-6.png", title: "L'Irrésistible", subtitle: "Blanc · Pistache", description: "Chocolat blanc ivoire et pistaches finement broyées. Douce, élégante — la star qui fait chavirer les cœurs."}
  ]

  return (
    <section className="my-64 container mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-[clamp(1.5rem,4vw,7rem)] leading-snug">
          <span className="uppercase block">Rencontrez vos</span>
          <span className="font-allura leading-none font text-[clamp(1.5rem,7vw,11rem)]">Dattes</span>
        </h2>
      </div>
      <div className="grid grid-flow-col  grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2">
        <div className='flex flex-col items-center'>
            <Image src={products[0].imagePath} alt={`Datte au ${products[0].subtitle}`} width={210} height={210}/>
            <h4 className='uppercase'>{products[0].title}</h4>
            <p>{products[0].subtitle}</p>
            <p>{products[0].description}</p>
        </div>

        <div className='flex flex-col items-center'>
            <Image src={products[1].imagePath} alt={`Datte au ${products[1].subtitle}`} width={220} height={220} className='rotate-45'/>
            <h4 className='uppercase'>{products[1].title}</h4>
            <p>{products[1].subtitle}</p>
            <p>{products[1].description}</p>
        </div>

        <div className='flex flex-col items-center'>
            <Image src={products[2].imagePath} alt={`Datte au ${products[2].subtitle}`} width={200} height={200}/>
            <h4 className='uppercase'>{products[2].title}</h4>
            <p>{products[2].subtitle}</p>
            <p>{products[2].description}</p>
        </div>

        <div className='flex flex-col items-center'>
            <Image src={products[3].imagePath} alt={`Datte au ${products[3].subtitle}`} width={200} height={200}/>
            <h4 className='uppercase'>{products[3].title}</h4>
            <p>{products[3].subtitle}</p>
            <p>{products[3].description}</p>
        </div>
      </div>
    </section>
  );
}
