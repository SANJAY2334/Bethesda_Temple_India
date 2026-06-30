export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422)
    return next(new Error(parsed.error.issues.map((issue) => issue.message).join(', ')))
  }
  req.body = parsed.data
  next()
}
