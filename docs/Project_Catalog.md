# Project Catalog - Grace Harbor Church Website

## 1. Executive Summary
Purpose: Public website and admin portal for Grace Harbor Church to publish sermons, events, donations, gallery, and prayer requests.  
Business problem: Centralize church content, enable online donations, collect prayer requests, and provide admin tooling.  
Target users: Church members, visitors, staff (admins, prayer team, editors).

## 2. Feature Catalog
- Home / Content
  - Purpose: Public-facing content and streaming
  - Flow: Visitor → view content → navigate pages
  - Input: None
  - Output: Rendered pages
  - Dependencies: CMS, CDN

- Donations
  - Purpose: Collect one-time donations via Razorpay
  - Flow: Donor → create order → pay → webhook updates donation status
  - Input: amount, donor email, name
  - Output: donation record, confirmation email
  - Dependencies: Razorpay, SMTP, database

- Prayer Requests
  - Purpose: Accept confidential or public prayer submissions
  - Flow: Visitor submits request → email notification → admin/prayer team handles
  - Input: name, email, message, confidential flag
  - Output: PrayerRequest record, notification
  - Dependencies: Database, mail service

- Admin Portal
  - Purpose: Manage content (sermons, events, gallery, testimonials), view donations, manage users
  - Flow: Admin login → CRUD operations
  - Input: content payloads
  - Output: Updated site content
  - Dependencies: Auth, database, Cloudinary

## 3. Module Catalog
- frontend/
  - Responsibility: React + Vite SPA
  - Key files: src/main.jsx, src/pages, src/services/api.js, src/services/authService.js
  - Dependencies: React, Vite, Axios
  - Services: API backend

- backend/
  - Responsibility: Express API, business logic, data persistence
  - Key files: app.js, server.js, routes/, controllers/, services/
  - Dependencies: Express, Mongoose, Zod, Redis (optional), Razorpay SDK
  - Services: MongoDB, Redis, SMTP, Cloudinary, Razorpay

## 4. Database Catalog
Collections:
- users
  - Purpose: Authentication and authorization
  - Fields: _id, name, email (unique), password (hashed), role, createdAt
  - Indexes: email (unique)

- donations
  - Purpose: Record donation orders and payments
  - Fields: _id, amount, email, razorpayOrderId, razorpayPaymentId, status, metadata, createdAt
  - Indexes: razorpayOrderId (sparse unique), status

- prayerrequests
  - Purpose: Store prayer submissions
  - Fields: _id, name, email, phone, message, confidential (bool), assignedTo, status, createdAt
  - Indexes: email, status, createdAt

- sermons, events, gallery, testimonials
  - Purpose: Content tables for public site
  - Fields: title, slug, body, media, published, createdAt
  - Indexes: slug, published, createdAt

## 5. API Catalog (high level)
- POST /api/auth/login
  - Purpose: Authenticate user
  - Request: { email, password }
  - Response: { token, user }
  - Auth: No

- POST /api/auth/logout
  - Purpose: Revoke JWT (blacklist)
  - Request: Authorization: Bearer <token>
  - Response: { success: true }
  - Auth: Yes

- GET /api/sermons?limit=&cursor=
  - Purpose: List sermons (cursor pagination)
  - Request: optional limit, cursor
  - Response: { data: [...], pagination: { nextCursor, hasMore } }
  - Auth: No (admin route exists at /api/sermons/admin)

- POST /api/donations/order
  - Purpose: Create payment order
  - Request: { amount, email, name }
  - Response: { orderId, amount, currency }
  - Auth: No

- POST /api/donations/webhook
  - Purpose: Razorpay webhook receiver
  - Request: raw JSON with signature header
  - Response: 200 OK
  - Auth: webhook signature verification

- POST /api/prayers
  - Purpose: Submit prayer request
  - Request: { name, email, message, confidential }
  - Response: created PrayerRequest
  - Auth: No

(Complete API reference in API_Documentation.md)

## 6. UI Catalog
Pages:
- Home: / - Landing, sermons preview, donate CTA
- Donations: /donate - Create donation order
- Admin Login: /admin/login - Login for staff
- Admin Dashboard: /admin - Manage content
- Prayer: /prayer - Submit prayers

## 7. Workflow Catalog (examples)
- Donation: create order → redirect to payment → webhook → mark donation complete → send email
- Prayer submission: POST /api/prayers → save → send notification

## 8. Technology Catalog
- Frontend: React 19, Vite
- Backend: Node.js 24, Express 5
- DB: MongoDB (Mongoose)
- Cache/Revocation: Redis (optional)
- Payments: Razorpay
- Storage: Cloudinary
- Email: SMTP provider (SendGrid/Gmail)

## 9. Deployment Catalog
- Build: frontend `npm run build`, backend deploy to Node process (PM2/docker)
- Env vars: See docs/Deployment_Guide.md
- Monitoring: Sentry/Datadog recommended

## 10. Maintenance Catalog
- Backups: MongoDB snapshots daily
- Secrets: Rotate after git history cleanup
- Recovery: Restore from snapshot & replay webhooks (if needed)

---

For complete endpoint, UI, and schema details see docs/API_Documentation.md and docs/Architecture_Document.md
