import React from 'react'
import { Button } from './Button'

export default function ContactSection() {
  return (
    <section className="my-64 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
            <div className='flex-1'>
                <h2 className='uppercase text-[clamp(1.5rem,4vw,7rem)] leading-snug mb-6 md:mb-10'>Vous avez craquez ?</h2>
                <p className='sm:text-lg'>Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,</p>
            </div>
            <div className='flex-1 bg-red p-6 sm:p-16 text-vanilla rounded-xl'>
                <form>
                    <div className='flex flex-col mb-8'>
                        <label htmlFor="name">Nom</label>
                        <input className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' type="text" name="name" id="email" placeholder="Jane Austen" />
                    </div>

                    <div className='flex flex-col mb-8'>
                        <label htmlFor="email">Votre email</label>
                        <input className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' type="email" name="email" id="email" placeholder="jane.austen@email.com" />
                    </div>

                    <div className='flex flex-col mb-8'>
                        <label htmlFor="message">Votre message</label>
                        <textarea className='border border-vanilla p-2 pb-1 focus-visible:outline focus-visible:outline-vanilla' rows={8} name="message" id="message" placeholder="Bonjour, vos dattes ont l'air succulentes, j'aimerais commander un coffret de 6 dattes de chaque assortiment !"/>
                    </div>

                    <Button className='bg-vanilla text-red focus:outline-2 focus:outline-offset-2 focus:outline-vanilla focus:rounded-sm'>Envoyer</Button>
                </form>
            </div>
        </div>
    </section>
  )
}
