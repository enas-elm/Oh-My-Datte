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
        {products.map((product)=>(
            <div className='flex flex-col justify-center' key={product.title}>
                <Image src={product.imagePath} alt={`Datte au ${product.subtitle}`} width={200} height={200}/>
                <h4 className='uppercase'>{product.title}</h4>
                <p>{product.subtitle}</p>
                <p>{product.description}</p>
            </div>
        ))}
      </div>
    </section>
  );
}
