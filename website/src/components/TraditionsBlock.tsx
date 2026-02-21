import { classicAuthors, traditions, issueContents } from '@/data/content'
import { StickySlide } from './StickySlide'
import { AuthorCarousel } from './AuthorCarousel'

/** Slide 1: Tradition #1 + Classic authors */
export function TraditionsBlock() {
  const firstTradition = traditions[0]

  return (
    <StickySlide zIndex={1} id="traditions" className="flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 py-20" style={{ minHeight: 'calc(100vh - 10rem)' }}>
        {/* Left — Number top, title middle, text bottom */}
        <div className="flex flex-col">
          <span className="tradition-num">{firstTradition.num}</span>
          <h3
            className="text-stone-900 font-semibold mt-auto mb-auto"
            style={{ fontSize: '40px', fontFamily: "'Fact', sans-serif" }}
          >
            {firstTradition.title}
          </h3>
          <p
            className="text-stone-600 leading-relaxed"
            style={{ fontSize: '20px', lineHeight: '1.7' }}
          >
            {firstTradition.text}
          </p>
        </div>

        {/* Right — Classic authors gallery */}
        <div className="flex flex-col gap-8" style={{ paddingTop: '38px' }}>
          <h2
            className="text-stone-900 font-semibold"
            style={{ fontSize: '20px', fontFamily: "'Fact', sans-serif" }}
          >
            На&nbsp;страницах журнала в&nbsp;XX&nbsp;веке
          </h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {classicAuthors.map((a) => (
              <div
                key={a.name}
                className="author-circle-wrap flex flex-col items-center gap-3 relative"
              >
                <img
                  src={a.image}
                  alt={a.name}
                  className="author-circle"
                />
                <span
                  className="text-stone-700 text-center"
                  style={{ fontSize: '18px' }}
                >
                  {a.name}
                </span>
                <div className="author-tooltip">{a.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StickySlide>
  )
}

/** Slide 2: Tradition #2 — text left, Navoi illustration right */
export function Tradition2Block() {
  const tradition = traditions[1]

  return (
    <StickySlide zIndex={2} className="flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8" style={{ height: '66vh', boxSizing: 'border-box', overflow: 'hidden' }}>
        {/* Left — Number top, title middle, text bottom */}
        <div className="flex flex-col px-6 md:px-0">
          <span className="tradition-num">{tradition.num}</span>
          <div className="flex flex-col gap-2 mt-auto mb-auto">
            <h3
              className="text-stone-900 font-semibold"
              style={{ fontSize: '40px', fontFamily: "'Fact', sans-serif" }}
            >
              Алишер Навои
              <span className="text-stone-400" style={{ fontSize: '28px', fontWeight: 400 }}> (1441–1501)</span>
            </h3>
            <p
              className="text-stone-500"
              style={{ fontSize: '24px', fontFamily: "'Fact', sans-serif" }}
            >
              {tradition.title}
            </p>
          </div>
          <p
            className="text-stone-600 leading-relaxed"
            style={{ fontSize: '20px', lineHeight: '1.7' }}
          >
            {tradition.text}
          </p>
        </div>

        {/* Right — Navoi illustration */}
        <div className="flex items-end justify-center" style={{ minWidth: 0, overflow: 'hidden' }}>
          <img
            src="/images/navoi-transparent.png"
            alt="Алишер Навои"
            style={{ maxHeight: '53vh', width: 'auto', objectFit: 'contain', transform: 'scaleX(-1)' }}
          />
        </div>
      </div>
    </StickySlide>
  )
}

/** Slide 3: Tradition #3 + Carousel */
export function Tradition3WithContentsBlock() {
  const tradition = traditions[2]

  return (
    <StickySlide zIndex={3} id="contents" className="flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 flex flex-col gap-6" style={{ height: '100vh', boxSizing: 'border-box' }}>
        {/* Top row: number + title left, paragraph right — forming a visual rectangle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col">
            <span className="tradition-num">{tradition.num}</span>
            <h3
              className="text-stone-900 font-semibold mt-6"
              style={{ fontSize: '28px', fontFamily: "'Fact', sans-serif" }}
            >
              {tradition.title}
            </h3>
          </div>
          <p
            className="text-stone-600 leading-relaxed"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
          >
            {tradition.text}
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-12" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <AuthorCarousel slides={issueContents} caption="«Дружба народов» — июль, 2026" />
        </div>
      </div>
    </StickySlide>
  )
}
