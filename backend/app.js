import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { generalLimiter } from './middleware/rateLimiter.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { apiRouter } from './routes/api.js'

export const app = express()

app.set('trust proxy', 1)

// ---------------- Security ----------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'cdn.jsdelivr.net',
          '*.cloudinary.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'fonts.googleapis.com',
        ],
        fontSrc: [
          "'self'",
          'fonts.gstatic.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https:',
          '*.cloudinary.com',
          '*.unsplash.com',
        ],
        connectSrc: [
          "'self'",
          '*.cloudinary.com',
        ],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
  }),
)

app.use(compression())

app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : 'dev',
  ),
)

// ---------------- CORS ----------------
app.use(
  cors({
    origin: (
      process.env.CLIENT_ORIGIN ||
      'http://localhost:5173'
    ).split(','),

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],

    maxAge: 86400,
  }),
)

app.use(cookieParser())

// ---------------- Body Parser ----------------
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// ---------------- Rate Limiter ----------------
app.use('/api', generalLimiter)

// ---------------- Root ----------------
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'Bethesda Temple API',
    status: 'running',
    version: '1.0.0',
    documentation: '/api/health',
  })
})

// ---------------- Health ----------------
app.get('/api/health', async (_req, res) => {
  try {
    await mongoose.connection.db.admin().ping()

    res.status(200).json({
      ok: true,
      service: 'Bethesda Temple API',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(503).json({
      ok: false,
      service: 'Bethesda Temple API',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// ---------------- API ----------------
app.use('/api', apiRouter)

// ---------------- 404 ----------------
app.use(notFound)

// ---------------- Error Handler ----------------
app.use(errorHandler)
