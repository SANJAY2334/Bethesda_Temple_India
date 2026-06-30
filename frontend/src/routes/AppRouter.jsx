import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PageLoader } from '@/components/common/PageLoader'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

const Home = lazy(() => import('@/pages/public/Home'))
const About = lazy(() => import('@/pages/public/About'))
const Ministries = lazy(() => import('@/pages/public/Ministries'))
const Sermons = lazy(() => import('@/pages/public/Sermons'))
const Events = lazy(() => import('@/pages/public/Events'))
const Gallery = lazy(() => import('@/pages/public/Gallery'))
const Donations = lazy(() => import('@/pages/public/Donations'))
const PrayerRequests = lazy(() => import('@/pages/public/PrayerRequests'))
const Contact = lazy(() => import('@/pages/public/Contact'))
const Livestream = lazy(() => import('@/pages/public/Livestream'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))
const AdminLogin = lazy(() => import('@/pages/auth/AdminLogin'))
const AdminHome = lazy(() => import('@/pages/admin/AdminHome'))
const ManageSermons = lazy(() => import('@/pages/admin/ManageSermons'))
const ManageEvents = lazy(() => import('@/pages/admin/ManageEvents'))
const ManageGallery = lazy(() => import('@/pages/admin/ManageGallery'))
const ManageTestimonials = lazy(() => import('@/pages/admin/ManageTestimonials'))
const ManageDonations = lazy(() => import('@/pages/admin/ManageDonations'))
const ManagePrayerRequests = lazy(() => import('@/pages/admin/ManagePrayerRequests'))
const ManageLivestream = lazy(() => import('@/pages/admin/ManageLivestream'))
const HomepageContent = lazy(() => import('@/pages/admin/HomepageContent'))

export function AppRouter() {
  const location = useLocation()

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="ministries" element={<Ministries />} />
            <Route path="sermons" element={<Sermons />} />
            <Route path="events" element={<Events />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="donations" element={<Donations />} />
            <Route path="prayer-requests" element={<PrayerRequests />} />
            <Route path="contact" element={<Contact />} />
            <Route path="livestream" element={<Livestream />} />
            <Route path="volunteer" element={<Ministries />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="admin/login" element={<AdminLogin />} />
          </Route>

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="sermons" element={<ManageSermons />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="donations" element={<ManageDonations />} />
            <Route path="prayer-requests" element={<ManagePrayerRequests />} />
            <Route path="homepage" element={<HomepageContent />} />
            <Route path="livestream" element={<ManageLivestream />} />
          </Route>

          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
