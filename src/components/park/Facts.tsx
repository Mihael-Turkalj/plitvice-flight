import { facts } from '../../data/park'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

export default function Facts() {
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <SectionHead id="numbers-title" label="The park in numbers" title="Small lakes, a big park" intro="The lakes are the famous part, but they are a sliver of Plitvice. Most of it is forest, meadow and karst." />
      <Reveal delay={80}>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-foam/10 bg-foam/10 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col bg-ink px-5 py-7 md:px-7 md:py-9">
              <dt className="order-2 mt-3 text-sm leading-snug text-mist">{f.label}</dt>
              <dd className="order-1 text-[clamp(1.75rem,4vw,3.25rem)] leading-none font-light tracking-tight whitespace-nowrap">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
