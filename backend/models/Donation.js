import mongoose from 'mongoose'

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, trim: true, default: 'Anonymous' },
    donorEmail: { type: String, lowercase: true, trim: true, index: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'INR' },
    purpose: { type: String, default: 'General Fund' },
    razorpayOrderId: { type: String, index: true, unique: true, sparse: true },
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created', index: true },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
)

export const Donation = mongoose.model('Donation', donationSchema)
