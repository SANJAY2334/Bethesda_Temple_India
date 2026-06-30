# Grace Harbor Church

Production-ready multi-page church website with a cinematic React experience, secure Express APIs, MongoDB Atlas models, Cloudinary uploads, and Razorpay donation flows.

## Stack

- React + Vite
- TailwindCSS v4
- Framer Motion + GSAP
- React Router DOM
- Three.js + React Three Fiber
- Node.js + Express
- MongoDB Atlas + Mongoose
- Cloudinary
- Razorpay

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment variables:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Set `MONGODB_URI`, `JWT_SECRET`, Cloudinary, and Razorpay credentials.

4. Seed the first admin:

```bash
npm run seed:admin
```

5. Run frontend and backend together:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api/health`

## Pages

Public routes:

- `/`
- `/about`
- `/ministries`
- `/sermons`
- `/events`
- `/gallery`
- `/donations`
- `/prayer-requests`
- `/contact`
- `/livestream`

Admin routes:

- `/admin/login`
- `/admin`
- `/admin/sermons`
- `/admin/events`
- `/admin/gallery`
- `/admin/testimonials`
- `/admin/donations`
- `/admin/prayer-requests`
- `/admin/homepage`

## Backend API

Core protected admin APIs use `Authorization: Bearer <token>`.

- `POST /api/auth/login`
- `GET /api/auth/me`
- CRUD: `/api/sermons`, `/api/events`, `/api/gallery`, `/api/testimonials`
- Prayer intake: `POST /api/prayer-requests`
- Donation order: `POST /api/donations/create-order`
- Donation verify: `POST /api/donations/verify`
- Razorpay webhook: `POST /api/donations/webhook`
- Cloudinary upload: `POST /api/uploads/image`
- Homepage content: `GET/PUT /api/homepage`

## Razorpay Notes

Use the backend to create orders and verify signatures. Configure the Razorpay dashboard webhook URL as:

```text
https://your-api-domain.com/api/donations/webhook
```

Set the same webhook secret in `RAZORPAY_WEBHOOK_SECRET`.

## Deployment Guide

Frontend:

- Run `npm run build`.
- Deploy `dist/` to Vercel, Netlify, Cloudflare Pages, or static hosting.
- Set `VITE_API_URL` to the production API origin if the frontend and backend are on separate domains.

Backend:

- Deploy the Node server to Render, Railway, Fly.io, Heroku, or a VPS.
- Set all environment variables from `backend/.env.example`.
- Use MongoDB Atlas network access rules for the hosting provider.
- Set `CLIENT_ORIGIN` to the deployed frontend URL.
- Ensure webhook routes receive raw request bodies.

Production checklist:

- Use a long random `JWT_SECRET` (generate with: `openssl rand -hex 32`).
- Replace the placeholder sitemap domain.
- Add real Cloudinary folder policies.
- Configure email provider (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL, PRAYER_EMAIL).
- Add backup and monitoring for MongoDB Atlas.
- Configure HTTPS and secure CORS origins only.
- **CRITICAL: Remove .env files from git history before deploying** (use git filter-branch or BFM).
- Ensure all secrets are rotated before deploying to production.
- Enable Content Security Policy (implemented via helmet in app.js).
- Set up monitoring and logging aggregation (e.g., DataDog, New Relic, LogRocket).

## Security

This application has been audited for production readiness. Key security measures:

- **Authentication**: JWT tokens with 12+ character minimum passwords, bcrypt hashing (salt rounds: 12).
- **Rate Limiting**: General (220/15min), Auth (12/15min), Donations (5/1hr), Prayer Requests (3/24hr).
- **CORS**: Restrictive, credentials enabled only for specified origins.
- **Input Validation**: All inputs validated with Zod schemas.
- **Error Handling**: Production mode returns generic errors; detailed errors logged server-side only.
- **Database**: Indexed queries, input sanitization, prepared statements via Mongoose.
- **Secrets**: All credentials loaded from environment variables. Never commit .env files.

### Known Limitations

- JWT tokens stored in localStorage (mitigated by Content Security Policy).
- Consider implementing token revocation list for logout in future versions.
- .env files must be removed from git history before production deployment (see git filter-branch docs).

## Testing

Run backend tests:
```bash
npm test --workspace=backend
```

Tests cover:
- Razorpay signature verification
- Input validation (login, donations, prayer requests, contact)
- Password strength requirements
