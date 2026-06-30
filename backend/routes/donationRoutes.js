import { Router } from 'express'
import { createDonationOrder, listDonations, verifyDonation } from '../controllers/donationController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { donationLimiter } from '../middleware/rateLimiter.js'
import { donationOrderSchema, donationVerifySchema } from '../validations/schemas.js'

const router = Router()

router.post('/create-order', donationLimiter, validate(donationOrderSchema), createDonationOrder)
router.post('/verify', donationLimiter, validate(donationVerifySchema), verifyDonation)
router.get('/', protect, authorize('admin', 'finance'), listDonations)

export default router
