import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className='container'>
        <div>
            <div>
                <Image src="" alt=""/>
                <span className='uppercase'>Instagram</span>
            </div>
            <div>
                <Image src="" alt=""/>
                <span className='uppercase'>TikTok</span>
            </div>
            <Image src="" alt=""/>
            <address>
                Contactez : <a className='font-bold' href="mailto:ohmydate@gmail.com">ohmydate@gmail.com</a> pour toute question !
            </address>
        </div>
        <div className='bg-choco-500 pointer-events-none select-none h-[1px] w-full'/>
        <span className='text-center'>On se revoit ?</span>
    </footer>
  )
}
