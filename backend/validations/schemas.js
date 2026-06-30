import { z } from 'zod'

const imageSchema = z
  .object({
    url: z.string().url().optional(),
    publicId: z.string().optional(),
    alt: z.string().optional(),
  })
  .optional()

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12, 'Password must be at least 12 characters'),
})

export const sermonSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  speaker: z.string().min(2),
  passage: z.string().min(2),
  description: z.string().optional(),
  date: z.coerce.date(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  audioUrl: z.string().url().optional().or(z.literal('')),
  thumbnail: imageSchema,
  published: z.boolean().optional(),
})

export const eventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  location: z.string().min(2),
  registrationUrl: z.string().url().optional().or(z.literal('')),
  coverImage: imageSchema,
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

export const prayerRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(8),
  confidential: z.boolean().optional(),
})

export const donationOrderSchema = z.object({
  donorName: z.string().max(200).optional(),
  donorEmail: z.string().email('Please provide a valid email address'),
  amount: z.coerce.number().min(1, 'Donation amount must be at least 1'),
  purpose: z.string().max(500).optional(),
})

export const donationVerifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
})

export const gallerySchema = z.object({
  title: z.string().min(2),
  category: z.string().optional(),
  image: z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
    alt: z.string().min(2),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  featured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  published: z.boolean().optional(),
})

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  quote: z.string().min(8),
  image: imageSchema,
  approved: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export const homepageSchema = z.object({
  hero: z
    .object({
      eyebrow: z.string().optional(),
      headline: z.string().optional(),
      copy: z.string().optional(),
      primaryCta: z.string().optional(),
      secondaryCta: z.string().optional(),
    })
    .optional(),
  scriptureQuotes: z.array(z.string()).optional(),
  featuredSermons: z.array(z.string()).optional(),
  featuredEvents: z.array(z.string()).optional(),
  media: z
    .object({
      heroFallbackImage: z.string().optional(),
      welcomeImage: z.string().optional(),
    })
    .optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(8),
})
