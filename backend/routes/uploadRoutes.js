import { Router } from 'express'
import { uploadImage } from '../controllers/uploadController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/upload.js'

const router = Router()

router.post('/image', protect, authorize('admin', 'editor'), upload.single('image'), uploadImage)

export default router
