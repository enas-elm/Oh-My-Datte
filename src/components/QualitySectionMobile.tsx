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
        { ...states[0].left },
        { ...states[0].right },
        { ...states[1].left },
        { ...states[1].right },
    ]
    const set1Ref = useRef<HTMLDivElement>(null)
    const set2Ref = useRef<HTMLDivElement>(null)

    // trigger qui correspond au “passage” vers la 2e moitié (03/04)
    const switchTriggerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const set1 = set1Ref.current
        const set2 = set2Ref.current
        const trig = switchTriggerRef.current
        if (!set1 || !set2 || !trig) return

        const mm = gsap.matchMedia()

        mm.add("(max-width: 767px)", () => {
            // état initial = state1 visible
            gsap.set(set1, { autoAlpha: 1, y: 0, filter: "blur(0px)" })
            gsap.set(set2, { autoAlpha: 0, y: 12, filter: "blur(6px)" })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trig,
                    start: "top 70%",   // quand on arrive au bloc 03/04
                    end: "top 35%",     // transition terminée un peu plus haut
                    scrub: 0.8,
                },
            })

            // "EXIT state1" + "ENTER state2" (comme desktop)
            tl.to(set1, { autoAlpha: 0, y: -12, filter: "blur(6px)", ease: "power1.out" }, 0)
            tl.to(set2, { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power1.out" }, 0)

            return () => {
                tl.scrollTrigger?.kill()
                tl.kill()
            }
        })

        return () => mm.revert()
    }, [])

    const state1Top = states[0].topImage
    const state1Bottom = states[0].bottomImage
    const state2Top = states[1].topImage
    const state2Bottom = states[1].bottomImage

    return (
        <section id="qualite" className="md:hidden section-scroll-mt my-32 container mx-auto px-4 sm:px-6 overflow-x-clip">
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
            <div className="grid grid-flow-col grid-cols-[3fr_2fr] grid-rows-4 gap-y-16 mx-auto">
                {blocks.map((b, i) => (
                    <div key={i}>

                        {/* 👉 TRIGGER EXACTEMENT ICI */}
                        {i === 2 && (
                            <div
                                ref={switchTriggerRef}
                                className="h-1"
                                aria-hidden="true"
                            />
                        )}

                        <div className="space-y-2">
                            <h4 className="uppercase text-[clamp(1.125rem,4vw,1.75rem)]">
                                {b.title}
                            </h4>

                            {b.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                    </div>
                ))}

                <div className="row-span-4 sticky top-1/3 self-start justify-self-end -mr-10">
                    <div className="relative bg-[url(/images/green-brush-bg.svg)] bg-no-repeat bg-center bg-contain w-[200px] h-[323px]">
                        {/* STATE 1 : datte-1 + pistachio */}
                        <div ref={set1Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-12">
                            <Image
                                src={state1Top.src}
                                alt={state1Top.alt}
                                width={123}
                                height={172}
                                className="object-contain"
                                style={{ rotate: `${state1Top.rotation ?? 0}deg` }}
                            />
                            <Image
                                src={state1Bottom.src}
                                alt={state1Bottom.alt}
                                width={100}
                                height={100}
                                className="object-contain"
                                style={{ rotate: `${state1Bottom.rotation ?? 0}deg` }}
                            />
                        </div>

                        {/* STATE 2 : chocolate + datte-2-shadow */}
                        <div ref={set2Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-12">
                            <Image
                                src={state2Top.src}
                                alt={state2Top.alt}
                                width={123}
                                height={154}
                                className="object-contain"
                                style={{ rotate: `${state2Top.rotation ?? 0}deg` }}
                            />
                            <Image
                                src={state2Bottom.src}
                                alt={state2Bottom.alt}
                                width={123}
                                height={185}
                                className="object-contain"
                                style={{ rotate: `${state2Bottom.rotation ?? 0}deg` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}