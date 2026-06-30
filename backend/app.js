import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { generalLimiter } from './middleware/rateLimiter.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { handleRazorpayWebhook } from './controllers/donationController.js'
import { apiRouter } from './routes/api.js'

export const app = express()

app.set('trust proxy', 1)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', '*.cloudinary.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:', '*.cloudinary.com', '*.unsplash.com'],
        connectSrc: ["'self'", 'api.razorpay.com', '*.cloudinary.com'],
        frameSrc: ["'self'", 'checkout.razorpay.com'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    noSniff: true,
    xssFilter: true,
  }),
)
app.use(compression())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(
  cors({
    origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  }),
)
app.use(cookieParser())
app.use('/api/donations/webhook', express.raw({ type: 'application/json' }), handleRazorpayWebhook)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', generalLimiter)

app.get('/api/health', async (_req, res) => {
  try {
    await mongoose.connection.db.admin().ping()
    res.json({
      ok: true,
      service: 'grace-harbor-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(503).json({
      ok: false,
      service: 'grace-harbor-api',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})
app.use('/api', apiRouter)

app.use(notFound)
app.use(errorHandler)
