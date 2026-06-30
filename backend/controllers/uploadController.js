import asyncHandler from 'express-async-handler'
import { uploadBuffer } from '../services/cloudinaryService.js'

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Image file is required')
  }
  const result = await uploadBuffer(req.file, req.body.folder || 'grace-harbor')
  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  })
})
