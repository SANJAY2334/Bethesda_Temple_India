import { Router } from 'express'
import { create, getOne, list, remove, update } from '../controllers/crudController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { Event } from '../models/Event.js'
import { eventSchema } from '../validations/schemas.js'

const router = Router()

router.get('/', list(Event, { published: true }))
router.get('/admin', protect, authorize('admin', 'editor'), list(Event))
router.get('/:id', getOne(Event, { published: true }))
router.post('/', protect, authorize('admin', 'editor'), validate(eventSchema), create(Event))
router.put('/:id', protect, authorize('admin', 'editor'), validate(eventSchema.partial()), update(Event))
router.delete('/:id', protect, authorize('admin'), remove(Event))

export default router
