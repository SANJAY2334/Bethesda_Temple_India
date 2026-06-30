import { api } from './api.js'

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizeSermon(item) {
  return {
    ...item,
    publishedAt: item.date,
    youtubeUrl: item.videoUrl,
    thumbnailUrl: item.thumbnail?.url,
  }
}

function sermonPayload(data) {
  return {
    title: data.title,
    slug: data.slug || slugify(data.title),
    speaker: data.speaker,
    passage: data.passage,
    description: data.description,
    date: data.publishedAt || data.date,
    videoUrl: data.youtubeUrl || data.videoUrl || '',
    audioUrl: data.audioUrl || '',
    thumbnail: data.thumbnailUrl
      ? { url: data.thumbnailUrl, alt: data.title || 'Sermon thumbnail' }
      : undefined,
    published: data.published ?? true,
  }
}

function normalizeEvent(item) {
  return {
    ...item,
    date: item.startsAt,
    imageUrl: item.coverImage?.url,
  }
}

function eventPayload(data) {
  return {
    title: data.title,
    slug: data.slug || slugify(data.title),
    description: data.description,
    startsAt: data.date || data.startsAt,
    location: data.location,
    registrationUrl: data.registrationUrl || '',
    coverImage: data.imageUrl ? { url: data.imageUrl, alt: data.title || 'Event image' } : undefined,
    featured: data.featured ?? false,
    published: data.published ?? true,
  }
}

function normalizeGalleryItem(item) {
  return {
    ...item,
    caption: item.title,
    imageUrl: item.image?.url,
    altText: item.image?.alt,
  }
}

function galleryPayload(data) {
  return {
    title: data.caption || data.title,
    category: data.category,
    image: {
      url: data.imageUrl || data.image?.url,
      alt: data.altText || data.caption || data.title || 'Gallery image',
    },
    featured: data.featured ?? false,
    sortOrder: Number(data.sortOrder || 0),
    published: data.published ?? true,
  }
}

function normalizeTestimonial(item) {
  return {
    ...item,
    avatarUrl: item.image?.url,
  }
}

function testimonialPayload(data) {
  return {
    name: data.name,
    role: data.role,
    quote: data.quote,
    image: data.avatarUrl ? { url: data.avatarUrl, alt: data.name || 'Testimonial portrait' } : undefined,
    approved: data.approved ?? true,
    featured: data.featured ?? false,
  }
}

function normalizePrayerRequest(item) {
  return {
    ...item,
    request: item.message,
    isConfidential: item.confidential,
  }
}

function normalizeHomepage(data = {}) {
  return {
    heroHeadline: data.hero?.headline || '',
    heroSubcopy: data.hero?.copy || '',
    featuredScripture: data.scriptureQuotes?.[0] || '',
    ctaTitle: data.hero?.primaryCta || '',
    ctaCopy: data.hero?.secondaryCta || '',
  }
}

function homepagePayload(data) {
  return {
    hero: {
      headline: data.heroHeadline,
      copy: data.heroSubcopy,
      primaryCta: data.ctaTitle,
      secondaryCta: data.ctaCopy,
    },
    scriptureQuotes: data.featuredScripture ? [data.featuredScripture] : [],
  }
}

export const contentService = {
  sermons: () => api.get('/sermons').then((res) => res.data.map(normalizeSermon)),
  events: () => api.get('/events').then((res) => res.data.map(normalizeEvent)),
  gallery: () => api.get('/gallery').then((res) => res.data.map(normalizeGalleryItem)),
  testimonials: () => api.get('/testimonials').then((res) => res.data.map(normalizeTestimonial)),
  homepage: () => api.get('/homepage').then((res) => normalizeHomepage(res.data)),

  pray: (payload) =>
    api
      .post('/prayer-requests', {
        name: payload.name,
        email: payload.email,
        message: payload.request || payload.message,
        confidential: payload.isConfidential ?? payload.confidential ?? false,
      })
      .then((res) => res.data),
  donate: (payload) => api.post('/donations/create-order', payload).then((res) => res.data),
  contact: (payload) => api.post('/contact', payload).then((res) => res.data),

  adminSermons: () => api.get('/sermons/admin').then((res) => res.data.map(normalizeSermon)),
  createSermon: (data) => api.post('/sermons', sermonPayload(data)).then((res) => normalizeSermon(res.data)),
  updateSermon: (id, data) => api.put(`/sermons/${id}`, sermonPayload(data)).then((res) => normalizeSermon(res.data)),
  deleteSermon: (id) => api.delete(`/sermons/${id}`).then((res) => res.data),

  adminEvents: () => api.get('/events/admin').then((res) => res.data.map(normalizeEvent)),
  createEvent: (data) => api.post('/events', eventPayload(data)).then((res) => normalizeEvent(res.data)),
  updateEvent: (id, data) => api.put(`/events/${id}`, eventPayload(data)).then((res) => normalizeEvent(res.data)),
  deleteEvent: (id) => api.delete(`/events/${id}`).then((res) => res.data),

  adminGallery: () => api.get('/gallery/admin').then((res) => res.data.map(normalizeGalleryItem)),
  createGalleryItem: (data) => api.post('/gallery', galleryPayload(data)).then((res) => normalizeGalleryItem(res.data)),
  updateGalleryItem: (id, data) => api.put(`/gallery/${id}`, galleryPayload(data)).then((res) => normalizeGalleryItem(res.data)),
  deleteGalleryItem: (id) => api.delete(`/gallery/${id}`).then((res) => res.data),

  adminTestimonials: () => api.get('/testimonials/admin').then((res) => res.data.map(normalizeTestimonial)),
  createTestimonial: (data) => api.post('/testimonials', testimonialPayload(data)).then((res) => normalizeTestimonial(res.data)),
  updateTestimonial: (id, data) =>
    api.put(`/testimonials/${id}`, testimonialPayload(data)).then((res) => normalizeTestimonial(res.data)),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`).then((res) => res.data),

  prayerRequests: () => api.get('/prayer-requests').then((res) => res.data.map(normalizePrayerRequest)),
  updatePrayerRequest: (id, data) => api.put(`/prayer-requests/${id}`, data).then((res) => res.data),
  deletePrayerRequest: (id) => api.delete(`/prayer-requests/${id}`).then((res) => res.data),

  donations: () => api.get('/donations').then((res) => res.data),
  saveHomepage: (data) => api.put('/homepage', homepagePayload(data)).then((res) => normalizeHomepage(res.data)),

  stats: () =>
    Promise.all([
      api.get('/sermons/admin').then((r) => r.data.length),
      api.get('/events/admin').then((r) => r.data.length),
      api.get('/gallery/admin').then((r) => r.data.length),
      api.get('/prayer-requests').then((r) => r.data.length),
      api.get('/testimonials/admin').then((r) => r.data.length),
      api.get('/donations').then((r) => r.data.length),
    ]).then(([sermons, events, gallery, prayers, testimonials, donations]) => ({
      sermons,
      events,
      gallery,
      prayers,
      testimonials,
      donations,
    })),
}
