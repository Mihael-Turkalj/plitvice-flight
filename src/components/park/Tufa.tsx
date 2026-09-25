import { tufaSteps } from '../../data/park'
import { photoSrcSet, photoUrl } from '../../lib/photo'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

export default function Tufa() {
  return (
    <section id="tufa" aria-labelledby="tufa-title" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <SectionHead
        id="tufa-title"
        label="Living stone"
        title="The lakes build their own dams"
        intro="Every lake is held back by a barrier of tufa, a soft stone that moss and algae make out of the water itself. Here is how it happens."
      />
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <figure className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-moss">
            <img
              src={photoUrl('tufa', 1024)}
              srcSet={photoSrcSet('tufa')}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Close-up of tufa: moss and plant stems coated in pale calcium carbonate"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="glass absolute right-4 bottom-4 left-4 rounded-2xl px-4 py-3 text-sm text-foam/85">
              Tufa up close: moss and stems slowly turning to stone.
            </figcaption>
          </figure>
        </Reveal>
        <ol className="flex flex-col gap-4 lg:col-span-7">
          {tufaSteps.map((step, k) => (
            <Reveal as="li" key={step.title} delay={k * 80} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[1.5rem] border border-foam/10 p-6 md:grid-cols-[4rem_1fr] md:p-7">
              <span className="text-4xl leading-none font-extralight text-lake tabular-nums md:text-5xl">{k + 1}</span>
              <div>
                <h3 className="text-xl font-normal tracking-tight md:text-2xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-foam/80">{step.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={260} className="rounded-[1.5rem] bg-lake/10 px-6 py-5 text-foam/90 md:px-7">
            <span className="font-medium text-lake">So please stay on the boardwalks.</span> Tufa is soft and easily broken, which is also why swimming in the
            lakes is banned.
          </Reveal>
        </ol>
      </div>
    </section>
  )
}
