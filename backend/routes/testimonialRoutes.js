import { Router } from 'express'
import { create, getOne, list, remove, update } from '../controllers/crudController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { Testimonial } from '../models/Testimonial.js'
import { testimonialSchema } from '../validations/schemas.js'

const router = Router()

router.get('/', list(Testimonial, { approved: true }))
router.get('/admin', protect, authorize('admin', 'editor'), list(Testimonial))
router.get('/:id', getOne(Testimonial, { approved: true }))
router.post('/', protect, authorize('admin', 'editor'), validate(testimonialSchema), create(Testimonial))
router.put('/:id', protect, authorize('admin', 'editor'), validate(testimonialSchema.partial()), update(Testimonial))
router.delete('/:id', protect, authorize('admin'), remove(Testimonial))

export default router
