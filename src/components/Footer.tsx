import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className="container @container mx-auto px-4 sm:px-6 lg:px-12 bg-beige rounded-t-3xl shadow-footer">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-20 py-8 pt-24">
            <div className='flex flex-row justify-center xl:justify-normal sm:flex-col xl:flex-row gap-[10cqw] sm:gap-4 xl:gap-16 min-w-fit w-full flex-1'>
                <div className="flex items-center gap-2 md:gap-4">
                    <Image src="/images/instagram.svg" width={32} height={32} className="scale-75 md:scale-100" alt=""/>
                    <span className="uppercase md:text-lg">Instagram</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <Image src="/images/tiktok.svg" width={32} height={32} className="scale-75 md:scale-100" alt=""/>
                    <span className="uppercase md:text-lg">TikTok</span>
                </div>
            </div>
            <Image src="/images/lips.svg" width={200} height={96} alt="" className=' order-first sm:order-none scale-75 md:scale-100'/>
            <address className='flex-1 lg:text-lg'>
                Contactez : <a className="font-bold" href="mailto:ohmydate@gmail.com">ohmydate@gmail.com</a> pour toute question !
            </address>
        </div>
        <div className="bg-choco-500 pointer-events-none select-none h-[1px] w-full"/>
        <div className="text-center text-[17cqw] leading-snug max-w-full overflow-hidden whitespace-nowrap">On se revoit ?</div>
    </footer>
  )
}
