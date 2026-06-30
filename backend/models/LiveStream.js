import mongoose from 'mongoose'

const liveStreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    isLive: {
      type: Boolean,
      default: false,
    },

    scheduledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

export const LiveStream = mongoose.model('LiveStream', liveStreamSchema)