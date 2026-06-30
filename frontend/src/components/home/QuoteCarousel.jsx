// WHY CHANGED:
// BEFORE: Auto-advancing content with no pause mechanism — WCAG 2.2.2 violation.
// BEFORE: Blur-based animation on quote transitions.
// BEFORE: No aria-live region — screen readers don't announce quote changes.
// AFTER: Pauses on hover and focus.
// AFTER: aria-live="polite" announces quote changes to screen readers.
// AFTER: Navigation dots for manual control (meeting WCAG 2.2.2).
// AFTER: Clean fade transition without blur.

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quotes } from '@/utils/content'

export function QuoteCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const advance = useCallback(() => {
    setIndex((v) => (v + 1) % quotes.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    intervalRef.current = window.setInterval(advance, 5000)
    return () => window.clearInterval(intervalRef.current)
  }, [paused, advance])

  return (
    <section
      className="container-soft py-14"
      aria-roledescription="carousel"
      aria-label="Scripture for the week"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="rounded-2xl bg-[var(--color-ink)] px-8 py-12 text-center text-white md:px-16 md:py-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-light)]">
          Scripture for the week
        </p>
        {/* aria-live announces changes to screen readers */}
        <div aria-live="polite" aria-atomic="true" className="min-h-[6rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quotes[index]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-snug md:text-4xl"
            >
              &ldquo;{quotes[index]}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation dots — manual control (WCAG 2.2.2) */}
        <div className="mt-8 flex justify-center gap-3" role="tablist" aria-label="Quote navigation">
          {quotes.map((quote, i) => (
            <button
              key={quote}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote ${i + 1}`}
              onClick={() => { setIndex(i); setPaused(true) }}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                i === index ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
