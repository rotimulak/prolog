import { useState, useEffect, useRef, useCallback } from 'react'
import { journal, issue2026, authors2026 } from '@/data/content'
import { ClassicsGrid } from '@/components/ClassicsGrid'

// ─── Parallax hook ────────────────────────────────────────────────────────────
function useActiveBlock(count: number) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.4 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [count])

  return { active, refs }
}

// ─── Block wrapper ─────────────────────────────────────────────────────────────
function Block({
  children,
  isActive,
  refCb,
}: {
  children: React.ReactNode
  isActive: boolean
  refCb: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={refCb}
      className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-2'}`}
    >
      {children}
    </div>
  )
}

// ─── Journal card (used both in sticky column and in flip overlay) ─────────────
function JournalCard() {
  return (
    <div
      className="relative w-64 xl:w-72 bg-white flex flex-col overflow-hidden"
      style={{
        boxShadow: '8px 8px 0 0 #a8a29e, 16px 16px 0 0 #d6d3d1, -2px 4px 32px 0 rgba(0,0,0,0.18)',
        minHeight: '440px',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-stone-800" />
      <img
        src={journal.coverPast}
        alt="Обложки журнала"
        className="w-full h-52 object-cover grayscale"
      />
      <div className="pl-6 pr-4 pt-5 pb-8 flex flex-col gap-2 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Специальный выпуск</p>
        <h2 className="text-2xl xl:text-3xl font-bold text-stone-900 leading-tight">
          Узбекский<br />номер
        </h2>
        <p className="text-4xl font-bold text-stone-200 leading-none mt-auto">2026</p>
        <p className="text-xs text-stone-400 leading-relaxed">
          585-летие Алишера Навои.<br />Дружба народов.
        </p>
      </div>
    </div>
  )
}

// ─── Page flip overlay ────────────────────────────────────────────────────────
function PageFlipOverlay({ visible, onDone }: { visible: boolean; onDone: () => void }) {
  const doneCalled = useRef(false)

  useEffect(() => {
    if (!visible || doneCalled.current) return
    doneCalled.current = true
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [visible, onDone])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ perspective: '1800px' }}
    >
      {/* The page that flips: starts at right half, pivots on left edge (= screen center) */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        style={{
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          animation: 'pageFlip 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      >
        {/* Front face: journal cover */}
        <div
          className="absolute inset-0 bg-stone-200 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <JournalCard />
        </div>

        {/* Back face: appears on the left side after flip */}
        <div
          className="absolute inset-0 bg-stone-50 flex flex-col items-center justify-center px-12 gap-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Специальный выпуск</p>
          <h2 className="text-4xl font-bold text-stone-900 text-center leading-tight">
            Узбекский<br />номер
          </h2>
          <p className="text-7xl font-bold text-stone-200 leading-none">2026</p>
        </div>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [flipped, setFlipped] = useState(false)
  const [flipTriggered, setFlipTriggered] = useState(false)
  const act1TriggerRef = useRef<HTMLDivElement>(null)

  // Trigger flip when the end of Act 1 scrolls into view
  useEffect(() => {
    if (!act1TriggerRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFlipTriggered(true) },
      { threshold: 0.8 },
    )
    obs.observe(act1TriggerRef.current)
    return () => obs.disconnect()
  }, [])

  const handleFlipDone = useCallback(() => setFlipped(true), [])

  // ── Past blocks (Act 1) ──
  const { active: pastActive, refs: pastRefs } = useActiveBlock(3)

  // ── Act 2 right column items: header + 4 content items + 5 authors = 10 total ──
  const rightPanelCount = 1 + issue2026.contents.length + authors2026.length
  const { active: rightActive, refs: rightRefs } = useActiveBlock(rightPanelCount)

  return (
    <div className="font-serif bg-stone-50 text-stone-900">

      {/* ══ ACT 1: ПРОШЛОЕ ════════════════════════════════════════════════════ */}
      <div className="flex">
        {/* Left: narrative */}
        <div className="w-1/2 px-12 xl:px-20 py-24 space-y-40">

          {/* Block 0 — Hero */}
          <Block isActive={pastActive === 0} refCb={(el) => { pastRefs.current[0] = el }}>
            <div className="min-h-[70vh] flex flex-col justify-center">
              <img src={journal.logo} alt="Логотип ДН" className="h-14 mb-10 object-contain object-left" />
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">{journal.subtitle}</p>
              <h1 className="text-5xl xl:text-7xl font-bold tracking-tight text-stone-900 leading-none mb-6">
                {journal.title}
              </h1>
              <p className="text-stone-400 text-sm mt-4">{journal.founded}</p>
            </div>
          </Block>

          {/* Block 1 — Миссия */}
          <Block isActive={pastActive === 1} refCb={(el) => { pastRefs.current[1] = el }}>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Миссия издания</p>
            <ul className="space-y-4">
              {journal.mission.map((m, i) => (
                <li key={i} className="flex gap-3 items-start text-stone-700">
                  <span className="text-stone-300 mt-1">—</span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* Block 2 — Классики XX века */}
          <Block isActive={pastActive === 2} refCb={(el) => { pastRefs.current[2] = el }}>
            <ClassicsGrid />
          </Block>

          {/* Flip trigger point */}
          <div ref={act1TriggerRef} className="h-[30vh]" />
        </div>

        {/* Right: sticky journal card */}
        <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-stone-200 overflow-hidden">
          <JournalCard />
        </div>
      </div>

      {/* ══ PAGE FLIP OVERLAY ════════════════════════════════════════════════ */}
      <PageFlipOverlay visible={flipTriggered && !flipped} onDone={handleFlipDone} />

      {/* ══ ACT 2: НАСТОЯЩЕЕ ══════════════════════════════════════════════════ */}
      <div className={`flex transition-opacity duration-700 ${flipped ? 'opacity-100' : 'opacity-0'}`}>

        {/* Left: scroll triggers */}
        <div className="w-1/2 px-12 xl:px-20 py-24 space-y-[70vh]">
          {/* Trigger 0: Header */}
          <div ref={(el) => { rightRefs.current[0] = el }} className="min-h-[50vh]">
            <p className="text-xs uppercase tracking-widest text-stone-400">Прокрутите вниз →</p>
          </div>

          {/* Triggers 1-4: Issue contents */}
          {issue2026.contents.map((_, i) => (
            <div key={i} ref={(el) => { rightRefs.current[i + 1] = el }} className="min-h-[50vh]" />
          ))}

          {/* Triggers 5-9: Authors */}
          {authors2026.map((author, i) => (
            <div
              key={author.name}
              ref={(el) => { rightRefs.current[5 + i] = el }}
              className="min-h-[50vh] flex items-start"
            >
              <p className="text-xs uppercase tracking-widest text-stone-400">{author.name}</p>
            </div>
          ))}

          <div className="h-[30vh]" />
        </div>

        {/* Right: sticky panels */}
        <div className="w-1/2 sticky top-0 h-screen overflow-hidden">
          {/* Panel 0: Header */}
          <div
            className={`absolute inset-0 bg-stone-50 flex flex-col items-center justify-center px-16 transition-all duration-700 ${
              rightActive === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">Специальный выпуск</p>
            <h2 className="text-4xl font-bold text-stone-900 text-center leading-tight mb-2">
              Узбекский номер
            </h2>
            <p className="text-6xl font-bold text-stone-200 leading-none">2026</p>
          </div>

          {/* Panels 1-4: Issue contents */}
          {issue2026.contents.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-white flex items-center justify-center px-12 transition-all duration-700 ${
                rightActive === i + 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="max-w-lg">
                <span className="text-7xl font-bold text-stone-100 leading-none block mb-6 tabular-nums">
                  0{i + 1}
                </span>
                <p className="text-stone-800 text-xl leading-relaxed">{item}</p>
              </div>
            </div>
          ))}

          {/* Panels 5-9: Authors */}
          {authors2026.map((author, i) => (
            <div
              key={author.name}
              className={`absolute inset-0 bg-stone-900 flex flex-col justify-end p-12 transition-all duration-700 ${
                rightActive === i + 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {author.image && (
                <img
                  src={author.image}
                  alt={author.name}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
                />
              )}
              {!author.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-stone-700 text-[8rem] font-bold leading-none select-none">
                    {author.name[0]}
                  </span>
                </div>
              )}
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">{author.role}</p>
                <h3 className="text-3xl font-bold text-white mb-3">{author.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-sm">{author.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="bg-stone-900 text-stone-500 text-center py-12 text-xs tracking-widest uppercase">
        Журнал «Дружба народов» — с 1939 года
      </footer>
    </div>
  )
}
