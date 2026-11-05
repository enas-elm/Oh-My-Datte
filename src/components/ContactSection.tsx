"use client";

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Minus, Plus } from "lucide-react"
import Reveal from "@/components/animations/Reveal"
import { Button } from "./Button"
import PhotoCarousel from "./contact/PhotoCarousel"
import CompositionPicker from "./contact/CompositionPicker"
import { priceTiers, getUnitPrice, formatPrice, MAX_QUANTITY } from "@/lib/pricing"
import { repartitionEquilibree, sommeDattes, totalAttendu, type Composition } from "@/lib/composition"

type Status = "idle" | "loading" | "success" | "error" | "composition"

const fieldClass =
  "mt-2 w-full rounded border-[0.5px] border-creme bg-transparent p-4 text-base text-creme placeholder:text-on-rouge-doux/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"

const stepperClass =
  "flex w-14 shrink-0 items-center justify-center rounded border-[0.5px] border-creme transition-colors duration-200 hover:bg-creme hover:text-rouge disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-creme focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"

function tierLabel(min: number, max: number) {
  if (max >= MAX_QUANTITY) return `${min} coffrets et plus`
  return `${min} à ${max} coffrets`
}

export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [quantity, setQuantity] = useState<string>("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [composition, setComposition] = useState<Composition>({ mode: "equilibre", dattes: repartitionEquilibree(0) })
  const compositionRef = useRef<HTMLDivElement>(null)

  const quantityNum = Number(quantity) || 0
  const unitPrice = getUnitPrice(quantityNum)
  const totalPrice = quantityNum > 0 ? unitPrice * quantityNum : 0

  useEffect(() => {
    if (status !== "success") return
    const t = setTimeout(() => setStatus("idle"), 8000)
    return () => clearTimeout(t)
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return

    const safeQuantity = Math.min(MAX_QUANTITY, Math.max(1, Number(quantity) || 1))
    const dattes = composition.mode === "equilibre" ? repartitionEquilibree(safeQuantity) : composition.dattes

    // une composition sur mesure doit tomber juste avant l'envoi
    if (composition.mode === "sur-mesure" && sommeDattes(dattes) !== totalAttendu(safeQuantity)) {
      setStatus("composition")
      compositionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, quantity: safeQuantity, composition: { mode: composition.mode, dattes } }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
      setQuantity("")
      setComposition({ mode: "equilibre", dattes: repartitionEquilibree(0) })
    } catch (error) {
      console.error("Envoi du formulaire :", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-titre" className="section-ancre container mx-auto my-24 px-4 sm:px-6 md:my-32 lg:px-8">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-16">
        <div className="flex-1 lg:sticky lg:top-[calc(var(--navbar-hauteur)+2rem)] lg:self-start">
          <Reveal
            as="h2"
            blur={14}
            id="contact-titre"
            className="mb-6 text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.2] tracking-[0.02em] md:mb-10"
          >
            Vous avez craqué&nbsp;?
          </Reveal>

          <Reveal blur={10} delay={0.2} className="max-w-lecture space-y-5 text-[1.05rem] leading-[1.75] sm:text-lg">
            <p>
              Petite attention, cadeau d&apos;anniversaire, mariage ou encore événement d&apos;entreprise, nos créations
              apportent une touche de raffinement inattendue à vos célébrations.
            </p>
            <p className="font-medium text-chocolat-fonce">
              Découvrez nos élégants coffrets de 3&nbsp;dattes. Un assortiment 100&nbsp;% personnalisable.
            </p>
          </Reveal>

          <Reveal blur={10} delay={0.35} className="mt-10 md:mt-12">
            <PhotoCarousel />
          </Reveal>
        </div>

        <Reveal blur={10} delay={0.15} className="flex-1">
          <form
            onSubmit={handleSubmit}
            aria-describedby="commande-infos"
            className="rounded-xl bg-rouge px-5 py-8 text-creme shadow-section sm:px-10 sm:py-10 lg:px-12"
          >
            <p className="mb-8 font-display text-[1.75rem] font-medium uppercase leading-tight tracking-[0.02em]">
              Votre commande
            </p>

            <div className="mb-7">
              <label className="font-display text-lg font-semibold" htmlFor="name">
                Votre nom
              </label>
              <input
                className={fieldClass}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-7">
              <label className="font-display text-lg font-semibold" htmlFor="email">
                Votre email
              </label>
              <input
                className={fieldClass}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-7">
              <label className="font-display text-lg font-semibold" htmlFor="quantity">
                Nombre de coffrets
              </label>
              <p id="quantity-aide" className="text-[13px] leading-snug text-on-rouge-doux">
                Un coffret contient 3&nbsp;dattes.
              </p>
              <div className="mt-2 flex items-stretch gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(String(Math.max(1, quantityNum - 1)))}
                  disabled={quantityNum <= 1}
                  aria-label="Un coffret de moins"
                  className={stepperClass}
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  max={MAX_QUANTITY}
                  inputMode="numeric"
                  aria-describedby="quantity-aide paliers"
                  value={quantity}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === "") return setQuantity("")
                    const number = Number(val)
                    if (isNaN(number)) return
                    setQuantity(String(Math.min(number, MAX_QUANTITY)))
                  }}
                  className={`${fieldClass.replace("mt-2 ", "")} min-w-0 flex-1 text-center font-display !text-xl font-semibold lining-nums tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setQuantity(String(Math.min(MAX_QUANTITY, quantityNum + 1)))}
                  disabled={quantityNum >= MAX_QUANTITY}
                  aria-label="Un coffret de plus"
                  className={stepperClass}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="mt-5">
                <p id="paliers" className="mb-2 text-[13px] text-on-rouge-doux">
                  Prix dégressifs par coffret
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {priceTiers.map((tier) => {
                    const isActive = quantityNum >= tier.min && quantityNum <= tier.max
                    return (
                      <button
                        key={tier.min}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setQuantity(String(tier.min))}
                        className={`rounded px-2.5 py-1.5 text-[13px] font-medium tabular-nums transition-colors duration-300 focus-visible:outline-creme ${
                          isActive ? "bg-creme text-rouge" : "bg-creme/10 text-on-rouge-doux hover:bg-creme/20 hover:text-creme"
                        }`}
                      >
                        {tierLabel(tier.min, tier.max)} · {formatPrice(tier.price)}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {quantityNum > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 flex items-baseline justify-between border-t border-ligne-sur-rouge pt-3" aria-live="polite">
                        <span className="text-sm text-on-rouge-doux">
                          {quantityNum}&nbsp;coffret{quantityNum > 1 ? "s" : ""} × {formatPrice(unitPrice)}
                        </span>
                        <span className="font-display text-2xl font-semibold lining-nums tabular-nums">{formatPrice(totalPrice)}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div ref={compositionRef} className="mb-7 scroll-mt-32">
              <CompositionPicker
                coffrets={quantityNum}
                value={composition}
                error={status === "composition"}
                onChange={(c) => {
                  setComposition(c)
                  if (status === "composition") setStatus("idle")
                }}
              />
            </div>

            <div className="mb-8">
              <label className="font-display text-lg font-semibold" htmlFor="message">
                Votre message
              </label>
              <p id="message-aide" className="text-[13px] leading-snug text-on-rouge-doux">
                Date de livraison souhaitée, occasion, toute précision utile.
              </p>
              <textarea
                className={`${fieldClass} resize-none`}
                rows={6}
                name="message"
                id="message"
                aria-describedby="message-aide"
                placeholder="Bonjour, nous aimerions recevoir nos coffrets le…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <dl id="commande-infos" className="mb-8 space-y-1.5 text-[13px] leading-snug text-on-rouge-doux">
              <div>
                <dt className="inline font-semibold text-creme">Paiement&nbsp;: </dt>
                <dd className="inline">espèces à la livraison ou virement bancaire</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-creme">Livraison&nbsp;: </dt>
                <dd className="inline">remise en main propre uniquement</dd>
              </div>
              <div className="italic">Nous vous recontactons par email pour convenir des détails.</div>
            </dl>

            <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div role="status" aria-live="polite" className="min-h-6 text-sm">
                {status === "success" && <p className="font-medium">Merci&nbsp;! Votre demande est bien partie, nous revenons vers vous très vite.</p>}
                {status === "composition" && (
                  <p className="font-medium">
                    La composition ne tombe pas juste&nbsp;: ajustez-la ou choisissez «&nbsp;Répartir équitablement&nbsp;».
                  </p>
                )}
                {status === "error" && (
                  <p className="font-medium">
                    L&apos;envoi n&apos;a pas abouti. Réessayez ou écrivez-nous à{" "}
                    <a className="underline underline-offset-2" href="mailto:ohmydatte@gmail.com">
                      ohmydatte@gmail.com
                    </a>
                    .
                  </p>
                )}
              </div>
              <Button type="submit" variant="creme" disabled={status === "loading"} className="shrink-0">
                {status === "loading" ? "Envoi…" : "Envoyer"}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
