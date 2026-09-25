import { visitNotes } from '../../data/park'
import { photoUrl } from '../../lib/photo'
import Reveal from '../Reveal'
import { OfficialButton } from './ui'

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative isolate overflow-hidden">
      <img src={photoUrl('lower-lakes-aerial', 1920)} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <p className="label text-lake">Before you go</p>
          <h2 id="visit-title" className="display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
            Now walk it yourself.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visitNotes.map((n, k) => (
            <Reveal key={n.title} delay={k * 70}>
              <div className="glass h-full rounded-[1.5rem] p-6">
                <h3 className="text-lg font-medium">{n.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foam/80">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-col gap-6 rounded-[1.75rem] border border-lake/30 bg-ink/60 p-7 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-9">
            <div className="max-w-xl">
              <p className="text-2xl font-light tracking-tight md:text-3xl">Plan your visit with the park itself.</p>
              <p className="mt-2 text-foam/75">
                Opening hours, routes, conditions and news: everything official lives on the national park’s own website, np-plitvicka-jezera.hr.
              </p>
            </div>
            <div className="shrink-0">
              <OfficialButton size="lg">Go to the official site</OfficialButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
