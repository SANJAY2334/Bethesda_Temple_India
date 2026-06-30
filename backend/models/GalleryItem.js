import mongoose from 'mongoose'

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Worship' },
    image: {
      url: { type: String, required: true },
      publicId: String,
      alt: { type: String, required: true },
      width: Number,
      height: Number,
    },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema)
