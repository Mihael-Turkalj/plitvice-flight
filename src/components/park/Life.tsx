import { life, lifeCounts } from '../../data/park'
import { photoSrcSet, photoUrl } from '../../lib/photo'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

// 4 columns x 2 rows on desktop: a 2x2 lead card, two 1x1 cards, and one 2x1 card fill it with no gaps.
const layout = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2']
const position: Record<string, string> = { bear: 'object-[50%_35%]', 'crna-rijeka': 'object-[50%_65%]' }

export default function Life() {
  return (
    <section id="life" aria-labelledby="life-title" className="border-t border-foam/10 bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          id="life-title"
          label="Wildlife"
          title="Who else lives here"
          intro="Beyond the kingfisher: bears in the beech forest, rare orchids in the meadows and fish you can count from the boardwalk."
        />
        <Reveal delay={80}>
          <div className="mt-14 grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,18rem))] lg:grid-rows-[repeat(2,minmax(0,21rem))]">
            {life.map((c, k) => (
              <article key={c.photo} className={`group relative isolate min-h-[20rem] overflow-hidden rounded-[1.75rem] bg-moss md:min-h-0 ${layout[k]}`}>
                <img
                  src={photoUrl(c.photo, 1024)}
                  srcSet={photoSrcSet(c.photo)}
                  sizes={k === 0 || k === 3 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${position[c.photo] ?? ''}`}
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-10% via-ink/60 via-45% to-transparent to-75%" />
                <div className="flex h-full flex-col justify-end p-6 md:p-7">
                  <p className="label text-foam/75">{c.tag}</p>
                  <h3 className="mt-3 text-2xl font-normal tracking-tight md:text-[1.7rem]">{c.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-foam/80 md:text-base">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {lifeCounts.map((s) => (
              <div key={s.label} className="flex flex-col rounded-[1.5rem] border border-foam/10 px-6 py-6">
                <dt className="order-2 mt-2 text-sm text-mist">{s.label}</dt>
                <dd className="order-1 text-4xl leading-none font-light tracking-tight tabular-nums md:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
