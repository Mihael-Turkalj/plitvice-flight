import type { ReactNode } from 'react'
import { OFFICIAL_SITE } from '../../data/content'
import Reveal from '../Reveal'

export function SectionHead({ label, title, intro, id }: { label: string; title: ReactNode; intro?: ReactNode; id: string }) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="label text-lake">{label}</p>
        <h2 id={id} className="display mt-5 text-[clamp(2.2rem,4.4vw,4rem)]">
          {title}
        </h2>
      </div>
      {intro && <p className="text-lg leading-relaxed text-mist lg:col-span-5">{intro}</p>}
    </Reveal>
  )
}

export function Arrow({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The one outbound action on the page: the park's own website. */
export function OfficialButton({ children = 'Official park website', size = 'md' }: { children?: ReactNode; size?: 'md' | 'lg' }) {
  return (
    <a
      href={OFFICIAL_SITE}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full bg-lake font-medium text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-foam active:scale-[0.97] ${
        size === 'lg' ? 'py-4 pr-4 pl-7 text-lg' : 'py-3 pr-3 pl-6'
      }`}
    >
      {children}
      <span className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <Arrow />
      </span>
      <span className="sr-only"> (np-plitvicka-jezera.hr, opens in a new tab)</span>
    </a>
  )
}
