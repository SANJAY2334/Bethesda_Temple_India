import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: String,
    startsAt: { type: Date, required: true },
    endsAt: Date,
    location: { type: String, required: true },
    registrationUrl: String,
    coverImage: {
      url: String,
      publicId: String,
      alt: String,
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
)

eventSchema.index({ startsAt: 1, published: 1 })

export const Event = mongoose.model('Event', eventSchema)
