// WHY CHANGED:
// BEFORE: text-white/55 on dark navy background — computed contrast ~3.8:1, fails WCAG AA (4.5:1 required).
// BEFORE: No nav landmark for footer links.
// AFTER: text-white/80 ensures sufficient contrast.
// AFTER: Added <nav> with aria-label for footer links.
// AFTER: Added service times to footer — a key piece of info visitors look for.

import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = ['Sermons', 'Events', 'Prayer Requests', 'Donations', 'Contact']

export function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-ink)] text-white">
      <div className="container-soft grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold">Bethesda Temple
</h2>
          <p className="mt-4 max-w-xs leading-7 text-white/75">
            A Christ-centered community learning to receive grace and become a harbor of hope for
            our city.
          </p>
        </div>

        <div>
          <h3 className="font-semibold uppercase tracking-widest text-sm text-[var(--color-accent-light)]">
            Service Times
          </h3>
          <ul className="mt-4 space-y-2 text-white/80">
  <li>Sunday: 11:00 AM - 1:00 PM</li>
  <li>Wednesday: 6:30 PM - 8:00 PM</li>
  <li>Friday: 6:30 PM - 8:30 PM</li>
</ul>
        </div>

        <div>
          <h3 className="font-semibold uppercase tracking-widest text-sm text-[var(--color-accent-light)]">
            Visit
          </h3>
          <address className="mt-4 not-italic space-y-3 text-white/80">
            <p className="flex items-start gap-3">
  <MapPin
    size={17}
    className="mt-0.5 shrink-0"
    aria-hidden="true"
  />

  <a
    href="https://maps.google.com/?q=15.887347,74.511934"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Bethesda Temple,
    <br />
    Ataide Plaza, 3rd Floor,
    <br />
    Above Union Bank of India ATM,
    <br />
    Shahu Nagar, Bauxite Road,
    <br />
    Belagavi, Karnataka 590010
    <br />
    India.
  </a>
</p>
            <p className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
              <a href="tel:+919876543210" className="hover:text-white">
+91 73492 31349</a>
            </p>
            <p className="flex gap-3">
              <Mail size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
              <a href="mailto:bethesdatempleministries7@gmail.com
" className="hover:text-white">
                bethesdatempleministries7@gmail.com

              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="font-semibold uppercase tracking-widest text-sm text-[var(--color-accent-light)]">
            Explore
          </h3>
          <nav aria-label="Footer navigation">
            <ul className="mt-4 grid gap-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replaceAll(' ', '-')}`}
                    className="text-white/80 transition hover:text-white focus-visible:text-white focus-visible:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="container-soft flex flex-col items-center justify-between gap-2 border-t border-white/15 py-6 text-center text-sm text-white/60 md:flex-row md:text-left">
  <p>
    © {new Date().getFullYear()} Bethesda Temple · Built for worship, service, and care.
  </p>

  <p>
    Powered by{' '}
    <a
      href="https://rebeccatechnologies.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-white/80 transition hover:text-white hover:underline"
    >
      Rebecca Technologies
    </a>
  </p>
</div>
    </footer>
  )
}
