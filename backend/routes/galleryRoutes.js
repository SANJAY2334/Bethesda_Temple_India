import { Router } from 'express'
import { create, getOne, list, remove, update } from '../controllers/crudController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { GalleryItem } from '../models/GalleryItem.js'
import { gallerySchema } from '../validations/schemas.js'

const router = Router()

router.get('/', list(GalleryItem, { published: true }))
router.get('/admin', protect, authorize('admin', 'editor'), list(GalleryItem))
router.get('/:id', getOne(GalleryItem, { published: true }))
router.post('/', protect, authorize('admin', 'editor'), validate(gallerySchema), create(GalleryItem))
router.put('/:id', protect, authorize('admin', 'editor'), validate(gallerySchema.partial()), update(GalleryItem))
router.delete('/:id', protect, authorize('admin'), remove(GalleryItem))

export default router
