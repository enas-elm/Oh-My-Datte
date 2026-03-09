"use client";

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "./Button"
import { motion, AnimatePresence, useInView } from "motion/react"

const productImages = [
  "/images/product/img_0159.webp",
  "/images/product/img_0102.webp",
  "/images/product/img_0169.webp",
  "/images/product/img_0150.webp",
]

export default function ContactSection() {
  const textRef = useRef(null);
  const formRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: '-60px' });
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [quantity, setQuantity] = useState<string>("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [direction, setDirection] = useState(1)

  const nextImage = useCallback(() => {
    setDirection(1)
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextImage, 4000)
    return () => clearInterval(timer)
  }, [nextImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    try {
      const quantityNumber = Number(quantity)

      const safeQuantity = Math.min(
        500,
        Math.max(1, quantityNumber || 1)
      )

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          quantity: safeQuantity,
        }),
      })

      if (!res.ok) throw new Error("Erreur serveur")

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
      setQuantity("")

      setTimeout(() => setSuccess(false), 5000)

    } catch (error) {
      console.error("Erreur :", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className=" my-20 md:my-32 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-16">
        <div ref={textRef} className="flex-1">
          <motion.h2
            className="uppercase text-[clamp(1.5rem,4vw,7rem)] leading-snug mb-6 md:mb-10"
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={textInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            Vous avez craquez ?
          </motion.h2>

          <motion.p
            className="sm:text-lg"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={textInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
          >
            Petite attention, cadeau d’anniversaire, mariage ou encore événement d’entreprise, nos créations apportent une touche de raffinement inattendue à vos célébrations.
            <br />
            <br />
            <b>Découvrez nos élégants coffrets de 3 dattes. Un assortiment 100% personnalisable.</b>
          </motion.p>

          <motion.div
            className="mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentImage}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productImages[currentImage]}
                    alt="Coffret Oh My Datte"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={currentImage === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentImage ? 1 : -1)
                      setCurrentImage(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentImage
                        ? "w-6 bg-vanilla"
                        : "w-1.5 bg-vanilla/50 hover:bg-vanilla/80"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          ref={formRef}
          className="shadow-section flex-1 bg-red p-6 sm:px-12 sm:py-6 text-vanilla rounded-xl"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={formInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.3, 0.64, 1] }}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-8">
              <label className="font-times text-lg" htmlFor="name">
                Votre Nom
              </label>
              <input className="mt-2 rounded border-vanilla border-[0.5px] p-4 focus-visible:outline focus-visible:outline-vanilla" type="text" name="name" id="name" placeholder="Jane Austen" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col mb-8">
              <label className="font-times text-lg" htmlFor="email">
                Votre email
              </label>
              <input className="mt-2 rounded border-vanilla border-[0.5px] p-4 focus-visible:outline focus-visible:outline-vanilla" type="email" name="email" id="email" placeholder="jane.austen@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <div className="flex flex-col mb-8">
              <label className="font-times text-lg " htmlFor="quantity">
                Nombre de coffrets souhaités
              </label>

              <span className="text-sm text-vanilla/70">
                Un coffret contient 3 dattes
              </span>

              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantité"
                min={1}
                max={500}
                inputMode="numeric"
                value={quantity}
                onChange={(e) => {
                  const number = Number(e.target.value)

                  if (isNaN(number)) return

                  if (number > 500) {
                    setQuantity("500")
                  } else if (number < 1) {
                    setQuantity("1")
                  } else {
                    setQuantity(String(number))
                  }
                }}
                className="mt-2 rounded border border-vanilla border-[0.5px] p-4 focus-visible:outline focus-visible:outline-vanilla"
                required
              />

            </div>

            <div className="flex flex-col mb-8 relative">
              <label className="font-times text-lg" htmlFor="message">
                Votre message
              </label>
              <span className="text-sm text-vanilla/70">
                Indiquez les assortiments souhaités, la date de livraison désirée ou toute précision utile concernant votre commande.
              </span>
              <textarea className="mt-2 rounded border-vanilla border-[0.5px] p-4 resize-none focus-visible:outline focus-visible:outline-vanilla" rows={8} name="message" id="message" placeholder="Bonjour, vos dattes ont l'air succulentes, j'aimerais varier le plus possible les assortiments !" value={message} onChange={(e) => setMessage(e.target.value)} required />
              <AnimatePresence>
                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-6 right-0 text-vanilla font-medium text-sm flex"
                  >
                    Votre message a bien été envoyé
                  </motion.p>
                )}
              </AnimatePresence>
            </div >

            <Button type="submit" className="border border-vanilla font-times block ml-auto bg-vanilla text-red hover:bg-red hover:text-vanilla transition-colors duration-300 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-vanilla" >
              {loading ? "Envoi..." : "Envoyer"}
            </Button>
          </form >
        </motion.div >
      </div >
    </section >
  );
}
