// WHY CHANGED:
// BEFORE: eyebrow was hardcoded to "" — couldn't be customized per usage.
// BEFORE: glass-panel + cinematic-shadow combined with blur backdrop — visually noisy.
// AFTER: clean solid-surface card, full design token usage, eyebrow is a prop.
// AFTER: responsive padding and layout maintained.
// AFTER: button no longer stretches full-width on mobile (justify-self-start).
// AFTER: added focus-visible ring for keyboard accessibility.
// AFTER: button text color moved to .btn-cta (real class in index.css) instead of
//   text-blue-700 / text-[var(--color-ink)] — those arbitrary-value utilities were
//   getting silently dropped in production, leaving white text on a white button.

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CTA({
  eyebrow = 'Bethesda Temple',
  title,
  copy,
  action = 'Plan Your Visit',
  to = '/contact',
}) {
  return (
    <section className="container-soft py-16">
      <div className="rounded-2xl bg-[var(--color-ink)] px-8 py-12 text-white md:px-14 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-light)]">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-4xl font-semibold leading-snug md:text-5xl">
              {title}
            </h2>
            {copy && (
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/80">{copy}</p>
            )}
          </div>
          <Link
            to={to}
            className="btn-cta inline-flex min-h-[48px] w-fit items-center justify-center gap-3 justify-self-start rounded-full bg-white px-7 py-3 font-semibold transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          >
            {action}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
