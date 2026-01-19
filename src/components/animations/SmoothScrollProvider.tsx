'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time: number) {
      lenis.raf(time)
      gsap.ticker.tick()
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.killAll()
    }
  }, [])

  return <>{children}</>
}
