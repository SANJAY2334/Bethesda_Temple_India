// WHY CHANGED:
// BEFORE: No <label> elements — inputs use placeholder only.
// BEFORE: outline-none — no visible focus ring for keyboard users.
// BEFORE: Success state duplicated from Contact.jsx.
// AFTER: Proper labels, focus rings, autocomplete, reused SuccessState.

import { useState } from 'react'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage, SuccessState } from '@/components/ui/shared'
import { useMutation } from '@/hooks/useMutation'
import { contentService } from '@/services/contentService'
import { images } from '@/utils/images'

export default function PrayerRequests() {
  const [submitted, setSubmitted] = useState(false)
  const { mutate, loading, error } = useMutation(contentService.pray)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await mutate({
        name: form.get('name'),
        email: form.get('email'),
        request: form.get('request'),
        isConfidential: form.get('confidential') === 'on',
      })
      setSubmitted(true)
      event.currentTarget.reset()
    } catch {
      // error captured in hook
    }
  }

  return (
    <PageTransition>
      <SEO
        title="Prayer Requests"
        path="/prayer-requests"
        description="Share a confidential prayer request with the Bethesda Temple pastoral prayer team."
      />
      <RevealPage>
        <SectionHero
          eyebrow="Prayer"
          title="You do not have to carry this alone."
          copy="Share a prayer request with our trusted pastoral team. Confidential requests are protected and only visible to pastors."
          image={images.prayer}
        />
        <section className="container-soft py-16" aria-labelledby="prayer-form-heading">
          {submitted ? (
            <SuccessState
              title="Received with care"
              message="Your request has been shared with our pastoral prayer team. We are with you."
              resetLabel="Submit another request"
              onReset={() => setSubmitted(false)}
            />
          ) : (
            <div className="card mx-auto max-w-2xl p-8 md:p-10">
              <h2 id="prayer-form-heading" className="font-display text-3xl font-semibold text-[var(--color-ink)]">
                Share your prayer request
              </h2>
              <p className="mt-2 text-[var(--color-ink-muted)]">
                Your request is held with care and confidentiality.
              </p>
              <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5" aria-label="Prayer request form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prayer-name" className="text-sm font-semibold text-[var(--color-ink)]">
                      Your name <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="prayer-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="First name is fine"
                      className="form-field"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prayer-email" className="text-sm font-semibold text-[var(--color-ink)]">
                      Email <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="prayer-email"
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
                  <label htmlFor="prayer-request" className="text-sm font-semibold text-[var(--color-ink)]">
                    How can we pray with you? <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="prayer-request"
                    name="request"
                    required
                    rows={7}
                    placeholder="Share as much or as little as you'd like."
                    className="form-field resize-y"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id="prayer-confidential"
                    name="confidential"
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)] cursor-pointer"
                  />
                  <label htmlFor="prayer-confidential" className="text-sm text-[var(--color-ink-muted)] cursor-pointer">
                    Keep this confidential — for pastors only
                  </label>
                </div>
                {error && (
                  <p className="rounded-lg bg-[var(--color-error-bg)] px-4 py-3 text-sm font-medium text-[var(--color-error)]" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending your request…' : 'Send prayer request'}
                </button>
              </form>
            </div>
          )}
        </section>
      </RevealPage>
    </PageTransition>
  )
}
