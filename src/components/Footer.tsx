import { sources } from '../data/content'
import { flightSources } from '../data/flight'
import { allWork, lab } from '../data/lab'
import { parkPhotos } from '../data/park'
import { photoCredits } from '../lib/photo'
import { WaterMark } from './Nav'

function licenseUrl(license: string) {
  const m = license.match(/^CC (BY(?:-SA)?) ([0-9.]+)$/)
  if (m) return `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/`
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/'
  return null
}

export default function Footer() {
  const used = new Set([...flightSources, ...parkPhotos])
  const credits = Object.entries(photoCredits).filter(([slug]) => used.has(slug))
  return (
    <footer className="border-t border-foam/10">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 text-2xl font-light">
            <WaterMark className="size-6 text-lake" />
            Plitvice: Follow the Kingfisher
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
            An unofficial showcase by{' '}
            <a href="https://mihaelturkalj.com" className="text-foam underline decoration-foam/30 underline-offset-4 hover:decoration-foam">
              Mihael Turkalj
            </a>
            . Not affiliated with the Public Institution Plitvice Lakes National Park. For opening hours, routes and rules, always check the park’s own website.
          </p>
          <a href="#top" className="mt-8 inline-flex items-center gap-2 text-sm text-foam/70 transition-colors hover:text-foam">
            Back to the top
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M8 14V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="lg:col-span-5">
          <h2 className="label text-foam/60">Sources</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-foam/80 transition-colors hover:text-foam">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the rest of the lab, so one visit leads to the next */}
      <nav aria-labelledby="lab-title" className="mx-auto max-w-7xl border-t border-foam/10 px-6 py-12 md:px-12">
        <h2 id="lab-title" className="label text-foam/60">
          More from the lab
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {lab
            .filter((l) => l.id !== 'plitvice-flight')
            .map((l) => (
              <li key={l.id}>
                <a href={l.href} className="group block">
                  <span className="block text-lg font-light text-foam underline decoration-foam/30 underline-offset-4 group-hover:decoration-foam">{l.title}</span>
                  <span className="mt-1 block text-sm text-mist">{l.what}</span>
                </a>
              </li>
            ))}
        </ul>
        <a href={allWork} className="mt-8 inline-flex text-sm text-foam/70 transition-colors hover:text-foam">
          All work by Mihael Turkalj →
        </a>
      </nav>

      {/* Most photos are CC BY / CC BY-SA, which require crediting their authors. */}
      <div className="mx-auto max-w-7xl border-t border-foam/10 px-6 py-6 text-xs text-foam/55 md:px-12">
        <details className="group">
          <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-2 gap-y-1 [&::-webkit-details-marker]:hidden">
            <span>The flight is AI-generated from real photos of the park.</span>
            <span className="text-foam/80 underline decoration-foam/30 underline-offset-4 group-hover:decoration-foam">Photo credits</span>
          </summary>
          <ul className="mt-4 columns-1 gap-8 space-y-2 leading-relaxed md:columns-2">
            {credits.map(([slug, c]) => {
              const url = licenseUrl(c.license)
              return (
                <li key={slug} className="break-inside-avoid">
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-foam/80 hover:underline">
                    {c.file.replace(/\.(jpe?g|png)$/i, '')}
                  </a>
                  {' by '}
                  {c.author || 'unknown'},{' '}
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </footer>
  )
}
