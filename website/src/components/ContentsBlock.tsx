import { issueContents } from '@/data/content'

export function ContentsBlock() {
  return (
    <section
      id="contents"
      className="slide py-20"
      style={{ minHeight: '100vh', background: '#fafaf9' }}
    >
      {/* Section heading */}
      <h2
        className="text-center text-stone-900 font-semibold mb-16 px-6"
        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
      >
        «Дружба народов» — июль, 2026
      </h2>

      {/* Entries */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16 md:gap-20">
        {issueContents.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start"
          >
            {/* Photo — always left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={item.image}
                alt={item.author}
                className="content-photo"
              />
            </div>

            {/* Text — always right */}
            <div className="flex flex-col gap-2">
              <h3
                className="text-stone-900 font-semibold"
                style={{ fontSize: '23px' }}
              >
                {item.author}
              </h3>
              <p
                className="text-stone-700 italic"
                style={{ fontSize: '20px' }}
              >
                {item.title}
              </p>
              {item.subtitle && (
                <p
                  className="text-stone-500 uppercase tracking-wider"
                  style={{ fontSize: '18px' }}
                >
                  {item.subtitle}
                </p>
              )}
              <p
                className="text-stone-600 leading-relaxed mt-1"
                style={{ fontSize: '20px', lineHeight: '1.7' }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
