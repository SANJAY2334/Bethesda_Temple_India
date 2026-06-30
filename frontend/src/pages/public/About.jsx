// WHY CHANGED:
// BEFORE: Values displayed in glass-panel cards with font-display text-3xl —
//   oversized for what is essentially a list of 4 bullet points; style over clarity.
// BEFORE: Hardcoded hex colors throughout.
// AFTER: Values in a clean list with checkmark icons — clear, readable, accessible.
// AFTER: All design token colors.
// AFTER: RevealPage replaces manual scope/useReveal pattern.

import { Check } from 'lucide-react'
import { SectionHero } from '@/components/ui/SectionHero'
import { PageTransition } from '@/components/common/PageTransition'
import { CTA } from '@/components/ui/CTA'
import { SEO } from '@/components/common/SEO'
import { RevealPage } from '@/components/ui/shared'
import { images } from '@/utils/images'

const beliefs = [
  {
    heading: 'Scripture-centred',
    copy: 'We believe the Bible is the living Word of God, sufficient for faith and life. Our teaching aims to be clear, faithful, and accessible.',
  },
  {
    heading: 'Prayer-formed',
    copy: 'We are a praying church. Corporate prayer, pastoral prayer, and personal devotion shape every aspect of our life together.',
  },
  {
    heading: 'Intergenerational',
    copy: 'Children, students, adults, and seniors worship together. Every generation has a place to grow, serve, and be known.',
  },
  {
    heading: 'Mercy-driven',
    copy: 'We serve our city with practical care — meals, visits, outreach, and benevolence — because the gospel moves toward need.',
  },
]

const values = [
  'Scripture-shaped worship',
  'Prayerful pastoral care',
  'Intergenerational community',
  'Mercy for the city',
  'Accessible, welcoming gatherings',
  'Safe and joyful ministry for families',
]

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About"
        path="/about"
        description="Learn the story, beliefs, and pastoral heart of Bethesda Temple."
      />
      <RevealPage>
        <SectionHero
          eyebrow="About Bethesda Temple"
          title="A church shaped by peace, truth, and generous belonging."
          copy="Our story is simple: receive the grace of Jesus, become a community of worship, and serve the city with quiet faithfulness."
          image={images.interior}
        />

        {/* Beliefs section */}
        <section className="container-soft py-16" aria-labelledby="beliefs-heading">
          <div className="reveal mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              What we believe
            </p>
            <h2 id="beliefs-heading" className="font-display mt-2 text-4xl font-semibold text-[var(--color-ink)]">
              Our pastoral rhythm
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
              We practice a calm, grounded faith: worship with beauty, teaching with clarity,
              hospitality with warmth, and ministry with integrity. Our gatherings are accessible
              for families, seniors, first-time guests, and anyone returning to faith.
            </p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {beliefs.map(({ heading, copy }) => (
              <li key={heading} className="reveal card p-7">
                <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)]">{heading}</h3>
                <p className="mt-3 leading-7 text-[var(--color-ink-muted)]">{copy}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Values list */}
        <section className="bg-[var(--color-surface-warm)] py-14" aria-labelledby="values-heading">
          <div className="container-soft grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal overflow-hidden rounded-2xl shadow-xl">
              <img
                src={images.community}
                alt="Bethesda Temple community at worship"
                className="h-full min-h-[340px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div >
              <h2 id="values-heading" className="font-display text-4xl font-semibold text-[var(--color-ink)]">
                What you can expect
              </h2>
              <ul className="mt-6 space-y-4" aria-label="Our values">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-pale)]">
                      <Check size={14} className="text-[var(--color-accent)]" aria-hidden="true" />
                    </span>
                    <span className="text-[var(--color-ink-muted)]">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CTA
          eyebrow="Visit us"
          title="Meet us this Sunday."
          copy="We would love to welcome you, answer your questions, and help you find your way."
          action="Plan Your Visit"
          to="/contact"
        />
      </RevealPage>
    </PageTransition>
  )
}
