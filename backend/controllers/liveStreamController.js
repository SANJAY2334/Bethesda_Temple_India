import asyncHandler from 'express-async-handler'
import { LiveStream } from '../models/LiveStream.js'

export const getCurrentStream = asyncHandler(async (req, res) => {
  try {
    const stream = await LiveStream.findOne()
      .sort({ createdAt: -1 })
      .lean()

    res.json(stream || null)
  } catch (error) {
    console.error('GET LIVESTREAM ERROR:', error)
    res.status(500).json({
      message: error.message,
    })
  }
})

export const createOrUpdateStream = asyncHandler(async (req, res) => {
  try {
    console.log('==============================')
    console.log('LIVESTREAM SAVE REQUEST')
    console.log('USER:', req.user)
    console.log('BODY:', req.body)
    console.log('==============================')

    const {
      title,
      description,
      youtubeUrl,
      isLive,
      scheduledAt,
    } = req.body

    if (!title) {
      return res.status(400).json({
        message: 'Title is required',
      })
    }

    if (!youtubeUrl) {
      return res.status(400).json({
        message: 'YouTube URL is required',
      })
    }

    let stream = await LiveStream.findOne()

    if (!stream) {
      stream = await LiveStream.create({
        title,
        description,
        youtubeUrl,
        isLive,
        scheduledAt,
      })

      console.log('NEW STREAM CREATED')

      return res.status(201).json(stream)
    }

    stream.title = title
    stream.description = description
    stream.youtubeUrl = youtubeUrl
    stream.isLive = isLive
    stream.scheduledAt = scheduledAt

    await stream.save()

    console.log('STREAM UPDATED')

    res.json(stream)
  } catch (error) {
    console.error('LIVESTREAM SAVE ERROR')
    console.error(error)

    res.status(500).json({
      message: error.message,
      stack:
        process.env.NODE_ENV === 'development'
          ? error.stack
          : undefined,
    })
  }
})