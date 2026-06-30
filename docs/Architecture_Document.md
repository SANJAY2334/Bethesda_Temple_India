# Architecture Document

System overview
- Client: React SPA served by CDN or static host
- API: Express server providing JSON endpoints
- Database: MongoDB for persistence
- Cache/Revocation: Redis for JWT revocation and caching
- External services: Razorpay (payments), Cloudinary (media), SMTP (email)

Component interactions
- Frontend communicates with backend via /api/* endpoints using JWT auth
- Payment flow integrates Razorpay SDK; backend verifies webhook signatures
- Token revocation: backend stores revoked tokens in Redis with TTL matching JWT expiry

Security measures
- Helmet for CSP, HSTS
- CSRF protection (csurf) with double-submit cookie
- Rate limiting on sensitive endpoints
- Zod for input validation

Scalability & performance
- Cursor-based pagination, DB indexes, optional Redis caching
- Horizontal scaling via stateless API servers behind load balancer

Deployment topology
- Load balancer → multiple Node instances → MongoDB Atlas + Redis managed
- Static frontend on CDN

Operational concerns
- Backups, monitoring, alerting, secrets management
