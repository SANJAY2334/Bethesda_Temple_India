// WHY: Removed GSAP + ScrollTrigger (~251 KB) in favor of native IntersectionObserver.
// GSAP was the only animation library used for scroll reveals — Framer Motion handles
// everything else. The CSS-based approach is equally smooth, zero bundle cost, and
// respects prefers-reduced-motion via the CSS media query in index.css.

import { useEffect } from 'react'

export function useReveal(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const elements = scope.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [scopeRef])
}
