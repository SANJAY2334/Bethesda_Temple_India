// WHY CHANGED:
// BEFORE: alt="" on every image — all images announced as decorative to screen readers.
// BEFORE: ArrowUpRight icon decorative but not hidden from AT.
// AFTER: accepts `imageAlt` prop; falls back to title if not provided.
// AFTER: removed gratuitous hover:scale-105 zoom on images — disorienting for a church site.
// AFTER: cleaner card design using design system tokens instead of hardcoded colors.

export function ContentCard({ image, imageAlt, title, meta, children }) {
  const alt = imageAlt || title

  return (
    <article className="card overflow-hidden">
      {image ? (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="p-6">
        {meta ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {meta}
          </p>
        ) : null}
        <h3 className="font-display text-2xl font-semibold leading-snug text-[var(--color-ink)]">
          {title}
        </h3>
        {children ? (
          <div className="mt-3 text-[var(--color-ink-muted)]">{children}</div>
        ) : null}
      </div>
    </article>
  )
}
