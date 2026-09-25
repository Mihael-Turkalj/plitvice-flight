import { seasons } from '../../data/park'
import { photoUrl } from '../../lib/photo'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

export default function Seasons() {
  return (
    <section id="seasons" aria-labelledby="seasons-title" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <SectionHead id="seasons-title" label="Four seasons" title="The same lakes, four different parks" intro="Plitvice is open all year, and every season changes what you see." />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {seasons.map((s, k) => (
          <Reveal as="li" key={s.name} delay={k * 70} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-foam/10 bg-deep">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
              <img
                src={photoUrl(s.photo, 1024)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="glass absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-sm font-medium">{s.name}</span>
            </div>
            <p className="p-6 leading-relaxed text-foam/85">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
