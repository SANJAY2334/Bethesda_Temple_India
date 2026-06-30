export function validateEnv() {
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'RAZORPAY_WEBHOOK_SECRET',
  ]

  const missing = required.filter(
    (key) =>
      !process.env[key] ||
      process.env[key].trim() === ''
  )

  if (missing.length) {
    throw new Error(
      `Missing environment variables: ${missing.join(', ')}`
    )
  }

  // Production safety checks
  if (process.env.NODE_ENV === 'production') {
    const invalid = []

    if (process.env.CLOUDINARY_CLOUD_NAME === 'dev') {
      invalid.push('CLOUDINARY_CLOUD_NAME')
    }

    if (process.env.CLOUDINARY_API_KEY === 'dev') {
      invalid.push('CLOUDINARY_API_KEY')
    }

    if (process.env.CLOUDINARY_API_SECRET === 'dev') {
      invalid.push('CLOUDINARY_API_SECRET')
    }

    if (
      process.env.JWT_SECRET === 'dev' ||
      process.env.JWT_SECRET.length < 32
    ) {
      invalid.push('JWT_SECRET')
    }

    if (
      process.env.RAZORPAY_KEY_ID === 'dev' ||
      process.env.RAZORPAY_KEY_SECRET === 'dev'
    ) {
      invalid.push('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET')
    }

    if (invalid.length) {
      throw new Error(
        `Invalid production environment variables: ${invalid.join(', ')}`
      )
    }
  }
}