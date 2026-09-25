import { OFFICIAL_SITE } from '../data/content'

export function WaterMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M6 3v18M12 3v18M18 3v18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 2.5" fill="none" />
    </svg>
  )
}

export default function Nav() {
  return (
    <header className="site-nav pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-500 ease-out">
      <nav aria-label="Main" className="glass pointer-events-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5">
        <a href="#top" className="flex items-center gap-2 text-[0.95rem] font-medium tracking-wide">
          <WaterMark className="size-5 text-lake" />
          Plitvice
        </a>
        <a
          href={OFFICIAL_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-lake px-4 py-2 text-sm font-medium text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-foam active:scale-[0.97]"
        >
          Official site<span className="sr-only"> of the national park (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  )
}
