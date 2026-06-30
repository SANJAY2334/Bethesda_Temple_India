import asyncHandler from 'express-async-handler'

// Pagination middleware helper for list endpoints
// Uses cursor-based pagination (more scalable than offset-based)

export const paginate = (defaultLimit = 20, maxLimit = 100) =>
  asyncHandler(async (req, res, next) => {
    // Extract pagination parameters
    const limit = Math.min(parseInt(req.query.limit) || defaultLimit, maxLimit)
    const cursor = req.query.cursor || null

    // Store pagination config on request for controller to use
    req.pagination = {
      limit,
      cursor,
      defaultLimit,
      maxLimit,
    }

    next()
  })

// Helper to apply cursor filtering to query
export function applyCursorFilter(query, cursor, sortField = '_id') {
  if (cursor) {
    // Decode base64 cursor
    try {
      const decodedCursor = Buffer.from(cursor, 'base64').toString('utf-8')
      query[sortField] = { $gt: decodedCursor }
    } catch (error) {
      // Invalid cursor, ignore and start from beginning
    }
  }
  return query
}

// Helper to generate next cursor from result set
export function generateNextCursor(items, sortField = '_id') {
  if (items.length === 0) return null
  const lastItem = items[items.length - 1]
  return Buffer.from(String(lastItem[sortField])).toString('base64')
}

// Helper to format paginated response
export function paginatedResponse(items, nextCursor, hasMore = !!nextCursor) {
  return {
    data: items,
    pagination: {
      nextCursor,
      hasMore,
    },
  }
}
