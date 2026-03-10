"use client"

import Image from "next/image"
import { motion } from "motion/react"
import type { QualityState } from "./QualitySection"

type DesktopRefs = {
    pinnedRef: React.RefObject<HTMLDivElement | null>
    brushRef: React.RefObject<HTMLDivElement | null>
    postPinRef: React.RefObject<HTMLDivElement | null>

    leftText1Ref: React.RefObject<HTMLDivElement | null>
    rightText1Ref: React.RefObject<HTMLDivElement | null>
    topImg1Ref: React.RefObject<HTMLDivElement | null>
    bottomImg1Ref: React.RefObject<HTMLDivElement | null>

    leftText2Ref: React.RefObject<HTMLDivElement | null>
    rightText2Ref: React.RefObject<HTMLDivElement | null>
    topImg2Ref: React.RefObject<HTMLDivElement | null>
    bottomImg2Ref: React.RefObject<HTMLDivElement | null>

    dot1Ref: React.RefObject<HTMLDivElement | null>
    dot2Ref: React.RefObject<HTMLDivElement | null>
}

export default function QualitySectionDesktop({ states, refs }: { states: QualityState[]; refs: DesktopRefs }) {
    const {
        pinnedRef,
        brushRef,
        postPinRef,
        leftText1Ref,
        rightText1Ref,
        topImg1Ref,
        bottomImg1Ref,
        leftText2Ref,
        rightText2Ref,
        topImg2Ref,
        bottomImg2Ref,
        dot1Ref,
        dot2Ref,
    } = refs

    return (
        <section id="qualite" className="hidden md:block my-32 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex w-full justify-between mx-auto items-center gap-8 sm:gap-20 mb-0">
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
                        className="block whitespace-nowrap"
                    >
                        Des produits
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                        className="block"
                    >
                        de qualité
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

            {/* Pinned area */}
            <div ref={pinnedRef} className="h-screen relative overflow-hidden">
                {/* dots */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
                    <div ref={dot1Ref} className="w-2 h-2 rounded-full bg-choco-500 opacity-30" />
                    <div ref={dot2Ref} className="w-2 h-2 rounded-full bg-choco-500 opacity-30" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-20">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-10 xl:gap-16 w-full">
                        {/* LEFT */}
                        <div className="relative min-h-[40vh] flex items-center justify-end">
                            <div ref={leftText1Ref} className="absolute inset-0 flex items-center justify-end">
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                                >
                                    <div className="space-y-4 max-w-md">
                                        <span className="text-xs tracking-[0.3em] uppercase text-choco-100 block">01 / 04</span>
                                        <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">{states[0].left.title}</h4>
                                        {states[0].left.paragraphs.map((p, j) => (
                                            <p key={j} className="text-base lg:text-lg leading-relaxed">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            <div ref={leftText2Ref} className="absolute inset-0 flex items-center justify-end">
                                <div className="space-y-4 max-w-md">
                                    <span className="text-xs tracking-[0.3em] uppercase text-choco-100 block">03 / 04</span>
                                    <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">{states[1].left.title}</h4>
                                    {states[1].left.paragraphs.map((p, j) => (
                                        <p key={j} className="text-base lg:text-lg leading-relaxed">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CENTER */}
                        <div ref={brushRef} className="relative flex items-center justify-center w-[200px] lg:w-[260px] h-[75vh] overflow-hidden">
                            <Image
                                src="/images/green-brush-bg.svg"
                                alt=""
                                width={200}
                                height={697}
                                className="absolute h-full w-auto pointer-events-none select-none"
                            />

                            <div ref={topImg1Ref} className="absolute inset-0 z-10 flex items-center justify-center scale-[1.35]">
                                <Image src={states[0].topImage.src} alt={states[0].topImage.alt} width={states[0].topImage.w} height={states[0].topImage.h} className="object-contain drop-shadow-lg" />
                            </div>

                            <div ref={topImg2Ref} className="absolute inset-0 z-10 flex items-center justify-center scale-[1.35]">
                                <Image
                                    src={states[1].topImage.src}
                                    alt={states[1].topImage.alt}
                                    width={states[1].topImage.w}
                                    height={states[1].topImage.h}
                                    className="object-contain drop-shadow-lg"
                                    style={{ rotate: `${states[1].topImage.rotation ?? 0}deg` }}
                                />
                            </div>

                            <div ref={bottomImg1Ref} className="absolute inset-0 z-10 flex items-center justify-center scale-[1.35]">
                                <Image src={states[0].bottomImage.src} alt={states[0].bottomImage.alt} width={states[0].bottomImage.w} height={states[0].bottomImage.h} className="object-contain drop-shadow-lg" />
                            </div>

                            <div ref={bottomImg2Ref} className="absolute inset-0 z-10 flex items-center justify-center scale-[1.35]">
                                <Image
                                    src={states[1].bottomImage.src}
                                    alt={states[1].bottomImage.alt}
                                    width={states[1].bottomImage.w}
                                    height={states[1].bottomImage.h}
                                    className="object-contain drop-shadow-lg"
                                    style={{ rotate: `${states[1].bottomImage.rotation ?? 0}deg` }}
                                />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative min-h-[40vh] flex items-center">
                            <div ref={rightText1Ref} className="absolute inset-0 flex items-center">
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                                >
                                    <div className="space-y-4 max-w-md">
                                        <span className="text-xs tracking-[0.3em] uppercase text-choco-100 block">02 / 04</span>
                                        <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">{states[0].right.title}</h4>
                                        {states[0].right.paragraphs.map((p, j) => (
                                            <p key={j} className="text-base lg:text-lg leading-relaxed">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            <div ref={rightText2Ref} className="absolute inset-0 flex items-center">
                                <div className="space-y-4 max-w-md">
                                    <span className="text-xs tracking-[0.3em] uppercase text-choco-100 block">04 / 04</span>
                                    <h4 className="uppercase text-[clamp(1.125rem,2.5vw,1.5rem)]">{states[1].right.title}</h4>
                                    {states[1].right.paragraphs.map((p, j) => (
                                        <p key={j} className="text-base lg:text-lg leading-relaxed">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* post-pin marker */}
            <div ref={postPinRef} className="h-0" aria-hidden="true" />
        </section>
    )
}