import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import test from 'node:test'
import { verifyRazorpaySignature, verifyWebhookSignature } from '../utils/verifyRazorpay.js'

test('verifyRazorpaySignature accepts a valid payment signature', () => {
  process.env.RAZORPAY_KEY_SECRET = 'payment-secret'
  const orderId = 'order_123'
  const paymentId = 'pay_456'
  const signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex')

  assert.equal(verifyRazorpaySignature({ orderId, paymentId, signature }), true)
})

test('verifyRazorpaySignature rejects missing or invalid input', () => {
  process.env.RAZORPAY_KEY_SECRET = 'payment-secret'

  assert.equal(verifyRazorpaySignature({ orderId: 'order_123', paymentId: 'pay_456', signature: 'bad' }), false)
  assert.equal(verifyRazorpaySignature({ orderId: 'order_123', paymentId: 'pay_456' }), false)
})

test('verifyWebhookSignature accepts valid raw webhook bodies', () => {
  process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook-secret'
  const body = Buffer.from(JSON.stringify({ event: 'payment.captured' }))
  const signature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(body).digest('hex')

  assert.equal(verifyWebhookSignature(body, signature), true)
})

test('verifyWebhookSignature rejects missing signatures', () => {
  process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook-secret'

  assert.equal(verifyWebhookSignature(Buffer.from('{}')), false)
})
