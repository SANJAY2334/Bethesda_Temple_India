// WHY CHANGED:
// BEFORE: Dropdowns opened only on mouseenter — keyboard users could never access sub-items.
// BEFORE: Mobile nav blur animation (filter: blur(12px)) on open/close — distracting.
// BEFORE: No skip-to-content link — keyboard users must tab through all nav items on every page.
// BEFORE: top-4 fixed positioning clips on some mobile safe areas.
// AFTER: Full keyboard navigation on dropdowns (Escape to close, focus management).
// AFTER: Skip to main content link.
// AFTER: Clean animations without blur.
// AFTER: Design token colors throughout.
// AFTER: Mobile nav now renders group.items as an accordion for groups that have
//   them (Ministries, Media, Get Involved) — previously only group.to rendered,
//   so Gallery, Livestream, Youth Ministry, Volunteer, etc. were unreachable
//   on mobile entirely.
// AFTER: Mobile nav now closes on actual route change via useLocation(), not
//   just on mount — the old effect had an empty dependency array and never
//   re-ran, so it only worked because every Link also called setMobileOpen
//   directly.

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'


const groups = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
 {
  label: 'Ministries',
  to: '/ministries',
  items: [
    ['Youth Ministry', '/ministries#youth'],
    ['Village Outreach Ministry', '/ministries#village-outreach'],
    ['Sunday School', '/ministries#sunday-school'],
    ["Women's & Men's Ministry", '/ministries#men-women'],
  ],
},
  {
    label: 'Media',
    to: '/sermons',
    items: [
      ['Sermons', '/sermons'],
      ['Gallery', '/gallery'],
      ['Livestream', '/livestream'],
    ],
  },
  {
    label: 'Get Involved',
    to: '/prayer-requests',
    items: [
      ['Prayer Requests', '/prayer-requests'],
      ['Volunteer', '/volunteer'],
      ['Donations', '/donations'],
    ],
  },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      aria-label="Bethesda Temple — home page"
    >
      <img
  src="/Church icon.svg"
  alt="Bethesda Temple Logo"
  className="h-12 w-12 object-contain"
/>

      <span>
        <span className="font-display block text-lg font-semibold leading-5 text-[var(--color-ink)]">
          Bethesda Temple
        </span>

        <span className="text-xs uppercase tracking-widest text-[var(--color-ink-faint)]">
          Church of Yeshua
        </span>
      </span>
    </Link>
  )
}

function DesktopDropdown({ group }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  // Close on Escape
  function handleKeyDown(event) {
    if (event.key === 'Escape') setOpen(false)
  }

  // Close when focus leaves the container
  function handleBlur(event) {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        {group.label}
        <ChevronDown size={13} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-[var(--color-border)] bg-white py-2 shadow-xl shadow-[var(--color-ink)]/10"
            role="menu"
          >
            {group.items.map(([label, to]) => (
              <Link
                key={label}
                to={to}
                role="menuitem"
                className="block px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)] focus-visible:bg-[var(--color-surface-warm)] focus-visible:outline-none"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopLink({ group }) {
  if (group.items) return <DesktopDropdown group={group} />

  return (
    <NavLink
      to={group.to}
      end={group.to === '/'}
      className={({ isActive }) =>
        `relative rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
          isActive
            ? 'text-[var(--color-ink)]'
            : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {group.label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-accent)]"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

// Mobile nav item: plain link for simple groups, accordion for groups with items
function MobileNavItem({ group, onNavigate }) {
  const [expanded, setExpanded] = useState(false)

  if (!group.items) {
    return (
      <li>
        <Link
          to={group.to}
          onClick={onNavigate}
          className="block rounded-xl px-4 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-warm)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        >
          {group.label}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`mobile-submenu-${group.label}`}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-warm)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        {group.label}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            id={`mobile-submenu-${group.label}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden pl-4"
          >
            {group.items.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={onNavigate}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change (pathname or hash)
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      {/* Skip to content — visible on focus for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? 'border-[var(--color-border)] bg-white/95 shadow-lg shadow-[var(--color-ink)]/8 backdrop-blur-md'
              : 'border-white/60 bg-white/80 backdrop-blur-sm'
          }`}
          aria-label="Primary navigation"
        >
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex" role="list">
            {groups.map((group) => (
              <div key={group.label} role="listitem">
                <DesktopLink group={group} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/donations"
              className="btn-primary hidden text-sm md:inline-flex"
            >
              Give
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-ink)] transition hover:bg-[var(--color-surface-warm)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-2 max-w-7xl rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-xl lg:hidden"
            >
              <nav aria-label="Mobile navigation">
                <ul className="grid gap-1">
                  {groups.map((group) => (
                    <MobileNavItem
                      key={group.label}
                      group={group}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                  <li>
                    <Link
                      to="/donations"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary mt-2 w-full justify-center"
                    >
                      Give
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
