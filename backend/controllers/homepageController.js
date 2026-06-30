import asyncHandler from 'express-async-handler'
import { HomepageContent } from '../models/HomepageContent.js'

export const getHomepage = asyncHandler(async (_req, res) => {
  const content = await HomepageContent.findOne({ key: 'main' }).populate('featuredSermons featuredEvents').lean()
  res.json(content || {})
})

export const updateHomepage = asyncHandler(async (req, res) => {
  const content = await HomepageContent.findOneAndUpdate(
    { key: 'main' },
    { ...req.body, key: 'main', updatedBy: req.user._id },
    { new: true, upsert: true, runValidators: true },
  )
  res.json(content)
})
