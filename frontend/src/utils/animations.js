// WHY: Removed blur(14px) on page transitions — blurred content on load is disorienting
// and makes text unreadable during the transition. Replaced with clean opacity+y movement.
// Blur-based transitions also fail performance profiling (GPU compositing overhead).

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: 'easeInOut' },
  },
}
