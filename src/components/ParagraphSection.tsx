import Reveal from '@/components/animations/Reveal'

export default function ParagraphSection() {
  return (
    <section className="mx-auto my-40 w-11/12 max-w-4xl text-center md:my-48">
      <Reveal as="p" blur={10} delay={0.1} className="mb-10 font-script text-[clamp(3rem,5vw,4rem)] leading-none text-rouge">
        Oh My Datte
      </Reveal>

      <Reveal
        as="p"
        blur={10}
        delay={0.25}
        className="mx-auto mb-8 max-w-lecture text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.7] text-chocolat-fonce"
      >
        L&apos;atelier artisanal qui transforme la datte en une véritable création pâtissière.
      </Reveal>

      <Reveal blur={10} delay={0.35} aria-hidden="true" className="mx-auto mb-8 h-[1.5px] w-10 bg-rouge" />

      <Reveal
        as="p"
        blur={10}
        delay={0.45}
        className="mx-auto max-w-lecture text-[clamp(1.05rem,1.4vw,1.15rem)] leading-[1.9] text-chocolat"
      >
        À la croisée de l&apos;authenticité et de la gourmandise, nous revisitons ce trésor du désert pour
        offrir une expérience gustative inédite. Charnues, moelleuses et délicatement fourrées, nos dattes
        sont enrobées à la main avec des ingrédients d&apos;exception. Succombez à une nouvelle façon de
        déguster la datte&nbsp;: plus moderne, plus raffinée, mais toujours aussi pure.
      </Reveal>
    </section>
  )
}
