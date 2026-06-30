import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 220,
  standardHeaders: true,
  legacyHeaders: false,
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
})

export const donationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: 'Too many donation attempts from this IP. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

export const prayerRequestLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 3,
  message: 'Too many prayer requests from this email. Please try again tomorrow.',
  keyGenerator: (req) => {
    // Prefer email from body, but use IPv6-safe IP fallback
    return req.body.email || ipKeyGenerator(req)
  },
  standardHeaders: true,
  legacyHeaders: false,
})
