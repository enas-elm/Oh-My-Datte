"use client"

import Image from "next/image"
import { motion } from "motion/react"
import type { QualityState } from "./QualitySection"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)


export default function QualitySectionMobile({ states }: { states: QualityState[] }) {
    const blocks = [
        { label: "01 / 04", ...states[0].left },
        { label: "02 / 04", ...states[0].right },
        { label: "03 / 04", ...states[1].left },
        { label: "04 / 04", ...states[1].right },
    ]
    const brushRef = useRef<HTMLDivElement>(null)

    // images state 1
    const topImg1Ref = useRef<HTMLDivElement>(null)
    const bottomImg1Ref = useRef<HTMLDivElement>(null)

    // images state 2
    const topImg2Ref = useRef<HTMLDivElement>(null)
    const bottomImg2Ref = useRef<HTMLDivElement>(null)

    // trigger placé juste avant le bloc 03/04
    const switchTriggerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const brush = brushRef.current
        if (!brush) return

        const mm = gsap.matchMedia()

        mm.add("(max-width: 767px)", () => {
            const h = brush.offsetHeight
            const entryY = h * 0.6
            const exitY = -h * 0.6
            const topRest = -h * 0.12
            const bottomRest = h * 0.12

            const top1 = topImg1Ref.current
            const bottom1 = bottomImg1Ref.current
            const top2 = topImg2Ref.current
            const bottom2 = bottomImg2Ref.current

            if (!top1 || !bottom1 || !top2 || !bottom2) return

            // init (comme desktop)
            gsap.set([top2, bottom2], { y: entryY, autoAlpha: 0 })
            gsap.set([top1, bottom1], { y: entryY, autoAlpha: 0 })

            // --- Entrée state 1 (pré-entrée comme desktop) ---
            gsap.to(top1, {
                y: topRest,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: brush,
                    start: "top 70%",
                    end: "top 35%",
                    scrub: 0.6,
                },
            })

            gsap.to(bottom1, {
                y: bottomRest,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: brush,
                    start: "top 70%",
                    end: "top 35%",
                    scrub: 0.6,
                },
            })

            // --- Switch state 1 -> state 2 (timeline desktop-style) ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: switchTriggerRef.current ?? brush,
                    start: "top 70%",
                    end: "top 30%",
                    scrub: 0.8,
                },
            })

            // EXIT state 1 (vers le haut)
            tl.to(top1, { y: exitY, autoAlpha: 0, ease: "power2.in" }, 0)
            tl.to(bottom1, { y: exitY, autoAlpha: 0, ease: "power2.in" }, 0.05)

            // ENTER state 2 (depuis le bas vers rest)
            tl.to(top2, { y: topRest, autoAlpha: 1, ease: "power2.out" }, 0.1)
            tl.to(bottom2, { y: bottomRest, autoAlpha: 1, ease: "power2.out" }, 0.15)

            return () => {
                tl.scrollTrigger?.kill()
                tl.kill()
                ScrollTrigger.getAll().forEach((t) => {
                })
            }
        })

        return () => mm.revert()
    }, [])
    return (
        <section id="qualite" className="md:hidden my-20 container mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex w-full justify-between mx-auto items-center gap-8 sm:gap-20 mb-24">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ originX: 1 }}
                    className="bg-choco-500 pointer-events-none select-none h-[1px] w-full"
                />
                <h2 className="uppercase text-center text-[clamp(2rem,4vw,7rem)] leading-snug">
                    <motion.span
                        initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" as const }}
                        className="block"
                    >
                        Des&nbsp;produits
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                        className="block"
                    >
                        de&nbsp;qualités
                    </motion.span>
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="bg-choco-500 pointer-events-none select-none h-[1px] w-full"
                />
            </div>

            {/* Grid (ta version mobile) */}
            <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-y-16 mx-auto">
                {blocks.map((b, i) => (
                    <div key={i}>
                        {i === 2 && <div ref={switchTriggerRef} className="h-1" aria-hidden="true" />}

                        {/* 👉 TRIGGER EXACTEMENT ICI */}
                        {i === 2 && (
                            <div
                                ref={switchTriggerRef}
                                className="h-1"
                                aria-hidden="true"
                            />
                        )}

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                        >
                            <h4 className="uppercase text-[clamp(1.125rem,4vw,1.75rem)]">
                                {b.title}
                            </h4>

                            {b.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </motion.div>

                    </div>
                ))}

                {/* Image mobile sticky — avec transitions desktop-style */}
                <div className="row-span-2 sticky top-1/3 self-center overflow-hidden">
                    <div
                        ref={brushRef}
                        className="relative bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain w-[260px] h-[420px]"
                    >
                        <div ref={topImg1Ref} className="absolute inset-x-0 top-[12%] z-10 flex justify-center">
                            <Image src="/images/datte-1.png" alt="" width={160} height={224} className="object-contain" />
                        </div>

                        <div ref={bottomImg1Ref} className="absolute inset-x-0 bottom-[12%] z-10 flex justify-center">
                            <Image src="/images/pistachio.png" alt="" width={152} height={152} className="object-contain" />
                        </div>

                        <div ref={topImg2Ref} className="absolute inset-x-0 top-[12%] z-10 flex justify-center">
                            <Image src="/images/chocolate.png" alt="" width={200} height={252} className="object-contain -rotate-[20deg]" />
                        </div>

                        <div ref={bottomImg2Ref} className="absolute inset-x-0 bottom-[12%] z-10 flex justify-center">
                            <Image src="/images/datte-2-shadow.png" alt="" width={160} height={240} className="object-contain rotate-[10deg]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}