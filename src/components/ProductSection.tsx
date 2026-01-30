import Image from 'next/image';

export default function ProductSection() {
  return (
    <section className='my-64'>
        <div className='flex w-full justify-between mx-auto items-center gap-8 sm:gap-20 px-5 sm:px-12 mb-24'>
            <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
            <h2 className='uppercase text-center text-[clamp(1.5rem,4vw,7rem)] leading-snug w-96'>Des&nbsp;produits de&nbsp;qualités</h2>
            <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
        </div>
        <div className='grid grid-flow-col grid-cols-3 grid-rows-2 gap-y-58 gap-x-24 max-w-7xl mx-auto'>
          <div className='space-y-2'>
            <h4 className='uppercase text-3xl'>Naturel</h4>
            <p>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>
          
          <div className='space-y-2'>
            <h4 className='uppercase text-3xl'>Naturel</h4>
            <p>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>

          <div className='row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain p-16 space-y-8'>
            <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain mx-auto'/>
            <Image src="/images/chocolate.png" alt="" width={252} height={252} className='object-contain mx-auto'/>
          </div>

          <div className='space-y-2'>
            <h4 className='uppercase text-3xl'>Naturel</h4>
            <p>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>

          <div className='space-y-2'>
            <h4 className='uppercase text-3xl'>Naturel</h4>
            <p>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>
        </div>
    </section>
  )
}
