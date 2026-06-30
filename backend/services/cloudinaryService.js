import { Readable } from 'stream'
import { cloudinary } from '../config/cloudinary.js'

export function uploadBuffer(file, folder = 'grace-harbor') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      },
    )
    Readable.from(file.buffer).pipe(stream)
  })
}
