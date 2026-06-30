# DEPLOYMENT ACTION ITEMS & CHECKLIST

## 🔴 CRITICAL (Must Complete Before Production Launch)

### 1. Remove Secrets from Git History
**Status**: ❌ NOT COMPLETED
**Priority**: CRITICAL
**Effort**: 30 minutes
**Risk**: CRITICAL

**Actions**:
```bash
# Option A: Using git filter-branch
git filter-branch --tree-filter 'rm -f backend/.env frontend/.env' --prune-empty HEAD

# Option B: Using BFG (recommended for large repos)
# Download from https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files backend/.env,frontend/.env repo/.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Verify secrets are removed
git log --full-history -- backend/.env frontend/.env
# Should return: "commit hash does not exist"

# Force push to repository (⚠️ All developers must re-clone)
git push origin --force --all
git push origin --force --tags
```

**Verification**:
- [ ] Run `git log backend/.env` - should be empty
- [ ] Clone fresh copy - .env files should not exist
- [ ] Audit tools: https://github.com/trufflesecurity/trufflehog

**Rollback**: Contact GitHub support to purge from cache (requires enterprise support)

---

### 2. Rotate All Production Credentials
**Status**: ❌ NOT COMPLETED
**Priority**: CRITICAL
**Effort**: 2 hours
**Impact**: Complete secret refresh

**Credentials to Rotate**:

1. **MongoDB Atlas**
   - [ ] Reset database user password
   - [ ] Generate new connection string
   - [ ] Update all environments
   - Docs: https://docs.atlas.mongodb.com/security/atlas-managed-security/

2. **JWT Secret**
   - [ ] Generate new 32-character secret: `openssl rand -hex 32`
   - [ ] Update backend environment
   - [ ] Note: Existing tokens will become invalid (acceptable for launch)
   
3. **Razorpay Keys**
   - [ ] Log in to https://dashboard.razorpay.com/app/keys
   - [ ] Generate new API key pair
   - [ ] Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
   - [ ] Test webhook signature with new secret
   
4. **Cloudinary**
   - [ ] Regenerate API key: https://cloudinary.com/console/settings/credentials
   - [ ] Update CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
   - [ ] Test image upload with new key

5. **Email Service**
   - [ ] If using Gmail: Generate new App Password (not Google account password)
   - [ ] If using SendGrid/AWS SES: Regenerate API keys
   - [ ] Update SMTP_USER and SMTP_PASS

6. **Client Origin CORS**
   - [ ] Update CLIENT_ORIGIN to actual production domain
   - [ ] Remove localhost from production environment

**Verification Checklist**:
```bash
# For each new credential:
# 1. Test connection
# 2. Verify no errors in logs
# 3. Simulate transaction/operation
```

---

### 3. Implement Token Revocation (Logout Fix)
**Status**: ❌ NOT COMPLETED
**Priority**: CRITICAL
**Effort**: 4 hours
**Impact**: Users truly logged out after logout

**Implementation Steps**:

1. **Set up Redis**
   ```bash
   # Option A: Redis Cloud (managed)
   # Sign up at https://redis.com/cloud/
   # Get connection string: redis://default:password@host:port
   
   # Option B: Local development
   # brew install redis  (macOS)
   # redis-server
   ```

2. **Install Redis Client**
   ```bash
   npm install redis --save --workspace=backend
   ```

3. **Create Token Revocation Service**
   ```javascript
   // backend/services/tokenRevocationService.js
   import { createClient } from 'redis'
   
   const redisClient = createClient({
     url: process.env.REDIS_URL
   })
   
   export async function revokeToken(token) {
     await redisClient.setEx(`revoked:${token}`, 604800, '1') // 7 days
   }
   
   export async function isTokenRevoked(token) {
     return await redisClient.exists(`revoked:${token}`)
   }
   ```

4. **Add Logout Endpoint**
   ```javascript
   // backend/routes/authRoutes.js
   router.post('/logout', protect, async (req, res) => {
     await revokeToken(req.headers.authorization.split(' ')[1])
     res.json({ loggedOut: true })
   })
   ```

5. **Update Auth Middleware**
   ```javascript
   // backend/middleware/authMiddleware.js
   const token = req.headers.authorization?.split(' ')[1]
   if (await isTokenRevoked(token)) {
     res.status(401)
     throw new Error('Token has been revoked. Please login again.')
   }
   ```

**Testing**:
- [ ] User logs in → token works
- [ ] User calls /logout → receives success
- [ ] Same token used → gets 401 Unauthorized
- [ ] Can login again with same credentials
- [ ] Token expires after 7 days (test with mock clock)

---

### 4. Set Up Production Monitoring & Alerting
**Status**: ❌ NOT COMPLETED
**Priority**: CRITICAL
**Effort**: 3 hours
**Impact**: Visibility into production issues

**Option A: Sentry (Recommended for Small to Medium Projects)**
```bash
# Install Sentry SDK
npm install @sentry/express --save --workspace=backend

# backend/server.js
import * as Sentry from '@sentry/express'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())
```

**Option B: DataDog**
```bash
npm install dd-trace --save --workspace=backend
# See: https://docs.datadoghq.com/tracing/setup_overview/setup/nodejs
```

