import { AuditLog } from '../models/AuditLog.js'

export async function logAudit({
  user,
  action,
  entity,
  entityId,
  metadata = {},
}) {
  await AuditLog.create({
    user,
    action,
    entity,
    entityId,
    metadata,
  })
}