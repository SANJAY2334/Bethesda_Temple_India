import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    action: {
      type: String,
      required: true,
    },

    entity: {
      type: String,
      required: true,
    },

    entityId: String,

    metadata: Object,
  },
  {
    timestamps: true,
  },
)

export const AuditLog =
  mongoose.model('AuditLog', auditLogSchema)