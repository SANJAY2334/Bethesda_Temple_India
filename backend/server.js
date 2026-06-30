import dotenv from 'dotenv'
import { app } from './app.js'
import { connectDB } from './config/db.js'
import { validateEnv } from './config/validateEnv.js'
import { logger } from './utils/logger.js'

dotenv.config()
validateEnv()

const PORT = process.env.PORT || 5000

// In development, allow server to start without database
// In production, require database connection
if (process.env.NODE_ENV === 'production') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        logger.info(`Bethesda Temple API running on port ${PORT}`)
      })
    })
    .catch((error) => {
      logger.error('Database connection failed', error)
      process.exit(1)
    })
} else {
  // Development: start server and try to connect to database
  app.listen(PORT, () => {
    logger.info(`Bethesda Temple API running on port ${PORT} (development mode)`)
  })

  // Try to connect to database in background
  connectDB()
    .then(() => {
      logger.info('Database connected successfully')
    })
    .catch((error) => {
      logger.warn('Database connection failed - running in offline mode: ' + error.message)
    })
}
