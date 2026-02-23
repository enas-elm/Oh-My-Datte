import Image from 'next/image';

export default function QualitySection() {
  return (
    <section id='qualite' className='section-scroll-mt my-32 container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex w-full justify-between mx-auto items-center gap-8 sm:gap-20 mb-24'>
        <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
        <h2 className='uppercase text-center text-[clamp(2rem,4vw,7rem)] leading-snug'>Des&nbsp;produits de&nbsp;qualités</h2>
        <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
      </div>
      <div className='grid grid-flow-col grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-y-16 md:gap-y-32 lg:gap-y-42 xl:gap-y-58 gap-x-10 lg:gap-x-24 mx-auto'>
        <div className='space-y-2'>
          <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Un Fruit d'Exception</h4>
          <p className='md:text-lg'>Symbole d'hospitalité et véritable concentré d'énergie, la datte est reconnue depuis des millénaires pour sa richesse en fibres et en antioxydants.</p>
          <p className='md:text-lg'>Nous sélectionnons rigoureusement des dattes deglet nour charnues et naturellement sucrées. Elles offrent une base saine et fondante, parfaite pour accueillir nos créations sans culpabilité.</p>
        </div>

        <div className='space-y-2'>
          <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Cœur Fondant et Naturel</h4>
          <p className='md:text-lg'>Praliné noisette, beurre de cacahuète, crème de pistache... Nos fourrages sont généreux et réalisés à partir d'oléagineux de premier choix.</p>
          <p className='md:text-lg'>L'objectif ? Laisser s'exprimer le goût vrai et puissant de chaque noix, pour un équilibre parfait en bouche.</p>
        </div>

        <div className='row-span-2 md:row-span-2 bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain space-y-16 lg:space-y-12 hidden md:flex flex-col items-center justify-center'>
          <Image src="/images/pistachio.png" alt="" width={152} height={152} className='object-contain'/>
          <Image src="/images/chocolate.png" alt="" width={200} height={252} className='object-contain -rotate-[20deg]'/>
        </div>

        <div className='space-y-2'>
          <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Enrobage Chocolat Premium</h4>
          <p className='md:text-lg'>Pour une signature élégante, nous enveloppons nos dattes d'une fine couche de chocolat de qualité supérieure.</p>
          <p className='md:text-lg'>Nous privilégions notamment le chocolat noir intense, apprécié pour sa richesse en cacao et ses bienfaits antioxydants, offrant un contraste croquant et raffiné qui sublime chaque bouchée.</p>
        </div>

        <div className='space-y-2'>
          <h4 className='uppercase text-[clamp(1.125rem,4vw,1.75rem)]'>Un écrin pour toutes vos occasions</h4>
          <p className='md:text-lg'>Que ce soit pour un instant de plaisir personnel avec votre café, une pause énergie saine pour les sportifs, ou un cadeau raffiné à offrir lors de repas festifs, nos dattes s'adaptent à toutes vos envies.</p>
          <p className='md:text-lg'>Oh My Datte, c'est l'assurance d'offrir une confiserie originale, visuellement belle et qui surprendra vos convives.</p>
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
