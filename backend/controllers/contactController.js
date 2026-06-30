import asyncHandler from 'express-async-handler'
import Contact from '../models/Contact.js'
import { sendContactMail } from '../services/mailService.js'

export const sendContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    res.status(400)
    throw new Error('Name, email and message are required')
  }

  // Always save to database first
  const contact = await Contact.create({
    name,
    email,
    message,
    status: 'new',
  })

  // Try sending email, but don't fail if email service is down
  try {
    await sendContactMail({
      name,
      email,
      message,
    })
  } catch (error) {
    console.error('Email failed:', error.message)
  }

  res.status(201).json({
    success: true,
    received: true,
    contact,
    message: 'Your message has been received. We will respond within 24 hours.',
  })
})