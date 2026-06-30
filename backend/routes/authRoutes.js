import { Router } from 'express'
import { login, me, logout } from '../controllers/authController.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { protect } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { loginSchema } from '../validations/schemas.js'

const router = Router()

router.post('/login', authLimiter, validate(loginSchema), login)
router.get('/me', protect, me)
router.post('/logout', protect, logout)

export default router
