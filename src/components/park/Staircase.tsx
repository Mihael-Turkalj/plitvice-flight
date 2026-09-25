import { useState } from 'react'
import { lakes } from '../../data/park'
import Reveal from '../Reveal'
import { SectionHead } from './ui'

/*
 * One series, one hue: each bar hangs from the level of the first lake and its length is how far
 * that lake sits below it, so every bar starts at a true zero. A few bars carry direct labels;
 * hover, focus or tap shows any lake in the readout under the chart (placed outside the plot so it
 * never covers a bar), and the table below holds every value.
 */

const TOP = lakes[0].elevation
const MAX_DROP = TOP - lakes[lakes.length - 1].elevation
const UPPER = lakes.filter((l) => l.group === 'Upper').length
const LABELLED = new Set(['Kozjak', 'Novakovića brod'])
const GRID = [50, 100]
const fmt = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 1 })

export default function Staircase() {
  const [active, setActive] = useState<number | null>(null)
  const a = active === null ? null : lakes[active]

  return (
    <section id="lakes" aria-labelledby="lakes-title" className="border-t border-foam/10 bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          id="lakes-title"
          label="The staircase"
          title="Sixteen lakes, each one a step lower"
          intro="Every bar shows how far a lake sits below the first one, Prošćansko at 636 metres. Hover or tap a bar for its details."
        />

        <Reveal delay={80} className="mt-14">
          <figure aria-labelledby="lakes-caption">
            {/* Group brackets: structure, not colour, separates Upper and Lower Lakes. */}
            <div aria-hidden="true" className="flex gap-3 text-xs text-mist">
              <div style={{ flexGrow: UPPER }} className="basis-0 border-b border-foam/25 pb-2">
                Upper Lakes <span className="text-foam/45">· 12 on dolomite</span>
              </div>
              <div style={{ flexGrow: lakes.length - UPPER }} className="basis-0 border-b border-foam/25 pb-2">
                Lower Lakes <span className="text-foam/45 max-sm:hidden">· 4 in a limestone canyon</span>
              </div>
            </div>

            <div className="relative mt-6 h-[19rem] md:h-[22rem]" onPointerLeave={() => setActive(null)}>
              {/* Zero line (the level of Prošćansko) and two recessive gridlines. */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-foam/45">
                <span className="absolute -top-5 left-0 text-[0.7rem] whitespace-nowrap text-foam/70 tabular-nums">0 m · Prošćansko, 636 m</span>
              </div>
              {GRID.map((g) => (
                <div key={g} aria-hidden="true" className="absolute inset-x-0 h-px bg-foam/10" style={{ top: `${(g / MAX_DROP) * 100}%` }}>
                  <span className="absolute -top-5 left-0 text-[0.7rem] text-foam/45 tabular-nums">−{g} m</span>
                </div>
              ))}

              <div className="absolute inset-0 flex">
                {lakes.map((l, i) => {
                  const drop = TOP - l.elevation
                  const on = active === i
                  const labelled = LABELLED.has(l.name)
                  return (
                    <button
                      key={l.name}
                      type="button"
                      className="group relative flex flex-1 justify-center focus-visible:outline-none"
                      aria-label={`${l.name}, ${l.elevation} metres, ${drop} metres below Prošćansko, ${fmt(l.area)} hectares, up to ${l.depth} metres deep`}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(on ? null : i)}
                    >
                      {i === 0 ? (
                        <span
                          aria-hidden="true"
                          className={`absolute top-0 size-2.5 -translate-y-1/2 rounded-full ring-2 ring-deep transition-colors duration-150 ${on ? 'bg-foam' : 'bg-lake'}`}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className={`absolute top-0 w-[min(24px,62%)] rounded-b-[4px] transition-colors duration-150 group-focus-visible:bg-foam ${on ? 'bg-foam' : 'bg-lake'}`}
                          style={{ height: `${(drop / MAX_DROP) * 100}%` }}
                        />
                      )}
                      {labelled && (
                        <span
                          aria-hidden="true"
                          className="absolute right-1/2 mt-2 translate-x-3 text-right text-xs leading-tight whitespace-nowrap text-foam/80"
                          style={{ top: `${(drop / MAX_DROP) * 100}%` }}
                        >
                          {l.name}
                          <span className="block text-foam/50 tabular-nums">
                            {l.elevation} m · −{drop} m
                          </span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

            </div>

            <p role="status" className="mt-14 min-h-[3.5rem] rounded-2xl border border-foam/10 px-5 py-3 text-sm leading-relaxed text-foam/85 tabular-nums">
              {a && active !== null ? (
                <>
                  <span className="font-medium text-foam">{a.name}</span>
                  <span className="text-mist"> · {a.group} Lakes</span>
                  <span className="block">
                    {a.elevation} m, {TOP - a.elevation} m below the first lake · {fmt(a.area)} ha · up to {a.depth} m deep
                  </span>
                </>
              ) : (
                <span className="text-mist">Hover over or tap any bar to see that lake’s elevation, size and depth.</span>
              )}
            </p>

            <figcaption id="lakes-caption" className="mt-4 text-sm text-mist">
              Elevation of the 16 main lakes, shown as metres below Prošćansko. Source: Croatian Wikipedia; Kozjak’s area and depth are the park’s own figures.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl font-light tracking-tight">Two kinds of stone</h3>
            <p className="mt-3 leading-relaxed text-foam/80">
              The 12 Upper Lakes lie on dolomite, which gives them gentle, wooded shores. The 4 Lower Lakes cut into limestone and sit in a narrow canyon between
              white cliffs. Kozjak, where the two halves meet, is the largest and deepest of all: 82 hectares and 47 metres.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="text-2xl font-light tracking-tight">Sixteen, officially</h3>
            <p className="mt-3 leading-relaxed text-foam/80">
              A 2018 survey using aerial images and laser scans counted 90 lakes of at least ten square metres. The official number is still sixteen: the larger
              lakes, strung along about eight kilometres of water.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <details className="group mt-12 rounded-2xl border border-foam/10 px-5 py-4 open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-foam/80 [&::-webkit-details-marker]:hidden">
              All 16 lakes as a table
              <span aria-hidden="true" className="text-lg transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm tabular-nums">
                <thead className="text-xs text-mist">
                  <tr className="border-b border-foam/10">
                    <th className="py-2 pr-4 font-normal">Lake</th>
                    <th className="py-2 pr-4 font-normal">Group</th>
                    <th className="py-2 pr-4 text-right font-normal">Elevation (m)</th>
                    <th className="py-2 pr-4 text-right font-normal">Below first (m)</th>
                    <th className="py-2 pr-4 text-right font-normal">Area (ha)</th>
                    <th className="py-2 text-right font-normal">Max depth (m)</th>
                  </tr>
                </thead>
                <tbody className="text-foam/85">
                  {lakes.map((l) => (
                    <tr key={l.name} className="border-b border-foam/5">
                      <td className="py-2 pr-4">{l.name}</td>
                      <td className="py-2 pr-4 text-foam/60">{l.group}</td>
                      <td className="py-2 pr-4 text-right">{l.elevation}</td>
                      <td className="py-2 pr-4 text-right">{TOP - l.elevation}</td>
                      <td className="py-2 pr-4 text-right">{fmt(l.area)}</td>
                      <td className="py-2 text-right">{l.depth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  )
}
