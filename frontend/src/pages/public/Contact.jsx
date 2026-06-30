// WHY CHANGED:
// BEFORE: No <label> elements on any input — only placeholder text (disappears on focus).
// BEFORE: outline-none on all fields — keyboard users have no focus indicator.
// BEFORE: Two-column input grid at 320px — inputs too small to use.
// AFTER: Proper <label> elements, autocomplete attributes, visible focus rings via .form-field.
// AFTER: Single-column stacking on small screens.
// AFTER: SuccessState component reused instead of duplicate markup.

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage, SuccessState } from '@/components/ui/shared'
import { useMutation } from '@/hooks/useMutation'
import { contentService } from '@/services/contentService'
import { images } from '@/utils/images'
import ChurchMap from '@/components/maps/ChurchMap'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { mutate, loading, error } = useMutation(contentService.contact)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await mutate({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      })
      setSubmitted(true)
      event.currentTarget.reset()
    } catch {
      // error is captured in the hook
    }
  }

  return (
    <PageTransition>
      <SEO
  title="Contact | Bethesda Temple"
  path="/contact"
  description="Visit Bethesda Temple in Belagavi, Karnataka. Join us for worship, prayer, and fellowship."
/>
      <RevealPage>
        <SectionHero
          eyebrow="Contact"
         title="Welcome to Bethesda Temple"
         copy="Join us for worship, prayer, fellowship, and spiritual growth. We'd be delighted to welcome you."
          image={images.interior}
        />
        <section className="container-soft grid gap-8 py-16 lg:grid-cols-[0.85fr_1fr]" aria-labelledby="contact-heading">
          {/* Contact info */}
          <div className="card p-8">
  <h2
    id="contact-heading"
    className="font-display text-3xl font-semibold text-[var(--color-ink)]"
  >
    Visit Bethesda Temple
  </h2>

  <address className="mt-6 not-italic space-y-4 text-[var(--color-ink-muted)]">
    <p className="flex items-start gap-3">
      <MapPin
        size={18}
        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
        aria-hidden="true"
      />

      <a
        href="https://maps.google.com/?q=15.887347,74.511934"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[var(--color-ink)] hover:underline"
      >
        Ataide Plaza, 3rd Floor,
        <br />
        Below Union Bank of India ATM,
        <br />
        Shahu Nagar, Bauxite Road,
        <br />
        Belagavi, Karnataka 590010
      </a>
    </p>

    <p className="flex gap-3">
      <Phone
        size={18}
        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
        aria-hidden="true"
      />

      <a
        href="tel:+917349231349"
        className="hover:text-[var(--color-ink)] hover:underline"
      >
        +91 73492 31349
      </a>
    </p>

    <p className="flex gap-3">
      <Mail
        size={18}
        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
        aria-hidden="true"
      />

      <a
        href="mailto:bethesdatempleministries7@gmail.com"
        className="hover:text-[var(--color-ink)] hover:underline break-all"
      >
        bethesdatempleministries7@gmail.com
      </a>
    </p>
  </address>

  <div className="relative z-0 mt-8">
    <ChurchMap />
  </div>

  <div className="mt-8 border-t border-[var(--color-border)] pt-6">
  <h3 className="font-semibold text-[var(--color-ink)]">
    Service Timings
  </h3>

  <ul className="mt-4 space-y-4 text-[var(--color-ink-muted)]">
    <li>
      <strong className="text-[var(--color-ink)]">Sunday Worship Service</strong>
      <br />
      11:00 AM – 1:00 PM
    </li>

    <li>
      <strong className="text-[var(--color-ink)]">Wednesday Supernatural Deliverance Prayer</strong>
      <br />
      6:30 PM – 8:00 PM
    </li>

    <li>
      <strong className="text-[var(--color-ink)]">Friday Fasting Prayer Service</strong>
      <br />
      6:30 PM – 8:30 PM
    </li>
  </ul>
</div>
</div>

          {/* Form or success */}
          {submitted ? (
            <SuccessState
              title="Message received"
              message="Thank you for reaching out. We'll get back to you soon."
              resetLabel="Send another message"
              onReset={() => setSubmitted(false)}
            />
          ) : (
            <div className="card p-8">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                Connect With Us
              </h2>
              <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4" aria-label="Contact form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-[var(--color-ink)]">
                      Name <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="form-field"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-[var(--color-ink)]">
                      Email <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="form-field"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-[var(--color-ink)]">
                    Message <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={7}
                    required
                    placeholder="How can we help?"
                    className="form-field resize-y"
                  />
                </div>
                {error && (
                  <p className="rounded-lg bg-[var(--color-error-bg)] px-4 py-3 text-sm font-medium text-[var(--color-error)]" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </div>
          )}
        </section>
      </RevealPage>
    </PageTransition>
  )
}
