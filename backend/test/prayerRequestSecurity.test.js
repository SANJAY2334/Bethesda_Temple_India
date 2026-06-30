import assert from 'node:assert/strict'
import test from 'node:test'

// Mock user roles and permissions
const adminUser = {
  _id: 'admin-123',
  role: 'admin',
  equals: function(other) {
    return this._id === other
  },
}

const prayerTeamMember = {
  _id: 'prayer-456',
  role: 'prayer',
  equals: function(other) {
    return this._id === other
  },
}

// Test filtering logic
function filterPrayerRequests(requests, user) {
  if (user.role === 'admin') {
    return requests // Admins see all
  } else if (user.role === 'prayer') {
    return requests.filter(
      (pr) => !pr.confidential || pr.assignedTo?._id === user._id,
    )
  }
  return []
}

test('Security: Admin can access all prayer requests', () => {
  const requests = [
    { id: 1, message: 'Public request', confidential: false },
    { id: 2, message: 'Confidential request', confidential: true, assignedTo: { _id: 'prayer-456' } },
    { id: 3, message: 'Another confidential', confidential: true, assignedTo: { _id: 'prayer-789' } },
  ]

  const filtered = filterPrayerRequests(requests, adminUser)
  assert.equal(filtered.length, 3, 'Admin should see all 3 requests')
})

test('Security: Prayer team member sees only non-confidential and assigned requests', () => {
  const requests = [
    { id: 1, message: 'Public request', confidential: false },
    { id: 2, message: 'Assigned to them', confidential: true, assignedTo: { _id: 'prayer-456' } },
    { id: 3, message: 'Assigned to someone else', confidential: true, assignedTo: { _id: 'prayer-789' } },
  ]

  const filtered = filterPrayerRequests(requests, prayerTeamMember)
  assert.equal(filtered.length, 2, 'Should see 2: public request + assigned confidential request')
  assert.ok(
    filtered.some((r) => !r.confidential),
    'Should include non-confidential request',
  )
  assert.ok(
    filtered.some((r) => r.assignedTo?._id === 'prayer-456'),
    'Should include requests assigned to them',
  )
})

test('Security: Prayer team member cannot access unassigned confidential requests', () => {
  const requests = [
    { id: 1, message: 'Assigned to someone else', confidential: true, assignedTo: { _id: 'prayer-789' } },
  ]

  const filtered = filterPrayerRequests(requests, prayerTeamMember)
  assert.equal(filtered.length, 0, 'Should see 0 unassigned confidential requests')
})

test('Security: Confidential flag prevents unauthorized access', () => {
  const confidentialRequest = {
    id: 1,
    message: 'Very sensitive prayer',
    confidential: true,
    assignedTo: { _id: 'prayer-789' },
  }

  const otherTeamMember = {
    _id: 'prayer-456',
    role: 'prayer',
  }

  const canAccess =
    otherTeamMember.role === 'admin' ||
    !confidentialRequest.confidential ||
    confidentialRequest.assignedTo?._id === otherTeamMember._id

  assert.equal(canAccess, false, 'Team member should not access unassigned confidential request')
})
