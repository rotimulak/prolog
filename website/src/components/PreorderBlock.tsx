import { prices } from '@/data/content'

export function PreorderBlock() {
  return (
    <section
      id="preorder"
      className="slide flex items-center justify-center relative"
      style={{ minHeight: '100vh', background: '#fafaf9', zIndex: 4 }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-14 py-20">
        {/* Section heading */}
        <h1
          className="text-stone-900 font-bold"
          style={{ fontSize: '2.267rem', fontFamily: "'Fact', sans-serif" }}
        >
          Внести вклад в&nbsp;развитие узбекской культуры
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — Preorder */}
          <div className="flex flex-col pr-0 md:pr-6">
            <h2
              className="text-stone-900 font-semibold"
              style={{ fontSize: '1.75rem', fontFamily: "'Fact', sans-serif" }}
            >
              Оформить предзаказ
            </h2>

            <div className="flex flex-col mt-8">
              {prices.map((p, i) => (
                <div key={i} className="price-row">
                  <span
                    className="text-stone-700"
                    style={{ fontSize: '21px' }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="text-stone-900 font-semibold"
                    style={{ fontSize: '21px' }}
                  >
                    {p.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 flex flex-col items-start gap-3">
              <a href="#" className="btn-primary">
                Оформить предзаказ
              </a>
              <a
                href="#"
                className="text-stone-500 hover:text-stone-700 transition-colors"
                style={{ fontSize: '15px', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Условия и&nbsp;детали доставки
              </a>
            </div>
          </div>

          {/* Right — Sponsorship */}
          <div className="flex flex-col">
            <h2
              className="text-stone-900 font-semibold"
              style={{ fontSize: '1.75rem', fontFamily: "'Fact', sans-serif" }}
            >
              Стать меценатом выпуска
            </h2>

            <p
              className="text-stone-500 mt-6"
              style={{ fontSize: '21px' }}
            >
              Для организаций, сообществ и&nbsp;культурных центров
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <p
                className="text-stone-600 leading-relaxed"
                style={{ fontSize: '21px', lineHeight: '1.7' }}
              >
                Помочь номеру и&nbsp;получить благодарность и&nbsp;подарки
                редакции.
              </p>
              <p
                className="text-stone-600 leading-relaxed"
                style={{ fontSize: '21px', lineHeight: '1.7' }}
              >
                Пакеты участия от&nbsp;20&nbsp;000&nbsp;₽
                до&nbsp;1&nbsp;500&nbsp;000&nbsp;₽.
              </p>
            </div>

            <div className="mt-auto pt-10 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Имя"
                  className="preorder-input"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="preorder-input"
                />
              </div>
              <a href="#" className="btn-primary self-start">
                Получить презентацию
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
