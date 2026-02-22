import Image from "next/image"
import React from "react"

export default function Footer() {
  return (
    <footer className="text-vanilla relative container mx-auto px-4 sm:px-6 lg:px-12 rounded-t-2xl shadow-footer overflow-hidden [--lips-y:120px] sm:[--lips-y:100px]">

      {/* Overlay beige avec trou */}
      <div
        className="absolute inset-0 bg-choco-500 pointer-events-none z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
          WebkitMaskRepeat: "no-repeat, no-repeat",
          WebkitMaskPosition: "0 0, center var(--lips-y)",
          WebkitMaskSize: "100% 100%, 215px 104px",
          WebkitMaskComposite: "source-out",
          maskImage:
            "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
          maskRepeat: "no-repeat, no-repeat",
          maskPosition: "0 0, center var(--lips-y)",
          maskSize: "100% 100%, 215px 104px",
          maskComposite: "exclude",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-20 py-12 sm:py-24">
          
          <div className="flex flex-row justify-center xl:justify-normal sm:flex-col xl:flex-row gap-[10cqw] sm:gap-4 xl:gap-16 min-w-fit w-full flex-1">
            <a 
                href="https://www.tiktok.com/@ohmydatte"  
                target="_blank"  
                className="flex items-center gap-2 md:gap-4  group cursor-pointer">
                    <Image src="/images/tiktok.svg" width={32} height={32} className="scale-75 md:scale-100" alt=""/>
                    <span className="uppercase md:text-lg animated-underline decoration-[1px]">TikTok</span>
            </a>
            <a 
              href="https://www.instagram.com/oh.my.datte" 
              target="_blank" 
              className="flex items-center gap-2 md:gap-4 group cursor-pointer"
            >
              <Image
                src="/images/instagram.svg"
                width={32}
                height={32}
                className="scale-75 md:scale-100"
                alt="Instagram"
              />
              <span className="uppercase md:text-lg animated-underline decoration-[1px]">Instagram</span>
            </a>
          </div>

          {/* Réserve la place */}
          <div aria-hidden className="shrink-0 w-[215px] h-[104px]" />

          <address className="flex-1 lg:text-lg not-italic">
            Pour toute question, contactez <a className="font-bold animated-underline" href="mailto:ohmydate@gmail.com">ohmydate@gmail.com</a>

          </address>
        </div>

        <div className="bg-vanilla pointer-events-none select-none h-[1px] w-full" />
        <div className="font-times text-center text-[13cqw] leading-snug max-w-full overflow-hidden whitespace-nowrap my-6 sm:my-0">
          On se revoit ?
        </div>
      </div>
    </footer>
  )
}