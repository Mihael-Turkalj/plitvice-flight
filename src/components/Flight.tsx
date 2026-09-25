import { useEffect, useRef, useState } from 'react'
import { DIVE, FPS, TOTAL, cards, segmentFile, segmentPoster, segments, stops, type Card } from '../data/flight'
import { ScrollTrigger, clamp01, gsap, useGSAP, usePrefersReducedMotion } from '../lib/motion'

/*
 * The flight: pinned full-screen video whose playhead follows the scroll position, so the visitor
 * flies with the kingfisher at their own pace, forwards or backwards. Each shot is its own file,
 * downloaded in order; the page swaps between them at the joins, where the frames match. Knowledge
 * cards pop in and out at set moments.
 */

const base = import.meta.env.BASE_URL
const INTRO_VH = 0.7 // scroll spent lifting the title before the bird moves
const VH_PER_SECOND = 0.55 // scroll distance per second of flight
const OUTRO_VH = 0.35 // a beat on the last frame before the page moves on
const FRAME = 1 / FPS

const segmentAt = (t: number) => {
  let k = 0
  while (k < segments.length - 1 && t >= segments[k + 1].start) k++
  return k
}

/** The bird's horizontal position (0..1) at a time within a segment, from its per-frame track. */
const birdX = (k: number, local: number) => {
  const track = segments[k].track
  const f = Math.min(track.length - 1, Math.max(0, local * FPS))
  const i = Math.floor(f)
  const next = track[Math.min(track.length - 1, i + 1)]
  return track[i] + (next - track[i]) * (f - i)
}

const DIVE_INDEX = segments.findIndex((s) => s.id === DIVE.segment)

const useHd = () => typeof window !== 'undefined' && window.innerWidth * (window.devicePixelRatio || 1) > 1400

export default function Flight() {
  const reduced = usePrefersReducedMotion()
  return reduced ? <FlightStills /> : <FlightStage />
}

function FlightStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const introRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const dropNumRef = useRef<HTMLSpanElement>(null)
  const ready = useRef<boolean[]>(segments.map(() => false))
  const [active, setActive] = useState<string[]>([])
  const [stop, setStop] = useState(0)
  const [segment, setSegment] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const hd = useHd()

  // Download the shots in flight order. Seeking inside a local blob is instant and never stalls.
  useEffect(() => {
    const ctrl = new AbortController()
    const urls: string[] = []
    ;(async () => {
      for (let k = 0; k < segments.length; k++) {
        try {
          const res = await fetch(base + segmentFile(segments[k].id, hd), { signal: ctrl.signal })
          const url = URL.createObjectURL(await res.blob())
          urls.push(url)
          const video = videoRefs.current[k]!
          await new Promise<void>((resolve) => {
            video.addEventListener('loadeddata', () => resolve(), { once: true })
            video.src = url
            video.load()
          })
          ready.current[k] = true
          setLoadedCount(k + 1)
        } catch (e) {
          if ((e as Error).name === 'AbortError') return
          console.error(`flight shot ${segments[k].id} failed to load`, e)
        }
      }
    })()
    return () => {
      ctrl.abort()
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [hd])

  useGSAP(
    () => {
      let target = 0
      let cur = 0
      let intro = 0
      let lastKey = ''
      let lastStop = -1
      let lastSeg = -1
      let lastDrop = ''
      const vh = () => window.innerHeight

      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top top',
        end: () => `+=${(INTRO_VH + TOTAL * VH_PER_SECOND + OUTRO_VH) * vh()}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const px = self.scroll() - self.start
          intro = clamp01(px / (INTRO_VH * vh()))
          target = Math.min(TOTAL, Math.max(0, (px - INTRO_VH * vh()) / (VH_PER_SECOND * vh())))
        },
        onToggle: (self) => {
          document.documentElement.dataset.inFlight = String(self.isActive)
        },
      })

      const seekTo = (k: number, local: number) => {
        const v = videoRefs.current[k]
        if (v && ready.current[k] && !v.seeking && Math.abs(v.currentTime - local) > FRAME / 2) v.currentTime = local
      }

      const tick = (_time: number, deltaMs: number) => {
        cur += (target - cur) * (1 - Math.exp(-(deltaMs / 1000) * 8))
        if (Math.abs(target - cur) < 0.001) cur = target

        const k = segmentAt(cur)
        const seg = segments[k]
        const local = Math.min(seg.duration - FRAME, Math.max(0, cur - seg.start))
        seekTo(k, local)
        // Line up the neighbouring shot on its matching frame, so the swap at a join never flashes.
        if (local > seg.duration - 0.6 && k < segments.length - 1) seekTo(k + 1, 0)
        if (local < 0.6 && k > 0) seekTo(k - 1, segments[k - 1].duration - FRAME)
        if (k !== lastSeg) {
          lastSeg = k
          setSegment(k)
        }

        // On screens narrower than the 16:9 video, slide the visible window to keep the bird in view.
        const v = videoRefs.current[k]
        if (v) {
          const visible = Math.min(1, v.clientWidth / (v.clientHeight * (16 / 9)))
          if (visible < 0.999) {
            const centre = Math.min(1 - visible / 2, Math.max(visible / 2, birdX(k, local)))
            v.style.objectPosition = `${(((centre - visible / 2) / (1 - visible)) * 100).toFixed(2)}% 50%`
          }
        }

        const el = introRef.current
        if (el) {
          el.style.opacity = String(1 - Math.min(1, intro * 1.5))
          el.style.transform = `translate3d(0, ${(-intro * 48).toFixed(1)}px, 0)`
          el.style.visibility = intro >= 0.99 ? 'hidden' : 'visible'
        }
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${(cur / TOTAL).toFixed(4)})`

        // During the dive, count the metres fallen alongside the bird.
        const diving = k === DIVE_INDEX && local >= DIVE.from - 0.3
        const metres = diving ? Math.round(DIVE.metres * clamp01((local - DIVE.from) / (DIVE.to - DIVE.from))) : 0
        const dropKey = `${diving}:${metres}`
        if (dropKey !== lastDrop) {
          lastDrop = dropKey
          if (dropRef.current) dropRef.current.dataset.on = String(diving)
          if (dropNumRef.current) dropNumRef.current.textContent = String(metres)
        }

        const on = cards.filter((c) => cur >= c.from && cur < c.to).map((c) => c.id)
        const key = on.join()
        if (key !== lastKey) {
          lastKey = key
          setActive(on)
        }
        // The stop being flown through is the current shot's start; the last stop lights up on arrival.
        const s = cur >= TOTAL - 0.8 ? stops.length - 1 : k
        if (s !== lastStop) {
          lastStop = s
          setStop(s)
        }
      }
      gsap.ticker.add(tick)
      return () => {
        gsap.ticker.remove(tick)
        delete document.documentElement.dataset.inFlight
      }
    },
    { scope: stageRef },
  )

  const waiting = loadedCount <= segment

  return (
    <section id="flight" aria-label="The flight" className="relative">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-deep">
        {segments.map((s, k) => (
          <video
            key={s.id}
            ref={(el) => {
              videoRefs.current[k] = el
            }}
            muted
            playsInline
            preload="auto"
            poster={base + segmentPoster(s.id)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover ${k === segment ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/60" />

        <div ref={introRef} className="absolute inset-0 flex flex-col justify-end px-6 pb-36 md:px-12 md:pb-40 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
          <div className="relative max-w-5xl">
            <p className="label text-lake">Plitvice Lakes National Park, Croatia</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,6.2vw,6.25rem)]">Follow the kingfisher</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foam/85 md:text-xl">
              Scroll to fly through Plitvice with a bird that lives on its lakes. Facts and legends pop up along the way.
            </p>
            <p className="mt-10 flex items-center gap-3 text-sm text-foam/70">
              <span aria-hidden="true" className="relative block h-9 w-5 rounded-full border border-foam/40">
                <span className="absolute top-1.5 left-1/2 block h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-foam motion-reduce:animate-none" />
              </span>
              Scroll to start flying
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0" aria-live="polite">
          {cards.map((c) => (
            <FlightCard key={c.id} card={c} on={active.includes(c.id)} />
          ))}
        </div>

        <div ref={dropRef} data-on="false" aria-hidden="true" className="drop-gauge glass pointer-events-none absolute bottom-20 left-4 rounded-[1.4rem] px-6 py-5 md:top-1/2 md:bottom-auto md:left-12 md:px-7 md:py-6 lg:left-16">
          <p className="label text-lake">Falling</p>
          <p className="mt-1 flex items-baseline gap-1.5 font-extralight tracking-tight">
            <span ref={dropNumRef} className="text-6xl tabular-nums md:text-8xl">
              0
            </span>
            <span className="text-2xl text-foam/70 md:text-3xl">m</span>
          </p>
          <p className="mt-1 text-sm text-foam/75">of {DIVE.metres}, Veliki slap</p>
        </div>

        <Route stop={stop} fillRef={fillRef} />

        {waiting && (
          <p className="glass absolute top-6 right-6 rounded-full px-4 py-2 text-xs text-foam/80 tabular-nums md:top-8 md:right-12" role="status">
            Loading the flight {loadedCount}/{segments.length}
          </p>
        )}
        <a
          href="#after"
          className="glass absolute top-6 left-6 rounded-full px-4 py-2 text-xs text-foam/80 transition-colors duration-200 hover:text-foam focus-visible:text-foam md:top-8 md:left-12"
        >
          Skip the flight
        </a>
      </div>
    </section>
  )
}

function FlightCard({ card, on }: { card: Card; on: boolean }) {
  const left = card.side === 'left'
  // Side cards only on wide landscape screens; elsewhere the view is cropped around the bird, so cards sit at the top.
  return (
    <article
      data-on={on}
      aria-hidden={!on}
      className={`flight-card glass absolute inset-x-4 top-20 rounded-[1.4rem] p-5 sm:right-auto sm:w-[28rem] sm:p-6 lg:landscape:inset-x-auto lg:landscape:top-[30%] lg:landscape:w-[26rem] lg:landscape:p-7 ${
        left ? 'lg:landscape:left-16' : 'lg:landscape:right-16'
      }`}
      style={{ '--origin': left ? 'left center' : 'right center' } as React.CSSProperties}
    >
      <p data-line="0" className="label flex items-center gap-2 text-lake">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-lake" />
        {card.label}
      </p>
      <h2 data-line="1" className="mt-3 text-[1.7rem] leading-tight font-light tracking-tight md:text-[2.1rem]">
        {card.title}
      </h2>
      <p data-line="2" className="mt-2 text-[0.95rem] leading-relaxed text-foam/85 md:mt-3 md:text-[1.05rem]">
        {card.body}
      </p>
    </article>
  )
}

function Route({ stop, fillRef }: { stop: number; fillRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6 md:bottom-8 md:px-12 lg:px-16">
      <div className="relative h-4 text-xs">
        {stops.map((s, k) => {
          const first = k === 0
          const last = k === stops.length - 1
          return (
            <span
              key={s.name}
              className={`absolute top-0 whitespace-nowrap transition-colors duration-300 ${first ? 'left-0' : last ? 'right-0' : '-translate-x-1/2'} ${
                k === stop ? 'text-foam' : 'text-foam/45 max-lg:hidden'
              }`}
              style={first || last ? undefined : { left: `${(s.at / TOTAL) * 100}%` }}
            >
              {s.name}
            </span>
          )
        })}
      </div>
      <div className="relative mt-3 h-px w-full bg-foam/25">
        <div ref={fillRef} className="absolute inset-0 origin-left bg-lake" style={{ transform: 'scaleX(0)' }} />
        {stops.map((s) => (
          <span key={s.name} className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foam/70" style={{ left: `${(s.at / TOTAL) * 100}%` }} />
        ))}
      </div>
    </div>
  )
}

/** Each card belongs to the stop nearest the middle of its time on screen. */
const nearestStop = (c: Card) => {
  const mid = (c.from + Math.min(c.to, TOTAL)) / 2
  let best = 0
  stops.forEach((s, k) => Math.abs(s.at - mid) < Math.abs(stops[best].at - mid) && (best = k))
  return best
}

/** Reduced motion: the same story as stills, with every card readable. */
function FlightStills() {
  return (
    <section id="flight" aria-label="The flight" className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:px-12">
      <p className="label text-lake">Plitvice Lakes National Park, Croatia</p>
      <h1 className="display mt-6 text-[clamp(2.6rem,6.2vw,6.25rem)]">Follow the kingfisher</h1>
      <ol className="mt-16 grid gap-16">
        {stops.map((s, k) => (
          <li key={s.name} className="grid gap-6 md:grid-cols-12 md:items-center">
            <img src={`${base}flight/still-${k}.jpg`} alt={`${s.name}, with the kingfisher in flight`} loading="lazy" className="w-full rounded-3xl md:col-span-7" />
            <div className="space-y-6 md:col-span-5">
              {cards
                .filter((c) => nearestStop(c) === k)
                .map((c) => (
                  <div key={c.id}>
                    <p className="label text-lake">{c.label}</p>
                    <h2 className="mt-2 text-3xl font-light">{c.title}</h2>
                    <p className="mt-2 text-foam/85">{c.body}</p>
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
