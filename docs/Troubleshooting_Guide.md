# Troubleshooting Guide

Common issues

1. Server fails to start
- Check environment variables (MONGODB_URI, JWT_SECRET)
- Inspect logs (PM2 logs or systemd journal)

2. Database connection failures
- Verify network access to MongoDB Atlas
- Check credentials and SRV host (correct cluster string)

3. Payment webhook not processed
- Ensure webhook secret configured and signature header forwarded
- Check raw body parsing for /donations/webhook

4. Email not sent
- Verify SMTP credentials and ports
- Check mail service logs and retry strategy

5. Redis connection errors
- Ensure REDIS_URL reachable
- If Redis unavailable, token revocation falls back to allow tokens (development only)

Debugging tips
- Reproduce in staging before production
- Use Sentry for stack traces
- Run `npm test` to validate core behaviors
