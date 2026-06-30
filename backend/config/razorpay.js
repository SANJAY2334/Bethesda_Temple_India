import Razorpay from 'razorpay'

// In production, Razorpay credentials are required
// In development, allow dummy values for testing
if (process.env.NODE_ENV === 'production') {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are required in production. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.')
  }
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_development',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_development',
})
