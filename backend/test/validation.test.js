import assert from 'node:assert/strict'
import test from 'node:test'
import z from 'zod'
import { loginSchema, donationOrderSchema, prayerRequestSchema, contactSchema } from '../validations/schemas.js'

test('Validation: loginSchema requires strong passwords', () => {
  const weakPassword = { email: 'test@example.com', password: '12345678' }
  const result = loginSchema.safeParse(weakPassword)
  assert.equal(result.success, false, 'Should reject 8-char password')
  assert.match(result.error.issues[0].message, /12 characters/)
})

test('Validation: loginSchema accepts strong passwords', () => {
  const strongPassword = { email: 'test@example.com', password: 'SecurePassword123!' }
  const result = loginSchema.safeParse(strongPassword)
  assert.equal(result.success, true, 'Should accept 12+ char passwords')
})

test('Validation: donationOrderSchema requires email', () => {
  const noEmail = { amount: 100 }
  const result = donationOrderSchema.safeParse(noEmail)
  assert.equal(result.success, false, 'Should require email')
})

test('Validation: donationOrderSchema requires valid email', () => {
  const badEmail = { donorEmail: 'not-an-email', amount: 100 }
  const result = donationOrderSchema.safeParse(badEmail)
  assert.equal(result.success, false, 'Should require valid email')
})

test('Validation: donationOrderSchema accepts valid donation', () => {
  const valid = { donorEmail: 'donor@church.com', amount: 500 }
  const result = donationOrderSchema.safeParse(valid)
  assert.equal(result.success, true, 'Should accept valid donation')
})

test('Validation: prayerRequestSchema requires message', () => {
  const noMessage = { name: 'John', email: 'john@example.com' }
  const result = prayerRequestSchema.safeParse(noMessage)
  assert.equal(result.success, false, 'Should require message')
})

test('Validation: prayerRequestSchema requires min 8 char message', () => {
  const shortMsg = { name: 'John', email: 'john@example.com', message: 'short' }
  const result = prayerRequestSchema.safeParse(shortMsg)
  assert.equal(result.success, false, 'Should require 8+ char message')
})

test('Validation: contactSchema requires valid email', () => {
  const noEmail = { name: 'John', message: 'Hello world message here' }
  const result = contactSchema.safeParse(noEmail)
  assert.equal(result.success, false, 'Should require email')
})

test('Validation: contactSchema requires minimum message length', () => {
  const shortMsg = { name: 'John', email: 'john@example.com', message: 'short' }
  const result = contactSchema.safeParse(shortMsg)
  assert.equal(result.success, false, 'Should require 8+ char message')
})
