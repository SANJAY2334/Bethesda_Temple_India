import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { create, getOne, remove } from '../controllers/crudController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { prayerRequestLimiter } from '../middleware/rateLimiter.js'
import { PrayerRequest } from '../models/PrayerRequest.js'
import { prayerRequestSchema } from '../validations/schemas.js'
import { sendPrayerNotification } from '../services/mailService.js'

const router = Router()

router.post('/', prayerRequestLimiter, validate(prayerRequestSchema), asyncHandler(async (req, res) => {
  const data = await PrayerRequest.create(req.body)
  sendPrayerNotification(data).catch((err) => console.error('Failed to send prayer notification:', err))
  res.status(201).json(data)
}))

// List prayer requests with role-based filtering for confidentiality
router.get('/', protect, authorize('admin', 'prayer'), asyncHandler(async (req, res) => {
  const filter = {}

  if (req.user.role === 'admin') {
    // Admins see all prayer requests
  } else if (req.user.role === 'prayer') {
    // Prayer team members can only see:
    // 1. Non-confidential requests
    // 2. Requests assigned to them
    filter.$or = [
      { confidential: false },
      { assignedTo: req.user._id }
    ]
  }

  const items = await PrayerRequest.find(filter)
    .sort({ createdAt: -1 })
    .limit(100)

  res.json(items)
}))

router.get('/:id', protect, authorize('admin', 'prayer'), asyncHandler(async (req, res) => {
  const prayerRequest = await PrayerRequest.findById(req.params.id)

  if (!prayerRequest) {
    res.status(404)
    throw new Error('Prayer request not found')
  }

  if (req.user.role !== 'admin') {
    if (prayerRequest.confidential && !prayerRequest.assignedTo?.equals(req.user._id)) {
      res.status(403)
      throw new Error('Access denied: confidential prayer request')
    }
  }

  res.json(prayerRequest)
}))

router.put(
  '/:id',
  protect,
  authorize('admin', 'prayer'),
  asyncHandler(async (req, res) => {
    const prayerRequest = await PrayerRequest.findById(req.params.id)

    if (!prayerRequest) {
      res.status(404)
      throw new Error('Prayer request not found')
    }

    if (req.user.role !== 'admin' && prayerRequest.confidential && !prayerRequest.assignedTo?.equals(req.user._id)) {
      res.status(403)
      throw new Error('Access denied: cannot modify confidential prayer request')
    }

    const item = await PrayerRequest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json(item)
  }),
)

router.delete('/:id', protect, authorize('admin'), remove(PrayerRequest))

export default router
