export function HeroBlock() {
  return (
    <section
      id="hero"
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', zIndex: 0 }}
    >
      {/* Background: ceramic tile pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/image-web.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'hero-zoom 20s ease-in-out infinite alternate',
        }}
      />
      {/* Stone overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(250, 250, 249, 0.87)' }}
      />

      {/* Centered composition */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-7 py-20">
        {/* Tagline above logo */}
        <p
          className="text-stone-600 leading-relaxed max-w-2xl"
          style={{ fontSize: '20px', fontWeight: 600 }}
        >
          Независимый ежемесячный литературно-художественный
          <br />
          и&nbsp;общественно-политический журнал
        </p>

        {/* Logo (hidden — floating clone rendered by FloatingLogo) */}
        <img
          id="hero-logo"
          src="/images/logo.png"
          alt="Дружба народов"
          style={{ width: '320px' }}
          className="object-contain"
        />

        {/* Headline below logo */}
        <h1
          className="text-stone-900 font-medium leading-tight"
          style={{ fontSize: '3.2rem', fontFamily: "'Fact', sans-serif" }}
        >
          Дружба народов.
          <br />
          Узбекский спецвыпуск
          <br />
          к&nbsp;585-летию Навои
        </h1>

        {/* CTA */}
        <a href="#preorder" className="btn-primary mt-4">
          Предзаказ · Июль 2026
        </a>

        {/* Lead */}
        <p
          className="text-stone-500"
          style={{ fontSize: '18px', letterSpacing: '0.15em' }}
        >
          Культурное событие, которое нельзя пропустить.
        </p>
      </div>
    </section>
  )
}
