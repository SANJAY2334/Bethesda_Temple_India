import asyncHandler from 'express-async-handler'
import { Donation } from '../models/Donation.js'

export const createDonationOrder = asyncHandler(async (req, res) => {
  const { donorName, donorEmail, amount, purpose } = req.body

  const donation = await Donation.create({
    donorName: donorName || 'Anonymous',
    donorEmail,
    amount,
    purpose,
    status: 'pending',
  })

  res.status(201).json({
    success: true,
    message: 'Donation request received.',
    donation,
  })
})

export const verifyDonation = asyncHandler(async (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Online payment verification is currently disabled.',
  })
})

export const listDonations = asyncHandler(async (_req, res) => {
  const donations = await Donation.find().sort({ createdAt: -1 }).lean()
  res.json(donations)
})

export const handleRazorpayWebhook = asyncHandler(async (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Razorpay webhook is disabled.',
  })
})
