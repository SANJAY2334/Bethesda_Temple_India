import { Router } from 'express'
import { sendContact } from '../controllers/contactController.js'
import { validate } from '../middleware/validate.js'
import { contactSchema } from '../validations/schemas.js'

const router = Router()

router.post('/', validate(contactSchema), sendContact)

export default router
