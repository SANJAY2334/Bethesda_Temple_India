// WHY CHANGED:
// BEFORE: AmbientSoundToggle was rendered globally in every page — a bell chime button
//   with no visible explanation, surprising users who accidentally tap it.
//   It also violates browser autoplay policies and has zero UX value for a church website.
// AFTER: Removed. The #main-content anchor is added here for the skip-link in Navbar.

import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/common/Footer'
import { Navbar } from '@/components/common/Navbar'

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
