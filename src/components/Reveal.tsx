import { createElement, useEffect, useRef, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' }

/** Fades and lifts its content in once, the first time it scrolls into view. */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.in = 'true'
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return createElement(as, { ref, className: `reveal ${className}`, style: delay ? { transitionDelay: `${delay}ms` } : undefined }, children)
}
