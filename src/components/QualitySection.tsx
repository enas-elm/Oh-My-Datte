import Image from 'next/image';

export default function QualitySection() {
  return (
    <section className='my-64 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex w-full justify-between mx-auto items-center gap-8 sm:gap-20 mb-24'>
            <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
            <h2 className='uppercase text-center text-[clamp(1.5rem,4vw,7rem)] leading-snug'>Des&nbsp;produits de&nbsp;qualités</h2>
            <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
        </div>
        <div className='grid grid-flow-col grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-y-16 md:gap-y-32 lg:gap-y-42 xl:gap-y-58 gap-x-10 lg:gap-x-24 mx-auto'>
          <div className='space-y-2'>
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>
          
          <div className='space-y-2'>
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>

          <div className='row-span-2 md:row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain space-y-16 lg:space-y-12 hidden md:flex flex-col items-center justify-center'>
            <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain'/>
            <Image src="/images/chocolate.png" alt="" width={200} height={252} className='object-contain -rotate-[20deg]'/>
          </div>

          <div className='space-y-2'>
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>

          <div className='space-y-2'>
            <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Naturel</h4>
            <p className='md:text-lg'>Chic et décontracté : chocolat noir et cœur praliné. Apporte la bonne énergie à chaque bouchée.</p>
            <p className='md:text-lg'>Manteau chocolat noir, cœur peanut butter, éclats croquants. Simple, généreuse et audacieuse.</p>
          </div>

          {/* Image mobile */}
          <div className='row-span-2 md:row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain space-y-16 lg:space-y-12 flex md:hidden flex-col items-center justify-center overflow-hidden sticky top-1/3 self-center'>
            <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain'/>
            <Image src="/images/chocolate.png" alt="" width={200} height={252} className='object-contain -rotate-[20deg]'/>
          </div>
        </div>
    </section>
  )
}
