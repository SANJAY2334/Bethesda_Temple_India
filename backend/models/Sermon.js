import mongoose from 'mongoose'

const sermonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    speaker: { type: String, required: true, trim: true },
    passage: { type: String, required: true, trim: true },
    description: String,
    date: { type: Date, required: true },
    videoUrl: String,
    audioUrl: String,
    thumbnail: {
      url: String,
      publicId: String,
      alt: String,
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
)

sermonSchema.index({ title: 'text', speaker: 'text', passage: 'text' })

export const Sermon = mongoose.model('Sermon', sermonSchema)
