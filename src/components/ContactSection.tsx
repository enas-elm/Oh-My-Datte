"use client";

import React, { useRef, useState } from "react"
import { Button } from "./Button"
import { motion, AnimatePresence, useInView } from "motion/react"

export default function ContactSection() {
  const textRef = useRef(null);
  const formRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: '-60px' });
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [quantity, setQuantity] = useState(3)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setSuccess(true)
        setName("")
        setEmail("")
        setMessage("")
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Erreur:", error)
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="section-scroll-mt my-32 container mx-auto px-4 sm:px-6 lg:px-8">
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
                min={1}
                max={500}
                inputMode="numeric"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value

                  // Permet de vider le champ
                  if (value === "") {
                    setQuantity("")
                    return
                  }

                  const number = Number(value)

                  if (number > 500) {
                    setQuantity("500")
                  } else if (number < 1) {
                    setQuantity("1")
                  } else {
                    setQuantity(value)
                  }
                }}
                className="mt-2 rounded border-vanilla border-[0.5px] p-4 focus-visible:outline focus-visible:outline-vanilla"
                required
              />
            </div>

            <div className="flex flex-col mb-8 relative">
              <label className="font-times text-lg" htmlFor="message">
                Votre message
              </label>
              <span className="text-sm text-vanilla/70">
                Vous avez sélectionné <span className="font-bold">{quantity || 0}</span>{" "}
                {quantity === 1 ? "coffret" : "coffrets"}.
                Indiquez-nous ici les assortiments souhaités, la date de livraison désirée ou toute précision utile concernant votre commande.
              </span>
              <textarea className="mt-2 rounded border-vanilla border-[0.5px] p-4 resize-none focus-visible:outline focus-visible:outline-vanilla" rows={8} name="message" id="message" placeholder="Bonjour, vos dattes ont l'air succulentes, j'aimerais commander un coffret de 6 dattes de chaque assortiment !" value={message} onChange={(e) => setMessage(e.target.value)} required />
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
