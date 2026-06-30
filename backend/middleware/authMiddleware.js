import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User } from '../models/User.js'
import { isTokenRevoked } from '../services/tokenRevocationService.js'

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const revoked = await isTokenRevoked(token)
  if (revoked) {
    res.status(401)
    throw new Error('Token has been revoked. Please login again.')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.id).select('-password')
  if (!user || !user.active) {
    res.status(401)
    throw new Error('Not authorized')
  }
console.log('====================')
console.log('USER ID:', user._id)
console.log('USER ROLE:', user.role)
console.log('USER NAME:', user.name)
console.log('====================')

req.user = user
req.token = token
next()
})

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403)
    throw new Error('Insufficient permissions')
  }
  next()
}
