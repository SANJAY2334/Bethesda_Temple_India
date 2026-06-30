import asyncHandler from 'express-async-handler'
import { User } from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import { revokeToken } from '../services/tokenRevocationService.js'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user })
})

export const logout = asyncHandler(async (req, res) => {
  if (!req.token) {
    res.status(401)
    throw new Error('No token provided')
  }

  await revokeToken(req.token)

  res.json({
    success: true,
    message: 'Logged out successfully. Token revoked.',
  })
})
