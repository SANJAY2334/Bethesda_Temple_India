import mongoose from 'mongoose'

const prayerRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: String,
    category: { type: String, default: 'General' },
    message: { type: String, required: true },
    confidential: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'praying', 'follow-up', 'closed'], default: 'new', index: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String,
  },
  { timestamps: true },
)

prayerRequestSchema.index({ createdAt: -1 })
prayerRequestSchema.index({ status: 1, createdAt: -1 })

export const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema)
