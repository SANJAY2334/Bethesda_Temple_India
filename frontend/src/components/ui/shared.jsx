// WHY: Extracted shared patterns from Contact, PrayerRequests, Events, Sermons.
// Each page was copy-pasting identical skeleton loaders, error states, success states,
// and form field markup. This file centralizes them under a single source of truth.

import { AlertCircle, CheckCircle } from 'lucide-react'

// ─── RevealPage ─────────────────────────────────────────────────────────────
// Replaces the repeated `const scope = useRef(); useReveal(scope); <div ref={scope}>`
// pattern found in every public page.

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

export function RevealPage({ children, className = '' }) {
  const scope = useRef(null)
  useReveal(scope)
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}

// ─── FormField ──────────────────────────────────────────────────────────────
// BEFORE: every input was `<input className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none" />`
// with no <label>, no focus ring, no autocomplete.
// AFTER: visible label, proper focus ring, accessible, styled consistently.

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
  rows,
  className = '',
}) {
  const id = `field-${name}`
  const Tag = rows ? 'textarea' : 'input'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">*</span>}
      </label>
      <Tag
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        rows={rows}
        className="form-field"
      />
    </div>
  )
}

// ─── CardSkeleton ────────────────────────────────────────────────────────────
// Replaced duplicate EventSkeleton / SermonSkeleton in Events.jsx and Sermons.jsx

export function CardSkeleton({ showImage = true }) {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white/50">
      {showImage && <div className="h-48 bg-[#c8dde8]/50" />}
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-full bg-[#c8dde8]/50" />
        <div className="h-3 w-1/2 rounded-full bg-[#c8dde8]/40" />
        <div className="mt-4 h-8 w-32 rounded-full bg-[#c8dde8]/30" />
      </div>
    </div>
  )
}

// ─── ErrorMessage ────────────────────────────────────────────────────────────
// Replaced duplicate error state divs in Events.jsx, Sermons.jsx, Gallery.jsx

export function ErrorMessage({ message, className = '' }) {
  return (
    <div
      className={`col-span-full flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-red-800 ${className}`}
      role="alert"
    >
      <AlertCircle size={20} aria-hidden="true" className="shrink-0" />
      <p className="font-medium">{message}</p>
    </div>
  )
}

// ─── SuccessState ────────────────────────────────────────────────────────────
// Replaced duplicate success confirmation panels in Contact.jsx and PrayerRequests.jsx

export function SuccessState({ title, message, resetLabel = 'Send another', onReset }) {
  return (
    <div className="card mx-auto flex max-w-2xl flex-col items-center gap-5 p-12 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-accent-pale)]">
        <CheckCircle className="text-[var(--color-accent)]" size={32} aria-hidden="true" />
      </div>
      <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)]">{title}</h2>
      <p className="max-w-sm text-[var(--color-ink-muted)]">{message}</p>
      <button onClick={onReset} className="btn-outline mt-2">
        {resetLabel}
      </button>
    </div>
  )
}

// ─── EmptyState ──────────────────────────────────────────────────────────────

export function EmptyState({ message }) {
  return (
    <p className="col-span-full py-16 text-center text-[var(--color-ink-muted)]">{message}</p>
  )
}
