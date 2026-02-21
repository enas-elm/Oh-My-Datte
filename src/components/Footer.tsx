import Image from "next/image"
import React from "react"

export default function Footer() {
  return (
    <footer className="text-vanilla relative container mx-auto px-4 sm:px-6 lg:px-12 rounded-t-2xl shadow-footer overflow-hidden">

      {/* Overlay beige avec trou */}
      <div
        className="absolute inset-0 bg-choco-500 pointer-events-none z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
          WebkitMaskRepeat: "no-repeat, no-repeat",
          WebkitMaskPosition: "0 0, center 56px",
          WebkitMaskSize: "100% 100%, 215px 104px",
          WebkitMaskComposite: "source-out",
          maskImage:
            "linear-gradient(#000 0 0), url(/images/lips-cutout.svg)",
          maskRepeat: "no-repeat, no-repeat",
          maskPosition: "0 0, center 56px",
          maskSize: "100% 100%, 215px 104px",
          maskComposite: "exclude",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-20 py-8 pt-24 ">
          
          <div className="flex flex-row justify-center xl:justify-normal sm:flex-col xl:flex-row gap-[10cqw] sm:gap-4 xl:gap-16 min-w-fit w-full flex-1">
            <div className="flex items-center gap-2 md:gap-4">
              <Image
                src="/images/instagram.svg"
                width={32}
                height={32}
                className="scale-75 md:scale-100"
                alt="Instagram"
              />
              <span className="uppercase md:text-lg">Instagram</span>
            </div>
          </div>

          {/* Réserve la place */}
          <div aria-hidden className="shrink-0 w-[215px] h-[104px]" />

          <address className="flex-1 lg:text-lg not-italic">
            Contactez : <a className="font-bold underline" href="mailto:ohmydate@gmail.com">ohmydate@gmail.com</a> pour toute question !

          </address>
        </div>

        <div className="bg-vanilla pointer-events-none select-none h-[1px] w-full" />
        <div className="font-times text-center text-[14cqw] leading-snug max-w-full overflow-hidden whitespace-nowrap">
          On se revoit ?
        </div>
      </div>
    </footer>
  )
}