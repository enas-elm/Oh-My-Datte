import Reveal from "@/components/animations/Reveal"
import QualitySectionMobile from "./QualitySectionMobile"
import QualitySectionDesktop from "./QualitySectionDesktop"

export type QualityImage = { src: string; alt: string; w: number; h: number; rotation?: number }

export type QualityState = {
  left: { title: string; paragraphs: string[] }
  right: { title: string; paragraphs: string[] }
  topImage: QualityImage
  bottomImage: QualityImage
  /** Couleur du trait pinceau (hex, animable) : pistache puis nude-500 */
  brush: string
}

const states: QualityState[] = [
  {
    left: {
      title: "Un fruit d'exception",
      paragraphs: [
        "Symbole d'hospitalité et véritable concentré d'énergie, la datte est reconnue depuis des millénaires pour sa richesse en fibres et en antioxydants.",
        "Nous sélectionnons rigoureusement des dattes deglet nour charnues et naturellement sucrées. Elles offrent une base saine et fondante, parfaite pour accueillir nos créations sans culpabilité.",
      ],
    },
    right: {
      title: "Cœur fondant et naturel",
      paragraphs: [
        "Praliné noisette, beurre de cacahuète, crème de pistache… Nos fourrages sont généreux et réalisés à partir d'oléagineux de premier choix.",
        "L'objectif ? Laisser s'exprimer le goût vrai et puissant de chaque noix, pour un équilibre parfait en bouche.",
      ],
    },
    topImage: { src: "/images/deglet-nour-datte-float.png", alt: "Datte deglet nour", w: 160, h: 224 },
    bottomImage: { src: "/images/pistachio.png", alt: "Pistaches", w: 130, h: 130 },
    brush: "#a8b692",
  },
  {
    left: {
      title: "Enrobage chocolat premium",
      paragraphs: [
        "Pour une signature élégante, nous enveloppons nos dattes d'une fine couche de chocolat de qualité supérieure.",
        "Nous privilégions notamment le chocolat noir intense, apprécié pour sa richesse en cacao et ses bienfaits antioxydants, offrant un contraste croquant et raffiné qui sublime chaque bouchée.",
      ],
    },
    right: {
      title: "Un écrin pour toutes vos occasions",
      paragraphs: [
        "Que ce soit pour un instant de plaisir personnel avec votre café, une pause énergie saine pour les sportifs, ou un cadeau raffiné à offrir lors de repas festifs, nos dattes s'adaptent à toutes vos envies.",
        "Oh My Datte, c'est l'assurance d'offrir une confiserie originale, visuellement belle et qui surprendra vos convives.",
      ],
    },
    topImage: { src: "/images/chocolate.png", alt: "Chocolat noir", w: 160, h: 200, rotation: -20 },
    bottomImage: { src: "/images/intrepide-irl.png", alt: "Datte enrobée de chocolat noir", w: 160, h: 240, rotation: 10 },
    brush: "#f9d6bf",
  },
]

export default function QualitySection() {
  return (
    <section id="qualite" aria-labelledby="qualite-titre" className="section-ancre container mx-auto my-24 px-4 sm:px-6 lg:my-32 lg:px-8">
      <div className="flex items-center justify-between gap-6 sm:gap-16">
        <span aria-hidden="true" className="h-px flex-1 bg-chocolat/60" />
        <h2
          id="qualite-titre"
          className="text-center text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.2] tracking-[0.02em]"
        >
          <Reveal as="span" className="block whitespace-nowrap">Des produits</Reveal>
          <Reveal as="span" delay={0.15} className="block whitespace-nowrap">de qualité</Reveal>
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-chocolat/60" />
      </div>

      <QualitySectionMobile states={states} />

      <QualitySectionDesktop states={states} />
    </section>
  )
}
