"use client"

import React, { useState } from "react"
import { Button } from './Button'
import { motion, AnimatePresence } from "framer-motion"

export default function ContactSection() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
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
    <section className="my-64 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
            <div className='flex-1'>
                <h2 className='uppercase text-[clamp(1.5rem,4vw,7rem)] leading-snug mb-6 md:mb-10'>Vous avez craquez ?</h2>
                <p className='sm:text-lg'>Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,</p>
            </div>
            <div className='flex-1 bg-red p-6 sm:p-16 text-vanilla rounded-xl'>
            <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-8'>
                        <label htmlFor="name">Nom</label>
                        <input className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' type="text" name="name" id="email" placeholder="Jane Austen" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className='flex flex-col mb-8'>
                        <label htmlFor="email">Votre email</label>
                        <input className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' type="email" name="email" id="email" placeholder="jane.austen@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className='flex flex-col mb-8 relative'>
                        <label htmlFor="message">Votre message</label>
                        <textarea className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' rows={8} name="message" id="message" placeholder="Bonjour, vos dattes ont l'air succulentes, j'aimerais commander un coffret de 6 dattes de chaque assortiment !" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                        <AnimatePresence>
                          {success && (
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10  }}
                              className="absolute -bottom-6 right-0 text-vanilla font-medium text-sm flex"
                            >
                              Votre message a bien été envoyé
                            </motion.p>
                          )}
                        </AnimatePresence>
                    </div>
                
                    <Button type="submit" className='block ml-auto bg-vanilla text-red focus:outline-2 focus:outline-offset-2 focus:outline-vanilla focus:rounded-sm'>{loading ? "Envoi..." : "Envoyer"}</Button>

                </form>
            </div>
        </div>
    </section>
  )
}
