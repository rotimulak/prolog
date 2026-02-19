import { useEffect, useRef, useState } from 'react'

interface Block {
  id: string
  content: React.ReactNode
}

interface StickyDiptychProps {
  blocks: Block[]
  coverFront: React.ReactNode
  coverBack?: React.ReactNode
  onExitReached?: () => void
}

export function StickyDiptych({ blocks, coverFront, coverBack, onExitReached }: StickyDiptychProps) {
  const [activeBlock, setActiveBlock] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    blockRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveBlock(i)
          }
        },
        { threshold: 0.4 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    // Exit observer — fires when last block leaves viewport
    if (onExitReached && sectionRef.current) {
      const exitObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            onExitReached()
          }
        },
        { threshold: 0 },
      )
      exitObserver.observe(sectionRef.current)
      observers.push(exitObserver)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [onExitReached])

  return (
    <div ref={sectionRef} className="flex min-h-screen">
      {/* Left: scrollable narrative */}
      <div className="w-1/2 px-16 py-24 space-y-32">
        {blocks.map((block, i) => (
          <div
            key={block.id}
            ref={(el) => { blockRefs.current[i] = el }}
            className={`transition-opacity duration-500 ${activeBlock === i ? 'opacity-100' : 'opacity-30'}`}
          >
            {block.content}
          </div>
        ))}
        {/* Spacer so last block can reach center of viewport */}
        <div className="h-[40vh]" />
      </div>

      {/* Right: sticky cover */}
      <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-12">
          {coverFront}
          {coverBack && (
            <div className="absolute inset-0 flex items-center justify-center p-12 opacity-0">
              {coverBack}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
