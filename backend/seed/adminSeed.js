import dotenv from 'dotenv'
import crypto from 'crypto'
import { connectDB } from '../config/db.js'
import { User } from '../models/User.js'

dotenv.config()

await connectDB()

let email = process.env.SEED_ADMIN_EMAIL || 'admin@graceharbor.church'
let password = process.env.SEED_ADMIN_PASSWORD

if (!password || password === 'ChangeMe123!') {
  password = crypto.randomBytes(16).toString('hex')
  console.warn(`⚠️  WARNING: Using generated password for admin user`)
  console.warn(`⚠️  Store this securely: ${password}`)
  console.warn(`⚠️  Change password after first login: /admin/login`)
}

const existing = await User.findOne({ email })
if (!existing) {
  await User.create({
    name: ' Admin',
    email,
    password,
    role: 'admin',
  })
  console.log(`✓ Admin user created: ${email}`)
  if (process.env.SEED_ADMIN_PASSWORD === 'ChangeMe123!' || !process.env.SEED_ADMIN_PASSWORD) {
    console.log(`✓ Generated password: ${password}`)
  }
} else {
  console.log(`ℹ Admin already exists: ${email}`)
}

process.exit(0)
