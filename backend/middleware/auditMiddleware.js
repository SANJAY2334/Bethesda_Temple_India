import { AuditLog } from '../models/AuditLog.js'

export const auditLog = (action, entity) => async (req, res, next) => {
  const originalJson = res.json
  res.json = function(data) {
    const resource = data._id || data.id || req.params.id
    const metadata = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
    }

    if (req.user) {
      AuditLog.create({
        user: req.user._id,
        action,
        entity,
        entityId: resource,
        metadata,
      }).catch((err) => console.error('Failed to log audit:', err))
    }

    return originalJson.call(this, data)
  }
  next()
}
