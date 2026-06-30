import { Router } from 'express'
import {
  getCurrentStream,
  createOrUpdateStream,
} from '../controllers/liveStreamController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getCurrentStream)

router.post(
  '/',
  protect,
  createOrUpdateStream,
)

export default router