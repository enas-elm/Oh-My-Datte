import { Instagram } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 sm:px-6 lg:px-12 bg-beige rounded-t-3xl shadow-footer">
        <div className="flex items-center justify-between py-8 pt-24">
            <div className="flex items-center gap-4">
                <Image src="/images/instagram.svg" width={32} height={32} alt=""/>
                <span className="uppercase text-lg">Instagram</span>
            </div>
            <div className="flex items-center gap-4">
                <Image src="/images/tiktok.svg" width={32} height={32} alt=""/>
                <span className="uppercase text-lg">TikTok</span>
            </div>
            <Image src="/images/lips.svg" width={200} height={96} alt=""/>
            <address className='text-lg'>
                Contactez : <a className="font-bold" href="mailto:ohmydate@gmail.com">ohmydate@gmail.com</a> pour toute question !
            </address>
        </div>
        <div className="bg-choco-500 pointer-events-none select-none h-[1px] w-full"/>
        <div className="text-center text-[clamp(1.5rem,80vw,13rem)] leading-snug">On se revoit ?</div>
    </footer>
  )
}
