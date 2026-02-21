import { useEffect, useRef } from 'react'
import { HeroBlock } from '@/components/HeroBlock'
import { FloatingLogo } from '@/components/FloatingLogo'
import { TraditionsBlock, Tradition2Block, Tradition3WithContentsBlock } from '@/components/TraditionsBlock'
import { PreorderBlock } from '@/components/PreorderBlock'

export default function App() {
  const isScrolling = useRef(false)
  const currentSlide = useRef(0)

  useEffect(() => {
    const getSlideOffsets = () => {
      const slides = document.querySelectorAll<HTMLElement>('.slide')
      const offsets = [0]
      slides.forEach((el) => {
        offsets.push(el.offsetTop)
      })
      return offsets
    }

    const getCurrentIndex = (offsets: number[]) => {
      const scrollY = window.scrollY
      let idx = 0
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollY >= offsets[i] - 50) {
          idx = i
          break
        }
      }
      return idx
    }

    // Debounced sync — updates currentSlide only after manual scrolling stops
    let scrollDebounce: ReturnType<typeof setTimeout>
    const onScroll = () => {
      if (isScrolling.current) return
      clearTimeout(scrollDebounce)
      scrollDebounce = setTimeout(() => {
        const offsets = getSlideOffsets()
        currentSlide.current = getCurrentIndex(offsets)
      }, 150)
    }

    let scrollEndCleanup: (() => void) | null = null

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      e.preventDefault()
      if (isScrolling.current) return

      const offsets = getSlideOffsets()
      const cur = Math.min(currentSlide.current, offsets.length - 1)
      const next = e.key === 'ArrowDown'
        ? Math.min(cur + 1, offsets.length - 1)
        : Math.max(cur - 1, 0)

      if (next === cur) return

      currentSlide.current = next
      isScrolling.current = true
      window.scrollTo({ top: offsets[next], behavior: 'smooth' })

      // Reset isScrolling when scroll animation actually finishes
      if (scrollEndCleanup) scrollEndCleanup()
      const done = () => {
        isScrolling.current = false
        clearTimeout(fallback)
        scrollEndCleanup = null
      }
      window.addEventListener('scrollend', done, { once: true })
      const fallback = setTimeout(done, 1200)
      scrollEndCleanup = () => {
        window.removeEventListener('scrollend', done)
        clearTimeout(fallback)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(scrollDebounce)
      if (scrollEndCleanup) scrollEndCleanup()
    }
  }, [])

  return (
    <div className="bg-stone-50 text-stone-900">
      <HeroBlock />
      <FloatingLogo />
      {/* Spacer to offset fixed hero */}
      <div style={{ height: '100vh' }} />
      <TraditionsBlock />
      <Tradition2Block />
      <Tradition3WithContentsBlock />
      <PreorderBlock />
    </div>
  )
}
