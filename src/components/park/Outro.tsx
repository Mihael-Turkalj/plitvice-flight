import { OfficialButton } from './ui'
import Reveal from '../Reveal'

const chapters = [
  { href: '#numbers', label: 'In numbers' },
  { href: '#lakes', label: 'The staircase' },
  { href: '#tufa', label: 'Living stone' },
  { href: '#life', label: 'Wildlife' },
  { href: '#seasons', label: 'Seasons' },
  { href: '#names', label: 'Names & legends' },
  { href: '#history', label: 'History' },
  { href: '#visit', label: 'Before you go' },
]

export default function Outro() {
  return (
    <section id="after" aria-labelledby="after-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-lake-deep/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-12 md:pt-44 md:pb-32">
        <Reveal>
          <p className="label text-lake">End of the flight</p>
          <h2 id="after-title" className="display mt-6 max-w-5xl text-[clamp(2.4rem,5.2vw,4.75rem)]">
            You just followed the water down sixteen lakes and a 78-metre waterfall. Here is the rest of the story.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <OfficialButton />
            <a href="#top" className="rounded-full border border-foam/25 px-6 py-3.5 font-medium transition-colors duration-150 ease-out hover:border-foam/60 hover:bg-foam/5">
              Fly again
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <nav aria-label="On this page" className="mt-16 border-t border-foam/10 pt-8">
            <ul className="flex flex-wrap gap-2">
              {chapters.map((c, k) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="flex items-center gap-2 rounded-full border border-foam/12 px-4 py-2 text-sm text-foam/75 transition-colors duration-150 ease-out hover:border-foam/40 hover:text-foam"
                  >
                    <span className="text-xs text-lake tabular-nums">{String(k + 1).padStart(2, '0')}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  )
}
