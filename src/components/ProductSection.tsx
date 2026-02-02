import Image from 'next/image';
import React from 'react';

export default function ProductSection() {

  return (
    <section className="my-64 container mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-[clamp(1.5rem,4vw,7rem)] leading-snug">
          <span className="uppercase">Rencontrez vos</span>
          <span className="font-allura">Dattes</span>
        </h2>
      </div>
      <div className="grid grid-flow-col  grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2">
        <div className='flex flex-col justify-center'>
            <Image src="" alt=""/>
            <h4 className='uppercase'>Product Title</h4>
            <p>Product subtitle</p>
            <p>Product description</p>
        </div>

        <div className='flex flex-col justify-center'>
            <Image src="" alt=""/>
            <h4 className='uppercase'>Product Title</h4>
            <p>Product subtitle</p>
            <p>Product description</p>
        </div>

        <div className='flex flex-col justify-center'>
            <Image src="" alt=""/>
            <h4 className='uppercase'>Product Title</h4>
            <p>Product subtitle</p>
            <p>Product description</p>
        </div>

        <div className='flex flex-col justify-center'>
            <Image src="" alt=""/>
            <h4 className='uppercase'>Product Title</h4>
            <p>Product subtitle</p>
            <p>Product description</p>
        </div>
      </div>
    </section>
  );
}
