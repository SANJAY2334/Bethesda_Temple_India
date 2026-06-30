# Administrator Guide

This guide covers admin responsibilities and system maintenance.

System configuration
- Environment variables: See docs/Deployment_Guide.md for required variables like MONGODB_URI, JWT_SECRET, REDIS_URL, RAZORPAY keys.
- Seeding admin: Use `npm run seed:admin` after configuring SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD.

User management
- Create users via admin panel or seed script.
- Roles: admin, prayer, editor. Assign via admin UI or direct DB update.

Database management
- MongoDB: Use Atlas or managed cluster. Backups: daily snapshots recommended.
- Indexes: Maintain email, razorpayOrderId, status indexes for performance.

Deployment management
- Use PM2 or Docker for production processes. Ensure NODE_ENV=production.
- Rotate secrets after repository changes.

Monitoring & backups
- Configure Sentry for errors and Datadog/Prometheus for metrics.
- Backups: snapshot DB daily; test restoration quarterly.

Security
- Migrate JWT to httpOnly cookies for highest security (recommended).
- Ensure CSP and HSTS are enabled.
- Do not store secrets in repo; remove .env from history.
