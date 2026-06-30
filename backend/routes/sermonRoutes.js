import { Router } from 'express'
import { create, getOne, list, remove, update } from '../controllers/crudController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { Sermon } from '../models/Sermon.js'
import { sermonSchema } from '../validations/schemas.js'

const router = Router()

router.get('/', list(Sermon, { published: true }))
router.get('/admin', protect, authorize('admin', 'editor'), list(Sermon))
router.get('/:id', getOne(Sermon, { published: true }))
router.post('/', protect, authorize('admin', 'editor'), validate(sermonSchema), create(Sermon))
router.put('/:id', protect, authorize('admin', 'editor'), validate(sermonSchema.partial()), update(Sermon))
router.delete('/:id', protect, authorize('admin'), remove(Sermon))

export default router
