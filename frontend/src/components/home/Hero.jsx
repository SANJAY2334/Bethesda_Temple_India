// WHY CHANGED:
// BEFORE: Three.js + React Three Fiber + Drei loaded lazily = ~1.6 MB bundle for a decorative
//   background. No content value. The cross silhouette could be achieved with 8 lines of CSS.
// BEFORE: text-8xl on mobile — overflows at 320px. No responsive font scaling.
// BEFORE: Blur filter on heading entrance animation — disorienting on first load.
// BEFORE: No visible service times structure — just a tiny sub-heading.
// AFTER: Static hero with a warm image background and CSS gradient overlay.
// AFTER: Proper responsive font scale (text-4xl → text-5xl → text-7xl).
// AFTER: Service times are prominently displayed as the secondary visual element.
// AFTER: Clean Framer Motion entrance (no blur, just opacity + y).

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Play } from 'lucide-react'
import { images } from '@/utils/images'

const serviceTimes = [
{
day: 'Friday',
times: ['6:30 PM - 8:30 PM'],
},
{
day: 'Sunday',
times: ['11:00 AM - 1:00 PM'],
},
{
day: 'Wednesday',
times: ['6:30 PM - 8:00 PM'],
},
]


export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 md:pt-28" aria-label="Welcome to Bethesda Temple">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={images.worshipHall}
          alt=""
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-cover"
        />
        {/* Warm overlay — preserves image context while ensuring text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(250,248,243,0.97) 0%, rgba(250,248,243,0.94) 40%, rgba(250,248,243,0.75) 70%, rgba(250,248,243,0.4) 100%)',
          }}
        />
      </div>

      <div className="container-soft relative grid min-h-[calc(100vh-112px)] items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text content */}
        <div>
          <motion.p
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Welcome — Bethesda Temple
          </motion.p>
          <motion.h1
            className="font-display text-balance text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            A home for worship, rest, and belonging.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-ink-muted)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            A peaceful, Christ-centered community learning to carry His warmth into everyday life
            — everyone is welcome here.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
          >
            <Link to="/contact" className="btn-primary">
              Plan Your Visit <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/livestream" className="btn-outline">
              <Play size={17} aria-hidden="true" /> Watch Live
            </Link>
          </motion.div>
        </div>

        {/* Service times card */}
        <motion.div
          className="card hidden max-w-sm p-8 lg:block"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Service times"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-accent-pale)]">
              <CalendarDays size={20} className="text-[var(--color-accent)]" aria-hidden="true" />
            </div>
            <p className="font-semibold text-[var(--color-ink)]">Service Times</p>
          </div>
          <ul className="space-y-5" aria-label="Weekly service schedule">
            {serviceTimes.map(({ day, times }) => (
              <li key={day}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  {day}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {times.map((time) => (
                    <li key={time} className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                      {time}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-[var(--color-border)] pt-5">
            <p className="font-display text-xl font-semibold italic leading-snug text-[var(--color-ink)]">
              "Come to me, all who are weary, and I will give you rest."
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-accent)]">Matthew 11:28</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
