# Release Notes

## Release: Production-Readiness Audit v1
Date: 2026-06-07

Highlights
- Token revocation implemented (Redis-backed)
- CSRF protection added
- Prayer confidentiality enforced
- Cursor-based pagination added
- 56 automated tests added; all passing

Breaking changes
- JWT revocation requires Redis in production (optional in dev)
- Webhook endpoint expects raw JSON and signature header

Upgrade notes
- Remove .env from git history and rotate secrets
- Configure REDIS_URL, RAZORPAY keys, SMTP credentials in production

Changelog
- See PRODUCTION_AUDIT_REPORT.md for full audit details
