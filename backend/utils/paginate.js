export function getPagination(query) {
  const page =
    Number(query.page) || 1

  const limit =
    Math.min(Number(query.limit) || 10, 100)

  const skip =
    (page - 1) * limit

  return { page, limit, skip }
}