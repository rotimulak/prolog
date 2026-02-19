import { useEffect, useRef } from 'react'

interface PageFlipTransitionProps {
  frontImage: string
  backContent: React.ReactNode
  trigger: boolean
  onComplete?: () => void
}

export function PageFlipTransition({ frontImage, backContent, trigger, onComplete }: PageFlipTransitionProps) {
  const flipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !flipRef.current) return
    flipRef.current.classList.add('flipped')
    const timer = setTimeout(() => onComplete?.(), 800)
    return () => clearTimeout(timer)
  }, [trigger, onComplete])

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-stone-900 overflow-hidden">
      {/* Ambient text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-stone-700 text-7xl font-serif tracking-widest select-none">
          1939 — 2026
        </p>
      </div>

      {/* 3D flip card */}
      <div
        ref={flipRef}
        className="flip-card w-72 h-96"
        style={{ perspective: '1200px' }}
      >
        <div
          className="flip-card-inner relative w-full h-full transition-transform duration-[900ms] ease-in-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front: past cover */}
          <div
            className="flip-card-front absolute inset-0"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={frontImage}
              alt="Обложки журнала"
              className="w-full h-full object-cover grayscale shadow-2xl"
            />
          </div>

          {/* Back: 2026 label */}
          <div
            className="flip-card-back absolute inset-0 bg-stone-100 flex flex-col items-center justify-center shadow-2xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {backContent}
          </div>
        </div>
      </div>

      <style>{`
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
