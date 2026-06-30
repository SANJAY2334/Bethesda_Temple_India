import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('Email service not fully configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to enable email.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  return transporter
}

export async function sendContactMail(data) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('Email service is not configured. Contact form will not send.')
    throw new Error('Email service is not configured')
  }

  const { name, email, message } = data
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER

  if (!contactEmail) {
    throw new Error('CONTACT_EMAIL or SMTP_USER must be configured')
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: contactEmail,
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      text: message,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    throw new Error('Failed to send email')
  }
}

export async function sendPrayerNotification(data) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('Email service is not configured. Prayer notifications will not send.')
    return
  }

  const { name, email, message, confidential } = data
  const prayerEmail = process.env.PRAYER_EMAIL || process.env.CONTACT_EMAIL || process.env.SMTP_USER

  if (!prayerEmail) return

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: prayerEmail,
      replyTo: confidential ? process.env.SMTP_USER : email,
      subject: `Prayer Request${confidential ? ' (CONFIDENTIAL)' : ''}: ${message.substring(0, 50)}...`,
      text: `${message}\n\nFrom: ${name}${confidential ? '' : ` (${email})`}`,
      html: `
        <h2>Prayer Request${confidential ? ' (CONFIDENTIAL)' : ''}</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>From: ${name}${confidential ? '' : ` (${email})`}</em></p>
      `,
    })
  } catch (error) {
    console.error('Failed to send prayer notification:', error)
  }
}