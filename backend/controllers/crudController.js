import asyncHandler from 'express-async-handler'
import { applyCursorFilter, generateNextCursor, paginatedResponse } from '../middleware/paginationHelper.js'

export function list(model, publicFilter = {}) {
  return asyncHandler(async (req, res) => {
    // Support pagination via query parameters
    const limit = Math.min(parseInt(req.query.limit) || 20, 100)
    const cursor = req.query.cursor || null

    // Apply cursor for pagination
    let query = { ...publicFilter }
    if (cursor) {
      query = applyCursorFilter(query, cursor, '_id')
    }

    // Fetch limit + 1 to determine if there are more results
    const items = await model
      .find(query)
      .sort({ createdAt: -1, _id: 1 })
      .limit(limit + 1)
      .lean()

    // Check if there are more results
    const hasMore = items.length > limit
    const result = items.slice(0, limit)

    // Generate next cursor from last item
    const nextCursor = hasMore ? generateNextCursor(result, '_id') : null

    // Support both paginated and full responses for backward compatibility
    if (cursor || req.query.paginated === 'true') {
      res.json(paginatedResponse(result, nextCursor, hasMore))
    } else {
      // Default: return all items (backward compatible)
      const allData = await model.find(publicFilter).sort({ createdAt: -1 }).lean()
      res.json(allData)
    }
  })
}

export function getOne(model, filter = {}) {
  return asyncHandler(async (req, res) => {
    const data = await model.findOne({ _id: req.params.id, ...filter }).lean()
    if (!data) {
      res.status(404)
      throw new Error('Resource not found')
    }
    res.json(data)
  })
}

export function create(model) {
  return asyncHandler(async (req, res) => {
    const data = await model.create(req.body)
    res.status(201).json(data)
  })
}

export function update(model) {
  return asyncHandler(async (req, res) => {
    const data = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!data) {
      res.status(404)
      throw new Error('Resource not found')
    }
    res.json(data)
  })
}

export function remove(model) {
  return asyncHandler(async (req, res) => {
    const data = await model.findByIdAndDelete(req.params.id)
    if (!data) {
      res.status(404)
      throw new Error('Resource not found')
    }
    res.json({ deleted: true })
  })
}
