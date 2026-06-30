import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: String,
    quote: { type: String, required: true },
    image: {
      url: String,
      publicId: String,
      alt: String,
    },
    approved: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Testimonial = mongoose.model('Testimonial', testimonialSchema)
