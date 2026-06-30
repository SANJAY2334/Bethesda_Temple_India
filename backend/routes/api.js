import { Router } from 'express'

import authRoutes from './authRoutes.js'
import sermonRoutes from './sermonRoutes.js'
import eventRoutes from './eventRoutes.js'
import galleryRoutes from './galleryRoutes.js'
import testimonialRoutes from './testimonialRoutes.js'
import prayerRoutes from './prayerRequestRoutes.js'
import donationRoutes from './donationRoutes.js'
import homepageRoutes from './homepageRoutes.js'
import contactRoutes from './contactRoutes.js'
import uploadRoutes from './uploadRoutes.js'
import liveStreamRoutes from './liveStreamRoutes.js'
import volunteerRoutes from './volunteerRoutes.js'

import { generateCsrfToken } from '../middleware/csrfMiddleware.js'

export const apiRouter = Router()

// CSRF Token
apiRouter.get('/csrf-token', generateCsrfToken)

// Authentication
apiRouter.use('/auth', authRoutes)

// Public Routes
apiRouter.use('/homepage', homepageRoutes)
apiRouter.use('/contact', contactRoutes)
apiRouter.use('/uploads', uploadRoutes)

// Church Content
apiRouter.use('/sermons', sermonRoutes)
apiRouter.use('/events', eventRoutes)
apiRouter.use('/gallery', galleryRoutes)
apiRouter.use('/testimonials', testimonialRoutes)
apiRouter.use('/prayer-requests', prayerRoutes)
apiRouter.use('/donations', donationRoutes)
apiRouter.use('/livestream', liveStreamRoutes)

// Volunteer Ministry
apiRouter.use('/volunteers', volunteerRoutes)