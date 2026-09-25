import { names } from '../../data/park'
import { photoUrl } from '../../lib/photo'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

export default function Names() {
  return (
    <section id="names" aria-labelledby="names-title" className="border-t border-foam/10 bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          id="names-title"
          label="Names and legends"
          title="Every lake has a story"
          intro="You met the Black Queen, the goats of Kozjak and the hermit monk on the flight. Here are more of the stories hidden in the names."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {names.map((n, k) => (
            <Reveal key={n.name} delay={(k % 2) * 80}>
              <article className="grid h-full grid-cols-[6.5rem_1fr] gap-5 rounded-[1.75rem] border border-foam/10 bg-ink p-4 sm:grid-cols-[9rem_1fr] md:p-5">
                <img src={photoUrl(n.photo, 1024)} alt="" loading="lazy" decoding="async" className="aspect-square h-auto w-full rounded-2xl object-cover" />
                <div className="py-1">
                  <p className="flex items-center gap-2 text-xs text-mist">
                    <span className="rounded-full border border-foam/20 px-2.5 py-0.5 text-foam/75">{n.kind}</span>
                  </p>
                  <h3 className="mt-3 text-2xl font-light tracking-tight">{n.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-foam/80">{n.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
