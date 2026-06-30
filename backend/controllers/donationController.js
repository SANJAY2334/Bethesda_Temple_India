import asyncHandler from 'express-async-handler'
import { razorpay } from '../config/razorpay.js'
import { Donation } from '../models/Donation.js'
import { verifyRazorpaySignature, verifyWebhookSignature } from '../utils/verifyRazorpay.js'
import { logger } from '../utils/logger.js'

export const createDonationOrder = asyncHandler(async (req, res) => {
  const { donorName, donorEmail, amount, purpose } = req.body
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `GH-${Date.now()}`,
    notes: { donorEmail, purpose },
  })

  const donation = await Donation.create({
    donorName: donorName || 'Anonymous',
    donorEmail,
    amount,
    purpose,
    razorpayOrderId: order.id,
    status: 'created',
  })

  res.status(201).json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID,
    donationId: donation._id,
  })
})

export const verifyDonation = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body
  const valid = verifyRazorpaySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  })

  if (!valid) {
    res.status(400)
    throw new Error('Invalid Razorpay signature')
  }

  const donation = await Donation.findOneAndUpdate(
    { razorpayOrderId },
    { razorpayPaymentId, razorpaySignature, status: 'paid' },
    { new: true },
  )
  if (!donation) {
    res.status(404)
    throw new Error('Donation order not found')
  }

  res.json({ verified: true, donation })
})

export const listDonations = asyncHandler(async (_req, res) => {
  const donations = await Donation.find().sort({ createdAt: -1 }).lean()
  res.json(donations)
})

export const handleRazorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature']
  if (!verifyWebhookSignature(req.body, signature)) {
    res.status(400)
    throw new Error('Invalid webhook signature')
  }

  try {
    const event = JSON.parse(req.body.toString())
    logger.log(`Razorpay webhook event: ${event.event}`)

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity
      const donation = await Donation.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          status: 'paid',
          razorpayPaymentId: payment.id,
          metadata: event,
        },
        { new: true },
      )

      if (!donation) {
        logger.error(`Webhook: Donation not found for order ${payment.order_id}`)
      } else {
        logger.log(`Webhook: Donation ${donation._id} marked as paid`)
      }
    }

    res.json({ received: true })
  } catch (error) {
    logger.error('Webhook processing error:', error)
    res.status(400)
    throw new Error('Webhook processing failed')
  }
})
