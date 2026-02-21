import { useRef, useEffect, useState, type ReactNode } from 'react'

interface StickySlideProps {
  children: ReactNode
  zIndex: number
  id?: string
  className?: string
  style?: React.CSSProperties
}

export function StickySlide({ children, zIndex, id, className = '', style }: StickySlideProps) {
  const ref = useRef<HTMLElement>(null)
  const [dimOpacity, setDimOpacity] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const next = el.nextElementSibling as HTMLElement | null
      if (!next) { setDimOpacity(0); return }

      const nextTop = next.getBoundingClientRect().top
      const viewH = window.innerHeight

      if (nextTop >= viewH) {
        setDimOpacity(0)
      } else if (nextTop <= 0) {
        setDimOpacity(0.45)
      } else {
        setDimOpacity(0.45 * (1 - nextTop / viewH))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`slide sticky top-0`}
      style={{
        minHeight: '120vh',
        background: '#fafaf9',
        zIndex,
        boxShadow: '0 -8px 30px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      <div className={`h-screen ${className}`}>
        {children}
      </div>
      {/* Dim overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `rgba(0,0,0,${dimOpacity})`,
          transition: 'background 0.05s linear',
        }}
      />
    </section>
  )
}
