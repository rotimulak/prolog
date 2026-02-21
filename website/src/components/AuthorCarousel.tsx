import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaCarouselType } from 'embla-carousel'

interface AuthorSlide {
  author: string
  title: string
  subtitle: string
  description: string
  image: string
}

interface AuthorCarouselProps {
  slides: AuthorSlide[]
  caption?: string
}

export function AuthorCarousel({ slides, caption }: AuthorCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    if ((autoplay as any).isPlaying()) {
      (autoplay as any).stop()
      setIsPlaying(false)
    } else {
      (autoplay as any).play()
      setIsPlaying(true)
    }
  }, [emblaApi])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)

    const autoplay = emblaApi.plugins()?.autoplay as any
    if (autoplay) {
      setIsPlaying(autoplay.isPlaying())
      emblaApi.on('autoplay:play' as any, () => setIsPlaying(true))
      emblaApi.on('autoplay:stop' as any, () => setIsPlaying(false))
    }

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Progress bar timer
  useEffect(() => {
    if (!emblaApi || !isPlaying) {
      setProgress(0)
      return
    }

    const interval = 50
    const duration = 3000
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval
      setProgress(Math.min((elapsed / duration) * 100, 100))
    }, interval)

    const resetProgress = () => {
      elapsed = 0
      setProgress(0)
    }

    emblaApi.on('select', resetProgress)

    return () => {
      clearInterval(timer)
      emblaApi.off('select', resetProgress)
    }
  }, [emblaApi, isPlaying, selectedIndex])

  return (
    <div className="carousel-root">
      {/* Viewport */}
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {slides.map((slide, idx) => (
            <div className="carousel-slide" key={idx}>
              <div className="carousel-card">
                <div className="carousel-card-top">
                  <p className="carousel-card-title">{slide.title}</p>
                  {slide.subtitle && (
                    <p className="carousel-card-subtitle">{slide.subtitle}</p>
                  )}
                  <p className="carousel-card-desc">{slide.description}</p>
                </div>
                <div className="carousel-card-bottom">
                  <img
                    src={slide.image}
                    alt={slide.author}
                    className="carousel-card-photo"
                  />
                  <p className="carousel-card-author">{slide.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="carousel-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Left: arrows */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            className="carousel-btn"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="carousel-btn"
            onClick={scrollNext}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Center: caption */}
        {caption && (
          <span
            className="text-stone-900 font-semibold"
            style={{ fontSize: '20px', fontFamily: "'Fact', sans-serif" }}
          >
            {caption}
          </span>
        )}

        {/* Right: dots + pause/play */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="carousel-progress-wrap">
            <div className="carousel-progress-bar">
              <div
                className="carousel-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="carousel-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${idx === selectedIndex ? 'active' : ''}`}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            className="carousel-btn"
            onClick={toggleAutoplay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="4" y="3" width="3.5" height="12" rx="1" fill="currentColor"/>
                <rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 3L15 9L5 15V3Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
