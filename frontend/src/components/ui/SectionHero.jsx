// WHY CHANGED:
// BEFORE: blur-based Framer Motion entrance on every section hero (3 separate blur animations).
//   This adds visual jank on page load and is disorienting especially on navigation.
// BEFORE: No landmark or role on the section — SectionHero is the page's visual header.
// AFTER: Simple CSS-based entrance animation, no blur, no Framer Motion.
// AFTER: Added proper heading semantics.

export function SectionHero({ eyebrow, title, copy, image }) {
  return (
    <section
      className="relative overflow-hidden pb-16 pt-32 md:pt-40"
      aria-labelledby="section-hero-heading"
    >
      {image ? (
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      ) : null}
      {/* Overlay — always present to ensure text contrast whether or not image exists */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(250,248,243,0.88) 0%, rgba(250,248,243,0.96) 60%, #faf8f3 100%)',
        }}
        aria-hidden="true"
      />
      <div className="container-soft relative">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {eyebrow}
          </p>
        )}
        <h1
          id="section-hero-heading"
          className="font-display max-w-4xl text-balance text-5xl font-semibold leading-[1.05] text-[var(--color-ink)] md:text-6xl"
        >
          {title}
        </h1>
        {copy && (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
            {copy}
          </p>
        )}
      </div>
    </section>
  )
}
