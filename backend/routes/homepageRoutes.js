import { Router } from 'express'
import { getHomepage, updateHomepage } from '../controllers/homepageController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { homepageSchema } from '../validations/schemas.js'

const router = Router()

router.get('/', getHomepage)
router.put('/', protect, authorize('admin', 'editor'), validate(homepageSchema), updateHomepage)

export default router