**Option C: LogRocket (Frontend)**
```bash
npm install logrocket --save --workspace=frontend
```

**Alerting Configuration**:
1. Error rate > 5% → Page on-call engineer
2. Database connection failure → Immediate alert
3. Donation webhook failures → Business alert
4. Payment processing errors → Critical alert
5. Contact form failures → Customer service alert

---

## 🟡 HIGH PRIORITY (Should Complete Before Launch)

### 5. Implement Pagination
**Status**: ❌ NOT STARTED
**Priority**: HIGH
**Effort**: 4 hours
**Impact**: Scales to 10,000+ items

**Implementation**:
```javascript
// backend/utils/paginate.js
export function paginate(query, pageParam = 1, limitParam = 20) {
  const limit = Math.min(parseInt(limitParam) || 20, 100) // Max 100
  const page = parseInt(pageParam) || 1
  const skip = (page - 1) * limit
  return { limit, skip, page }
}

// backend/controllers/crudController.js
export function list(model, publicFilter = {}) {
  return asyncHandler(async (req, res) => {
    const { limit, skip } = paginate(req.query.page, req.query.limit)
    const [data, total] = await Promise.all([
      model.find(publicFilter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      model.countDocuments(publicFilter)
    ])
    res.json({
      data,
      pagination: {
        total,
        page: Math.floor(skip / limit) + 1,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  })
}
```

---

### 6. Add Redis Caching
**Status**: ❌ NOT STARTED
**Priority**: HIGH
**Effort**: 3 hours
**Impact**: 10-100x faster list queries

**Cache Targets**:
- Sermons: 1 hour TTL
- Events: 1 hour TTL
- Gallery: 6 hour TTL
- Testimonials: 24 hour TTL
- Homepage: 6 hour TTL

---

### 7. Verify Database Backups
**Status**: ⚠️ ASSUMED CONFIGURED
**Priority**: HIGH
**Effort**: 30 minutes

**MongoDB Atlas Backup Verification**:
- [ ] Log in to MongoDB Atlas
- [ ] Navigate to Backup → Backup Policy
- [ ] Verify: Daily backups, 30-day retention
- [ ] Test restore procedure (non-production)

---

## 🟢 MEDIUM PRIORITY (Nice to Have Before Launch)

### 8. Load Testing
**Status**: ❌ NOT STARTED
**Priority**: MEDIUM
**Effort**: 2 hours
**Tool**: k6 (https://k6.io)

```bash
npm install -g k6

# k6-test.js
import http from 'k6/http'
import { check } from 'k6'

export let options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '5m', target: 50 },   // Stay
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'],
    'http_req_failed': ['rate<0.1'],
  },
}

export default function() {
  let res = http.get('https://api.graceharbor.church/api/sermons')
  check(res, {
    'status is 200': r => r.status === 200,
  })
}

# Run test
k6 run k6-test.js
```

---

### 9. Set Up CI/CD Pipeline
**Status**: ❌ NOT STARTED
**Priority**: MEDIUM
**Tool**: GitHub Actions (free)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test --workspace=backend
      - run: npm run build --workspace=frontend

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploy to production"
```

---

## ✅ VERIFICATION CHECKLIST

### Pre-Deployment (24 Hours Before)
- [ ] All tests passing (13/13)
- [ ] Frontend builds successfully
- [ ] Backend health check responds
- [ ] All environment variables set
- [ ] SSL certificate configured
- [ ] CDN origin configured
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Team notified of deployment

### Post-Deployment (First Hour)
- [ ] Health check endpoint responding
- [ ] Database connectivity verified
- [ ] HTTPS working (no mixed content)
- [ ] CORS properly configured
- [ ] Razorpay donations working (test transaction)
- [ ] Contact form sending emails
- [ ] Prayer requests saved to database
- [ ] Authentication working
- [ ] Admin dashboard accessible
- [ ] No errors in monitoring dashboard

### Post-Deployment (First 24 Hours)
- [ ] Monitor error rates < 1%
- [ ] Response times < 500ms p99
- [ ] Database performance normal
- [ ] Email notifications working
- [ ] Backup running successfully
- [ ] On-call engineer available
- [ ] Runbook accessible
- [ ] Customer feedback collected

---

## 🚨 ROLLBACK PROCEDURE

**If Critical Issues Discovered**:

1. Stop traffic at load balancer
2. Revert to previous deployment
3. Verify database state (use backup if needed)
4. Document issue in incident report
5. Schedule post-mortem

**Estimated Recovery Time**: 15 minutes

---

## 📞 EMERGENCY CONTACTS

Establish before production launch:

- **On-Call Engineer**: [Name] - [Phone/Slack]
- **Database Support**: MongoDB Atlas support
- **Infrastructure Support**: Hosting provider support
- **Incident Commander**: [Name] - [Phone/Slack]

---

## 🎯 SUCCESS CRITERIA

✅ Deployment is successful if:
- All health checks pass
- No P0 errors in monitoring
- User authentication works
- Donations process successfully
- Email notifications delivered
- Response times < 1 second median
- 99.9% uptime maintained

---

**Last Updated**: May 31, 2026
**Next Review**: 24 hours before production launch
**Owner**: Engineering Review Board
