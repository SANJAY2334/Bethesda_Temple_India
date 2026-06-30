# API Documentation (summary)

Base URL: /api

Authentication
- JWT Bearer tokens in Authorization header. Some endpoints require auth.
- Logout revokes token via Redis blacklist.

Endpoints (summary)
- POST /auth/login { email, password } → { token, user }
- POST /auth/logout (Auth) → { success: true }
- GET /sermons?limit=&cursor= → list sermons (public)
- GET /sermons/admin (Auth: admin/editor) → admin list
- POST /donations/order { amount, email, name } → { orderId }
- POST /donations/webhook (raw) → webhook handler (verify signature)
- POST /prayers { name, email, message, confidential } → create prayer request

Request/Response formats
- JSON only except webhook which requires raw body for signature verification
- Pagination: { data: [...], pagination: { nextCursor, hasMore }}

Errors
- Standardized JSON error: { message: '...', status: 4xx }

Security
- CSRF: X-CSRF-Token header required for state-changing requests (double-submit)
- Rate limits applied to auth, donations, prayers

For full contract and examples, see code-level route handlers and docs/Project_Catalog.md
