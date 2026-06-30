import { createClient } from 'redis'
import { logger } from '../utils/logger.js'

let redisClient = null

async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient
  }

  if (!process.env.REDIS_URL) {
    logger.warn('REDIS_URL not configured. Token revocation disabled. Set REDIS_URL for production.')
    return null
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
      },
    })

    redisClient.on('error', (err) => logger.error('Redis client error', err))
    redisClient.on('connect', () => logger.log('Redis connected'))

    await redisClient.connect()
    return redisClient
  } catch (error) {
    logger.error('Failed to connect to Redis:', error)
    return null
  }
}

export async function revokeToken(token) {
  const client = await getRedisClient()
  if (!client) return false

  try {
    const key = `revoked_token:${token}`
    await client.setEx(key, 604800, '1')
    logger.log(`Token revoked: ${key.substring(0, 30)}...`)
    return true
  } catch (error) {
    logger.error('Failed to revoke token:', error)
    return false
  }
}

export async function isTokenRevoked(token) {
  const client = await getRedisClient()
  if (!client) return false

  try {
    const key = `revoked_token:${token}`
    const revoked = await client.exists(key)
    return revoked === 1
  } catch (error) {
    logger.error('Failed to check token revocation:', error)
    return false
  }
}

export async function closeRedisConnection() {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit()
    logger.log('Redis connection closed')
  }
}
