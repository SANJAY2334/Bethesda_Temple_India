# Deployment Guide

Overview
- This guide covers production deployment steps for backend and frontend.

Prerequisites
- Node.js 18+ (Node 24 tested)
- MongoDB Atlas or managed cluster
- Redis instance for token revocation (optional but recommended)
- Cloudinary account for media
- Razorpay account for payments
- SMTP account for email notifications

Environment variables (minimum)
- MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN
- REDIS_URL (optional)
- RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

Backend
1. Install dependencies: `npm ci` in backend folder
2. Build: Not required (Node server). Use transpiler if needed.
3. Start: Use PM2 or systemd service: `pm2 start server.js --name grace-harbor-api` 
4. Health check: GET /api/health

Frontend
1. Install: `npm ci` in frontend
2. Build: `npm run build`
3. Serve static: Use CDN or static host (Netlify, Vercel, S3+CloudFront)

CI/CD
- Recommended: GitHub Actions pipeline: install → test → build → deploy
- Run tests before merge to main

Rollback
- Keep previous container or static build available
- Database schema migrations must be backward compatible

Monitoring
- Sentry for errors, DataDog or Prometheus for metrics, and uptime checks

Secrets & rotation
- Store secrets in a secrets manager (Vault, AWS Secrets Manager)
- Rotate keys after git-history cleanup
