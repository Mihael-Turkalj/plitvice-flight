import { history } from '../../data/park'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

export default function History() {
  return (
    <section id="history" aria-labelledby="history-title" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <SectionHead id="history-title" label="A short history" title="Almost five centuries of Plitvice" intro="From a line in a parliament record to one of Europe’s best-known parks." />
      <ol className="mt-14 border-t border-foam/10">
        {history.map((h) => (
          <Reveal as="li" key={h.year} className="grid gap-3 border-b border-foam/10 py-7 md:grid-cols-12 md:items-center md:gap-8 md:py-8">
            <p className="text-[clamp(2.4rem,4.5vw,3.75rem)] leading-none font-extralight tracking-tight tabular-nums md:col-span-4">{h.year}</p>
            <p className="max-w-2xl text-lg leading-relaxed text-foam/85 md:col-span-8">{h.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
