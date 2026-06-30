import mongoose from 'mongoose'

const homepageContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    hero: {
      eyebrow: String,
      headline: String,
      copy: String,
      primaryCta: String,
      secondaryCta: String,
    },
    scriptureQuotes: [String],
    featuredSermons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sermon' }],
    featuredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    media: {
      heroFallbackImage: String,
      welcomeImage: String,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

export const HomepageContent = mongoose.model('HomepageContent', homepageContentSchema)
