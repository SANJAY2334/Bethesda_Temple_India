// backend/middleware/csrfMiddleware.js

export const generateCsrfToken = (_req, res) => {
  return res.json({
    csrfToken: 'dev-token',
  })
}

export const csrfProtection = (_req, _res, next) => {
  next()
}