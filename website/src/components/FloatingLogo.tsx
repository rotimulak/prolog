import { useEffect, useRef } from 'react'

/**
 * Floating logo that stays on top of all slides.
 *
 * Scroll behaviour (relative to the hero→slide-1 transition, i.e. the
 * first 100vh of scroll):
 *   0 – 66 %   logo sits at its original hero position & size
 *  66 – 100 %  logo shrinks ×5 and moves to 20 px from the top edge
 * After that it stays small & pinned for the rest of the page.
 */
export function FloatingLogo() {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const floating = ref.current
    const original = document.getElementById('hero-logo')
    if (!floating || !original) return

    // Hide the original — the floating clone takes over
    original.style.visibility = 'hidden'

    const endTop = 20

    const update = () => {
      // Re-measure the original on every frame so we track layout
      // shifts caused by font loading, resize, etc.  Hero is
      // position:fixed so getBoundingClientRect is stable vs scroll.
      const rect = original.getBoundingClientRect()
      const startW = rect.width        // 320
      const startTop = rect.top
      const startLeft = rect.left
      const endW = startW / 5           // 64

      const scrollY = window.scrollY
      const vh = window.innerHeight
      const begin = vh * (2 / 3)      // animation starts
      const end = vh                  // animation ends

      let t: number  // 0→1 progress
      if (scrollY <= begin) {
        t = 0
      } else if (scrollY >= end) {
        t = 1
      } else {
        t = (scrollY - begin) / (end - begin)
      }

      // Ease-out for smoother deceleration
      const ease = 1 - (1 - t) * (1 - t)

      const w = startW + (endW - startW) * ease
      const top = startTop + (endTop - startTop) * ease

      // When fully shrunk the logo is horizontally centred
      const endLeft = (window.innerWidth - endW) / 2
      const left = startLeft + (endLeft - startLeft) * ease

      floating.style.width = `${w}px`
      floating.style.top = `${top}px`
      floating.style.left = `${left}px`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      original.style.visibility = 'visible'
    }
  }, [])

  return (
    <img
      ref={ref}
      src="/images/logo.png"
      alt="Дружба народов"
      className="object-contain pointer-events-none"
      style={{ position: 'fixed', zIndex: 9999 }}
    />
  )
}
